import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Partie 1 — Modules 5 & 6 : Architecture 5 couches + référence
// CISCO + sécurité ; choix de la plateforme IoT
// ═══════════════════════════════════════════════════════════════

export const imod5: Module = {
  id: 'i5',
  num: 5,
  title: "Architecture IoT à 5 couches",
  subtitle: 'Perception, Réseau, Middleware, Application, Business + architecture de référence CISCO, analytique et sécurité',
  icon: '🏛️',
  color: 'emerald',
  source: 'InternetDesObjets-1.pdf — II.2 Architecture à 5 couches, II.3 Référence, II.4 Sécurité',
  sections: [
    {
      id: 'i5s1',
      title: "Vue d'ensemble des 5 couches",
      blocks: [
        { type: 'paragraph', text: "L'architecture à 5 couches est LE schéma à savoir redessiner. Du bas vers le haut : Perception/Collecte, Réseau, Middleware/Traitement, Application, Business. Chaque couche a un rôle précis et des composants types." },
        { type: 'list', items: [
          "Couche Perception/Collecte d'informations (capteurs/actionneurs).",
          "Couche Réseau (communication).",
          "Couche Middleware / traitement : stocke, traite les données et fournit des services aux couches inférieures (bases de données, cloud computing, traitement Big Data).",
          "Couche Application (services métiers).",
          "Couche Business (analyse et décision) : gère l'ensemble du système IoT, y compris les applications, les modèles commerciaux/profit, et la confidentialité des utilisateurs.",
        ] },
        { type: 'diagram', diagram: 'FiveLayers' },
      ],
    },
    {
      id: 'i5s2',
      title: 'Couche 1 — Perception (Physical Layer)',
      blocks: [
        { type: 'definition', term: 'Couche Perception', def: "Rôle : collecter des données physiques (température, mouvement, etc.). C'est l'interface directe avec le monde réel." },
        { type: 'kv', items: [
          { k: 'Composants', v: "Capteurs (ex : DHT22, capteur de CO₂) · Actionneurs (ex : moteurs, LED) · RFID/NFC pour l'identification." },
          { k: 'Exemple du cours', v: "Capteur de température envoyant des données via Bluetooth." },
        ] },
      ],
    },
    {
      id: 'i5s3',
      title: 'Couche 2 — Réseau (Transport Layer)',
      blocks: [
        { type: 'definition', term: 'Couche Réseau', def: "Rôle : transmettre les données vers le cloud ou l'edge." },
        { type: 'kv', items: [
          { k: 'Protocoles courtes distances', v: "BLE, Zigbee, LoRa." },
          { k: 'Protocoles longues distances', v: "LoRaWAN, NB-IoT, 5G." },
          { k: 'Passerelles', v: "Agrégation des données (ex : Raspberry Pi comme gateway)." },
        ] },
        { type: 'note', title: 'Ne pas confondre', text: "LoRa (courte liste, liaison radio) vs LoRaWAN (protocole réseau longue distance) — le cours cite LoRa en courte distance et LoRaWAN en longue distance." },
      ],
    },
    {
      id: 'i5s4',
      title: 'Couche 3 — Middleware (Traitement)',
      blocks: [
        { type: 'definition', term: 'Couche Middleware', def: "Rôle : stockage, traitement et préparation des données." },
        { type: 'kv', items: [
          { k: 'Edge Computing', v: "Traitement local (ex : NVIDIA Jetson)." },
          { k: 'Cloud', v: "AWS IoT, Azure IoT Hub." },
          { k: 'Bases de données', v: "MongoDB, InfluxDB." },
          { k: 'Fonctions', v: "Filtrage, agrégation, chiffrement." },
        ] },
      ],
    },
    {
      id: 'i5s5',
      title: 'Couche 4 — Application (Services) & Couche 5 — Business (Analyse)',
      blocks: [
        { type: 'definition', term: 'Couche Application', def: "Rôle : fournir des services métiers aux utilisateurs. Exemples : dashboard de surveillance (ex : Grafana), alertes en temps réel (ex : notification SMS en cas d'incendie), automatisation (ex : irrigation intelligente). Le cours illustre aussi avec le dashboard IoT de ThingsBoard." },
        { type: 'definition', term: 'Couche Business', def: "Rôle : analyse avancée et prise de décision. Outils : Big Data (Hadoop, Spark), IA/ML (prédictions, ex : maintenance prédictive). KPIs : réduction des coûts, amélioration de l'efficacité." },
        { type: 'paragraph', text: "La couche Business s'appuie sur l'escalade de l'analytique : l'information monte en valeur à chaque étage, du descriptif vers le prescriptif." },
        { type: 'diagram', diagram: 'AnalyticsPyramid' },
      ],
    },
    {
      id: 'i5s6',
      title: 'Architecture de référence (schéma global CISCO)',
      blocks: [
        { type: 'paragraph', text: "Le schéma global de référence (IoT World Forum / CISCO) décrit l'écosystème complet en 7 niveaux, des « Things » à l'EDGE jusqu'à la collaboration et aux processus métiers au CENTER." },
        { type: 'steps', items: [
          { title: '1. Physical Devices and Controllers', text: "« The Things » in IoT — EDGE : capteurs, devices, machines, nœuds d'edge intelligents de tous types." },
          { title: '2. Connectivity', text: "Communication et unités de traitement." },
          { title: '3. Edge Computing', text: "Analyse et transformation des éléments de données (Data Element Analysis and Transformation)." },
          { title: '4. Data Accumulation', text: "Stockage (Storage)." },
          { title: '5. Data Abstraction', text: "Agrégation et accès (Aggregation and Access)." },
          { title: '6. Application', text: "Reporting, Analytics, Control." },
          { title: '7. Collaboration and Processes', text: "Impliquant les personnes et les processus métiers — CENTER." },
        ] },
        { type: 'diagram', diagram: 'CiscoRef' },
        { type: 'note', title: 'IoT et technologie médicale', text: "Le cours applique ce référentiel à la santé en 7 apports : surveillance améliorée des patients · santé prédictive · gestion des médicaments intelligents · télémédecine et consultations à distance · opérations hospitalières et gestion des actifs · essais cliniques et recherche médicale · sécurité des données sur les soins de santé." },
      ],
    },
    {
      id: 'i5s7',
      title: "Sécurité dans l'architecture IoT",
      blocks: [
        { type: 'table', headers: ['Axe', 'Contenu du cours'], rows: [
          ['Risques', "Piratage des capteurs, interception des données."],
          ['Solutions', "Chiffrement (TLS/SSL), authentification (MQTT avec login/password), mises à jour OTA (Over-The-Air)."],
          ['Normes', "ISO/IEC 27001, GDPR."],
        ], caption: 'Risques / Solutions / Normes' },
        { type: 'note', title: 'Checklist RGPD (illustration du cours)', text: "Le cours montre la checklist GDPR en 10 questions : données personnelles traitées ? RGPD applicable ? catégories spéciales ? législation nationale ? transferts à des tiers/pays ? rôle de l'entreprise dans le traitement ? conformité des documents politiques ? Data Protection Impact Assessment ? besoin d'un Data Protection Officer (DPO) ? processeurs informés des politiques ?" },
      ],
    },
  ],
}

