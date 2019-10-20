from flask import Flask, jsonify, request, make_response
import json
import requests
import subprocess
import json
app = Flask(__name__)

@app.after_request
def apply_caching(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response

@app.route("/report", methods=['POST'])
def transfer_prestige():
    if request.method == 'POST':
        username = request.headers.get("srcaddress")
        receiver = request.headers.get("dstaddress")
        prestige = request.headers.get("prestige")
        filename = request.headers.get("filename")
        subprocess.call(["nscli", "tx", "nameservice", "register-transfer", receiver,
                         prestige, filename, "--from", username])
    return jsonify(200)

@app.route("/transfer")
def get_transfer_id():
    transfer_ids = subprocess.check_output(["nscli", "query" , "nameservice", "transfers"])
    transfer_ids = transfer_ids.decode("utf-8")
    return jsonify(json.loads(transfer_ids))

@app.route("/transfers", methods=['POST'])
def get_transfer_information():
    if request.method == 'POST':
        #print(request.args)
        transfer_information =  request.get_data()
        result = subprocess.check_output(["nscli", "query"  ,"nameservice" ,"transfer",
                        transfer_information.decode("utf-8") ])
        transfer_information = result.decode("utf-8")
        return jsonify(json.loads(transfer_information))


if __name__ == '__main__':
    subprocess.call(["mkdir", "-p", "$HOME/go/bin", "echo",
                    "\"export GOPATH=$HOME/go\"", ">>", "~/.bash_profile",
                    "echo", "\"export GOBIN=\$GOPATH/bin\"" ">>", "~/.bash_profile",
                    "echo", "\"export PATH=\$PATH:\$GOBIN\"", ">>", "~/.bash_profile",
                    "echo", "\"export GO111MODULE=on\"", ">>", "~/.bash_profile",
                    "source", "~/.bash_profile"])
    app.run(host="0.0.0.0", debug = True)
