import threading
from src import users 

users_list = users.users

def executor(user):
    print(user)

if __name__ == "__main__":
    users_process = []

    for user in users_list:
        t = threading.Thread(target=executor, args=(user,))
        users_process.append(t)
        t.start()
    
    # TODO: quanto andare a avanti?
