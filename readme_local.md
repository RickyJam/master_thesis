# TODO piacevoli da fare
* minikube mount ma fisso, non da far partire sempre
* script per far partire il tutto .sh



* cose notate:
  * devo mettere in primis una label sul minikube per poter usare la node affinity dichiarata in alcuni punti
     --> ```kubectl label nodes minikube size=large```
  * poi devo creare in minikube la folder data!
     --> ```ssh minikube```
     --> ```sudo mkdir /mnt/FOLDER_DA_CREARE```
  * devo montare la cartella dataset: ```minikube mount Datasets /mnt/dataset``` 
  mongoimport --db dbName --collection collectionName --file fileName.json --jsonArray



  ```sudo mkdir /mnt/data```

# troubleshooting
* caso estremo: ```minikube delete```


# Usefull query
* creazione utente:
   * db.createUser({user: "homeOwner", pwd: "password", roles: [{role: "readWrite", db: "master"}]})
   * /dataset/HomeA/2014/HomeA-meter2_2014.json

* eliminazione utente:
  * db.dropUser("mynewuser", {w: "majority", wtimeout: 4000})