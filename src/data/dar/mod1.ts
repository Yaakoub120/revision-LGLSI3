import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// DÉVELOPPEMENT D'APPLICATIONS RÉPARTIES — Dr. Mouna KARAJA, GLSI3, 2025-2026
// Modules 1 & 2 — Chapitre 1 (Contexte et enjeux) + début Chapitre 2
// ═══════════════════════════════════════════════════════════════

export const dmod1: Module = {
  id: 'd1',
  num: 1,
  title: 'Contexte et enjeux',
  subtitle: 'Du serveur unique aux applications mondiales : définitions fondamentales et histoire',
  icon: '🌍',
  color: 'sky',
  source: 'Chapitre 1 — Contexte et enjeux (17 diapos)',
  sections: [
    {
      id: 'd1s1',
      title: 'Le cas naïf vs le cas réel',
      blocks: [
        { type: 'paragraph', text: 'Le monde d\u2019aujourd\u2019hui est connecté : les applications que nous utilisons tous les jours reposent toutes sur un principe fondamental — elles sont réparties. Pour comprendre l\u2019intérêt de la répartition, comparons deux scénarios d\u2019architecture.' },
        { type: 'definition', term: 'Le cas naïf (un seul serveur dans le monde)', def: 'Tous les utilisateurs, qu\u2019ils soient en Tunisie, en Europe ou en Asie, doivent se connecter à un seul serveur situé en Amérique.\n\nRésultat :\n✓ lenteur,\n✓ surcharge,\n✓ risque de panne totale si ce serveur tombe.' },
        { type: 'definition', term: 'Le cas réel (serveurs répartis dans le monde)', def: 'Plusieurs serveurs répartis géographiquement (Amérique, Europe, Asie, Afrique…). Chaque utilisateur se connecte au serveur le plus proche.\n\nAvantages :\n✓ rapidité,\n✓ meilleure disponibilité,\n✓ tolérance aux pannes,\n✓ qualité de service.' },
        { type: 'diagram', diagram: 'NaiveVsDistributed' },
      ],
    },
    {
      id: 'd1s2',
      title: 'Qu\u2019est-ce qu\u2019une application répartie ?',
      blocks: [
        { type: 'paragraph', text: 'Exemple fil rouge — Facebook : quand un utilisateur ouvre Facebook, il accède à une interface sur son smartphone ou son navigateur. Les données de son profil (amis, publications, photos) sont stockées dans différents serveurs répartis dans le monde. Quand il publie une photo, celle-ci est envoyée à un serveur de stockage, répliquée dans plusieurs centres de données (pour la sauvegarde et la rapidité d\u2019accès), et rendue disponible à ses amis à travers d\u2019autres serveurs. Quand il like ou commente, l\u2019information passe par d\u2019autres serveurs qui mettent à jour la base de données et notifient instantanément ses amis.' },
        { type: 'note', title: 'L\u2019illusion clé', text: 'Pourtant, pour l\u2019utilisateur, Facebook semble être une seule application fluide.' },
        { type: 'definition', term: 'Application répartie (synonyme : application distribuée)', def: 'Une application répartie est une application dont les composants logiciels s\u2019exécutent sur plusieurs ordinateurs (ou nœuds) reliés par un réseau, et qui coopèrent pour fournir un service unique et cohérent à l\u2019utilisateur final.\n\n✓ Les composants peuvent être des programmes, des bases de données, des services web, etc.\n✓ Ces composants sont géographiquement dispersés, mais ils travaillent comme un tout.\n✓ L\u2019utilisateur ne perçoit pas cette répartition : il a l\u2019impression d\u2019interagir avec une seule application.' },
      ],
    },
    {
      id: 'd1s3',
      title: 'Pourquoi étudier les applications réparties ?',
      blocks: [
        { type: 'paragraph', text: 'Comprendre les applications réparties est essentiel, tant du point de vue académique (GLSI) que professionnel. Les entreprises recherchent des diplômés en informatique capables de concevoir, gérer et sécuriser des systèmes distribués à grande échelle.' },
        { type: 'table', headers: ['D\u2019un point de vue académique (GLSI)', 'D\u2019un point de vue professionnel'], rows: [
          ['Développement d\u2019applications web et mobiles évolutives.', 'Gérer la communication entre machines et services à grande échelle.'],
          ['Conception d\u2019architectures logicielles adaptées aux systèmes distribués.', 'Concevoir des systèmes distribués fiables, performants et maintenables.'],
          ['Proposer et réaliser un sujet de PFE moderne et intéressant.', 'Garantir la sécurité et la tolérance aux pannes dans des environnements critiques (banques, télécoms, etc.).'],
        ], caption: 'Les deux visions du cours' },
      ],
    },
    {
      id: 'd1s4',
      title: 'Plan de la matière',
      blocks: [
        { type: 'steps', items: [
          { title: 'Introduction aux systèmes et applications réparties', text: 'Contexte, définitions, histoire et motivations.' },
          { title: 'Communication dans les applications réparties', text: 'Modèles, protocoles, sockets, RPC, RMI et asynchronisme.' },
          { title: 'Architectures des applications réparties', text: 'Architectures classiques (client/serveur, couches, P2P) et modernes (SOA, microservices, événementielle, serverless).' },
          { title: 'Tolérance aux pannes et sécurité', text: 'Stratégies pour garantir la disponibilité des services.' },
        ] },
      ],
    },
    {
      id: 'd1s5',
      title: 'Qu\u2019est-ce qu\u2019un système réparti ?',
      blocks: [
        { type: 'definition', term: 'Système réparti', def: 'Un ensemble de machines autonomes reliées par un réseau, qui coopèrent pour offrir l\u2019illusion d\u2019un système unique et cohérent.' },
        { type: 'list', items: [
          'Les ressources (processeurs, mémoire, données) sont distribuées.',
          'Les utilisateurs interagissent comme s\u2019ils accédaient à une seule machine centrale.',
          'Les communications passent obligatoirement par un réseau.',
        ] },
        { type: 'note', title: 'Exemple', text: 'Un cluster de serveurs qui hébergent un moteur de recherche comme Google.' },
        { type: 'kv', items: [
          { k: 'Scalabilité', v: 'Supporter un grand nombre d\u2019utilisateurs.' },
          { k: 'Performance', v: 'Répartir le traitement sur plusieurs machines (traitement massif de données).' },
          { k: 'Répartition géographique', v: 'Rapprocher les ressources des utilisateurs.' },
          { k: 'Disponibilité et tolérance aux pannes', v: 'Si un serveur tombe, d\u2019autres continuent à fournir le service.' },
        ] },
      ],
    },
    {
      id: 'd1s6',
      title: 'Programmation classique vs répartie',
      blocks: [
        { type: 'table', headers: ['Critère', 'Programmation classique', 'Programmation répartie'], rows: [
          ['Lieu d\u2019exécution', 'Sur une seule machine (serveur ou poste local)', 'Répartie sur plusieurs machines connectées en réseau'],
          ['Partage des ressources', 'Ressources limitées à la machine locale', 'Ressources partagées entre plusieurs nœuds (processeurs, mémoire, stockage)'],
          ['Communication', 'Appels locaux, simples et rapides', 'Communication via réseau (messages, protocoles, latences)'],
          ['Tolérance aux pannes', 'Une panne = arrêt du système', 'Conçue pour être tolérante aux pannes et redondante'],
          ['Évolutivité', 'Limitée par la capacité matérielle de la machine', 'Haute évolutivité (ajout de nouveaux nœuds possible)'],
          ['Complexité de développement', 'Plus simple (modèle linéaire, centralisé)', 'Plus complexe (synchronisation, concurrence, cohérence des données)'],
          ['Exemple', 'Application de bureau (MS Word, Excel)', 'Applications web distribuées (réseaux sociaux, systèmes bancaires, e-commerce)'],
        ] },
      ],
    },
    {
      id: 'd1s7',
      title: 'Système réparti vs application répartie',
      blocks: [
        { type: 'table', headers: ['Système réparti', 'Application répartie'], rows: [
          ['C\u2019est l\u2019infrastructure matérielle et logicielle (réseau, serveurs, protocoles, …).', 'C\u2019est un logiciel construit au-dessus de cette infrastructure pour offrir un service aux utilisateurs.'],
          ['Un ensemble d\u2019entités autonomes (ordinateurs, processeurs, processus) reliées par un réseau, qui coopèrent pour accomplir une tâche commune.', 'Un ensemble d\u2019entités logicielles (programmes, modules, services) exécutées sur des environnements différents et interconnectés via un réseau.'],
          ['Ces entités sont physiquement distinctes, mais apparaissent comme un tout cohérent.', 'Elle exploite les services offerts par le système réparti pour fonctionner.'],
          ['Le système réparti gère la communication, la coordination et le partage des ressources entre ses composants.', 'C\u2019est donc un logiciel distribué qui utilise l\u2019infrastructure sous-jacente.'],
          ['Exemple : Internet', 'Exemples : WhatsApp, Netflix, Google Docs.'],
        ] },
      ],
    },
    {
      id: 'd1s8',
      title: 'Services et interfaces',
      blocks: [
        { type: 'paragraph', text: 'Une application répartie n\u2019est pas un bloc monolithique : elle est composée de services (authentification, messagerie, paiement, etc.). Chaque service peut être hébergé sur une machine différente, mais l\u2019ensemble coopère pour offrir une application cohérente. Ces services doivent être accessibles via des interfaces bien définies. Ces interfaces peuvent prendre différentes formes, telles que des API ou des protocoles de communication.' },
        { type: 'definition', term: 'Interface', def: 'L\u2019interface représente le moyen par lequel les services sont accessibles. C\u2019est comme un contrat qui définit :\n– Quelles opérations on peut demander au service (ex. : s\u2019authentifier, envoyer un message, publier un contenu).\n– La manière dont ces opérations doivent être appelées (ex. : via un protocole HTTP, une API REST, un message JSON).' },
        { type: 'paragraph', text: 'Exemple : Facebook propose plusieurs services répartis — le service d\u2019authentification, le service de messagerie instantanée, le service de publication et partage de contenu, le service de recherche, etc. Dans un système réparti, un service peut être offert par plusieurs serveurs et consommé par plusieurs applications.' },
        { type: 'list', items: [
          'Le service d\u2019authentification permet à l\u2019utilisateur de se connecter.',
          'Son interface définit les règles : Quelles données envoyer ? (login, mot de passe) — Comment les envoyer ? (par un formulaire Web, ou via une API pour une application mobile) — Ce que le service renvoie ? (succès ou erreur).',
          'Ces services, bien que physiquement répartis (hébergés sur différents serveurs), apparaissent à l\u2019utilisateur comme une seule application : il y accède toujours de la même manière grâce à leurs interfaces bien définies.',
        ] },
      ],
    },
    {
      id: 'd1s9',
      title: 'Impact sur le génie logiciel + historique',
      blocks: [
        { type: 'paragraph', text: 'Les systèmes répartis modifient profondément la manière de concevoir et développer des logiciels. Le génie logiciel appliqué aux systèmes répartis exige des approches spécifiques : patrons d\u2019architecture, middlewares, protocoles de communication, etc.' },
        { type: 'kv', items: [
          { k: 'Nouvelles contraintes', v: 'Latence, panne réseau, sécurité des communications.' },
          { k: 'Architectures logicielles', v: 'Apparition des modèles client-serveur, microservices, services web.' },
          { k: 'Méthodologies', v: 'Nécessité de penser en termes de scalabilité, tolérance aux pannes, réplication de données.' },
          { k: 'Maintenance et évolutivité', v: 'Conception modulaire pour faire évoluer l\u2019application sans arrêter tout le système.' },
        ] },
        { type: 'timeline', items: [
          { time: '1960-1970', text: 'Premiers réseaux d\u2019ordinateurs, début de l\u2019idée de partage des ressources.' },
          { time: 'Années 1980', text: 'Émergence des systèmes répartis universitaires et industriels (SUN RPC, CORBA, systèmes client-serveur).' },
          { time: 'Années 1990', text: 'Démocratisation d\u2019Internet → explosion des applications web réparties (serveurs web, bases de données distribuées).' },
          { time: 'Années 2000', text: 'Apparition du cloud computing (Amazon Web Services, Google Cloud), systèmes massivement parallèles.' },
          { time: 'Années 2010', text: 'Montée du big data, de l\u2019IoT, du fog/edge computing, microservices et conteneurs (Docker, Kubernetes).' },
          { time: 'Aujourd\u2019hui', text: 'Intelligence artificielle distribuée, blockchain, edge AI et applications massivement interconnectées.' },
        ] },
      ],
    },
  ],
}

