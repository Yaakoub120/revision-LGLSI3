import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Partie 2 — Modules 17 & 18 : Servomoteur + contrôle d'accès
// RFID complet + GSM ; ESP8266 et WiFi
// ═══════════════════════════════════════════════════════════════

export const imod17: Module = {
  id: 'i17',
  num: 17,
  title: 'Servomoteur, contrôle d\u2019accès & GSM',
  subtitle: 'Fonctionnement PWM du servomoteur, contrôle d\u2019accès RFID complet (servo + LEDs), envoi de SMS via shield GSM/GPRS SIM900',
  icon: '🔐',
  color: 'teal',
  source: 'InternetDesObjets-2.pdf — Servomoteur, Contrôle d\u2019accès avec RFID, 3.4 Shield GSM/GPRS',
  sections: [
    {
      id: 'i17s1',
      title: 'Fonctionnement et contrôle d\u2019un servomoteur',
      blocks: [
        { type: 'definition', term: 'Servomoteur', def: "Un moteur qui peut tourner avec une liberté de 180° et garder de manière précise l'angle de rotation. Utilisé pour contrôler des systèmes mécaniques (gouverne d'avion, accélérateur, mini-robots, etc.). Il existe divers types de taille, poids et couple (force) différents — exemple : servomoteur chinois « 9 grammes »." },
        { type: 'paragraph', text: "Fonctionnement : un circuit électronique contrôle un moteur à courant continu en fonction de la position d'un potentiomètre intégré au servomoteur. Quand le moteur tourne, il entraîne avec lui le potentiomètre. Le circuit électronique ajuste continuellement la vitesse du moteur pour que le potentiomètre (et par extension le bras) reste au même endroit. Il suffit de donner une consigne au servomoteur (« reste à 45° » par exemple) et le servomoteur fera son maximum pour rester au plus près de cette consigne." },
        { type: 'definition', term: 'Consigne PWM', def: "La consigne est transmise au moyen d'une impulsion numérique (PWM). Pour que le servomoteur reste à une position donnée, il faut transmettre toutes les 20 millisecondes (50 Hz) une impulsion d'une longueur comprise entre 1 et 2 millisecondes :\n\n• Une impulsion de 1 milliseconde correspond à 0°.\n• Une impulsion de 2 millisecondes correspond à 180°.\n• Une impulsion intermédiaire donne les angles intermédiaires." },
        { type: 'diagram', diagram: 'ServoPwm' },
        { type: 'note', title: 'Attention', text: "À la consommation électrique du servomoteur — solution : câbler les servomoteurs à une alimentation 5 volts dédiée." },
      ],
    },
    {
      id: 'i17s2',
      title: 'La bibliothèque Servo',
      blocks: [
        { type: 'kv', items: [
          { k: 'Nom', v: "La bibliothèque de code à utiliser est nommée Servo." },
          { k: 'Capacité', v: "Elle permet de contrôler jusqu'à 12 servomoteurs simultanément." },
          { k: 'Effet de bord', v: "Elle rend inutilisable les broches D9 et D10 en PWM avec analogWrite()." },
        ] },
        { type: 'code', lang: 'arduino', caption: 'Balayage 0° → 180° → 0° (code du cours)', code: `#include <Servo.h>
Servo monServomoteur; // créer un objet Servo

void setup() {
  monServomoteur.attach(9); // numéro de broche sur laquelle le servomoteur est câblé
}
void loop() {
  // Fait bouger le bras de 0° à 180°
  for (int position = 0; position <= 180; position++) {
    monServomoteur.write(position);
    delay(15);
  }
  // Fait bouger le bras de 180° à 0°
  for (int position = 180; position >= 0; position--) {
    monServomoteur.write(position);
    delay(15);
  }
}` },
      ],
    },
    {
      id: 'i17s3',
      title: "Contrôle d'accès RFID complet (servo + LEDs)",
      blocks: [
        { type: 'paragraph', text: "On teste le module RFID en assemblant un contrôle d'accès qui vérifie le droit d'accès (ou non) à travers une porte contrôlée par un servomoteur (microservo 9G) et deux LEDs d'accès accordé ou refusé. Montage : RFID + servomoteur + LED verte (broche 5, accès libéré) + LED rouge (broche 6, accès refusé)." },
        { type: 'code', lang: 'arduino', caption: "Programme complet de contrôle d'accès (code du cours)", code: `#include <SPI.h>
#include <MFRC522.h>
#include <Servo.h>
Servo microservo9g;
#define SS_PIN 10
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN);
int led_libéré = 5;
int led_refusé = 6;
char st[20];

void setup() {
  pinMode(led_libéré, OUTPUT);
  pinMode(led_refusé, OUTPUT);
  microservo9g.attach(3);
  microservo9g.write(90);
  Serial.begin(9600);
  SPI.begin();
  mfrc522.PCD_Init();
  Serial.println(" Rapprochez votre carte du lecteur...");
  Serial.println();
}

void loop() {
  if ( ! mfrc522.PICC_IsNewCardPresent()) { return; }
  if ( ! mfrc522.PICC_ReadCardSerial()) { return; }
  Serial.print(" Numéro d'identification UID:");
  String contenu = "";
  byte lettre;
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
    Serial.print(mfrc522.uid.uidByte[i], HEX);
    contenu.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
    contenu.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  Serial.println();
  Serial.print(" Publier : ");
  contenu.toUpperCase();
  if (contenu.substring(1) == "D8 4B 12 22") {
    microservo9g.write(-90);
    digitalWrite(led_libéré, HIGH);
    Serial.println(" Carte 1 - Accès débloqué !");
    Serial.println(); delay(3000);
    microservo9g.write(90);
    digitalWrite(led_libéré, LOW);
  }
  if (contenu.substring(1) == "87 4B DC 8A") {
    Serial.println(" Carte 2 - Accès refusé !!");
    Serial.println();
    for (int i = 1; i < 5; i++) {
      digitalWrite(led_refusé, HIGH); delay(200);
      digitalWrite(led_refusé, LOW);  delay(200);
    }
  }
  delay(1000);
}` },
        { type: 'note', title: 'Logique à retenir', text: "UID lu en hexadécimal → concaténé dans une chaîne → toUpperCase() → comparaison à un UID autorisé (« D8 4B 12 22 » → servo + LED verte 3 s) ou refusé (« 87 4B DC 8A » → LED rouge clignote 4 fois)." },
      ],
    },
    {
      id: 'i17s4',
      title: 'Objets IoT connectés via un Shield GSM/GPRS (SIM900)',
      blocks: [
        { type: 'paragraph', text: "Autre mode de connexion : le shield GSM/GPRS ITEA. Câblage du cours : Pin 2 = TX, Pin 3 = RX, carte SIM sans code PIN. Le programme d'exemple envoie un SMS toutes les heures." },
        { type: 'code', lang: 'arduino', caption: "Programme d'envoi d'un SMS toutes les heures (code du cours)", code: `//Programme d'envoi d'un sms toutes les heures
//Shield GSM/GRPRS ITEA //Arduino uno //Pin 2 : TX //Pin 3 : RX
//Carte sim sans code pin
#include "SIM900.h"
#include <SoftwareSerial.h>
#include "sms.h"
SMSGSM sms;
int numdata;
boolean started = false;
char smsbuffer[160];
char n[20];
char num_tph[] = "+21698600000";

void setup() {
  //Serial connection.
  Serial.begin(9600);
  Serial.println("GSM Shield testing.");
  //Start configuration of shield with baudrate 2400 (pour le shield ITEA)
  if (gsm.begin(2400)) {
    Serial.println("\\nstatus=READY");
    started = true;
  } else Serial.println("\\nstatus=IDLE");
  if (started) {
    if (sms.SendSMS(num_tph, "start"))
      Serial.println("\\nSMS sent OK");
  }
}

void loop() {
  if (started) {
    sms.SendSMS(num_tph, "message");
    delay(3600000);   // 1 heure
  }
}` },
      ],
    },
  ],
}

