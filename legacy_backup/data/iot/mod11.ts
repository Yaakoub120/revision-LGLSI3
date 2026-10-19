import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Partie 2 fin & Partie 3 début — Module 21 (MQTT & brokers),
// Module 22 (Débuter sur Raspberry Pi)
// ═══════════════════════════════════════════════════════════════

export const imod21: Module = {
  id: 'i21',
  num: 21,
  title: 'MQTT avec ESP32 & brokers',
  subtitle: 'Fonctionnement publisher/broker/subscriber, envoi avec PubSubClient, réception sur smartphone (MyMQTT), brokers open-source et gratuits',
  icon: '📨',
  color: 'teal',
  source: 'InternetDesObjets-2.pdf — 4.2 Application IOT-4, 4.3, 4.4',
  sections: [
    {
      id: 'i21s1',
      title: 'Comment fonctionne le MQTT ?',
      blocks: [
        { type: 'definition', term: 'MQTT (Message Queue Telemetry Transport)', def: "Un protocole de communication simple à utiliser et qui ne nécessite pas beaucoup de puissance de traitement ou de grandes ressources de bande passante réseau." },
        { type: 'kv', items: [
          { k: 'Publisher (éditeur)', v: "Qui envoie des messages." },
          { k: 'Broker (serveur MQTT)', v: "À mi-chemin, responsable de la gestion des échanges de messages." },
          { k: 'Subscriber (abonné)', v: "Qui lit des messages envoyés par le Publisher." },
          { k: 'Objectif de l\u2019application IOT-4', v: "Envoyer un message MQTT en utilisant le module ESP32 ; le message est envoyé à un smartphone Android en utilisant le cloud. À la place de l'ESP32, on peut également utiliser la carte Arduino + ESP8266." },
        ] },
        { type: 'diagram', diagram: 'MqttFlow' },
      ],
    },
    {
      id: 'i21s2',
      title: 'MQTT en utilisant Arduino IDE (PubSubClient)',
      blocks: [
        { type: 'steps', items: [
          { title: '1. Installer la carte ESP32', text: "Menu Fichier → Préférences : mettre https://dl.espressif.com/dl/package_esp32_index.json dans l'URL des gestionnaires de cartes ; Outils → Carte → Gestionnaire de carte → installer le module ESP32." },
          { title: '2. Installer PubSubClient', text: "La bibliothèque de client MQTT fournit des API pour utiliser le protocole MQTT. Croquis → Ajouter une bibliothèque → Gérer les bibliothèques → installer PubSubClient (communication MQTT)." },
          { title: '3. Sélectionner la carte', text: "Sélectionner la carte du module de développement ESP32 dans le menu Outils." },
          { title: '4. Charger le programme', text: "Se connecter au réseau WiFi et au serveur MQTT (mqtt.eclipse.org) et envoyer des messages à des intervalles de 30 secondes. Modifier les lignes du ssid et du mot de passe du réseau WiFi." },
        ] },
        { type: 'code', lang: 'arduino', caption: 'Programme : module ESP32 WiFi avec MQTT (code du cours)', code: `//Programme: module ESP32 Wifi avec MQTT
#include <WiFi.h>
#include <PubSubClient.h>
const char* ssid = "WIFI-FSM";
const char* password = "12457894";
const char* mqttServer = "mqtt.eclipse.org";
const int mqttPort = 1883;
const char* mqttUser = "abcdefg";
const char* mqttPassword = "123456";
WiFiClient espClient;
PubSubClient client(espClient);
int compteur = 1;
char message[30];

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Démarrage de la connexion WiFi..");
  }
  Serial.println("Connecté au réseau WiFi!");
}

void loop() {
  //Se connecte au Broker MQTT
  reconnectbroker();
  sprintf(message, "MQTT ESP32-message no. %d", compteur);
  Serial.print(" Message envoyé: ");
  Serial.println(message);
  //Envoyez le message au broker
  client.publish("LSI3IOT", message);
  Serial.println("Message envoyé avec succès...");
  compteur++;
  delay(30000);
}

void reconnectbroker() {
  // Connexion au broker MQTT
  client.setServer(mqttServer, mqttPort);
  while (!client.connected()) {
    Serial.println(" Connexion au broker MQTT...");
    if (client.connect("ESP32Client", mqttUser, mqttPassword)) {
      Serial.println(" Connexion au broker!");
    } else {
      Serial.print("Échec de la connexion au Broker- État:");
      Serial.print(client.state());
      delay(2000);
    }
  }
}` },
      ],
    },
    {
      id: 'i21s3',
      title: 'Réception des données MQTT sur le smartphone (MyMQTT)',
      blocks: [
        { type: 'steps', items: [
          { title: '1. Installer MyMQTT', text: "Application disponible sur Google Play pour recevoir les données envoyées par le module ESP32 via MQTT." },
          { title: '2. Configurer le broker', text: "Menu → Settings → entrer iot.eclipse.org → Save." },
          { title: '3. S\u2019abonner au topic', text: "De retour au menu, sélectionner Subscribe et entrer le topic auquel on souhaite s'abonner — dans notre cas le nom du topic est LSI3IOT. Cliquer sur Add pour enregistrer." },
          { title: '4. Suivre la réception', text: "Revenir à l'écran principal (Dashboard) et suivre la réception des messages MQTT envoyés par l'ESP32." },
        ] },
        { type: 'note', title: 'Bonus', text: "Il est aussi possible d'envoyer des commandes à partir du smartphone vers l'ESP32." },
      ],
    },
    {
      id: 'i21s4',
      title: 'Brokers MQTT open-source et gratuits',
      blocks: [
        { type: 'paragraph', text: "Les principaux projets de brokers Open Source :" },
        { type: 'kv', items: [
          { k: 'ActiveMQ', v: "Permet d'ajouter MQTT à un serveur Web Apache." },
          { k: 'JoramMQ', v: "Pour l'intégration de MQTT en Java." },
          { k: 'Mosquitto', v: "Le plus utilisé dans les projets DIY, soutenu par la fondation eclipse.org." },
          { k: 'RabbitMQ', v: "Disponible également avec un support commercial ; plus orienté entreprise." },
          { k: 'EMQTT', v: "Conçu pour recevoir de nombreuses connexions (jusqu'à 1 million par serveur). Il est possible de créer un cluster (réseau de serveurs) pour accroître le nombre de connexions simultanées." },
        ] },
        { type: 'note', title: 'Conclusion du cours', text: "ActiveMQ et JoramMQ sont des brokers assez spécifiques. RabbitMQ est plus orienté entreprise. Mosquitto est un très bon choix : disponible sur toutes les plateformes et s'installe en quelques minutes." },
        { type: 'table', headers: ['Adresse', 'Ports', 'Type', 'Info'], rows: [
          ['iot.eclipse.org', '1883, 80 (WebSockets)', 'mosquitto', 'web page, Xively statistics, topics and HTTP bridge'],
          ['test.mosquitto.org', '1883, 8883 (SSL), 8884 (SSL), 80 (WebSockets)', 'mosquitto', 'web page, Xively statistics, topics and HTTP bridge'],
          ['dev.rabbitmq.com', '1883', 'rabbitmq', 'admin dashboard'],
          ['broker.mqttdashboard.com', '1883, 8000 (WebSockets)', 'HiveMQ', 'information page, statistics and dashboard'],
          ['q.m2m.io', '1883', 'm2m.io', 'requires signup/username and password'],
          ['www.cloudmqtt.com (l\u2019hôte réel varie)', '18443, 28443 (SSL)', 'mosquitto', 'nécessite inscription / identifiants, prix (plan gratuit disponible), documentation'],
          ['mqtt.simpleml.com', '1883 (MQTT), 8883 (MQTT+SSL), 80 (REST), 80 (WebSockets), 5683 (CoAP)', 'SimpleML', 'Service MQTT gratuit pour évaluer les modèles Machine Learning'],
          ['mqtt.kgbvax.net', '1883 (MQTT)', 'mosquitto', 'Instance partagée gratuite, prend en charge la persistance'],
        ], caption: 'Brokers accessibles au public, utiles pour les tests et le prototypage (4.4)' },
      ],
    },
  ],
}

