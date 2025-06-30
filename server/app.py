from flask import Flask, request, jsonify
import json
import random
from datetime import datetime, timedelta
import os

app = Flask(__name__)

# Mock data
victims = []
alerts = []

# Load mock data
def load_mock_data():
    global victims, alerts
    
    # Generate mock victims
    for i in range(1, 10):
        victims.append({
            "id": i,
            "name": f"Victim {i}",
            "location": f"Location {i}",
            "lat": 20.5937 + (random.random() - 0.5) * 10,
            "lng": 78.9629 + (random.random() - 0.5) * 10,
            "status": random.choice(["pending", "in-progress", "completed"]),
            "severity": random.choice(["high", "medium", "low"]),
            "phone": f"+91 {random.randint(70000, 99999)} {random.randint(10000, 99999)}",
            "notes": f"Notes for victim {i}" if random.random() > 0.3 else None,
            "timestamp": (datetime.now() - timedelta(hours=random.randint(1, 24))).isoformat()
        })
    
    # Generate mock alerts
    disaster_types = ["earthquake", "flood", "wildfire", "landslide", "hurricane"]
    areas = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad"]
    
    for i in range(1, 6):
        disaster_type = random.choice(disaster_types)
        area = random.choice(areas)
        alerts.append({
            "id": i,
            "title": f"{disaster_type.capitalize()} Alert for {area}",
            "message": f"A {disaster_type} warning has been issued for {area} area. Please take necessary precautions.",
            "type": disaster_type,
            "area": area,
            "severity": random.choice(["high", "medium", "low"]),
            "timestamp": (datetime.now() - timedelta(hours=random.randint(1, 72))).isoformat()
        })

# API routes
@app.route('/api/victims', methods=['GET'])
def get_victims():
    return jsonify(victims)

@app.route('/api/victims/<int:victim_id>', methods=['GET'])
def get_victim(victim_id):
    victim = next((v for v in victims if v["id"] == victim_id), None)
    if victim:
        return jsonify(victim)
    return jsonify({"error": "Victim not found"}), 404

@app.route('/api/victims', methods=['POST'])
def add_victim():
    data = request.json
    victim_id = max([v["id"] for v in victims]) + 1 if victims else 1
    
    victim = {
        "id": victim_id,
        "name": data.get("name", "Unknown"),
        "location": data.get("location", "Unknown"),
        "lat": data.get("lat"),
        "lng": data.get("lng"),
        "status": "pending",
        "severity": data.get("severity", "medium"),
        "phone": data.get("phone"),
        "notes": data.get("notes"),
        "timestamp": datetime.now().isoformat()
    }
    
    victims.append(victim)
    return jsonify(victim), 201

@app.route('/api/alerts', methods=['GET'])
def get_alerts():
    return jsonify(alerts)

@app.route('/api/alerts', methods=['POST'])
def add_alert():
    data = request.json
    alert_id = max([a["id"] for a in alerts]) + 1 if alerts else 1
    
    alert = {
        "id": alert_id,
        "title": data.get("title"),
        "message": data.get("message"),
        "type": data.get("type"),
        "area": data.get("area"),
        "severity": data.get("severity", "medium"),
        "timestamp": datetime.now().isoformat()
    }
    
    alerts.append(alert)
    return jsonify(alert), 201

@app.route('/api/predict/disaster', methods=['GET'])
def predict_disaster():
    # Mock disaster prediction endpoint
    disaster_types = ["earthquake", "flood", "wildfire", "landslide", "hurricane"]
    predictions = []
    
    for disaster in disaster_types:
        predictions.append({
            "type": disaster,
            "probability": random.random(),
            "areas": ["Mumbai", "Delhi", "Bangalore"] if random.random() > 0.5 else ["Chennai", "Kolkata"]
        })
    
    return jsonify({
        "predictions": predictions,
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/analyze/image', methods=['POST'])
def analyze_image():
    # Mock image analysis endpoint
    # In a real implementation, this would use YOLOv8 to analyze the uploaded image
    
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    # Pretend to analyze the image
    analysis_results = {
        "damage_level": random.choice(["high", "medium", "low"]),
        "objects_detected": {
            "people": random.randint(0, 5),
            "buildings": random.randint(0, 3),
            "vehicles": random.randint(0, 2),
            "debris": random.random() > 0.5
        },
        "confidence": random.random() * 0.5 + 0.5,  # 0.5 to 1.0
        "timestamp": datetime.now().isoformat()
    }
    
    return jsonify(analysis_results)

# Initialize mock data
load_mock_data()

# Run the app
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)