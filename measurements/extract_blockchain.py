import web3
from web3 import Web3
#required middleware for poa (rinkeby) chain
from web3.middleware import geth_poa_middleware
import csv
import sys


ipc_path = '/home/krol/.ethereum/rinkeby/geth.ipc'
ipc_path = '/home/krol/blockchain/geth-linux-amd64-1.9.11-6a62fe39/data/geth.ipc'
ipc_path = '/space/michal/geth-linux-amd64-1.9.11-6a62fe39/data/geth.ipc'
wrong_tran = 0
all_tran = 0
user_tran = 0
contract_tran = 0
contract_create_tran = 0
data = []


if(len(sys.argv) > 1):
    ipc_path = sys.argv[1]


print("Connecting to IPC:", ipc_path)
my_provider = Web3.IPCProvider(ipc_path)
w3 = Web3(my_provider)
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

print("Syncing:", w3.eth.syncing)

if(len(sys.argv) > 2):
    latest_block = int(sys.argv[2])
else:
    latest_block = w3.eth.getBlock('latest')['number']

print("latest block:", latest_block)



with open('data_' + '3530244-' + '.csv', 'w') as output_file:
    fieldnames = ['blockNumber', 'from', 'gas', 'gasPrice', 'input', 'to', 'value', 'contractAddress']
    dict_writer = csv.DictWriter(output_file, fieldnames=fieldnames)
    dict_writer.writeheader()
    for block_num in range(3530244, 10000000):
        block = w3.eth.getBlock(block_num)
        tran_count = w3.eth.getBlockTransactionCount(block_num)
        #print("block", block)
        if(tran_count > 0):
            print(tran_count, "transactions in block", block_num)
            for tran_num in range(0, tran_count):
                tran = w3.eth.getTransactionByBlock(block_num, tran_num)
                receipt = w3.eth.getTransactionReceipt(tran['hash'])
                record = {}
                record['blockNumber'] = tran['blockNumber']
                record['from'] = tran['from']
                record['gas'] = tran['gas']
                record['gasPrice'] = tran['gasPrice']
                record['input'] = tran['input']
                record['to'] = tran['to']
                record['value'] = tran['value']
                record['contractAddress'] = receipt['contractAddress']
                all_tran += 1
                dict_writer.writerow(record)

