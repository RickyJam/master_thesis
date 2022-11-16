#!/bin/sh

# start Minikube container
minikibe start

# Setting label used by storageClasss
kubectl label nodes minikube size=large

# using correct context
kubectl config set-context minikube --namespace=master-thesis

# creazione folder dataset
ssh -t -i ~/.minikube/machines/minikube/id_rsa -p 55988 docker@127.0.0.1 "sudo mkdir /mnt/dataset && sudo chmod 777 /mnt/dataset"

# creazione mount data
ssh -t -i ~/.minikube/machines/minikube/id_rsa -p 55988 docker@127.0.0.1 "sudo mkdir /mnt/data"