import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Partie 3 — Modules 23 & 24 : Python & GPIO ; capteurs DS18B20
// et HC-SR04 sur Raspberry Pi
// ═══════════════════════════════════════════════════════════════

export const imod23: Module = {
  id: 'i23',
  num: 23,
  title: 'Python & GPIO : faire clignoter une LED',
  subtitle: 'Branchements GPIO18 + résistance 100 Ω, création du fichier .py, programme complet et exécution',
  icon: '💡',
  color: 'rose',
  source: 'InternetDesObjets-3.pdf — Créer et exécuter un programme Python',
  sections: [
    {
      id: 'i23s1',
      title: "Branchement d'une LED au Raspberry Pi",
      blocks: [
        { type: 'paragraph', text: "Pour relier la LED au Raspberry Pi, on a besoin d'une résistance (en général 100 Ω). La LED est branchée entre le GPIO18 et le GND, à travers la résistance." },
        { type: 'diagram', diagram: 'PiGpioLed' },
      ],
    },
    {
      id: 'i23s2',
      title: 'Créer le fichier Python et écrire le programme',
      blocks: [
        { type: 'paragraph', text: "Une fois tout branché, on se connecte avec un clavier/souris ou par SSH pour écrire sur le Raspberry Pi son premier programme en Python. Avec Raspberry Pi, les commandes entrées sont des commandes Linux. On peut par exemple appeler le programme comme suit : sudo nano led.py — cette commande crée le fichier led.py dans le répertoire principal (/home/pi par défaut) et l'ouvre dans un éditeur de texte." },
        { type: 'code', lang: 'python', caption: 'Programme led.py complet (code du cours)', code: `import RPi.GPIO as GPIO   # Importation des librairies qui gèrent les ports
import time               # Importation de la librairie temps
GPIO.setmode(GPIO.BCM)    # BCM : Numéro des GPIO (GPIO 18)
GPIO.setup(18, GPIO.OUT)  # Définition du port en sortie
GPIO.setwarnings(False)   # Mettre sur OFF les alertes (qui sont inutiles)

# Affichage de texte
print("\\n+---------------------/ Blink LED /-------------------------+")
print("| La LED doit etre reliée au GPIO 18 du Raspberry           |")
print("+-----------------------------------------------------------+\\n")

nbrBlink = int(input("Combien de fois la LED doit clignoter ?\\n"))
tempsAllume = int(input("Combien de temps doit-elle rester allumée ?\\n"))
tempsEteint = int(input("Combien de temps doit-elle rester éteinte ?\\n"))

i = 0  # Définition d'une variable type compteur
while i < nbrBlink:
    GPIO.output(18, True)    # Mise a 1 du GPIO 18 (+5V)
    time.sleep(tempsAllume)  # On attend le temps défini
    GPIO.output(18, False)   # Mise a zéro du GPIO 18 (GND)
    time.sleep(tempsEteint)
    i = i + 1

GPIO.cleanup()` },
      ],
    },
    {
      id: 'i23s3',
      title: 'Exécution du programme',
      blocks: [
        { type: 'definition', term: 'Commande d\u2019exécution', def: "Pour lancer le programme que vous avez créé, il suffit d'entrer : sudo python led.py" },
        { type: 'kv', items: [
          { k: 'RPi.GPIO', v: "La librairie qui gère les ports GPIO du Raspberry." },
          { k: 'GPIO.setmode(GPIO.BCM)', v: "Utilise la numérotation BCM des GPIO (GPIO 18)." },
          { k: 'GPIO.output(18, True/False)', v: "Mise à 1 (+5 V) ou à 0 (GND) du port." },
          { k: 'GPIO.cleanup()', v: "Libère les GPIO à la fin du programme." },
        ] },
      ],
    },
  ],
}

