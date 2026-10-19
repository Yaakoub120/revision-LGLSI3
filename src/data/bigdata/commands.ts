import type { CommandEntry } from '@/types/course';

// Anti-sèche complète : toutes les commandes du cours Big Data, classées par module.
export const bigdataCommands: CommandEntry[] = [
  // ─── Module 3 : HDFS ───
  { cmd: 'hdfs dfs -ls /user', module: 3, category: 'HDFS — navigation', desc: 'Liste le contenu d’un dossier HDFS', example: 'hdfs dfs -ls /user' },
  { cmd: 'hdfs dfs -mkdir', module: 3, category: 'HDFS — navigation', desc: 'Crée un dossier sur HDFS', example: 'hdfs dfs -mkdir nom_dossier_hdfs' },
  { cmd: 'hdfs dfs -put', module: 3, category: 'HDFS — transferts', desc: 'Copie un fichier du système local vers HDFS', example: 'hdfs dfs -put fichier_en_local destination_sur_hdfs' },
  { cmd: 'hdfs dfs -copyToLocal', module: 3, category: 'HDFS — transferts', desc: 'Copie un fichier de HDFS vers le système local', example: 'hdfs dfs -copyToLocal fichier_hdfs destination_en_local' },
  { cmd: 'hdfs dfs -cat', module: 3, category: 'HDFS — lecture', desc: 'Affiche le contenu d’un fichier stocké sur HDFS', example: 'hdfs dfs -cat fichier_sur_hdfs' },
  { cmd: 'hdfs dfs -cp', module: 3, category: 'HDFS — manipulation', desc: 'Copie un fichier au sein de HDFS', example: 'hdfs dfs -cp fichier_sur_hdfs destination_sur_hdfs' },
  { cmd: 'hdfs dfs -mv', module: 3, category: 'HDFS — manipulation', desc: 'Déplace un fichier au sein de HDFS', example: 'hdfs dfs -mv fichier_sur_hdfs destination_sur_hdfs' },
  { cmd: 'hdfs dfs -rm', module: 3, category: 'HDFS — manipulation', desc: 'Supprime un fichier sur HDFS', example: 'hdfs dfs -rm fichier_sur_hdfs' },
  { cmd: 'hdfs dfs -du -h', module: 3, category: 'HDFS — lecture', desc: 'Affiche la taille des dossiers/fichiers HDFS (format lisible)', example: 'hdfs dfs -du -h dossier_sur_hdfs' },
  { cmd: 'hdfs dfs -setrep -R -w 3', module: 3, category: 'HDFS — réplication', desc: 'Change le facteur de réplication d’un fichier (récursif, confirmation) — défaut HDFS : 3', example: 'hdfs dfs -setrep -R -w 3 fichier_sur_hdfs' },

  // ─── Module 7 : Sharding MongoDB — étape 1 (config servers) ───
  { cmd: 'mongod --configsvr --replSet configReplSet --port 27019 --dbpath /data/conf1', module: 7, category: 'Sharding — étape 1', desc: 'Lance le 1er serveur de configuration en ReplicaSet', example: 'mongod --configsvr --replSet configReplSet --port 27019 --dbpath /data/conf1' },
  { cmd: 'mongod --configsvr --replSet configReplSet --port 27020 --dbpath /data/conf2', module: 7, category: 'Sharding — étape 1', desc: 'Lance le 2e serveur de configuration en ReplicaSet', example: 'mongod --configsvr --replSet configReplSet --port 27020 --dbpath /data/conf2' },
  { cmd: 'mongo --port 27019 + rs.initiate();', module: 7, category: 'Sharding — étape 1', desc: 'Se connecte au config server et initie le ReplicaSet configReplSet', example: 'mongo --port 27019\nrs.initiate();' },
  { cmd: 'rs.add("local:27020");', module: 7, category: 'Sharding — étape 1', desc: 'Ajoute le deuxième serveur de configuration au ReplicaSet', example: 'rs.add("local:27020");' },

  // ─── Module 7 : Sharding — étape 2 (shards) ───
  { cmd: 'mongod --shardsvr --replSet sh1 --port 27031 --dbpath /data/sh1', module: 7, category: 'Sharding — étape 2', desc: 'Lance le serveur shard sh1 en ReplicaSet', example: 'mongod --shardsvr --replSet sh1 --port 27031 --dbpath /data/sh1' },
  { cmd: 'mongod --shardsvr --replSet sh2 --port 27032 --dbpath /data/sh2', module: 7, category: 'Sharding — étape 2', desc: 'Lance le serveur shard sh2 en ReplicaSet', example: 'mongod --shardsvr --replSet sh2 --port 27032 --dbpath /data/sh2' },
  { cmd: 'mongo --port 27031 --eval "rs.initiate()"', module: 7, category: 'Sharding — étape 2', desc: 'Initie le ReplicaSet du shard 1 (idem sh2 sur 27032)', example: 'mongo --port 27031 --eval "rs.initiate()"' },

  // ─── Module 7 : Sharding — étape 3 (mongos) ───
  { cmd: 'mongos --configdb configReplSet/localhost:27019 --port 27017', module: 7, category: 'Sharding — étape 3', desc: 'Lance le routeur mongos en spécifiant le serveur de configuration', example: 'mongos --configdb configReplSet/localhost:27019 --port 27017' },
  { cmd: 'sh.addShard("sh1/localhost:27031");', module: 7, category: 'Sharding — étape 3', desc: 'Ajoute le shard 1 au cluster (via le mongos, port 27017)', example: 'mongo --port 27017\nsh.addShard("sh1/localhost:27031");\nsh.addShard("sh2/localhost:27032");' },
  { cmd: 'sh.addShard("sh2/localhost:27032");', module: 7, category: 'Sharding — étape 3', desc: 'Ajoute le shard 2 au cluster', example: 'sh.addShard("sh2/localhost:27032");' },

  // ─── Module 7 : Sharding — étape 4 (distribution) ───
  { cmd: 'use testDB;', module: 7, category: 'Sharding — étape 4', desc: 'Crée/bascule sur la base de données testDB', example: 'use testDB;' },
  { cmd: 'sh.enableSharding("testDB");', module: 7, category: 'Sharding — étape 4', desc: 'Active le sharding sur la base testDB', example: 'sh.enableSharding("testDB");' },
  { cmd: 'db.createCollection("test");', module: 7, category: 'Sharding — étape 4', desc: 'Crée la collection test à distribuer', example: 'db.createCollection("test");' },
  { cmd: 'db.test.createIndex({"_id": 1});', module: 7, category: 'Sharding — étape 4', desc: 'Crée l’index sur la future clé de sharding', example: 'db.test.createIndex({"_id": 1});' },
  { cmd: 'sh.shardCollection("testDB.test", {"_id": 1});', module: 7, category: 'Sharding — étape 4', desc: 'Partitionne la collection test sur la clé _id', example: 'sh.shardCollection("testDB.test", {"_id": 1});' },
  { cmd: 'sh.status()', module: 7, category: 'Sharding — vérification', desc: 'Vérifie l’état du sharding (shards, bases, chunks)', example: 'mongo --port 27017 --eval "sh.status()"' },
];
