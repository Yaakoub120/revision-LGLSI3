import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// VIRTUALISATION & CLOUD — Modules 3, 4, 5
// (Cours Partie 1, slides 32-66)
// ═══════════════════════════════════════════════════════════════

export const vmod3: Module = {
  id: 'v3',
  num: 3,
  title: 'La virtualisation : concepts',
  subtitle: 'Pourquoi, définitions, principes, composants, VM (fichiers, snapshots, clones, export)',
  icon: '🧩',
  color: 'violet',
  source: 'Partie 1 — Virtualisation (slides 32-48)',
  sections: [
    {
      id: 'v3s1',
      title: 'Pourquoi virtualiser ? Le problème de l\u2019architecture classique',
      blocks: [
        { type: 'paragraph', text: 'Les serveurs sont de plus en plus accessibles (hardware de plus en plus performant). Les éditeurs (Microsoft, distributions Linux) recommandent une application/service par système d\u2019exploitation : un serveur pour le DNS, un pour le mail, un pour le NFS, etc.' },
        { type: 'stats', items: [
          { value: '80 %', label: 'des serveurs des datacenters ont une utilisation moyenne inférieure à 10 %' },
          { value: '1 app/OS', label: 'recommandation des éditeurs : un serveur par service (DNS, mail, NFS…)' },
          { value: '↑ coûts', label: 'exploitation/maintenance (personnel IT) croissant avec le nombre de serveurs' },
          { value: '↑ clim', label: 'coûts en place (salles serveurs non extensibles) et en climatisation/électricité élevés' },
        ] },
        { type: 'paragraph', text: 'Résultat : une multiplicité de serveurs dans les datacenters (ou salles serveurs des entreprises), avec des coûts d\u2019exploitation et de maintenance qui croissent avec leur nombre. Il ne faut jamais négliger ces coûts.' },
      ],
    },
    {
      id: 'v3s2',
      title: 'Définitions de la virtualisation',
      blocks: [
        { type: 'definition', term: 'Virtualisation (déf. 1)', def: 'L\u2019ensemble des techniques qui permet de faire tourner plusieurs systèmes d\u2019exploitation sur une machine simultanément, comme s\u2019ils fonctionnaient sur des ordinateurs distincts. De la même façon que l\u2019on fait fonctionner plusieurs programmes sur un même OS (multi-tâches), on sait faire fonctionner plusieurs OS sur un même hardware (virtualisation). Ce n\u2019est PAS du multi-boot.' },
        { type: 'definition', term: 'Virtualisation (déf. 2)', def: 'Simulation, émulation d\u2019un environnement réel de façon virtuelle, logique, en ayant recours à des outils logiciels (VLAN : réseau local virtuel, machine virtuelle, etc.). Ensemble de techniques matérielles et/ou logicielles qui autorisent l\u2019exécution de plusieurs applications (systèmes) indépendantes sur une même machine hôte.' },
        { type: 'list', items: [
          'On parle d\u2019environnement virtuel (Virtual Environment — VE) ou de serveur privé virtuel (Virtual Private Server — VPS) lorsqu\u2019une machine exploite la virtualisation.',
          'Pour en bénéficier, il suffit d\u2019équiper la machine d\u2019un logiciel de virtualisation qui ajoute une couche de virtualisation appelée hyperviseur.',
          'L\u2019hyperviseur masque les véritables ressources physiques de la machine et propose des ressources différentes et spécifiques selon les applications (nouvelle configuration).',
          'Il y a indépendance entre le matériel et les applications.',
        ] },
      ],
    },
    {
      id: 'v3s3',
      title: 'Principes : cloisonnement & transparence',
      blocks: [
        { type: 'kv', items: [
          { k: 'Le cloisonnement', v: 'Chaque système d\u2019exploitation a un fonctionnement indépendant et ne peut interférer avec les autres en aucune manière.' },
          { k: 'La transparence', v: 'Le fait de fonctionner en mode virtualisé ne change rien au fonctionnement du système d\u2019exploitation.' },
        ] },
        { type: 'note', title: 'Transparence implique compatibilité', text: 'Toutes les applications peuvent tourner sur un système virtualisé, et leur fonctionnement n\u2019est en rien modifié.' },
      ],
    },
    {
      id: 'v3s4',
      title: 'Cas d\u2019utilisation',
      blocks: [
        { type: 'list', items: [
          'Tester un OS sans l\u2019installer sur votre machine physique.',
          'S\u2019assurer de la compatibilité d\u2019une application avec différents OS.',
          'Utiliser une application dans un environnement particulier.',
          'Utiliser les fonctionnalités spécifiques d\u2019un OS.',
          'Simuler une 2e machine et faire des tests de communication simples.',
          'Créer un petit réseau de plusieurs machines.',
          'Simuler des environnements multi-OS.',
          'Partager un serveur physique en plusieurs serveurs virtuels.',
          'Rendre une architecture hautement disponible (HA) en améliorant sa tolérance aux pannes.',
          'Migrer des serveurs virtuels sur de nouveaux serveurs physiques.',
          'Faciliter les opérations de maintenance.',
        ] },
      ],
    },
    {
      id: 'v3s5',
      title: 'Avantages / Inconvénients',
      blocks: [
        { type: 'table', headers: ['Avantages', 'Inconvénients'], rows: [
          ['Moins de serveurs physiques', 'Plusieurs environnements virtuels s\u2019exécutent sur une unique machine physique'],
          ['Économie sur le matériel', 'Machine physique en panne → suspension de tous les services'],
          ['Usage optimal des ressources', 'Le recours à des machines puissantes est nécessaire'],
          ['De meilleures performances (consolidation)', 'Les outils de virtualisation sont généralement gourmands en ressources'],
          ['Une meilleure sécurité (isolation)', 'La virtualisation peut réduire les performances des applications'],
          ['Un gain dans les coûts', 'Suivant le type de virtualisation, cette perte peut ou non être significative'],
          ['La portabilité', ''],
          ['Un monitoring simplifié', ''],
          ['De la haute disponibilité', ''],
          ['Réduction de l\u2019impact environnemental (moins d\u2019énergie, cycle de vie matériel allongé…)', ''],
        ], caption: 'Avantages et inconvénients de la virtualisation (slide 38)' },
      ],
    },
    {
      id: 'v3s6',
      title: 'Composants d\u2019un système virtuel',
      blocks: [
        { type: 'kv', items: [
          { k: 'Système hôte (host)', v: 'L\u2019OS principal de l\u2019ordinateur.' },
          { k: 'Système invité (guest)', v: 'L\u2019OS installé à l\u2019intérieur d\u2019une machine virtuelle.' },
          { k: 'Machine virtuelle (VM)', v: 'Un ordinateur virtuel qui utilise un système invité.' },
          { k: 'Hyperviseur', v: 'Composant essentiel entre le matériel et les machines virtuelles.' },
        ] },
        { type: 'paragraph', text: 'La machine virtuelle est un système informatique virtuel, conteneur de logiciels parfaitement isolé, intégrant un système d\u2019exploitation et des applications. Chaque VM autonome est entièrement indépendante. L\u2019installation de plusieurs VM sur un ordinateur permet d\u2019exécuter différents systèmes d\u2019exploitation et applications sur un seul et même serveur physique (« hôte »).' },
        { type: 'paragraph', text: 'L\u2019hyperviseur, fine couche logicielle, dissocie les machines virtuelles de l\u2019hôte et alloue dynamiquement des ressources informatiques à chaque machine selon les besoins. Quelle que soit la technologie utilisée, une VM se compose de deux éléments :' },
        { type: 'list', items: [
          'Ressources : part de CPU alloués, mémoire vive autorisée, nombre de cartes réseau virtuelles.',
          'Données : comme un serveur normal, un système d\u2019exploitation, des bibliothèques, des outils, des applications et leurs données.',
        ] },
      ],
    },
    {
      id: 'v3s7',
      title: 'Les fichiers d\u2019une machine virtuelle',
      blocks: [
        { type: 'paragraph', text: 'Lorsqu\u2019une machine virtuelle est créée, elle apparaît sur l\u2019ordinateur hôte sous la forme d\u2019un ensemble de fichiers, généralement stockés dans un répertoire créé par l\u2019hyperviseur.' },
        { type: 'table', headers: ['Nom du fichier', 'Type de fichier', 'Description'], rows: [
          ['<vmname>.log', 'Log file', 'Conserve un journal de l\u2019activité de la VM ; utilisé pour le dépannage'],
          ['<vmname>.nvram', 'BIOS file', 'Fichier qui stocke l\u2019état du BIOS de la machine virtuelle'],
          ['<vmname>.vmdk', 'Virtual disk file', 'Stocke le contenu de l\u2019unité de disque de la VM. Un disque virtuel est composé d\u2019un ou plusieurs fichiers .vmdk selon la taille du disque'],
          ['<vmname>.vmsd / .vmsn', 'Snapshot file', 'Fichier centralisé pour stocker informations et métadonnées des instantanés'],
          ['<vmname>.vmss', 'Suspend state file', 'Fichier d\u2019état suspendu : stocke l\u2019état d\u2019une machine virtuelle suspendue'],
          ['<vmname>.vmx', 'Configuration file', 'Stocke le nom de la VM, les informations BIOS, le type d\u2019OS invité et la taille de la mémoire'],
        ], caption: 'Fichiers d\u2019une VM (exemple VMware, slide 41)' },
      ],
    },
    {
      id: 'v3s8',
      title: 'Snapshots (instantanés)',
      blocks: [
        { type: 'definition', term: 'Snapshot', def: 'Capture de l\u2019état exact d\u2019une VM à un instant donné.' },
        { type: 'list', items: [
          'Utilité : revenir rapidement à un état précédent en cas d\u2019erreur ou de test.',
          'Utilité : sauvegarder la configuration avant une mise à jour ou une modification critique.',
          'Caractéristique : ne crée pas une copie complète du disque, mais stocke les changements depuis le snapshot.',
          'Caractéristique : rapide à créer et à restaurer, mais ne remplace PAS une sauvegarde complète.',
        ] },
      ],
    },
    {
      id: 'v3s9',
      title: 'Clones : complet vs lié',
      blocks: [
        { type: 'definition', term: 'Clone', def: 'Création d\u2019une copie complète et indépendante d\u2019une VM existante.' },
        { type: 'list', items: [
          'Utilité : déployer rapidement de nouvelles VM identiques.',
          'Utilité : tester des modifications sans risquer la VM originale.',
          'Utilité : fournir une VM de secours pour remplacer rapidement une VM défaillante.',
        ] },
        { type: 'table', headers: ['Type de clone', 'Caractéristiques'], rows: [
          ['Clonage complet', 'Copie totale, indépendante de l\u2019original'],
          ['Clonage lié (linked clone)', 'Dépend de l\u2019original ; économise de l\u2019espace mais nécessite la VM source'],
        ] },
      ],
    },
    {
      id: 'v3s10',
      title: 'Exportation : OVF & OVA',
      blocks: [
        { type: 'paragraph', text: 'L\u2019exportation crée un fichier (ou ensemble de fichiers) représentant toute la machine virtuelle (configuration, disques, snapshots, etc.) pour pouvoir la déplacer ou la sauvegarder.' },
        { type: 'list', items: [
          'Utilité : déplacer une VM d\u2019un serveur/hyperviseur à un autre.',
          'Utilité : archiver une VM pour restauration ultérieure.',
          'Utilité : partager une VM pré-configurée avec d\u2019autres utilisateurs ou laboratoires.',
        ] },
        { type: 'table', headers: ['Aspect', 'Exportation', 'Clonage'], rows: [
          ['Création', 'Fichier exporté pouvant être importé ailleurs', 'Nouvelle VM sur le même hyperviseur'],
          ['Dépendance', 'Fichier indépendant de l\u2019original', 'Peut être lié ou complet'],
          ['Objectif', 'Déplacement, sauvegarde ou partage', 'Déployer rapidement une copie'],
        ], caption: 'Différence entre exportation et clonage (slide 47)' },
        { type: 'kv', items: [
          { k: 'OVF (Open Virtualization Format)', v: 'Format standard pour enregistrer une VM. Contient plusieurs fichiers : la configuration (.ovf), les disques virtuels (.vmdk ou .vhd) et parfois un fichier de vérification (.mf). Compatible avec plusieurs hyperviseurs (VirtualBox, VMware, etc.).' },
          { k: 'OVA (Open Virtual Appliance)', v: 'Version compressée du format OVF : tous les fichiers OVF regroupés dans un seul fichier .ova. Plus simple à déplacer/partager. Accepté par la plupart des hyperviseurs modernes (VMware, VirtualBox), mais certains préfèrent le décompresser avant import.' },
        ] },
      ],
    },
  ],
}

