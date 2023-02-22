from threading import Event, Thread
import random
from src.http_helper import doAsyncRequest
from src.config import N_REQS_PER_MINUTE, MINUTES_EXECUTION

SECONDS_PER_MINUTE: int = 60


def __getSecondsToWait() -> float:
    return SECONDS_PER_MINUTE / N_REQS_PER_MINUTE


def __randomWait(event: Event):
    event.wait(random.randint(0, 9))


def run(user: dict, event: Event, users_results: list[list[int]], userIndex: int) -> None:
    totalRequests = N_REQS_PER_MINUTE * MINUTES_EXECUTION
    requestThreads: list[Thread] = []
    resultsList: list[int] = [None] * totalRequests

    __randomWait(event)

    millisToWait = __getSecondsToWait()

    for i in range(0, totalRequests):
        print(f'Esecuzione request {i} from: {user["userId"]}')

        requestThreads.append(doAsyncRequest(user, resultsList, i))

        event.wait(millisToWait)

    for thread in requestThreads:
        thread.join()

    users_results[userIndex] = resultsList
    return 
