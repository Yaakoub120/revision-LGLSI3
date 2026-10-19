import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// INTERNET DES OBJETS — Mr Samir Belaid, FSM LSI3, 2025-2026
// Partie 1 : Introduction à l'IoT (InternetDesObjets-1.pdf)
// Modules 1 & 2
// ═══════════════════════════════════════════════════════════════

export const imod1: Module = {
  id: 'i1',
  num: 1,
  title: "Qu'est-ce que l'IoT ?",
  subtitle: 'Définitions IoT / IoMT / IoE, objectifs, historique et chiffres clés du marché',
  icon: '📡',
  color: 'emerald',
  source: 'InternetDesObjets-1.pdf — I. Définitions et Exemples',
  sections: [
    {
      id: 'i1s1',
      title: 'Définitions fondamentales',
      blocks: [
        { type: 'paragraph', text: "L'Internet des Objets (IoT) est aujourd'hui l'une des technologies les plus transverses : elle touche la santé, la ville, l'industrie, l'agriculture et la maison. Le cours commence par poser les définitions exactes qu'il faut savoir restituer, puis par distinguer les termes voisins IoT, IoMT et IoE." },
        { type: 'definition', term: 'IoT (Internet of Things)', def: "« Un réseau d'objets physiques connectés à Internet, capables de collecter, transmettre et analyser des données. »" },
        { type: 'definition', term: 'IoMT (Internet of Medical Things)', def: "« Désigne les dispositifs connectés utilisés pour surveiller, diagnostiquer ou traiter des patients à distance. »" },
        { type: 'list', items: [
          "Objectifs de l'IoMT : améliorer les soins, réduire les coûts, personnaliser les traitements.",
          "L'IoT est le socle général ; l'IoMT est sa déclinaison médicale (santé connectée).",
          "Un objet IoT combine du matériel (capteurs, radio) et du logiciel (traitement, application).",
        ] },
      ],
    },
    {
      id: 'i1s2',
      title: 'Historique et évolution',
      blocks: [
        { type: 'paragraph', text: "L'histoire de l'IoT démarre avec la gestion logistique et explose avec la miniaturisation des capteurs et la généralisation du sans-fil. Retenir les dates et les chiffres suivants — ils tombent souvent en QCM." },
        { type: 'timeline', items: [
          { time: '1999', text: "Kevin Ashton (MIT) invente le terme Internet of Things pour décrire la gestion de la chaîne logistique via RFID." },
          { time: 'Années 2000', text: "RFID et capteurs simples." },
          { time: '2008', text: "Premier pic avec 12 milliards d'objets connectés — dépassant la population mondiale." },
          { time: '2020s', text: "Explosion des applications : santé, smart cities, industrie 4.0." },
          { time: "Aujourd'hui", text: "Plus de 50 milliards d'objets connectés." },
        ] },
        { type: 'diagram', diagram: 'IotHistory' },
        { type: 'stats', items: [
          { value: '50+', label: "milliards d'objets connectés aujourd'hui" },
          { value: '1 600 Md$', label: 'marché mondial IoT estimé fin 2026 (McKinsey)' },
          { value: '187 Md$', label: "marché IoMT d'ici 2030 (Deloitte)" },
          { value: '60 %', label: "des établissements de santé utilisent l'IoT (HIMSS)" },
        ] },
      ],
    },
    {
      id: 'i1s3',
      title: 'IoE : Internet of Everything',
      blocks: [
        { type: 'paragraph', text: "Au-delà de l'IoT, la recommandation de l'UIT (et Cisco) parle d'IoE — Internet of Everything. L'idée : la communication devient possible partout, tout le temps, avec tout." },
        { type: 'definition', term: 'IoE (Internet of Everything)', def: "Recommandation de l'UIT : « Un Objet de Any thing vers l'Internet de Everything ». La communication est possible en tout LIEU et à tout MOMENT, mais aussi avec n'importe quel OBJET (IoE)." },
        { type: 'kv', items: [
          { k: 'Communication en tout LIEU', v: "en extérieur (outdoor) et en intérieur (indoor)." },
          { k: 'Communication à tout MOMENT', v: "en déplacement, la nuit, le jour." },
          { k: "Communication avec n'importe quel OBJET", v: "entre ordinateurs, entre personnes (sans ordinateur), entre objets." },
        ] },
        { type: 'diagram', diagram: 'IoeComm' },
        { type: 'note', title: 'À retenir', text: "IoT ⊂ IoE : l'IoT relie des objets ; l'IoE englobe aussi les personnes et les ordinateurs (selon le schéma du cours : entre ordinateurs, entre personnes sans ordinateur, entre objets)." },
      ],
    },
    {
      id: 'i1s4',
      title: 'Synthèse du module',
      blocks: [
        { type: 'table', headers: ['Terme', 'Définition à restituer'], rows: [
          ['IoT', "Réseau d'objets physiques connectés à Internet, capables de collecter, transmettre et analyser des données."],
          ['IoMT', "Dispositifs connectés utilisés pour surveiller, diagnostiquer ou traiter des patients à distance."],
          ['IoE', "Internet of Everything — communiquer en tout lieu, à tout moment, avec n'importe quel objet (UIT/Cisco)."],
          ['RFID', "Technologie d'identification radio qui a inspiré le terme IoT chez Kevin Ashton (chaîne logistique)."],
        ], caption: 'Les 4 définitions à connaître par cœur' },
        { type: 'quote', text: "L'IoT n'est pas une technologie, mais un écosystème.", source: 'Kevin Ashton' },
      ],
    },
  ],
}

