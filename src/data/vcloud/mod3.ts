import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// VIRTUALISATION & CLOUD — Modules 6, 7, 8
// (Cours Partie 1 slides 65-81 + Partie 2 slides 82-121)
// ═══════════════════════════════════════════════════════════════

export const vmod6: Module = {
  id: 'v6',
  num: 6,
  title: 'Virtualisation du stockage',
  subtitle: 'Principe, DAS, NAS (CIFS/SMB, NFS, AFP), SAN (Fibre Channel, iSCSI)',
  icon: '💾',
  color: 'violet',
  source: 'Partie 1 (slides 65-81) + Partie 2 (slides 98-101)',
  sections: [
    {
      id: 'v6s1',
      title: 'Principe de la virtualisation du stockage',
      blocks: [
        { type: 'definition', term: 'Virtualisation de stockage', def: 'Concept qui permet à plusieurs périphériques de stockage physique regroupés d\u2019apparaître comme un seul et unique périphérique de stockage. Cet espace regroupé est présenté aux hôtes comme un pool de stockage lié (datastore) — leur « propre disque ».' },
        { type: 'note', title: 'Avantages', text: 'Homogénéisation du stockage sur des périphériques de capacité et vitesses différentes · Temps d\u2019arrêt réduits · Meilleure optimisation des performances et de la vitesse avec une disponibilité très élevée (High Availability) · Migration automatique et à chaud des données vers une autre machine virtuelle (VMotion) · Automatisation de l\u2019extension de capacité par réduction du besoin de provisionnement manuel.' },
      ],
    },
    {
      id: 'v6s2',
      title: 'DAS — Direct Attached Storage',
      blocks: [
        { type: 'definition', term: 'DAS', def: 'Stockage à connexion directe : système de stockage informatique directement connecté au serveur ou à l\u2019ordinateur, au lieu de transiter par un réseau.' },
        { type: 'list', ordered: true, items: [
          'SCSI (Small Computer System Interface)',
          'SATA (Serial Advanced Technology Attachment)',
          'SAS (Serial Attached SCSI)',
        ] },
        { type: 'table', headers: ['Avantages DAS', 'Inconvénients DAS'], rows: [
          ['Solution la plus économique', 'Espace de stockage non dynamique'],
          ['Très simple et rapide à mettre en place', 'Taux d\u2019utilisation non optimal'],
          ['Envisageable en production', 'Temps d\u2019indisponibilité considérable'],
          ['', 'Fonctionnalités évoluées (VMotion, HA) non disponibles'],
          ['', 'Pas de gestion centralisée des VM'],
        ], caption: 'Bilan DAS — il faut alors prévoir une solution de sauvegarde adaptée pour protéger les données' },
      ],
    },
    {
      id: 'v6s3',
      title: 'La solution : stockage centralisé partagé',
      blocks: [
        { type: 'paragraph', text: 'Pour pallier les limites du DAS, on utilise un stockage centralisé partagé avec redondance des connexions et des disques : accès continu aux données stockées sur des disques, même en cas de défaillance d\u2019une connexion, d\u2019un disque ou d\u2019une autre partie de l\u2019infrastructure. Les serveurs virtualisés accèdent tous à ce stockage partagé.' },
      ],
    },
    {
      id: 'v6s4',
      title: 'NAS — Network Attached Storage',
      blocks: [
        { type: 'definition', term: 'NAS', def: 'Solution de stockage en réseau : un boîtier contenant un ou plusieurs disques durs, relié au réseau local (LAN), pour partager des fichiers entre plusieurs utilisateurs ou ordinateurs. Il agit comme un petit serveur de fichiers — un peu comme un « disque dur en réseau ».' },
        { type: 'kv', items: [
          { k: 'Connexion', v: 'Connecté au réseau par un câble Ethernet ; les utilisateurs enregistrent, lisent ou partagent des documents à distance.' },
          { k: 'Configuration', v: 'Le NAS n\u2019a ni clavier ni écran : il se configure via une interface web (Chrome, Firefox…). Il possède sa propre adresse IP : c\u2019est un nœud du réseau à part entière.' },
          { k: 'Intérêt', v: 'Centraliser les fichiers pour tous les utilisateurs · Sauvegarder et sécuriser les données · Accéder aux fichiers depuis plusieurs appareils (PC, tablette…).' },
        ] },
        { type: 'paragraph', text: 'Exemple : dans une entreprise, un NAS partage les projets entre tous les employés du même réseau. Le NAS fournit un datastore centralisé que tous les hôtes ESXi peuvent utiliser pour stocker : les fichiers des machines virtuelles (disques virtuels VMDK, snapshots…), les ISO des systèmes d\u2019exploitation.' },
        { type: 'table', headers: ['Protocole', 'Utilisé par'], rows: [
          ['CIFS / SMB', 'Windows (et Samba sur Linux) — protocole de partage de Microsoft'],
          ['NFS', 'Linux et Unix. Protocole de partage de fichiers Unix, standard universel d\u2019accès aux fichiers sur un réseau — le plus utilisé dans les NAS (rapide et compatible avec beaucoup de systèmes)'],
          ['AFP (AppleShare File Protocol)', 'Ordinateurs Apple (macOS)'],
        ], caption: 'Protocoles d\u2019un NAS (slides 74-77)' },
      ],
    },
    {
      id: 'v6s5',
      title: 'SAN — Storage Area Network',
      blocks: [
        { type: 'definition', term: 'SAN', def: 'Réseau spécialisé (dédié) qui connecte des serveurs à un espace de stockage centralisé, pour mutualiser les ressources de stockage. Surtout utilisé dans les grandes entreprises et les centres de données.' },
        { type: 'list', items: [
          'Il utilise un réseau dédié (souvent Fibre Channel ou iSCSI).',
          'Pour les serveurs, le stockage du SAN apparaît comme un disque dur local, mais il est en réalité situé dans la baie SAN.',
          'Contrairement au NAS (qui partage des fichiers), le SAN fonctionne au niveau bloc (accès direct aux disques, au niveau des secteurs), et non des fichiers.',
        ] },
        { type: 'kv', items: [
          { k: 'Composants', v: 'Des serveurs (qui utilisent le stockage), des switchs SAN (qui font le lien), une baie de stockage (qui contient les disques). Configuration via l\u2019interface d\u2019administration du constructeur (Dell EMC, NetApp, HPE).' },
          { k: 'Intérêt', v: 'Très rapide : idéal pour les bases de données et les VMs · Centralisé : un seul gros espace de stockage pour plusieurs serveurs · Fiable : si un serveur tombe en panne, un autre peut continuer à accéder aux données.' },
        ] },
        { type: 'paragraph', text: 'Dans un SAN, les baies de stockage n\u2019apparaissent pas comme des volumes partagés sur le réseau : chaque serveur accède à l\u2019espace disque directement en mode bloc. Les VMs sont stockées sur la baie et accessibles par plusieurs serveurs : si un serveur tombe en panne, un autre peut remettre les VM rapidement et automatiquement en production, sans attendre la réparation du serveur en panne.' },
        { type: 'kv', items: [
          { k: 'iSCSI', v: 'Protocole d\u2019accès disque fonctionnant sur un réseau Ethernet : implémente un réseau de stockage en profitant de la connectique et des équipements de commutation standards. Peut être implémenté par une baie dédiée (meilleures performances) ou par un serveur classique avec le logiciel adéquat (ex. IET — iSCSI Enterprise Target sous Linux).' },
          { k: 'Fibre Channel', v: 'Solution la plus haut de gamme : baie dédiée + protocole Fibre Channel. Basé sur des fibres optiques, il assure une latence et un débit bien meilleurs que iSCSI, à un prix plus élevé. Principe d\u2019utilisation identique à un SAN iSCSI.' },
        ] },
      ],
    },
    {
      id: 'v6s6',
      title: 'NAS vs SAN — la formule à retenir',
      blocks: [
        { type: 'table', headers: ['Critère', 'NAS', 'SAN'], rows: [
          ['Nature', 'Partage de fichiers (comme un disque réseau)', 'Partage de disques (comme un gros disque dur externe très rapide attaché au serveur)'],
          ['Accès', 'Via le réseau partagé, fichiers', 'Mode bloc, directement, au niveau des secteurs'],
          ['Réseau', 'LAN standard (Ethernet)', 'Réseau dédié (Fibre Channel ou iSCSI)'],
          ['Contexte', 'Partage de documents, datastore fichiers', 'Grandes entreprises, datacenters, BDD et VMs'],
        ], caption: 'NAS = partage de fichiers · SAN = partage de disques (slide 81)' },
        { type: 'diagram', diagram: 'v-storage-archs' },
      ],
    },
  ],
}

