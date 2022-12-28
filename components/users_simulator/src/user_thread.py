import requests
import threading

def run(user: dict, event: threading.Event):
    print(user)
    event.wait(1)
    
    # TODO: definire un exit point da qui
