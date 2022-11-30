#!/bin/sh

DB_MASTER="master"
MONGO_MASTER_USERNAME="admin"
MONGO_MASTER_PASSWORD="password"

COLLECTION="homeA"
DATA_FILE_2014="Datasets/json/HomeA/2014/"
DATA_FILE_2015="Datasets/json/HomeA/2015/"
DATA_FILE_2016="Datasets/json/HomeA/2016/"
cd $DATA_FILE_2014
ls -1 *.json | while read jsonfile; do mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $COLLECTION --file $jsonfile --jsonArray; done
cd $DATA_FILE_2015
ls -1 *.json | while read jsonfile; do mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $COLLECTION --file $jsonfile --jsonArray; done
cd $DATA_FILE_2016
ls -1 *.json | while read jsonfile; do mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $COLLECTION --file $jsonfile --jsonArray; done

COLLECTION="homeB"
DATA_FILE_2014="Datasets/json/HomeB/2014/"
DATA_FILE_2015="Datasets/json/HomeB/2015/"
DATA_FILE_2016="Datasets/json/HomeB/2016/"
cd $DATA_FILE_2014
ls -1 *.json | while read jsonfile; do mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $COLLECTION --file $jsonfile --jsonArray; done
cd $DATA_FILE_2015
ls -1 *.json | while read jsonfile; do mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $COLLECTION --file $jsonfile --jsonArray; done
cd $DATA_FILE_2016
ls -1 *.json | while read jsonfile; do mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $COLLECTION --file $jsonfile --jsonArray; done

COLLECTION="homeC"
DATA_FILE_2014="Datasets/json/HomeC/2014/"
DATA_FILE_2015="Datasets/json/HomeC/2015/"
DATA_FILE_2016="Datasets/json/HomeC/2016/"
cd $DATA_FILE_2014
ls -1 *.json | while read jsonfile; do mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $COLLECTION --file $jsonfile --jsonArray; done
cd $DATA_FILE_2015
ls -1 *.json | while read jsonfile; do mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $COLLECTION --file $jsonfile --jsonArray; done
cd $DATA_FILE_2016
ls -1 *.json | while read jsonfile; do mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $COLLECTION --file $jsonfile --jsonArray; done

COLLECTION="homeD"
DATA_FILE_2015="Datasets/json/HomeD/2015/"
DATA_FILE_2016="Datasets/json/HomeD/2016/"
cd $DATA_FILE_2015
ls -1 *.json | while read jsonfile; do mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $COLLECTION --file $jsonfile --jsonArray; done
cd $DATA_FILE_2016
ls -1 *.json | while read jsonfile; do mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $COLLECTION --file $jsonfile --jsonArray; done

COLLECTION="homeE"
DATA_FILE_2016="Datasets/json/HomeE/2016/"
cd $DATA_FILE_2016
ls -1 *.json | while read jsonfile; do mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $COLLECTION --file $jsonfile --jsonArray; done

COLLECTION="homeF"
DATA_FILE_2014="Datasets/json/HomeF/2014/"
DATA_FILE_2015="Datasets/json/HomeF/2015/"
DATA_FILE_2016="Datasets/json/HomeF/2016/"
cd $DATA_FILE_2014
ls -1 *.json | while read jsonfile; do mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $COLLECTION --file $jsonfile --jsonArray; done
cd $DATA_FILE_2015
ls -1 *.json | while read jsonfile; do mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $COLLECTION --file $jsonfile --jsonArray; done
cd $DATA_FILE_2016
ls -1 *.json | while read jsonfile; do mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $COLLECTION --file $jsonfile --jsonArray; done
