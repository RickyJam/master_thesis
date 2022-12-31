import requests
import random
from src import config
from threading import Thread

urls: list = [
    # consumption
    lambda _: '/residence/power',
    lambda _: '/residence',
    lambda _: '/residence/kitchens',
    lambda _: '/residence/laundry',
    lambda _: '/residence/power',

    # sensors
    lambda home: f'/residence/{home}',
    lambda home: f'/residence/{home}/kitchens',
    lambda home: f'/residence/{home}/laundry',
]


def __getHostUrl() -> str:
    if config.IS_K8S:
        return f'http://{config.K8S_HOST}'
    else:
        return f'http://{config.LOCAL_HOST}'


def __buildRandomUrl(home: str):
    url: str = urls[random.randint(0, len(urls) - 1)](home)
    return f'{__getHostUrl()}{url}'


def __buildParams(userId: str) -> dict:
    return {'userId': userId}


def __homeDrawing(userHome: str) -> str:
    if random.randint(0, 1) < 0.8:
        return userHome
    else:
        availableHomes: list[str] = ['homeA', 'homeB', 'homeC', 'homeD', 'homeE', 'homeF']
        availableHomes.remove(userHome)
        return availableHomes[random.randint(0, len(availableHomes) - 1)]


def __doRandomRequest(user: dict) -> None:
    userHome = (user["home"][0])
    home = __homeDrawing(userHome)
    userId = user['userId']
    url = __buildRandomUrl(home)
    try:
        requests.get(url, params=__buildParams(userId))
    except:
        print(f'request: \'{url}\' failed')


def doRequest(user: dict):
    __doRandomRequest(user)

def doAsyncRequest(user: dict):
    Thread(target=doRequest, args=(user,))