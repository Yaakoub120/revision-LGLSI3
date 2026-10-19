import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Partie 2 — Modules 13 & 14 : Microcontrôleurs/micro-ordinateurs
// + logiciel ; projet tutoré micro-jardinage
// ═══════════════════════════════════════════════════════════════

export const imod13: Module = {
  id: 'i13',
  num: 13,
  title: 'Microcontrôleurs, micro-ordinateurs & logiciel',
  subtitle: 'Rôles et critères de choix des calculateurs, langages, IDE, simulation, cloud, passerelle et applications',
  icon: '🧠',
  color: 'teal',
  source: 'InternetDesObjets-2.pdf — Microcontrôleur/Micro-ordinateur & 1.2 Logiciel',
  sections: [
    {
      id: 'i13s1',
      title: 'Microcontrôleur vs micro-ordinateur',
      blocks: [
        { type: 'paragraph', text: "Les calculateurs embarqués recueillent les valeurs provenant des capteurs, font un traitement sur les données et sauvegardent éventuellement une partie. Ils peuvent aussi activer des actionneurs (faire tourner un moteur à 180°, allumer une lampe…). Il y en a 2 types." },
        { type: 'definition', term: 'Microcontrôleur', def: "Équipé de plusieurs ports de connexion, microprocesseur, RAM et ROM — à la seule différence par rapport à un ordinateur : ses ressources sont très limitées, il n'accède qu'à de petites opérations. Utile pour tout ce qui est acquisition et traitement des données provenant des capteurs et contrôle des actionneurs. Il lui faut un programme informatique pour fonctionner." },
        { type: 'definition', term: 'Micro-ordinateur', def: "A une puissance de calcul et une mémoire d'accès proches des ordinateurs (certains l'utilisent comme un ordinateur de bureau). Doté d'un système d'exploitation (Linux la majeure partie). Souvent utilisé pour concevoir une passerelle (gateway). Équipé des connectiques pour accéder au réseau internet ; utilisé pour recevoir des données à partir des capteurs et les envoyer au serveur cloud." },
        { type: 'note', title: 'NB du cours', text: "Les micro-ordinateurs peuvent être utilisés pour acquérir des données comme les microcontrôleurs (mais le contraire est rarement possible)." },
      ],
    },
    {
      id: 'i13s2',
      title: 'Critères de choix',
      blocks: [
        { type: 'table', headers: ['Choisir un microcontrôleur selon…', 'Choisir un micro-ordinateur selon…'], rows: [
          ['Nombre de ports d\u2019acquisition de données et de contrôle', 'Puissance de calcul et taille de la mémoire'],
          ['Puissance de calcul et taille de la mémoire', 'Système d\u2019exploitation'],
          ['Tension de fonctionnement et consommation en énergie', 'Nombre de ports d\u2019acquisition de données et de contrôle'],
          ['Protocoles de communication', 'Prix'],
          ['Langage de programmation supporté', '—'],
          ['Le prix', '—'],
        ], caption: 'Critères de choix des deux familles' },
      ],
    },
    {
      id: 'i13s3',
      title: "L'écosystème logiciel (4 parties)",
      blocks: [
        { type: 'paragraph', text: "Comme langage de programmation, il n'y a pas de limite — le seul problème est que les librairies peuvent parfois ne pas exister pour certains langages. L'écosystème logiciel reprend les 4 parties de l'objet connecté : device, passerelle, cloud, application." },
        { type: 'kv', items: [
          { k: 'Langages (device)', v: "Arduino (C/C++), micropython, java, javascript." },
          { k: 'IDE à installer', v: "Arduino IDE, Eclipse, Codeblock, PlatformIO (Atom ou VSCode ou VSCodium)." },
          { k: 'Plateforme de simulation', v: "Wokwi (https://wokwi.com/)." },
          { k: 'Cloud (services en ligne)', v: "Node-red, blynk, Mozilla webthings, iobroker — ou services AWS, Microsoft Azure, IBM Cloud, Thingspeak." },
          { k: 'Serveur maison (Raspberry)', v: "Transformer la Raspberry Pi en serveur : HTML, CSS, Javascript, Python/Django, MySQL, MongoDB, PHP, Apache — ou un serveur from scratch." },
          { k: 'OS de passerelle', v: "Raspbian, Ubuntu Core, Ubuntu Server, Windows IoT Core, RaspBSD, Domoticz, Arch Linux ARM (majorité Linux)." },
          { k: 'Application web', v: "HTML, CSS, JavaScript, PHP, Apache, etc." },
          { k: 'Application mobile', v: "Java, flutter, swift, AppInventor (très bien pour les débutants)." },
          { k: 'Visualisation prête à l\u2019emploi', v: "Thingspeak, MQTT Dash, etc." },
        ] },
        { type: 'note', title: 'Règle de choix', text: "Comme sur le matériel, le choix des technologies réside sur le projet et son cahier des charges — il faudra choisir des technologies faciles à maintenir." },
        { type: 'diagram', diagram: 'SoftwareStack' },
      ],
    },
  ],
}

