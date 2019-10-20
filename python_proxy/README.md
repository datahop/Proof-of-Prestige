## start

Run the command :```python app.py```  
This run a flask app at ```0.0.0.0:5000```


## execute curl commands

### get transfer id

```bash
curl  0.0.0.0:5000/transfer  
```

### get transfer Information

```bash
curl  -X POST --header "transferid:cosmos10q3p8argpsuam0ylqmh6qwj2k444htrq96dshccosmos1m08557vdl5wkc7yagj5w0ak8w3vmf7ha9dfqv0test.dat" 0.0.0.0:5000/transfers  
```

### transfer

```bash
curl -X POST --header "srcaddress:$(nscli keys show jack -a)" --header "dstaddress:$(nscli keys show alice -a)"  --header "prestige:4" --header "filename:test.dat" 0.0.0.0:5000/report
```
