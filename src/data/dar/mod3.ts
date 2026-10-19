import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Modules 5 & 6 — Protocoles de transport (TCP/UDP) + Couche application, ports
// ═══════════════════════════════════════════════════════════════

export const dmod5: Module = {
  id: 'd5',
  num: 5,
  title: 'Les protocoles de transport : TCP & UDP',
  subtitle: 'Handshake en 3 étapes, segments, accusés de réception, datagrammes et checksum',
  icon: '🚚',
  color: 'sky',
  source: 'Chapitre 2 Partie 1 — slides 45-50',
  sections: [
    {
      id: 'd5s1',
      title: 'Qu\u2019est-ce qu\u2019un protocole ? Le rôle de la couche transport',
      blocks: [
        { type: 'definition', term: 'Protocole', def: 'Un protocole en réseau informatique est un ensemble de règles et de normes qui définissent comment les nœuds communiquent entre eux.' },
        { type: 'paragraph', text: 'La couche Transport occupe une place centrale dans la communication réseau. Elle garantit un transfert de données fiable et ordonné entre les applications situées sur des machines distantes. Elle découpe les données provenant de la couche Application en segments, leur ajoute des en-têtes puis supervise l\u2019envoi de ces segments à travers le réseau. Les deux principaux protocoles utilisés à ce niveau sont : TCP (Transmission Control Protocol) et UDP (User Datagram Protocol).' },
      ],
    },
    {
      id: 'd5s2',
      title: 'TCP — définition et établissement de la connexion',
      blocks: [
        { type: 'definition', term: 'TCP (Transmission Control Protocol)', def: 'TCP est un protocole de transport orienté connexion, c\u2019est-à-dire qu\u2019avant tout échange de données, une connexion fiable est établie entre l\u2019émetteur et le récepteur. Il garantit que les données arrivent dans le bon ordre, sans perte, et sans duplication.' },
        { type: 'paragraph', text: 'TCP utilise le mécanisme de handshake en trois étapes (3-way handshake) : 1. Le client envoie une demande de connexion (SYN). 2. Le serveur répond (SYN-ACK). 3. Le client confirme (ACK). Une fois cette connexion établie, les deux parties peuvent échanger des données.' },
        { type: 'kv', items: [
          { k: 'SYN', v: 'Synchronize (commencer la synchronisation).' },
          { k: 'ACK', v: 'Acknowledgement (accusé de réception).' },
        ] },
        { type: 'diagram', diagram: 'TcpHandshake' },
      ],
    },
    {
      id: 'd5s3',
      title: 'TCP — transfert des données et fermeture',
      blocks: [
        { type: 'steps', items: [
          { title: 'Transfert des données', text: 'Les données sont découpées en segments. Chaque segment reçoit un numéro de séquence pour garantir l\u2019ordre d\u2019arrivée. Si un segment est perdu, il est retransmis. Les accusés de réception (ACK) permettent de confirmer la bonne réception des données.' },
          { title: 'Fermeture de la connexion', text: 'Après la transmission, la connexion est fermée proprement pour libérer les ressources.' },
        ] },
        { type: 'kv', items: [
          { k: 'Avantages de TCP', v: '✓ Transmission fiable — ✓ Contrôle de flux et de congestion — ✓ Réassemblage automatique des segments.' },
          { k: 'Inconvénients de TCP', v: '× Lent à cause des mécanismes de contrôle et de vérification — × Consomme plus de ressources réseau.' },
        ] },
        { type: 'table', headers: ['Application TCP', 'Rôle de TCP'], rows: [
          ['Messagerie (WhatsApp, iMessage, Google Chat)', 'Assure la livraison complète et ordonnée des messages textuels.'],
          ['Navigation Web (HTTP/HTTPS)', 'Garantit la transmission complète et sans erreur des pages, images et ressources web, assurant une navigation fluide et fiable.'],
          ['Courrier électronique (SMTP, IMAP, POP3)', 'Veille à ce que les e-mails soient envoyés et reçus exactement comme ils ont été produits, sans perte ni altération.'],
          ['Transfert de fichiers (FTP, SFTP)', 'Assure une transmission fiable et intègre des fichiers lors des téléchargements ou des envois.'],
          ['Accès sécurisé à distance (SSH)', 'Les connexions SSH utilisent TCP pour garantir la fiabilité et l\u2019intégrité des données échangées de manière chiffrée.'],
          ['Bases de données distantes (MySQL, PostgreSQL)', 'Reposent sur TCP pour des transactions cohérentes et sûres entre client et serveur.'],
        ] },
      ],
    },
    {
      id: 'd5s4',
      title: 'UDP — fonctionnement et checksum',
      blocks: [
        { type: 'definition', term: 'UDP (User Datagram Protocol)', def: 'UDP est un protocole de transport non orienté connexion. Il envoie les données sous forme de datagrammes sans établir de connexion préalable et sans garantir leur livraison.' },
        { type: 'list', items: [
          'Aucune phase de connexion : les datagrammes sont envoyés directement.',
          'Pas de numérotation ni d\u2019accusé de réception.',
          'Si un datagramme est perdu ou arrive en désordre, UDP ne tente pas de le corriger.',
          'La vérification d\u2019erreurs est minimale (calcul facultatif de la valeur checksum).',
        ] },
        { type: 'definition', term: 'Checksum (somme de contrôle)', def: 'Une valeur calculée à partir du contenu d\u2019un message.\n➢ L\u2019émetteur calcule une valeur de contrôle à partir des données du message.\n➢ Il place cette valeur dans le champ checksum de l\u2019en-tête UDP.\n➢ Le récepteur recalcule le checksum à partir des données reçues.\n➢ Si les deux valeurs ne correspondent pas → Détection d\u2019une erreur.' },
        { type: 'note', title: 'Pas de retransmission', text: 'Si une erreur est détectée, le datagramme est simplement ignoré par le récepteur.' },
        { type: 'kv', items: [
          { k: 'Avantages de UDP', v: '✓ Très rapide (pas de connexion, pas d\u2019attente d\u2019ACK) — ✓ Moins de surcharge réseau — ✓ Idéal pour les applications temps réel.' },
          { k: 'Inconvénients de UDP', v: '× Aucune garantie de livraison — × Pas de réordonnancement ni de retransmission automatique — × Risque de perte de paquets.' },
        ] },
        { type: 'table', headers: ['Application UDP', 'Pourquoi UDP ?'], rows: [
          ['Streaming audio/vidéo (YouTube, Netflix en temps réel)', 'La vitesse prime sur la fiabilité absolue.'],
          ['Jeux en ligne', 'Réactivité maximale, pertes tolérables.'],
          ['Appels VoIP (Skype, Zoom)', 'Temps réel, pas de temps pour retransmettre.'],
          ['DNS (Domain Name System)', 'Requêtes simples et rapides.'],
          ['Diffusion broadcast ou multicast (visioconférence, …)', 'Distribution à plusieurs destinataires.'],
        ] },
      ],
    },
  ],
}

