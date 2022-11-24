### Servizi
* Ruoli Previsiti:
  * HomeOwner: proprietario casa
  * Resident: abitante (di una casa ovviamente) //TODO: non era previsto nello scenario iniziale, ma sarebbe aggiungibile?
  * UnderageResident: abitate minorenne (di una casa)
  * Tenant: affittuario (come HomeOwner ma a tempo limitato) //TODO: siamo sicuri sia corretto TENANT?   
  * ResidenceOwner: propeitario del residence, vede dati aggregati relativi alle varie case
  * CleaningCompanyEmployee: impiegato impresa di pulizie, accesso a tempo 

* CASA SINGOLA:
  * generici: 
    * Date & Time -- (rilevante per <Tenant> e <CleaningCompanyEmployee>)
    * Total Usage kW -- <HomeOwner>,<Tenant>
    * Generation kW -- <HomeOwner>,<Tenant>
    * Solar(pannelli solari) kW -- <HomeOwner>,<Tenant>
    * Basement(consumo seminterrato) kW -- <HomeOwner>,<Tenant> (superfluo)
  * cucina:
    * Refrigerator(Frigorifero) kW --  <HomeOwner>,<Tenant>,<Resident>,<UnderageResident>
    * Microwave(micronde) kW --  <HomeOwner>,<Tenant>,<Resident>,<UnderageResident>
    * Furnace (forno) kW --  <HomeOwner>,<Tenant>,<Resident>
    * Kit_StoveWall (fornello a muro) kW -- <HomeOwner>,<Tenant>,<Resident>
  * bagno/lavanderia:
    * WaterHeater(caldaia) kW -- <HomeOwner>,<Tenant>,<Resident>
    * Dishwasher_Disposal (lavastoviglie) kW -- <HomeOwner>,<Tenant>,<Resident>
    * Kit_SinkWall (lavello) kW -- <HomeOwner>,<Tenant>
    * Washing_Machine (lavatrice) kW -- <HomeOwner>,<Tenant>,<Resident>
    * Dryer (asciugatrice) kW -- <HomeOwner>,<Tenant>,<Resident>

  * WaterHeater3 (caldaia o scalda bango?? una per bagno?) kW -- <HomeOwner>,<Tenant>,<Resident>
  * WaterHeater2 (caldaia o scalda bango?? una per bagno?) kW -- <HomeOwner>,<Tenant>,<Resident>
  * WaterHeater1 (caldaia o scalda bango?? una per bagno?) kW -- <HomeOwner>,<Tenant>,<Resident>
  * Master_Bdrm kW -- <HomeOwner>,<Tenant> [??????????]
  * Front_Bdrm kW -- <HomeOwner>,<Tenant> [??????????]
  * Family_Rm kW -- <HomeOwner>,<Tenant> [??????????]
  * Kit_Half-Bath_Foyer kW -- <HomeOwner>,<Tenant> [??????????]
  * Guest_Bdrm_SmkDet kW -- <HomeOwner>,<Tenant>  [??????????]
  * Phase_B kW -- <HomeOwner>,<Tenant>    [??????????]
  * Phase_A kW -- <HomeOwner>,<Tenant>    [??????????]

* SERVIZI:
  * Casa: 
    * ```/residence/:home```
      * Permette di ottenere le metriche di tutti i sensori relativi alla casa richiesta.
      * I dati ritornati sono:
        * tutte le ultime metriche
        * Not Authorized ("niente", oggetto vuoto) se l'utente non è autorizzato.
      * Chi può accedere: HomeOwner, Resident, Tenant
    
    * ```/residence/:home/kitchen```
      * Permette di ottenere le metriche di tutti i sensori relativi alla casa richiesta.
      * I dati ritornati sono:
        * le ultime metriche relative a elettrodomestici da cucina (forno, frigorifero, micronde, lavastoviglie)
        * Not Authorized
      * Chi può accedere: HomeOwner, Resident, Tenant, UnderageResident

    * ```/residence/:home/laundry```
      * Permette di ottenere le metriche di tutti i sensori relativi alla casa richiesta.
      * I dati ritornati sono:
        * le ultime metriche relative a elettrodomestici da lavanderia (asciugatrice, lavatrice, caldaia)
        * Not Authorized
      * Chi può accedere: HomeOwner, Resident, Tenant, UnderageResident, CleaningCompanyEmployee (nella fascia oraria dedicata)

  * Generici:
    * ```/residence```
      * Permette di ottenere le metriche di tutti i sensori di tutte le case del residance.
      * I dati ritornati sono:
        * tutte le ultime metriche
        * Not Authorized se l'utente non è autorizzato.
      * Chi può accedere: ResidenceOwner

    * ```/residence/kitchens```
      * Permette di ottenere i consumi energetici medi delle cucine di tutte le case.
      * I dati ritornati sono:
        * i dati indicati calcolati sull'ultima settimana
        * Not Authorized se l'utente non è autorizzato.
      * Chi può accedere: ResidenceOwner

    * ```/residence/laundry```
      * Permette di ottenere i consumi energetici medi e massimi dalle lavanderie di tutte le case.
      * I dati ritornati sono:
        * i dati indicati calcolati sull'ultima settimana
        * Not Authorized se l'utente non è autorizzato.
      * Chi può accedere: ResidenceOwner, CleaningCompanyEmployee (nella fascia oraria dedicata)

    * ```/residence/power```
      * Permette di ottenere i consumi energetici totali ed i KW prodotti da tutte le case.
      * I dati ritornati sono:
        * i dati indicati calcolati sull'ultima settimana
        * Not Authorized se l'utente non è autorizzato.
      * Chi può accedere: ResidenceOwner