import threading
from src import users, user_thread

users_list = users.users

if __name__ == "__main__":
    user_threads = []

    for user in users_list:
        t = threading.Thread(target=user_thread.run, args=(user,))
        t.start()
        user_threads.append(t)
    

    for thread in user_threads:
        thread.join()


    print("simulation completed")
