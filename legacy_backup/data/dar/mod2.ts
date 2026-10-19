import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Modules 3 & 4 — Modèles de communication + Le réseau (OSI / TCP-IP)
// ═══════════════════════════════════════════════════════════════

export const dmod3: Module = {
  id: 'd3',
  num: 3,
  title: 'Les 5 modèles de communication',
  subtitle: 'Message, appels (RPC), objets distribués (RMI), flux et événements',
  icon: '🔀',
  color: 'sky',
  source: 'Chapitre 2 Partie 1 — slides 27-33',
  sections: [
    {
      id: 'd3s1',
      title: 'Vue d\u2019ensemble',
      blocks: [
        { type: 'paragraph', text: 'La communication dans un système réparti peut prendre plusieurs formes, selon la nature de l\u2019échange et le degré de synchronisation attendu entre les entités. Les modèles de communication décrivent la structure, la dynamique ou la forme globale du processus de communication. Ils précisent comment l\u2019information est transmise entre les acteurs.' },
        { type: 'list', items: [
          'Communication orientée message',
          'Communication orientée appels',
          'Communication par objets distribués',
          'Communication orientée flux',
          'Communication orientée événements',
        ] },
        { type: 'diagram', diagram: 'CommModels' },
      ],
    },
    {
      id: 'd3s2',
      title: 'Communication orientée message',
      blocks: [
        { type: 'definition', term: 'Principe', def: 'Les nœuds (ou les entités) échangent des informations sous forme de messages explicites (envoyer / recevoir).' },
        { type: 'list', items: [
          'Les messages peuvent être synchrones ou asynchrones.',
          'La communication se fait par des files de messages, où un message est envoyé par un producteur et consommé par un consommateur.',
          'Nécessite une adresse de destination.',
          'Implémenté via des sockets réseau (TCP ou UDP).',
        ] },
        { type: 'kv', items: [
          { k: 'Avantages', v: 'Découplage fort (les nœuds peuvent être écrits dans des langages différents, être sur des machines distantes, etc.).' },
          { k: 'Inconvénients', v: 'Complexité de gestion des messages (ordre, duplication, erreurs…).' },
          { k: 'Exemple concret', v: 'Une application bancaire envoie une requête de virement sous forme de message à un service de paiement. Le service reçoit, traite, et renvoie une confirmation par message.' },
        ] },
      ],
    },
    {
      id: 'd3s3',
      title: 'Communication orientée appels (RPC)',
      blocks: [
        { type: 'definition', term: 'Principe', def: 'La communication par appel de procédure à distance (RPC — Remote Procedure Call) consiste à appeler à distance une procédure ou une fonction sur un autre système comme si elle était locale.' },
        { type: 'list', items: [
          'Le système cache la complexité réseau via des stubs (proxy local) qui transforment les appels en messages et les réponses en résultats.',
          'La communication est généralement synchrone.',
          'Le programmeur n\u2019a pas à gérer l\u2019envoi/réception de messages.',
        ] },
        { type: 'kv', items: [
          { k: 'Avantages', v: 'Simplicité d\u2019utilisation (on programme comme si tout était local).' },
          { k: 'Inconvénients', v: 'Forte dépendance au réseau (défaillances, latence, …) — Couplage fort : chaque nœud doit connaître la signature de la fonction distante (nom, paramètres, types de retour).' },
          { k: 'Exemple concret', v: 'Une application mobile appelle payerFacture() sur un serveur distant via RPC. Pour le développeur, cela ressemble à un simple appel de fonction.' },
        ] },
      ],
    },
    {
      id: 'd3s4',
      title: 'Communication par objets distribués (RMI)',
      blocks: [
        { type: 'definition', term: 'Principe', def: 'Dans la communication par objets distribués (RMI — Remote Method Invocation), les entités du système réparti sont représentées par des objets distants. Chaque objet expose ses fonctionnalités au travers d\u2019une interface distante, et les autres entités peuvent invoquer ses méthodes de manière transparente comme s\u2019il s\u2019agissait d\u2019objets locaux.' },
        { type: 'list', items: [
          'C\u2019est une extension de l\u2019idée du RPC, mais appliquée aux objets.',
          'Un objet sur une machine peut invoquer une méthode sur un objet situé ailleurs.',
          'Implémenté par des middlewares comme Java RMI et CORBA.',
        ] },
        { type: 'kv', items: [
          { k: 'Avantages', v: 'Transparence de localisation ; modularité et réutilisation d\u2019objets ; orientation objet.' },
          { k: 'Inconvénients', v: 'Forte dépendance technologique, problème de compatibilité de versions.' },
          { k: 'Exemple concret', v: 'Dans un système de gestion d\u2019hôtel réparti, l\u2019objet Réservation appelle la méthode confirmer() sur l\u2019objet Chambre, qui réside sur un autre nœud du système.' },
        ] },
      ],
    },
    {
      id: 'd3s5',
      title: 'Communication orientée flux',
      blocks: [
        { type: 'definition', term: 'Principe', def: 'La transmission orientée flux est un modèle de communication en temps réel basé sur le transfert continu de données entre producteurs et consommateurs.' },
        { type: 'list', items: [
          'Les données sont envoyées sous forme de flux (audio, vidéo).',
          'Peut être unidirectionnel (ex. : diffusion vidéo) ou bidirectionnel (ex. : visioconférence).',
        ] },
        { type: 'kv', items: [
          { k: 'Avantages', v: 'Transmission continue et temps réel, ce qui le rend idéal pour les flux multimédias.' },
          { k: 'Inconvénients', v: 'Nécessite la gestion de la latence, la synchronisation et parfois la qualité de service (QoS).' },
          { k: 'Exemples concrets', v: 'Netflix ou YouTube utilisent un flux pour diffuser une vidéo à un utilisateur — Zoom / Teams utilisent des flux audio/vidéo bidirectionnels pour une réunion.' },
        ] },
      ],
    },
    {
      id: 'd3s6',
      title: 'Communication orientée événements',
      blocks: [
        { type: 'definition', term: 'Principe', def: 'Elle repose sur un modèle pub/sub (publication/abonnement) où les émetteurs (publishers) publient des événements sans connaître les récepteurs, tandis que les récepteurs (subscribers) s\u2019abonnent à des types d\u2019événements qui les intéressent.' },
        { type: 'list', items: [
          'Permet la diffusion à plusieurs récepteurs (multicast, broadcast).',
          'Asynchrone par nature, adapté aux systèmes réactifs et distribués.',
        ] },
        { type: 'kv', items: [
          { k: 'Avantages', v: 'Favorise un couplage faible, une grande scalabilité, et une distribution flexible des notifications.' },
          { k: 'Inconvénients', v: 'Difficulté à suivre les flux de données — Complexité de gestion : un même événement peut être reçu par plusieurs services, chacun pouvant réagir de manière différente.' },
        ] },
        { type: 'note', title: 'Exemple concret : commande en ligne', text: 'Un client passe une commande sur un site de vente en ligne. L\u2019action « commande confirmée » déclenche la publication d\u2019un événement commande/nouvelle. Plusieurs services abonnés réagissent :\n✓ Service de paiement : lance la procédure de transaction.\n✓ Service logistique : prépare l\u2019emballage et l\u2019expédition.\n✓ Service client : envoie un email de confirmation au client.\n✓ Module de fidélité : ajoute des points au compte du client.' },
      ],
    },
  ],
}