export const imod22: Module = {
  id: 'i22',
  num: 22,
  title: 'Débuter sur Raspberry Pi',
  subtitle: "Installation de l'OS, bureau à distance (xrdp, VNC), et les outils utiles SSH, SCP, rsync, cron",
  icon: '🍓',
  color: 'rose',
  source: 'InternetDesObjets-3.pdf — Bien débuter sur le Raspberry Pi',
  sections: [
    {
      id: 'i22s1',
      title: "Bien débuter : installation du système d'exploitation",
      blocks: [
        { type: 'paragraph', text: "Le Raspberry Pi charge son système d'exploitation à partir du lecteur de carte micro SD." },
        { type: 'steps', items: [
          { title: '1. Télécharger Raspberry Pi OS', text: "Raspberry Pi OS (raspberrypi.org/software) est un logiciel simplifiant le processus d'installation du système d'exploitation. Cliquer sur « See all download options » : deux configurations existent — OS with desktop ou OS Lite (une image avec ou sans interface graphique)." },
          { title: '2. Copier sur la carte SD', text: "Pour installer l'OS, il suffit de copier les fichiers décompressés sur la carte SD formatée en FAT32 (avec Balena Etcher pour la partition/validation)." },
          { title: '3. Premier démarrage', text: "Il nécessite un écran avec entrée HDMI, un clavier ainsi qu'une souris. Le Raspberry Pi s'initialise… puis le bureau apparaît après quelques secondes." },
        ] },
      ],
    },
    {
      id: 'i22s2',
      title: 'Se connecter au bureau depuis un PC Windows',
      blocks: [
        { type: 'definition', term: 'Configuration côté Raspberry', def: "Installer les outils de bureau à distance pour Linux : xrdp et tightvncserver.\n\nsudo apt-get install tightvncserver\nsudo apt-get install xrdp" },
        { type: 'definition', term: 'Configuration côté Windows', def: "1. Lancer l'outil « Connexion Bureau à distance ».\n2. Une fois ouvert, entrer l'adresse IP du Raspberry (disponible en tapant ifconfig dans un terminal).\n3. Se connecter avec vos identifiants et mots de passe (par défaut pi et raspberry)." },
      ],
    },
    {
      id: 'i22s3',
      title: 'Autres outils utiles',
      blocks: [
        { type: 'paragraph', text: "D'autres outils sont utiles lors de l'utilisation, par exemple, de l'appareil photo ou d'une webcam :" },
        { type: 'table', headers: ['Outil', 'Utilité'], rows: [
          ['SSH', "Utilisée pour accéder à distance au Raspberry Pi via un réseau local."],
          ['SCP', "Permet de copier via SSH des photos prises par le Pi sur un ordinateur principal."],
          ['rsync', "Utilisée pour synchroniser les dossiers des photos prises entre Pi et l'ordinateur."],
          ['cron', "Planifie la prise d'une photo à un intervalle donné, comme chaque minute pour capturer un laps de temps (timelapse)."],
        ], caption: 'SSH · SCP · rsync · cron' },
        { type: 'diagram', diagram: 'PiSetup' },
      ],
    },
  ],
}