export const vmod4: Module = {
  id: 'v4',
  num: 4,
  title: 'Hyperviseurs & techniques',
  subtitle: 'Type 1 / Type 2, rôle vs OS, virtualisation complète vs paravirtualisation',
  icon: '⚙️',
  color: 'violet',
  source: 'Partie 1 — Hyperviseurs (slides 49-55)',
  sections: [
    {
      id: 'v4s1',
      title: 'L\u2019hyperviseur : définition et rôle',
      blocks: [
        { type: 'paragraph', text: 'Pour créer des machines virtuelles (guest machines) sur une machine physique (host machine), nous avons besoin d\u2019un logiciel hyperviseur. Il émule ou virtualise les composants de la machine physique en divisant le CPU, la RAM, le disque dur et les cartes réseau, et assigne ces ressources aux machines virtuelles (guest).' },
        { type: 'list', items: [
          'La couche logicielle rendant la virtualisation possible.',
          'S\u2019exécute au-dessous de toutes les VMs pour les gérer.',
          'Assure le contrôle des processeurs et des ressources de la machine physique hôte.',
          'Alloue à chaque MV les ressources dont elle a besoin.',
          'S\u2019assure que les MV ne s\u2019interfèrent pas (isolation et sécurité entre les MV).',
        ] },
        { type: 'paragraph', text: 'Les hyperviseurs sont divisés en deux types indiquant leur mode de fonctionnement : Hyperviseur type 1 (Bare metal) et Hyperviseur type 2 (Host metal).' },
        { type: 'diagram', diagram: 'v-hypervisor-types' },
      ],
    },
    {
      id: 'v4s2',
      title: 'Hyperviseur type 1 — Bare metal',
      blocks: [
        { type: 'list', items: [
          'S\u2019exécute directement sur le hardware.',
          'Noyau hôte allégé et optimisé pour ne faire tourner initialement que des noyaux de systèmes d\u2019exploitation invités adaptés et optimisés à cette architecture spécifique.',
          'Pour des processeurs ayant les instructions de virtualisation matérielle (AMD-V et Intel VT), l\u2019OS invité n\u2019a plus besoin d\u2019être modifié pour être exécuté dans un hyperviseur de type 1.',
          'Le modèle d\u2019hyperviseur le plus répandu en entreprise.',
          'Exemples : XEN, Oracle VM, Microsoft Hyper-V, VMware ESX.',
        ] },
      ],
    },
    {
      id: 'v4s3',
      title: 'Hyperviseur type 2 — Host metal',
      blocks: [
        { type: 'list', items: [
          'S\u2019exécute à l\u2019intérieur d\u2019un OS hôte.',
          'S\u2019exécute en troisième niveau, au-dessus du matériel.',
          'Modèle préféré souvent par les utilisateurs de machines Laptop ou Desktop.',
          'Exemples : VMware Workstation, VMware Fusion, l\u2019hyperviseur open source QEMU, Microsoft Virtual PC et Virtual Server, VirtualBox d\u2019Oracle, Parallels Workstation de SWsoft et Parallels Desktop.',
        ] },
      ],
    },
    {
      id: 'v4s4',
      title: 'Rôle de l\u2019OS vs rôle de l\u2019hyperviseur',
      blocks: [
        { type: 'table', headers: ['Rôle d\u2019un OS', 'Rôle de l\u2019hyperviseur'], rows: [
          ['Partage le processeur entre plusieurs processus', 'Permettre ces mécanismes pour chaque OS invité, lui permettant de croire qu\u2019il est le seul sur la machine'],
          ['Partage la mémoire entre plusieurs processus', 'Intercepter les communications avec les interruptions'],
          ['Partage les I/O des périphériques entre plusieurs processus', 'Simuler de façon logicielle les interfaces'],
        ], caption: 'Comparaison du rôle d\u2019un OS et d\u2019un hyperviseur (slide 52)' },
      ],
    },
    {
      id: 'v4s5',
      title: 'Virtualisation complète',
      blocks: [
        { type: 'definition', term: 'Virtualisation complète', def: 'La virtualisation est dite complète lorsque le système d\u2019exploitation invité n\u2019a pas conscience d\u2019être virtualisé. L\u2019OS virtualisé n\u2019a aucun moyen de savoir qu\u2019il partage le matériel avec d\u2019autres OS.' },
        { type: 'paragraph', text: 'Ainsi, l\u2019ensemble des systèmes d\u2019exploitation virtualisés s\u2019exécutant sur un unique ordinateur peuvent fonctionner de manière totalement indépendante les uns des autres et être vus comme des ordinateurs à part entière sur un réseau.' },
      ],
    },
    {
      id: 'v4s6',
      title: 'Paravirtualisation',
      blocks: [
        { type: 'definition', term: 'Paravirtualisation', def: 'Par opposition à la virtualisation complète : les systèmes d\u2019exploitation doivent être modifiés pour fonctionner sur un hyperviseur de paravirtualisation. Les modifications sont des insertions de drivers permettant de rediriger les appels système au lieu de les traduire. Elle nécessite une collaboration étroite entre l\u2019hyperviseur et les OS invités.' },
        { type: 'paragraph', text: 'Mécanisme de redirection des appels système : des drivers backend et frontend sont installés dans les OS para-virtualisés. Au lieu de traduire les appels système comme dans la virtualisation complète, on ne fait que de la redirection (ce qui est beaucoup plus rapide).' },
        { type: 'list', items: [
          'Il est intelligent d\u2019utiliser ce mécanisme pour accéder au matériel potentiellement très sollicité (disque dur, interface réseau…).',
          'Le contrôle d\u2019un ou plusieurs matériels est donné à un des OS virtualisés (celui qui contient le driver backend), ici l\u2019OS 1.',
          'L\u2019OS 2, qui souhaite accéder au hardware, devra passer par son driver frontend qui redirigera les appels système vers l\u2019OS 1.',
        ] },
        { type: 'note', title: 'Inconvénient', text: 'Dépendance d\u2019un OS virtualisé vis-à-vis d\u2019un autre créée par ce mécanisme de driver : si l\u2019OS 1 tombe en panne, l\u2019OS 2 ne pourra plus accéder au matériel.' },
        { type: 'diagram', diagram: 'v-paravirt' },
      ],
    },
  ],
}

