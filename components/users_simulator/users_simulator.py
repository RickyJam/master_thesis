import threading
from src import users 

users_list = users.users

def executor(user):
    print(user)

if __name__ == "__main__":
    user_threads = []

    for user in users_list:
        t = threading.Thread(target=executor, args=(user,))
        t.start()
        user_threads.append(t)
    

    for thread in user_threads:
        thread.join()


    print("simulation completed")
    # TODO: quanto andare a avanti?