export const imod2: Module = {
  id: 'i2',
  num: 2,
  title: "Exemples d'applications IoMT",
  subtitle: "Les 7 familles d'usages médicaux connectés : wearables, implants, télésurveillance, télémédecine, hôpitaux, urgence, santé mentale",
  icon: '🩺',
  color: 'emerald',
  source: 'InternetDesObjets-1.pdf — I.4 Exemples',
  sections: [
    {
      id: 'i2s1',
      title: '1. Dispositifs portables (Wearables)',
      blocks: [
        { type: 'paragraph', text: "Les wearables sont les dispositifs IoMT les plus visibles : ils se portent sur le corps et mesurent en continu des paramètres vitaux ou métaboliques, sans passer par un hôpital. Le cours en cite quatre." },
        { type: 'kv', items: [
          { k: 'Apple Watch Series 10 (smartwatch médicale)', v: "Détection des arythmies cardiaques (ECG intégré) et suivi du taux d'oxygène dans le sang (SpO₂)." },
          { k: 'Fitbit Sense (smartwatch)', v: "Surveillance du stress via la variabilité du rythme cardiaque." },
          { k: 'FreeStyle Libre (Abbott, patch connecté)', v: "Mesure du glucose sanguin en continu pour les diabétiques, sans piqûre." },
          { k: 'BioSticker (BioIntelliSense, patch connecté)', v: "Suivi des signes vitaux (température, fréquence respiratoire) pendant 30 jours." },
        ] },
      ],
    },
    {
      id: 'i2s2',
      title: '2. Implants médicaux connectés',
      blocks: [
        { type: 'paragraph', text: "Les implants connectés vont plus loin : ils sont placés dans le corps et communiquent avec le médecin ou s'adaptent automatiquement aux besoins du patient. Trois exemples sont cités dans le cours." },
        { type: 'kv', items: [
          { k: 'Stimulateurs cardiaques — Medtronic MyCareLink', v: "Transmet des données sur le fonctionnement du pacemaker au médecin via Bluetooth." },
          { k: "Pompes à insuline intelligentes — Tandem t:slim X2", v: "S'adapte automatiquement aux besoins en insuline en temps réel (intégration avec les capteurs Dexcom)." },
          { k: 'Neurostimulateurs — StimWave', v: "Gère la douleur chronique via une application mobile." },
        ] },
      ],
    },
    {
      id: 'i2s3',
      title: '3. Surveillance à distance & 4. Télémédecine',
      blocks: [
        { type: 'paragraph', text: "Deux familles complémentaires : la télésurveillance surveille le patient à domicile en continu, tandis que la télémédecine permet une consultation virtuelle avec des examens à distance. Le tableau suivant récapitule tous les produits du cours." },
        { type: 'table', headers: ['Famille', 'Produit', 'Fonction'], rows: [
          ['Télésurveillance', 'Philips eCareCoordinator', "Surveille les patients atteints de BPCO ou d'insuffisance cardiaque à domicile."],
          ['Télésurveillance', 'BioTelemetry (GE Healthcare)', "Suivi cardiaque via des capteurs ECG portables."],
          ['Télésurveillance', 'CarePredict', "Détecte les chutes et les changements de comportement via des capteurs de mouvement et d'IA (personnes âgées)."],
          ['Télémédecine', 'TytoCare', "Kit de diagnostic à domicile : stéthoscope, otoscope et thermomètre connectés pour des examens à distance."],
          ['Télémédecine', 'Teladoc', "Plateforme intégrée : consultation vidéo avec partage de données de dispositifs IoMT (ex : tension artérielle)."],
        ], caption: 'Télésurveillance vs télémédecine — produits du cours' },
      ],
    },
    {
      id: 'i2s4',
      title: '5. Hôpitaux intelligents',
      blocks: [
        { type: 'paragraph', text: "L'hôpital lui-même devient un objet IoT : lits, stocks, désinfection. Le cours cite trois exemples concrets d'équipements hospitaliers connectés." },
        { type: 'kv', items: [
          { k: 'Lits connectés — EarlySense', v: "Capteurs sous le matelas pour surveiller la fréquence cardiaque, la respiration et les mouvements des patients." },
          { k: 'Gestion des stocks — Siemens Healthineers', v: "Capteurs IoT pour suivre les stocks de sang ou de vaccins en temps réel." },
          { k: 'Robots de désinfection — Xenex LightStrike', v: "Robot utilisant les UV pour désinfecter les chambres d'hôpital." },
        ] },
      ],
    },
    {
      id: 'i2s5',
      title: '6. Urgence & 7. Santé mentale',
      blocks: [
        { type: 'paragraph', text: "Les deux dernières familles couvrent les situations d'urgence (détection de crise, réponse aux arrêts cardiaques) et le bien-être psychologique (neurofeedback, thérapie VR)." },
        { type: 'kv', items: [
          { k: 'Embrace2 (Empatica) — détection des crises', v: "Bracelet détectant les crises d'épilepsie via des capteurs de mouvement et de transpiration, et envoie une alerte." },
          { k: 'HeartHero — arrêts cardiaques', v: "Défibrillateur portable connecté guidant les secouristes via une application." },
          { k: 'Muse 2 — neurofeedback', v: "Bandeau mesurant l'activité cérébrale pour améliorer la méditation." },
          { k: 'AppliedVR — thérapie par réalité virtuelle', v: "Traite la douleur chronique et l'anxiété via des séances de VR connectées." },
        ] },
        { type: 'diagram', diagram: 'IomtExamples' },
        { type: 'note', title: 'Moyen mnémotechnique', text: "7 familles : Porter (wearables) · Implanter · Surveiller à distance · Téléconsulter · Hospitaliser · Urgence · Psychologie." },
      ],
    },
  ],
}
