import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Partie 1 — Modules 3 & 4 : Architecture technique, mapping,
// IoE, écosystème TIC, connecter un objet, DATA, composition
// ═══════════════════════════════════════════════════════════════

export const imod3: Module = {
  id: 'i3',
  num: 3,
  title: "Architecture technique de l'IoT",
  subtitle: 'Mapping monde physique/information, objets réels et virtuels, écosystème TIC (M2M, M2P, P2P), caractéristiques des objets (ITU-T Y.2060)',
  icon: '🗺️',
  color: 'emerald',
  source: 'InternetDesObjets-1.pdf — II. Architecture Technique de l\u2019IoT',
  sections: [
    {
      id: 'i3s1',
      title: "Définition, objectifs et enjeux de l'architecture IoT",
      blocks: [
        { type: 'definition', term: "Architecture IoT", def: "L'architecture IoT décrit l'organisation des composants matériels, logiciels et réseaux pour collecter, transmettre, traiter et exploiter les données." },
        { type: 'kv', items: [
          { k: 'Objectifs', v: "Fiabilité, évolutivité, sécurité, interopérabilité." },
          { k: 'Enjeux', v: "Gérer l'hétérogénéité des dispositifs et le volume de données." },
        ] },
        { type: 'note', title: 'Défis & opportunités (santé comportementale)', text: "Le cours illustre les défis de mise en œuvre de l'IoT en santé : confidentialité et sécurité, engagement et adhérence de l'utilisateur, qualité et biais des données, coûts et accessibilité, interopérabilité et standardisation, considérations éthiques, intégration dans les workflows cliniques." },
      ],
    },
    {
      id: 'i3s2',
      title: 'Mapping : du monde physique vers le monde de l\u2019information',
      blocks: [
        { type: 'definition', term: 'Mapping', def: "Transposition du monde physique vers le monde d'informations : identifier un objet physique dans le monde du système d'informations (objet virtuel). Schéma de référence : Y.2060(12)_F02." },
        { type: 'paragraph', text: "Dans le schéma ITU du cours, chaque objet physique (point noir) est relié à un dispositif (carré gris) et possède son image, l'objet virtuel (cercle hachuré), dans le monde de l'information. Trois chemins de communication existent : via une passerelle (a), sans passerelle (b) et directe (c)." },
        { type: 'kv', items: [
          { k: 'Communication via une passerelle (a)', v: "l'objet passe par une passerelle (gateway) pour rejoindre le système d'information." },
          { k: 'Communication sans passerelle (b)', v: "le dispositif rejoint directement le réseau de communication." },
          { k: 'Communication directe (c)', v: "échange direct entre dispositifs, sans passerelle intermédiaire." },
        ] },
        { type: 'diagram', diagram: 'MappingWorlds' },
      ],
    },
    {
      id: 'i3s3',
      title: 'Objets réels, objets virtuels et visibilité par Internet',
      blocks: [
        { type: 'paragraph', text: "Le cours classe les objets en deux mondes. Les objets virtuels vivent sur l'Internet (site internet, blogues, réseaux sociaux, cloud, web) ; les objets réels vivent autour de nous (véhicules, domotique, WSN). Les objets intelligents rendent les objets réels visibles via l'Internet." },
        { type: 'table', headers: ['Catégorie', 'Exemples du cours'], rows: [
          ['Objets virtuels (monde Web)', "Site Internet, Blogues, Réseaux sociaux, Cloud, Web."],
          ['Véhicules', "Voitures de service, gestion des foules, bus, trains, moyens et machines agricoles."],
          ['Domotique', "PC, IPTV, téléphone intelligent, lecteur audio/vidéo, réfrigérateur, machine à café, fours — maison/ville intelligente, université intelligente."],
          ['WSN (Wireless Sensor Networks)', "Suivi : objets, régions, zone & objets."],
        ], caption: "Classification du schéma « Visibilité des objets via l'Internet »" },
        { type: 'definition', term: 'WSN', def: "Wireless Sensor Networks : réseaux de capteurs sans fil, cités dans le schéma du cours pour le suivi d'objets, de régions et de zones." },
      ],
    },
    {
      id: 'i3s4',
      title: "Écosystème TIC de l'IoT : M2M, M2P, P2P",
      blocks: [
        { type: 'paragraph', text: "L'écosystème des communications TIC se découpe en trois modèles d'échange. L'IoT est précisément la réunion de deux d'entre eux — c'est une question d'examen classique." },
        { type: 'definition', term: 'M2M (ou D2D : Device to Device)', def: "Fait référence à la connexion entre des machines sans intervention humaine." },
        { type: 'definition', term: 'M2P (Machine to People)', def: "Désigne la connexion entre une machine et une personne." },
        { type: 'definition', term: 'P2P (Peer-to-Peer)', def: "Système pair à pair : modèle d'échange en réseau où chaque entité est à la fois client et serveur." },
        { type: 'note', title: 'Formule du cours', text: "L'IoT fait référence à l'ensemble M2M et M2P, qui comprend l'application, la connectivité backend, etc." },
        { type: 'diagram', diagram: 'TicEcosystem' },
      ],
    },
    {
      id: 'i3s5',
      title: "Caractéristiques des objets (Recommandation ITU-T Y.2060)",
      blocks: [
        { type: 'paragraph', text: "La recommandation ITU-T Y.2060 définit trois caractéristiques fondamentales des objets de l'IoT. Elles expliquent pourquoi l'architecture doit être fiable, évolutive, sécurisée et interopérable." },
        { type: 'kv', items: [
          { k: '1. Inter-connectivité', v: "Tout peut être interconnecté avec une infrastructure mondiale d'information et de communication." },
          { k: '2. Hétérogénéité', v: "Les objets reposent sur des plates-formes matérielles et des réseaux différents ; ils peuvent interagir avec d'autres objets ou plates-formes de services via différents réseaux." },
          { k: '3. Changement dynamique', v: "L'état des objets change dynamiquement : sommeil ou éveil, connecté et/ou déconnecté, contexte (emplacement, vitesse) — et le nombre d'objets peut lui aussi changer dynamiquement." },
        ] },
        { type: 'quote', text: "La communication est possible en tout lieu, à tout moment, avec n'importe quel objet.", source: 'IoE — Recommandation de l\u2019UIT / Cisco' },
      ],
    },
  ],
}

