import requests
import threading
from datetime import datetime
import random

SECONDS_PER_MINUTE: int = 60
MILLIS_PER_SECOND: int = 1000

N_REQS_PER_MINUTE: int = 10


def printCurrentTime() -> None:
    current_time = datetime.now().strftime("%H:%M:%S")
    print(f'Current Time ={current_time}')


def __getSecondsToWait() -> float:
    return SECONDS_PER_MINUTE / N_REQS_PER_MINUTE


def randomWait(event: threading.Event):
    event.wait(random.randint(0, 9))


def run(user: dict, event: threading.Event) -> None:
    randomWait(event)

    millisToWait = __getSecondsToWait()

    printCurrentTime()

    for i in range(0, N_REQS_PER_MINUTE):
        print(f'Esecuzione request {i} from: {user["userId"]}')
        printCurrentTime()
        delta = random.randint(1, 4)
        event.wait(millisToWait+delta)

    printCurrentTime()

    return
