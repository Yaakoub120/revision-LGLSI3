import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Modules 13 & 14 — Architectures modernes + Communication asynchrone
// ═══════════════════════════════════════════════════════════════

export const dmod13: Module = {
  id: 'd13',
  num: 13,
  title: 'Les architectures modernes',
  subtitle: 'SOA, microservices, événementielle (EDA) et serverless + comparaison complète',
  icon: '🚀',
  color: 'sky',
  source: 'Chapitre 3 — slides 122-131',
  sections: [
    {
      id: 'd13s1',
      title: 'Architecture orientée services (SOA)',
      blocks: [
        { type: 'definition', term: 'SOA', def: 'Un style d\u2019architecture distribuée dans lequel les fonctionnalités d\u2019un système sont organisées sous forme de services indépendants, accessibles à distance via des interfaces standardisées (REST, SOAP, …). Un service est une unité fonctionnelle autonome, faiblement couplée, qui réalise une tâche métier bien précise et peut être utilisé par plusieurs applications.' },
        { type: 'kv', items: [
          { k: 'Motivation 1', v: 'Difficulté d\u2019intégrer des systèmes hétérogènes (Java, .NET, C++, …).' },
          { k: 'Motivation 2', v: 'Complexité des intégrations « point à point » dans les architectures classiques.' },
          { k: 'Motivation 3', v: 'Manque d\u2019agilité pour adapter rapidement les systèmes aux nouveaux besoins.' },
          { k: 'Motivation 4', v: 'Besoin de réutiliser les fonctionnalités métier au lieu de les dupliquer (authentification, …).' },
          { k: 'Motivation 5', v: 'Nécessité de standardiser la communication entre applications.' },
        ] },
        { type: 'steps', items: [
          { title: '1. Publication', text: 'Le fournisseur publie le service dans le registre.' },
          { title: '2. Découverte', text: 'Le client interroge le registre pour découvrir un service.' },
          { title: '3. Invocation', text: 'Invocation et consommation du service (via l\u2019ESB).' },
        ] },
        { type: 'kv', items: [
          { k: 'Les Consommateurs de Services', v: 'Applications ou systèmes qui invoquent les services.' },
          { k: 'Les Fournisseurs de Services', v: 'Systèmes qui implémentent et publient les services.' },
          { k: 'L\u2019Annuaire ou Registre de Services', v: 'Référencie les services disponibles et permet leur découverte par les consommateurs.' },
          { k: 'Le Mécanisme d\u2019Intégration (Enterprise Service Bus — ESB)', v: 'Assure le routage, la transformation et la médiation entre services.' },
        ] },
        { type: 'diagram', diagram: 'SoaFlow' },
      ],
    },
    {
      id: 'd13s2',
      title: 'Architecture microservices',
      blocks: [
        { type: 'definition', term: 'Architecture microservices', def: 'Un style d\u2019architecture où une application est décomposée en un ensemble de petits services indépendants et autonomes. Chaque microservice exécute son propre processus, possède son propre espace de déploiement et de données, expose sa fonctionnalité via des API légères (REST, gRPC, …), se concentre sur une capacité métier unique et peut être développé, testé, déployé et scalé indépendamment des autres.\n\n→ L\u2019architecture microservices peut être considérée comme une évolution moderne et plus fine de la SOA.' },
        { type: 'kv', items: [
          { k: 'Motivation 1', v: 'Alléger la complexité des applications SOA (souvent trop centralisées autour de l\u2019ESB).' },
          { k: 'Motivation 2', v: 'Accélérer le développement et les mises à jour grâce à des services plus petits et indépendants.' },
          { k: 'Motivation 3', v: 'Permettre une évolutivité fine : ne scaler qu\u2019un microservice au lieu de l\u2019application entière.' },
          { k: 'Motivation 4', v: 'Adopter l\u2019indépendance technologique (chaque microservice peut utiliser son langage, sa base, son framework).' },
          { k: 'Motivation 5', v: 'Améliorer la résilience : une panne d\u2019un microservice ne fait pas tomber toute l\u2019application.' },
        ] },
        { type: 'kv', items: [
          { k: 'API Gateway', v: 'Point d\u2019entrée unique pour les clients ; elle reçoit les requêtes et les redirige vers les microservices appropriés.' },
          { k: 'Conteneurs (ex : Docker)', v: 'Environnement léger dans lequel chaque microservice est emballé (le service + son environnement d\u2019exécution) pour être facilement déployé sur n\u2019importe quelle machine.' },
          { k: 'Orchestrateur (ex : Kubernetes)', v: 'Plateforme qui gère automatiquement les conteneurs : déploiement, redémarrage, scaling, réseau interne, etc.' },
          { k: 'Système de communication', v: 'Mécanisme utilisé par les microservices pour échanger (API REST ou gRPC en mode synchrone, ou messages/événements en mode asynchrone).' },
        ] },
        { type: 'diagram', diagram: 'MicroservicesArch' },
      ],
    },
    {
      id: 'd13s3',
      title: 'Architecture événementielle (EDA)',
      blocks: [
        { type: 'definition', term: 'Event-Driven Architecture (EDA)', def: 'Un modèle de conception logicielle où les composants réagissent à des événements, ou à des changements d\u2019état, au lieu de dépendre de requêtes directes. Les événements sont publiés par des « producteurs d\u2019événements » et consommés par des « consommateurs d\u2019événements » via un canal d\u2019événements ou un broker, ce qui permet une communication découplée et asynchrone.' },
        { type: 'kv', items: [
          { k: 'Réactivité', v: 'Permettre aux systèmes de réagir immédiatement à des événements.' },
          { k: 'Découplage', v: 'Séparer fortement les composants.' },
          { k: 'Scalabilité', v: 'Gérer facilement de grands volumes d\u2019événements grâce à un traitement asynchrone.' },
        ] },
        { type: 'kv', items: [
          { k: 'Producteurs d\u2019événements', v: 'Les composants qui génèrent des événements.' },
          { k: 'Consommateurs d\u2019événements', v: 'Les composants qui écoutent des événements spécifiques et effectuent une action lorsqu\u2019un événement survient.' },
          { k: 'Canaux d\u2019événements', v: 'Les intermédiaires (comme un broker d\u2019événements) qui reçoivent les événements des producteurs et les acheminent vers les consommateurs appropriés.' },
        ] },
        { type: 'note', title: 'Exemple du cours : e-commerce', text: 'Event Producers : Retail website (New Order), Mobile app (Question about stock), Point-of-sale (Return) → Event Router (ingests, filters, and pushes the events to the appropriate consumers) → Event Consumers : Warehouse Mgmt DB (met à jour l\u2019inventaire), Finance System (met à jour les finances selon les ventes/retours), Customer Relations (répond aux commandes et demandes clients).' },
        { type: 'diagram', diagram: 'EdaFlow' },
      ],
    },
    {
      id: 'd13s4',
      title: 'Architecture serverless',
      blocks: [
        { type: 'definition', term: 'Architecture serverless', def: 'Un modèle de développement où l\u2019application repose sur des services cloud entièrement gérés par les fournisseurs cloud, dans lesquels le développeur ne s\u2019occupe plus de la gestion des serveurs, ni de leur configuration, ni de leur mise à l\u2019échelle. L\u2019exécution du code se fait à la demande, sous forme de petites fonctions (Functions-as-a-Service), déclenchées par des événements (requête HTTP, message, événement d\u2019un autre service, etc.).' },
        { type: 'list', items: [
          'Les fonctions sont déployées et exécutées sur une infrastructure cloud distribuée.',
          'L\u2019application est composée de services découplés, chacun pouvant être déployé et exécuté indépendamment.',
        ] },
        { type: 'kv', items: [
          { k: 'Motivation 1', v: 'Réduire la complexité opérationnelle et accélérer le développement.' },
          { k: 'Motivation 2', v: 'S\u2019adapter automatiquement à la charge.' },
          { k: 'Motivation 3', v: 'Payer uniquement à l\u2019usage.' },
        ] },
      ],
    },
    {
      id: 'd13s5',
      title: 'Comparaison des architectures modernes',
      blocks: [
        { type: 'table', headers: ['Critère', 'SOA', 'Microservices', 'Événementielle', 'Serverless'], rows: [
          ['Principe', 'Services réutilisables communiquant via un bus (ESB).', 'Petits services autonomes, faiblement couplés.', 'Système basé sur l\u2019échange d\u2019événements pour déclencher des actions.', 'Exécution de fonctions à la demande, sans gérer de serveurs.'],
          ['Granularité', 'Services grands et souvent complexes.', 'Services petits et spécialisés.', 'Événements + traitements découpés en réactions.', 'Fonctions très petites et unitaires.'],
          ['Couplage', 'Couplage modéré (souvent via un ESB central).', 'Très faible couplage.', 'Très faible couplage (communication asynchrone).', 'Très faible couplage (à l\u2019événement).'],
          ['Communication', 'Souvent synchrones (SOAP).', 'API légères (REST/JSON).', 'Majoritairement asynchrone (files, messages).', 'Déclenchement par événements (HTTP, stockage, file…).'],
          ['Scalabilité', 'Limitée par l\u2019ESB.', 'Très élevée, indépendante (par service).', 'Très élevée selon le flux d\u2019événements.', 'Scalabilité automatique gérée par le cloud.'],
          ['Gestion d\u2019infrastructure', 'L\u2019entreprise gère les serveurs et l\u2019ESB.', 'L\u2019entreprise gère les conteneurs/machines.', 'L\u2019entreprise gère les composants événementiels.', 'Infrastructure 100 % gérée par le cloud.'],
          ['Cas d\u2019usage typiques', 'Intégration de grands systèmes d\u2019entreprise.', 'Applications web/Cloud complexes et modulaires.', 'IoT, systèmes réactifs, streaming.', 'Traitements ponctuels, automatisations.'],
          ['Avantages', 'Réutilisation, standardisation.', 'Rapidité de déploiement, flexibilité.', 'Réactivité, découplage fort, performance.', 'Coût réduit, aucune gestion serveur, auto-scaling.'],
          ['Inconvénients', 'ESB peut devenir un goulot.', 'Gestion complexe du déploiement (DevOps).', 'Difficulté à gérer l\u2019ordre, la cohérence.', 'Limitations de durée, dépendance au cloud.'],
        ] },
      ],
    },
  ],
}

