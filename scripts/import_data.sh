#!/bin/sh

import_mongo_file() {
    DB_MASTER="master"
    MONGO_MASTER_USERNAME="admin"
    MONGO_MASTER_PASSWORD="password"
    json_file=$1
    collection=$2
    mongoimport -u $MONGO_MASTER_USERNAME -p $MONGO_MASTER_PASSWORD --db $DB_MASTER --collection $collection --file $json_file --jsonArray;
}

iterate_json_file() {
    year_folder=$1
    collection=$2
    ls -1 $year_folder | while read json_file; do import_mongo_file $year_folder/$json_file $collection; done
}

iterate_year_folder() {
    home_folder=$1
    collection=$2
    ls -1 $home_folder | while read year_folder; do iterate_json_file $home_folder/$year_folder $collection; done
}

HOME_A_DATA_FILE="Datasets/json/HomeA"
iterate_year_folder $HOME_A_DATA_FILE "homeA"

HOME_A_DATA_FILE="Datasets/json/HomeB"
iterate_year_folder $HOME_A_DATA_FILE "homeB"

HOME_A_DATA_FILE="Datasets/json/HomeC"
iterate_year_folder $HOME_A_DATA_FILE "homeC"

HOME_A_DATA_FILE="Datasets/json/HomeD"
iterate_year_folder $HOME_A_DATA_FILE "homeD"

HOME_A_DATA_FILE="Datasets/json/HomeE"
iterate_year_folder $HOME_A_DATA_FILE "homeE"

HOME_A_DATA_FILE="Datasets/json/HomeF"
iterate_year_folder $HOME_A_DATA_FILE "homeF"