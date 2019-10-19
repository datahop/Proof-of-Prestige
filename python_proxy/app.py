from flask import Flask, jsonify, request
import json
import requests

app = Flask(__name__)

@app.route("/nameservice/names", methods=['POST'])
def test():
    if request.method == 'POST':
        username = request.json["filename"]
        receiver = request.json["receiver"]
        price = request.json["price"]
    print(username + " "+ receiver +" " +  price)
    return jsonify(200)

if __name__ == '__main__':
   app.run(host="0.0.0.0", debug = True)
