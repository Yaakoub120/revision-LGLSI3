import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Modules 7 & 8 — Les sockets + Bas niveau vs Haut niveau
// ═══════════════════════════════════════════════════════════════

export const dmod7: Module = {
  id: 'd7',
  num: 7,
  title: 'Les sockets',
  subtitle: 'Le point d\u2019accès entre application et transport : sockets TCP et UDP en Java',
  icon: '🔌',
  color: 'sky',
  source: 'Chapitre 2 Partie 2 — slides 64-75',
  sections: [
    {
      id: 'd7s1',
      title: 'Mécanismes de communication bas niveau : le problème',
      blocks: [
        { type: 'paragraph', text: 'Quand deux applications veulent échanger des données à travers un réseau, elles doivent : 1. s\u2019identifier (adresse IP, port) ; 2. établir un lien de communication fiable ; 3. envoyer et recevoir des messages sous une forme compréhensible par la couche transport. Mais ni l\u2019application ni la couche transport ne peuvent communiquer directement ! C\u2019est là qu\u2019intervient la socket.' },
        { type: 'note', title: 'Rappel du contexte', text: 'Application ⇄ Socket client ··· Internet ··· Socket serveur ⇄ Application. La socket est l\u2019intermédiaire entre les deux couches.' },
      ],
    },
    {
      id: 'd7s2',
      title: 'Qu\u2019est-ce qu\u2019une socket ?',
      blocks: [
        { type: 'definition', term: 'Socket', def: 'Une socket est une interface logicielle (un point d\u2019accès) entre l\u2019application (couche application) et le protocole de transport (TCP ou UDP).\n\n✓ Un socket est le couple (adresse IP, port) → il identifie une application précise sur une machine.\n✓ Les communications TCP ou UDP sont identifiées par le quadruplet (IP_client, Port_client, IP_serveur, Port_serveur).\n✓ Ce couple forme un socket endpoint unique sur une machine.' },
        { type: 'list', items: [
          'Elle permet à un programme d\u2019envoyer et de recevoir des données comme s\u2019il écrivait dans un canal de communication.',
          'La socket est la « porte » par laquelle les données d\u2019une application sortent pour entrer dans le réseau (et inversement).',
          'Il faut distinguer deux types principaux de sockets, selon le protocole de transport utilisé : les sockets TCP, et les sockets UDP, basées sur l\u2019échange de datagrammes.',
        ] },
        { type: 'note', title: 'Pourquoi les sockets sont indispensables ?', text: 'Sans elles :\n✓ une application ne pourrait pas accéder au réseau,\n✓ les couches basses ne sauraient pas à quelle application livrer les données,\n✓ il n\u2019y aurait pas de moyen simple pour établir ou maintenir une communication bidirectionnelle.' },
      ],
    },
    {
      id: 'd7s3',
      title: 'Principe de base des sockets (5 étapes)',
      blocks: [
        { type: 'steps', items: [
          { title: 'Étape 1 — L\u2019application crée une socket', text: 'L\u2019application (par exemple un client HTTP) veut envoyer un message. Elle crée une socket et demande à la couche transport d\u2019envoyer les données. Source IP : 192.168.1.15, Source Port : 53000 (port éphémère), Destination IP : 142.250.185.78, Destination Port : 80 (HTTP).' },
          { title: 'Étape 2 — Encapsulation par le transport', text: 'La couche transport encapsule les données dans des segments, ajoute les en-têtes de contrôle et les transmet ensuite à la couche suivante.' },
          { title: 'Étape 3 — Acheminement', text: 'Les couches internet et accès au réseau s\u2019occupent d\u2019acheminer les paquets jusqu\u2019à la machine destinataire.' },
          { title: 'Étape 4 — Redirection vers la socket', text: 'La couche transport du destinataire reçoit le paquet, le redirige vers la socket identifiée par le port (80).' },
          { title: 'Étape 5 — Lecture par l\u2019application', text: 'La socket transmet les données à l\u2019application (serveur HTTP par exemple) → l\u2019application lit les données depuis sa socket.' },
        ] },
        { type: 'diagram', diagram: 'SocketFlow' },
      ],
    },
    {
      id: 'd7s4',
      title: 'Les sockets TCP',
      blocks: [
        { type: 'paragraph', text: 'Le protocole TCP est orienté connexion. Avant tout échange, une connexion fiable est établie entre le client et le serveur. Les données circulent ensuite sous forme de flux continus, garantissant : la livraison des données sans perte, le respect de l\u2019ordre d\u2019envoi, et la fiabilité de la communication.' },
        { type: 'kv', items: [
          { k: 'ServerSocket', v: 'Utilisée côté serveur pour écouter les connexions entrantes sur un port donné.' },
          { k: 'Socket', v: 'Utilisée côté client (et aussi côté serveur après acceptation) pour établir la connexion et échanger les données (lecture/écriture via des flux).' },
        ] },
        { type: 'steps', items: [
          { title: '1. Le serveur écoute', text: 'Le serveur crée un objet ServerSocket et se met en attente d\u2019un client sur un port précis.' },
          { title: '2. Le client se connecte', text: 'Le client crée un objet Socket et tente de se connecter à ce port.' },
          { title: '3. Échange par flux', text: 'Une fois la connexion acceptée, les deux programmes peuvent échanger des données en utilisant des flux (InputStream et OutputStream).' },
          { title: '4. Fermeture', text: 'À la fin, les sockets sont fermées.' },
        ] },
        { type: 'note', title: 'Le diagramme du cours (séquence TCP)', text: 'Côté serveur : socket → bind → listen (« Open Listen ») puis accept. Côté client : socket → connect (« Open Client »). Le connect envoie la connection request vers l\u2019accept. Session Client/Serveur : write → read ↔ read ← write. Fin : client close (« End Of File ») → serveur read → serveur close, et le serveur revient sur accept.' },
        { type: 'diagram', diagram: 'TcpUdpSockets' },
      ],
    },
    {
      id: 'd7s5',
      title: 'Les sockets UDP',
      blocks: [
        { type: 'paragraph', text: 'Le protocole UDP est non orienté connexion. Il n\u2019établit aucune connexion préalable entre le client et le serveur. Les données sont envoyées sous forme de datagrammes indépendants : chaque paquet circule séparément dans le réseau, sans garantie d\u2019ordre ni de réception.' },
        { type: 'kv', items: [
          { k: 'DatagramSocket', v: 'Représente la « prise » de communication pour envoyer ou recevoir des datagrammes.' },
          { k: 'DatagramPacket', v: 'Représente le paquet de données à transmettre (il contient les données, l\u2019adresse IP du destinataire et le port).' },
        ] },
        { type: 'steps', items: [
          { title: '1. Le serveur attend', text: 'Le serveur UDP crée un DatagramSocket et attend la réception d\u2019un paquet.' },
          { title: '2. Le client envoie', text: 'Le client UDP crée également un DatagramSocket et envoie un DatagramPacket vers l\u2019adresse et le port du serveur.' },
          { title: '3. Messages indépendants', text: 'Chaque message envoyé est indépendant des autres → il n\u2019existe aucune session ni connexion persistante.' },
          { title: '4. Réponse facultative', text: 'Après réception, le serveur peut répondre via un autre datagramme.' },
        ] },
        { type: 'note', title: 'Le diagramme du cours (séquence UDP)', text: 'Serveur : Create a socket → Bind the socket → Receive request → Send response. Client : Create a socket → Bind the socket → Send the request (data request) → Receive response (data reply).' },
        { type: 'diagram', diagram: 'TcpUdpSockets' },
      ],
    },
  ],
}

