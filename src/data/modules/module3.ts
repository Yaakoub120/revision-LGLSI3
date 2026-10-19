import type { CourseModule } from '@/types/course';

export const module3: CourseModule = {
  id: 4,
  slug: 'maintenance-memoire',
  title: 'Maintenance, vérification et mémoire virtuelle',
  subtitle: 'fsck, diagnostic disque (smartctl, iostat, iotop), swap, swappiness, cron, logrotate, tmpwatch',
  icon: 'Wrench',
  accent: 'amber',
  sections: [
    {
      id: 'm3-fsck',
      title: '1. Vérification et réparation des systèmes de fichiers',
      blocks: [
        {
          kind: 'p',
          text: "**Objectif :** détecter et corriger les erreurs de **structure** des systèmes de fichiers (FS). Ces erreurs peuvent apparaître après :",
        },
        {
          kind: 'list',
          items: [
            '⚡ une **coupure d’électricité**',
            '🛑 un **arrêt brutal** du système',
            '💾 un **démontage non propre** du disque',
          ],
        },
        {
          kind: 'def',
          term: 'fsck (File System Check)',
          text: "L'utilitaire **standard Linux** pour vérifier et réparer l'intégrité d'un système de fichiers. fsck analyse les **inodes, blocks, liens et superblocs**. Il corrige automatiquement les incohérences si on ajoute l'option **-y**.",
        },
        {
          kind: 'cmd',
          code: 'sudo fsck /dev/sda1',
          note: 'Commande de base de vérification',
        },
        { kind: 'h3', text: 'Systèmes de fichiers compatibles avec fsck' },
        {
          kind: 'table',
          headers: ['Type de FS', 'Outil / support'],
          rows: [
            ['ext2, ext3, ext4', 'Systèmes Linux les plus courants — fsck natif'],
            ['xfs', 'Utilise **xfs_repair** à la place de fsck'],
            ['btrfs', 'Outil spécifique : **btrfs check**'],
            ['vfat, ntfs', 'Support **partiel** (autres outils possibles)'],
          ],
        },
        { kind: 'h3', text: 'Commandes complémentaires' },
        {
          kind: 'cmd',
          code: 'sudo umount /dev/sda1',
          note: 'Toujours démonter une partition AVANT vérification',
        },
        {
          kind: 'cmd',
          code: 'sudo tune2fs -c 1 /dev/sda1',
          note: 'Forcer une vérification au prochain démarrage',
        },
        {
          kind: 'cmd',
          code: 'sudo fsck -n /dev/sda1',
          note: 'Vérifier SANS corriger',
        },
      ],
    },
    {
      id: 'm3-diagnostic',
      title: '2. Diagnostic et monitoring du disque',
      blocks: [
        {
          kind: 'p',
          text: '**Objectif :** surveiller l\'état, l\'espace et les performances des disques afin de : repérer des **erreurs matérielles** (secteurs défectueux), détecter une **saturation** (espace presque plein), identifier des **lenteurs anormales** d\'accès disque. **But final : anticiper les pannes** et maintenir la performance du système.',
        },
        { kind: 'h3', text: 'Outils essentiels du diagnostic' },
        {
          kind: 'table',
          headers: ['Commande', 'Fonction principale', 'Exemple'],
          rows: [
            ['df -h', "Affiche l'espace disque utilisé / libre (par partition)", 'df -h /home'],
            ['du -sh', 'Taille d’un dossier ou fichier spécifique', 'du -sh /var/log'],
            ['lsblk', 'Liste les périphériques de stockage et points de montage', 'lsblk -f'],
            ['smartctl', 'Analyse l’état matériel **SMART** du disque (santé, erreurs)', 'sudo smartctl -a /dev/sda'],
            ['iostat', 'Mesure les entrées/sorties (I/O) et temps d’attente disque', 'iostat -x 5'],
            ['iotop', 'Affiche en temps réel les processus utilisant le plus le disque', 'sudo iotop'],
          ],
        },
        { kind: 'h3', text: 'Détails par outil' },
        {
          kind: 'list',
          items: [
            '**df -h (Disk Free)** : vue globale de l’utilisation des partitions en % — détecte les volumes presque pleins (risque de blocage).',
            '**du -sh (Disk Usage)** : analyse la taille de répertoires précis — utile pour savoir quels dossiers consomment le plus.',
            '**lsblk (List Block Devices)** : hiérarchie des disques et partitions — montre type, point de montage, FS.',
            '**smartctl (SMART Monitoring)** : santé **physique** du disque dur ou SSD — affiche le nombre d’heures de fonctionnement, les secteurs réalloués (signe d’usure), la température.',
          ],
        },
        { kind: 'h3', text: 'Surveillance matérielle et erreurs disque' },
        {
          kind: 'table',
          headers: ['Commande', 'Fonction', 'Utilité'],
          rows: [
            ['dmesg | grep sda', 'Analyse les messages du **noyau** relatifs au disque /dev/sda', 'Détecter les erreurs I/O remontées par le kernel'],
            ['smartctl -a /dev/sda', 'Santé physique via le système **SMART**', '✅ Température, heures d’utilisation, erreurs, secteurs réalloués'],
            ['iostat -x 2', 'Statistiques d’E/S disque **toutes les 2 secondes**', '% utilisation, temps moyen lecture/écriture, latence'],
            ['iotop', 'Surveille en **temps réel** les processus les plus gourmands en I/O', 'Repérer un processus qui monopolise le disque (ex : apt, rsync, mysqld)'],
          ],
        },
        { kind: 'h3', text: 'Interprétation et actions recommandées' },
        {
          kind: 'table',
          headers: ['Problème détecté', 'Commande utile', 'Action recommandée'],
          rows: [
            ['Erreurs d’E/S ou secteurs défectueux', 'dmesg, smartctl', '**Sauvegarder** les données, prévoir **remplacement disque**'],
            ['Activité disque anormale', 'iostat, iotop', 'Identifier le processus, limiter les accès ou planifier les tâches'],
            ['Ralentissements soudains', 'iostat -x, iotop', 'Vérifier l’utilisation du disque et la file d’attente d’E/S'],
          ],
        },
        { kind: 'h3', text: 'Interprétation des performances' },
        {
          kind: 'list',
          items: [
            'Taux d’I/O **élevés** → possible **goulot d’étranglement**',
            'Disque **saturé** → ralentissement général',
            '**Températures ou erreurs SMART** → disque à remplacer',
            'Importance de la **surveillance proactive**',
          ],
        },
      ],
    },
    {
      id: 'm3-script',
      title: '3. Script Bash : disk_diagnostic.sh',
      blocks: [
        {
          kind: 'p',
          text: "Le cours présente un script Bash complet qui automatise le diagnostic disque. Voici le script avec l'explication ligne par ligne :",
        },
        {
          kind: 'code',
          title: 'disk_diagnostic.sh',
          lang: 'bash',
          code: `#!/bin/bash
DISK="sda"

echo "=== Rapport de diagnostic : $DISK ===" > /var/log/disk_diagnostic.log

# Affiche les 10 dernières lignes des messages du kernel
# $ pour utiliser la valeur de la variable DISK, grep -E = filtre étendu
dmesg | grep -iE "$DISK" | tail -n 10 >> /var/log/disk_diagnostic.log

# Affiche les statistiques détaillées d'E/S du disque
# exécute 3 cycles avec un intervalle de 1 seconde
iostat -x 1 3 >> /var/log/disk_diagnostic.log

# Surveille les processus les plus gourmands en I/O
# -b → mode batch (pour script ou log), -n 3 → 3 itérations
# head -n 15 → affiche uniquement les 15 premières lignes pour lisibilité
iotop -b -n 3 | head -n 15 >> /var/log/disk_diagnostic.log

echo "=== Fin du rapport ===" >> /var/log/disk_diagnostic.log`,
        },
        {
          kind: 'table',
          headers: ['Élément', 'Explication'],
          rows: [
            ['dmesg | grep -iE "$DISK" | tail -n 10', '10 dernières lignes des messages kernel, filtre étendu insensible à la casse (-i), sur la variable DISK ($ pour utiliser sa valeur)'],
            ['iostat -x 1 3', 'Statistiques détaillées d’E/S — 3 cycles avec intervalle de 1 seconde'],
            ['iotop -b -n 3 | head -n 15', 'Mode batch (-b) pour script/log, 3 itérations (-n 3), 15 premières lignes seulement (head)'],
          ],
        },
        { kind: 'h3', text: 'Utilisation du script' },
        {
          kind: 'cmd',
          code: 'sudo chmod +x disk_diagnostic.sh',
          note: 'Donner les droits d’exécution',
        },
        {
          kind: 'cmd',
          code: 'sudo ./disk_diagnostic.sh',
          note: 'Lancer le script',
        },
        {
          kind: 'cmd',
          code: 'cat /var/log/disk_diagnostic.log',
          note: 'Consulter le rapport (-q = pas de sortie à l’écran, -i = ignore la casse)',
        },
      ],
    },
    {
      id: 'm3-swap',
      title: '4. Mémoire virtuelle et swap',
      blocks: [
        {
          kind: 'p',
          text: '**Objectif :** comprendre comment Linux utilise la **mémoire virtuelle** pour compléter la RAM physique et gérer les pages mémoire inactives.',
        },
        { kind: 'h3', text: 'Pourquoi utiliser la mémoire virtuelle ?' },
        {
          kind: 'list',
          items: [
            'Permet au système de **continuer à fonctionner** lorsque la RAM est saturée.',
            'Permet la **mise en veille ou hibernation** sur certains systèmes.',
            'Facilite la **gestion multitâche** et l’allocation dynamique de mémoire.',
          ],
        },
        { kind: 'h3', text: 'Concepts clés' },
        {
          kind: 'table',
          headers: ['Élément', 'Description'],
          rows: [
            ['Mémoire virtuelle', 'Extension de la RAM sur le disque. Permet à Linux de gérer plus de mémoire que la RAM physique disponible.'],
            ['Swap', 'Zone spécifique (partition ou fichier) utilisée pour stocker les **pages mémoire inactives** afin de libérer de la RAM pour les processus actifs.'],
            ['Partition swap', 'Ex. /dev/sda5 : espace disque réservé exclusivement pour le swap.'],
            ['Fichier swap', 'Ex. /swapfile : fichier standard créé sur une partition existante pour le swap.'],
          ],
        },
        { kind: 'diagram', id: 'swap-memory', caption: 'Mémoire virtuelle : la RAM active + le swap sur disque pour les pages inactives' },
        { kind: 'h3', text: 'Commandes de gestion du swap' },
        {
          kind: 'cmd',
          code: 'swapon --show',
          note: 'Liste toutes les partitions/fichiers swap actifs',
        },
        {
          kind: 'cmd',
          code: 'free -h',
          note: 'Montre la RAM et le swap en utilisation et libre',
        },
        { kind: 'h3', text: 'Créer un fichier swap (4 étapes)' },
        {
          kind: 'code',
          title: 'Création d’un swap de 2 Go',
          code: `sudo fallocate -l 2G /swapfile   # crée un fichier swap de 2 Go
sudo chmod 600 /swapfile         # permissions strictes
sudo mkswap /swapfile            # formate le fichier en swap
sudo swapon /swapfile            # active le swap`,
        },
        {
          kind: 'p',
          text: '**Rendre le swap permanent** (ajouter à /etc/fstab) :',
        },
        {
          kind: 'code',
          code: `/swapfile none swap sw 0 0`,
        },
      ],
    },
    {
      id: 'm3-swappiness',
      title: '5. Paramétrage du swappiness',
      blocks: [
        {
          kind: 'p',
          text: '**Objectif :** contrôler la **fréquence d’utilisation du swap** par le noyau Linux afin d’optimiser les performances de la mémoire. Concept clé : **vm.swappiness**.',
        },
        { kind: 'diagram', id: 'swappiness', caption: 'vm.swappiness : 0 = privilégie la RAM · 60 = défaut · 100 = swap agressif' },
        {
          kind: 'table',
          headers: ['Valeur', 'Comportement'],
          rows: [
            ['0', 'Évite au maximum l’utilisation du swap → privilégie la RAM'],
            ['60', '**Valeur par défaut** sur la plupart des distributions Linux → équilibre RAM / swap'],
            ['100', 'Utilisation **agressive** du swap → le noyau déplace plus tôt les pages inactives sur disque'],
          ],
        },
        { kind: 'h3', text: 'Vérifier et modifier le swappiness' },
        {
          kind: 'cmd',
          code: 'cat /proc/sys/vm/swappiness',
          note: 'Vérifier le swappiness actuel (souvent 60 par défaut)',
        },
        {
          kind: 'cmd',
          code: 'sudo sysctl vm.swappiness=20',
          note: 'Modification temporaire — immédiate jusqu’au prochain redémarrage. Ex : 20 → préfère fortement la RAM',
        },
        {
          kind: 'code',
          title: 'Modification définitive',
          code: `sudo nano /etc/sysctl.conf
# Ajouter la ligne :
vm.swappiness=20
# Appliquer sans redémarrer :
sudo sysctl -p`,
        },
        {
          kind: 'note',
          variant: 'tip',
          text: '💡 **sysctl -p** applique les changements sans redémarrer (lecture du kernel en temps réel + sauvegarde pour les démarrages futurs via /etc/sysctl.conf).',
        },
      ],
    },
    {
      id: 'm3-automaintenance',
      title: '6. Gestion proactive et maintenance automatique',
      blocks: [
        {
          kind: 'p',
          text: '**Objectif :** mettre en place des mécanismes **automatiques** de surveillance et de nettoyage pour maintenir un système Linux performant et stable.',
        },
        {
          kind: 'table',
          headers: ['Outil', 'Rôle / Fonction', 'Exemple'],
          rows: [
            ['cron', 'Planifier des tâches répétitives automatiquement', 'sudo crontab -e → planifier un fsck ou un script de nettoyage chaque semaine'],
            ['logrotate', 'Rotation et archivage automatique des logs', '/etc/logrotate.conf → limite la taille des logs, compresse ou supprime les anciens'],
            ['tmpwatch / systemd-tmpfiles', 'Nettoyage automatique des fichiers temporaires', 'tmpwatch 24 /tmp → supprime les fichiers non utilisés depuis 24h'],
          ],
        },
        { kind: 'h3', text: '6.1 Commande crontab' },
        {
          kind: 'code',
          title: 'sudo crontab -e — planifier un fsck hebdomadaire',
          code: `0 2 * * 0 /sbin/fsck -AR -y`,
        },
        {
          kind: 'table',
          headers: ['Élément', 'Signification'],
          rows: [
            ['0 2 * * 0', 'Exécuter à **2h du matin chaque dimanche** — format : minute heure jour_du_mois mois jour_de_la_semaine'],
            ['/sbin/', 'Dossier où se trouvent les commandes systèmes essentielles'],
            ['fsck', 'File System Check — outil de vérification des FS Linux'],
            ['-A', 'Vérifie **tous** les systèmes de fichiers listés dans /etc/fstab'],
            ['-R', 'Ignore la **racine /** pour éviter de bloquer le système'],
            ['-y', 'Répond automatiquement **oui** à toutes les corrections'],
          ],
        },
        { kind: 'h3', text: '6.2 Commande logrotate' },
        {
          kind: 'list',
          items: [
            '**Fichier global :** /etc/logrotate.conf — configuration principale pour tous les logs du système.',
            '**Fichiers spécifiques :** /etc/logrotate.d/ — chaque service (apache, syslog…) peut avoir son propre fichier.',
            '**Édition :** sudo nano /etc/logrotate.d/syslog — dans nano : Ctrl+O puis Ctrl+X ; dans vim : :wq',
          ],
        },
        {
          kind: 'cmd',
          code: 'sudo logrotate -d /etc/logrotate.conf',
          note: 'Mode Test (dry run)',
        },
        {
          kind: 'cmd',
          code: 'sudo logrotate -f /etc/logrotate.conf',
          note: 'Forcer la rotation maintenant',
        },
        { kind: 'h3', text: '6.3 Commande tmpwatch' },
        {
          kind: 'p',
          text: 'Supprime automatiquement les fichiers temporaires anciens. Les fichiers temporaires sont souvent stockés dans **/tmp, /var/tmp**… Sans nettoyage, ils peuvent s’accumuler et **saturer le disque**.',
        },
        {
          kind: 'cmd',
          code: 'sudo tmpwatch 24 /tmp',
          note: 'Syntaxe : tmpwatch [options] <durée_en_heures> <répertoire> — supprime les fichiers non modifiés depuis 24h',
        },
        {
          kind: 'code',
          title: 'Programmer avec cron : nettoyer /tmp tous les jours à 3h',
          code: `0 3 * * * /usr/sbin/tmpwatch 24 /tmp`,
        },
        { kind: 'h3', text: '6.4 Commande systemd-tmpfiles' },
        {
          kind: 'p',
          text: "Gère automatiquement les fichiers temporaires et autres fichiers systèmes qui doivent être **créés, nettoyés ou supprimés**. Remplace et **complète tmpwatch** sur les systèmes modernes utilisant systemd.",
        },
        {
          kind: 'cmd',
          code: 'sudo systemd-tmpfiles --clean',
          note: 'Supprime les fichiers temporaires selon les règles définies dans /etc/tmpfiles.d et /usr/lib/tmpfiles.d/',
        },
      ],
    },
    {
      id: 'm3-cas-pratique',
      title: '7. Cas pratique : analyse d’un FS défectueux',
      blocks: [
        {
          kind: 'table',
          headers: ['Étape', 'Commande / Action', 'Explication'],
          rows: [
            ['1. Identifier le disque', 'sudo dmesg | grep -i sdb ou journalctl -k', 'Trouver le disque fautif dans les messages kernel'],
            ['2. Démonter la partition', 'sudo umount /dev/sdb1', 'La partition doit être **non montée** pour que fsck puisse corriger'],
            ['3. Vérifier et réparer', 'sudo fsck -y /dev/sdb1', 'Vérifie le FS et corrige automatiquement (-y)'],
            ['4. Vérifier les logs et remonter', 'dmesg ou journalctl, puis sudo mount /dev/sdb1 /mnt/data', 'S’assurer que le disque est sain avant remise en service'],
            ['5. Restaurer si nécessaire', 'Copier depuis une sauvegarde', 'Si des fichiers étaient corrompus ou supprimés'],
          ],
        },
      ],
    },
  ],
};
