import type { Module } from './types'

// ═══════════════════════════════════════════════════════════════
// MODULE 1 — Introduction au Big Data (Partie 1 du cours)
// ═══════════════════════════════════════════════════════════════
export const module1: Module = {
  id: 'm1',
  num: 1,
  title: 'Introduction au Big Data',
  subtitle: 'Histoire, définitions, origines et notions fondamentales',
  icon: '🌍',
  color: 'amber',
  source: 'Partie 1 — Chapitre 1 (Dr. Souheyl Mallat)',
  sections: [
    {
      id: 'm1s1',
      title: 'Pourquoi ce cours ?',
      blocks: [
        {
          type: 'paragraph',
          text: "Selon LinkedIn, les compétences les plus recherchées depuis plusieurs années sont :",
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Cloud and Distributed Computing (Hadoop, Big Data)',
            'Statistical Analysis and Data Mining (R, Data Analysis)',
            "… et à la 10ᵉ place : Storage Systems and Management (SQL)",
          ],
        },
      ],
    },
    {
      id: 'm1s2',
      title: 'Objectifs généraux du cours',
      blocks: [
        {
          type: 'paragraph',
          text: "Ce cours présente des outils et méthodes de traitement de gros volumes de données (Big Data) au travers de la suite logicielle Hadoop.",
        },
        {
          type: 'definition',
          term: 'Hadoop',
          def: "Un ensemble de services et d'applications permettant de stocker et d'administrer des fichiers et des bases de données de très grande taille et de lancer des programmes de calcul sur ces données.",
        },
        {
          type: 'paragraph',
          text: "Le principe est de répartir les données et les traitements sur un groupe de plusieurs machines appelé amas (cluster). Hadoop est utilisé par des entreprises comme Google, Facebook, Amazon, etc.",
        },
        {
          type: 'note',
          title: 'Prérequis du cours',
          text: "Langage Java • Langage Python de base • Bases de données • Systèmes d'exploitation",
        },
      ],
    },
    {
      id: 'm1s3',
      title: "Un peu d'Histoire — la fabuleuse épopée des données",
      blocks: [
        {
          type: 'paragraph',
          text: "Le cours retrace l'histoire de l'information comme un conte : « Il a inventé le livre pour tout noter » → « Et le téléphone pour tout dire » → « Il voulait une machine qui ferait le travail à sa place… » (l'ordinateur) → « Puis partager ses trouvailles avec d'autres » (Internet Connection Wizard / e-mail).",
        },
        {
          type: 'note',
          title: 'Le point de bascule',
          text: "Au début, une poignée de privilégiés avaient le monopole de l'information sur Internet. Et puis un jour… le World Wide Web !",
        },
        {
          type: 'kv',
          items: [
            { k: 'Web 1.0 — Web Passif', v: "Un producteur publie → les internautes consomment (flux à sens unique : producteur → web → internautes)." },
            { k: 'Web 2.0 — Web Collaboratif', v: "Les internautes deviennent contributeurs : RSS, blogs, wikis, réseaux sociaux, smartphones — tout le monde produit et partage du contenu." },
            { k: 'Web 3.0 — Web Sémantique (?)', v: "Ajout d'agents intelligents et de widgets : la machine comprend le sens des données et les relie automatiquement (le « ? » du cours souligne que c'est encore une interrogation)." },
          ],
        },
        {
          type: 'paragraph',
          text: "Le monde devient « interconnecté et instrumenté », avec les chiffres marquants suivants :",
        },
        {
          type: 'stats',
          items: [
            { value: '500 M+', label: "utilisateurs postant 55 millions de tweets chaque jour" },
            { value: '1,2 trillion', label: "de recherches (searches)" },
            { value: '1 Md+', label: "d'utilisateurs actifs passant 700 millions de minutes par mois (Facebook)" },
            { value: '30 milliards', label: "de tags RFID aujourd'hui (1,3 Md en 2005)" },
            { value: '4,6 milliards', label: "de téléphones-appareils photo dans le monde" },
            { value: '100s de millions', label: "de dispositifs GPS vendus chaque année" },
            { value: '76 millions', label: "de compteurs intelligents (smart meters) en 2009… 200 M d'ici 2014" },
            { value: '2 Md+', label: "de personnes sur le Web d'ici fin 2011" },
          ],
        },
        {
          type: 'list',
          items: [
            "Et avec l'arrivée des Plateformes Mobiles Intelligentes (tablettes, iPhone, Android, BlackBerry, Windows Mobile…), chacun génère des données en continu.",
            "Puis viennent les objets connectés (ordinateurs, imprimantes, téléphones, TV, lampes, frigos, moniteurs… tous reliés en réseau).",
            "Et enfin le Cloud Computing, qui offre stockage et calcul à la demande.",
          ],
        },
      ],
    },
    {
      id: 'm1s4',
      title: "L'évolution des données — 3 chiffres clés",
      blocks: [
        {
          type: 'stats',
          items: [
            { value: '90 %', label: "des données ont été créées au cours des sept dernières années" },
            { value: '80 %', label: "des données actuelles ne sont pas structurées" },
            { value: '20 %', label: "des données disponibles peuvent être traitées par des systèmes traditionnels" },
          ],
        },
      ],
    },
    {
      id: 'm1s5',
      title: 'Challenges',
      blocks: [
        {
          type: 'paragraph',
          text: "Face à l'avalanche (« Des données… des données… DES DONNÉES!! », « Les données ont explosé ! », l'iceberg BIG DATA), les challenges sont :",
        },
        {
          type: 'list',
          items: [
            "Réunir un grand volume de données variées pour trouver de nouvelles idées.",
            "Difficulté pour sauvegarder toutes ces données.",
            "Difficulté pour traiter ces données et les utiliser.",
            "Les données sont créées rapidement.",
          ],
        },
      ],
    },
    {
      id: 'm1s6',
      title: 'Big Data : Intérêts',
      blocks: [
        {
          type: 'table',
          headers: ['Chiffre', 'Constat'],
          rows: [
            ["1/3", "Des chefs d'entreprise prennent fréquemment des décisions basées sur des informations en lesquelles ils n'ont pas confiance, ou qu'ils n'ont pas."],
            ["1/2", "Des chefs d'entreprise disent qu'ils n'ont pas accès aux informations dont ils ont besoin pour faire leur travail."],
            ["83 %", "Des DSI (Directeurs des SI) citent l'informatique décisionnelle et analytique comme faisant partie de leurs plans pour améliorer leur compétitivité."],
            ["60 %", "Des PDG ont besoin d'améliorer la capture et la compréhension des informations pour prendre des décisions plus rapidement."],
          ],
        },
      ],
    },
    {
      id: 'm1s7',
      title: 'Big Data : Sources',
      blocks: [
        {
          type: 'paragraph',
          text: "Sources multiples : sites web, bases de données, téléphones, serveurs…",
        },
        {
          type: 'list',
          items: [
            "Détecter les sentiments et les réactions des clients.",
            "Détecter les conditions critiques ou potentiellement mortelles dans les hôpitaux, et à temps pour intervenir.",
            "Prendre des décisions risquées basées sur des données transactionnelles en temps réel.",
            "Identifier les criminels et les menaces à partir de vidéos, sons et flux de données.",
            "Étudier les réactions des étudiants pendant un cours, prédire ceux qui vont réussir, d'après les statistiques et modèles réunis au long des années (domaine Big Data in Education).",
          ],
        },
        {
          type: 'note',
          title: 'Les 3 éléments essentiels',
          text: "Les données massives sont le résultat de la rencontre de trois éléments essentiels. L'Internet permet la transmission de l'information, quelle que soit sa forme, sur les appareils intelligents.",
        },
      ],
    },
    {
      id: 'm1s8',
      title: 'Les préfixes multiplicatifs (ordre de grandeur des données)',
      blocks: [
        {
          type: 'table',
          headers: ['Unité', 'Valeur', 'Exemple du cours'],
          rows: [
            ['Bit', '—', 'Plus petite unité'],
            ['Octet', '8 bits', '1 caractère = 1 octet'],
            ['Kilo Octet (ko)', '1 ko = 1 024 o', '1 page de texte = 30 ko'],
            ['Méga Octet (Mo)', '1 Mo = 1 024 ko', '1 morceau de musique = 5 Mo'],
            ['Giga Octet (Go)', '1 Go = 1 024 Mo', '1 film de 2 h = 1 Go'],
            ['Téra Octet (To)', '1 To = 1 024 Go', '6 millions de livres = 1 To'],
            ['Péta Octet (Po)', '1 Po = 1 024 To', '2 milliards de photos réseaux sociales = 1 Po'],
            ['Exa Octet (Eo)', '1 Eo = 1 024 Po', "Toutes les infos produites jusqu'à 2003 = 5 Eo"],
            ['Zéta Octet (Zo)', '1 Zo = 1 024 Eo', 'Données produites en 2011 = 1,8 Zo'],
            ['Yota Octet (Yo)', '1 Yo = 1 024 Zo', "En 2013, le plus grand data center au monde est capable de traiter 1 YotaO"],
          ],
          caption: 'Ordre de mesure de stockage des données (avant de parler de Big Data, connaissez-vous les préfixes ?)',
        },
      ],
    },
    {
      id: 'm1s9',
      title: 'Historique et contexte du terme « Big Data »',
      blocks: [
        {
          type: 'timeline',
          items: [
            { time: '1996', text: "Sauvegarder sur support électronique coûte moins cher que l'archivage papier." },
            { time: '1997', text: "1ʳᵉ utilisation du terme « Big Data » lors d'une conférence informatique." },
            { time: '1998', text: "1ères estimations de croissance & volumétrie des données internet." },
            { time: '2000', text: "Présentation des 1ers modèles de données dynamiques lors d'une conférence « économetrie »." },
            { time: '2001', text: "Définition des 3V du Big Data." },
            { time: '2005', text: "Définition du WEB 2.0." },
            { time: '2008', text: "1ères analyses sur l'impact du Big Data dans les activités commerciales, scientifiques, médicales, etc." },
          ],
        },
        {
          type: 'paragraph',
          text: "L'évolution du SI amène les entreprises à traiter de plus en plus de données issues de sources toujours plus variées. Les prévisions de taux de croissance des volumes de données traitées dépassent les limites des technologies traditionnelles. On parle de Pétaoctet (billiard d'octets) voire de Zettaoctet (trilliard d'octets) ⇒ Quelle solution pour exploiter ces données ?",
        },
      ],
    },
    {
      id: 'm1s10',
      title: 'Les origines du Big Data',
      blocks: [
        {
          type: 'note',
          title: 'Les 2 causes principales',
          text: "Les deux principales causes de l'avènement du Big Data ces dernières années sont à la fois ÉCONOMIQUES et TECHNOLOGIQUES : une baisse exponentielle des prix des ressources IT !",
        },
        {
          type: 'table',
          headers: ['Ressource', 'Évolution du prix / du nombre'],
          rows: [
            ['Stockage', '1980 : Apple $14 000 000 par To → 2010 : Barracuda $70 par To'],
            ['CPU', '1961 : IBM 1620 $1 100 000 000 par GFLOPS → 2009 : AMD Radeon $0.59'],
            ['Réseau', "1969 : ARPAnet nœud n°1 à UCLA → 2015 : 1 milliard de nœuds"],
            ['Bande passante', '1998 : $1200 par Mbps → 2010 : $5 par Mbps (ce qui a favorisé l\'émergence des services cloud)'],
          ],
          caption: "Figure : Évolution des prix des ressources IT au cours des dernières décennies",
        },
        {
          type: 'paragraph',
          text: "Cela concerne la capacité de stockage, le nombre de nœuds que l'on peut mettre en parallèle dans un data center, la fréquence des CPU, la bande passante disponible, etc.",
        },
        {
          type: 'definition',
          term: 'Data center',
          def: "Imaginez 5000 ordinateurs connectés entre eux formant un cluster.",
        },
        {
          type: 'paragraph',
          text: "Des progrès initiés par les géants du web : pour bénéficier de ces ressources de stockage énormes, les géants du web ont dû développer pour leurs propres besoins de nouvelles technologies, notamment en matière de parallélisation des traitements, opérant des volumes de données se chiffrant en plusieurs centaines de téraoctets.",
        },
        {
          type: 'note',
          title: 'Question : où se trouve la frontière du Big Data ?',
          text: "Des volumes relèvent du Big Data à partir du moment où ces données ne peuvent plus être traitées en un temps « raisonnable » ou « utile » par des systèmes constitués d'un seul nœud. Exemple : si l'on doit traiter ou analyser un téraoctet de données en quelques minutes, il faudra impérativement recourir à une mise en parallèle des traitements et du stockage sur plusieurs nœuds !",
        },
      ],
    },
    {
      id: 'm1s11',
      title: "Timeline de l'évolution des bases de données",
      blocks: [
        {
          type: 'timeline',
          items: [
            { time: '1960', text: "Système de gestion de fichiers." },
            { time: '1970', text: "Le modèle relationnel, l'algèbre de Codd." },
            { time: '1977', text: "Oracle." },
            { time: '1980-90', text: "DB2, INGRES, SQL Server, BD distribuées ; BD active, spatiale, temporelle, multimédia, déductive, objet, objet-relationnel." },
            { time: '2000', text: "Warehouse, OLAP, BD parallèles ; WEB — XML, XQUERY." },
            { time: '2010', text: "NoSQL, NewSQL, Cloud." },
            { time: '→', text: "Big Data." },
          ],
        },
        {
          type: 'list',
          items: [
            "Phase 1 : années 1960-1970 (fichiers, puis modèle relationnel)",
            "Phase 2 : années 1970-2000 (Oracle, DB2, INGRES, SQL Server, BD distribuées et avancées)",
            "Phase 3 : à partir de 2000 (Warehouse, OLAP, BD parallèles, NoSQL, NewSQL, Cloud, Big Data)",
          ],
        },
      ],
    },
    {
      id: 'm1s12',
      title: 'C\'est quoi le Big Data ? — Les 3 définitions à connaître',
      blocks: [
        {
          type: 'quote',
          text: "« Data of a very large size, typically to the extent that its manipulation and management present significant logistical challenges » — données de très grande taille, dont la manipulation et gestion présentent des enjeux du point de vue logistiques.",
          source: 'Définition 1 — Oxford English Dictionary',
        },
        {
          type: 'quote',
          text: "« An all-encompassing term for any collection of data sets so large and complex that it becomes difficult to process using on-hand data management tools or traditional data processing applications » — englobe tout terme pour décrire toute collection de données tellement volumineuse et complexe qu'il devient difficile de la traiter en utilisant des outils classiques de traitement d'applications.",
          source: 'Définition 2 — Wikipédia',
        },
        {
          type: 'quote',
          text: "« Datasets whose size is beyond the ability of typical database software tools to capture, store, manage, and analyze » — collections de données dont la taille dépasse la capacité de capture, stockage, gestion et analyse des systèmes de gestion de bases de données classiques.",
          source: 'Définition 3 — McKinsey, 2011',
        },
        {
          type: 'note',
          title: 'Ce qu\'on retient …',
          text: "• Volume des données  • Complexité  • Limites des outils classiques de gestion des données  • Passage à l'échelle",
        },
      ],
    },
    {
      id: 'm1s13',
      title: 'Big Data = Big + Data',
      blocks: [
        {
          type: 'kv',
          items: [
            { k: 'Data (Données)', v: "Deuxième bien le plus précieux au monde après l'Information." },
            { k: 'Différences (data ≠ information)', v: "Valeur ajoutée • Exploitation • Interprétation." },
            { k: 'Big', v: "Volume énorme — exaoctets (10¹⁸ o) voire zettaoctets (10²¹ o)." },
          ],
        },
        {
          type: 'stats',
          items: [
            { value: '90 %', label: "des données récoltées depuis le début de l'humanité ont été générées les deux dernières années" },
          ],
        },
        {
          type: 'note',
          title: 'Question fréquente',
          text: "« Les systèmes traditionnels ne gèrent-ils pas des données volumineuses ? » — IMPORTANT ⚠️ : L'objectif n'est pas de remplacer les systèmes existants avec les systèmes Big Data, mais de les INTÉGRER ensemble !",
        },
      ],
    },
    {
      id: 'm1s14',
      title: 'Les 5 notions du Big Data (vue d\'ensemble)',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            "Explosion de la quantité de données",
            "Le partage de données",
            "La recherche des données",
            "Le stockage massif des données",
            "Le traitement des flux de données",
          ],
        },
        { type: 'diagram', diagram: 'five-notions' },
      ],
    },
    {
      id: 'm1s15',
      title: 'Notion 1 — Explosion de la quantité de données',
      blocks: [
        {
          type: 'paragraph',
          text: "Les chercheurs font un énorme travail afin de découvrir une méthode pour traiter cette quantité massive qui arrive chaque jour, même en temps réel chaque seconde.",
        },
        {
          type: 'list',
          items: [
            "En 2020, les données représenteront l'équivalent de plus de 5 000 Go par personne !",
            "En 2012, 35 % de ces informations nécessiteraient une protection, mais ce n'est le cas que pour 20 % d'entre elles.",
            "Il n'y avait que 130 exaoctets de données dans l'univers numérique en 2005. Il devrait y en avoir plus de 40 000 en 2020.",
          ],
        },
        {
          type: 'table',
          headers: ['Année', 'Univers numérique (exaoctets)'],
          rows: [
            ['2005', '130'],
            ['2010', '1 227'],
            ['2012', '2 837'],
            ['2015', '8 591'],
            ['2020', '40 026'],
          ],
          caption: 'Croissance 2010-2020 : l\'univers numérique double chaque année (milliards de gigaoctets)',
        },
        {
          type: 'paragraph',
          text: "Sources de la croissance (Hitachi — « The Data Multiplier Effect ») : la croissance va du Business Process (données de base OLTP, ×1) au Human (e-mails, documents, web logs, réseaux sociaux, contenu d'entreprise, ×10) puis au Machine (sensor data, vidéo, enregistrements, M2M log files, bio-informatics, satellite imaging, ×100).",
        },
      ],
    },
    {
      id: 'm1s16',
      title: 'Notion 2 — Le partage de données',
      blocks: [
        {
          type: 'list',
          items: [
            "Données partagées sur plusieurs serveurs",
            "Réplication des données",
            "Restitution des données",
          ],
        },
      ],
    },
    {
      id: 'm1s17',
      title: 'Notion 3 — La recherche des données',
      blocks: [
        {
          type: 'paragraph',
          text: "Comment parcourir ces données et en extraire des informations facilement et rapidement ?",
        },
        {
          type: 'list',
          items: [
            "Données massives stockées quelque part",
            "Rechercher une donnée précise",
            "Il faut que la réponse soit optimisée : → en terme de recherche → en terme de résultat !",
          ],
        },
      ],
    },
    {
      id: 'm1s18',
      title: 'Notion 4 — Stockage massif des données',
      blocks: [
        {
          type: 'list',
          items: [
            "Les données sont massives et existent → Trouver les moyens de stocker ces données le plus pertinemment possible afin qu'on puisse les restituer et les traiter plus tard.",
            "Sauvegarder toutes ces données.",
            "Comment stocker les données dans un endroit fiable, qui soit moins cher !",
          ],
        },
      ],
    },
    {
      id: 'm1s19',
      title: 'Notion 5 — Traitement des flux de données',
      blocks: [
        {
          type: 'list',
          items: [
            "Traitement des données énormes et dans un temps précis",
            "Également coût de traitement moins cher !",
          ],
        },
      ],
    },
    {
      id: 'm1s20',
      title: 'Une minute sur Internet (2016) & Facebook',
      blocks: [
        {
          type: 'paragraph',
          text: "Ce qui se passe chaque minute sur Internet en 2016 : des millions de vidéos vues sur YouTube, des millions de recherches Google, des centaines de milliers de tweets, de messages Facebook, de swipes Tinder, de courses Uber, de playlists Spotify, d'e-mails envoyés, de photos WhatsApp, de likes Instagram, d'interactions LinkedIn, d'achats Amazon, de streaming Netflix…",
        },
        {
          type: 'table',
          headers: ['Facebook', '2016', '2017'],
          rows: [
            ["Utilisateurs actifs mensuels", "1,65 milliard", "2 milliards"],
            ["Utilisateurs actifs mobiles", "1 milliard", "—"],
            ["Utilisateurs actifs quotidiens (moyenne)", "900 millions", "—"],
            ["Utilisateurs Instagram", "400 millions", "—"],
            ["Heures de visionnage", "—", "100 millions d'heures / jour"],
            ["Photos téléchargées", "—", "350 millions / jour"],
            ["Recherches quotidiennes", "—", "3 milliards"],
            ["Personnes connectées", "—", "250 millions"],
            ["Contenus VR/AR", "—", "220 milliards"],
          ],
          caption: 'Facebook Community Update 2016 / 2017',
        },
      ],
    },
    {
      id: 'm1s21',
      title: 'BIG DATA : Acteurs et Solutions',
      blocks: [
        {
          type: 'paragraph',
          text: "Historique : Big Data, Google — le système de fichier GFS. Pour stocker son index grandissant, quelle solution pour Google ?",
        },
        {
          type: 'steps',
          items: [
            {
              title: '1. Utilisation d\'un SGBDR ? ❌',
              text: "Trois problèmes : • Problème de distribution des données • Problème du nombre d'utilisateurs • Problème de vitesse du moteur de recherche.",
            },
            {
              title: '2. Invention d\'un nouveau système propriétaire : GFS (Google File System) en 2003 ✅',
              text: "C'est la réponse de Google face à l'explosion de son index.",
            },
          ],
        },
        {
          type: 'note',
          title: 'MapReduce — le premier article (2004)',
          text: "La notion de Big Data est intimement liée à la capacité de traitements de gros volumes. Le premier article a été publié en 2004 : Jeffrey Dean et Sanjay Ghemawat — « MapReduce: Simplified Data Processing on Large Clusters ». C'est un algorithme inventé par Google, Inc afin de distribuer des traitements sur un ensemble de machines avec le système GFS. Google possède aujourd'hui plus de 1 000 000 de serveurs interconnectés dans le monde.",
        },
        {
          type: 'paragraph',
          text: "Les contributeurs de l'implémentation Libre et Open Source : Yahoo!, Facebook, LinkedIn, Twitter. Ces entreprises ont décidé d'ouvrir leurs développements internes au monde Open Source. Un certain nombre de ces technologies comme « Hadoop » et « Spark » font partie de la fondation Apache et ont été intégrés aux offres de « Big Data » des grands acteurs tels que IBM, Oracle, Microsoft, EMC…",
        },
        {
          type: 'table',
          headers: ['Société', 'Technologie développée', 'Type de technologie'],
          rows: [
            ['Google', 'Big Table', "Système de base de données distribuée propriétaire reposant sur GFS (Google File System). Technologie non Open Source, mais qui a inspiré HBase qui est Open Source."],
            ['Google', 'MapReduce', "Plate-forme de développement pour traitements distribués."],
            ['Yahoo', 'Hadoop', "Plateforme Java destinée aux applications distribuées et à la gestion intensive des données. Issue à l'origine de GFS et MapReduce."],
            ['Yahoo', 'S4', "Plateforme de développement dédiée aux applications de traitement continu de flux de données."],
            ['Facebook', 'Cassandra', "Base de données de type NoSQL et distribuée."],
            ['Facebook', 'Hive', "Logiciel d'analyse de données utilisant Hadoop."],
            ['Twitter', 'Storm', "Plateforme de traitement de données massive."],
            ['Twitter', 'FockDB', "Base de données distribuée de type graphe."],
            ['LinkedIn', 'SenseiDB', "Base de données temps réel distribuée et semi-structurée."],
            ['LinkedIn', 'Voldemort', "Base de données distribuée destinée aux très grosses volumétries."],
          ],
          caption: 'Tableau : Quelques technologies Open Source du Big Data',
        },
      ],
    },
    {
      id: 'm1s22',
      title: 'Exemples : plateforme — technologies — outils',
      blocks: [
        {
          type: 'table',
          headers: ['Catégorie', 'Outils'],
          rows: [
            ['Processing', 'Hadoop, Hive, Pig, mrjob, Caffeine'],
            ['NoSQL Databases', 'HBase, MongoDB, Vertica, Cassandra, Neo4j, etc.'],
            ['Servers', 'EC2, Google App Engine, Elastic Beanstalk, Heroku'],
            ['Analytics', 'R, SAS, Python scikit-learn, Spark MLLib, Apache Mahout'],
            ['Search', 'Solr/Lucene, ElasticSearch'],
          ],
        },
        {
          type: 'paragraph',
          text: "Autres outils cités dans l'écosystème (logos du cours) : Hive, Solr, Cassandra, Spark, Apache HBase, d3.js, Presto, Memcached, Kafka, Lucene, Storm, Neo4j, Infinispan, mongoDB, ElasticSearch, Mahout, MapReduce, ØMQ, R.",
        },
      ],
    },
    {
      id: 'm1s23',
      title: 'Conclusion du chapitre 1 : les 2 Grands Challenges',
      blocks: [
        {
          type: 'note',
          title: '2 Grands Challenges',
          text: "📦 STOCKAGE  +  ⚙️ TRAITEMENT — Comment le Big Data gère ces situations complexes ?  (Réponse dans les modules suivants : Hadoop, HDFS, MapReduce.)",
        },
        {
          type: 'paragraph',
          text: "Il faut aussi arrêter de réfléchir en Relationnel ! Absolument TOUTES les données sont importantes ! Mais tout de même… comment gérer ces volumes ?",
        },
      ],
    },
  ],
}
