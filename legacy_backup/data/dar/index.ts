import { dmod1, dmod2 } from './mod1'
import { dmod3, dmod4 } from './mod2'
import { dmod5, dmod6 } from './mod3'
import { dmod7, dmod8 } from './mod4'
import { dmod9, dmod10 } from './mod5'
import { dmod11, dmod12 } from './mod6'
import { dmod13, dmod14 } from './mod7'
import type { Module } from '../types'

export const dmodules: Module[] = [
  dmod1, dmod2, dmod3, dmod4, dmod5, dmod6, dmod7,
  dmod8, dmod9, dmod10, dmod11, dmod12, dmod13, dmod14,
]

export type GlossaryTerm = { term: string; def: string; module?: string }

export const dglossary: GlossaryTerm[] = [
  // M1 — Contexte
  { term: 'Application répartie', def: 'Application dont les composants logiciels s\u2019exécutent sur plusieurs ordinateurs (ou nœuds) reliés par un réseau, et qui coopèrent pour fournir un service unique et cohérent à l\u2019utilisateur final. Synonyme : application distribuée.', module: 'd1' },
  { term: 'Système réparti', def: 'Ensemble de machines autonomes reliées par un réseau, qui coopèrent pour offrir l\u2019illusion d\u2019un système unique et cohérent. C\u2019est l\u2019infrastructure matérielle et logicielle.', module: 'd1' },
  { term: 'Nœud', def: 'Machine physique (ordinateur, serveur, smartphone, capteur IoT) ou unité logique (processus, service, application) participant au système réparti.', module: 'd1' },
  { term: 'Scalabilité', def: 'Capacité du système à augmenter efficacement ses ressources pour supporter une charge plus élevée sans dégradation notable des performances.', module: 'd1' },
  { term: 'Service', def: 'Fonctionnalité offerte par une application répartie (authentification, messagerie, paiement…). Peut être offert par plusieurs serveurs et consommé par plusieurs applications.', module: 'd1' },
  { term: 'Interface', def: 'Contrat définissant quelles opérations on peut demander au service et comment les appeler (HTTP, API REST, message JSON…).', module: 'd1' },
  // M2 — Communication répartie
  { term: 'Communication répartie', def: 'Ensemble des mécanismes, protocoles et modèles permettant à deux entités d\u2019un système distribué d\u2019échanger des données et de coordonner leurs actions, malgré la séparation physique des machines.', module: 'd2' },
  { term: 'Middleware', def: 'Couche logicielle intermédiaire qui facilite la communication et la transparence entre nœuds (CORBA, Java RMI, …).', module: 'd2' },
  { term: 'Canal de communication', def: 'Support de transmission des données (réseau filaire, Wi-Fi, Internet, protocoles).', module: 'd2' },
  { term: 'Communication synchrone', def: 'L\u2019émetteur envoie une requête et attend la réponse avant de poursuivre. Avantage : simplicité. Limite : blocage en attente.', module: 'd2' },
  { term: 'Communication asynchrone', def: 'L\u2019émetteur envoie sans attendre la réponse ; le receveur répond plus tard. Avantage : tolérance aux délais. Limite : complexité des retours différés.', module: 'd2' },
  { term: 'Unicast', def: 'Communication entre un seul émetteur et un seul récepteur (un à un). Ex. : requête client → serveur.', module: 'd2' },
  { term: 'Multicast', def: 'Un émetteur envoie un message à un groupe spécifique de récepteurs. Ex. : visioconférence diffusée aux participants.', module: 'd2' },
  { term: 'Broadcast', def: 'Un émetteur diffuse le message à TOUS les nœuds d\u2019un réseau.', module: 'd2' },
  // M3 — Modèles
  { term: 'RPC (Remote Procedure Call)', def: 'Appeler à distance une procédure/fonction sur un autre système comme si elle était locale. La complexité réseau est cachée via des stubs.', module: 'd3' },
  { term: 'RMI (Remote Method Invocation)', def: 'Les entités sont des objets distants exposant leurs fonctionnalités via une interface distante ; invocation transparente. Implémenté par Java RMI et CORBA.', module: 'd3' },
  { term: 'Pub/Sub', def: 'Modèle publication/abonnement : les publishers publient des événements sans connaître les récepteurs ; les subscribers s\u2019abonnent aux types d\u2019événements qui les intéressent.', module: 'd3' },
  { term: 'Communication orientée flux', def: 'Modèle temps réel basé sur le transfert continu de données (audio, vidéo), unidirectionnel ou bidirectionnel. Ex. : Netflix, Zoom.', module: 'd3' },
  { term: 'QoS', def: 'Quality of Service : qualité de service à gérer dans les communications orientées flux (latence, synchronisation).', module: 'd3' },
  // M4 — Réseau
  { term: 'Modèle OSI', def: 'Modèle théorique (ISO, fin des années 1970) standardisant la communication en 7 couches distinctes.', module: 'd4' },
  { term: 'Modèle TCP/IP (Internet)', def: 'Modèle pratique réellement utilisé : 4 couches fonctionnelles (Application, Transport, Internet, Accès au réseau).', module: 'd4' },
  { term: 'Segment', def: 'Unité de données produite par la couche transport : données découpées + en-tête (numéro de segment, ports).', module: 'd4' },
  { term: 'Paquet IP', def: 'Segment encapsulé par la couche réseau avec les adresses IP source et destination.', module: 'd4' },
  { term: 'Trame', def: 'Conteneur (suite de bits 0 et 1) produit par la couche liaison de données ; circule directement sur le support physique entre deux machines du même LAN.', module: 'd4' },
  { term: 'Adresse MAC', def: 'Identifiant physique utilisé par la couche liaison de données pour identifier l\u2019émetteur et le destinataire sur le réseau local.', module: 'd4' },
  { term: 'MTU', def: 'Maximum Transmission Unit : taille maximale d\u2019un paquet. Au-delà, le paquet est fragmenté puis réassemblé à la réception.', module: 'd4' },
  { term: 'Routage', def: 'Trouver le meilleur chemin pour faire circuler les paquets entre plusieurs réseaux (couche réseau).', module: 'd4' },
  { term: 'Encapsulation', def: 'Chaque couche ajoute ses propres informations (en-tête) aux données reçues de la couche supérieure : Message → Segment → Paquet → Trame → Bits.', module: 'd4' },
  { term: 'Désencapsulation', def: 'À la réception, chaque couche lit et retire ses en-têtes pour ne garder que les données destinées à la couche supérieure.', module: 'd4' },
  { term: 'Protocole', def: 'Ensemble de règles et de normes qui définissent comment les nœuds communiquent entre eux.', module: 'd4' },
  // M5 — TCP/UDP
  { term: 'TCP', def: 'Transmission Control Protocol : protocole de transport orienté connexion, fiable, ordonné, sans perte ni duplication.', module: 'd5' },
  { term: 'UDP', def: 'User Datagram Protocol : protocole de transport non orienté connexion ; envoie des datagrammes sans garantie de livraison.', module: 'd5' },
  { term: '3-way handshake', def: 'Établissement de connexion TCP en 3 étapes : SYN (client) → SYN-ACK (serveur) → ACK (client).', module: 'd5' },
  { term: 'SYN', def: 'Synchronize : message TCP demandant de commencer la synchronisation (1re étape du handshake).', module: 'd5' },
  { term: 'ACK', def: 'Acknowledgement : accusé de réception confirmant la bonne réception des données.', module: 'd5' },
  { term: 'Checksum', def: 'Valeur calculée à partir du contenu d\u2019un message ; placée dans l\u2019en-tête UDP et recalculée par le récepteur pour détecter une erreur. Calcul facultatif en UDP.', module: 'd5' },
  { term: 'Datagramme', def: 'Unité de données UDP : envoyé indépendamment, sans connexion, sans garantie d\u2019ordre ni de réception.', module: 'd5' },
  // M6 — Ports & voyage
  { term: 'Numéro de port', def: 'Identifiant logique (un nombre) utilisé par l\u2019OS pour distinguer les applications qui communiquent sur le réseau ; dirige les messages vers le bon programme.', module: 'd6' },
  { term: 'NAT', def: 'Network Address Translation : le routeur remplace l\u2019IP source privée par son IP publique (et fait la NAT inverse à l\u2019arrivée).', module: 'd6' },
  { term: 'HTTP / HTTPS', def: 'Transfert de pages web — ports 80 / 443.', module: 'd6' },
  { term: 'FTP', def: 'File Transfer Protocol : envoyer/recevoir des fichiers — port 21.', module: 'd6' },
  { term: 'SMTP', def: 'Simple Mail Transfer Protocol : envoi de mails — port 25.', module: 'd6' },
  { term: 'POP3 / IMAP', def: 'Récupérer les mails — ports 110 / 143.', module: 'd6' },
  { term: 'DNS', def: 'Domain Name System : convertir un nom de domaine en adresse IP — port 53.', module: 'd6' },
  { term: 'DHCP', def: 'Attribution dynamique d\u2019une IP à un poste — ports 67-68.', module: 'd6' },
  { term: 'SSH / Telnet', def: 'Contrôler un ordinateur à distance (avec / sans chiffrement) — ports 22 / 23.', module: 'd6' },
  { term: 'SNMP', def: 'Simple Network Management Protocol : gérer et surveiller les équipements réseau — port 161.', module: 'd6' },
  // M7 — Sockets
  { term: 'Socket', def: 'Interface logicielle (point d\u2019accès) entre l\u2019application et le protocole de transport ; couple (adresse IP, port) identifiant une application précise.', module: 'd7' },
  { term: 'Socket endpoint', def: 'Le couple (IP, port) forme un socket endpoint unique sur une machine.', module: 'd7' },
  { term: 'Quadruplet', def: '(IP_client, Port_client, IP_serveur, Port_serveur) : identifie une communication TCP ou UDP.', module: 'd7' },
  { term: 'Port éphémère', def: 'Port source temporaire choisi par le client (ex. : 53000) pour une communication sortante.', module: 'd7' },
  { term: 'ServerSocket', def: 'Classe Java côté serveur pour écouter les connexions entrantes sur un port donné.', module: 'd7' },
  { term: 'InputStream / OutputStream', def: 'Les flux Java utilisés après acceptation d\u2019une connexion TCP pour lire/écrire les données.', module: 'd7' },
  { term: 'DatagramSocket', def: 'Classe Java représentant la « prise » de communication pour envoyer ou recevoir des datagrammes (UDP).', module: 'd7' },
  { term: 'DatagramPacket', def: 'Classe Java représentant le paquet de données à transmettre : contient les données, l\u2019adresse IP du destinataire et le port.', module: 'd7' },
  // M8 — Bas vs haut niveau
  { term: 'Marshalling', def: 'Conversion des paramètres en une représentation binaire (Protobuf, Thrift) ou textuelle (JSON, XML) pour transport. Synonyme : sérialisation.', module: 'd8' },
  { term: 'Unmarshalling', def: 'Reconstitution des paramètres à l\u2019autre bout. Synonyme : désérialisation.', module: 'd8' },
  // M9 — RPC
  { term: 'IDL (Interface Definition Language)', def: 'Fichier décrivant les fonctions accessibles à distance (noms, paramètres, types de retour). Écrit par le développeur du service.', module: 'd9' },
  { term: 'Stub client (proxy)', def: 'Code généré côté client qui remplace l\u2019appel réel et s\u2019occupe du marshalling + envoi.', module: 'd9' },
  { term: 'Skeleton (stub serveur)', def: 'Code côté serveur qui reçoit les messages, fait l\u2019unmarshalling et appelle la procédure réelle.', module: 'd9' },
  { term: 'RPC runtime', def: 'Couche logicielle interne fournie par la bibliothèque RPC : envoie les messages via le réseau (sockets TCP/UDP), gère transmission, attente et réception.', module: 'd9' },
  { term: 'rpcgen', def: 'Outil de génération de code pour ONC RPC (Sun RPC).', module: 'd9' },
  { term: 'MIDL', def: 'Microsoft IDL Compiler : outil de génération pour Microsoft RPC (Windows).', module: 'd9' },
  { term: 'Naming service', def: 'Annuaire de services : indique au client sur quelle machine/port se trouve le service (CORBA, RMI Registry, gRPC).', module: 'd9' },
  { term: 'Dead Letter Queue', def: 'File où est envoyé un message après un nombre maximal de tentatives de livraison échouées.', module: 'd9' },
  // M10 — CORBA/RMI
  { term: 'CORBA', def: 'Common Object Request Broker Architecture (OMG, début des années 1990) : standard permettant à des programmes de langages différents d\u2019appeler des méthodes d\u2019objets distants.', module: 'd10' },
  { term: 'ORB', def: 'Object Request Broker : intermédiaire CORBA qui transporte les requêtes et gère la communication réseau. Même rôle que le RPC runtime.', module: 'd10' },
  { term: 'UnicastRemoteObject', def: 'Classe Java dont doit hériter la classe d\u2019implémentation distante RMI : rend un objet disponible et accessible à distance.', module: 'd10' },
  { term: 'java.rmi.Remote', def: 'Interface marqueur Java : indique que les méthodes définies peuvent être appelées à distance.', module: 'd10' },
  { term: 'RemoteException', def: 'Exception que toutes les méthodes distantes RMI doivent déclarer avec throws.', module: 'd10' },
  { term: 'Registre RMI', def: 'Service de nommage (port 1099 par défaut) qui associe un nom logique à un objet distant ; stocke les références d\u2019objets distants exportés.', module: 'd10' },
  { term: 'Naming.rebind', def: 'Méthode Java pour enregistrer un objet distant dans le registre sous un nom logique (ex. : rmi://localhost/HelloService).', module: 'd10' },
  { term: 'Naming.lookup', def: 'Méthode Java pour localiser l\u2019objet distant via le registre et obtenir une référence distante (le stub).', module: 'd10' },
  { term: 'rmiregistry', def: 'Commande démarrant le registre RMI ; écoute par défaut sur le port 1099 ; à lancer dans le répertoire des classes compilées.', module: 'd10' },
  { term: 'rmic', def: 'Compilateur RMI : générait initialement stubs et skeletons ; depuis Java 5, le skeleton est créé dynamiquement.', module: 'd10' },
  // M11 — Architectures fondations
  { term: 'Architecture (application répartie)', def: 'Manière dont les composants logiciels sont organisés, répartis sur plusieurs machines et coordonnent leurs interactions pour fournir un service global.', module: 'd11' },
  { term: 'Fiabilité', def: 'Capacité à fonctionner correctement sur une longue durée sans erreurs ni interruptions.', module: 'd11' },
  { term: 'Tolérance aux pannes', def: 'Aptitude à continuer de fonctionner malgré la défaillance de l\u2019un de ses composants.', module: 'd11' },
  { term: 'Disponibilité', def: 'Capacité à rester opérationnel et accessible aux utilisateurs quasiment en permanence.', module: 'd11' },
  { term: 'Maintenabilité', def: 'Facilité avec laquelle le système peut être corrigé, modifié ou amélioré sans perturber son fonctionnement global.', module: 'd11' },
  { term: 'Modularité', def: 'Capacité à être composé de modules indépendants, facilitant développement, compréhension et remplacement.', module: 'd11' },
  { term: 'Faible couplage', def: 'Les composants interagissent avec un minimum de dépendances, permettant une évolution indépendante des modules.', module: 'd11' },
  { term: 'Interopérabilité', def: 'Capacité à communiquer et fonctionner avec d\u2019autres systèmes ou technologies, quels que soient leurs langages ou plateformes.', module: 'd11' },
  { term: 'Transparence', def: 'Masquer la complexité et la distribution du système pour que l\u2019utilisateur ou le programmeur perçoive un fonctionnement homogène et simple.', module: 'd11' },
  { term: 'Compatibilité', def: 'Capacité à fonctionner correctement avec d\u2019autres logiciels, protocoles ou versions.', module: 'd11' },
  // M12 — Classiques
  { term: 'Architecture client-serveur', def: 'Modèle divisant l\u2019application en deux parties : le client envoie des requêtes, le serveur traite et répond. Accès à des ressources centralisées via un réseau.', module: 'd12' },
  { term: 'Architecture en couches', def: 'Modèle conceptuel organisant l\u2019application en niveaux logiques, chacun avec une responsabilité propre, ne communiquant qu\u2019avec les couches voisines.', module: 'd12' },
  { term: 'Architecture 3-tiers', def: 'Sépare physiquement l\u2019interface utilisateur (presentation tier), la logique applicative (business logic tier) et les données (data tier).', module: 'd12' },
  { term: 'Architecture n-tiers', def: 'Basée sur le Web : rajoute des tiers supplémentaires (serveur Web) aux trois tiers de base.', module: 'd12' },
  { term: 'P2P (Pair-à-Pair)', def: 'Modèle où chaque nœud (pair) joue simultanément le rôle de client et de serveur ; pas de serveur central ; décentralisé, autonome, scalable, robuste.', module: 'd12' },
  // M13 — Modernes
  { term: 'SOA', def: 'Architecture orientée services : fonctionnalités organisées en services indépendants accessibles via des interfaces standardisées (REST, SOAP).', module: 'd13' },
  { term: 'ESB', def: 'Enterprise Service Bus : mécanisme d\u2019intégration SOA qui assure le routage, la transformation et la médiation entre services. Peut devenir un goulot.', module: 'd13' },
  { term: 'Registre de services', def: 'Annuaire qui référence les services disponibles et permet leur découverte par les consommateurs (publish / find / bind).', module: 'd13' },
  { term: 'Microservices', def: 'Application décomposée en petits services indépendants et autonomes : propre processus, propre données, API légères (REST, gRPC), développement/déploiement/scaling indépendants.', module: 'd13' },
  { term: 'API Gateway', def: 'Point d\u2019entrée unique pour les clients ; reçoit les requêtes et les redirige vers les microservices appropriés.', module: 'd13' },
  { term: 'Orchestrateur', def: 'Plateforme qui gère automatiquement les conteneurs : déploiement, redémarrage, scaling, réseau interne (ex. : Kubernetes).', module: 'd13' },
  { term: 'EDA', def: 'Event-Driven Architecture : les composants réagissent à des événements ou changements d\u2019état au lieu de requêtes directes ; communication découplée et asynchrone.', module: 'd13' },
  { term: 'Serverless', def: 'Modèle où l\u2019application repose sur des services cloud entièrement gérés ; le développeur ne gère ni serveurs, ni configuration, ni mise à l\u2019échelle ; paiement à l\u2019usage.', module: 'd13' },
  { term: 'FaaS', def: 'Functions-as-a-Service : exécution du code à la demande, sous forme de petites fonctions déclenchées par des événements.', module: 'd13' },
  // M14 — Asynchronisme
  { term: 'Découplage temporel', def: 'L\u2019émetteur et le récepteur n\u2019ont plus l\u2019obligation d\u2019agir au même moment.', module: 'd14' },
  { term: 'Découplage spatial', def: 'Les acteurs n\u2019ont pas nécessairement connaissance l\u2019un de l\u2019autre.', module: 'd14' },
  { term: 'Producteur', def: 'Entité qui génère un message/événement/tâche, l\u2019envoie vers un système intermédiaire sans attendre, et continue son exécution.', module: 'd14' },
  { term: 'Consommateur', def: 'Entité qui reçoit le message, le traite plus tard selon sa disponibilité ; unique ou multiple (point-à-point ou pub/sub).', module: 'd14' },
  { term: 'Broker', def: 'Intermédiaire qui stocke les messages, les achemine, garantit la livraison et gère les pics de charge (ex. : RabbitMQ, Kafka).', module: 'd14' },
  { term: 'Message Passing', def: 'Envoi direct de messages point-à-point, destinataire unique, sans intermédiaire de persistance : si le récepteur est indisponible, le message peut être perdu. Tech : RabbitMQ, NATS, MSMQ.', module: 'd14' },
  { term: 'Queue-based Messaging', def: 'Le message est placé dans une file d\u2019attente gérée par un broker ; consommé par UN SEUL destinataire ; la queue = mémoire temporaire + régulation des pics. Tech : RabbitMQ, Kafka, ActiveMQ.', module: 'd14' },
  { term: 'Streaming d\u2019événements', def: 'Événements capturés, stockés et traités en continu sous forme de flux ; persistés dans un log append-only distribué. Tech : Kafka Streams, Pulsar, Kinesis.', module: 'd14' },
  { term: 'Log append-only', def: 'Journal en écriture seulement : stockage des événements en streaming où l\u2019on n\u2019ajoute qu\u2019à la fin.', module: 'd14' },
  { term: 'NACK', def: 'Negative ACK : indique un échec de traitement d\u2019un message.', module: 'd14' },
  { term: 'Exponential backoff', def: 'Stratégie de réessai avec attente croissante : t, 2t, 4t…', module: 'd14' },
  { term: 'Jitter', def: 'Ajout d\u2019aléa dans les réessais pour éviter les pics synchrones.', module: 'd14' },
  { term: 'Partitionnement', def: 'Divise un flux en sous-flux traités en parallèle ; gagne en scalabilité mais abandonne l\u2019ordre global (ordre local par partition seulement).', module: 'd14' },
  { term: 'At-most-once', def: 'Au-plus-une fois : envoi sans réessai ; le message peut être perdu mais jamais livré deux fois. Ex. : logs.', module: 'd14' },
  { term: 'At-least-once', def: 'Au-moins-une fois : réémission tant que pas d\u2019ACK ; livraison garantie mais doublons possibles → consommateur idempotent. Ex. : email de confirmation.', module: 'd14' },
  { term: 'Exactly-once', def: 'Exactement-une fois : chaque message traité une seule fois même en cas d\u2019échec/redémarrage ; la plus forte et la plus coûteuse. Ex. : paiement.', module: 'd14' },
  { term: 'Idempotent', def: 'Se dit d\u2019un traitement dont l\u2019exécution multiple produit le même effet qu\u2019une seule exécution — requis en at-least-once.', module: 'd14' },
]
