from flask import Flask, jsonify, request
import json
import requests

app = Flask(__name__)

@app.route("/nameservice/names", methods=['POST'])
def test():
    if request.method == 'POST':
        username = request.headers.get["srcaddress"]
        receiver = request.headers.get["dstaddress"]
        prestige = request.headers.get["prestige"]
    print(username + " "+ receiver +" " +  prestige)
    return jsonify(200)

if __name__ == '__main__':
   app.run(host="0.0.0.0", debug = True)
