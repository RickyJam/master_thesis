#!/bin/sh

# this value dynamicaly change at each minikube restart 
PORT=12345

# start Minikube container
minikibe start

# Setting label used by storageClasss
kubectl label nodes minikube size=large

# using correct context
kubectl config set-context minikube --namespace=master-thesis

# creazione folder dataset -- USARE JOB
# ssh -t -i ~/.minikube/machines/minikube/id_rsa -p $PORT docker@127.0.0.1 "sudo mkdir /mnt/dataset && sudo chmod 777 /mnt/dataset"

# creazione mount data db-users
ssh -t -i ~/.minikube/machines/minikube/id_rsa -p $PORT docker@127.0.0.1 "sudo mkdir /mnt/users"

# creazione mount data db-data
ssh -t -i ~/.minikube/machines/minikube/id_rsa -p $PORT docker@127.0.0.1 "sudo mkdir /mnt/data"