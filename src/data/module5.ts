import type { Module } from './types'

// ═══════════════════════════════════════════════════════════════
// MODULE 5 — NoSQL, MongoDB : ReplicaSet & Sharding
// ═══════════════════════════════════════════════════════════════
export const module5: Module = {
  id: 'm5',
  num: 5,
  title: 'NoSQL & MongoDB',
  subtitle: 'ReplicaSet, réplication et Sharding (partitionnement)',
  icon: '🍃',
  color: 'green',
  source: 'BD-Nosql.pdf + Mongodb-sharding.pdf',
  sections: [
    {
      id: 'm5s1',
      title: 'BD NoSQL — Introduction',
      blocks: [
        {
          type: 'list',
          items: [
            "Depuis les années 70, la BD relationnelle était l'incontournable référence pour gérer les données d'un système d'information.",
            "Comment gérer une énorme base de données et comment l'interroger efficacement ?",
            "Ces questions, on se les pose dès que le volume devient ingérable et que répondre à de simples requêtes prend des heures.",
            "Oubliez les SGBD traditionnels, ils peinent à passer à l'échelle ! Vous devez être capable de choisir la bonne solution parmi les dizaines qui s'offrent à vous.",
          ],
        },
        {
          type: 'definition',
          term: 'NoSQL',
          def: '"Not Only SQL". Cette approche propose de relâcher certaines contraintes lourdes du relationnel pour favoriser la distribution.',
        },
      ],
    },
    {
      id: 'm5s2',
      title: 'MongoDB',
      blocks: [
        {
          type: 'definition',
          term: "C'est quoi mongoDB ?",
          def: "• Base de données noSQL ;\n• Enregistrer les données sous forme de documents, syntaxe JSON ;\n• + rapide pour certaines opérations.",
        },
        {
          type: 'table',
          headers: ['Relationnel (SQL)', 'MongoDB'],
          rows: [
            ['Table', 'Collection'],
            ['Columns', 'Field'],
            ['Rows', 'Document'],
          ],
          caption: 'Correspondance relationnel ↔ MongoDB',
        },
        {
          type: 'paragraph',
          text: "Structured vs None structured : un document MongoDB est une paire clé:valeur (key:value paired) → équivalent d'une ligne (Row). Exemple du cours : { firstname: 'Ahmed', lastname: 'salim', mobile: '95656565', country: 'Oman' }. Dans la table « students », on peut ajouter un champ Mobile à un document sans modifier la structure des autres — une flexibilité impossible en relationnel strict.",
        },
      ],
    },
    {
      id: 'm5s3',
      title: 'ReplicaSet et sharding — la tolérance aux pannes',
      blocks: [
        {
          type: 'note',
          title: 'Comment résoudre le problème de la tolérance aux pannes ?',
          text: "MongoDB utilise pour cela une architecture basée sur le principe « M/E » (Maître/Esclave — Master/Slave).",
        },
        {
          type: 'paragraph',
          text: "Réplication en MongoDB :",
        },
        {
          type: 'list',
          items: [
            "Assure la redondance et augmente la disponibilité des données.",
            "Offre un niveau de tolérance aux pannes contre la perte d'un seul serveur de base de données.",
            "Un réplicaset est un groupe d'instances mongod qui conservent le même jeu de données.",
            "Un replicaSet contient plusieurs nœuds porteurs de données.",
            "Parmi ces nœuds, un seul membre est considéré comme le nœud principal (primary) et les autres sont secondaires (secondary).",
          ],
        },
        {
          type: 'kv',
          items: [
            { k: 'Primary (Primaire)', v: "À qui toutes les requêtes sont envoyées (lecture/écriture), il va s'occuper de gérer la cohérence des données." },
            { k: 'Secondary (Secondaires)', v: "Utilisés dans le processus de réplication des données lors d'une mise à jour." },
          ],
        },
        { type: 'diagram', diagram: 'replica-set' },
      ],
    },
    {
      id: 'm5s4',
      title: 'Sharding MongoDB — Avantages',
      blocks: [
        {
          type: 'list',
          items: [
            "Capacité de stockage",
            "Lecture/écriture",
            "Haute disponibilité",
            "Protection contre les pannes",
            "Géodistribution et performances",
          ],
        },
      ],
    },
    {
      id: 'm5s5',
      title: 'Architecture de partitionnement',
      blocks: [
        {
          type: 'paragraph',
          text: "La robustesse du cluster est gérée par 3 types de nœuds :",
        },
        {
          type: 'kv',
          items: [
            { k: '1. Des routeurs : mongos', v: "Point d'entrée des applications : chaque application va se connecter à un mongos et envoyer sa requête." },
            { k: '2. Des serveurs de configuration : Config Server', v: "Pour que mongos soit capable de savoir dans quel shard se trouve la donnée recherchée… La répartition des données étant faite dynamiquement, les config servers stockent les métadonnées du partitionnement (en ReplicaSet)." },
            { k: '3. Des serveurs de données : Shard', v: "Chaque shard est un ReplicaSet qui porte une partie des données." },
          ],
        },
        { type: 'diagram', diagram: 'sharding-architecture' },
      ],
    },
    {
      id: 'm5s6',
      title: 'Exemple de sharding (applications de films)',
      blocks: [
        {
          type: 'paragraph',
          text: "MovieReviewApp et MovieRentingApp se connectent chacune à un mongos et envoient leur requête. Les données sont réparties sur 3 shards selon le champ « title » : Shard1 (title: a-h), Shard2 (title: i-p), Shard3 (title: q-z).",
        },
        {
          type: 'list',
          items: [
            "Si la requête contient le champ « title », le mongos route directement vers le bon shard (requête ciblée).",
            "Si en revanche la requête ne contient pas le champ « title », le mongos doit interroger tous les shards (diffusion / scatter-gather).",
            "Pour améliorer la disponibilité et la scalabilité de votre application…… chaque composant (mongos, config servers, shards) est déployé en ReplicaSet.",
          ],
        },
      ],
    },
    {
      id: 'm5s7',
      title: 'Clé de partition (shard key)',
      blocks: [
        {
          type: 'list',
          items: [
            "Une clé de partition est utilisée pour distribuer les collections de documents en des partitions.",
            "Une clé de partition est composée d'un champ qui existe dans les documents de la collection.",
            "On fait le choix de la clé lors du partitionnement.",
            "Une collection partitionnée possède une seule clé.",
          ],
        },
      ],
    },
    {
      id: 'm5s8',
      title: 'Chunks',
      blocks: [
        {
          type: 'list',
          items: [
            "MongoDB divise les données partitionnées en des chunks.",
            "MongoDB divise un chunk chaque fois qu'il augmente de taille lorsqu'il dépasse la taille fixée lors de la configuration, qui est par défaut 64 mégaoctets.",
            "MongoDB migre les chunks entre partitions lorsqu'une partition possède assez de chunks.",
          ],
        },
        {
          type: 'note',
          title: 'Premier chunk',
          text: "Dès l'instant où on définit une clé de sharding, MongoDB crée un premier Chunk contenant l'ensemble des documents : {title: 'Any Given Sunday'}, {title: 'Alien 3'}, {title: 'Babe'}, {title: 'Edward Scissorhands'}, {title: 'Wonder Woman'}, {title: 'West Side Story'}, {title: 'Wall Street'}…",
        },
      ],
    },
    {
      id: 'm5s9',
      title: 'Configuration du sharding MongoDB étape par étape',
      blocks: [
        {
          type: 'note',
          title: 'Vue d\'ensemble',
          text: "Étape 1 : les config servers → Étape 2 : les shards → Étape 3 : le mongos → Étape 4 : la distribution de la base de données.",
        },
        {
          type: 'steps',
          items: [
            {
              title: 'Étape 1 : lancer deux serveurs de configuration (--configsvr) en ReplicaSet (configReplSet)',
              text: "Puis dans une console distincte, connectez-vous à l'un de ces serveurs et initiez le ReplicaSet, et ajoutez le deuxième serveur de configuration au ReplicaSet.",
            },
            {
              title: 'Étape 2 : création des shards',
              text: "Lancez les serveurs shard en ReplicaSet, puis initiez le ReplicaSet de chaque shard dans une console distincte.",
            },
            {
              title: 'Étape 3 : lancement du mongos (serveur de distribution) et connexion des shards',
              text: "Lancez le serveur mongos en spécifiant le serveur de configuration, puis ajoutez les shards un par un au niveau du mongos en mode console.",
            },
            {
              title: 'Étape 4 : distribution de la base de données',
              text: 'Définissez la collection que vous souhaitez distribuer : créez une base de données "testDB" et une collection "test", activez le sharding, créez l\'index et partitionnez la collection. Pour vérifier l\'état du sharding, exécutez sh.status().',
            },
          ],
        },
        {
          type: 'code',
          lang: 'bash',
          caption: 'Étape 1 — Config servers (ports 27019 et 27020)',
          code: `mongod --configsvr --replSet configReplSet --port 27019 --dbpath /data/conf1
mongod --configsvr --replSet configReplSet --port 27020 --dbpath /data/conf2

# Dans une console distincte, initiez le ReplicaSet :
mongo --port 27019
rs.initiate();

# Ajoutez le deuxième serveur de configuration au ReplicaSet :
rs.add("local:27020");`,
        },
        {
          type: 'code',
          lang: 'bash',
          caption: 'Étape 2 — Création des shards (ports 27031 et 27032)',
          code: `mongod --shardsvr --replSet sh1 --port 27031 --dbpath /data/sh1
mongod --shardsvr --replSet sh2 --port 27032 --dbpath /data/sh2

# Initiez le ReplicaSet de chaque shard dans une console distincte :
mongo --port 27031 --eval "rs.initiate()"
mongo --port 27032 --eval "rs.initiate()"`,
        },
        {
          type: 'code',
          lang: 'bash',
          caption: 'Étape 3 — Lancement du mongos (port 27017) et ajout des shards',
          code: `mongos --configdb configReplSet/localhost:27019 --port 27017

# Ajoutez les shards un par un au niveau du mongos en mode console :
mongo --port 27017
sh.addShard("sh1/localhost:27031");
sh.addShard("sh2/localhost:27032");`,
        },
        {
          type: 'code',
          lang: 'javascript',
          caption: 'Étape 4 — Distribution de la base de données "testDB"',
          code: `use testDB;
sh.enableSharding("testDB");
db.createCollection("test");
db.test.createIndex({"_id": 1});
sh.shardCollection("testDB.test", {"_id": 1});

# Pour vérifier l'état du sharding :
mongo --port 27017 --eval "sh.status()"`,
        },
      ],
    },
  ],
}
