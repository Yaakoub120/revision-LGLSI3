import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// VIRTUALISATION & CLOUD — Modules 11, 12, 13
// (Partie 4 slides 197-218 + Partie 5 slides 219-250)
// ═══════════════════════════════════════════════════════════════

export const vmod11: Module = {
  id: 'v11',
  num: 11,
  title: 'Dockerfile, réseau & stockage',
  subtitle: 'Instructions Dockerfile, modes réseau (bridge/host/none), DNS, couches',
  icon: '🐳',
  color: 'violet',
  source: 'Partie 4 — Dockerfile & Networking (slides 197-206)',
  sections: [
    {
      id: 'v11s1',
      title: 'Le Dockerfile : définition',
      blocks: [
        { type: 'definition', term: 'Dockerfile', def: 'Un fichier texte qui contient les commandes nécessaires à la construction d\u2019une image. Une fois créé, l\u2019administrateur utilise la commande `docker build` pour créer une image basée sur les commandes contenues dans le fichier.' },
        { type: 'paragraph', text: 'Les commandes et informations du Dockerfile peuvent être configurées pour utiliser des versions et des dépendances logicielles spécifiques afin de garantir des déploiements cohérents et stables.' },
      ],
    },
    {
      id: 'v11s2',
      title: 'Les 12 instructions du Dockerfile',
      blocks: [
        { type: 'table', headers: ['Instruction', 'Rôle (définition exacte du cours)'], rows: [
          ['FROM', 'Définir l\u2019image de base utilisée pour démarrer le processus de construction'],
          ['MAINTAINER / LABEL', 'Définit le nom complet et l\u2019adresse électronique du créateur de l\u2019image'],
          ['ENV', 'Définir des variables d\u2019environnement'],
          ['RUN', 'Directive d\u2019exécution centrale pour les fichiers Docker'],
          ['CMD', 'Exécuter une commande spécifique dans le conteneur'],
          ['ENTRYPOINT', 'Définit le programme ou script qui sera TOUJOURS exécuté quand le conteneur démarre, en acceptant éventuellement des arguments supplémentaires'],
          ['COPY', 'Copie des fichiers ou dossiers locaux depuis le contexte de build vers l\u2019image Docker'],
          ['ADD', 'Copie des fichiers ou dossiers et peut AUSSI extraire des archives ou télécharger des fichiers depuis une URL'],
          ['EXPOSE', 'Exposer un port spécifique pour permettre la mise en réseau du conteneur avec le monde extérieur'],
          ['USER', 'Définir l\u2019UID (le nom d\u2019utilisateur) qui exécutera le conteneur'],
          ['VOLUME', 'Déclare un dossier qui doit être stocké de façon persistante (en dehors du conteneur)'],
          ['WORKDIR', 'Définir le chemin où la commande, définie avec CMD, doit être exécutée'],
        ], caption: 'Instructions Dockerfile (slide 198)' },
        { type: 'note', title: 'COPY vs ADD', text: 'ADD fait tout ce que fait COPY, plus : extraction d\u2019archives et téléchargement depuis une URL.' },
      ],
    },
    {
      id: 'v11s3',
      title: 'Exemple complet du cours',
      blocks: [
        { type: 'code', lang: 'dockerfile', caption: 'webApp/Dockerfile (slide 199)', code: `FROM nginx
COPY index.html /usr/share/nginx/html
EXPOSE 80` },
        { type: 'code', lang: 'bash', caption: 'Construction et exécution', code: `C:\\...\\webApp> docker build -t myapp .
C:\\...\\webApp> docker run -d -p 8089:80 myapp
2e05049188f293b93a1da72a0e3e817c2eabe74ab403a05a5dae5012e1e14a5e` },
        { type: 'paragraph', text: 'L\u2019application se résume à un fichier index.html (« Hello from Docker ») copié dans le dossier html de nginx : on a conteneurisé un site statique en 3 lignes.' },
      ],
    },
    {
      id: 'v11s4',
      title: 'Networking : les 3 modes réseau',
      blocks: [
        { type: 'code', lang: 'bash', caption: 'Les 3 modes (slide 200)', code: `Bridge : $ docker run nginx                      # par défaut
Host   : $ docker run --network=host nginx
none   : $ docker run --network=none nginx` },
        { type: 'kv', items: [
          { k: 'Bridge (défaut)', v: 'Réseau privé interne créé par Docker dans le Host. Tous les conteneurs sont attachés par défaut à ce réseau. Chaque conteneur a une adresse souvent 172.17.0.x. Chaque conteneur peut accéder à l\u2019autre par cette adresse. Pour accéder à l\u2019un de ces conteneurs de l\u2019extérieur, il faut mapper le port des conteneurs aux ports du docker host.' },
          { k: 'Host', v: 'Autre manière d\u2019accéder aux conteneurs de l\u2019extérieur SANS mapper les ports : les attacher au réseau de type host. Le port de chaque conteneur est mappé automatiquement au même port au niveau du host. Conséquence : on ne pourra pas démarrer plusieurs instances du même conteneur, car on ne peut pas exposer plusieurs services avec le même port au niveau du host.' },
          { k: 'none', v: 'Le conteneur n\u2019est attaché à AUCUN réseau. Il ne sera donc pas accessible ni localement ni de l\u2019extérieur.' },
        ] },
        { type: 'diagram', diagram: 'v-docker-net' },
      ],
    },
    {
      id: 'v11s5',
      title: 'Réseaux personnalisés (bridge)',
      blocks: [
        { type: 'paragraph', text: 'Dans le cas du réseau de type Bridge, il est possible de connecter les conteneurs dans des réseaux internes différents.' },
        { type: 'code', lang: 'bash', caption: 'Créer, lister, inspecter (slides 201-203)', code: `$ docker network create --driver bridge --subnet 182.18.0.0/16 custom-isolated-net
$ docker network ls
# Réseaux par défaut : bridge (driver bridge), host (driver host), none (driver null)
$ docker inspect <container_id or container name>   # config réseau d'un conteneur

# Exemple du cours : réseau myNet en 172.19.0.0/16
C:\\> docker network create --driver bridge --subnet 172.19.0.0/16 myNet
C:\\> docker run -d --network=myNet nginx
C:\\> docker inspect 63fa
  → "Gateway": "172.19.0.1",  "IPAddress": "172.19.0.2",  "IPvPrefixLen": 16` },
      ],
    },
    {
      id: 'v11s6',
      title: 'Docker Name Spaces (DNS)',
      blocks: [
        { type: 'list', items: [
          'Un conteneur peut atteindre un autre conteneur par son NOM.',
          'Docker utilise DNS (Docker Name Spaces) pour associer l\u2019adresse IP au nom du conteneur.',
          'DNS est un serveur démarré par défaut utilisant l\u2019adresse IP 172.17.0.11 (version du cours).',
          'Il est plus pratique de connecter les conteneurs en utilisant leurs noms, car les adresses IP peuvent changer au démarrage.',
        ] },
        { type: 'table', headers: ['Container Name', 'IP'], rows: [
          ['web', '172.17.0.2'],
          ['mysql', '172.17.0.3'],
          ['activemq', '172.17.0.4'],
          ['hazelcast', '172.17.0.5'],
        ], caption: 'Table DNS de l\u2019exemple du cours (slide 204) — serveur DNS en 172.17.0.11' },
      ],
    },
    {
      id: 'v11s7',
      title: 'Stockage dans Docker & architecture en couches',
      blocks: [
        { type: 'paragraph', text: 'Quand vous installez Docker dans un système de fichiers, il crée son dossier dans /var/lib/docker avec : aufs, containers, image, volumes. C\u2019est dans ces dossiers que Docker stocke par défaut toutes ses données, c\u2019est-à-dire les fichiers relatifs aux images, conteneurs, volumes.' },
        { type: 'paragraph', text: 'Architecture en couches : pour comprendre comment Docker gère ses données, le cours compare deux Dockerfiles quasi identiques :' },
        { type: 'code', lang: 'dockerfile', caption: 'Dockerfile1 & Dockerfile2 (slide 206)', code: `# Dockerfile1                        # Dockerfile2
FROM ubuntu                           FROM ubuntu
RUN apt-get update && apt-get -y install python
RUN pip install flusk flusk-mysql
COPY . /opt/source-code               COPY app2.py /opt/source-code
ENTRYPOINT FLUSK_APP=/opt/source-code/app.py flusk run
                                      ENTRYPOINT FLUSK_APP=/opt/source-code/app2.py flusk run

docker build -t imageapp .            docker build -t imageapp2 .` },
        { type: 'table', headers: ['Couche', 'Dockerfile1 (1er build)', 'Dockerfile2 (rebuild)'], rows: [
          ['Layer 1 : Base ubuntu Layer', '120 MB', '0 MB (réutilisée du cache)'],
          ['Layer 2 : Changes in apt packages', '306 MB', '0 MB (réutilisée)'],
          ['Layer 3 : Changes in pip packages', '6.3 MB', '0 MB (réutilisée)'],
          ['Layer 4 : Source code', '229 B', '229 B (seule couche recalculée)'],
          ['Layer 5 : Update Entrypoint', '0 MB', '0 MB'],
        ], caption: 'Chaque instruction crée une couche ; les couches inchangées sont réutilisées (cache)' },
        { type: 'diagram', diagram: 'v-docker-layers' },
      ],
    },
  ],
}