export const dmod8: Module = {
  id: 'd8',
  num: 8,
  title: 'Bas niveau vs haut niveau',
  subtitle: 'Sockets vs RPC/RMI : le tableau comparatif et l\u2019historique des mécanismes',
  icon: '⚖️',
  color: 'sky',
  source: 'Chapitre 2 Partie 2 — slides 75-79',
  sections: [
    {
      id: 'd8s1',
      title: 'Rappel : les mécanismes bas niveau (les sockets)',
      blocks: [
        { type: 'paragraph', text: 'Le programmeur gère : la création de la connexion (adresse IP, port) ; l\u2019envoi/réception de flux d\u2019octets ; le format des messages (encodage, protocole applicatif).' },
        { type: 'kv', items: [
          { k: 'Avantage', v: 'Contrôle total, performance.' },
          { k: 'Inconvénient', v: 'Code complexe, risque d\u2019erreurs, couplage fort entre client et serveur.' },
        ] },
        { type: 'paragraph', text: 'Avec la complexité croissante des applications distribuées, les développeurs ont cherché à : simplifier la programmation réseau ; automatiser la gestion des échanges (marshalling, transport, erreurs) ; rendre la communication transparente (comme un appel local) ; assurer l\u2019interopérabilité entre systèmes et langages. → D\u2019où la naissance des mécanismes de communication haut niveau.' },
      ],
    },
    {
      id: 'd8s2',
      title: 'Le tableau comparatif complet',
      blocks: [
        { type: 'table', headers: ['Aspect', 'Bas niveau (Sockets)', 'Haut niveau (RPC, RMI, ...)'], rows: [
          ['Niveau d\u2019abstraction', 'Très bas : le programmeur manipule les paquets, adresses, ports, flux.', 'Élevé : le programmeur appelle simplement une fonction ou méthode distante.'],
          ['Unité d\u2019échange', 'Flux d\u2019octets', 'Appel de fonction / méthode / service'],
          ['Gestion du protocole', 'Manuelle', 'Automatisée'],
          ['Format des données', 'Défini par le programmeur', 'Structuré (JSON, XML, Protobuf...)'],
          ['Complexité du code', 'Élevée (il faut gérer la communication réseau manuellement).', 'Réduite (les détails réseau sont cachés).'],
          ['Contrôle sur les détails réseau', 'Total : la communication réseau est explicite.', 'Transparence partielle : on a l\u2019impression d\u2019un appel local.'],
          ['Objectif', 'Performance, flexibilité (le programmeur contrôle tout)', 'Productivité (facilité et rapidité de développement), simplicité, concentration sur la logique métier, pas sur la communication.'],
        ] },
      ],
    },
    {
      id: 'd8s3',
      title: 'Historique et évolution des mécanismes',
      blocks: [
        { type: 'timeline', items: [
          { time: 'Années 1970 – début 1980', text: 'Sockets — Début des réseaux informatiques : besoin d\u2019envoyer des données entre machines. Mécanisme bas niveau : communication via des flux d\u2019octets, programmation manuelle (adresses IP, ports, protocole TCP/UDP). Très flexible mais complexe.' },
          { time: 'Milieu – fin des années 1980', text: 'RPC (Sun RPC, ONC RPC) — Complexité de programmation avec sockets : les développeurs veulent rendre la communication transparente. Première abstraction haut niveau : appel de procédure distante, sérialisation automatique des arguments, masque le transport réseau.' },
          { time: 'Années 1990', text: 'CORBA, Java RMI, DCOM — Montée de la programmation orientée objet → besoin d\u2019appels de méthodes sur des objets distants. Extension du principe RPC aux objets distants : gestion des références d\u2019objets et des exceptions à distance, communication entre langages et plateformes différentes (CORBA).' },
          { time: 'Années 2000', text: 'SOAP, XML-RPC, Web Services — Explosion du Web → besoin d\u2019interopérabilité et de communication entre applications hétérogènes. Communication via HTTP + XML, standardisation (WSDL, UDDI). Largement utilisé dans les entreprises et systèmes interconnectés.' },
          { time: 'Années 2010', text: 'REST, JSON-RPC, gRPC, Thrift — Généralisation du Web, besoin de légèreté et de scalabilité. Communication via HTTP + JSON (REST) ou via binaire (gRPC, Thrift). APIs simples, typées et performantes, adaptées aux microservices et aux applications cloud.' },
          { time: 'Années 2020+', text: 'GraphQL, WebSockets, Async APIs — Environnements cloud, mobiles et temps réel. Communication flexible et dynamique, support du streaming et de la communication bidirectionnelle, forte orientation vers la performance et la résilience.' },
        ] },
      ],
    },
    {
      id: 'd8s4',
      title: 'Les mécanismes haut niveau : définition et familles',
      blocks: [
        { type: 'definition', term: 'Mécanisme de communication haut niveau', def: 'Une abstraction logicielle qui permet à des composants répartis de communiquer sans gérer directement les détails bas niveau du réseau (sockets, ports, formats binaires, etc.). C\u2019est une abstraction qui masque la complexité des communications réseau en fournissant des modèles de programmation plus intuitifs et plus proches des concepts métier. → Le programmeur interagit via des objets, des procédures, des services, ou des messages structurés au lieu de manipuler des flux d\u2019octets.' },
        { type: 'kv', items: [
          { k: 'RPC (Remote Procedure Call)', v: 'Appeler une fonction distante comme une fonction locale.' },
          { k: 'RMI (Remote Method Invocation)', v: 'Extension orientée objet du RPC.' },
          { k: 'Services Web (SOAP, REST, gRPC)', v: 'Communication standardisée via HTTP et formats structurés.' },
          { k: 'Mécanismes orientés message (asynchrones)', v: 'Basés sur des files de messages ou des brokers (ex. JMS, RabbitMQ, Kafka).' },
        ] },
      ],
    },
  ],
}
