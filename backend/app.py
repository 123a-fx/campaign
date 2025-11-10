from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)

campaigns = []  # temporary storage

@app.route('/')
def home():
    return jsonify({"message": "Welcome to Campaign Tracker Backend!"})

# Get all campaigns
@app.route('/campaigns', methods=['GET'])
def get_campaigns():
    return jsonify(campaigns)

# Add a new campaign
@app.route('/campaigns', methods=['POST'])
def add_campaign():
    data = request.get_json()
    print("📩 Received from frontend:", data)  # Debugging print

    new_campaign = {
        "id": str(uuid.uuid4()),
        "name": data.get("name"),
        "client": data.get("client"),
        "startDate": data.get("startDate"),
        "status": data.get("status")
    }

    print("✅ Stored campaign:", new_campaign)  # Debugging print

    campaigns.append(new_campaign)
    return jsonify(new_campaign), 201

# Update campaign
@app.route('/campaigns/<id>', methods=['PUT'])
def update_campaign(id):
    data = request.get_json()
    for campaign in campaigns:
        if campaign["id"] == id:
            campaign["name"] = data.get("name", campaign["name"])
            campaign["client"] = data.get("client", campaign["client"])
            campaign["startDate"] = data.get("startDate", campaign["startDate"])
            campaign["status"] = data.get("status", campaign["status"])
            return jsonify(campaign)
    return jsonify({"error": "Campaign not found"}), 404

# Delete campaign
@app.route('/campaigns/<id>', methods=['DELETE'])
def delete_campaign(id):
    global campaigns
    campaigns = [c for c in campaigns if c["id"] != id]
    return jsonify({"message": "Campaign deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
