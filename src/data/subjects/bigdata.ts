import type { Subject } from "@/lib/learn-types";

// ═══════════════════════════════════════════════════════════════════════════
// SUJET 6 — BIG DATA (Parties 1-2, HDFS/MapReduce, BD NoSQL, MongoDB Sharding)
// Dr. Souheyl MALLAT — Traitement de Big Data Avancé
// ═══════════════════════════════════════════════════════════════════════════

export const bigdata: Subject = {
  id: "bigdata",
  name: "Big Data & NoSQL",
  shortName: "Big Data",
  teacher: "Dr. Souheyl MALLAT — FSM",
  icon: "Database",
  gradient: "from-rose-500 via-pink-500 to-red-500",
  accent: "#f43f5e",
  description:
    "Introduction au Big Data (5 V), écosystème Hadoop, HDFS, MapReduce, bases de données NoSQL, MongoDB (replicaset et sharding).",
  chapters: [
    {
      id: "b1",
      title: "Chapitre 1 — Introduction au Big Data",
      summary: "Pourquoi ce cours, histoire, définitions, notions, caractéristiques (les n-V), problématiques Volume/Vélocité/Variété/Véracité/Valeur.",
      sections: [
        {
          heading: "Pourquoi ce cours ? Objectifs et prérequis",
          blocks: [
            {
              type: "p",
              text: "Selon LinkedIn, les compétences les plus recherchées depuis plusieurs années sont : 1) Cloud and Distributed Computing (Hadoop, Big Data), 2) Statistical Analysis and Data Mining (R, Data Analysis), et 10) Storage Systems and Management (SQL). Ce cours présente des outils et méthodes de traitement de gros volumes de données (Big Data) au travers de la suite logicielle Hadoop. Hadoop est un ensemble de services et d'applications permettant de stocker et d'administrer des fichiers et des bases de données de très grande taille et de lancer des programmes de calcul sur ces données. Le principe est de répartir les données et les traitements sur un groupe de plusieurs machines appelé amas (cluster). Hadoop est utilisé par des entreprises comme Google, Facebook, Amazon, etc. Prérequis : langage Java, langage Python de base, bases de données, systèmes d'exploitation.",
            },
          ],
        },
        {
          heading: "Un peu d'histoire",
          blocks: [
            {
              type: "p",
              text: "L'histoire racontée en images : l'homme a inventé le livre pour tout noter, et le téléphone pour tout dire. Il voulait une machine qui ferait le travail à sa place… puis partager ses trouvailles avec d'autres. Au début, une poignée de privilégiés avaient le monopole de l'information sur Internet. Les données étaient statiques, fiables et peu nombreuses. Et puis un jour : le World Wide Web — Facebook et les réseaux sociaux. Web 1.0 : Web passif (producteur → site → internautes). Web 2.0 : Web collaboratif (internautes contributeurs, RSS, réseaux sociaux). Web 3.0 : Web sémantique (agents intelligents, widgets). Un monde interconnecté et instrumenté : 500+ millions d'utilisateurs postant 55 millions de tweets par jour, 30 milliards de tags RFID (1,3 Md en 2005), 4,6 milliards de caméras téléphoniques, 100s de millions de GPS vendus annuellement, 1,2 trillion de recherches, 1+ milliard d'utilisateurs actifs dépensant 700 millions de minutes par mois, 76 millions de compteurs intelligents en 2009 (200M en 2014), 2+ milliards de personnes sur le Web fin 2011. Et avec l'arrivée des plateformes mobiles intelligentes (iPad, Android, iPhone, Windows Mobile, BlackBerry), les objets connectés, le Cloud Computing…",
            },
            {
              type: "kv",
              items: [
                { k: "L'évolution des données", v: "90 % des données ont été créées au cours des sept dernières années ; 80 % des données actuelles ne sont pas structurées ; 20 % des données disponibles peuvent être traitées par des systèmes traditionnels." },
                { k: "Challenges", v: "Des données… DES DONNEES !! Réunir un grand volume de données variées pour trouver de nouvelles idées ; difficulté pour sauvegarder toutes ces données ; difficulté pour les traiter et les utiliser ; les données sont créées rapidement. Les données ont explosé !" },
                { k: "Big Data : Intérêts (chiffres)", v: "1/3 : les chefs d'entreprise prennent fréquemment des décisions basées sur des informations en lesquelles ils n'ont pas confiance, ou qu'ils n'ont pas. 1/2 : ils disent n'avoir pas accès aux informations dont ils ont besoin pour faire leur travail. 83 % des DSI citent l'informatique décisionnelle et analytique comme faisant partie de leurs plans pour améliorer leur compétitivité. 60 % des PDG ont besoin d'améliorer la capture et la compréhension des informations pour prendre des décisions plus rapidement." },
                { k: "Big Data : Sources multiples", v: "Sites, bases de données, téléphones, serveurs : détecter les sentiments et réactions des clients ; détecter des conditions critiques ou potentiellement mortelles dans les hôpitaux à temps pour intervenir ; prendre des décisions risquées basées sur des données transactionnelles en temps réel ; identifier les criminels et menaces à partir de vidéos, sons et flux de données ; étudier les réactions des étudiants pendant un cours et prédire ceux qui vont réussir (domaine Big Data in Education)." },
              ],
            },
          ],
        },
        {
          heading: "Les origines du Big Data",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Préfixes multiplicatifs", v: "1 caractère = 1 octet ; 1 page de texte ≈ 30 ko (1 ko = 1024 o) ; 1 morceau de musique ≈ 5 Mo (1 Mo = 1024 ko) ; 1 film de 2h ≈ 1 Go (1 Go = 1024 Mo) ; 6 millions de livres ≈ 1 To (1 To = 1024 Go) ; 2 milliards de photos résolution moyenne ≈ 1 Po (1 Po = 1024 To) ; toutes les infos produites jusqu'à 2003 ≈ 5 ExaO (1 Eo = 1024 Po) ; données produites en 2011 ≈ 1,8 ZetaO (1 Zo = 1024 Eo) ; en 2013 le plus grand data center du monde est capable de traiter 1 YotaO (1 Yo = 1024 Zo). Ordre : Bit → Octet → Kilo → Mega → Tera → Peta → Exa → Zeta → Yota octets." },
                { k: "Historique et contexte", v: "L'évolution du SI amène les entreprises à traiter de plus en plus de données issues de sources toujours plus variées. Les prévisions de croissance des volumes dépassent les limites des technologies traditionnelles. On parle de Pétaoctet (milliard d'octets) voire de Zettaoctet (Trilliard d'octets). → Quelle solution pour exploiter ces données ? Chronologie : 1996 sauvegarder sur support électronique coûte moins cher que l'archivage papier ; 1997 première utilisation du terme « Big Data » lors d'une conférence informatique ; 1998 premières estimations de croissance & volumétrie des données internet ; 2000 présentation des 1ers modèles de données dynamiques lors d'une conférence « économétrie » ; 2001 définition des 3V du Big Data ; 2005 définition du WEB 2.0 ; 2008 premières analyses sur l'impact du Big Data dans les activités commerciales, scientifiques, médicales." },
                { k: "Timeline des bases de données", v: "1960 : systèmes de gestion de fichiers (Phase 1) ; 1970 : modèle relationnel, algèbre de Codd ; 1977 : Oracle ; 1980 : DB2, INGRES, SQL server, BD distribuées ; BD active, spatiale, temporelle, multimedia, deductive, objet, objet-relationnel (Phase 2) ; 1990-2000 : Warehouse, OLAP, BD parallèles ; 2010 : NoSQL, NewSQL, Cloud, WEB-XML/XQUERY, Big Data (Phase 3)." },
                { k: "Causes économiques et technologiques", v: "Les deux principales causes de l'avènement du Big Data sont à la fois économiques et technologiques : capacité de stockage, nombre de nœuds mis en parallèle dans un data center, fréquence des CPU, bande passante disponible (favorisant les services cloud), etc. — et une baisse exponentielle des prix des ressources IT." },
                { k: "Frontière du Big Data", v: "Des volumes relèvent du Big Data à partir du moment où ces données ne peuvent plus être traitées en un temps « raisonnable » ou « utile » par des systèmes constitués d'un seul nœud. Exemple : traiter un téraoctet de données en quelques minutes impose impérativement une mise en parallèle des traitements et du stockage sur plusieurs nœuds. Des progrès initiés par les géants du web : pour bénéficier de ressources de stockage énormes, ils ont développé pour leurs propres besoins de nouvelles technologies (parallélisation des traitements sur des volumes de plusieurs centaines de téraoctets). Google possède aujourd'hui plus de 10 millions de serveurs interconnectés dans le monde." },
              ],
            },
          ],
        },
        {
          heading: "Définitions et notions",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Définition 1 (Oxford English Dictionary)", v: "« data of a very large size, typically to the extent that its manipulation and management present significant logistical challenges » — données de très grande taille, dont la manipulation et gestion présentent des enjeux du point de vue logistiques." },
                { k: "Définition 2 (Wikipédia)", v: "« an all-encompassing term for any collection of data sets so large and complex that it becomes difficult to process using on-hand data management tools or traditional data processing applications » — tout terme décrivant une collection de données tellement volumineuse et complexe qu'il devient difficile de la traiter avec des outils classiques." },
                { k: "Définition 3 (McKinsey, 2011)", v: "« datasets whose size is beyond the ability of typical database software tools to capture, store, manage, and analyze » — collections de données dont la taille dépasse la capacité de capture, stockage, gestion et analyse des SGBD classiques." },
                { k: "Ce qu'on retient", v: "Volume des données, complexité, limites des outils classiques de gestion des données, passage à l'échelle." },
                { k: "Histoire du terme", v: "Terme apparu en premier en 1997 ; décrit les défis technologiques à relever pour visualiser un grand ensemble de données ; a pris toute son ampleur avec l'avènement du Web 2.0. Autres noms : mégadonnées, données massives." },
                { k: "Big = Big + Data", v: "Données : deuxième bien le plus précieux au monde après l'Information. Différences entre donnée et information : valeur ajoutée, exploitation, interprétation. Big : question fréquente — les systèmes traditionnels ne gèrent-ils pas des données volumineuses ? Données massives ou mégadonnées : exaoctets (10^18 o) voire zettaoctets (10^21 o) ; 90 % des données récoltées depuis le début de l'humanité ont été générées les deux dernières années." },
                { k: "IMPORTANT", v: "L'objectif n'est pas de remplacer les systèmes existants avec les systèmes Big Data, mais de les intégrer ensemble !" },
                { k: "Big Data : est-ce une innovation ?", v: "L'explosion des volumes de données nécessite une innovation en termes de : 1) Accélération matérielle — abandon des disques durs au profit des mémoires dynamiques DRAM (Dynamic Random Access Memory : mémoire vive dynamique) ou flash → meilleur bénéfice des processeurs multicœurs ; 2) Bases de données d'analyse massivement parallèle (MPP) : bases conformes SQL conçues pour répartir le traitement des données sur plusieurs machines ; 3) Modèle Map-Reduce, Hadoop et autres approches NoSQL : accéder aux données via des langages de programmation sans utiliser les interfaces basées sur SQL et répartir les données sur plusieurs machines distinctes." },
              ],
            },
            {
              type: "p",
              text: "Big Data = pas seulement le volume ! Question : « Le Big Data = le volume de données ? » Réponse : Faux ! Il n'y a pas que la volumétrie : quand peut-on dire qu'on a affaire à des BIG DATA ? → Les n-V. Historique des V : Gartner (2001) — 3Vs : Volume, Variété, Vélocité. IBM (2012) — 4Vs : + Véracité. 2015 : encore plus de V — + Valeur. 2016 : 7V ? + Variabilité, Visualisation. 2017 : 10V ? + Viability, Virality, Viscosity, Variability, Volatility, Validity, Vagueness, Vocabulary, Venue, Visualization…",
            },
            {
              type: "diagram",
              id: "bigdata-5v",
              caption: "Les 5 V du Big Data : Volume, Vélocité, Variété, Véracité, Valeur.",
            },
          ],
        },
        {
          heading: "Les 5 V en détail",
          blocks: [
            {
              type: "table",
              headers: ["V", "Problématique", "Détails"],
              rows: [
                ["Volume → stockage", "Téraoctets, enregistrements/archives, transactions, tables, fichiers. Évolution : 2005 : 0,12 ZB ; 2010 : 1,22 ZB ; 2012 : 2,82 ZB ; 2015 : 8,52 ZB ; 2020* : 40 ZB. 1,4 attaoctets de données créées chaque jour ; 4,4 trillions de Go ; en 2013, il y a eu autant de données que celles connues dans toute l'Histoire ; 44 trillions de Go d'ici 2020 ; 52 fois le nombre de grains de sable dans les plages du monde ; 40 zettaoctets de données d'ici 2020 ; 50 milliards d'appareils connectés à la même date. 1 mégaoctet = 1 million d'octets ; 1 gigaoctet = 10^9 ; 1 téraoctet = 10^12 ; 1 pétaoctet = 10^15 ; 1 exaoctet = 10^18 octets.", "Auparavant, les systèmes de gestion de BD ont été construits avec une échelle à l'esprit, mais même les organisations n'ont pas été préparées à l'échelle d'aujourd'hui. Les exigences croissantes imposent de repenser et de réinvestir dans l'infrastructure : le coût des ressources augmente de façon exponentielle. Limitation sur la taille de la machine, CPU, RAM, etc. (scaled up) : les systèmes traditionnels ne peuvent pas soutenir l'échelle requise → problème d'ADAPTABILITÉ. Outils numériques plus performants et connectés : ordinateurs et smartphones ; Open Data (réseaux sociaux : Facebook ; données des administrations publiques) ; Internet des Objets (RFID, cartes de transport, codes-barres… : estimation de 50 milliards d'objets connectés en 2020 — 12 milliards en 2013)."],
                ["Vélocité → traitement", "La fréquence d'arrivée des données et la vitesse de traitement. « Au cœur du Time to Market ». Batch, temps réel, processus, flot de données. Les données doivent être stockées à l'arrivée, parfois même des téraoctets par jour ! Sinon, risque de les perdre. Les entreprises se trouvent de plus en plus au milieu d'un flux continuel de données.", ""],
                ["Variété → collecte", "Structurées, non structurées, probabilistes. Pour un stockage dans des bases de données ou des entrepôts, les données doivent respecter un format prédéfini ! Mais : la plupart des données existantes sont non structurées ou semi structurées, sous plusieurs formats et types (fichiers xml, json, txt, base de données relationnelle, etc.).", "Données structurées : données que l'on peut clairement codifier et identifier ; les données d'un tableau sont typiquement des données structurées ; organisées avec des spécifications révélant le titre et la ligne et la colonne dans lesquelles elles se trouvent → systèmes d'analyse algorithmique développés depuis toujours pour les traiter. Exemple : table Employees (EmployeeID, FirstName, LastName, Department : Engineering, Support…). Données structurées : « organisées pour faciliter le traitement, structurées et formatées pour simplifier l'analyse » — format défini (Nom, Adresse, Age). Données semi-structurées : « non organisées mais peuvent être associées à des données qui le sont » — exemple : langage XML, métadonnées décrivant les autres données ; exemple de fichier XML : <rec><name>Prashant Rao</name><sex>Male</sex><age>35</age></rec>… Données non structurées : « données qui ne résident pas dans un enregistrement à champ fixe ou un fichier de données » ; contenu des messages que l'on déduit ; données de Twitter : hashtags, tweets… « non organisées et sans formal défini, plus difficile à analyser » — exemple : pages Wikipedia, lac de données (data lake) : données brutes de tous types, traitement, analyse."],
                ["Véracité", "Fait référence à la fiabilité des données. Si la quantité des données augmente, alors la qualité et la précision sont moins vérifiées ! Confiance, authenticité, origine/réputation, disponibilité, responsabilité. Exemple : Twitter — les tweets peuvent contenir des abréviations, des hashtags #, du langage familier, l'alphabet de tchat arabe ; fiabilité et exactitude des données… Les solutions Big Data et l'analytique doivent remédier à cela en se référant au volume des données existantes ; le manque de qualité et d'exactitude résulte souvent des gros volumes !", ""],
                ["Valeur", "Il faut transformer toutes les données en valeurs exploitables : les données sans valeur sont inutiles. Statistiques, événements, corrélations, hypothétiques. Un projet Big Data et son accès aux utilisateurs n'a d'intérêt que s'il apporte de la valeur à l'entreprise → LE V LE PLUS IMPORTANT ! Il est aussi primordial que les entreprises évaluent la rentabilité d'une récolte de données. Objectifs stratégiques : créer de la valeur pour les clients et l'entreprise dans tous les domaines d'activité.", ""],
              ],
            },
            {
              type: "p",
              text: "Mais tout de même… Arrêter de réfléchir en Relationnel ! Absolument TOUTES les données sont importantes ! Comment gérer ces situations complexes ? Comment le Big Data gère ces situations complexes ? → 2 grands challenges : Stockage et Traitement (diviser pour régner).",
            },
          ],
        },
      ],
    },
    {
      id: "b2",
      title: "Chapitre 2 — Diviser pour régner, Hadoop, HDFS et MapReduce",
      summary: "Diviser pour régner, acteurs et solutions (GFS, MapReduce Google), écosystème Hadoop, HDFS (NameNode/DataNode, lecture/écriture, commandes), MapReduce (4 étapes, Word Count, exemples).",
      sections: [
        {
          heading: "Diviser pour régner",
          blocks: [
            {
              type: "p",
              text: "Pour traiter des données massives : diviser pour régner — répartir les données, répartir et dupliquer les traitements, dupliquer les données. Cela donne : tolérance aux pannes (parallélisme de données) et répartition de charge (parallélisme de traitement). Map-Reduce : les mappers traitent chacun une partie des données, un mécanisme « mélanger & ordonner », puis les reducers agrègent les résultats.",
            },
            {
              type: "diagram",
              id: "mapreduce-flow",
              caption: "Flux MapReduce : Splitting → MAP → Shuffling (mélange/tri) → REDUCE → Résultat final.",
            },
            {
              type: "kv",
              items: [
                { k: "Historique : Google et GFS", v: "Pour stocker son index grandissant, quelle solution pour Google ? 1) Utilisation d'un SGBDR ? × Problème de distribution des données, problème du nombre d'utilisateurs, problème de vitesse du moteur de recherche. 2) Invention d'un nouveau système propriétaire : GFS (Google File System) en 2003 ✓. La notion de Big Data est intimement liée à la capacité de traitements de gros volumes. Le premier article a été publié en 2004 : Jeffrey Dean and Sanjay Ghemawat — « MapReduce : Simplified Data Processing on Large Clusters ». C'est un algorithme inventé par Google, Inc afin de distribuer des traitements sur un ensemble de machines avec le système GFS." },
                { k: "Contributeurs open source", v: "Yahoo, Facebook, LinkedIn, Twitter ont décidé d'ouvrir leurs développements internes au monde Open Source. Un certain nombre de ces technologies comme « Hadoop » et « Spark » font partie de la fondation Apache et ont été intégrées aux offres « Big Data » des grands acteurs tels que IBM, Oracle, Microsoft, EMC…" },
                { k: "Tableau des acteurs et technologies", v: "Google : Big Table (SGBD distribuée propriétaire reposant sur GFS ; non Open Source mais a inspiré HBase qui est Open Source) et MapReduce (plate-forme de développement pour traitements distribués). Yahoo : Hadoop (plateforme Java destinée aux applications distribuées et à la gestion intensive des données, issue de GFS et MapReduce) et S4 (plateforme dédiée au traitement continu de flux de données). Facebook : Cassandra (BD NoSQL distribuée) et Hive (logiciel d'analyse de données utilisant Hadoop). Twitter : Storm (plateforme de traitement de données massives) et FlockDB (BD distribuée de type graphe). LinkedIn : SenseiDB (BD temps réel distribuée et semi-structurée) et Voldemort (BD distribuée pour très grosses volumétries)." },
                { k: "Plateformes-technologies-outils", v: "Processing : Hadoop, Hive, Pig, mrjob, Caffeine. NoSQL Databases : HBase, MongoDB, Vertica, Cassandra, Neo4j, etc. Servers : EC2, Google App Engine, Elastic Beanstalk, Heroku. Analytics : R, SAS, Python scikit-learn, Spark MLLib, Apache Mahout. Search : Solr/Lucene, ElasticSearch. Autres logos : Hive, Solr, memcached, Cassandra, Spark, kafka, learn, mahout, HBASE, Map Reduce, STORM, d3.js, Neo4j, Flume, OMQ, presto, Infinispan, mongoDB, elasticsearch, R, Lucene…" },
              ],
            },
          ],
        },
        {
          heading: "Hadoop et HDFS",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "L'équation Hadoop", v: "Hadoop = excellent équilibre coût / performance / stockage / flexibilité." },
                { k: "HDFS", v: "HDFS = Hadoop Distributed File System = système de fichiers (FileSystem) d'Hadoop par défaut, inspiré de GFS — « The Google File System », 2003. Principales caractéristiques : Distribué (les données sont réparties sur les machines du cluster) et Répliqué (les données sont répliquées — par défaut 3 — pour pallier la défaillance d'une machine). HDFS est « taillé » pour les fortes volumétries." },
                { k: "Blocs et nœuds", v: "Dans HDFS, les données sont découpées en « blocks » — 128 Mo par défaut. HDFS s'appuie sur : le NameNode (2 NameNodes par cluster en Hadoop 2, et 3 NameNodes par cluster en Hadoop 3) et le DataNode (1 DataNode par machine du cluster). Namemode = stocke les métadonnées des blocks (leur localisation, taille, date de création…)." },
              ],
            },
            {
              type: "diagram",
              id: "hdfs-arch",
              caption: "HDFS : le client Hadoop dialogue avec le NameNode (métadonnées) et les DataNodes (blocs répliqués).",
            },
            {
              type: "p",
              text: "Écriture d'un fichier HDFS : le client dit « Je veux écrire le fichier data.txt sur HDFS (3 blocs) » → le NameNode répond « OK. Envoie aux DataNodes 1, 3 et 5 » → le client envoie Bloc 1 au DataNode 1, Bloc 2 au DataNode 3, Bloc 3 au DataNode 5. Lecture d'un fichier : « Je veux lire le fichier data.txt sur HDFS » → le NameNode répond « OK. 3 blocs. Bloc 1 : DN 1, 2, 5 — Bloc 2 : DN 2, 3 — Bloc 3 : DN 1, 3, 5 » → le client récupère les blocs depuis les DataNodes.",
            },
            {
              type: "cmd",
              commands: [
                { cmd: "hdfs dfs -ls /user", desc: "liste le contenu d'un répertoire HDFS" },
                { cmd: "hdfs dfs -mkdir nom_dossier_hdfs", desc: "crée un dossier sur HDFS" },
                { cmd: "hdfs dfs -put fichier_en_local destination_sur_hdfs", desc: "copie un fichier local vers HDFS" },
                { cmd: "hdfs dfs -copyToLocal fichier_hdfs destination_en_local", desc: "copie un fichier HDFS vers le système local" },
                { cmd: "hdfs dfs -cat fichier_sur_hdfs", desc: "affiche le contenu d'un fichier HDFS" },
                { cmd: "hdfs dfs -cp fichier_sur_hdfs destination_sur_hdfs", desc: "copie un fichier dans HDFS" },
                { cmd: "hdfs dfs -mv fichier_sur_hdfs destination_sur_hdfs", desc: "déplace un fichier dans HDFS" },
                { cmd: "hdfs dfs -rm fichier_sur_hdfs", desc: "supprime un fichier HDFS" },
                { cmd: "hdfs dfs -du -h dos", desc: "affiche la taille d'un dossier HDFS" },
                { cmd: "hdfs dfs -setrep -R -w 3 fichier_sur_hdfs", desc: "modifie le facteur de réplication (ici 3) récursivement" },
              ],
            },
          ],
        },
        {
          heading: "MapReduce : modèle et exemples",
          blocks: [
            {
              type: "p",
              text: "Pour pouvoir traiter un GRAND VOLUME de données sur un cluster de machines, il faut DÉCOUPER le problème en plusieurs problèmes de taille RÉDUITE à exécuter sur différentes machines (stratégie « diviser pour régner »). De multiples approches existent et ont existé pour cette division d'un problème en plusieurs « sous-tâches ». MapReduce est un PARADIGME (modèle) de PROGRAMMATION DISTRIBUÉE popularisé par Google. Les 4 étapes du traitement MapReduce : 1) Split, 2) Mapper, 3) Shuffle, 4) Reduce.",
            },
            {
              type: "p",
              text: "Exemple Word Count — Objectif : compter le nombre d'occurrence de chaque mot dans un texte. 1re étape « Split » : déterminer une manière de découper (split) les données d'entrée pour que chacune des machines puisse travailler sur une partie du texte. Notre problème est très simple : on peut décider de découper les données d'entrée ligne par ligne. Chacune des lignes du texte sera un fragment de nos données d'entrée. Texte : « Celui qui croyait au ciel / Celui qui n'y croyait pas / […] / Fou qui fait le délicat / Fou qui songe à ses querelles ». Après découpage : 4 fragments. Code de l'opération MAP (pseudo-code) : POUR MOT dans LIGNE, FAIRE : GENERER COUPLE (MOT ; 1). Pour chacun de nos fragments, les couples (clef ; valeur) générés seront : (celui;1)(qui;1)(croyait;1)(au;1)(ciel;1) | (celui;1)(qui;1)(ny;1)(croyait;1)(pas;1) | (fou;1)(qui;1)(fait;1)(le;1)(delicat;1) | (fou;1)(qui;1)(songe;1)(a;1)(ses;1)(querelles;1). 3e étape « SHUFFLE » : regroupement des couples par clef — (celui;1)(celui;1), (qui;1)(qui;1)(qui;1)(qui;1), (croyait;1)(croyait;1), (au;1), (ny;1), (ciel;1), (pas;1), (fou;1)(fou;1), (fait;1), (le;1), (delicat;1), (songe;1), (a;1), (ses;1), (querelles;1). 4e étape « REDUCE » : TOTAL=0 ; POUR COUPLE dans GROUPE, FAIRE : TOTAL=TOTAL+1 ; RENVOYER TOTAL. Une fois l'opération REDUCE effectuée, on obtient une VALEUR UNIQUE pour chaque CLEF DISTINCTE : qui : 4, celui : 2, croyait : 2, fou : 2, au : 1, ciel : 1, ny : 1, pas : 1, fait : 1 […].",
            },
            {
              type: "p",
              text: "Récapitulatif du flux : Données d'entrée → Splitting (fragmentation) → MAP (couples clef/valeur) → Shuffling (mélange/tri par clef) → REDUCE (agrégation) → Résultat final. Exemple : « celui qui croyait / ciel ciel croyait / celui ciel qui » → 3 fragments → MAP → Shuffle → REDUCE → (qui: 2, ciel: 3, celui: 2, croyait: 2).",
            },
            {
              type: "kv",
              items: [
                { k: "Exemple — Statistiques web", v: "Compter le nombre de visiteurs sur chacune des pages d'un site Internet. Fichiers de logs : /index.html [19/Oct/2013:18:45:03 +0200] ; /contact.html [19/Oct/2013:18:46:15 +0200] ; /news.php?id=5 [24/Oct/2013:18:13:02 +0200] ; /news.php?id=4 ; /news.php?id=18… Flux des données : Input (logs) → Map → Shuffle & Sort → Reduce → Output (count, N) → Finish." },
                { k: "Exemple 2 — Longueur moyenne des mots", v: "Entrée : un grand fichier texte. Sortie : la longueur moyenne des mots dans le fichier. Flux : Input (dogs, like, cats) → map → Shuffle & Sort → reduce → Output : (count, 3) et (length, 12) → mean = length/count." },
                { k: "Exemple 3 — Nombre de voyelles et consonnes", v: "Compter le nombre de voyelles et de consonnes. Flux des données : Input Data → Map (émission des couples C,n et V,n) → Shuffle & Sort → Reduce → Output Data : C, 8 et V, 4." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "b3",
      title: "Chapitre 3 — BD NoSQL, MongoDB, replicaset et sharding",
      summary: "Limites du relationnel, NoSQL, MongoDB (collections, documents), replicaset (Primary/Secondary), sharding (mongos, Config Server, Shard), clés de partition, chunks, configuration étape par étape.",
      sections: [
        {
          heading: "BD NoSQL : introduction",
          blocks: [
            {
              type: "p",
              text: "Depuis les années 70, la BD relationnelle était l'incontournable référence pour gérer les données d'un système d'information. Comment gérer une énorme base de données et comment l'interroger efficacement ? Ces questions se posent dès que le volume devient ingérable et que répondre à de simples requêtes prend des heures. Oubliez les SGBD traditionnels : ils peinent à passer à l'échelle ! Vous devez être capable de choisir la bonne solution parmi les dizaines qui s'offrent à vous. — « Not Only SQL » : cette approche propose de relâcher certaines contraintes lourdes du relationnel pour favoriser la DISTRIBUTION.",
            },
            {
              type: "kv",
              items: [
                { k: "MongoDB : c'est quoi ?", v: "Base de données noSQL ; enregistre les données sous forme de documents, syntaxe JSON ; plus rapide pour certaines opérations." },
                { k: "Correspondance relationnel → MongoDB", v: "Table → Collection ; Columns → field ; rows → document." },
                { k: "Exemple", v: "Table « students » (Id, Firstname, Lastname, Email) avec la ligne (1, Ahmed, Jasim, ahmed@test.com) — pour ajouter le Mobile 900011111, le schéma doit être modifié (nouvelle colonne Mobile). En MongoDB (documents JSON) : le document s'écrit directement avec le champ mobile — { 'firstname': 'Ahmed', 'lastname': 'salim', 'mobile': 955656565, 'country': 'Oman' } — Document → Row : key:value paired." },
                { k: "Structuré vs non structuré", v: "Table structurée : Id, Firstname, Lastname, Email, Mobile (Row 1 : Ahmed Jasim ahmed@test.com 900011111 ; Row 2 : Ali Salim ali@test.com 46554654). Non structuré : chaque document peut avoir ses propres champs." },
              ],
            },
          ],
        },
        {
          heading: "Replicaset : la réplication",
          blocks: [
            {
              type: "p",
              text: "Comment résoudre le problème de la tolérance aux pannes ? MongoDB utilise pour cela une architecture basée sur le principe « M/Ex » (maître/esclaves). Réplication en MongoDB : assure la redondance et augmente la disponibilité des données ; offre un niveau de tolérance aux pannes contre la perte d'un seul serveur de base de données. Un replicaset est un groupe d'instances mongod qui conservent le même jeu de données. Un replicaSet contient plusieurs nœuds porteurs de données ; parmi ces nœuds, un seul membre est considéré comme le nœud PRINCIPAL et les autres SECONDAIRES.",
            },
            {
              type: "p",
              text: "L'architecture du ReplicaSet : le serveur primaire (« Primary »), à qui toutes les requêtes sont envoyées (lecture/écriture), va s'occuper de gérer la cohérence des données. Les serveurs secondaires sont utilisés dans le processus de réplication des données lors d'une mise à jour. Flux : ClientApplication (Driver) — Writes → Primary ; Reads ← Primary ; Primary — Réplication → Secondary, Secondary.",
            },
            {
              type: "diagram",
              id: "mongo-replicaset",
              caption: "ReplicaSet MongoDB : le Driver écrit/lit sur le Primary, qui réplique vers les Secondary.",
            },
          ],
        },
        {
          heading: "Sharding : le partitionnement",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Avantages du sharding MongoDB", v: "Capacité de stockage ; lecture/écriture ; haute disponibilité ; protection contre les pannes ; géodistribution et performances." },
                { k: "Architecture de partitionnement", v: "La robustesse du cluster est gérée par 3 types de nœuds : 1) des routeurs : mongos ; 2) des serveurs de configuration : Config Server (replica set) ; 3) des serveurs de données : Shard (replica set). 1 or more Routers (App Server → Router mongos) → 2 or more Shards." },
                { k: "Exemple (application de films)", v: "MovieReviewApp et MovieRentingApp se connectent chacune à un mongos ; les shards : Shard1 (title: a-h), Shard2 (title: i-p), Shard3 (title: q-z). Chaque application va se connecter à un mongos et envoyer sa requête. — Si la requête contient le champ « title » : le mongos la dirige vers le bon shard. — Si en revanche la requête ne contient pas le champ « title » : diffusion sur tous les shards. Pour améliorer la disponibilité et la scalabilité de votre application…" },
                { k: "Les ConfigServers", v: "Pour que mongos soit capable de savoir dans quel shard se trouve la donnée recherchée… La répartition des données étant faite dynamiquement…" },
                { k: "Clé de partition", v: "Une clé de partition est utilisée pour distribuer les collections de documents en des partitions ; une clé de partition est composée d'un champ qui existe dans les documents de la collection ; on fait le choix de la clé lors du partitionnement ; une collection partitionnée possède une seule clé." },
                { k: "Chunks", v: "MongoDB divise les données partitionnées en des chunks ; MongoDB divise un chunk chaque fois qu'il augmente de taille lorsqu'il dépasse la taille fixée lors de la configuration, qui est par défaut 64 mégaoctets ; MongoDB migre les chunks entre partitions lorsqu'une partition possède assez de chunks. Dès l'instant où on définit une clé de sharding, MongoDB crée un premier Chunk contenant l'ensemble des documents (ex. documents {title: 'Any Given Sunday'}, {title: 'Alien 3'}, {title: 'Babe'}, {title: 'Edward Scissorhand'}, {title: 'Wonder Woman'}, {title: 'West Side Story'}, {title: 'Wall Street'})." },
              ],
            },
            {
              type: "p",
              text: "Comment configurer le sharding MongoDB étape par étape ? Étape 1 : lancer deux serveurs de configuration (--configsvr) en ReplicaSet (configReplSet) : mongod --configsvr --replSet configReplSet --port 27019 --dbpath /data/conf1 et mongod --configsvr --replSet configReplSet --port 27020 --dbpath /data/conf2. Dans une console distincte, se connecter à l'un de ces serveurs et initier le ReplicaSet : mongo --port 27019 puis rs.initiate() ; ajouter le deuxième serveur de configuration au ReplicaSet : rs.add(\"local:27020\").",
            },
            {
              type: "p",
              text: "Étape 2 : création des shards — lancez les serveurs shard en ReplicaSet : mongod --shardsvr --replSet sh1 --port 27031 --dbpath /data/sh1 et mongod --shardsvr --replSet sh2 --port 27032 --dbpath /data/sh2. Initiez le ReplicaSet de chaque shard dans une console distincte : mongo --port 27031 --eval \"rs.initiate()\" et mongo --port 27032 --eval \"rs.initiate()\".",
            },
            {
              type: "p",
              text: "Étape 3 : lancement du mongos (serveur de distribution) et connexion des shards — lancez le serveur mongos en spécifiant le serveur de configuration : mongos --configdb configReplSet/localhost:27019 --port 27017. Ajoutez les shards un par un au niveau du mongos en mode console : mongo --port 27017 ; sh.addShard(\"sh1/localhost:27031\") ; sh.addShard(\"sh2/localhost:27032\").",
            },
            {
              type: "code",
              lang: "javascript",
              code: "// Étape 4 : distribution de la base de données\n// Définissez la collection que vous souhaitez distribuer.\n// Créez une base de données \"testDB\" et une collection \"test\" :\nuse testDB;\nsh.enableSharding(\"testDB\");\ndb.createCollection(\"test\");\ndb.test.createIndex({\"_id\": 1});\nsh.shardCollection(\"testDB.test\", {\"_id\": 1});\n\n// Pour vérifier l'état du sharding, exécutez la commande suivante dans une console :\n// mongo --port 27017 --eval \"sh.status()\"",
            },
          ],
        },
      ],
    },
  ],

  quiz: [
    { id: "b1", chapter: "b1", question: "Quels sont les 3 V initiaux du Big Data (Gartner, 2001) ?", options: ["Volume, Vélocité, Variété", "Volume, Valeur, Véracité", "Vitesse, Vision, Volume", "Variété, Valeur, Visualisation"], correct: 0, explanation: "Gartner (2001) : 3Vs = Volume, Variété, Vélocité. IBM (2012) : 4Vs avec + Véracité. 2015 : + Valeur. 2016 : 7V (+ Variabilité, Visualisation). 2017 : 10V." },
    { id: "b2", chapter: "b1", question: "Quel est le V le plus important selon le cours ?", options: ["Volume", "Vélocité", "Valeur", "Véracité"], correct: 2, explanation: "La Valeur : un projet Big Data et son accès aux utilisateurs n'a d'intérêt que s'il apporte de la valeur à l'entreprise — « LE V LE PLUS IMPORTANT ». Les données sans valeur sont inutiles." },
    { id: "b3", chapter: "b1", question: "Quelle est la frontière du Big Data ?", options: ["1 To de données", "Des volumes qui ne peuvent plus être traités en un temps raisonnable par des systèmes à un seul nœud", "100 Go", "Aucune limite"], correct: 1, explanation: "Des données relèvent du Big Data à partir du moment où elles ne peuvent plus être traitées en un temps « raisonnable » ou « utile » par des systèmes constitués d'un seul nœud (ex. 1 To en quelques minutes → parallélisation obligatoire)." },
    { id: "b4", chapter: "b1", question: "L'objectif du Big Data est-il de remplacer les systèmes existants ?", options: ["Oui, totalement", "Non ! L'objectif est d'intégrer les systèmes Big Data avec les systèmes existants", "Oui, sauf les bases SQL", "Seulement dans le cloud"], correct: 1, explanation: "IMPORTANT : l'objectif n'est pas de remplacer les systèmes existants avec les systèmes Big Data, mais de les intégrer ensemble." },
    { id: "b5", chapter: "b1", question: "Quelle proportion des données actuelles n'est PAS structurée ?", options: ["20%", "50%", "80%", "90%"], correct: 2, explanation: "80 % des données actuelles ne sont pas structurées ; 90 % des données ont été créées au cours des 7 dernières années ; seulement 20 % des données disponibles peuvent être traitées par des systèmes traditionnels." },
    { id: "b6", chapter: "b1", question: "Quelles données sont interdites de collecte « par principe » ?", options: ["Nom et prénom", "État de santé, données génétiques et biométriques, opinions politiques et religieuses, orientation sexuelle, condamnations pénales, opinions syndicales", "Adresse email", "Historique d'achat"], correct: 1, explanation: "Données sensibles / collecte interdite par principe : état de santé, données génétiques, biométriques, origine raciale/ethnique, convictions religieuses, opinions politiques, condamnations pénales, orientations sexuelles, opinions syndicales." },
    { id: "b7", chapter: "b1", question: "Que signifie la Véracité dans les 5V ?", options: ["La vitesse de traitement", "La fiabilité des données : si la quantité augmente, la qualité et la précision sont moins vérifiées", "Le nombre de sources", "Le format XML"], correct: 1, explanation: "Véracité = fiabilité des données (confiance, authenticité, origine/réputation, disponibilité, responsabilité). Exemple : les tweets contiennent abréviations, hashtags, langage familier — le manque de qualité résulte souvent des gros volumes." },
    { id: "b8", chapter: "b1", question: "Qu'est-ce qu'un lac de données (data lake) ?", options: ["Une base SQL", "Un stockage de données brutes de tous types, prêtes pour traitement et analyse", "Un serveur web", "Un datacenter"], correct: 1, explanation: "Le lac de données stocke les données brutes de tous types (non structurées) pour traitement et analyse ultérieurs — illustration de la variété." },
    { id: "b9", chapter: "b1", question: "Combien de données预计 existaient en 2020 selon le cours ?", options: ["2,82 ZB", "8,52 ZB", "40 ZB", "0,12 ZB"], correct: 2, explanation: "Évolution du volume : 2005 : 0,12 ZB ; 2010 : 1,22 ZB ; 2012 : 2,82 ZB ; 2015 : 8,52 ZB ; 2020 : 40 ZB." },
    { id: "b10", chapter: "b1", question: "Quelles 3 innovations répondent à l'explosion des volumes ?", options: ["Accélération matérielle (DRAM/flash), bases MPP, Map-Reduce/Hadoop/NoSQL", "Plus de disques durs, SQL centralisé, mainframes", "Cloud, Excel, XML", "Blockchain, VR, 5G"], correct: 0, explanation: "L'explosion des volumes nécessite : 1) accélération matérielle (abandon des disques durs pour DRAM/flash, multicœurs), 2) bases de données d'analyse massivement parallèle (MPP, SQL réparti), 3) Map-Reduce, Hadoop et NoSQL (accès par langages de programmation, répartition sur plusieurs machines)." },
    { id: "b11", chapter: "b2", question: "Pourquoi Google a-t-il rejeté le SGBDR pour son index ?", options: ["Trop cher", "Problèmes de distribution des données, du nombre d'utilisateurs et de vitesse du moteur de recherche", "SQL est trop moderne", "Par goût personnel"], correct: 1, explanation: "Pour stocker son index grandissant, un SGBDR présentait : problème de distribution des données, problème du nombre d'utilisateurs, problème de vitesse du moteur de recherche → Google invente GFS en 2003." },
    { id: "b12", chapter: "b2", question: "Qui a publié en 2004 l'article fondateur de MapReduce ?", options: ["Jeffrey Dean and Sanjay Ghemawat", "Doug Cutting", "Larry Page", "Kevin Ashton"], correct: 0, explanation: "Premier article publié en 2004 par Jeffrey Dean et Sanjay Ghemawat : « MapReduce : Simplified Data Processing on Large Clusters » — algorithme inventé par Google pour distribuer les traitements sur un ensemble de machines avec GFS." },
    { id: "b13", chapter: "b2", question: "Quelle entreprise est à l'origine de Hadoop ?", options: ["Google", "Yahoo", "Facebook", "LinkedIn"], correct: 1, explanation: "Yahoo : Hadoop (plateforme Java pour applications distribuées et gestion intensive des données, issue de GFS et MapReduce) et S4 (traitement continu de flux). Google : Big Table et MapReduce." },
    { id: "b14", chapter: "b2", question: "Quelles technologies Facebook a-t-elle contribuées ?", options: ["Cassandra et Hive", "Storm et FlockDB", "SenseiDB et Voldemort", "Hadoop et S4"], correct: 0, explanation: "Facebook : Cassandra (BD NoSQL distribuée) et Hive (logiciel d'analyse de données utilisant Hadoop). Twitter : Storm et FlockDB. LinkedIn : SenseiDB et Voldemort." },
    { id: "b15", chapter: "b2", question: "Quelle est la taille par défaut d'un bloc HDFS ?", options: ["64 Mo", "128 Mo", "1 Go", "256 Mo"], correct: 1, explanation: "Dans HDFS, les données sont découpées en « blocks » de 128 Mo par défaut (la réplication par défaut est de 3)." },
    { id: "b16", chapter: "b2", question: "Que stocke le NameNode ?", options: ["Les données des fichiers", "Les métadonnées des blocs : localisation, taille, date de création…", "Les logs des jobs", "Les mots de passe"], correct: 1, explanation: "Le NameNode stocke les métadonnées des blocs (localisation, taille, date de création…). Les données elles-mêmes sont sur les DataNodes (1 par machine du cluster)." },
    { id: "b17", chapter: "b2", question: "Combien de NameNodes par cluster en Hadoop 2 et Hadoop 3 ?", options: ["1 et 1", "2 et 3", "3 et 3", "1 et 2"], correct: 1, explanation: "HDFS s'appuie sur le NameNode : 2 NameNodes par cluster (Hadoop 2) et 3 NameNodes par cluster (Hadoop 3). DataNode : 1 par machine du cluster." },
    { id: "b18", chapter: "b2", question: "Quel facteur de réplication HDFS utilise-t-il par défaut ?", options: ["1", "2", "3", "5"], correct: 2, explanation: "HDFS est distribué (données réparties sur les machines du cluster) et répliqué : les données sont répliquées par défaut 3 fois pour pallier la défaillance d'une machine." },
    { id: "b19", chapter: "b2", question: "Quelle commande copie un fichier local vers HDFS ?", options: ["hdfs dfs -get", "hdfs dfs -put fichier_en_local destination_sur_hdfs", "hdfs dfs -cp", "hdfs dfs -mv"], correct: 1, explanation: "hdfs dfs -put fichier_en_local destination_sur_hdfs copie du local vers HDFS. -copyToLocal fait l'inverse. Autres : -ls, -mkdir, -cat, -cp, -mv, -rm, -du -h, -setrep -R -w 3." },
    { id: "b20", chapter: "b2", question: "Quelle commande modifie le facteur de réplication d'un fichier HDFS ?", options: ["hdfs dfs -setrep -R -w 3 fichier_sur_hdfs", "hdfs dfs -rep 3", "hdfs fs -repl", "hdfs dfs -chmod 3"], correct: 0, explanation: "hdfs dfs -setrep -R -w 3 fichier_sur_hdfs : -R récursif, -w attendre la fin, 3 = facteur de réplication." },
    { id: "b21", chapter: "b2", question: "Quelles sont les 4 étapes du traitement MapReduce ?", options: ["Split, Mapper, Shuffle, Reduce", "Load, Map, Sort, Save", "Input, Query, Output, Store", "Extract, Transform, Load, Export"], correct: 0, explanation: "Les 4 étapes : 1) Split (découpage des données d'entrée en fragments), 2) Mapper (génération des couples clef/valeur), 3) Shuffle (mélange/tri par clef), 4) Reduce (agrégation → valeur unique par clef)." },
    { id: "b22", chapter: "b2", question: "Dans l'exemple Word Count, que génère l'opération MAP ?", options: ["Le nombre total de mots", "Pour chaque mot de la ligne, un couple (MOT ; 1)", "Un index inversé", "Un fichier CSV"], correct: 1, explanation: "Code MAP (pseudo-code) : POUR MOT dans LIGNE, FAIRE : GENERER COUPLE (MOT ; 1). Ex : « celui qui croyait au ciel » → (celui;1)(qui;1)(croyait;1)(au;1)(ciel;1)." },
    { id: "b23", chapter: "b2", question: "Que fait l'étape SHUFFLE ?", options: ["Supprime les doublons", "Regroupe (mélange/tri) les couples par clef : (celui;1)(celui;1), (qui;1)(qui;1)…", "Écrit sur disque", "Compresse les données"], correct: 1, explanation: "Shuffle = mélanger & ordonner : regrouper tous les couples ayant la même clef pour préparer le Reduce." },
    { id: "b24", chapter: "b2", question: "Quel est le résultat du REDUCE pour la clef « qui » si 4 couples (qui;1) arrivent ?", options: ["(qui;1)", "(qui;4)", "4 lignes", "Erreur"], correct: 1, explanation: "REDUCE : TOTAL=0 ; POUR COUPLE dans GROUPE, FAIRE : TOTAL=TOTAL+1 ; RENVOYER TOTAL → une VALEUR UNIQUE par CLEF DISTINCTE : qui : 4." },
    { id: "b25", chapter: "b2", question: "Dans l'exemple « longueur moyenne des mots », comment calcule-t-on le résultat final ?", options: ["mean = length/count (avec count=3, length=12 → 4)", "length × count", "length - count", "count/length"], correct: 0, explanation: "Flux : Input (dogs, like, cats) → map → shuffle & sort → reduce → output (count, 3) et (length, 12) → Finish : mean = length/count." },
    { id: "b26", chapter: "b3", question: "Que signifie NoSQL ?", options: ["No Structured Query Language", "Not Only SQL : relâcher certaines contraintes du relationnel pour favoriser la DISTRIBUTION", "Network SQL", "New SQL"], correct: 1, explanation: "NoSQL = « Not Only SQL » : cette approche propose de relâcher certaines contraintes lourdes du relationnel pour favoriser la distribution (volumes ingérables, requêtes qui prennent des heures)." },
    { id: "b27", chapter: "b3", question: "Comment les données sont-elles stockées dans MongoDB ?", options: ["En tables relationnelles", "Sous forme de documents, syntaxe JSON", "En graphes uniquement", "En colonnes fixes"], correct: 1, explanation: "MongoDB : base de données noSQL, enregistre les données sous forme de documents (syntaxe JSON), plus rapide pour certaines opérations. Table→Collection, Columns→field, rows→document." },
    { id: "b28", chapter: "b3", question: "Quels sont les 3 types de nœuds d'un cluster MongoDB shardé ?", options: ["Routeurs (mongos), serveurs de configuration (Config Server), serveurs de données (Shard)", "Master, Slave, Backup", "NameNode, DataNode, Client", "Primary, Secondary, Arbiter"], correct: 0, explanation: "La robustesse du cluster est gérée par 3 types de nœuds : 1) routeurs : mongos ; 2) serveurs de configuration : Config Server (replica set) ; 3) serveurs de données : Shard (replica set)." },
    { id: "b29", chapter: "b3", question: "Dans un ReplicaSet MongoDB, combien de nœuds PRINCIPAUX ?", options: ["Tous", "Un seul", "Deux", "Aucun"], correct: 1, explanation: "Un replicaSet contient plusieurs nœuds porteurs de données ; parmi ces nœuds, un seul membre est considéré comme le nœud PRINCIPAL (Primary) et les autres SECONDAIRES. Le Primary reçoit toutes les requêtes (lecture/écriture) et gère la cohérence ; les Secondary participent à la réplication." },
    { id: "b30", chapter: "b3", question: "À quoi servent les ConfigServers dans le sharding ?", options: ["À stocker les données", "Pour que mongos sache dans quel shard se trouve la donnée recherchée (répartition faite dynamiquement)", "À faire des sauvegardes", "À chiffrer les données"], correct: 1, explanation: "Les ConfigServers (en replica set) permettent à mongos de savoir dans quel shard se trouve la donnée recherchée, car la répartition des données est faite dynamiquement." },
    { id: "b31", chapter: "b3", question: "Que fait le mongos si la requête ne contient pas le champ « title » (clé de sharding) ?", options: ["Erreur", "Il diffuse la requête sur tous les shards", "Il la redirige vers le premier shard", "Il la rejette"], correct: 1, explanation: "Si la requête contient le champ « title », le mongos la dirige vers le bon shard (a-h, i-p, q-z) ; sinon, diffusion sur tous les shards." },
    { id: "b32", chapter: "b3", question: "Qu'est-ce qu'une clé de partition (shard key) ?", options: ["Un mot de passe", "Un champ existant dans les documents de la collection, choisi lors du partitionnement, qui distribue les documents en partitions (une seule clé par collection partitionnée)", "Un index secondaire", "Le nom du serveur"], correct: 1, explanation: "Clé de partition : champ existant dans les documents, utilisé pour distribuer la collection en partitions ; choix fait lors du partitionnement ; une collection partitionnée possède UNE SEULE clé." },
    { id: "b33", chapter: "b3", question: "Quelle est la taille par défaut d'un chunk MongoDB ?", options: ["16 Mo", "64 Mo", "128 Mo", "1 Go"], correct: 1, explanation: "MongoDB divise un chunk chaque fois qu'il dépasse la taille fixée lors de la configuration : 64 Mo par défaut. Les chunks migrent entre partitions quand une partition en possède assez." },
    { id: "b34", chapter: "b3", question: "Que fait MongoDB dès qu'on définit une clé de sharding ?", options: ["Il supprime la collection", "Il crée un premier Chunk contenant l'ensemble des documents", "Il crée un index unique", "Il redémarre"], correct: 1, explanation: "Dès l'instant où on définit une clé de sharding, MongoDB crée un premier Chunk contenant l'ensemble des documents (ex. {title: 'Any Given Sunday'} … {title: 'Wall Street'})." },
    { id: "b35", chapter: "b3", question: "Quelle commande lance un serveur de configuration MongoDB ?", options: ["mongod --configsvr --replSet configReplSet --port 27019 --dbpath /data/conf1", "mongod --server conf", "mongos --config", "mongo --confsvr"], correct: 0, explanation: "Étape 1 du sharding : mongod --configsvr --replSet configReplSet --port 27019 --dbpath /data/conf1 (et 27020 pour conf2), puis mongo --port 27019 ; rs.initiate() ; rs.add(\"local:27020\")." },
    { id: "b36", chapter: "b3", question: "Comment lance-t-on les serveurs shard ?", options: ["mongod --shardsvr --replSet sh1 --port 27031 --dbpath /data/sh1", "mongos --shard 1", "mongod --replica sh1", "mongo --newshard"], correct: 0, explanation: "Étape 2 : mongod --shardsvr --replSet sh1 --port 27031 --dbpath /data/sh1 (et sh2:27032) ; initiation : mongo --port 27031 --eval \"rs.initiate()\"." },
    { id: "b37", chapter: "b3", question: "Quelle commande lance le mongos (serveur de distribution) ?", options: ["mongos --configdb configReplSet/localhost:27019 --port 27017", "mongod --mongos", "mongo --distrib", "mongod --port 27017 --router"], correct: 0, explanation: "Étape 3 : mongos --configdb configReplSet/localhost:27019 --port 27017. Puis ajout des shards : sh.addShard(\"sh1/localhost:27031\") ; sh.addShard(\"sh2/localhost:27032\")." },
    { id: "b38", chapter: "b3", question: "Quelle séquence active le sharding sur la collection test ?", options: ["use testDB ; sh.enableSharding(\"testDB\") ; db.createCollection(\"test\") ; db.test.createIndex({\"_id\": 1}) ; sh.shardCollection(\"testDB.test\", {\"_id\": 1})", "sh.start(\"test\")", "db.shard(true)", "mongo --shard test"], correct: 0, explanation: "Étape 4 : use testDB ; sh.enableSharding(\"testDB\") ; db.createCollection(\"test\") ; db.test.createIndex({\"_id\": 1}) ; sh.shardCollection(\"testDB.test\", {\"_id\": 1}). Vérification : mongo --port 27017 --eval \"sh.status()\"." },
    { id: "b39", chapter: "b3", question: "Quels sont les avantages du sharding MongoDB ?", options: ["Capacité de stockage, lecture/écriture, haute disponibilité, protection contre les pannes, géodistribution et performances", "Seulement la sécurité", "Uniquement la vitesse d'écriture", "La compression"], correct: 0, explanation: "Avantages du sharding : capacité de stockage, lecture/écriture (parallélisme), haute disponibilité, protection contre les pannes, géodistribution et performances." },
    { id: "b40", chapter: "b1", question: "Selon le cours, combien de données (en Zettaoctets) étaient produites en 2011 ?", options: ["0,12 ZB", "1,8 ZetaO", "40 ZB", "5 ExaO"], correct: 1, explanation: "Données produites en 2011 ≈ 1,8 ZetaO (1 Zo = 1024 Eo). Toutes les infos produites jusqu'à 2003 ≈ 5 ExaO." },
  ],
};
