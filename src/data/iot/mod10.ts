import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Partie 2 — Modules 19 & 20 : Applications ThingSpeak & smart
// farming ; ESP32 programmation + serveur web
// ═══════════════════════════════════════════════════════════════

export const imod19: Module = {
  id: 'i19',
  num: 19,
  title: 'Applications : station météo & smart farming',
  subtitle: 'Station météo à distance avec ThingSpeak (7 étapes) et réseau ESP8266 hybride pour un champ de 5 km²',
  icon: '🌦️',
  color: 'teal',
  source: 'InternetDesObjets-2.pdf — 3.6 Station météo à distance & 3.7 Smart farming',
  sections: [
    {
      id: 'i19s1',
      title: 'Application IOT-2 : station météo à distance (montage)',
      blocks: [
        { type: 'paragraph', text: "Objectif : une station météo à distance (humidité et température) en utilisant ThingSpeak — un service Cloud gratuit de surveillance et de contrôle des systèmes à distance." },
        { type: 'kv', items: [
          { k: 'Composants', v: "Carte Arduino, capteur d'humidité et de température DHT11 et le module ESP8266 WIFI." },
          { k: 'Câblage DHT11', v: "Le module DHT11 est connecté au GPIO 12." },
          { k: 'Acquisition', v: "L'Arduino recueille les données en deux parties : l'humidité puis la température." },
          { k: 'Câblage ESP8266', v: "Les broches Tx et Rx de l'ESP8266 sont directement connectées aux GPIO 2 et 3." },
          { k: 'Bibliothèque', v: "La « Software Serial Library » est utilisée pour permettre la communication série sur les GPIO 2 et 3 d'Arduino." },
        ] },
        { type: 'diagram', diagram: 'ThingspeakFlow' },
      ],
    },
    {
      id: 'i19s2',
      title: 'Les 7 étapes ThingSpeak',
      blocks: [
        { type: 'steps', items: [
          { title: '1. Créer un compte et un canal', text: "Sur ThingSpeak.com, créer un compte, cliquer sur l'option « New Channel » dans le menu « Channels »." },
          { title: '2. Configurer le canal', text: "Cocher les cases champs 1 et 2 (Field 1 et 2), remplir « Humidity » et « Temperature » dans les deux étiquettes et cocher « Rendre public » (Make public). La nouvelle chaîne est créée." },
          { title: '3. Récupérer la clé API', text: "Cliquer sur l'onglet « API Key » et récupérer la clé API d'écriture pour le champ char * api_key du code." },
          { title: '4. Copier l\u2019URL de mise à jour', text: "Dans « Data Import/Export », copier l'URL « Update Channel Feed GET Request » : https://api.thingspeak.com/update?api_key=XXXXX&field1=0." },
          { title: '5. Envoyer depuis le code', text: "Ouvrir « api.thingspeak.com » à l'aide de la fonction http Get, avec postUrl pour envoyer les données via la requête GET au serveur." },
          { title: '6. Tester les liens', text: "Lancer dans un navigateur https://api.thingspeak.com/update?api_key=XXXXX&field1=31 : dans l'onglet Private View la valeur 31 s'affiche dans le graphe quelques secondes après." },
          { title: '7. Visualiser sur smartphone', text: "Pour recevoir les données sous forme de graphique sur le smartphone via ThingSpeak, utiliser l'application Virtuino (disponible sur Google Play)." },
        ] },
      ],
    },
    {
      id: 'i19s3',
      title: 'Application IOT-3 : smart farming — le problème et la solution',
      blocks: [
        { type: 'paragraph', text: "Problème : un agriculteur, qui cultive des légumes sur un champ de 5 kilomètres carrés, cherche à mettre en œuvre un système Wi-Fi de surveillance de la température et de l'humidité entièrement indépendant, autonome et sans utiliser des fils." },
        { type: 'definition', term: 'Solution : réseau Wi-Fi ESP8266', def: "• Diviser le champ en 4 parties de zones.\n• Dans chaque zone, on construit un sous-réseau de 9 ESP8266.\n• Au centre du terrain, on place un boîtier central (central Box) contenant : 1 module ESP8266, 1 Arduino Uno, 1 module compatible GPRS Arduino.\n• Dans chaque sous-réseau : 3 ESP comme répéteurs de signaux (middleman) et 6 autres ESP pour les lectures des capteurs (workers)." },
        { type: 'diagram', diagram: 'SmartFarming' },
      ],
    },
    {
      id: 'i19s4',
      title: 'Comment programmer les modules ?',
      blocks: [
        { type: 'kv', items: [
          { k: 'Workers (6 par zone)', v: "La plupart du temps en DEEP_SLEEP, se réveillent à 1 heure d'intervalle pour lire les capteurs, se connectent à l'AP ESP le plus proche et envoient une requête HTTP à son serveur avec les données. Si l'AP middleman le plus proche n'était pas disponible : conserver jusqu'à 10 lectures dans leurs mémoires internes et les envoyer dès que l'AP est réveillé. Alimentation : 4 piles Li-Ion 3,3 V branchées en parallèle, chargées par des panneaux solaires de 15 V. Les capteurs utilisés sont à 1 fil." },
          { k: 'Middleman (3 par zone)', v: "À la fois en AP et ST avec un serveur Web démarré, en attente des requêtes des workers. Programmés pour écouter et recevoir les lectures des workers, puis les envoyer au prochain middleman jusqu'à l'ESP du central Box." },
          { k: 'Adresses IP', v: "Les workers (clients) utilisent des adresses IP statiques afin de réduire le temps nécessaire pour se connecter à l'AP." },
          { k: 'Central Box', v: "Chargé de recevoir et traiter les données des middlemans les plus proches, et de les envoyer dans une base de données MySQL via le module GPRS au format JSON/XML, une fois par jour. Les données reçues (toutes les heures) peuvent être stockées en format CSV sur un module de carte SD attaché à l'Arduino UNO." },
          { k: 'Découverte', v: "Les ESP central et middlemans sont programmés comme un agent de découverte : envoi de requêtes PING vers les AP à proximité pour vérifier la disponibilité et envoyer l'état et les mesures à la base de données." },
        ] },
      ],
    },
  ],
}

