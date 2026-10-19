import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Partie 2 — Modules 15 & 16 : Initiation Arduino Uno ;
// Objets IoT LM35 & RFID
// ═══════════════════════════════════════════════════════════════

export const imod15: Module = {
  id: 'i15',
  num: 15,
  title: 'Initiation Arduino Uno',
  subtitle: "Plateforme, broches et vocabulaire, cartes et shields, IDE, structure setup/loop, Blink, liaison série, breadboard",
  icon: '🤖',
  color: 'teal',
  source: 'InternetDesObjets-2.pdf — 3. Initiation Arduino Uno (3, 3.1, liaison série, breadboard)',
  sections: [
    {
      id: 'i15s1',
      title: "Qu'est-ce qu'Arduino ? Vocabulaire des broches",
      blocks: [
        { type: 'definition', term: 'Arduino', def: "Une plate-forme de prototypage électronique open source basée sur du matériel et des logiciels flexibles et faciles à utiliser." },
        { type: 'table', headers: ['Sigle', 'Signification'], rows: [
          ['Ports GPIO', 'General Purpose Input/Output'],
          ['Bus SPI', 'Serial Peripheral Interface'],
          ['PWM', "Modulation de largeur d'impulsion"],
          ['Bus I²C', 'Inter-Integrated Circuit'],
          ['ICSP', 'In Circuit Serial Programming'],
          ['MISO', 'Master In/Slave Out'],
          ['SS', 'Slave Select'],
        ], caption: 'Vocabulaire des broches de la carte Arduino Uno' },
        { type: 'paragraph', text: "Sur la carte Uno : broches E/S numériques (Digital PWM~), broches analogiques A0-A5, broches d'alimentation, microcontrôleur Atmega 328, port USB, prise jack d'alimentation, LED de test sur la broche 13, bouton poussoir de RESET manuel, LED de mise sous tension, LED de transmission des données sur les lignes Tx et Rx, connecteurs de téléchargement du système d'exploitation du µC." },
        { type: 'diagram', diagram: 'ArduinoPins' },
      ],
    },
    {
      id: 'i15s2',
      title: 'Cartes, microcontrôleurs et shields',
      blocks: [
        { type: 'kv', items: [
          { k: 'Cartes Arduino', v: "UNO, Mega2560, Mini, Nano, LilyPad, Fio, Pro, …" },
          { k: 'Microcontrôleurs Atmel AVR', v: "Mega328, Mega1280, Mega4809, …" },
          { k: 'Modules disponibles (Shields)', v: "Module Ethernet · Module Dragino LoRa Shield · Module Moteur." },
          { k: 'Autres modules', v: "Module GPS (Sparkfun) · Module SIM900 GSM GPRS Shield pour Arduino · Module Bluetooth HC05 · etc." },
        ] },
      ],
    },
    {
      id: 'i15s3',
      title: "L'environnement de développement (Arduino IDE)",
      blocks: [
        { type: 'paragraph', text: "L'IDE Arduino (arduino.cc/en/Main/Software) permet :" },
        { type: 'list', items: [
          "D'éditer, vérifier, compiler (verify/compile) et charger (upload) le firmware dans la mémoire du microcontrôleur.",
          "De dialoguer avec la carte lors de son fonctionnement (serial monitor).",
          "Il fournit des bibliothèques de code pour étendre les fonctionnalités.",
          "Sélectionner la liaison série COM_XX (menu Tools → serial_port).",
        ] },
        { type: 'definition', term: 'Structure minimale d\u2019un programme Arduino', def: "Le programme est au moins constitué de 2 fonctions : la fonction void setup() qui assure l'initialisation des E/S du microcontrôleur, et la fonction void loop() (qui contient les instructions) qui est indéfiniment exécutée." },
      ],
    },
    {
      id: 'i15s4',
      title: 'Téléverser votre premier programme : Blink',
      blocks: [
        { type: 'paragraph', text: "Matériel nécessaire : PC + carte Arduino + câble USB. Le programme Blink fait clignoter une LED sur la carte Arduino, reliée au pin digital 13. Cette LED permet de vérifier qu'une carte Arduino fonctionne bien." },
        { type: 'code', lang: 'arduino', caption: 'Programme Blink (code complet du cours)', code: `void setup()
{ //On initialise le pin 13 qui est associé à la LED en sortie
  pinMode(13, OUTPUT);
} //Fin de la fonction setup()

void loop()
{ //La fonction loop() se répète à l'infini une fois setup() exécutée
  digitalWrite(13, HIGH); //Place le pin digital 13 à l'état HAUT (5V) -> Led allumée
  delay(500);             //Met en pause le programme pendant 500 ms
  digitalWrite(13, LOW);  //Place le pin digital 13 à l'état BAS (0V) -> Led éteinte
  delay(500);             //Met en pause le programme pendant 500 ms
} // Fin de loop() => on retourne au début de loop()` },
      ],
    },
    {
      id: 'i15s5',
      title: 'Faire communiquer le PC et la carte : la liaison série',
      blocks: [
        { type: 'definition', term: 'Liaison série', def: "Protocole de communication entre le PC et la carte Arduino via le câble USB, permettant un échange d'informations via un moniteur série (la loupe en haut à droite de la fenêtre Arduino)." },
        { type: 'note', title: '9600 baud', text: "C'est la fréquence de transmission du moniteur série." },
        { type: 'code', lang: 'arduino', caption: 'Envoyer un message vers le moniteur série', code: `void setup() {
  Serial.begin(9600);              // Initialise le moniteur série à 9600 bauds
  Serial.print("Hello les makers ");
  Serial.println(" j'espère que ce tutoriel vous plaît: ");
  Serial.print(" signé : ");
  Serial.println("IoT-LSI3");
}
void loop() {
  // On ne fait strictement rien !
}` },
        { type: 'code', lang: 'arduino', caption: 'Recevoir un message du moniteur série', code: `void loop() {
  if (Serial.available())          // Si un message a été reçu
  {
    Serial.println(Serial.readString()); // Lit le message reçu et l'affiche
  }
  else
  {
    // Si rien n'est reçu faire cela
  }
}` },
      ],
    },
    {
      id: 'i15s6',
      title: "Fonctionnement de la plaque d'essai (breadboard)",
      blocks: [
        { type: 'definition', term: 'Breadboard', def: "Permet de relier facilement les composants entre eux. La plaque est composée de deux zones : les bandes de chaque côté — on branche le VCC et le GND ; la zone centrale — on branche les composants entre eux. Sur le schéma, chaque trait de couleur représente un ensemble de trous reliés entre eux." },
      ],
    },
  ],
}

