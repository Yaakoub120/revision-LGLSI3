import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Partie 3 — Modules 25 & 26 : Communication USB Arduino↔Pi ;
// Node-RED sur Raspberry Pi
// ═══════════════════════════════════════════════════════════════

export const imod25: Module = {
  id: 'i25',
  num: 25,
  title: 'Communication USB entre Arduino et Raspberry Pi',
  subtitle: 'Les 3 types de communication série USB : Arduino→Pi, Pi→Arduino, bidirectionnelle — code complet des deux côtés',
  icon: '🔁',
  color: 'rose',
  source: 'InternetDesObjets-3.pdf — Communication USB entre Arduino UNO et Raspberry Pi',
  sections: [
    {
      id: 'i25s1',
      title: 'Principe : tirer avantage des deux cartes',
      blocks: [
        { type: 'paragraph', text: "Pour tirer l'avantage de chaque carte, le mieux est d'établir une communication entre les deux. Le cours met en place 3 types de communication :" },
        { type: 'list', ordered: true, items: [
          'Communication unidirectionnelle Arduino UNO → Raspberry Pi.',
          'Communication unidirectionnelle Raspberry Pi → Arduino UNO.',
          'Communication bidirectionnelle Raspberry Pi ↔ Arduino UNO : mélange les deux précédentes et permet à la fois d\u2019envoyer et recevoir des données.',
        ] },
        { type: 'diagram', diagram: 'ArduinoPiComm' },
      ],
    },
    {
      id: 'i25s2',
      title: '1. Arduino → Raspberry Pi',
      blocks: [
        { type: 'paragraph', text: "Côté Arduino, il suffit de lui demander d'écrire sur la sortie série Serial le message que l'on souhaite transmettre. Attention : ne branchez pas encore l'Arduino au Raspberry Pi." },
        { type: 'code', lang: 'arduino', caption: 'Côté Arduino — envoi toutes les 2 secondes', code: `int i = 0;
void setup() {
  Serial.begin(9600);
  Serial.println("Un message va etre envoye toutes les deux secondes des maintenant!");
}
void loop() {
  Serial.println("Message #" + String(i));
  delay(2000);
  i++;
}` },
        { type: 'steps', items: [
          { title: '1. Trouver le port', text: "Côté Raspberry, entrer la commande Linux : ls /dev/tty* — brancher l'Arduino au port USB et relancer la commande : un nouvel élément apparaît dans la liste (c'est le nom que prend l'Arduino, ex : /dev/ttyACM0)." },
          { title: '2. Lire le port en Python', text: "Programme Python qui utilise la fonction serial.Serial du module pyserial." },
        ] },
        { type: 'code', lang: 'python', caption: 'Côté Raspberry — lecture des messages', code: `# Import de la librairie serial
import serial
# Ouverture du port série avec :
# '/dev/ttyXXXX' : définition du port d'écoute (remplacer 'X' par le bon nom)
# 9600 : vitesse de communication
serialArduino = serial.Serial('/dev/ttyXXXX', 9600)
# Ecriture de chaque message reçu
while True:
    print(serialArduino.readline())` },
      ],
    },
    {
      id: 'i25s3',
      title: '2. Raspberry Pi → Arduino (contrôle des LEDs)',
      blocks: [
        { type: 'paragraph', text: "On va contrôler des LED connectées à l'Arduino à partir du Raspberry. Commencer par brancher les LEDs à l'Arduino : Rouge sur A0, Vert sur A1, Bleu sur A2." },
        { type: 'code', lang: 'arduino', caption: 'Côté Arduino — réception des ordres', code: `#define Rouge A0
#define Vert A1
#define Bleu A2
int message = 0;
int couleurs[] = {Rouge, Vert, Bleu};

void setup() {
  Serial.begin(9600);
  pinMode(Rouge, OUTPUT);
  pinMode(Vert, OUTPUT);
  pinMode(Bleu, OUTPUT);
}
void loop() {
  if (Serial.available()) {
    message = Serial.read() - '0';   // conversion caractère -> chiffre
    if (message > 3) {
      digitalWrite(couleurs[message - 4], LOW);   // éteindre (4=Rouge,5=Vert,6=Bleu)
    } else {
      digitalWrite(couleurs[message - 1], HIGH);  // allumer (1=Rouge,2=Vert,3=Bleu)
    }
  }
}` },
        { type: 'code', lang: 'python', caption: 'Côté Raspberry — envoi des ordres', code: `import serial
ser = serial.Serial('/dev/ttyXXXX', 9600)
print("CTRL + C pour arrêter")
while True:
    led = int(input('Quelle LED souhaitez-vous allumer / éteindre ? (Rouge=1 / Vert=2 / Bleu=3)'))
    action = input("Souhaitez-vous allumer ou Eteindre la LED ? (Allumer=1 / Eteindre=0)")
    if (action == 1):
        ser.write(str(led))          # 1,2,3 -> allumer
    else:
        msg = led + 3                # 4,5,6 -> éteindre
        ser.write(str(msg))` },
        { type: 'note', title: 'Astuce du code', text: "Le Raspberry envoie 1/2/3 pour allumer et LED+3 (4/5/6) pour éteindre ; l'Arduino soustrait '0' pour convertir le caractère reçu en nombre." },
      ],
    },
    {
      id: 'i25s4',
      title: '3. Communication bidirectionnelle',
      blocks: [
        { type: 'paragraph', text: "La communication bidirectionnelle Raspberry Pi ↔ Arduino UNO mélange les deux précédentes et permet à la fois d'envoyer et de recevoir des données : on combine le programme Arduino (Serial.println des mesures + lecture des ordres) et les deux programmes Python (readline + write)." },
      ],
    },
  ],
}

