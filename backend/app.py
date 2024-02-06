from flask import Flask, jsonify, request
from flask_cors import CORS
from Querying.text_result import *

app = Flask(__name__)
CORS(app)

hub_model = 'k4tel/geo-bert-multilingual'
base_model = "bert-base-multilingual-cased"
use_pipeline = True
model_wrapper = load_model(base_model, hub_model, use_pipeline)
filter = True


@app.route("/")
def hello():
    return "Hello, World! 123"

@app.route("/predict", methods=["POST"])
def search():
    query = request.json.get("query")
    result = text_prediction(model_wrapper, query, use_pipeline, filter)
    ind = np.argwhere(np.round(result.weights[0, :] * 100, 2) > 0)
    significant = result.means[0, ind].reshape(-1, 2)
    print(significant[0])

    if query:
        location = {
            "query": query,
            "latitude": significant[0][1],
            "longitude": significant[0][0]
        }
        return jsonify(location), 200
    else:
        return jsonify({"error": "Query is required"}), 400
 

if __name__ == "__main__":
    app.run(debug=True)
   