export const imod14: Module = {
  id: 'i14',
  num: 14,
  title: 'Projet tutoré : table de micro-jardinage',
  subtitle: 'Du cahier des charges client au système IoT complet : capteurs, actionneur, ESP32, passerelle Raspberry, cloud et application',
  icon: '🪴',
  color: 'teal',
  source: 'InternetDesObjets-2.pdf — 2. Projet tutoré',
  sections: [
    {
      id: 'i14s1',
      title: 'Le problème et le cahier des charges',
      blocks: [
        { type: 'paragraph', text: "Un client vient vous voir avec un problème : il a une table de micro-jardinage où il veut semer des légumes pour sa famille, mais avec les obligations de la vie, il n'a pas le temps de l'entretenir. Que faire ?" },
        { type: 'definition', term: 'Cahier des charges', def: "Automatiser la table pour qu'elle puisse s'auto-arroser · envoyer des informations du climat relatives au milieu sur son smartphone · enregistrer les informations dans une base de données · pouvoir prendre le contrôle de la pompe · tout fonctionne entre 3.3 V et 5 V · autonome en énergie avec un panneau solaire · table mise sur la terrasse · utiliser le WI-FI pour recevoir les données." },
        { type: 'paragraph', text: "Le client veut des informations du climat : la température de l'air, l'humidité de l'air, l'humidité du sol, le taux de luminosité, et pouvoir actionner l'arrosage." },
      ],
    },
    {
      id: 'i14s2',
      title: 'Capteurs et actionneur retenus',
      blocks: [
        { type: 'paragraph', text: "Après consultation et recherche sur le net, voici le matériel choisi pour concevoir sur mesure le système IoT. Les 5 mesures demandées se traduisent en 3 capteurs + 1 actionneur à 2 étages." },
        { type: 'table', headers: ['Composant', 'Mesure / rôle', 'Protocole', 'Tension'], rows: [
          ['DHT11', 'Température et humidité de l\u2019air', 'OneWire', '5 V'],
          ['Capacitive Soil Moisture', 'Humidité du sol', 'Analogique', '3.3 à 5 V'],
          ['Photorésistance', 'Taux de luminosité', 'Analogique', '3.3 à 5 V'],
          ['Pompe', 'Arrosage', '—', '5 V'],
          ['Relais', 'Actionne la pompe', 'Digital', '5 V'],
        ], caption: 'Matériel du projet tutoré' },
        { type: 'note', title: 'Conséquence immédiate', text: "Pour les capteurs et l'actionneur, on a besoin de 4 ports au niveau du microcontrôleur, et il doit supporter les protocoles onewire, analogique et digital." },
      ],
    },
    {
      id: 'i14s3',
      title: 'Microcontrôleur, passerelle, cloud, application',
      blocks: [
        { type: 'definition', term: 'Microcontrôleur : ESP32', def: "Le ESP32 est le grand frère du NodeMcu (ESP8266) : ce dernier n'avait qu'un seul port analogique et d'après les capteurs on a besoin de 2 ports analogiques. Il intègre le WIFI comme réseau de communication (pas besoin de shield) et fonctionne entre 3.3 V et 5 V — donc c'est l'idéal." },
        { type: 'definition', term: 'Passerelle : Raspberry Pi Zero W', def: "Pour faire le gateway on peut choisir le Raspberry Pi Zero : ses performances sont bonnes, il utilise Linux comme OS et consomme peu d'énergie avec un coût pas cher." },
        { type: 'kv', items: [
          { k: 'Cloud (serveur)', v: "Node-red · Mosquitto (protocole MQTT) · MongoDB (base de données)." },
          { k: 'NB : double rôle du Raspberry', v: "Le Raspberry peut jouer 2 rôles : passerelle ET serveur local. Node-red est un service très efficace qui consomme peu de ressources (plug-ins d'analyse et de traitement de données), sauvegarde dans une base de données et fait de la visualisation." },
          { k: 'Application', v: "Node-red dashboard (graphes et jauges dans le navigateur) · MQTT Dash (application mobile alternative : voir les données et prendre des décisions, comme déclencher l'arrosage)." },
        ] },
        { type: 'diagram', diagram: 'GardenProject' },
      ],
    },
    {
      id: 'i14s4',
      title: 'Méthodologie à retenir',
      blocks: [
        { type: 'steps', items: [
          { title: '1. Lire le besoin client', text: "Quelles mesures ? Quelles actions ? Quelles contraintes (tension, autonomie, réseau, lieu) ?" },
          { title: '2. Traduire en capteurs/actionneurs', text: "Chaque mesure → un capteur (protocole + tension) ; chaque action → un actionneur (ici pompe pilotée par relais)." },
          { title: '3. En déduire le microcontrôleur', text: "Nombre de ports + protocoles supportés + réseau intégré (ESP32 : 2 analogiques, WiFi, 3.3-5 V)." },
          { title: '4. Choisir passerelle et cloud', text: "Raspberry Pi Zero W (gateway + serveur local) : Mosquitto (MQTT) + Node-RED + MongoDB." },
          { title: '5. Choisir l\u2019application', text: "Node-RED dashboard (web) ou MQTT Dash (mobile) pour visualiser et commander." },
        ] },
        { type: 'note', title: 'Formule générale', text: "Cahier des charges → capteurs/actionneurs → microcontrôleur → passerelle → cloud → application : c'est la démarche d'ingénierie IoT à réutiliser dans tout exercice de conception." },
      ],
    },
  ],
}
