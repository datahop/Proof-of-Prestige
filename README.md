# SDK Application Tutorial

This repository contains the source code of the nameservice tutorial. To be changed into PoP. 

## Tutorial

**[Click here](./tutorial/README.md)** to access the tutorial. You can also view it on the [website](https://cosmos.network/docs/tutorial).

## Building and running the example

**[Click here](./tutorial/build-run.md)**  for instructions on how to build and run the code.

Translations:
- [中文](./README_cn.md)

## [Slides](https://docs.google.com/presentation/d/1aCMAdkVY-gfgnGNPTygwVk3o68czPQ_VYfvdMy9Ek5Q/edit?usp=sharing)


## Tasks for the Hackathon
* Add a UserInfo structure keeping user's coins and their prestige. Similar to the WhoIs structure defined in [types.go](https://github.com/datahop/sdk-application-tutorial/blob/master/x/nameservice/internal/types/types.go) (this includes implementing setters/getters)
* Update prestige values of users with every block (using [BeginBlock](https://tendermint.com/docs/spec/abci/abci.html#beginblock))
* Accept file transfer acknowledgments, verify them and update user prestige (DeliverTx()) 
* Make Tendermint to use prestige values instead of stake (where to store user’s prestige? Bank? Or custom structures? - need to consult Cosmos guys on that)

### State Modification Messages
* RegisterTransfer - register a transfer between 2 peers specifying sender, receiver, filename and an amount of exchanged prestige