export const imod20: Module = {
  id: 'i20',
  num: 20,
  title: 'Programmer l\u2019ESP32',
  subtitle: "Installation dans l'IDE Arduino, paramètres de carte, Blink, scan WiFi, connexion au réseau et serveur web complet",
  icon: '⚙️',
  color: 'teal',
  source: 'InternetDesObjets-2.pdf — 4. Programmer ESP32 & 4.1',
  sections: [
    {
      id: 'i20s1',
      title: "Installation de l'ESP32 dans l'IDE Arduino",
      blocks: [
        { type: 'definition', term: 'ESP32', def: "Une évolution de l'ESP8266, intégrant la gestion du Wi-Fi et du Bluetooth, apprécié dans le domaine de l'Internet des objets." },
        { type: 'steps', items: [
          { title: '1. Ajouter l\u2019URL des cartes', text: "Dans Fichier/Préférences → « URL de gestionnaire de carte supplémentaires », ajouter : https://dl.espressif.com/dl/package_esp32_index.json" },
          { title: '2. Connecter la carte', text: "Connecter l'ESP32-WROOM à l'ordinateur avec un câble micro-USB et valider le port COM utilisé (Outils → Port COM)." },
          { title: '3. Environnements', text: "Développement : Esplorer (ESP-IDF : Espressif IoT Development Framework) ou l'IDE Arduino." },
        ] },
        { type: 'table', headers: ['Paramètre', 'Valeur du cours'], rows: [
          ['Type de carte', 'ESP32 Dev Module'],
          ['Upload Speed', '115200 (vitesse de transfert)'],
          ['CPU Frequency', '240MHz (WIFI/BT)'],
          ['Flash Frequency', '80MHz'],
          ['Flash Mode', 'QIO'],
          ['Flash Size', '4MB (32Mb)'],
          ['Partition scheme', 'Default 4MB with spiffs (1.2MB APP/1.5MB SPIFFS)'],
          ['Core Debug Level', 'Rien'],
          ['PSRAM', 'Disabled'],
          ['Port', 'COM4 (votre n° de port COM — Windows)'],
        ], caption: 'Paramètres de carte ESP32 (Outils menu)' },
      ],
    },
    {
      id: 'i20s2',
      title: 'Blink sur ESP32 & bouton BOOT',
      blocks: [
        { type: 'paragraph', text: "Pour vérifier le bon fonctionnement de l'ESP32-WROOM, on exécute le code pour faire clignoter la LED de la carte (LED interne = pin 1)." },
        { type: 'code', lang: 'arduino', caption: 'Blink ESP32 (code du cours)', code: `int Led = 1;               // Ajouter int Led=1; (pin1)

void setup() {
  pinMode(Led, OUTPUT);    // Modifier la variable
}
void loop() {
  digitalWrite(Led, HIGH); // Modifier la variable
  delay(1000);
  digitalWrite(Led, LOW);
  delay(1000);
}` },
        { type: 'note', title: 'Astuce de téléversement', text: "Lorsque l'IDE Arduino affiche « Connecting .... », appuyer durant 2 à 3 secondes sur le bouton [BOOT] de l'ESP32 pour démarrer le téléversement." },
      ],
    },
    {
      id: 'i20s3',
      title: 'Vérifier le WiFi : scan et connexion',
      blocks: [
        { type: 'paragraph', text: "Téléverser le code « Fichier/Exemples (Exemples pour ESP32 Dev Module)/WiFi/WifiScan », ouvrir le moniteur série et vérifier la vitesse pour un affichage correct." },
        { type: 'code', lang: 'arduino', caption: 'WifiScan (code du cours, simplifié)', code: `#include "WiFi.h"
void setup() {
  Serial.begin(115200);
  // Set WiFi to station mode and disconnect from an AP if it was previously connected
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);
  Serial.println("Setup done");
}
void loop() {
  Serial.println("scan start");
  int n = WiFi.scanNetworks();   // nombre de réseaux trouvés
  Serial.println("scan done");
  if (n == 0) {
    Serial.println("no networks found");
  } else {
    Serial.print(n); Serial.println(" networks found");
    for (int i = 0; i < n; ++i) {
      Serial.print(i + 1); Serial.print(": ");
      Serial.print(WiFi.SSID(i));           // nom du réseau
      Serial.print(" (");
      Serial.print(WiFi.RSSI(i));           // force du signal
      Serial.print(")");
      Serial.println((WiFi.encryptionType(i) == WIFI_AUTH_OPEN) ? " " : "*");
      delay(10);
    }
  }
  delay(5000);
}` },
        { type: 'code', lang: 'arduino', caption: 'Se connecter au réseau WiFi (code du cours)', code: `#include "WiFi.h"
const char* ssid = "...";   // nom du routeur WiFi
const char* pwd  = "...";   // mot de passe

void setup() {
  Serial.begin(9600);
  Serial.println("Configuration du WiFi");
  WiFi.begin(ssid, pwd);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connexion au WiFi..");
  }
  Serial.println("Connecté au réseau WiFi");
}
void loop() {
  delay(1000);
  if (WiFi.status() == WL_CONNECTED) {
    Serial.print("Est connecté au réseau avec ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("N'est pas connecté au réseau");
  }
}` },
      ],
    },
    {
      id: 'i20s4',
      title: 'Un serveur web simple avec ESP32',
      blocks: [
        { type: 'paragraph', text: "L'accès se fait avec par exemple http://192.168.1.7/test. Le script utilise la bibliothèque WebServer : le serveur écoute sur le port 80 et répond à 4 routes." },
        { type: 'code', lang: 'arduino', caption: 'Serveur web ESP32 (structure du code du cours)', code: `#include <WiFi.h>
#include <WebServer.h>
const char* ssid = "...";
const char* pwd  = "...";
WebServer server(80);

void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid, pwd);
  while (WiFi.status() != WL_CONNECTED) { delay(200); Serial.print("."); }
  Serial.println("WiFi connecté!");
  Serial.println(WiFi.localIP());
  server.on("/", deal_onConnect);        // route racine
  server.on("/test", deal_aTest);        // route /test
  server.on("/temps", deal_temperatures);// route /temps -> "C: 20.6 17.8 22.5"
  server.onNotFound(deal_notFound);      // 404
  server.begin();
}
void deal_onConnect() {
  server.send(200, "text/html", SendHTML("Connect sur root"));
}
// ... les autres handlers utilisent server.send(200, "text/html", ...)
String SendHTML(String content) {
  String ptr = "<!DOCTYPE html> <html>\\n";
  ptr += "<head><meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\">\\n";
  ptr += "<title>ESP32 Web Server</title>\\n";
  // ... style CSS ...
  ptr += "<body><h1>ESP32 Web Server</h1><h3>" + content + "</h3></body></html>\\n";
  return ptr;
}
void loop() {
  server.handleClient();
  delay(1000);
}` },
      ],
    },
  ],
}
