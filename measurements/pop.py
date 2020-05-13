import csv
import sys

csv.field_size_limit(sys.maxsize)

def update_user(user, decay):
    if(user['coins'] < 0):
        user['coins'] = 0
    user['prestige'] += user['coins'] - decay * user['prestige']
    if(abs(user['prestige'] - (user['coins'] /decay)) < 1):
        user['prestige'] = user['coins'] /decay
    
    return user

if(len(sys.argv) < 2):
    print("Provide an input file")
    quit()

input_file = sys.argv[1]


for decay in [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]:
    users = {}
    block = 0
    next_block = 0
    prev_block = 0
    list_len = []
    with open(input_file, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            from_n = row['from']
            if(row['to'] != ''):
                to_n = row['to']
            else:
                to_n = row['contractAddress']
            value = int(row['value']) /1000000000000
            next_block = int(row['blockNumber'])

            for i in range(block, next_block):
                next_users = {}
                list_len.append(len(users))
                #print("Block", i, "list", len(users))
                for id, user in users.items():
                    #print("Updating user", id, user)
                    user = update_user(user, decay)
                    #print("Updated", id, user)
                    if(user['prestige'] == user['coins'] / decay):
                        pass#print("User", id, "reached his static value - removing from the list")
                    else:
                        next_users[id] = user
                users = next_users
            block = next_block
            if from_n not in users:
                user = {}
                user['coins'] = 1000000
                user['prestige'] = 0
                users[from_n] = user
            if to_n not in users:
                user = {}
                user['coins'] = 0
                user['prestige'] = 0
                users[to_n] = user

            users[from_n]['coins'] -= value
            users[to_n]['coins'] += value
    
        
    #print(list_len)
    print("decay", decay)
    print("max", max(list_len))
    print("avg", sum(list_len) / len(list_len))