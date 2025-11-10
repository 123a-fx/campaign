import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

app = Flask(__name__, static_folder='frontend/build', static_url_path='/')
CORS(app)

# MongoDB connection
MONGO_URI = os.environ.get("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.get_default_database()  # Uses the DB specified in the URI
campaigns_collection = db.campaigns  # Collection for campaigns

# Serve React frontend
@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

# API to get all campaigns
@app.route('/campaigns', methods=['GET'])
def get_campaigns():
    campaigns = list(campaigns_collection.find({}, {'_id': 0}))
    return jsonify(campaigns), 200

# API to add a new campaign
@app.route('/campaigns', methods=['POST'])
def add_campaign():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    campaigns_collection.insert_one(data)
    return jsonify({"message": "Campaign added successfully"}), 201

# Catch-all route for React Router
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
