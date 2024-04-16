from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
import dlib

app = Flask(__name__)
CORS(app, resources={r"/detect_deepfake": {"origins": "*"}})

model = load_model('deepfake-detection-model.keras')
detector = dlib.get_frontal_face_detector()

def detect_deepfake(image_data):
    img = cv2.imdecode(np.frombuffer(image_data, dtype=np.uint8), cv2.IMREAD_COLOR)
    face_rects, scores, idx = detector.run(img)
    for face_rect in face_rects:
        x1, y1, x2, y2 = face_rect.left(), face_rect.top(), face_rect.right(), face_rect.bottom()
        crop_img = img[y1:y2, x1:x2]
        data = img_to_array(cv2.resize(crop_img, (128, 128))).flatten() / 255.0
        data = data.reshape(-1, 128, 128, 3)
        predictions = model.predict(data)
        predicted_class = np.argmax(predictions, axis=1)
        if predicted_class[0] == 1:
            return "Real"
        return "Fake"

@app.route("/detect_deepfake", methods=["POST"])
def detect_deepfake_endpoint():
    if request.method == "POST":
        image_data = request.data
        result = detect_deepfake(image_data)
        response = jsonify({'result': result})
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

app.run(debug=True)