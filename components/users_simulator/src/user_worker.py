from threading import Event
import random
from src.http_helper import doAsyncRequest
from src.config import N_REQS_PER_MINUTE

SECONDS_PER_MINUTE: int = 60
MILLIS_PER_SECOND: int = 1000

def __getSecondsToWait() -> float:
    return SECONDS_PER_MINUTE / N_REQS_PER_MINUTE


def __randomWait(event: Event):
    event.wait(random.randint(0, 9))


def run(user: dict, event: Event) -> None:
    __randomWait(event)

    millisToWait = __getSecondsToWait()

    for i in range(0, N_REQS_PER_MINUTE):
        print(f'Esecuzione request {i} from: {user["userId"]}')

        doAsyncRequest(user)

        event.wait(millisToWait)

    return
