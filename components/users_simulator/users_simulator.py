from threading import Event, Thread
from src import users, user_worker

users_list = users.users

def main():
    event: Event = Event()
    user_threads: list = []

    for user in users_list:
        t = Thread(target=user_worker.run, args=(user, event,))
        t.start()
        user_threads.append(t)

    for thread in user_threads:
        thread.join()

    print("simulation completed")


if __name__ == "__main__":
    main()
