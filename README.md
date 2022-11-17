# master_thesis

# Setup minikube
* __NOTA__: questa sezione viene svolta dal comando ***init_minikube.sh*** ed è necessaria solo una volta
* ```minikube start```
* ```kubectl label nodes minikube size=large```
* ```kubectl config set-context minikube --namespace=master-thesis```
* copiare file in minikube:
  * creare directory remota: ```ssh -t -i ~/.minikube/machines/minikube/id_rsa -p 55988 docker@127.0.0.1 "sudo mkdir /mnt/dataset && sudo chmod 777 /mnt/dataset"```
  * copia dei file effettiva: ```scp -i ~/.minikube/machines/minikube/id_rsa -P 55988 -r Datasets/json/* docker@127.0.0.1:/mnt/dataset```
* creare mouth data:
  * ```ssh -t -i ~/.minikube/machines/minikube/id_rsa -p 55988 docker@127.0.0.1 "sudo mkdir /mnt/data"```

## Loadding dataset in minikube

### Generazione dataset json 
* la cartella con i dataset deve essere nel progetto in primis
* i file devon essere in formato .json per essere importabili dal mongo, quindi:
  * o si convertono a mano, ma è un processo lungo e tedioso
  * si sfrutta lo script __js_converter__:
    * lo script prevede di avere nella directory Dataset/csv i file da convertire (organizzati per casa)
    * posizionarsi nella root del progetto master_thesis
    * eseguire il comando ```node js_converter/src/converter.js ./Datasets/csv ./Datasets/json```

### Popolare DB mongo
* per ora, si deve fare a mano:
  * //TODO: verificare lo script, se corretto viene fatto tutto a mano 
  * entro nel pod interessato: ```kubectl exec -it mongodb-test-0 -- bash```
  * __bisonga creare l'utente homeOwner__:
    * ```mongo```
    * ```use admin```
    * ```db.auth("admin", "password")```
    * ```use master```
    * ```db.createUser({user: "homeOwner", pwd: "password", roles: [{role: "readWrite", db: "master"}]})```
  * connessione con autenticazione a db: ```mongo -u homeOwner -p password --authenticationDatabase master```
  * import dataset con autenticazione: ```mongoimport -u admin -p password --db master --collection measurements --file dataset/HomeA/2014/HomeA-meter2_2014.json --jsonArray```




---
---
### vecchio metodo per caricare i dati nel cluster
* una volta che i dati sono in formato JSON, è necessario in primis montare il mount point su minikube:
  * ```minikube start```
  * ```minikube mount Datasets/json:/mnt/dataset```
* se si vuole verificare basta:
  * entrare in ssh su minikube ```minikube ssh```
  * provare a vedere il contenuto della directory montata ```ls /mnt/dataset```
  * se non dovesse funzionare, provare a giocare con questo comando```sudo systemctl daemon-reload```
  * eventualmente verificare anche i permessi della directory locale...