export const dmod14: Module = {
  id: 'd14',
  num: 14,
  title: 'La communication asynchrone',
  subtitle: 'Producteurs, consommateurs, brokers, 4 modèles, mécanismes, garanties et défis',
  icon: '⏳',
  color: 'sky',
  source: 'Chapitre 4 — slides 130-145',
  sections: [
    {
      id: 'd14s1',
      title: 'Pourquoi l\u2019asynchronisme ?',
      blocks: [
        { type: 'paragraph', text: 'La communication asynchrone joue un rôle central dans les applications réparties modernes. Contrairement aux interactions synchrones, l\u2019asynchronisme propose un modèle d\u2019échange où les processus n\u2019ont pas besoin d\u2019attendre une réponse immédiate pour continuer leur exécution. → Ce modèle répond aux défis de la distribution, de la scalabilité et de la tolérance aux pannes. → On parle de découplage temporel.' },
        { type: 'list', items: [
          'L\u2019émetteur n\u2019attend pas la fin du traitement.',
          'Il envoie et continue son exécution.',
          'Le retour (si nécessaire) arrive plus tard, via callback ou message de réponse.',
        ] },
        { type: 'kv', items: [
          { k: 'Côté message', v: 'Le message peut être stocké, transmis plus tard, ré-essayé, consommé par plusieurs acteurs.' },
          { k: 'Côté architectures', v: 'L\u2019asynchronisme est la base des architectures : orientées événements, basées sur des brokers de messages, serverless avec déclencheurs, microservices distribués.' },
        ] },
      ],
    },
    {
      id: 'd14s2',
      title: 'Les intervenants principaux',
      blocks: [
        { type: 'definition', term: 'Le producteur', def: 'L\u2019entité (service, processus, module, application…) qui :\n✓ génère un message, un événement ou une tâche,\n✓ l\u2019envoie vers un système intermédiaire sans attendre la réponse du consommateur,\n✓ continue son exécution immédiatement.\n➔ Le producteur est découplé du traitement.' },
        { type: 'definition', term: 'Le consommateur', def: 'L\u2019entité qui :\n✓ reçoit le message ou l\u2019événement,\n✓ le traite plus tard, selon sa disponibilité,\n✓ peut être unique ou multiple (selon le modèle point-à-point ou publish/subscribe).\n➔ Le consommateur est découplé à la fois dans le temps et dans l\u2019espace du producteur.' },
        { type: 'definition', term: 'L\u2019intermédiaire (Broker / Queue / Middleware de messages)', def: 'Cet intermédiaire :\n✓ stocke les messages,\n✓ les achemine,\n✓ garantit la livraison,\n✓ gère les pics de charge.\nC\u2019est l\u2019intermédiaire qui rend possible : le découplage temporel, la résilience, la scalabilité.' },
      ],
    },
    {
      id: 'd14s3',
      title: 'Motivation et principes clés',
      blocks: [
        { type: 'steps', items: [
          { title: '1. Éviter le blocage', text: 'L\u2019asynchrone permet de ne pas bloquer l\u2019exécution, de continuer d\u2019autres tâches pendant l\u2019attente. → Cela augmente la réactivité globale.' },
          { title: '2. Découpler les producteurs et consommateurs', text: 'Le producteur envoie un message, événement ou tâche ; le consommateur le traite plus tard, au moment qui lui convient ; ils n\u2019ont pas besoin d\u2019être actifs en même temps. → Cela permet l\u2019ajout/suppression de consommateurs sans impacter les producteurs et la variation de charge sans saturation immédiate.' },
          { title: '3. Améliorer la scalabilité', text: 'L\u2019asynchronisme facilite la montée en charge : le système absorbe les pics d\u2019activité via des files/messages.' },
        ] },
        { type: 'kv', items: [
          { k: 'Découplage temporel', v: 'L\u2019émetteur et le récepteur n\u2019ont plus l\u2019obligation d\u2019agir au même moment.' },
          { k: 'Découplage spatial', v: 'Les acteurs n\u2019ont pas nécessairement connaissance l\u2019un de l\u2019autre.' },
          { k: 'Résilience et tolérance aux pannes', v: 'Le système continue de fonctionner même si un service tombe en panne, car les messages restent stockés jusqu\u2019au redémarrage.' },
          { k: 'Évolutivité (scalabilité)', v: 'De nouveaux consommateurs peuvent être ajoutés facilement.' },
          { k: 'Gestion des pics de charge', v: 'Lorsque la consommation est plus lente que la production, le système régule le flux en ralentissant, mettant en file ou rejetant proprement des messages.' },
        ] },
      ],
    },
    {
      id: 'd14s4',
      title: 'Les 4 modèles de la communication asynchrone',
      blocks: [
        { type: 'paragraph', text: 'Dans les systèmes distribués, plusieurs modèles permettent de mettre en œuvre une communication asynchrone. Ils se distinguent par la nature des échanges, le rôle des intermédiaires et les garanties offertes.' },
        { type: 'definition', term: 'Message Passing (envoi direct de messages)', def: 'Un modèle où un service (émetteur) envoie un message à un autre service (récepteur) sans attendre de réponse immédiate. → Utilisé dans : les architectures réactives et les microservices.\nCaractéristiques :\n➢ Communication point-à-point : le message a un destinataire unique → couplage spatial.\n➢ Asynchronisme : l\u2019émetteur n\u2019attend pas la réponse : il continue son exécution immédiatement.\n➢ Message indépendant du protocole : webSocket, socket réseau, HTTP asynchrone, gRPC asynchrone, middleware, …\n⚠️ Si le récepteur est indisponible, le message peut être perdu.\nTechnologies majeures : RabbitMQ, NATS, Microsoft MSMQ.' },
        { type: 'definition', term: 'Publish / Subscribe (Pub/Sub)', def: 'Les producteurs (publishers) publient les messages dans un intermédiaire (souvent appelé broker, canal ou topic). Les abonnés (subscribers) déclarent leur intérêt pour certains types de messages auprès de cet intermédiaire. → Idéal pour les architectures orientées événements (EDA).\nCaractéristiques : découplage fort (spatial, temporel et logique) ; scalabilité ; résilience ; diffusion efficace (broadcast).\nDeux types principaux :\n✓ Pub/Sub basé sur les topics (Topic-based) : les subscribers choisissent les topics → messages publiés dans des topics nommés.\n✓ Pub/Sub basé sur le contenu (Content-based) : les abonnés spécifient des filtres → le routage dépend du contenu du message.\nTechnologies majeures : Redis Pub/Sub, Google Pub/Sub, Apache Kafka.' },
        { type: 'definition', term: 'Queue-based Messaging (file d\u2019attente)', def: 'Un message envoyé par un producteur (sender) est placé dans une file d\u2019attente (queue) gérée par un message broker. Le message reste dans la file jusqu\u2019à ce qu\u2019un consommateur (receiver) le récupère et le traite. → Dans ce modèle, chaque message est consommé par UN SEUL destinataire.\nLa queue joue le rôle de mémoire temporaire (si le receiver tombe en panne) et d\u2019un système de régulation (absorbe les pics de charge).\nLe sender ne connaît pas le receiver (ni son adresse, ni son état). Il connaît juste : l\u2019adresse du broker et le nom de la queue. → C\u2019est le broker qui s\u2019occupe de transférer le message au bon consommateur.\nTechnologies majeures : RabbitMQ, Apache Kafka, ActiveMQ.' },
        { type: 'definition', term: 'Streaming d\u2019événements (Event Streams)', def: 'Les événements générés par les systèmes (logs, transactions, clics, mesures, signaux…) sont capturés, stockés et traités en continu sous forme de flux (streams). Dans ce modèle :\n1. les producteurs publient des événements dans un flux,\n2. les consommateurs lisent ces événements en continu,\n3. les événements sont persistés dans un journal (log) distribué,\n4. le traitement peut être temps réel ou quasi temps réel.\nContrairement aux systèmes classiques où les données sont stockées puis traitées plus tard, le streaming traite les données au moment où elles arrivent. → Les événements sont stockés dans un log append-only (journal en écriture seulement).\nTechnologies majeures : Kafka Streams, Apache Pulsar, Amazon Kinesis.' },
        { type: 'diagram', diagram: 'AsyncModels' },
      ],
    },
    {
      id: 'd14s5',
      title: 'Mécanismes fondamentaux',
      blocks: [
        { type: 'definition', term: 'Acknowledgements (ACK / NACK)', def: 'L\u2019acknowledgement (ACK) est un accusé de réception envoyé par le consommateur au broker pour confirmer qu\u2019un message a bien été reçu et traité ; le NACK (negative ACK) indique un échec de traitement. Sans ACK, le broker ne sait pas si un message a été consommé correctement et risque de le perdre ou de le supprimer prématurément.' },
        { type: 'definition', term: 'Politique de réessai (Retry Policies) et backoff', def: 'Règles qui déterminent combien et quand retenter la livraison d\u2019un message en cas d\u2019échec.\n✓ Stratégie simple : n tentatives fixes.\n✓ Exponential backoff : attente croissante (t, 2t, 4t…).\n✓ Jitter : ajout d\u2019aléa pour éviter les pics synchrones.\n➔ Après un nombre maximal d\u2019essais, le message est envoyé en Dead Letter Queue.' },
        { type: 'definition', term: 'Garanties d\u2019ordre et partitionnement', def: 'L\u2019ordering fixe les règles d\u2019ordre de livraison et de traitement des messages, tandis que le partitionnement divise un flux en sous-flux pouvant être traités en parallèle. Le partitionnement permet de gagner en scalabilité mais au prix de l\u2019abandon d\u2019un ordre global strict. On garantit alors seulement un ordre local à l\u2019intérieur de chaque partition.' },
        { type: 'definition', term: 'Durabilité des messages (persistance)', def: 'Capacité à stocker les messages de façon persistante (disque, log) pour survivre aux pannes. → Pour éviter la perte d\u2019informations en cas de crash du broker ou de la machine. 3 mécanismes :\n1. messages en mémoire (volatile),\n2. messages persistants → écriture sur un support non-volatile (disque, log append-only),\n3. messages redondants → duplication sur plusieurs nœuds indépendants pour assurer la tolérance aux pannes.' },
        { type: 'diagram', diagram: 'AckBackoff' },
      ],
    },
    {
      id: 'd14s6',
      title: 'Garanties de livraison des messages',
      blocks: [
        { type: 'paragraph', text: 'Les systèmes de communication asynchrone offrent différents niveaux de garantie sur la livraison des messages, selon le degré de fiabilité exigé par l\u2019application.' },
        { type: 'definition', term: 'Au-plus-une fois (At-most-once)', def: 'Le message est envoyé sans mécanisme de réessai, donc il peut être perdu, mais il ne sera jamais livré deux fois. → Perte tolérable mais duplication inacceptable.\nExemple : notification de logs.' },
        { type: 'definition', term: 'Au-moins-une fois (At-least-once)', def: 'Le message est réémis tant qu\u2019il n\u2019a pas été confirmé (ACK), garantissant qu\u2019il sera livré, mais il peut être livré plusieurs fois. → Le consommateur doit donc être idempotent.\nExemple : envoi d\u2019un email de confirmation de commande.' },
        { type: 'definition', term: 'Exactement-une fois (Exactly-once)', def: 'Le système garantit que chaque message sera traité une seule fois, même en cas d\u2019échec ou de redémarrage. → La garantie la plus forte mais aussi la plus coûteuse.\nExemple : traitement d\u2019un paiement ou d\u2019une transaction bancaire.' },
        { type: 'diagram', diagram: 'DeliveryGuarantees' },
      ],
    },
    {
      id: 'd14s7',
      title: 'Les défis de la communication asynchrone',
      blocks: [
        { type: 'steps', items: [
          { title: 'Perte potentielle d\u2019événements', text: 'Un message peut être perdu si le broker ou le producteur n\u2019est pas correctement configuré pour garantir la persistance et les confirmations (ACK).' },
          { title: 'Messages dupliqués', text: 'Comme la plupart des systèmes garantissent « au moins une fois », un même message peut être livré plusieurs fois, obligeant à rendre les traitements idempotents.' },
          { title: 'Problème d\u2019ordre des messages', text: 'Les messages ne sont pas toujours reçus dans le même ordre que celui où ils ont été envoyés, surtout en présence de plusieurs partitions ou consommateurs.' },
          { title: 'Choix du niveau de durabilité', text: 'Il faut décider si les messages doivent être stockés en mémoire, sur disque ou répliqués, ce qui impacte directement la performance et la fiabilité.' },
          { title: 'Problèmes de cohérence', text: 'Avec l\u2019asynchronisme, les différents services peuvent voir des états temporaires différents, car les mises à jour ne sont pas instantanées.' },
          { title: 'Débogage difficile et manque de visibilité', text: 'Comme un message traverse plusieurs services de façon décalée dans le temps, retracer l\u2019origine d\u2019un problème nécessite des outils d\u2019observabilité avancés (logs, tracing, métriques).' },
          { title: 'Gestion de l\u2019évolution des messages', text: 'Changer le format d\u2019un message peut casser des consommateurs existants, nécessitant une gestion stricte des versions et de la compatibilité des schémas.' },
        ] },
      ],
    },
  ],
}