export const vmod12: Module = {
  id: 'v12',
  num: 12,
  title: 'Compose, Registry & cgroups',
  subtitle: 'docker-compose, application voting-app, registres Docker, limites de ressources',
  icon: '🧰',
  color: 'violet',
  source: 'Partie 4 — Compose & Registry (slides 207-218)',
  sections: [
    {
      id: 'v12s1',
      title: 'Docker Compose : principe',
      blocks: [
        { type: 'definition', term: 'Docker Compose', def: 'Outil permettant de définir et d\u2019exécuter des applications Docker à conteneurs multiples. Avec Compose, vous utilisez un fichier au format YAML (docker-compose.yml) pour configurer les services de votre application. Ensuite, avec une seule commande, vous créez et démarrez tous les services : $ docker-compose up' },
        { type: 'code', lang: 'bash', caption: 'Sans Compose (4 commandes) → avec Compose (1 fichier + 1 commande)', code: `$ docker run --name=web simple-web-app
$ docker run --name=database mongodb
$ docker run --name=messaging redis:alpine
$ docker run --name=orchestration ansible
# ⟶ devient docker-compose.yml :
services:
  web:
    image: "simple-web-app"
  database:
    image: "mongodb"
  messaging:
    image: "redis"
  orchestration:
    image: "ansible"
# puis : $ docker-compose up` },
      ],
    },
    {
      id: 'v12s2',
      title: 'Exemple : l\u2019application de vote (voting-app)',
      blocks: [
        { type: 'paragraph', text: 'Exemple fourni dans la documentation de Docker : une application qui permet de voter chats ou chiens et d\u2019afficher les résultats du vote. (Source du cours : https://github.com/eesprit/example-voting-app)' },
        { type: 'list', items: [
          'Voting-app : web application développée en Python.',
          'Redis : cache mémoire.',
          'Worker : développé en Java.',
          'PostgreSQL : pour stocker les données du vote.',
          'Result-app : pour présenter les résultats.',
        ] },
        { type: 'paragraph', text: 'Flux : l\u2019utilisateur vote sur /vote?act=cat → voting-app → setData dans Redis → worker lit vote=cat → Vote(cat) stocké dans db → /results interroge result-app → affichage CATS/DOGS.' },
        { type: 'diagram', diagram: 'v-compose-voting' },
      ],
    },
    {
      id: 'v12s3',
      title: 'Démarrage manuel (lourd) vs docker-compose',
      blocks: [
        { type: 'paragraph', text: 'On peut tenter de démarrer manuellement les services avec la commande run, en utilisant l\u2019option --link pour lier les services. Cette manière est trop lourde : il est plus simple de faire la même chose avec docker-compose.' },
        { type: 'code', lang: 'bash', caption: 'Le démarrage manuel complet (slide 209)', code: `$ docker run -d --name=redis redis
$ docker run -d --name=db postgres:9.4
$ docker run -d --name=vote -p 5000:80 --link=redis:redis eesprit/voting-app-vote
$ docker run -d --name=result -p 5001:80 --link=db:db result-app
$ docker run -d --name=worker --link=redis:redis --link=db:db worker` },
        { type: 'code', lang: 'yaml', caption: 'docker-compose.yml — version "2" (slide 210)', code: `version: "2"
services:
  vote:
    image: eesprit/voting-app-vote
    ports:
      - "5000:80"
    links:
      - redis
  redis:
    image: redis:alpine
  worker:
    image: eesprit/voting-app-worker
    links:
      - redis
      - db
  db:
    image: postgres:9.4
  result:
    image: eesprit/voting-app-result
    links:
      - db
    ports:
      - "5001:80"
# puis : $ docker-compose up` },
        { type: 'note', title: 'Version 2 de docker-compose', text: 'L\u2019option links n\u2019est pas obligatoire : Docker crée automatiquement un lien entre tous les services déclarés dans docker-compose.' },
      ],
    },
    {
      id: 'v12s4',
      title: 'Si les images ne sont pas créées : build dans Compose',
      blocks: [
        { type: 'paragraph', text: 'Si les images n\u2019existent pas encore, chaque service peut être construit à partir de son Dockerfile avec l\u2019option build:' },
        { type: 'code', lang: 'yaml', caption: 'docker-compose.yml avec build (slides 211-213)', code: `version: "2"
services:
  vote:
    build: ./vote
    command: python app.py
    volumes:
     - ./vote:/app
    ports:
      - "5000:80"
  redis:
    image: redis:alpine
    ports: ["6379"]
  worker:
    build: ./worker
  db:
    image: postgres:9.4
  result:
    build: ./result
    command: nodemon --debug server.js
    volumes:
     - ./result:/app
    ports:
     - "5001:80"
     - "5858:5858"` },
        { type: 'kv', items: [
          { k: 'vote/Dockerfile', v: 'FROM python:2.7-alpine · WORKDIR /app · ADD requirements.txt /app/requirements.txt · RUN pip install -r requirements.txt · ADD . /app · EXPOSE 80 · CMD ["gunicorn", "app:app", "-b", "0.0.0.0:80", …] — requirements.txt : Flask, Redis, gunicorn.' },
          { k: 'worker/Dockerfile', v: 'FROM java:openjdk-8-jdk · RUN MAVEN_VERSION=3.3.3 (téléchargement de maven) · WORKDIR /code · ADD pom.xml /code/pom.xml · RUN ["mvn", "dependency:resolve"] · RUN ["mvn", "verify"] · ADD src /code/src · RUN ["mvn", "package"] · CMD ["java", "-jar", "target/worker-jar-with-dependencies.jar"]' },
          { k: 'result/Dockerfile', v: 'FROM node:5.11.0-slim · WORKDIR /app · RUN npm install -g nodemon · ADD package.json /app/package.json · RUN npm config set registry http://registry.npmjs.org · RUN npm install && npm ls · RUN mv /app/node_modules /node_modules · ADD . /app · ENV PORT 80 · EXPOSE 80 · CMD ["node", "server.js"]' },
        ] },
      ],
    },
    {
      id: 'v12s5',
      title: 'Compose : Networking (front-end / back-end)',
      blocks: [
        { type: 'paragraph', text: 'Dans l\u2019architecture réseau de l\u2019application de vote : un réseau front-end relie voting-app et result-app ; un réseau back-end relie redis, db et worker-app.' },
        { type: 'code', lang: 'yaml', caption: 'Réseaux dans docker-compose.yml (slide 214)', code: `version: "2"
services:
  vote:
    image: eesprit/voting-app-vote
    ports:
      - "5000:80"
    networks:
      - front-end
      - back-end
  redis:
    image: redis:alpine
    networks:
      - back-end
  worker:
    image: eesprit/voting-app-worker
    networks:
      - back-end
  db:
    image: postgres:9.4
    networks:
      - back-end
  result:
    image: eesprit/voting-app-result
    ports:
      - "5001:80"
    networks:
      - front-end
      - back-end
networks:
  front-end:
  back-end:` },
      ],
    },
    {
      id: 'v12s6',
      title: 'Docker Registry',
      blocks: [
        { type: 'paragraph', text: 'Les images docker publiques sont stockées dans le cloud : Docker Hub (docker.io). Quand vous exécutez un conteneur nginx avec `docker run nginx`, nginx représente le nom de l\u2019image dans un repository : le repository est nginx (utilisateur docker hub officiel). Format : `docker run user_name/image_name`.' },
        { type: 'definition', term: 'Registry privé', def: 'Docker registry est lui-même une application exposée dans une image docker disponible sur docker hub. Vous pouvez installer dans le host un annuaire privé d\u2019images.' },
        { type: 'code', lang: 'bash', caption: 'Registry privé sur le port 5000 (slide 216)', code: `$ docker run -d -p 5000:5000 --name my-registry registry:2
# Pousser et récupérer une image dans ce registre interne :
$ docker image tag my-image localhost:5000/my-image
$ docker push localhost:5000/my-image
$ docker pull localhost:5000/my-image` },
        { type: 'code', lang: 'bash', caption: 'Annuaire interne d\u2019une organisation (slide 217)', code: `# L'accès passe par une opération d'authentification :
$ docker login private-registry.io
# Pour accéder à une image :
$ docker run private-registry.io/apps/internal-app` },
      ],
    },
    {
      id: 'v12s7',
      title: 'Restriction des ressources avec cgroups',
      blocks: [
        { type: 'paragraph', text: 'Par défaut, un conteneur peut utiliser TOUTES les ressources disponibles (CPUs et RAM) dans le host Linux. Pour restreindre l\u2019utilisation des ressources d\u2019un conteneur :' },
        { type: 'code', lang: 'bash', caption: 'Limites CPU et mémoire (slide 218)', code: `$ docker run --cpus=0.5 nginx      # limite à 0.5 CPU
$ docker run --memory=100m mysql   # limite à 100 Mo de mémoire` },
      ],
    },
  ],
}

