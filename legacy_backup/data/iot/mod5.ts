import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Partie 1 — Modules 9 & 10 : Topologies IoMT ; protocoles série
// ═══════════════════════════════════════════════════════════════

export const imod9: Module = {
  id: 'i9',
  num: 9,
  title: 'Topologies de réseaux IoMT',
  subtitle: 'Étoile, Maillage, Hybride, Bus — cas d\u2019usage médicaux, protocoles, et 2 études de cas réels',
  icon: '🕸️',
  color: 'emerald',
  source: 'InternetDesObjets-1.pdf — V. Topologies de réseaux IoT médicaux',
  sections: [
    {
      id: 'i9s1',
      title: 'Définition et enjeux des réseaux IoMT',
      blocks: [
        { type: 'definition', term: 'Réseaux IoMT', def: "Les réseaux IoMT relient des dispositifs médicaux (capteurs, implants, équipements hospitaliers) pour collecter, transmettre et analyser des données de santé en temps réel." },
        { type: 'kv', items: [
          { k: 'Enjeu — Sécurité', v: "Protection des données sensibles (RGPD, HIPAA)." },
          { k: 'Enjeu — Fiabilité', v: "Aucune tolérance aux pannes dans les applications critiques (ex : pacemakers)." },
          { k: 'Enjeu — Latence ultra-faible', v: "Nécessaire pour la télémédecine ou la chirurgie assistée." },
          { k: 'Exemples', v: "Surveillance cardiaque à distance · Pompes à insuline connectées · Hôpitaux intelligents (lits connectés, gestion des stocks de médicaments)." },
        ] },
        { type: 'diagram', diagram: 'Topologies' },
      ],
    },
    {
      id: 'i9s2',
      title: 'A. Topologie en Étoile (Star)',
      blocks: [
        { type: 'definition', term: 'Topologie en Étoile', def: "Tous les dispositifs médicaux se connectent à un nœud central (passerelle, serveur hospitalier)." },
        { type: 'kv', items: [
          { k: 'Cas d\u2019usage', v: "Surveillance centralisée des patients dans une chambre d'hôpital · Dispositifs portables (ex : glucomètre connecté à un smartphone)." },
          { k: 'Avantages', v: "Simplicité de gestion · Faible latence pour la transmission directe." },
          { k: 'Inconvénients', v: "Dépendance à la passerelle centrale (risque de panne critique)." },
          { k: 'Protocoles', v: "Bluetooth Low Energy (BLE) pour les wearables · Wi-Fi pour les équipements fixes." },
        ] },
      ],
    },
    {
      id: 'i9s3',
      title: 'B. Topologie en Maillage (Mesh)',
      blocks: [
        { type: 'definition', term: 'Topologie en Maillage', def: "Les dispositifs communiquent entre eux pour assurer la redondance." },
        { type: 'kv', items: [
          { k: 'Cas d\u2019usage', v: "Bloc opératoire intelligent : communication entre capteurs de signes vitaux, robots chirurgicaux et moniteurs · Réseaux de capteurs corporels (BAN) : patchs connectés sur un patient communiquant entre eux." },
          { k: 'Avantages', v: "Tolérance aux pannes (pas de point unique de défaillance) · Couverture étendue dans un hôpital." },
          { k: 'Inconvénients', v: "Consommation énergétique élevée (problématique pour les implants)." },
          { k: 'Protocoles', v: "Zigbee ou Thread pour les réseaux corporels · WirelessHART pour l'industrie médicale." },
        ] },
        { type: 'note', title: 'BAN', text: "BAN = Body Area Network : réseau de capteurs corporels — par exemple des patchs connectés sur un patient qui communiquent entre eux." },
      ],
    },
    {
      id: 'i9s4',
      title: 'C. Topologie Hybride (Étoile + Maillage)',
      blocks: [
        { type: 'definition', term: 'Topologie Hybride', def: "Combinaison de sous-réseaux en étoile (ex : salles d'hôpital) et d'une dorsale maillée." },
        { type: 'kv', items: [
          { k: 'Cas d\u2019usage', v: "Hôpital intelligent : capteurs en étoile dans chaque chambre → passerelles connectées en maillage · Télémédecine rurale : capteurs en étoile dans un village → relais maillés pour atteindre l'hôpital." },
          { k: 'Avantages', v: "Équilibre entre simplicité et redondance." },
          { k: 'Inconvénients', v: "Complexité de configuration et de gestion · Maintenance difficile · Coût élevé · Consommation énergétique accrue · Latence variable." },
          { k: 'Protocoles', v: "LoRaWAN pour la dorsale longue portée · MQTT pour l'échange de données vers le cloud." },
        ] },
      ],
    },
    {
      id: 'i9s5',
      title: 'D. Topologie en Bus (Modbus/CAN)',
      blocks: [
        { type: 'definition', term: 'Topologie en Bus', def: "Dispositifs connectés sur un bus de communication partagé." },
        { type: 'kv', items: [
          { k: 'Cas d\u2019usage', v: "Équipements fixes : analyseurs de sang connectés en laboratoire · Ambulances intelligentes : réseau CAN pour relier les capteurs de vie au système de communication." },
          { k: 'Avantages', v: "Câblage simplifié." },
          { k: 'Inconvénients', v: "Risque de collision de données (inadapté aux applications critiques)." },
        ] },
      ],
    },
    {
      id: 'i9s6',
      title: 'Études de cas concrets',
      blocks: [
        { type: 'paragraph', text: "Le cours termine par deux études de cas chiffrées. Retenez la topologie, les protocoles et le résultat de chacune." },
        { type: 'definition', term: 'A. Réseau maillé pour la surveillance post-opératoire', def: "Topologie : maillage avec capteurs sans fil (ECG, SpO₂, pression artérielle).\nProtocoles : Zigbee + TLS pour le chiffrement.\nRésultat : réduction de 30 % des complications grâce à des alertes en temps réel." },
        { type: 'definition', term: 'B. Réseau en étoile pour les dispositifs implantables', def: "Dispositif : pacemaker connecté (Medtronic).\nTopologie : communication en étoile vers une passerelle portable.\nSécurité : chiffrement AES-256 pour éviter les piratages." },
      ],
    },
  ],
}

