import json
from bson import json_util
from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

ip = 'localhost'
client = MongoClient(ip, 27017)
db = client.gameswap_db
listings_collection = db.listings_collection
listings_collection.find_one()

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