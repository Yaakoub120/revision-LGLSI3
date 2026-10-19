import type { Subject } from "@/lib/learn-types";

// ═══════════════════════════════════════════════════════════════════════════
// SUJET — PROGRAMMATION MOBILE ANDROID (Soufien GDAIM — FSM, LGLSI3 2025/2026)
// Cours complet (Partie 1 à 5, slides 1–224) + QCM/DS/EXAM + TP1/TP2/TP3 :
//  1. Introduction programmation mobile · 2. Environnement de Développement
//  3. Cycle de Vie d'une Activité · 4. Interfaces graphiques (+ styles, thèmes,
//  menus, Toasts, boîtes de dialogues) · 5. Les Intents · Services/Broadcast
//  Receivers/Content Providers · QCM-DS-EXAM · Travaux Pratiques 1-2-3
// ═══════════════════════════════════════════════════════════════════════════

export const android: Subject = {
  id: "android",
  name: "Programmation Mobile Android",
  shortName: "Android",
  teacher: "Soufen GDAIM — FSM",
  icon: "Smartphone",
  gradient: "from-lime-500 via-green-500 to-emerald-600",
  accent: "#84cc16",
  description:
    "Cours complet : introduction mobile (OS, natif/hybride/web), environnement (Android Studio, SDK, manifeste), cycle de vie d'une activité, interfaces graphiques (layouts, widgets, styles, thèmes, menus, Toasts, dialogues), Intents, services et Travaux Pratiques.",
  chapters: [
    {
      id: "intro",
      title: "Introduction à la programmation mobile",
      summary: "Systèmes d'exploitation mobiles et concurrents, types de développement (natif, hybride, web mobile) avec synthèse comparative, présentation d'Android, historique des versions, architecture logicielle et composants d'une application.",
      sections: [
        {
          heading: "Systèmes d'exploitation mobiles",
          blocks: [
            {
              type: "p",
              text: "Un système d'exploitation mobile est conçu spécialement pour les systèmes mobiles : Smartphones, PDA, Tablette, Notebook, minipc, tablette voitures, réveil et terminaux mobiles. Il offre : la gestion d'alimentation (batterie), la gestion mémoire (RAM), la gestion sans fil (wifi, bluetooth, 3G, 4G…), la gestion des connectivités (USB, HDMI…), la gestion des supports de stockage (SD-CARD) et l'exécution de plusieurs applications.",
            },
            {
              type: "p",
              text: "Les principaux concurrents : Android, iOS (iPhone, iPad), Windows Mobile (Microsoft), Symbian OS (Nokia), Web OS (Palm), BlackBerry OS (RIM) et Bada (Samsung — même si Samsung utilise aussi Android). Parts de marché mondiales (mars/20) : Android 71.859 %, iOS 27.476 %, KaiOS 0.269 %, Samsung 0.163 %, Windows 0.092 %, Tizen 0.02 %, BlackBerry 0.01 %, Linux 0.01 %. En août 2025 (statcounter) : Android 73.90 %, iOS 25.71 %, Samsung 0.21 %, Unknown 0.14 %, KaiOS 0.02 %, Linux 0.01 %. Le choix d'un OS mobile cible est un problème : bada, BlackBerry, Windows, Symbian/Nokia, palm webOS, Android, iOS…",
            },
          ],
        },
        {
          heading: "Les trois types de développement d'applications mobiles",
          blocks: [
            {
              type: "diagram",
              id: "android-dev-types",
              caption: "Application native, hybride et web mobile : architecture et accès au backend.",
            },
            {
              type: "table",
              headers: ["Type", "Principe", "BUILD / DEPLOY", "Technologies (client | serveur)"],
              rows: [
                ["Natif", "Application développée spécifiquement pour une plateforme précise (une application mobile iPhone ne fonctionne pas sur Android et vice versa). Chaque plateforme a ses propres outils de développement et ses propres langages de programmation. Exploitation maximale des fonctionnalités du dispositif mobile.", "BUILD : Java/Kotlin (Android), Objective-C/Swift (iOS), C#/.Net (Windows) — DEPLOY : Android, iOS, Windows", "Client : Kotlin, Java, Objective-C, Swift, .NET | Serveur : python, Flask, django, php, Laravel, Symfony, node.js, JavaEE, spring, spring boot, Hibernate (JAVA ORM)"],
                ["Hybride", "Composée de 80% du web (HTML/CSS/JS) et de 20% d'extensions enveloppée d'une surcouche native adaptée aux différents systèmes d'exploitation, permettant l'accès à certaines fonctionnalités natives. Les applications développées en hybride sont déployées sur plusieurs plateformes. Le résultat est une application packagée pour chaque plateforme : cela impose d'avoir à disposition du matériel et un système pour chaque plateforme cible (SDK Android + Android Studio, Mac OS + Xcode, SDK .Net + Visual Studio).", "BUILD : HTML5/JS/CSS (Single Page Application) + code natif (plugins) — DEPLOY : Android + iOS + Windows. Package natif : Apache Cordova, Adobe PhoneGap, PhoneGap Build ; code natif : Titanium", "Client : HTML5, JS, CSS, Bootstrap, Mobile Angular UI, Flutter, React Native, .NET, Java, Objective-C | Serveur : python, Flask, django, php, Laravel, Symfony, node.js, JavaEE, spring, spring boot, Hibernate"],
                ["Web Mobile", "Application mobile développée avec des langages de développement web (HTML5, CSS3, js…) et exécutée depuis un navigateur web mobile. Un navigateur est essentiel à son fonctionnement. Pas besoin d'installer une application et les mises à jour sont transparentes pour l'utilisateur. Elle ne peut pas fonctionner sans connexion Internet et l'exploitation des fonctionnalités des dispositifs mobiles est réduite.", "BUILD : technologie web server side (jsp…), HTML5/JS/CSS (Single Page Application) — DEPLOY : Web Browsers (Android + iOS + Windows)", "Client : HTML5, JS, CSS, Bootstrap, AngularJS, jQuery | Serveur : python, Flask, django, php, Laravel, Symfony, node.js, JavaEE, spring, spring boot, Hibernate"],
              ],
            },
          ],
        },
        {
          heading: "Avantages et inconvénients de chaque type",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Natif — avantages", v: "Permet de développer avec un design respectant chaque plateforme ; accès total et performant aux ressources matérielles du smartphone (caméra, appareil photo, microphone, géolocalisation, stockage, agenda, contacts…) ; code généré plus rapide, plus sécurisé, plus stable et plus optimisé ; permet d'accéder facilement aux dernières nouveautés des SDK." },
                { k: "Natif — inconvénients", v: "Nécessite de multiples compétences ; nécessite autant de développements que de plateformes cibles ; maintenance plus compliquée ; nécessite de multiples environnements." },
                { k: "Hybride — avantages", v: "Technologies traditionnelles du web donc compétences largement disponibles ; possibilité d'étendre le container natif par un système de plugin natif permettant d'accéder à toutes les API natives ; simplicité du développement (code unique implémenté pour plusieurs plateformes iOS, Android…) ; développement plus rapide que le développement natif." },
                { k: "Hybride — inconvénients", v: "Accessibilité partielle aux fonctionnalités natives ; interface utilisateur non fluide et non optimisée ; impossible de respecter parfaitement le design spécifique de chaque plateforme ; performances et fonctionnalités très limitées." },
                { k: "Web Mobile — avantages", v: "Technologies traditionnelles du web donc compétences largement disponibles ; l'avantage majeur d'une application web est qu'elle coûte moins cher qu'une application développée en natif ; le temps de développement de ces applications est le plus rapide ; directement accessible dans un navigateur (pas de store)." },
                { k: "Web Mobile — inconvénients", v: "Accès limité au matériel ; impossible de respecter parfaitement le design spécifique de chaque plateforme ; ne peut pas envoyer de notifications push." },
                { k: "Web Mobile — contraintes / bonnes pratiques", v: "Implémentation Responsive Design / Adaptative Design." },
              ],
            },
          ],
        },
        {
          heading: "Synthèse comparative et meilleur choix",
          blocks: [
            {
              type: "table",
              headers: ["Critère", "Natif", "Hybride", "Web Mobile"],
              rows: [
                ["Temps de développement", "long", "moyen", "le plus rapide"],
                ["Performance", "la meilleure", "moyenne", "limitée"],
                ["Coût de développement", "le plus élevé", "moyen", "le moins cher"],
                ["Coût du multiplateforme", "autant de développements que de plateformes", "un code, n packages", "un code partagé"],
                ["Compétences disponibles", "spécifiques à chaque plateforme", "web (largement disponibles)", "web (largement disponibles)"],
                ["Distribution via App Store / Play Store", "oui", "oui (application packagée)", "non (navigateur)"],
                ["Accès au matériel / au système", "total et performant", "partiel (via plugins natifs)", "limité"],
                ["Accès aux nouveautés des plateformes", "facile (SDK)", "dépend des plugins", "limité"],
                ["Intégration dans une boîte de développement", "Android Studio, Xcode, Visual Studio", "frameworks (Cordova, PhoneGap, Titanium…)", "outils web"],
              ],
            },
            {
              type: "p",
              text: "Le meilleur choix ? Il n'y a pas de meilleur choix : le choix dépend clairement du contexte. La question à se poser : application grand public ? application de gestion interne ? la performance est-elle un critère important ? Choisir entre une application mobile native, hybride ou web n'est pas du tout facile — votre choix dépend de vos besoins, de vos objectifs, de votre budget et de vos utilisateurs : pour créer une application qui demande des performances, il vous faut une application native ; pour développer un seul code pour différents dispositifs, gagner du temps et du budget, choisissez le développement hybride ; pour créer une application de besoin fonctionnel simple et accessible par toutes les plateformes, il faut une application web.",
            },
            {
              type: "callout",
              variant: "important",
              title: "Choix de ce cours",
              text: "Dans ce cours, on s'intéressera au système d'exploitation mobile Android et on va choisir le type de développement Natif pour développer les applications.",
            },
          ],
        },
        {
          heading: "Android : présentation, historique et versions",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Définition", v: "Android est un système d'exploitation open source pour Smartphones, PDA, Tablette, Notebook, minipc, tablette voitures, réveil et terminaux mobiles." },
                { k: "Origine", v: "Conçu par Android, une startup rachetée par Google, et annoncé officiellement le 5 novembre 2007. Le symbole d'Android est un petit robot vert." },
                { k: "Caractéristiques — Constructeur", v: "Système Linux, Java." },
                { k: "Caractéristiques — Développeur", v: "Applications développées en Java, SDK complet et gratuit." },
                { k: "Caractéristiques — Utilisateur", v: "Système fonctionnel, intuitif et évolutif." },
                { k: "Caractéristiques — Chercheur", v: "Projet Open Source, C++/Java." },
              ],
            },
            {
              type: "table",
              headers: ["Version", "Nom", "Numéro(s)", "Date de sortie", "API level"],
              rows: [
                ["Android 1", "Apple pie", "1.0", "23 septembre 2008", "1"],
                ["Android 1", "Banana bread", "1.1", "9 février 2009", "2"],
                ["Android 1.5", "Cupcake", "1.5", "27 avril 2009", "3"],
                ["Android 1.6", "Donut", "1.6", "15 septembre 2009", "4"],
                ["Android 2", "Éclair", "2.0 – 2.1", "26 octobre 2009", "5 – 7"],
                ["Android 2.2", "Froyo", "2.2", "20 mai 2010", "8"],
                ["Android 2", "Gingerbread", "2.3 – 2.3.7", "6 décembre 2010", "9 – 10"],
                ["Android 3", "Honeycomb", "3.0 – 3.2.6", "22 février 2011", "11 – 13"],
                ["Android 4", "Ice Cream Sandwich", "4.0 – 4.0.4", "18 octobre 2011", "14 – 15"],
                ["Android 4", "Jelly Bean", "4.1 – 4.3.1", "9 juillet 2012", "16 – 18"],
                ["Android 4", "KitKat", "4.4 – 4.4.4", "31 octobre 2013", "19 – 20"],
                ["Android 5", "Lollipop", "5.0 – 5.1.1", "12 novembre 2014", "21 – 22"],
                ["Android 6", "Marshmallow", "6.0 – 6.0.1", "5 octobre 2015", "23"],
                ["Android 7", "Nougat", "7.0 – 7.1.2", "22 août 2016", "24 – 25"],
                ["Android 8", "Oreo", "8.0 – 8.1", "21 août 2017", "26 – 27"],
                ["Android 9", "Pie", "9", "6 août 2018", "28"],
                ["Android 10", "Queen Cake", "10", "3 septembre 2019", "29"],
                ["Android 11", "Red Velvet Cake", "11", "8 septembre 2020", "30"],
                ["Android 12", "Snow Cone / Snow Cone V2", "12 / 12L", "octobre 2021", "31 / 32"],
                ["Android 13", "Tiramisu", "13", "août 2022", "33"],
                ["Android 14", "Upside Down Cake", "14", "août 2023", "34"],
                ["Android 15", "Vanilla Ice Cream", "15", "2024", "35"],
              ],
            },
            {
              type: "p",
              text: "Les versions les plus populaires en 2018-2019 (Google Play Store, septembre 2018) : Nougat, Oreo, Marshmallow, Lollipop, KitKat, puis Gingerbread, Ice Cream Sandwich et Jelly Bean. Les noms de versions suivent l'ordre alphabétique des desserts (Cupcake, Donut, Eclair, Froyo, Gingerbread, Honeycomb, Ice Cream Sandwich, Jellybean, KitKat, Lollipop, Marshmallow, Nougat, Oreo, Pie, puis Android 10, 11, 12…).",
            },
          ],
        },
        {
          heading: "Architecture logicielle d'Android (Linux Inside)",
          blocks: [
            {
              type: "diagram",
              id: "android-arch",
              caption: "Les couches d'Android : applications, framework, librairies + ART, noyau Linux.",
            },
            {
              type: "kv",
              items: [
                { k: "Linux kernel", v: "Version 3.4 pour Lollipop 5.1. Offre les services fondamentaux : hardware drivers, process & memory management, security, network, power management. Offre une couche d'abstraction entre le hardware et le reste de la pile logicielle (Hardware Abstraction Layer : Graphics, Audio, Camera, Bluetooth, GPS, WiFi…). Architecture ARM (famille RISC) ; système de fichiers supporté : FAT32 ; support de TCP/IP et UDP." },
                { k: "Librairies (via JNI)", v: "Surface Manager (écran), SQL Lite et OpenGL (graphique 2D/3D), Audio Manager (sonneries, écouteurs), Media Framework, WebKit, SGL, SSL, Libc." },
                { k: "Android Runtime (ART)", v: "Équivalent de la JVM pour PC : Core Libraries + Android Runtime (ART). L'ensemble communique avec les librairies via le JNI." },
                { k: "Framework (pour développeurs)", v: "Fournit les classes qui seront utilisées pour la création d'applications Android : Activity Manager (Intents, Actions), Location Manager (GPS, coordonnées Map), Notification Manager (barre de notification, vibreur, son, LED), Telephony Manager (contacts, SMS…), Window Manager, Content Providers, View System, Package Manager, Resource Manager." },
              ],
            },
          ],
        },
        {
          heading: "Composants d'une application Android",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Activity (Activité)", v: "Correspond à la partie présentation de l'application ; fonctionne par le biais de vues qui affichent des interfaces graphiques et répondent aux actions utilisateur. Une activité correspond à un écran mais elle peut contenir plusieurs vues. Classe + Interface Graphique (un écran) ; répond à des événements (click, touche…) ; cycle de vie (Création → Destruction) ; 1 activité au moins par application." },
                { k: "Service", v: "Destiné à fonctionner indépendamment des activités : processus, sans interface graphique, fonctionne en background, interne / externe. Principales utilisations : la mise à jour de sources de données, la mise à jour des activités visibles, le déclenchement de notifications. Classe Service." },
                { k: "Intent", v: "Une description abstraite d'une opération à effectuer. Utilisé avec startActivity pour lancer une activité, broadcastIntent pour envoyer à tous les composants BroadcastReceiver intéressés, StartService (intention) ou bindService (intention, ServiceConnection, int) pour communiquer avec un service d'arrière-plan. Messages système qui circulent entre les activités. Exemple : émettre l'intention X lorsque l'utilisateur est à moins de 100 mètres d'un emplacement Y." },
                { k: "Fragment", v: "Comportement ou une partie de l'interface utilisateur dans une activité. Possibilité de combiner de multiples fragments en une seule activité. Un fragment doit toujours être intégré dans une activité et le cycle de vie du fragment est directement affecté par le cycle de vie de l'activité de l'hôte (sur tablette : une activité contient plusieurs fragments ; sur handset : chaque fragment peut démarrer une activité)." },
                { k: "Content Provider", v: "Fournisseurs de contenus : permet de gérer et de partager des informations. Un même fournisseur permet d'accéder à des données au sein d'une application et entre applications (partage des données) : liste de contacts, agenda, photos, SQLite, GPS, module GSM, UMTS. Classe ContentProvider." },
                { k: "Broadcast Receiver", v: "Récepteur Broadcast : permet à une application d'être à l'écoute des autres afin de répondre aux objets Intent qui lui sont destinés et qui sont envoyés par d'autres composants applicatifs. Permet de réagir à des évènements extérieurs à l'application, réveiller une application, réagir à des évènements système (mise hors tension, batterie faible, changement de langue du système). Classe BroadcastReceiver." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "env",
      title: "Environnement de développement",
      summary: "Eclipse+ADT (obsolète) vs Android Studio, SDK, installation, SDK Manager, AVD Manager et émulateur, architecture d'un projet, AndroidManifest.xml, MainActivity et layout.",
      sections: [
        {
          heading: "Outils de développement : Eclipse+ADT (obsolète) vs Android Studio",
          blocks: [
            {
              type: "p",
              text: "On peut développer sur Android sous Linux, Windows et MacOS avec : Eclipse + un plugin, ou Android-Studio. Ces deux solutions utilisent le SDK d'Android qui contient : les librairies Java d'Android, des outils de développement, un émulateur pour tester vos applications, des images du système Android… Il n'est pas nécessaire de télécharger le SDK séparément si on va utiliser Android Studio.",
            },
            {
              type: "kv",
              items: [
                { k: "Schéma obsolète (1/2)", v: "IDE Eclipse ↔ Android ADT ↔ Android SDK → Application Android." },
                { k: "Schéma actuel (2/2)", v: "Android Studio + SDK Tools → Application Android." },
                { k: "Android Studio depuis mi-2015", v: "Il est recommandé d'utiliser Android Studio (l'intégration de fonctionnalités de développement Android). Avantages : meilleure intégration du SDK dans Android Studio, puissance de l'IDE IntelliJ, meilleure gestion des dépendances avec gradle." },
              ],
            },
          ],
        },
        {
          heading: "Installation et premiers pas",
          blocks: [
            {
              type: "list",
              items: [
                "Pour installer Android Studio : télécharger le logiciel via le site d'Android ;",
                "Extraire l'archive dans un répertoire ;",
                "(Linux) exécuter le fichier studio.sh du répertoire bin / (Windows) lancer le fichier exécutable exe ;",
                "À son premier démarrage, Android Studio télécharge le SDK et vous propose de configurer une machine virtuelle.",
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Android SDK Manager", v: "On peut l'exécuter en lançant l'exécutable android qui se trouve dans le répertoire tools du SDK." },
                { k: "AVD Manager", v: "Pour tester un programme sur votre ordinateur, il est nécessaire de créer une machine virtuelle à l'aide de l'AVD Manager (Android Virtual Device)." },
                { k: "Émulateur", v: "Permet de tester votre application ; les ROMs Intel permettent de bénéficier de l'accélération matérielle." },
                { k: "SmartPhone", v: "Votre smartphone vous permet de tester votre application (en activant les options de développement)." },
              ],
            },
          ],
        },
        {
          heading: "Architecture d'un projet Android",
          blocks: [
            {
              type: "table",
              headers: ["Élément du projet", "Rôle"],
              rows: [
                ["build.gradle (2 instances)", "Règles de dépendance et de compilation"],
                ["settings.gradle", "Liste de toutes les applications à compiler (si plusieurs)"],
                ["AndroidManifest.xml", "Fichier de contrôle de l'application, décrivant sa nature, ses composants et les permissions associées"],
                ["Code source (java/)", "Code source Java des applications"],
                ["res/drawable", "Images (PNG, JPEG ou GIF) et fichiers XML décrivant les formes"],
                ["res/layout", "Fichiers XML représentant l'interface d'une page ou d'une partie de page de votre application"],
                ["res/values", "Dossier contenant les fichiers décrivant des valeurs utilisées dans l'application — ex : strings.xml pour les chaînes, arrays.xml pour les tableaux…"],
                ["Ressources (res/)", "Ressources utilisées par l'application"],
              ],
            },
          ],
        },
        {
          heading: "AndroidManifest.xml",
          blocks: [
            {
              type: "p",
              text: "AndroidManifest.xml est le fichier de configuration XML de l'application. Il ne doit pas être renommé, ni déplacé. C'est un fichier indispensable à chaque application qui décrit entre autres : le point d'entrée de votre application (quel code doit être exécuté au démarrage de l'application), le nom de l'application, son icône, son package (l'identifiant unique sur le Play Store), les composants qui constituent ce programme, et les permissions nécessaires à l'exécution du programme : les permissions matérielles (accès à l'appareil photo, GPS, ...) et les permissions d'interactions entre les applications (accès à Internet, répertoire téléphonique, galerie des photos…).",
            },
            {
              type: "kv",
              items: [
                { k: "<application>", v: "Un seul et unique nœud application." },
                { k: "<uses-permission>", v: "L'utilisateur se verra demander l'autorisation d'utiliser l'ensemble des fonctions liées à ces permissions." },
                { k: "<activity>", v: "Déclare une activité présentée à l'utilisateur." },
                { k: "<service>", v: "Déclare un composant de l'application en tant que service." },
                { k: "<receiver>", v: "Déclare un récepteur d'objets Intent. Cet élément permet à l'application de recevoir ces objets alors qu'ils sont diffusés par d'autres applications ou par le système." },
                { k: "<provider>", v: "Déclare un fournisseur de contenu qui permettra d'accéder aux données gérées par l'application." },
              ],
            },
            {
              type: "code",
              lang: "xml",
              caption: "Exemple de manifeste — le fichier AndroidManifest.xml déclare l'ensemble des éléments de l'application",
              code: '<?xml version="1.0" encoding="utf-8"?>\n<manifest xmlns:android="http://schemas.android.com/apk/res/android"\n    package="com.example.myapp">\n  <uses-permission android:name="android.permission.INTERNET"></uses-permission>\n  <uses-sdk android:minSdkVersion="15"></uses-sdk>\n  <application\n      android:allowBackup="true"\n      android:icon="@mipmap/ic_launcher"\n      android:label="@string/app_name"\n      android:roundIcon="@mipmap/ic_launcher_round"\n      android:supportsRtl="true"\n      android:theme="@style/AppTheme">\n    <activity android:name=".SecondActivity" android:exported="false" />\n    <activity android:name=".MainActivity" android:exported="true">\n      <intent-filter>\n        <action android:name="android.intent.action.MAIN" />\n        <category android:name="android.intent.category.LAUNCHER" />\n      </intent-filter>\n    </activity>\n  </application>\n</manifest>',
            },
          ],
        },
        {
          heading: "MainActivity.java et layout.xml",
          blocks: [
            {
              type: "code",
              lang: "java",
              caption: "MainActivity.java — point d'entrée de l'application",
              code: 'import androidx.appcompat.app.AppCompatActivity;\nimport android.os.Bundle;\nimport android.widget.Toast;\n\npublic class MainActivity extends AppCompatActivity {\n  @Override\n  protected void onCreate(Bundle savedInstanceState) {\n    super.onCreate(savedInstanceState);\n    setContentView(R.layout.activity_main);\n    Toast.makeText(this, "application crée", Toast.LENGTH_SHORT).show();\n  }\n}',
            },
            {
              type: "code",
              lang: "xml",
              caption: "layout.xml — interface de l'activité (Hello ISIMa!)",
              code: '<?xml version="1.0" encoding="utf-8"?>\n<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    xmlns:app="http://schemas.android.com/apk/res-auto"\n    xmlns:tools="http://schemas.android.com/tools"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent"\n    android:orientation="vertical"\n    android:gravity="center"\n    tools:context=".MainActivity">\n\n  <TextView\n      android:layout_width="match_parent"\n      android:layout_height="wrap_content"\n      android:gravity="center"\n      android:textSize="20sp"\n      android:textColor="#ff0000"\n      android:text="Hello ISIMa!"/>\n</LinearLayout>',
            },
          ],
        },
        {
          heading: "Architecture d'une application Android",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Fichier de configuration (manifeste)", v: "Détient la composition de l'application : activités, permissions, mécanismes liés aux intentions." },
                { k: "Activités", v: "Les activités constituent le cœur interactif de l'application." },
                { k: "Vues", v: "Vues qui composent l'activité : ImageView, TextView, EditText, VideoView, etc." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "cycle",
      title: "Cycle de vie d'une Activité",
      summary: "Définition d'une activité, pile d'activités, les 3 états (active, en pause, arrêtée), les 7 méthodes de transition du framework, scénario d'un appel téléphonique, sauvegarde et restauration du contexte.",
      sections: [
        {
          heading: "Présentation d'une Activité",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Définition", v: "Une activité est un composant d'une application qui fournit un écran avec lequel l'utilisateur peut interagir. Une application contient plusieurs activités." },
                { k: "Formule", v: "Une activité = Contexte + une Interface graphique." },
                { k: "Question type", v: "Que se passe-t-il si on reçoit un SMS alors que l'utilisateur manipule l'application mobile ? → L'activité de l'application mobile passe d'un état à un autre. C'est le Cycle de Vie d'une Activité." },
                { k: "Cycle de vie", v: "Les activités d'une application ont un cycle de vie : un début quand Android les instancie pour répondre aux Intents, une fin quand les instances sont détruites. Entre les deux, elles peuvent être : visibles ou invisibles, actives ou inactives (vie d'une application : Début → Actif/Inactif + Visible/Invisible → Fin)." },
              ],
            },
          ],
        },
        {
          heading: "La pile d'activités",
          blocks: [
            {
              type: "diagram",
              id: "android-stack",
              caption: "Les activités sont gérées sous forme de pile : la nouvelle activité arrive en haut.",
            },
            {
              type: "list",
              items: [
                "Quand une nouvelle activité démarre, elle est placée en haut de la pile et devient l'activité en exécution.",
                "L'activité précédente reste en dessous dans la pile.",
                "L'activité précédente ne revient au premier plan que si la nouvelle activité est fermée.",
                "Si l'utilisateur clique sur le bouton Retour du téléphone, l'activité suivante dans la pile (l'activité précédente) devient active.",
              ],
            },
          ],
        },
        {
          heading: "Les trois états d'une activité",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Active ou en Exécution", v: "Elle est au premier plan de l'écran (donc en haut de la pile). C'est l'activité ciblée par les actions de l'utilisateur." },
                { k: "En Pause", v: "A perdu le focus, mais est encore partiellement visible : une autre activité est en haut de la pile, mais elle est soit transparente, soit ne couvre pas tout l'écran." },
                { k: "Arrêtée", v: "Complètement recouverte par une autre activité. Ses informations sont encore chargées, mais elle n'est plus visible. Peut être détruite par le système s'il a besoin de mémoire." },
              ],
            },
            {
              type: "callout",
              variant: "info",
              title: "États stables et transitoires (TP2)",
              text: "Seuls trois états peuvent être stables — l'activité peut exister dans l'un de ces trois états pendant une période prolongée : Resumed, Paused, Stopped. Les autres états (Created, Started) sont transitoires : après onCreate(), le système appelle rapidement onStart(), qui est rapidement suivi par onResume().",
            },
          ],
        },
        {
          heading: "Les 7 méthodes de transition",
          blocks: [
            {
              type: "p",
              text: "Quand l'utilisateur reçoit un appel téléphonique, l'activité courante passe dans l'état OnPause ensuite Stopped ; lorsque l'appel téléphonique est terminé, cette activité revient dans Started puis Resumed. Quand une activité passe d'un état à un autre, le framework Android appelle les méthodes de transition correspondantes :",
            },
            {
              type: "list",
              items: [
                "void onCreate(Bundle savedInstanceState) : obligatoire",
                "void onStart()",
                "void onResume()",
                "void onRestart()",
                "void onPause() : recommandée",
                "void onStop()",
                "void onDestroy()",
              ],
            },
            {
              type: "cmd",
              commands: [
                { cmd: "onCreate(Bundle)", desc: "création de l'activité : initialisation de tous les éléments — obligatoire, toujours suivie de onStart" },
                { cmd: "onStart()", desc: "appelée juste avant que l'activité ne devienne visible" },
                { cmd: "onResume()", desc: "appelée juste avant l'interaction — l'activité est en haut de la pile, toujours suivie de onPause" },
                { cmd: "onRestart()", desc: "appelée quand l'activité redémarre après avoir été stoppée — toujours suivie de onStart" },
                { cmd: "onPause()", desc: "sauvegarde des données non sauvegardées, arrêt des animations — doit être rapide (recommandée)" },
                { cmd: "onStop()", desc: "l'activité n'est plus visible — suivie de onRestart ou onDestroy" },
                { cmd: "onDestroy()", desc: "dernier appel — finish() ou destruction par le système ; distinguer avec isFinishing()" },
                { cmd: "onSaveInstanceState(Bundle)", desc: "sauvegarder l'état de l'activité (à personnaliser)" },
                { cmd: "onRestoreInstanceState(Bundle)", desc: "restaurer l'état de l'activité (à personnaliser)" },
                { cmd: "isFinishing()", desc: "distinguer un finish() d'une destruction par le système" },
              ],
            },
          ],
        },
        {
          heading: "onCreate, onStart, onResume",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "onCreate", v: "Appelée à la création d'une activité. Initialisation de tous les éléments. Un bundle est passé à cette méthode, contenant l'état précédent de l'activité. Toujours suivie de onStart. L'instruction setContentView(R.layout.activity_main) permet d'affecter l'interface graphique à l'activité, décrite dans le fichier activity_main.xml." },
                { k: "onStart", v: "Appelée juste avant que l'activité ne devienne visible. Suivie de onResume si l'activité revient en premier plan." },
                { k: "onResume", v: "Appelée juste avant que l'activité ne commence à interagir avec l'utilisateur. À ce point, l'activité est en haut de la pile. Toujours suivie de onPause." },
                { k: "Activity running", v: "L'application est en exécution et l'utilisateur est actuellement en interaction avec elle. Lorsqu'un évènement externe arrive, l'activité bascule vers l'état onPause." },
              ],
            },
            {
              type: "diagram",
              id: "android-lifecycle",
              caption: "Cycle de vie complet : onCreate → onStart → onResume → onPause → onStop → onDestroy, avec onRestart et la destruction par le système.",
            },
          ],
        },
        {
          heading: "onPause, onStop, onRestart, onDestroy",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "onPause", v: "Appelée quand le système va démarrer une autre activité. Utilisée typiquement pour : enregistrer les données non sauvegardées, arrêter les animations ou tout ce qui consomme de la mémoire. Ne doit pas consommer beaucoup de temps, car l'activité suivante ne va démarrer que si cette méthode prend fin. Suivie de : onResume si l'activité est rechargée en premier plan, onStop si l'activité devient invisible — dans cet état, l'activité peut être détruite par le système." },
                { k: "onStop", v: "Appelée quand l'activité n'est plus visible à l'utilisateur. Peut arriver si : l'activité est détruite, ou une autre activité a repris son exécution et l'a recouverte. Suivie par : onRestart si l'activité recommence à interagir avec l'utilisateur, onDestroy si l'activité va disparaître. Dans cet état, l'activité peut être détruite par le système." },
                { k: "onRestart", v: "Appelée quand l'activité va redémarrer après avoir été stoppée. Toujours suivie de onStart." },
                { k: "onDestroy", v: "Appelée quand l'activité est détruite : dernier appel que l'activité va recevoir. Peut intervenir si : l'activité se termine (appel de finish), ou le système détruit temporairement cette instance de l'activité pour gagner de l'espace. On peut distinguer entre ces deux scénarios avec la méthode isFinishing(). Dans cet état, l'activité peut être détruite par le système." },
              ],
            },
          ],
        },
        {
          heading: "Sauvegarde et restauration du contexte",
          blocks: [
            {
              type: "code",
              lang: "java",
              caption: "Sauvegarde et restauration de l'état de l'activité",
              code: '@Override\nprotected void onSaveInstanceState(Bundle outState) {\n  super.onSaveInstanceState(outState);\n}\n\n@Override\nprotected void onRestoreInstanceState(@NonNull Bundle savedInstanceState) {\n  super.onRestoreInstanceState(savedInstanceState);\n}',
            },
            {
              type: "p",
              text: "Il faudra personnaliser ces deux méthodes pour sauvegarder et restaurer les données.",
            },
          ],
        },
      ],
    },
    {
      id: "ui",
      title: "Interfaces graphiques — Éléments de base",
      summary: "Unités de mesure (px, dp, sp…), View et ViewGroup, interfaces en XML ou Java, layouts (Absolute, Linear, Relative, Table, Grid, Frame), attributs communs.",
      sections: [
        {
          heading: "Unités de mesure",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "pixel (px)", v: "correspond à un pixel de l'écran" },
                { k: "pouce (in)", v: "unité de longueur ; correspond à 2,54 cm, basé sur la taille physique de l'écran" },
                { k: "millimètre (mm)", v: "basé sur la taille physique de l'écran" },
                { k: "point (pt)", v: "1/72 in" },
                { k: "pixel à densité indépendante (dp ou dip)", v: "unité relative se basant sur une taille physique d'écran de 160 dpi. Avec cette unité, 1 dp est égal à 1 pixel sur un écran de 160 pixels. Si la taille de l'écran est différente de 160, les vues s'adaptent selon le ratio entre la taille en pixels de l'écran de l'utilisateur et la référence de 160 pixels par pouce. Avantage : gérer plus facilement une grande variété d'écrans." },
                { k: "pixel à taille indépendante (sp)", v: "fonctionne comme les dp, mais est aussi fonction de la taille de police spécifiée par l'utilisateur. Recommandé pour spécifier les tailles des polices." },
              ],
            },
            {
              type: "p",
              text: "Exemple d'adaptation : un téléphone de 320DP × 360DP vs une tablette de 962DP × 600DP (ou 1280DP × 800DP) — les dp permettent à l'interface de s'adapter aux différentes densités d'écran.",
            },
          ],
        },
        {
          heading: "View et ViewGroup",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "View", v: "Classe de base pour la création d'une interface graphique en Android. Classe mère de tous les widgets (éléments graphiques). Une vue peut être ajoutée à une application : soit statiquement, dans le fichier de description de l'interface (Layout XML), soit dynamiquement dans le code Java de l'application." },
                { k: "ViewGroup", v: "Classe de base de tous les layouts (gestionnaire de dispositions). Layouts = conteneurs invisibles regroupant plusieurs View ou ViewGroup suivant une prédéposition des objets graphiques. Permet de définir l'emplacement de ses fils dans l'écran." },
                { k: "Hiérarchie", v: "View → ViewGroup (FrameLayout, LinearLayout, RelativeLayout…) et → widgets (TextView, EditText, Button, ImageView, ProgressBar…). Exemples : TextView → EditText, Button, CheckedTextView ; ImageView → ImageButton, QuickContactBadge ; ProgressBar → AbsSeekBar → RatingBar, SeekBar ; CompoundButton → CheckBox, RadioButton ; AdapterView → ListView, GridView, Spinner, Gallery." },
              ],
            },
            {
              type: "diagram",
              id: "android-view-tree",
              caption: "Hiérarchie View / ViewGroup : les layouts regroupent les widgets.",
            },
          ],
        },
        {
          heading: "Interfaces graphiques : XML vs Java",
          blocks: [
            {
              type: "p",
              text: "Les interfaces permettent de dessiner la vue telle qu'elle doit s'afficher à l'utilisateur. Deux possibilités de développer des interfaces : code Java ou fichier XML. Android recommande l'utilisation des fichiers XML pour définir les interfaces — séparer la vue du métier. Une interface XML peut être associée à une activité (vue) grâce à la méthode setContentView(identifiant_layout) ; exemple : setContentView(R.layout.login). Widget (View) = éléments graphiques constituant la vue : widgets simples (boutons, champs de saisie, radio, listes…), widgets complexes (datepicker, horloge, barre de progression…). Définition en XML, et implémentation du comportement en Java.",
            },
            {
              type: "kv",
              items: [
                { k: "Emplacement", v: "Placés dans le répertoire res/layout de l'arborescence du projet." },
                { k: "Visualisation dans Android Studio", v: "Sous forme de code XML (onglet Text) ou sous forme graphique (onglet Design) : palette de composants graphiques à glisser-déplacer vers l'emplacement désiré." },
                { k: "Règle", v: "Chaque composant graphique est représenté par un élément XML dont les attributs décrivent l'aspect ou le comportement." },
                { k: "Bonnes pratiques", v: "Utiliser wrap_content, match_parent ou les unités en dp quand on spécifie des dimensions dans un layout XML ; ne pas utiliser des valeurs en pixel ; ne pas utiliser l'AbsoluteLayout (deprecated) ; fournir des ressources alternatives (pour les bitmaps notamment) qui correspondent à des densités d'écran différentes." },
              ],
            },
          ],
        },
        {
          heading: "Les layouts",
          blocks: [
            {
              type: "table",
              headers: ["Layout", "Description"],
              rows: [
                ["AbsoluteLayout (deprecated)", "Position absolue (x et y) — composants placés par positionnement avec android:layout_x et android:layout_y"],
                ["LinearLayout", "Permet d'aligner de gauche à droite ou de haut en bas les éléments qui y sont intégrés (orientation = horizontal / vertical) ; position en colonnes ou en lignes ; deux orientations possibles via android:layout_orientation : vertical (les vues les unes au-dessus des autres) ou horizontal (côte à côte)"],
                ["RelativeLayout", "Les composants sont positionnés les uns par rapport aux autres, le premier composant servant de référence aux autres"],
                ["TableLayout", "Crée un tableau à deux dimensions organisées par colonne et par rangée ; construction ligne par ligne avec TableRow ; layout_span : un widget peut occuper plusieurs cellules ; layout_column : numéro de colonne où se place le widget (0+)"],
                ["GridLayout", "Grille flexible, liste d'éléments continus (de gauche à droite)"],
                ["FrameLayout", "Principalement utilisé pour l'affichage d'un élément (par exemple un cadre dans lequel on veut charger des images) ; utile généralement pour superposer des vues ensembles"],
                ["ScrollView / HorizontalScrollView", "Permet de défiler un contenu trop grand pour tenir sur l'écran"],
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Identifiant", v: "android:id=\"@+id/mon_ident\"" },
                { k: "layout_width / layout_height", v: "\"match_parent\" : l'élément remplit tout l'élément parent ; \"wrap_content\" : prend la place nécessaire à l'affichage" },
                { k: "android:margin", v: "Définit la taille des marges sur les quatre côtés de l'élément (marginTop, marginRight, marginBottom, marginLeft)" },
                { k: "android:background", v: "\"@color/blue\" / \"#0000FF\"" },
                { k: "android:visibility", v: "visible / invisible" },
                { k: "android:layout_gravity", v: "La gravité EXTÉRIEURE de la vue : la direction dans laquelle la vue doit toucher la bordure de son parent. left | center_horizontal | top | bottom | right" },
                { k: "android:gravity", v: "La gravité INTÉRIEURE de la vue : spécifie dans quelle direction son contenu doit s'aligner. left | center_horizontal | top | bottom | right" },
                { k: "android:layout_Padding", v: "Espace entre le texte et les bords : Padding, paddingRight, paddingLeft, paddingTop, paddingBottom" },
                { k: "Android:layout_Margin", v: "Espace autour des bords : layout_margin, layout_marginRight, layout_marginLeft, layout_marginTop, layout_marginBottom" },
                { k: "layout_weight", v: "Change la taille de la zone occupée par chaque composant (distribution) : plus le poids est important, plus le composant prend de la place ; la somme des weights détermine la répartition (ex. somme 6, 5 ou 4)" },
                { k: "Gravity dans LinearLayout", v: "Gestion de l'espace vide : android:gravity organise le contenu à l'intérieur de la vue ; android:layout_gravity organise la position de la vue en dehors d'elle-même" },
              ],
            },
          ],
        },
        {
          heading: "RelativeLayout et exemples XML des layouts",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Principe du RelativeLayout", v: "Placer les éléments selon d'autres éléments du conteneur." },
                { k: "Positionnement relatif au conteneur", v: "android:layout_alignParentTop (true/false) : précise si le haut de l'élément doit être aligné avec celui de son conteneur. De même pour android:layout_alignParentBottom, android:layout_alignParentLeft, android:layout_alignParentRight." },
                { k: "Position relative aux autres éléments", v: "Pour référencer le positionnement d'un élément par rapport à un autre, on dispose d'un moyen simple et efficace : les identifiants id. À la déclaration : android:id=\"@+id/idElem\" ; à l'utilisation : @id/idElem." },
                { k: "android:layout_above", v: "Indique que l'élément sera placé au-dessus de celui indiqué par son id." },
                { k: "android:layout_below", v: "Indique que l'élément sera placé en dessous de celui indiqué par son id." },
                { k: "android:layout_toLeftOf / layout_toRightOf", v: "Indique que l'élément sera placé à gauche / à droite de celui indiqué par son id." },
                { k: "android:layout_alignTop", v: "Indique que le haut de l'élément est aligné avec le haut de l'élément indiqué." },
                { k: "android:layout_alignBottom / alignLeft / alignRight", v: "Indique que le bas / le côté gauche / le côté droit de notre élément est aligné avec celui de l'élément indiqué." },
                { k: "android:layout_alignBaseline", v: "Indique que les lignes de base des 2 éléments sont alignées." },
                { k: "Marges (RelativeLayout)", v: "layout_marginTop, layout_marginLeft, layout_marginBottom, layout_marginRight." },
                { k: "Combinaison de layouts", v: "Un layout peut en contenir d'autres : par exemple un RelativeLayout contenant un LinearLayout (boutons) et un TableLayout (lignes de TableRow avec CheckBox) — les layouts se combinent pour construire des interfaces complexes." },
              ],
            },
            {
              type: "code",
              lang: "xml",
              caption: "Exemples XML : AbsoluteLayout (deprecated), LinearLayout, RelativeLayout, FrameLayout et TableLayout",
              code: '<!-- AbsoluteLayout : placement par positionnement (deprecated) -->\n<AbsoluteLayout android:id="@+id/absoluteLayout"\n    android:layout_width="match_parent" android:layout_height="match_parent">\n  <Button android:id="@+id/button" android:layout_width="wrap_content"\n      android:layout_height="wrap_content" android:text="Button"\n      android:layout_x="80dp" android:layout_y="200dp" />\n</AbsoluteLayout>\n\n<!-- LinearLayout : position en colonnes ou en lignes -->\n<LinearLayout android:layout_width="match_parent"\n    android:layout_height="match_parent" android:gravity="center|top"\n    android:orientation="vertical">\n  <Button android:id="@+id/button3" android:layout_width="wrap_content"\n      android:layout_height="wrap_content" android:text="Button 1" />\n  <!-- ... Button 2 (wrap_content), Button 4 (match_parent) ... -->\n</LinearLayout>\n\n<!-- RelativeLayout : positionnement relatif -->\n<RelativeLayout android:layout_width="match_parent"\n    android:layout_height="match_parent">\n  <Button android:id="@+id/bt1" android:text="button 1"\n      android:layout_alignParentTop="true" android:layout_alignParentRight="true" />\n  <Button android:id="@+id/bt3" android:text="bt3"\n      android:layout_toLeftOf="@id/bt2" android:layout_below="@id/bt2" />\n</RelativeLayout>\n\n<!-- FrameLayout : superposer des vues ensemble -->\n<FrameLayout android:layout_width="match_parent" android:layout_height="match_parent">\n  <ImageView android:id="@+id/imageView" app:srcCompat="@drawable/ist" />\n  <TextView android:id="@+id/textView3" android:text="Frame Layout"\n      android:layout_gravity="center|top" android:textColor="#FF0000"/>\n  <TextView android:id="@+id/textView" android:text="AzS3"\n      android:layout_gravity="center|bottom" android:textColor="#0000FF"/>\n</FrameLayout>\n\n<!-- TableLayout : tableau organisé par colonnes et rangées -->\n<TableLayout android:shrinkColumns="2" android:stretchColumns="2"\n    android:layout_width="match_parent" android:layout_height="match_parent">\n  <TableRow android:id="@+id/tableRow1" android:paddingTop="50dp">\n    <Button android:id="@+id/bt1" android:text="button 1" />\n    <Button android:id="@+id/bt2" android:text="button 2" />\n    <Button android:id="@+id/bt3" android:text="button 3" />\n  </TableRow>\n  <TableRow android:id="@+id/tableRow2">\n    <Button android:id="@+id/button1" android:layout_span="2" />\n  </TableRow>\n</TableLayout>',
            },
          ],
        },
        {
          heading: "Les ressources et la classe R",
          blocks: [
            {
              type: "p",
              text: "Les ressources sont dans le répertoire res. Elles sont organisées dans des répertoires qui contiennent : des images, des chaînes de caractères, des couleurs, des fichiers XML. Le framework Android génère et maintient à jour automatiquement une classe statique R.java qui contient les identifiants (valeurs entières) des ressources. La classe R se trouve dans le dossier app/build/generated mais n'apparaît pas dans l'arborescence de l'IDE. À chaque fois qu'on ajoute une ressource à l'application, un identifiant est généré automatiquement dans cette classe pour permettre de la référencer dans le code des activités. La classe R est final donc elle n'est pas héritable. Toutes les ressources de l'application sont utilisées dans le code à travers la classe statique R : déclarées dans le fichier XML, le fichier associé est déposé dans le répertoire adéquat.",
            },
            {
              type: "kv",
              items: [
                { k: "Identifiants générés", v: "Les identifiants sont générés automatiquement dans la classe R au moment où on les crée. Exemple : création d'un champ de saisie (EditText) avec identifiant prenom → un attribut constant public static final int prenom est défini automatiquement dans la classe id et une valeur lui est attribuée (numéro unique identifiant l'élément EditText ajouté). Cet identifiant permet de manipuler l'élément à partir du code Java avec R.id.prenom." },
                { k: "Syntaxe d'accès", v: "android.R.type_ressource.nom_ressource — par exemple R.layout.activity_main pour le fichier activity_main.xml." },
                { k: "R.drawables.nomImage", v: "Les images sont accessibles par R.drawables.nomImage et correspondent à des fichiers dans le répertoire res/drawable." },
                { k: "R.string.nom", v: "Les noms sont accessibles par R.string.nom et correspondent à des chaînes de caractères dans res/values/strings.xml. On récupère ces noms dans le code par getResources().getString(R.string.nom)." },
                { k: "Accès à un composant", v: "On récupère la valeur de l'attribut android:id = \"@+id/IdentifiantAttribut\". On référence le composant via cet identifiant : findViewById(R.id.IdentifiantAttribut). Exemple : accès à un bouton → Button btn = findViewById(R.id.btn1)." },
              ],
            },
            {
              type: "code",
              lang: "java",
              code: "// [JAVA] setContentView peut prendre l'identifiant d'un layout\npublic class MainActivity extends AppCompatActivity {\n  @Override\n  protected void onCreate(Bundle savedInstanceState) {\n    super.onCreate(savedInstanceState);\n    setContentView(R.layout.activity_main);\n  }\n}\n\n// Une méthode spécifique pour les objets graphiques permet de les récupérer\n// à partir de leur id, et d'agir sur ces instances même si elles ont été créées via XML :\nTextView txt = findViewById(R.id.textel);\ntxt.setText(\"Hello FSM!\");\n\n// Le layout reste modifiable à travers le code Java comme tous les objets graphiques\nLinearLayout l = (LinearLayout) findViewById(R.id.accueilId);\nl.setBackgroundColor(Color.BLACK);\n\n// Le fichier strings.xml (internationalisation)\n// <resources>\n//   <string name=\"app_name\">Application FSM</string>\n//   <string name=\"message\">Bonjour mes Amis!</string>\n// </resources>\nResources res = getResources();\nString hw = res.getString(R.string.message);   // en Java\n// @string/message                              // en XML",
            },
            {
              type: "kv",
              items: [
                { k: "Internationalisation", v: "Le système de ressources permet de gérer très facilement l'internationalisation : créer des répertoires values-XX où XX est le code de la langue (ex. values-es/strings.xml, values-fr/strings.xml) contenant les chaînes traduites associées aux mêmes clés que values/strings.xml. Android chargera le fichier de ressources approprié en fonction de la langue du système." },
                { k: "Autres ressources", v: "les menus (R.menu), les images (R.drawable), des couleurs (R.color) — ex. <color name=\"colorPrimary\">#3F51B5</color>, colorPrimaryDark, colorAccent." },
                { k: "Densités d'images", v: "drawable-hdpi : images pour haute résolution ; drawable-ldpi : basse résolution ; drawable-mdpi : moyenne résolution. icon.png : l'icône de l'application, affichée sur le bureau." },
                { k: "Utilisation des widgets", v: "Pour utiliser un composant graphique, il faut lui associer un id : représenté dans le layout XML par l'attribut android:id, en général sous la forme @+id/nom. « + » : variable particulière, doit être parsée par le parseur XML ; « + » : un identifiant avec la valeur nom_id sera généré et ajouté automatiquement à la classe R. Le fichier R.java contient un ensemble de classes générées automatiquement à partir du répertoire res ; chaque classe représente un ensemble de propriétés utilisables dans le code Java ; fichier généré, ne doit pas être modifié à la main." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "widgets",
      title: "Interfaces graphiques — Widgets et événements",
      summary: "TextView, EditText, ImageView, Button (3 façons de gérer le clic), listeners, CheckBox, RadioButton/RadioGroup, ListView/ArrayAdapter et composants avancés.",
      sections: [
        {
          heading: "TextView, EditText, ImageView",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "TextView", v: "Les labels de texte, sert de zone de texte non éditable. Propriétés importantes : android:text (le texte du TextView), android:typeface (type de police : monospace…), android:textStyle (italique, gras, bold|italic…), android:textColor (couleur d'affichage du texte), android:textSize (taille du texte en « sp »). Les couleurs sont en hexadécimal RGB (#RedGreenBlue : #FF0000 = rouge)." },
                { k: "EditText", v: "Zone de texte éditable. Propriétés : android:text (le texte du EditText), android:inputType (type d'entrée attendu : numberDecimal, numberSigned, phone, date, textEmailAddress, textMultiLine, textPersonName), android:hint (texte à afficher lorsque le composant est vide)." },
                { k: "ImageView", v: "Affiche une image sans interaction. Propriétés : android:src (l'id du drawable), android:scaleType (contrôle comment l'image va être modifiée en fonction de la taille de la vue)." },
                { k: "Autres composants simples", v: "TextView (label), EditText (champ de texte de saisie Email, Number…), CheckBox / RadioButton, Button (gestion des clicks), Calendrier, Progress bar / Rate bar / Seek bar, Toggle Button, ImageView, VideoView, MapView…" },
              ],
            },
            {
              type: "code",
              lang: "xml",
              code: "<!-- TextView en XML -->\n<TextView\n    android:id=\"@+id/txt1\"\n    android:layout_width=\"wrap_content\"\n    android:layout_height=\"wrap_content\"\n    android:text=\"@string/mess\"\n    android:textSize=\"25sp\"\n    android:textColor=\"#990000\" />\n\n<!-- Par programmation [JAVA] -->\nLinearLayout cadre = new LinearLayout(this);\ncadre.setGravity(Gravity.CENTER);\ncadre.setOrientation(LinearLayout.VERTICAL);\nTextView txt = new TextView(this);\ntxt.setText(\"Test de Creation d'Interface\");\ncadre.addView(txt);\nsetContentView(cadre);\n\n<!-- EditText en XML -->\n<EditText\n    android:id=\"@+id/email_address\"\n    android:layout_width=\"match_parent\"\n    android:layout_height=\"wrap_content\"\n    android:hint=\"@string/email_hint\"\n    android:inputType=\"textEmailAddress\" />\n\n<!-- ImageView en XML -->\n<ImageView\n    android:id=\"@+id/imageView\"\n    android:layout_width=\"wrap_content\"\n    android:layout_height=\"wrap_content\"\n    android:layout_gravity=\"center_horizontal\"\n    app:srcCompat=\"@drawable/image\" />",
            },
          ],
        },
        {
          heading: "Button et gestion des événements (3 façons)",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Button", v: "Un bouton qui renvoie un événement lors de l'appui. Peut contenir un texte, une image ou les deux. Propriétés : android:text (le texte du bouton), android:onClick (abonne un listener sur l'événement clic de l'utilisateur), android:drawableLeft (une image à afficher avec les textes à la position souhaitée : Top, Bottom, Left, Right), android:enable (actif ou inactif). ImageButton : bouton image (android:src, android:scaleType)." },
                { k: "Gestion des événements de clic", v: "La gestion des événements de click est réalisée par l'intermédiaire d'un listener. Trois manières de gérer le click d'un Button (définition du comportement) : 1) on associe un call-back sur l'événement CLICK ; 2) à travers l'interface OnClickListener (l'Activity courante s'engage à définir le contenu de la méthode OnClick) ; 3) à travers les attributs événementiels en XML." },
              ],
            },
            {
              type: "code",
              lang: "java",
              code: "// ── 1ère façon : call-back sur l'événement CLICK ──\n// 1. Définir un objet Java de type android.widget.Button\nprivate Button btn;\n// 2. Initialiser cet objet en l'associant à son équivalent dans le fichier XML\nbtn = findViewById(R.id.button1);\n// 3. Définir le comportement de ce bouton\nbtn.setOnClickListener(new View.OnClickListener() {\n  @Override\n  public void onClick(View v) {\n    // ...\n  }\n});\n\n// ── 2ème façon : implémenter l'interface View.OnClickListener ──\n// 1. Définir un objet Java de type android.widget.Button\n// 2. Initialiser cet objet en l'associant à son équivalent dans le fichier XML\n// 3. Implémenter l'interface View.OnClickListener\npublic class MainActivity extends AppCompatActivity implements View.OnClickListener {\n  // 4. Surcharger la méthode onClick (commune à tous les éléments cliquables :\n  //    distinguer le comportement selon l'identifiant de l'élément cliqué)\n  @Override\n  public void onClick(View v) {\n    if (v.getId() == R.id.button1) { /* comportement du bouton */ }\n  }\n  // 5. Définir la classe en cours comme étant le Listener du bouton\n  btn.setOnClickListener(this);\n}\n\n// ── 3ème façon : attribut événementiel en XML ──\n// 1. Dans le layout XML, associer au bouton le nom d'une méthode :\n//      android:onClick=\"onClickHello\"\n// 2. Dans la classe Java de l'activité, créer et implémenter la méthode :\n//    - elle doit retourner void\n//    - elle doit porter le nom défini dans le layout XML\n//    - elle doit définir un paramètre de type android.view.View\npublic void onClickHello(View v) {\n  // comportement du bouton\n}",
            },
            {
              type: "table",
              headers: ["Interface listener", "Événement"],
              rows: [
                ["OnClickListener", "clic"],
                ["OnLongClickListener", "clic long"],
                ["OnDragListener", "glissement"],
                ["OnTouchListener", "touché"],
                ["OnHoverListener", "survol"],
                ["OnKeyListener", "frappe de clavier"],
                ["OnAttachStateChangeListener", "changement de l'attachement"],
                ["OnLayoutChangeListener", "changement du layout"],
                ["OnCreateContextMenuListener", "création du menu contextuel"],
                ["OnFocusChangeListener", "changement du focus"],
                ["OnGenericMotionListener", "un mouvement (mouse, pen, finger…)"],
                ["OnSystemUiVisibilityChangeListener", "changement de la visibilité de la barre d'état"],
              ],
            },
          ],
        },
        {
          heading: "CheckBox, RadioButton et ListView",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Checkbox", v: "Une case à cocher. Propriétés : android:text (le texte de la case), android:checked (spécifie si le composant est coché par défaut). En Java : chk1.setOnClickListener(...) avec chk1.isChecked() pour tester l'état ; on peut aussi interroger plusieurs cases dans un listener commun avec Toast.makeText(MainActivity.this, \"…\", Toast.LENGTH_SHORT).show()." },
                { k: "RadioButton", v: "Un bouton d'option. Propriétés : android:text (le texte de l'option), android:checked (coché par défaut). Un RadioGroup est un groupe de boutons dépendants : pour que les RadioButton soient dépendants, il faut qu'ils soient contenus dans le même groupe." },
                { k: "RadioButton et événements", v: "Deux façons : créer un listener par RadioButton, ou utiliser la même méthode pour tous les RadioButton d'un même RadioGroup — dans la méthode, on sait quel RadioButton appelle grâce à l'attribut View (switch (v.getId()) { case R.id.idop1: … case R.id.idop2: … }). En XML : android:onClick=\"validerRadio\" sur chaque RadioButton." },
                { k: "ListView", v: "Au sein d'un Layout, on peut implanter une liste qu'on pourra dérouler si le nombre d'éléments est important. Pour afficher une liste d'items, il lui faut un adaptateur de données. Au niveau de l'activité principale, on récupère la ListView et lui affecte un adaptateur grâce à la méthode setAdapter ; on ajoute un objet de type ArrayAdapter contenant : une liste de String avec un layout générique de l'item fourni par la plateforme par défaut, et la liste des données. Les mises en page disponibles pour fonctionner avec ArrayAdapter : android.R.layout.simple_list_item_1 (layout simple avec un seul TextView), android.R.layout.simple_list_item_checked, android.R.layout.simple_list_item_multiple_choice." },
                { k: "Composants avancés", v: "VideoView, ProgressBar (barre de progression horizontale, circulaire ; variante avec étoiles de notation : RatingBar), SeekBar (barre de réglage), Rate bar, SearchView (champ de recherche avec proposition de suggestions), WebView, Calendrier, Toggle Button, MapView…" },
              ],
            },
            {
              type: "code",
              lang: "java",
              code: "// ListView + ArrayAdapter\nListView liste = findViewById(R.id.liste);\nString[] chaine = { \"Mahdia\", \"Sousse\", \"Monastir\", \"Sfax\" };\nArrayAdapter<String> arrayAdap = new ArrayAdapter<String>\n    (this, android.R.layout.simple_list_item_checked, chaine);\nliste.setAdapter(arrayAdap);\n\n// CheckBox avec listener\nchk1.setOnClickListener(new View.OnClickListener() {\n  public void onClick(View v) {\n    if (chk1.isChecked()) { /* ... */ } else { /* ... */ }\n  }\n});\n\n// Même méthode pour tous les RadioButton d'un RadioGroup\npublic void validerRadio(View v) {\n  switch (v.getId()) {\n    case R.id.idop1: /* ... */ break;\n    case R.id.idop2: /* ... */ break;\n    default: /* ... */\n  }\n}\n\n<!-- RadioGroup en XML -->\n<RadioGroup\n    android:layout_width=\"wrap_content\"\n    android:layout_height=\"wrap_content\">\n  <RadioButton android:id=\"@+id/id1\" android:text=\"Groupe 1\" ... />\n  <RadioButton android:id=\"@+id/id2\" android:text=\"Groupe 2\" ... />\n</RadioGroup>",
            },
          ],
        },
      ],
    },
    {
      id: "styles",
      title: "Styles, thèmes, menus, Toasts et boîtes de dialogues",
      summary: "Les styles (style.xml), les thèmes appliqués aux layouts, les 3 types de menus avec onCreateOptionsMenu, les Toasts et leurs durées/positions, les boîtes de dialogues modales et AlertDialog.Builder.",
      sections: [
        {
          heading: "Les styles",
          blocks: [
            {
              type: "p",
              text: "Un style est une collection de propriétés qui spécifie le design d'une vue ou d'un élément ; il peut spécifier différentes propriétés : hauteur, largeur, couleur du texte, taille du texte, etc. Un style est défini dans un fichier ressource XML enregistré sous res/values/ avec le nom : style.xml.",
            },
            {
              type: "code",
              lang: "xml",
              caption: "Définition de deux styles dans res/values/style.xml puis application sur les widgets",
              code: '<!-- res/values/style.xml : définition des styles -->\n<style name="monstyle1">\n  <item name="android:layout_width">match_parent</item>\n  <item name="android:layout_height">wrap_content</item>\n  <item name="android:textcolor">@color/red</item>\n  <item name="android:textSize">40sp</item>\n</style>\n\n<style name="monstyle2" parent="Theme.AppCompat.Light">\n  <item name="android:layout_width">match_parent</item>\n  <item name="android:layout_height">wrap_content</item>\n  <item name="android:color">@color/bleu</item>\n  <item name="android:textSize">20sp</item>\n</style>\n\n<!-- Application des deux styles sur les widgets -->\n<TextView style="@style/monstyle1" android:text="Text1"/>\n<TextView style="@style/monstyle2" android:text="Text2"/>',
            },
          ],
        },
        {
          heading: "Les thèmes",
          blocks: [
            {
              type: "p",
              text: "Les thèmes Android sont appliqués sur les Layouts. Autrement dit, c'est un style pour les Layouts. Exemple : dans un Layout, android:layout_[width|height] sont obligatoires — on peut, par exemple, prévoir un thème initialisant l'ensemble de ces valeurs à match_parent, en ajoutant une couleur claire en arrière-plan (background) des Layouts. On commence par créer un style nommé Theme.Custom héritant du thème Android AppTheme.",
            },
            {
              type: "code",
              lang: "xml",
              caption: "Création du thème puis application dans AndroidManifest.xml",
              code: '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n  <style name="Theme.Custom" parent="@android:style/AppTheme">\n    <item name="android:layout_height">match_parent</item>\n    <item name="android:layout_width">match_parent</item>\n    <item name="android:background">@color/claire</item>\n  </style>\n</resources>\n\n<!-- Pour appliquer le thème créé, on ajoute dans le fichier\n     AndroidManifest.xml la ligne suivante : -->\n<application\n    android:icon="@mipmap/ic_launcher"\n    android:label="@string/app_name"\n    android:theme="@style/Theme.Custom">\n  ...\n</application>',
            },
            {
              type: "p",
              text: "À ce niveau, tous les éléments de l'application vont utiliser le même thème. Il est possible de personnaliser quelque élément du thème par des attributs de style.",
            },
          ],
        },
        {
          heading: "Les menus",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Trois types de menus", v: "Option menu : un ensemble d'options principales pour une application, les utilisateurs peuvent sélectionner l'une des options pour effectuer une action. Context Menu : un menu flottant qui s'affiche pour répondre à un appui long (la valeur par défaut est de 500 millisecondes) ; Context Menu peut contenir de nombreux éléments de Menu Item et Sub. Popup menu : un menu flottant, vous pouvez le créer et l'ancrer dans n'importe quelle View ; en termes d'interface et d'utilisation, il n'est pas différent d'un Context Menu." },
                { k: "Placement selon la version d'Android", v: "Les menus sont placés différemment selon la version d'Android : en bas jusqu'à Android 3.2.2 (API <= 13) ; en haut à droite à partir d'Android 4.0.1 (API >= 14)." },
                { k: "Code Java", v: "Les menus peuvent être différents selon les activités. On utilise : la méthode onCreateOptionsMenu et l'objet MenuInflater. Les inflaters sont des objets qui créent des vues à partir de fichiers XML." },
              ],
            },
            {
              type: "code",
              lang: "xml",
              caption: "Il faut créer un fichier res/menu/menu.xml",
              code: '<menu xmlns:android="http://schemas.android.com/apk/res/android"\n    xmlns:app="http://schemas.android.com/apk/res-auto">\n  <item android:id="@+id/m1" android:title="File">\n    <menu>\n      <item android:id="@+id/m11" android:title="new"/>\n      <item android:id="@+id/m12" android:title="open"/>\n      <item android:id="@+id/m13" android:title="save"/>\n    </menu>\n  </item>\n  <item android:id="@+id/m2" android:title="Edit">\n    <menu>\n      <item android:id="@+id/m21" android:title="copier"/>\n      <item android:id="@+id/m22" android:title="couper"/>\n      <item android:id="@+id/m23" android:title="coller"/>\n    </menu>\n  </item>\n  <item android:id="@+id/m3" android:title="Affiche"/>\n</menu>',
            },
            {
              type: "code",
              lang: "java",
              caption: "Charger le menu et gérer le clic sur un item",
              code: '@Override\npublic boolean onCreateOptionsMenu(Menu menu) {\n  MenuInflater inflater = getMenuInflater();\n  inflater.inflate(R.menu.menu, menu);\n  return true;\n}\n\n// Méthode qui se déclenchera au clic sur un item\npublic boolean onOptionsItemSelected(MenuItem item) {\n  switch (item.getItemId()) {\n    case R.id.option:  /* ... */ return true;\n    case R.id.favoris: /* ... */ return true;\n    case R.id.stats:   /* ... */ return true;\n    case R.id.quitter: finish(); return true;\n  }\n  return false;\n}',
            },
          ],
        },
        {
          heading: "Les Toasts",
          blocks: [
            {
              type: "p",
              text: "Android Toast est une petite notification que l'application envoie aux utilisateurs ; elle apparaît près du bas de l'écran (par défaut) et disparaît automatiquement lorsque le temps est écoulé. Il est possible de personnaliser un Toast avec la bibliothèque externe Toasty.",
            },
            {
              type: "code",
              lang: "java",
              code: '// Toast de base\nToast.makeText(this, "Bonjour mes Amis", Toast.LENGTH_SHORT).show();\n// Avec :\n//  - this : le contexte de l\'activity en cours : getapplicationcontext().\n//  - le message à afficher.\n//  - la durée d\'affichage, avec une durée :\n//      Toast.LENGTH_SHORT : 2 secondes.\n//      Toast.LENGTH_LONG  : 5 secondes.\n\n// Toast Position : par défaut, Toast s\'affiche près du bas de l\'écran,\n// centré horizontalement. En utilisant la méthode setGravity(), vous\n// pouvez modifier sa position d\'affichage :\nToast toast = Toast.makeText(MainActivity.this, "This is a message!", Toast.LENGTH_SHORT);\ntoast.setGravity(Gravity.LEFT | Gravity.TOP, 20, 30);\ntoast.show();\n\nToast toast = Toast.makeText(MainActivity.this, "This is a message!", Toast.LENGTH_SHORT);\ntoast.setGravity(Gravity.Right, 20, 30);\ntoast.show();',
            },
          ],
        },
        {
          heading: "Les boîtes de dialogues",
          blocks: [
            {
              type: "p",
              text: "Les boîtes de dialogues avec Android permettent d'afficher des informations en mode modal avec un ensemble de boutons configurables pour interagir avec l'utilisateur. Les boîtes de dialogues héritent de la classe android.app.Dialog. Android fournit des boîtes de dialogues prédéfinies : AlerteDialog (alerte), ProgressDialog (information sur un traitement en cours), DatePickerDialog (choix d'une date), TimePickerDialog (choix d'une heure), et … extends Dialog pour une boîte personnalisée.",
            },
            {
              type: "diagram",
              id: "android-dialog-tree",
              caption: "Hiérarchie des boîtes de dialogue : AlertDialog, ProgressDialog, DatePickerDialog, TimePickerDialog.",
            },
            {
              type: "kv",
              items: [
                { k: "AlertDialog", v: "Sous-classe directe de Dialog : elle a une zone d'en-tête, une zone de contenu et 1, 2 ou 3 boutons. Éléments : icône (setIcon), titre (setTitle), message (setMessage), bouton négatif (setNegativeButton), bouton neutre (setNeutralButton), bouton positif (setPositiveButton)." },
                { k: "Méthodes utiles", v: "dialog.cancel() : permet de fermer la boîte de dialogue affichée ; nom_activity.this.finish() : quitter l'application." },
                { k: "TimePickerDialog", v: "Deux modes d'affichage : Spinner Mode et Clock Mode." },
                { k: "DatePickerDialog", v: "Deux modes d'affichage : Spinner Mode et Calendar Mode." },
                { k: "ProgressDialog", v: "Affiche une information sur un traitement en cours (ex. « Please Wait… — Preparing to download »)." },
              ],
            },
            {
              type: "code",
              lang: "java",
              caption: "Les étapes d'utilisation d'un objet de type AlertDialog",
              code: '// 1. Instanciation d\'un objet de type AlertDialog\nAlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);\n\n// 2. Configuration de l\'objet par le personnalisateur\nbuilder.setIcon(R.mipmap.ic_launcher);                  // icône\nbuilder.setTitle(R.string.Dialogue_titre_erreur);       // titre\nbuilder.setMessage(R.string.Dialogue_msg_erreur);       // message\n\n// 3. Spécification des boutons (positif / négatif / neutre)\nbuilder.setPositiveButton(R.string.Bt_dialog_ok,\n    new DialogInterface.OnClickListener() {\n      public void onClick(DialogInterface dialog, int id) {\n        // Traitement à faire\n      }\n    });\nbuilder.setNegativeButton(R.string.Bt_dialog_ok,\n    new DialogInterface.OnClickListener() {\n      public void onClick(DialogInterface dialog, int id) { /* ... */ }\n    });\nbuilder.setNeutralButton(R.string.Bt_dialog_ok,\n    new DialogInterface.OnClickListener() {\n      public void onClick(DialogInterface dialog, int id) { /* ... */ }\n    });\n\n// 4. Création de l\'objet AlertDialog\nbuilder.create();\n// 5. Affichage\nbuilder.show();',
            },
            {
              type: "cmd",
              commands: [
                { cmd: "Toast.makeText(ctx, msg, Toast.LENGTH_SHORT).show()", desc: "petite notification — LENGTH_SHORT : 2 s, LENGTH_LONG : 5 s" },
                { cmd: "toast.setGravity(Gravity.LEFT | TOP, x, y)", desc: "modifier la position d'affichage du Toast (défaut : bas, centré)" },
                { cmd: "onCreateOptionsMenu(Menu)", desc: "charger le menu : getMenuInflater().inflate(R.menu.menu, menu)" },
                { cmd: "onOptionsItemSelected(MenuItem)", desc: "gérer le clic sur un item : switch (item.getItemId())" },
                { cmd: "AlertDialog.Builder(ctx)", desc: "instancier une boîte de dialogue modale" },
                { cmd: "builder.setIcon(...) / setTitle(...) / setMessage(...)", desc: "configurer l'icône, le titre et le message" },
                { cmd: "builder.setPositiveButton/Negative/Neutral", desc: "spécifier les 1, 2 ou 3 boutons avec DialogInterface.OnClickListener" },
                { cmd: "builder.create() / builder.show()", desc: "créer puis afficher l'AlertDialog" },
                { cmd: "dialog.cancel()", desc: "fermer la boîte de dialogue affichée" },
                { cmd: "nom_activity.this.finish()", desc: "quitter l'application" },
              ],
            },

          ],
        },
      ],
    },
    {
      id: "intents",
      title: "Les Intents",
      summary: "Message de demande d'action, intents explicites (arguments, transmission de données putExtra/getXXXExtra, startActivityForResult et onActivityResult), intents implicites (action, donnée, catégorie, extras, drapeaux), intent filter, URI et actions prédéfinies.",
      sections: [
        {
          heading: "Principe des Intents",
          blocks: [
            {
              type: "p",
              text: "Une application Android peut contenir plusieurs activités : une activité utilise la méthode setContentView pour s'associer avec une interface graphique. Les activités sont indépendantes les unes des autres ; cependant, elles peuvent collaborer pour échanger des données et des actions. Une des activités est appelée l'activité de démarrage : c'est la première à être présentée à l'utilisateur quand l'application est lancée. Le passage d'une activité à une autre est réalisé en demandant à l'activité en cours d'exécuter un Intent.",
            },
            {
              type: "kv",
              items: [
                { k: "Intent", v: "Un Intent est un message qui peut être utilisé pour demander une action à partir d'un autre composant de l'application. Un Intent permet d'invoquer des Activités, des Broadcast Receivers ou des Services." },
                { k: "startActivity (intent)", v: "Lance une activité." },
                { k: "sendBroadcast (intent)", v: "Envoie un intent à tous les composants Broadcast Receivers intéressés." },
                { k: "startService (intent) / bindService (intent, …)", v: "Communiquent avec un service en arrière-plan." },
              ],
            },
          ],
        },
        {
          heading: "Intents explicites",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Définition", v: "Les Intents Explicites spécifient le composant à démarrer par nom de la classe. Ils permettent de démarrer un composant de l'application, car le nom de la classe est connu. Exemple : démarrer une activité en réponse à l'action d'un utilisateur. Un intent explicite cible une activité particulière à lancer." },
                { k: "Les principaux arguments", v: "Le contexte déclenchant l'Intent : en général this, si on le lance à partir de l'activité de départ, ou bien <Activity_class_name>.this. La classe destination (en général <Activity_class_name>.class)." },
                { k: "Appel typique", v: "Intent myActivityIntent = new Intent(<context>, <destination>) ; startActivity(myActivityIntent). Synthèse : Intent myIntent = new Intent(StartClass.this, EndClass.class) ; startActivity(myIntent). Schéma : Intent (contexte, destination, donnée) de Activity 1 vers Activity 2, avec résultats (optionnels) en retour." },
                { k: "Exemple", v: "Activité d'Authentification vers Activité d'Accueil : LOGIN (Ahmed / PASSWORD) —[Login Intent]→ Activity2 (Welcome Ahmed!)." },
              ],
            },
          ],
        },
        {
          heading: "Transmission de données entre activités",
          blocks: [
            {
              type: "code",
              lang: "java",
              caption: "Activité appelante : intent.putExtra(key, value)",
              code: 'btn = findViewById(R.id.btn);\nedtNom = findViewById(R.id.nom);\nedtPrenom = findViewById(R.id.prenom);\n\nbtn.setOnClickListener(new View.OnClickListener() {\n  @Override\n  public void onClick(View v) {\n    Intent myIntent = new Intent(StartClass.this, EndClass.class);\n    myIntent.putExtra("lName", edtNom.getText().toString());\n    myIntent.putExtra("fName", edtPrenom.getText().toString());\n    startActivity(myIntent);\n  }\n});',
            },
            {
              type: "code",
              lang: "java",
              caption: "Activité appelée : intent.getXXXExtra(key) — récupération via la clé pour l'adressage",
              code: 'Intent intentRecup = getIntent();\nString nom = intentRecup.getStringExtra("lName");\nString prenom = intentRecup.getStringExtra("fName");\n\ntxt = findViewById(R.id.txt);\ntxt.setText("Hello " + prenom + " " + nom);',
            },
            {
              type: "kv",
              items: [
                { k: "Intent.putExtra()", v: "Ajouter des données supplémentaires : clé (String) => valeur (types primitifs (int, float…), String, Bundle, …)." },
                { k: "Côté activité appelée", v: "Elle connaît l'intent appelant getIntent(), l'action de l'intent getAction(), la donnée (uri) getData() et les données extras getExtras() : Bundle extras = getIntent().getExtras() ; String valeur = extras.getString(\"clé_envoyée\")." },
                { k: "finish()", v: "finish() fait terminer l'activité courante. L'utilisateur ne pourra pas faire back dessus, car elle disparaît de la pile." },
              ],
            },
          ],
        },
        {
          heading: "Lien bidirectionnel : startActivityForResult",
          blocks: [
            {
              type: "p",
              text: "Il est possible d'établir un lien bidirectionnel entre deux activités grâce à un Intent. Pour recevoir un résultat à partir d'une autre activité, appeler startActivityForResult au lieu de startActivity. L'activité destination doit bien sûr être conçue pour renvoyer un résultat une fois l'opération réalisée. Le résultat est envoyé sous forme d'Intent. L'activité principale le recevra dans la méthode onActivityResult.",
            },
            {
              type: "diagram",
              id: "android-intent-flow",
              caption: "Aller-retour parent/fille : Intent + Bundle aller, traitement, Bundle retour, onActivityResult.",
            },
            {
              type: "code",
              lang: "java",
              caption: "Démarrer une activité avec résultat (activité appelante)",
              code: 'btn.setOnClickListener(new View.OnClickListener() {\n  @Override\n  public void onClick(View v) {\n    Intent myIntent = new Intent(StartClass.this, EndClass.class);\n    myIntent.putExtra("lName", edtNom.getText().toString());\n    myIntent.putExtra("fName", edtPrenom.getText().toString());\n    startActivityForResult(myIntent, ID_Request_Age);\n  }\n});',
            },
            {
              type: "code",
              lang: "java",
              caption: "Récupération de l'Intent + extraction « Bundle Aller », création Bundle Retour (activité appelée)",
              code: 'Intent intentRecup = getIntent();\nString nom = intentRecup.getStringExtra("lName");\nString prenom = intentRecup.getStringExtra("fName");\ntxt.setText("Hello " + prenom + " " + nom);\n\nbtnVal.setOnClickListener(new View.OnClickListener() {\n  @Override\n  public void onClick(View v) {\n    Intent myIntentResult = new Intent();\n    myIntentResult.putExtra("result", edtAge.getText().toString());\n    setResult(RESULT_OK, myIntentResult);\n    finish();\n  }\n});\n\nbtnAnn.setOnClickListener(new View.OnClickListener() {\n  @Override\n  public void onClick(View v) {\n    Intent myIntentResult = new Intent();\n    setResult(RESULT_CANCELED);\n    finish();\n  }\n});',
            },
            {
              type: "code",
              lang: "java",
              caption: "Gestionnaire pour l'interception du résultat retour (activité parent)",
              code: '@Override\nprotected void onActivityResult(int requestCode, int resultCode, Intent data) {\n  super.onActivityResult(requestCode, resultCode, data);\n\n  if (requestCode == ID_Request_Age) {\n    if (resultCode == RESULT_OK)\n      txtAffResult.setText("votre age est " + data.getStringExtra("result"));\n    else\n      txtAffResult.setText("pas de saisie");\n  }\n}',
            },
          ],
        },
        {
          heading: "requestCode, resultCode et erreur ActivityNotFoundException",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "int requestCode", v: "Valeur identifiant quelle activité a appelé la méthode. Cette même valeur a été spécifiée comme paramètre de la méthode startActivityForResult lors du démarrage de la sous-activité." },
                { k: "int resultCode", v: "Représente la valeur de retour envoyée par la sous-activité pour signaler son état à la fin de la transaction. C'est une constante définie dans la classe Activity (RESULT_OK, RESULT_CANCELED, etc.) ou par le développeur." },
                { k: "Erreur ActivityNotFoundException", v: "En cas d'erreur du type ActivityNotFoundException → déclarer l'activité à démarrer dans le fichier de configuration AndroidManifest.xml de l'application. Ne pas oublier de déclarer toutes les activités de votre application dans le Manifest." },
              ],
            },
          ],
        },
        {
          heading: "Intents implicites",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Définition", v: "Les Intents Implicites déclarent une action à réaliser sans nommer un composant spécifique. Le système lancera l'activité la plus apte à satisfaire la requête. Permet à un composant d'appeler un composant d'une autre application. Exemple : montrer à l'utilisateur un emplacement sur une Map." },
                { k: "Nom du composant à démarrer", v: "Premier argument d'un intent implicite." },
                { k: "Action", v: "L'action à réaliser, peut être prédéfinie (ACTION_DIAL, ACTION_VIEW, ACTION_SENDTO, ACTION_PICK, ACTION_CALL…) ou créée par l'utilisateur." },
                { k: "Donnée", v: "URI référencant la donnée sur laquelle l'action va agir, tel que le numéro de téléphone à appeler." },
                { k: "Catégorie", v: "Information supplémentaire sur le type de composants qui va gérer l'intent : CATEGORY-BROWSABLE, CATEGORY-LAUNCHER…" },
                { k: "Extras", v: "Paires clé-valeur qui comportent des informations additionnelles pour réaliser l'action demandée." },
                { k: "Drapeaux (Flags)", v: "Définissent la classe qui fonctionne comme métadonnée pour cet intent. Peuvent indiquer comment lancer une activité, comment la traiter une fois lancée." },
              ],
            },
            {
              type: "p",
              text: "Un intent implicite se comporte comme suit : 1. L'activité A crée un Intent avec une action et le passe en paramètre à startActivity. 2. Le système Android cherche toutes les applications pour trouver un Intent filter qui correspond à cet Intent. 3. Quand une correspondance est trouvée, le système démarre l'activité (Activity B) en invoquant sa méthode onCreate et en lui passant l'intent.",
            },
          ],
        },
        {
          heading: "Intent filter",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Définition", v: "Un intent filter est une expression dans le fichier Manifest d'une application qui spécifie le type d'intents que le composant veut recevoir. Il permet aux autres activités de lancer directement une activité en utilisant une instance de Intent." },
                { k: "Sans intent filter", v: "Si vous ne déclarez pas d'Intent filters à votre activité, elle ne pourra être déclenchée que par un Intent Explicite." },
                { k: "Recommandation de sécurité", v: "Il est recommandé de ne pas déclarer d'Intent Filters pour les services, car cela peut causer des problèmes de sécurité." },
                { k: "Le système choisit", v: "Le système peut choisir le composant le mieux adapté au traitement d'une action. Chaque application peut faciliter « écouter » les Intents dont elle a besoin." },
                { k: "Niveaux de filtrage — action", v: "Identifie le nom de l'Intent. Pour éviter les collisions, il faut utiliser la convention de nommage de Java." },
                { k: "Niveaux de filtrage — category", v: "Permet de filtrer une catégorie d'action (DEFAULT, BROWSABLE, …)." },
                { k: "Niveaux de filtrage — data", v: "Filtre sur les données du message, par exemple en utilisant android:host pour filtrer un nom de domaine particulier ou android:scheme (la partie gauche de l'url)." },
              ],
            },
            {
              type: "code",
              lang: "xml",
              code: '<!-- Filtre du point d\'entrée -->\n<activity android:name=".MainActivity">\n  <intent-filter>\n    <action android:name="android.intent.action.MAIN" />\n    <category android:name="android.intent.category.LAUNCHER" />\n  </intent-filter>\n</activity>\n\n<!-- Filtrage par action, catégories et données -->\n<intent-filter>\n  <action android:name="android.intent.action.VIEW" />\n  <category android:name="android.intent.category.DEFAULT" />\n  <category android:name="android.intent.category.BROWSABLE" />\n  <data android:scheme="http" android:host="ordiciel.ma"/>\n</intent-filter>',
            },
          ],
        },
        {
          heading: "URI, URL et exemples d'intents implicites",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "URI", v: "Uniform Resource Identifier, qui signifie Identifiant de ressource uniforme. Généralise la notion d'URL." },
                { k: "URL", v: "Uniform Resource Locator : une information permettant de localiser un élément. L'adresse d'un site Internet est une URL." },
                { k: "Uri.parse", v: "La méthode Uri.parse permet de créer un objet Uri à partir d'une chaine String." },
              ],
            },
            {
              type: "code",
              lang: "java",
              caption: "Exemples 1 à 5 : téléphone, page internet, géolocalisation, contact, mail",
              code: '// Exemple 1 : appeler un n° de téléphone\nb.setOnClickListener(new OnClickListener() {\n  @Override\n  public void onClick(View v) {\n    Uri telnumber = Uri.parse("tel:0248484000");\n    Intent call = new Intent(Intent.ACTION_DIAL, telnumber);\n    startActivity(call);\n  }\n});\n\n// Exemple 2 : visualiser une page internet\nUri chemin = Uri.parse("http://www.google.fr");\nIntent naviguer = new Intent(Intent.ACTION_VIEW, chemin);\nstartActivity(naviguer);\n\n// Exemple 3 : visualiser une géolocalisation avec latitude/longitude\nString latitude = "31.750996996";\nString longitude = "72.906329708";\nUri uriGeo = Uri.parse("geo:" + latitude + "," + longitude);\nIntent intentGeo = new Intent(Intent.ACTION_VIEW, uriGeo);\nstartActivity(intentGeo);\n\n// Exemple 4 : choisir un contact parmi mon annuaire\n// (StartActivityForResult car une donnée est attendue en retour)\nUri uri = Uri.parse("content://contacts/people");\nIntent intent = new Intent(Intent.ACTION_PICK, uri);\nstartActivityForResult(intent, 2);\n\n// Exemple 5 : envoi d\'un mail — informations supplémentaires via putExtra\nUri uri = Uri.parse("mailto:myemail@gmail.com");\nIntent intent = new Intent(Intent.ACTION_SENDTO, uri);\nintent.putExtra("subject", "my subject");\nintent.putExtra("body", "my message");\nstartActivity(intent);',
            },
            {
              type: "cmd",
              commands: [
                { cmd: "Intent i = new Intent(ctx, Classe.class)", desc: "créer un Intent explicite (contexte + classe destination)" },
                { cmd: "startActivity(i)", desc: "lancer une activité" },
                { cmd: "startActivityForResult(i, code)", desc: "lancer une sous-activité et rester en attente de résultat" },
                { cmd: "setResult(RESULT_OK, i)", desc: "la sous-activité renvoie son code de résultat + données" },
                { cmd: "onActivityResult(req, res, data)", desc: "interception du résultat retour par l'activité parent" },
                { cmd: "i.putExtra(key, value)", desc: "ajouter des données supplémentaires (clé String => valeur)" },
                { cmd: "getIntent().getStringExtra(key)", desc: "côté activité appelée : récupérer l'Intent puis les extras" },
                { cmd: "getIntent().getExtras()", desc: "récupérer toutes les données extras sous forme de Bundle" },
                { cmd: "sendBroadcast(i)", desc: "envoyer un intent à tous les Broadcast Receivers intéressés" },
                { cmd: "startService(i) / bindService(i, conn, flags)", desc: "communiquer avec un service en arrière-plan" },
                { cmd: "finish()", desc: "terminer l'activité courante — elle disparaît de la pile (pas de back)" },
                { cmd: "Uri.parse(chaine)", desc: "créer un objet Uri à partir d'une chaine String" },
                { cmd: "new Intent(Intent.ACTION_DIAL, uri)", desc: "intent implicite : afficher l'interface de composition (préremplie par l'URI)" },
                { cmd: "new Intent(Intent.ACTION_VIEW, uri)", desc: "visualiser l'élément identifié par l'URI (http:, tel:, geo:)" },
                { cmd: "new Intent(Intent.ACTION_PICK, uri)", desc: "choisir un élément (ex. content://contacts/people) — avec startActivityForResult" },
                { cmd: "new Intent(Intent.ACTION_SENDTO, uri)", desc: "envoyer un message au contact défini par l'URI (mailto: + putExtra subject/body)" },
              ],
            },
          ],
        },
        {
          heading: "Actions prédéfinies",
          blocks: [
            {
              type: "table",
              headers: ["Action", "Définition"],
              rows: [
                ["ACTION_ANSWER", "Prendre en charge un appel entrant."],
                ["ACTION_CALL", "Appeler un numéro de téléphone. Cette action lance une activité qui affiche l'interface pour composer un numéro."],
                ["ACTION_DIAL", "Afficher l'interface de composition des numéros. Celle-ci peut être préremplie par les données contenues dans l'URI spécifiée en paramètre."],
                ["ACTION_EDIT", "Éditer une donnée."],
                ["ACTION_SEND", "Envoyer des données texte ou binaire par courriel ou SMS. Les paramètres dépendront du type d'envoi."],
                ["ACTION_SENDTO", "Lancer une activité capable d'envoyer un message au contact défini par l'URI spécifiée en paramètre."],
                ["Action.MAIN", "Activité principale d'une application."],
                ["ACTION_SEARCH", "Démarrer une activité de recherche. L'expression de recherche pourra être spécifiée dans la valeur du paramètre SearchManager.QUERY envoyé en extra de l'action."],
                ["ACTION_VIEW", "Démarrer une action permettant de visualiser l'élément identifié par l'URI spécifiée en paramètre : http: lanceront un navigateur web, celles commençant par tel: lanceront l'interface de composition de numéro et celles débutant par geo: lanceront Google Map."],
                ["ACTION_WEB_SEARCH", "Effectuer une recherche sur Internet avec l'URI spécifiée en paramètre comme requête."],
                ["ACTION_DELETE", "Démarrer une activité permettant de supprimer une donnée identifiée par l'URI spécifiée en paramètre."],
              ],
            },
            {
              type: "table",
              headers: ["Des types d'Intent (caméra)", "Description"],
              rows: [
                ["ACTION_IMAGE_CAPTURE_SECURE", "Il renvoie l'image capturée à partir de la Caméra, lorsque l'appareil photo est sécurisé."],
                ["ACTION_VIDEO_CAPTURE", "Il appelle l'application vidéo existante dans Android pour capturer une vidéo à partir de la Caméra."],
                ["EXTRA_SCREEN_ORIENTATION", "Il sert à régler l'orientation de l'écran en \"vertical\" ou en \"landscape\" (paysage)."],
                ["EXTRA_FULL_SCREEN", "Il sert à contrôler l'interface utilisateur du ViewImage."],
                ["INTENT_ACTION_VIDEO_CAMERA", "Cette intention permet de lancer la Caméra en mode vidéo."],
                ["EXTRA_SIZE_LIMIT", "Il est utilisé pour spécifier la limite de taille de la taille de capture vidéo ou image."],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "services",
      title: "Services et composants avancés",
      summary: "Les services (composants essentiels sans interface, LocalService vs RemoteService), cycle de vie onCreate/onStartCommand/onDestroy, startService/stopService, getSystemService, exemple complet du service de géolocalisation.",
      sections: [
        {
          heading: "Les services",
          blocks: [
            {
              type: "p",
              text: "De même que les Activités et les Intents, les services font partie des composants essentiels d'Android. Ils ne disposent pas d'interface utilisateur et fonctionnent en arrière-plan pour une période de temps indéfinie. Les applications qui s'exécutent fréquemment ou continuellement sans nécessiter une interaction avec l'utilisateur peuvent être implémentées sous la forme d'un service.",
            },
            {
              type: "p",
              text: "Exemples : les applications qui récupèrent des informations (informations, météo, résultats sportifs, etc.) via des flux RSS/Atom. Les flux RSS/Atom sont des formats de données basés sur XML utilisés pour diffuser automatiquement des mises à jour de contenu.",
            },
          ],
        },
        {
          heading: "Types de services et cycle de vie",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Services locaux (LocalService)", v: "Services qui s'exécutent dans le même processus que votre application. Un service Local n'est accessible que par les Activités de l'application." },
                { k: "Services distants (RemoteService)", v: "Ils s'exécutent dans un processus totalement différent de celui de votre application. Un RemoteService peut être sollicité par plusieurs applications différentes." },
                { k: "Durée de vie", v: "Le service n'a pas de durée de vie définie, il fonctionne tant que c'est nécessaire." },
                { k: "Services prédéfinis", v: "Android fournit des services prédéfinis auxquels on peut accéder via la méthode getSystemService()." },
                { k: "Déclaration", v: "Tout autre service doit être déclaré dans le fichier AndroidManifest.xml via <service android:name=\"yourclass\"> </service>." },
                { k: "OnCreate()", v: "Cette méthode est appelée à la création du service et est en général utilisée pour initialiser ce qui sera nécessaire à votre service." },
                { k: "OnStartCommand (Intent i, int flags, int startId)", v: "Le service démarre. Valable uniquement pour les versions du SDK supérieur à 2.0." },
                { k: "OnDestroy()", v: "Appelé à la fermeture du service." },
                { k: "onBind", v: "La méthode onBind sert quand on veut faire communiquer le service avec un autre service, ou avec une activité, etc." },
              ],
            },
            {
              type: "diagram",
              id: "android-service-lifecycle",
              caption: "Cycle de vie d'un service : startService → onCreate → onStartCommand → service running → onDestroy.",
            },
          ],
        },
        {
          heading: "Créer et utiliser un service",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Création", v: "Pour créer un service, il suffit d'implémenter une classe qui hérite de la classe Service : public class MonPremierService extends Service." },
                { k: "Démarrage / arrêt", v: "Une activité peut démarrer un Service via la méthode startService() et le stopper via stopService()." },
              ],
            },
          ],
        },
        {
          heading: "Exemple complet : service de géolocalisation",
          blocks: [
            {
              type: "p",
              text: "Exemple : géolocalisation du téléphone. Créer un service qui affichera un toast contenant les coordonnées du téléphone ; le toast s'affichera quand les coordonnées seront mises à jour. On commence par créer une interface qui contient un bouton : quand on clique sur le bouton, un toast s'affiche et nous indique les coordonnées du téléphone.",
            },
            {
              type: "code",
              lang: "xml",
              caption: "Création de l'interface (bouton « Lancer le Service de Géolocalisation »)",
              code: '<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"\n    xmlns:app="http://schemas.android.com/apk/res-auto"\n    xmlns:tools="http://schemas.android.com/tools"\n    android:layout_width="match_parent"\n    android:layout_height="match_parent"\n    android:gravity="center"\n    tools:context=".HomeActivity">\n\n  <Button\n      android:layout_width="wrap_content"\n      android:layout_height="wrap_content"\n      android:text="Lancer le Service de Géolocalisation"\n      android:id="@+id/btnVal" />\n</LinearLayout>',
            },
            {
              type: "code",
              lang: "java",
              caption: "Dans la classe de l'activité principale (HomeActivity) : récupérer l'id du bouton, créer un listener, démarrer le service au clic",
              code: 'btnValider = findViewById(R.id.btnVal);\n\nbtnValider.setOnClickListener(new View.OnClickListener() {\n  @Override\n  public void onClick(View v) {\n    Intent serviceIntent = new Intent(MainActivity.this, MyService.class);\n    startService(serviceIntent);\n  }\n});',
            },
            {
              type: "code",
              lang: "java",
              caption: "Créer la classe service MyService : elle hérite de la classe Service, avec une instance de LocationListener pour récupérer les nouvelles coordonnées",
              code: 'public class MyService extends Service {\n  private LocationManager locationMgr = null;\n  private LocationListener onLocationChange = new LocationListener() { /* ... */ };\n\n  // Dans le onCreate, s\'abonner au changement de géolocalisation\n  // à travers le service de localisation :\n  public void onCreate() {\n    locationMgr = (LocationManager) getSystemService(Context.LOCATION_SERVICE);\n    locationMgr.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 10000, 0,\n        onLocationChange);\n\n    locationMgr.requestLocationUpdates(LocationManager.GPS_PROVIDER, 10000, 0,\n        onLocationChange);\n  }\n\n  // Dans la méthode OnLocationChanged, afficher les coordonnées :\n  public void onLocationChanged(Location location) {\n    double latitude = location.getLatitude();\n    double longitude = location.getLongitude();\n    Toast.makeText(MyService.this,\n        "voici les coordonées de votre telephone " + latitude + " " + longitude,\n        Toast.LENGTH_SHORT).show();\n  }\n}',
            },
            {
              type: "kv",
              items: [
                { k: "requestLocationUpdates (String, long, float, LocationListener)", v: "Cette méthode possède 4 arguments : le provider utilisé pour recevoir les mises à jour des coordonnées utilisateurs (GPS / NETWORK…), un intervalle minimum entre deux notifications (en millisecondes), un intervalle minimum entre deux notifications (en mètre), et l'instance de votre LocationListener." },
              ],
            },
            {
              type: "code",
              lang: "xml",
              caption: "Déclarer le service dans AndroidManifest.xml (partie Application) et ses permissions",
              code: '<service android:name=".MyService"/>\n\n<!-- Et les permissions de ce service : -->\n<uses-permission android:name="android.permission.INTERNET"/>\n<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>\n<uses-permission android:name="android.permission.LOCATION"/>\n<uses-permission android:name="android.permission.ACCESS_GPS"/>',
            },
            {
              type: "cmd",
              commands: [
                { cmd: "class MonService extends Service", desc: "créer un service : implémenter une classe qui hérite de la classe Service" },
                { cmd: "startService(intent)", desc: "démarrer un service depuis une activité" },
                { cmd: "stopService()", desc: "stopper le service" },
                { cmd: "onCreate()", desc: "appelée à la création du service : initialisation" },
                { cmd: "onStartCommand(i, flags, startId)", desc: "le service démarre — valable uniquement pour SDK > 2.0" },
                { cmd: "onDestroy()", desc: "appelé à la fermeture du service" },
                { cmd: "onBind(intent)", desc: "faire communiquer le service avec un autre service ou une activité" },
                { cmd: "getSystemService(Context.LOCATION_SERVICE)", desc: "accéder aux services prédéfinis d'Android" },
                { cmd: "requestLocationUpdates(provider, ms, m, listener)", desc: "4 arguments : provider (GPS/NETWORK), intervalle min (ms), intervalle min (m), LocationListener" },
                { cmd: "<service android:name=\".MyService\"/>", desc: "déclarer le service dans AndroidManifest.xml (partie Application)" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "tp",
      title: "Travaux Pratiques (TP1 · TP2 · TP3)",
      summary: "TP1 : installation d'Android Studio, première application, AVD, Toast, LogCat, formulaires et écouteurs. TP2 : callbacks du cycle de vie, application multi-widgets, values/colors/dimensions et internationalisation. TP3 : calcul de la moyenne générale avec Spinner, RadioGroup et mentions.",
      sections: [
        {
          heading: "TP1 — Installation et première application",
          blocks: [
            {
              type: "p",
              text: "Objectifs du TP : l'installation et la configuration des outils qui vont être utilisés tout au long du module, la découverte d'une première application Android, le développement d'une application Android simple. Les TPs sont rédigés pour être utilisés avec Android Studio.",
            },
            {
              type: "kv",
              items: [
                { k: "A. Installation sur machine personnelle", v: "Télécharger Android Studio (https://developer.android.com/studio) pour votre système d'exploitation. Sous Windows ou MacOS : double-cliquer sur le fichier téléchargé. Sous Linux : décompresser l'archive puis lancer le studio via le script androidstudio/bin/studio.sh. Avancer dans le wizard : choisir une installation « Custom », avec comme thème IntelliJ, et sélectionner tous les composants à installer. À la fin du wizard, choisir « Configure/SDK Manager » : par défaut l'API installée est la plus récente (API 35) — installer également l'API 27 afin de pouvoir installer nos applications sur un maximum de plateformes utilisées actuellement, et en particulier nos tablettes." },
                { k: "B. Environnement — JRE / JDK", v: "Définir le JRE et le JDK ; quelle version du JDK est disponible sur votre machine ?" },
                { k: "B. Environnement — SDK", v: "Le SDK (Software Development Kit) est une API Java offrant un ensemble de classes pour le développement d'applications Android. En constante évolution, il existe différentes versions, chacune étant compatible avec les versions précédentes (dans la majorité des cas). Une application destinée au grand public doit être compatible avec les versions les plus utilisées au moment de sa diffusion, afin d'atteindre le plus large public possible : en plus d'utiliser une API récente, on choisit également une version plus ancienne." },
                { k: "C. Première application", v: "Choisir « File > New Project » ; choisir comme cible « Empty Views Activity » ; choisir le nom (ex. « TP0 ») et l'emplacement ; choisir Java comme langage de développement ; choisir l'API 27 (Oreo 8.1) comme SDK minimum." },
                { k: "D. Création d'un émulateur", v: "Un émulateur sert à émuler un appareil Android particulier, afin de développer une application pour divers types d'appareils (téléphone ou tablettes, avec différentes tailles d'écran…) sans avoir besoin de tous les posséder. Cliquer sur l'icône « AVD Manager » (Android Virtual Device), choisir « Create Virtual Device… », puis choisir parmi les phones l'architecture prédéfinie la plus proche de votre téléphone (ou à défaut, un Nexus 5X), et lancer l'émulateur." },
              ],
            },
            {
              type: "kv",
              items: [
                { k: "E. Découverte — répertoire app", v: "Trois sous-répertoires : le répertoire manifests contient les fichiers décrivant l'architecture de l'application ; le répertoire java contient les fichiers source Java ; le répertoire res contient tout ce qui a trait à l'interface graphique de l'application." },
                { k: "AndroidManifest.xml (TP1)", v: "Il décrit l'architecture de l'application : son nom, son thème, les activités qu'elle contient (il n'y en a pour l'instant qu'une). Ce fichier doit être édité lorsqu'on ajoute de nouvelles activités, à la main ou automatiquement via les fonctionnalités d'Android Studio." },
                { k: "MainActivity.java (TP1)", v: "Classe Java implantant l'activité, contenant la méthode onCreate. Cette méthode est appelée à la création de l'activité. Un de ses rôles est de démarrer l'interface graphique, via l'appel à la méthode setContentView." },
                { k: "activity_main.xml (TP1)", v: "Décrit l'interface graphique de l'activité. Deux vues : l'onglet « Split » ou « code » affiche le XML décrivant les couches de l'interface et une prévisualisation (on peut choisir différents appareils, notamment notre émulateur) ; l'onglet « Design » affiche la prévisualisation et permet d'ajouter des éléments par glisser-déposer." },
                { k: "strings.xml (TP1)", v: "L'interface contient une couche de type RelativeLayout contenant un TextView « Hello world! » — la chaîne est en réalité définie dans la variable @string/hello_world. Cette variable est définie dans le fichier strings.xml du répertoire res/values, ainsi que le nom de l'application et une variable contenant l'unique élément du menu actuel. Définir ainsi des variables contenant les chaînes de caractères permet de gérer facilement les différentes localisations de l'application (version anglaise, française, etc.)." },
              ],
            },
            {
              type: "list",
              items: [
                "Exercice 1 : afficher « This is my first Android app. » au lieu de « Hello world! », en choisissant « Linear Layout » comme gestionnaire de présentation.",
                "Exercice 2 : développer une application affichant « Soyez les bienvenus à l'FSM » — modifier la police du texte, centrer le texte, modifier la couleur de fond, la couleur de la police, la taille du texte, et ajouter un bouton de commande « Valider ».",
                "Exercice 3 : ajouter un Toast affiché en bas de l'activité : Toast.makeText(this, \"Bonjour mes Amis\", Toast.LENGTH_LONG).show();",
                "Exercice 4 : ajouter un message dans la fenêtre LogCat et le localiser après exécution — exemple : Log.i(\"Test\", \"salut...!!!\");",
                "Exercices 5 et 6 : développer les formulaires des figures 2 et 3 (page 4) en utilisant le XML.",
                "Exercice 7 : le formulaire invite l'utilisateur à saisir son nom ; en appuyant sur Valider, la dernière zone de texte affiche « bonjour » suivi du nom de l'utilisateur, plus un Toast en bas signalant « c'est ok » ; le clic sur « Quitter » ferme l'application.",
              ],
            },
            {
              type: "kv",
              items: [
                { k: "F. Attribution d'écouteurs aux boutons — possibilité 1", v: "Définir l'attribut android:onClick et créer une méthode dans l'activité concernée." },
                { k: "F. Attribution d'écouteurs — possibilité 2", v: "Définir l'activité elle-même en tant qu'écouteur : éditer onCreate et ajouter Button btn1 = findViewById(R.id.btn1); btn1.setOnClickListener(this);. Cela consiste à attribuer this en tant qu'écouteur des clics sur le bouton. Android Studio signalera que l'activité this n'est pas un écouteur correct : il suffit qu'elle implémente l'interface OnClickListener. Android Studio signalera ensuite qu'il manque la méthode exigée par l'interface : onClick(View v) — son paramètre est une vue v de type général View, mais en réalité ce sera un Button." },
              ],
            },
          ],
        },
        {
          heading: "TP2 — Cycle de vie et application multi-widgets",
          blocks: [
            {
              type: "p",
              text: "Objectifs du TP : présenter le cycle de vie d'une Activity avec manipulation des callbacks, développement d'une application Android multi-widgets, familiarisation avec les values, dimensions, colors et l'internationalisation. Créer un nouveau projet Android nommé GLSI3_votre_groupe.",
            },
            {
              type: "kv",
              items: [
                { k: "onCreate()", v: "Appelée à la création d'une activité (Activity). Elle permet de l'initialiser. C'est ici que l'interface graphique est spécifiée." },
                { k: "onStart()", v: "Appelée quand l'application est démarrée." },
                { k: "onResume()", v: "Appelée quand l'application passe (ou repasse) en avant-plan." },
                { k: "onPause()", v: "Appelée quand l'application passe en arrière-plan et qu'une autre application se met devant." },
                { k: "onStop()", v: "Appelée quand l'application n'est plus visible." },
                { k: "onRestart()", v: "Appelée quand l'application redevient visible." },
                { k: "onDestroy()", v: "Appelée quand votre application est fermée par le système à cause d'un manque de ressources, ou par l'utilisateur à l'utilisation d'un finish(). Toutes les données non sauvegardées sont perdues." },
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: "Astuce TP2",
              text: "Pour générer ces méthodes, commencer à taper le nom de la méthode dans le fichier de code, puis taper sur les touches Ctrl+Espace. Travail demandé : générer les méthodes correspondant à chacun des évènements du cycle de vie ; chaque méthode affichera son nom à travers un Toast.",
            },
            {
              type: "list",
              items: [
                "Exercice 2 (multi-widgets) : créer le formulaire en XML — les champs Nom et Prénom doivent accepter uniquement du texte ; les champs jj et mm (jour et mois de la date de naissance) uniquement deux chiffres ; le champ aaaa (année) uniquement quatre chiffres ; les filières Phy3 et Chimi3 comportent chacune deux groupes, tandis que la filière GLSI3 en comporte trois.",
                "Utiliser le fichier strings.xml pour stocker tous les titres, sous-titres et hints, afin de faciliter l'internationalisation de l'application.",
                "Utiliser le fichier colors.xml pour standardiser les couleurs des widgets : par exemple, bleu foncé pour les sous-titres et bleu pour les champs de saisie.",
                "Ajouter un fichier dimensions.xml pour uniformiser les tailles des éléments : par exemple, 25sp pour les sous-titres, 20sp pour le texte des boutons, 40sp pour le titre, etc.",
                "Créer des dictionnaires pour les trois langues : Arabe, Anglais et Français.",
                "Programmer les événements de clic : le bouton Valider affiche les informations saisies dans la zone d'affichage ; le bouton RAZ réinitialise les champs de saisie ; le bouton Quitter ferme l'application.",
              ],
            },
          ],
        },
        {
          heading: "TP3 — Calcul de la moyenne générale",
          blocks: [
            {
              type: "p",
              text: "Objectif : apprendre à créer une application Android permettant de calculer la moyenne générale d'un étudiant à partir de ses notes, de sélectionner sa spécialité et le type d'évaluation, puis d'afficher le résultat avec une mention correspondante. Ce TP permet de pratiquer : la récupération de valeurs saisies dans des EditText, l'utilisation d'un Spinner pour sélectionner une option, l'utilisation d'un RadioGroup et des RadioButton pour choisir un type, l'affichage dynamique dans un TextView, la gestion des boutons (Calculer, Effacer, Quitter) et des Toast.",
            },
            {
              type: "list",
              items: [
                "Interface graphique : trois champs EditText pour saisir les notes (Note 1, Note 2, Note 3) ; un Spinner pour choisir la spécialité (GLSI, CHIM, PHY) ; un RadioGroup avec deux RadioButton pour le type d'évaluation (Normal ou Rattrapage) ; trois boutons Calculer, Effacer et Quitter ; un TextView pour afficher le résultat ; ajouter un titre et un séparateur graphique pour améliorer l'interface.",
                "Calculer la moyenne : lire les trois notes saisies, calculer la moyenne arithmétique, déterminer la mention selon la moyenne, ajouter le statut Admis/Refusé selon si la moyenne est >= 10 ou non, puis afficher dans le TextView le résultat complet : spécialité, type d'évaluation, moyenne, mention et statut.",
                "Effacer : réinitialiser tous les champs et le TextView, afficher un Toast confirmant la réinitialisation.",
                "Quitter : fermer l'application.",
                "Gestion des erreurs : vérifier que toutes les notes sont saisies et numériques ; afficher un Toast si une note est manquante ou incorrecte.",
              ],
            },
            {
              type: "table",
              headers: ["Moyenne", "Mention"],
              rows: [
                ["< 10", "Insuffisant"],
                ["10 ≤ moyenne < 12", "Passable"],
                ["12 ≤ moyenne < 14", "Assez Bien"],
                ["14 ≤ moyenne < 16", "Bien"],
                ["≥ 16", "Très Bien"],
              ],
            },
            {
              type: "list",
              items: [
                "Étapes suggérées : 1. définir le layout XML avec ScrollView et LinearLayout ; 2. ajouter les composants (EditText, Spinner, RadioGroup, Buttons, TextView) ; 3. lier les composants dans MainActivity.java avec findViewById ; 4. implémenter les listeners pour chaque bouton : OnClickListener ; 5. implémenter les méthodes calculerMoyenne() et effacerChamps() ; 6. tester l'application sur un émulateur ou un vrai appareil.",
              ],
            },
          ],
        },
      ],
    },
  ],

  quiz: [
    { id: "an1", chapter: "ui", question: "Quelle unité est recommandée pour spécifier les tailles des polices ?", options: ["px", "dp", "sp", "pt"], correct: 2, explanation: "Le sp (pixel à taille indépendante) fonctionne comme les dp mais est aussi fonction de la taille de police spécifiée par l'utilisateur — recommandé pour les polices." },
    { id: "an2", chapter: "ui", question: "À quoi correspond 1 dp ?", options: ["1 pixel sur un écran de 160 dpi", "1 centimètre", "1/72 in", "2,54 cm"], correct: 0, explanation: "Le dp (densité indépendante) se base sur un écran de 160 dpi : 1 dp = 1 pixel sur un écran de 160 pixels ; les vues s'adaptent sinon selon le ratio." },
    { id: "an3", chapter: "ui", question: "Qu'est-ce que la classe View en Android ?", options: ["Un gestionnaire de fichiers", "La classe de base pour la création d'une interface graphique, classe mère de tous les widgets", "Une base de données", "Un thread"], correct: 1, explanation: "View est la classe de base de toute interface graphique Android et la classe mère de tous les widgets. Une vue peut être ajoutée statiquement (XML) ou dynamiquement (Java)." },
    { id: "an4", chapter: "ui", question: "Qu'est-ce qu'un ViewGroup ?", options: ["Un widget simple", "La classe de base de tous les layouts : conteneurs invisibles regroupant des View/ViewGroup", "Une activité", "Un bouton"], correct: 1, explanation: "ViewGroup = classe de base des layouts (gestionnaires de dispositions) : conteneurs invisibles regroupant des vues selon une prédéposition, définissant l'emplacement des fils." },
    { id: "an5", chapter: "ui", question: "Quelle méthode associe une interface XML à une activité ?", options: ["setView()", "setContentView(identifiant_layout) — ex. setContentView(R.layout.login)", "attachLayout()", "renderLayout()"], correct: 1, explanation: "setContentView(R.layout.xxx) associe l'interface XML à l'activité. Android recommande le XML pour définir les interfaces (séparer la vue du métier)." },
    { id: "an6", chapter: "ui", question: "Quel layout est DEPRECATED ?", options: ["LinearLayout", "RelativeLayout", "AbsoluteLayout (position absolue x et y)", "FrameLayout"], correct: 2, explanation: "AbsoluteLayout (positionnement absolu android:layout_x/y) est deprecated — une des bonnes pratiques est de ne pas l'utiliser." },
    { id: "an7", chapter: "ui", question: "Quel layout aligne les éléments de gauche à droite ou de haut en bas ?", options: ["LinearLayout (orientation horizontal/vertical)", "TableLayout", "GridLayout", "FrameLayout"], correct: 0, explanation: "LinearLayout aligne les éléments via android:layout_orientation : vertical (les unes au-dessus des autres) ou horizontal (côte à côte)." },
    { id: "an8", chapter: "ui", question: "Quel layout superpose des vues ensembles ?", options: ["FrameLayout", "ScrollView", "TableLayout", "LinearLayout"], correct: 0, explanation: "FrameLayout est principalement utilisé pour l'affichage d'un élément (un cadre pour charger des images) et généralement pour superposer des vues." },
    { id: "an9", chapter: "ui", question: "Quelle est la différence entre android:gravity et android:layout_gravity ?", options: ["gravity = gravité INTÉRIEURE (alignement du contenu) ; layout_gravity = gravité EXTÉRIEURE (position de la vue dans son parent)", "C'est pareil", "gravity pour les images, layout_gravity pour le texte", "layout_gravity est deprecated"], correct: 0, explanation: "android:layout_gravity : direction dans laquelle la vue touche la bordure de son parent. android:gravity : direction d'alignement du contenu de la vue. Valeurs : left | center_horizontal | top | bottom | right." },
    { id: "an10", chapter: "ui", question: "Que fait l'attribut layout_weight ?", options: ["Change la taille de la zone occupée par chaque composant (distribution)", "Ajoute une marge", "Cache la vue", "Définit la police"], correct: 0, explanation: "layout_weight change la taille de la zone occupée par chaque composant : plus le poids est important, plus le composant prend de la place (somme des weights : 6, 5, 4…)." },
    { id: "an11", chapter: "ui", question: "Dans un layout XML, que signifie \"match_parent\" ?", options: ["L'élément prend la place nécessaire à l'affichage", "L'élément remplit tout l'élément parent", "L'élément est caché", "L'élément est centré"], correct: 1, explanation: "match_parent : l'élément remplit tout l'élément parent. wrap_content : prend la place nécessaire à l'affichage." },
    { id: "an12", chapter: "ui", question: "Où sont placés les fichiers de layout XML ?", options: ["res/layout", "src/layout", "assets/xml", "res/values"], correct: 0, explanation: "Les interfaces XML sont placées dans le répertoire res/layout de l'arborescence du projet." },
    { id: "an13", chapter: "ui", question: "Qu'est-ce que la classe R.java ?", options: ["Un fichier à modifier à la main", "Classe statique générée et maintenue automatiquement par le framework, contenant les identifiants (entiers) des ressources", "Une activité de base", "Le manifeste"], correct: 1, explanation: "R.java : classe statique générée automatiquement (dans app/build/generated), contient les identifiants de toutes les ressources ; final (non héritable) ; ne doit pas être modifiée à la main." },
    { id: "an14", chapter: "ui", question: "Comment accède-t-on au composant EditText d'identifiant prenom depuis le code Java ?", options: ["R.id.prenom via findViewById", "prenom.getText()", "R.java.prenom", "resource('prenom')"], correct: 0, explanation: "L'identifiant génère un attribut public static final int prenom dans la classe id : on manipule l'élément avec R.id.prenom via findViewById." },
    { id: "an15", chapter: "ui", question: "Comment gère-t-on l'internationalisation avec Android ?", options: ["Un fichier par application", "Des répertoires values-XX (ex. values-fr, values-es) contenant strings.xml avec les chaînes traduites, mêmes clés", "Un dictionnaire en ligne", "Impossible"], correct: 1, explanation: "On crée des répertoires values-XX où XX est le code de la langue, avec des fichiers strings.xml traduits (mêmes clés). Android charge le fichier approprié selon la langue du système." },
    { id: "an16", chapter: "ui", question: "À quoi servent les répertoires drawable-hdpi, drawable-ldpi, drawable-mdpi ?", options: ["Stockent les images pour les différentes résolutions (haute, basse, moyenne)", "Stockent les layouts", "Stockent les polices", "Stockent les tests"], correct: 0, explanation: "Ces répertoires contiennent les images/bitmaps pour chaque densité d'écran. Bonne pratique : fournir des ressources alternatives correspondant aux densités différentes." },
    { id: "an17", chapter: "ui", question: "Quelle est la signification de l'attribut android:hint sur un EditText ?", options: ["L'indice de tri", "Texte à afficher lorsque le composant est vide", "Le texte par défaut sauvegardé", "Un commentaire"], correct: 1, explanation: "android:hint : texte affiché lorsque le champ est vide. android:inputType définit le type d'entrée (textEmailAddress, numberDecimal, phone…) ; android:text le texte du champ." },
    { id: "an18", chapter: "widgets", question: "Quelle propriété définit la taille du texte d'un TextView ?", options: ["android:textSize (en sp)", "android:font", "android:size", "android:height"], correct: 0, explanation: "android:textSize définit la taille du texte en « sp ». android:textStyle (bold/italic), android:typeface (police), android:textColor (couleur hexadécimale RGB)." },
    { id: "an19", chapter: "widgets", question: "Quelles sont les 3 façons de gérer le clic d'un Button ?", options: ["Call-back sur l'événement CLICK ; implémenter l'interface OnClickListener ; attribut android:onClick en XML", "Uniquement via le XML", "Uniquement en Java", "Avec un thread"], correct: 0, explanation: "3 manières : 1) associer un call-back (setOnClickListener avec new View.OnClickListener), 2) implémenter View.OnClickListener dans l'activité (onClick + setOnClickListener(this)), 3) android:onClick=\"nomMethode\" en XML." },
    { id: "an20", chapter: "widgets", question: "Dans la 3ème façon (android:onClick), la méthode Java doit…", options: ["retourner void, porter le nom défini dans le XML, et définir un paramètre de type android.view.View", "être privée et statique", "retourner un String", "être dans le fichier XML"], correct: 0, explanation: "Contraintes : la méthode retourne void, porte le nom défini dans le layout XML, et prend un paramètre android.view.View." },
    { id: "an21", chapter: "widgets", question: "Quel listener correspond au « clic long » ?", options: ["OnClickListener", "OnLongClickListener", "OnTouchListener", "OnKeyListener"], correct: 1, explanation: "OnLongClickListener = clic long. Autres : OnDragListener (glissement), OnTouchListener (touché), OnHoverListener (survol), OnKeyListener (frappe clavier), OnFocusChangeListener (focus)…" },
    { id: "an22", chapter: "widgets", question: "Quelle est la différence entre CheckBox et RadioButton ?", options: ["Aucune", "CheckBox : case à cocher indépendante ; RadioButton : bouton d'option, dépendant au sein d'un même RadioGroup", "RadioButton est plus rapide", "CheckBox ne peut pas être cochée"], correct: 1, explanation: "Checkbox = case à cocher (android:text, android:checked). RadioButton = bouton d'option ; pour qu'ils soient dépendants (un seul choisi), ils doivent être dans le même RadioGroup." },
    { id: "an23", chapter: "widgets", question: "Que faut-il pour afficher une liste d'items dans une ListView ?", options: ["Rien", "Un adaptateur de données (ArrayAdapter) affecté avec setAdapter", "Un thread", "Une base SQLite obligatoire"], correct: 1, explanation: "La ListView a besoin d'un adaptateur de données : on crée un ArrayAdapter (liste de String + layout générique de l'item) et on l'affecte avec setAdapter." },
    { id: "an24", chapter: "widgets", question: "Quels layouts d'items prédéfinis fonctionnent avec ArrayAdapter ?", options: ["simple_list_item_1, simple_list_item_checked, simple_list_item_multiple_choice", "linear_layout_item", "grid_item", "card_view"], correct: 0, explanation: "Android fournit android.R.layout.simple_list_item_1 (un seul TextView), simple_list_item_checked et simple_list_item_multiple_choice pour ArrayAdapter." },
    { id: "an25", chapter: "widgets", question: "Quel composant affiche une barre de notation avec des étoiles ?", options: ["SeekBar", "RatingBar", "ProgressBar", "SearchView"], correct: 1, explanation: "RatingBar = variante de la ProgressBar avec étoiles de notation. SeekBar = barre de réglage. SearchView = champ de recherche avec suggestions." },
    { id: "an26", chapter: "intro", question: "Un système d'exploitation mobile est conçu spécialement pour…", options: ["Les serveurs d'entreprise", "Les systèmes mobiles : Smartphones, PDA, Tablette, Notebook, minipc, réveil et terminaux mobiles", "Uniquement les ordinateurs de bureau", "Les mainframes"], correct: 1, explanation: "Un OS mobile est conçu spécialement pour les systèmes mobiles et offre : gestion d'alimentation (batterie), gestion mémoire (RAM), gestion sans fil (wifi, bluetooth, 3G, 4G), connectivités (USB, HDMI), stockage (SD-CARD) et exécution de plusieurs applications." },
    { id: "an27", chapter: "intro", question: "Quel est le principal concurrent d'Android en parts de marché (mars/20 : 71.859 % vs 27.476 %) ?", options: ["Symbian OS", "iOS (iPhone, iPad)", "BlackBerry OS", "Web OS"], correct: 1, explanation: "Les principaux concurrents : Android (71.859 %), iOS (27.476 %), KaiOS, Samsung, Windows, Tizen, BlackBerry OS, Linux. iOS est le deuxième. Bada (Samsung) existe aussi — même si Samsung utilise aussi Android." },
    { id: "an28", chapter: "intro", question: "Une application mobile native est…", options: ["Une application exécutée dans un navigateur", "Une application développée spécifiquement pour une plateforme précise", "Une application web packagée", "Un site web responsive"], correct: 1, explanation: "Le développement natif : application développée spécifiquement pour une plateforme précise — une application iPhone ne fonctionne pas sur Android et vice versa. Chaque plateforme a ses propres outils et langages ; exploitation maximale des fonctionnalités du dispositif mobile." },
    { id: "an29", chapter: "intro", question: "Quels langages pour le développement natif (BUILD) ?", options: ["Java/Kotlin (Android), Objective-C/Swift (iOS), C#/.Net (Windows)", "HTML5/CSS/JS uniquement", "PHP et Python", "XML uniquement"], correct: 0, explanation: "BUILD natif : Java/Kotlin pour Android, Objective-C/Swift pour iOS, C#/.Net pour Windows. DEPLOY : Android, iOS, Windows." },
    { id: "an30", chapter: "intro", question: "Citer deux avantages du développement natif :", options: ["Coût réduit et code unique", "Accès total et performant aux ressources matérielles ; code plus rapide, sécurisé, stable et optimisé", "Pas besoin d'environnement de développement", "Fonctionne sans installation"], correct: 1, explanation: "Avantages du natif : design respectant chaque plateforme ; accès total et performant aux ressources matérielles (caméra, photo, microphone, géolocalisation, stockage, agenda, contacts) ; code généré plus rapide, plus sécurisé, plus stable, plus optimisé ; accès facile aux dernières nouveautés des SDK." },
    { id: "an31", chapter: "intro", question: "Citer deux inconvénients du développement natif :", options: ["Performances limitées et pas de store", "Nécessite de multiples compétences ; autant de développements que de plateformes cibles", "Interface non fluide", "Accès limité au matériel"], correct: 1, explanation: "Inconvénients du natif : nécessite de multiples compétences ; autant de développements que de plateformes cibles ; maintenance plus compliquée ; nécessite de multiples environnements." },
    { id: "an32", chapter: "intro", question: "Une application hybride est composée de…", options: ["100% de code natif", "80% du web (HTML/CSS/JS) et 20% d'extensions enveloppées d'une surcouche native", "100% de HTML", "Uniquement de plugins"], correct: 1, explanation: "Une application hybride est composée de 80% du web (HTML/CSS/JS) et de 20% d'extensions enveloppée d'une surcouche native adaptée aux différents OS — elle permet l'accès à certaines fonctionnalités natives et est déployée sur plusieurs plateformes." },
    { id: "an33", chapter: "intro", question: "Quels outils permettent de packager une application hybride en « package natif » ?", options: ["Apache Cordova, Adobe PhoneGap, PhoneGap Build", "Android Studio uniquement", "Xcode uniquement", "GCC"], correct: 0, explanation: "Package natif : Apache Cordova, Adobe PhoneGap, PhoneGap Build. Code natif : Titanium. Le résultat est une application packagée pour chaque plateforme (SDK Android/Android Studio, Mac OS Xcode, SDK .Net/Visual Studio)." },
    { id: "an34", chapter: "intro", question: "Une application Web Mobile…", options: ["Doit être installée depuis le Play Store", "Est développée avec des langages web (HTML5, CSS3, js…) et exécutée depuis un navigateur web mobile", "Fonctionne sans connexion Internet", "Accède à tout le matériel"], correct: 1, explanation: "Une application Web Mobile est développée avec des langages web (HTML5, CSS3, js…) et exécutée depuis un navigateur. Un navigateur est essentiel ; pas besoin d'installer une application ; mises à jour transparentes ; elle ne peut pas fonctionner sans connexion Internet et l'exploitation des fonctionnalités des dispositifs est réduite." },
    { id: "an35", chapter: "intro", question: "Que ne peut PAS faire une application Web Mobile ?", options: ["S'afficher dans un navigateur", "Envoyer des notifications push", "Utiliser HTML5", "Être mise à jour de manière transparente"], correct: 1, explanation: "Inconvénients du Web Mobile : accès limité au matériel, impossible de respecter parfaitement le design spécifique de chaque plateforme, et elle ne peut pas envoyer de notifications push. Bonne pratique : Responsive Design / Adaptative Design." },
    { id: "an36", chapter: "intro", question: "Le meilleur choix entre natif, hybride et web mobile ?", options: ["Le natif, toujours", "L'hybride, toujours", "Il n'y a pas de meilleur choix : cela dépend du contexte (besoins, objectifs, budget, utilisateurs)", "Le web mobile, toujours"], correct: 2, explanation: "Il n'y a pas de meilleur choix — le choix dépend clairement du contexte : performances demandées → natif ; un seul code multi-dispositifs, gagner temps et budget → hybride ; besoin fonctionnel simple accessible partout → application web." },
    { id: "an37", chapter: "intro", question: "Quand Android a-t-il été annoncé officiellement ?", options: ["Le 5 novembre 2007", "Le 23 septembre 2008", "Le 1er avril 2005", "Le 6 décembre 2010"], correct: 0, explanation: "Android est un système d'exploitation open source conçu par Android, une startup rachetée par Google, et annoncé officiellement le 5 novembre 2007. Son symbole est un petit robot vert. La version 1.0 « Apple pie » est sortie le 23 septembre 2008." },
    { id: "an38", chapter: "intro", question: "Quelle version d'Android correspond à l'API level 21-22 ?", options: ["KitKat", "Lollipop (5.0 – 5.1.1)", "Marshmallow", "Oreo"], correct: 1, explanation: "Lollipop 5.0 – 5.1.1 (12 novembre 2014) = API 21-22. KitKat 4.4 = API 19-20, Marshmallow 6.0 = API 23, Oreo 8.0-8.1 = API 26-27, Pie 9 = API 28, Android 15 Vanilla Ice Cream = API 35." },
    { id: "an39", chapter: "intro", question: "Quelle couche de l'architecture Android offre les services fondamentaux (hardware drivers, process & memory management, security, network, power) ?", options: ["Le framework applicatif", "Le Linux kernel", "Les librairies", "La couche applications"], correct: 1, explanation: "Le Linux kernel (version 3.4 pour Lollipop 5.1) offre les services fondamentaux et une couche d'abstraction entre le hardware et le reste de la pile. Architecture ARM (RISC), FAT32, TCP/IP/UDP. Au-dessus : librairies + ART (via JNI), framework, applications." },
    { id: "an40", chapter: "intro", question: "Dans l'architecture Android, que gère le Surface Manager ? Et OpenGL ?", options: ["Surface Manager : l'écran ; OpenGL : le graphique 2D/3D", "Surface Manager : le son ; OpenGL : le réseau", "Surface Manager : la mémoire ; OpenGL : les fichiers", "Rien des deux"], correct: 0, explanation: "Librairies (via JNI) : Surface Manager (écran), SQL Lite et OpenGL (graphique 2D/3D), Audio Manager (sonneries, écouteurs), Media Framework, WebKit, SGL, SSL, Libc. L'Android Runtime (ART) est l'équivalent de la JVM pour PC." },
    { id: "an41", chapter: "intro", question: "Quel composant d'une application Android correspond à la partie présentation (un écran) ?", options: ["Service", "Activity", "Content Provider", "Broadcast Receiver"], correct: 1, explanation: "Activity : partie présentation de l'application, fonctionne via des vues qui affichent des interfaces et répondent aux actions utilisateur ; un écran (avec plusieurs vues possibles) ; répond à des événements (click, touche…) ; cycle de vie (Création → Destruction) ; 1 activité au moins par application." },
    { id: "an42", chapter: "intro", question: "Quel composant fonctionne en arrière-plan, sans interface graphique, et sert à mettre à jour des sources de données ou déclencher des notifications ?", options: ["Activity", "Fragment", "Service", "Intent"], correct: 2, explanation: "Le Service est destiné à fonctionner indépendamment des activités : processus, sans interface graphique, en background, interne/externe. Utilisations : mise à jour de sources de données, mise à jour des activités visibles, déclenchement de notifications. Classe Service." },
    { id: "an43", chapter: "intro", question: "Quel composant permet à une application d'être à l'écoute des Intent diffusés par d'autres applications ou par le système (batterie faible, changement de langue…) ?", options: ["Content Provider", "Broadcast Receiver", "Activity", "Fragment"], correct: 1, explanation: "Le Broadcast Receiver (classe BroadcastReceiver) répond aux objets Intent qui lui sont destinés : réagir à des évènements extérieurs, réveiller une application, réagir à des évènements système (mise hors tension, batterie faible, changement de langue du système)." },
    { id: "an44", chapter: "intro", question: "À quoi sert un Content Provider ?", options: ["Afficher des images", "Gérer et partager des informations au sein d'une application et entre applications (contacts, agenda, photos, SQLite, GPS/GSM/UMTS)", "Lancer des threads", "Stocker les préférences utilisateur"], correct: 1, explanation: "Le Content Provider (fournisseur de contenus, classe ContentProvider) permet de gérer et de partager des informations : un même fournisseur permet d'accéder à des données au sein d'une application et entre applications (partage des données). Le Fragment : comportement ou partie d'UI dans une activité, cycle de vie lié à l'activité hôte. L'Intent : description abstraite d'une opération à effectuer." },
    { id: "an45", chapter: "env", question: "Quelles sont les deux solutions (dont une obsolète) pour développer sur Android sous Linux, Windows et MacOS ?", options: ["Visual Studio et NetBeans", "Eclipse + un plugin (ADT, obsolète) et Android-Studio", "Xcode et IntelliJ", "VS Code et Sublime"], correct: 1, explanation: "On peut développer avec Eclipse + un plugin (schéma obsolète : IDE Eclipse ↔ Android ADT ↔ Android SDK) ou Android-Studio (Android Studio + SDK Tools → Application). Les deux utilisent le SDK d'Android : librairies Java, outils, émulateur, images du système… Pas besoin de télécharger le SDK séparément avec Android Studio." },
    { id: "an46", chapter: "env", question: "Quels sont les avantages d'Android Studio (depuis mi-2015) ?", options: ["Meilleure intégration du SDK, puissance de l'IDE IntelliJ, meilleure gestion des dépendances avec gradle", "Il est plus léger qu'Eclipse", "Il ne nécessite pas de JDK", "Il compile plus vite en C"], correct: 0, explanation: "Depuis mi-2015 il est recommandé d'utiliser Android Studio : meilleure intégration du SDK, puissance de l'IDE IntelliJ, meilleure gestion des dépendances avec gradle. Installation : télécharger, extraire, exécuter studio.sh (Linux) ou le .exe (Windows) ; au premier démarrage il télécharge le SDK et propose de configurer une machine virtuelle." },
    { id: "an47", chapter: "env", question: "Quel outil permet de créer une machine virtuelle Android pour tester un programme sur votre ordinateur ?", options: ["SDK Manager", "AVD Manager", "Gradle", "ADB Shell"], correct: 1, explanation: "L'AVD Manager (Android Virtual Device) permet de créer une machine virtuelle. Le SDK Manager (exécutable android dans le répertoire tools du SDK) gère les SDK. L'émulateur permet de tester l'application — les ROMs Intel permettent l'accélération matérielle. On peut aussi tester sur un smartphone réel en activant les options de développement." },
    { id: "an48", chapter: "env", question: "Quels fichiers de configuration trouve-t-on à la racine d'un projet Android ?", options: ["build.gradle (2 instances) et settings.gradle", "package.json et webpack.config.js", "pom.xml", "Makefile"], correct: 0, explanation: "Des fichiers de configuration : build.gradle (2 instances) pour les règles de dépendance et de compilation ; settings.gradle pour la liste de toutes les applications à compiler (si plusieurs). Le manifeste est le fichier de contrôle de l'application." },
    { id: "an49", chapter: "env", question: "Que décrit le fichier AndroidManifest.xml ?", options: ["La liste des commits", "Le point d'entrée, le nom, l'icône, le package (identifiant unique Play Store), les composants et les permissions", "Le code source des activités", "Les dépendances Maven"], correct: 1, explanation: "AndroidManifest.xml est le fichier de configuration XML indispensable : point d'entrée (code exécuté au démarrage), nom, icône, package (identifiant unique sur le Play Store), composants du programme, permissions matérielles (appareil photo, GPS…) et d'interactions (Internet, répertoire téléphonique, galerie…). Il ne doit pas être renommé ni déplacé." },
    { id: "an50", chapter: "env", question: "Que déclare le nœud <receiver> dans le manifeste ?", options: ["Une activité", "Un récepteur d'objets Intent diffusés par d'autres applications ou par le système", "Un service", "Une permission"], correct: 1, explanation: "<receiver> déclare un récepteur d'objets Intent : l'application peut recevoir ces objets alors qu'ils sont diffusés par d'autres applications ou par le système. <application> : unique ; <uses-permission> : autorisations demandées à l'utilisateur ; <activity> : activité ; <service> : service ; <provider> : fournisseur de contenu." },
    { id: "an51", chapter: "env", question: "Que fait l'instruction setContentView(R.layout.activity_main) dans onCreate ?", options: ["Elle crée la base de données", "Elle affecte l'interface graphique décrite dans activity_main.xml à l'activité", "Elle déclare une permission", "Elle démarre un service"], correct: 1, explanation: "setContentView(R.layout.activity_main) affecte à l'activité l'interface graphique décrite dans le fichier activity_main.xml. Le code type : public class MainActivity extends AppCompatActivity { onCreate() { super.onCreate(savedInstanceState); setContentView(R.layout.activity_main); Toast.makeText(this, \"application crée\", Toast.LENGTH_SHORT).show(); } }." },
    { id: "an52", chapter: "cycle", question: "Une activité est…", options: ["Un processus système", "Un composant d'une application qui fournit un écran avec lequel l'utilisateur peut interagir", "Une base de données", "Un thread réseau"], correct: 1, explanation: "Une activité est un composant qui fournit un écran avec lequel l'utilisateur peut interagir. Une application contient plusieurs activités. Une activité = Contexte + une Interface graphique. Exemple : à la réception d'un SMS, l'activité passe d'un état à un autre — c'est le cycle de vie." },
    { id: "an53", chapter: "cycle", question: "Comment sont gérées les activités d'une application ?", options: ["Sous forme de graphe", "Sous forme de pile : la nouvelle activité est placée en haut et devient l'activité en exécution", "Sous forme de file d'attente FIFO", "Sous forme d'arbre"], correct: 1, explanation: "Les activités sont gérées sous forme de pile : quand une nouvelle activité démarre, elle est placée en haut de la pile et devient l'activité en exécution ; l'activité précédente reste en dessous et ne revient au premier plan que si la nouvelle est fermée." },
    { id: "an54", chapter: "cycle", question: "Que se passe-t-il quand l'utilisateur clique sur le bouton Retour du téléphone ?", options: ["L'application se ferme", "L'activité suivante dans la pile (l'activité précédente) devient active", "Un nouveau service démarre", "L'activité du haut reste active"], correct: 1, explanation: "L'appui sur le bouton Retour (ou la fermeture de l'activité) fait que l'activité précédente — suivante dans la pile — devient active. Les activités peuvent aussi être supprimées pour libérer des ressources." },
    { id: "an55", chapter: "cycle", question: "Une activité « En Pause » est…", options: ["Complètement recouverte et détruite", "Une activité qui a perdu le focus mais est encore partiellement visible (activité du dessus transparente ou ne couvrant pas tout l'écran)", "Une activité détruite par le système", "Une activité au premier plan"], correct: 1, explanation: "En Pause : a perdu le focus, encore partiellement visible — une autre activité est en haut de la pile mais elle est soit transparente, soit ne couvre pas tout l'écran. Active : premier plan, haut de la pile, ciblée par les actions utilisateur. Arrêtée : complètement recouverte, informations encore chargées, peut être détruite si besoin de mémoire." },
    { id: "an56", chapter: "cycle", question: "Quand l'utilisateur reçoit un appel téléphonique, l'activité courante…", options: ["Passe dans OnPause ensuite Stopped ; à la fin de l'appel elle revient dans Started puis Resumed", "Est immédiatement détruite", "Reste Active", "Passe directement à onDestroy"], correct: 0, explanation: "Appel téléphonique : l'activité courante passe dans l'état OnPause ensuite Stopped ; lorsque l'appel est terminé, elle revient dans Started puis Resumed. C'est le framework Android qui appelle les méthodes de transition correspondantes." },
    { id: "an57", chapter: "cycle", question: "Quelle méthode de transition est OBLIGATOIRE dans une activité ?", options: ["onStart()", "onPause()", "onCreate(Bundle savedInstanceState)", "onDestroy()"], correct: 2, explanation: "Les 7 méthodes de transition : onCreate (obligatoire), onStart, onResume, onRestart, onPause (recommandée), onStop, onDestroy. onCreate initialise tous les éléments, reçoit un Bundle contenant l'état précédent, et est toujours suivie de onStart." },
    { id: "an58", chapter: "cycle", question: "Quand est appelée onStart() ?", options: ["Au premier lancement uniquement", "Juste avant que l'activité ne devienne visible", "Juste avant un appel téléphonique", "Uniquement si un bundle est à gérer"], correct: 1, explanation: "onStart() est appelée juste avant que l'activité ne devienne visible. Elle est suivie de onResume si l'activité revient en premier plan. (QCM DS/EXAM : réponse b.)" },
    { id: "an59", chapter: "cycle", question: "Quel est le cycle de vie d'une Activity au lancement puis à l'effacement ?", options: ["onCreate > onResume > onStart puis onStop > onPause > onDestroy", "onCreate > onStart > onResume puis onPause > onStop > onDestroy", "onCreate > onStart > onResume puis onPause > onDestroy", "Aucune réponse correcte"], correct: 1, explanation: "Ordre : onCreate() > onStart() > onResume() puis onPause() > onStop() > onDestroy(). onResume est toujours suivie de onPause ; onStop est suivie de onRestart (reprise) ou onDestroy (disparition). (QCM DS/EXAM : réponse b.)" },
    { id: "an60", chapter: "cycle", question: "Que fait onPause() et pourquoi doit-elle être rapide ?", options: ["Elle détruit l'activité", "Elle enregistre les données non sauvegardées et arrête les animations/ce qui consomme ; elle doit être rapide car l'activité suivante ne démarre que si elle prend fin", "Elle recharge l'interface", "Elle démarre un service"], correct: 1, explanation: "onPause est appelée quand le système va démarrer une autre activité : enregistrer les données non sauvegardées, arrêter les animations ou tout ce qui consomme de la mémoire. Ne doit pas consommer beaucoup de temps car l'activité suivante ne démarre que si cette méthode prend fin. Suivie de onResume (rechargée) ou onStop (invisible)." },
    { id: "an61", chapter: "cycle", question: "onStop() est suivie par…", options: ["onResume ou onDestroy", "onRestart si l'activité recommence à interagir, ou onDestroy si l'activité va disparaître", "onCreate", "onPause"], correct: 1, explanation: "onStop est appelée quand l'activité n'est plus visible (détruite ou recouverte par une autre activité). Suivie par : onRestart si l'activité recommence à interagir avec l'utilisateur, onDestroy si l'activité va disparaître. Dans cet état, l'activité peut être détruite par le système." },
    { id: "an62", chapter: "cycle", question: "Comment distingue-t-on, dans onDestroy(), une fin normale (finish()) d'une destruction par le système ?", options: ["Avec la méthode isFinishing()", "Avec onSaveInstanceState", "C'est impossible", "Avec getAction()"], correct: 0, explanation: "onDestroy : dernier appel reçu par l'activité. Peut intervenir si l'activité se termine (appel de finish) ou si le système détruit temporairement l'instance pour gagner de l'espace. On distingue ces deux scénarios avec la méthode isFinishing(). onRestart : appelée quand l'activité redémarre après avoir été stoppée, toujours suivie de onStart." },
    { id: "an63", chapter: "cycle", question: "Quelles méthodes personnaliser pour sauvegarder et restaurer les données de l'activité ?", options: ["onPause et onResume uniquement", "onSaveInstanceState(Bundle outState) et onRestoreInstanceState(Bundle savedInstanceState)", "onCreate et onDestroy", "getData et setData"], correct: 1, explanation: "Sauvegarde et restauration du contexte : @Override protected void onSaveInstanceState(Bundle outState) et @Override protected void onRestoreInstanceState(@NonNull Bundle savedInstanceState) — il faut personnaliser ces deux méthodes pour sauvegarder et restaurer les données." },
    { id: "an64", chapter: "cycle", question: "Une activité « A » lance une activité « B », on clique sur « retour ». « B » est détruite et dépilée.", options: ["Vrai", "Faux", "Suivant la version d'Android", "Aucune bonne réponse"], correct: 0, explanation: "Vrai : quand une activité A lance B, B est placée en haut de la pile ; l'appui sur le bouton Retour ferme B — elle est détruite et dépilée — et A redevient l'activité active. (QCM DS/EXAM : réponse b.)" },
    { id: "an65", chapter: "styles", question: "Qu'est-ce qu'un style en Android ?", options: ["Un fichier Java", "Une collection de propriétés spécifiant le design d'une vue ou d'un élément (hauteur, largeur, couleur du texte, taille du texte…), défini dans res/values/style.xml", "Un thème d'application", "Une ressource image"], correct: 1, explanation: "Un style est une collection de propriétés qui spécifie le design d'une vue ou d'un élément. Il est défini dans un fichier ressource XML enregistré sous res/values/ avec le nom style.xml, puis appliqué avec style=\"@style/monstyle\"." },
    { id: "an66", chapter: "styles", question: "Que sont les thèmes Android ?", options: ["Des polices de caractères", "Des styles appliqués sur les Layouts (un style pour les Layouts)", "Des icônes système", "Des animations"], correct: 1, explanation: "Les thèmes Android sont appliqués sur les Layouts — c'est un style pour les Layouts. Exemple : un thème Theme.Custom (héritant d'AppTheme) initialisant android:layout_[width|height] à match_parent avec une couleur claire en background. Application dans AndroidManifest.xml via android:theme=\"@style/Theme.Custom\" — tous les éléments de l'application utilisent alors le même thème." },
    { id: "an67", chapter: "styles", question: "Quels sont les trois types de menus sous Android ?", options: ["Option menu, Context Menu, Popup menu", "Haut, bas, milieu", "File, Edit, View", "Simple, double, triple"], correct: 0, explanation: "Option menu : ensemble d'options principales pour l'application. Context Menu : menu flottant à l'appui long (défaut : 500 millisecondes), peut contenir de nombreux Menu Item et Sub. Popup menu : menu flottant ancré dans n'importe quelle View — pas différent d'un Context Menu en termes d'interface et d'utilisation." },
    { id: "an68", chapter: "styles", question: "Où sont placés les menus selon la version d'Android ?", options: ["En bas jusqu'à Android 3.2.2 (API <= 13) ; en haut à droite à partir d'Android 4.0.1 (API >= 14)", "Toujours en haut", "Toujours en bas", "Selon la taille de l'écran"], correct: 0, explanation: "Les menus sont placés différemment selon la version d'Android : en bas jusqu'à Android 3.2.2 (API <= 13) ; en haut à droite à partir d'Android 4.0.1 (API >= 14)." },
    { id: "an69", chapter: "styles", question: "Quelles méthodes sont utilisées pour créer et gérer un menu d'options ?", options: ["onCreateOptionsMenu (avec MenuInflater) et onOptionsItemSelected", "onCreate et onStart", "createMenu et clickMenu", "setMenu et getMenu"], correct: 0, explanation: "On utilise la méthode onCreateOptionsMenu (MenuInflater inflater = getMenuInflater(); inflater.inflate(R.menu.menu, menu); return true;) et onOptionsItemSelected(MenuItem item) avec un switch sur item.getItemId() — case R.id.quitter: finish(); return true. Les inflaters sont des objets qui créent des vues à partir de fichiers XML (res/menu/menu.xml)." },
    { id: "an70", chapter: "styles", question: "Qu'est-ce qu'un Toast et quelles sont ses durées ?", options: ["Une boîte de dialogue bloquante", "Une petite notification près du bas de l'écran qui disparaît automatiquement — LENGTH_SHORT : 2 secondes, LENGTH_LONG : 5 secondes", "Un son d'alerte", "Une vibration"], correct: 1, explanation: "Android Toast est une petite notification envoyée aux utilisateurs : elle apparaît près du bas de l'écran (par défaut) et disparaît automatiquement lorsque le temps est écoulé. Durées : Toast.LENGTH_SHORT = 2 secondes, Toast.LENGTH_LONG = 5 secondes. Syntaxe : Toast.makeText(this, \"message\", Toast.LENGTH_SHORT).show(). Personnalisable avec la bibliothèque externe Toasty." },
    { id: "an71", chapter: "styles", question: "Comment modifier la position d'affichage d'un Toast ?", options: ["Avec setPosition()", "Avec la méthode setGravity() — par exemple toast.setGravity(Gravity.LEFT | Gravity.TOP, 20, 30)", "Avec move()", "C'est impossible"], correct: 1, explanation: "Par défaut, Toast s'affiche près du bas de l'écran, centré horizontalement. En utilisant la méthode setGravity(), vous pouvez modifier sa position d'affichage : Toast toast = Toast.makeText(...); toast.setGravity(Gravity.LEFT | Gravity.TOP, 20, 30); toast.show()." },
    { id: "an72", chapter: "styles", question: "De quelle classe héritent les boîtes de dialogues Android ?", options: ["android.app.Activity", "android.app.Dialog", "android.view.View", "android.os.Bundle"], correct: 1, explanation: "Les boîtes de dialogues affichent des informations en mode modal avec un ensemble de boutons configurables. Elles héritent de la classe android.app.Dialog. Boîtes prédéfinies : AlertDialog (alerte), ProgressDialog (traitement en cours), DatePickerDialog (date), TimePickerDialog (heure), et … extends Dialog pour une boîte personnalisée." },
    { id: "an73", chapter: "styles", question: "Quelles sont les étapes d'utilisation d'un AlertDialog ?", options: ["Instancier AlertDialog.Builder, configurer (setIcon, setTitle, setMessage), spécifier les boutons (setPositiveButton/Negative/Neutral), builder.create(), builder.show()", "Créer un layout, le gonfler, l'afficher", "Utiliser Toast.makeText", "Déclarer une activité"], correct: 0, explanation: "Étapes : 1. Instanciation : AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this). 2. Configuration : .setIcon(R.mipmap.ic_launcher), .setTitle(R.string.Dialogue_titre_erreur), .setMessage(...). 3. Boutons : setPositiveButton/setNegativeButton/setNeutralButton avec DialogInterface.OnClickListener. 4. Création : builder.create(). 5. Affichage : builder.show(). AlertDialog (sous-classe directe de Dialog) a une zone d'en-tête, une zone de contenu et 1, 2 ou 3 boutons." },
    { id: "an74", chapter: "styles", question: "Quelles méthodes utiles ferment une boîte de dialogue / quittent l'application ?", options: ["dialog.close() et exit()", "dialog.cancel() (ferme la boîte affichée) et nom_activity.this.finish() (quitte l'application)", "dismiss() et kill()", "hide() et stop()"], correct: 1, explanation: "Méthodes utiles des boîtes de dialogue : dialog.cancel() permet de fermer la boîte de dialogue affichée ; nom_activity.this.finish() permet de quitter l'application. TimePickerDialog : modes Spinner Mode / Clock Mode ; DatePickerDialog : modes Spinner Mode / Calendar Mode." },
    { id: "an75", chapter: "intents", question: "Qu'est-ce qu'un Intent ?", options: ["Un message qui peut être utilisé pour demander une action à partir d'un autre composant de l'application", "Un type de layout", "Une base de données embarquée", "Un fichier de configuration"], correct: 0, explanation: "Un Intent est un message utilisé pour demander une action à partir d'un autre composant. Il permet d'invoquer des Activités, des Broadcast Receivers ou des Services via : startActivity (lance une activité), sendBroadcast (envoie à tous les BroadcastReceiver intéressés), startService/bindService (communiquent avec un service en arrière-plan)." },
    { id: "an76", chapter: "intents", question: "Que spécifie un Intent Explicite ?", options: ["Une action à réaliser sans nommer de composant", "Le composant à démarrer par nom de la classe (contexte + classe destination)", "Une URL", "Une permission"], correct: 1, explanation: "Les Intents Explicites spécifient le composant à démarrer par nom de la classe : ils permettent de démarrer un composant de l'application car le nom de la classe est connu. Arguments : le contexte (this ou <Activity_class_name>.this) et la classe destination (<Activity_class_name>.class). Appel typique : Intent myIntent = new Intent(StartClass.this, EndClass.class); startActivity(myIntent). Les implicites déclarent une action à réaliser sans nommer de composant — le système lance l'activité la plus apte." },
    { id: "an77", chapter: "intents", question: "Comment transmettre des données d'une activité à une autre via un Intent ?", options: ["intent.putData(objet)", "intent.putExtra(key, value) côté appelant, puis getIntent() + getXXXExtra(key) côté appelé", "Via une variable globale", "Via SharedPreferences obligatoirement"], correct: 1, explanation: "Activité appelante : intent.putExtra(key, value) — ex. myIntent.putExtra(\"lName\", edtNom.getText().toString()). Activité appelée : Intent intentRecup = getIntent(); String nom = intentRecup.getStringExtra(\"lName\"). putExtra : clé (String) => valeur (types primitifs, String, Bundle…). L'appelée connaît aussi getAction() et getExtras() : Bundle extras = getIntent().getExtras()." },
    { id: "an78", chapter: "intents", question: "Que signifie le paramètre requestCode dans onActivityResult(requestCode, resultCode, data) ?", options: ["Le code d'erreur système", "La valeur identifiant quelle activité a appelé la méthode (spécifiée dans startActivityForResult au lancement de la sous-activité)", "L'identifiant de l'utilisateur", "Le numéro de version d'Android"], correct: 1, explanation: "int requestCode : valeur identifiant quelle activité a appelé la méthode — cette même valeur a été spécifiée comme paramètre de startActivityForResult lors du démarrage de la sous-activité. int resultCode : valeur de retour envoyée par la sous-activité pour signaler son état à la fin de la transaction (constante de la classe Activity : RESULT_OK, RESULT_CANCELED… ou définie par le développeur)." },
    { id: "an79", chapter: "intents", question: "Pour recevoir un résultat d'une autre activité, il faut appeler…", options: ["startActivity", "startActivityForResult au lieu de startActivity, et récupérer le résultat dans onActivityResult", "runActivity", "bindActivity"], correct: 1, explanation: "Pour recevoir un résultat à partir d'une autre activité, appeler startActivityForResult au lieu de startActivity. L'activité destination renvoie le résultat sous forme d'Intent avec setResult(RESULT_OK, myIntentResult) ou setResult(RESULT_CANCELED) puis finish(). L'activité principale le reçoit dans onActivityResult(requestCode, resultCode, data) — data.getStringExtra(\"result\")." },
    { id: "an80", chapter: "intents", question: "En cas d'erreur ActivityNotFoundException, que faut-il faire ?", options: ["Réinstaller le SDK", "Déclarer l'activité à démarrer dans le fichier AndroidManifest.xml", "Changer de langage", "Redémarrer l'émulateur"], correct: 1, explanation: "Erreur du type ActivityNotFoundException → déclarer l'activité à démarrer dans le fichier de configuration AndroidManifest.xml de l'application. Ne pas oublier de déclarer toutes les activités de votre application dans le Manifest." },
    { id: "an81", chapter: "intents", question: "Qu'est-ce qu'un intent filter ?", options: ["Un filtre antispam", "Une expression dans le fichier Manifest qui spécifie le type d'intents que le composant veut recevoir", "Un type de layout", "Un gestionnaire de permissions"], correct: 1, explanation: "Un intent filter est une expression dans le fichier Manifest d'une application qui spécifie le type d'intents que le composant veut recevoir. Sans intent filter, une activité ne peut être déclenchée que par un Intent Explicite. Recommandation : ne pas déclarer d'Intent Filters pour les services (problèmes de sécurité). Fonctionnement implicite : Activity A crée l'Intent → le système cherche un Intent filter correspondant → il démarre l'activité B via onCreate en lui passant l'intent." },
    { id: "an82", chapter: "intents", question: "Quels sont les trois niveaux de filtrage d'un intent filter ?", options: ["action, category, data", "title, message, bouton", "get, post, put", "alpha, beta, gamma"], correct: 0, explanation: "Plusieurs niveaux de filtrage : action (identifie le nom de l'Intent — convention de nommage de Java pour éviter les collisions), category (filtre une catégorie d'action : DEFAULT, BROWSABLE…), data (filtre sur les données du message : android:host pour un nom de domaine, android:scheme la partie gauche de l'url)." },
    { id: "an83", chapter: "intents", question: "Que signifie URI et URL ?", options: ["URI : Uniform Resource Identifier (généralise la notion d'URL) ; URL : Uniform Resource Locator (localise un élément)", "Deux noms pour la même chose", "URI : le nom d'une base de données", "URL : un protocole réseau"], correct: 0, explanation: "URI : Uniform Resource Identifier, identifiant de ressource uniforme — généralise la notion d'URL. URL : Uniform Resource Locator — information permettant de localiser un élément (l'adresse d'un site Internet est une URL). La méthode Uri.parse permet de créer un objet Uri à partir d'une chaine String." },
    { id: "an84", chapter: "intents", question: "Quel code appelle un n° de téléphone via un intent implicite ?", options: ["Uri telnumber = Uri.parse(\"tel:0248484000\"); Intent call = new Intent(Intent.ACTION_DIAL, telnumber); startActivity(call);", "Dial.number(0248484000)", "Intent.call(phone)", "startService(callIntent)"], correct: 0, explanation: "Exemple 1 du cours : Uri telnumber = Uri.parse(\"tel:0248484000\"); Intent call = new Intent(Intent.ACTION_DIAL, telnumber); startActivity(call). Autres exemples : ACTION_VIEW avec http://www.google.fr (page web) ou geo:lat,long (géolocalisation) ; ACTION_PICK avec content://contacts/people + startActivityForResult(intent, 2) car une donnée est attendue en retour ; ACTION_SENDTO avec mailto: + putExtra(\"subject\",…)/putExtra(\"body\",…)." },
    { id: "an85", chapter: "intents", question: "Que fait l'action ACTION_DIAL ?", options: ["Appelle directement le numéro", "Affiche l'interface de composition des numéros, préremplie par les données de l'URI spécifiée en paramètre", "Envoie un SMS", "Supprime un contact"], correct: 1, explanation: "ACTION_DIAL : afficher l'interface de composition des numéros — celle-ci peut être préremplie par les données contenues dans l'URI spécifiée en paramètre. ACTION_CALL : appeler un numéro (lance l'interface pour composer). ACTION_VIEW : visualiser l'élément de l'URI (http: → navigateur, tel: → composition, geo: → Google Map). ACTION_SEND : envoyer des données texte/binaire par courriel ou SMS. Action.MAIN : activité principale d'une application." },
    { id: "an86", chapter: "intents", question: "Quel intent renvoie l'image capturée à partir de la Caméra lorsque l'appareil photo est sécurisé ?", options: ["ACTION_VIDEO_CAPTURE", "ACTION_IMAGE_CAPTURE_SECURE", "EXTRA_FULL_SCREEN", "INTENT_ACTION_VIDEO_CAMERA"], correct: 1, explanation: "Types d'Intent caméra : ACTION_IMAGE_CAPTURE_SECURE (renvoie l'image capturée lorsque l'appareil photo est sécurisé), ACTION_VIDEO_CAPTURE (appelle l'application vidéo existante pour capturer une vidéo), EXTRA_SCREEN_ORIENTATION (orientation \"vertical\"/\"landscape\"), EXTRA_FULL_SCREEN (contrôle l'interface du ViewImage), INTENT_ACTION_VIDEO_CAMERA (lance la Caméra en mode vidéo), EXTRA_SIZE_LIMIT (limite de taille de capture vidéo ou image)." },
    { id: "an87", chapter: "services", question: "Les services font partie des composants essentiels d'Android : ils…", options: ["Ont une interface graphique plein écran", "Ne disposent pas d'interface utilisateur et fonctionnent en arrière-plan pour une période de temps indéfinie", "Ne peuvent pas accéder au réseau", "S'exécutent uniquement au premier plan"], correct: 1, explanation: "Les services ne disposent pas d'interface utilisateur et fonctionnent en arrière-plan pour une période de temps indéfinie. Applications concernées : celles qui s'exécutent fréquemment ou continuellement sans interaction utilisateur — ex. récupération d'informations (news, météo, résultats sportifs) via des flux RSS/Atom (formats XML diffusant automatiquement des mises à jour de contenu)." },
    { id: "an88", chapter: "services", question: "Quelle est la différence entre LocalService et RemoteService ?", options: ["Aucune", "LocalService : même processus que l'application, accessible par ses Activités ; RemoteService : processus différent, sollicitable par plusieurs applications différentes", "LocalService est plus rapide à démarrer", "RemoteService n'existe plus"], correct: 1, explanation: "Services locaux (LocalService) : s'exécutent dans le même processus que votre application, accessibles uniquement par les Activités de l'application. Services distants (RemoteService) : s'exécutent dans un processus totalement différent, peuvent être sollicités par plusieurs applications différentes." },
    { id: "an89", chapter: "services", question: "Quelles méthodes composent le cycle de vie d'un service ?", options: ["onCreate, onStartCommand (SDK > 2.0), onDestroy", "onCreate, onResume, onStop", "start, run, stop", "init, main, exit"], correct: 0, explanation: "OnCreate() : appelée à la création, initialise ce qui sera nécessaire. OnStartCommand(Intent i, int flags, int startId) : le service démarre — valable uniquement pour les versions du SDK supérieur à 2.0. OnDestroy() : appelé à la fermeture du service. Le service n'a pas de durée de vie définie : il fonctionne tant que c'est nécessaire." },
    { id: "an90", chapter: "services", question: "Comment démarre-t-on et arrête-t-on un service depuis une activité ?", options: ["startService() et stopService()", "runService() et endService()", "bindService() uniquement", "execService()"], correct: 0, explanation: "Pour créer un service : implémenter une classe qui hérite de Service (public class MonPremierService extends Service). Une activité peut démarrer un Service via startService() et le stopper via stopService(). La méthode onBind sert à faire communiquer le service avec un autre service ou une activité. Android fournit des services prédéfinis accessibles via getSystemService(). Tout autre service doit être déclaré dans AndroidManifest.xml via <service android:name=\"yourclass\"></service>." },
    { id: "an91", chapter: "services", question: "Quels sont les 4 arguments de requestLocationUpdates(String, long, float, LocationListener) ?", options: ["Le provider (GPS/NETWORK…), un intervalle minimum entre deux notifications (en millisecondes), un intervalle minimum (en mètres), l'instance du LocationListener", "La latitude, la longitude, l'altitude, la vitesse", "Le contexte, le layout, l'id, le toast", "L'url, le port, le timeout, le listener"], correct: 0, explanation: "requestLocationUpdates possède 4 arguments : le provider utilisé pour recevoir les mises à jour des coordonnées utilisateurs (GPS / NETWORK…), un intervalle minimum entre deux notifications (en millisecondes), un intervalle minimum entre deux notifications (en mètre) et l'instance de votre LocationListener. Dans le service : locationMgr = (LocationManager) getSystemService(Context.LOCATION_SERVICE); puis requestLocationUpdates(NETWORK_PROVIDER, 10000, 0, onLocationChange) et (GPS_PROVIDER, 10000, 0, …)." },
    { id: "an92", chapter: "services", question: "Quelles permissions sont requises pour le service de géolocalisation du cours ?", options: ["INTERNET, ACCESS_FINE_LOCATION, LOCATION, ACCESS_GPS", "CAMERA et RECORD_AUDIO", "WRITE_EXTERNAL_STORAGE uniquement", "Aucune permission"], correct: 0, explanation: "Le service doit être déclaré dans AndroidManifest.xml (partie Application) : <service android:name=\".MyService\"/>. Et les permissions de ce service : <uses-permission android:name=\"android.permission.INTERNET\"/>, ACCESS_FINE_LOCATION, LOCATION, ACCESS_GPS." },
    { id: "an93", chapter: "tp", question: "Dans le TP1, quelles APIs installe-t-on dans le SDK Manager et pourquoi ?", options: ["API 35 (par défaut, la plus récente) et API 27 pour installer les applications sur un maximum de plateformes (et les tablettes)", "API 1 et API 2", "Uniquement la dernière API", "API 21 et API 30"], correct: 0, explanation: "TP1 : à la fin du wizard, choisir « Configure/SDK Manager ». Par défaut l'API installée est la plus récente (API 35). On installe également l'API 27 afin de pouvoir installer nos applications sur un maximum de plateformes utilisées actuellement, et en particulier nos tablettes. Installation « Custom » avec thème IntelliJ, tous les composants." },
    { id: "an94", chapter: "tp", question: "Dans le TP1, quel modèle choisir pour créer l'émulateur si aucun téléphone proche n'est disponible ?", options: ["Pixel 1", "Un Nexus 5X", "Galaxy Tab", "N'importe lequel"], correct: 1, explanation: "TP1 D : cliquer sur l'icône « AVD Manager », choisir « Create Virtual Device… », puis choisir parmi les phones l'architecture prédéfinie la plus proche de votre téléphone (ou à défaut, un Nexus 5X), et lancer l'émulateur. La première application : Empty Views Activity, langage Java, API 27 (Oreo 8.1) minimum." },
    { id: "an95", chapter: "tp", question: "Dans le TP1, quels sont les trois sous-répertoires du répertoire « app » ?", options: ["manifests (architecture), java (sources), res (interface graphique)", "bin, lib, obj", "src, test, doc", "layout, values, menu"], correct: 0, explanation: "TP1 E : le répertoire manifests contient les fichiers décrivant l'architecture de l'application ; le répertoire java contient les fichiers source Java ; le répertoire res contient tout ce qui a trait à l'interface graphique. activity_main.xml s'affiche en onglets « Split »/« code » (XML + prévisualisation) et « Design » (glisser-déposer)." },
    { id: "an96", chapter: "tp", question: "Comment attribuer l'activité elle-même comme écouteur des clics d'un bouton (TP1, possibilité 2) ?", options: ["btn1.setOnClickListener(this); — l'activité doit implémenter l'interface OnClickListener et sa méthode onClick(View v)", "btn1.addListener()", "btn1.onClick = true", " Impossible"], correct: 0, explanation: "TP1 F : dans onCreate, Button btn1 = findViewById(R.id.btn1); btn1.setOnClickListener(this); — cela attribue this comme écouteur des clics. Android Studio signale que l'activité n'est pas un écouteur correct : il faut qu'elle implémente l'interface OnClickListener, puis implémenter la méthode exigée onClick(View v) — le paramètre est une View mais en réalité ce sera un Button." },
    { id: "an97", chapter: "tp", question: "Dans le TP2, comment générer rapidement les méthodes de callbacks du cycle de vie dans Android Studio ?", options: ["À la main uniquement", "Commencer à taper le nom de la méthode puis taper Ctrl+Espace", "Via le menu Build", "Avec la commande gradle"], correct: 1, explanation: "TP2 : pour générer ces méthodes, commencer à taper le nom de la méthode dans le fichier de code, puis taper sur les touches Ctrl+Espace. Travail demandé : chaque méthode (onCreate, onStart, onResume, onPause, onStop, onRestart, onDestroy) affiche son nom à travers un Toast." },
    { id: "an98", chapter: "tp", question: "Dans le TP2, quels fichiers de ressources utilise-t-on et pour quoi faire ?", options: ["strings.xml (titres, sous-titres, hints — internationalisation), colors.xml (standardiser les couleurs), dimensions.xml (uniformiser les tailles : 25sp sous-titres, 20sp boutons, 40sp titre)", "Uniquement layout.xml", "build.gradle", "Aucun fichier de ressources"], correct: 0, explanation: "TP2 : strings.xml stocke tous les titres, sous-titres et hints pour faciliter l'internationalisation ; colors.xml standardise les couleurs des widgets (bleu foncé sous-titres, bleu champs de saisie) ; dimensions.xml uniformise les tailles (25sp sous-titres, 20sp texte des boutons, 40sp titre). Créer des dictionnaires pour les trois langues : Arabe, Anglais, Français." },
    { id: "an99", chapter: "tp", question: "Dans le TP3, quelles mentions correspondent aux moyennes (<10, 10-12, 12-14, 14-16, ≥16) ?", options: ["Insuffisant, Passable, Assez Bien, Bien, Très Bien", "Faible, Moyen, Bon, Très bon, Excellent", "Refusé, Admis, Bien, Très bien, Excellent", "Aucune mention"], correct: 0, explanation: "TP3 : < 10 → Insuffisant ; 10 ≤ moyenne < 12 → Passable ; 12 ≤ moyenne < 14 → Assez Bien ; 14 ≤ moyenne < 16 → Bien ; ≥ 16 → Très Bien. Statut Admis/Refusé selon si la moyenne est ≥ 10 ou non. Le résultat complet affiché : spécialité, type d'évaluation, moyenne, mention et statut." },
    { id: "an100", chapter: "tp", question: "Dans le TP3, quels composants utilise-t-on pour choisir la spécialité et le type d'évaluation ?", options: ["Un Spinner (GLSI, CHIM, PHY) et un RadioGroup avec deux RadioButton (Normal ou Rattrapage)", "Deux EditText", "Un ListView et un CheckBox", "Un DatePicker"], correct: 0, explanation: "TP3 : un Spinner pour choisir la spécialité (GLSI, CHIM, PHY), un RadioGroup avec deux RadioButton pour le type d'évaluation (Normal ou Rattrapage), trois EditText pour les notes, trois boutons (Calculer, Effacer, Quitter), un TextView pour le résultat. Gestion des erreurs : vérifier que toutes les notes sont saisies et numériques, Toast si une note est manquante ou incorrecte. Étapes : layout XML avec ScrollView et LinearLayout, findViewById, listeners OnClickListener, méthodes calculerMoyenne() et effacerChamps()." },
    { id: "an101", chapter: "ui", question: "L'attribut android:gravity signifie la…", options: ["Gravité intérieure de la vue (alignement de son contenu)", "Gravité extérieure de la vue", "Gravité du parent", "Aucune bonne réponse"], correct: 0, explanation: "android:gravity : la gravité INTÉRIEURE de la vue — spécifie dans quelle direction son contenu doit s'aligner. android:layout_gravity : la gravité EXTÉRIEURE — la direction dans laquelle la vue doit toucher la bordure de son parent. (QCM DS/EXAM : réponse a.)" },
    { id: "an102", chapter: "ui", question: "L'attribut android:layout_width=\"wrap_content\" signifie :", options: ["Prend la place nécessaire à l'affichage", "L'élément remplit tout l'élément parent", "L'élément remplit la moitié de l'écran", "Aucune bonne réponse"], correct: 0, explanation: "wrap_content : prend la place nécessaire à l'affichage. match_parent : l'élément remplit tout l'élément parent. (QCM DS/EXAM : réponse a.)" },
    { id: "an103", chapter: "ui", question: "Quel est le type de fichier le plus simple pour définir l'interface graphique, et par quoi sont développées les interfaces ?", options: ["XML ; les interfaces sont développées par Java et/ou XML", "JAVA ; uniquement en Java", "Visual ; uniquement en XML", "Aucune bonne réponse"], correct: 0, explanation: "Le type de fichier le plus simple pour définir l'interface graphique est le XML (Android recommande le XML pour séparer la vue du métier). Les interfaces graphiques sont développées par Java et/ou XML. (QCM DS/EXAM : réponses b et a.)" },
    { id: "an104", chapter: "ui", question: "Quel layout n'existe PAS sous Android ?", options: ["LinearLayout", "RelativeLayout", "Sequential Layout", "GridLayout"], correct: 2, explanation: "Les layouts existants : LinearLayout, RelativeLayout, GridLayout, TableLayout, FrameLayout, AbsoluteLayout (deprecated), ScrollView. « Sequential Layout » n'est pas un layout standard Android. (QCM DS/EXAM : les layouts existants sont a, b, c — pas le Sequential Layout.)" },
    { id: "an105", chapter: "ui", question: "Avec un attribut private Button btn;, dans quelle méthode l'initialiser, et avec quelle ligne de code ?", options: ["Dans onCreate() : btn = findViewById(R.id.btn);", "Dans onStart() : btn = new Button()", "Dans onPause() : btn = setContentView(btn)", "N'importe où"], correct: 0, explanation: "L'initialisation des attributs (btn = findViewById(R.id.btn)) se fait dans la méthode onCreate. De même pour edt1 = findViewById(R.id.edtName); edt2 = findViewById(R.id.edtLastName). (QCM DS/EXAM : l'association de l'interface à la classe MainActivity se fait avec setContentView(R.layout.activityMain) — réponse b.)" },
    { id: "an106", chapter: "ui", question: "Dans quel dossier trouve-t-on les ressources du projet, et la classe R est…", options: ["res/ ; une classe statique générée par le système", "src/ ; une classe dynamique", "assets/ ; développée par le développeur", "bin/ ; aucune bonne réponse"], correct: 0, explanation: "Les ressources du projet sont dans le dossier res/. La classe R est une classe statique générée par le système (dans app/build/generated) : elle contient les identifiants de toutes les ressources et ne doit pas être modifiée à la main. (QCM DS/EXAM : réponses a et a.)" },
    { id: "an107", chapter: "ui", question: "Laquelle de ces propositions n'est PAS incluse dans AndroidManifest.xml ?", options: ["Les activités composant l'application", "Les permissions requises pour l'application", "La version minimale du SDK requise", "Le modèle compatible avec votre application"], correct: 3, explanation: "Le manifeste contient les activités, les permissions et même la version minimale du SDK (<uses-sdk android:minSdkVersion=\"15\"/>) — mais pas « le modèle compatible avec votre application » (le modèle du téléphone n'est pas déclaré dans le manifeste). (QCM DS/EXAM : réponse d.)" },
    { id: "an108", chapter: "ui", question: "Chaque activité utilisée par une application doit être enregistrée dans AndroidManifest.xml.", options: ["Vrai", "Faux", "Suivant la version d'Android", "Aucune bonne réponse"], correct: 0, explanation: "Vrai : chaque activité doit être déclarée dans le manifeste, sinon une ActivityNotFoundException se produit au démarrage. Les permissions, elles, se fixent aussi dans le fichier AndroidManifest.xml (réponses ouvertes du QCM : la classe statique du système Android est la classe R ; les permissions se fixent dans AndroidManifest.xml)." },
    { id: "an109", chapter: "ui", question: "Quels composants existent sous Android ?", options: ["Activity, Service, Content Provider", "Activity, Service, Wave Provider", "Fragment, Service, Wave Provider", "Activity, Widget, Provider"], correct: 0, explanation: "Les composants Android : Activity, Service, Content Provider, Broadcast Receiver, Fragment, Intent. « Wave Provider » n'est pas un composant Android standard. (QCM DS/EXAM : réponse a, b, c — le Wave Provider n'existe pas.)" },
    { id: "an110", chapter: "intro", question: "Avec le code de couleur RGB, quelle est la couleur bleue ?", options: ["#FF0000", "#00FF00", "#0000FF", "#FFFFFF"], correct: 2, explanation: "En RGB (RedGreenBlue), le bleu est #0000FF. #FF0000 = rouge, #00FF00 = vert. Les valeurs des couleurs sont en hexadécimal en unités RGB. (QCM DS/EXAM : réponse ouverte — 0000FF.)" },
    { id: "an111", chapter: "env", question: "Durant la phase de développement, comment tester son application sur plusieurs devices Android ?", options: ["En achetant chacun de ces devices", "En utilisant Android Device Monitor", "Avec Chrome et son émulateur", "En utilisant Android Virtual Device et en configurant plusieurs devices virtuels"], correct: 3, explanation: "Pour tester sur plusieurs devices Android : utiliser Android Virtual Device (AVD Manager) et configurer plusieurs devices virtuels. C'est l'objectif de l'émulateur : développer pour divers types d'appareils (téléphones, tablettes, différentes tailles d'écran) sans les posséder. (QCM DS/EXAM : réponse d.)" },
  ],
};
