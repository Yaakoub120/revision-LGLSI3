import type { Module } from './types'

// ═══════════════════════════════════════════════════════════════
// MODULE 2 — C'est quoi le Big Data ? Les 5 V (Partie 2)
// ═══════════════════════════════════════════════════════════════
export const module2: Module = {
  id: 'm2',
  num: 2,
  title: 'Les 5 V & Caractéristiques',
  subtitle: 'Volume, Vélocité, Variété, Véracité, Valeur — quand parle-t-on de Big Data ?',
  icon: '⭐',
  color: 'emerald',
  source: 'Partie 2 — Big Data : Caractéristiques',
  sections: [
    {
      id: 'm2s1',
      title: 'Le Big Data est-il seulement une question de volume ?',
      blocks: [
        {
          type: 'note',
          title: 'Question du cours',
          text: "❓ Le Big Data = le volume de données ?  →  Réponse : FAUX ! Il n'y a pas que la volumétrie de données lorsqu'on parle de Big Data !!",
        },
        {
          type: 'paragraph',
          text: "On parle aussi de : Mégadonnées, Données massives. Autres synonymes rencontrés : Big Data.",
        },
        {
          type: 'note',
          title: 'Quand peut-on dire qu\'on a affaire à des BIG DATA ?',
          text: "Quand on a affaire aux « n-V » : les multiples V (Volume, Vélocité, Variété, puis Véracité, Valeur…).",
        },
      ],
    },
    {
      id: 'm2s2',
      title: 'Historique des V',
      blocks: [
        {
          type: 'timeline',
          items: [
            { time: 'Gartner (2001) — 3V', text: "Volume • Variété • Vélocité" },
            { time: 'IBM (2012) — 4V', text: "+ Véracité" },
            { time: '2015 — 5V', text: "+ Valeur" },
            { time: '2016 — 7V ?', text: "+ Variabilité • + Visualisation" },
            { time: '2017 — 10V ?', text: "+ Viability • + Virality • + Viscosity • + Volatility • + Validity • + Vagueness • + Vocabulary • + Venue" },
          ],
        },
        { type: 'diagram', diagram: 'five-v' },
      ],
    },
    {
      id: 'm2s3',
      title: 'Les 3 problématiques majeures pour les données massives',
      blocks: [
        {
          type: 'kv',
          items: [
            { k: 'Volume →', v: 'Stockage' },
            { k: 'Vélocité →', v: 'Traitement' },
            { k: 'Variété →', v: 'Collecte' },
          ],
        },
        { type: 'diagram', diagram: 'three-v-triangle' },
      ],
    },
    {
      id: 'm2s4',
      title: 'V1 — Le VOLUME',
      blocks: [
        {
          type: 'definition',
          term: 'Volume',
          def: "Téraoctets • Enregistrements / Archives • Transactions • Tables, fichiers.",
        },
        {
          type: 'list',
          items: [
            "Croissance du digital : 0,12 Zo (2005) → 1,2 Zo (2010) → 2,8 Zo (2012) → 8,5 Zo (2015) → 40 Zo (2020*).",
            "En 2017 : 4,4 zettaoctets de données, soit 44 trillions de gigaoctets, soit 44 milliards de pétaoctets. Fin 2013, 3,9 avaient été générées… les données sont placées de tous les côtés dans toutes les places de la Terre.",
            "40 zettaoctets de données générées d'ici 2020 et 50 milliards d'objets connectés à la même date.",
          ],
        },
        {
          type: 'paragraph',
          text: "Les causes de cette croissance du volume :",
        },
        {
          type: 'list',
          items: [
            "Outils numériques plus performants et plus connectés : ordinateurs et smartphones.",
            "Open Data : réseaux sociaux (Facebook) ; données d'administrations publiques.",
            "Internet des Objets : RFID (cartes de transport, codes-barres, …). Ericsson a estimé le nombre d'objets connectés dans le monde à 50 milliards en 2020 (12 milliards en 2013).",
          ],
        },
        {
          type: 'kv',
          items: [
            { k: '1 Mégaoctet', v: '= 10⁶ octets' },
            { k: '1 Gigaoctet', v: '= 10⁹ octets' },
            { k: '1 Téraoctet', v: '= 10¹² octets' },
            { k: '1 Pétaoctet', v: '= 10¹⁵ octets' },
            { k: '1 Exaoctet', v: '= 10¹⁸ octets' },
            { k: '1 Zettaoctet', v: '= 10²¹ octets' },
          ],
        },
        {
          type: 'paragraph',
          text: "Big Data = Transactions + Interactions + Observations :",
        },
        {
          type: 'table',
          headers: ['Source', 'Exemples'],
          rows: [
            ['Persystème', 'Sensors, RFID devices, User Click Stream, Web logs, CRM, ERP Systems'],
            ['Transactifs', 'Mobile Web, AB Testing, Online Photos, Dynamic Pricing, Offer Markets, Content Markets, Target of Credit'],
            ['Génératif', 'Search Queries, Health Networks, Behavioral Targeting, News, SEM/SEO'],
            ['BIG DATA', 'Sensor-Embedded Devices, User Generated Content, Social Interactions & Feeds, Billing & OPF Components, Federated Databases, Business Data Feeds, KD videos/audio/images, Search & Text, Product/Device Logs, M2M/MPD'],
          ],
          caption: 'Croissance selon la variété et la complexité croissantes des données',
        },
      ],
    },
    {
      id: 'm2s5',
      title: 'V2 — La VARIÉTÉ (Variety)',
      blocks: [
        {
          type: 'definition',
          term: 'Variété',
          def: "Structurées • Non structurées • Probabilistes.",
        },
        {
          type: 'note',
          title: 'Le problème',
          text: "Pour un stockage dans des bases de données ou dans des entrepôts de données, les données doivent respecter un format prédéfini ! MAIS : la plupart des données existantes sont non-structurées ou semi-structurées, et les données sont sous plusieurs formats et types (fichiers xml, json, txt, base de données relationnelle, etc.).",
        },
        {
          type: 'kv',
          items: [
            {
              k: 'Données structurées',
              v: "Données que l'on peut clairement coder et identifier. Les données d'un tableau sont typiquement des données structurées. On peut comprendre leurs significations en croisant les titres de la ligne et de la colonne dans laquelle se trouvent les données. → Organisées pour faciliter le traitement ; structurées et formatées pour simplifier l'analyse ; format défini (exemple : Nom, Adresse, Âge).",
            },
            {
              k: 'Données semi-structurées',
              v: "Non organisées mais peuvent être associées à des données qui le sont. Exemple : fichier XML — langage XML, métadonnées décrivant les autres données. Exemple du cours : <rec><name>Prosch, Pasc</name><sex>Male</sex><age>35</age></rec> …",
            },
            {
              k: 'Données non structurées',
              v: "Données qui ne répondent pas à un modèle de données préétabli ou qui ne sont pas organisées de manière prédéfinie. C'est en analysant les contenus des messages électroniques, des pages web, de fichiers texte, audio, vidéo, etc. que l'on peut les identifier. → Non organisées et sans format défini, plus difficile à analyser (photos, vidéos, audio, livres, pages web…).",
            },
          ],
        },
        {
          type: 'definition',
          term: 'Lac de données (Data Lake)',
          def: "Les données brutes (cloud, fichiers) sont versées dans un « lac de données » qui accepte TOUS TYPES de données pour le TRAITEMENT et l'ANALYSE.",
        },
        {
          type: 'paragraph',
          text: "Exemple de données structurées du cours : table Employee (Id, FirstName, LastName, DepartmentName) — lignes 1 à 10 : Kent/Sanchez/Executive, Terr/Duffy/Engineering, Roberto/Tamburello/Engineering, Rob/Walters/Engineering, Gail/Erickson/Engineering, Jossef/Goldberg/Engineering, Dylan/Miller/Support, Diane/Margheim/Support, Gigi/Mathew/Support, Michael/Raheem/Support.",
        },
      ],
    },
    {
      id: 'm2s6',
      title: 'V3 — La VÉLOCITÉ / vitesse (Velocity)',
      blocks: [
        {
          type: 'definition',
          term: 'Vélocité',
          def: "Batch • Temps réel • Processus • Flot de données — « Au cœur du Time to Market ».",
        },
        {
          type: 'list',
          items: [
            "La fréquence d'arrivée des données",
            "La vitesse de traitement des données",
            "Les données doivent être stockées à l'arrivée, parfois même des Téraoctets par jour ! Sinon, risque de les perdre !",
            "Les entreprises se trouvent de plus en plus au milieu d'un flux continuel de données",
          ],
        },
      ],
    },
    {
      id: 'm2s7',
      title: 'V4 — La VÉRACITÉ (Veracity)',
      blocks: [
        {
          type: 'definition',
          term: 'Véracité',
          def: "Confiance • Authenticité • Origine, réputation • Disponibilité • Responsabilité.",
        },
        {
          type: 'list',
          items: [
            "Fait référence à la fiabilité des données.",
            "Si la quantité des données augmente alors la qualité et précision sont moins vérifiées !",
          ],
        },
        {
          type: 'note',
          title: "Exemple : Twitter",
          text: "Les tweets peuvent contenir : des abréviations, des hashtags #, du langage familier, l'alphabet de tchat arabe, fiabilité et exactitude de données, etc. → Les solutions Big Data et l'analytique doivent remédier à cela en se référant au volume des données existantes. Le manque de qualité et d'exactitude résultent souvent des gros volumes !",
        },
      ],
    },
    {
      id: 'm2s8',
      title: 'V5 — La VALEUR (Value)',
      blocks: [
        {
          type: 'definition',
          term: 'Valeur',
          def: "Statistiques • Évènements • Corrélations • Hypothétiques.",
        },
        {
          type: 'list',
          items: [
            "Il faut transformer toutes les données en valeurs exploitables : les données sans valeur sont inutiles.",
            "Atteindre des objectifs stratégiques de création de valeur pour les clients et pour l'entreprise dans tous les domaines d'activité.",
            "Il est aussi primordial que les entreprises évaluent la rentabilité d'une récolte de données par exemple.",
          ],
        },
        {
          type: 'note',
          title: '⭐ Le V le plus important !',
          text: "Un projet Big Data et son accès aux utilisateurs n'a d'intérêt que s'il apporte de la valeur à l'entreprise → Le V le plus important !",
        },
      ],
    },
    {
      id: 'm2s9',
      title: 'Résumé — Big Data : 5V',
      blocks: [
        {
          type: 'kv',
          items: [
            { k: '1. Volume', v: 'Téraoctets, Enreg./Archives, Transactions, Tables, fichiers' },
            { k: '2. Variété', v: 'Structurées, Non structurées, Probabilistes' },
            { k: '3. Vélocité', v: 'Batch, Temps réel, Processus, Flot de données' },
            { k: '4. Véracité', v: 'Confiance, Authenticité, Origine/réputation, Disponibilité, Responsabilité' },
            { k: '5. Valeur', v: 'Statistiques, Évènements, Corrélations, Hypothétiques' },
          ],
        },
      ],
    },
    {
      id: 'm2s10',
      title: 'Problématique du Volume',
      blocks: [
        {
          type: 'list',
          items: [
            "Auparavant, quand les systèmes d'application de gestion de base de données ont été réalisés, ils ont été construits avec une échelle à l'esprit. Même les organisations n'ont pas été préparées à l'échelle que nous produisons aujourd'hui.",
            "Comme les exigences de ces organisations ont augmenté au fil du temps, elles doivent repenser et réinvestir dans l'infrastructure. Actuellement, le coût des ressources impliquées dans l'extension de l'infrastructure s'accroît avec un facteur exponentiel.",
            "De plus, il y a une limitation sur les différents facteurs tels que la taille de la machine, CPU, RAM, etc. qui peuvent être mis à l'échelle (scaled up). Ces systèmes traditionnels ne seraient pas en mesure de soutenir l'échelle requise par la plupart des entreprises.",
          ],
        },
        {
          type: 'note',
          title: 'ADAPTABILITÉ',
          text: "Dans ce nouveau contexte, les méthodes de traitement de ces données (capture, stockage, recherche, partage, analyse, visualisation) doivent être redéfinies car l'ensemble de ces données devient difficilement manipulable par les outils classiques.",
        },
        {
          type: 'note',
          title: 'Le changement de mentalité',
          text: "Arrêter de réfléchir en Relationnel ! Absolument TOUTES les données sont importantes !",
        },
      ],
    },
    {
      id: 'm2s11',
      title: 'Big Data : est-ce une innovation ?',
      blocks: [
        {
          type: 'paragraph',
          text: "L'explosion des volumes des données nécessite une innovation en terme de :",
        },
        {
          type: 'steps',
          items: [
            {
              title: '1. Accélération matérielle',
              text: "Abandon des disques durs au profit des mémoires dynamiques DRAM (Dynamic Random Access Memory : mémoire vive dynamique) ou flash. ⇒ Meilleur bénéfice des processeurs multicœurs.",
            },
            {
              title: '2. Bases de données d\'analyse massivement parallèle (MPP)',
              text: "Ces bases de données conformes SQL sont conçues pour répartir le traitement des données sur plusieurs machines.",
            },
            {
              title: '3. Modèle Map-Reduce, Hadoop et autres approches NoSQL',
              text: "Ces approches permettent d'accéder aux données via des langages de programmation sans utiliser les interfaces basées sur SQL et permettent de répartir les données sur plusieurs machines distinctes.",
            },
          ],
        },
        {
          type: 'paragraph',
          text: "Repère historique : 2002 — « the beginning of the digital age » : le numérique passe de 5 % du stockage mondial (~0,1 % en 1986, 3 % en 1993, 25 % en 2000) à 94 % en 2007 (281 milliards de gigaoctets, 130 exaoctets).",
        },
      ],
    },
  ],
}
