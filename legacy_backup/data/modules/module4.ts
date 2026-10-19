import type { CourseModule } from '@/types/course';

export const module4: CourseModule = {
  id: 5,
  slug: 'fs-modernes-sauvegarde',
  title: 'Nouvelle génération de FS & sauvegarde',
  subtitle: 'XFS, Btrfs, ZFS, LVM, snapshots, types de sauvegarde, outils (tar, rsync, dd), récupération de données',
  icon: 'DatabaseBackup',
  accent: 'violet',
  sections: [
    {
      id: 'm4-limites',
      title: '1. Limites des anciens systèmes de fichiers',
      blocks: [
        {
          kind: 'table',
          headers: ['FS', 'Avantages', 'Limites'],
          rows: [
            ['**Ext2**', 'Simple, rapide, peu de surcharge', '**Pas de journalisation** → après un crash, vérification longue et risque de perte de données'],
            ['**Ext3**', 'Amélioration clé : ajout du **journal (journaling)**', 'Performance moyenne sur les gros volumes ; pas de vérification automatique d’intégrité ni compression intégrée'],
            ['**Ext4**', 'Supporte les très grands disques, meilleure gestion du journal et des temps d’accès', 'Pas de vérification automatique d’intégrité (contrairement à Btrfs/ZFS) ; **pas de snapshot** ni compression/déduplication natives'],
          ],
        },
        { kind: 'diagram', id: 'ext-evolution', caption: 'Évolution ext2 → ext3 → ext4 et les apports de chaque génération' },
      ],
    },
    {
      id: 'm4-modernes',
      title: '2. Présentation des systèmes modernes',
      blocks: [
        {
          kind: 'p',
          text: 'Les besoins modernes (**cloud, conteneurs, disques SSD, serveurs à forte charge**) exigent des systèmes plus **robustes, flexibles et autonomes**.',
        },
        {
          kind: 'list',
          items: [
            '**XFS** : haute performance, idéal pour grands fichiers',
            '**Btrfs** : snapshots, compression, auto-réparation',
            '**ZFS** : intégrité avancée, gestion de volume intégrée, réplication',
          ],
        },
        { kind: 'h3', text: 'Comparatif rapide' },
        {
          kind: 'table',
          headers: ['FS', 'Surnom', 'Points forts', 'Limites', 'Utilisation typique'],
          rows: [
            ['EXT4', 'Standard stable et universel', 'Stabilité, universalité', 'Pas de snapshots, compression ni vérification d’intégrité automatique', 'Poste de travail, serveurs standards, VM classiques'],
            ['XFS', 'Champion des performances', 'Très efficace multi-utilisateurs et serveurs à haut débit', '—', 'Serveurs de bases de données, environnements à haut volume'],
            ['BTRFS', 'Gestion avancée et sécurité intégrée', 'Support **RAID, compression, clonage, subvolumes** intégrés', '—', 'Serveurs avec sauvegardes fréquentes, tests, développement, NAS personnels'],
            ['ZFS', 'Solution tout-en-un haut de gamme', 'RAID, snapshots, vérification d’intégrité et compression', '**Consomme beaucoup de RAM**', 'Serveurs critiques, datacenters, stockage professionnel, sauvegardes complexes'],
          ],
        },
      ],
    },
    {
      id: 'm4-fonctionnalites',
      title: '3. Fonctionnalités avancées',
      blocks: [
        {
          kind: 'def',
          term: 'Snapshot',
          text: 'Image **figée** d’un système de fichiers à un instant donné. → Sauvegardes rapides et **rollback** faciles. → Présent dans **Btrfs, ZFS** (nativement) ; possible avec **LVM** sur ext4/XFS.',
        },
        { kind: 'h3', text: 'Compression et déduplication' },
        {
          kind: 'list',
          items: [
            '**Compression :** les fichiers sont stockés en prenant moins d’espace sur le disque.',
            '**Déduplication :** le système détecte les données identiques et ne les enregistre qu’**une seule fois**.',
            '→ Présent dans **Btrfs, ZFS** (intégré) — **absent** sur EXT4 et XFS.',
            '→ Gain d’espace important et réduction du trafic disque.',
          ],
        },
        { kind: 'h3', text: 'Vérification automatique de l’intégrité' },
        {
          kind: 'p',
          text: 'Le système de fichiers vérifie que chaque bloc de données est intact grâce à une **somme de contrôle (checksum)**. Si un bloc est corrompu, il peut être **corrigé automatiquement (autoréparation)**. → Présent dans **Btrfs, ZFS** — absent sur EXT4, XFS.',
        },
        { kind: 'h3', text: 'Gestion de très grands volumes (> 16 To)' },
        {
          kind: 'p',
          text: 'Les systèmes modernes gèrent des disques de plusieurs dizaines ou centaines de téraoctets, voire des **exaoctets**. → Adapté aux serveurs, clouds et virtualisation. → **XFS** très efficace sur les grands volumes ; **BTRFS/ZFS** conçus pour les infrastructures de stockage massives.',
        },
      ],
    },
    {
      id: 'm4-lvm',
      title: '4. Introduction à LVM (Logical Volume Manager)',
      blocks: [
        {
          kind: 'def',
          term: 'LVM',
          text: "Outil de gestion du stockage sous Linux qui permet de créer des **volumes logiques flexibles** au-dessus des disques physiques. Il agit comme une **couche intermédiaire** entre le système de fichiers et le matériel. → comme un « RAID logiciel simplifié et flexible ».",
        },
        { kind: 'diagram', id: 'lvm', caption: 'Architecture LVM : Physical Volumes → Volume Group → Logical Volumes' },
        { kind: 'h3', text: 'Fonctionnalité simple : 3 niveaux' },
        {
          kind: 'table',
          headers: ['Niveau', 'Définition', 'Exemple'],
          rows: [
            ['**PV** (Physical Volume)', 'Disque ou partition physique', '/dev/sdb1'],
            ['**VG** (Volume Group)', 'Regroupe plusieurs PV en un seul grand espace de stockage', 'data_vg'],
            ['**LV** (Logical Volume)', 'Volume logique utilisé comme un disque virtuel monté par le système', '/dev/data_vg/lv_data'],
          ],
        },
        { kind: 'h3', text: 'Avantages clés de LVM' },
        {
          kind: 'list',
          items: [
            '**Gestion flexible du stockage :** combiner plusieurs disques physiques en un seul espace logique.',
            '**Agrandir ou réduire dynamiquement :** un volume peut être agrandi **à chaud, sans redémarrer**.',
            '**Snapshots et sauvegardes :** snapshots instantanés d’un volume avant modification.',
            '**Migration de données simplifiée :** déplacer un volume d’un disque à un autre **sans interruption de service**.',
          ],
        },
        { kind: 'h3', text: 'Commandes LVM essentielles' },
        {
          kind: 'table',
          headers: ['Action', 'Commande', 'Exemple'],
          rows: [
            ['Créer un volume physique', 'pvcreate', 'sudo pvcreate /dev/sdb1'],
            ['Créer un groupe de volumes', 'vgcreate', 'sudo vgcreate data_vg /dev/sdb1 /dev/sdc1'],
            ['Créer un volume logique', 'lvcreate', 'sudo lvcreate -L 50G -n lv_data data_vg'],
            ['Afficher les infos', 'lvs, vgs, pvs', 'sudo lvs'],
          ],
        },
      ],
    },
    {
      id: 'm4-sauvegarde',
      title: '5. La sauvegarde (Backup)',
      blocks: [
        {
          kind: 'p',
          text: '**Objectif :** assurer la continuité et la sécurité du système et des données face aux incidents. Quatre raisons essentielles :',
        },
        {
          kind: 'list',
          items: [
            '**Protection contre les pannes matérielles** → une sauvegarde permet de restaurer rapidement les données sur un autre support.',
            '**Contre les erreurs humaines et attaques** → une sauvegarde régulière évite la perte définitive des fichiers.',
            '**Conformité légale** → certaines entreprises doivent conserver leurs données pour des raisons juridiques ou réglementaires (données comptables, factures, logs).',
            '**Restauration rapide du système** → en cas de panne, réinstaller le système complet en quelques minutes plutôt que tout reconfigurer manuellement.',
          ],
        },
        { kind: 'h3', text: 'Les 3 types de sauvegarde' },
        { kind: 'diagram', id: 'backup-types', caption: 'Comparaison visuelle : complète, différentielle, incrémentale' },
        {
          kind: 'table',
          headers: ['Type', 'Description', 'Avantage', 'Inconvénient', 'Exemple rsync'],
          rows: [
            ['**Complète (Full)**', 'Sauvegarde **tous** les fichiers à chaque fois', 'Restauration simple et rapide (toutes les données dans une seule sauvegarde)', 'Longue à faire, consomme beaucoup d’espace', 'rsync -a /home/ /backup/full/'],
            ['**Différentielle**', 'Sauvegarde tous les fichiers modifiés depuis la **dernière complète**', 'Plus rapide qu’une complète, restauration plus simple qu’une incrémentale', 'La taille **augmente chaque jour** jusqu’à la prochaine complète', 'rsync -a --compare-dest=/backup/full/ /home/ /backup/diff/'],
            ['**Incrémentale**', 'Sauvegarde uniquement les fichiers modifiés depuis la **dernière sauvegarde** (complète ou incrémentale)', 'Très rapide et économe en espace', 'Restauration plus longue (complète + **toutes** les incrémentales)', 'rsync -a --link-dest=/backup/prev/ /home/ /backup/inc/'],
          ],
        },
        {
          kind: 'note',
          variant: 'tip',
          text: '💡 **Conseil du cours — combiner les trois :** 1 complète par **semaine** · 6 incrémentales par **jour** · 1 différentielle **mensuelle** pour archivage.',
        },
      ],
    },
    {
      id: 'm4-outils',
      title: '6. Outils de sauvegarde',
      blocks: [
        { kind: 'h3', text: 'Outils classiques' },
        {
          kind: 'table',
          headers: ['Outil', 'Rôle', 'Exemple', 'Avantage', 'Limite'],
          rows: [
            ['**tar**', 'Crée des archives compressées (.tar, .gz, .bz2) — archivage standard', 'tar -czvf backup_home.tar.gz /home', 'Simple, compatible partout', 'Pas de synchronisation ni d’incrémental automatique'],
            ['**rsync**', 'Copie **uniquement les fichiers modifiés** entre deux répertoires ou machines', 'rsync -avz /home/ /media/backup/', 'Très rapide et intelligent (copie différentielle)', 'Pas de compression automatique sans option'],
            ['**dd**', 'Copie **bit à bit** un disque ou une partition entière (clonage bas-niveau)', 'sudo dd if=/dev/sda of=/dev/sdb bs=64K status=progress', 'Parfait pour les copies complètes, images disque', '**Lent et risqué** (aucune vérification avant écrasement)'],
            ['**cron**', 'Planifie des tâches automatiques (sauvegardes régulières)', '0 2 * * 0 rsync -av /home /backup/', 'Fiable et programmable', 'Nécessite un bon suivi (logs, alertes)'],
            ['**cp**', 'Copie directe de fichiers', 'cp -r /home /media/usb_backup', 'Facile, présent partout', 'Aucune vérification, pas de sync ni d’incrémental'],
          ],
        },
        {
          kind: 'cmd',
          code: 'rsync -avz /home/ user@serveur:/sauvegarde/',
          note: 'Mode distant de rsync',
        },
        {
          kind: 'cmd',
          code: 'tar -xzvf backup_home.tar.gz -C /restore',
          note: 'Restauration d’une archive tar',
        },
        { kind: 'h3', text: 'Outils avancés' },
        {
          kind: 'table',
          headers: ['Outil', 'Caractéristiques'],
          rows: [
            ['**Timeshift**', 'Snapshots système complets (similaire au **Windows Restore Point**) — idéal postes Linux (Mint, Ubuntu) — restauration rapide sans affecter les fichiers personnels'],
            ['**Bacula**', 'Solution **professionnelle et centralisée** de sauvegarde en réseau — serveurs, BDD, disques, bandes magnétiques — gestion automatisée et planifiée'],
            ['**DejaDup**', 'Interface simple intégrée à **GNOME** — chiffrement, stockage distant (Google Drive, FTP) — pour utilisateurs non techniques'],
          ],
        },
      ],
    },
    {
      id: 'm4-script-restauration',
      title: '7. Script de sauvegarde automatique & restauration',
      blocks: [
        {
          kind: 'code',
          title: 'Script de sauvegarde quotidienne',
          lang: 'bash',
          code: `#!/bin/bash
# Indique que le script doit être exécuté avec l'interpréteur Bash

DATE=$(date +%Y-%m-%d)
# Stocke la date du jour (ex. 2025-10-20) dans la variable DATE

DEST=/backup/$DATE
# Dossier de destination : /backup/2025-10-20 — chaque jour un dossier différent

rsync -av --delete /home/ $DEST
# -a : archive (préserve permissions, liens…)
# -v : mode verbeux (affiche les fichiers copiés)
# --delete : supprime les fichiers effacés dans la source

logger "Sauvegarde terminée à $(date)"
# Envoie un message dans le journal système (/var/log/syslog)`,
        },
        { kind: 'h3', text: 'Restaurations' },
        {
          kind: 'cmd',
          code: 'tar -xvf sauvegarde.tar -C /repertoire_cible',
          note: 'x = extraction · v = verbose (affiche les fichiers) · f = spécifie le fichier source',
        },
        {
          kind: 'cmd',
          code: 'rsync -av /backup/2025-09-01/ /home/',
          note: 'a = mode archive (permissions, timestamps, liens) · v = affiche les fichiers transférés',
        },
      ],
    },
    {
      id: 'm4-recuperation',
      title: '8. Récupération de fichiers supprimés',
      blocks: [
        {
          kind: 'table',
          headers: ['Outil', 'Rôle', 'Détails'],
          rows: [
            ['**testdisk**', 'Restauration de **partitions** perdues ou corrompues', 'Utile si un disque ou une partition a été supprimé ou devient inaccessible'],
            ['**photorec**', 'Récupération de **fichiers** (photos, documents, vidéos…)', 'Fonctionne **même si le FS est endommagé**'],
            ['**extundelete**', 'Récupération de fichiers supprimés sur **ext3/ext4**', 'Nécessite que la partition **ne soit pas montée en écriture** pour maximiser la récupération'],
          ],
        },
      ],
    },
    {
      id: 'm4-snapshots',
      title: '9. Création et restauration de snapshots',
      blocks: [
        {
          kind: 'p',
          text: '**Objectif :** capturer l’état d’un volume **avant modification ou sauvegarde**.',
        },
        {
          kind: 'cmd',
          code: 'btrfs subvolume snapshot /chemin/source /chemin/snapshot',
          note: 'Snapshot avec Btrfs',
        },
        {
          kind: 'cmd',
          code: 'lvcreate --size 1G --snapshot --name snapshot_lv /dev/vg/volume',
          note: 'Snapshot avec LVM',
        },
        { kind: 'h3', text: 'Restauration via snapshots' },
        {
          kind: 'table',
          headers: ['Système', 'Commande', 'Effet'],
          rows: [
            ['Btrfs', 'btrfs subvolume snapshot restore', 'Restaure un snapshot d’un sous-volume Btrfs'],
            ['LVM', 'lvconvert --merge /dev/vg/snapshot', 'Fusionne un snapshot LVM avec le volume original'],
          ],
        },
        {
          kind: 'note',
          variant: 'info',
          text: '➡️ Retour **immédiat** à un état antérieur, sans besoin de restaurer depuis une sauvegarde classique.',
        },
      ],
    },
    {
      id: 'm4-synthese',
      title: '10. Synthèse du module',
      blocks: [
        {
          kind: 'table',
          headers: ['Besoin', 'Outil recommandé'],
          rows: [
            ['Sauvegarde **quotidienne**', '**rsync** (le plus pratique)'],
            ['Archivage **historique**', '**tar** ou tar.gz'],
            ['Disques **systèmes** (clonage)', '**dd**'],
            ['Copies simples ponctuelles', '**cp**'],
          ],
        },
      ],
    },
  ],
};