export const imod24: Module = {
  id: 'i24',
  num: 24,
  title: 'Capteurs sur Raspberry : DS18B20 & HC-SR04',
  subtitle: 'Sonde de température 1-Wire (commandes, dépannage, scripts Python, sauvegarde) et capteur à ultrasons (branchement et calcul de distance)',
  icon: '🌡️',
  color: 'rose',
  source: 'InternetDesObjets-3.pdf — DS18B20 & Mesure de distances avec un capteur HC-SR04',
  sections: [
    {
      id: 'i24s1',
      title: 'Lire la température avec la sonde DS18B20 (commandes)',
      blocks: [
        { type: 'paragraph', text: "On branche la sonde au Raspberry en suivant le schéma, puis on peut la lire en utilisant l'invite de commande du Raspberry (en remplaçant les « x » par le numéro donné par le Raspberry)." },
        { type: 'code', lang: 'terminal', caption: 'Lecture 1-Wire en ligne de commande', code: `sudo modprobe w1-gpio
sudo modprobe w1-therm
cd /sys/bus/w1/devices/
ls
cd 28-xxxxxxxxxx
cat w1_slave` },
        { type: 'note', title: 'Sonde DS18B20 non détectée ?', text: "Il peut arriver que le Raspberry ne détecte pas la sonde. Il faut alors modifier deux fichiers système :\n\n1. Dans /etc/modules (sudo nano /etc/modules), ajouter :\n   w1-therm\n   w1-gpio pullup=1\n\n2. Dans /boot/config.txt, ajouter la ligne : dtoverlay=w1-gpio\n\nPuis redémarrer le Raspberry Pi." },
      ],
    },
    {
      id: 'i24s2',
      title: 'Afficher la température avec un script Python',
      blocks: [
        { type: 'paragraph', text: "On peut créer un programme qui affiche la température au millième. Le fichier w1_slave contient deux lignes ; la valeur se trouve dans la seconde ligne, à la position t=…" },
        { type: 'code', lang: 'python', caption: 'Lecture et parsing de la température (code du cours)', code: `def lireFichier(emplacement):
    # Ouverture du fichier contenant la temperature
    fichTemp = open(emplacement)
    contenu = fichTemp.read()
    fichTemp.close()
    return contenu

def recupTemp(contenuFich):
    # Supprimer la premiere ligne qui est inutile
    secondeLigne = contenuFich.split("\\n")[1]
    temperatureData = secondeLigne.split(" ")[9]
    # Supprimer le "t="
    temperature = float(temperatureData[2:])
    # Mettre un chiffre apres la virgule
    temperature = temperature / 1000
    return temperature

contenuFich = lireFichier("/sys/bus/w1/devices/28-xxxxxxxx/w1_slave")
temperature = recupTemp(contenuFich)
print("Temperature :", temperature)` },
      ],
    },
    {
      id: 'i24s3',
      title: 'Enregistrer les températures dans un fichier texte',
      blocks: [
        { type: 'paragraph', text: "On ajoute une ligne dans un fichier à chaque prise de température. Pour changer l'intervalle de lecture, modifier le time.sleep() qui est en secondes." },
        { type: 'code', lang: 'python', caption: 'Boucle de sauvegarde horodatée (code du cours)', code: `import time
import datetime

def lireFichier(emplacement):
    fichTemp = open(emplacement)
    contenu = fichTemp.read()
    fichTemp.close()
    return contenu

def recupTemp(contenuFich):
    secondeLigne = contenuFich.split("\\n")[1]
    temperatureData = secondeLigne.split(" ")[9]
    temperature = float(temperatureData[2:])
    temperature = temperature / 1000
    return temperature

def sauvegarde(temperature, date, emplacement):
    fichierSauvegarde = open(emplacement, "a")
    fichierSauvegarde.write(str(date) + " ")
    fichierSauvegarde.write(str(temperature) + '\\r\\n')
    fichierSauvegarde.close()

while True:
    date = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    contenuFich = lireFichier("/sys/bus/w1/devices/28-xxxxxxxx/w1_slave")
    temperature = recupTemp(contenuFich)
    sauvegarde(temperature, date, "Temperature.txt")
    time.sleep(60)` },
      ],
    },
    {
      id: 'i24s4',
      title: 'Mesure de distances avec le capteur HC-SR04',
      blocks: [
        { type: 'definition', term: 'HC-SR04', def: "Capteur à ultrasons permettant de mesurer une distance de 2 à 400 cm en envoyant des signaux sonores à 40 kHz. En fonction du temps qui sépare l'émission de la réception, on trouve par un calcul la distance." },
        { type: 'paragraph', text: "Le HC-SR04 se connecte grâce à 4 PINs : VCC, Trig, Echo et GND. Pour le connecter, on a besoin de deux résistances : 1 KΩ et 2 KΩ. Une fois branché, il suffit d'exécuter un script Python pour obtenir la distance calculée entre le capteur et l'obstacle." },
        { type: 'code', lang: 'python', caption: 'Script de mesure de distance (code du cours)', code: `import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)

Trig = 23  # Entree Trig du HC-SR04 branchee au GPIO 23
Echo = 24  # Sortie Echo du HC-SR04 branchee au GPIO 24
GPIO.setup(Trig, GPIO.OUT)
GPIO.setup(Echo, GPIO.IN)
GPIO.output(Trig, False)

repet = input("Entrez un nombre de repetitions de mesure : ")
for x in range(int(repet)):      # On prend la mesure "repet" fois
    time.sleep(1)                # On la prend toutes les 1 seconde
    GPIO.output(Trig, True)
    time.sleep(0.00001)
    GPIO.output(Trig, False)

    while GPIO.input(Echo) == 0:   ## Emission de l'ultrason
        debutImpulsion = time.time()
    while GPIO.input(Echo) == 1:   ## Retour de l'Echo
        finImpulsion = time.time()

    # Vitesse du son = 340 m/s
    distance = round((finImpulsion - debutImpulsion) * 340 * 100 / 2, 1)
    print("La distance est de : ", distance, " cm")

GPIO.cleanup()` },
        { type: 'diagram', diagram: 'Hcsr04Sim' },
        { type: 'note', title: 'Formule à connaître', text: "distance = (temps_aller_retour × 340 × 100) / 2 — la division par 2 car l'ultrason fait un aller-retour." },
      ],
    },
  ],
}
