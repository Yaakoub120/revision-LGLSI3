import type { Subject } from "@/lib/learn-types";

// ═══════════════════════════════════════════════════════════════════════════
// SUJET 3 — VIRTUALISATION & CLOUD (Parties 1, 2, 4, 5, 6 — Leila GHORBEL, FSM)
// ═══════════════════════════════════════════════════════════════════════════

export const virtualisation: Subject = {
  id: "virtu",
  name: "Virtualisation & Cloud",
  shortName: "Virtualisation",
  teacher: "Leila GHORBEL — FSM",
  icon: "Cloud",
  gradient: "from-sky-500 via-cyan-500 to-teal-500",
  accent: "#06b6d4",
  description:
    "Serveurs, hyperviseurs, RAID, SAN/NAS, datacenters, VMware ESXi, conteneurs et Docker, orchestration avec Docker Swarm et Kubernetes.",
  chapters: [
    {
      id: "p1",
      title: "Partie 1 — Introduction : serveurs et virtualisation",
      summary: "Histoire des systèmes distribués, fonctionnement d'un ordinateur, serveurs physiques et virtuels, virtualisation, hyperviseurs, techniques et types de virtualisation.",
      sections: [
        {
          heading: "Un peu d'histoire",
          blocks: [
            {
              type: "p",
              text: "Les systèmes distribués ont parcouru un long chemin. Au tout début, un ordinateur ne pouvait effectuer qu'une tâche à la fois ; si plusieurs tâches devaient être effectuées en parallèle, plusieurs ordinateurs devaient fonctionner en parallèle. Mais leur exécution en parallèle ne suffisait pas pour construire un système véritablement distribué : il fallait un mécanisme pour communiquer entre différents ordinateurs. Cette nécessité d'échanger (partager) des données a suscité l'idée d'une communication orientée message, dans laquelle deux ordinateurs partagent des données à l'aide d'un message qui les encapsule. Il existait peu d'autres mécanismes comme le partage de fichiers et le partage de base de données.",
            },
            {
              type: "p",
              text: "Les architectures orientées service (SOA) : l'invention des OS multitâches (Windows, Unix) a permis de créer et d'exécuter des systèmes distribués complets. Chaque système distribué pouvait être construit en intégrant un ensemble de services exécutés sur un ou plusieurs ordinateurs. Les interfaces de service étaient définies via un WSDL (pour SOAP) ou un WADL (pour REST) et les consommateurs utilisaient ces interfaces pour leurs implémentations côté client. Avec la popularité d'Internet et la simplicité du modèle, la communication REST est devenue plus populaire que SOAP, conduisant à l'évolution des APIs REST. Une API est un médiateur entre les utilisateurs/clients et les ressources ou services web auxquels ils souhaitent accéder ; pour une entreprise, c'est aussi une solution pour partager ressources et informations tout en maintenant un certain niveau de sécurité.",
            },
            {
              type: "p",
              text: "Les machines virtuelles : l'importance des entreprises basées sur Internet (Facebook, Google, Amazon, Netflix, LinkedIn, Twitter) a conduit à vouloir des systèmes distribués couvrant plusieurs zones géographiques et plusieurs centres de données. Les ingénieurs ont réfléchi au concept d'un seul ordinateur : au lieu de considérer un ordinateur comme unique, créer plusieurs ordinateurs virtuels sur le même ordinateur. Cela a conduit à l'idée de machines virtuelles : un même ordinateur peut agir comme plusieurs ordinateurs et les exécuter tous en parallèle. La technologie de virtualisation rend possible le cloud computing : les fournisseurs de cloud mettent en place et entretiennent leurs propres datacenters, créent différents environnements virtuels utilisant les ressources matérielles de base, et vous programmez votre système pour accéder à ces ressources via des APIs.",
            },
          ],
        },
        {
          heading: "Rappel : le fonctionnement d'un ordinateur",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "ROM (Read Only Memory)", v: "Mémoire non volatile qui stocke un logiciel appelé BIOS, responsable du démarrage du matériel. La ROM ne s'efface jamais lorsque vous éteignez l'ordinateur." },
                { k: "Carte mère", v: "PCB (Printed Circuit Board) contenant le processeur, la RAM, la ROM, le réseau et les ports I/O (Input/Output), ainsi que d'autres composants." },
                { k: "Stockage", v: "Dispositif de stockage persistant (non volatile) : disque dur (HDD) ou disque SSD (Solid State Drive)." },
                { k: "RAM (Random Access Memory)", v: "Contient les programmes à exécuter et les données actuellement utilisées par le processeur." },
                { k: "Processeur (CPU)", v: "Computer Processing Unit : la partie de l'ordinateur qui exécute les programmes logiciels en effectuant des opérations mathématiques, logiques et d'entrée/sortie. C'est la partie du matériel qui résout les problèmes." },
              ],
            },
            {
              type: "table",
              headers: ["Base de comparaison", "Logiciel d'application", "Logiciel système"],
              rows: [
                ["De base", "Exécute des tâches spécifiques pour lesquelles il a été conçu", "Gère les ressources système et fournit une plate-forme pour l'exécution du logiciel d'application"],
                ["La langue", "Écrit dans un langage évolué (Java, C++, .net, VB…)", "Écrit dans un langage de bas niveau (assemblage)"],
                ["Exécution", "Au fur et à mesure des demandes de l'utilisateur", "Démarre avec le système et s'exécute jusqu'à l'arrêt"],
                ["Exigence", "Pas nécessaire pour exécuter le système ; spécifique à l'utilisateur", "Un système ne peut pas fonctionner sans logiciel système"],
                ["Objectif", "Spécifique", "Polyvalent"],
                ["Exemples", "Microsoft Office, Photoshop, logiciel d'animation", "Système d'exploitation"],
              ],
            },
          ],
        },
        {
          heading: "Les serveurs",
          blocks: [
            {
              type: "p",
              text: "De nos jours, les utilisateurs (entreprises) investissent beaucoup dans leurs infrastructures informatiques pour améliorer efficacité et fiabilité. Il existe des solutions traditionnelles (serveurs physiques = déploiements de centres de données traditionnels) et virtuelles (serveurs virtuels = services innovants centrés sur le cloud computing, adaptés aux besoins du futur).",
            },
            {
              type: "kv",
              items: [
                { k: "Serveur physique", v: "Très similaire à un ordinateur conventionnel : mémoire, processeur, connexion réseau, disque dur et OS pour exécuter programmes et applications. Mis à disposition d'un seul client. Formats : tour (ressemble à une unité centrale, s'installe dans n'importe quelle pièce), rack (conçu pour être disposé dans des baies/armoires équipées), lame ou blade (les derniers nés : compacts et minces, se glissent verticalement dans un casier dédié)." },
                { k: "Types de serveurs physiques", v: "Serveur Web (enregistrer des contenus web, assurer l'accessibilité), Proxy (interface de communication : filtrer les communications, contrôler la bande passante), de fichiers (stockage pour plusieurs clients), de bases de données (permettre à d'autres programmes d'accéder à des SGBD sur le réseau), d'impression (plusieurs ordinateurs connectés à distance pour imprimer), email (recevoir et expédier des courriels)." },
                { k: "Serveur virtuel", v: "Ne fonctionne pas sur un ordinateur physique mais sur un logiciel spécialisé appelé hyperviseur. Système convertissant un serveur physique en plusieurs machines virtuelles (VM) indépendantes qui agissent de manière autonome comme un dispositif physique. Chaque VM exécute son propre OS grâce aux techniques de virtualisation et peut être migrée facilement vers l'environnement cloud." },
              ],
            },
          ],
        },
        {
          heading: "La virtualisation : définitions et principes",
          blocks: [
            {
              type: "p",
              text: "Pourquoi virtualiser ? Les serveurs sont de plus en plus accessibles, le matériel de plus en plus performant, et les éditeurs (Microsoft, distributions Linux) recommandent une application/service par système d'exploitation : un serveur pour le DNS, un pour le mail, un pour le NFS, etc. Résultat : une multiplicité de serveurs dans les datacenters où 80 % ont une utilisation moyenne inférieure à 10 %, des coûts d'exploitation/maintenance qui croissent avec le nombre de serveurs, des coûts en place (salles serveurs non extensibles indéfiniment) et des coûts élevés en climatisation/électricité.",
            },
            {
              type: "kv",
              items: [
                { k: "Définition 1", v: "L'ensemble des techniques qui permet de faire tourner plusieurs systèmes d'exploitation sur une machine simultanément, comme s'ils fonctionnaient sur des ordinateurs distincts. De la même façon qu'on fait fonctionner plusieurs programmes sur un même OS (multi-tâches), on sait faire fonctionner plusieurs OS sur un même hardware. Ce n'est PAS du multi-boot." },
                { k: "Définition 2", v: "Simulation, émulation d'un environnement réel de façon virtuelle/logique en ayant recours à des outils logiciels (VLAN : réseau local virtuel, machine virtuelle…). Ensemble de techniques matérielles et/ou logicielles autorisant l'exécution de plusieurs applications (systèmes) indépendantes sur une même machine hôte." },
                { k: "VE / VPS", v: "On parle d'environnement virtuel (Virtual Environment – VE) ou de serveur privé virtuel (Virtual Private Server – VPS) lorsqu'une machine exploite la virtualisation." },
                { k: "Hyperviseur", v: "Pour en bénéficier, il suffit d'équiper la machine d'un logiciel de virtualisation ajoutant une couche appelée hyperviseur. Il masque les véritables ressources physiques et propose des ressources différentes et spécifiques selon les applications qui tournent (nouvelle configuration). Il y a indépendance entre le matériel et les applications." },
                { k: "Principe : cloisonnement", v: "Chaque système d'exploitation a un fonctionnement indépendant et ne peut interférer avec les autres en aucune manière." },
                { k: "Principe : transparence (→ compatibilité)", v: "Fonctionner en mode virtualisé ne change rien au fonctionnement de l'OS ; toutes les applications peuvent tourner sur un système virtualisé sans que leur fonctionnement soit modifié." },
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Cas d'utilisation", v: "Tester un OS sans l'installer ; vérifier la compatibilité d'une application avec différents OS ; utiliser une application dans un environnement particulier ; utiliser les fonctionnalités spécifiques d'un OS ; simuler une 2e machine et faire des tests de communication ; créer un petit réseau de machines ; simuler des environnements multi-OS ; partager un serveur physique en plusieurs serveurs virtuels ; rendre une architecture hautement disponible (HA) ; migrer des serveurs virtuels sur de nouveaux serveurs physiques ; faciliter la maintenance." },
                { k: "Avantages", v: "Moins de serveurs physiques, économie sur le matériel, usage optimal des ressources, meilleures performances, meilleure sécurité, gain dans les coûts, portabilité, monitoring simplifié, haute disponibilité, réduction de l'impact environnemental (moins d'énergie, allongement du cycle de vie du matériel)." },
                { k: "Inconvénients", v: "Plusieurs environnements virtuels sur une unique machine physique → machine physique en panne = suspension de tous les services ; recours à des machines puissantes ; outils de virtualisation généralement gourmands en ressources ; la virtualisation peut réduire les performances des applications (selon le type, la perte peut être significative ou non)." },
              ],
            },
          ],
        },
        {
          heading: "Composants d'un système virtuel",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Système hôte (host)", v: "L'OS principal de l'ordinateur." },
                { k: "Système invité (guest)", v: "L'OS installé à l'intérieur d'une machine virtuelle." },
                { k: "Machine virtuelle (VM)", v: "Ordinateur virtuel qui utilise un système invité ; système informatique virtuel, conteneur de logiciels parfaitement isolé intégrant un OS et des applications. Chaque VM autonome est entièrement indépendante. L'hyperviseur, fine couche logicielle, dissocie les VM de l'hôte et alloue dynamiquement les ressources selon les besoins." },
                { k: "Composition d'une VM", v: "Ressources (part de CPU allouée, mémoire vive autorisée, nombre de cartes réseau virtuelles) + données (OS, bibliothèques, outils, applications et leurs données)." },
              ],
            },
            {
              type: "table",
              headers: ["Fichier VM (VMware)", "Type", "Description"],
              rows: [
                ["<vmname>.log", "Log file", "Journal de l'activité de la VM, utilisé pour le dépannage"],
                ["<vmname>.nvram", "BIOS file", "Stocke l'état du BIOS de la machine virtuelle"],
                ["<vmname>.vmdk", "Virtual disk file", "Contenu de l'unité de disque ; un disque virtuel peut être composé de plusieurs .vmdk selon la taille"],
                ["<vmname>.vmsd / .vmsn", "Snapshot file", "Fichier centralisé pour les informations et métadonnées des instantanés"],
                ["<vmname>.vmss", "Suspend state file", "Fichier d'état suspendu : stocke l'état d'une VM suspendue"],
                ["<vmname>.vmx", "Configuration file", "Nom de la VM, informations BIOS, type d'OS invité, taille mémoire"],
              ],
            },
            {
              type: "p",
              text: "Lorsqu'une VM est créée, elle apparaît sur l'hôte sous la forme d'un ensemble de fichiers, généralement stockés dans un répertoire créé par l'hyperviseur.",
            },
            {
              type: "kv",
              items: [
                { k: "Snapshot (instantané)", v: "Capture de l'état exact d'une VM à un instant donné. Utilité : revenir rapidement à un état précédent en cas d'erreur ou de test ; sauvegarder la configuration avant une mise à jour critique. Caractéristiques : ne crée pas une copie complète du disque mais stocke les changements depuis le snapshot ; rapide à créer/restaurer mais ne remplace pas une sauvegarde complète." },
                { k: "Clone", v: "Création d'une copie complète et indépendante d'une VM existante. Utilité : déployer rapidement des VM identiques, tester sans risquer l'originale, fournir une VM de secours. Types : clonage complet (copie totale, indépendante de l'original) ou clonage lié (linked clone : dépend de l'original, économise de l'espace mais nécessite la VM source)." },
                { k: "Exportation", v: "Créer un fichier (ou ensemble de fichiers) représentant toute la VM (configuration, disques, snapshots…) pour la déplacer ou sauvegarder. Utilité : déplacer une VM d'un hyperviseur à un autre, archiver, partager une VM pré-configurée. Différence avec le clonage : export = fichier exporté importable ailleurs, indépendant de l'original, pour déplacement/sauvegarde/partage ; clone = nouvelle VM sur le même hyperviseur, liée ou complète, pour déployer rapidement une copie." },
                { k: "Formats d'exportation", v: "OVF (Open Virtualization Format) : format standard contenant plusieurs fichiers (configuration .ovf, disques virtuels .vmdk/.vhd, fichier de vérification .mf), compatible avec plusieurs hyperviseurs (VirtualBox, VMware…). OVA (Open Virtual Appliance) : version compressée du format OVF — tous les fichiers regroupés dans un seul .ova, plus simple à déplacer/partager ; la plupart des hyperviseurs modernes l'acceptent (certains préfèrent décompresser avant import)." },
              ],
            },
          ],
        },
        {
          heading: "L'hyperviseur",
          blocks: [
            {
              type: "p",
              text: "Pour créer des machines virtuelles (guest machines) sur une machine physique (host machine), il faut un logiciel hyperviseur : il émule ou virtualise les composants de la machine physique en divisant le CPU, la RAM, le disque dur et les cartes réseau, et assigne ces ressources aux VM. C'est la couche logicielle rendant la virtualisation possible. Il s'exécute au-dessous de toutes les VMs pour les gérer, assure le contrôle des processeurs et des ressources de la machine hôte, alloue à chaque MV les ressources dont elle a besoin, et s'assure que les MV ne s'interfèrent pas (isolation et sécurité entre les MV).",
            },
            {
              type: "kv",
              items: [
                { k: "Hyperviseur type 1 (Bare metal)", v: "S'exécute directement sur le hardware. Noyau hôte allégé et optimisé pour ne faire tourner initialement que des noyaux d'OS invités adaptés. Avec des processeurs ayant les instructions de virtualisation matérielle (AMD-V et Intel VT), l'OS invité n'a plus besoin d'être modifié. C'est le modèle le plus répandu en entreprise. Exemples : XEN, Oracle VM, Microsoft Hyper-V, VMware ESX." },
                { k: "Hyperviseur type 2 (Host metal)", v: "S'exécute à l'intérieur d'un OS hôte, en troisième niveau au-dessus du matériel. Modèle préféré des utilisateurs de laptops/desktops. Exemples : VMware Workstation, VMware Fusion, QEMU, Microsoft Virtual PC et Virtual Server, VirtualBox d'Oracle, Parallels Workstation/Desktop." },
                { k: "Rôle d'un OS vs hyperviseur", v: "L'OS partage le processeur, la mémoire et les I/O des périphériques entre plusieurs processus. L'hyperviseur permet ces mécanismes pour chaque OS invité (lui faisant croire qu'il est seul sur la machine) et intercepte les communications avec les interruptions pour simuler de façon logicielle les interfaces." },
              ],
            },
            {
              type: "diagram",
              id: "hypervisor-types",
              caption: "Hyperviseur type 1 (bare metal : directement sur le matériel) vs type 2 (hébergé dans un OS hôte).",
            },
          ],
        },
        {
          heading: "Techniques de virtualisation",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Virtualisation complète", v: "Le système d'exploitation invité n'a pas conscience d'être virtualisé ; il n'a aucun moyen de savoir qu'il partage le matériel avec d'autres OS. Les OS virtualisés s'exécutent de manière totalement indépendante et sont vus comme des ordinateurs à part entière sur le réseau." },
                { k: "Paravirtualisation", v: "Les OS doivent être MODIFIÉS pour fonctionner sur un hyperviseur de paravirtualisation : insertion de drivers permettant de rediriger les appels système au lieu de les traduire. Nécessite une collaboration étroite entre l'hyperviseur et les OS invités." },
                { k: "Mécanisme de redirection", v: "Des drivers backend et frontend sont installés dans les OS para-virtualisés : au lieu de traduire les appels système (virtualisation complète), on ne fait que de la redirection (beaucoup plus rapide). Utile pour le matériel très sollicité (disque dur, interface réseau…). Le contrôle d'un ou plusieurs matériels est donné à un OS virtualisé (celui qui contient le driver backend, ici l'OS 1) ; l'OS 2 qui souhaite accéder au hardware passe par son driver front end qui redirige les appels vers l'OS 1. Inconvénient : dépendance d'un OS virtualisé vis-à-vis d'un autre — si l'OS 1 tombe en panne, l'OS 2 ne pourra plus accéder au matériel." },
              ],
            },
            {
              type: "table",
              headers: ["Type de virtualisation", "Contenu"],
              rows: [
                ["Virtualisation de l'OS", "Dans un même serveur, on peut créer plusieurs serveurs virtuels et plusieurs postes de travail"],
                ["Virtualisation de serveurs", "Faire fonctionner simultanément plusieurs serveurs virtuels sur un seul serveur physique : meilleure utilisation de la capacité, réduction de la surface au sol/équipements/climatisation/administrateurs, économies (locaux, électricité, personnel), réduction des délais de mise à disposition, administration simplifiée, meilleur niveau de service et disponibilité, migration simplifiée"],
                ["Virtualisation des postes de travail — VDI", "Virtual Desktop Infrastructure : des environnements de bureau complets (OS + applications) hébergés sur des VM centralisées sur des serveurs ; les utilisateurs y accèdent à distance (RDP, Citrix ICA). Tout est exécuté côté serveur. Avantages : flexibilité et accès à distance depuis n'importe quel appareil, sécurité centralisée (données dans le datacenter), gestion centralisée (mises à jour, correctifs)"],
                ["Virtualisation des postes de travail — Streaming d'OS", "Diffuser un OS directement depuis un serveur vers une machine physique ou virtuelle SANS l'installer localement. L'OS est stocké et géré sur un serveur central ; au démarrage de l'appareil client, l'OS est streamé et exécuté en mémoire. Avantages : déploiement rapide, moins de stockage local, gestion simplifiée (mises à jour appliquées à chaque démarrage)"],
                ["Virtualisation d'applications — Sessions", "Plusieurs utilisateurs se connectent simultanément à un serveur, chacun obtient une session indépendante sur un OS partagé. Contrairement à la VDI (VM et OS dédiés par utilisateur), tous partagent le même OS mais dans des sessions isolées. Serveur central (Windows Server ou Linux) hébergeant applications et bureaux ; les sessions partagent CPU, RAM, stockage"],
                ["Virtualisation d'applications — Isolation / Bulles", "Conteneurs d'applications : virtualisation légère exécutant des applications dans des environnements isolés les uns des autres tout en partageant le même OS sous-jacent. Se concentre sur l'encapsulation et l'isolement des applications (pas des machines complètes). Exemples : UNIX chroot, UNIX LXC (voir l'historique de Docker)"],
                ["Virtualisation de réseaux", "Créer des versions virtuelles de ressources réseau : abstraction et gestion améliorée des infrastructures physiques. Découple les fonctions/services réseau de l'infrastructure physique → flexibilité, scalabilité, gestion simplifiée. Réseaux virtuels isolés les uns des autres (sécurité). Équipements : VMware vSwitch, Open vSwitch ; pare-feu virtuels : Cisco ASA Virtual Firewall ; routeurs virtuels : Cisco CSR 1000V (instances configurables sur un seul appareil physique)"],
                ["Virtualisation de stockage", "Plusieurs périphériques de stockage physique regroupés apparaissent comme un seul périphérique ; l'espace regroupé est présenté aux hôtes comme un pool de stockage lié (datastore). Avantages : homogénéisation du stockage (capacités/vitesses différentes), temps d'arrêt réduits, optimisation des performances avec haute disponibilité (HA), migration automatique à chaud (VMotion), automatisation de l'extension de capacité (moins de provisionnement manuel)"],
              ],
            },
          ],
        },
        {
          heading: "Architectures de stockage : DAS, NAS, SAN",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "DAS (Direct Attached Storage)", v: "Stockage à connexion directe au serveur/ordinateur, sans transiter par un réseau. Interfaces : SCSI (Small Computer System Interface), SATA (Serial Advanced Technology Attachment), SAS (Serial Attached SCSI). Avantages : solution la plus économique, très simple et rapide à mettre en place ; envisageable en production avec une solution de sauvegarde adaptée. Inconvénients : espace non dynamique, taux d'utilisation non optimal, temps d'indisponibilité considérable, pas de VMotion ni HA, pas de gestion centralisée des VM." },
                { k: "Solution : stockage centralisé partagé", v: "Redondance des connexions/disques : accès continu aux données en cas de défaillance d'une connexion, d'un disque ou d'une autre partie de l'infrastructure. Les serveurs virtualisés accèdent au stockage partagé." },
                { k: "NAS (Network Attached Storage)", v: "Boîtier contenant un ou plusieurs disques durs, relié au réseau local (LAN) pour partager des fichiers entre plusieurs utilisateurs/ordinateurs. Connecté au réseau par câble Ethernet ; agit comme un petit serveur de fichiers (« disque dur en réseau »). Sans clavier ni écran : configuration via une interface web (Chrome, Firefox) ; possède sa propre adresse IP (nœud du réseau à part entière). Intérêt : centraliser les fichiers, sauvegarder et sécuriser, accéder depuis plusieurs appareils. En virtualisation : datastore centralisé pour les fichiers des VM (disques VMDK, snapshots), les ISO des OS. Protocoles : CIFS/SMB (Windows et Samba sur Linux), NFS (Linux/Unix — le protocole le plus courant dans les NAS, rapide et compatible), AFP (Apple/macOS, AppleShare File Protocol)." },
                { k: "SAN (Storage Area Network)", v: "Réseau spécialisé connectant des serveurs à un espace de stockage centralisé ; utilisé dans les grandes entreprises et les centres de données. Réseau dédié (souvent Fibre Channel ou iSCSI) ; pour les serveurs, le stockage du SAN apparaît comme un disque dur local, alors qu'il est situé dans la baie SAN. Contrairement au NAS (partage de fichiers), le SAN fonctionne au niveau BLOC (accès direct aux disques). Composition : serveurs (utilisent le stockage), switchs SAN (font le lien), baie de stockage (contient les disques). Configuration via l'interface d'administration du constructeur (Dell EMC, NetApp, HPE). Intérêt : très rapide (idéal bases de données et VM), centralisé (un seul gros espace pour plusieurs serveurs), fiable (si un serveur tombe en panne, un autre continue d'accéder aux données). Exemple : dans un datacenter, plusieurs serveurs VMware ESXi accèdent à la même baie SAN — les VM peuvent être déplacées facilement d'un serveur à l'autre." },
                { k: "Résumé NAS vs SAN", v: "NAS = partage de fichiers (comme un disque réseau). SAN = partage de disques (comme si chaque serveur avait un gros disque dur externe très rapide)." },
                { k: "Protocoles SAN", v: "iSCSI : protocole d'accès disque fonctionnant sur réseau Ethernet, implémentable par une baie dédiée (meilleures performances) ou un serveur classique avec le logiciel adéquat (ex. IET — iSCSI Enterprise Target sous Linux). Fibre Channel : la solution la plus haut de gamme — baie dédiée + protocole basé sur des fibres optiques, latence et débit bien meilleurs qu'iSCSI à un prix plus élevé ; même principe d'utilisation qu'un SAN iSCSI. Dans un SAN, les baies n'apparaissent pas comme des volumes partagés : chaque serveur accède à l'espace disque directement en mode bloc (niveau des secteurs, pas des fichiers)." },
              ],
            },
          ],
        },
        {
          heading: "Datacenter, clustering et solutions de virtualisation",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Datacenter (centre de traitement de données)", v: "Ensemble d'équipements constituant le système d'information d'une structure : mainframes (ordinateurs centraux pour charges importantes et critiques), serveurs, baies de stockage, équipements réseaux et télécommunications. Peut aller du local technique/salle machine/étage/bâtiment au complexe de plusieurs bâtiments. Les entreprises délèguent souvent à un datacenter la prise en charge de leurs données virtuelles (stockage, protocoles de transfert) pour mutualiser les coûts et bénéficier des dernières avancées. Un datacenter doit fonctionner 24h/24 et 365 jours par an." },
                { k: "Clustering", v: "Des serveurs configurés de manière similaire sont regroupés avec des connexions au même réseau et au même stockage pour fournir un ensemble de ressources dans l'environnement virtuel : le cluster. Lorsqu'un serveur est ajouté au cluster, ses ressources sont intégrées ; le cluster gère les ressources de tous les serveurs et agit comme une entité unique. Bénéfice : si un serveur tombe en panne, un autre peut prendre sa place." },
                { k: "Avantages d'un datacenter", v: "Environnement hyper sécurisé pour les données ; équipements utiles et efficaces dans leur contexte ; données disponibles en permanence ; haute qualité de service et haute disponibilité." },
                { k: "Enjeux : haute disponibilité", v: "Le service doit rester disponible malgré les risques : naturels (inondation, séisme, incendie → étude géographique de l'emplacement, sauvegardes régulières et duplication), surchauffe (climatisation indispensable), coupure électrique (diversifier les sources), humains (mauvaise manipulation ou intention → contrôle d'accès, gestion des autorisations, suivi et journaux, traces), connexion réseau/internet point d'entrée au cloud (dupliquée et sécurisée)." },
                { k: "Enjeux : protection et sécurité", v: "Contrôle d'accès (badge, empreinte digitale…), verrouillage automatique des points d'accès, surveillance (capteurs vidéo, thermiques, de proximité), identification du personnel, détection/prévention d'intrusions, pare-feu, antivirus, chiffrement des données." },
                { k: "VMware (ESXi)", v: "Fondée en 1998, première entreprise à développer une solution de virtualisation x86 commerciale. Workstation 1.0 (VM sur postes Windows/Linux), puis 2001 : ESX 1.0 (hyperviseur type 1) et GSX 1.0 (type 2). ESXi = même noyau d'hyperviseur sans la console de service (l'architecture d'origine d'ESX comportait l'hyperviseur + un module de console basé sur Linux). Deux versions ESX/ESXi de la 3.5 (2007) à la 4.1 (2010) ; depuis la version 5 (2011), seule l'architecture ESXi existe. Composants : vCenter Server (gère tous les composants physiques et virtuels d'un centre de données virtualisé), vSphere Client (se connecter au vCenter pour gérer vCenter et les hôtes ESXi), vMotion (migrer des VM d'un hôte ESXi à un autre sans temps d'arrêt), High Availability/HA (disponibilité continue : redémarre automatiquement les VM sur d'autres hôtes en cas de défaillance)." },
                { k: "Citrix Xen", v: "Le modèle Xen a un invité spécial appelé Domaine 0 (Dom0), démarré lors du démarrage de l'hyperviseur. Il dispose de privilèges de gestion différents des autres invités : accès direct au matériel et gestion de toutes les E/S pour les invités individuels." },
                { k: "QEMU-KVM", v: "KVM (Kernel-based Virtual Machine) prend en charge la virtualisation complète (invités non modifiés) ET la paravirtualisation. Solution open source intégrée au noyau Linux depuis la version 2.6.20. KVM est un projet issu de QEMU (Quick Emulator) dont il utilise une version modifiée : on référence en réalité la combinaison QEMU-KVM." },
                { k: "Microsoft Hyper-V", v: "Microsoft a débuté dans la virtualisation avec Virtual Server en 2005 ; Hyper-V a été publié en 2008 comme partie installable de Windows Server 2008." },
              ],
            },
            {
              type: "kv",
              items: [
                { k: "VirtualBox — réseau NAT", v: "Manière la plus simple d'accéder à un réseau externe depuis une VM ; n'exige aucune configuration sur le réseau hôte ou le système invité (mode réseau par défaut de VirtualBox). La VM avec NAT agit comme un vrai ordinateur connecté à Internet par un routeur ; le « routeur » est le moteur réseau de VirtualBox qui dirige le trafic de façon transparente. Il se place entre chaque VM et l'hôte : cette séparation maximise la sécurité puisque, par défaut, les VM ne peuvent pas se parler et ne peuvent pas être contactées de l'extérieur." },
                { k: "VirtualBox — réseau bridgé", v: "VirtualBox intercepte les données du réseau physique et y envoie des données, créant une nouvelle interface réseau logicielle. Quand un invité utilise cette interface, cela se passe comme s'il était connecté physiquement au réseau par un câble. L'hôte peut envoyer des données à l'invité et en recevoir. Avec ce mode, les VMs peuvent contacter l'hôte et l'extérieur, et être contactées depuis l'hôte." },
                { k: "VirtualBox — réseau Host-Only", v: "Les machines virtuelles peuvent communiquer uniquement entre elles et avec l'hôte sur lequel elles sont exécutées. Elles ne peuvent pas accéder au réseau externe ni à Internet, ni communiquer avec des machines physiques en dehors de l'hôte." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "p4",
      title: "Partie 2 — Conteneurisation et Docker",
      summary: "Conteneurs vs VM, historique, architecture Docker, commandes de base, volumes, Dockerfile, networking, Docker Compose, registries, cgroups.",
      sections: [
        {
          heading: "Le conteneur : définition et avantages",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Conteneur", v: "Enveloppe permettant de packager une application avec juste ce dont elle a besoin pour fonctionner. Peut être déployé tel quel dans n'importe quelle machine disposant d'un Container Engine, avec différents environnements (Dev, Test, Prod). Utilise le kernel de l'OS hôte ; a son propre espace de processus et sa propre interface réseau ; isolé de l'hôte mais exécuté directement dessus. Permet de décomposer l'infrastructure applicative en petits éléments légers faciles à déployer et réutiliser." },
                { k: "Avantages", v: "Meilleures performances que les VM (démarrage instantané), portabilité d'un environnement à l'autre (multicloud), cohérence entre les environnements Dev/test/prod, modularisation facile de l'application, gestion de l'héritage technique (anciennes applications) grâce à l'isolation." },
                { k: "Machine virtuelle", v: "Permet de virtualiser une machine physique ; chaque VM a son propre OS ; consomme beaucoup de ressources (CPU, stockage) et prend du temps à booter (quelques minutes)." },
                { k: "Conteneur vs VM", v: "Le conteneur crée un environnement d'exécution des applications ; les conteneurs utilisent le même OS, le même kernel (Linux), consomment peu de ressources et bootent rapidement (quelques secondes)." },
                { k: "VM + conteneurs ensemble", v: "Les container engines ne viennent pas remplacer les VM. Dans la pratique on utilise les deux : les machines virtuelles pour virtualiser les machines, et un container engine (Docker) pour isoler les environnements d'exécution des applications dans des VM — pour tirer le bénéfice des deux technologies." },
              ],
            },
            {
              type: "diagram",
              id: "vm-vs-conteneur",
              caption: "Machine virtuelle (OS complet par VM, via hyperviseur) vs conteneur (processus isolés partageant le kernel de l'hôte).",
            },
            {
              type: "list",
              items: [
                "Historique — conteneur = unité de transport intermodal. Virtualisation de processus : UNIX chroot (1979-1982), BSD Jail (1998), Parallels Virtuozzo (2001), Solaris Containers (2005), Linux LXC (2008), Docker (2013, basé sur LXC).",
              ],
            },
          ],
        },
        {
          heading: "Docker : origine et architecture",
          blocks: [
            {
              type: "p",
              text: "Docker permet de créer des environnements (containers) isolant des applications ; il empaquette une application et ses dépendances dans un conteneur virtuel isolé, exécutable sur n'importe quelle machine supportant Docker. Logiciel libre de déploiement d'applications sous forme de conteneurs logiciels. Origine : société française au départ (dotCloud : un PaaS avec un container engine écrit en Python), maintenant basée à San Francisco. 2012 : réécriture en langage Go. 2013 : première version Open source, réaction très positive de la communauté, dotCloud devient Docker. 2014 : levée de fonds de 40 M$, 2015 : 95 M$.",
            },
            {
              type: "p",
              text: "Problèmes de déploiement : pour une application utilisant différentes technologies (services), des problèmes se posent en production — compatibilité des applications avec les OS, installation des dépendances et librairies avec les bonnes versions pour chaque service, installation des différents environnements (Dev, Test, Prod). Cela prend beaucoup de temps et crée des conflits entre développeurs et opérationnels (administrateurs systèmes). Solution : conteneurs d'applications — embarquer les applications dans des conteneurs et exécuter chaque service avec ses propres dépendances dans des conteneurs séparés.",
            },
            {
              type: "list",
              items: [
                "Le développeur crée un fichier Dockerfile contenant les commandes que docker exécutera pour construire une image de l'application : $ docker build.",
                "L'image docker contient tout ce dont l'application a besoin pour s'exécuter correctement.",
                "Les images peuvent être publiées dans un registre public (Docker Hub) ou privé : $ docker push image_name.",
                "Pour télécharger une image dans un Host Docker : $ docker pull image_name.",
                "La création/exécution d'un conteneur se fait par instanciation de l'image : $ docker run image_name (si l'image n'existe pas dans le host, docker la télécharge avant de créer et exécuter le conteneur).",
                "Docker se compose de : Docker Engine (crée le Host Docker sur une machine Linux — Docker daemon) et un client Docker (n'importe quelle machine, connecté au Docker Engine via différents connecteurs : socket, REST API, etc.).",
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Image docker", v: "Un fichier package représentant la TEMPLATE des conteneurs. Elle définit la structure du conteneur en englobant l'application conteneurisée et l'ensemble de ses dépendances." },
                { k: "Conteneur", v: "Une instance d'une image. Exécuté par le Docker Host : cela implique l'exécution de l'application qu'il transporte dans un environnement isolé fourni par le conteneur." },
                { k: "DevOps avec Docker", v: "Sans Docker : le développeur génère le package (App.war) + descriptif des dépendances → l'opérationnel doit se débrouiller → mêmes histoires à chaque mise à jour → conflits développeurs/opérationnels. Avec Docker : le développeur construit une image contenant toutes les dépendances et la publie dans le registre ; l'opérationnel déploie en instanciant des conteneurs à partir de l'image récupérée du repository." },
                { k: "Éditions", v: "Community Edition (open source) : Linux, Mac, Windows, Cloud (Azure, AWS, GCP). Pour Windows/Mac : installer une VM Linux (VirtualBox, VMware) ou Docker Desktop. Enterprise Edition : édition payante." },
              ],
            },
          ],
        },
        {
          heading: "Commandes de base Docker",
          blocks: [
            {
              type: "cmd",
              commands: [
                { cmd: "docker run image_name", desc: "crée et démarre un conteneur (nouvelle instance de l'image) ; si l'image n'existe pas, elle est d'abord téléchargée du Docker Hub" },
                { cmd: "docker run -d image_name", desc: "démarre le conteneur comme service de fond (détaché)" },
                { cmd: "docker run image_name:tag", desc: "spécifie la version (tag) ; la valeur par défaut est latest — ex. docker run redis:4.0" },
                { cmd: "docker ps", desc: "liste les conteneurs en cours d'exécution (chaque conteneur a un identifiant unique et un nom)" },
                { cmd: "docker ps -a", desc: "liste TOUS les conteneurs avec leur statut (Up, Exited, Created)" },
                { cmd: "docker run -d -p 8082:80 nginx", desc: "mappe le port externe 8082 sur le port interne 80 du conteneur (nginx ouvre un service http sur le port 80 à l'intérieur du conteneur)" },
                { cmd: "docker images", desc: "liste les images présentes dans le host docker" },
                { cmd: "docker rmi <nom-image>", desc: "supprime une image (il faut d'abord stopper et supprimer tous les conteneurs instanciés de cette image)" },
                { cmd: "docker stop <containerID|containerName>", desc: "stoppe un conteneur" },
                { cmd: "docker rm <containerID|containerName>", desc: "supprime un conteneur de manière permanente" },
              ],
            },
            {
              type: "callout",
              variant: "important",
              title: "Un conteneur docker ne peut pas contenir un OS",
              text: "Exemple : tenter de démarrer un conteneur ubuntu ($ docker run ubuntu) → le conteneur sera créé mais pas démarré. Un conteneur docker est fait pour contenir des processus et des services, pas des OS. L'image ubuntu est faite pour être l'image de base d'autres conteneurs. Quand un service du conteneur s'arrête, le conteneur s'arrête aussi.",
            },
            {
              type: "cmd",
              commands: [
                { cmd: "docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag", desc: "démarre un conteneur MySQL avec variable d'environnement" },
                { cmd: "docker exec -it my2 mysql --password", desc: "exécute une commande (mysql) dans un conteneur démarré, en mode interactif (-it) ; les résultats sont envoyés sur le terminal" },
                { cmd: "docker attach containerID", desc: "attache la console du terminal courant au conteneur lancé en tâche de fond (-d)" },
                { cmd: "docker inspect <container_name|container_id>", desc: "détails du conteneur au format JSON (ps ne donne que des informations basiques)" },
                { cmd: "docker logs container_ID", desc: "visualise le fichier log d'un conteneur lancé en tâche de fond" },
                { cmd: "docker run -v /opt/dataDir:/var/lib/mysql mysql", desc: "mapping de volumes : les données (par défaut dans /var/lib/mysql dans le conteneur) sont stockées dans un dossier externe — même si on supprime le conteneur, les données restent dans /opt/dataDir (persistance)" },
                { cmd: "docker run --cpus=0.5 nginx", desc: "restreint l'utilisation CPU du conteneur (cgroups)" },
                { cmd: "docker run --memory=100m mysql", desc: "restreint la mémoire du conteneur — par défaut un conteneur peut utiliser toutes les ressources (CPU/RAM) du host Linux" },
              ],
            },
          ],
        },
        {
          heading: "Dockerfile",
          blocks: [
            {
              type: "p",
              text: "Un Dockerfile est un fichier texte contenant les commandes nécessaires à la construction d'une image. Une fois créé, l'administrateur utilise docker build pour créer l'image basée sur ces commandes. Les commandes et informations du Dockerfile peuvent être configurées pour utiliser des versions et dépendances spécifiques afin de garantir des déploiements cohérents et stables.",
            },
            {
              type: "table",
              headers: ["Directive", "Rôle"],
              rows: [
                ["FROM", "Définit l'image de base utilisée pour démarrer le processus de construction"],
                ["COPY", "Copie des fichiers ou dossiers locaux depuis le contexte de build vers l'image Docker"],
                ["ADD", "Copie des fichiers/dossiers et peut aussi extraire des archives ou télécharger des fichiers depuis une URL"],
                ["CMD", "Exécute une commande spécifique dans le conteneur"],
                ["RUN", "Directive d'exécution centrale pour les fichiers Docker"],
                ["ENTRYPOINT", "Définit le programme ou script toujours exécuté quand le conteneur démarre, acceptant éventuellement des arguments"],
                ["ENV", "Définit des variables d'environnement"],
                ["EXPOSE", "Expose un port spécifique pour permettre la mise en réseau du conteneur avec l'extérieur"],
                ["MAINTAINER / LABEL", "Définit le nom complet et l'adresse email du créateur de l'image"],
                ["USER", "Définit l'UID (nom d'utilisateur) qui exécutera le conteneur"],
                ["VOLUME", "Déclare un dossier à stocker de façon persistante (en dehors du conteneur)"],
                ["WORKDIR", "Définit le chemin où la commande définie avec CMD doit être exécutée"],
              ],
            },
          ],
        },
        {
          heading: "Networking dans Docker",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Bridge (par défaut)", v: "$ docker run nginx. Réseau privé interne créé par docker dans le Host ; tous les conteneurs y sont attachés par défaut. Chaque conteneur a une adresse souvent 172.17.0.x et peut accéder aux autres par cette adresse. Pour accéder à un conteneur de l'extérieur : mapper les ports du conteneur aux ports du docker host." },
                { k: "Host", v: "$ docker run --network=host nginx. Le port de chaque conteneur est mappé automatiquement au même port du host — accès de l'extérieur sans mapper les ports. Limite : on ne peut pas démarrer plusieurs instances du même conteneur (on ne peut pas exposer plusieurs services avec le même port au niveau du host)." },
                { k: "None", v: "$ docker run --network=none nginx. Le conteneur n'est attaché à aucun réseau : ni accessible localement ni de l'extérieur." },
                { k: "Réseaux bridge personnalisés", v: "Connecter les conteneurs dans des réseaux internes différents : $ docker network create --driver bridge --subnet 182.18.0.0/16 custom-isolated-net. Lister : $ docker network ls. Consulter la config réseau d'un conteneur : $ docker inspect <container_id|name>." },
                { k: "Docker Name Spaces (DNS)", v: "Un conteneur peut en atteindre un autre par son NOM : docker utilise le DNS pour associer l'adresse IP au nom du conteneur (serveur démarré par défaut avec l'IP 172.17.0.11). Plus pratique d'utiliser les noms car les adresses IP peuvent changer au démarrage." },
                { k: "Stockage dans Docker", v: "À l'installation, docker crée son dossier dans /var/lib/docker : aufs, containers, image, volumes. C'est là que docker stocke par défaut toutes ses données (fichiers relatifs aux images, conteneurs, volumes) — architecture en couches." },
              ],
            },
          ],
        },
        {
          heading: "Docker Compose et registries",
          blocks: [
            {
              type: "p",
              text: "Compose est un outil permettant de définir et d'exécuter des applications Docker à conteneurs multiples. Avec Compose, on utilise un fichier au format YAML (docker-compose.yml) pour configurer les services de l'application, puis une seule commande crée et démarre tous les services : $ docker-compose up. Exemple d'application (documentation Docker) : vote chats ou chiens avec affichage des résultats — 5 services : Voting-app (web app en python), Redis (cache mémoire), Worker (java), PostgreSQL (stockage des votes), Result-app (présentation des résultats). On peut démarrer manuellement les services avec la commande run et l'option --link pour lier les services, mais c'est trop lourd : docker-compose le fait plus simplement. Dans la version 2 de docker-compose, l'option links n'est pas obligatoire : docker crée automatiquement un lien entre tous les services déclarés.",
            },
            {
              type: "cmd",
              commands: [
                { cmd: "docker-compose up", desc: "crée et démarre tous les services définis dans docker-compose.yml" },
                { cmd: "docker run -d -p 5000:5000 --name my-registry registry:2", desc: "installe un annuaire privé de docker dans le host (Docker registry est lui-même une application exposée en image docker disponible sur docker hub)" },
                { cmd: "docker image tag my-image localhost:5000/my-image", desc: "tague une image pour le registre interne" },
                { cmd: "docker push localhost:5000/my-image", desc: "pousse l'image dans le registre privé" },
                { cmd: "docker pull localhost:5000/my-image", desc: "récupère l'image du registre privé" },
                { cmd: "docker login private-registry.io", desc: "authentification pour un annuaire interne d'organisation" },
                { cmd: "docker run private-registry.io/apps/internal-app", desc: "accède à une image d'un registre privé" },
                { cmd: "docker run nginx", desc: "nginx = nom de l'image dans un repository ; le repository nginx représente le nom de l'utilisateur docker hub → docker run nginx/nginx, docker run user_name/image_name" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "p5",
      title: "Partie 3 — Orchestration des conteneurs (Docker Swarm)",
      summary: "Besoins d'orchestration, outils, Docker Swarm : manager/worker, services, scaling, mises à jour, réseaux overlay.",
      sections: [
        {
          heading: "Pourquoi orchestrer ?",
          blocks: [
            {
              type: "p",
              text: "Besoin de démarrer plusieurs instances pour des raisons de : scalabilité (répondre efficacement à une variation de la charge de travail), tolérance aux pannes (continuer de fonctionner de manière fiable malgré des pannes matérielles, logicielles ou de réseau), disponibilité (système fonctionnel répondant aux demandes des utilisateurs sans interruption pendant une période donnée), montée en charge (augmentation de la quantité de travail sur le système). Si une instance tombe en panne, il faut la remplacer ; si Docker Engine tombe en panne, tous les conteneurs vont « cracher ». L'orchestration des conteneurs est une solution à ce problème.",
            },
            {
              type: "p",
              text: "L'orchestration consiste en un ensemble d'outils et de scripts permettant l'automatisation des opérations : scalabilité des conteneurs (adapter la taille d'un ensemble de conteneurs selon les besoins), réplication des conteneurs, haute disponibilité, bilan de santé (healthcheck) des conteneurs, etc. Exemples d'outils : Docker Swarm, Kubernetes, MESOS.",
            },
            {
              type: "kv",
              items: [
                { k: "Docker Swarm", v: "Permet de combiner plusieurs machines ensemble pour former un cluster. Prend en charge la distribution et la réplication des instances de services des applications dans des hosts distribués pour la haute disponibilité et l'équilibrage de charges à travers différents systèmes et hardwares." },
                { k: "Configuration", v: "Démarrer plusieurs hosts docker ; désigner un host en tant que manager et les autres en tant que workers ; exécuter ensuite les commandes « docker service » sur le swarm manager node : $ docker service create --replicas=4 -p 8080:80 my-app." },
                { k: "Exemple d'application Swarm", v: "3 VM ubuntu avec Docker engine : Host 1 (192.168.57.3), Host 2 (192.168.57.4), Host 3 (192.168.57.5) ; depuis une machine physique, connecter 3 terminaux avec SSH aux 3 hosts." },
                { k: "Démarrer un Swarm Manager", v: "Port par défaut de Swarm : 2377. Advertise-addr : adresse où le swarm manager accepte les connexions des autres nœuds. Listen-addr : adresse d'écoute pour accéder au cluster swarm depuis l'extérieur." },
              ],
            },
            {
              type: "cmd",
              commands: [
                { cmd: "docker swarm init --advertise-addr <IP> --listen-addr <IP>:2377", desc: "démarre un swarm manager sur le host 1" },
                { cmd: "docker swarm join --token <token> <IP-manager>:2377", desc: "rejoint le cluster en tant que nœud worker (hosts 2 et 3)" },
                { cmd: "docker node ls", desc: "liste les nœuds du cluster swarm" },
                { cmd: "docker service create --name web -p 8080:80 --replicas=N nginx", desc: "crée et démarre un service swarm" },
                { cmd: "docker service ls", desc: "liste les services démarrés" },
                { cmd: "docker service ps <service>", desc: "détails des instances du service" },
                { cmd: "docker service logs <service>", desc: "consulte le fichier log d'un service" },
                { cmd: "docker service rm web", desc: "supprime le service créé" },
                { cmd: "docker network create -d overlay secure-net", desc: "réseau overlay : utilisé dans des environnements distribués comme Docker Swarm pour permettre la communication entre conteneurs sur différents hôtes (déploiement sécurisé mongo/back/front)" },
                { cmd: "docker service scale back=15", desc: "mise à l'échelle : monte le service back à 15 instances" },
                { cmd: "docker service update --image <nouvelle-image> back", desc: "déploie la mise à jour d'un service (rolling update)" },
                { cmd: "docker service rollback back", desc: "rollback : revient à la version précédente du service" },
                { cmd: "docker node update --availability drain <node>", desc: "suspend un nœud worker : toutes les instances des services déployées sur ce nœud migrent vers les autres nœuds du cluster" },
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Conditionner le démarrage de services", v: "Il est possible de conditionner le démarrage de services entre eux (dépendances) dans le déploiement swarm." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "p6",
      title: "Partie 4 — Kubernetes",
      summary: "Origine, capacités, concepts (cluster, node, pod, namespace, kubectl), architecture master/node, pods, volumes, déploiements, services (ClusterIP, NodePort, LoadBalancer), installation avec Minikube.",
      sections: [
        {
          heading: "Kubernetes : présentation",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Origine", v: "Mot d'origine grecque signifiant « timonier » (celui qui dirige le bateau). Inspiré du projet Borg que Google utilise depuis des années pour gérer ses conteneurs. Développé par Google avec ses partenaires : Redhat, CoreOS, IBM, Microsoft, MesoSphere, VMware, HP, etc. Écrit en langage Go. Peut tourner en local, Cloud (GCE, Azure, AWS…), machines physiques. Kubernetes REST API pour exposer ses fonctionnalités." },
                { k: "Objectif", v: "Gérer directement des applications et non pas des machines (gestion des applications indépendamment de l'infrastructure)." },
                { k: "Capacités", v: "Déployer une application sous forme de conteneurs de manière rapide et prévisible ; automatiser le déploiement et la réplication des conteneurs ; organiser les conteneurs en groupes et faire du load balancing ; déclarer l'architecture cible (nombre de pods, contenu, stratégie de mise à jour…) et laisser le système atteindre et maintenir cette cible ; faire des mises à jour sans interrompre le service ; séparer l'application de l'architecture sous-jacente ; détecter les problèmes et les résoudre tout seul." },
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Cluster", v: "Ensemble de machines physiques ou virtuelles utilisées par Kubernetes pour faire tourner des applications." },
                { k: "Node", v: "Machine physique ou virtuelle dans laquelle seront déployés des Pods. Chaque Node doit exécuter un Container Engine comme Docker." },
                { k: "Pod", v: "Groupe de containers déployés ensemble." },
                { k: "Namespace", v: "Segmenter Pod, Volume, secrets…" },
                { k: "Kubectl", v: "Application en ligne de commande permettant d'interagir avec Kubernetes." },
              ],
            },
            {
              type: "diagram",
              id: "k8s-arch",
              caption: "Architecture Kubernetes : Master (API Server, etcd, Scheduler, Controller Manager) + Worker Nodes (kubelet, kube-proxy, cAdvisor, Pods).",
            },
          ],
        },
        {
          heading: "Architecture : Master et Node",
          blocks: [
            {
              type: "p",
              text: "Kubernetes suit l'architecture maître/esclave. Les composants peuvent être divisés en ceux qui gèrent un nœud individuel et ceux qui font partie du plan de contrôle.",
            },
            {
              type: "kv",
              items: [
                { k: "Kubernetes Master", v: "Unité de contrôle principale qui gère la charge de travail et dirige les communications dans le système. Le plan de contrôle consiste en plusieurs composants, chacun ayant son propre processus, qui peuvent s'exécuter sur un seul Node maître ou sur plusieurs maîtres permettant de créer des clusters haute disponibilité." },
                { k: "Etcd", v: "Unité de stockage distribuée persistante et légère : la configuration, l'état du cluster, les événements qui se produisent…" },
                { k: "API Server", v: "API REST de communication avec les composants internes et externes." },
                { k: "Scheduler", v: "L'ordonnanceur qui sélectionne quel Node devrait faire tourner un Pod (récolte en temps réel des informations sur l'état des nœuds : occupation mémoire, capacité disque, taux d'utilisation CPU)." },
                { k: "Controller Manager", v: "Processus dans lequel s'exécutent les contrôleurs principaux de Kubernetes tels que le DaemonSet Controller (service principal) et le Replication Controller." },
                { k: "Kubernetes Node (Worker)", v: "Machine unique (ou VM) où des conteneurs (charges de travail) sont déployés. Chaque Node du cluster doit exécuter le programme de conteneurisation (par exemple Docker Engine) ainsi que les composants pour communiquer avec le plan de contrôle du Master." },
                { k: "Kubelet", v: "Responsable de l'état d'exécution du nœud : assurer que tous les conteneurs sur un nœud sont en bonne santé, organisés en Pods sous la direction du plan de contrôle." },
                { k: "Kube-proxy", v: "Responsable d'effectuer le routage du trafic vers le conteneur approprié en se basant sur l'adresse IP et le numéro de port de la requête entrante." },
                { k: "cAdvisor", v: "Agent qui surveille et récupère les données de consommation des ressources et des performances (processeur, mémoire, utilisation disque et réseau) des conteneurs du Node." },
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Pod", v: "Groupe de containers déployés ensemble. Les containers du Pod : sont toujours démarrés, arrêtés et répliqués en groupe ; partagent le même Network, Namespace, IP et Ports ; peuvent communiquer ensemble (un conteneur peut contacter un autre du même pod) en utilisant localhost ; peuvent partager des données via des shared volumes. Le Pod est l'entité de base qu'on réplique et qu'on place sur différents nœuds du cluster." },
                { k: "Volume", v: "Espace de stockage qui peut être attaché à un conteneur ou à un groupe de conteneurs dans un même Pod ; peut persister indépendamment du conteneur. Permet par exemple aux conteneurs de partager un même répertoire dans un même Pod." },
              ],
            },
          ],
        },
        {
          heading: "Déploiement (Deployment) et Service",
          blocks: [
            {
              type: "p",
              text: "Le déploiement du contrôleur est l'élément central de Kubernetes : c'est le fichier dans lequel on décrit l'architecture cible que l'on veut atteindre — les conteneurs qu'on veut mettre dans le Pod, les détails de réplication, les stratégies qu'on va utiliser pour les mises à jour. C'est le contrôleur de déploiement qui se charge de maintenir cet état : par exemple, s'il y a un Pod qui plante, il va le désactiver, l'enlever du load balancer et en créer un autre à côté, démarré sur un autre nœud, pour que ça puisse continuer à fonctionner dans les mêmes conditions exigées dans le descripteur de déploiement.",
            },
            {
              type: "code",
              lang: "yaml",
              code: "# Exemple de déploiement nginx\n# metadata:name → le déploiement s'appelle nginx\n# replicas → le déploiement crée trois pods répliqués\n# spec:template → le modèle de pod indique que ses pods sont libellés app:nginx\n# template:spec → les pods exécutent un conteneur nginx, image nginx:1.7.9\n# Le déploiement ouvre le port 80 pour les pods\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.7.9\n        ports:\n        - containerPort: 80\n# En résumé, le modèle de pod contient les instructions suivantes :\n# • Chaque pod est libellé app:nginx\n# • Créez un conteneur et nommez-le nginx\n# • Exécutez l'image nginx dans la version 1.7.9\n# • Ouvrez le port 80 pour envoyer et recevoir du trafic",
            },
            {
              type: "p",
              text: "Le Service permet d'accéder à un groupe de Pods avec une même adresse IP statique (« un peut plus que le load balancer »). On identifie les Pods par des labels (selectors) qui seront les cibles du load balancer. Il peut faire du load balancing. Différents types : ClusterIP (expose le service à l'intérieur du cluster via une adresse IP interne — ex. un service de base de données accessible uniquement par d'autres applications du cluster), NodePort (expose le service via un port spécifique sur chaque nœud du cluster — ex. une application web simple accessible depuis le réseau local), LoadBalancer (expose le service via un load balancer externe — ex. une application web en production accessible publiquement avec plusieurs pods derrière le load balancer).",
            },
          ],
        },
        {
          heading: "Installation : kubectl et Minikube",
          blocks: [
            {
              type: "p",
              text: "Kubectl est l'outil en ligne de commande de Kubernetes : il permet d'exécuter des commandes dans les clusters — déployer des applications, inspecter et gérer les ressources du cluster, consulter les logs… Minikube est un outil qui fait tourner un cluster Kubernetes à un nœud unique dans une machine virtuelle sur votre machine : une VM avec l'essentiel des packages de Docker et Kubernetes.",
            },
            {
              type: "list",
              items: [
                "Pour installer Minikube, il faut disposer d'un hyperviseur de virtualisation. Si votre version de Windows ne dispose pas de l'hyperviseur Hyper-V, il est recommandé d'installer VirtualBox. Pour vérifier si votre système supporte la virtualisation : commande systeminfo.",
                "La façon la plus simple d'installer Minikube sur Windows est d'utiliser Chocolatey (avec droits administrateur) : https://chocolatey.org. Une fois l'installation terminée, fermer la session CLI et redémarrer : Minikube devrait avoir été ajouté au path automatiquement.",
                "Autre façon : télécharger directement l'exécutable de Minikube. Cette opération télécharge une image de la machine virtuelle légère (Boot2Docker) contenant tous les outils docker et kubernetes, crée une configuration de démarrage et démarre le cluster kubernetes.",
                "minikube docker-env retourne les variables d'environnement nécessaires pour configurer l'environnement local et utiliser le Docker daemon à l'intérieur de Minikube (connecter le client docker au Docker engine fourni par Minikube).",
                "Exemple Hello World Node.js : image construite à partir de server.js et Dockerfile → construire l'image docker → déployer un conteneur de app-test dans un pod kubernetes → exposer le port 8080 de l'application pour un accès au pod de l'extérieur → consulter le service app-test à distance puis en local → nettoyage à la fin.",
              ],
            },
          ],
        },
      ],
    },
  ],

  quiz: [
    { id: "v1", chapter: "p1", question: "Qu'est-ce que la ROM ?", options: ["Mémoire volatile de travail", "Mémoire non volatile stockant le BIOS, responsable du démarrage du matériel", "Le processeur", "Un disque SSD"], correct: 1, explanation: "La ROM est une mémoire non volatile qui stocke le BIOS (logiciel responsable du démarrage du matériel) et ne s'efface jamais à l'extinction." },
    { id: "v2", chapter: "p1", question: "Quels sont les formats de serveurs physiques ?", options: ["Tour, rack, lame", "Compact, slim, large", "Desktop, mobile, cloud", "SATA, SCSI, SAS"], correct: 0, explanation: "Tour (ressemble à une unité centrale), rack (disposé dans des baies), lame/blade (compact et mince, se glisse verticalement dans un casier)." },
    { id: "v3", chapter: "p1", question: "Qu'est-ce qu'un serveur virtuel ?", options: ["Un serveur sans disque", "Un serveur fonctionnant sur un logiciel spécialisé (hyperviseur) convertissant un serveur physique en plusieurs VM indépendantes", "Un serveur web uniquement", "Un simulateur"], correct: 1, explanation: "Le serveur virtuel fonctionne sur un hyperviseur : il convertit un serveur physique en plusieurs VM indépendantes, chacune exécutant son propre OS, migrable facilement vers le cloud." },
    { id: "v4", chapter: "p1", question: "Pourquoi virtualiser ? Quel constat sur l'utilisation des serveurs ?", options: ["80% ont une utilisation moyenne inférieure à 10%", "80% sont saturés", "Les serveurs sont gratuits", "Il n'y a jamais assez de serveurs"], correct: 0, explanation: "Avec une app/service par OS recommandé, les datacenters accumulent des serveurs dont 80 % ont une utilisation moyenne < 10 %, plus des coûts d'exploitation, de place, de climatisation/électricité." },
    { id: "v5", chapter: "p1", question: "La virtualisation est-elle du multi-boot ?", options: ["Oui, c'est pareil", "Non ! Elle fait tourner plusieurs OS SIMULTANÉMENT sur le même hardware", "Oui, avec plus de mémoire", "Seulement sous Linux"], correct: 1, explanation: "Ce n'est PAS du multi-boot : la virtualisation fait tourner plusieurs OS simultanément sur une même machine, comme s'ils étaient sur des ordinateurs distincts." },
    { id: "v6", chapter: "p1", question: "Quels sont les 2 principes de la virtualisation ?", options: ["Cloisonnement et transparence", "Rapidité et sécurité", "Backup et restore", "NAT et DHCP"], correct: 0, explanation: "Cloisonnement : chaque OS fonctionne indépendamment sans interférer. Transparence : le mode virtualisé ne change rien au fonctionnement de l'OS (→ compatibilité des applications)." },
    { id: "v7", chapter: "p1", question: "Que fait un snapshot de VM ?", options: ["Copie complète du disque", "Capture l'état exact de la VM à un instant donné (stocke les changements depuis le snapshot)", "Supprime la VM", "Crée un nouveau OS"], correct: 1, explanation: "Le snapshot capture l'état exact à un instant T ; il ne copie pas tout le disque mais stocke les changements. Rapide, mais ne remplace pas une sauvegarde complète." },
    { id: "v8", chapter: "p1", question: "Quelle est la différence entre clone complet et clone lié ?", options: ["Aucune", "Complet = copie totale indépendante ; lié = dépend de l'original, économise de l'espace", "Lié est plus rapide à exécuter", "Complet est réservé aux entreprises"], correct: 1, explanation: "Clone complet : copie totale indépendante de l'original. Clone lié (linked clone) : dépend de la VM source, économise de l'espace mais nécessite l'original." },
    { id: "v9", chapter: "p1", question: "Que contient le format d'exportation OVF ?", options: ["Un seul fichier compressé", "Plusieurs fichiers : configuration .ovf, disques virtuels .vmdk/.vhd, fichier de vérification .mf", "Uniquement le disque dur", "Le BIOS"], correct: 1, explanation: "OVF (Open Virtualization Format) : configuration (.ovf) + disques (.vmdk/.vhd) + vérification (.mf). OVA = version compressée regroupant tout dans un seul fichier .ova." },
    { id: "v10", chapter: "p1", question: "Où s'exécute un hyperviseur de type 1 (Bare metal) ?", options: ["Dans un OS hôte", "Directement sur le hardware", "Dans le navigateur", "Dans le cloud uniquement"], correct: 1, explanation: "Type 1 (bare metal) : directement sur le matériel — noyau hôte allégé. Exemples : XEN, Oracle VM, Hyper-V, VMware ESX. Type 2 : à l'intérieur d'un OS hôte." },
    { id: "v11", chapter: "p1", question: "Quels exemples sont des hyperviseurs de type 2 ?", options: ["VMware ESX, XEN", "VMware Workstation, VirtualBox, QEMU, Parallels Desktop", "Hyper-V et Oracle VM", "Kubernetes et Docker"], correct: 1, explanation: "Type 2 (host metal) : VMware Workstation/Fusion, QEMU, Virtual PC, Virtual Server, VirtualBox, Parallels — exécutés à l'intérieur d'un OS hôte, préférés sur laptop/desktop." },
    { id: "v12", chapter: "p1", question: "Quelles instructions matérielles permettent la virtualisation sans modifier l'OS invité ?", options: ["SSE et AVX", "AMD-V et Intel VT", "AES-NI", "Turbo Boost"], correct: 1, explanation: "Avec les instructions de virtualisation matérielle AMD-V et Intel VT, l'OS invité n'a plus besoin d'être modifié dans un hyperviseur type 1." },
    { id: "v13", chapter: "p1", question: "Qu'est-ce que la paravirtualisation ?", options: ["L'OS invité ignore qu'il est virtualisé", "Les OS doivent être modifiés (drivers de redirection des appels système au lieu de traduction)", "Une virtualisation sans hyperviseur", "Un backup automatique"], correct: 1, explanation: "Paravirtualisation : les OS sont modifiés avec des drivers frontend/backend qui redirigent les appels système (plus rapide que la traduction) — collaboration étroite hyperviseur/OS." },
    { id: "v14", chapter: "p1", question: "Quel est l'inconvénient principal du mécanisme de redirection de la paravirtualisation ?", options: ["Il est lent", "Dépendance d'un OS virtualisé vis-à-vis d'un autre : si l'OS 1 (driver backend) tombe en panne, l'OS 2 ne peut plus accéder au matériel", "Il consomme trop de RAM", "Il ne fonctionne qu'avec Windows"], correct: 1, explanation: "Le contrôle du matériel est donné à un OS (driver backend) ; les autres OS passent par lui. Si l'OS backend tombe en panne, les autres perdent l'accès au matériel." },
    { id: "v15", chapter: "p1", question: "Qu'est-ce que la VDI (Virtual Desktop Infrastructure) ?", options: ["Des bureaux complets (OS + apps) hébergés sur des VM centralisées, accessibles à distance (RDP, Citrix ICA)", "Un antivirus", "Un réseau Wi-Fi", "Un format de disque"], correct: 0, explanation: "VDI : environnements de bureau complets sur des VM centralisées côté serveur ; accès à distance, sécurité centralisée, gestion simplifiée des mises à jour." },
    { id: "v16", chapter: "p1", question: "Qu'est-ce que le streaming d'OS ?", options: ["Diffuser un film", "Diffuser un système d'exploitation depuis un serveur vers une machine sans l'installer localement (exécuté en mémoire)", "Installer Windows depuis USB", "Virtualiser des applications"], correct: 1, explanation: "Streaming d'OS : l'OS est stocké/géré sur un serveur central et streamé à chaque démarrage du client, exécuté en mémoire → déploiement rapide, moins de stockage local." },
    { id: "v17", chapter: "p1", question: "En virtualisation de sessions, les utilisateurs…", options: ["ont chacun leur VM dédiée", "partagent le même OS mais dans des sessions isolées", "ne peuvent pas se connecter simultanément", "utilisent chacun leur serveur"], correct: 1, explanation: "Virtualisation de sessions : plusieurs utilisateurs se connectent simultanément à un serveur et partagent le même OS, chacun dans une session indépendante (contrairement à la VDI où chacun a sa VM)." },
    { id: "v18", chapter: "p1", question: "Que fait la virtualisation de stockage ?", options: ["Efface les disques", "Regroupe plusieurs périphériques physiques pour apparaître comme un seul pool de stockage (datastore)", "Chiffre les données", "Compresse automatiquement les VM"], correct: 1, explanation: "Virtualisation de stockage : plusieurs périphériques regroupés → un seul datastore présenté aux hôtes. Avantages : homogénéisation, temps d'arrêt réduits, HA, VMotion, extension automatisée." },
    { id: "v19", chapter: "p1", question: "Quelles sont les interfaces du stockage DAS ?", options: ["SCSI, SATA, SAS", "NFS, CIFS, AFP", "Fibre Channel et iSCSI", "HTTP et FTP"], correct: 0, explanation: "DAS (Direct Attached Storage) : connexion directe via SCSI, SATA ou SAS. NAS utilise NFS/CIFS/AFP ; SAN utilise Fibre Channel/iSCSI." },
    { id: "v20", chapter: "p1", question: "Quelle affirmation sur le NAS est correcte ?", options: ["Il fonctionne au niveau bloc", "C'est un boîtier avec disques relié au LAN pour partager des FICHIERS, avec sa propre IP, configuré via interface web", "Il n'a pas d'adresse IP", "Il remplace le switch"], correct: 1, explanation: "NAS : boîtier multi-disques relié au LAN, partage de fichiers, propre adresse IP (nœud du réseau), sans clavier/écran, configuration via interface web. Protocoles : CIFS/SMB, NFS, AFP." },
    { id: "v21", chapter: "p1", question: "À quel niveau fonctionne le SAN ?", options: ["Fichiers", "Bloc (accès direct aux disques, niveau secteurs)", "Application", "Session"], correct: 1, explanation: "Contrairement au NAS (partage de fichiers), le SAN fonctionne au niveau BLOC : chaque serveur traite l'espace distant comme son propre disque local. Protocoles : Fibre Channel (haut de gamme, fibres optiques) et iSCSI (sur Ethernet)." },
    { id: "v22", chapter: "p1", question: "Qu'est-ce qu'un cluster dans un datacenter ?", options: ["Un seul gros serveur", "Des serveurs configurés de manière similaire regroupés avec les mêmes réseau et stockage, gérés comme une entité unique", "Un câble réseau", "Un logiciel de sauvegarde"], correct: 1, explanation: "Cluster : serveurs similaires regroupés (même réseau, même stockage) ; le cluster gère leurs ressources comme une entité unique — si un serveur tombe, un autre prend sa place." },
    { id: "v23", chapter: "p1", question: "Quelle fonctionnalité VMware permet de migrer des VM d'un hôte ESXi à un autre SANS temps d'arrêt ?", options: ["vCenter", "vMotion", "vSphere", "vSwitch"], correct: 1, explanation: "vMotion : migration de VM entre hôtes ESXi sans interruption. vCenter Server gère le datacenter virtualisé, vSphere Client est l'interface, HA redémarre les VM sur d'autres hôtes en cas de défaillance." },
    { id: "v24", chapter: "p1", question: "Dans le modèle Citrix Xen, qu'est-ce que le Domaine 0 (Dom0) ?", options: ["Un virus", "Un invité spécial démarré avec l'hyperviseur : accès direct au matériel, gère toutes les E/S des autres invités", "Le nom de la licence", "Un format de disque"], correct: 1, explanation: "Dom0 : invité spécial avec privilèges de gestion différents — accès direct au matériel et gestion de toutes les E/S pour les invités individuels." },
    { id: "v25", chapter: "p1", question: "Qu'est-ce que KVM ?", options: ["Kernel-based Virtual Machine : solution open source intégrée au noyau Linux depuis 2.6.20, utilisant une version modifiée de QEMU", "Un hyperviseur Microsoft", "Un outil de sauvegarde", "Un switch virtuel"], correct: 0, explanation: "KVM : virtualisation complète ET paravirtualisation, intégré au noyau Linux (2.6.20), issu de QEMU (Quick Emulator) — on parle en réalité de la combinaison QEMU-KVM." },
    { id: "v26", chapter: "p1", question: "En mode réseau NAT de VirtualBox, les VM…", options: ["peuvent se parler entre elles", "ne peuvent pas se parler et ne peuvent pas être contactées de l'extérieur (par défaut)", "ont chacune une IP publique", "partagent l'IP de l'hôte"], correct: 1, explanation: "NAT : le moteur réseau de VirtualBox agit comme routeur entre chaque VM et l'hôte — séparation maximisant la sécurité : pas de communication inter-VM ni d'accès externe par défaut." },
    { id: "v27", chapter: "p1", question: "Quel mode réseau VirtualBox permet aux VM de communiquer entre elles ET avec l'hôte, mais PAS avec Internet ?", options: ["NAT", "Bridgé", "Host-Only", "Aucun"], correct: 2, explanation: "Host-Only : les VM communiquent uniquement entre elles et avec l'hôte — pas d'accès au réseau externe ni à Internet, ni aux machines hors de l'hôte." },
    { id: "v28", chapter: "p4", question: "Qu'est-ce qu'un conteneur ?", options: ["Une VM complète", "Une enveloppe packagant une application avec juste ce dont elle a besoin, utilisant le kernel de l'OS hôte", "Un disque virtuel", "Un câble réseau"], correct: 1, explanation: "Conteneur : enveloppe packagant l'application + ses besoins ; déployable tel quel sur toute machine avec un Container Engine ; utilise le kernel de l'hôte, a son propre espace de processus et interface réseau, isolé mais exécuté sur l'hôte." },
    { id: "v29", chapter: "p4", question: "Quelle différence clé entre conteneur et VM ?", options: ["Le conteneur utilise le même kernel OS que l'hôte et boote en quelques secondes ; la VM a son propre OS et boote en minutes", "La VM est plus légère", "Le conteneur a son propre kernel", "Aucune différence"], correct: 0, explanation: "VM : OS propre, beaucoup de ressources, boot en minutes. Conteneur : même kernel (Linux) partagé, peu de ressources, boot en secondes." },
    { id: "v30", chapter: "p4", question: "Quelle est l'origine de Docker ?", options: ["Créé par Microsoft en 2000", "Société française dotCloud (PaaS, container engine en Python), réécrit en Go en 2012, open source en 2013", "Créé par Google avec Kubernetes", "Créé par Amazon"], correct: 1, explanation: "Docker vient de dotCloud (société française devenue américaine) : PaaS avec container engine Python → réécriture Go (2012) → open source (2013) → dotCloud devient Docker." },
    { id: "v31", chapter: "p4", question: "Quelle est la différence entre une image et un conteneur Docker ?", options: ["Aucune", "L'image est le template/package ; le conteneur est une instance de l'image exécutée par le Docker Host", "L'image s'exécute, le conteneur est stocké", "Le conteneur est plus grand"], correct: 1, explanation: "Image = fichier package (template) définissant la structure du conteneur (application + dépendances). Conteneur = instance d'une image, exécutée par le Docker Host dans un environnement isolé." },
    { id: "v32", chapter: "p4", question: "Que fait « docker run image_name » si l'image n'existe pas dans le host ?", options: ["Échoue avec une erreur", "Il la télécharge d'abord depuis le registre (Docker Hub) avant de créer et exécuter le conteneur", "Il crée une image vide", "Il redémarre le système"], correct: 1, explanation: "docker run télécharge automatiquement l'image manquante depuis le registre avant d'instancier le conteneur." },
    { id: "v33", chapter: "p4", question: "Que fait l'option -p 8082:80 dans « docker run -d -p 8082:80 nginx » ?", options: ["Crée 8082 conteneurs", "Mappe le port externe 8082 sur le port interne 80 du conteneur", "Change le port du kernel", "Ouvre 80 ports"], correct: 1, explanation: "nginx ouvre son service http sur le port 80 DANS le conteneur ; pour y accéder de l'extérieur, on mappe les ports : -p port_externe:port_interne." },
    { id: "v34", chapter: "p4", question: "Que se passe-t-il si on exécute « docker run ubuntu » ?", options: ["Ubuntu démarre normalement", "Le conteneur est créé mais pas démarré : un conteneur contient des processus/services, pas un OS", "Une erreur de permission", "Docker installe Ubuntu sur le host"], correct: 1, explanation: "Un conteneur docker contient des processus et services, pas des OS. L'image ubuntu est une image de base. Quand le service du conteneur s'arrête, le conteneur s'arrête." },
    { id: "v35", chapter: "p4", question: "Quelle commande exécute une commande dans un conteneur DÉMARRÉ ?", options: ["docker run", "docker exec", "docker start -c", "docker cmd"], correct: 1, explanation: "docker exec -it my2 mysql --password : exécute mysql dans le conteneur my2 en mode interactif (-it), les résultats s'affichent sur le terminal." },
    { id: "v36", chapter: "p4", question: "Comment rendre persistantes les données MySQL d'un conteneur ?", options: ["Impossible", "Mapper un volume : docker run -v /opt/dataDir:/var/lib/mysql mysql", "Copier le conteneur", "Utiliser Docker Hub"], correct: 1, explanation: "Par défaut les données sont dans /var/lib/mysql DANS le conteneur (détruites avec lui). Le mapping -v monte un dossier externe : les données survivent à la suppression du conteneur." },
    { id: "v37", chapter: "p4", question: "Quelle directive Dockerfile copie des fichiers et peut extraire des archives ou télécharger depuis une URL ?", options: ["COPY", "ADD", "MOVE", "GET"], correct: 1, explanation: "ADD : copie + extraction d'archives + téléchargement URL. COPY : copie simple depuis le contexte de build. RUN exécute, CMD définit la commande du conteneur." },
    { id: "v38", chapter: "p4", question: "Quelle directive Dockerfile définit l'image de base ?", options: ["FROM", "BASE", "ROOT", "ENTRYPOINT"], correct: 0, explanation: "FROM définit l'image de base du processus de construction. ENTRYPOINT définit le programme toujours exécuté au démarrage ; WORKDIR le chemin d'exécution de CMD." },
    { id: "v39", chapter: "p4", question: "Quels sont les 3 modes réseau de Docker ?", options: ["NAT, Bridgé, Host-Only", "Bridge (défaut), Host, None", "Overlay, MACvlan, IPvlan", "TCP, UDP, ICMP"], correct: 1, explanation: "Bridge (défaut, réseau privé interne 172.17.0.x, mapping de ports pour l'extérieur), Host (ports mappés automatiquement au host, une seule instance possible), None (aucun réseau)." },
    { id: "v40", chapter: "p4", question: "Dans le réseau Bridge, comment un conteneur peut-il atteindre un autre conteneur par son NOM ?", options: ["Impossible", "Docker utilise son DNS interne (serveur démarré par défaut, ex. IP 172.17.0.11) pour associer l'IP au nom du conteneur", "Via /etc/hosts manuellement", "Via Internet"], correct: 1, explanation: "Docker Name Spaces (DNS) : serveur interne qui associe l'adresse IP au nom du conteneur — plus fiable que les IP qui peuvent changer au démarrage." },
    { id: "v41", chapter: "p4", question: "Dans quel dossier Docker stocke-t-il ses données par défaut ?", options: ["/etc/docker", "/var/lib/docker (aufs, containers, image, volumes)", "/opt/docker", "/home/docker"], correct: 1, explanation: "L'installation crée /var/lib/docker avec les sous-dossiers aufs, containers, image et volumes — architecture en couches." },
    { id: "v42", chapter: "p4", question: "Qu'est-ce que Docker Compose ?", options: ["Un éditeur de texte", "Un outil définissant et exécutant des applications multi-conteneurs via un fichier YAML (docker-compose.yml), démarrés avec docker-compose up", "Un registre d'images", "Un langage de programmation"], correct: 1, explanation: "Compose : fichier YAML (docker-compose.yml) pour configurer les services, puis UNE commande (docker-compose up) crée et démarre tout. Depuis la v2, l'option links n'est plus obligatoire : les liens entre services sont automatiques." },
    { id: "v43", chapter: "p4", question: "Dans l'exemple d'application de vote Docker, quels sont les 5 services ?", options: ["Voting-app (python), Redis (cache), Worker (java), PostgreSQL (stockage), Result-app (résultats)", "Nginx, Apache, MySQL, PHP, Laravel", "Front, Back, API, DB, Cache seulement", "Kafka, Zookeeper, Spark, Hadoop, HDFS"], correct: 0, explanation: "L'application de vote « chats ou chiens » : Voting-app (web python), Redis (cache mémoire), Worker (java), PostgreSQL (données du vote), Result-app (présentation des résultats)." },
    { id: "v44", chapter: "p4", question: "Quelle commande lance un registre Docker privé local ?", options: ["docker registry --start", "docker run -d -p 5000:5000 --name my-registry registry:2", "docker hub --private", "docker init --registry"], correct: 1, explanation: "Docker registry est lui-même une application disponible en image : docker run -d -p 5000:5000 --name my-registry registry:2, puis docker push/pull localhost:5000/my-image." },
    { id: "v45", chapter: "p4", question: "Quelle commande restreint la mémoire d'un conteneur à 100 Mo ?", options: ["docker run --ram=100 mysql", "docker run --memory=100m mysql", "docker run -m 100GB", "docker limits 100"], correct: 1, explanation: "Par défaut, un conteneur peut utiliser TOUTES les ressources du host (cgroups) : docker run --memory=100m mysql limite la RAM, --cpus=0.5 limite le CPU." },
    { id: "v46", chapter: "p5", question: "Pour quelles raisons démarre-t-on plusieurs instances d'une application ?", options: ["Scalabilité, tolérance aux pannes, disponibilité, montée en charge", "Pour économiser la RAM", "Pour éviter Docker", "Uniquement pour le design"], correct: 0, explanation: "Plusieurs instances répondent à : scalabilité (variation de charge), tolérance aux pannes (continuer malgré les pannes), disponibilité (service sans interruption), montée en charge (augmentation du travail)." },
    { id: "v47", chapter: "p5", question: "Quels outils d'orchestration de conteneurs sont cités ?", options: ["Docker Swarm, Kubernetes, MESOS", "Apache, Nginx, IIS", "MySQL, PostgreSQL, MongoDB", "Git, SVN, Mercurial"], correct: 0, explanation: "Exemples d'outils d'orchestration : Docker Swarm, Kubernetes et MESOS." },
    { id: "v48", chapter: "p5", question: "Quel est le port par défaut de Docker Swarm ?", options: ["8080", "2377", "5000", "6443"], correct: 1, explanation: "Le port par défaut de Swarm est 2377. Advertise-addr : où le manager accepte les connexions des autres nœuds ; listen-addr : écoute depuis l'extérieur." },
    { id: "v49", chapter: "p5", question: "Que fait un réseau overlay dans Docker Swarm ?", options: ["Chiffre les disques", "Permet la communication entre conteneurs sur différents hôtes dans un environnement distribué", "Surveille les conteneurs", "Crée des VM"], correct: 1, explanation: "Les réseaux overlay (--driver overlay) sont utilisés dans des environnements distribués comme Docker Swarm pour permettre la communication entre conteneurs sur différents hôtes (déploiement mongo/back/front sécurisé)." },
    { id: "v50", chapter: "p5", question: "Que se passe-t-il quand on suspend (drain) un nœud worker du cluster Swarm ?", options: ["Rien", "Toutes les instances des services déployées sur ce nœud migrent vers les autres nœuds du cluster", "Le cluster s'arrête", "Les conteneurs sont supprimés définitivement"], correct: 1, explanation: "docker node update --availability drain <node> : les instances migrent automatiquement vers les autres nœuds — haute disponibilité." },
    { id: "v51", chapter: "p5", question: "Que signifie docker service rollback ?", options: ["Supprimer le service", "Revenir à la version précédente du service après une mise à jour", "Sauvegarder le service", "Redémarrer le manager"], correct: 1, explanation: "docker service rollback <service> annule la dernière mise à jour et revient à la version précédente (utilisée après un déploiement défaillant)." },
    { id: "v52", chapter: "p6", question: "Que signifie le mot Kubernetes ?", options: ["Gouvernement en grec", "Timonier (celui qui dirige le bateau) en grec", "Conteneur en japonais", "Cloud en allemand"], correct: 1, explanation: "Kubernetes = « timonier » en grec (celui qui dirige le bateau). Inspiré du projet Borg de Google, écrit en Go, développé avec Redhat, CoreOS, IBM, Microsoft, VMware…" },
    { id: "v53", chapter: "p6", question: "Qu'est-ce qu'un Pod Kubernetes ?", options: ["Une machine physique", "Un groupe de containers déployés ensemble, partageant le même Network, Namespace, IP et Ports", "Un disque", "Un utilisateur"], correct: 1, explanation: "Pod = groupe de containers démarrés/arrêtés/répliqués ensemble, partageant network/namespace/IP/ports, communiquant via localhost, partageant des volumes. C'est l'entité de base répliquée sur les nœuds." },
    { id: "v54", chapter: "p6", question: "Quel composant du Kubernetes Master est l'unité de stockage distribuée persistante ?", options: ["API Server", "etcd", "Scheduler", "Kubelet"], correct: 1, explanation: "etcd : stockage distribué persistant et léger (configuration, état du cluster, événements). API Server : API REST. Scheduler : choisit le Node pour chaque Pod." },
    { id: "v55", chapter: "p6", question: "Quel composant du Node Kubernetes route le trafic vers le conteneur approprié ?", options: ["Kubelet", "Kube-proxy", "cAdvisor", "Docker daemon"], correct: 1, explanation: "Kube-proxy : routage du trafic vers le conteneur approprié selon l'IP et le port de la requête entrante. Kubelet : état d'exécution/santé des conteneurs. cAdvisor : métriques de consommation." },
    { id: "v56", chapter: "p6", question: "Quel est le rôle du Scheduler dans le Kubernetes Master ?", options: ["Stocker la configuration", "Sélectionner quel Node doit faire tourner un Pod (mémoire, disque, CPU en temps réel)", "Exécuter les conteneurs", "Gérer les logs"], correct: 1, explanation: "Le Scheduler (ordonnanceur) choisit le Node pour chaque Pod en récoltant en temps réel les informations des nœuds : occupation mémoire, capacité disque, taux d'utilisation CPU." },
    { id: "v57", chapter: "p6", question: "Que fait le contrôleur de déploiement si un Pod plante ?", options: ["Rien", "Il le désactive, l'enlève du load balancer et crée un autre Pod sur un autre nœud", "Il arrête tout le cluster", "Il envoie un email"], correct: 1, explanation: "Le déploiement maintient l'état cible déclaré : Pod défaillant → désactivé, retiré du load balancer, remplacé par un nouveau sur un autre nœud." },
    { id: "v58", chapter: "p6", question: "Quel type de Service Kubernetes expose le service UNIQUEMENT à l'intérieur du cluster ?", options: ["NodePort", "LoadBalancer", "ClusterIP", "Ingress"], correct: 2, explanation: "ClusterIP : IP interne, accessible seulement depuis le cluster (ex. base de données). NodePort : port spécifique sur chaque nœud. LoadBalancer : load balancer externe (production publique)." },
    { id: "v59", chapter: "p6", question: "Qu'est-ce que Minikube ?", options: ["Un langage", "Un outil faisant tourner un cluster Kubernetes à UN nœud unique dans une VM locale (essentiel de Docker + Kubernetes)", "Un navigateur", "Un cloud public"], correct: 1, explanation: "Minikube : cluster Kubernetes à un seul nœud dans une VM sur votre machine. Installation possible via Chocolatey sur Windows ; nécessite un hyperviseur (Hyper-V ou VirtualBox)." },
    { id: "v60", chapter: "p6", question: "Comment connecter le client docker au Docker daemon fourni par Minikube ?", options: ["Impossible", "Avec la commande minikube docker-env qui retourne les variables d'environnement à configurer", "En réinstallant Docker", "Via Kubernetes API"], correct: 1, explanation: "minikube docker-env retourne les variables d'environnement pour pointer le client docker local vers le Docker daemon de la VM Minikube." },
  ],
};
