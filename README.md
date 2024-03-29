# master_thesis

# Setup minikube
* __NOTA__: questa sezione viene svolta dal comando ***init_minikube.sh*** ed è necessaria solo una volta
* ```minikube start```
* ```kubectl label nodes minikube size=large```
* ```kubectl config set-context minikube --namespace=master-thesis```
* copiare file in minikube:
  * creare directory remota: ```ssh -t -i ~/.minikube/machines/minikube/id_rsa -p 51119 docker@127.0.0.1 "sudo mkdir /mnt/csv_dataset && sudo chmod 777 /mnt/csv_dataset"```
  * copia dei file effettiva: ```scp -i ~/.minikube/machines/minikube/id_rsa -P 51119 -r Datasets/csv/* docker@127.0.0.1:/mnt/csv_dataset```
* creare mouth data:
  * ```ssh -t -i ~/.minikube/machines/minikube/id_rsa -p 55988 docker@127.0.0.1 "sudo mkdir /mnt/data"```
  * ```ssh -t -i ~/.minikube/machines/minikube/id_rsa -p 55988 docker@127.0.0.1 "sudo mkdir /mnt/users"```
* creare tutte le immagini docker seguendo il metodo sotto
* installare prometheus se serve controllare le metriche del sistema
* eseguire i job di caricamento dei dati.

## Loading dataset in minikube

### Nuovo metodo:
* assicurarsi che il db master esista e ci sia l'utente admin creato al suo interno
* lanciare il Job `dataset_loader` per caricare il dataset nel DB
* lanciare il JOB `users_loader` per caricare utenti e autorizzazioni nel db degli utenti

## Metriche
* installare Helm ```brew install helm``` (usa sola volta)

### MODO 1:
* ```helm repo add prometheus-community https://prometheus-community.github.io/helm-charts```
* ```helm repo update```
* verificare di aver reato almeno il namespace
* installrare con: `helm install prometheus prometheus-community/kube-prometheus-stack`
* Console prometheus (inutile): ```minikube service prometheus-kube-prometheus-prometheus -n master-thesis```
* Console grafana (utile): ```minikube service prometheus-grafana -n master-thesis```
* user: admin    pwd: prom-operator
* scegliere la dashboard: Node Exporter / USE Method / Node

### MODO 2: 
#### Prometheus
* da esso installare __prometheus__, pod in grado di leggere le caratteristiche del cluster (Minikube)
* utilizzare ***Lens*** (da scaricare e configurare) per visualizzare i dati raccolti da __prometheus__
  * volendo si può usare grafana, ma non è propriamente cosigliato
* Promethesus: (da fare tutte le vlte che il container minikube viene ricreato)
  * istallare prometheus: ```helm install prometheus prometheus-community/prometheus```
  * aprire lens e selezionare il cluster minikube.
  * ```kubectl expose service prometheus-server --type=NodePort --target-port=9090 --name=prometheus-server-np```
  * ```minikube service prometheus-server-np -n master-thesis --url```

#### Grafana
* ```helm repo add grafana https://grafana.github.io/helm-charts```
* ```helm install grafana grafana/grafana```
* ```kubectl expose service grafana --type=NodePort --target-port=3000 --name=grafana-np```
* ```kubectl get secret --namespace master-thesis grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo```
* ```minikube service grafana-np -n master-thesis --url``

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