export const vmod5: Module = {
  id: 'v5',
  num: 5,
  title: 'Les types de virtualisation',
  subtitle: 'OS (serveurs, VDI, streaming), applications (sessions, bulles) et réseaux',
  icon: '🗂️',
  color: 'violet',
  source: 'Partie 1 — Types de virtualisation (slides 56-64)',
  sections: [
    {
      id: 'v5s1',
      title: 'Panorama des types',
      blocks: [
        { type: 'paragraph', text: 'La virtualisation peut prendre de nombreuses formes en fonction du type d\u2019utilisation de l\u2019application et de l\u2019utilisation du matériel.' },
        { type: 'list', items: [
          'Virtualisation de l\u2019OS : virtualisation de serveurs ; virtualisation des postes de travail (VDI, streaming d\u2019OS).',
          'Virtualisation des applications : virtualisation de sessions ; virtualisation par isolation ou bulles applicatives (conteneurs d\u2019application).',
          'Virtualisation de réseaux.',
          'Virtualisation de stockage.',
        ] },
      ],
    },
    {
      id: 'v5s2',
      title: 'Virtualisation de serveurs',
      blocks: [
        { type: 'definition', term: 'Virtualisation de serveurs', def: 'Faire fonctionner simultanément, sur un seul serveur physique, plusieurs serveurs virtuels. Dans un même serveur, on peut créer plusieurs serveurs virtuels et plusieurs postes de travail.' },
        { type: 'list', items: [
          'Meilleure utilisation de la capacité de chaque serveur.',
          'Réduire la surface au sol, les équipements matériels, le besoin de climatisation et le nombre d\u2019administrateurs.',
          'Réaliser des économies (locaux, consommation électrique, personnel).',
          'Réduire les délais de mise à disposition de nouveaux serveurs.',
          'Simplifier l\u2019administration et la gestion.',
          'Améliorer le niveau de service et la disponibilité des applications.',
          'Simplifier la migration des applications sur de nouveaux serveurs.',
        ] },
      ],
    },
    {
      id: 'v5s3',
      title: 'Virtualisation des postes de travail — VDI',
      blocks: [
        { type: 'definition', term: 'VDI — Virtual DeskTop Infrastructure', def: 'Des environnements de bureau complets (OS + applications) sont hébergés sur des machines virtuelles centralisées sur des serveurs. Les utilisateurs accèdent à ces machines virtuelles à distance à partir de leurs appareils.' },
        { type: 'list', items: [
          'L\u2019OS complet (Windows ou Linux) tourne sur une machine virtuelle sur un serveur.',
          'Les utilisateurs interagissent avec cette VM via un protocole de bureau à distance (par exemple RDP, Citrix ICA).',
          'Tout est exécuté côté serveur : calcul, stockage, gestion des applications.',
        ] },
        { type: 'note', title: 'Avantages du VDI', text: 'Flexibilité et accès à distance (bureau virtuel depuis n\u2019importe quel appareil) · Sécurité centralisée (données et applications restent dans le datacenter) · Simplification de la gestion (mises à jour, correctifs et applications gérés de façon centralisée).' },
      ],
    },
    {
      id: 'v5s4',
      title: 'Streaming d\u2019OS',
      blocks: [
        { type: 'definition', term: 'Streaming d\u2019OS', def: 'Diffuser un système d\u2019exploitation directement depuis un serveur vers une machine physique ou virtuelle, sans installer le système d\u2019exploitation localement.' },
        { type: 'list', items: [
          'L\u2019OS est stocké et géré sur un serveur central.',
          'Au démarrage de l\u2019appareil client, l\u2019OS est envoyé en temps réel (streamé) sur le client, où il est exécuté en mémoire.',
          'Le poste client peut être un PC léger ou un autre appareil capable de recevoir le flux de l\u2019OS.',
        ] },
        { type: 'note', title: 'Avantages du streaming', text: 'Temps de déploiement rapide (pas d\u2019installation ni de clonage d\u2019OS sur chaque poste) · Moins de stockage local (l\u2019OS n\u2019est pas stocké sur le client) · Gestion simplifiée (mises à jour et correctifs appliqués facilement, l\u2019OS étant streamé à chaque démarrage).' },
      ],
    },
    {
      id: 'v5s5',
      title: 'Virtualisation de sessions',
      blocks: [
        { type: 'definition', term: 'Virtualisation de sessions', def: 'Méthode où plusieurs utilisateurs se connectent simultanément à un serveur, et chacun obtient une session indépendante sur un système d\u2019exploitation partagé.' },
        { type: 'paragraph', text: 'Contrairement au VDI où chaque utilisateur a son propre environnement de machine virtuelle avec un OS dédié, la virtualisation de session fait en sorte que tous les utilisateurs partagent le même OS, mais dans des sessions isolées.' },
        { type: 'list', items: [
          'Serveur central : exécute un OS unique (souvent Windows Server ou un OS Linux) et héberge les applications et bureaux.',
          'Sessions utilisateur : à la connexion, chaque utilisateur ouvre une session distante avec son propre environnement de bureau ou d\u2019application, mais partage les ressources du serveur (CPU, RAM, stockage) avec les autres.',
        ] },
      ],
    },
    {
      id: 'v5s6',
      title: 'Isolation applicative — bulles / conteneurs d\u2019application',
      blocks: [
        { type: 'definition', term: 'Virtualisation par isolation (bulles applicatives)', def: 'Également appelées conteneurs d\u2019applications : méthode de virtualisation légère qui permet d\u2019exécuter des applications dans des environnements isolés les uns des autres, tout en partageant le même système d\u2019exploitation sous-jacent.' },
        { type: 'paragraph', text: 'Contrairement à la virtualisation traditionnelle qui nécessite des machines virtuelles avec leur propre OS, cette technique se concentre sur l\u2019encapsulation et l\u2019isolement des applications. Exemples : UNIX chroot, UNIX LXC (voir l\u2019historique de Docker).' },
      ],
    },
    {
      id: 'v5s7',
      title: 'Virtualisation de réseaux',
      blocks: [
        { type: 'definition', term: 'Virtualisation de réseaux', def: 'Processus qui permet de créer des versions virtuelles de ressources réseau, offrant une abstraction et une gestion améliorées des infrastructures réseau physiques. Elle consiste à découpler (séparer) les fonctions et services réseau de l\u2019infrastructure physique sous-jacente, pour une flexibilité, une scalabilité et une gestion simplifiée.' },
        { type: 'list', items: [
          'Les réseaux virtuels sont isolés les uns des autres : le trafic d\u2019un réseau n\u2019interfère pas avec un autre, ce qui renforce la sécurité des données.',
          'Des équipements comme VMware vSwitch et Open vSwitch facilitent cette abstraction.',
          'Des pare-feu virtuels tels que Cisco ASA Virtual Firewall protègent les flux de trafic.',
          'Les ressources (routeurs, commutateurs) peuvent être découpées logiquement pour une gestion granulaire et une allocation dynamique.',
          'Exemple : des routeurs virtuels comme Cisco CSR 1000V permettent de créer des instances configurables sur un seul appareil physique.',
        ] },
        { type: 'note', title: 'Bilan', text: 'La virtualisation de réseaux améliore la flexibilité, la sécurité et l\u2019optimisation des ressources pour les entreprises.' },
      ],
    },
  ],
}