export const vmod13: Module = {
  id: 'v13',
  num: 13,
  title: 'Orchestration & Docker Swarm',
  subtitle: 'Pourquoi orchestrer, cluster Swarm, services, scaling, rolling update, rollback, drain',
  icon: '🐝',
  color: 'violet',
  source: 'Partie 5 — Orchestration des conteneurs (slides 219-250)',
  sections: [
    {
      id: 'v13s1',
      title: 'Pourquoi l\u2019orchestration ?',
      blocks: [
        { type: 'paragraph', text: 'Besoin de démarrer plusieurs instances pour des raisons de :' },
        { type: 'kv', items: [
          { k: 'Scalabilité', v: 'Répondre de manière efficace à une variation de la charge de travail.' },
          { k: 'Tolérance aux pannes', v: 'Capacité à continuer de fonctionner de manière fiable et à fournir des services même en présence de pannes matérielles, logicielles ou de réseau.' },
          { k: 'Disponibilité', v: 'Le système est fonctionnel et répond aux demandes des utilisateurs de manière fiable et sans interruption pendant une période donnée.' },
          { k: 'Montée en charge', v: 'Augmentation de la quantité de travail sur le système.' },
        ] },
        { type: 'note', title: 'Le problème', text: 'Si une instance tombe en panne, il faut la remplacer. Si Docker Engine tombe en panne, TOUS les conteneurs vont crasher. L\u2019orchestration des conteneurs est la solution à ce problème.' },
      ],
    },
    {
      id: 'v13s2',
      title: 'Définition et outils d\u2019orchestration',
      blocks: [
        { type: 'definition', term: 'Orchestration des conteneurs', def: 'Un ensemble d\u2019outils et de scripts qui permettent l\u2019automatisation des opérations : scalabilité des conteneurs (adapter la taille d\u2019un ensemble de conteneurs selon les besoins), réplication des conteneurs, haute disponibilité, bilan de santé des conteneurs, etc.' },
        { type: 'list', items: [
          'Exemples d\u2019outils : Docker Swarm, Kubernetes, MESOS.',
        ] },
      ],
    },
    {
      id: 'v13s3',
      title: 'Docker Swarm : principe',
      blocks: [
        { type: 'paragraph', text: 'Docker Swarm permet de combiner plusieurs machines ensemble pour former un cluster. Il prend en charge la distribution et la réplication des instances de services des applications dans des hosts distribués, pour la haute disponibilité et l\u2019équilibre de charges à travers différents systèmes et hardwares.' },
        { type: 'paragraph', text: 'Pour configurer Swarm il faut :' },
        { type: 'steps', items: [
          { title: 'Démarrer plusieurs hosts docker', text: 'Exemple du cours : 3 VM ubuntu avec Docker engine installé — Host 1 : 192.168.57.3, Host 2 : 192.168.57.4, Host 3 : 192.168.57.5. Dans une machine physique, connecter 3 terminaux avec SSH aux 3 hosts.' },
          { title: 'Désigner un manager et des workers', text: 'Un host en tant que manager (docker swarm init), les autres en tant que workers (docker swarm join).' },
          { title: 'Exécuter les commandes « docker service » sur le manager', text: '$ docker service create --replicate=4 -p 8080:80 my-app' },
        ] },
      ],
    },
    {
      id: 'v13s4',
      title: 'Démarrer un Swarm Manager',
      blocks: [
        { type: 'code', lang: 'bash', caption: 'swarm init (slide 224)', code: `$ sudo docker swarm init --advertise-addr 192.168.57.3 --listen-addr 192.168.57.3

Swarm initialized: current node (ssslatiguj2krc73fv7143r71) is now a manager.
To add a worker to this swarm, run the following command:
    docker swarm join --token SWMTKN-1-3w4cwlyti2kelxf70vb2m0ul56rbavtsrnwnoc7s3
    9fi7pdjzj-3w7zsj6gol8iybcm7reoha7e4 192.168.57.3:2377
To add a manager to this swarm, run 'docker swarm join-token manager'` },
        { type: 'kv', items: [
          { k: 'Port par défaut de Swarm', v: '2377' },
          { k: 'Advertise-addr', v: 'Adresse où le swarm manager accepte les connexions à partir des autres nœuds.' },
          { k: 'Listen-addr', v: 'Adresse d\u2019écoute pour accéder au cluster swarm depuis l\u2019extérieur.' },
        ] },
      ],
    },
    {
      id: 'v13s5',
      title: 'Ajouter des nœuds Workers',
      blocks: [
        { type: 'code', lang: 'bash', caption: 'swarm join (slides 225-226)', code: `$ sudo docker swarm join --token SWMTKN-1-3w4cwlyti2kelxf70vb2m0ul56rbavtsrnwnoc7s3
9fi7pdjzj-3w7zsj6gol8iybcm7reoha7e4 192.168.57.3:2377

This node joined a swarm as a worker.
# On refait la même chose sur une autre machine (Host 3).` },
        { type: 'code', lang: 'bash', caption: 'Lister les nœuds du cluster (slide 227)', code: `$ sudo docker node ls
ID                      HOSTNAME   STATUS   AVAILABILITY   MANAGER STATUS   ENGINE VERSION
ssslatiguj2krc73fv7143r71 *  host1  Ready    Active         Leader           19.03.1
tw9is2zomef5zya9b9w7wp37k    host2  Ready    Active                          19.03.1
graghbpploymjdjn2bfdfp2s7i   host3  Ready    Active                          19.03.1` },
      ],
    },
    {
      id: 'v13s6',
      title: 'Créer, lister et inspecter un service',
      blocks: [
        { type: 'code', lang: 'bash', caption: 'Service foo (slides 228-231)', code: `$ sudo docker service create --name foo alpine ping 8.8.8.8
i4j4cvvg250jkfx96ge811xhg
overall progress: 1 out of 1 tasks
1/1: running
verify: Service converged

$ sudo docker service ls
ID              NAME   MODE         REPLICAS  IMAGE
i4j4cvvg250j    foo    replicated   1/1       alpine:latest

$ sudo docker service ps foo
ID          NAME   IMAGE           NODE    DESIRED STATE   CURRENT STATE
asgwvidbjztj foo.1 alpine:latest   host1   Running         Running about a minute ago

$ sudo docker service logs foo
foo.1.asgwvidbjztj@host1 | PING 8.8.8.8 (8.8.8.8): 56 data bytes
foo.1.asgwvidbjztj@host1 | 64 bytes from 8.8.8.8: seq=0 ttl=53 time=26.57 ms` },
      ],
    },
    {
      id: 'v13s7',
      title: 'Exemple web et suppression',
      blocks: [
        { type: 'code', lang: 'bash', caption: 'Service web puis rm (slides 232-233)', code: `$ sudo docker service create --name web -p 80:80 emilevauge/whoami
k2xn8uwyr91gb940krlw5pp15
overall progress: 1 out of 1 tasks · 1/1: running · verify: Service converged

$ sudo docker service ps web
d36tyft9qr07  web.1  emilevauge/whoami:latest  host1  Running  Running 19 seconds ago

$ sudo docker service rm web
web` },
      ],
    },
    {
      id: 'v13s8',
      title: 'Déployer une application 3 services avec réseau overlay sécurisé',
      blocks: [
        { type: 'paragraph', text: 'Déploiement d\u2019une application avec trois services mongo, back et front sur un réseau sécurisé.' },
        { type: 'definition', term: 'Réseau overlay', def: '--driver overlay : les réseaux overlay sont utilisés dans des environnements distribués comme Docker Swarm pour permettre la communication entre les conteneurs sur différents hôtes.' },
        { type: 'code', lang: 'bash', caption: 'Les 4 commandes du déploiement (slides 234-237)', code: `# 1) Créer le réseau overlay chiffré
$ sudo docker network create --driver overlay --opt encrypted exquisite
zww262r0ze6zzrb67qqz5v0do

# 2) Service back (avec limites mémoire)
$ sudo docker service create --name back --network exquisite --limit-memory 64M \\
    --reserve-memory 64M vdemeeester/exquisite-words-java:v1

# 3) Service mongo
$ sudo docker service create --name mongo --network exquisite mongo:3.3.8

# 4) Service front (port 808 exposé)
$ sudo docker service create --name front --network exquisite -p 808:80 \\
    vdemeeester/exquisite-web:v1
# → application accessible sur 192.168.57.5:808 ("A shiny micro-service helps…")` },
      ],
    },
    {
      id: 'v13s9',
      title: 'Mise à l\u2019échelle (scaling)',
      blocks: [
        { type: 'code', lang: 'bash', caption: 'Scale back à 15 instances, front à 2 (slides 240-242)', code: `$ sudo docker service scale back=15
back scaled to 15
overall progress: 0 out of 15 tasks
...
15/15: running
verify: Service converged

$ sudo docker service ls
pz26k7fz70ok   back    replicated  15/15  vdemeeester/exquisite-words-java:v1
kdttw33h0fn0   front   replicated  1/1    vdemeeester/exquisite-web:v1   *:808->80/tcp
x6vqms9ybjvl   mongo   replicated  1/1    mongo:3.3.8

$ sudo docker service scale front=2
front scaled to 2 · overall progress: 2 out of 2 tasks · 1/2: running · 2/2: running
# → les 15 B sont répartis sur les 3 hosts ; les 2 F sur host2 et host3` },
      ],
    },
    {
      id: 'v13s10',
      title: 'Déployer une mise à jour (rolling update)',
      blocks: [
        { type: 'code', lang: 'bash', caption: 'Mise à jour des services back et front (slides 244-246)', code: `# Mise à jour du service back : 2 tâches à la fois, 10 s entre chaque
$ sudo docker service update --update-parallelism 2 --update-delay 10s back
back
overall progress: 0 out of 15 tasks
4/15: running
15/15: running
verify: Service converged

# Mise à jour du service front vers la v2 de l'image
$ sudo docker service update --image vdemeeester/exquisite-web:v2 front
front
overall progress: 2 out of 2 tasks
1/2: running
2/2: running
verify: Service converged` },
      ],
    },
    {
      id: 'v13s11',
      title: 'Rollback',
      blocks: [
        { type: 'code', lang: 'bash', caption: 'Annuler la mise à jour (slides 247-248)', code: `$ sudo docker service update --rollback front

front
rollback: manually requested rollback
overall progress: rolling back update: 2 out of 2 tasks
1/2: running
2/2: running
verify: Service converged` },
      ],
    },
    {
      id: 'v13s12',
      title: 'Suspendre un nœud worker (drain)',
      blocks: [
        { type: 'code', lang: 'bash', caption: 'Drain du host3 (slide 249)', code: `$ sudo docker node update --availability drain host3
host3

# Toutes les instances des services déployées dans le nœud Host 3
# vont MIGRER vers les autres nœuds du cluster.` },
      ],
    },
    {
      id: 'v13s13',
      title: 'Conditionner le démarrage : contraintes & mode global',
      blocks: [
        { type: 'code', lang: 'bash', caption: 'Contraintes et mode global (slide 250)', code: `# Contrainte : ne démarrer que sur des nœuds avec le label engine.label==ssd
$ sudo docker service create --name svc1 --constraint engine.label==ssd nginx
16e79p5yoh66242t9s684nfhi
overall progress: 0 out of 1 tasks
1/1: no suitable node (scheduling constraints not satisfied on 2 nodes; 1 node …)
Operation continuing in background.

# Mode global : une instance sur CHAQUE nœud du cluster
$ sudo docker service create --mode global alpine ping 8.8.8.8
bnszchxi5kmjo9s f4gfm2qq9u
overall progress: 2 out of 2 tasks
tw9is2zomef5: running
ssslatiguj2k: running
verify: Service converged` },
        { type: 'diagram', diagram: 'v-swarm-cluster' },
      ],
    },
  ],
}