export const dmod4: Module = {
  id: 'd4',
  num: 4,
  title: 'Le réseau : OSI et TCP/IP',
  subtitle: 'Les 7 couches OSI, les 4 couches TCP/IP, encapsulation et désencapsulation',
  icon: '🗂️',
  color: 'sky',
  source: 'Chapitre 2 Partie 1 — slides 33-44',
  sections: [
    {
      id: 'd4s1',
      title: 'Le rôle du réseau dans la communication',
      blocks: [
        { type: 'paragraph', text: 'Une application répartie est souvent déployée sur plusieurs machines situées dans des zones géographiques différentes. Ces composants doivent échanger des données à travers un réseau pour fonctionner comme un tout cohérent. Pour que les données puissent circuler correctement entre machines, il faut une organisation logique du réseau. Cette organisation est décrite à l\u2019aide de modèles en couches, qui indiquent comment les données passent d\u2019un nœud à un autre. Le réseau devient alors le canal de transport des informations entre les différents nœuds.' },
        { type: 'kv', items: [
          { k: 'Modèle OSI (Open Systems Interconnection)', v: 'Modèle théorique défini à la fin des années 1970 par l\u2019ISO (Organisation Internationale de Normalisation). Son but était de standardiser la communication entre ordinateurs, en définissant 7 couches bien distinctes, chacune ayant un rôle précis.' },
          { k: 'Modèle Internet (TCP/IP)', v: 'Transmission Control Protocol / Internet Protocol : modèle pratique décrivant l\u2019architecture réellement utilisée dans les réseaux actuels (Internet, intranets, etc.). Il simplifie les 7 couches de l\u2019OSI en 4 grandes couches fonctionnelles, plus faciles à gérer et à coder.' },
        ] },
        { type: 'diagram', diagram: 'OsiTcpip' },
      ],
    },
    {
      id: 'd4s2',
      title: 'OSI — Couche 7 Application & Couche 6 Présentation',
      blocks: [
        { type: 'definition', term: 'La couche « Application » (7)', def: 'C\u2019est l\u2019interface entre l\u2019utilisateur et le réseau. Elle permet à l\u2019utilisateur d\u2019accéder à des ressources à distance (page web, fichiers, mails...).' },
        { type: 'paragraph', text: 'Les protocoles de communication de la couche application comprennent : le SMTP (Simple Mail Transfer Protocol) pour l\u2019envoi des mails d\u2019un serveur à un autre ; le HTTP (HyperText Transfer Protocol), protocole de communication entre les navigateurs et les serveurs Web, basé sur une requête-réponse ; et le FTP (File Transfer Protocol), spécifiquement conçu pour le transfert de fichiers entre ordinateurs.' },
        { type: 'definition', term: 'La couche « Présentation » (6)', def: 'Cette couche s\u2019occupe du format des données échangées. Elle garantit que les données envoyées par une machine sont comprises correctement par une autre.' },
        { type: 'list', items: [
          'Conversion : elle convertit les données d\u2019un format interne à un format standard pour le réseau, puis inversement à la réception (conversion du texte d\u2019un encodage UTF-8 vers ASCII, ou de JPEG vers BMP).',
          'Compression : réduit la taille des données avant l\u2019envoi (gain de bande passante) et les restaure à la réception (compression d\u2019un fichier image ou d\u2019un flux vidéo avant transfert).',
          'Chiffrement : protège la confidentialité des données échangées en les cryptant avant envoi, puis en les décryptant à la réception (HTTPS chiffre les données avant de les envoyer sur le réseau).',
        ] },
      ],
    },
    {
      id: 'd4s3',
      title: 'OSI — Couche 5 Session & Couche 4 Transport',
      blocks: [
        { type: 'definition', term: 'La couche « Session » (5)', def: 'La couche session s\u2019occupe d\u2019ouvrir la session au début de la communication, de la maintenir active pendant le transfert des données, puis de la fermer proprement une fois l\u2019échange terminé.' },
        { type: 'paragraph', text: 'Avant que deux applications puissent échanger des données, elles doivent établir une session de communication. Cette session agit comme un canal logique entre les deux appareils. Lorsqu\u2019un grand volume de données est transmis, cette couche veille à la continuité de la session et à la reprise en cas d\u2019interruption.' },
        { type: 'definition', term: 'La couche « Transport » (4)', def: 'La couche transport a pour rôle d\u2019assurer le transfert fiable et ordonné des données entre deux machines. Elle découpe les données en petits morceaux appelés segments, afin de faciliter leur envoi sur le réseau. Chaque segment contient un en-tête (numéro du segment, numéro du port, …) permettant de réassembler correctement le message à la réception.' },
        { type: 'paragraph', text: 'La couche transport choisit la manière d\u2019envoyer les informations selon le type de communication souhaitée. Elle intègre aussi des mécanismes de contrôle d\u2019erreur : si certains segments sont perdus ou endommagés, la couche transport demande à la couche « session » leur réémission, garantissant ainsi une communication complète et fiable.' },
      ],
    },
    {
      id: 'd4s4',
      title: 'OSI — Couche 3 Réseau',
      blocks: [
        { type: 'definition', term: 'La couche « Réseau » (3)', def: 'La couche réseau reçoit les segments de la couche transport et les encapsule dans des paquets IP, contenant l\u2019adresse IP source et destination. Elle a pour rôle d\u2019acheminer les paquets d\u2019une machine à une autre, même si elles se trouvent sur des réseaux différents.' },
        { type: 'list', items: [
          'Elle s\u2019occupe aussi du routage, c\u2019est-à-dire de trouver le meilleur chemin pour faire circuler les paquets entre plusieurs réseaux.',
          'Si un paquet est trop volumineux pour le réseau (au-delà de la MTU — Maximum Transmission Unit), il est fragmenté en plusieurs parties plus petites, puis réassemblé à la réception.',
        ] },
      ],
    },
    {
      id: 'd4s5',
      title: 'OSI — Couche 2 Liaison de données & Couche 1 Physique',
      blocks: [
        { type: 'definition', term: 'La couche « Liaison de données » (2)', def: 'Elle reçoit les paquets de la couche réseau et les transforme en trames, prêtes à être envoyées physiquement. Elle assure le transfert fiable des données entre deux machines situées sur le même réseau local. Elle utilise les adresses MAC pour identifier l\u2019émetteur et le destinataire sur le réseau local, et veille à ce que les données soient bien reçues sans erreur.' },
        { type: 'definition', term: 'Trame', def: 'C\u2019est le conteneur (suite de bits 0 et 1) qui circule directement sur le support physique (le câble, le Wi-Fi, etc.) entre deux machines reliées au même réseau local (LAN).' },
        { type: 'definition', term: 'La couche « Physique » (1)', def: 'Cette couche s\u2019occupe de transmettre réellement les bits sur le support de communication. Elle convertit ces bits en signaux : signaux électriques si on utilise un câble en cuivre (Ethernet), signaux lumineux si on utilise une fibre optique, ondes radio si on utilise le Wi-Fi ou le Bluetooth. Elle envoie ces signaux sur le support de transmission (câble, fibre, ondes…).' },
        { type: 'note', title: 'Sens de traversal', text: 'À l\u2019envoi, les données descendent les 7 couches (7 → 1) ; à la réception, elles remontent (1 → 7).' },
      ],
    },
    {
      id: 'd4s6',
      title: 'Le modèle TCP/IP (Internet) : 4 couches',
      blocks: [
        { type: 'kv', items: [
          { k: '4. Application', v: 'Fournit les services réseau aux applications (messagerie, web, transfert de fichiers…). Protocoles : HTTP, HTTPS, DNS, SMTP… (regroupe Application + Présentation + Session de l\u2019OSI).' },
          { k: '3. Transport', v: 'Assure la communication de bout en bout entre les applications, contrôle d\u2019erreur et fiabilité. Protocoles : TCP ou UDP.' },
          { k: '2. Internet', v: 'Identifie les machines et achemine les paquets entre réseaux. Protocole : IP.' },
          { k: '1. Accès au réseau', v: 'Transmet les données sur le support physique (câble, Wi-Fi…) au sein du réseau local. Protocoles : MAC, Ethernet, Wi-Fi, …' },
        ] },
        { type: 'diagram', diagram: 'OsiTcpip' },
      ],
    },
    {
      id: 'd4s7',
      title: 'Encapsulation et désencapsulation',
      blocks: [
        { type: 'paragraph', text: 'À l\u2019envoi, chaque couche ajoute ses propres informations (en-tête) aux données reçues de la couche supérieure : c\u2019est l\u2019encapsulation. À la réception, chaque couche lit et retire ses en-têtes pour ne garder que les données destinées à la couche supérieure : c\u2019est la désencapsulation.' },
        { type: 'steps', items: [
          { title: 'Message', text: 'La couche Application produit le message (données + en-tête applicatif).' },
          { title: 'Message + en-tête → Segment', text: 'La couche Transport ajoute son en-tête (ports, numérotation) : on obtient un segment TCP.' },
          { title: 'Segment + IP → Paquet', text: 'La couche Internet ajoute les adresses IP source/destination : on obtient un paquet IP.' },
          { title: 'Paquet + MAC → Trame → Bits', text: 'La couche Accès au réseau ajoute les adresses MAC : on obtient une trame, convertie en bits sur le support physique.' },
        ] },
        { type: 'diagram', diagram: 'EncapsulationFlow' },
      ],
    },
  ],
}
