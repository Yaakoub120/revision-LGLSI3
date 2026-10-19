import type { CourseModule } from '@/types/course';

export const module2p2: CourseModule = {
  id: 3,
  slug: 'systemes-fichiers-medias',
  title: 'Systèmes de fichiers Linux — Gestion des médias',
  subtitle: 'Nommage des périphériques, /etc/fstab, identification des disques, partitionnement MBR/GPT, création et vérification de FS',
  icon: 'HardDrive',
  accent: 'cyan',
  sections: [
    {
      id: 'm2p2-nommage',
      title: '1. Nommage des médias de stockage',
      blocks: [
        {
          kind: 'table',
          headers: ['Type de média', 'Description'],
          rows: [
            ['HDD (Hard Disk Drive)', 'Disque dur classique (plateaux magnétiques)'],
            ['SSD (Solid State Drive)', 'Disque à mémoire flash, plus rapide'],
            ['Clé USB', 'Périphérique amovible, souvent monté automatiquement'],
            ['CD/DVD', 'Support optique, souvent monté dans /media ou /mnt/cdrom'],
          ],
        },
        { kind: 'h3', text: 'Localisation dans /dev' },
        {
          kind: 'table',
          headers: ['Chemin', 'Signification'],
          rows: [
            ['/dev/sda', 'Premier disque détecté'],
            ['/dev/sdb1', 'Première partition du **deuxième** disque'],
            ['/dev/sdc', 'Troisième disque (souvent un périphérique USB)'],
          ],
        },
        { kind: 'h3', text: 'Convention de nommage Linux' },
        {
          kind: 'list',
          items: [
            '**Disques SATA/SCSI :** /dev/sdX où X = lettre identifiant le disque (a, b, c…). Exemples : /dev/sda (1er disque), /dev/sdb (2e disque).',
            '**Disques NVMe (SSD modernes) :** /dev/nvme0n1px — nvme0n1 = premier périphérique NVMe détecté, **p1 = 1ère partition** (ex : /dev/nvme0n1p1).',
            '**Carte SD :** /dev/mmcblkXpX — mmcblk0 = première carte SD détectée, pX = numéro de partition.',
          ],
        },
        { kind: 'diagram', id: 'device-naming', caption: 'Anatomie des noms de périphériques : sda, nvme0n1p1, mmcblk0p1' },
      ],
    },
    {
      id: 'm2p2-fstab',
      title: '2. Le fichier /etc/fstab en profondeur',
      blocks: [
        {
          kind: 'p',
          text: '**Rôle :** fichier de configuration pour les **montages automatiques**. Avantage : montage automatique au démarrage.',
        },
        {
          kind: 'p',
          text: 'Le **5e champ** (freq) contrôle le dump : **0** = pas de sauvegarde avec dump, **1** = sauvegarde activée.',
        },
        { kind: 'h3', text: 'Étapes recommandées pour éditer /etc/fstab (mode administrateur)' },
        {
          kind: 'steps',
          items: [
            { title: '1. Sauvegarder avant modification', text: 'sudo cp /etc/fstab /etc/fstab.backup — Restauration en cas de problème : sudo cp /etc/fstab.backup /etc/fstab' },
            { title: '2. Éditer le fichier', text: 'sudo nano /etc/fstab ou sudo vim /etc/fstab' },
            { title: '3. Ajouter ou modifier la ligne voulue', text: '/dev/sdb1  /mnt/data  ext4  defaults  0  0' },
            { title: '4. Tester la validité AVANT de redémarrer', text: 'sudo mount -a — monte tous les systèmes définis dans fstab. Si aucune erreur n’apparaît, la configuration est correcte.' },
            { title: '5. Redémarrer le système', text: 'sudo reboot' },
          ],
        },
        {
          kind: 'note',
          variant: 'tip',
          text: '💡 Astuce : utiliser **sudo blkid** pour obtenir l’UUID. Les **UUID sont plus fiables** que /dev/sdX (qui peuvent changer selon l’ordre de branchement).',
        },
      ],
    },
    {
      id: 'm2p2-identifier',
      title: '3. Identifier les périphériques',
      blocks: [
        {
          kind: 'table',
          headers: ['Commande', 'Ce qu’elle affiche', 'Champs clés'],
          rows: [
            ['lsblk', 'La **hiérarchie** des périphériques', 'MAJ:MIN (identifiant interne), RM (removable : 1 amovible / 0 fixe), SIZE (taille), RO (read only), point de montage'],
            ['fdisk -l', 'Les disques et leurs **tables de partition**', 'Start (secteur de début), End (secteur de fin), Sectors (total secteurs), Size, Type'],
            ['blkid', '**UUID** et systèmes de fichiers', 'UUID, LABEL des partitions, TYPE de FS (ext4, vfat…), emplacement /dev/sda'],
            ['lsblk /dev/sda', 'Hiérarchie d’un disque précis', '—'],
            ['lsblk -f', 'Combine lsblk + blkid (UUID + type de FS)', '—'],
          ],
        },
        {
          kind: 'cmd',
          code: 'lsblk -f',
          note: 'Combine les infos de lsblk et blkid directement',
        },
      ],
    },
    {
      id: 'm2p2-montage',
      title: '4. Montage et démontage — points standards',
      blocks: [
        {
          kind: 'p',
          text: '**Montage = rattacher un périphérique à un répertoire.** Le montage rend les fichiers accessibles.',
        },
        {
          kind: 'cmd',
          code: 'sudo mount /dev/sdb1 /mnt/usb',
          note: 'Monter',
        },
        {
          kind: 'cmd',
          code: 'sudo umount /mnt/usb',
          note: 'Démonter',
        },
        {
          kind: 'table',
          headers: ['Dossier', 'Utilisation principale', 'Monté par', 'Exemple'],
          rows: [
            ['/mnt', 'Montages **manuels** (administrateur)', 'Commande mount', '/mnt/data'],
            ['/media', 'Montages **automatiques** (clés USB, CD)', 'Système / udisks', '/media/hedi/USB32'],
            ['/run/media', 'Montages **dynamiques** (environnements graphiques)', 'Gestionnaire de bureau', '/run/media/hedi/DISK'],
          ],
        },
        { kind: 'h3', text: 'Utilitaire udisks' },
        {
          kind: 'p',
          text: "**udisks** est un gestionnaire de disques sous Linux : c'est un **démon système** (service d'arrière-plan) qui gère les périphériques de stockage. Il permet aux environnements graphiques (**GNOME, KDE, Fedora**) de détecter automatiquement les périphériques branchés, de les monter sans commande manuelle et de les démonter proprement à la déconnexion.",
        },
        {
          kind: 'cmd',
          code: 'systemctl status udisks2',
          note: 'Vérifier l’état du service udisks',
        },
        { kind: 'h3', text: 'Commandes utiles pour le montage' },
        {
          kind: 'cmd',
          code: 'df -h',
          note: 'Espace disque (Disk Free)',
        },
        {
          kind: 'cmd',
          code: 'du -sh /home',
          note: 'Taille d’un dossier (Disk Usage)',
        },
        {
          kind: 'cmd',
          code: 'findmnt',
          note: 'Affiche les FS montés',
        },
        {
          kind: 'cmd',
          code: 'mount | grep sda',
          note: 'Vérifie les points actifs — grep filtre les lignes contenant « sda »',
        },
        { kind: 'h3', text: 'Bonnes pratiques et erreurs fréquentes' },
        {
          kind: 'list',
          items: [
            '**Toujours démonter** avant retrait',
            '**Ne pas monter deux fois** la même partition',
            '**Vérifier /etc/fstab** avant redémarrage',
          ],
        },
      ],
    },
    {
      id: 'm2p2-partitionnement',
      title: '5. Partitionnement des disques',
      blocks: [
        {
          kind: 'def',
          term: 'Partitionnement',
          text: 'Diviser un disque dur physique en **plusieurs partitions logiques**. Chaque partition peut contenir un **système de fichiers (FS) distinct** et être utilisée pour un rôle différent.',
        },
        {
          kind: 'table',
          headers: ['Type', 'Description', 'Exemple'],
          rows: [
            ['Primaire', 'Partition principale du disque (**max 4** sur un disque MBR)', '/dev/sda1'],
            ['Étendue', 'Conteneur permettant de créer des partitions supplémentaires', '/dev/sda2'],
            ['Logique', 'Située à l’intérieur d’une partition étendue', '/dev/sda5, /dev/sda6…'],
          ],
        },
        {
          kind: 'note',
          variant: 'info',
          text: 'ℹ️ **MBR (Master Boot Record)** et **GPT (GUID Partition Table)** sont les deux méthodes de partitionnement de disque.',
        },
        { kind: 'diagram', id: 'partitions', caption: 'Structure MBR (4 primaires max, ≤ 2 To) vs GPT (128 partitions, > 2 To, UEFI)' },
        { kind: 'h3', text: 'Outils de partitionnement' },
        {
          kind: 'table',
          headers: ['Commande', 'Description', 'Exemple'],
          rows: [
            ['fdisk', 'Outil classique pour les partitions **MBR** (ligne de commande)', 'sudo fdisk /dev/sdb'],
            ['parted', 'Plus moderne, compatible **GPT et MBR**', 'sudo parted /dev/sdb'],
            ['GParted', 'Interface **graphique (GUI)** : créer, redimensionner, supprimer ou formater visuellement', '—'],
          ],
        },
        {
          kind: 'list',
          items: [
            '**fdisk** → simple, rapide, historique',
            '**parted** → plus puissant, gère les **grands disques (> 2 To)** et GPT',
          ],
        },
        { kind: 'h3', text: 'Touches de fdisk' },
        {
          kind: 'table',
          headers: ['Touche', 'Action', 'Description'],
          rows: [
            ['m', 'menu', 'Affiche l’aide'],
            ['n', 'new', 'Créer une nouvelle partition'],
            ['d', 'delete', 'Supprimer une partition'],
            ['p', 'print', 'Afficher la table des partitions'],
            ['w', 'write', 'Sauvegarder et quitter'],
          ],
        },
        { kind: 'h3', text: 'Tables de partition : MBR vs GPT' },
        {
          kind: 'table',
          headers: ['Critère', 'MBR', 'GPT'],
          rows: [
            ['Âge', 'Ancien', 'Moderne'],
            ['Partitions primaires', 'Max **4**', 'Jusqu’à **128**'],
            ['Taille disque', '≤ **2 To**', '> 2 To'],
            ['Recommandé', 'BIOS classique', '**Recommandé pour UEFI**'],
          ],
        },
        {
          kind: 'def',
          term: 'UEFI',
          text: "Remplaçant moderne et plus performant du **BIOS** traditionnel, qui sert d'interface entre le matériel et le système d'exploitation d'un ordinateur.",
        },
      ],
    },
    {
      id: 'm2p2-mkfs',
      title: '6. Création, montage et vérification d’un FS',
      blocks: [
        { kind: 'h3', text: 'Affecter un système de fichiers (formater)' },
        {
          kind: 'cmd',
          code: 'sudo mkfs.ext4 /dev/sdb1',
          note: 'mkfs = make filesystem · ext4 = type de FS (le plus courant sous Linux) · /dev/sdb1 = partition à formater',
        },
        {
          kind: 'code',
          title: 'Enchaînement complet',
          code: `sudo mkfs.ext4 /dev/sdb1      # Formater
sudo mkdir /mnt/data          # Créer un point de montage
sudo mount /dev/sdb1 /mnt/data # Monter la partition
df -h | grep sdb1             # Vérification`,
        },
        { kind: 'h3', text: 'Vérification et réparation' },
        {
          kind: 'cmd',
          code: 'sudo fsck /dev/sdb1',
          note: 'Vérifier (File System Check)',
        },
        {
          kind: 'cmd',
          code: 'sudo fsck -y /dev/sdb1',
          note: 'Réparer (-y = répondre oui automatiquement)',
        },
        {
          kind: 'note',
          variant: 'danger',
          text: '⚠️ **Toujours démonter avant fsck !** (sinon risque de corruption)',
        },
      ],
    },
  ],
};