export const imod26: Module = {
  id: 'i26',
  num: 26,
  title: 'Node-RED sur Raspberry Pi',
  subtitle: "Langage graphique pour l'IoT : démarrage, environnement, npm, faire clignoter une LED par flow, module OpenWeatherMap",
  icon: '🧩',
  color: 'rose',
  source: 'InternetDesObjets-3.pdf — Débuter avec Node-Red sur Raspberry Pi',
  sections: [
    {
      id: 'i26s1',
      title: "Qu'est-ce que Node-RED et comment le démarrer ?",
      blocks: [
        { type: 'definition', term: 'Node-RED', def: "Un langage de programmation graphique pour développer des objets connectés, idéal pour comprendre l'IoT. Disponible sur Windows, macOS et inclus par défaut dans la distribution Raspbian." },
        { type: 'kv', items: [
          { k: 'Démarrage (menu)', v: "Menu → Programmation." },
          { k: 'Démarrage (terminal)', v: "sudo node-red-start — et sudo node-red-stop pour arrêter Node-RED." },
          { k: 'Accès web', v: "Le serveur web est démarré et accessible depuis le réseau local sur le port 1880 (voir code ci-dessous)." },
        ] },
        { type: 'code', lang: 'terminal', caption: 'Accès à l\u2019éditeur Node-RED (port 1880)', code: `# Depuis n'importe quel ordinateur du réseau local :
http://ADRESSE_IP_DU_RASPBERRY:1880/

# Si on programme directement sur le Pi :
http://localhost:1880/   ou   http://127.0.0.1:1880/` },
      ],
    },
    {
      id: 'i26s2',
      title: "L'environnement de programmation & npm",
      blocks: [
        { type: 'kv', items: [
          { k: 'Au centre', v: "La zone de programmation (les flows)." },
          { k: 'À gauche', v: "Toutes les fonctions disponibles (la palette)." },
          { k: 'À droite', v: "Les onglets informations contextuelles et debug." },
          { k: 'Coin supérieur droit', v: "Le bouton rouge Deploy, pour déployer le programme." },
        ] },
        { type: 'code', lang: 'terminal', caption: 'Installer / mettre à jour npm et node-red-admin', code: `# Node-RED utilise le gestionnaire de package npm de nodejs
sudo apt-get install npm
sudo npm i npm -g        # on met à jour npm

# Installation de node-red-admin
cd /home/pi/.node-red    # aller dans le répertoire caché de node-red
npm install -g node-red-admin` },
      ],
    },
    {
      id: 'i26s3',
      title: 'Faire clignoter une LED avec Node-RED',
      blocks: [
        { type: 'paragraph', text: "Pour faire clignoter une LED reliée sur le GPIO23 du Raspberry Pi, on utilise la fonction inject qui envoie une pulsation chaque seconde. À chaque pulsation, on utilise la fonction « Inverse Etat Led » pour allumer ou éteindre la LED. On peut copier puis importer directement le code JSON dans le flow (Menu → Import → Clipboard)." },
        { type: 'kv', items: [
          { k: 'Nœud 1 — inject', v: "« chaque seconde » : envoie une pulsation (payload = date) répétée toutes les 1 s." },
          { k: 'Nœud 2 — function', v: "« Inverse état Led » : context.state = context.state || 0 ; bascule 0↔1 ; msg.payload = context.state." },
          { k: 'Nœud 3 — rpi-gpio out', v: "« Led sur GPIO23 » : sortie sur la broche 16 (GPIO23)." },
          { k: 'Nœud 4 — debug', v: "Affiche l'état dans le panneau debug." },
        ] },
        { type: 'diagram', diagram: 'NodeRedFlow' },
      ],
    },
    {
      id: 'i26s4',
      title: 'Récupérer la météo locale depuis OpenWeatherMap',
      blocks: [
        { type: 'paragraph', text: "La communauté Node-RED développe de très nombreux plugins dans tous les domaines : objets connectés (ZWave, Sonos…), services en ligne (météo, twitter…), bases de données… On installe le module node-red-node-openweathermap qui permet de récupérer la météo locale depuis le site openweathermap." },
        { type: 'code', lang: 'terminal', caption: 'Installation du module', code: `# Via le gestionnaire de palette : chercher node-red-node-openweathermap puis Install
# En cas de difficulté, arrêter NR puis exécuter dans le terminal :
npm install node-red-node-openweathermap` },
        { type: 'steps', items: [
          { title: '1. Obtenir une clé API', text: "Gratuite pour un usage personnel : créer un compte sur openweathermap.org puis aller dans l'onglet API keys de My profile." },
          { title: '2. Configurer le nœud', text: "Ajouter un nœud openweathermap dans un flow, double-cliquer puis : coller la clé API, indiquer la ville (et le pays) ou les coordonnées GPS du lieu." },
          { title: '3. Visualiser', text: "Brancher un nœud debug pour envoyer la météo récupérée dans la console." },
        ] },
      ],
    },
  ],
}
