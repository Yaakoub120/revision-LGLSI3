import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Partie 1 fin & Partie 2 début — Module 11 (bracelet médical +
// futur) et Module 12 (matériel : capteurs & actionneurs)
// ═══════════════════════════════════════════════════════════════

export const imod11: Module = {
  id: 'i11',
  num: 11,
  title: 'Bracelet médical connecté & futur',
  subtitle: 'Application ESP32 + MAX30100 + OLED, broches tactiles, tendances futures, synthèse et ressources pédagogiques',
  icon: '⌚',
  color: 'emerald',
  source: 'InternetDesObjets-1.pdf — VII. Application, VIII. Futur, IX. Synthèse, X. Ressources',
  sections: [
    {
      id: 'i11s1',
      title: 'Application : bracelet médical connecté (ESP32)',
      blocks: [
        { type: 'paragraph', text: "L'application finale de la Partie 1 est un bracelet médical : un ESP32 lit la fréquence cardiaque et le taux d'oxygène via le capteur MAX30100 (liaison I2C) et les affiche sur un écran OLED SSD 1306 (également en I2C)." },
        { type: 'note', title: 'Pinout ESP32', text: "Selon le pinout de l'ESP32, la broche SCL est D22 et la SDA est D21." },
        { type: 'table', headers: ['Origine', 'Destination'], rows: [
          ['ESP32 D22', 'MAX30100 SCL'],
          ['ESP32 D21', 'MAX30100 SDA'],
          ['ESP32 GND', 'MAX30100 GND'],
          ['ESP32 3.3V', 'MAX30100 VIN'],
          ['OLED VDD', 'ESP32 3.3V'],
          ['OLED GND', 'ESP32 GND'],
          ['OLED SCL', 'ESP32 D22'],
          ['OLED SDA', 'ESP32 D21'],
        ], caption: 'Câblage complet du bracelet (source : instructables — Heart Rate and Blood Oxygen Level)' },
        { type: 'diagram', diagram: 'MedicalBracelet' },
      ],
    },
    {
      id: 'i11s2',
      title: "Saisie de texte via écran OLED SD 1306 & broches tactiles",
      blocks: [
        { type: 'paragraph', text: "L'écran OLED permet aussi de saisir un texte : trois écrans du cours montrent la saisie des majuscules, des caractères spéciaux et des numériques, puis la validation — où il est possible d'effacer le dernier caractère, d'effacer la totalité de la saisie en cours, de valider ou d'annuler la sélection. La carte utilise 3 boutons (A, B, C)." },
        { type: 'definition', term: 'Broches tactiles ESP32', def: "Les 10 broches qui peuvent être utilisées pour détecter un contact avec le doigt sont : GPIO 0, GPIO 2, GPIO 4, GPIO 12, GPIO 13, GPIO 14, GPIO 15, GPIO 27, GPIO 32 et GPIO 33." },
        { type: 'note', title: 'Remarque du cours', text: "Pour lire l'état de la broche GPIO 32, par exemple, on pourra écrire touchRead(32) ou touchRead(T9), avec le même résultat." },
      ],
    },
    {
      id: 'i11s3',
      title: 'Futur et tendances',
      blocks: [
        { type: 'paragraph', text: "Sept tendances structurent le futur de l'IoT médical dans le cours. Chacune associe une technologie à un bénéfice concret." },
        { type: 'kv', items: [
          { k: 'Nanorobots connectés', v: "Administration ciblée de médicaments." },
          { k: 'IA prédictive', v: "Anticipation des crises d'épilepsie." },
          { k: 'Réalité augmentée', v: "Chirurgie assistée par IoT (ex : Google Glass)." },
          { k: 'Blockchain', v: "Sécurisation des dossiers médicaux." },
          { k: '5G/6G', v: "Latence ultra-faible." },
          { k: 'Edge Computing', v: "Traitement local." },
          { k: 'IA intégrée', v: "Analyse en temps réel." },
        ] },
        { type: 'quote', text: "L'IoT médical ne remplace pas les médecins, mais leur donne des super-pouvoirs.", source: 'InternetDesObjets-1 — conclusion' },
        { type: 'note', title: 'Message clé', text: "L'IoMT révolutionne la médecine : prévention, précision, accessibilité." },
      ],
    },
    {
      id: 'i11s4',
      title: 'Synthèse & ressources pédagogiques',
      blocks: [
        { type: 'kv', items: [
          { k: 'Avantages', v: "Efficacité, automatisation, données en temps réel." },
          { k: 'Risques', v: "Sécurité, dépendance technologique, impact environnemental." },
        ] },
        { type: 'table', headers: ['Catégorie', 'Ressources du cours'], rows: [
          ['Simulateurs IoT', "Plateformes : Arduino IoT Cloud, Node-RED."],
          ['Documentaires', "« Lo and Behold » (R. Herzog) sur la révolution numérique."],
          ['Livres', "« The Fourth Industrial Revolution » (Klaus Schwab) · « Making Embedded Systems » (Elecia White) · « Healthcare 4.0 » (Dr. John Smith) · « IoT in Medicine » (Dr. Laura Green)."],
          ['Études', "WHO, Deloitte, Journal of Medical IoT."],
          ['Sites', "FDA, sites fabricants (Medtronic, Abbott)."],
        ], caption: 'Ressources pédagogiques supplémentaires (X)' },
      ],
    },
  ],
}

export const imod12: Module = {
  id: 'i12',
  num: 12,
  title: 'Matériel : capteurs & actionneurs',
  subtitle: "Les 3 parties du matériel, définitions capteur/actionneur, critères de choix et les 2 exemples complets du cours (capteurs d'humidité, moteurs)",
  icon: '🔧',
  color: 'teal',
  source: 'InternetDesObjets-2.pdf — 1. Matériel & logiciel, 1.1 Matériel',
  sections: [
    {
      id: 'i12s1',
      title: "Un objet IoT = matériel + logiciel",
      blocks: [
        { type: 'paragraph', text: "Un objet IoT est divisé en deux parties : le matériel et le logiciel. Le matériel est fait de composants électroniques (ou électriques) et se compose de 3 parties." },
        { type: 'list', ordered: true, items: [
          'Capteurs / actionneurs.',
          'Microcontrôleur ou micro-ordinateur.',
          'Connexion réseau.',
        ] },
        { type: 'definition', term: 'Capteur', def: "Un dispositif qui transforme un phénomène physique en un signal électrique. Exemples : chaleur, humidité, lumière, etc." },
        { type: 'definition', term: 'Actionneur', def: "Un dispositif qui transforme le signal électrique en un phénomène physique — le contraire d'un capteur." },
        { type: 'note', title: 'Échelle', text: "Il existe des centaines voire des milliers de capteurs et d'actionneurs : d'un capteur de température à un capteur de force, d'un moteur à une lampe." },
      ],
    },
    {
      id: 'i12s2',
      title: 'Comment choisir son capteur et/ou actionneur ?',
      blocks: [
        { type: 'paragraph', text: "Tout dépend des besoins du projet IoT (le cahier des charges), mais on peut se référer aux critères suivants." },
        { type: 'list', items: [
          'Tension et courant de fonctionnement.',
          'Précision.',
          'Protocole de communication utilisé.',
          'Phénomène physique à capter ou générer (capteur/actionneur).',
          'Le prix.',
        ] },
      ],
    },
    {
      id: 'i12s3',
      title: "Exemple 1 — capteurs d'humidité de l'air",
      blocks: [
        { type: 'paragraph', text: "Objectif du cours : mesurer l'humidité de l'air avec une bonne précision, sous une tension de fonctionnement de 5 V. Voici la liste des capteurs d'humidité trouvés sur internet." },
        { type: 'table', headers: ['Nom', 'Prix', 'Tension/courant', 'Précision', 'Protocole'], rows: [
          ['DHT11', '15 DT', '3.3 à 6 V', '± 5 %', 'OneWire'],
          ['DHT22', '28 DT', '3.3 à 6 V', '± 2 %', 'OneWire'],
          ['HIH-4030', '45 DT', '4 à 5.8 V', '± 3.5 %', 'Analogique'],
          ['Si7021', '24 DT', '1.9 à 3.6 V', '± 3 %', 'i2C'],
        ], caption: "Comparatif capteurs d'humidité (exemple 1)" },
        { type: 'kv', items: [
          { k: 'Si on cherche la précision', v: "il faut choisir le DHT22." },
          { k: 'Si on préfère le bas prix', v: "on a le DHT11." },
          { k: 'Production de masse', v: "il est recommandé de choisir la précision." },
          { k: 'Domaine de la santé', v: "la précision prime devant le prix." },
        ] },
      ],
    },
    {
      id: 'i12s4',
      title: 'Exemple 2 — moteurs pour robot véhicule',
      blocks: [
        { type: 'paragraph', text: "On souhaite faire un robot véhicule avec 4 moteurs pour tourner les roues sous 5 V. Dans ce cas, on ne cherche pas la précision mais plutôt la vitesse et la légèreté." },
        { type: 'table', headers: ['Nom', 'Prix', 'Tension/courant', 'Vitesse', 'Masse', 'Protocole'], rows: [
          ['DG01D:48:1 motoréducteur', '15 DT', '4.5 V / 250 mA', '140 RPM', '30 g', 'Digital control / normal'],
          ['SM-428YG011-25 moteur pas à pas', '30 DT', '12 V / 330 mA', '9 RPM', '20 g', 'Digital control / normal'],
          ['Parallax continuous Rotation Servo', '60 DT', '4 à 6 V / 140 mA', '50 RPM', '42.5 g', 'Digital control / PWM'],
        ], caption: 'Comparatif actionneurs moteurs (exemple 2)' },
        { type: 'note', title: 'Conclusion du cours', text: "Le motoréducteur DG01D:48:1 est le mieux adapté pour faire tourner le robot : vitesse de rotation élevée, bas prix, fonctionne à 5 V et faible masse. Le choix est toujours guidé par l'idée du projet (le cahier des charges)." },
        { type: 'diagram', diagram: 'SensorPicker' },
      ],
    },
  ],
}