export const imod4: Module = {
  id: 'i4',
  num: 4,
  title: 'Connecter un objet & la DATA',
  subtitle: "Les 4 sous-parties d'un objet connecté, l'empilement technologique, la valeur économique de la DATA, le RGPD et la composition d'un objet embarqué",
  icon: '🔌',
  color: 'emerald',
  source: 'InternetDesObjets-1.pdf — II.1 Comment connecter un objet IoT ?',
  sections: [
    {
      id: 'i4s1',
      title: "Les 4 sous-parties d'un objet connecté",
      blocks: [
        { type: 'paragraph', text: "Pour connecter un objet IoT, la chaîne complète comporte quatre maillons : l'appareil électronique qui capture, Internet qui transporte, le cloud qui stocke, et l'application qui présente et contrôle." },
        { type: 'steps', items: [
          { title: '1. Appareil électronique (device)', text: "Capteurs et actionneurs, traitement, sauvegarde." },
          { title: '2. Internet', text: "Qui permet la transaction des données : réseau réception, passerelle (gateway), serveur." },
          { title: '3. Cloud', text: "Là où on reçoit les données : réception, traitement, stockage." },
          { title: '4. Application', text: "Là où on a le tableau de bord (dashboard) : affichage des données, prise de contrôle." },
        ] },
        { type: 'diagram', diagram: 'IotStack' },
      ],
    },
    {
      id: 'i4s2',
      title: "L'empilement technologique de l'IoT (5 éléments)",
      blocks: [
        { type: 'paragraph', text: "L'empilement technologique décrit l'IoT « avec plus de profondeur » en cinq éléments. Les deux premiers forment le socle physique et réseau ; le cloud et l'application forment le sommet (Cloud+Application)." },
        { type: 'list', ordered: true, items: [
          "Objets physiques (Physical Thing) — Capacités : capteurs, actionneurs, traitement, contrôle, alimentation. Compromis de conception : coût, taille, performances, contraintes.",
          "Canaux de communication (Communication Channels) — protocoles et solutions de connectivité pour un transfert de données d'objet à objet, objet à serveur ou serveur à serveur.",
          "Logiciel (Software) — traite, stocke et analyse des données ; permet d'interagir avec le système IoT et de visualiser des données.",
          "Opérations (Operations) — combinées à des ressources de développement et de sécurité : essentielles au déploiement et à la maintenance d'un système IoT ; l'accessibilité de l'infrastructure Cloud fournit une fonction DevOps.",
          "Données (Data) — les données sont un sous-produit du système IoT.",
        ] },
        { type: 'note', title: 'Piège classique', text: "« Les données sont un sous-produit du système IoT » : elles ne sont pas l'objectif premier du système, mais ce qu'il produit — et c'est précisément ce qui a de la valeur." },
      ],
    },
    {
      id: 'i4s3',
      title: 'La DATA : valeur économique et données sensibles',
      blocks: [
        { type: 'paragraph', text: "« La DATA (pour se faire de l'argent) » : l'IoT est le futur eldorado des acteurs de l'IT — smart grid, domotique, santé connectée, industrie 4.0, logistique, urbanisme, agriculture, défense. Les grands acteurs IT (IBM, Microsoft, HPE, SAP et AWS) profitent de l'explosion des objets connectés pour apporter leur savoir-faire et leurs solutions. La DATA peut être utilisée et vendue par les entreprises qui conçoivent ces objets connectés." },
        { type: 'definition', term: 'Données sensibles — collecte interdite (par principe)', def: "Neuf catégories : état de santé · données génétiques · données biométriques · origine raciale ou éthique · convictions religieuses ou philosophiques · opinions politiques · condamnations pénales et infractions · orientations sexuelles · opinions syndicales." },
        { type: 'note', title: 'Lien avec le RGPD', text: "Ces catégories correspondent aux « données sensibles » du RGPD : leur collecte est interdite par principe, sauf exceptions légales. En santé connectée (IoMT), c'est la contrainte majeure." },
      ],
    },
    {
      id: 'i4s4',
      title: "Composition d'un objet physique embarqué",
      blocks: [
        { type: 'paragraph', text: "Un objet IoT embarqué se compose de plusieurs composants, notamment : (i) un processeur intégré, (ii) des capteurs ou l'acquisition de données, (iii) une radio sans fil comme Bluetooth. Le schéma « IoT Device » du cours détaille l'organisation interne." },
        { type: 'kv', items: [
          { k: 'Power unit', v: "management, battery (batterie), harvester (récupérateur d'énergie)." },
          { k: 'Processing Unit', v: "Accélérateurs, DSPs, MCU (microcontrôleur)." },
          { k: 'RF (radio)', v: "BLE, LTE, WiFi, ZigBee, RFID." },
          { k: 'On-chip sensors (capteurs sur puce)', v: "motion, gyro, GPS…" },
          { k: 'AFE (Analogue Front End)', v: "ADC/DAC — interface entre capteurs et processeur ; ADC = conversion analogique-numérique." },
          { k: 'Mémoire non volatile + capteurs hors puce', v: "Nonvolatile memory ; off-chip sensors & actuators." },
        ] },
        { type: 'diagram', diagram: 'IotDeviceAnatomy' },
      ],
    },
  ],
}
