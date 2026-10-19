import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Partie 1 — Modules 7 & 8 : Protocoles de communication IoT
// (couche application + couche réseau + comparaison + sécurité)
// ═══════════════════════════════════════════════════════════════

export const imod7: Module = {
  id: 'i7',
  num: 7,
  title: 'Protocoles applicatifs (MQTT, CoAP, HTTP)',
  subtitle: 'Définition et enjeux des protocoles IoT, puis les 3 protocoles de couche application du cours',
  icon: '📨',
  color: 'emerald',
  source: 'InternetDesObjets-1.pdf — IV. Protocoles de Communication (IV.1-IV.3)',
  sections: [
    {
      id: 'i7s1',
      title: 'Définition, enjeux et catégories',
      blocks: [
        { type: 'definition', term: 'Protocoles de communication IoT', def: "Règles et standards permettant aux dispositifs (capteurs, actionneurs, passerelles, etc.) d'échanger des données de manière fiable et sécurisée, malgré des contraintes de ressources (énergie, bande passante, puissance de calcul)." },
        { type: 'kv', items: [
          { k: 'Enjeu 1', v: "Faible consommation d'énergie (ex : capteurs sur batterie)." },
          { k: 'Enjeu 2', v: "Latence réduite (temps réel)." },
          { k: 'Enjeu 3', v: "Fiabilité dans des environnements perturbés." },
          { k: 'Enjeu 4', v: "Sécurité des données (chiffrement, authentification)." },
        ] },
        { type: 'table', headers: ['Catégorie', 'Rôle', 'Protocoles cités'], rows: [
          ['Couche application', 'Gestion des données', 'MQTT, CoAP, HTTP/HTTPS, AMQP'],
          ['Couche réseau', 'Connectivité', 'LoRaWAN, Zigbee, NB-IoT, Wi-Fi HaLow, Sigfox, Bluetooth Low Energy (BLE)'],
        ], caption: 'Les 2 catégories de protocoles IoT du cours' },
      ],
    },
    {
      id: 'i7s2',
      title: 'MQTT — Message Queuing Telemetry Transport',
      blocks: [
        { type: 'definition', term: 'MQTT', def: "Protocole basé sur un modèle publish/subscribe avec un broker central ; utilise TCP/IP pour une transmission fiable." },
        { type: 'kv', items: [
          { k: 'Cas d\u2019usage', v: "Surveillance médicale, industrielle, domotique, systèmes avec connexion intermittente." },
          { k: 'Avantages', v: "Léger, idéal pour les réseaux à faible bande passante ; supporte les appareils embarqués." },
          { k: 'Inconvénients', v: "Dépendance au broker (point unique de défaillance)." },
        ] },
        { type: 'diagram', diagram: 'MqttFlow' },
      ],
    },
    {
      id: 'i7s3',
      title: 'CoAP — Constrained Application Protocol',
      blocks: [
        { type: 'definition', term: 'CoAP', def: "Protocole inspiré de HTTP, mais optimisé pour les appareils contraints ; utilise UDP pour réduire la surcharge." },
        { type: 'kv', items: [
          { k: 'Cas d\u2019usage', v: "Capteurs IoT avec ressources limitées (ex : smart lighting, agriculture)." },
          { k: 'Avantages', v: "Léger, compatible avec les APIs RESTful ; supporte le multicast." },
          { k: 'Inconvénients', v: "Moins fiable que MQTT (pas de garantie de livraison — UDP)." },
        ] },
        { type: 'note', title: 'Comparaison rapide', text: "MQTT = TCP/IP, fiable, broker central. CoAP = UDP, plus léger mais sans garantie de livraison. HTTP = universel mais lourd." },
      ],
    },
    {
      id: 'i7s4',
      title: 'HTTP/HTTPS',
      blocks: [
        { type: 'definition', term: 'HTTP/HTTPS', def: "Standard web, basé sur le modèle client-serveur ; utilise TCP/IP (HTTP) ou TLS (HTTPS) pour la sécurité." },
        { type: 'kv', items: [
          { k: 'Cas d\u2019usage', v: "IoT grand public (ex : applications mobiles connectées à des objets)." },
          { k: 'Avantages', v: "Universel, facile à intégrer avec les infrastructures existantes." },
          { k: 'Inconvénients', v: "Lourd en consommation de ressources." },
        ] },
        { type: 'note', title: 'AMQP', text: "L'énoncé cite aussi AMQP dans la liste des protocoles de couche application (MQTT, CoAP, HTTP/HTTPS, AMQP) — retenez-le comme quatrième protocole cité." },
      ],
    },
  ],
}

