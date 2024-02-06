from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello():
    return "Hello, World! 123"

@app.route("/predict", methods=["POST"])
def search():
    query = request.json.get("query")

    if query:
        location = {
            "query": query,
            "latitude": 40.7128,
            "longitude": -74.0060
        }
        return jsonify(location), 200
    else:
        return jsonify({"error": "Query is required"}), 400
 

if __name__ == "__main__":
    app.run(debug=True)
   