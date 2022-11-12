* cose notate:
  * devo mettere in primis una label sul minikube per poter usare la node affinity dichiarata in alcuni punti
     --> ```kubectl label nodes minikube size=large```
  * poi devo creare in minikube la folder data!
     --> ```ssh minikube```
     --> ```sudo mkdir /mnt/FOLDER_DA_CREARE```
  * devo montare la cartella dataset: ```minikube mount Datasets /mnt/dataset``` 
  mongoimport --db dbName --collection collectionName --file fileName.json --jsonArray



  ```sudo mkdir /mnt/data```