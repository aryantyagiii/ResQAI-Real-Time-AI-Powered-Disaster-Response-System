
# 🚨 ResQAI – Real-Time AI-Powered Disaster Response System

## 📝 Description

**ResQAI** is a smart, AI-powered disaster response platform designed to save lives during natural disasters. It predicts disasters using real-time data, sends multilingual alerts via SMS, voice, and app notifications, and enables coordination through a live rescue dashboard. Victims can send SOS messages, share their location (even via SMS), and rescue teams can monitor and manage operations using a real-time map interface.

---

## 💡 Key Features

- 🧠 **AI-Based Disaster Prediction** using weather, seismic, and satellite data  
- 📢 **Multilingual Alert System** via SMS, voice (TTS), and app push  
- 🆘 **Victim Location Tracking** using GPS from app or via panic SMS  
- 🗺️ **Live Rescue Dashboard** with real-time pins, severity zones, and communication tools  
- 📷 **AI-Powered Damage Assessment** using user-uploaded images/videos  
- 📴 **Offline-Friendly** via SMS commands for victims in low-connectivity areas  

---

## 🛠️ Technologies Used

**Frontend:**
- React.js – Web dashboard for rescue teams
- Kivy (Python) – Mobile app for victims (SOS, location, image upload)
- Leaflet.js – Interactive map for tracking

**Backend:**
- Flask (Python) – REST API for backend logic
- Firebase – Realtime database for alerts, victim data, and messages
- Twilio – SMS sending/receiving (including panic messages and multilingual TTS)

**AI/ML:**
- Scikit-learn – Disaster forecasting model
- YOLOv5/v8 (optional) – Image-based damage detection
- gTTS – Voice alerts in regional languages

**APIs & Data Sources:**
- OpenWeatherMap API – Weather monitoring
- USGS API – Earthquake data
- Mock seismic/weather feeds – fallback for testing/offline

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/resqai.git
cd resqai
```

### 2. Install Python backend dependencies
```bash
pip install -r requirements.txt
```

### 3. Set up Firebase
- Create a Firebase project
- Enable Realtime Database or Firestore
- Add `firebaseConfig` to the frontend and backend

### 4. Configure environment variables
Create a `.env` file for API keys:
```
OPENWEATHER_API_KEY=your_api_key
TWILIO_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_twilio_number
FIREBASE_CONFIG=your_firebase_config
```

### 5. Run the Flask server
```bash
python app.py
```

### 6. Run the React frontend
```bash
cd frontend
npm install
npm start
```

---

## ▶️ Usage

- **Victim Side (Mobile):**  
  Open the Kivy-based app to send SOS, share GPS, and upload disaster images. Victims without internet can send an SMS to a Twilio number to broadcast their location.

- **Rescue Side (Web):**  
  Log into the live dashboard to see:
  - Victim pins on a map  
  - Live alert status and area severity  
  - Chat interface and routing for rescue missions  
  - Uploaded photos for AI-powered damage detection

---

## 🧩 Future Scope (Phases)
- Phase 1: AI disaster prediction  
- Phase 2: Victim tracking via app/SMS  
- Phase 3: Live rescue dashboard  
- Phase 4: AI image damage analysis  
- Phase 5: Offline SMS services  

---

## 👥 Team

- Aryan Tyagi (Team Leader)  
- Abhi Sharma  
- Tushti Jain  
- Vanshika Patel  

---

## 📫 Contact

📧 Email: aryantyagi761@gmail.com  
🔗 GitHub: [github.com/aryantyagiii](https://github.com/aryantyagiii)  
🔗 LinkedIn: [linkedin.com/in/aryantyagiii](https://linkedin.com/in/aryantyagiii)
