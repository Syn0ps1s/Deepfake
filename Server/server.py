from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/detect_deepfake', methods=['POST'])
def detect_deepfake():
    image_data = request.json.get('image')

    # deepfake detection logic?

    #this is a dummy result to test
    result = {'result': 'Real'}

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