export const imod6: Module = {
  id: 'i6',
  num: 6,
  title: 'Choisir une plateforme IoT',
  subtitle: "Caractéristiques d'une plateforme, les 9 questions à se poser, deux approches matérielles (OS embarqué vs systèmes dédiés compacts)",
  icon: '🧭',
  color: 'emerald',
  source: 'InternetDesObjets-1.pdf — III. Questions à poser pour choisir une plateforme IOT',
  sections: [
    {
      id: 'i6s1',
      title: "Caractéristiques générales d'une plateforme pour l'IoT",
      blocks: [
        { type: 'paragraph', text: "Le schéma du cours décrit la chaîne d'une plateforme IoT : le monde physique (l'objet) interagit avec le monde numérique via un bloc central, puis transmet vers le réseau informatique." },
        { type: 'kv', items: [
          { k: 'Monde physique ↔ Interaction', v: "Capteur · Actionneur · Traitement local des données · Énergie." },
          { k: 'Protocole / Communication', v: "cœur de la plateforme : règles d'échange." },
          { k: 'Transmission ↔ Réseau informatique', v: "acheminement des données vers l'infrastructure." },
        ] },
        { type: 'diagram', diagram: 'PlatformChain' },
      ],
    },
    {
      id: 'i6s2',
      title: 'Les 9 questions à se poser avant de choisir',
      blocks: [
        { type: 'paragraph', text: "Pour bien choisir la plateforme technologique, le cours donne une liste de questions. Les connaître est indispensable : elles structurent tout cahier des charges IoT." },
        { type: 'list', items: [
          "Dans quel environnement l'objet évoluera-t-il ? (espace urbain, sous-terrain, rural, indoor ou outdoor — actionneurs)",
          "À quelle distance l'objet sera-t-il du point relais le plus proche ? (exemple : smartphone, antenne-relais, passerelle WiFi)",
          "À quelle fréquence ces données seront-elles envoyées ? (quelques envois, plusieurs centaines ou plus)",
          "Quel est le délai maximum toléré pour transmettre une donnée du Système d'Information à l'objet ?",
          "S'agit-il d'un objet mobile ou fixe ?",
          "Souhaitez-vous géolocaliser votre objet ? Si oui, quelle est la précision tolérée en mètres ?",
          "Quel type de source d'énergie alimente votre objet ? (secteur, batterie ou pile)",
          "Si l'objet doit avoir une source d'énergie limitée, combien de temps doit-elle durer ?",
          "… (la liste reste ouverte : le cahier des charges pilote)",
        ] },
      ],
    },
    {
      id: 'i6s3',
      title: 'Deux approches matérielles majeures',
      blocks: [
        { type: 'paragraph', text: "La révolution des systèmes embarqués à faible coût offre deux familles de plateformes, aux philosophies opposées. Le comparatif avantages/inconvénients est à connaître par cœur." },
        { type: 'definition', term: 'Systèmes construits autour d\u2019un OS embarqué', def: "RASPBERRY PI, BEAGLEBONE et plateformes similaires.\n\n✓ Avantages : ouverts, puissants, langages de programmation multiples.\n✗ Inconvénients : parfois complexes à mettre en œuvre, prise en main longue, réactivité moyenne, coût relativement élevé, interfaçage plus difficile." },
        { type: 'definition', term: 'Systèmes dédiés compacts à logiciel propriétaire', def: "ARDUINO, GENUINO, INTEL GALILEO, ESP8266, etc.\n\n✓ Avantages : très réactifs, faible coût, fonctionnement plus robuste (pas de couches logicielles), interfaçage aisé, prise en main très rapide.\n✗ Inconvénients : moins puissants, langages de programmation plus limités, moins flexibles sur le plan logiciel." },
        { type: 'diagram', diagram: 'TwoApproaches' },
      ],
    },
  ],
}
