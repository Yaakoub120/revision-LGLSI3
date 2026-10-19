import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// VIRTUALISATION & CLOUD — Modules 9 (Cloud — complément) & 10 (Docker bases)
// ═══════════════════════════════════════════════════════════════

export const vmod9: Module = {
  id: 'v9',
  num: 9,
  title: 'Cloud Computing',
  subtitle: 'Définition NIST, 5 caractéristiques, IaaS/PaaS/SaaS, modèles de déploiement',
  icon: '☁️',
  color: 'emerald',
  source: '⚠️ Module COMPLÉMENTAIRE (trou entre les slides 122 et 167 — voir note)',
  sections: [
    {
      id: 'v9s0',
      title: '⚠️ Note importante sur ce module',
      blocks: [
        { type: 'note', title: 'Pourquoi un module « complémentaire » ?', text: 'Le fichier « Cours - Partie 3.pdf » fourni correspond en réalité à un extrait du cours de Programmation Mobile Android (slides 78-109 : layouts, ressources, classe R…) et non à la Partie 3 du cours Virtualisation & Cloud. Les slides 122 à 167 (entre VirtualBox et la Containerisation) manquent donc — elles couvrent très probablement le Cloud Computing, annoncé dans le titre du cours. Ce module reconstitue ce chaînon avec le contenu standard de ce type de cours. Si tu retrouves la vraie Partie 3, envoie-la : elle sera intégrée à la place.' },
      ],
    },
    {
      id: 'v9s1',
      title: 'Définition et caractéristiques essentielles',
      blocks: [
        { type: 'definition', term: 'Cloud computing', def: 'Modèle permettant l\u2019accès, à la demande et via le réseau, à un pool partagé de ressources informatiques configurables (réseaux, serveurs, stockage, applications, services) pouvant être provisionnées et libérées rapidement avec un minimum d\u2019effort de gestion ou d\u2019interaction avec le fournisseur.' },
        { type: 'paragraph', text: 'La virtualisation est la technologie qui rend le cloud possible (cf. Module 1) : les fournisseurs créent des environnements virtuels sur leurs datacenters, accessibles via des APIs.' },
        { type: 'list', items: [
          'Libre-service à la demande : l\u2019utilisateur provisionne ses ressources seul, sans intervention humaine du fournisseur.',
          'Large accès réseau : les services sont accessibles via le réseau par des mécanismes standards (APIs REST vues au module 1).',
          'Mutualisation des ressources (pooling) : les ressources physiques et virtuelles sont pooled pour servir plusieurs consommateurs.',
          'Élasticité rapide : les ressources peuvent être allouées et libérées élastiquement, parfois automatiquement, pour s\u2019adapter à la charge.',
          'Service mesuré : la consommation est surveillée, contrôlée et facturée (pay-as-you-go).',
        ] },
      ],
    },
    {
      id: 'v9s2',
      title: 'Les modèles de service : IaaS, PaaS, SaaS',
      blocks: [
        { type: 'kv', items: [
          { k: 'IaaS — Infrastructure as a Service', v: 'Le fournisseur met à disposition l\u2019infrastructure virtualisée : machines virtuelles, stockage, réseaux. Vous gérez l\u2019OS, le middleware et les applications. Exemples : Amazon EC2, Azure VMs, GCE.' },
          { k: 'PaaS — Platform as a Service', v: 'Le fournisseur fournit une plate-forme d\u2019exécution (runtime, bases de données, middlewares). Vous ne gérez que vos applications et vos données. Exemples : Heroku, Google App Engine, Azure App Service.' },
          { k: 'SaaS — Software as a Service', v: 'L\u2019application complète est consommée en ligne, sans gestion ni installation. Exemples : Gmail, Office 365, Salesforce, Netflix.' },
        ] },
        { type: 'table', headers: ['Élément', 'IaaS', 'PaaS', 'SaaS'], rows: [
          ['Applications', 'Vous', 'Vous', 'Fournisseur'],
          ['Données', 'Vous', 'Vous', 'Fournisseur'],
          ['Runtime / middleware', 'Vous', 'Fournisseur', 'Fournisseur'],
          ['Système d\u2019exploitation', 'Vous', 'Fournisseur', 'Fournisseur'],
          ['Virtualisation', 'Fournisseur', 'Fournisseur', 'Fournisseur'],
          ['Serveurs / stockage / réseau', 'Fournisseur', 'Fournisseur', 'Fournisseur'],
        ], caption: 'Qui gère quoi selon le modèle de service' },
      ],
    },
    {
      id: 'v9s3',
      title: 'Les modèles de déploiement',
      blocks: [
        { type: 'kv', items: [
          { k: 'Cloud public', v: 'Infrastructure ouverte au grand public, appartenant à un fournisseur (AWS, Azure, GCP) : mutualisation maximale, facturation à l\u2019usage.' },
          { k: 'Cloud privé', v: 'Infrastructure exploitée pour une seule organisation, sur site ou hébergée : contrôle et sécurité maximaux, coûts plus élevés.' },
          { k: 'Cloud hybride', v: 'Combinaison public + privé liées par des technologies standards : on garde le cœur sensible en privé et on élastique sur le public.' },
          { k: 'Cloud communautaire', v: 'Infrastructure partagée par plusieurs organisations ayant des préoccupations communes (ex. secteur public). ' },
        ] },
        { type: 'note', title: 'Lien avec le cours', text: 'Le cours cite Azure, AWS et GCP comme plateformes cloud supportées par Docker Community Edition (module Docker, éditions) — ce sont les grands clouds publics. Les entreprises délèguent aussi leurs datacenters à des prestataires (Module 8).' },
      ],
    },
  ],
}

