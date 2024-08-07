import json
import datetime
import hashlib
from bson import json_util
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

# MongoDB cloud config
username = 'gameswap'
password = 'SO3v6uVCwfQqpzPS'
client = MongoClient("mongodb+srv://" + username + ":" + password + "@cluster0.tupmdgp.mongodb.net/?retryWrites=true&w=majority", tls=True, tlsAllowInvalidCertificates=True)

db = client.gameswap_db
listings_collection = db.listings_collection
users_collection = db.users_collection

jwt = JWTManager(app) # initialize JWTManager
app.config['JWT_SECRET_KEY'] = 'DanialxRatherxYJ'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1) # define the life span of the token

# Register API route
@app.route("/user", methods=["POST"])
def register():
    new_user = request.get_json() # store the json body request
    new_user["password"] = hashlib.sha256(new_user["password"].encode("utf-8")).hexdigest() # encrypt password
    doc = users_collection.find_one({"username": new_user["username"]}) # check if user exist
    if not doc:
        users_collection.insert_one(new_user)
        return jsonify({'msg': 'User created successfully'}), 201
    else:
        return jsonify({'msg': 'Username already exists'}), 409

# Get profile API route
@app.route("/user", methods=["GET"])
@jwt_required( )
def profile():
    current_user = get_jwt_identity() # Get the identity of the current user
    user_from_db = users_collection.find_one({'username' : current_user})
    if user_from_db:
        user_from_db['_id'] = str(user_from_db['_id'])
        del user_from_db['password'] # delete data we don't want to return
        return jsonify({'profile' : user_from_db }), 200
    else:
        return jsonify({'msg': 'Profile not found'}), 404

# Login API route
@app.route("/login", methods=["POST"])
def login():
    login_details = request.get_json() # store the json body request
    user_from_db = users_collection.find_one({'username': login_details['username']})  # search for user in database

    if user_from_db:
        encrypted_password = hashlib.sha256(login_details['password'].encode("utf-8")).hexdigest()
        if encrypted_password == user_from_db['password']:
            access_token = create_access_token(identity=user_from_db['username']) # create jwt token from username
            return jsonify(access_token=access_token), 200

    return jsonify({'msg': 'The username or password is incorrect'}), 401

# Create listing API route
@app.route("/createlisting", methods=["POST"])
@jwt_required( )
def createlisting():
    new_listing = request.get_json() # store the json body request
    new_listing["user_id"] = ObjectId(new_listing["user_id"])
    listings_collection.insert_one(new_listing)
    return jsonify({'msg': 'Listing created successfully'}), 202

@app.route("/deletelisting", methods=["GET"])
@jwt_required( )
def deletelisting():
    args = request.args
    listing_id = args.get("listing_id")
    listings_collection.delete_one({"_id": ObjectId(listing_id)})
    return jsonify({'msg': 'Listing deleted successfully'}), 203

def parse_json(data):
    return json.loads(json_util.dumps(data))

# Members API route
@app.route("/members")
def members():
    return {"members": ["Danial", "Rather", "YJ"]}

# Get listings API route
# Get listings for given user_id
@app.route("/listings", methods=["GET"])
def listing():
    args = request.args
    user_id = args.get("user_id")
    return parse_json(listings_collection.find({ "user_id": ObjectId(user_id) }))

# Get listings that match (with usernames fetched from user ID)
@app.route("/searchlistings", methods=["GET"])
def searchlistings():
    args = request.args
    search_term = args.get("search_term")
    listings_collection.create_index([("title", 'text')])
    search_results = parse_json(listings_collection.find({ "$text": { "$search": search_term } }))
    for x in range(len(search_results)):
        user_id = search_results[x]["user_id"]["$oid"]
        listing_user = parse_json(users_collection.find_one({"_id" : ObjectId(user_id)}))
        username = listing_user["username"]
        email = listing_user["email"]
        search_results[x]["username"] = username
        search_results[x]["email"] = email
    return search_results

# Get username from user_id
@app.route("/getusername", methods=["GET"])
def getusername():
    args = request.args
    user_id = args.get("user_id")
    return parse_json(users_collection.find_one({"_id" : ObjectId(user_id)}))
    
if __name__ == "__main__":
    app.run(debug=True)