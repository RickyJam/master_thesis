import threading
from datetime import datetime
import random
from src import http_helper

SECONDS_PER_MINUTE: int = 60
MILLIS_PER_SECOND: int = 1000

N_REQS_PER_MINUTE: int = 10


def __printCurrentTime() -> None:
    current_time = datetime.now().strftime("%H:%M:%S")
    print(f'Current Time ={current_time}')


def __getSecondsToWait() -> float:
    return SECONDS_PER_MINUTE / N_REQS_PER_MINUTE


def __randomWait(event: threading.Event):
    event.wait(random.randint(0, 9))

def run(user: dict, event: threading.Event) -> None:
    __randomWait(event)

    millisToWait = __getSecondsToWait()

    __printCurrentTime()

    for i in range(0, N_REQS_PER_MINUTE):
        print(f'Esecuzione request {i} from: {user["userId"]}')

        http_helper.doRequest(user)

        delta = random.randint(1, 4)
        event.wait(millisToWait+delta)

    __printCurrentTime()

    return
