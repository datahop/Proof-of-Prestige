### Requirments

This command add nsd and nscli to the commandline :
```bash
mkdir -p $HOME/go/bin
echo "export GOPATH=$HOME/go" >> ~/.bash_profile
echo "export GOBIN=\$GOPATH/bin" >> ~/.bash_profile
echo "export PATH=\$PATH:\$GOBIN" >> ~/.bash_profile
echo "export GO111MODULE=on" >> ~/.bash_profile
source ~/.bash_profile
```

Then create the binary with ```make install```

After this you should to be able run following commands:

```bash
nsd help
nscli help
```

### Start
First you must run ```start_tutorial.sh```.

This create the tutorial config and start the server.   
After this determinate the server and enter ``nscli rest-server --chain-id namechain --trust-node``.  
This command create the rest server at port 1317.



### Rest-API and Reponse

API is defined in file `/x/nameservice/client/rest`.

You get the address of a user with ``nscli keys show jack -a``. It looks like ``cosmos13rks66u9dykmeewspj739wsh2pzgk95t35ca0v``. This is required for the REST-API. In the following tutorial ``$key`` is a placeholder for the address of a user.

#### Get Information about a account

Method: GET or POST  
Rquest: http://localhost:1317/auth/accounts/$key  
curl: ```curl -s http://localhost:1317/auth/accounts/$key```

Reponse:
```json
{
  "height": "0",
  "result": {
    "type": "cosmos-sdk/Account",
    "value": {
      "address": "",
      "coins": [],
      "public_key": null,
      "account_number": "0",
      "sequence": "0"
    }
  }
}
```

### Buy another name for an user, create the raw transaction

Method: Post  
Request: http://localhost:1317/nameservice/names    
Request-Body:  
```json
{
 "base_req":{"from":"'$key","chain_id":"namechain"},
 "name":"jack1.id",
 "amount":"5nametoken",
 "buyer":"'$key"
}
```
Curl-Request:
```bash
curl -XPOST -s http://localhost:1317/nameservice/names --data-binary '{"base_req":{"from":"$key","chain_id":"namechain"},"name":"jack1.id","amount":"5nametoken","buyer":"$key"}'
```


Reponse:

```json
{
  "type":"cosmos-sdk/StdTx",
  "value":{"msg":[{"type":"nameservice/BuyName",
           "value":{"name":"jack1.id",
                    "bid":[{"denom":"nametoken","amount":"5"}],
                    "buyer":"cosmos15al7wpjtmj4cvfw4z7a3hu3aqed78jyrng770w"}}],
  "fee":{"amount":[],"gas":"200000"},
  "signatures":null,"memo":""}
}
```

### Set the data for that name that jack just bought

Method: Post  
Request: http://localhost:1317/nameservice/names  
Request-Body:

```json
 {"base_req":{"from":"$key","chain_id":"namechain"},
   "name":"jack1.id",
   "value":"8.8.4.4",
   "owner":"$key"}
```
curl:
```bash
 curl -XPUT -s http://localhost:1317/nameservice/names --data-binary '{"base_req":{"from":"$key","chain_id":"namechain"},"name":"jack1.id","value":"8.8.4.4","owner":"$key"}'

```

Reponse:
```json
 {"type":"cosmos-sdk/StdTx",
   "value":{"msg":[{"type":"nameservice/SetName",
                    "value":{"name":"jack1.id","value":"8.8.4.4","owner":"cosmos13rks66u9dykmeewspj739wsh2pzgk95t35ca0v"}}],
                    "fee":{"amount":[],"gas":"200000"},
                    "signatures":null,"memo":""}}
  ```

### user1 buys from user2
Method: Post   
Request: http://localhost:1317/nameservice/names  
Request-Body
```json
{"base_req":{"from":"$key1","chain_id":"namechain"},
  "name":"jack1.id",
  "amount":"10nametoken",
  "buyer":"$key2"}
```
curl:
```bash
curl -XPOST -s http://localhost:1317/nameservice/names --data-binary '{"base_req":{"from":"$key1","chain_id":"namechain"},"name":"jack1.id","amount":"10nametoken","buyer":"$key2"}'
```
Reponse:
```json
{
   "type":"cosmos-sdk/StdTx",
   "value":{
      "msg":[
         {
            "type":"nameservice/BuyName",
            "value":{
               "name":"jack1.id",
               "bid":[
                  {
                     "denom":"nametoken",
                     "amount":"10"
                  }
               ],
               "buyer":"cosmos15al7wpjtmj4cvfw4z7a3hu3aqed78jyrng770w"
            }
         }
      ],
      "fee":{
         "amount":[

         ],
         "gas":"200000"
      },
      "signatures":null,
      "memo":""
   }
}
```

#### User1 no longer needs the name she bought from user2 and hence deletes it

Method: Delete
Request:http://localhost:1317/nameservice/names
Request-Body:
```json
{
   "base_req":{
      "from":"'$key'",
      "chain_id":"namechain"
   },
   "name":"jack1.id",
   "owner":"'$key'"
}
```
curl :
```bash
curl -XDELETE -s http://localhost:1317/nameservice/names --data-binary '{"base_req":{"from":"$key","chain_id":"namechain"},"name":"jack1.id","owner":"$key"}'
```
Reponse-Body:
```json
{
   "type":"cosmos-sdk/StdTx",
   "value":{
      "msg":[
         {
            "type":"nameservice/BuyName",
            "value":{
               "name":"jack1.id",
               "bid":[
                  {
                     "denom":"nametoken",
                     "amount":"10"
                  }
               ],
               "buyer":"$key"
            }
         }
      ],
      "fee":{
         "amount":[

         ],
         "gas":"200000"
      },
      "signatures":null,
      "memo":""
   }
}
```
