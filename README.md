# master_thesis

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
  * ```kubectl config set-context minikube --namespace=master-thesis```
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
  * eseguire autenticazione a db: ```-u "" -p "yoyr password" --authenticationDatabase "admin"```
  * eseguo il comando di import ```mongoimport --db master --collection measurements --file HomeA/2014/HomeA-meter2_2014.json --jsonArray```