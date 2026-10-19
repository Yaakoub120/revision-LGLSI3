import type { CourseModule } from '@/types/course';

export const module3: CourseModule = {
  id: 3,
  slug: 'hadoop-hdfs',
  title: 'Hadoop : un standard — et HDFS, son système de fichiers',
  subtitle: 'Les acteurs et solutions, l’équation Hadoop, l’écosystème, puis HDFS : architecture, NameNode/DataNode, blocks, écriture et lecture d’un fichier, et les commandes hdfs dfs.',
  icon: 'HardDrive',
  accent: 'lime',
  sections: [
    {
      id: 'acteurs-google',
      title: 'Les acteurs : Google, l’origine de tout',
      blocks: [
        { kind: 'h3', text: 'Pour stocker son index grandissant, quelle solution pour Google ?' },
        { kind: 'list', ordered: true, items: [
          '**Utilisation d’un SGBDR ?** ❌ Non : **problème de distribution des données**, **problème du nombre d’utilisateurs**, **problème de vitesse du moteur de recherche**.',
          '**Invention d’un nouveau système propriétaire : GFS (Google File System) en 2003** ✅',
        ]},
        { kind: 'p', text: 'La notion de **Big Data est intimement liée à la capacité de traitements de gros volumes**. Le **premier article a été publié en 2004** par **Jeffrey Dean et Sanjay Ghemawat** : *« MapReduce : Simplified Data Processing on Large Clusters »*. C’est un **algorithme inventé par Google, Inc afin de distribuer des traitements sur un ensemble de machines avec le système GFS**.' },
        { kind: 'note', variant: 'info', text: '**Google possède aujourd’hui plus de 1 000 000 de serveurs interconnectés dans le monde.**' },
        { kind: 'h3', text: 'L’implémentation Libre et Open Source' },
        { kind: 'p', text: 'Les contributeurs de l’implémentation Libre et Open Source sont **Yahoo!, Facebook, LinkedIn et Twitter**. Ces entreprises ont décidé d’**ouvrir leurs développements internes au monde Open Source**. Un certain nombre de ces technologies comme **« Hadoop » et « Spark »** font partie de la **fondation Apache** et ont été intégrés aux offres de **« Big Data »** des grands acteurs tels que **IBM, Oracle, Microsoft, EMC**…' },
        { kind: 'table', headers: ['Société', 'Technologie développée', 'Type de technologie'], rows: [
          ['**Google**', '**Big Table**', 'Système de base de données distribuée **propriétaire** reposant sur GFS (Google File System). Technologie **non Open Source**, mais qui a **inspiré HBase** qui est Open Source.'],
          ['**Google**', '**MapReduce**', 'Plate-forme de développement pour **traitements distribués**'],
          ['**Yahoo**', '**Hadoop**', 'Plateforme **Java** destinée aux applications distribuées et à la gestion intensive des données. **Issue à l’origine de GFS et MapReduce**.'],
          ['**Yahoo**', '**S4**', 'Plateforme de développement dédiée aux applications de **traitement continu de flux de données**'],
          ['**Facebook**', '**Cassandra**', 'Base de données de type **NoSQL** et distribuée'],
          ['**Facebook**', '**Hive**', 'Logiciel d’**analyse de données** utilisant Hadoop'],
          ['**Twitter**', '**Storm**', 'Plateforme de **traitement de données massive**'],
          ['**Twitter**', '**FlockDB**', 'Base de données distribuée de type **graphe**'],
          ['**LinkedIn**', '**SenseiDB**', 'Base de données **temps réel** distribuée et semi-structurée'],
          ['**LinkedIn**', '**Voldemort**', 'Base de données distribuée destinée aux **très grosses volumétries**'],
        ], caption: 'Quelques technologies Open Source du Big Data (tableau du cours)' },
        { kind: 'h3', text: 'Exemples : plateforme — technologies — outils' },
        { kind: 'table', headers: ['Catégorie', 'Outils cités'], rows: [
          ['**Processing**', 'Hadoop, Hive, Pig, mrjob, Caffeine'],
          ['**NoSQL Databases**', 'HBase, MongoDB, Vertica, Cassandra, Neo4j, etc.'],
          ['**Servers**', 'EC2, Google App Engine, Elastic Beanstalk, Heroku'],
          ['**Analytics**', 'R, SAS, Python scikit-learn, Spark MLLib, Apache Mahout'],
          ['**Search**', 'Solr/Lucene, ElasticSearch'],
        ]},
        { kind: 'note', variant: 'info', text: 'Autres technologies visibles dans la frise du cours : Kafka, memcached, Lucene, Storm, Neo4j, d3.js, Infinispan, mongoDB, Jumia, ElasticSearch, Mahout, MapReduce, ØMQ, R, Presto, Spark, HBase, Hive, Solr, Cassandra.' },
      ],
    },
    {
      id: 'equation',
      title: 'La solution : Apache Hadoop',
      blocks: [
        { kind: 'def', term: 'L’équation Hadoop', text: '**Hadoop = excellent équilibre coût / performance / stockage / flexibilité**' },
        { kind: 'p', text: 'Hadoop répond aux **problématiques du calcul distribué** : comment répartir données et traitements sur des machines ordinaires, tolérer les pannes, et faire monter l’échelle sans changer d’architecture ? Son écosystème couvre le stockage (**HDFS**), le calcul (**MapReduce**, YARN) et les couches spécialisées.' },
        { kind: 'diagram', id: 'hadoop-ecosystem', caption: 'L’écosystème Hadoop : stockage, calcul et outils spécialisés' },
      ],
    },
    {
      id: 'hdfs-presentation',
      title: 'HDFS : présentation',
      blocks: [
        { kind: 'list', items: [
          '**HDFS = Hadoop Distributed File System**',
          'HDFS = **système de fichiers (FileSystem) d’Hadoop par défaut**',
          'HDFS est **inspiré de GFS** — « The Google File System », **2003**',
        ]},
        { kind: 'p', text: 'Principales **caractéristiques** :' },
        { kind: 'list', items: [
          '**Distribué** : les données sont réparties sur les machines du cluster',
          '**Répliqué** : les données sont répliquées (**par défaut 3**) pour palier la défaillance d’une machine',
        ]},
        { kind: 'note', variant: 'tip', text: 'HDFS est **« taillé » pour les fortes volumétries**.' },
      ],
    },
    {
      id: 'hdfs-architecture',
      title: 'HDFS : architecture — blocks, NameNode, DataNode',
      blocks: [
        { kind: 'p', text: 'Dans HDFS, les données sont découpées en **« blocks » — 128 Mo par défaut**.' },
        { kind: 'p', text: 'HDFS s’appuie sur deux types de serveurs :' },
        { kind: 'def', term: 'Le NameNode', text: '**2 NameNodes par cluster (Hadoop 2)**, et **3 NameNodes par cluster (Hadoop 3)**. Le NameNode **stocke les métadonnées des blocks** : leur **localisation**, **taille**, **date de création**, …' },
        { kind: 'def', term: 'Le DataNode', text: '**1 DataNode par machine du cluster**. Il stocke physiquement les blocks de données.' },
        { kind: 'diagram', id: 'hdfs-arch', caption: 'Architecture HDFS : le NameNode tient les métadonnées, les DataNodes stockent les blocs (réplication ×3)' },
      ],
    },
    {
      id: 'hdfs-write-read',
      title: 'HDFS : écriture et lecture d’un fichier',
      blocks: [
        { kind: 'h3', text: 'Écriture d’un fichier' },
        { kind: 'steps', items: [
          { title: 'Le client demande à écrire', text: '« **Je veux écrire le fichier data.txt sur HDFS (3 blocs)** » — le client Hadoop découpe le fichier en blocs (Bloc 1, Bloc 2, Bloc 3).' },
          { title: 'Le NameNode répond', text: '« **OK. Envoie aux DataNodes 1, 3 et 5.** » — il choisit les machines cibles selon la réplication.' },
          { title: 'Le client distribue les blocs', text: 'Le client envoie **Bloc 1 → DataNode 1**, **Bloc 2 → DataNode 3**, **Bloc 3 → DataNode 5**. La réplication vers les autres DataNodes se fait ensuite en chaîne.' },
        ]},
        { kind: 'diagram', id: 'hdfs-write', caption: 'Écriture HDFS : le NameNode décide, le client distribue les blocs' },
        { kind: 'h3', text: 'Lecture d’un fichier' },
        { kind: 'steps', items: [
          { title: 'Le client demande à lire', text: '« **Je veux lire le fichier data.txt sur HDFS** ».' },
          { title: 'Le NameNode répond', text: '« **OK. 3 blocs. Bloc 1 : DN 1, 2, 5. Bloc 2 : DN 2, 3. Bloc 3 : DN 1, 3, 5** » — il donne la liste des DataNodes qui possèdent chaque bloc.' },
          { title: 'Le client lit directement', text: 'Le client récupère chaque bloc **directement auprès des DataNodes** concernés, en parallèle.' },
        ]},
        { kind: 'diagram', id: 'hdfs-read', caption: 'Lecture HDFS : le NameNode donne les localisations, le client lit les blocs sur les DataNodes' },
      ],
    },
    {
      id: 'hdfs-commands',
      title: 'HDFS : les commandes à connaître',
      blocks: [
        { kind: 'p', text: 'Toutes les opérations passent par la commande générique **`hdfs dfs`** suivie d’une option. Voici les commandes du cours, avec leur rôle :' },
        { kind: 'table', headers: ['Commande', 'Rôle'], rows: [
          ['`hdfs dfs -ls /user`', 'Lister le contenu d’un dossier HDFS'],
          ['`hdfs dfs -mkdir nom_dossier_hdfs`', 'Créer un dossier sur HDFS'],
          ['`hdfs dfs -put fichier_en_local destination_sur_hdfs`', 'Copier un fichier **local → HDFS**'],
          ['`hdfs dfs -copyToLocal fichier_hdfs destination_en_local`', 'Copier un fichier **HDFS → local**'],
          ['`hdfs dfs -cat fichier_sur_hdfs`', 'Afficher le contenu d’un fichier HDFS'],
          ['`hdfs dfs -cp fichier_sur_hdfs destination_sur_hdfs`', 'Copier au sein de HDFS'],
          ['`hdfs dfs -mv fichier_sur_hdfs destination_sur_hdfs`', 'Déplacer au sein de HDFS'],
          ['`hdfs dfs -rm fichier_sur_hdfs`', 'Supprimer un fichier HDFS'],
          ['`hdfs dfs -du -h dossier_sur_hdfs`', 'Taille des dossiers/fichiers (lisible)'],
          ['`hdfs dfs -setrep -R -w 3 fichier_sur_hdfs`', 'Changer le **facteur de réplication** (ici 3), récursif (-R) et en attente de confirmation (-w)'],
        ], caption: 'Les 10 commandes HDFS du cours' },
        { kind: 'note', variant: 'info', text: 'Mémo : **-put** monte un fichier vers HDFS, **-copyToLocal** le redescend. **-setrep -R -w 3** règle la réplication sur 3 copies (la valeur par défaut de HDFS).' },
      ],
    },
  ],
};
