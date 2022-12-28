import requests
import random

IS_K8S = False

LOCAL_HOST = 'localhost:3000'
K8S_HOST = 'resad'  # TODO: completare

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


def __buildRandomUrl(user):
    url = urls[random.randint(0, len(urls))](user["home"][0])
    return f'{__getHostUrl()}{url}'


def __buildParams(user: dict) -> dict:
    return {'userId': user['userId']}


def __doRandomRequest(user: dict) -> None:
    try:
        url = __buildRandomUrl(user)
        requests.get(url, params=__buildParams(user))
    except:
        print('request failed')


def doRequest(user: dict):
    __doRandomRequest(user)