export const dmod2: Module = {
  id: 'd2',
  num: 2,
  title: 'La communication répartie',
  subtitle: 'Définition, importance, défis, intervenants, modes et mécanismes d\u2019adressage',
  icon: '📡',
  color: 'sky',
  source: 'Chapitre 2 Partie 1 — slides 18-26',
  sections: [
    {
      id: 'd2s1',
      title: 'Définition de la communication répartie',
      blocks: [
        { type: 'definition', term: 'Communication répartie', def: 'L\u2019ensemble des mécanismes, protocoles et modèles permettant à deux entités d\u2019un système distribué (processus, objets, applications) d\u2019échanger des données et de coordonner leurs actions, malgré la séparation physique des machines.' },
        { type: 'paragraph', text: 'Dans un système réparti, les composants logiciels et matériels sont situés sur des machines différentes reliées par un réseau. Pour coopérer, ces composants doivent échanger des informations : c\u2019est le rôle de la communication répartie. Elle peut se faire sous différentes formes : transmission de messages, appels de procédures distantes, invocation de méthodes sur des objets distants, ou encore échanges via des middlewares spécialisés.' },
        { type: 'note', title: 'Objectif', text: 'Donner l\u2019illusion que les interactions à distance se déroulent aussi simplement qu\u2019en local, tout en masquant la complexité du réseau.' },
      ],
    },
    {
      id: 'd2s2',
      title: 'Importance et rôle de la communication',
      blocks: [
        { type: 'paragraph', text: 'La communication constitue la colonne vertébrale des applications réparties. Elle permet quatre choses essentielles. Sans communication fiable, les applications réparties perdraient leur sens : elles ne seraient qu\u2019un ensemble de composants isolés, incapables d\u2019interagir.' },
        { type: 'kv', items: [
          { k: 'La coopération entre composants', v: 'Par exemple, un client envoie une requête à un serveur pour accéder à une base de données distante.' },
          { k: 'Le partage de ressources', v: 'Fichiers, services web, systèmes d\u2019information.' },
          { k: 'La coordination des tâches', v: 'Plusieurs processus répartis sur différentes machines peuvent travailler ensemble pour résoudre un problème complexe.' },
          { k: 'La transparence', v: 'Grâce aux mécanismes de communication, l\u2019utilisateur n\u2019a pas besoin de savoir où se trouvent réellement les ressources ou comment elles sont accessibles.' },
        ] },
      ],
    },
    {
      id: 'd2s3',
      title: 'Les 6 défis de la communication répartie',
      blocks: [
        { type: 'steps', items: [
          { title: '1. Hétérogénéité', text: 'Les nœuds d\u2019un système réparti peuvent être très différents : PC, smartphones, serveurs, objets IoT… avec des systèmes d\u2019exploitation, langages et protocoles variés. Défi : assurer une communication interopérable malgré ces différences.' },
          { title: '2. Transparence de la localisation', text: 'Un composant ne doit pas avoir à savoir où se trouve l\u2019autre composant (communication qui ressemble à un appel local alors que le serveur est à l\u2019autre bout du monde). Défi : masquer la localisation réelle (IP, port, machine) derrière une abstraction.' },
          { title: '3. Latence et performance du réseau', text: 'Les messages circulent sur des réseaux avec une certaine latence, vitesse de transmission limitée et congestion possible (Exemple : 200 ms de retard dans une visioconférence sont perceptibles). Défi : assurer une communication efficace malgré des délais.' },
          { title: '4. Fiabilité et pannes', text: 'Les réseaux sont peu fiables : messages perdus, dupliqués, corrompus, ou nœuds qui tombent en panne (Exemple : en cas de panne réseau, il faut éviter qu\u2019un virement soit débité deux fois). Défi : garantir la cohérence et la tolérance aux fautes et concevoir des mécanismes de reprise, de réplication et de redondance.' },
          { title: '5. Concurrence et synchronisation', text: 'Plusieurs nœuds peuvent accéder en même temps à la même ressource (Exemple : deux utilisateurs modifient en même temps un même document collaboratif). Défi : gérer les accès concurrents, éviter les conflits et maintenir la cohérence.' },
          { title: '6. Sécurité', text: 'La communication sur un réseau ouvert (comme Internet) peut être interceptée, modifiée ou usurpée. Défi : assurer authentification, confidentialité, intégrité et autorisation.' },
        ] },
      ],
    },
    {
      id: 'd2s4',
      title: 'Les intervenants de la communication répartie',
      blocks: [
        { type: 'kv', items: [
          { k: 'Nœuds', v: 'Les entités participant au système réparti. Ils peuvent correspondre soit à des machines physiques (ordinateurs, serveurs, smartphones, capteurs IoT, etc.), soit à des unités logiques (processus, services ou applications).' },
          { k: 'Ressources', v: 'Les éléments accessibles ou partagés dans le système (fichiers, bases de données, services, périphériques, puissance de calcul…). C\u2019est le contenu demandé/fourni lors de la communication.' },
          { k: 'Middleware', v: 'La couche logicielle intermédiaire qui facilite la communication et la transparence entre nœuds (CORBA, Java RMI, …).' },
          { k: 'Canal de communication', v: 'Le support de transmission des données (réseau filaire, Wi-Fi, Internet, protocoles de communication).' },
        ] },
        { type: 'diagram', diagram: 'NodeAnatomy' },
      ],
    },
    {
      id: 'd2s5',
      title: 'Composition logique d\u2019un nœud',
      blocks: [
        { type: 'paragraph', text: 'Dans un système réparti, un nœud, quel que soit son type, correspond à un bloc logique avec trois fonctions : recevoir, traiter, envoyer des informations.' },
        { type: 'steps', items: [
          { title: 'Interface d\u2019entrée', text: 'Pour recevoir les messages venant des autres nœuds.' },
          { title: 'Traitement', text: 'Pour décider quoi faire avec le message reçu ou quoi produire comme réponse.' },
          { title: 'Interface de sortie', text: 'Pour envoyer les messages ou réponses aux autres nœuds.' },
        ] },
      ],
    },
    {
      id: 'd2s6',
      title: 'Les modes de communication : synchrone vs asynchrone',
      blocks: [
        { type: 'paragraph', text: 'Les modes définissent le comportement temporel de l\u2019échange (temps réel ou différé). Ils peuvent s\u2019appliquer à plusieurs modèles de communication.' },
        { type: 'definition', term: 'Communication synchrone', def: 'L\u2019émetteur envoie une requête et attend la réponse avant de poursuivre son exécution. La communication se fait en temps réel entre les deux parties, avec un blocage possible en attente de la réponse.\n\nAvantage : simplicité et rapidité de l\u2019échange direct.\nLimite : dépendance temporelle forte, le client est bloqué tant que la réponse n\u2019arrive pas.' },
        { type: 'definition', term: 'Communication asynchrone', def: 'L\u2019émetteur envoie un message sans attendre immédiatement la réponse. Le receveur peut répondre plus tard. Cela permet à l\u2019émetteur de continuer son traitement sans blocage.\n\nAvantage : meilleure tolérance aux délais et aux interruptions.\nLimite : complexité plus élevée pour gérer les retours différés.' },
        { type: 'diagram', diagram: 'SyncAsync' },
      ],
    },
    {
      id: 'd2s7',
      title: 'Les mécanismes d\u2019adressage et de diffusion',
      blocks: [
        { type: 'kv', items: [
          { k: 'Communication Unicast', v: 'Communication entre un seul émetteur et un seul récepteur (un à un). Exemple : une requête d\u2019un client vers un serveur.' },
          { k: 'Communication multicast', v: 'Un émetteur envoie un message à un groupe spécifique de récepteurs. Exemple : une visioconférence est diffusée uniquement aux participants.' },
          { k: 'Communication broadcast', v: 'Un émetteur diffuse le message à tous les nœuds d\u2019un réseau. Exemple : un message envoyé simultanément à tous les abonnés du réseau mobile.' },
        ] },
        { type: 'diagram', diagram: 'AddressingModes' },
      ],
    },
  ],
}
