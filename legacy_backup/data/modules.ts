import { module1 } from './module1'
import { module2 } from './module2'
import { module3 } from './module3'
import { module4 } from './module4'
import { module5 } from './module5'
import type { Module } from './types'

export const modules: Module[] = [module1, module2, module3, module4, module5]

export type GlossaryTerm = { term: string; def: string; module?: string }

export const glossary: GlossaryTerm[] = [
  { term: 'Big Data', def: "Données tellement volumineuses et complexes qu'elles ne peuvent plus être traitées en un temps « raisonnable » ou « utile » par des systèmes constitués d'un seul nœud.", module: 'm1' },
  { term: 'Hadoop', def: "Ensemble de services et d'applications permettant de stocker et d'administrer des fichiers et des bases de données de très grande taille et de lancer des programmes de calcul sur ces données.", module: 'm1' },
  { term: 'Cluster (amas)', def: "Groupe de plusieurs machines sur lesquelles on répartit les données et les traitements.", module: 'm1' },
  { term: 'GFS (Google File System)', def: "Système de fichiers propriétaire inventé par Google en 2003 pour stocker son index grandissant. HDFS est inspiré de GFS.", module: 'm1' },
  { term: 'MapReduce', def: "Paradigme (modèle) de programmation distribuée popularisé par Google (article de Jeffrey Dean et Sanjay Ghemawat, 2004) pour distribuer des traitements sur un ensemble de machines.", module: 'm3' },
  { term: 'HDFS', def: "Hadoop Distributed File System : système de fichiers par défaut d'Hadoop, distribué et répliqué (3 par défaut), taillé pour les fortes volumétries.", module: 'm4' },
  { term: 'NameNode', def: "Nœud HDFS qui stocke les métadonnées des blocks (localisation, taille, date de création…). 2 par cluster (Hadoop 2), 3 par cluster (Hadoop 3).", module: 'm4' },
  { term: 'DataNode', def: "Nœud HDFS présent sur chaque machine du cluster ; il stocke les blocs de données.", module: 'm4' },
  { term: 'Block (HDFS)', def: "Unité de découpage des données dans HDFS — 128 Mo par défaut.", module: 'm4' },
  { term: 'Réplication HDFS', def: "Les données sont répliquées par défaut 3 fois pour palier la défaillance d'une machine.", module: 'm4' },
  { term: 'Split', def: "1ʳᵉ étape de MapReduce : découper les données d'entrée en fragments (ex. ligne par ligne) pour que chaque machine travaille sur une partie.", module: 'm3' },
  { term: 'Map (Mapper)', def: "2ᵉ étape de MapReduce : génère pour chaque élément un couple (clef ; valeur) — ex. (MOT ; 1).", module: 'm3' },
  { term: 'Shuffle', def: "3ᵉ étape de MapReduce : mélange et trie les couples par clef identique (mélanger & ordonner).", module: 'm3' },
  { term: 'Reduce (Reducer)', def: "4ᵉ étape de MapReduce : agrège les valeurs d'une même clef en une valeur unique (ex. TOTAL=TOTAL+1).", module: 'm3' },
  { term: 'Volume', def: "1ᵉʳ V du Big Data : téraoctets, enregistrements/archives, transactions, tables, fichiers → problématique du STOCKAGE.", module: 'm2' },
  { term: 'Variété (Variety)', def: "2ᵉ V : données structurées, non structurées, probabilistes → problématique de la COLLECTE.", module: 'm2' },
  { term: 'Vélocité (Velocity)', def: "3ᵉ V : batch, temps réel, processus, flot de données — « au cœur du Time to Market » → problématique du TRAITEMENT.", module: 'm2' },
  { term: 'Véracité (Veracity)', def: "4ᵉ V (IBM 2012) : confiance, authenticité, origine/réputation, disponibilité, responsabilité — la fiabilité des données.", module: 'm2' },
  { term: 'Valeur (Value)', def: "5ᵉ V (2015) : statistiques, évènements, corrélations, hypothétiques — LE V le plus important : les données sans valeur sont inutiles.", module: 'm2' },
  { term: 'NoSQL', def: '"Not Only SQL" : approche qui relâche certaines contraintes lourdes du relationnel pour favoriser la distribution.', module: 'm5' },
  { term: 'MongoDB', def: "Base de données NoSQL qui enregistre les données sous forme de documents (syntaxe JSON) ; + rapide pour certaines opérations.", module: 'm5' },
  { term: 'Collection', def: "Équivalent MongoDB d'une table relationnelle.", module: 'm5' },
  { term: 'Document', def: "Équivalent MongoDB d'une ligne (row) — ensemble de paires clé:valeur.", module: 'm5' },
  { term: 'Field', def: "Équivalent MongoDB d'une colonne.", module: 'm5' },
  { term: 'mongod', def: "Instance (démon) du serveur MongoDB.", module: 'm5' },
  { term: 'ReplicaSet', def: "Groupe d'instances mongod qui conservent le même jeu de données ; un seul nœud principal (primary), les autres secondaires.", module: 'm5' },
  { term: 'Primary', def: "Nœud du ReplicaSet qui reçoit toutes les requêtes (lecture/écriture) et gère la cohérence des données.", module: 'm5' },
  { term: 'Secondary', def: "Nœuds du ReplicaSet utilisés dans le processus de réplication des données lors d'une mise à jour.", module: 'm5' },
  { term: 'Sharding', def: "Partitionnement des données : répartition d'une collection sur plusieurs serveurs (shards) pour la scalabilité.", module: 'm5' },
  { term: 'mongos', def: "Routeur de cluster sharded : chaque application s'y connecte et lui envoie sa requête.", module: 'm5' },
  { term: 'Config Server', def: "Serveur de configuration qui stocke les métadonnées du partitionnement ; permet à mongos de savoir dans quel shard se trouve la donnée.", module: 'm5' },
  { term: 'Shard', def: "Serveur de données du cluster (un ReplicaSet) portant une partie des données.", module: 'm5' },
  { term: 'Clé de partition (shard key)', def: "Champ existant dans les documents, choisi lors du partitionnement, utilisé pour distribuer la collection ; une collection partitionnée possède une seule clé.", module: 'm5' },
  { term: 'Chunk', def: "Division des données partitionnées ; un chunk est divisé quand il dépasse la taille fixée (par défaut 64 Mo) et migré entre partitions selon la charge.", module: 'm5' },
  { term: 'M/E (Maître/Esclave)', def: "Principe d'architecture sur lequel MongoDB base sa tolérance aux pannes (Master/Slave).", module: 'm5' },
  { term: 'MPP', def: "Bases de données d'analyse massivement parallèle : conformes SQL, conçues pour répartir le traitement des données sur plusieurs machines.", module: 'm2' },
  { term: 'Data center', def: "Exemple du cours : 5000 ordinateurs connectés entre eux formant un cluster.", module: 'm1' },
  { term: 'Web 1.0', def: "Web passif : un producteur publie, les internautes consomment.", module: 'm1' },
  { term: 'Web 2.0', def: "Web collaboratif (défini en 2005) : les internautes deviennent contributeurs (RSS, réseaux sociaux…).", module: 'm1' },
  { term: 'Web 3.0', def: "Web sémantique (?) : agents intelligents et widgets qui comprennent le sens des données.", module: 'm1' },
  { term: 'Internet des Objets (IoT)', def: "RFID (cartes de transport, codes-barres…), capteurs : Ericsson estime 50 milliards d'objets connectés en 2020 (12 milliards en 2013).", module: 'm2' },
  { term: 'Open Data', def: "Données ouvertes : réseaux sociaux (Facebook), données d'administrations publiques.", module: 'm2' },
  { term: 'Lac de données (Data Lake)', def: "Dépôt qui accepte tous types de données brutes pour le traitement et l'analyse.", module: 'm2' },
  { term: 'Données structurées', def: "Données qu'on peut clairement coder et identifier ; format défini (tableaux) — organisées pour faciliter le traitement.", module: 'm2' },
  { term: 'Données semi-structurées', def: "Non organisées mais associables à des métadonnées (ex. XML, JSON).", module: 'm2' },
  { term: 'Données non structurées', def: "Sans modèle préétabli (texte, audio, vidéo…) ; plus difficile à analyser.", module: 'm2' },
  { term: 'Big Table', def: "Base de données distribuée propriétaire de Google reposant sur GFS ; non Open Source mais a inspiré HBase.", module: 'm1' },
  { term: 'Cassandra', def: "Base de données de type NoSQL et distribuée (Facebook).", module: 'm1' },
  { term: 'Hive', def: "Logiciel d'analyse de données utilisant Hadoop (Facebook).", module: 'm1' },
  { term: 'Storm', def: "Plateforme de traitement de données massive (Twitter).", module: 'm1' },
  { term: 'S4', def: "Plateforme de traitement continu de flux de données (Yahoo).", module: 'm1' },
  { term: 'Voldemort', def: "Base de données distribuée destinée aux très grosses volumétries (LinkedIn).", module: 'm1' },
  { term: 'SenseiDB', def: "Base de données temps réel distribuée et semi-structurée (LinkedIn).", module: 'm1' },
  { term: 'FockDB', def: "Base de données distribuée de type graphe (Twitter).", module: 'm1' },
]
