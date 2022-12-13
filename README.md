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
  * __NOTA__: Questa sezione è stata automatizzata nello script di avvio
  * entro nel pod interessato: ```kubectl exec -it mongodb-statefulset-0 -- bash```
  * __bisonga creare l'utente admin__:
    * ```mongo```
    * ```use admin```
    * ```db.auth("admin", "password")```
    * ```use master```
    * ```db.createUser({user: "admin", pwd: "password", roles: [{role: "readWrite", db: "master"}]})```
  * connessione con autenticazione a db: ```mongo -u admin -p password --authenticationDatabase master```
  * import dataset con autenticazione: ```mongoimport -u admin -p password --db master --collection measurements --file dataset/HomeA/2014/HomeA-meter2_2014.json --jsonArray```


### Metriche
* installare Helm ```brew install helm``` (usa sola volta)
* da esso installare __prometheus__, pod in grado di leggere le caratteristiche del cluster (Minikube)
* utilizzare ***Lens*** (da scaricare e configurare) per visualizzare i dati raccolti da __prometheus__
  * volendo si può usare grafana, ma non è propriamente cosigliato
* Promethesus: (da fare tutte le vlte che il container minikube viene ricreato)
  * istallare prometheus: ```helm install prometheus prometheus-community/prometheus```
  * aprire lens e selezionare il cluster minikube.

## Node Server avvio
* __NOTA__: la shell di esecuzione deve essere la stessa
* eseguire il comando ```minikube docker-env```
  * eseguire il comando suggerito ```eval $(minikube -p minikube docker-env)```
    * per info serve a condividere il registro delle immagini di docker con quello di minikube,
      così non devo caricare le immagini su registri remoti
* creare l'immagine: 
  * posizionarsi in 'components/residence_server'
  * eseguire ```docker build . -t node-server```
  * ora dovresti vedere l'immagine nella lista delle immagini docker e minikube
* esegui il deploy e esegui: ```minikube service --url node-server-service -n master-thesis``` per ottenere url


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