export const dmod6: Module = {
  id: 'd6',
  num: 6,
  title: 'Couche application, ports et voyage d\u2019une requête',
  subtitle: 'Protocoles applicatifs, numéros de ports, NAT, MAC : le schéma illustratif complet',
  icon: '🚪',
  color: 'sky',
  source: 'Chapitre 2 Partie 2 — slides 51-63',
  sections: [
    {
      id: 'd6s1',
      title: 'Les protocoles de la couche « application »',
      blocks: [
        { type: 'paragraph', text: 'La couche « application » est la plus haute du modèle TCP/IP. Elle permet la communication directe entre les programmes utilisateurs (navigateur, client mail, messagerie instantanée, etc.). Elle définit les protocoles applicatifs, c\u2019est-à-dire les règles de dialogue entre applications sur deux machines. Chaque protocole utilise un numéro de port pour être identifié par la couche transport (TCP/UDP).' },
        { type: 'definition', term: 'Numéro de port', def: 'Un numéro de port est un identifiant logique (un nombre) utilisé par le système d\u2019exploitation pour distinguer les applications qui communiquent sur le réseau.\n→ Il sert à diriger les messages vers le bon programme à l\u2019intérieur de ton ordinateur.' },
        { type: 'table', headers: ['Protocole', 'Service assuré', 'Port par défaut', 'Fonction principale'], rows: [
          ['HTTP / HTTPS', 'Web', '80 / 443', 'Transfert de pages web'],
          ['FTP', 'Transfert de fichiers', '21', 'Envoyer / recevoir des fichiers'],
          ['SMTP', 'Courrier électronique (envoi)', '25', 'Envoi de mails'],
          ['POP3 / IMAP', 'Courrier électronique (réception)', '110 / 143', 'Récupérer les mails'],
          ['DNS', 'Résolution de noms', '53', 'Convertir un nom de domaine en adresse IP'],
          ['DHCP', 'Attribution d\u2019adresses IP', '67-68', 'Donner dynamiquement une IP à un poste'],
          ['SSH / Telnet', 'Accès distant', '22 / 23', 'Contrôler un ordinateur à distance par un administrateur (avec/sans chiffrement)'],
          ['SNMP', 'Supervision de réseau', '161', 'Gérer et surveiller les équipements réseau (routeurs, commutateurs, …)'],
        ], caption: 'Tableau complet des protocoles applicatifs — à connaître par cœur' },
      ],
    },
    {
      id: 'd6s2',
      title: 'Le schéma illustratif : le décor',
      blocks: [
        { type: 'paragraph', text: 'Le cours suit le voyage complet d\u2019une requête HTTP à travers le réseau. Voici les acteurs et leurs identifiants — application utilisée : HTTP (port 80), donc TCP est le protocole de transport.' },
        { type: 'kv', items: [
          { k: 'Client', v: 'IP locale : 192.168.1.10 — Adresse MAC : AA:AA:AA:AA:AA:AA' },
          { k: 'Routeur Émetteur', v: 'Interface LAN : 192.168.1.1, MAC : BB:BB:BB:BB:BB:BB — Interface WAN (vers Internet) : 102.45.60.10' },
          { k: 'Routeur Récepteur', v: 'Interface WAN : 165.30.22.5 — Interface LAN : 10.0.0.1, MAC : DD:DD:DD:DD:DD:DD' },
          { k: 'Serveur', v: 'IP locale : 10.0.0.5 — Adresse MAC : EE:EE:EE:EE:EE:EE' },
        ] },
        { type: 'diagram', diagram: 'PacketJourney' },
      ],
    },
    {
      id: 'd6s3',
      title: 'Le voyage : côté client (encapsulation)',
      blocks: [
        { type: 'steps', items: [
          { title: '4. Application', text: 'Le client écrit une URL dans la barre d\u2019adresse, comme http://www.exemple.com/index.html. Le navigateur traduit cette URL en une requête HTTP de ce type : « GET /index.html HTTP/1.1 » + « Host: www.exemple.com ».' },
          { title: '3. Transport — Segmentation', text: 'Création d\u2019un segment TCP : ajout du port source (ex. : 50500) et du port destination (80), ajout du numéro du segment. → Résultat : Segment TCP.' },
          { title: '2. Internet', text: 'Ajout de l\u2019adresse IP source locale : 192.168.1.10, et de l\u2019adresse IP destination : 10.0.0.5 (IP du serveur final). → Résultat : Paquet IP.' },
          { title: '1. Accès au réseau', text: 'Ajout de l\u2019adresse MAC source : AA:AA:AA:AA:AA:AA, et de l\u2019adresse MAC destination : BB:BB:BB:BB:BB:BB (MAC du routeur). → Résultat : Trame.' },
        ] },
      ],
    },
    {
      id: 'd6s4',
      title: 'Le voyage : chez le routeur émetteur',
      blocks: [
        { type: 'steps', items: [
          { title: '1. Accès au réseau — réception', text: 'Le routeur reçoit la trame. Il désencapsule (retire la trame) pour lire les adresses IP.' },
          { title: '2. Internet — NAT', text: 'Le routeur remplace : adresse IP source → 102.45.60.10 (adresse publique du routeur), adresse IP destinataire → 165.30.22.5. → Grâce au mécanisme NAT (Network Address Translation).' },
          { title: '1. Accès au réseau — changement des MAC', text: 'Le routeur remplace : adresse MAC source → MAC du routeur (BB:BB:BB:BB:BB:BB), adresse MAC destination → MAC du routeur suivant (DD:DD:DD:DD:DD:DD).' },
        ] },
        { type: 'note', title: '💡 NAT — Network Address Translation', text: 'C\u2019est le mécanisme qui permet au routeur de substituer les adresses IP privées (locales) par son adresse IP publique (et inversement au retour).' },
      ],
    },
    {
      id: 'd6s5',
      title: 'Le voyage : chez le routeur récepteur et le serveur',
      blocks: [
        { type: 'steps', items: [
          { title: '1. Accès au réseau — réception', text: 'Le routeur récepteur reçoit la trame. Il désencapsule pour lire les adresses IP.' },
          { title: '2. Internet — NAT inverse', text: 'La couche internet fait la traduction NAT inverse : l\u2019IP destination devient 10.0.0.5 (machine du réseau local).' },
          { title: '1. Accès au réseau — changement des MAC', text: 'La couche accès au réseau change les adresses MAC : MAC source : DD:DD:DD:DD:DD:DD (MAC du routeur), MAC destination : EE:EE:EE:EE:EE:EE (MAC du serveur).' },
          { title: 'Désencapsulation chez le serveur', text: 'Le serveur remonte les couches : trame → paquet → segment → message, et l\u2019application (serveur HTTP) lit la requête GET.' },
        ] },
      ],
    },
  ],
}