export const imod16: Module = {
  id: 'i16',
  num: 16,
  title: 'Objets IoT 1 & 2 : capteur LM35 et RFID',
  subtitle: "Lecture analogique de température (LM35), contrôle d'accès RFID (MFRC522) : câblage, bibliothèque et programme de lecture",
  icon: '🌡️',
  color: 'teal',
  source: 'InternetDesObjets-2.pdf — 3.2 Objet IoT 1 (LM35) & 3.3 Objet IoT 2 (RFID)',
  sections: [
    {
      id: 'i16s1',
      title: 'Objet IoT 1 : acquisition de température avec le LM35',
      blocks: [
        { type: 'paragraph', text: "Le LM35 se branche en alimentant les pattes VCC et GND, et en reliant la patte centrale à une entrée analogique. Il mesure des températures comprises entre -55 °C et +150 °C." },
        { type: 'definition', term: 'Lecture du capteur LM35', def: "10 mV ↔ 1 °C. La lecture analogique d'un signal de 0 à 5 V étant codée de 0 à 1023 : Temp = Volt × (5/1023) × 100 — où Volt est la valeur lue entre 0 et 1023." },
        { type: 'code', lang: 'arduino', caption: 'Programme LM35 (code du cours)', code: `float temp;
void setup()
{ Serial.begin(9600);
}
void loop()
{ temp = analogRead(A0) * (5.0 / 1023.0 * 100.0);
  Serial.println(temp);
  delay(1000);
}` },
        { type: 'diagram', diagram: 'Lm35Sim' },
      ],
    },
    {
      id: 'i16s2',
      title: 'Objet IoT 2 : connexion du module RFID MFRC522',
      blocks: [
        { type: 'paragraph', text: "Le module MFRC522 (Radio Frequency IDentification) se câble sur l'Arduino Uno selon la table de correspondance suivante." },
        { type: 'table', headers: ['RFID-RC522', 'Arduino'], rows: [
          ['VCC', '3.3V'],
          ['RST', '9'],
          ['GND', 'GND'],
          ['MISO', '12'],
          ['MOSI', '11'],
          ['SCK', '13'],
          ['NSS', '10'],
        ], caption: 'Table de correspondance RFID-RC522 ↔ Arduino' },
        { type: 'steps', items: [
          { title: 'Installer la bibliothèque', text: "Ouvrir l'IDE Arduino → Croquis → Inclure une bibliothèque → Gérer les bibliothèques." },
          { title: 'Rechercher', text: "Dans le gestionnaire, rechercher « MFRC522 » et installer MFRC522." },
          { title: 'Fermer', text: "Fermer la fenêtre une fois l'installation terminée." },
        ] },
      ],
    },
    {
      id: 'i16s3',
      title: "Programme de lecture d'un badge RFID",
      blocks: [
        { type: 'paragraph', text: "L'exemple de code du cours initialise le module RFID et affiche les données de la carte ou du badge présenté sur le moniteur série (CTRL+MAJ+M pour ouvrir le moniteur série)." },
        { type: 'code', lang: 'arduino', caption: 'Lecture RFID (code du cours)', code: `#include <SPI.h>
#include <MFRC522.h>
// Affectation des broches
#define RST_PIN 9
#define SS_PIN 10
MFRC522 mfrc522(SS_PIN, RST_PIN);

void setup() {
  // Initialisation du Module RFID
  Serial.begin(9600);
  while(!Serial);
  SPI.begin();
  mfrc522.PCD_Init();
  mfrc522.PCD_DumpVersionToSerial(); // Affichage des données de la bibliothèque
  Serial.println(F("Scan PICC to see UID, type, and data blocks..."));
}
void loop() {
  // Attente d'une carte RFID
  if ( ! mfrc522.PICC_IsNewCardPresent()) { return; }
  // Récupération des informations de la carte RFID
  if ( ! mfrc522.PICC_ReadCardSerial()) { return; }
  // Affichage des informations de la carte RFID
  mfrc522.PICC_DumpToSerial(&(mfrc522.uid));
}` },
        { type: 'note', title: 'Fonctions à connaître', text: "PCD_Init() (initialisation), PCD_DumpVersionToSerial() (version), PICC_IsNewCardPresent() (détection), PICC_ReadCardSerial() (lecture UID), PICC_DumpToSerial() (dump complet)." },
      ],
    },
  ],
}
