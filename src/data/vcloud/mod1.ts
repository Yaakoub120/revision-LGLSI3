import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// VIRTUALISATION & CLOUD — Modules 1 & 2
// (Cours Partie 1, slides 13-31 — Leila GHORBEL, LGLSI3, 2025-2026)
// ═══════════════════════════════════════════════════════════════

export const vmod1: Module = {
  id: 'v1',
  num: 1,
  title: 'Histoire des systèmes distribués',
  subtitle: 'Des tâches isolées aux messages, SOA, APIs REST, VM et cloud',
  icon: '🕰️',
  color: 'violet',
  source: 'Partie 1 — Introduction (slides 13-19)',
  sections: [
    {
      id: 'v1s1',
      title: 'Du monotâche aux systèmes distribués',
      blocks: [
        { type: 'paragraph', text: 'Les systèmes distribués ont parcouru un long chemin depuis leur création. Au tout début, un ordinateur ne pouvait effectuer qu\u2019une seule tâche à la fois. Si plusieurs tâches devaient être effectuées en parallèle, il fallait faire fonctionner plusieurs ordinateurs en parallèle.' },
        { type: 'paragraph', text: 'Mais leur exécution en parallèle ne suffisait pas pour construire un système véritablement distribué : cela nécessite un mécanisme pour communiquer entre différents ordinateurs (ou entre les programmes exécutés sur ces ordinateurs).' },
        { type: 'definition', term: 'Communication orientée message', def: 'Deux ordinateurs partagent des données à l\u2019aide d\u2019un message qui les encapsule. Cette nécessité d\u2019échanger (partager) des données sur plusieurs ordinateurs a suscité cette idée de communication.' },
        { type: 'paragraph', text: 'Il existait peu d\u2019autres mécanismes de partage : le partage de fichiers et le partage de base de données.' },
      ],
    },
    {
      id: 'v1s2',
      title: 'Les architectures orientées service (SOA)',
      blocks: [
        { type: 'paragraph', text: 'L\u2019invention des OS multitâches, tels que Windows et Unix, a permis aux développeurs de créer et d\u2019exécuter des systèmes distribués complets sur une même machine.' },
        { type: 'definition', term: 'SOA — Service Oriented Architecture', def: 'Architecture dans laquelle chaque système distribué peut être construit en intégrant un ensemble de services exécutés sur un ou plusieurs ordinateurs.' },
        { type: 'kv', items: [
          { k: 'WSDL', v: 'Interface de service définie pour le modèle SOAP (Web Service Description Language).' },
          { k: 'WADL', v: 'Interface de service définie pour le modèle REST (Web Application Description Language).' },
        ] },
        { type: 'paragraph', text: 'Les consommateurs de service utilisaient ces interfaces correctement définies pour leurs implémentations côté client.' },
      ],
    },
    {
      id: 'v1s3',
      title: 'La popularité des APIs REST',
      blocks: [
        { type: 'paragraph', text: 'Avec la popularité d\u2019Internet et la simplicité du modèle, la communication basée sur REST est devenue plus populaire que le modèle de communication basé sur SOAP. Cela a conduit à l\u2019évolution de la communication basée sur l\u2019interface de programmation d\u2019application (API) sur le modèle REST.' },
        { type: 'definition', term: 'API', def: 'Un médiateur entre les utilisateurs (ou clients) et les ressources ou services web auxquels ils souhaitent accéder.' },
        { type: 'list', items: [
          'Pour une entreprise, c\u2019est une solution pour partager des ressources et des informations.',
          'Tout en maintenant un certain niveau de sécurité.',
        ] },
      ],
    },
    {
      id: 'v1s4',
      title: 'Les machines virtuelles',
      blocks: [
        { type: 'paragraph', text: 'Vient ensuite le grand moment des systèmes distribués : l\u2019importance des entreprises basées sur Internet telles que Facebook, Google, Amazon, Netflix, LinkedIn et Twitter. Elles voulaient créer des systèmes distribués couvrant plusieurs zones géographiques et plusieurs centres de données.' },
        { type: 'paragraph', text: 'Les ingénieurs ont commencé à réfléchir au concept d\u2019un « seul ordinateur » différemment : au lieu de considérer un ordinateur comme un ordinateur unique, ils cherchent un moyen de créer plusieurs ordinateurs virtuels sur le même ordinateur.' },
        { type: 'definition', term: 'Machine virtuelle (idée fondatrice)', def: 'Un même ordinateur peut agir comme plusieurs ordinateurs et les exécuter tous en parallèle.' },
      ],
    },
    {
      id: 'v1s5',
      title: 'Le cloud computing',
      blocks: [
        { type: 'paragraph', text: 'La technologie de virtualisation rend possible le cloud computing. Les fournisseurs de cloud computing mettent en place et entretiennent leurs propres datacenters.' },
        { type: 'list', items: [
          'Ils créent différents environnements virtuels qui utilisent les ressources matérielles de base.',
          'Vous programmez ensuite votre système pour qu\u2019il accède à ces ressources en cloud à l\u2019aide des APIs.',
        ] },
        { type: 'paragraph', text: 'Exemples de déploiements mondiaux : les datacenters d\u2019Amazon et ceux de Google répartis dans le monde.' },
      ],
    },
  ],
}

