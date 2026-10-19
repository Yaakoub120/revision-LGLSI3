import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Partie 3 — Module 27 : Caméra, streaming, webcam/motion,
// serveur web Apache/PHP et serveur MQTT Mosquitto
// ═══════════════════════════════════════════════════════════════

export const imod27: Module = {
  id: 'i27',
  num: 27,
  title: 'Caméra, streaming & serveurs',
  subtitle: 'Ports DSI/CSI, photos et vidéos, les 5 méthodes de streaming, webcam USB + motion, serveur Apache/PHP et broker MQTT Mosquitto',
  icon: '📷',
  color: 'rose',
  source: 'InternetDesObjets-3.pdf — Caméra, streaming, webcam, serveur web & serveur MQTT',
  sections: [
    {
      id: 'i27s1',
      title: 'Branchement et activation de la caméra',
      blocks: [
        { type: 'paragraph', text: "En plus de tous les composants qu'on peut relier aux GPIOs, le Raspberry Pi possède deux connecteurs particuliers : les ports DSI (Display Serial Interface) et CSI (Camera Serial Interface). Ils permettent respectivement de relier un écran et une caméra au Raspberry Pi. La caméra se branche sur le bus CSI, spécialement conçu pour les caméras et qui offre un débit élevé." },
        { type: 'steps', items: [
          { title: '1. Activer l\u2019interface', text: "sudo raspi-config → sélectionner Interfacing Options puis Camera → sélectionner Yes pour confirmer l'activation et redémarrer le Raspberry." },
          { title: '2. Vérifier la détection', text: "Commande : vcgencmd get_camera — la ligne affichée doit être supported=1 detected=1." },
          { title: '3. Si detected n\u2019est pas à 1', text: "Vérifier que la caméra est branchée correctement et que l'interface camera est bien activée ; redémarrer le Raspberry Pi et le mettre à jour : sudo apt-get update puis sudo apt-get upgrade." },
        ] },
      ],
    },
    {
      id: 'i27s2',
      title: 'Prendre des photos : terminal & Python',
      blocks: [
        { type: 'code', lang: 'terminal', caption: 'Photo par le terminal', code: `cd
mkdir Camera
raspistill -o ~/Camera/image.jpg -q 100   # prend une photo et la stocke` },
        { type: 'table', headers: ['Option raspistill', 'Rôle'], rows: [
          ['-o', 'output filename — endroit où va être stockée la photo'],
          ['-q', 'quality — 0 à 100, qualité de l\u2019image'],
          ['-w et -h', 'width et height — définir manuellement les dimensions de l\u2019image'],
          ['-t', 'timeout — temps mis avant de prendre la photo (retardateur)'],
          ['-vf et -hf', 'vertical flip et horizontal flip — retourner la photo'],
        ], caption: 'Options de raspistill (voir raspistill --help)' },
        { type: 'code', lang: 'python', caption: 'Photo en Python avec picamera (code du cours)', code: `# Installation : sudo apt-get install python3-picamera
import picamera
import datetime
camera = picamera.PiCamera()
camera.resolution = (2592, 1944)
camera.capture(str(datetime.datetime.now()) + '.jpg')` },
        { type: 'kv', items: [
          { k: 'Résolution par défaut', v: "Si camera.resolution n'est pas renseignée : 1920x1080 et la qualité de la photo sera très mauvaise (surtout en basse luminosité)." },
          { k: 'Meilleure qualité', v: "(2592, 1944) si on dispose d'une caméra 5 MP · (3280, 2464) si on dispose d'une caméra 8 MP." },
          { k: 'Photo à l\u2019envers ?', v: "Ajouter après « camera = PiCamera() » : camera.hflip = True et camera.vflip = True." },
          { k: 'Autres options disponibles', v: "sharpness, contrast, brightness (50), saturation, ISO, video_stabilization, exposure_compensation, exposure_mode ('auto'), meter_mode ('average'), awb_mode ('auto'), image_effect ('none'), color_effects (None), rotation (0), crop." },
        ] },
      ],
    },
    {
      id: 'i27s3',
      title: 'Prendre des vidéos',
      blocks: [
        { type: 'code', lang: 'terminal', caption: 'Vidéo par le terminal', code: `# Enregistrer une vidéo de 10 secondes (10 000 ms)
raspivid -o video.h264 -t 10000
# Les options sont les mêmes que pour la photo (comme -hf et -vf)

# Problème : la plupart des lecteurs vidéo ne savent pas lire le format .h264
# → installer MP4Box pour convertir en MP4 :
sudo apt-get install -y gpac
MP4Box -add video.h264 video.mp4    # le fichier devient lisible partout` },
        { type: 'code', lang: 'python', caption: 'Vidéo en Python avec conversion automatique MP4 (code du cours)', code: `import os
import picamera
import time
camera = picamera.PiCamera()
# Retourner image : décommenter les deux lignes suivantes
# camera.hflip = True
# camera.vflip = True
dureeVideo = 5
nomVideo = time.strftime("%d.%m.%Y-%Hh%Mm%Ss")
camera.start_recording(nomVideo + ".h264")
print("REC...")
time.sleep(dureeVideo)
camera.stop_recording()
commande = "MP4Box -add " + nomVideo + ".h264 " + nomVideo + ".mp4"
os.system(commande)` },
        { type: 'note', title: 'LED de la caméra', text: "Si on souhaite que la LED de la caméra reste éteinte, il suffit de modifier le fichier /boot/config.txt en ajoutant la ligne disable_camera_led=1 à la fin." },
      ],
    },
    {
      id: 'i27s4',
      title: 'Faire du streaming : 5 méthodes',
      blocks: [
        { type: 'paragraph', text: "Pour un système de vidéosurveillance ou pour le pilotage d'un robot à distance, il faut pouvoir récupérer le flux vidéo et le diffuser à travers le réseau (streaming). Il y a 5 façons de faire du streaming." },
        { type: 'definition', term: 'Méthode 1 — Netcat et Mplayer', def: "Rediriger le flux capturé par raspivid dans netcat.\nPC Linux (installer mplayer) : nc -l -p 5001 | /usr/bin/mplayer -fps 10 -cache 1024 -\nSur le Pi : raspivid -t 0 -w 1280 -h 720 -o - | nc adresse_ip_du_pc_client 5001\nPour enregistrer le flux sur le PC : ajouter -demuxer h264es -dumpstream -dumpfile ./Bureau/ma_video.h264" },
        { type: 'definition', term: 'Méthode 2 — Streaming VLC', def: "Le flux vidéo est visible depuis plusieurs postes clients.\nSur le Pi : apt-get install vlc puis raspivid -t 0 -n --width 1280 --height 720 -o - | cvlc stream:///dev/stdin --sout '#standard{access=http,mux=ts,dst=:8090}' :demux=h264\nCôté client : cvlc http://adresse_ip_du_pi:8090\nEnregistrer : cvlc http://adresse_ip_du_pi:8090 --sout file/ts:./Bureau/ma_video.h264" },
        { type: 'definition', term: 'Méthode 3 — Streaming de Pi à Pi avec OMXplayer', def: "Pour capturer un flux vidéo depuis un Pi pour l'observer depuis un autre Pi branché à un écran, on utilise le lecteur OMXplayer (référence du cours : magdiblog.fr — Raspberry Pi camera : 5 façons de faire du streaming)." },
        { type: 'definition', term: 'Méthode 4 — mjpg-streamer', def: "Avec le mjpeg, on sort du streaming vidéo pur : il s'agit de transmettre et d'afficher une suite de photos les unes après les autres. Le résultat est beaucoup moins fluide." },
        { type: 'definition', term: 'Méthode 5 — Serveur Web (MJPEG en Python)', def: "Aucune norme vidéo n'est universellement prise en charge par tous les navigateurs ; on utilise le format MJPEG. Le script du cours utilise le module http.server pour créer un serveur de streaming vidéo : classe StreamingOutput (frames + condition), StreamingHandler (routes / , /index.html , /stream.mjpg), StreamingServer (ThreadingMixIn + HTTPServer) — résolution 640x480 à 24 fps, port 8000, page « Raspberry Pi - Surveillance Camera » avec <img src=\"stream.mjpg\">." },
        { type: 'diagram', diagram: 'CameraStreaming' },
      ],
    },
    {
      id: 'i27s5',
      title: 'Utiliser une webcam USB standard',
      blocks: [
        { type: 'paragraph', text: "Plutôt que d'utiliser le module de caméra Raspberry Pi, on peut utiliser une webcam USB standard pour prendre des photos et des vidéos. À noter : la qualité du module de caméra est très supérieure à une webcam." },
        { type: 'code', lang: 'terminal', caption: 'Première méthode : fswebcam', code: `sudo apt install fswebcam
# Si on n'utilise pas le compte pi par défaut, ajouter l'utilisateur au groupe vidéo
# sinon erreurs « autorisation refusée » :
sudo usermod -a -G video <username>
groups                          # vérifier l'ajout au groupe
fswebcam image.jpg              # prend une photo et l'enregistre` },
        { type: 'code', lang: 'terminal', caption: 'Deuxième méthode : motion (via Putty)', code: `sudo apt-get update -y
lsusb                            // vérifier la connexion de la caméra
sudo apt-get install motion
sudo nano /etc/motion/motion.conf
sudo nano /etc/default/motion
sudo reboot` },
        { type: 'kv', items: [
          { k: 'Réglages motion.conf', v: "daemon on · width 640 · height 480 · framerate 10 · quality 100 · pre_capture 2 · post_capture 5 · stream_port 8081 · stream_quality 100 · stream_motion off · webcontrol_localhost off." },
          { k: 'Fichier /etc/default/motion', v: "start_motion_daemon=yes." },
          { k: 'Accès au flux', v: "Après redémarrage, lancer le navigateur et taper Adresse-IP:8081." },
        ] },
      ],
    },
    {
      id: 'i27s6',
      title: 'Serveur web Apache/PHP sur le Raspberry Pi',
      blocks: [
        { type: 'paragraph', text: "L'objectif est de transformer le Raspberry Pi qui gère les caméras avec motion en un serveur web qui publie les flux vidéos. La première étape est d'installer Apache." },
        { type: 'code', lang: 'terminal', caption: 'Installation d\u2019Apache et de PHP', code: `# Apache2 est un serveur HTML des pages Web dynamiques en utilisant le PHP
sudo apt install apache2 -y
# Le lien http://adresse_IP_du_Pi permet d'accéder à la page Web (/var/www/html/index.html)

# Pour permettre au serveur Apache de traiter les fichiers PHP :
sudo apt install php libapache2-mod-php -y
# puis créer le fichier index.php` },
        { type: 'note', title: 'Flux vidéos', text: "Les flux vidéos d'une webcam sont capturés puis générés par motion et diffusés sur les ports 8081 et 8082 du Raspberry Pi." },
      ],
    },
    {
      id: 'i27s7',
      title: 'Créer un serveur MQTT sur le Raspberry Pi (Mosquitto)',
      blocks: [
        { type: 'paragraph', text: "Principe de fonctionnement du MQTT : MQTT est comme un forum avec des abonnés (lecteurs) et des rédacteurs qui publient des messages. Les messages sont hiérarchisés de la même manière, il est donc possible de consulter uniquement les messages qui nous intéressent." },
        { type: 'definition', term: 'MQTT conçu pour économiser la batterie', def: "• Consomme 11 fois moins d'énergie pour envoyer des messages,\n• Consomme 170 fois moins pour en recevoir que le protocole HTTP,\n• Est 93 fois plus rapide que le protocole HTTP." },
        { type: 'definition', term: 'MQTT et la QoS (Quality of Service)', def: "Il existe plusieurs niveaux de qualité de service allant du :\n• Néant (niveau 0) : un message est publié sans garantie de sa bonne réception,\n• Au niveau 2, appelé service garanti, qui se charge de publier le message en deux parties pour s'assurer et garantir que le message est correctement délivré de façon unique.\nPlus on monte en niveau de QoS, plus on charge les trames." },
        { type: 'definition', term: 'La sécurité et MQTT', def: "MQTT n'intègre pas de mécanisme de sécurité à proprement parler. Il est possible de monter des connexions SSL/TLS soumises à certificat. Dans le cadre d'une maison connectée, il n'est pas utile de dialoguer avec l'extérieur en MQTT : on préférera un schéma plus classique visant à faire communiquer les objets en local avec le serveur domotique, qui se charge de relayer l'info à l'extérieur si nécessaire. C'est tout l'intérêt de disposer d'un broker MQTT sur son réseau local à l'aide d'un Raspberry Pi." },
        { type: 'code', lang: 'terminal', caption: 'Installer et utiliser un broker Mosquitto', code: `# Pas besoin de la dernière version du Raspberry ; un Pi existant peut assumer
# cette tâche en plus de sa tâche actuelle
sudo apt-get install mosquitto            # installation du broker
systemctl status mosquitto                # vérifier que tout est opérationnel
sudo apt-get install mosquitto-clients    # clients : mosquitto_sub, mosquitto_pub, mosquitto_passw

# Terminal 1 (Subscriber) :
mosquitto_sub -h localhost -t "sensor/temperature"

# Terminal 2 (Publisher) — -h serveur, -t topic, -m message :
mosquitto_pub -h localhost -t sensor/temperature -m 24.9` },
        { type: 'steps', items: [
          { title: 'Utiliser MQTT avec Node-RED', text: "Ajouter un node mqtt (section input)." },
          { title: 'Configurer la connexion', text: "Double-cliquer sur le node pour ouvrir la boîte de configuration, appuyer sur le crayon pour ajouter une nouvelle connexion." },
          { title: 'Broker local', text: "Si Node-RED fonctionne sur la même machine que le broker Mosquitto : saisir localhost dans le champ serveur et 1883 dans le port. Valider." },
        ] },
        { type: 'diagram', diagram: 'MosquittoDemo' },
      ],
    },
  ],
}