export const imod10: Module = {
  id: 'i10',
  num: 10,
  title: 'Protocoles série (UART, SPI, I2C, 1-Wire, CAN)',
  subtitle: 'Communication série vs parallèle, protocoles asynchrones et synchrones, spécialisés, tableau comparatif et bonnes pratiques',
  icon: '🔗',
  color: 'emerald',
  source: 'InternetDesObjets-1.pdf — VI. Protocoles de communication série pour périphériques',
  sections: [
    {
      id: 'i10s1',
      title: 'Série vs parallèle',
      blocks: [
        { type: 'definition', term: 'Communication série', def: "Transmission bit par bit sur un seul fil (ex : UART)." },
        { type: 'definition', term: 'Communication parallèle', def: "Transmission simultanée sur plusieurs fils (ex : bus PCI)." },
        { type: 'kv', items: [
          { k: 'Avantages de la série', v: "Coût réduit · Simplicité de câblage · Adaptée aux longues distances." },
        ] },
      ],
    },
    {
      id: 'i10s2',
      title: 'UART — protocole asynchrone (sans horloge)',
      blocks: [
        { type: 'definition', term: 'UART (Universal Asynchronous Receiver/Transmitter)', def: "Asynchrone : pas de signal d'horloge partagé. Trame : bit de start (0), données (5-9 bits), bit de parité (optionnel), bits de stop (1). Baud rate : vitesse de transmission (ex : 9600, 115200 bauds)." },
        { type: 'kv', items: [
          { k: 'Utilisation', v: "Communication entre microcontrôleurs, modules GPS, Bluetooth." },
          { k: 'Avantages', v: "Simple, universel." },
          { k: 'Inconvénients', v: "Pas de détection d'erreur (sans parité), distance limitée." },
          { k: 'RS-232', v: "Standard industriel pour UART (niveaux de tension ±3 à ±15 V)." },
          { k: 'RS-485', v: "Communication différentielle pour longues distances (jusqu'à 1200 m)." },
        ] },
        { type: 'diagram', diagram: 'UartFrame' },
        { type: 'code', lang: 'arduino', caption: 'Exemple pratique du cours — communication UART avec Arduino', code: `void setup() {
  Serial.begin(9600);   // Initialisation UART à 9600 bauds
}
void loop() {
  Serial.println("Hello, World!");
  delay(1000);
}` },
      ],
    },
    {
      id: 'i10s3',
      title: 'SPI — protocole synchrone (avec horloge)',
      blocks: [
        { type: 'definition', term: 'SPI (Serial Peripheral Interface)', def: "Synchrone : horloge partagée (SCK). Périphérique maître/esclave. Fils : MOSI (Master Out Slave In), MISO (Master In Slave Out), SS (Slave Select). Mode de communication : full-duplex (données bidirectionnelles simultanées)." },
        { type: 'kv', items: [
          { k: 'Utilisation', v: "Mémoires (EEPROM, Flash), écrans LCD, capteurs haute vitesse." },
          { k: 'Avantages', v: "Débit élevé (jusqu'à 100 Mbps), flexible." },
          { k: 'Inconvénients', v: "Nombreux fils (4 minimum), pas de gestion native des erreurs." },
        ] },
      ],
    },
    {
      id: 'i10s4',
      title: 'I2C — protocole synchrone à 2 fils',
      blocks: [
        { type: 'definition', term: 'I2C (Inter-Integrated Circuit)', def: "Synchrone : horloge partagée (SCL) et données bidirectionnelles (SDA). Adressage : 7 ou 10 bits pour identifier les esclaves. Structure de trame : Start bit → adresse esclave → données → stop bit." },
        { type: 'kv', items: [
          { k: 'Utilisation', v: "Capteurs (température, pression), RTC (Real-Time Clock)." },
          { k: 'Avantages', v: "2 fils seulement et multi-esclaves." },
          { k: 'Inconvénients', v: "Débit modéré (400 kHz en standard, 5 MHz en Ultra Fast Mode)." },
          { k: 'Résistances', v: "Améliorent l'impédance et donc la longueur de la ligne." },
        ] },
        { type: 'diagram', diagram: 'SpiI2cWiring' },
        { type: 'code', lang: 'arduino', caption: 'Exemple pratique du cours — lecture d\u2019un capteur I2C (BME280)', code: `#include <Wire.h>
#include <Adafruit_BME280.h>
Adafruit_BME280 bme;

void setup() {
  Wire.begin();        // Initialisation I2C
  bme.begin(0x76);     // adresse I2C du capteur
}
void loop() {
  float temp = bme.readTemperature();
  delay(1000);
}` },
      ],
    },
    {
      id: 'i10s5',
      title: 'Protocoles spécialisés : 1-Wire et CAN',
      blocks: [
        { type: 'definition', term: '1-Wire', def: "Single-wire : communication + alimentation sur un seul fil (DQ). Adressage unique : chaque périphérique a une ROM ID 64 bits." },
        { type: 'kv', items: [
          { k: '1-Wire — utilisation', v: "Capteurs Dallas (DS18B20), systèmes de sécurité." },
          { k: '1-Wire — avantages', v: "Câblage minimal, idéal pour les réseaux de capteurs." },
          { k: '1-Wire — inconvénients', v: "Débit très lent (15 kbps), complexité logicielle." },
        ] },
        { type: 'definition', term: 'CAN (Controller Area Network)', def: "Réseau différentiel (CAN_H et CAN_L) pour environnements bruyants. Gestion des collisions : priorité des messages par ID." },
        { type: 'kv', items: [
          { k: 'CAN — utilisation', v: "Automobile, industrie (automates). Réseau CAN dans une voiture pour connecter le moteur, l'ABS, et l'ECU." },
          { k: 'CAN — avantages', v: "Robustesse, tolérance aux pannes." },
          { k: 'CAN — inconvénients', v: "Complexité matérielle." },
        ] },
      ],
    },
    {
      id: 'i10s6',
      title: 'Tableau comparatif & bonnes pratiques',
      blocks: [
        { type: 'table', headers: ['Protocole', 'Vitesse', 'Fils', 'Topologie', 'Applications'], rows: [
          ['UART', '9600 – 4 Mbps', '2 (TX/RX)', 'Point-à-point', 'Modules sans fil'],
          ['SPI', '1 – 100 Mbps', '4+', 'Maître/esclave', 'Mémoires, écrans'],
          ['I2C', '1 – 10 Mbps', '2', 'Bus', 'Capteurs, RTC'],
          ['1-Wire', '15 kbps', '1', 'Bus', 'Capteurs Dallas'],
          ['CAN', '1 Mbps', '2', 'Bus', 'Automobile, industrie'],
        ], caption: 'Tableau récapitulatif VI.5 du cours' },
        { type: 'kv', items: [
          { k: 'Conseil UART', v: "Vérifier le baud rate et les bits de stop/parité." },
          { k: 'Conseil SPI', v: "Configurer le mode (CPOL/CPHA) correctement." },
          { k: 'Conseil I2C', v: "Ajouter des résistances de pull-up (4.7 kΩ sur SDA/SCL)." },
          { k: 'Conseil 1-Wire', v: "Utiliser des bibliothèques dédiées (ex : OneWire)." },
        ] },
        { type: 'kv', items: [
          { k: 'Problème : données corrompues', v: "Bruit électrique → utiliser des câbles blindés." },
          { k: 'Problème : périphérique non détecté', v: "Adresse I2C incorrecte → scanner avec i2cdetect." },
          { k: 'Choix du protocole', v: "Dépend du débit, du nombre de périphériques et de l'environnement." },
        ] },
        { type: 'diagram', diagram: 'SerialCompare' },
      ],
    },
  ],
}