export const vmod10: Module = {
  id: 'v10',
  num: 10,
  title: 'Conteneurisation & Docker',
  subtitle: 'Conteneur vs VM, historique, architecture Docker, commandes de base, exec/attach/volumes',
  icon: '📦',
  color: 'violet',
  source: 'Partie 4 — Containerisation (slides 168-193)',
  sections: [
    {
      id: 'v10s1',
      title: 'C\u2019est quoi un conteneur ?',
      blocks: [
        { type: 'paragraph', text: 'Évolution de l\u2019infrastructure : après les serveurs physiques puis les machines virtuelles, la conteneurisation est l\u2019étape suivante de la décomposition de l\u2019infrastructure applicative.' },
        { type: 'definition', term: 'Conteneur', def: 'Enveloppe permettant de packager une application avec juste ce dont elle a besoin pour fonctionner. Il peut être déployé tel quel dans n\u2019importe quelle machine disposant d\u2019un Container Engine, avec différents environnements (Dev, Test, Prod).' },
        { type: 'list', items: [
          'Utilise le Kernel de l\u2019OS hôte.',
          'A son propre espace de processus et sa propre interface réseau.',
          'Isolé de l\u2019hôte, mais exécuté directement dessus.',
          'Permet de décomposer l\u2019infrastructure applicative en petits éléments légers, faciles à déployer et à réutiliser.',
        ] },
      ],
    },
    {
      id: 'v10s2',
      title: 'Avantages du conteneur',
      blocks: [
        { type: 'list', items: [
          'Meilleures performances que les VM (démarrage instantané).',
          'Portabilité d\u2019un environnement à l\u2019autre (multicloud).',
          'Cohérence entre les environnements Dev, Test et Prod.',
          'Permet de modulariser facilement l\u2019application.',
          'Gérer l\u2019héritage technique (anciennes applications) grâce à l\u2019isolation.',
        ] },
      ],
    },
    {
      id: 'v10s3',
      title: 'Conteneurs vs Machines Virtuelles',
      blocks: [
        { type: 'table', headers: ['Critère', 'Machine virtuelle', 'Conteneur'], rows: [
          ['Ce qui est virtualisé', 'Une machine physique', 'Un environnement d\u2019exécution des applications'],
          ['OS', 'Chaque VM a son propre OS', 'Les conteneurs utilisent le même OS (kernel partagé)'],
          ['Kernel', 'Un kernel par VM', 'Tous les conteneurs utilisent le même kernel OS (Linux)'],
          ['Ressources', 'Consomme beaucoup de ressources (CPU, stockage)', 'Consomme peu de ressources'],
          ['Démarrage', 'Assez long (quelques minutes)', 'Boot rapide (quelques secondes)'],
        ], caption: 'Conteneurs vs VM (slide 171)' },
        { type: 'paragraph', text: 'Les container engine ne viennent pas remplacer les machines virtuelles. Dans la pratique on utilise les DEUX : les machines virtuelles pour virtualiser les machines, et un container engine tel que Docker pour isoler les environnements d\u2019exécution des applications dans des machines virtuelles — ceci pour tirer le bénéfice des deux technologies.' },
        { type: 'diagram', diagram: 'v-vm-container' },
      ],
    },
    {
      id: 'v10s4',
      title: 'Historique de la conteneurisation',
      blocks: [
        { type: 'paragraph', text: 'Le mot « conteneur » vient de l\u2019unité de transport intermodal (le conteneur maritime) : une boîte standard qui voyage sur tous les transports.' },
        { type: 'timeline', items: [
          { time: '1979-1982', text: 'UNIX chroot — virtualisation de processus' },
          { time: '1998', text: 'BSD Jail' },
          { time: '2001', text: 'Parallels Virtuozzo' },
          { time: '2005', text: 'Solaris Containers' },
          { time: '2008', text: 'Linux LXC' },
          { time: '2013', text: 'Docker (basé sur LXC)' },
        ] },
      ],
    },
    {
      id: 'v10s5',
      title: 'C\u2019est quoi Docker ? Histoire',
      blocks: [
        { type: 'definition', term: 'Docker', def: 'Docker permet de créer des environnements (appelés containers) de manière à isoler des applications. Il permet d\u2019empaqueter une application ainsi que les dépendances nécessaires dans un conteneur virtuel isolé qui pourra être exécuté sur n\u2019importe quelle machine supportant Docker. Docker est un logiciel libre qui permet le déploiement d\u2019applications sous la forme de conteneurs logiciels.' },
        { type: 'timeline', items: [
          { time: 'Départ', text: 'Société française au départ, maintenant basée à San Francisco. dotCloud : un PaaS avec un container engine écrit en Python.' },
          { time: '2012', text: 'Réécriture en langage Go.' },
          { time: '2013', text: 'Première version Open Source de Docker. Réaction très positive de la communauté. dotCloud change de nom pour Docker.' },
          { time: '2014', text: 'Levée de fonds : 40 millions $' },
          { time: '2015', text: 'Levée de fonds : 95 millions $' },
        ] },
      ],
    },
    {
      id: 'v10s6',
      title: 'Problèmes de déploiement (avant Docker)',
      blocks: [
        { type: 'paragraph', text: 'Pour une application utilisant différentes technologies (services), des problèmes sont posés au moment du déploiement en production :' },
        { type: 'list', items: [
          'Compatibilité des applications avec les OS.',
          'Installer les dépendances et les librairies requises avec les bonnes versions pour chaque service.',
          'Installer les différents environnements : Dev, Test, Prod.',
        ] },
        { type: 'paragraph', text: 'Ce qui prend beaucoup de temps pour déployer les applications, avec des conflits entre les développeurs et les opérationnels (administrateurs systèmes).' },
        { type: 'definition', term: 'Solution : conteneurs d\u2019applications', def: 'Embarquer les applications dans des conteneurs ; exécuter chaque service avec ses propres dépendances dans des conteneurs séparés.' },
      ],
    },
    {
      id: 'v10s7',
      title: 'Architecture globale de Docker',
      blocks: [
        { type: 'steps', items: [
          { title: '1. Le développeur crée un Dockerfile', text: 'Fichier contenant les commandes que Docker va exécuter pour construire une image Docker de l\u2019application : $ docker build' },
          { title: '2. L\u2019image est construite', text: 'L\u2019image Docker contient tout ce dont l\u2019application a besoin pour s\u2019exécuter correctement. Les images peuvent être publiées dans un registre public (Docker Hub) ou privé : $ docker push image_name' },
          { title: '3. Téléchargement sur un hôte', text: 'Pour télécharger une image Docker dans un Host Docker : $ docker pull image_name' },
          { title: '4. Exécution du conteneur', text: 'La création et l\u2019exécution d\u2019un conteneur se fait par instanciation de l\u2019image : $ docker run image_name. Avec docker run, si l\u2019image n\u2019existe pas dans le host, elle est d\u2019abord téléchargée avant de créer et exécuter le conteneur.' },
        ] },
        { type: 'list', items: [
          'Docker Engine : permet de créer le Host Docker sur une machine Linux (Docker daemon).',
          'Un client Docker : peut se trouver dans n\u2019importe quelle autre machine et est connecté à Docker Engine via différents connecteurs exposés par Docker (socket, REST API, etc.).',
          'Docker Hub : le registre d\u2019images.',
        ] },
        { type: 'diagram', diagram: 'v-docker-flow' },
      ],
    },
    {
      id: 'v10s8',
      title: 'Image vs Conteneur',
      blocks: [
        { type: 'kv', items: [
          { k: 'Image Docker', v: 'Un fichier package représentant la TEMPLATE des conteneurs. Elle définit la structure du conteneur en englobant l\u2019application conteneurisée et l\u2019ensemble de ses dépendances.' },
          { k: 'Conteneur', v: 'Une INSTANCE d\u2019une image. Un conteneur est exécuté par le Docker Host, ce qui implique l\u2019exécution de l\u2019application qu\u2019il transporte dans un environnement isolé fourni par le conteneur.' },
        ] },
      ],
    },
    {
      id: 'v10s9',
      title: 'Docker et l\u2019approche DevOps',
      blocks: [
        { type: 'table', headers: ['Étape', 'Sans Docker', 'Avec Docker'], rows: [
          ['Le développeur', 'Développe l\u2019application, génère le package (App.war), l\u2019envoie à l\u2019opérationnel avec un descriptif des dépendances à installer et configurer', 'Développe l\u2019application, construit une image Docker contenant TOUTES les dépendances, publie l\u2019image dans le registre Docker'],
          ['L\u2019opérationnel', 'Doit se débrouiller pour satisfaire les exigences de l\u2019application ; à chaque mise à jour, les mêmes histoires se répètent', 'Déploie l\u2019application en instanciant des conteneurs à partir de l\u2019image récupérée du repository Docker'],
          ['Résultat', 'Vie dure pour les administrateurs systèmes ; beaucoup de conflits entre développeurs (qui améliorent constamment) et opérationnels (qui redéploient)', 'Fin des conflits : l\u2019image embarque tout, le déploiement est reproductible'],
        ], caption: 'Docker contribue à instaurer l\u2019approche DevOps (slide 179)' },
      ],
    },
    {
      id: 'v10s10',
      title: 'Les éditions de Docker',
      blocks: [
        { type: 'kv', items: [
          { k: 'Community Edition (Open source)', v: 'Disponible pour les plateformes : Linux, Mac, Windows, Cloud (Azure, AWS, GCP). Pour Windows et Mac, deux solutions : installer une Machine virtuelle Linux (avec VirtualBox ou VMware par exemple), ou installer Docker Desktop pour Windows Server ou Mac.' },
          { k: 'Enterprise Edition', v: 'L\u2019édition commerciale de Docker.' },
        ] },
        { type: 'paragraph', text: 'Docker Hub : le registre public où chercher des images (ex. docker/whalesay — l\u2019image du tutoriel officiel avec la baleine qui parle).' },
      ],
    },
    {
      id: 'v10s11',
      title: 'Commandes de base : run et ps',
      blocks: [
        { type: 'code', lang: 'bash', caption: 'run et ps (slides 182-183)', code: `$ docker run image_name
# Crée et démarre un conteneur (nouvelle instance de l'image).
# Si l'image n'existe pas, elle est d'abord téléchargée depuis le docker hub.

$ docker run -d image_name
# Démarre le conteneur comme service de fond (démon).

# La valeur par défaut de la version de l'image est : latest
$ docker run image_name:tag        # pour spécifier la version (tag)
$ docker run redis:4.0             # exemple du cours

$ docker ps
# Liste les conteneurs en cours d'exécution.
# Chaque conteneur créé dispose d'un identifiant unique et d'un nom.

$ docker ps -a
# Liste TOUS les conteneurs avec leur statut (Up, Exited, Created).` },
        { type: 'paragraph', text: 'Capture du cours : `sudo docker run nginx` → « Unable to find image \u2018nginx:latest\u2019 locally » puis « latest: Pulling from library/nginx » avec chaque couche téléchargée (Pull complete).' },
      ],
    },
    {
      id: 'v10s12',
      title: 'Mapper les ports pour un accès externe (-p)',
      blocks: [
        { type: 'paragraph', text: 'Au démarrage, nginx ouvre un service http sur le port 80. Comme nginx démarre à l\u2019intérieur du conteneur docker, l\u2019accès http à cette application ne peut se faire qu\u2019à l\u2019intérieur du conteneur.' },
        { type: 'list', items: [
          'Pour accéder de l\u2019extérieur à un service déployé dans le conteneur, il faut, au démarrage du conteneur, spécifier à Docker le mapping entre les ports exposés en interne et les ports externes.',
          'Cette opération se fait via l\u2019option : -p port externe:port interne',
        ] },
        { type: 'code', lang: 'bash', caption: 'Exemple du cours (slide 184)', code: `$ sudo docker run -d -p 8082:80 nginx
# 192.168.57.3 = adresse IP de la machine virtuelle ubuntu qui déploie le Docker Host
# Le service nginx (port 80 du conteneur) est accessible sur http://192.168.57.3:8082` },
      ],
    },
    {
      id: 'v10s13',
      title: 'Commandes images, rmi, stop, rm',
      blocks: [
        { type: 'code', lang: 'bash', caption: 'Gestion des images (slide 185)', code: `$ docker images
# Liste les images présentes dans le host docker

$ docker rmi <nom-image>
# Supprime une image du host docker.
# Il faut d'abord stopper et supprimer tous les conteneurs instanciés de cette image.` },
        { type: 'code', lang: 'bash', caption: 'Stop et rm (slide 186)', code: `$ docker stop <containerID or containerName>
# Stoppe un conteneur

$ docker rm <containerID or containerName>
# Supprime un conteneur de manière PERMANENTE

# ⚠️ Si le conteneur tourne encore :
# Error response from daemon: You cannot remove a running container …
# Stop the container before attempting removal or force remove
$ docker stop af25 && docker rm af25   # l'ordre du cours : stop PUIS rm` },
      ],
    },
    {
      id: 'v10s14',
      title: 'Un conteneur Docker ne peut pas contenir un OS',
      blocks: [
        { type: 'paragraph', text: 'Exemple du cours : tenter de démarrer un conteneur ubuntu avec `docker run ubuntu`. Le conteneur sera créé, mais pas démarré (statut Exited (0)).' },
        { type: 'list', items: [
          'Un conteneur docker est fait pour contenir des PROCESSUS et des SERVICES, et non pas des OS.',
          'L\u2019image ubuntu est faite pour être l\u2019image de BASE d\u2019autres conteneurs, et non pour être exécutée en tant que telle.',
          'Quand un service du conteneur s\u2019arrête, le conteneur s\u2019arrête aussi.',
        ] },
      ],
    },
    {
      id: 'v10s15',
      title: 'La commande EXEC',
      blocks: [
        { type: 'paragraph', text: 'Permet d\u2019exécuter une commande dans un conteneur DÉMARRÉ. Exemple du cours : démarrer un conteneur MySQL puis exécuter mysql dans le conteneur en mode interactif.' },
        { type: 'code', lang: 'bash', caption: 'EXEC avec MySQL (slides 188-189)', code: `# Démarrer un conteneur MySQL (-e : variable d'environnement)
$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
$ docker run --name my2 -e MYSQL_ROOT_PASSWORD=root -d mysql

# Exécuter mysql DANS le conteneur, en mode interactif (-it)
$ docker exec -it my2 mysql --password
# → exécute une commande mysql dans le conteneur my2, en demandant le mdp.
# On se connecte au serveur mysql et on tape les cmds correspondants.
# Les résultats sont envoyés sur le terminal puisque le mode itératif -it est défini.
mysql> show databases;
→ information_schema, mysql, performance_schema, sys` },
      ],
    },
    {
      id: 'v10s16',
      title: 'La commande Attach',
      blocks: [
        { type: 'paragraph', text: 'Quand vous lancez un conteneur comme tâche de fond avec l\u2019option -d, il se peut que vous ayez besoin d\u2019attacher la console du terminal courant au conteneur.' },
        { type: 'code', lang: 'bash', caption: 'Attach (slide 190)', code: `$ docker run -d alpine ping 8.8.8.8   # conteneur de fond (exemple du cours)
$ docker ps                           # f486e756d97b  alpine  "ping 8.8.8.8"  Up
$ docker attach containerID           # attache la console au conteneur` },
      ],
    },
    {
      id: 'v10s17',
      title: 'Inspecter un conteneur',
      blocks: [
        { type: 'paragraph', text: 'La commande ps permet d\u2019avoir des informations basiques sur les conteneurs. Pour avoir plus de détail, au format JSON :' },
        { type: 'code', lang: 'bash', caption: 'Inspect (slide 191)', code: `$ docker inspect <container_name or container_id>
# Retourne un JSON détaillé : Id, Created, Path, Args,
# State: { Status: "running", Running: true, Paused: false, … }` },
      ],
    },
    {
      id: 'v10s18',
      title: 'Mapping des volumes : persistance des données',
      blocks: [
        { type: 'paragraph', text: 'Quand vous démarrez un conteneur MySQL, les données des bases de données sont stockées par défaut dans le dossier /var/lib/mysql à l\u2019intérieur du docker container. Un docker container dispose de son PROPRE système de fichiers : si vous supprimez ce conteneur MySQL, toutes les bases de données seront détruites.' },
        { type: 'definition', term: 'Volumes : rendre les données persistantes', def: 'Pour rendre les données persistantes en dehors du conteneur, il faut mapper les volumes au démarrage du conteneur.' },
        { type: 'code', lang: 'bash', caption: 'Volume mapping (slide 192)', code: `$ docker run -v /opt/dataDir:/var/lib/mysql mysql
# Quand le conteneur mysql démarre, il monte implicitement un dossier
# EN DEHORS du conteneur vers un dossier INTERNE au conteneur.
# Toutes les données sont stockées dans /opt/dataDir (sur l'hôte) :
# même si on supprime le conteneur, les données restent.` },
        { type: 'paragraph', text: 'Et pour consulter le fichier log d\u2019un conteneur démarré comme tâche de fond : `$ docker logs container_ID`.' },
        { type: 'diagram', diagram: 'v-docker-volumes' },
      ],
    },
  ],
}
