import type { CourseModule } from '@/types/course';

export const module2p1: CourseModule = {
  id: 2,
  slug: 'systemes-fichiers-hierarchie',
  title: 'Systèmes de fichiers Linux — Comprendre la hiérarchie',
  subtitle: 'Définition, comparatif des FS, arborescence FHS, répertoires principaux, commandes de navigation et montage',
  icon: 'FolderTree',
  accent: 'teal',
  sections: [
    {
      id: 'm2p1-definition',
      title: '1. Qu’est-ce qu’un système de fichiers ?',
      blocks: [
        {
          kind: 'def',
          term: 'Système de fichiers (File System)',
          text: "Méthode d'**organisation** et de **gestion** des données sur un support de stockage (disque dur, SSD, clé USB, etc.). Il permet au système d'exploitation de **stocker, lire, modifier et supprimer** des fichiers.",
        },
        { kind: 'h3', text: 'Fonctions principales (5)' },
        {
          kind: 'list',
          items: [
            '**Organisation hiérarchique** des fichiers et répertoires.',
            '**Gestion des métadonnées** : taille, propriétaire, permissions, date…',
            '**Contrôle des accès** aux ressources (droits utilisateurs).',
            '**Allocation et libération** d’espace disque.',
            '**Fiabilité et tolérance aux pannes** : journalisation, vérification d’intégrité.',
          ],
        },
        { kind: 'h3', text: 'Lien Kernel – VFS – Système de fichiers' },
        {
          kind: 'p',
          text: "Le **VFS (Virtual File System)** est une couche d'abstraction du noyau Linux qui permet d'unifier l'accès à tous les systèmes de fichiers (ext4, XFS, NTFS…) : les applications parlent au VFS, qui traduit vers le bon pilote de FS.",
        },
        { kind: 'diagram', id: 'fs-architecture', caption: 'Architecture d’un système de fichiers Linux : applications → VFS → pilote FS → matériel' },
      ],
    },
    {
      id: 'm2p1-comparatif',
      title: '2. Tableau comparatif des systèmes de fichiers',
      blocks: [
        {
          kind: 'table',
          headers: ['Système', 'OS', 'Caractéristiques', 'Avantages', 'Inconvénients'],
          rows: [
            ['FAT32', 'Windows / Linux / macOS', 'Ancien format, compatible avec tous les OS', 'Très compatible, léger', 'Taille max fichier = **4 Go**, pas de gestion des droits'],
            ['NTFS', 'Windows (lecture seule macOS/Linux sans outil)', 'Journalisation, permissions, compression', 'Sécurisé, fiable, supporte fichiers > 4 Go', 'Moins compatible avec autres systèmes'],
            ['exFAT', 'Windows / macOS / Linux', 'Version améliorée de FAT32 pour gros fichiers', 'Compatible multi-OS, pas de limite 4 Go', 'Pas de journalisation, moins sûr'],
            ['ext4', 'Linux', 'Journalisé, stable, supporte gros volumes', 'Performant, fiable, standard Linux', 'Peu compatible Windows/macOS'],
            ['XFS', 'Linux', 'Journalisé, orienté gros fichiers', 'Excellente performance pour serveurs', 'Moins flexible pour petits fichiers'],
            ['Btrfs', 'Linux', 'Copie sur écriture (COW), snapshots', 'Moderne, compression et réplication', 'Moins mature que ext4'],
            ['APFS', 'macOS', 'Journalisé, optimisé pour SSD', 'Très rapide, sécurisé', 'Compatible uniquement macOS'],
          ],
          caption: 'Les 7 systèmes de fichiers à connaître par cœur',
        },
        { kind: 'h3', text: 'Utilisation typique de chaque FS' },
        {
          kind: 'list',
          items: [
            '**NTFS** : le plus sécurisé sous Windows — parfait pour les disques internes Windows (droits d’accès, compression, journalisation).',
            '**FAT32** : le plus compatible, mais limité à **4 Go par fichier**.',
            '**exFAT** : idéal pour les **clés USB** et disques externes multi-OS — recommandé pour transférer de gros fichiers multimédias, moins sûr (pas de journalisation ni permissions avancées).',
            '**ext4** : système par défaut de la plupart des distributions Linux (Ubuntu, Debian…) — stabilité et performance pour serveurs et postes.',
            '**XFS** : serveurs Linux professionnels — très efficace pour les gros volumes et fichiers volumineux.',
            '**Btrfs** : systèmes modernes cherchant la résilience et la gestion avancée (snapshots, compression) — à réserver aux administrateurs expérimentés.',
            '**APFS** : exclusivement macOS/iOS — optimisé SSD, rapide et sécurisé.',
          ],
        },
        { kind: 'h3', text: 'FS historiques et autres (architecture)' },
        {
          kind: 'table',
          headers: ['FS', 'Description'],
          rows: [
            ['EXT3 (Third Extended)', 'Ancien standard de Linux. A introduit la **journalisation** → restauration facile après crash.'],
            ['EXT4 (Fourth Extended)', 'Par défaut sur la plupart des distributions Linux modernes. Meilleure performance pour gros fichiers et partitions.'],
            ['HPFS (High Performance FS)', 'Développé par **IBM** pour OS/2. Gestion efficace de gros fichiers. Peu utilisé aujourd’hui.'],
            ['VFAT (Virtual FAT)', 'Version améliorée de FAT16/FAT32, introduite avec **Windows 95**. Idéal pour clés USB et disques externes.'],
            ['FreeBSD UFS (Unix FS)', 'Stable, sécurisé, conçu pour serveurs. Gestion fine des droits d’accès et **quotas utilisateurs**.'],
          ],
        },
        { kind: 'h3', text: 'Linux vs Windows' },
        {
          kind: 'table',
          headers: ['Aspect', 'Linux', 'Windows'],
          rows: [
            ['FS utilisés', 'ext4, XFS, Btrfs', 'NTFS, FAT32, exFAT'],
            ['Organisation', 'Arborescence **unique** avec racine **/**', 'Lettres de disque (C:, D:…)'],
            ['Permissions', 'Utilisateurs **strictes**', 'ACL (Access Control List)'],
            ['Fiabilité', 'Journalisation intégrée, très stable, serveurs', 'Optimisé pour postes utilisateurs'],
            ['Logiciels', '—', 'Plus compatible avec le grand public'],
          ],
        },
      ],
    },
    {
      id: 'm2p1-fhs',
      title: '3. L’arborescence Linux (FHS) — répertoires principaux',
      blocks: [
        { kind: 'diagram', id: 'fhs-tree', caption: 'Arborescence standard Linux : une racine unique « / »' },
        {
          kind: 'def',
          term: '/opt — “Optional”',
          text: "Dossier réservé aux **applications tierces** (logiciels additionnels) qui ne font pas partie du système de base Linux. Quand on installe manuellement un logiciel (hors gestionnaire de paquets), il est souvent placé dans /opt. **Chaque logiciel y a son propre dossier**.",
        },
        {
          kind: 'table',
          headers: ['Logiciel', 'Chemin typique', 'Détails'],
          rows: [
            ['VMware Workstation', '/opt/vmware/', 'Binaires et ressources de VMware'],
            ['Google Chrome', '/opt/google/chrome/', 'Navigateur installé via paquet .deb'],
            ['Visual Studio Code', '/opt/visual-studio-code/', 'Application installée manuellement'],
            ['Docker Desktop (Linux)', '/opt/docker-desktop/', 'Version GUI de Docker'],
            ['XAMPP', '/opt/lampp/', 'Apache + MySQL + PHP'],
          ],
        },
        {
          kind: 'def',
          term: '/tmp — “Temporary files”',
          text: 'Répertoire **temporaire partagé** par tous les utilisateurs et processus. Contient les fichiers temporaires créés par les applications (installation, cache, logs temporaires…). ⚠️ **/tmp est effacé à chaque redémarrage**.',
        },
        {
          kind: 'table',
          headers: ['Répertoire', 'Utilisation principale', 'Exemples concrets'],
          rows: [
            ['/etc/', 'Tous les fichiers de **configuration** système et applicatifs', '/etc/nginx/nginx.conf · /etc/ssh/sshd_config'],
            ['/usr/', 'Programmes installés pour les utilisateurs (User System Resources)', '/usr/bin/python3 · /usr/lib/firefox'],
            ['/opt/', 'Applications supplémentaires ou tierces non fournies par la distribution', '/opt/lampp/ · /opt/google/chrome/ · /opt/vmware/'],
            ['/tmp/', 'Fichiers temporaires (supprimés au redémarrage)', 'Cache, téléchargements temporaires d’installation'],
            ['/var/', 'Données **variables** : journaux, BDD, sites web, emails…', '/var/log/ · /var/www/ · /var/lib/mysql/ · /var/spool/mail/'],
            ['/mnt/', 'Point de montage **temporaire** (admin)', 'sudo mount /dev/sdb1 /mnt'],
            ['/media/', 'Montage **automatique** des périphériques amovibles (USB, CD…)', '/media/hedi/USB32'],
            ['/proc/ et /sys/', 'Systèmes de fichiers **virtuels** : infos noyau et processus', '/proc/cpuinfo, /sys/…'],
            ['/root/', 'Répertoire personnel de l’**administrateur**', 'Home du root (pas /home/root)'],
          ],
        },
        { kind: 'h3', text: 'Cas pratiques : où s’installe quoi ?' },
        {
          kind: 'table',
          headers: ['Action', 'Où ça s’installe / agit', 'Exemple concret'],
          rows: [
            ['Installation manuelle d’un logiciel', '/opt', 'VMware, VS Code, Chrome'],
            ['Fichiers temporaires pendant installation', '/tmp', 'Installeurs .run ou .deb'],
            ['Sauvegardes utilisateurs', '/home/<user>/backup ou /var/backups', 'Sauvegarde manuelle ou automatique'],
            ['Docker Engine', '/usr/bin/ + /var/lib/docker/', 'Binaires dans /usr/bin, données conteneurs dans /var/lib/docker'],
            ['VMware / VirtualBox', '/opt/ (binaire) + /var/lib/', '/opt/vmware/ pour l’app, /var/lib/vmware/ pour les données'],
            ['Utilitaires systèmes (rsync, tar…)', '/bin, /usr/bin', 'Outils natifs Linux'],
          ],
        },
        { kind: 'h3', text: 'Le répertoire /mnt en détail' },
        {
          kind: 'p',
          text: "/mnt est utilisé comme point de montage temporaire pour tout disque ou partition que l'on souhaite accéder **ponctuellement** : disque interne secondaire, partition interne ou disque externe.",
        },
        {
          kind: 'code',
          title: 'Sous-répertoires typiques de /mnt',
          code: `/mnt
├── data      # Partition interne pour les données
├── backup    # Disque externe pour sauvegarde
└── usbdrive  # Clé USB ou autre périphérique temporaire`,
        },
        {
          kind: 'cmd',
          code: 'sudo mount /dev/sdb1 /mnt/data',
          note: 'Monter un disque interne secondaire',
        },
        {
          kind: 'cmd',
          code: 'sudo mount /dev/sdc1 /mnt/backup',
          note: 'Monter un disque externe',
        },
      ],
    },
    {
      id: 'm2p1-commandes',
      title: '4. Commandes de navigation de base',
      blocks: [
        {
          kind: 'table',
          headers: ['Commande', 'Rôle'],
          rows: [
            ['pwd', 'Affiche le **chemin** du dossier courant (print working directory)'],
            ['ls', 'Liste les fichiers'],
            ['cd', '**Change** de répertoire (change directory)'],
            ['cat, less, more', 'Affichage du **contenu** de fichiers'],
            ['cp', '**Copier** des fichiers/dossiers'],
            ['mv', '**Déplacer** / renommer'],
            ['rm', '**Supprimer**'],
            ['mkdir', '**Créer** un répertoire'],
            ['rmdir', '**Supprimer** un répertoire (vide)'],
          ],
        },
        { kind: 'h3', text: 'Astuces ls' },
        {
          kind: 'cmd',
          code: 'ls -l',
          note: 'Affiche les permissions',
        },
        {
          kind: 'cmd',
          code: 'ls -a',
          note: 'Affiche les fichiers cachés (commençant par .)',
        },
        {
          kind: 'cmd',
          code: 'ls -lh',
          note: 'Taille lisible (K, M, G)',
        },
        { kind: 'h3', text: 'Recherche de fichiers' },
        {
          kind: 'cmd',
          code: 'find / -name fichier.txt',
          note: 'Recherche par nom dans une arborescence',
        },
        {
          kind: 'cmd',
          code: 'locate motclé',
          note: 'Recherche rapide via base indexée',
        },
        {
          kind: 'cmd',
          code: 'which / whereis commande',
          note: 'Localise les exécutables',
        },
        {
          kind: 'note',
          variant: 'warn',
          text: '⚠️ Attention aux **droits root** pour la recherche dans / (certaines zones sont protégées).',
        },
        { kind: 'h3', text: 'Chemins absolus et relatifs' },
        {
          kind: 'table',
          headers: ['Type', 'Définition', 'Exemple'],
          rows: [
            ['Absolu', 'Commence **toujours par /**', '/home/user/documents/file.txt'],
            ['Relatif', 'Basé sur le **répertoire courant**', '../dossier/file.txt'],
          ],
        },
        { kind: 'h3', text: 'Navigation rapide' },
        {
          kind: 'cmd',
          code: 'cd -',
          note: 'Revient au dossier précédent',
        },
        {
          kind: 'cmd',
          code: 'cd ~',
          note: 'Va au dossier personnel',
        },
        {
          kind: 'cmd',
          code: 'history',
          note: 'Historique des commandes',
        },
        {
          kind: 'cmd',
          code: 'alias',
          note: 'Créer des raccourcis de commande',
        },
      ],
    },
    {
      id: 'm2p1-montage',
      title: '5. Montage d’un système de fichiers',
      blocks: [
        { kind: 'diagram', id: 'mounting', caption: 'Le montage connecte une partition (/dev/sdb1) à un répertoire (point de montage)' },
        {
          kind: 'def',
          term: 'Montage',
          text: 'Un système de fichiers doit être **monté avant utilisation**. Le montage **connecte une partition à un répertoire** (point de montage). Exemple : /dev/sdb1 → /mnt/usb',
        },
        { kind: 'h3', text: 'Commandes de montage' },
        {
          kind: 'cmd',
          code: 'mount [options] /dev/sdX /mnt/dossier',
          note: 'Monter une partition',
        },
        {
          kind: 'cmd',
          code: 'umount /mnt/dossier',
          note: 'Démonter',
        },
        {
          kind: 'cmd',
          code: 'df -h',
          note: 'Vérifier les montages (espace disque)',
        },
        {
          kind: 'cmd',
          code: 'lsblk',
          note: 'Lister les périphériques blocs',
        },
        {
          kind: 'cmd',
          code: 'mount | grep /mnt',
          note: 'Vérifier un montage précis',
        },
        {
          kind: 'note',
          variant: 'warn',
          text: '⚠️ Les utilisateurs **non-root** doivent avoir les droits nécessaires pour monter.',
        },
        { kind: 'h3', text: 'Le fichier /etc/fstab' },
        {
          kind: 'p',
          text: 'Fichier de configuration pour les **montages automatiques au démarrage**. Format des lignes :',
        },
        {
          kind: 'code',
          title: 'Exemples de lignes fstab',
          code: `/dev/sda1  /boot  ext4  defaults  0  2
UUID=xxxx  /data  ext4  defaults  0  0`,
        },
        { kind: 'h3', text: 'Exemple complet : montage d’une clé USB' },
        {
          kind: 'steps',
          items: [
            { title: '1. Identifier le périphérique', text: 'lsblk' },
            { title: '2. Créer un point de montage', text: 'mkdir /mnt/usb' },
            { title: '3. Monter la clé', text: 'mount /dev/sdb1 /mnt/usb' },
            { title: '4. Vérifier', text: 'df -h' },
            { title: '5. Démonter', text: 'umount /mnt/usb' },
          ],
        },
        { kind: 'h3', text: 'Récapitulatif de la séance' },
        {
          kind: 'list',
          items: [
            'Compréhension du **FHS** (Filesystem Hierarchy Standard)',
            '**Commandes** de navigation',
            '**Montage et démontage**',
            'Configuration automatique (**/etc/fstab**)',
          ],
        },
        {
          kind: 'note',
          variant: 'info',
          text: '🔭 Prochaine séance : maintenance d’un système de fichiers Linux — partitionnement, création de FS, vérification et **introduction à LVM** (Logical Volume Manager) : au lieu de partitions fixes (/dev/sda1…), LVM permet de créer des volumes logiques **redimensionnables** sans tout reformater.',
        },
      ],
    },
  ],
};
