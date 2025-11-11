# backend/app.py
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__, static_folder="frontend/build", static_url_path="")
CORS(app)

# MongoDB connection
MONGO_URI = os.environ.get("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["campaignDB"]  # Make sure this matches your DB name in the URI
campaigns_collection = db["campaigns"]

# Serve React frontend
@app.route("/")
def serve_frontend():
    return send_from_directory(app.static_folder, "index.html")

# API to get all campaigns
@app.route("/campaigns", methods=["GET"])
def get_campaigns():
    campaigns = list(campaigns_collection.find({}, {"_id": 0}))
    return jsonify(campaigns), 200

# API to add a new campaign
@app.route("/campaigns", methods=["POST"])
def add_campaign():
    data = request.get_json()
    name = data.get("name")
    budget = data.get("budget")
    
    if not name or budget is None:
        return jsonify({"error": "Name and budget are required"}), 400
    
    campaign = {"name": name, "budget": budget}
    campaigns_collection.insert_one(campaign)
    return jsonify({"message": "Campaign added successfully", "campaign": campaign}), 201

# API to update a campaign
@app.route("/campaigns/<string:name>", methods=["PUT"])
def update_campaign(name):
    data = request.get_json()
    budget = data.get("budget")
    
    if budget is None:
        return jsonify({"error": "Budget is required"}), 400
    
    result = campaigns_collection.update_one({"name": name}, {"$set": {"budget": budget}})
    
    if result.matched_count == 0:
        return jsonify({"error": "Campaign not found"}), 404
    
    return jsonify({"message": "Campaign updated successfully"}), 200

# API to delete a campaign
@app.route("/campaigns/<string:name>", methods=["DELETE"])
def delete_campaign(name):
    result = campaigns_collection.delete_one({"name": name})
    
    if result.deleted_count == 0:
        return jsonify({"error": "Campaign not found"}), 404
    
    return jsonify({"message": "Campaign deleted successfully"}), 200

if __name__ == "__main__":
    # For Render deployment
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
