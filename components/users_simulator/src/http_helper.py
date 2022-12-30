import requests
import random

IS_K8S = False

LOCAL_HOST = 'localhost:3000'
K8S_HOST = 'completare'  # va scritto di volta in volta, cambia ad ogni avvio del cluster

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
    if IS_K8S:
        return f'http://{K8S_HOST}'
    else:
        return f'http://{LOCAL_HOST}'


def __buildRandomUrl(home):
    url = urls[random.randint(0, len(urls) - 1)](home)
    return f'{__getHostUrl()}{url}'


def __buildParams(userId: str) -> dict:
    return {'userId': userId}


def __doRandomRequest(user: dict) -> None:
    home = (user["home"][0])
    userId = user['userId']
    url = __buildRandomUrl(home)
    try:
        requests.get(url, params=__buildParams(userId))
    except:
        print(f'request: \'{url}\' failed')


def doRequest(user: dict):
    __doRandomRequest(user)
