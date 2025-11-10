import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import uuid

app = Flask(__name__, static_folder="frontend/build")  # point to React build
CORS(app)

campaigns = []

# API routes
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

# Serve React frontend
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