export const imod8: Module = {
  id: 'i8',
  num: 8,
  title: 'Protocoles réseau & comparaison',
  subtitle: 'LoRaWAN, Zigbee, BLE — fonctionnement, cas d\u2019usage, avantages — tableau comparatif complet et sécurité des protocoles',
  icon: '📶',
  color: 'emerald',
  source: 'InternetDesObjets-1.pdf — IV.4 à IV.6',
  sections: [
    {
      id: 'i8s1',
      title: 'LoRaWAN — Long Range Wide Area Network',
      blocks: [
        { type: 'definition', term: 'LoRaWAN', def: "Utilise des ondes radio sub-GHz pour une longue portée (jusqu'à 15 km en zone rurale) ; architecture en étoile avec des passerelles." },
        { type: 'kv', items: [
          { k: 'Cas d\u2019usage', v: "Smart cities, suivi de flottes, agriculture." },
          { k: 'Avantages', v: "Faible consommation, longue portée ; idéal pour les déploiements massifs." },
          { k: 'Inconvénients', v: "Débit limité (0,3 à 50 kbps)." },
        ] },
      ],
    },
    {
      id: 'i8s2',
      title: 'Zigbee & Bluetooth Low Energy (BLE)',
      blocks: [
        { type: 'definition', term: 'Zigbee', def: "Basé sur le standard IEEE 802.15.4 ; réseau maillé (mesh) auto-organisé." },
        { type: 'kv', items: [
          { k: 'Zigbee — cas d\u2019usage', v: "Domotique, automatisation industrielle." },
          { k: 'Zigbee — avantages', v: "Faible latence, réseau robuste (redondance via le mesh)." },
          { k: 'Zigbee — inconvénients', v: "Portée limitée (10-100 mètres)." },
        ] },
        { type: 'definition', term: 'BLE (Bluetooth Low Energy)', def: "Optimisé pour une consommation ultra-faible ; communication en peer-to-peer ou en étoile." },
        { type: 'kv', items: [
          { k: 'BLE — cas d\u2019usage', v: "Wearables, santé connectée, beacons." },
          { k: 'BLE — avantages', v: "Compatibilité avec les smartphones ; énergétiquement efficace." },
          { k: 'BLE — inconvénients', v: "Portée très courte (jusqu'à 100 mètres en théorie, souvent moins)." },
        ] },
      ],
    },
    {
      id: 'i8s3',
      title: 'Tableau comparatif des protocoles',
      blocks: [
        { type: 'paragraph', text: "Le tableau récapitulatif du cours compare 5 protocoles sur 4 axes. Ce tableau est le support de nombreuses questions de quiz — apprenez-le ligne par ligne." },
        { type: 'table', headers: ['Protocole', 'Portée', 'Débit', 'Consommation', 'Cas d\u2019usage'], rows: [
          ['MQTT', 'Illimitée (IP)', 'Variable', 'Modérée', 'Médecine, Industrie, domotique'],
          ['CoAP', 'Illimitée (IP)', 'Faible', 'Faible', 'Capteurs contraints'],
          ['LoRaWAN', '15 km', '0.3-50 kbps', 'Très faible', 'Smart cities'],
          ['Zigbee', '10-100 m', '250 kbps', 'Faible', 'Domotique'],
          ['BLE', '10-100 m', '1-2 Mbps', 'Très faible', 'Wearables'],
        ], caption: 'Comparaison des protocoles (tableau IV.5 du cours)' },
        { type: 'diagram', diagram: 'NetProtocols' },
      ],
    },
    {
      id: 'i8s4',
      title: 'Sécurité des protocoles IoT',
      blocks: [
        { type: 'table', headers: ['Axe', 'Contenu'], rows: [
          ['Risques', "Écoute passive (sniffing) · Attaques par déni de service (DDoS) · Failles de chiffrement."],
          ['Solutions', "Chiffrement de bout en bout (TLS/DTLS pour MQTT/CoAP) · Authentification des dispositifs (certificats X.509) · Mises à jour régulières des firmware."],
        ], caption: 'Sécurité des protocoles IoT (IV.6)' },
        { type: 'note', title: 'TLS vs DTLS', text: "TLS sécurise TCP (MQTT), DTLS sécurise UDP (CoAP) — les deux noms tombent en question de cours." },
      ],
    },
  ],
}
