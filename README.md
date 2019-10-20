# DataHop Project (Team-34) for Diffusion'19 Hackathon
This projects contains 3 main modules:
* **An Android app** allowing users to exchange content using Bluetooth Low Energy and WiFi Direct.
* A Cosmos-based **blockchain implementation** using [Proof of Prestige](https://blockchain.ieee.org/technicalbriefs/september-2019/proof-of-prestige) reward scheme. 
* **Visualisation module** reading data from the blockchain and presenting them in a user-friendly way.

User exchange content they're interested in. After each p2p transfer, the sender can submti an acknowledgment to the blockchain and collect rewards. All the modules communicate using interoperable REST/JSON allowing for easy integration.



## Tasks for the Hackathon
* Add a UserInfo structure keeping user's coins and their prestige. Similar to the WhoIs structure defined in [types.go](https://github.com/datahop/sdk-application-tutorial/blob/master/x/nameservice/internal/types/types.go) (this includes implementing setters/getters)
* Update prestige values of users with every block (using [BeginBlock](https://tendermint.com/docs/spec/abci/abci.html#beginblock))
* Accept file transfer acknowledgments, verify them and update user prestige (DeliverTx()) 
* Make Tendermint to use prestige values instead of stake (where to store user’s prestige? Bank? Or custom structures? - need to consult Cosmos guys on that)

### State Modification Messages
* RegisterTransfer - register a transfer between 2 peers specifying sender, receiver, filename and an amount of exchanged prestige
