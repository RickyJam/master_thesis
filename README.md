# master_thesis

# Setup minikube
* ```minikube start```
* ```kubectl label nodes minikube size=large```
* ```kubectl config set-context minikube --namespace=master-thesis```
* creare mouth data:
  * ```minikube ssh```
  * ```sudo mkdir /mnt/data```
* __Loading dataset in Minikube__
* ```kubectl apply -k src/```
* verifiche per accertarsi che il sistema sia funzionante 

## Loadding dataset in minikube

### Generazione dataset json 
* la cartella con i dataset deve essere nel progetto in primis
* i file devon essere in formato .json per essere importabili dal mongo, quindi:
  * o si convertono a mano, ma è un processo lungo e tedioso
  * si sfrutta lo script js_converter:
    * lo script prevede di avere nella directory Dataset/csv i file da convertire (organizzati per casa)
    * posizionarsi nella root del progetto master_thesis
    * eseguire il comando ```node js_converter/src/converter.js ./Datasets/csv ./Datasets/json```

### Loading Effettivo in minikube
* una volta che i dati sono in formato JSON, è necessario in primis montare il mount point su minikube:
  * ```minikube start```
  * ```minikube mount Datasets/json:/mnt/dataset```
* se si vuole verificare basta:
  * entrare in ssh su minikube ```minikube ssh```
  * provare a vedere il contenuto della directory montata ```ls /mnt/dataset```
  * se non dovesse funzionare, provare a giocare con questo comando```sudo systemctl daemon-reload```
  * eventualmente verificare anche i permessi della directory locale...

### Popolare DB mongo
//TODO: completare questa sezione 
* per ora, si deve fare a mano:
  * entro nel pod interessato: ```kubectl exec -it mongodb-test-0 -- bash```
  * __bisonga creare l'utente homeOwner__:
    * ```mongo```
    * ```use admin```
    * ```db.auth("admin", "password")```
    * ```use master```
    * ```db.createUser({user: "homeOwner", pwd: "password", roles: [{role: "readWrite", db: "master"}]})```
  * connessione con autenticazione a db: ```mongo -u homeOwner -p password --authenticationDatabase master```
  * import dataset con autenticazione: ```mongoimport -u admin -p password --db master --collection measurements --file dataset/HomeA/2014/HomeA-meter2_2014.json --jsonArray```