from flask import Flask, jsonify, request
import json
import requests
import subprocess
import json
app = Flask(__name__)

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
        transfer_information = request.headers.get("transferid")
        result = subprocess.check_output(["nscli", "query"  ,"nameservice" ,"transfer",
                         transfer_information ])
        transfer_information = result.decode("utf-8")
        return jsonify(json.loads(transfer_information))


    #nscli query  nameservice transfer cosmos10q3p8argpsuam0ylqmh6qwj2k444htrq96dshccosmos1m08557vdl5wkc7yagj5w0ak8w3vmf7ha9dfqv0test.dat


if __name__ == '__main__':
    subprocess.call(["mkdir", "-p", "$HOME/go/bin", "echo",
                    "\"export GOPATH=$HOME/go\"", ">>", "~/.bash_profile",
                    "echo", "\"export GOBIN=\$GOPATH/bin\"" ">>", "~/.bash_profile",
                    "echo", "\"export PATH=\$PATH:\$GOBIN\"", ">>", "~/.bash_profile",
                    "echo", "\"export GO111MODULE=on\"", ">>", "~/.bash_profile",
                    "source", "~/.bash_profile"])
    app.run(host="0.0.0.0", debug = True)
