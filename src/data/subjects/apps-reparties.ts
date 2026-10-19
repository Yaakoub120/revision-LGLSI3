import type { Subject } from "@/lib/learn-types";

// ═══════════════════════════════════════════════════════════════════════════
// SUJET 2 — DÉVELOPPEMENT D'APPLICATIONS RÉPARTIES (Chapitres 1–4, Mouna KARAJA)
// ═══════════════════════════════════════════════════════════════════════════

export const appsReparties: Subject = {
  id: "reparti",
  name: "Développement d'applications réparties",
  shortName: "App. Réparties",
  teacher: "Dr. Mouna KARAJA — FSM",
  icon: "Network",
  gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
  accent: "#a855f7",
  description:
    "Systèmes et applications réparties, communication (sockets, RPC, RMI), architectures (client-serveur, microservices, SOA, serverless) et communication asynchrone.",
  chapters: [
    {
      id: "c1",
      title: "Chapitre 1 — Introduction aux systèmes et applications réparties",
      summary: "Contexte et enjeux, définitions, programmation classique vs répartie, système vs application répartie, historique.",
      sections: [
        {
          heading: "Contexte et enjeux",
          blocks: [
            {
              type: "p",
              text: "Le cas naïf : un seul serveur dans le monde — tous les utilisateurs (Tunisie, Europe, Asie…) se connectent à un serveur unique situé en Amérique. Résultat : lenteur, surcharge et risque de panne totale si ce serveur tombe. Le cas réel : plusieurs serveurs répartis géographiquement (Amérique, Europe, Asie, Afrique…) ; chaque utilisateur se connecte au serveur le plus proche. Avantages : rapidité, meilleure disponibilité, tolérance aux pannes, qualité de service.",
            },
            {
              type: "p",
              text: "Le monde d'aujourd'hui est connecté : les applications que nous utilisons reposent toutes sur un principe fondamental — elles sont réparties. Elles ne s'exécutent pas sur une seule machine mais sur un ensemble d'ordinateurs, serveurs ou dispositifs qui coopèrent pour offrir un service unique, rapide, fiable et accessible partout. Exemple Facebook : quand un utilisateur ouvre Facebook, il accède à une interface sur son smartphone ; ses données (amis, publications, photos) sont stockées dans des serveurs répartis dans le monde ; quand il publie une photo, elle est envoyée à un serveur de stockage, répliquée dans plusieurs centres de données, et rendue disponible à ses amis via d'autres serveurs ; chaque like/commentaire passe par d'autres serveurs qui mettent à jour la base et notifient instantanément. Pourtant, pour l'utilisateur, Facebook semble être une seule application fluide.",
            },
          ],
        },
        {
          heading: "Définitions clés",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Système réparti", v: "Ensemble de machines autonomes reliées par un réseau, qui coopèrent pour offrir l'illusion d'un système unique et cohérent. Caractéristiques : ressources (processeurs, mémoire, données) distribuées ; les utilisateurs interagissent comme s'ils accédaient à une seule machine centrale ; les communications passent obligatoirement par un réseau. Exemple : cluster de serveurs hébergeant un moteur de recherche comme Google." },
                { k: "Application répartie (= distribuée)", v: "Application dont les composants logiciels s'exécutent sur plusieurs ordinateurs (nœuds) reliés par un réseau et qui coopèrent pour fournir un service unique et cohérent à l'utilisateur final. Composants : programmes, bases de données, services web… L'utilisateur ne perçoit pas la répartition." },
                { k: "Système réparti vs Application répartie", v: "Le système réparti est l'infrastructure matérielle et logicielle (réseau, serveurs, protocoles) — exemple : Internet. L'application répartie est le logiciel construit au-dessus de cette infrastructure pour offrir un service — exemples : WhatsApp, Netflix, Google Docs." },
              ],
            },
            {
              type: "table",
              headers: ["Critère", "Programmation classique", "Programmation répartie"],
              rows: [
                ["Lieu d'exécution", "Une seule machine (serveur ou poste local)", "Répartie sur plusieurs machines connectées en réseau"],
                ["Partage des ressources", "Limitées à la machine locale", "Partagées entre plusieurs nœuds (processeurs, mémoire, stockage)"],
                ["Communication", "Appels locaux, simples et rapides", "Via réseau (messages, protocoles, latences)"],
                ["Tolérance aux pannes", "Une panne = arrêt du système", "Conçue pour être tolérante aux pannes et redondante"],
                ["Evolutivité", "Limitée par la capacité matérielle", "Haute évolutivité (ajout de nouveaux nœuds)"],
                ["Complexité", "Plus simple (modèle linéaire, centralisé)", "Plus complexe (synchronisation, concurrence, cohérence)"],
                ["Exemple", "Application de bureau (MS Word, Excel)", "Réseaux sociaux, systèmes bancaires, e-commerce"],
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Scalabilité", v: "Supporter un grand nombre d'utilisateurs." },
                { k: "Performance", v: "Répartir le traitement sur plusieurs machines (traitement massif de données)." },
                { k: "Répartition géographique", v: "Rapprocher les ressources des utilisateurs." },
                { k: "Disponibilité & tolérance aux pannes", v: "Si un serveur tombe, d'autres continuent à fournir le service." },
              ],
            },
            {
              type: "p",
              text: "Une application répartie n'est pas un bloc monolithique : elle est composée de services (authentification, messagerie, paiement…). Chaque service peut être hébergé sur une machine différente, mais l'ensemble coopère pour offrir une application cohérente. Ces services sont accessibles via des interfaces bien définies (API, protocoles). L'interface est un contrat qui définit : quelles opérations on peut demander au service (s'authentifier, envoyer un message, publier…), la manière dont ces opérations doivent être appelées (HTTP, API REST, message JSON), et ce que le service renvoie (succès ou erreur). Exemple Facebook : service d'authentification (données : login/mot de passe ; envoi : formulaire Web ou API mobile ; renvoi : succès ou erreur), service de messagerie instantanée, service de publication/partage, service de recherche.",
            },
            {
              type: "p",
              text: "Impact sur le génie logiciel : nouvelles contraintes (latence, panne réseau, sécurité des communications), nouvelles architectures logicielles (client-serveur, microservices, services web), méthodologies repensées (scalabilité, tolérance aux pannes, réplication de données), maintenance et évolutivité (conception modulaire pour faire évoluer l'application sans arrêter tout le système).",
            },
          ],
        },
        {
          heading: "Historique et évolution",
          blocks: [
            {
              type: "table",
              headers: ["Époque", "Événements"],
              rows: [
                ["1960-1970", "Premiers réseaux d'ordinateurs, début de l'idée de partage des ressources."],
                ["Années 1980", "Émergence des systèmes répartis universitaires et industriels (SUN RPC, CORBA, systèmes client-serveur)."],
                ["Années 1990", "Démocratisation d'Internet → explosion des applications web réparties (serveurs web, bases de données distribuées)."],
                ["Années 2000", "Apparition du cloud computing (AWS, Google Cloud), systèmes massivement parallèles."],
                ["Années 2010", "Montée du big data, de l'IoT, du fog/edge computing, microservices et conteneurs (Docker, Kubernetes)."],
                ["Aujourd'hui", "Intelligence artificielle distribuée, blockchain, edge AI et applications massivement interconnectées."],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "c2",
      title: "Chapitre 2 — Communication dans les applications réparties (partie 1)",
      summary: "Définition et défis de la communication répartie, intervenants, modes, adressage, modèles, OSI et TCP/IP, TCP vs UDP.",
      sections: [
        {
          heading: "Définition et importance",
          blocks: [
            {
              type: "p",
              text: "La communication répartie désigne l'ensemble des mécanismes, protocoles et modèles permettant à deux entités d'un système distribué (processus, objets, applications) d'échanger des données et de coordonner leurs actions, malgré la séparation physique des machines. Formes : transmission de messages, appels de procédures distantes, invocation de méthodes sur des objets distants, échanges via des middlewares spécialisés. Objectif : donner l'illusion que les interactions à distance se déroulent aussi simplement qu'en local, en masquant la complexité du réseau.",
            },
            {
              type: "list",
              items: [
                "La coopération entre composants : un client envoie une requête à un serveur pour accéder à une base de données distante.",
                "Le partage de ressources : fichiers, services web, systèmes d'information.",
                "La coordination des tâches : plusieurs processus répartis travaillent ensemble pour résoudre un problème complexe.",
                "La transparence : l'utilisateur n'a pas besoin de savoir où se trouvent réellement les ressources.",
                "Sans communication fiable, les applications réparties ne seraient qu'un ensemble de composants isolés, incapables d'interagir.",
              ],
            },
          ],
        },
        {
          heading: "Les 6 défis de la communication répartie",
          blocks: [
            {
              type: "table",
              headers: ["Défi", "Description", "Exemple / Enjeu"],
              rows: [
                ["1. Hétérogénéité", "Nœuds très différents : PC, smartphones, serveurs, objets IoT… avec OS, langages et protocoles variés", "Assurer une communication interopérable malgré les différences"],
                ["2. Transparence de localisation", "Un composant ne doit pas savoir où se trouve l'autre", "Masquer la localisation réelle (IP, port, machine) derrière une abstraction"],
                ["3. Latence et performance", "Vitesse de transmission limitée, congestion possible", "200 ms de retard perceptibles dans une visioconférence"],
                ["4. Fiabilité et pannes", "Messages perdus, dupliqués, corrompus, nœuds en panne", "Éviter qu'un virement soit débité deux fois ; reprise, réplication, redondance"],
                ["5. Concurrence et synchronisation", "Accès simultanés à la même ressource", "Deux utilisateurs modifient en même temps un document collaboratif"],
                ["6. Sécurité", "Communication sur réseau ouvert : interception, modification, usurpation", "Authentification, confidentialité, intégrité, autorisation"],
              ],
            },
          ],
        },
        {
          heading: "Intervenants et nœud logique",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Nœuds", v: "Entités participant au système réparti : machines physiques (ordinateurs, serveurs, smartphones, capteurs IoT) ou unités logiques (processus, services, applications)." },
                { k: "Ressources", v: "Éléments accessibles ou partagés : fichiers, bases de données, services, périphériques, puissance de calcul. C'est le contenu demandé/fourni." },
                { k: "Middleware", v: "Couche logicielle intermédiaire qui facilite la communication et la transparence entre nœuds (CORBA, Java RMI…)." },
                { k: "Canal de communication", v: "Support de transmission des données : réseau filaire, Wi-Fi, Internet, protocoles." },
              ],
            },
            {
              type: "p",
              text: "Composition logique d'un nœud : tout nœud correspond à un bloc logique à trois fonctions — interface d'entrée (recevoir les messages des autres nœuds), traitement (décider quoi faire avec le message reçu ou quoi produire comme réponse), interface de sortie (envoyer les messages ou réponses aux autres nœuds).",
            },
          ],
        },
        {
          heading: "Modes, adressage et modèles de communication",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Communication synchrone", v: "L'émetteur envoie une requête et attend la réponse avant de poursuivre. Avantage : simplicité et rapidité de l'échange direct. Limite : dépendance temporelle forte, client bloqué tant que la réponse n'arrive pas." },
                { k: "Communication asynchrone", v: "L'émetteur envoie sans attendre la réponse immédiate ; le receveur peut répondre plus tard ; l'émetteur continue son traitement sans blocage. Avantage : meilleure tolérance aux délais et interruptions. Limite : complexité plus élevée pour gérer les retours différés." },
                { k: "Unicast", v: "Un émetteur → un récepteur (un à un). Exemple : requête d'un client vers un serveur." },
                { k: "Multicast", v: "Un émetteur → un groupe spécifique de récepteurs. Exemple : visioconférence diffusée aux participants." },
                { k: "Broadcast", v: "Un émetteur → tous les nœuds du réseau. Exemple : message envoyé simultanément à tous les abonnés du réseau mobile." },
              ],
            },
            {
              type: "table",
              headers: ["Modèle", "Principe", "Avantages", "Inconvénients", "Exemple"],
              rows: [
                ["Orienté message", "Échange de messages explicites (envoyer/recevoir) via files de messages, sockets TCP/UDP ; nécessite une adresse de destination ; synchrone ou asynchrone", "Découplage fort (langages différents, machines distantes)", "Complexité de gestion des messages (ordre, duplication, erreurs)", "Application bancaire : requête de virement envoyée à un service de paiement qui renvoie une confirmation"],
                ["Orienté appels (RPC)", "Appeler à distance une procédure/fonction comme si elle était locale ; stubs (proxy local) cachent la complexité ; généralement synchrone", "Simplicité d'utilisation (programmer comme en local)", "Forte dépendance au réseau ; couplage fort (connaître la signature de la fonction)", "Une app mobile appelle payerFacture() sur un serveur distant"],
                ["Objets distribués (RMI)", "Extension du RPC aux objets : invoquer des méthodes sur des objets distants via une interface (Java RMI, CORBA)", "Transparence de localisation, modularité, réutilisation, orientation objet", "Forte dépendance technologique, compatibilité de versions", "L'objet Réservation appelle confirmer() sur l'objet Chambre distant"],
                ["Orienté flux", "Transmission continue de données (audio, vidéo), temps réel ; unidirectionnel ou bidirectionnel ; gestion de latence, synchronisation, QoS", "Idéal pour les flux multimédias", "Gestion de la latence et de la QoS", "Netflix/YouTube (diffusion), Zoom/Teams (visioconférence bidirectionnelle)"],
                ["Orienté événements", "Modèle pub/sub : publishers publient sans connaître les récepteurs, subscribers s'abonnent à des types d'événements ; multicast/broadcast ; asynchrone", "Couplage faible, grande scalabilité, distribution flexible des notifications", "Difficulté à suivre les flux ; un événement reçu par plusieurs services peut déclencher des réactions différentes", "Commande confirmée → paiement, logistique, email de confirmation, points de fidélité"],
              ],
            },
          ],
        },
        {
          heading: "Le réseau : modèles OSI et TCP/IP",
          blocks: [
            {
              type: "p",
              text: "Une application répartie est déployée sur plusieurs machines de zones géographiques différentes ; les composants échangent des données à travers un réseau. L'organisation logique du réseau est décrite par des modèles en couches. Modèle OSI (Open Systems Interconnection) : théorique, défini fin des années 1970 par l'ISO, 7 couches. Modèle Internet (TCP/IP) : pratique, décrit l'architecture réellement utilisée (Internet, intranets), simplifie les 7 couches en 4 couches fonctionnelles.",
            },
            {
              type: "diagram",
              id: "osi-tcpip",
              caption: "Correspondance OSI ↔ TCP/IP avec les protocoles de chaque couche.",
            },
            {
              type: "table",
              headers: ["Couche OSI", "Rôle"],
              rows: [
                ["7. Application", "Interface entre l'utilisateur et le réseau ; accès aux ressources distantes (pages web, fichiers, mails). Protocoles : SMTP (envoi de mails entre serveurs), HTTP (requête-réponse navigateurs/serveurs web), FTP (transfert de fichiers)."],
                ["6. Présentation", "Format des données échangées : conversion (UTF-8 → ASCII, JPEG → BMP), compression (gain de bande passante), chiffrement/déchiffrement (HTTPS)."],
                ["5. Session", "Ouvre la session au début, la maintient active pendant le transfert, la ferme proprement à la fin ; veille à la continuité et à la reprise en cas d'interruption."],
                ["4. Transport", "Transfert fiable et ordonné entre deux machines ; découpe les données en segments (avec en-têtes : numéro de segment, numéro de port) ; contrôle d'erreur : demande la réémission des segments perdus."],
                ["3. Réseau", "Encapsule les segments en paquets IP (adresses source/destination) ; acheminement entre réseaux différents ; routage (meilleur chemin) ; fragmentation si le paquet dépasse la MTU (Maximum Transmission Unit)."],
                ["2. Liaison de données", "Transforme les paquets en trames prêtes à être envoyées physiquement ; utilise les adresses MAC pour identifier émetteur et destinataire sur le réseau local. Une trame = conteneur de bits circulant sur le support physique entre deux machines d'un même LAN."],
                ["1. Physique", "Transmet réellement les bits sur le support : signaux électriques (câble cuivre/Ethernet), lumineux (fibre optique), ondes radio (Wi-Fi, Bluetooth)."],
              ],
            },
            {
              type: "p",
              text: "Encapsulation : chaque couche ajoute ses propres informations aux données reçues de la couche supérieure — Message → Message + en-tête = Segment → Segment + IP = Paquet → Paquet + MAC = Trame → Bits. Désencapsulation (côté réception) : chaque couche lit et retire ses en-têtes pour ne garder que les données destinées à la couche supérieure.",
            },
          ],
        },
        {
          heading: "TCP et UDP",
          blocks: [
            {
              type: "p",
              text: "La couche transport garantit un transfert de données fiable et ordonné entre applications distantes. Un protocole en réseau informatique est un ensemble de règles et de normes qui définissent comment les nœuds communiquent entre eux. Les deux principaux protocoles : TCP et UDP.",
            },
            {
              type: "kv",
              items: [
                { k: "TCP — établissement", v: "Orienté connexion : 3-way handshake — 1) le client envoie SYN (Synchronize), 2) le serveur répond SYN-ACK, 3) le client confirme ACK. SYN = commencer la synchronisation, ACK = accusé de réception." },
                { k: "TCP — transfert", v: "Données découpées en segments numérotés (ordre d'arrivée garanti), retransmission des segments perdus, accusés de réception (ACK)." },
                { k: "TCP — fermeture", v: "Connexion fermée proprement pour libérer les ressources." },
                { k: "TCP — avantages / inconvénients", v: "✓ transmission fiable, contrôle de flux et de congestion, réassemblage automatique · × lent (contrôles et vérifications), consomme plus de ressources réseau." },
                { k: "UDP — fonctionnement", v: "Non orienté connexion : datagrammes envoyés directement, sans phase de connexion, sans numérotation ni accusé de réception. Checksum facultatif : l'émetteur calcule une valeur de contrôle, le récepteur recalcule ; si les valeurs diffèrent → erreur détectée, datagramme simplement ignoré (pas de retransmission)." },
                { k: "UDP — avantages / inconvénients", v: "✓ très rapide (pas de connexion ni attente d'ACK), moins de surcharge réseau, idéal temps réel · × aucune garantie de livraison, pas de réordonnancement ni de retransmission, risque de perte de paquets." },
                { k: "TCP — usages", v: "Messagerie (WhatsApp, iMessage, Google Chat), navigation web HTTP/HTTPS, emails (SMTP, IMAP, POP3), transfert de fichiers (FTP, SFTP), accès distant sécurisé (SSH), bases de données distantes (MySQL, PostgreSQL)." },
                { k: "UDP — usages", v: "Streaming audio/vidéo (YouTube, Netflix), jeux en ligne, VoIP (Skype, Zoom), DNS, diffusion broadcast/multicast." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "c2b",
      title: "Chapitre 2 (partie 2) — Sockets, RPC, CORBA et RMI",
      summary: "Protocoles applicatifs et ports, sockets TCP/UDP en Java, bas vs haut niveau, mécanisme RPC détaillé (IDL, stub, skeleton, marshalling), CORBA, RMI complet.",
      sections: [
        {
          heading: "Protocoles de la couche application et ports",
          blocks: [
            {
              type: "p",
              text: "La couche application est la plus haute du modèle TCP/IP : elle permet la communication directe entre les programmes utilisateurs (navigateur, client mail, messagerie instantanée…) et définit les protocoles applicatifs (règles de dialogue entre applications sur deux machines). Chaque protocole utilise un numéro de port. Un numéro de port est un identifiant logique (un nombre) utilisé par le système d'exploitation pour distinguer les applications qui communiquent sur le réseau — il dirige les messages vers le bon programme.",
            },
            {
              type: "table",
              headers: ["Protocole", "Service", "Port par défaut", "Fonction"],
              rows: [
                ["HTTP / HTTPS", "Web", "80 / 443", "Transfert de pages web"],
                ["FTP", "Transfert de fichiers", "21", "Envoyer / recevoir des fichiers"],
                ["SMTP", "Courrier (envoi)", "25", "Envoi de mails"],
                ["POP3 / IMAP", "Courrier (réception)", "110 / 143", "Récupérer les mails"],
                ["DNS", "Résolution de noms", "53", "Convertir un nom de domaine en adresse IP"],
                ["DHCP", "Attribution d'IP", "67-68", "Donner dynamiquement une IP à un poste"],
                ["SSH / Telnet", "Accès distant", "22 / 23", "Contrôler un ordinateur à distance (avec/sans chiffrement)"],
                ["SNMP", "Supervision réseau", "161", "Gérer et surveiller routeurs, commutateurs…"],
              ],
            },
            {
              type: "p",
              text: "Schéma illustratif (parcours d'une requête HTTP) : le client (IP 192.168.1.10, MAC AA:AA…) écrit http://www.exemple.com/index.html → requête « GET /index.html HTTP/1.1 / Host: www.exemple.com ». Le transport crée un segment TCP (ports source 50500 éphémère / destination 80, numéro de segment). La couche Internet crée le paquet IP (source 192.168.1.10, destination 10.0.0.5). La couche accès réseau crée la trame (MAC source AA:AA…, MAC destination = MAC du routeur BB:BB…). Le routeur émetteur désencapsule, applique la NAT (Network Address Translation) : IP source → 102.45.60.10 (IP publique), MAC source → MAC du routeur, MAC destination → MAC du routeur suivant (DD:DD…). Le routeur récepteur fait la NAT inverse (IP destination → 10.0.0.5) et remplace les MAC (source DD:DD…, destination EE:EE… = MAC du serveur). Désencapsulation jusqu'à l'application.",
            },
          ],
        },
        {
          heading: "Les sockets",
          blocks: [
            {
              type: "p",
              text: "Quand deux applications échangent des données : 1) elles s'identifient (adresse IP, port), 2) établissent un lien fiable, 3) envoient/reçoivent des messages. Ni l'application ni la couche transport ne communiquent directement : la socket est l'interface entre les deux. Une socket est le couple (adresse IP, port) qui identifie une application précise sur une machine ; les communications TCP/UDP sont identifiées par le quadruplet (IP_client, Port_client, IP_serveur, Port_serveur). C'est la « porte » par laquelle les données d'une application sortent vers le réseau (et inversement). Sans sockets : pas d'accès au réseau, les couches basses ne sauraient pas à quelle application livrer les données, pas de communication bidirectionnelle simple.",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "Étape 1 : l'application (client HTTP) veut envoyer un message → elle crée une socket et demande à la couche transport d'envoyer les données (source IP 192.168.1.15, port source 53000 éphémère, destination 142.250.185.78:80).",
                "Étape 2 : la couche transport encapsule les données dans des segments avec en-têtes de contrôle et transmet à la couche suivante.",
                "Étape 3 : les couches internet et accès réseau acheminent les paquets jusqu'à la machine destinataire.",
                "Étape 4 : la couche transport du destinataire reçoit le paquet et le redirige vers la socket identifiée par le port.",
                "Étape 5 : la socket transmet les données à l'application (serveur HTTP), qui les lit depuis sa socket.",
              ],
            },
            {
              type: "code",
              lang: "java",
              code: "// ── Sockets TCP en Java ──\n// Côté serveur : ServerSocket écoute les connexions entrantes\nServerSocket serverSocket = new ServerSocket(port);\nSocket client = serverSocket.accept(); // bloque jusqu'à connexion\nInputStream in = client.getInputStream();\nOutputStream out = client.getOutputStream();\n// Côté client : Socket se connecte au port du serveur\nSocket socket = new Socket(\"adresseServeur\", port);\n// 1. Le serveur crée un ServerSocket et attend sur un port précis\n// 2. Le client crée un Socket et tente de se connecter\n// 3. Les deux échangent via des flux (InputStream / OutputStream)\n// 4. À la fin, les sockets sont fermées\n\n// ── Sockets UDP en Java ──\nDatagramSocket socket = new DatagramSocket();            // côté serveur ET client\nDatagramPacket packet = new DatagramPacket(données, longueur, adresseIP, port);\nsocket.send(packet);   // envoi d'un datagramme\nsocket.receive(packet); // réception\n// Chaque message est indépendant : aucune session ni connexion persistante.\n// DatagramSocket = la « prise » de communication ; DatagramPacket = le paquet\n// (données + adresse IP du destinataire + port).",
            },
          ],
        },
        {
          heading: "Bas niveau vs haut niveau",
          blocks: [
            {
              type: "p",
              text: "Avec les sockets (bas niveau) : contrôle total et performance, mais code complexe, risque d'erreurs, couplage fort — le programmeur gère la création de la connexion (IP, port), l'envoi/réception de flux d'octets et le format des messages (encodage, protocole applicatif). D'où la naissance des mécanismes haut niveau : simplifier la programmation réseau, automatiser les échanges (marshalling, transport, erreurs), rendre la communication transparente (comme un appel local), assurer l'interopérabilité entre systèmes et langages.",
            },
            {
              type: "table",
              headers: ["Aspect", "Bas niveau (Sockets)", "Haut niveau (RPC, RMI…)"],
              rows: [
                ["Niveau d'abstraction", "Très bas : paquets, adresses, ports, flux", "Élevé : appeler une fonction/méthode distante"],
                ["Unité d'échange", "Flux d'octets", "Appel de fonction / méthode / service"],
                ["Gestion du protocole", "Manuelle", "Automatisée"],
                ["Format des données", "Défini par le programmeur", "Structuré (JSON, XML, Protobuf…)"],
                ["Complexité du code", "Élevée", "Réduite (détails cachés)"],
                ["Contrôle réseau", "Total (communication explicite)", "Transparence partielle (impression d'appel local)"],
                ["Objectif", "Performance, flexibilité", "Productivité, simplicité, focus sur la logique métier"],
              ],
            },
            {
              type: "table",
              headers: ["Époque", "Mécanismes dominants", "Caractéristiques"],
              rows: [
                ["Années 1970-début 1980", "Sockets", "Flux d'octets, programmation manuelle (IP, ports, TCP/UDP), flexible mais complexe"],
                ["Milieu/fin des années 1980", "RPC (Sun RPC, ONC RPC)", "Première abstraction haut niveau : appel de procédure distante, sérialisation automatique des arguments"],
                ["Années 1990", "CORBA, Java RMI, DCOM", "Extension du RPC aux objets distants : références d'objets, exceptions à distance, interopérabilité multi-langages (CORBA)"],
                ["Années 2000", "SOAP, XML-RPC, Web Services", "HTTP + XML, standardisation (WSDL, UDDI), largement utilisé en entreprise"],
                ["Années 2010", "REST, JSON-RPC, gRPC, Thrift", "HTTP + JSON (REST) ou binaire (gRPC, Thrift) ; APIs simples, typées, performantes ; microservices et cloud"],
                ["Années 2020+", "GraphQL, WebSockets, Async APIs", "Communication flexible et dynamique, streaming, bidirectionnel, performance et résilience"],
              ],
            },
          ],
        },
        {
          heading: "RPC — Remote Procedure Call",
          blocks: [
            {
              type: "p",
              text: "Un mécanisme de communication haut niveau est une abstraction logicielle qui permet à des composants répartis de communiquer sans gérer directement les détails bas niveau (sockets, ports, formats binaires). Grandes familles : RPC (appeler une fonction distante comme une fonction locale), RMI (extension orientée objet du RPC), Services Web (SOAP, REST, gRPC), mécanismes orientés message asynchrones (files de messages / brokers : JMS, RabbitMQ, Kafka). Pourquoi RPC ? Abstraction, productivité, lisibilité et maintenance, interopérabilité.",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "Le client appelle une fonction « comme d'habitude ».",
                "Le système RPC prépare l'appel et l'envoie au serveur.",
                "Le serveur reçoit la demande et exécute la fonction demandée.",
                "Le résultat est renvoyé automatiquement au client.",
                "Le client récupère le résultat comme s'il venait d'une fonction locale.",
              ],
            },
            {
              type: "kv",
              items: [
                { k: "IDL (Interface Definition Language)", v: "Fichier décrivant les fonctions accessibles à distance (noms, paramètres, types de retour). C'est le développeur du service (serveur) qui l'écrit." },
                { k: "Stub client (proxy)", v: "Code généré côté client qui remplace l'appel réel : il fait le marshalling et l'envoi." },
                { k: "Skeleton (stub serveur)", v: "Code côté serveur qui reçoit les messages, fait l'unmarshalling et appelle la procédure réelle." },
                { k: "Marshalling / Serialization", v: "Conversion des paramètres en représentation binaire (Protobuf, Thrift) ou textuelle (JSON, XML) pour transport." },
                { k: "Unmarshalling / Deserialization", v: "Reconstitution des paramètres à l'autre bout." },
                { k: "RPC runtime", v: "Couche logicielle interne fournie par la bibliothèque RPC : envoie les messages via le réseau (sockets TCP/UDP), gère transmission, attente de réponse et réception." },
              ],
            },
            {
              type: "table",
              headers: ["Technologie RPC", "Outil de génération du code"],
              rows: [
                ["ONC RPC (Sun RPC)", "rpcgen"],
                ["DCE RPC (Distributed Computing Environment)", "idl (compilateur IDL DCE)"],
                ["CORBA", "idl compiler (idltojava, omniidl…)"],
                ["Microsoft RPC (Windows)", "MIDL (Microsoft IDL Compiler)"],
              ],
            },
            {
              type: "code",
              lang: "java",
              code: "// IDL\nservice Calculator {\n  int add(int a, int b);\n  int sub(int a, int b);\n}\n\n// Implémentation côté serveur\npublic class CalculatorImpl implements Calculator {\n  @Override\n  public int add(int a, int b) {\n    System.out.println(\"Reçu une requête RPC: add(\" + a + \", \" + b + \")\");\n    return a + b;\n  }\n}\n\n// Enregistrement du service (côté serveur)\nCalculator service = new CalculatorImpl();\nregisterService(\"Calculator\", service);\n\n// Skeleton côté serveur (extrait)\n// requestJson = {\"method\":\"add\",\"args\":[3,4]}\nswitch (method) {\n  case \"add\": result = impl.add(args.getInt(0), args.getInt(1)); break;\n  case \"sub\": result = impl.sub(args.getInt(0), args.getInt(1)); break;\n  default: throw new RuntimeException(\"Méthode inconnue: \" + method);\n}\n// renvoyer {\"result\": 7}\n\n// Stub côté client (proxy)\npublic int add(int a, int b) {\n  String req = \"{\\\"method\\\":\\\"add\\\",\\\"args\\\":[\" + a + \",\" + b + \"]}\";\n  String resp = channel.sendRequest(req);\n  JSONObject json = new JSONObject(resp);\n  return json.getInt(\"result\");\n}\n\n// Ce qui se produit en coulisse :\n// 1. stub.marshall(3,4) → message   2. transport.send(message)\n// 3. server.receive → skeleton.unmarshall → server.add(3,4) → 7\n// 4. server.marshall(7) → transport.send\n// 5. client.receive → stub.unmarshall → retourne 7",
            },
            {
              type: "p",
              text: "Comment le client « sait » que la fonction existe ? Même entreprise/projet : le développeur reçoit le fichier IDL ou l'interface Java (documenté en interne). Environnement distribué (CORBA, RMI Registry, gRPC) : le client interroge un annuaire de services (naming service) qui indique sur quelle machine/port se trouve le service. Web moderne (SOAP, REST, gRPC) : description publique (WSDL, .proto) que le client télécharge pour générer son stub automatiquement.",
            },
            {
              type: "kv",
              items: [
                { k: "Avantages RPC", v: "Facilite le développement (code proche du modèle local) ; encapsulation de la communication (focus sur l'API métier) ; IDL + génération de code (cohérence, moins d'erreurs manuelles) ; support de paradigmes (sync/async, streaming) ; interopérabilité (SOAP/gRPC connectent des services dans différents langages)." },
                { k: "Inconvénients RPC", v: "1) Fausse impression de transparence (latence, pannes, variabilité) ; 2) sérialisation coûteuse ; 3) couplage sémantique (changer l'interface casse les clients sans versioning) ; 4) scalabilité (trop d'appels RPC synchrones = goulots d'étranglement) ; 5) sécurité (authentification, chiffrement, contrôle d'accès) ; 6) debug et traçabilité difficiles (outils de tracing distribué nécessaires)." },
              ],
            },
          ],
        },
        {
          heading: "CORBA et RMI",
          blocks: [
            {
              type: "p",
              text: "Transition historique RPC → CORBA → RMI : quand le RPC a été inventé (années 1980), la majorité des langages (C, Pascal, Ada) étaient procéduraux — on appelait à distance des fonctions, pas des objets. Avec l'imposition de la POO (C++, Smalltalk, puis Java), l'OMG (Object Management Group) a conçu CORBA (Common Object Request Broker Architecture, début des années 1990) : permettre à des programmes écrits dans différents langages de communiquer en appelant des méthodes d'objets distants de manière transparente. CORBA : 1) interfaces définies en IDL (langage neutre), 2) compilation de l'IDL → stubs et squelettes, 3) le client appelle via le stub comme un objet local, 4) l'ORB (Object Request Broker) transporte la requête et gère la communication — il joue le même rôle que le RPC runtime, 5) le serveur exécute via le squelette et renvoie le résultat. Limites de CORBA : grand succès dans les années 1990 (interopérabilité multi-langages) mais complexe à configurer, beaucoup de fichiers et de couches pour de simples appels.",
            },
            {
              type: "p",
              text: "Quand Java apparaît (vers 1995) : modèle objet simple et uniforme, JVM garantissant la portabilité. Les ingénieurs de Sun Microsystems s'inspirent de CORBA mais veulent un système plus léger, spécifique à Java, utilisant la sérialisation native des objets Java. RMI (Remote Method Invocation) : mécanisme purement Java qui permet d'invoquer une méthode sur un objet situé sur une autre machine Java, comme si l'objet était local. Buts : communication entre objets Java distribués, conservation des principes POO (encapsulation, héritage, polymorphisme), cacher complètement la complexité du réseau.",
            },
            {
              type: "table",
              headers: ["Composant RMI", "Rôle"],
              rows: [
                ["Interface distante", "Définit les méthodes accessibles à distance ; hérite de java.rmi.Remote (marqueur indiquant que les méthodes peuvent être appelées à distance)."],
                ["Classe d'implémentation", "Contient le code des méthodes ; étend UnicastRemoteObject (rend l'objet disponible et accessible à distance)."],
                ["Registre RMI", "Service de nommage qui associe un nom logique à un objet distant pour permettre au client de le localiser."],
                ["Serveur", "Héberge les objets distants et les enregistre dans le registre RMI."],
                ["Client", "Programme qui invoque les méthodes distantes via une référence obtenue dans le registre RMI."],
                ["Stub client", "Proxy qui transmet l'appel. (* Skeleton : initialement généré par RMIC ; depuis Java 5, il est créé dynamiquement, sans compilation manuelle.)"],
              ],
            },
            {
              type: "code",
              lang: "java",
              code: "// Étape 1 : interface distante (Hello.java)\nimport java.rmi.Remote;\nimport java.rmi.RemoteException;\npublic interface Hello extends Remote {\n  String direBonjour(String nom) throws RemoteException;\n}\n\n// Étape 2 : classe d'implémentation (HelloImpl.java)\nimport java.rmi.server.UnicastRemoteObject;\npublic class HelloImpl extends UnicastRemoteObject implements Hello {\n  public HelloImpl() throws RemoteException { super(); }\n  @Override\n  public String direBonjour(String nom) throws RemoteException {\n    return \"Bonjour, \" + nom + \" !\";\n  }\n}\n\n// Étape 3 : serveur RMI (ServeurRMI.java)\nimport java.rmi.Naming;\nimport java.rmi.registry.LocateRegistry;\npublic class ServeurRMI {\n  public static void main(String[] args) {\n    try {\n      LocateRegistry.createRegistry(1099);           // démarre le registre (port 1099)\n      HelloImpl obj = new HelloImpl();               // crée l'objet distant\n      Naming.rebind(\"rmi://localhost/HelloService\", obj); // enregistre dans le registre\n      System.out.println(\"Serveur RMI prêt et en attente des requêtes...\");\n    } catch (Exception e) { e.printStackTrace(); }\n  }\n}\n\n// Étape 4 : client RMI (ClientRMI.java)\npublic class ClientRMI {\n  public static void main(String[] args) {\n    try {\n      Hello obj = (Hello) Naming.lookup(\"rmi://localhost/HelloService\"); // localise via le registre\n      String reponse = obj.direBonjour(\"Mouna\"); // appelle comme si local\n      System.out.println(\"Réponse du serveur : \" + reponse);\n    } catch (Exception e) { e.printStackTrace(); }\n  }\n}\n\n// Étape 5 : compilation et exécution\n// javac *.java          → compiler tous les fichiers\n// rmiregistry           → démarrer le registre (port 1099, même répertoire que les classes)\n// java ServeurRMI       → « Serveur RMI prêt et en attente des requêtes... »\n// java ClientRMI        → « Réponse du serveur : Bonjour, Mouna ! »",
            },
            {
              type: "kv",
              items: [
                { k: "Avantages RMI", v: "Simple à utiliser en environnement purement Java ; permet de passer des objets complets ; masque totalement la communication réseau ; intégration native à Java." },
                { k: "Inconvénients RMI", v: "Spécifique à Java (pas interopérable) ; dépendance forte à la JVM ; peu adapté aux systèmes distribués hétérogènes." },
              ],
            },
            {
              type: "table",
              headers: ["Aspect", "RPC", "RMI"],
              rows: [
                ["Paradigme", "Procédural", "Orienté Objet"],
                ["Langage", "Multi-langages (C, C++, etc.)", "Spécifique à Java"],
                ["Ce qu'on appelle", "Des fonctions (procédures)", "Des méthodes d'objets distants"],
                ["Données transmises", "Types simples (int, string…)", "Objets Java (via sérialisation)"],
                ["Interface", "Fichier IDL", "Interface Java qui étend Remote"],
                ["Interopérabilité", "Forte (langages différents)", "Limitée à Java"],
                ["Outil de génération", "idlj, protoc, etc.", "rmic"],
                ["Squelette", "Toujours présent", "Automatique depuis Java 5"],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "c3",
      title: "Chapitre 3 — Architectures des applications réparties",
      summary: "Définition, évolution, 12 qualités architecturales, architectures classiques (client-serveur, couches, P2P) et modernes (SOA, microservices, événementielle, serverless).",
      sections: [
        {
          heading: "Définition et évolution",
          blocks: [
            {
              type: "p",
              text: "L'architecture d'une application répartie désigne la manière dont les différents composants logiciels sont organisés, répartis sur plusieurs machines et coordonnent leurs interactions afin de fournir un service global. C'est la structure qui décrit : où sont placés les composants ? comment ils communiquent ? comment ils coopèrent pour réaliser une fonctionnalité ? L'architecture sert de plan d'organisation d'une application exécutée sur plusieurs ordinateurs connectés par un réseau.",
            },
            {
              type: "list",
              items: [
                "Années 1960 : architecture centralisée — un seul ordinateur puissant partagé par plusieurs utilisateurs.",
                "Années 1980 : architecture client-serveur — répartition des rôles entre un client et un serveur.",
                "Années 1990 : architecture multi-couches — serveurs d'applications et middlewares comme CORBA.",
                "Années 2000 : architecture orientée services (SOA) — intégration entre systèmes via les services Web.",
                "Années 2010+ : architectures micro-services, événementielles et serverless.",
              ],
            },
          ],
        },
        {
          heading: "Les 12 qualités architecturales",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "1. Scalabilité", v: "Capacité du système à augmenter efficacement ses ressources pour supporter une charge plus élevée sans dégradation notable des performances." },
                { k: "2. Performance", v: "Rapidité avec laquelle le système traite les requêtes et répond aux utilisateurs, en utilisant ses ressources de manière optimale." },
                { k: "3. Fiabilité", v: "Capacité à fonctionner correctement sur une longue durée sans erreurs ni interruptions." },
                { k: "4. Tolérance aux pannes", v: "Aptitude à continuer de fonctionner malgré la défaillance d'un composant." },
                { k: "5. Disponibilité", v: "Capacité à rester opérationnel et accessible aux utilisateurs quasiment en permanence." },
                { k: "6. Sécurité", v: "Protection des données et des services contre les accès non autorisés, les attaques et les manipulations malveillantes." },
                { k: "7. Maintenabilité", v: "Facilité à corriger, modifier ou améliorer le système sans perturber son fonctionnement global." },
                { k: "8. Modularité", v: "Composition en modules indépendants, facilitant le développement, la compréhension et le remplacement des composants." },
                { k: "9. Faible couplage", v: "Les composants interagissent avec un minimum de dépendances, permettant une évolution indépendante des modules." },
                { k: "10. Interopérabilité", v: "Capacité à communiquer et fonctionner avec d'autres systèmes ou technologies, quels que soient leurs langages ou plateformes." },
                { k: "11. Transparence", v: "Masquer la complexité et la distribution du système : l'utilisateur ou le programmeur perçoit un fonctionnement homogène et simple." },
                { k: "12. Compatibilité", v: "Capacité à fonctionner correctement avec d'autres logiciels, protocoles ou versions pour une intégration harmonieuse." },
              ],
            },
          ],
        },
        {
          heading: "Architectures classiques",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Client/Serveur", v: "Modèle où l'application est divisée en deux parties distinctes : le client envoie des requêtes au serveur, qui traite la demande et renvoie une réponse. Principe d'accès à des ressources centralisées via un réseau. Exemple : une application desktop qui interroge une base de données sur un serveur." },
                { k: "En couches", v: "Modèle conceptuel organisant l'application en plusieurs niveaux logiques, chacun remplissant une fonction spécifique (présentation, logique métier, accès aux données). Chaque couche ne communique qu'avec les couches voisines. Objectifs : modularité, maintenance, réutilisabilité, séparation des préoccupations." },
                { k: "Pair-à-Pair (P2P)", v: "Chaque nœud (pair) joue simultanément le rôle de client et de serveur. Pas de serveur central : les pairs communiquent directement, partagent ressources (fichiers, calcul, stockage) et collaborent. Réseau décentralisé, autonome, scalable et robuste (le système continue même si plusieurs nœuds tombent)." },
              ],
            },
            {
              type: "p",
              text: "Implémentation physique de l'architecture en couches : l'architecture 3-tiers sépare physiquement l'interface utilisateur (presentation tier : navigateurs/web servers), la logique applicative (business logic tier : application servers) et les données (data tier : database servers) reliées par Internet. Les architectures n-tiers basées sur le Web rajoutent des tiers supplémentaires (ex. serveur Web).",
            },
            {
              type: "table",
              headers: ["Critère", "Client/Serveur", "En couches", "P2P"],
              rows: [
                ["Organisation", "1 serveur central, plusieurs clients", "Plusieurs couches logiques dépendantes (2, 3, n)", "Réseau maillé de pairs sans serveur central"],
                ["Communication", "Client → Serveur", "Entre couches voisines (présentation, métier, données)", "Directement entre pairs (Peer to Peer)"],
                ["Centralisation", "Forte", "Dépend du déploiement (souvent centralisé)", "Décentralisation complète ou partielle"],
                ["Scalabilité", "Limitée par la capacité du serveur", "Bonne si les tiers sont distribués", "Très élevée (chaque pair ajoute des ressources)"],
                ["Tolérance aux pannes", "Faible : si le serveur tombe, tout s'arrête", "Moyenne : dépend des tiers critiques", "Très élevée : le réseau continue malgré plusieurs pannes"],
                ["Complexité de mise en œuvre", "Faible à moyenne", "Moyenne (plus de couches à gérer)", "Plus complexe"],
                ["Avantages", "Simplicité, contrôle centralisé, maintenance facilitée", "Modulaire, maintenable, réutilisable", "Scalabilité, robustesse, pas de point unique de défaillance"],
                ["Inconvénients", "Point unique de défaillance, surcharge du serveur", "Complexité accrue, risque de surcouches inutiles", "Sécurité complexe, performances variables, cohérence difficile"],
              ],
            },
          ],
        },
        {
          heading: "Architectures modernes",
          blocks: [
            {
              type: "p",
              text: "SOA (orientée services) : les fonctionnalités sont organisées sous forme de services indépendants, accessibles à distance via des interfaces standardisées (REST, SOAP…). Un service est une unité fonctionnelle autonome, faiblement couplée, qui réalise une tâche métier précise et peut être utilisé par plusieurs applications. Motivations : difficulté d'intégrer des systèmes hétérogènes (Java, .NET, C++…), complexité des intégrations point à point, manque d'agilité, besoin de réutiliser les fonctionnalités (authentification…), nécessité de standardiser la communication. Composants : consommateurs de services (applications qui invoquent), fournisseurs de services (systèmes qui implémentent et publient), annuaire/registre de services (référencie et permet la découverte), ESB (Enterprise Service Bus : routage, transformation et médiation). Fonctionnement : 1) le fournisseur publie le service dans le registre, 2) le client interroge le registre pour découvrir un service, 3) invocation et consommation du service.",
            },
            {
              type: "p",
              text: "Microservices : décomposition de l'application en un ensemble de petits services indépendants et autonomes. Chaque microservice exécute son propre processus, possède son propre espace de déploiement et de données, expose sa fonctionnalité via des API légères (REST, gRPC…), se concentre sur une capacité métier unique, et peut être développé, testé, déployé et scalé indépendamment. C'est une évolution moderne et plus fine de la SOA. Motivations : alléger la complexité de la SOA (trop centralisée autour de l'ESB), accélérer le développement et les mises à jour, évolutivité fine (scaler un microservice au lieu de toute l'application), indépendance technologique (chaque microservice a son langage, sa base, son framework), résilience (la panne d'un microservice ne fait pas tomber toute l'application). Composants : API Gateway (point d'entrée unique qui reçoit les requêtes et les redirige), conteneurs (Docker : environnement léger d'emballage), orchestrateur (Kubernetes : déploiement, redémarrage, scaling, réseau interne), système de communication (REST/gRPC synchrone ou messages/événements asynchrones).",
            },
            {
              type: "p",
              text: "Architecture événementielle (EDA) : les composants réagissent à des événements ou à des changements d'état, au lieu de dépendre de requêtes directes. Les événements sont publiés par des producteurs d'événements et consommés par des consommateurs d'événements via un canal d'événements ou un broker, ce qui permet une communication découplée et asynchrone. Motivations : réactivité (réagir immédiatement), découplage (séparer fortement les composants), scalabilité (grands volumes d'événements, traitement asynchrone).",
            },
            {
              type: "p",
              text: "Serverless : modèle où l'application repose sur des services cloud entièrement gérés par les fournisseurs — le développeur ne gère plus les serveurs, leur configuration ni leur mise à l'échelle. L'exécution du code se fait à la demande, sous forme de petites fonctions (Functions-as-a-Service), déclenchées par des événements (requête HTTP, message, événement d'un autre service…). Les fonctions sont déployées et exécutées sur une infrastructure cloud distribuée ; l'application est composée de services découplés déployés indépendamment. Motivations : réduire la complexité opérationnelle et accélérer le développement, s'adapter automatiquement à la charge, payer uniquement à l'usage.",
            },
            {
              type: "table",
              headers: ["Critère", "SOA", "Microservices", "Événementielle", "Serverless"],
              rows: [
                ["Principe", "Services réutilisables communiquant via un bus (ESB)", "Petits services autonomes, faiblement couplés", "Système basé sur l'échange d'événements pour déclencher des actions", "Exécution de fonctions à la demande, sans gérer de serveurs"],
                ["Granularité", "Services grands et souvent complexes", "Services petits et spécialisés", "Événements + traitements découpés en réactions", "Fonctions très petites et unitaires"],
                ["Couplage", "Modéré (souvent via ESB central)", "Très faible", "Très faible (communication asynchrone)", "Très faible (à l'événement)"],
                ["Communication", "Souvent synchrone (SOAP)", "API légères (REST/JSON)", "Majoritairement asynchrone (files, messages)", "Déclenchement par événements (HTTP, stockage, file…)"],
                ["Scalabilité", "Limitée par l'ESB", "Très élevée, indépendante (par service)", "Très élevée selon le flux d'événements", "Automatique, gérée par le cloud"],
                ["Infrastructure", "L'entreprise gère serveurs et ESB", "L'entreprise gère conteneurs/machines", "L'entreprise gère les composants événementiels", "100 % gérée par le cloud"],
                ["Cas d'usage", "Intégration de grands systèmes d'entreprise", "Applications web/Cloud complexes et modulaires", "IoT, systèmes réactifs, streaming", "Traitements ponctuels, automatisations"],
                ["Avantages", "Réutilisation, standardisation", "Rapidité de déploiement, flexibilité", "Réactivité, découplage fort, performance", "Coût réduit, aucune gestion serveur, auto-scaling"],
                ["Inconvénients", "L'ESB peut devenir un goulot", "Gestion complexe du déploiement (DevOps)", "Difficulté à gérer l'ordre et la cohérence", "Limitations de durée, dépendance au cloud"],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "c4",
      title: "Chapitre 4 — Communication asynchrone",
      summary: "Pourquoi l'asynchronisme, intervenants, modèles (message passing, pub/sub, queues, streaming), mécanismes (ACK, retry, durabilité), garanties de livraison, défis.",
      sections: [
        {
          heading: "Pourquoi l'asynchronisme",
          blocks: [
            {
              type: "p",
              text: "La communication asynchrone joue un rôle central dans les applications réparties modernes. Contrairement aux interactions synchrones, l'asynchronisme propose un modèle d'échange où les processus n'ont pas besoin d'attendre une réponse immédiate pour continuer leur exécution. Ce modèle répond aux défis de la distribution, de la scalabilité et de la tolérance aux pannes. On parle de découplage temporel : l'émetteur n'attend pas la fin du traitement, il envoie et continue son exécution ; le retour (si nécessaire) arrive plus tard, via callback ou message de réponse. Le message peut être stocké, transmis plus tard, ré-essayé, consommé par plusieurs acteurs. L'asynchronisme est la base des architectures orientées événements, basées sur des brokers de messages, serverless avec déclencheurs, et microservices distribués.",
            },
            {
              type: "kv",
              items: [
                { k: "Le producteur", v: "Entité (service, processus, module, application…) qui génère un message/événement/tâche, l'envoie vers un système intermédiaire sans attendre la réponse du consommateur, et continue son exécution immédiatement. Le producteur est découplé du traitement." },
                { k: "Le consommateur", v: "Entité qui reçoit le message ou l'événement, le traite plus tard selon sa disponibilité, et peut être unique ou multiple (point-à-point ou publish/subscribe). Découplé à la fois dans le temps et dans l'espace du producteur." },
                { k: "L'intermédiaire (Broker / Queue / Middleware de messages)", v: "Stocke les messages, les achemine, garantit la livraison, gère les pics de charge. C'est lui qui rend possibles le découplage temporel, la résilience et la scalabilité." },
              ],
            },
            {
              type: "kv",
              items: [
                { k: "1. Éviter le blocage", v: "Ne pas bloquer l'exécution, continuer d'autres tâches pendant l'attente → augmente la réactivité globale." },
                { k: "2. Découpler producteurs et consommateurs", v: "Le producteur envoie, le consommateur traite plus tard ; ils n'ont pas besoin d'être actifs en même temps → ajout/suppression de consommateurs sans impacter les producteurs." },
                { k: "3. Améliorer la scalabilité", v: "Le système absorbe les pics d'activité via des files/messages ; la variation de charge ne sature pas immédiatement." },
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Découplage temporel", v: "L'émetteur et le récepteur n'ont plus l'obligation d'agir au même moment." },
                { k: "Découplage spatial", v: "Les acteurs n'ont pas nécessairement connaissance l'un de l'autre." },
                { k: "Résilience et tolérance aux pannes", v: "Le système continue de fonctionner même si un service tombe : les messages restent stockés jusqu'au redémarrage." },
                { k: "Evolutivité (scalabilité)", v: "De nouveaux consommateurs peuvent être ajoutés facilement." },
                { k: "Gestion des pics de charge", v: "Si la consommation est plus lente que la production, le système régule le flux en ralentissant, mettant en file ou rejetant proprement des messages." },
              ],
            },
          ],
        },
        {
          heading: "Les 4 modèles de communication asynchrone",
          blocks: [
            {
              type: "table",
              headers: ["Modèle", "Principe", "Technologies majeures"],
              rows: [
                ["Message Passing (envoi direct)", "Un service envoie un message à un autre sans attendre de réponse immédiate. Point-à-point : destinataire unique (couplage spatial). Message indépendant du protocole (WebSocket, socket réseau, HTTP asynchrone, gRPC asynchrone, middleware…). Utilisé dans les architectures réactives et les microservices. ⚠ Si le récepteur est indisponible, le message peut être perdu.", "RabbitMQ, NATS, Microsoft MSMQ"],
                ["Publish/Subscribe (Pub/Sub)", "Les publishers publient des messages dans un intermédiaire (broker, canal ou topic) ; les subscribers déclarent leur intérêt auprès de cet intermédiaire. Découplage fort (spatial, temporel, logique), scalabilité, résilience, diffusion efficace (broadcast). Idéal pour les architectures orientées événements (EDA). Deux types : topic-based (les subscribers choisissent des topics nommés) et content-based (les abonnés spécifient des filtres, le routage dépend du contenu).", "Redis Pub/Sub, Google Pub/Sub, Apache Kafka"],
                ["Queue-based Messaging (file d'attente)", "Un message envoyé par un producteur (sender) est placé dans une file d'attente (queue) gérée par un message broker ; il y reste jusqu'à ce qu'un consommateur (receiver) le récupère et le traite. Chaque message est consommé par UN SEUL destinataire. La queue = mémoire temporaire (si le receiver tombe en panne) et régulation (absorbe les pics). Le sender ne connaît pas le receiver : juste l'adresse du broker et le nom de la queue.", "RabbitMQ, Apache Kafka, ActiveMQ"],
                ["Streaming d'événements (Event Streams)", "Les événements (logs, transactions, clics, mesures, signaux…) sont capturés, stockés et traités en continu sous forme de flux. 1) les producteurs publient dans un flux, 2) les consommateurs lisent en continu, 3) les événements sont persistés dans un journal (log) distribué append-only, 4) traitement temps réel ou quasi temps réel. Contrairement aux systèmes classiques (stocker puis traiter), le streaming traite au moment où les données arrivent.", "Kafka Streams, Apache Pulsar, Amazon Kinesis"],
              ],
            },
          ],
        },
        {
          heading: "Mécanismes fondamentaux",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Acknowledgements (ACK / NACK)", v: "L'ACK est un accusé de réception envoyé par le consommateur au broker pour confirmer qu'un message a bien été reçu et traité ; le NACK (negative ACK) indique un échec de traitement. Sans ACK, le broker ne sait pas si un message a été consommé et risque de le perdre ou de le supprimer prématurément." },
                { k: "Politiques de réessai (Retry) et backoff", v: "Règles déterminant combien et quand retenter la livraison d'un message en cas d'échec : stratégie simple (n tentatives fixes), exponential backoff (attente croissante : t, 2t, 4t…), jitter (ajout d'aléa pour éviter les pics synchrones). Après un nombre maximal d'essais → Dead Letter Queue." },
                { k: "Garanties d'ordre et partitionnement", v: "L'ordering fixe les règles d'ordre de livraison et de traitement ; le partitionnement divise un flux en sous-flux traités en parallèle. Gain de scalabilité mais abandon de l'ordre global strict : on garantit seulement un ordre local à l'intérieur de chaque partition." },
                { k: "Durabilité des messages (persistance)", v: "Capacité à stocker les messages de façon persistante (disque, log) pour survivre aux pannes. 3 mécanismes : messages en mémoire (volatile), messages persistants (écriture sur support non-volatile : disque, log append-only), messages redondants (duplication sur plusieurs nœuds indépendants pour la tolérance aux pannes)." },
              ],
            },
            {
              type: "table",
              headers: ["Garantie", "Principe", "Exemple"],
              rows: [
                ["Au-plus-une fois (At-most-once)", "Message envoyé sans mécanisme de réessai : peut être perdu, mais jamais livré deux fois → perte tolérable, duplication inacceptable", "Notification de logs"],
                ["Au-moins-une fois (At-least-once)", "Le message est réémis tant qu'il n'a pas été confirmé (ACK) : garanti livré, mais peut être livré plusieurs fois → le consommateur doit être idempotent", "Email de confirmation de commande"],
                ["Exactement-une fois (Exactly-once)", "Chaque message est traité une seule fois, même en cas d'échec ou de redémarrage → garantie la plus forte mais la plus coûteuse", "Paiement ou transaction bancaire"],
              ],
            },
          ],
        },
        {
          heading: "Défis de la communication asynchrone",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Perte potentielle d'événements", v: "Un message peut être perdu si le broker ou le producteur n'est pas correctement configuré pour garantir la persistance et les confirmations (ACK)." },
                { k: "Messages dupliqués", v: "La plupart des systèmes garantissent « au moins une fois » : un même message peut être livré plusieurs fois → rendre les traitements idempotents." },
                { k: "Problème d'ordre des messages", v: "Les messages ne sont pas toujours reçus dans le même ordre qu'à l'envoi, surtout avec plusieurs partitions ou consommateurs." },
                { k: "Choix du niveau de durabilité", v: "Mémoire, disque ou réplication : impacte directement la performance et la fiabilité." },
                { k: "Gestion de l'évolution des messages", v: "Changer le format d'un message peut casser des consommateurs existants → gestion stricte des versions et de la compatibilité des schémas." },
                { k: "Débogage difficile, manque de visibilité", v: "Un message traverse plusieurs services de façon décalée dans le temps → retracer l'origine d'un problème nécessite des outils d'observabilité avancés (logs, tracing, métriques)." },
                { k: "Problèmes de cohérence", v: "Avec l'asynchronisme, les services peuvent voir des états temporaires différents : les mises à jour ne sont pas instantanées." },
              ],
            },
          ],
        },
      ],
    },
  ],

  quiz: [
    { id: "r1", chapter: "c1", question: "Qu'est-ce qu'un système réparti ?", options: ["Un ordinateur très puissant", "Un ensemble de machines autonomes reliées par un réseau qui coopèrent pour offrir l'illusion d'un système unique et cohérent", "Un logiciel installé sur un seul serveur", "Un réseau Wi-Fi"], correct: 1, explanation: "Un système réparti = ensemble de machines autonomes reliées par un réseau, coopérant pour offrir l'illusion d'un système unique (ex. cluster hébergeant Google)." },
    { id: "r2", chapter: "c1", question: "Quelle est la différence entre système réparti et application répartie ?", options: ["Aucune", "Le système est l'infrastructure (réseau, serveurs), l'application est le logiciel construit au-dessus", "L'application est physique, le système est logique", "Le système est plus rapide"], correct: 1, explanation: "Le système réparti est l'infrastructure matérielle et logicielle (ex. Internet) ; l'application répartie est le logiciel construit au-dessus (ex. WhatsApp, Netflix)." },
    { id: "r3", chapter: "c1", question: "Quels sont les avantages des serveurs répartis géographiquement ?", options: ["Rapidité, disponibilité, tolérance aux pannes, qualité de service", "Moins de code à écrire", "Absence de réseau", "Sécurité garantie à 100%"], correct: 0, explanation: "Chaque utilisateur se connecte au serveur le plus proche : rapidité, meilleure disponibilité, tolérance aux pannes et qualité de service." },
    { id: "r4", chapter: "c1", question: "Dans quelle période sont apparus les microservices et les conteneurs (Docker, Kubernetes) ?", options: ["Années 1980", "Années 1990", "Années 2010", "Années 1960"], correct: 2, explanation: "Années 2010 : montée du big data, de l'IoT, du fog/edge computing, microservices et conteneurs (Docker, Kubernetes)." },
    { id: "r5", chapter: "c1", question: "Qu'est-ce qu'une interface de service ?", options: ["Un câble réseau", "Un contrat qui définit quelles opérations peuvent être demandées et comment les appeler", "Un type de base de données", "Un firewall"], correct: 1, explanation: "L'interface est un contrat : quelles opérations demander (s'authentifier…), comment les appeler (HTTP, API REST, JSON), ce que le service renvoie (succès ou erreur)." },
    { id: "r6", chapter: "c2", question: "Quel est l'objectif principal de la communication répartie ?", options: ["Chiffrer les données", "Donner l'illusion que les interactions à distance se déroulent aussi simplement qu'en local", "Réduire le nombre de serveurs", "Remplacer Internet"], correct: 1, explanation: "Objectif : donner l'illusion que les interactions à distance se déroulent aussi simplement qu'en local, tout en masquant la complexité du réseau." },
    { id: "r7", chapter: "c2", question: "Quel défi de la communication répartie correspond à « éviter qu'un virement soit débité deux fois » ?", options: ["Hétérogénéité", "Transparence de localisation", "Fiabilité et pannes", "Sécurité"], correct: 2, explanation: "La fiabilité et les pannes : messages perdus, dupliqués, corrompus → garantir la cohérence, concevoir reprise, réplication et redondance." },
    { id: "r8", chapter: "c2", question: "Quel est le rôle du middleware ?", options: ["Transmettre les bits sur le câble", "Couche logicielle intermédiaire qui facilite la communication et la transparence entre nœuds (CORBA, Java RMI)", "Stocker les mots de passe", "Générer les adresses IP"], correct: 1, explanation: "Le middleware est la couche logicielle intermédiaire qui facilite la communication et la transparence entre nœuds (ex. CORBA, Java RMI)." },
    { id: "r9", chapter: "c2", question: "Quelles sont les 3 fonctions logiques d'un nœud ?", options: ["Lire, écrire, effacer", "Recevoir (interface d'entrée), traiter, envoyer (interface de sortie)", "Compiler, déployer, tester", "Chiffrer, authentifier, autoriser"], correct: 1, explanation: "Tout nœud = bloc logique avec 3 fonctions : interface d'entrée (recevoir), traitement (décider quoi faire), interface de sortie (envoyer)." },
    { id: "r10", chapter: "c2", question: "Quelle est la différence entre communication synchrone et asynchrone ?", options: ["Synchrone : l'émetteur attend la réponse ; asynchrone : il continue sans attendre", "Synchrone utilise UDP, asynchrone TCP", "Synchrone est plus rapide", "Asynchrone est toujours fiable"], correct: 0, explanation: "Synchrone : requête puis attente de la réponse (blocage possible). Asynchrone : envoi sans attente, traitement continu, réponse différée." },
    { id: "r11", chapter: "c2", question: "Le broadcast consiste à…", options: ["Envoyer un message à un seul récepteur", "Envoyer un message à un groupe spécifique", "Diffuser un message à tous les nœuds du réseau", "Chiffrer un message"], correct: 2, explanation: "Broadcast = diffusion à TOUS les nœuds du réseau (ex. alerte à tous les abonnés). Unicast = 1→1, Multicast = 1→groupe." },
    { id: "r12", chapter: "c2", question: "Combien de couches comptent les modèles OSI et TCP/IP ?", options: ["OSI 4 / TCP-IP 7", "OSI 7 / TCP-IP 4", "7 chacun", "4 chacun"], correct: 1, explanation: "OSI = 7 couches (théorique, ISO, fin des années 1970) ; TCP/IP = 4 couches (pratique : Application, Transport, Internet, Accès réseau)." },
    { id: "r13", chapter: "c2", question: "Quelle couche OSI gère le format des données, la compression et le chiffrement ?", options: ["Application", "Présentation", "Session", "Transport"], correct: 1, explanation: "La couche Présentation (6) : conversion de format (UTF-8→ASCII, JPEG→BMP), compression, chiffrement/déchiffrement (HTTPS)." },
    { id: "r14", chapter: "c2", question: "Quelle est la séquence de l'encapsulation TCP/IP ?", options: ["Message → Segment → Paquet → Trame → Bits", "Bits → Trame → Paquet → Segment → Message", "Paquet → Message → Segment → Trame", "Trame → Bits → Segment → Paquet"], correct: 0, explanation: "Encapsulation : Message + en-tête = Segment (TCP) ; Segment + IP = Paquet ; Paquet + MAC = Trame ; puis bits sur le support physique." },
    { id: "r15", chapter: "c2", question: "Quelles sont les 3 étapes du 3-way handshake de TCP ?", options: ["SYN, SYN-ACK, ACK", "START, SEND, STOP", "HELLO, OK, BYE", "REQ, RES, END"], correct: 0, explanation: "TCP : 1) le client envoie SYN, 2) le serveur répond SYN-ACK, 3) le client confirme ACK. SYN = synchronisation, ACK = accusé de réception." },
    { id: "r16", chapter: "c2", question: "Quel protocole de transport est adapté au streaming vidéo et aux jeux en ligne ?", options: ["TCP", "UDP", "FTP", "SMTP"], correct: 1, explanation: "UDP : très rapide (pas de connexion ni ACK), idéal temps réel (streaming, jeux, VoIP, DNS) mais sans garantie de livraison." },
    { id: "r17", chapter: "c2", question: "Que fait UDP si une erreur est détectée par le checksum ?", options: ["Retransmet le datagramme", "Le datagramme est simplement ignoré (pas de retransmission)", "Demande une correction au serveur", "Redémarre la connexion"], correct: 1, explanation: "UDP ne retransmet pas : si le checksum ne correspond pas, le datagramme est simplement ignoré par le récepteur." },
    { id: "r18", chapter: "c2b", question: "Quel est le port par défaut de HTTP, HTTPS, SSH et SMTP ?", options: ["80 / 443 / 22 / 25", "21 / 80 / 23 / 110", "443 / 80 / 25 / 22", "8080 / 8443 / 21 / 53"], correct: 0, explanation: "HTTP=80, HTTPS=443, SSH=22, SMTP=25, FTP=21, DNS=53, POP3=110, IMAP=143, Telnet=23, SNMP=161." },
    { id: "r19", chapter: "c2b", question: "Qu'est-ce qu'un numéro de port ?", options: ["Une adresse physique de la carte réseau", "Un identifiant logique utilisé par l'OS pour distinguer les applications qui communiquent sur le réseau", "Un mot de passe", "Un type de câble"], correct: 1, explanation: "Le port est un identifiant logique (nombre) utilisé par l'OS pour diriger les messages vers le bon programme sur la machine." },
    { id: "r20", chapter: "c2b", question: "Un socket est défini par…", options: ["Uniquement une adresse IP", "Le couple (adresse IP, port) — et une communication complète par le quadruplet (IP_c, Port_c, IP_s, Port_s)", "Uniquement un numéro de port", "Une adresse MAC"], correct: 1, explanation: "Socket = couple (IP, port) identifiant une application précise. Les échanges TCP/UDP sont identifiés par le quadruplet complet." },
    { id: "r21", chapter: "c2b", question: "Quelles classes Java sont utilisées pour les sockets TCP ?", options: ["DatagramSocket et DatagramPacket", "ServerSocket et Socket", "URL et URLConnection", "Channel et Buffer"], correct: 1, explanation: "TCP : ServerSocket (côté serveur, écoute) et Socket (côté client/serveur après acceptation, échange via flux InputStream/OutputStream)." },
    { id: "r22", chapter: "c2b", question: "Quelles classes Java sont utilisées pour les sockets UDP ?", options: ["ServerSocket et Socket", "DatagramSocket et DatagramPacket", "StreamSocket", "UDPServer"], correct: 1, explanation: "UDP : DatagramSocket (la « prise » de communication) et DatagramPacket (le paquet : données + IP destinataire + port). Aucune session persistante." },
    { id: "r23", chapter: "c2b", question: "Dans RPC, qu'est-ce que le stub client ?", options: ["Le serveur qui exécute la fonction", "Code généré côté client qui remplace l'appel réel : marshalling + envoi", "Le fichier IDL", "Le registre de services"], correct: 1, explanation: "Le stub client (proxy) fait le marshalling des arguments et envoie le message. Le skeleton côté serveur fait l'unmarshalling et appelle la fonction réelle." },
    { id: "r24", chapter: "c2b", question: "Qu'est-ce que le marshalling ?", options: ["La conversion des paramètres en une représentation binaire ou textuelle pour le transport", "Le chiffrement des données", "La création du socket", "La résolution DNS"], correct: 0, explanation: "Marshalling/Serialization = conversion des paramètres en binaire (Protobuf, Thrift) ou texte (JSON, XML). Unmarshalling = reconstitution à l'autre bout." },
    { id: "r25", chapter: "c2b", question: "Quel outil génère le code pour ONC RPC (Sun RPC) ?", options: ["rmic", "rpcgen", "MIDL", "idlj"], correct: 1, explanation: "ONC RPC → rpcgen ; DCE RPC → idl ; CORBA → idl compiler (idltojava, omniidl) ; Microsoft RPC → MIDL ; RMI → rmic." },
    { id: "r26", chapter: "c2b", question: "Quel est le rôle de l'ORB dans CORBA ?", options: ["Compiler l'IDL", "Transporter les requêtes et gérer la communication réseau (comme le RPC runtime)", "Stocker les objets", "Générer les stubs"], correct: 1, explanation: "L'ORB (Object Request Broker) transporte la requête et gère la communication — le même rôle que le RPC runtime dans un système RPC classique." },
    { id: "r27", chapter: "c2b", question: "Pourquoi RMI a-t-il été créé alors que CORBA existait ?", options: ["Pour un système plus léger, spécifique à Java, utilisant la sérialisation native des objets Java", "Pour remplacer TCP/IP", "Pour être multi-langages", "Pour être plus lent"], correct: 0, explanation: "RMI (Remote Method Invocation) : inspiré de CORBA mais plus léger, spécifique à Java, avec sérialisation native des objets Java." },
    { id: "r28", chapter: "c2b", question: "Quelle classe Java étend-on pour rendre un objet disponible à distance en RMI ?", options: ["RemoteObject", "UnicastRemoteObject", "RMIObject", "SerialObject"], correct: 1, explanation: "La classe d'implémentation RMI étend UnicastRemoteObject et implémente l'interface distante (qui étend java.rmi.Remote)." },
    { id: "r29", chapter: "c2b", question: "Sur quel port par défaut fonctionne le registre RMI ?", options: ["8080", "1099", "1521", "9092"], correct: 1, explanation: "Le registre RMI écoute par défaut sur le port 1099 (LocateRegistry.createRegistry(1099), commande rmiregistry)." },
    { id: "r30", chapter: "c2b", question: "Depuis quelle version de Java le skeleton RMI est-il créé dynamiquement ?", options: ["Java 1.2", "Java 5", "Java 8", "Java 11"], correct: 1, explanation: "Depuis Java 5, le skeleton est créé dynamiquement sans nécessiter de compilation manuelle (plus besoin de rmic pour le générer)." },
    { id: "r31", chapter: "c2b", question: "Quels sont les inconvénients de RMI ?", options: ["Trop rapide", "Spécifique à Java, dépendance à la JVM, peu adapté aux systèmes hétérogènes", "Ne passe pas d'objets", "Pas de transparence réseau"], correct: 1, explanation: "RMI : spécifique à Java (pas interopérable), dépendance forte à la JVM, peu adapté aux systèmes distribués hétérogènes." },
    { id: "r32", chapter: "c3", question: "Que désigne l'architecture d'une application répartie ?", options: ["Le prix des serveurs", "La manière dont les composants sont organisés, répartis sur plusieurs machines et coordonnent leurs interactions", "Le langage de programmation", "La version de l'OS"], correct: 1, explanation: "L'architecture décrit où sont placés les composants, comment ils communiquent et comment ils coopèrent pour réaliser une fonctionnalité." },
    { id: "r33", chapter: "c3", question: "Quelle qualité architecturale correspond à « continuer de fonctionner malgré la défaillance d'un composant » ?", options: ["Fiabilité", "Tolérance aux pannes", "Disponibilité", "Maintenabilité"], correct: 1, explanation: "Tolérance aux pannes = continuer malgré la défaillance. Fiabilité = fonctionner longtemps sans erreurs. Disponibilité = rester opérationnel quasiment en permanence." },
    { id: "r34", chapter: "c3", question: "Dans l'architecture P2P, chaque nœud…", options: ["est uniquement client", "est uniquement serveur", "joue simultanément le rôle de client et de serveur", "est un firewall"], correct: 2, explanation: "P2P : chaque pair joue simultanément client et serveur, sans serveur central ; réseau décentralisé, autonome, scalable et robuste." },
    { id: "r35", chapter: "c3", question: "Quel composant de SOA assure le routage, la transformation et la médiation entre services ?", options: ["L'API Gateway", "L'ESB (Enterprise Service Bus)", "Le registre", "Le conteneur"], correct: 1, explanation: "L'ESB (Enterprise Service Bus) assure routage, transformation et médiation entre services dans une architecture SOA. L'API Gateway appartient aux microservices." },
    { id: "r36", chapter: "c3", question: "Quel est le rôle de l'API Gateway dans une architecture microservices ?", options: ["Stocker les données", "Point d'entrée unique pour les clients : reçoit les requêtes et les redirige vers les microservices appropriés", "Compiler le code", "Remplacer la base de données"], correct: 1, explanation: "L'API Gateway est le point d'entrée unique : elle reçoit les requêtes des clients et les redirige vers les microservices appropriés." },
    { id: "r37", chapter: "c3", question: "Quelle motivation a conduit des SOA vers les microservices ?", options: ["Alléger la complexité des applications SOA (trop centralisées autour de l'ESB) et scaler finement", "Utiliser SOAP obligatoirement", "Centraliser davantage", "Réduire le nombre de services"], correct: 0, explanation: "Microservices : alléger SOA (trop centralisée autour de l'ESB), services plus petits et indépendants, évolutivité fine, indépendance technologique, résilience." },
    { id: "r38", chapter: "c3", question: "Dans l'architecture serverless, comment le code est-il exécuté ?", options: ["En continu sur des serveurs dédiés", "À la demande, sous forme de petites fonctions (Functions-as-a-Service) déclenchées par des événements", "Une fois par semaine", "Uniquement en local"], correct: 1, explanation: "Serverless : exécution à la demande en petites fonctions (FaaS) déclenchées par des événements (requête HTTP, message…), infrastructure 100% gérée par le cloud, paiement à l'usage." },
    { id: "r39", chapter: "c3", question: "Quelle architecture a pour principal inconvénient « la difficulté à gérer l'ordre et la cohérence » ?", options: ["SOA", "Microservices", "Événementielle", "Serverless"], correct: 2, explanation: "L'architecture événementielle : réactive et découplée, mais difficulté à gérer l'ordre des événements et la cohérence." },
    { id: "r40", chapter: "c3", question: "Quelle est la limite de scalabilité de SOA ?", options: ["Aucune", "Limitée par l'ESB", "Limitée par le cloud", "Limitée par le nombre de clients"], correct: 1, explanation: "En SOA, la scalabilité est limitée par l'ESB qui peut devenir un goulot d'étranglement central." },
    { id: "r41", chapter: "c4", question: "Qu'est-ce que le découplage temporel ?", options: ["Séparer les machines physiquement", "L'émetteur n'attend pas la fin du traitement : il envoie et continue son exécution, le retour arrive plus tard", "Chiffrer les messages dans le temps", "Utiliser plusieurs fuseaux horaires"], correct: 1, explanation: "Découplage temporel : l'émetteur n'attend pas la fin du traitement, il envoie et continue ; le retour arrive plus tard via callback ou message de réponse." },
    { id: "r42", chapter: "c4", question: "Quel est le rôle du broker dans la communication asynchrone ?", options: ["Compiler le code", "Stocker les messages, les acheminer, garantir la livraison et gérer les pics de charge", "Créer les interfaces graphiques", "Remplacer la base de données"], correct: 1, explanation: "Le broker (queue/middleware de messages) stocke, achemine, garantit la livraison, gère les pics de charge — il rend possibles découplage temporel, résilience et scalabilité." },
    { id: "r43", chapter: "c4", question: "Dans le modèle Queue-based, combien de consommateurs traitent chaque message ?", options: ["Tous", "Un seul", "Deux", "Aucun"], correct: 1, explanation: "Queue-based Messaging : chaque message est consommé par UN SEUL destinataire. Pour diffuser à plusieurs, on utilise Pub/Sub." },
    { id: "r44", chapter: "c4", question: "Quelle est la différence entre Pub/Sub topic-based et content-based ?", options: ["Topic-based : les subscribers choisissent des topics nommés ; content-based : ils spécifient des filtres sur le contenu", "Topic-based est synchrone, content-based asynchrone", "Aucune différence", "Content-based ne fonctionne qu'avec Kafka"], correct: 0, explanation: "Topic-based : les messages sont publiés dans des topics nommés que les abonnés choisissent. Content-based : le routage dépend du contenu du message via des filtres." },
    { id: "r45", chapter: "c4", question: "Dans le streaming d'événements, où sont persistés les événements ?", options: ["Dans une base relationnelle", "Dans un journal (log) distribué append-only", "Dans un fichier Excel", "En mémoire cache uniquement"], correct: 1, explanation: "Le streaming persiste les événements dans un log append-only (journal en écriture seule), traités en continu au moment où ils arrivent (Kafka Streams, Pulsar, Kinesis)." },
    { id: "r46", chapter: "c4", question: "Que signifie NACK ?", options: ["Network Acknowledgement", "Negative ACK : accusé indiquant un échec de traitement", "New ACK", "No ACK : message perdu"], correct: 1, explanation: "NACK = negative acknowledgment : le consommateur indique au broker un échec de traitement, déclenchant généralement une politique de réessai." },
    { id: "r47", chapter: "c4", question: "Qu'est-ce que l'exponential backoff ?", options: ["Réessais avec attente croissante (t, 2t, 4t…)", "Réessais à intervalle fixe", "Abandon immédiat", "Chiffrement exponentiel"], correct: 0, explanation: "Exponential backoff : attente croissante entre les réessais (t, 2t, 4t…). Le jitter ajoute de l'aléa pour éviter les pics synchrones. Au-delà du maximum → Dead Letter Queue." },
    { id: "r48", chapter: "c4", question: "Quelle garantie de livraison convient à un paiement bancaire ?", options: ["At-most-once", "At-least-once", "Exactly-once", "Best-effort"], correct: 2, explanation: "Exactly-once : chaque message traité une seule fois même en cas d'échec/redémarrage — la garantie la plus forte et la plus coûteuse, indispensable pour les paiements." },
    { id: "r49", chapter: "c4", question: "Que doit faire un consommateur dans un système « au-moins-une fois » ?", options: ["Rien de particulier", "Être idempotent (le traitement répété ne change pas le résultat)", "Payer plus", "Utiliser TCP"], correct: 1, explanation: "At-least-once : le message peut être livré plusieurs fois → le consommateur doit être idempotent pour tolérer les duplications." },
    { id: "r50", chapter: "c4", question: "Quel outil d'observabilité est nécessaire pour déboguer la communication asynchrone ?", options: ["Logs, tracing, métriques", "Un crayon et du papier", "Un antivirus", "Un câble console"], correct: 0, explanation: "Un message traverse plusieurs services de façon décalée : il faut des outils d'observabilité avancés (logs, tracing distribué, métriques)." },
    { id: "r51", chapter: "c2", question: "Quelle couche TCP/IP correspond aux couches Liaison de données + Physique du modèle OSI ?", options: ["Application", "Transport", "Internet", "Accès au réseau"], correct: 3, explanation: "TCP/IP : Application (OSI 5-6-7), Transport (OSI 4), Internet (OSI 3), Accès au réseau (OSI 1-2)." },
    { id: "r52", chapter: "c2", question: "Quels protocoles appartiennent à la couche Application du modèle TCP/IP ?", options: ["TCP et UDP", "IP et ICMP", "HTTP, HTTPS, DNS, SMTP", "Ethernet et Wi-Fi"], correct: 2, explanation: "Couche Application TCP/IP : HTTP, HTTPS, DNS, SMTP… ; Transport : TCP/UDP ; Internet : IP ; Accès réseau : Ethernet, Wi-Fi, MAC." },
  ],
};
