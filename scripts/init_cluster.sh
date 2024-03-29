#!/bin/sh

# this value dynamicaly change at each minikube restart 
PORT=12345

# creazione folder dataset_csv
ssh -t -i ~/.minikube/machines/minikube/id_rsa -p $PORT docker@127.0.0.1 "sudo mkdir /mnt/csv_dataset && sudo chmod 777 /mnt/csv_dataset"
scp -i ~/.minikube/machines/minikube/id_rsa -P $PORT -r Datasets/csv/* docker@127.0.0.1:/mnt/csv_dataset

# creazione mount data db-users
ssh -t -i ~/.minikube/machines/minikube/id_rsa -p $PORT docker@127.0.0.1 "sudo mkdir /mnt/users"

# creazione mount data db-data
ssh -t -i ~/.minikube/machines/minikube/id_rsa -p $PORT docker@127.0.0.1 "sudo mkdir /mnt/data"