import type { Subject } from "@/lib/learn-types";

// ═══════════════════════════════════════════════════════════════════════════
// SUJET 5 — INTERNET DES OBJETS / IoT (3 parties — Samir Belaid, FSM LSI3)
// ═══════════════════════════════════════════════════════════════════════════

export const iot: Subject = {
  id: "iot",
  name: "Internet des Objets (IoT)",
  shortName: "IoT",
  teacher: "Mr Samir Belaid — FSM",
  icon: "Cpu",
  gradient: "from-orange-500 via-amber-500 to-yellow-500",
  accent: "#f97316",
  description:
    "Introduction à l'IoT et IoMT, architecture à 5 couches, protocoles (MQTT, CoAP, LoRaWAN…), matériel et logiciel, Arduino, ESP32/ESP8266, Raspberry Pi, Node-RED et projets.",
  chapters: [
    {
      id: "i1",
      title: "Partie I — Introduction à l'IoT",
      summary: "Définitions IoT/IoMT, historique, exemples (wearables, implants, télémédecine…), architecture 5 couches, sécurité, choix de plateforme, protocoles réseau et série, topologies IoMT.",
      sections: [
        {
          heading: "Définitions, objectifs et historique",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "IoT", v: "« Un réseau d'objets physiques connectés à Internet, capables de collecter, transmettre et analyser des données. »" },
                { k: "IoMT (Internet of Medical Things)", v: "« Désigne les dispositifs connectés utilisés pour surveiller, diagnostiquer ou traiter des patients à distance. » Objectifs : améliorer les soins, réduire les coûts, personnaliser les traitements." },
                { k: "1999", v: "Kevin Ashton (MIT) invente le terme Internet of Things pour décrire la gestion de la chaîne logistique via RFID." },
                { k: "Années 2000", v: "RFID et capteurs simples." },
                { k: "2008", v: "Premier pic avec 12 milliards d'objets connectés (dépassant la population mondiale)." },
                { k: "2020s", v: "Explosion des applications (santé, smart cities, industrie 4.0)." },
                { k: "Aujourd'hui", v: "50+ milliards d'objets connectés. Marché mondial estimé à 1 600 milliards $ d'ici fin 2026 (McKinsey). Marché IoMT : 187 milliards $ d'ici 2030 (Deloitte). 60 % des établissements de santé utilisent des solutions IoT (HIMSS)." },
              ],
            },
          ],
        },
        {
          heading: "Exemples concrets d'IoMT",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Wearables", v: "Apple Watch Series 10 (détection des arythmies cardiaques ECG intégré, suivi SpO₂), Fitbit Sense (surveillance du stress via la variabilité du rythme cardiaque), BioSticker de BioIntelliSense (suivi des signes vitaux : température, fréquence respiratoire pendant 30 jours)." },
                { k: "Implants médicaux connectés", v: "Stimulateurs cardiaques : Medtronic MyCareLink (transmet les données du pacemaker au médecin via Bluetooth). Pompes à insuline : Tandem t:slim X2 (s'adapte automatiquement aux besoins en insuline, intégration capteurs Dexcom). Neurostimulateurs : StimWave (gère la douleur chronique via application mobile)." },
                { k: "Surveillance à distance", v: "Philips eCareCoordinator (patients BPCO ou insuffisance cardiaque à domicile), BioTelemetry/GE Healthcare (suivi cardiaque ECG portables), CarePredict (détection de chutes et changements de comportement via capteurs de mouvement et IA)." },
                { k: "Télémédecine", v: "TytoCare (stéthoscope, otoscope et thermomètre connectés pour examens à distance), Teladoc (consultation vidéo avec partage de données IoMT : tension artérielle)." },
                { k: "Hôpitaux intelligents", v: "EarlySense (capteurs sous le matelas : fréquence cardiaque, respiration, mouvements), Siemens Healthineers (suivi des stocks de sang/vaccins en temps réel), robots de désinfection Xenex LightStrike (UV pour désinfecter les chambres)." },
                { k: "Applications d'urgence", v: "Embrace2 d'Empatica (bracelet détectant les crises d'épilepsie via capteurs de mouvement et transpiration + alerte), HeartHero (défibrillateur portable connecté guidant les secouristes via appli)." },
                { k: "Santé mentale et bien-être", v: "Muse 2 (bandeau mesurant l'activité cérébrale pour améliorer la méditation), AppliedVR (thérapie par réalité virtuelle pour douleur chronique et anxiété)." },
              ],
            },
          ],
        },
        {
          heading: "Écosystème et concepts clés",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Architecture IoT (définition)", v: "Décrit l'organisation des composants matériels, logiciels et réseaux pour collecter, transmettre, traiter et exploiter les données. Objectifs : fiabilité, évolutivité, sécurité, interopérabilité. Enjeux : gérer l'hétérogénéité des dispositifs et le volume de données." },
                { k: "Mapping", v: "Transposition du monde physique vers le monde d'informations (ITU Y.2060) : identifier un objet physique dans le monde du système d'informations (objet virtuel). Objets réels → objets virtuels → objets Web (visibilité via Internet : sites, blogs, réseaux sociaux, cloud)." },
                { k: "IoE (Internet of Everything)", v: "Recommandation de l'UIT / CISCO : communication en tout LIEU (extérieur/indoor, nuit/jour, en déplacement), à tout MOMENT, avec n'importe quel OBJET — entre ordinateurs, entre personnes sans ordinateur, entre objets." },
                { k: "M2M (Device to Device / D2D)", v: "Connexion entre des machines sans intervention humaine." },
                { k: "M2P (Machine to People)", v: "Connexion entre une machine et une personne." },
                { k: "P2P (Peer-to-Peer)", v: "Modèle d'échange en réseau où chaque entité est à la fois client et serveur." },
                { k: "IoT", v: "Fait référence à l'ensemble M2M et M2P, qui comprend l'application, la connectivité backend, etc." },
                { k: "Caractéristiques des objets (ITU-T Y.2060)", v: "1) Inter-connectivité : tout peut être interconnecté avec une infrastructure mondiale d'information et de communication. 2) Hétérogénéité : objets basés sur des plateformes matérielles et réseaux différents, interagissant via différents réseaux. 3) Changement dynamique : l'état des objets change (sommeil/éveil, connecté/déconnecté, emplacement, vitesse) ; le nombre d'objets peut changer dynamiquement." },
              ],
            },
            {
              type: "p",
              text: "Sous-parties d'un objet connecté : 1) Appareil électronique (device) — capacités incluant capteurs, actionneurs, traitement, contrôle, alimentation ; compromis de conception : coût, taille, performances, contraintes. 2) Internet : qui permet la transaction des données (réseau réception, passerelle gateway, serveur). 3) Cloud : là où on reçoit les données (réception, traitement, stockage). 4) Application : le tableau de bord (dashboard) — affichage des données, prise de contrôle. Empilement technologique complet : 1) objets physiques, 2) canaux de communication (protocoles et solutions de connectivité : objet à objet, objet à serveur, serveur à serveur), 3) logiciel (traite, stocke et analyse les données ; interaction et visualisation), 4) opérations (combinées aux ressources de développement et de sécurité : déploiement et maintenance ; l'accessibilité de l'infrastructure cloud fournit une fonction DevOps), 5) données (sous-produit du système IoT — la DATA peut être utilisée et vendue ; eldorado des acteurs IT : IBM, Microsoft, HPE, SAP, AWS ; domaines : smart grid, domotique, santé connectée, industrie 4.0, logistique, urbanisme, agriculture, défense).",
            },
            {
              type: "callout",
              variant: "warn",
              title: "Données sensibles / collecte interdite (par principe)",
              text: "État de santé, données génétiques, données biométriques, origine raciale ou ethnique, convictions religieuses ou philosophiques, opinions politiques, condamnations pénales et infractions, orientations sexuelles, opinions syndicales.",
            },
            {
              type: "p",
              text: "Composition d'un objet IoT embarqué : (i) un processeur intégré, (ii) des capteurs pour l'acquisition de données, (iii) une radio sans fil comme Bluetooth (AFE : Analogue Front End). Exemples de capteurs : capteurs d'environnement, capteurs de mouvement, nécessitant une interaction humaine, autres.",
            },
          ],
        },
        {
          heading: "Architecture IoT à 5 couches",
          blocks: [
            {
              type: "diagram",
              id: "iot-layers",
              caption: "Architecture IoT en 5 couches : Perception → Réseau → Middleware → Application → Business.",
            },
            {
              type: "kv",
              items: [
                { k: "1. Couche Perception (Physical Layer)", v: "Rôle : collecter des données physiques (température, mouvement…). Composants : capteurs (DHT22, capteur de CO₂), actionneurs (moteurs, LED), RFID/NFC pour l'identification. Exemple : capteur de température envoyant des données via Bluetooth." },
                { k: "2. Couche Réseau (Transport Layer)", v: "Rôle : transmettre les données vers le cloud ou l'edge. Protocoles courtes distances : BLE, Zigbee, LoRa ; longues distances : LoRaWAN, NB-IoT, 5G. Passerelles : agrégation des données (ex. Raspberry Pi comme gateway)." },
                { k: "3. Couche Middleware (Traitement)", v: "Rôle : stockage, traitement, préparation des données. Composants : Edge Computing (traitement local, ex. NVIDIA Jetson), Cloud (AWS IoT, Azure IoT Hub), bases de données (MongoDB, InfluxDB). Fonctions : filtrage, agrégation, chiffrement." },
                { k: "4. Couche Application (Services)", v: "Rôle : fournir des services métiers aux utilisateurs. Exemples : dashboard de surveillance (Grafana, ThingsBoard), alertes en temps réel (notification SMS en cas d'incendie), automatisation (irrigation intelligente)." },
                { k: "5. Couche Business (Analyse)", v: "Rôle : analyse avancée et prise de décision. Outils : Big Data (Hadoop, Spark), IA/ML (prédictions, ex. maintenance prédictive). KPIs : réduction des coûts, amélioration de l'efficacité. Gère l'ensemble du système IoT y compris applications, modèles commerciaux/profit et confidentialité des utilisateurs." },
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Sécurité dans l'architecture IoT", v: "Risques : piratage des capteurs, interception des données. Solutions : chiffrement (TLS/SSL), authentification (MQTT avec login/password), mises à jour OTA (Over-The-Air). Normes : ISO/IEC 27001, GDPR." },
                { k: "Choix d'une plateforme IoT — questions", v: "Dans quel environnement l'objet évoluera-t-il (urbain, sous-terrain, rural, indoor/outdoor) ? À quelle distance du point relais le plus proche (smartphone, antenne-relais, passerelle WiFi) ? À quelle fréquence les données seront envoyées ? Délai maximum toléré pour transmettre une donnée du SI à l'objet ? Objet mobile ou fixe ? Géolocalisation (précision en mètres) ? Source d'énergie (secteur, batterie, pile) et durée requise ?" },
                { k: "Deux approches matérielles", v: "Systèmes construits autour d'un OS embarqué (RASPBERRY PI, BEAGLEBONE…) : ouverts, puissants, langages multiples — mais parfois complexes, prise en main longue, réactivité moyenne, coût élevé, interfaçage difficile. Systèmes dédiés compacts à logiciel propriétaire (ARDUINO, GENUINO, INTEL GALILEO, ESP8266…) : très réactifs, faible coût, robustes (pas de couches logicielles), interfaçage aisé, prise en main rapide — mais moins puissants, langages limités, moins flexibles." },
              ],
            },
          ],
        },
        {
          heading: "Protocoles de communication IoT",
          blocks: [
            {
              type: "p",
              text: "Définition : les protocoles de communication IoT sont des règles et standards permettant aux dispositifs (capteurs, actionneurs, passerelles…) d'échanger des données de manière fiable et sécurisée, malgré des contraintes de ressources (énergie, bande passante, puissance de calcul). Enjeux : faible consommation d'énergie (capteurs sur batterie), latence réduite (temps réel), fiabilité dans des environnements perturbés, sécurité des données (chiffrement, authentification). Catégories : protocoles de couche application (MQTT, CoAP, HTTP/HTTPS, AMQP) et protocoles de couche réseau (LoRaWAN, Zigbee, NB-IoT, Wi-Fi HaLow, Sigfox, Bluetooth Low Energy).",
            },
            {
              type: "table",
              headers: ["Protocole", "Fonctionnement", "Cas d'usage", "Avantages", "Inconvénients"],
              rows: [
                ["MQTT (Message Queuing Telemetry Transport)", "Modèle publish/subscribe avec broker central ; utilise TCP/IP pour une transmission fiable", "Surveillance médicale, industrielle, domotique, systèmes avec connexion intermittente", "Léger, idéal réseaux à faible bande passante, supporte les appareils embarqués", "Dépendance au broker (point unique de défaillance)"],
                ["CoAP (Constrained Application Protocol)", "Inspiré de HTTP, optimisé pour les appareils contraints ; utilise UDP pour réduire la surcharge", "Capteurs IoT à ressources limitées (smart lighting, agriculture)", "Léger, compatible RESTful APIs, supporte le multicast", "Moins fiable que MQTT (pas de garantie de livraison)"],
                ["HTTP/HTTPS", "Standard web, modèle client-serveur ; TCP/IP (HTTP) ou TLS (HTTPS) pour la sécurité", "IoT grand public (applications mobiles connectées aux objets)", "Universel, facile à intégrer aux infrastructures existantes", "Lourd en consommation de ressources"],
                ["LoRaWAN (Long Range Wide Area Network)", "Ondes radio sub-GHz, longue portée (jusqu'à 15 km en zone rurale) ; architecture en étoile avec passerelles", "Smart cities, suivi de flottes, agriculture", "Faible consommation, longue portée, idéal déploiements massifs", "Débit limité (0,3 à 50 kbps)"],
                ["Zigbee", "Basé sur IEEE 802.15.4 ; réseau maillé (mesh) auto-organisé", "Domotique, automatisation industrielle", "Faible latence, réseau robuste (redondance via mesh)", "Portée limitée (10-100 m)"],
                ["BLE (Bluetooth Low Energy)", "Consommation ultra-faible ; communication peer-to-peer ou en étoile", "Wearables, santé connectée, beacons", "Compatibilité smartphones, énergétiquement efficace", "Portée très courte (jusqu'à 100 m en théorie, souvent moins)"],
              ],
            },
            {
              type: "table",
              headers: ["Protocole", "Portée", "Débit", "Consommation", "Cas d'usage"],
              rows: [
                ["MQTT", "Illimitée (IP)", "Variable", "Modérée", "Médecine, industrie, domotique"],
                ["CoAP", "Illimitée (IP)", "Faible", "Faible", "Capteurs contraints"],
                ["LoRaWAN", "15 km", "0,3-50 kbps", "Très faible", "Smart cities"],
                ["Zigbee", "10-100 m", "250 kbps", "Faible", "Domotique"],
                ["BLE", "10-100 m", "1-2 Mbps", "Très faible", "Wearables"],
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Sécurité des protocoles IoT", v: "Risques : écoute passive (sniffing), attaques par déni de service (DDoS), failles de chiffrement. Solutions : chiffrement de bout en bout (TLS/DTLS pour MQTT/CoAP), authentification des dispositifs (certificats X.509), mises à jour régulières des firmware." },
              ],
            },
          ],
        },
        {
          heading: "Topologies de réseaux IoMT",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Enjeux IoMT", v: "Sécurité (RGPD, HIPAA), fiabilité (aucune tolérance aux pannes pour les applications critiques : pacemakers), latence ultra-faible (télémédecine, chirurgie assistée)." },
                { k: "Topologie en Étoile (Star)", v: "Tous les dispositifs se connectent à un nœud central (passerelle, serveur hospitalier). Usages : surveillance centralisée des patients dans une chambre, dispositifs portables (glucomètre → smartphone). Avantages : simplicité de gestion, faible latence. Inconvénients : dépendance à la passerelle centrale (panne critique). Protocoles : BLE pour les wearables, Wi-Fi pour les équipements fixes." },
                { k: "Topologie en Maillage (Mesh)", v: "Les dispositifs communiquent entre eux pour assurer la redondance. Usages : bloc opératoire intelligent (capteurs vitaux, robots chirurgicaux, moniteurs), réseaux de capteurs corporels BAN (patchs connectés communiquant entre eux). Avantages : tolérance aux pannes (pas de point unique de défaillance), couverture étendue. Inconvénients : consommation énergétique élevée (problématique pour les implants). Protocoles : Zigbee ou Thread pour les réseaux corporels, WirelessHART pour l'industrie médicale." },
                { k: "Topologie Hybride (Étoile + Maillage)", v: "Combinaison de sous-réseaux en étoile (salles d'hôpital) et d'une dorsale maillée. Usages : hôpital intelligent (capteurs en étoile dans chaque chambre → passerelles connectées en maillage), télémédecine rurale (capteurs en étoile dans un village → relais maillés vers l'hôpital). Avantages : équilibre entre simplicité et redondance. Inconvénients : complexité de configuration/gestion, maintenance difficile, coût élevé, consommation accrue, latence variable. Protocoles : LoRaWAN pour la dorsale longue portée, MQTT pour l'échange de données vers le cloud." },
                { k: "Topologie en Bus (Modbus/CAN)", v: "Dispositifs connectés sur un bus de communication partagé. Usages : équipements fixes (analyseurs de sang en laboratoire), ambulances intelligentes (réseau CAN reliant les capteurs de vie au système de communication). Avantages : câblage simplifié. Inconvénients : risque de collision de données (inadapté aux applications critiques)." },
                { k: "Études de cas", v: "A) Réseau maillé pour la surveillance post-opératoire : capteurs sans fil (ECG, SpO₂, pression artérielle), Zigbee + TLS pour le chiffrement → réduction de 30 % des complications grâce aux alertes temps réel. B) Réseau en étoile pour les dispositifs implantables : pacemaker connecté (Medtronic), communication en étoile vers une passerelle portable, chiffrement AES-256 contre les piratages." },
              ],
            },
          ],
        },
        {
          heading: "Protocoles série : UART, SPI, I2C, 1-Wire, CAN",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Série vs parallèle", v: "Série : transmission bit par bit sur un seul fil (ex. UART). Parallèle : transmission simultanée sur plusieurs fils (ex. bus PCI). Avantages de la série : coût réduit, simplicité de câblage, adaptée aux longues distances." },
              ],
            },
            {
              type: "table",
              headers: ["Protocole", "Principe", "Utilisation", "Avantages", "Inconvénients"],
              rows: [
                ["UART (asynchrone, sans horloge)", "Trame : bit de start (0), données (5-9 bits), bit de parité (optionnel), bits de stop (1) ; baud rate (9600, 115200 bauds). Standards : RS-232 (industriel, ±3 à ±15V), RS-485 (différentiel, longues distances jusqu'à 1200 m)", "Communication entre microcontrôleurs, modules GPS, Bluetooth", "Simple, universel", "Pas de détection d'erreur (sans parité), distance limitée"],
                ["SPI (synchrone, avec horloge)", "Horloge partagée (SCK) ; maître/esclave ; fils : MOSI (Master Out Slave In), MISO (Master In Slave Out), SS (Slave Select) ; full-duplex", "Mémoires (EEPROM, Flash), écrans LCD, capteurs haute vitesse", "Débit élevé (jusqu'à 100 Mbps), flexible", "Nombreux fils (4 minimum), pas de gestion native des erreurs"],
                ["I2C (synchrone)", "Horloge partagée (SCL) + données bidirectionnelles (SDA) ; adressage 7 ou 10 bits des esclaves ; trame : Start bit → adresse esclave → données → stop bit ; les résistances améliorent l'impédance et la longueur de la ligne", "Capteurs (température, pression), RTC (Real-Time Clock)", "2 fils seulement, multi-esclaves", "Débit modéré (400 kHz standard, 5 MHz Ultra Fast Mode)"],
                ["1-Wire", "Single-wire : communication + alimentation sur un seul fil (DQ) ; adressage unique : ROM ID 64 bits par périphérique", "Capteurs Dallas (DS18B20), systèmes de sécurité", "Câblage minimal, idéal réseaux de capteurs", "Débit très lent (15 kbps), complexité logicielle"],
                ["CAN (Controller Area Network)", "Réseau différentiel (CAN_H et CAN_L) pour environnements bruyants ; gestion des collisions : priorité des messages par ID", "Automobile, industrie (automates)", "Robustesse, tolérance aux pannes", "Complexité matérielle"],
              ],
            },
            {
              type: "table",
              headers: ["Protocole", "Vitesse", "Fils", "Topologie", "Applications"],
              rows: [
                ["UART", "9600 – 4 Mbps", "2 (TX/RX)", "Point-à-point", "Modules sans fil"],
                ["SPI", "1 – 100 Mbps", "4+", "Maître/esclave", "Mémoires, écrans"],
                ["I2C", "1 – 10 Mbps", "2", "Bus", "Capteurs, RTC"],
                ["1-Wire", "15 kbps", "1", "Bus", "Capteurs Dallas"],
                ["CAN", "1 Mbps", "2", "Bus", "Automobile, industrie"],
              ],
            },
            {
              type: "code",
              lang: "cpp",
              code: "// Communication UART avec Arduino\nvoid setup() {\n  Serial.begin(9600);            // Initialisation UART à 9600 bauds\n}\nvoid loop() {\n  Serial.println(\"Hello, World!\");\n  delay(1000);\n}\n\n// Lecture d'un capteur I2C (BME280)\n#include <Wire.h>\n#include <Adafruit_BME280.h>\nAdafruit_BME280 bme;\nvoid setup() {\n  Wire.begin();                  // Initialisation I2C\n  bme.begin(0x76);               // adresse I2C du capteur\n}\nvoid loop() {\n  float temp = bme.readTemperature();\n  delay(1000);\n}",
            },
            {
              type: "kv",
              items: [
                { k: "Bonnes pratiques", v: "UART : vérifier le baud rate et les bits de stop/parité. SPI : configurer le mode (CPOL/CPHA) correctement. I2C : ajouter des résistances de pull-up (4,7 kΩ sur SDA/SCL). 1-Wire : utiliser des bibliothèques dédiées (OneWire)." },
                { k: "Problèmes courants", v: "Données corrompues : bruit électrique (utiliser des câbles blindés). Périphérique non détecté : adresse I2C incorrecte (scanner avec i2cdetect)." },
                { k: "Application : bracelet médical connecté (ESP32 + MAX30100 + OLED)", v: "Selon le pinout ESP32 : SCL = D22 et SDA = D21. Connexions : ESP32 D22 → MAX30100 SCL ; ESP32 D21 → MAX30100 SDA ; ESP32 GND → MAX30100 GND ; ESP32 3.3V → MAX30100 VIN ; OLED VDD → ESP32 3.3V ; OLED GND → ESP32 GND ; OLED SCL → ESP32 D22 ; OLED SDA → ESP32 D21." },
                { k: "Saisie sur écran OLED SSD1306", v: "Majuscules, caractères spéciaux et numériques ; validation : effacer le dernier caractère, effacer la totalité de la saisie, valider ou annuler la sélection." },
                { k: "Capacitif tactile ESP32", v: "Les 10 broches détectant un contact avec le doigt : GPIO 0, 2, 4, 12, 13, 14, 15, 27, 32 et 33. Pour lire l'état du GPIO 32 : touchRead(32) ou touchRead(T9) — même résultat." },
              ],
            },
          ],
        },
        {
          heading: "Futur et synthèse",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Futur et tendances", v: "Nanorobots connectés (administration ciblée de médicaments), IA prédictive (anticipation des crises d'épilepsie), réalité augmentée (chirurgie assistée : Google Glass), blockchain (sécurisation des dossiers médicaux), 5G/6G (latence ultra-faible), Edge Computing (traitement local), IA intégrée (analyse temps réel). L'IoMT révolutionne la médecine : prévention, précision, accessibilité." },
                { k: "Citation", v: "« L'IoT médical ne remplace pas les médecins, mais leur donne des super-pouvoirs. »" },
                { k: "Synthèse", v: "Avantages : efficacité, automatisation, données en temps réel. Risques : sécurité, dépendance technologique, impact environnemental. « L'IoT n'est pas une technologie, mais un écosystème. » (Kevin Ashton)" },
                { k: "Ressources", v: "Simulateurs : Arduino IoT Cloud, Node-RED. Documentaires : « Lo and Behold » (R. Herzog). Livres : The Fourth Industrial Revolution (K. Schwab), Making Embedded Systems (E. White), Healthcare 4.0, IoT in Medicine. Études : WHO, Deloitte, Journal of Medical IoT. Sites : FDA, fabricants (Medtronic, Abbott)." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "i2",
      title: "Partie II — Matériel et logiciel pour l'IoT",
      summary: "Capteurs/actionneurs, microcontrôleurs et micro-ordinateurs, écosystème logiciel, projet tutoré (micro-jardinage), Arduino Uno, ESP8266/ESP32, MQTT et brokers.",
      sections: [
        {
          heading: "Matériel : capteurs, actionneurs, microcontrôleurs",
          blocks: [
            {
              type: "p",
              text: "Un objet IoT est divisé en deux parties : matériel et logiciel. Le matériel est fait de composants électroniques (ou électriques) et composé de 3 parties : 1) capteurs/actionneurs, 2) microcontrôleur ou micro-ordinateur, 3) connexion réseau.",
            },
            {
              type: "kv",
              items: [
                { k: "Capteur", v: "Dispositif qui transforme un phénomène physique en un signal électrique. Exemple : chaleur, humidité, lumière…" },
                { k: "Actionneur", v: "Dispositif qui transforme le signal électrique en un phénomène physique (le contraire d'un capteur). Il en existe des centaines, voire des milliers : du capteur de température au capteur de force, du moteur à la lampe." },
                { k: "Critères de choix capteur/actionneur", v: "Tension et courant de fonctionnement, précision, protocole de communication utilisé, phénomène physique à capter ou générer, le prix. Le choix est toujours guidé par l'idée du projet (le cahier des charges)." },
              ],
            },
            {
              type: "table",
              headers: ["Capteur d'humidité", "Prix", "Tension/courant", "Précision", "Protocole"],
              rows: [
                ["DHT11", "15DT", "3,3 à 6 V", "± 5 %", "OneWire"],
                ["DHT22", "28DT", "3,3 à 6 V", "± 2 %", "OneWire"],
                ["HIH-4030", "45DT", "4 à 5,8 V", "± 3,5 %", "Analogique"],
                ["Si7021", "24DT", "1,9 à 3,6 V", "± 3 %", "I2C"],
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: "Choix du capteur d'humidité",
              text: "Précision → DHT22. Bas prix → DHT11. Production de masse → précision recommandée. Domaine de la santé → la précision prime devant le prix.",
            },
            {
              type: "table",
              headers: ["Actionneur (moteurs)", "Prix", "Tension/courant", "Vitesse", "Masse", "Protocole"],
              rows: [
                ["DG01D:48:1 motoréducteur", "15DT", "4,5V/250mA", "140 RPM", "30g", "Digital control/normal"],
                ["SM-428YG011-25 moteur pas à pas", "30DT", "12v/330mA", "9 RPM", "20g", "Digital control/normal"],
                ["Parallax Continuous Rotation Servo", "60DT", "4 à 6 v/140mA", "50 RPM", "42,5g", "Digital control/PWM"],
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: "Choix pour un robot véhicule (4 moteurs, 5V)",
              text: "Le motoréducteur DG01D:48:1 est le mieux adapté : vitesse de rotation élevée, bas prix, 5V, faible masse. On ne cherche pas la précision mais la vitesse et la légèreté.",
            },
            {
              type: "kv",
              items: [
                { k: "Microcontrôleur", v: "Équipé de plusieurs ports de connexion, microprocesseur, RAM et ROM — à la différence d'un ordinateur, ses ressources sont très limitées : petites opérations. Utile pour l'acquisition et le traitement des données des capteurs et le contrôle des actionneurs. Il lui faut un programme informatique pour fonctionner." },
                { k: "Choix du microcontrôleur", v: "Nombre de ports d'acquisition de données et de contrôle, puissance de calcul et taille de la mémoire, tension de fonctionnement et consommation d'énergie, protocoles de communication, langage de programmation supporté, le prix." },
                { k: "Micro-ordinateur", v: "Puissance de calcul et mémoire proches des ordinateurs (certains l'utilisent comme ordinateur de bureau) ; doté d'un système d'exploitation (Linux la majeure partie du temps) ; souvent utilisé pour concevoir une passerelle (gateway) ; équipé des connectiques pour accéder à Internet ; utilisé pour recevoir des données des capteurs et les envoyer au serveur cloud. Choix : puissance/mémoire, OS, nombre de ports, prix." },
                { k: "NB", v: "Les micro-ordinateurs peuvent être utilisés pour acquérir des données comme les microcontrôleurs (mais le contraire est rarement vrai)." },
              ],
            },
          ],
        },
        {
          heading: "Logiciel (software)",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Langages embarqués", v: "Arduino (C/C++), micropython, java, javascript — pas de limite de langage, le problème est que les librairies peuvent ne pas exister pour certains langages." },
                { k: "Logiciels à installer", v: "Arduino IDE, Eclipse, Codeblock, PlatformIO (Atom, Vscode, Vscodium)." },
                { k: "Plateforme de simulation", v: "Wokwi (https://wokwi.com/)." },
                { k: "Cloud", v: "Services en ligne : Amazon Web Services (AWS), Microsoft Azure, IBM Cloud, ThingSpeak… On peut aussi transformer la carte Raspberry Pi en serveur et installer des services : Node-RED, Blynk, Mozilla WebThings, ioBroker." },
                { k: "Serveur from scratch", v: "HTML, CSS, Javascript, Python/Django, MySQL, MongoDB, PHP, Apache." },
                { k: "OS pour micro-ordinateur (distributions Linux)", v: "Raspbian, Ubuntu Core, Ubuntu Server, Windows IoT Core, RaspBSD, Domoticz, Arch Linux ARM." },
                { k: "Application (visualisation et contrôle)", v: "Services/applications prêtes : ThingSpeak, MQTT Dash… Applications à créer : web = HTML, CSS, JavaScript, PHP, Apache ; mobile = Java, Flutter, Swift, AppInventor (très bien pour les débutants). Comme sur le matériel, le choix des technologies réside dans le projet et son cahier des charges : choisir des technologies faciles à maintenir." },
              ],
            },
          ],
        },
        {
          heading: "Projet tutoré : table de micro-jardinage automatisée",
          blocks: [
            {
              type: "p",
              text: "Cahier des charges : le client veut automatiser sa table de micro-jardinage — auto-arrosage, envoi des informations du climat sur son smartphone, enregistrement dans une base de données, contrôle de la pompe, fonctionnement entre 3,3V et 5V, autonomie énergétique avec panneau solaire, terrasse, réception des données via Wi-Fi.",
            },
            {
              type: "kv",
              items: [
                { k: "Capteurs", v: "DHT11 (température et humidité — protocole OneWire, tension 5V), Photorésistance (taux de luminosité — analogique, 3,3 à 5V), Capacitive Soil Moisture (humidité du sol — analogique, 3,3 à 5V)." },
                { k: "Actionneurs", v: "Pompe (arrosage, 5V), Relais (actionne la pompe — digital, 5V)." },
                { k: "Microcontrôleur : ESP32", v: "L'ESP32 est le grand frère du NodeMCU (ESP8266) qui n'avait qu'un port analogique alors qu'on a besoin de 2 ports analogiques. Il intègre le Wi-Fi (pas besoin de shield), fonctionne entre 3,3V et 5V — c'est l'idéal. Besoin de 4 ports supportant OneWire, analogique, digital." },
                { k: "Passerelle (gateway) : Raspberry Pi Zero W", v: "Bonnes performances, Linux comme OS, faible consommation, coût pas cher." },
                { k: "Cloud (serveur)", v: "Node-RED, Mosquitto (protocole MQTT), MongoDB (base de données). NB : le Raspberry peut jouer 2 rôles — passerelle ET serveur local. Node-RED est très efficace et consomme peu (plugins d'analyse/traitement de données, sauvegarde en base, visualisation)." },
                { k: "Application", v: "Node-RED dashboard (graphes et jauges dans le navigateur), MQTT Dash (alternative mobile : voir les données et déclencher l'arrosage depuis le smartphone)." },
              ],
            },
          ],
        },
        {
          heading: "Initiation Arduino Uno",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Arduino", v: "Plate-forme de prototypage électronique open source basée sur du matériel et des logiciels flexibles et faciles à utiliser. Ports GPIO (General Purpose Input/Output), bus SPI (Serial Peripheral Interface), PWM (modulation de largeur d'impulsion), bus I²C (Inter-Integrated Circuit), ICSP (In Circuit Serial Programming), MISO (Master In/Slave Out), SS (Slave Select)." },
                { k: "Versions et microcontrôleurs", v: "Cartes : UNO, Mega2560, Mini, Nano, LilyPad, Fio, Pro… Microcontrôleurs Atmel AVR : Mega328, Mega1280, Mega4809…" },
                { k: "Modules (shields)", v: "Module Ethernet, Module Dragino LoRa Shield, Module Moteur, module GPS (Sparkfun), module SIM900 GSM GPRS Shield, module Bluetooth HC05, etc." },
                { k: "Arduino IDE", v: "Permet d'éditer, vérifier, compiler (verify/compile) et charger (upload) le firmware dans la mémoire du microcontrôleur ; de dialoguer avec la carte pendant le fonctionnement (serial monitor) ; fournit des bibliothèques. Sélectionner la liaison série COM_XX (menu Tools/serial_port). Site : https://www.arduino.cc/en/Main/Software." },
                { k: "Programme Arduino", v: "Constitué au minimum de 2 fonctions : void setup() (initialisation des E/S du microcontrôleur) et void loop() (contient les instructions, exécuté indéfiniment)." },
              ],
            },
            {
              type: "code",
              lang: "cpp",
              code: "// Programme Blink : fait clignoter la LED reliée au pin digital 13\n// (vérifie qu'une carte Arduino fonctionne bien)\nvoid setup() {\n  pinMode(13, OUTPUT);            // pin 13 (LED) en sortie\n}\nvoid loop() {\n  digitalWrite(13, HIGH);         // état HAUT (5V) → LED allumée\n  delay(500);                     // pause 500 ms\n  digitalWrite(13, LOW);          // état BAS (0V) → LED éteinte\n  delay(500);\n}",
            },
            {
              type: "kv",
              items: [
                { k: "Liaison série PC ↔ Arduino", v: "Protocole de communication entre le PC et la carte via le câble USB (moniteur série : la loupe en haut à droite). 9600 baud = fréquence de transmission du moniteur série. Serial.begin(9600) dans setup() pour activer/configurer ; Serial.print(\"…\") pour envoyer un message." },
                { k: "Plaque d'essai (breadboard)", v: "Permet de relier facilement les composants entre eux. Deux zones : les bandes de chaque côté (on branche le VCC et le GND) et la zone centrale (on branche les composants entre eux). Chaque trait de couleur représente un ensemble de trous reliés entre eux." },
              ],
            },
            {
              type: "code",
              lang: "cpp",
              code: "// Liaison série : envoi et réception\nvoid setup() {\n  Serial.begin(9600);                              // initialise le moniteur à 9600 bauds\n  Serial.print(\"Hello les makers \");\n  Serial.println(\" j'espère que ce tutoriel vous plaît: \");\n}\nvoid loop() {\n  if (Serial.available()) {                        // si un message a été reçu\n    Serial.println(Serial.readString());           // lit le message reçu et l'affiche\n  }\n}\n\n// Objet IoT 1 : capteur de température LM35 (analogique)\n// Alimenter VCC et GND ; brancher la patte centrale à une entrée analogique.\n// Plage : -55°C à +150°C. Lecture : 10 mV ≡ 1°C.\n// La lecture analogique de 0 à 5V est codée de 0 à 1023.\nfloat temp;\nvoid setup() { Serial.begin(9600); }\nvoid loop() {\n  temp = analogRead(A0) * (5.0 / 1023.0 * 100.0);  // Temp = Volt*(5/1023)*100\n  Serial.println(temp);\n  delay(1000);\n}",
            },
            {
              type: "kv",
              items: [
                { k: "Objet IoT 2 : contrôle d'accès RFID (MFRC522)", v: "Module RFID-RC522 relié à l'Arduino : VCC→3.3V, RST→9, GND→GND, MISO→12, MOSI→11, SCK→13, NSS→10. Installer la bibliothèque MFRC522 (Croquis → Inclure une bibliothèque → Gérer les bibliothèques → rechercher « MFRC522 »)." },
                { k: "Servomoteur (microservo 9G)", v: "Moteur tournant avec une liberté de 180° gardant précisément l'angle de rotation ; contrôle des systèmes mécaniques (gouverne d'avion, accélérateur, mini-robots…). Un circuit électronique contrôle un moteur à courant continu selon la position d'un potentiomètre intégré. Consigne transmise par impulsion numérique PWM : toutes les 20 ms (50 Hz), une impulsion de 1 à 2 ms — 1 ms = 0°, 2 ms = 180°, impulsion intermédiaire = angle différent. Attention à la consommation électrique : câbler à une alimentation 5V dédiée. Bibliothèque Servo : contrôle jusqu'à 12 servomoteurs simultanément ; rend inutilisables les broches D9 et D10 en PWM avec analogWrite(). Exemple : for (int position = 0; position <= 180; position++) { monServomoteur.write(position); delay(15); }" },
                { k: "Contrôle d'accès RFID + servo", v: "Le programme lit l'UID de la carte (mfrc522.uid), compare le contenu (« D8 4B 12 22 » → accès débloqué : servo à -90°, LED verte, puis retour ; « 87 4B DC 8A » → accès refusé : LED rouge clignotante)." },
                { k: "Objets IoT connectés : Shield GSM/GPRS", v: "Programme d'envoi d'un SMS toutes les heures : bibliothèques SIM900.h, SoftwareSerial.h, sms.h ; gsm.begin(2400) (shield ITEA), sms.SendSMS(num_tph, \"message\") ; delay(3600000) = 1 heure. Carte SIM sans code pin." },
              ],
            },
          ],
        },
        {
          heading: "ESP8266, Wi-Fi et ESP32",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Module Wi-Fi ESP8266 (ESP-01)", v: "Réseau Wi-Fi complet où on se connecte en tant qu'adaptateur Wi-Fi de service, grâce à sa connectivité via la communication série ou l'interface UART. Programmable avec les commandes AT (ATtention), le code Arduino ou le micrologiciel python." },
                { k: "Commandes AT", v: "AT+RST (restart module), AT+CWMODE (wifi mode), AT+CWJAP (join AP), AT+CWLAP (list AP), AT+CWQAP (quit AP), AT+CIPSTATUS (get status), AT+CIPSTART (set up TCP/UDP), AT+CIPSEND (send data), AT+CIPCLOSE (close TCP/UDP), AT+CIFSR (get IP), AT+CIPMUX (multiple connections), AT+CIPSERVER (set as server)." },
                { k: "Attention", v: "Sur le web, de nombreuses informations sur l'ESP8266 sont périmées ou fausses." },
                { k: "Connexion ESP8266 ↔ Arduino (init manuelle)", v: "L'ESP8266 n'est strictement alimenté qu'en 3,3 V. Câblage : ESP GND→GND, VIN→3.3v, ENABLE→3.3v, TX→RX, RX→TX. Téléverser le sketch Blink pour allouer la liaison série ; régler le terminal pour envoyer CR et LF en fin de ligne, débit 115200 baud ; puis : AT+RST (remise à zéro), AT+CWMODE=3 (3 : mode Client/Serveur, 2 : mode AP), AT+CWLAP (lister les points d'accès), AT+CWJAP=\"nom du réseau\",\"mot de passe\" (connexion Wi-Fi), AT+CIFSR (connaître l'IP de l'ESP)." },
                { k: "Init automatique (méthode 2)", v: "Il faut au minimum deux serials hardware (un pour le PC, un pour l'ESP) → solution : utiliser les GPIO 10 et 11 : SoftwareSerial ESP8266(10, 11); puis ESP8266.begin(115200) pour la 2e communication série. ESP8266.println(\"AT+RST\") envoie une commande AT ; Serial.print(ESP8266.read()) lit la réponse caractère par caractère. Application : contrôle à distance des LEDs — l'ESP démarre en mode Point d'Accès, on s'y connecte avec un smartphone ; environnement de développement RemoteXY." },
                { k: "Modes Wi-Fi de l'ESP8266", v: "Mode station (STA) : les appareils qui se connectent aux réseaux Wi-Fi sont des stations ; la connexion est assurée par un point d'accès (AP) qui fait office de concentrateur et est connecté à un réseau câblé (avec routeur pour Internet). Chaque AP est reconnu par un SSID (nom du réseau). En cas de perte/redémarrage, l'ESP8266 se reconnecte automatiquement au dernier AP (infos en mémoire flash). Mode station + AP logiciel (soft-AP) : l'ESP8266 peut établir son propre réseau Wi-Fi et connecter d'autres stations ; peut fonctionner à la fois comme station et soft-AP → possibilité de construire des réseaux maillés. Nombre maximum de stations connectées au soft-AP : 4 par défaut (réglable de 0 à 8)." },
                { k: "Client/Serveur", v: "La classe Client crée des clients qui accèdent aux services fournis par les serveurs (envoyer, recevoir, traiter des données). La classe Server crée des serveurs qui fournissent des fonctionnalités aux clients." },
                { k: "Application IoT-2 : station météo avec ThingSpeak", v: "Station météo (humidité et température) avec Arduino + DHT11 (GPIO 12) + ESP8266 (Tx/Rx sur GPIO 2 et 3, bibliothèque Software Serial). ThingSpeak = service Cloud gratuit de surveillance et contrôle à distance. Étapes : créer un compte → « New Channel » → cocher Field 1 et 2 (« Humidity », « Temperature »), rendre public → onglet API Key : récupérer la clé d'écriture (api_key) → Data Import/Export : copier l'URL « Update Channel Feed GET Request » (https://api.thingspeak.com/update?api_key=XXXXX&field1=0) → côté code : http Get avec postUrl pour envoyer les données → test navigateur : ...update?api_key=XXXXX&field1=31 → la valeur 31 s'affiche dans le graphe (Private View) → application Virtuino (Google Play) pour recevoir les graphiques sur smartphone." },
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Application IoT-3 : smart farming (agriculture connectée)", v: "Un agriculteur cultive sur un champ de 5 km² : système Wi-Fi de surveillance de température et d'humidité, indépendant, autonome, sans fils. Solution : réseau Wi-Fi ESP8266 en topologie hybride (étoile-maillé) — diviser le champ en 4 zones ; dans chaque zone, un sous-réseau de 9 ESP8266 ; boîtier central (central Box) au centre : 1 ESP8266 + 1 Arduino Uno + 1 module GPRS. Dans chaque sous-réseau : 3 ESP répéteurs de signaux (middleman) + 6 ESP pour la lecture des capteurs (workers)." },
                { k: "Programmation des workers", v: "Les 6 workers sont la plupart du temps en DEEP_SLEEP et se réveillent à 1 heure d'intervalle pour lire les capteurs ; chaque worker se réveille, lit les capteurs, se connecte à l'AP ESP le plus proche et envoie une requête HTTP avec les données ; si l'AP le plus proche est indisponible, les workers conservent jusqu'à 10 lectures en mémoire interne et les envoient quand l'AP est réveillé ; alimentation : 4 piles Li-Ion 3,3 V en parallèle, chargées par panneaux solaires 15 V ; capteurs à 1 fil." },
                { k: "Programmation des middleman", v: "Écoutent et reçoivent les lectures des workers, puis les envoient au middleman suivant jusqu'à l'ESP du central Box ; configurés à la fois en AP/ST avec un serveur Web démarré en attente des requêtes. Les workers (clients) utilisent des adresses IP statiques pour réduire le temps de connexion à l'AP." },
                { k: "Central Box", v: "Reçoit et traite les données des middleman les plus proches, les envoie dans une base de données MySQL via le module GPRS au format JSON/XML, une fois par jour. Les données reçues (chaque heure) peuvent être stockées (format CSV) sur une carte SD attachée à l'Arduino UNO. Les ESP central et middleman sont programmés comme agents de découverte : requêtes PING vers les AP à proximité pour vérifier la disponibilité, envoyer l'état et les mesures à la base." },
              ],
            },
            {
              type: "kv",
              items: [
                { k: "ESP32 (évolution de l'ESP8266)", v: "Intègre la gestion du Wi-Fi ET du Bluetooth ; apprécié dans l'IoT. Développement : Esplorer (ESP-IDF : Espressif IoT Development Framework). Connexion : câble micro-USB, valider le port COM (Outils/Port). Dans Fichier/Préférences → URL de gestionnaire de cartes supplémentaires : https://dl.espressif.com/dl/package_esp32_index.json." },
                { k: "Paramètres IDE Arduino pour ESP32", v: "Type de carte : ESP32 Dev Module ; Upload Speed : 115200 ; CPU Frequency : 240MHz (WIFI/BT) ; Flash Frequency : 80MHz ; Flash Mode : QIO ; Flash Size : 4MB (32Mb) ; Partition scheme : Default 4MB with spiffs (1.2MB APP/1.5MB SPIFFS) ; Core Debug Level : Rien ; PSRAM : Disabled ; Port : COM4." },
                { k: "Vérification : Blink", v: "int Led=1 (pin1) ; pinMode(Led, OUTPUT) ; digitalWrite HIGH/LOW avec delay(1000). Lorsque l'IDE affiche « Connecting... », appuyer 2-3 secondes sur le bouton [BOOT] de l'ESP32 pour démarrer le téléversement." },
                { k: "Vérification Wi-Fi", v: "Sketch Fichier/Exemples (ESP32 Dev Modules)/Wifi/WifiScan : WiFi.mode(WIFI_STA), WiFi.disconnect(), puis int n = WiFi.scanNetworks() — affiche le nombre de réseaux, SSID, RSSI et le type de chiffrement. Connexion à un réseau : WiFi.begin(ssid, pwd) avec boucle while (WiFi.status() != WL_CONNECTED), puis WiFi.localIP()." },
                { k: "Serveur Web simple sur ESP32", v: "Bibliothèque WebServer.h : WebServer server(80) ; server.on(\"/\", deal_onConnect) ; server.on(\"/test\", deal_aTest) ; server.on(\"/temps\", deal_temperatures) ; server.onNotFound(deal_notFound) ; server.begin() ; dans loop : server.handleClient(). Réponses : server.send(200, \"text/html\", SendHTML(\"…\")). Accès : http://192.168.1.7/test." },
              ],
            },
          ],
        },
        {
          heading: "MQTT : envoi de messages et brokers",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Application IoT-4 : envoi d'un message MQTT", v: "Envoyer un message MQTT avec l'ESP32 vers un smartphone Android via le cloud. À la place de l'ESP32 : Arduino + ESP8266. Fonctionnement MQTT (Message Queue Telemetry Transport) : protocole simple, ne nécessitant pas beaucoup de puissance de traitement ni de bande passante. Trois rôles : Publisher (éditeur : envoie des messages), Broker (serveur MQTT à mi-chemin : gestion des échanges), Subscriber (abonné : lit les messages envoyés par le Publisher)." },
                { k: "Broker utilisé", v: "iot.eclipse.org (gratuit). Il existe aussi des brokers payants et on peut créer un broker interne avec une carte Raspberry Pi." },
                { k: "En Java/Arduino IDE", v: "Installer la carte ESP32 (URL gestionnaire : https://dl.espressif.com/dl/package_esp32_index.json → Outils → Carte → Gestionnaire de carte → installer ESP32). Installer la bibliothèque PubSubClient (communication MQTT) : Croquis → Ajouter une bibliothèque → Gérer les bibliothèques → Installer. Le programme se connecte au Wi-Fi et au serveur MQTT (mqtt.eclipse.org) et envoie des messages à des intervalles de 30 secondes." },
                { k: "Réception sur smartphone", v: "Application MyMQTT (Google Play) : Settings → entrer iot.eclipse.org → Save → Subscribe → entrer le topic (ex. LSI3IOT) → Add → Dashboard : suivre la réception des messages MQTT envoyés par l'ESP32. Il est possible d'envoyer des commandes du smartphone vers l'ESP32." },
                { k: "Code clé", v: "WiFiClient espClient; PubSubClient client(espClient); client.setServer(mqttServer, mqttPort); client.connect(\"ESP32Client\", mqttUser, mqttPassword); client.publish(\"LSI3IOT\", message);" },
              ],
            },
            {
              type: "table",
              headers: ["Broker open source", "Particularité"],
              rows: [
                ["ActiveMQ", "Permet d'ajouter MQTT à un serveur Web Apache (assez spécifique)"],
                ["JoramMQ", "Intégration de MQTT en Java (assez spécifique)"],
                ["Mosquitto", "Le plus utilisé dans les projets DIY, soutenu par la fondation eclipse.org ; disponible sur toutes les plateformes, s'installe en quelques minutes — très bon choix"],
                ["RabbitMQ", "Disponible avec un support commercial, plus orienté entreprise"],
                ["EMQTT", "Conçu pour recevoir de nombreuses connexions (jusqu'à 1 million par serveur) ; cluster possible pour accroître le nombre de connexions simultanées"],
              ],
            },
            {
              type: "table",
              headers: ["Broker gratuit (tests/prototypage)", "Port", "Type"],
              rows: [
                ["iot.eclipse.org", "1883, 80 (WebSockets)", "mosquitto"],
                ["test.mosquitto.org", "1883, 8883 (SSL), 8884 (SSL), 80 (WebSockets)", "mosquitto"],
                ["dev.rabbitmq.com", "1883", "rabbitmq"],
                ["broker.mqttdashboard.com", "1883, 8000 (WebSockets)", "HiveMQ"],
                ["q.m2m.io", "1883", "m2m.io (signup)"],
                ["www.cloudmqtt.com", "18443, 28443 (SSL)", "mosquitto (plan gratuit)"],
                ["mqtt.simpleml.com", "1883, 8883 (MQTT+SSL), 80 (REST/WebSockets), 5683 (CoAP)", "SimpleML"],
                ["mqtt.kgbvax.net", "1883", "mosquitto (instance partagée)"],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "i3",
      title: "Partie III — Applications IoT via Raspberry Pi",
      summary: "Prise en main du Raspberry Pi, GPIO en Python, DS18B20, HC-SR04, communication Arduino↔Raspberry, Node-RED, caméra, streaming, webcam, serveur web, MQTT avec Mosquitto.",
      sections: [
        {
          heading: "Bien débuter sur le Raspberry Pi",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "OS", v: "Le Raspberry Pi charge son système d'exploitation à partir du lecteur de carte micro SD. Raspberry Pi OS (https://www.raspberrypi.org/software/) simplifie l'installation : « See all download options » → deux configurations : OS with desktop ou OS Lite (image avec ou sans interface graphique). Pour installer : copier les fichiers décompressés sur la carte SD formatée en FAT32 (avec Balena Etcher pour la partition/validation). Premier démarrage : écran HDMI, clavier, souris." },
                { k: "Bureau à distance depuis un PC Windows", v: "Côté Raspberry : installer les outils de bureau à distance pour Linux — xrdp et tightvncserver (sudo apt-get install tightvncserver ; sudo apt-get install xrdp). Côté Windows : lancer « Connexion Bureau à distance », entrer l'adresse IP du Raspberry (ifconfig), se connecter avec les identifiants par défaut pi / raspberry." },
                { k: "Autres outils utiles (caméra/webcam)", v: "SSH : accéder à distance au Raspberry Pi via le réseau local. SCP : copier via SSH des photos prises par le Pi vers un ordinateur principal. rsync : synchroniser les dossiers de photos entre Pi et ordinateur. cron : planifier la prise d'une photo à un intervalle donné (ex. chaque minute pour un timelapse)." },
              ],
            },
          ],
        },
        {
          heading: "Python, LED et sonde de température DS18B20",
          blocks: [
            {
              type: "code",
              lang: "python",
              code: "# Créer et exécuter un programme Python : sudo nano led.py puis sudo python led.py\nimport RPi.GPIO as GPIO     # librairie qui gère les ports\nimport time                 # librairie temps\nGPIO.setmode(GPIO.BCM)      # BCM : numérotation des GPIO (GPIO 18)\nGPIO.setup(18, GPIO.OUT)    # port en sortie\nGPIO.setwarnings(False)     # désactiver les alertes\n\n# Branchement LED : résistance ~100Ω entre GPIO18 et la LED, retour GND\nnbrBlink = int(input(\"Combien de fois la LED doit clignoter ?\\n\"))\ntempsAllume = int(input(\"Combien de temps doit-elle rester allumée ?\\n\"))\ntempsEteint = int(input(\"Combien de temps doit-elle rester éteinte ?\\n\"))\ni = 0\nwhile i < nbrBlink:\n    GPIO.output(18, True)       # GPIO 18 à 1 (+5V)\n    time.sleep(tempsAllume)\n    GPIO.output(18, False)      # GPIO 18 à 0 (GND)\n    time.sleep(tempsEteint)\n    i = i + 1\nGPIO.cleanup()",
            },
            {
              type: "kv",
              items: [
                { k: "Lire la température avec une sonde DS18B20 (1-Wire)", v: "Brancher la sonde puis lire par commande : sudo modprobe w1-gpio ; sudo modprobe w1-therm ; cd /sys/bus/w1/devices/ ; ls ; cd 28-xxxxxxxxxx ; cat w1_slave (remplacer les x par le numéro donné par le Raspberry)." },
                { k: "Sonde non détectée ?", v: "Ajouter dans /etc/modules : w1-therm et w1-gpio pullup=1 (sudo nano /etc/modules). Ajouter dans /boot/config.txt : dtoverlay=w1-gpio. Redémarrer le Raspberry Pi." },
                { k: "Script Python de lecture", v: "lireFichier(emplacement) ouvre/lit/ferme le fichier w1_slave ; recupTemp(contenuFich) prend la seconde ligne, le champ 9, retire le « t= », divise par 1000 → température au millième." },
                { k: "Enregistrer les températures", v: "Ajouter une ligne dans un fichier à chaque prise de température (mode append \"a\") ; intervalle modifiable via time.sleep() en secondes ; date avec datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')." },
              ],
            },
            {
              type: "code",
              lang: "python",
              code: "# Mesure de distance avec un capteur à ultrasons HC-SR04 (2 à 400 cm, 40 kHz)\n# Branchement : 4 PINs (VCC, Trig, Echo, GND) + deux résistances 1KΩ et 2KΩ\nimport RPi.GPIO as GPIO\nimport time\nGPIO.setmode(GPIO.BCM)\nTrig = 23        # entrée Trig du HC-SR04 branchée au GPIO 23\nEcho = 24        # sortie Echo du HC-SR04 branchée au GPIO 24\nGPIO.setup(Trig, GPIO.OUT)\nGPIO.setup(Echo, GPIO.IN)\nGPIO.output(Trig, False)\nrepet = input(\"Entrez un nombre de repetitions de mesure : \")\nfor x in range(repet):\n    time.sleep(1)                       # mesure toutes les 1 seconde\n    GPIO.output(Trig, True)\n    time.sleep(0.00001)                 # impulsion de 10 µs\n    GPIO.output(Trig, False)\n    while GPIO.input(Echo) == 0:        # émission de l'ultrason\n        debutImpulsion = time.time()\n    while GPIO.input(Echo) == 1:        # retour de l'écho\n        finImpulsion = time.time()\n    # vitesse du son = 340 m/s ; aller-retour → /2 ; ×100 → cm\n    distance = round((finImpulsion - debutImpulsion) * 340 * 100 / 2, 1)\n    print(\"La distance est de : \", distance, \" cm\")\nGPIO.cleanup()",
            },
          ],
        },
        {
          heading: "Communication USB entre Arduino UNO et Raspberry Pi",
          blocks: [
            {
              type: "p",
              text: "Pour tirer l'avantage de chaque carte, le mieux est d'établir une communication entre les deux. Trois types : 1) unidirectionnelle Arduino UNO → Raspberry Pi, 2) unidirectionnelle Raspberry Pi → Arduino UNO, 3) bidirectionnelle Raspberry Pi ↔ Arduino UNO (mélange des deux).",
            },
            {
              type: "code",
              lang: "cpp",
              code: "// 1) Arduino → Raspberry : l'Arduino écrit sur la sortie série\nint i = 0;\nvoid setup() {\n  Serial.begin(9600);\n  Serial.println(\"Un message va etre envoye toutes les deux secondes!\");\n}\nvoid loop() {\n  Serial.println(\"Message #\" + String(i));\n  delay(2000);\n  i++;\n}",
            },
            {
              type: "code",
              lang: "python",
              code: "# Côté Raspberry : trouver le port de l'Arduino\n# ls /dev/tty*  → brancher l'Arduino en USB puis relancer : un nouvel élément apparaît\n# (ici l'Arduino est détecté comme /dev/ttyACM0)\nimport serial\nserialArduino = serial.Serial('/dev/ttyXXXX', 9600)  # port d'écoute + vitesse\nwhile True:\n    print(serialArduino.readline())   # écrit chaque message reçu",
            },
            {
              type: "code",
              lang: "cpp",
              code: "// 2) Raspberry → Arduino : l'Arduino reçoit les ordres (contrôle de LEDs RGB)\n#define Rouge A0\n#define Vert A1\n#define Bleu A2\nint message = 0;\nint couleurs[] = {Rouge, Vert, Bleu};\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(Rouge, OUTPUT); pinMode(Vert, OUTPUT); pinMode(Bleu, OUTPUT);\n}\nvoid loop() {\n  if (Serial.available()) {\n    message = Serial.read() - '0';\n    if (message > 3) { digitalWrite(couleurs[message - 4], LOW); }   // éteindre\n    else { digitalWrite(couleurs[message - 1], HIGH); }              // allumer\n  }\n}",
            },
            {
              type: "code",
              lang: "python",
              code: "# Côté Raspberry : envoi des ordres\nimport serial\nser = serial.Serial('/dev/ttyXXXX', 9600)\nprint(\"CTRL + C pour arrêter\")\nwhile True:\n    led = int(input('Quelle LED ? (Rouge=1 / Vert=2 / Bleu=3)'))\n    action = input(\"Allumer ou Éteindre ? (Allumer=1 / Eteindre=0)\")\n    if (action == 1):\n        ser.write(str(led))\n    else:\n        msg = led + 3\n        ser.write(str(msg))",
            },
          ],
        },
        {
          heading: "Node-RED sur Raspberry Pi",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Node-RED", v: "Langage de programmation graphique pour développer des objets connectés, idéal pour comprendre l'IoT. Disponible sur Windows, macOS et inclus par défaut dans Raspbian." },
                { k: "Démarrer", v: "Menu → Programmation, ou terminal : sudo node-red-start (sudo node-red-stop pour arrêter). Le serveur web est démarré et accessible depuis le réseau local : http://ADRESSE_IP_DU_RASPBERRY:1880/ ; directement sur le Pi : http://localhost:1880/ ou http://127.0.0.1:1880/." },
                { k: "Environnement", v: "Au centre la zone de programmation ; à gauche toutes les fonctions disponibles ; à droite les onglets informations contextuelles et debug ; au coin supérieur droit le bouton rouge Deploy pour déployer le programme." },
                { k: "npm", v: "Node-RED utilise le gestionnaire de package npm de nodejs. Installer/mettre à jour : sudo apt-get install npm ; sudo npm i npm -g. Installation de node-red-admin : cd /home/pi/.node-red ; npm install -g node-red-admin." },
                { k: "Faire clignoter une Led (GPIO23)", v: "Fonction inject qui envoie une pulsation chaque seconde + fonction « Inverse Etat Led » pour allumer/éteindre la Led. Import du flow : Menu → Import → Clipboard." },
                { k: "Plugins", v: "La communauté développe de très nombreux modules : objets connectés (ZWave, Sonos…), services en ligne (météo, twitter…), bases de données… Installer node-red-node-openweathermap : gestionnaire de palette → rechercher → install (ou npm install node-red-node-openweathermap ; en cas de difficulté, arrêter NR puis exécuter la commande dans le Terminal)." },
                { k: "Météo OpenWeatherMap", v: "Récupérer une clé API gratuite pour un usage personnel (https://openweathermap.org/) : créer un compte, onglet API keys de My profile. Ajouter un node openweathermap dans un flow, double-clic : coller la clé API, indiquer la ville/pays ou les coordonnées GPS, brancher un node debug pour envoyer la météo dans la console." },
              ],
            },
          ],
        },
        {
          heading: "Caméra, vidéo et streaming",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Ports DSI et CSI", v: "Le Raspberry Pi possède deux connecteurs particuliers : les ports DSI (Display Serial Interface) et CSI (Camera Serial Interface) — relier un écran et une caméra. La caméra se branche sur le bus CSI, spécialement conçu pour les caméras, offrant un débit élevé." },
                { k: "Activation de la caméra", v: "sudo raspi-config → Interfacing Options → Camera → Yes → redémarrer. Détection : vcgencmd get_camera → si la ligne n'est pas « supported=1 detected=1 », vérifier le branchement, l'activation, redémarrer et mettre à jour (sudo apt-get update ; sudo apt-get upgrade)." },
                { k: "Photo par le Terminal", v: "cd ; mkdir Camera ; raspistill -o ~/Camera/image.jpg -q 100. Options de raspistill : -o (output filename), -q (quality 0-100), -w/-h (width/height manuels), -t (timeout/retardateur), -vf/-hf (vertical/horizontal flip)." },
                { k: "Photo en Python (picamera)", v: "sudo apt-get install python3-picamera. Résolution par défaut 1920x1080 (mauvaise qualité en basse luminosité) : camera.resolution = (2592,1944) pour 5 MP ou (3280,2464) pour 8 MP. Photo à l'envers : camera.hflip = True ; camera.vflip = True. Autres options : sharpness, contrast, brightness, saturation, ISO, video_stabilization, exposure_compensation, exposure_mode, meter_mode, awb_mode, image_effect, color_effects, rotation, crop." },
                { k: "Vidéo par le Terminal", v: "raspivid -o video.h264 -t 10000 (10 secondes). Problème : la plupart des lecteurs ne lisent pas le .h264 → installer MP4Box : sudo apt-get install -y gpac ; convertir : MP4Box -add video.h264 video.mp4." },
                { k: "Vidéo en Python", v: "camera.start_recording(nomVideo+\".h264\") ; time.sleep(dureeVideo) ; camera.stop_recording() ; puis commande = \"MP4Box -add \"+nomVideo+\".h264 \"+nomVideo+\".mp4\" ; os.system(commande). Pour éteindre la LED de la caméra : ajouter disable_camera_led=1 à la fin de /boot/config.txt." },
                { k: "Streaming — 5 façons", v: "1) Netcat et Mplayer : sur le PC Linux nc -l -p 5001 | /usr/bin/mplayer -fps 10 -cache 1024 - ; sur le Pi : raspivid -t 0 -w 1280 -h 720 -o - | nc adresse_ip_du_pc_client 5001 (enregistrement : ajouter -demuxer h264es -dumpstream -dumpfile ./Bureau/ma_video.h264). 2) Streaming VLC : apt-get install vlc ; raspivid -t 0 -n --width 1280 --height 720 -o - | cvlc stream:///dev/stdin --sout '#standard{access=http,mux=ts,dst=:8090}' :demux=h264 ; côté client : cvlc http://adresse_ip_du_pi:8090 (plusieurs postes clients). 3) Pi à Pi avec OMXplayer. 4) mjpg-streamer : suite de photos (moins fluide). 5) Serveur Web : module http.server + picamera en mjpeg (StreamingOutput, StreamingHandler, StreamingServer sur le port 8000)." },
                { k: "Webcam USB standard", v: "La qualité du module caméra est très supérieure. Installer : sudo apt install fswebcam ; si on n'utilise pas le compte pi, ajouter l'utilisateur au groupe vidéo : sudo usermod -a -G video <username> (vérifier avec groups) ; photo : fswebcam image.jpg. Deuxième méthode avec motion : sudo apt-get update -y ; lsusb (vérifier la connexion de la caméra) ; sudo apt-get install motion ; sudo nano /etc/motion/motion.conf (daemon on, width 640, height 480, framerate 10, quality 100, pre_capture 2, post_capture 5, stream_port 8081, stream_quality 100, stream_motion off, webcontrol_localhost off) ; sudo nano /etc/default/motion (start_motion_daemon=yes) ; sudo reboot ; navigateur : IP:8081." },
                { k: "Serveur web sur le Pi", v: "Transformers le Pi en serveur web : Apache2 (serveur HTML des pages web dynamiques avec PHP) : sudo apt install apache2 -y → http://adresse_IP_du_Pi accède à /var/www/html/index.html. Pour le PHP : sudo apt install php libapache2-mod-php -y + créer index.php. Les flux vidéo de la webcam sont générés par motion et diffusés sur les ports 8081 et 8082." },
              ],
            },
          ],
        },
        {
          heading: "Serveur MQTT sur Raspberry Pi (Mosquitto)",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Principe MQTT", v: "MQTT est comme un forum avec des abonnés (lecteurs) et des rédacteurs qui publient des messages. Les messages sont hiérarchisés : consulter uniquement les messages qui nous intéressent. MQTT a été conçu pour économiser la batterie des objets : consomme 11 fois moins d'énergie pour envoyer des messages et 170 fois moins pour en recevoir que le protocole HTTP ; 93 fois plus rapide que HTTP." },
                { k: "QoS (Quality of Service)", v: "Plusieurs niveaux : niveau 0 (néant) : message publié sans garantie de bonne réception ; niveau 2 (service garanti) : publication en deux parties pour garantir que le message est correctement délivré de façon unique. Plus on monte en niveau de QoS, plus on charge les trames." },
                { k: "Sécurité et MQTT", v: "MQTT est compatible avec des échanges à travers Internet (tests sur des brokers publics) ; on préfère des échanges sur un réseau privé avec un serveur isolé de l'extérieur : MQTT n'intègre pas de mécanisme de sécurité à proprement parler ; connexions SSL/TLS soumises à certificat possibles. Dans une maison connectée : pas utile de dialoguer avec l'extérieur en MQTT — faire communiquer les objets en local avec le serveur domotique, qui relaye l'info à l'extérieur si nécessaire. D'où l'intérêt d'un broker MQTT local sur Raspberry Pi." },
                { k: "Installer Mosquitto", v: "Pas nécessaire d'avoir la dernière version du Pi ; un Pi en fonctionnement pour une autre tâche peut assumer celle-ci en plus. sudo apt-get install mosquitto → le serveur MQTT local est prêt. Vérifier : systemctl status mosquitto. Clients de test : sudo apt-get install mosquitto-clients (mosquitto_sub, mosquitto_pub et mosquitto_passwd pour simuler des utilisateurs)." },
                { k: "Envoyer/recevoir des messages", v: "Terminal Subscriber : mosquitto_sub -h localhost -t \"sensor/temperature\". Terminal Publisher : mosquitto_pub -h localhost -t sensor/temperature -m 24.9 (se connecter au serveur -h localhost, sur le topic -t sensor/temperature, publier le message -m 24.9)." },
                { k: "MQTT avec Node-RED", v: "Ajouter un node mqtt (section input) ; double-clic pour ouvrir la configuration ; crayon pour ajouter une nouvelle connexion ; si Node-RED fonctionne sur la même machine que le broker Mosquitto : serveur localhost, port 1883." },
              ],
            },
          ],
        },
      ],
    },
  ],

  quiz: [
    { id: "i1", chapter: "i1", question: "Qui a inventé le terme « Internet of Things » et quand ?", options: ["Bill Gates en 1995", "Kevin Ashton (MIT) en 1999, pour la gestion de la chaîne logistique via RFID", "Tim Berners-Lee en 1991", "Jeff Bezos en 2000"], correct: 1, explanation: "Kevin Ashton (MIT) a inventé le terme Internet of Things en 1999 pour décrire la gestion de la chaîne logistique via RFID." },
    { id: "i2", chapter: "i1", question: "Que désigne l'IoMT ?", options: ["Internet of Mobile Things", "Les dispositifs connectés pour surveiller, diagnostiquer ou traiter des patients à distance", "Un protocole réseau", "Un microcontrôleur"], correct: 1, explanation: "IoMT (Internet of Medical Things) : dispositifs connectés utilisés pour surveiller, diagnostiquer ou traiter des patients à distance — améliorer les soins, réduire les coûts, personnaliser." },
    { id: "i3", chapter: "i1", question: "Que signifie M2M ?", options: ["Machine to Machine : connexion entre machines sans intervention humaine", "Man to Machine", "Multi to Multi", "Media to Media"], correct: 0, explanation: "M2M (ou D2D, Device to Device) = connexion entre des machines sans intervention humaine. M2P = machine vers personne. P2P = chaque entité est client ET serveur. L'IoT couvre M2M + M2P." },
    { id: "i4", chapter: "i1", question: "Quelles sont les 3 caractéristiques des objets IoT (ITU-T Y.2060) ?", options: ["Inter-connectivité, hétérogénéité, changement dynamique", "Rapidité, sécurité, simplicité", "Wi-Fi, Bluetooth, Zigbee", "Capteur, actionneur, cloud"], correct: 0, explanation: "1) Inter-connectivité : tout peut être interconnecté. 2) Hétérogénéité : plateformes matérielles et réseaux différents. 3) Changement dynamique : état (sommeil/éveil, connexion), contexte (position, vitesse), nombre d'objets." },
    { id: "i5", chapter: "i1", question: "Quelles sont les 5 couches de l'architecture IoT ?", options: ["Perception, Réseau, Middleware, Application, Business", "Physique, TCP, IP, HTTP, Cloud", "Capteur, Arduino, ESP, Pi, Cloud", "Data, Info, Connaissance, Sagesse, Décision"], correct: 0, explanation: "1) Perception (capteurs/actionneurs), 2) Réseau (BLE, Zigbee, LoRa, LoRaWAN, NB-IoT, 5G), 3) Middleware (edge/cloud, BDD : MongoDB, InfluxDB), 4) Application (dashboards, alertes, automatisation), 5) Business (Big Data Hadoop/Spark, IA/ML, KPIs)." },
    { id: "i6", chapter: "i1", question: "Quel protocole applicatif IoT utilise le modèle publish/subscribe avec un broker central et TCP/IP ?", options: ["CoAP", "MQTT", "LoRaWAN", "Zigbee"], correct: 1, explanation: "MQTT : publish/subscribe avec broker central, TCP/IP pour une transmission fiable ; léger, idéal faible bande passante ; inconvénient : dépendance au broker (point unique de défaillance)." },
    { id: "i7", chapter: "i1", question: "Quel protocole est inspiré de HTTP, utilise UDP et est optimisé pour les appareils contraints ?", options: ["MQTT", "CoAP", "AMQP", "BLE"], correct: 1, explanation: "CoAP (Constrained Application Protocol) : inspiré de HTTP, UDP pour réduire la surcharge, compatible RESTful APIs, multicast ; moins fiable que MQTT (pas de garantie de livraison)." },
    { id: "i8", chapter: "i1", question: "Quelle est la portée et le débit de LoRaWAN ?", options: ["15 km, 0,3-50 kbps", "10-100 m, 250 kbps", "100 m, 1-2 Mbps", "Illimitée, 1 Gbps"], correct: 0, explanation: "LoRaWAN : ondes radio sub-GHz, jusqu'à 15 km en zone rurale, débit limité 0,3-50 kbps, très faible consommation, architecture en étoile — idéal smart cities et déploiements massifs." },
    { id: "i9", chapter: "i1", question: "Sur quel standard est basé Zigbee ?", options: ["IEEE 802.11", "IEEE 802.15.4", "IEEE 802.3", "IEEE 802.16"], correct: 1, explanation: "Zigbee est basé sur IEEE 802.15.4 : réseau maillé (mesh) auto-organisé, faible latence, robuste, portée 10-100 m, débit 250 kbps — domotique et automatisation industrielle." },
    { id: "i10", chapter: "i1", question: "Quelle topologie IoMT offre une tolérance aux pannes maximale mais une consommation énergétique élevée ?", options: ["Étoile", "Maillage (Mesh)", "Bus", "Hybride"], correct: 1, explanation: "Mesh : les dispositifs communiquent entre eux (redondance, pas de point unique de défaillance, couverture étendue) mais consommation élevée — problématique pour les implants." },
    { id: "i11", chapter: "i1", question: "Quels protocoles série sont ASYNCHRONES (sans horloge) ?", options: ["SPI et I2C", "UART", "CAN", "1-Wire"], correct: 1, explanation: "UART est asynchrone : pas de signal d'horloge partagé, trame avec bit de start, données (5-9 bits), parité optionnelle, bits de stop. SPI et I2C sont synchrones (horloge partagée SCK/SCL)." },
    { id: "i12", chapter: "i1", question: "Dans SPI, que signifient MOSI et MISO ?", options: ["Master Out Slave In et Master In Slave Out", "Module In / Module Out", "Memory In / Memory Out", "Multi Input / Multi Output"], correct: 0, explanation: "SPI : MOSI (Master Out Slave In), MISO (Master In Slave Out), SS (Slave Select), SCK (horloge). Full-duplex, jusqu'à 100 Mbps, 4+ fils." },
    { id: "i13", chapter: "i1", question: "Quel protocole série utilise un SEUL fil pour communication ET alimentation ?", options: ["I2C", "1-Wire", "UART", "SPI"], correct: 1, explanation: "1-Wire : single-wire (DQ) pour communication + alimentation, adressage unique ROM ID 64 bits — capteurs Dallas (DS18B20). Très lent (15 kbps)." },
    { id: "i14", chapter: "i1", question: "Quel protocole série est conçu pour les environnements bruyants (automobile) avec priorité des messages par ID ?", options: ["UART", "CAN", "I2C", "1-Wire"], correct: 1, explanation: "CAN (Controller Area Network) : réseau différentiel (CAN_H/CAN_L), gestion des collisions par priorité des messages par ID, robuste — automobile et industrie, 1 Mbps." },
    { id: "i15", chapter: "i1", question: "Quelles broches ESP32 sont utilisées pour l'I2C (SCL/SDA) ?", options: ["D22 et D21", "GPIO 0 et 2", "TX et RX", "A0 et A1"], correct: 0, explanation: "Selon le pinout ESP32 : SCL = D22 et SDA = D21 (utilisé pour le MAX30100 et l'OLED du bracelet médical connecté)." },
    { id: "i16", chapter: "i1", question: "Quelles broches ESP32 peuvent détecter un contact avec le doigt (tactile capacitif) ?", options: ["GPIO 0, 2, 4, 12, 13, 14, 15, 27, 32, 33", "Uniquement GPIO 25 et 26", "Toutes", "Aucune"], correct: 0, explanation: "Les 10 broches tactiles : GPIO 0, 2, 4, 12, 13, 14, 15, 27, 32 et 33. Lecture : touchRead(32) ou touchRead(T9) — même résultat." },
    { id: "i17", chapter: "i2", question: "Quelle est la différence entre un capteur et un actionneur ?", options: ["Aucune", "Le capteur transforme un phénomène physique en signal électrique ; l'actionneur transforme le signal électrique en phénomène physique", "Le capteur est plus cher", "L'actionneur mesure la température"], correct: 1, explanation: "Capteur : phénomène physique → signal électrique (chaleur, humidité, lumière). Actionneur : signal électrique → phénomène physique (le contraire) : moteur, lampe…" },
    { id: "i18", chapter: "i2", question: "Quel capteur d'humidité choisir si on cherche la précision ?", options: ["DHT11 (±5%)", "DHT22 (±2%)", "HIH-4030 (±3,5%)", "Peu importe"], correct: 1, explanation: "DHT22 (28 DT, ±2 %) pour la précision ; DHT11 (15 DT, ±5 %) pour le bas prix. En santé et production de masse, la précision prime." },
    { id: "i19", chapter: "i2", question: "Quelle est la différence entre microcontrôleur et micro-ordinateur ?", options: ["Aucune", "Le microcontrôleur a des ressources très limitées (petites opérations) ; le micro-ordinateur a une puissance proche d'un ordinateur, un OS (Linux), souvent utilisé comme passerelle", "Le micro-ordinateur ne peut pas acquérir de données", "Le microcontrôleur a toujours un OS"], correct: 1, explanation: "Microcontrôleur : ports, microprocesseur, RAM/ROM limités — acquisition/traitement + contrôle d'actionneurs. Micro-ordinateur : puissance proche PC, OS (Linux), gateway, envoie au cloud. NB : le micro-ordinateur peut acquérir comme un microcontrôleur (l'inverse est rare)." },
    { id: "i20", chapter: "i2", question: "Pourquoi l'ESP32 plutôt que l'ESP8266 (NodeMCU) pour le projet de micro-jardinage ?", options: ["Il est moins cher", "L'ESP8266 n'a qu'un port analogique alors qu'on a besoin de 2 ports analogiques ; l'ESP32 intègre aussi le Wi-Fi", "Il n'a pas de Wi-Fi", "Il est plus lent"], correct: 1, explanation: "L'ESP32 est le grand frère de l'ESP8266 : plus de ports analogiques, Wi-Fi intégré (pas besoin de shield), fonctionne entre 3,3V et 5V — l'idéal pour DHT11, photorésistance et capteur capacitif." },
    { id: "i21", chapter: "i2", question: "Quelles sont les 2 fonctions minimales d'un programme Arduino ?", options: ["main() et start()", "void setup() (initialisation des E/S) et void loop() (instructions exécutées indéfiniment)", "init() et run()", "begin() et end()"], correct: 1, explanation: "void setup() assure l'initialisation des E/S du microcontrôleur (exécutée une fois) ; void loop() contient les instructions et est exécuté indéfiniment." },
    { id: "i22", chapter: "i2", question: "Quelle formule convertit la lecture analogique du LM35 en température ?", options: ["Temp = Volt*(5/1023)*100", "Temp = Volt*1023", "Temp = Volt/100", "Temp = Volt*2"], correct: 0, explanation: "Le LM35 : 10 mV ≡ 1°C ; la lecture analogique 0-5V est codée 0-1023 → temp = analogRead(A0)*(5.0/1023.0*100.0)." },
    { id: "i23", chapter: "i2", question: "Comment commande-t-on un servomoteur ?", options: ["Par tension continue", "Par impulsion PWM toutes les 20 ms (50 Hz) : 1 ms = 0°, 2 ms = 180°", "Par fréquence radio", "Par I2C uniquement"], correct: 1, explanation: "Servo 9G : impulsion numérique (PWM) toutes les 20 ms d'une longueur de 1 à 2 ms (1 ms = 0°, 2 ms = 180°, intermédiaire = angles différents). Bibliothèque Servo : jusqu'à 12 servos, désactive D9/D10 en PWM." },
    { id: "i24", chapter: "i2", question: "Quelle tension alimente strictement l'ESP8266 ?", options: ["5 V", "3,3 V", "12 V", "9 V"], correct: 1, explanation: "L'ESP8266 n'est strictement alimenté qu'en 3,3 V. Câblage avec Arduino : GND→GND, VIN→3.3v, ENABLE→3.3v, TX→RX, RX→TX." },
    { id: "i25", chapter: "i2", question: "Dans l'application smart farming, que font les workers la plupart du temps ?", options: ["Ils émettent en permanence", "Ils sont en DEEP_SLEEP et se réveillent à 1 heure d'intervalle pour lire les capteurs", "Ils servent de passerelles", "Ils stockent la base de données"], correct: 1, explanation: "Les 6 workers : DEEP_SLEEP la plupart du temps, réveil toutes les heures, lecture des capteurs, connexion à l'AP le plus proche, envoi HTTP ; jusqu'à 10 lectures conservées si l'AP est indisponible ; alimentés par 4 piles Li-Ion 3,3V + panneaux solaires 15V." },
    { id: "i26", chapter: "i2", question: "Quel est le rôle des middleman dans le réseau smart farming ?", options: ["Lire les capteurs", "Écouter et recevoir les lectures des workers, puis les envoyer au middleman suivant jusqu'au central Box (configurés AP/ST)", "Stockage MySQL", "Affichage web"], correct: 1, explanation: "Les 3 middleman : répéteurs de signaux à la fois en AP et ST avec serveur Web en attente des requêtes — ils relaient les données vers le central Box." },
    { id: "i27", chapter: "i2", question: "Dans MQTT, quels sont les 3 rôles ?", options: ["Publisher (envoie), Broker (serveur de gestion des échanges), Subscriber (lit)", "Client, Serveur, Base de données", "Capteur, Passerelle, Cloud", "TCP, UDP, IP"], correct: 0, explanation: "MQTT : Publisher (éditeur) envoie des messages ; Broker (serveur MQTT à mi-chemin) gère les échanges ; Subscriber (abonné) lit les messages du Publisher." },
    { id: "i28", chapter: "i2", question: "Quelles bibliothèques installer pour MQTT avec ESP32 dans l'IDE Arduino ?", options: ["PubSubClient", "Servo et MFRC522", "WiFi seulement", "Adafruit_BME280"], correct: 0, explanation: "Installer la carte ESP32 (URL dl.espressif.com) puis la bibliothèque PubSubClient (communication MQTT) : Croquis → Ajouter une bibliothèque → Gérer les bibliothèques." },
    { id: "i29", chapter: "i2", question: "Quel broker MQTT open source est le plus utilisé dans les projets DIY ?", options: ["EMQTT", "Mosquitto (soutenu par eclipse.org, toutes plateformes)", "RabbitMQ", "ActiveMQ"], correct: 1, explanation: "Mosquitto est le plus utilisé dans les projets DIY, soutenu par la fondation eclipse.org, disponible sur toutes les plateformes. RabbitMQ = orienté entreprise ; EMQTT = jusqu'à 1 million de connexions/serveur." },
    { id: "i30", chapter: "i3", question: "Depuis quel support le Raspberry Pi charge-t-il son système d'exploitation ?", options: ["Disque dur interne", "Lecteur de carte micro SD", "Réseau uniquement", "ROM"], correct: 1, explanation: "Le Raspberry Pi charge son OS depuis la carte micro SD (installation via Raspberry Pi Imager : OS with desktop ou OS Lite, carte formatée FAT32, Balena Etcher)." },
    { id: "i31", chapter: "i3", question: "Quels outils installer sur le Raspberry pour le bureau à distance depuis Windows ?", options: ["xrdp et tightvncserver", "Apache et MySQL", "Node et npm", "fswebcam et motion"], correct: 0, explanation: "Côté Raspberry : sudo apt-get install tightvncserver et xrdp. Côté Windows : « Connexion Bureau à distance » avec l'IP du Pi (ifconfig), identifiants par défaut pi/raspberry." },
    { id: "i32", chapter: "i3", question: "Quelle librairie Python gère les GPIO du Raspberry Pi ?", options: ["RPi.GPIO", "pyGPIO", "gpioctl", "PiLib"], correct: 0, explanation: "import RPi.GPIO as GPIO ; GPIO.setmode(GPIO.BCM) (numérotation GPIO) ; GPIO.setup(18, GPIO.OUT) ; GPIO.output(18, True/False) ; GPIO.cleanup() à la fin." },
    { id: "i33", chapter: "i3", question: "Que faire si la sonde DS18B20 n'est pas détectée ?", options: ["La jeter", "Ajouter w1-therm et w1-gpio pullup=1 dans /etc/modules et dtoverlay=w1-gpio dans /boot/config.txt, puis redémarrer", "Changer d'OS", "Utiliser USB"], correct: 1, explanation: "Ajouter dans /etc/modules : w1-therm et w1-gpio pullup=1 (sudo nano /etc/modules) ; dans /boot/config.txt : dtoverlay=w1-gpio ; puis redémarrer." },
    { id: "i34", chapter: "i3", question: "Le capteur HC-SR04 mesure une distance de…", options: ["2 à 400 cm en envoyant des signaux sonores à 40 kHz", "0 à 10 m par laser", "1 à 5 km par infrarouge", "1 m par Wi-Fi"], correct: 0, explanation: "HC-SR04 : capteur à ultrasons, 2-400 cm, signaux à 40 kHz ; distance = (temps aller-retour) × 340 × 100 / 2 cm. Branchement : VCC, Trig, Echo, GND + résistances 1KΩ et 2KΩ." },
    { id: "i35", chapter: "i3", question: "Comment trouver le port série de l'Arduino connectée au Raspberry ?", options: ["ls /dev/tty* (un nouvel élément apparaît après branchement, ex. /dev/ttyACM0)", "ifconfig", "ping arduino", "Impossible"], correct: 0, explanation: "ls /dev/tty* avant et après branchement : le nouvel élément est l'Arduino (ex. /dev/ttyACM0). Côté Python : serial.Serial('/dev/ttyXXXX', 9600)." },
    { id: "i36", chapter: "i3", question: "Sur quel port Node-RED est-il accessible ?", options: ["1880", "8081", "1883", "22"], correct: 0, explanation: "Node-RED : http://IP_DU_RASPBERRY:1880/ (ou localhost:1880). Démarrage : sudo node-red-start. Le broker MQTT Mosquitto utilise le port 1883, le flux motion le 8081." },
    { id: "i37", chapter: "i3", question: "Quelle commande vérifie la détection de la caméra du Raspberry Pi ?", options: ["vcgencmd get_camera (supported=1 detected=1 attendu)", "lsusb", "ifconfig", "top"], correct: 0, explanation: "vcgencmd get_camera doit afficher supported=1 detected=1. Activation préalable : sudo raspi-config → Interfacing Options → Camera → Yes." },
    { id: "i38", chapter: "i3", question: "Quelle commande prend une photo avec la caméra du Pi ?", options: ["raspistill -o ~/Camera/image.jpg -q 100", "raspivid -o video.h264", "fswebcam image.jpg (webcam USB)", "Les deux a et c selon le matériel"], correct: 3, explanation: "raspistill -o image.jpg -q 100 pour le module caméra (options : -q qualité, -w/-h dimensions, -t timeout, -vf/-hf flip) ; fswebcam image.jpg pour une webcam USB standard." },
    { id: "i39", chapter: "i3", question: "Pourquoi installer MP4Box (gpac) après un enregistrement raspivid ?", options: ["Pour compresser la vidéo", "La plupart des lecteurs ne lisent pas le format .h264 : MP4Box convertit en MP4 lisible partout", "Pour ajouter du son", "Pour streamer"], correct: 1, explanation: "raspivid produit du .h264 (peu lisible). Installation : sudo apt-get install -y gpac ; conversion : MP4Box -add video.h264 video.mp4." },
    { id: "i40", chapter: "i3", question: "Quelles sont les 5 façons de faire du streaming avec le Raspberry Pi ?", options: ["Netcat+Mplayer, VLC, Pi-à-Pi OMXplayer, mjpg-streamer, serveur Web", "Uniquement VLC", "HDMI, USB, Wi-Fi, Bluetooth, Ethernet", "Aucune"], correct: 0, explanation: "5 méthodes : 1) Netcat et Mplayer, 2) streaming VLC (plusieurs clients), 3) Pi à Pi avec OMXplayer, 4) mjpg-streamer (suite de photos, moins fluide), 5) serveur Web (module http.server + mjpeg)." },
    { id: "i41", chapter: "i3", question: "Quels fichiers configurer pour la webcam USB avec motion ?", options: ["/etc/motion/motion.conf (daemon, width, height, framerate, stream_port 8081…) et /etc/default/motion (start_motion_daemon=yes)", "/etc/hosts et /etc/resolv.conf", "/boot/config.txt uniquement", "Aucun"], correct: 0, explanation: "motion.conf : daemon on, width 640, height 480, framerate 10, quality 100, pre_capture 2, post_capture 5, stream_port 8081, stream_quality 100, stream_motion off, webcontrol_localhost off. Puis start_motion_daemon=yes, reboot, navigateur : IP:8081." },
    { id: "i42", chapter: "i3", question: "Quelle est la performance de MQTT comparée à HTTP ?", options: ["11 fois moins d'énergie en envoi, 170 fois moins en réception, 93 fois plus rapide", "Deux fois plus lent", "Identique", "Moins fiable"], correct: 0, explanation: "MQTT consomme 11× moins d'énergie pour envoyer et 170× moins pour recevoir que HTTP, et est 93× plus rapide — conçu pour économiser la batterie des objets." },
    { id: "i43", chapter: "i3", question: "Que signifie le niveau de QoS 2 de MQTT ?", options: ["Néant : aucune garantie", "Service garanti : publication en deux parties pour s'assurer que le message est délivré correctement et de façon unique", "Réception multiple garantie", "Chiffrement obligatoire"], correct: 1, explanation: "QoS 0 : publication sans garantie de réception. QoS 2 : service garanti — publication en deux parties assurant une délivrance correcte et unique. Plus le QoS monte, plus les trames sont chargées." },
    { id: "i44", chapter: "i3", question: "Quelle commande installe le broker Mosquitto et comment vérifie-t-on son fonctionnement ?", options: ["sudo apt-get install mosquitto ; systemctl status mosquitto", "apt install mqtt ; mqtt --check", "pip install mosquitto ; mqtt status", "Il est déjà installé"], correct: 0, explanation: "sudo apt-get install mosquitto (le serveur MQTT local est prêt) ; vérification : systemctl status mosquitto. Clients de test : sudo apt-get install mosquitto-clients." },
    { id: "i45", chapter: "i3", question: "Comment publier et s'abonner en ligne de commande avec Mosquitto ?", options: ["mosquitto_pub -h localhost -t sensor/temperature -m 24.9 et mosquitto_sub -h localhost -t \"sensor/temperature\"", "mqtt send et mqtt receive", "curl -X POST", "wget"], correct: 0, explanation: "Publisher : mosquitto_pub -h localhost -t sensor/temperature -m 24.9 (-h serveur, -t topic, -m message). Subscriber : mosquitto_sub -h localhost -t \"sensor/temperature\"." },
  ],
};
