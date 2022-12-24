# TODO piacevoli da fare
* provare ad usare un deployment: (magari non necessario però eh)

* residence_server:
    * possibilità di passare date come parametri, da controllare con date sull'utente 



# troubleshooting
* caso estremo: ```minikube delete```

## Mongo locale come processo:
* eseguire start_mongo
* eseguire ```mongosh``` e poi ```use master```
* eseguire ```db.createUser({user: "admin", pwd: "password", roles: [{role: "readWrite", db: "master"}]})```
* uscire scrivendo ```exit```
* eseguire ```npm start``` nell folder "components/dataset_loader"

* per spegnere entrare e scrivere ```shutdown```
