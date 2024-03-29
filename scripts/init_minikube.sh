#!/bin/sh

# start Minikube container
minikube start

# Setting label used by storageClasss
kubectl label nodes minikube size=large

# using correct context
kubectl config set-context minikube --namespace=master-thesis