export const vmod7: Module = {
  id: 'v7',
  num: 7,
  title: 'RAID',
  subtitle: 'Concept, niveaux 0/1/5/10, gestion logicielle vs matérielle',
  icon: '🛡️',
  color: 'violet',
  source: 'Partie 2 — RAID (slides 82-97)',
  sections: [
    {
      id: 'v7s1',
      title: 'Définition et objectifs du RAID',
      blocks: [
        { type: 'paragraph', text: 'Pour assurer des critères de qualité sur le stockage — tolérance aux pannes, disponibilité, fiabilité, performances — on utilise des outils techniques : redondance, répartition, contrôleur RAID (RAID0, RAID1, RAID5, RAID10…).' },
        { type: 'definition', term: 'RAID — Redundant Array of Independent Disks', def: 'Initialement « Redundant Array of Inexpensive Disks », puis « Redundant Array of Independent Disks » (ensemble redondant de disques indépendants). Technique qui consiste à utiliser plusieurs disques durs simultanément en les faisant apparaître comme un seul lecteur. Le but : accroître la vitesse des accès en traitant plus de données en parallèle et/ou sécuriser les données par l\u2019ajout d\u2019informations redondantes.' },
        { type: 'paragraph', text: 'Le concept du RAID fut lancé en 1987 à l\u2019université de Berkeley par un article décrivant six manières différentes de regrouper des disques, numérotées de 0 à 5 : les « niveaux RAID » (RAID levels) : RAID 0 à RAID 5. D\u2019autres architectures sont apparues par la suite (6 et 7) et des constructeurs proposent des RAID à plusieurs niveaux : 0+1, 1+0 ou 5+0 par exemple.' },
      ],
    },
    {
      id: 'v7s2',
      title: 'RAID logiciel vs RAID matériel',
      blocks: [
        { type: 'kv', items: [
          { k: 'Gestion logicielle', v: 'Dépend du système d\u2019exploitation et utilise les ressources mémoire et CPU du système. Il s\u2019agit d\u2019un driver qui combine plusieurs disques en un seul lecteur logique.' },
          { k: 'Gestion matérielle', v: 'Indépendante du système d\u2019exploitation. Elle recourt à un circuit contrôleur RAID, de plus en plus souvent intégré à la carte mère. Ce circuit contrôle les commandes envoyées à la grappe (cluster) de disques, ce qui allège le travail du processeur.' },
        ] },
      ],
    },
    {
      id: 'v7s3',
      title: 'RAID 0 — Striping (performant / non sécurisé)',
      blocks: [
        { type: 'definition', term: 'RAID 0 — Striping', def: 'Le « striping » implique un minimum de deux disques. Au lieu de parler de RAID, on devrait ici parler de « AID », puisque l\u2019on n\u2019ajoute pas de redondance pour être plus fiable.' },
        { type: 'list', items: [
          'Les données sont découpées en bandes (strips) constituées d\u2019un nombre fixe de secteurs.',
          'Ces bandes sont réparties entre les disques de manière à partager le travail lors d\u2019accès à des données volumineuses.',
          'Une requête d\u2019entrée/sortie concernant plusieurs bandes consécutives sollicite donc plusieurs disques simultanément.',
        ] },
        { type: 'note', title: '⚠️ Limite du RAID 0', text: 'Cette technique augmente la vitesse de transferts mais n\u2019assure PAS la sécurité des données : si un disque tombe en panne, la totalité des données est perdue.' },
      ],
    },
    {
      id: 'v7s4',
      title: 'RAID 1 — Mirroring (tolérant aux pannes)',
      blocks: [
        { type: 'definition', term: 'RAID 1 — Mirroring', def: 'Le mirroring consiste à dupliquer les données sur deux disques : si un disque tombe en panne, l\u2019autre disque contenant la copie de ses données prend le relais. Ce remplacement peut même se faire sans éteindre l\u2019ordinateur — option avantageuse pour les serveurs qui ne peuvent pas être arrêtés. On parle de tolérance de pannes puisque ce système assure la continuité du service.' },
        { type: 'list', items: [
          'Les performances en vitesse sont fort semblables à celles d\u2019un disque unique.',
          'Lors des requêtes d\u2019écriture, c\u2019est du disque le plus lent que dépend la durée de l\u2019opération.',
          'Pour les lectures, il est possible de répartir les requêtes de sorte à partager le travail et améliorer la bande passante.',
        ] },
      ],
    },
    {
      id: 'v7s5',
      title: 'RAID 5 — sécurisé / performant / bas coût',
      blocks: [
        { type: 'definition', term: 'RAID 5', def: 'RAID utilisant la parité répartie. Sécurisé : la parité répartie permet de reconstruire les données si un disque tombe en panne.' },
        { type: 'kv', items: [
          { k: 'Sécurisé', v: 'Parité répartie : reconstruction des données possible si un disque tombe en panne.' },
          { k: 'Performant', v: 'Les lectures sont rapides (données réparties sur plusieurs disques), mais les écritures sont légèrement plus lentes à cause du calcul de la parité.' },
          { k: 'Bas coût', v: 'Par rapport au RAID 1 (miroir), le RAID 5 nécessite moins de disques pour la tolérance aux pannes → coût de stockage réduit.' },
        ] },
        { type: 'diagram', diagram: 'v-raid' },
      ],
    },
    {
      id: 'v7s6',
      title: 'RAID 10 et RAID 0+1',
      blocks: [
        { type: 'paragraph', text: 'Certains constructeurs proposent des systèmes RAID à deux niveaux qui combinent le RAID 1 et le RAID 0 pour assurer simultanément sécurité (RAID 1) et vitesse (RAID 0).' },
        { type: 'kv', items: [
          { k: 'RAID 10 (1+0)', v: 'Miroirs d\u2019abord, puis striping sur les miroirs : chaque bande est dupliquée (sécurité) et répartie (vitesse).' },
          { k: 'RAID 0+1', v: 'Striping d\u2019abord, puis miroir des volumes strippés.' },
        ] },
      ],
    },
  ],
}