export const imod18: Module = {
  id: 'i18',
  num: 18,
  title: 'Connectivité WiFi : module ESP8266',
  subtitle: "Module ESP-01, câblage, commandes AT, méthodes manuelle et automatique, application contrôle des LEDs et diagrammes fonctionnels (STA, soft-AP, client/serveur)",
  icon: '📶',
  color: 'teal',
  source: 'InternetDesObjets-2.pdf — 3.4 Via un WiFi ESP8266 & 3.5 Diagrammes fonctionnels',
  sections: [
    {
      id: 'i18s1',
      title: 'Le module WiFi ESP8266 (ESP-01)',
      blocks: [
        { type: 'definition', term: 'Module WiFi ESP8266 (ESP-01)', def: "Un réseau WiFi complet où on peut facilement se connecter, en tant qu'adaptateur Wi-Fi de service, grâce à sa connectivité via la communication série ou l'interface UART." },
        { type: 'kv', items: [
          { k: 'Programmation', v: "Il peut être programmé en utilisant directement les commandes AT (abréviation de ATtention), le code Arduino, ou encore le micrologiciel Python." },
          { k: 'Alimentation', v: "L'ESP8266 n'est strictement alimenté qu'en 3,3 V." },
          { k: 'Câblage', v: "GND→GND · VIN→3.3v · ENABLE (CH_PD)→3.3v · TX→RX · RX→TX (croisement)." },
        ] },
        { type: 'note', title: 'Avertissement', text: "Sur le web, de nombreuses informations sont périmées ou tout simplement fausses — vérifiez vos sources sur l'ESP8266." },
      ],
    },
    {
      id: 'i18s2',
      title: 'Les commandes AT',
      blocks: [
        { type: 'table', headers: ['Commande', 'Description', 'Type'], rows: [
          ['AT+RST', 'Restart module', 'basic'],
          ['AT+CWMODE', 'Wifi mode', 'wifi'],
          ['AT+CWJAP', 'Join AP wifi', 'wifi'],
          ['AT+CWLAP', 'List AP wifi', 'wifi'],
          ['AT+CWQAP', 'Quit AP wifi', 'wifi'],
          ['AT+CIPSTATUS', 'Get status', 'TCP/IP'],
          ['AT+CIPSTART', 'Set up TCP or UDP', 'TCP/IP'],
          ['AT+CIPSEND', 'Send data', 'TCP/IP'],
          ['AT+CIPCLOSE', 'Close TCP or UDP', 'TCP/IP'],
          ['AT+CIFSR', 'Get IP', 'TCP/IP'],
          ['AT+CIPMUX', 'Set multiple connections', 'TCP/IP'],
          ['AT+CIPSERVER', 'Set as server', 'TCP/IP'],
        ], caption: 'Table des commandes AT du module ESP8266' },
        { type: 'code', lang: 'terminal', caption: "Séquence d'initialisation manuelle (terminal réglé sur CR+LF, 115200 bauds)", code: `AT+RST                          // remise à zéro
AT+CWMODE=3                     // 3 : mode Client/Serveur, 2 : mode AP
AT+CWLAP                        // lister les points d'accès AP
AT+CWJAP="nom du réseau", "mot de passe"  // connecter au wifi
AT+CIFSR                        // connaître l'adresse IP de l'ESP` },
        { type: 'note', title: 'Méthode 1 — parler au module manuellement', text: "Téléverser le sketch Blink pour allouer la liaison série, régler le terminal pour envoyer CR et LF en fin de ligne et le débit à 115200 bauds, puis envoyer la commande AT (suivie d'un retour à la ligne)." },
      ],
    },
    {
      id: 'i18s3',
      title: 'Méthode 2 : parler au module automatiquement',
      blocks: [
        { type: 'paragraph', text: "Pour piloter l'ESP8266 depuis le code Arduino, il faut au minimum deux serials hardware (un pour le PC, un pour l'ESP). Solution : utiliser les GPIO 10 et 11 via la bibliothèque SoftwareSerial." },
        { type: 'code', lang: 'arduino', caption: 'Configuration automatique (extraits du cours)', code: `SoftwareSerial ESP8266(10, 11); // configurer les Pin 10 et 11 comme un second bus série

void setup() {
  Serial.begin(115200);
  ESP8266.begin(115200);        // activation de la 2ième communication série
  ESP8266.println("AT+RST");    // envoie d'une commande AT à l'ESP
  Serial.print(ESP8266.read()); // lecture (par caractères) de la réponse du ESP
}` },
        { type: 'paragraph', text: "En Lua (module autonome), on peut aussi créer un serveur web : srv = net.createServer(net.TCP) puis srv:listen(80, function(conn) conn:on(\"receive\", function(client, request) …" },
        { type: 'note', title: 'Application IOT-1 : contrôle à distance des LEDs', text: "L'ESP démarre en mode Point d'Accès, on peut donc s'y connecter à l'aide d'un smartphone pour un contrôle à distance. L'environnement de développement utilisé est RemoteXY (séquence vidéo YouTube du cours ; code : goo.gl/cxptgA)." },
      ],
    },
    {
      id: 'i18s4',
      title: 'Diagrammes fonctionnels : station, point d\u2019accès, client/serveur',
      blocks: [
        { type: 'definition', term: "L'ESP8266 en mode station (STA)", def: "Les appareils qui se connectent aux réseaux WiFi sont appelés stations (STA). La connexion au WiFi est assurée par un point d'accès (AP), qui fait office de concentrateur pour une ou plusieurs stations. De l'autre extrémité, l'AP est connecté à un réseau câblé. Pour fournir un accès à l'Internet, l'AP intègre généralement un routeur. Chaque AP est reconnu par un SSID (Service Set IDentifier), le nom du réseau qu'on sélectionne lors de la connexion. En cas de perte de connexion ou redémarrage, l'ESP8266 se reconnectera automatiquement au dernier AP utilisé (les informations sont enregistrées dans sa mémoire flash)." },
        { type: 'definition', term: "L'ESP8266 comme point d'accès logiciel (soft-AP)", def: "L'ESP8266 peut fonctionner comme une station, pour se connecter à un réseau WiFi. Il peut aussi fonctionner comme un AP logiciel (soft-AP), pour établir son propre réseau WiFi et connecter d'autres stations au module ESP. Il peut également fonctionner à la fois comme station et soft-AP — cela offre la possibilité de construire des réseaux maillés. Le nombre maximum de stations pouvant être connectées simultanément au soft-AP est, par défaut, égal à 4 (peut être réglé de 0 à 8)." },
        { type: 'definition', term: 'Client / Serveur', def: "La classe Client crée des clients qui peuvent accéder aux services fournis par les serveurs afin d'envoyer, recevoir et traiter des données. La classe serveur crée des serveurs qui fournissent des fonctionnalités à d'autres programmes ou périphériques, appelés clients. La connexion entre modules Wi-Fi ESP8266 offre une solution pour les applications IoT." },
        { type: 'diagram', diagram: 'Esp8266Modes' },
      ],
    },
  ],
}
