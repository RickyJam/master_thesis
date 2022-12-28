import requests

def doRequest(user: dict):
    params = {'userId': user["userId"]}
    try:
        response = requests.get('http://localhost:3000/residence/power', params=params)
        print(response)
    except:
        print("request failed")