export const vmod8: Module = {
  id: 'v8',
  num: 8,
  title: 'Datacenter & solutions',
  subtitle: 'Datacenter, clustering, enjeux, ESXi, Xen, QEMU-KVM, Hyper-V, VirtualBox',
  icon: '🏢',
  color: 'violet',
  source: 'Partie 2 — Datacenter & solutions (slides 102-121)',
  sections: [
    {
      id: 'v8s1',
      title: 'Le datacenter (centre de traitement de données)',
      blocks: [
        { type: 'definition', term: 'Datacenter', def: 'Centre de traitement de données : ensemble d\u2019équipements constituant le système d\u2019information d\u2019une structure/entreprise — mainframes (ordinateurs centraux conçus pour gérer des charges de travail importantes et critiques), serveurs, baies de stockage, équipements réseaux et télécommunications.' },
        { type: 'list', items: [
          'Taille possible : du local technique / salle machine / étage / bâtiment jusqu\u2019au complexe de plusieurs bâtiments.',
          'Pour mutualiser les coûts et bénéficier des dernières avancées technologiques, la plupart des entreprises délèguent à un datacenter la prise en charge de leurs données (stockage, protocoles de transfert…).',
          'Pour assurer la disponibilité et la sécurité des données stockées, un datacenter doit être en fonctionnement 24h/24 et 365 jours par an.',
        ] },
      ],
    },
    {
      id: 'v8s2',
      title: 'Clustering',
      blocks: [
        { type: 'definition', term: 'Cluster', def: 'Dans un centre de données, un certain nombre de serveurs configurés de manière similaire, regroupés avec des connexions au même réseau et au même stockage, pour fournir un ensemble de ressources dans l\u2019environnement virtuel.' },
        { type: 'list', items: [
          'Lorsqu\u2019un serveur est ajouté à un cluster, ses ressources sont intégrées à celles du cluster.',
          'Le cluster gère les ressources de tous les serveurs qu\u2019il contient et agit comme une entité unique.',
          'Bénéfice : si l\u2019un des serveurs tombe en panne, un autre serveur peut prendre sa place.',
        ] },
      ],
    },
    {
      id: 'v8s3',
      title: 'Avantages et enjeux d\u2019un datacenter',
      blocks: [
        { type: 'list', items: [
          'Ils offrent un environnement hyper sécurisé pour les données.',
          'Les équipements continuent d\u2019être utiles et efficaces dans leur contexte d\u2019utilisation.',
          'Les données sont disponibles en permanence.',
          'Objectifs : haute qualité de service + haute disponibilité.',
        ] },
        { type: 'paragraph', text: 'Enjeux : assurer la haute disponibilité et la haute protection/sécurité. Contraintes : dimensions très vastes (des bâtiments), infrastructure gigantesque, plusieurs intervenants (administrateurs, clients, informaticiens, électriciens, fournisseurs de matériel…).' },
        { type: 'kv', items: [
          { k: 'Risques naturels (inondation, séisme, incendie…)', v: 'Étude géographique de l\u2019emplacement + sauvegardes régulières et duplication.' },
          { k: 'Surchauffe', v: 'Système de climatisation indispensable.' },
          { k: 'Coupure électrique', v: 'Diversifier les sources d\u2019alimentation.' },
          { k: 'Risques humaines (mauvaise manipulation ou intention)', v: 'Contrôle d\u2019accès, gestion des autorisations, suivi et journaux, traces…' },
          { k: 'Connexion réseau/internet (point d\u2019entrée au cloud)', v: 'Dupliquée et sécurisée.' },
          { k: 'Protection & sécurité', v: 'Contrôle d\u2019accès (badge, empreinte digitale…), verrouillage automatique des points d\u2019accès, surveillance (capteurs vidéo, thermiques, de proximité), identification du personnel avec contrôle des accès, systèmes de détection/prévention d\u2019intrusions, pare-feu, antivirus, chiffrement des données…' },
        ] },
      ],
    },
    {
      id: 'v8s4',
      title: 'VMware ESXi',
      blocks: [
        { type: 'paragraph', text: 'Fondée en 1998, VMware a été la première entreprise à développer une solution de virtualisation x86 disponible dans le commerce. L\u2019année suivante : Workstation 1.0 (créer et travailler avec des VMs sur postes Windows ou Linux). En 2001 : ESX 1.0 et GSX 1.0 — ESX était un hyperviseur de type 1, GSX un hyperviseur de type 2. L\u2019architecture d\u2019origine d\u2019ESX était composée de deux parties : l\u2019hyperviseur lui-même et un module de console basé sur Linux. ESXi a été développé avec le même noyau d\u2019hyperviseur, mais sans la console de service. VMware a publié deux versions (ESX classique et ESXi) de la version 3.5 (2007) à la 4.1 (2010). À partir de la version 5 (2011), seule l\u2019architecture ESXi est disponible.' },
        { type: 'kv', items: [
          { k: 'vCenter Server', v: 'Gère tous les composants physiques et virtuels d\u2019un centre de données virtualisé.' },
          { k: 'vSphere Client', v: 'Pour se connecter au serveur vCenter afin de gérer le vCenter et les hôtes ESXi.' },
          { k: 'vMotion', v: 'Fonctionnalité permettant de migrer des VM d\u2019un hôte ESXi à un autre sans temps d\u2019arrêt.' },
          { k: 'High Availability (HA)', v: 'Fonctionnalité assurant la disponibilité continue des VM en redémarrant automatiquement les VM sur d\u2019autres hôtes en cas de défaillance.' },
        ] },
      ],
    },
    {
      id: 'v8s5',
      title: 'Citrix Xen',
      blocks: [
        { type: 'paragraph', text: 'Le modèle Xen a un invité spécial appelé Domaine 0 (Dom0) : cet invité est démarré lors du démarrage de l\u2019hyperviseur.' },
        { type: 'list', items: [
          'Il dispose de privilèges de gestion différents de ceux des autres invités.',
          'Il a un accès direct au matériel.',
          'Il gère toutes les E/S pour les invités individuels.',
        ] },
      ],
    },
    {
      id: 'v8s6',
      title: 'QEMU-KVM',
      blocks: [
        { type: 'paragraph', text: 'KVM (Kernel-based Virtual Machine) prend en charge à la fois la virtualisation complète (systèmes invités non modifiés) et la paravirtualisation. C\u2019est une solution open source intégrée au sein du noyau Linux depuis la version 2.6.20.' },
        { type: 'note', title: 'À retenir', text: 'KVM est un projet issu de QEMU (Quick Emulator), dont il utilise une version modifiée. Même si on fait souvent référence à l\u2019hyperviseur KVM, il s\u2019agit en réalité d\u2019une combinaison QEMU-KVM.' },
      ],
    },
    {
      id: 'v8s7',
      title: 'Microsoft Hyper-V',
      blocks: [
        { type: 'paragraph', text: 'Microsoft a débuté dans l\u2019espace de la virtualisation avec Virtual Server en 2005. Hyper-V a été publié en 2008 en tant que partie installable du système d\u2019exploitation Windows Server 2008.' },
      ],
    },
    {
      id: 'v8s8',
      title: 'VirtualBox : les modes réseau (NAT, Bridgé, Host-Only)',
      blocks: [
        { type: 'kv', items: [
          { k: 'NAT (Network Address Translation)', v: 'La manière la plus simple d\u2019accéder à un réseau externe depuis une VM. Ne demande généralement aucune configuration sur le réseau hôte ou le système invité : c\u2019est le mode réseau PAR DÉFAUT de VirtualBox. La VM agit comme un vrai ordinateur connecté à Internet par un routeur — ce « routeur » est le moteur réseau de VirtualBox, qui dirige le trafic de façon transparente et se place entre chaque VM et l\u2019hôte. Cette séparation maximise la sécurité : par défaut, les VMs ne peuvent pas se parler et ne peuvent pas être contactées de l\u2019extérieur.' },
          { k: 'Réseau bridgé', v: 'VirtualBox intercepte les données du réseau physique et y envoie des données : cela crée une nouvelle interface réseau logicielle. Quand un invité utilise cette interface, cela se passe comme si l\u2019invité était connecté physiquement au réseau avec un câble. L\u2019hôte peut envoyer des données à l\u2019invité et en recevoir. Avec ce mode, les VMs peuvent contacter l\u2019hôte et l\u2019extérieur, et peuvent être contactées depuis l\u2019hôte.' },
          { k: 'Réseau Host-Only', v: 'Mode dans lequel les machines virtuelles peuvent communiquer uniquement entre elles et avec l\u2019hôte sur lequel elles sont exécutées. Les VMs ne peuvent PAS accéder au réseau externe ou à Internet, ni communiquer avec des machines physiques en dehors de l\u2019hôte.' },
        ] },
        { type: 'diagram', diagram: 'v-vbox-net' },
      ],
    },
  ],
}
