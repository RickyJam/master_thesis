from threading import Event, Thread
from src import users, user_worker

users_list = users.users

def main():
    event: Event = Event()
    user_threads: list = []
    users_results: list = [None] * len(users_list)

    for i in range(0, len(users_list)):
        t = Thread(target=user_worker.run, args=(users_list[i], event, users_results, i))
        t.start()
        user_threads.append(t)

    for thread in user_threads:
        thread.join()

    print("simulation completed")
    
    failed_request: int = 0

    for i in range(0, len(users_results)):
        print(f'User {i} results:')
        print(users_results[i])
        failed_request += users_results[i].count(60)
    print(f'Total failed requests: {failed_request}')


if __name__ == "__main__":
    main()
