import json
import datetime
import hashlib
from bson import json_util
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB cloud
username = 'gameswap'
password = 'SO3v6uVCwfQqpzPS'
client = MongoClient("mongodb+srv://" + username + ":" + password + "@cluster0.tupmdgp.mongodb.net/?retryWrites=true&w=majority", tls=True, tlsAllowInvalidCertificates=True)
db = client.gameswap_db

listings_collection = db.listings_collection
listings_collection.find_one()

users_collection = db.users_collection

@app.route("/user", methods=["POST"])
def register():
    new_user = request.get_json() # store the json body request
    new_user["user_id"] = str(users_collection.count_documents({}) + 1)
    new_user["password"] = hashlib.sha256(new_user["password"].encode("utf-8")).hexdigest() # encrypt password
    doc = users_collection.find_one({"username": new_user["username"]}) # check if user exist
    if not doc:
        users_collection.insert_one(new_user)
        return jsonify({'msg': 'User created successfully'}), 201
    else:
        return jsonify({'msg': 'Username already exists'}), 409

jwt = JWTManager(app) # initialize JWTManager
app.config['JWT_SECRET_KEY'] = 'DanialxRatherxYJ'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1) # define the life span of the token

@app.route("/user", methods=["GET"])
@jwt_required
def profile():
    current_user = get_jwt_identity() # Get the identity of the current user
    user_from_db = users_collection.find_one({'username' : current_user})
    if user_from_db:
        del user_from_db['_id'], user_from_db['password'] # delete data we don't want to return
        return jsonify({'profile' : user_from_db }), 200
    else:
        return jsonify({'msg': 'Profile not found'}), 404

@app.route("/login", methods=["POST"])
def login():
    login_details = request.get_json() # store the json body request
    user_from_db = users_collection.find_one({'username': login_details['username']})  # search for user in database

    if user_from_db:
        encrypted_password = hashlib.sha256(login_details['password'].encode("utf-8")).hexdigest()
        if encrypted_password == user_from_db['password']:
            access_token = create_access_token(identity=user_from_db['username']) # create jwt token
            return jsonify(access_token=access_token), 200

    return jsonify({'msg': 'The username or password is incorrect'}), 401

def parse_json(data):
    return json.loads(json_util.dumps(data))

# Members API Route
@app.route("/members")
def members():
    return {"members": ["Danial", "Rather", "YJ"]}

# Listings API Route
@app.route("/listings")
def listing():
    return parse_json(listings_collection.find_one())


if __name__ == "__main__":
    app.run(debug=True)