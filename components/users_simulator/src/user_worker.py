import threading
import random
from src import http_helper, config

SECONDS_PER_MINUTE: int = 60
MILLIS_PER_SECOND: int = 1000

def __getSecondsToWait() -> float:
    return SECONDS_PER_MINUTE / config.N_REQS_PER_MINUTE


def __randomWait(event: threading.Event):
    event.wait(random.randint(0, 9))


def run(user: dict, event: threading.Event) -> None:
    __randomWait(event)

    millisToWait = __getSecondsToWait()

    for i in range(0, config.N_REQS_PER_MINUTE):
        print(f'Esecuzione request {i} from: {user["userId"]}')

        http_helper.doRequest(user)

        delta = random.randint(1, 4)
        event.wait(millisToWait+delta)

    return