export const vmod2: Module = {
  id: 'v2',
  num: 2,
  title: 'Ordinateur & serveurs',
  subtitle: 'Hardware, software, serveurs physiques (formats, rôles) et serveurs virtuels',
  icon: '💻',
  color: 'violet',
  source: 'Partie 1 — Rappels (slides 20-31)',
  sections: [
    {
      id: 'v2s1',
      title: 'Hardware — les composants matériels',
      blocks: [
        { type: 'paragraph', text: 'Retour en arrière sur le fonctionnement d\u2019un ordinateur : la partie matérielle (hardware) se compose des éléments suivants.' },
        { type: 'kv', items: [
          { k: 'ROM (Read Only Memory)', v: 'Mémoire non volatile qui stocke un logiciel appelé BIOS, responsable du démarrage du matériel. La ROM ne s\u2019efface jamais lorsque vous éteignez l\u2019ordinateur.' },
          { k: 'Carte mère', v: 'PCB (Printed Circuit Board) qui contient le processeur, la RAM, la ROM, le réseau et les ports I/O (Input/Output), ainsi que d\u2019autres composants.' },
          { k: 'Stockage', v: 'Dispositif de stockage persistant (non volatile) tel qu\u2019un disque dur (HDD) ou un disque SSD (Solid State Drive).' },
          { k: 'RAM (Random Access Memory)', v: 'Contient les programmes à exécuter et les données actuellement utilisées par le processeur.' },
          { k: 'Processeur — CPU', v: '(Computer Processing Unit) : la partie de l\u2019ordinateur qui exécute les programmes logiciels en effectuant des opérations mathématiques, logiques et d\u2019entrée/sortie. C\u2019est la partie du matériel qui résout les problèmes.' },
        ] },
      ],
    },
    {
      id: 'v2s2',
      title: 'Software — logiciel système vs application',
      blocks: [
        { type: 'paragraph', text: 'Le logiciel système sert d\u2019interface entre le logiciel d\u2019application et le matériel : il gère les ressources système et fournit une plate-forme à l\u2019exécution du logiciel d\u2019application. Le logiciel d\u2019application constitue une interface entre l\u2019utilisateur et le logiciel système, conçu pour que les utilisateurs puissent effectuer leurs tâches spécifiques.' },
        { type: 'table', headers: ['Base de comparaison', 'Logiciel d\u2019application', 'Logiciel système'], rows: [
          ['De base', 'Exécute des tâches spécifiques pour lesquelles il a été conçu', 'Gère les ressources système et fournit une plate-forme pour l\u2019exécution du logiciel d\u2019application'],
          ['La langue', 'Écrit dans un langage évolué : Java, C++, .net, VB, etc.', 'Écrit dans un langage de bas niveau : langage d\u2019assemblage'],
          ['Exécution', 'S\u2019exécute au fur et à mesure des demandes de l\u2019utilisateur', 'Commence quand le système est allumé et s\u2019exécute jusqu\u2019à l\u2019arrêt'],
          ['Exigence', 'Pas nécessaire pour exécuter le système ; spécifique à l\u2019utilisateur', 'Un système ne peut pas fonctionner sans logiciel système'],
          ['Objectif', 'Spécifique', 'Polyvalent'],
          ['Exemples', 'Microsoft Office, Photoshop, logiciel d\u2019animation…', 'Système d\u2019exploitation'],
        ], caption: 'Tableau de comparaison logiciel d\u2019application / logiciel système (slide 23)' },
      ],
    },
    {
      id: 'v2s3',
      title: 'Qu\u2019est-ce qu\u2019un serveur physique ?',
      blocks: [
        { type: 'paragraph', text: 'Les utilisateurs (comme les entreprises) investissent beaucoup dans leurs infrastructures informatiques pour améliorer efficacité et fiabilité. Il existe des solutions traditionnelles (serveurs physiques — puissants déploiements des centres de données traditionnels) et virtuelles (serveurs virtuels — services innovants centrés cloud, adaptés aux besoins du futur).' },
        { type: 'definition', term: 'Serveur physique', def: 'Très similaire à un ordinateur conventionnel : mémoire, processeur, connexion réseau, disque dur et un OS pour exécuter programmes et applications. Il est mis à disposition d\u2019un seul client (ex. accessible uniquement par les membres d\u2019une entreprise).' },
        { type: 'list', items: [
          'Serveur Web : enregistre des contenus Web et assure l\u2019accessibilité aux utilisateurs de manière sûre.',
          'Serveur Proxy : interface de communication dans des réseaux pour filtrer les communications et contrôler la bande passante.',
          'Serveur de fichiers : stockage de fichiers de données pour plusieurs clients.',
          'Serveur de bases de données : permet à d\u2019autres programmes d\u2019accéder à un ou plusieurs systèmes de bases de données sur un réseau.',
          'Serveur d\u2019impression : plusieurs ordinateurs peuvent s\u2019y connecter à distance pour imprimer des fichiers.',
          'Serveur email : utilisé pour recevoir et expédier des courriers électroniques.',
        ] },
      ],
    },
    {
      id: 'v2s4',
      title: 'Formats de serveurs : tour, rack, lame',
      blocks: [
        { type: 'paragraph', text: 'La puissance de calcul, la capacité de stockage et la performance d\u2019un serveur dépendent de nombreux critères, y compris le format.' },
        { type: 'kv', items: [
          { k: 'Format tour', v: 'Ressemble de près à une unité centrale d\u2019ordinateur fixe. Il peut être installé dans n\u2019importe quelle pièce de l\u2019entreprise, contrairement aux serveurs racks ou lames qui nécessitent une baie pour fonctionner.' },
          { k: 'Format rack', v: 'Conçu pour être disposé dans des baies : des armoires équipées pour installer les différents matériels informatiques.' },
          { k: 'Format lame (blade)', v: 'Les derniers nés des formats. Compacts et minces « comme une lame », ils se glissent verticalement dans un casier dédié.' },
        ] },
      ],
    },
    {
      id: 'v2s5',
      title: 'Serveur virtuel',
      blocks: [
        { type: 'definition', term: 'Serveur virtuel', def: 'Ne fonctionne pas sur un ordinateur physique mais sur un logiciel spécialisé, également appelé hyperviseur. C\u2019est un système permettant de convertir un serveur physique en plusieurs machines virtuelles (VM) indépendantes qui agissent de manière autonome comme un dispositif physique.' },
        { type: 'list', items: [
          'Il est capable d\u2019exécuter son propre système d\u2019exploitation (OS), en utilisant des techniques de virtualisation.',
          'Il peut être migré facilement vers l\u2019environnement cloud.',
        ] },
      ],
    },
  ],
}
