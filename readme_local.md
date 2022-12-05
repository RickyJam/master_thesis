# TODO piacevoli da fare
* provare ad usare un deployment: (magari non necessario però eh)
* fare replace dei nomi dei campi prtima di inserirli


* cose notate:
  * devo mettere in primis una label sul minikube per poter usare la node affinity dichiarata in alcuni punti
     --> ```kubectl label nodes minikube size=large```
  * poi devo creare in minikube la folder data!
     --> ```ssh minikube```
     --> ```sudo mkdir /mnt/FOLDER_DA_CREARE```
  * devo montare la cartella dataset: ```minikube mount Datasets /mnt/dataset``` 
  mongoimport --db dbName --collection collectionName --file fileName.json --jsonArray



# troubleshooting
* caso estremo: ```minikube delete```


# Usefull query
* creazione utente:
   * db.createUser({user: "admin", pwd: "password", roles: [{role: "readWrite", db: "master"}]})
   * /dataset/HomeA/2014/HomeA-meter2_2014.json

* eliminazione utente:
  * db.dropUser("mynewuser", {w: "majority", wtimeout: 4000})


## Mongo locale come processo:
* eseguire start_mongo
* eseguire ```mongosh``` e poi ```use master```
* eseguire ```db.createUser({user: "admin", pwd: "password", roles: [{role: "readWrite", db: "master"}]})```
* uscire scrivendo ```exit```
* eseguire il comando: ```mongoimport -u admin -p password --db master --collection homeA --file dataset/HomeA/2014/HomeA-meter2_2014.json --jsonArray``` per importare i dati.
* db popolato!

* per spegnere entrare e scrivere ```shutdown```
