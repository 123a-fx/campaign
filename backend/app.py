from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import uuid
import os

app = Flask(__name__, static_folder="frontend/build")
CORS(app)

# Dummy in-memory storage
campaigns = []

@app.route('/')
def serve_react():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Campaign APIs
@app.route('/campaigns', methods=['GET'])
def get_campaigns():
    return jsonify(campaigns)

@app.route('/campaigns', methods=['POST'])
def add_campaign():
    data = request.get_json()
    new_campaign = {
        "id": str(uuid.uuid4()),
        "name": data.get("name"),
        "client": data.get("client"),
        "startDate": data.get("startDate"),
        "status": data.get("status")
    }
    campaigns.append(new_campaign)
    return jsonify(new_campaign), 201

@app.route('/campaigns/<id>', methods=['PUT'])
def update_campaign(id):
    data = request.get_json()
    for campaign in campaigns:
        if campaign["id"] == id:
            campaign.update(data)
            return jsonify(campaign)
    return jsonify({"error": "Campaign not found"}), 404

@app.route('/campaigns/<id>', methods=['DELETE'])
def delete_campaign(id):
    global campaigns
    campaigns = [c for c in campaigns if c["id"] != id]
    return jsonify({"message": "Campaign deleted"}), 200

if __name__ == '__main__':
    # For Render deployment, host on 0.0.0.0
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
