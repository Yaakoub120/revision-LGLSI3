import type { Subject } from "@/lib/learn-types";

// ═══════════════════════════════════════════════════════════════════════════
// SUJET 1 — ADMINISTRATION DES SYSTÈMES LINUX (Modules 1–8, Hédi NSIBI, FSM)
// ═══════════════════════════════════════════════════════════════════════════

export const adminSystemes: Subject = {
  id: "admin",
  name: "Administration des Systèmes Linux",
  shortName: "Admin Systèmes",
  teacher: "Hédi NSIBI — FSM",
  icon: "Terminal",
  gradient: "from-emerald-500 via-teal-500 to-cyan-600",
  accent: "#10b981",
  description:
    "Métier d'administrateur, systèmes de fichiers, maintenance et mémoire virtuelle, FS nouvelle génération et sauvegarde, utilisateurs, paquets, systemd et configuration réseau.",
  chapters: [
    // ─────────────────────────── MODULE 1 ───────────────────────────
    {
      id: "m1",
      title: "Module 1 — Introduction au métier d'administrateur",
      summary:
        "Domaines d'intervention, activités, compétences, droits et devoirs, certifications et normes (ISO 27001, ISO 20000, RGPD, loi 2004-63).",
      sections: [
        {
          heading: "Domaines d'intervention d'un administrateur",
          blocks: [
            {
              type: "p",
              text: "L'administrateur système intervient sur l'ensemble du parc informatique de l'entreprise. Ses domaines couvrent l'installation, la configuration et la maintenance des systèmes d'exploitation (Linux, Windows Server, Unix), les réseaux, la sécurité, les bases de données, la virtualisation et le support technique. Chacun de ces domaines exige des compétences précises et des outils dédiés.",
            },
            {
              type: "list",
              items: [
                "Systèmes : installation, configuration, maintenance de Linux, Windows Server et Unix.",
                "Réseaux : supervision, sécurité, gestion des VLAN, VPN et pare-feu.",
                "Sécurité : sauvegarde, restauration, gestion des accès, conformité RGPD.",
                "Bases de données : administration (SQL, Oracle).",
                "Virtualisation & Cloud : VMware, Docker, AWS, Azure.",
                "Support technique et maintenance : gestion des incidents, helpdesk.",
              ],
            },
          ],
        },
        {
          heading: "Cas pratique : surveillance et anticipation des pannes d'un serveur web",
          blocks: [
            {
              type: "p",
              text: "Une entreprise héberge son site vitrine et son application interne sur un serveur web Apache (Linux). Les utilisateurs se plaignent de lenteurs aux heures de pointe. L'administrateur doit mettre en place une stratégie de surveillance proactive pour anticiper les problèmes et éviter une panne complète. Objectifs : mettre en place un outil de supervision, collecter et analyser les métriques critiques (CPU, RAM, stockage, temps de réponse du serveur en ms), définir des seuils d'alerte et proposer un plan d'action préventif.",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "Installer et configurer un outil de monitoring (Nagios, Zabbix ou Grafana).",
                "Surveiller les métriques : CPU, RAM, stockage, temps de réponse du serveur en ms.",
                "Définir des seuils d'alerte.",
                "Mettre en place des notifications (email/SMS).",
                "Proposer un plan d'action préventif : optimisation des logs et nettoyage disque, augmentation des ressources serveur (RAM/CPU), mise en place d'un load balancer si nécessaire.",
              ],
            },
          ],
        },
        {
          heading: "Activités liées à l'administration",
          blocks: [
            {
              type: "table",
              headers: ["Jour", "Activités principales", "Outils utilisés", "Objectif"],
              rows: [
                ["Lundi", "Supervision des serveurs et réseaux, vérification des sauvegardes", "Nagios, Zabbix, Veeam", "Assurer la continuité de service"],
                ["Mardi", "Gestion des utilisateurs et droits (création, suppression, mises à jour)", "Active Directory, LDAP", "Sécurité et conformité"],
                ["Mercredi", "Mises à jour systèmes & patchs de sécurité", "WSUS, Ansible, apt/yum", "Renforcer la sécurité"],
                ["Jeudi", "Documentation, reporting mensuel, analyse logs", "Grafana, ELK, Excel", "Traçabilité et suivi"],
                ["Vendredi", "Tests PRA/PCA (plan de reprise), audit interne sécurité", "VMware, scripts PowerShell", "Préparation aux incidents"],
                ["Samedi", "Support technique avancé & résolution incidents", "Helpdesk, tickets GLPI", "Assistance utilisateurs"],
                ["Dimanche", "Astreinte ou veille technologique", "Portails RSS, veille cybersécurité", "Anticipation des évolutions"],
              ],
            },
          ],
        },
        {
          heading: "Compétences requises",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Hard skills", v: "OS & Réseaux, Sécurité (ISO 27001, RGPD), Scripting (Bash, PowerShell, Python)" },
                { k: "Soft skills", v: "Rigueur, communication, organisation, veille technologique, gestion du stress" },
              ],
            },
            {
              type: "callout",
              variant: "info",
              title: "Veille technologique",
              text: "Processus stratégique continu de collecte, d'analyse et de diffusion d'informations sur les innovations et les tendances scientifiques et techniques d'un domaine, afin d'anticiper les changements, stimuler l'innovation et maintenir la compétitivité de l'entreprise.",
            },
          ],
        },
        {
          heading: "Droits, devoirs et certifications",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Droits", v: "Accès aux systèmes, décision en matière de sécurité" },
                { k: "Devoirs", v: "Confidentialité & respect des lois, éthique professionnelle, documentation claire" },
                { k: "Intérêts de la certification", v: "Reconnaissance internationale, opportunités professionnelles, validation des compétences" },
                { k: "Linux", v: "LPIC-1, RHCSA" },
                { k: "Microsoft", v: "Azure Admin" },
                { k: "Sécurité", v: "Security+, CEH" },
              ],
            },
          ],
        },
        {
          heading: "Normes et textes de loi",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "ISO/IEC 27001", v: "Norme internationale définissant les exigences d'un Système de Management de la Sécurité de l'Information (SMSI) : protéger les données et gérer les risques liés à la sécurité de l'information." },
                { k: "ISO/IEC 20000", v: "Gestion des services IT : aligner les services IT sur les besoins métiers, améliorer qualité et continuité, réduire les coûts des incidents. Domaines : incidents/problèmes, changements/configurations, continuité/disponibilité, amélioration continue." },
                { k: "RGPD (UE 2016/679)", v: "Art. 5 : traitement licite, loyal et transparent. Art. 32 : mesures techniques et organisationnelles adaptées au risque (chiffrement, sauvegarde, tests réguliers). Art. 33 : notification des violations de données sous 72 heures." },
                { k: "Loi tunisienne 2004-63", v: "Protection des données personnelles : consentement obligatoire avant traitement, déclaration auprès de l'INPDP, interdiction de transfert vers un pays sans protection adéquate, sanctions pénales." },
              ],
            },
          ],
        },
        {
          heading: "Études de cas",
          blocks: [
            {
              type: "p",
              text: "Cas 1 — Panne serveur : vendredi matin, le serveur principal (messagerie + ERP) tombe en panne suite à une défaillance matérielle du disque dur. 80 utilisateurs bloqués. Plan d'action : identifier le problème (journaux systèmes, diagnostic hardware/software), communiquer (informer direction et utilisateurs), activer le PRA (serveur de secours, restauration des données), vérifier (intégrité des données, accès, performances), documenter (rapport d'incident, mise à jour des procédures).",
            },
            {
              type: "p",
              text: "Cas 2 — Ransomware : lundi matin, tous les documents sont chiffrés et une demande de rançon en cryptomonnaie s'affiche. Plan d'action : isolement immédiat (déconnecter les machines infectées), analyse (journaux, origine de l'attaque, vecteur : phishing, clé USB…), restauration (ne jamais payer la rançon, effacer les systèmes compromis, restaurer depuis des sauvegardes sécurisées hors réseau), communication (direction, équipe sécurité, autorités), prévention (correctifs, tests réguliers de restauration, campagnes anti-phishing).",
            },
          ],
        },
      ],
    },

    // ─────────────────────────── MODULE 2 ───────────────────────────
    {
      id: "m2",
      title: "Module 2 — Systèmes de fichiers Linux",
      summary:
        "Définitions, comparatif FS (FAT32, NTFS, exFAT, ext4, XFS, Btrfs, APFS), architecture VFS, hiérarchie FHS, navigation, montage et /etc/fstab, partitionnement MBR/GPT.",
      sections: [
        {
          heading: "Qu'est-ce qu'un système de fichiers ?",
          blocks: [
            {
              type: "p",
              text: "Un système de fichiers (File System) est une méthode d'organisation et de gestion des données sur un support de stockage (disque dur, SSD, clé USB, etc.). Il permet au système d'exploitation de stocker, lire, modifier et supprimer des fichiers. Ses fonctions principales sont : l'organisation hiérarchique des fichiers et répertoires, la gestion des métadonnées (taille, propriétaire, permissions, date…), le contrôle des accès aux ressources (droits utilisateurs), l'allocation et la libération d'espace disque, et la fiabilité/tolérance aux pannes (journalisation, vérification d'intégrité).",
            },
            {
              type: "table",
              headers: ["FS", "OS", "Caractéristiques", "Avantages", "Inconvénients"],
              rows: [
                ["FAT32", "Windows / Linux / macOS", "Ancien format, compatible avec tous les OS", "Très compatible, léger", "Taille max fichier = 4 Go, pas de gestion des droits"],
                ["NTFS", "Windows (lecture seule macOS/Linux sans outil)", "Journalisation, permissions, compression", "Sécurisé, fiable, fichiers > 4 Go", "Moins compatible avec les autres systèmes"],
                ["exFAT", "Windows / macOS / Linux", "FAT32 amélioré pour les gros fichiers", "Multi-OS, pas de limite 4 Go", "Pas de journalisation, moins sûr"],
                ["ext4", "Linux", "Journalisé, stable, gros volumes", "Performant, fiable, standard Linux", "Peu compatible Windows/macOS"],
                ["XFS", "Linux", "Journalisé, orienté gros fichiers", "Excellente performance serveurs", "Moins flexible pour les petits fichiers"],
                ["Btrfs", "Linux", "Copy-on-Write (COW), snapshots", "Moderne, compression et réplication", "Moins mature que ext4"],
                ["APFS", "macOS", "Journalisé, optimisé SSD", "Très rapide, sécurisé", "Uniquement macOS"],
              ],
            },
            {
              type: "kv",
              items: [
                { k: "NTFS", v: "Le plus sécurisé sous Windows : droits d'accès utilisateurs, compression, journalisation — parfait pour les disques internes Windows." },
                { k: "FAT32", v: "Le plus compatible mais limité à 4 Go par fichier." },
                { k: "exFAT", v: "Idéal pour clés USB et disques externes multi-OS ; transferts de gros fichiers multimédias ; moins sûr (pas de journalisation ni permissions avancées)." },
                { k: "ext4", v: "Système par défaut de la plupart des distributions Linux (Ubuntu, Debian…) ; convient aux serveurs et postes Linux." },
                { k: "XFS", v: "Serveurs Linux professionnels ; très efficace pour gros volumes/fichiers." },
                { k: "Btrfs", v: "Résilience et gestion avancée (snapshots, compression) ; à réserver aux administrateurs expérimentés." },
                { k: "APFS", v: "Exclusivement macOS et iOS ; optimisé SSD." },
              ],
            },
          ],
        },
        {
          heading: "Linux vs Windows et autres FS historiques",
          blocks: [
            {
              type: "table",
              headers: ["Aspect", "Linux", "Windows"],
              rows: [
                ["FS utilisés", "ext4, XFS, Btrfs", "NTFS, FAT32, exFAT"],
                ["Organisation", "Arborescence unique avec racine /", "Lettres de disque (C:, D:…)"],
                ["Permissions", "Utilisateurs strictes", "ACL (Access Control List)"],
                ["Journalisation", "Intégrée", "NTFS : oui"],
                ["Usage", "Très stable, serveurs", "Postes utilisateurs, logiciels grand public"],
              ],
            },
            {
              type: "kv",
              items: [
                { k: "EXT3", v: "Ancien standard Linux ; a introduit la journalisation → restauration facile après crash." },
                { k: "EXT4", v: "Par défaut sur les distributions modernes ; meilleure performance sur gros fichiers et partitions." },
                { k: "HPFS", v: "High Performance File System, développé par IBM pour OS/2 ; gestion efficace de gros fichiers, peu utilisé aujourd'hui." },
                { k: "VFAT", v: "Version améliorée de FAT16/FAT32 (Windows 95) ; idéal pour clés USB et disques externes." },
                { k: "FreeBSD UFS", v: "Stable, sécurisé, conçu pour les serveurs ; gestion fine des droits et quotas." },
              ],
            },
            {
              type: "diagram",
              id: "linux-vfs",
              caption: "Le noyau (Kernel) passe par la couche VFS pour accéder indifféremment à ext3, ext4, VFAT, HPFS ou UFS.",
            },
          ],
        },
        {
          heading: "La hiérarchie FHS et les répertoires principaux",
          blocks: [
            {
              type: "diagram",
              id: "linux-fsh",
              caption: "Arborescence Linux : une seule racine / à partir de laquelle tout est organisé.",
            },
            {
              type: "table",
              headers: ["Répertoire", "Utilisation principale", "Exemples concrets"],
              rows: [
                ["/etc/", "Fichiers de configuration système et applicatifs", "/etc/nginx/nginx.conf, /etc/ssh/sshd_config"],
                ["/usr/", "Programmes installés pour les utilisateurs (User System Resources)", "/usr/bin/python3, /usr/lib/firefox/"],
                ["/opt/", "Applications tierces « optional », hors distribution ; un dossier par logiciel", "/opt/google/chrome/, /opt/lampp/, /opt/vmware/, /opt/visual-studio-code/, /opt/docker-desktop/"],
                ["/tmp/", "Fichiers temporaires partagés, effacés à chaque redémarrage", "cache, installeurs .run/.deb, logs temporaires"],
                ["/var/", "Données variables (journaux, bases de données, sites web, e-mails)", "/var/log/, /var/www/, /var/lib/mysql/, /var/spool/mail/"],
                ["/mnt", "Point de montage temporaire géré par l'administrateur", "sudo mount /dev/sdb1 /mnt/data"],
                ["/media", "Montage automatique des périphériques amovibles (USB, CD)", "/media/hedi/USB32"],
                ["/proc et /sys", "FS virtuels : informations du noyau et des processus", "/proc/cpuinfo, /sys/…"],
                ["/root", "Répertoire personnel de l'administrateur", "/root"],
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Sauvegardes utilisateurs", v: "/home/<user>/backup ou /var/backups" },
                { k: "Docker Engine", v: "binaires dans /usr/bin/, données des conteneurs dans /var/lib/docker/" },
                { k: "VMware / VirtualBox", v: "/opt/ (application) et /var/lib/ (machines virtuelles)" },
                { k: "Utilitaires système", v: "rsync, tar… dans /bin, /usr/bin" },
              ],
            },
            { type: "list", items: ["Sous-répertoires /mnt possibles : /mnt/data (partition interne données), /mnt/backup (disque externe sauvegarde), /mnt/usbdrive (clé USB temporaire)."] },
          ],
        },
        {
          heading: "Commandes de base et recherche",
          blocks: [
            {
              type: "cmd",
              commands: [
                { cmd: "pwd", desc: "affiche le chemin du dossier courant" },
                { cmd: "ls", desc: "liste les fichiers (-l permissions, -a fichiers cachés, -lh taille lisible)" },
                { cmd: "cd", desc: "change de répertoire" },
                { cmd: "cat / less / more", desc: "affichage du contenu" },
                { cmd: "cp / mv / rm / mkdir / rmdir", desc: "copie, déplacement, suppression, création/suppression de répertoires" },
                { cmd: "find / -name fichier.txt", desc: "recherche de fichiers par nom (attention aux droits root pour /)" },
                { cmd: "locate motclé", desc: "recherche rapide via la base d'index" },
                { cmd: "which / whereis", desc: "localise les exécutables" },
                { cmd: "cd -", desc: "revient au dossier précédent" },
                { cmd: "cd ~", desc: "va au dossier personnel" },
                { cmd: "history", desc: "historique des commandes" },
                { cmd: "alias", desc: "créer des raccourcis de commande" },
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: "Chemins",
              text: "Chemin absolu : commence toujours par / (ex. /home/user/documents/file.txt). Chemin relatif : basé sur le répertoire courant (ex. ../dossier/file.txt).",
            },
          ],
        },
        {
          heading: "Montage d'un système de fichiers",
          blocks: [
            {
              type: "p",
              text: "Un système de fichiers doit être monté avant utilisation : le montage connecte une partition à un répertoire (point de montage), par exemple /dev/sdb1 → /mnt/usb. Les utilisateurs non-root doivent avoir les droits nécessaires. Pour vérifier : df -h, lsblk, mount | grep /mnt.",
            },
            {
              type: "cmd",
              commands: [
                { cmd: "mount [options] /dev/sdX /mnt/dossier", desc: "monte une partition sur un point de montage" },
                { cmd: "umount /mnt/dossier", desc: "démonte le système de fichiers" },
              ],
            },
            {
              type: "p",
              text: "Le fichier /etc/fstab configure les montages automatiques au démarrage. Format : /dev/sda1 /boot ext4 defaults 0 2 — UUID=xxxx /data ext4 defaults 0 0. Le champ dump (0 = pas de sauvegarde dump, 1 = activée) et le champ pass (ordre de vérification fsck).",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "Sauvegarder avant modification : sudo cp /etc/fstab /etc/fstab.backup (restauration : sudo cp /etc/fstab.backup /etc/fstab).",
                "Éditer : sudo nano /etc/fstab ou sudo vim /etc/fstab.",
                "Ajouter la ligne voulue, ex. /dev/sdb1 /mnt/data ext4 defaults 0 0.",
                "Tester la validité sans redémarrer : sudo mount -a (monte tout ce qui est défini dans fstab ; aucune erreur = configuration correcte).",
                "Redémarrer : sudo reboot. Astuce : sudo blkid pour obtenir l'UUID — les UUID sont plus fiables que /dev/sdX (qui peuvent changer selon l'ordre de branchement).",
              ],
            },
            {
              type: "table",
              headers: ["Point de montage", "Utilisation", "Monté par", "Exemple"],
              rows: [
                ["/mnt", "Montages manuels (administrateur)", "Commande mount", "/mnt/data"],
                ["/media", "Montages automatiques (clés USB, CD)", "Système / udisks", "/media/hedi/USB32"],
                ["/run/media", "Montages dynamiques (environnements graphiques)", "Gestionnaire de bureau", "/run/media/hedi/DISK"],
              ],
            },
            {
              type: "callout",
              variant: "info",
              title: "Utilitaire udisks",
              text: "udisks est un démon système qui gère les périphériques de stockage. Il permet aux environnements graphiques (GNOME, KDE, Fedora) de détecter automatiquement les périphériques branchés, de les monter sans commande manuelle et de les démonter proprement à la déconnexion. Vérification : systemctl status udisks2.",
            },
            {
              type: "cmd",
              commands: [
                { cmd: "df -h", desc: "espace disque par partition" },
                { cmd: "du -sh /home", desc: "taille d'un dossier" },
                { cmd: "findmnt", desc: "affiche les systèmes de fichiers montés" },
                { cmd: "mount | grep sda", desc: "vérifie les points de montage actifs" },
              ],
            },
            {
              type: "callout",
              variant: "warn",
              title: "Bonnes pratiques",
              text: "Toujours démonter avant retrait, ne pas monter deux fois la même partition, vérifier /etc/fstab avant redémarrage.",
            },
          ],
        },
        {
          heading: "Nommage des médias et partitionnement",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "HDD", v: "disque dur classique" },
                { k: "SSD", v: "disque à mémoire flash, plus rapide" },
                { k: "Clé USB", v: "périphérique amovible, souvent monté automatiquement" },
                { k: "CD/DVD", v: "support optique, souvent monté dans /media ou /mnt/cdrom" },
                { k: "Disques SATA/SCSI", v: "/dev/sda (1er disque), /dev/sdb (2e), /dev/sdb1 (1re partition du 2e disque), /dev/sdc (souvent USB)" },
                { k: "NVMe", v: "/dev/nvme0n1 (1er périphérique NVMe), /dev/nvme0n1p1 (1re partition)" },
                { k: "Carte SD", v: "/dev/mmcblk0 (1re carte SD), /dev/mmcblk0p1 (1re partition)" },
              ],
            },
            {
              type: "cmd",
              commands: [
                { cmd: "lsblk", desc: "affiche la hiérarchie des périphériques (MAJ:MIN, RM amovible, SIZE, RO read-only) ; lsblk -f ajoute UUID et types de FS" },
                { cmd: "fdisk -l", desc: "liste les disques et tables de partitions (Start, End, Sectors, Size, Type)" },
                { cmd: "blkid", desc: "affiche UUID, LABEL, types de FS et emplacements" },
              ],
            },
            {
              type: "table",
              headers: ["Type de partition", "Description", "Exemple"],
              rows: [
                ["Primaire", "Partition principale du disque (max 4 sur un disque MBR)", "/dev/sda1"],
                ["Étendue", "Conteneur permettant de créer des partitions supplémentaires", "/dev/sda2"],
                ["Logique", "Située à l'intérieur d'une partition étendue", "/dev/sda5, /dev/sda6, …"],
              ],
            },
            {
              type: "kv",
              items: [
                { k: "MBR (Master Boot Record)", v: "Ancien : max 4 partitions primaires, ≤ 2 To." },
                { k: "GPT (GUID Partition Table)", v: "Moderne : jusqu'à 128 partitions, > 2 To ; recommandé pour UEFI (remplaçant moderne du BIOS, interface entre matériel et OS)." },
              ],
            },
            {
              type: "cmd",
              commands: [
                { cmd: "sudo fdisk /dev/sdb", desc: "partitionnement MBR interactif — m aide, n nouvelle partition, d supprimer, p afficher la table, w écrire et quitter" },
                { cmd: "sudo parted /dev/sdb", desc: "outil moderne, compatible GPT et MBR, gère les disques > 2 To" },
                { cmd: "GParted", desc: "interface graphique : créer, redimensionner, supprimer, formater visuellement" },
              ],
            },
            {
              type: "p",
              text: "Affectation d'un système de fichiers : formater avec sudo mkfs.ext4 /dev/sdb1 (mkfs = make filesystem, ext4 = type de FS, /dev/sdb1 = partition), créer le point de montage sudo mkdir /mnt/data, monter sudo mount /dev/sdb1 /mnt/data, vérifier df -h | grep sdb1.",
            },
          ],
        },
      ],
    },

    // ─────────────────────────── MODULE 3 ───────────────────────────
    {
      id: "m3",
      title: "Module 3 — Maintenance, vérification et mémoire virtuelle",
      summary:
        "fsck et réparation, diagnostic et monitoring disque, mémoire virtuelle et swap, swappiness, maintenance automatique (cron, logrotate, tmpwatch, systemd-tmpfiles).",
      sections: [
        {
          heading: "Vérification et réparation des systèmes de fichiers",
          blocks: [
            {
              type: "p",
              text: "Objectif : détecter et corriger les erreurs de structure des systèmes de fichiers. Ces erreurs apparaissent après une coupure d'électricité, un arrêt brutal du système ou un démontage non propre du disque. L'outil principal est fsck (File System Check), l'utilitaire standard Linux pour vérifier et réparer l'intégrité d'un système de fichiers. fsck analyse les inodes, blocs, liens et superblocs et corrige automatiquement les incohérences avec l'option -y.",
            },
            {
              type: "cmd",
              commands: [
                { cmd: "sudo fsck /dev/sda1", desc: "vérifie l'intégrité du FS" },
                { cmd: "sudo fsck -y /dev/sdb1", desc: "vérifie et corrige automatiquement les erreurs" },
                { cmd: "sudo fsck -n /dev/sda1", desc: "vérifie sans corriger" },
                { cmd: "sudo umount /dev/sda1", desc: "TOUJOURS démonter la partition avant fsck" },
                { cmd: "sudo tune2fs -c 1 /dev/sda1", desc: "force une vérification au prochain démarrage" },
              ],
            },
            {
              type: "table",
              headers: ["Type de FS", "Outil de vérification"],
              rows: [
                ["ext2, ext3, ext4", "fsck (systèmes Linux les plus courants)"],
                ["xfs", "xfs_repair (à la place de fsck)"],
                ["btrfs", "btrfs check"],
                ["vfat, ntfs", "support partiel (autres outils possibles)"],
              ],
            },
          ],
        },
        {
          heading: "Diagnostic et monitoring du disque",
          blocks: [
            {
              type: "p",
              text: "Objectif : surveiller l'état, l'espace et les performances des disques afin de repérer des erreurs matérielles (secteurs défectueux), détecter une saturation (espace presque plein) et identifier des lenteurs anormales d'accès disque. But final : anticiper les pannes et maintenir la performance du système.",
            },
            {
              type: "table",
              headers: ["Commande", "Fonction", "Exemple"],
              rows: [
                ["df -h", "espace disque utilisé/libre par partition ; détecte les volumes presque pleins", "df -h /home"],
                ["du -sh", "taille d'un dossier ou fichier précis", "du -sh /var/log"],
                ["lsblk", "liste des périphériques de stockage et points de montage", "lsblk -f"],
                ["smartctl", "analyse l'état matériel SMART du disque (santé, erreurs, température, heures de fonctionnement, secteurs réalloués)", "sudo smartctl -a /dev/sda"],
                ["iostat", "mesure les entrées/sorties (I/O) et temps d'attente disque (%utilisation, latence)", "iostat -x 5"],
                ["iotop", "affiche en temps réel les processus les plus gourmands en disque (apt, rsync, mysqld…)", "sudo iotop"],
                ["dmesg | grep sda", "messages du noyau relatifs au disque", "sudo dmesg | grep -i sdb"],
              ],
            },
            {
              type: "table",
              headers: ["Problème détecté", "Commandes utiles", "Action recommandée"],
              rows: [
                ["Erreurs d'E/S ou secteurs défectueux", "dmesg, smartctl", "Sauvegarder les données, prévoir le remplacement du disque"],
                ["Activité disque anormale", "iostat, iotop", "Identifier le processus, limiter les accès ou planifier les tâches"],
                ["Ralentissements soudains", "iostat -x, iotop", "Vérifier l'utilisation disque et la file d'attente d'E/S"],
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: "Interprétation",
              text: "Taux d'I/O élevés → possible goulot d'étranglement. Disque saturé → ralentissement général. Températures ou erreurs SMART → disque à remplacer. La surveillance proactive est essentielle.",
            },
          ],
        },
        {
          heading: "Mémoire virtuelle et swap",
          blocks: [
            {
              type: "p",
              text: "La mémoire virtuelle permet au système de continuer à fonctionner lorsque la RAM est saturée, permet la mise en veille/hibernation, et facilite la gestion multitâche et l'allocation dynamique de mémoire. Le swap est une zone spécifique (partition ou fichier) qui stocke les pages mémoire inactives afin de libérer la RAM pour les processus actifs. Exemples : partition swap /dev/sda5, fichier swap /swapfile.",
            },
            {
              type: "cmd",
              commands: [
                { cmd: "swapon --show", desc: "liste les partitions/fichiers swap actifs" },
                { cmd: "free -h", desc: "montre RAM et swap utilisés/libres" },
                { cmd: "sudo fallocate -l 2G /swapfile", desc: "crée un fichier swap de 2 Go" },
                { cmd: "sudo chmod 600 /swapfile", desc: "permissions strictes" },
                { cmd: "sudo mkswap /swapfile", desc: "formate le fichier en swap" },
                { cmd: "sudo swapon /swapfile", desc: "active le swap" },
              ],
            },
            {
              type: "p",
              text: "Rendre le swap permanent : ajouter dans /etc/fstab la ligne « /swapfile none swap sw 0 0 ».",
            },
          ],
        },
        {
          heading: "Paramétrage du swappiness",
          blocks: [
            {
              type: "p",
              text: "vm.swappiness contrôle la fréquence d'utilisation du swap par le noyau afin d'optimiser les performances de la mémoire. Valeurs : 0 = évite au maximum le swap (privilégie la RAM) ; 60 = valeur par défaut, équilibre RAM/swap ; 100 = utilisation agressive du swap (le noyau déplace tôt les pages inactives sur disque).",
            },
            {
              type: "cmd",
              commands: [
                { cmd: "cat /proc/sys/vm/swappiness", desc: "affiche la valeur actuelle (souvent 60)" },
                { cmd: "sudo sysctl vm.swappiness=20", desc: "modification temporaire jusqu'au prochain redémarrage" },
                { cmd: "sudo nano /etc/sysctl.conf", desc: "ajouter vm.swappiness=20 pour la rendre définitive" },
                { cmd: "sudo sysctl -p", desc: "applique les changements sans redémarrer" },
              ],
            },
          ],
        },
        {
          heading: "Gestion proactive et maintenance automatique",
          blocks: [
            {
              type: "table",
              headers: ["Outil", "Rôle", "Exemple"],
              rows: [
                ["cron", "Planifier des tâches répétitives automatiquement", "sudo crontab -e → planifier un fsck ou un script de nettoyage hebdomadaire"],
                ["logrotate", "Rotation et archivage automatique des logs", "/etc/logrotate.conf limite la taille et compresse/supprime les anciens logs"],
                ["tmpwatch / systemd-tmpfiles", "Nettoyage automatique des fichiers temporaires", "tmpwatch 24 /tmp supprime les fichiers inutilisés depuis 24h"],
              ],
            },
            {
              type: "code",
              lang: "bash",
              code: "sudo crontab -e\n0 2 * * 0 /sbin/fsck -AR -y\n# minute heure jour_du_mois mois jour_semaine\n# 0 2 * * 0 → tous les dimanches à 2h du matin\n# -A : vérifie tous les FS listés dans /etc/fstab\n# -R : ignore la racine / pour ne pas bloquer le système\n# -y : répond oui automatiquement aux corrections",
            },
            {
              type: "cmd",
              commands: [
                { cmd: "/etc/logrotate.conf", desc: "configuration globale de logrotate" },
                { cmd: "/etc/logrotate.d/", desc: "fichiers spécifiques par service (apache, syslog…)" },
                { cmd: "sudo logrotate -d /etc/logrotate.conf", desc: "mode test (dry run)" },
                { cmd: "sudo logrotate -f /etc/logrotate.conf", desc: "force la rotation maintenant" },
                { cmd: "sudo tmpwatch 24 /tmp", desc: "supprime les fichiers non modifiés depuis 24h" },
                { cmd: "0 3 * * * /usr/sbin/tmpwatch 24 /tmp", desc: "planification cron : nettoyage de /tmp tous les jours à 3h" },
                { cmd: "sudo systemd-tmpfiles --clean", desc: "nettoie selon les règles de /etc/tmpfiles.d et /usr/lib/tmpfiles.d (remplace tmpwatch sur les systèmes systemd modernes)" },
              ],
            },
            {
              type: "callout",
              variant: "important",
              title: "Cas pratique : analyse d'un FS défectueux",
              text: "1) Identifier le disque : sudo dmesg | grep -i sdb ou journalctl -k. 2) Démonter : sudo umount /dev/sdb1. 3) Vérifier et réparer : sudo fsck -y /dev/sdb1. 4) Vérifier les logs (dmesg/journalctl) puis remonter : sudo mount /dev/sdb1 /mnt/data. 5) Restaurer les fichiers corrompus depuis une sauvegarde.",
            },
          ],
        },
      ],
    },

    // ─────────────────────────── MODULE 4 ───────────────────────────
    {
      id: "m4",
      title: "Module 4 — FS nouvelle génération, LVM et sauvegarde",
      summary:
        "Limites d'ext2/3/4, XFS/Btrfs/ZFS, snapshots, compression, checksums, LVM (PV/VG/LV), types de sauvegarde, outils (tar, rsync, dd, cron, cp), restauration et récupération.",
      sections: [
        {
          heading: "Limites des anciens systèmes de fichiers",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Ext2", v: "Avantage : simple, rapide, peu de surcharge. Limite majeure : pas de journalisation → après un crash, vérification longue et risque de perte de données." },
                { k: "Ext3", v: "Amélioration clé : ajout du journal (journaling). Performance moyenne sur les gros volumes ; pas de vérification automatique d'intégrité ni de compression intégrée." },
                { k: "Ext4", v: "Supporte les très grands disques, meilleure gestion du journal et des temps d'accès. Mais pas de vérification automatique d'intégrité (contrairement à Btrfs/ZFS), pas de snapshot ni compression/déduplication natives." },
              ],
            },
            {
              type: "p",
              text: "Les besoins modernes (cloud, conteneurs, SSD, serveurs à forte charge) exigent des systèmes plus robustes, flexibles et autonomes : XFS (haute performance, idéal grands fichiers), Btrfs (snapshots, compression, auto-réparation) et ZFS (intégrité avancée, gestion de volume intégrée, réplication).",
            },
            {
              type: "table",
              headers: ["FS", "Positionnement", "Utilisation typique"],
              rows: [
                ["EXT4", "Standard stable et universel ; pas de snapshots/compression/intégrité automatique", "Poste de travail, serveurs standards, VM classiques"],
                ["XFS", "Champion des performances ; très efficace multi-utilisateurs et haut débit", "Bases de données, environnements professionnels à haut volume"],
                ["Btrfs", "Gestion avancée : RAID, compression, clonage, subvolumes intégrés", "Sauvegardes fréquentes, tests, développement, NAS personnels"],
                ["ZFS", "Solution tout-en-un haut de gamme : RAID, snapshots, checksums, compression ; consomme beaucoup de RAM", "Serveurs critiques, datacenters, stockage professionnel"],
              ],
            },
          ],
        },
        {
          heading: "Fonctionnalités avancées",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Snapshots", v: "Image figée d'un FS à un instant donné → sauvegardes rapides et rollback faciles. Présents nativement dans Btrfs et ZFS ; possibles avec LVM sur ext4/XFS." },
                { k: "Compression & déduplication", v: "La compression stocke les fichiers en moins d'espace ; la déduplication détecte les données identiques et ne les enregistre qu'une fois. Intégrés à Btrfs/ZFS, absents d'EXT4/XFS. Gain d'espace et réduction du trafic disque." },
                { k: "Vérification automatique d'intégrité", v: "Chaque bloc est vérifié par une somme de contrôle (checksum) ; un bloc corrompu peut être corrigé automatiquement (auto-réparation). Présent dans Btrfs/ZFS, absent d'EXT4/XFS." },
                { k: "Très grands volumes (> 16 To)", v: "Gestion de dizaines/centaines de To voire exaoctets ; adapté serveurs, clouds et virtualisation. XFS efficace sur grands volumes ; Btrfs/ZFS conçus pour le stockage massif." },
              ],
            },
          ],
        },
        {
          heading: "LVM — Logical Volume Manager",
          blocks: [
            {
              type: "p",
              text: "LVM est un outil de gestion du stockage qui crée des volumes logiques flexibles au-dessus des disques physiques ; il agit comme une couche intermédiaire entre le système de fichiers et le matériel. Fonctionnalité simple : PV (Physical Volume) = disque ou partition physique (ex. /dev/sdb1) ; VG (Volume Group) = regroupe plusieurs PV en un seul grand espace ; LV (Logical Volume) = volume logique utilisé comme un disque virtuel monté par le système — comme un « RAID logiciel simplifié et flexible ».",
            },
            {
              type: "kv",
              items: [
                { k: "Gestion flexible", v: "Combiner plusieurs disques physiques en un seul espace logique." },
                { k: "Agrandissement dynamique", v: "Un volume peut être agrandi à chaud, sans redémarrer." },
                { k: "Snapshots", v: "Créer des snapshots instantanés d'un volume avant modification." },
                { k: "Migration simplifiée", v: "Déplacer un volume d'un disque à l'autre sans interruption de service." },
              ],
            },
            {
              type: "cmd",
              commands: [
                { cmd: "sudo pvcreate /dev/sdb1", desc: "crée un volume physique" },
                { cmd: "sudo vgcreate data_vg /dev/sdb1 /dev/sdc1", desc: "crée un groupe de volumes" },
                { cmd: "sudo lvcreate -L 50G -n lv_data data_vg", desc: "crée un volume logique de 50 Go" },
                { cmd: "sudo lvs / vgs / pvs", desc: "affiche les infos LV, VG, PV" },
                { cmd: "lvcreate --size 1G --snapshot --name snap_lv /dev/vg/volume", desc: "snapshot LVM" },
                { cmd: "lvconvert --merge /dev/vg/snapshot", desc: "fusionne un snapshot avec le volume original (restauration)" },
              ],
            },
          ],
        },
        {
          heading: "La sauvegarde (backup) — objectifs et types",
          blocks: [
            {
              type: "list",
              items: [
                "Protection contre les pannes matérielles : restaurer rapidement les données sur un autre support.",
                "Protection contre les erreurs humaines et les attaques : éviter la perte définitive des fichiers.",
                "Conformité légale : conserver les données (comptabilité, factures, logs).",
                "Restauration rapide du système : réinstaller le système complet en quelques minutes.",
              ],
            },
            {
              type: "table",
              headers: ["Type", "Description", "Avantage", "Inconvénient", "Commande rsync"],
              rows: [
                ["Complète (Full)", "Tous les fichiers à chaque fois", "Restauration simple et rapide (tout dans une seule sauvegarde)", "Longue, consomme beaucoup d'espace", "rsync -a /home/ /backup/full/"],
                ["Différentielle", "Fichiers modifiés depuis la dernière complète", "Plus rapide qu'une complète, restauration simple", "Taille croissante jusqu'à la prochaine complète", "rsync -a --compare-dest=/backup/full/ /home/ /backup/diff/"],
                ["Incrémentale", "Fichiers modifiés depuis la dernière sauvegarde (complète ou incrémentale)", "Très rapide et économe en espace", "Restauration longue (complète + toutes les incrémentales)", "rsync -a --link-dest=/backup/prev/ /home/ /backup/inc/"],
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: "Conseil de combinaison",
              text: "1 complète par semaine + 6 incrémentales par jour + 1 différentielle mensuelle pour l'archivage.",
            },
          ],
        },
        {
          heading: "Outils de sauvegarde",
          blocks: [
            {
              type: "table",
              headers: ["Outil", "Rôle", "Commande", "Limite"],
              rows: [
                ["tar", "Archivage standard : archives compressées (.tar, .gz, .bz2)", "tar -czvf backup_home.tar.gz /home — restauration : tar -xzvf backup_home.tar.gz -C /restore", "Pas de synchronisation ni incrémental automatique"],
                ["rsync", "Synchronisation efficace : ne copie que les fichiers modifiés (local ou distant)", "rsync -avz /home/ /media/backup/ — distant : rsync -avz /home/ user@serveur:/sauvegarde/", "Pas de compression automatique sans option"],
                ["dd", "Clonage bas-niveau : copie bit à bit d'un disque/partition", "sudo dd if=/dev/sda of=/dev/sdb bs=64K status=progress", "Lent et risqué (aucune vérification avant écrasement)"],
                ["cron", "Automatisation des sauvegardes régulières", "sudo crontab -e → 0 2 * * 0 rsync -av /home /backup/", "Nécessite un bon suivi (logs, alertes)"],
                ["cp", "Copie simple de fichiers", "cp -r /home /media/usb_backup", "Aucune vérification, pas de synchro ni incrémental"],
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Timeshift", v: "Snapshots système complets (similaire au Restore Point Windows) ; idéal postes Linux (Mint, Ubuntu) ; restaure le système sans toucher aux fichiers personnels." },
                { k: "Bacula", v: "Solution professionnelle centralisée en réseau ; serveurs, BDD, disques et bandes ; gestion automatisée et planifiée." },
                { k: "DejaDup", v: "Interface simple intégrée GNOME ; chiffrement, stockage distant (Google Drive, FTP…) ; convient aux non-techniciens." },
              ],
            },
            {
              type: "code",
              lang: "bash",
              code: "#!/bin/bash\n# Script de sauvegarde automatique\nDATE=$(date +%Y-%m-%d)          # date du jour (ex. 2025-10-20)\nDEST=/backup/$DATE              # dossier destination daté\nrsync -av --delete /home/ $DEST # -a archive (permissions, liens), -v verbeux,\n                                # --delete supprime les fichiers effacés à la source\nlogger \"Sauvegarde terminée à $(date)\"  # écrit dans /var/log/syslog",
            },
            {
              type: "cmd",
              commands: [
                { cmd: "tar -xvf sauvegarde.tar -C /repertoire_cible", desc: "x extraction, v verbose, f fichier source" },
                { cmd: "rsync -av /backup/2025-09-01/ /home/", desc: "restauration avec rsync (a = archive, v = verbose)" },
                { cmd: "btrfs subvolume snapshot /src /snap", desc: "snapshot Btrfs" },
                { cmd: "btrfs subvolume snapshot restore", desc: "restaure un snapshot Btrfs" },
                { cmd: "testdisk", desc: "restauration de partitions perdues ou corrompues" },
                { cmd: "photorec", desc: "récupération de fichiers (photos, documents, vidéos) même si le FS est endommagé" },
                { cmd: "extundelete", desc: "récupération de fichiers supprimés sur ext3/ext4 (partition à ne pas monter en écriture)" },
              ],
            },
            {
              type: "callout",
              variant: "important",
              title: "Synthèse des outils",
              text: "Sauvegarde quotidienne → rsync (le plus pratique) · Archivage historique → tar / tar.gz · Disques systèmes → dd · Copies simples ponctuelles → cp.",
            },
          ],
        },
      ],
    },

    // ─────────────────────────── MODULE 5 ───────────────────────────
    {
      id: "m5",
      title: "Module 5 — Gestion des utilisateurs",
      summary:
        "Fichiers /etc/passwd, /etc/shadow, /etc/group, /etc/gshadow, login.defs, useradd/usermod/userdel, groupes, permissions, umask, PAM, quotas disque.",
      sections: [
        {
          heading: "Concepts fondamentaux",
          blocks: [
            {
              type: "p",
              text: "Rôle de l'administrateur : maintenir la sécurité et la stabilité du système, créer et gérer utilisateurs et groupes, gérer les droits d'accès et la confidentialité, surveiller les ressources et appliquer des quotas. Concepts clés : un utilisateur est une entité identifiée par un UID ; un groupe est un ensemble d'utilisateurs partageant des droits ; UID (User ID) et GID (Group ID) ; superutilisateur (root) et utilisateurs standards.",
            },
            {
              type: "table",
              headers: ["Fichier", "Rôle"],
              rows: [
                ["/etc/passwd", "Informations essentielles sur les comptes utilisateurs. Format : nom:x:UID:GID:infoComplémentaire:répertoire_perso:shell — ex. etudiant:x:1001:1001:Etudiant:/home/etudiant:/bin/bash"],
                ["/etc/shadow", "Mots de passe chiffrés + politiques de sécurité ; accessible uniquement à root. Format : nom:motdepasse:lastchg:min:max:warn:inactive:expire (+ champ réservé)."],
                ["/etc/group", "Informations de base sur les groupes d'utilisateurs."],
                ["/etc/gshadow", "Stockage sécurisé des données sensibles des groupes (mots de passe de groupes)."],
                ["/etc/login.defs", "Paramètres globaux de sécurité : UID_MIN, UID_MAX, PASS_MAX_DAYS, PASS_MIN_DAYS."],
                ["/etc/default/useradd", "Paramètres par défaut de useradd : HOME, SHELL (souvent /bin/bash), CREATE_HOME, SKEL (/etc/skel = fichiers modèles copiés dans le répertoire personnel avec l'option -m)."],
              ],
            },
            {
              type: "cmd",
              commands: [
                { cmd: "cat /etc/passwd", desc: "liste les utilisateurs avec leurs informations de base" },
                { cmd: "grep 'etudiant' /etc/passwd", desc: "recherche les lignes contenant un mot" },
                { cmd: "cut -d: -f1 /etc/passwd", desc: "extrait uniquement les noms d'utilisateurs (-d: séparateur, -f1 premier champ)" },
                { cmd: "less /etc/shadow", desc: "consulte /etc/shadow de manière sécurisée et paginée" },
              ],
            },
          ],
        },
        {
          heading: "Créer, modifier et supprimer des comptes",
          blocks: [
            {
              type: "cmd",
              commands: [
                { cmd: "sudo useradd -m -s /bin/bash etudiant", desc: "crée un utilisateur ; -m crée /home/etudiant, -s définit le shell" },
                { cmd: "sudo usermod -s /bin/zsh etudiant", desc: "modifie le shell" },
                { cmd: "sudo usermod -d /home/newhome etudiant", desc: "modifie le répertoire personnel" },
                { cmd: "sudo userdel etudiant", desc: "supprime le compte" },
                { cmd: "sudo userdel -r etudiant", desc: "supprime le compte ET le répertoire personnel" },
                { cmd: "id user", desc: "identité et groupes d'un utilisateur" },
                { cmd: "who / w", desc: "utilisateurs actuellement connectés" },
                { cmd: "last", desc: "historique des connexions" },
                { cmd: "finger user", desc: "informations détaillées sur un utilisateur" },
                { cmd: "ls -a /etc/skel", desc: "contenu du dossier modèle (personnalisation des environnements par défaut)" },
              ],
            },
          ],
        },
        {
          heading: "Groupes et permissions",
          blocks: [
            {
              type: "cmd",
              commands: [
                { cmd: "sudo groupadd developpeurs", desc: "crée un groupe" },
                { cmd: "sudo groupmod -n dev developpeurs", desc: "renomme le groupe en « dev »" },
                { cmd: "sudo groupdel dev", desc: "supprime le groupe" },
                { cmd: "sudo usermod -aG projetA alice", desc: "ajoute alice au groupe projetA (aG = append to group)" },
                { cmd: "sudo chown :projetA /srv/projetA", desc: "donne le groupe au dossier" },
                { cmd: "sudo chmod 770 /srv/projetA", desc: "donne accès au groupe (rwx pour propriétaire et groupe)" },
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: "Bonnes pratiques groupes",
              text: "Créer des groupes logiques (web, dev, admin…), éviter de placer un utilisateur dans trop de groupes, utiliser correctement les permissions de groupe.",
            },
            {
              type: "p",
              text: "Lecture des permissions avec ls -l : « -rw-r--r-- 1 alice dev 1024 Oct 28 12:00 fichier.txt ». Modification avec chmod : chmod u+x fichier.txt (ajoute l'exécution au propriétaire), chmod g-w fichier.txt (retire l'écriture au groupe), chmod 755 fichier.txt (rwx propriétaire, r-x groupe et autres). Bonnes pratiques : fichiers personnels → 600 ; dossiers partagés → 770 ou 775.",
            },
            {
              type: "cmd",
              commands: [
                { cmd: "sudo chown alice fichier.txt", desc: "change le propriétaire" },
                { cmd: "sudo chgrp dev fichier.txt", desc: "change le groupe" },
                { cmd: "sudo chown alice:dev fichier.txt", desc: "change propriétaire et groupe" },
                { cmd: "umask", desc: "affiche les permissions par défaut à la création" },
                { cmd: "umask 022", desc: "fichiers 644, dossiers 755" },
                { cmd: "umask 077", desc: "fichiers privés (600)" },
                { cmd: "umask 002", desc: "fichiers partagés (664)" },
              ],
            },
          ],
        },
        {
          heading: "Mots de passe, PAM et surveillance",
          blocks: [
            {
              type: "cmd",
              commands: [
                { cmd: "sudo passwd etudiant", desc: "définir ou modifier un mot de passe" },
                { cmd: "sudo chage -l etudiant", desc: "vérifie la validité/expiration du mot de passe" },
                { cmd: "sudo chage -M 90 etudiant", desc: "expiration à 90 jours" },
                { cmd: "faillog", desc: "nombre d'échecs de connexion par utilisateur" },
                { cmd: "lastlog", desc: "dernière connexion réussie de chaque utilisateur" },
                { cmd: "sudo pam_tally2", desc: "verrouillage après échecs répétés" },
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Politiques de sécurité", v: "/etc/login.defs définit la longueur et la durée des mots de passe ; pam_pwquality gère la complexité (config : /etc/security/pwquality.conf)." },
                { k: "PAM", v: "Pluggable Authentication Modules : infrastructure flexible qui centralise et configure l'authentification sans modifier le code des applications ; personnalisation via /etc/pam.d." },
                { k: "Outils centralisés", v: "LDAP (annuaire centralisé, authentification globale), NIS (ancien système réseau), Kerberos (authentification par tickets), Webmin (interface web)." },
                { k: "Bonnes pratiques", v: "Forcer le changement de mot de passe périodiquement, interdire les mots de passe faibles, surveiller les comptes inactifs, sauvegarder /etc/passwd, /etc/shadow et /etc/group régulièrement." },
              ],
            },
            {
              type: "code",
              lang: "bash",
              code: "# Création d'utilisateurs depuis CSV\nwhile IFS=, read -r user pwd; do\n  sudo useradd -m -s /bin/bash \"$user\"\n  echo \"$user:$pwd\" | sudo chpasswd\ndone < utilisateurs.csv\n\n# Suppression des utilisateurs inactifs\n#!/bin/bash\nfor user in $(awk -F: '$3>=1000 {print $1}' /etc/passwd); do\n  lastlog -u $user | grep -q 'Never logged in' && sudo userdel -r $user\ndone",
            },
          ],
        },
        {
          heading: "Quotas disque",
          blocks: [
            {
              type: "p",
              text: "Les quotas limitent l'espace disque d'un utilisateur ou d'un groupe et évitent qu'un utilisateur monopolise tout le stockage. Activation : sudo quotacheck -cum /home puis sudo quotaon /home. Édition : sudo edquota etudiant. Rapports : repquota /home et quota -u etudiant.",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "Activer quota sur /home : quotaon /home.",
                "Attribuer un quota : edquota etudiant.",
                "Définir soft limit : 500M et hard limit : 550M.",
                "Vérifier : repquota /home, quota -u etudiant, tester en créant des fichiers.",
                "Erreurs fréquentes : oublier d'activer quotaon, mauvaise unité (K/M/G).",
              ],
            },
            {
              type: "table",
              headers: ["Cas d'usage", "Action"],
              rows: [
                ["Plusieurs étudiants sur le même serveur", "Activer le quota sur /home et définir une limite par utilisateur"],
                ["Serveur web multi-sites dans /var/www", "Activer le quota sur /var pour limiter chaque compte FTP"],
                ["Projet commun entre développeurs", "Activer le quota de groupe sur /srv/projet"],
              ],
            },
          ],
        },
      ],
    },

    // ─────────────────────────── MODULE 6 ───────────────────────────
    {
      id: "m6",
      title: "Module 6 — Gestion des paquets",
      summary:
        "Paquets binaires/sources, APT, DNF/YUM, dpkg/rpm, cycle de vie, dépendances, compilation depuis les sources, vérification SHA256 et GPG, automatisation.",
      sections: [
        {
          heading: "Paquet logiciel : définition",
          blocks: [
            {
              type: "p",
              text: "Un paquet logiciel est une archive contenant tous les éléments nécessaires à l'installation d'un programme : fichiers binaires exécutables (le programme compilé), bibliothèques nécessaires, fichiers de configuration, scripts de post-installation/suppression, et métadonnées (nom, version, dépendances, architecture, mainteneur…). Un paquet n'est pas un simple exécutable : c'est une structure complète assurant une installation cohérente et traçable.",
            },
            {
              type: "table",
              headers: ["Type", "Contenu", "Utilisation", "Exemple"],
              rows: [
                ["Paquet binaire", "Programme déjà compilé", "Installation rapide et stable", "htop.deb, nginx.rpm"],
                ["Paquet source", "Code source + scripts de compilation", "Personnalisation, adaptation, recompilation", "nginx-1.24.tar.gz"],
              ],
            },
          ],
        },
        {
          heading: "Gestionnaires de paquets",
          blocks: [
            {
              type: "p",
              text: "Un gestionnaire de paquets permet d'installer, mettre à jour et supprimer des logiciels automatiquement, en gérant les dépendances, les mises à jour, les signatures de sécurité et la désinstallation propre. Exemple : sudo apt install htop — une seule commande : le système télécharge, compile (si besoin), installe et configure le logiciel.",
            },
            {
              type: "table",
              headers: ["Distribution", "Gestionnaire", "Commandes", "Format"],
              rows: [
                ["Debian / Ubuntu", "APT", "apt install, apt update", ".deb"],
                ["Fedora / CentOS / RHEL", "DNF (anciennement YUM)", "dnf install, dnf update", ".rpm"],
                ["OpenSUSE", "Zypper", "zypper install", ".rpm"],
                ["Arch Linux", "Pacman", "pacman -S", ".pkg.tar.xz"],
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Gestion bas-niveau", v: "installe/supprime/interroge des paquets individuels, SANS gérer les dépendances : RPM (Red Hat, CentOS, Fedora) et DPKG (Debian, Ubuntu) → rpm -i package.rpm, dpkg -i package.deb" },
                { k: "Gestion haut-niveau", v: "automatise installation/mise à jour/suppression avec dépendances depuis les dépôts officiels : APT, YUM/DNF" },
                { k: "Formats", v: ".deb → Debian, Ubuntu, Mint (outils dpkg, apt) ; .rpm → Red Hat, CentOS, Fedora, openSUSE (outils rpm, dnf, yum). Les formats ne sont pas interchangeables." },
              ],
            },
            {
              type: "list",
              items: [
                "Cycle de vie d'un paquet : Téléchargement (apt download, wget…) → Installation (apt install, dnf install, rpm -i) → Mise à jour (apt upgrade, dnf update) → Suppression/purge (apt remove, rpm -e).",
                "Dépendances : un paquet nécessite d'autres paquets (ex. vlc dépend de libavcodec et libqt5gui) ; le gestionnaire télécharge les dépendances manquantes et vérifie la compatibilité des versions.",
                "Cohérence du système : prévention des conflits de version, suppression propre sans casser les autres paquets.",
                "Outils clés : apt-get -f install (Debian/Ubuntu), dnf check / yum check (Red Hat/Fedora).",
              ],
            },
          ],
        },
        {
          heading: "Installation depuis les sources",
          blocks: [
            {
              type: "p",
              text: "Pourquoi compiler ? Flexibilité, personnalisation, compatibilité matérielle ; cas d'usage : absence de paquet précompilé ou version récente. Inconvénients : plus long, erreurs possibles. Fichiers essentiels : configure (détecte l'environnement), Makefile (règles de compilation), CMakeLists.txt (alternative moderne via CMake : génère un Makefile propre, gère les dépendances, détecte la configuration, rend le projet portable).",
            },
            {
              type: "list",
              ordered: true,
              items: [
                "Prérequis : gcc, g++, make, autoconf, automake, libtool, build-essential (vérifier avec gcc --version, make --version).",
                "Télécharger le code source puis extraire les fichiers.",
                "Configurer : ./configure --prefix=/usr/local (paramètres : --enable-feature / --disable-feature) → vérifie les dépendances et génère le Makefile.",
                "Compiler : make (traduction du code en binaire ; make -j4 pour le multithreading).",
                "Installer : sudo make install → fichiers dans /usr/local/bin, /usr/local/lib.",
                "Désinstaller : sudo make uninstall si supporté, sinon suppression manuelle (find, whereis).",
              ],
            },
            {
              type: "table",
              headers: ["Critère", "Installation par source", "Gestionnaire de paquets"],
              rows: [
                ["Flexibilité", "Très haute", "Moyenne"],
                ["Sécurité", "Moins contrôlée", "Signatures et vérifications"],
                ["Mise à jour", "Manuelle", "Automatique"],
                ["Temps d'installation", "Long", "Rapide"],
              ],
            },
            {
              type: "callout",
              variant: "tip",
              title: "Bonnes pratiques",
              text: "Documenter chaque installation (journal d'admin), sauvegarder les commandes et versions, tester avant production, utiliser /usr/local ou /opt pour isoler, nettoyer régulièrement (make clean).",
            },
          ],
        },
        {
          heading: "Sécurité et intégrité",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Vérification d'intégrité (Hash)", v: "Chaque projet open source publie une empreinte SHA256 ou MD5 ; on compare la somme du fichier téléchargé avec celle du site officiel. Source : avant compilation. Binaire : vérifiée automatiquement par le gestionnaire. Si les valeurs diffèrent → ne jamais exécuter ni compiler." },
                { k: "Signature GPG", v: "Assure l'authenticité : le développeur signe avec sa clé privée GPG, l'utilisateur vérifie avec la clé publique du projet. Source : fichiers .asc/.sig accompagnant le code. Binaire : apt, dnf, zypper vérifient automatiquement les clés GPG." },
                { k: "Importance pro", v: "Protection contre les paquets compromis (supply chain attack), conformité aux politiques IT, traçabilité et audibilité, assurance qualité des déploiements automatisés." },
                { k: "Bonne pratique", v: "Toujours télécharger depuis des sources officielles, importer les clés GPG de manière sécurisée, ne JAMAIS désactiver la vérification (--nogpgcheck / --allow-unauthenticated)." },
              ],
            },
          ],
        },
        {
          heading: "Commandes APT et DNF/YUM",
          blocks: [
            {
              type: "cmd",
              commands: [
                { cmd: "sudo apt update", desc: "met à jour la liste des paquets" },
                { cmd: "sudo apt install paquet", desc: "installe un paquet avec ses dépendances" },
                { cmd: "sudo apt remove paquet", desc: "supprime un paquet" },
                { cmd: "sudo apt upgrade", desc: "met à niveau tous les paquets" },
                { cmd: "sudo apt search mot_clef", desc: "recherche un paquet" },
                { cmd: "sudo apt show paquet", desc: "détails d'un paquet" },
                { cmd: "sudo apt autoremove", desc: "nettoyage des dépendances inutiles" },
                { cmd: "sudo dnf install paquet", desc: "installe (DNF)" },
                { cmd: "sudo dnf remove paquet", desc: "supprime" },
                { cmd: "sudo dnf update", desc: "met à jour" },
                { cmd: "sudo dnf search mot_clef", desc: "recherche" },
                { cmd: "sudo dnf info paquet", desc: "informations" },
                { cmd: "sudo dnf history", desc: "historique des opérations" },
                { cmd: "sudo dnf clean all", desc: "nettoie le cache" },
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Dépôts APT", v: "Fichier principal /etc/apt/sources.list — ex. deb http://archive.ubuntu.com/ubuntu jammy main restricted universe. Ajouter un PPA : sudo add-apt-repository ppa:graphics-drivers/ppa && sudo apt update. Supprimer : retirer le fichier de /etc/apt/sources.list.d/." },
                { k: "Dépôts DNF", v: "fichiers .repo dans /etc/yum.repos.d/. Dépôt EPEL (Extra Packages for Enterprise Linux) : sudo dnf install epel-release (RHEL 8+) ou sudo yum install epel-release (RHEL 7)." },
              ],
            },
            {
              type: "code",
              lang: "bash",
              code: "#!/bin/bash\n# Script d'installation automatique\nsudo apt update -y\nsudo apt install -y curl vim\nsudo apt remove -y nano\napt list --installed > liste_paquets.txt   # utile pour audit/documentation\n\n# Sauvegarde et restauration de la liste des paquets\ndpkg --get-selections > sauvegarde.txt          # sauvegarde l'état des paquets\ndpkg --set-selections < sauvegarde.txt          # restaure la liste\nsudo apt-get dselect-upgrade                    # applique les changements\n\n# Mises à jour quotidiennes automatiques (cron)\n# 0 2 * * * /usr/bin/apt update && /usr/bin/apt upgrade -y   (tous les jours à 02h00)",
            },
          ],
        },
        {
          heading: "Audit, logs et dépannage",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Logs", v: "/var/log/dpkg.log, /var/log/yum.log, /var/log/dnf.log, /var/log/apt/history.log (historique des actions APT), /var/log/apt/term.log (détail des sorties)." },
                { k: "Vérification", v: "rpm -Va vérifie l'intégrité des paquets RPM ; dpkg --audit vérifie les paquets défectueux." },
                { k: "Problèmes courants", v: "Cache corrompu → sudo apt clean ; fichier verrouillé → sudo fuser -v /var/lib/dpkg/lock." },
              ],
            },
          ],
        },
      ],
    },

    // ─────────────────────────── MODULE 7 ───────────────────────────
    {
      id: "m7",
      title: "Module 7 — systemd",
      summary:
        "PID 1, fonctions, units (service, socket, timer, mount, device, target, path, slice), systemctl, journalctl, targets, dépendances, services personnalisés, timers.",
      sections: [
        {
          heading: "Qu'est-ce que systemd ?",
          blocks: [
            {
              type: "p",
              text: "systemd est le système d'initialisation et de gestion de services utilisé par la majorité des distributions Linux modernes. Il prend le rôle du processus PID 1, responsable du démarrage du système et de la supervision continue des services. Fonctions principales : initialisation au démarrage, gestion et supervision des services (start, stop, restart, auto-restart), gestion centralisée des journaux via journald, gestion des dépendances entre services, gestion de l'arborescence des cgroups, gestion des timers (alternative moderne à cron).",
            },
            {
              type: "list",
              items: [
                "Distributions utilisant systemd : Ubuntu, Debian, Fedora, CentOS/Rocky/AlmaLinux, RHEL, Arch Linux.",
                "Pourquoi : démarrage plus rapide (services en parallèle), supervision automatique (Restart=), standardisation (commande unique systemctl), journalisation centralisée (journalctl), fonctionnalités modernes (timers, activation par socket, cgroups, dépendances avancées).",
              ],
            },
            {
              type: "kv",
              items: [
                { k: "systemd (PID 1)", v: "Cœur du système : lance les services, supervise les processus, gère les dépendances et les targets." },
                { k: "systemd-journald", v: "Journalisation intégrée : collecte les logs du noyau, centralise les logs des services, filtrage avancé via journalctl." },
                { k: "systemd-logind", v: "Gestion des sessions : connexions utilisateurs, TTY, alimentation (verrouillage, veille…)." },
                { k: "systemd-networkd", v: "Gestion réseau intégrée (optionnelle selon distribution) : interfaces, DHCP/statique, configuration par fichiers." },
                { k: "systemd-cgroups", v: "Coordonne l'isolation via les control groups : limitation CPU/RAM, isolation de services, hiérarchisation des ressources." },
                { k: "Compléments", v: "systemd-tmpfiles (fichiers temporaires), systemd-timedated (heure), systemd-localed (locales), systemd-hostnamed (informations machine)." },
              ],
            },
            {
              type: "callout",
              variant: "important",
              title: "Vision",
              text: "systemd n'est pas seulement un service d'amorçage : c'est un écosystème complet pour piloter le système d'exploitation de manière cohérente et centralisée.",
            },
          ],
        },
        {
          heading: "Les Units",
          blocks: [
            {
              type: "p",
              text: "Une unit = un objet géré par systemd. Chaque unité représente une ressource ou un composant. Les fichiers unit se trouvent dans /lib/systemd/system/ (units du système) et /etc/systemd/system/ (units personnalisées).",
            },
            {
              type: "table",
              headers: ["Type", "Rôle", "Exemples"],
              rows: [
                [".service", "Gère les démons et processus", "nginx.service, ssh.service"],
                [".socket", "Activation par socket", "cups.socket"],
                [".timer", "Tâches planifiées", "backup.timer"],
                [".mount", "Montage de systèmes de fichiers", "home.mount"],
                [".device", "Périphériques", "dev-sda1.device"],
                [".target", "Groupes d'unités / états", "multi-user.target"],
                [".path", "Déclenchement basé sur des changements de fichiers", "myapp.path"],
                [".slice", "Groupes de cgroups", "user.slice"],
              ],
            },
            {
              type: "cmd",
              commands: [
                { cmd: "systemctl start nom.service", desc: "démarrer un service" },
                { cmd: "systemctl stop nom.service", desc: "arrêter" },
                { cmd: "systemctl restart nom.service", desc: "arrêter puis relancer" },
                { cmd: "systemctl reload nom.service", desc: "recharger la configuration (si supporté)" },
                { cmd: "systemctl enable nom.service", desc: "activer au démarrage" },
                { cmd: "systemctl disable nom.service", desc: "désactiver au démarrage" },
                { cmd: "systemctl status nom.service", desc: "afficher état, logs, PID" },
                { cmd: "systemctl list-units", desc: "lister les units actives (--type=service, --state=failed)" },
                { cmd: "systemctl list-unit-files", desc: "toutes les units disponibles (enabled, disabled, static, masked)" },
                { cmd: "systemctl list-units --type=device", desc: "voir toutes les unités device (ex. dev-sdb1.device pour une clé USB)" },
                { cmd: "ps -p 1 -o comm=", desc: "vérifier quel processus est PID 1 (systemd vs init/SysVinit)" },
              ],
            },
            {
              type: "table",
              headers: ["État", "Signification"],
              rows: [
                ["active", "Le service ou le device fonctionne normalement"],
                ["inactive", "Le service est arrêté ou le device n'est pas utilisé"],
                ["failed", "Le service a rencontré une erreur dans l'exécution"],
              ],
            },
          ],
        },
        {
          heading: "Cycle de vie et dépendances",
          blocks: [
            {
              type: "list",
              ordered: true,
              items: [
                "load : systemd lit le fichier .service (configuration).",
                "start : lancement du service.",
                "supervise : systemd surveille le service (restart automatique, logs…).",
                "reload : recharge la configuration sans redémarrer (si supporté).",
                "stop : arrêt du service.",
                "disable : le service ne se lance plus au démarrage.",
              ],
            },
            {
              type: "kv",
              items: [
                { k: "Requires=", v: "Dépendance FORTE : le service ne peut pas démarrer si l'unité référencée ne démarre pas. Ex : Requires=network-online.target" },
                { k: "Wants=", v: "Dépendance FAIBLE : le service tente de démarrer l'unité liée sans dépendre de son succès. Ex : Wants=sshd-keygen.service" },
                { k: "Before=", v: "Le service doit être démarré avant une autre unité." },
                { k: "After=", v: "Le service doit démarrer après une autre unité. N'ajoute pas de dépendance, seulement un ordre de démarrage." },
              ],
            },
          ],
        },
        {
          heading: "Les Targets",
          blocks: [
            {
              type: "p",
              text: "Les targets sont des états prédéfinis du système gérés par systemd. Ils jouent le rôle moderne des runlevels de SysVinit et définissent quelles unités doivent être actives pour un état donné. Un target = un ensemble d'unités décrivant un état global du système.",
            },
            {
              type: "table",
              headers: ["Target", "Rôle"],
              rows: [
                ["multi-user.target", "Mode multi-utilisateur sans interface graphique (équivalent runlevel 3)"],
                ["graphical.target", "Démarrage avec serveur graphique + gestionnaire d'affichage"],
                ["rescue.target", "Mode maintenance avec root shell et services minimum"],
                ["emergency.target", "Shell root ultra minimal, pas de services ; réparations critiques"],
              ],
            },
            {
              type: "cmd",
              commands: [
                { cmd: "systemctl get-default", desc: "affiche le target par défaut (ex. graphical.target)" },
                { cmd: "sudo systemctl set-default multi-user.target", desc: "change le mode de démarrage permanent (affecte les prochains boots, pas l'état actuel)" },
                { cmd: "systemctl reboot", desc: "redémarrer (arrêt propre selon les dépendances)" },
                { cmd: "systemctl poweroff", desc: "éteindre la machine" },
                { cmd: "systemctl reboot -i", desc: "redémarrage immédiat forcé (à utiliser avec prudence)" },
              ],
            },
            {
              type: "callout",
              variant: "warn",
              title: "Attention",
              text: "Passer en rescue.target ou emergency.target peut couper SSH et les services réseau.",
            },
          ],
        },
        {
          heading: "Fichiers .service personnalisés",
          blocks: [
            {
              type: "code",
              lang: "ini",
              code: "# /etc/systemd/system/backup.service\n[Unit]\nDescription=Script de sauvegarde personnalisé\n\n[Service]\nType=oneshot\nExecStart=/usr/local/bin/backup.sh\n\n[Install]\nWantedBy=multi-user.target\n\n# Structure générale :\n# [Unit]    → métadonnées, dépendances\n# [Service] → configuration du processus (lancement, gestion, redémarrage)\n# [Install] → indique comment activer le service (enable)",
            },
            {
              type: "kv",
              items: [
                { k: "ExecStart=", v: "Commande exécutée pour démarrer le service" },
                { k: "ExecReload=", v: "Commande pour recharger la configuration (si possible)" },
                { k: "ExecStop=", v: "Commande pour arrêter proprement" },
                { k: "Restart=", v: "Politique de redémarrage : on-failure, always, no" },
                { k: "Type=", v: "simple (par défaut, premier processus) · forking (démons détachés en arrière-plan) · oneshot (exécute une tâche puis sort)" },
              ],
            },
            {
              type: "cmd",
              commands: [
                { cmd: "sudo systemctl daemon-reload", desc: "INDISPENSABLE après création/modification d'un fichier unit : recharge les définitions et met à jour les dépendances sans redémarrer de service" },
                { cmd: "sudo systemctl start backup.service", desc: "démarre le service personnalisé" },
                { cmd: "sudo systemctl enable backup.service", desc: "l'active au démarrage" },
                { cmd: "systemctl reset-failed", desc: "réinitialise l'état « failed » (supprime les marqueurs d'échec persistants)" },
              ],
            },
          ],
        },
        {
          heading: "Timers systemd",
          blocks: [
            {
              type: "p",
              text: "Les timers remplacent cron de manière moderne : logs intégrés automatiquement (chaque exécution enregistrée dans journalctl → traçabilité, audit, dépannage), dépendances systemd (targets, services, sockets → lancer une tâche seulement si le système est prêt), supervision automatique (gestion des erreurs, relances, exit codes, protection cgroups). Un timer se compose de deux fichiers portant le même nom : backup.service (ce qui est exécuté) et backup.timer (quand l'exécuter).",
            },
            {
              type: "code",
              lang: "ini",
              code: "# /etc/systemd/system/backup.service\n[Unit]\nDescription=Script de sauvegarde automatique\n[Service]\nType=oneshot\nExecStart=/usr/local/bin/backup.sh\n\n# /etc/systemd/system/backup.timer\n[Unit]\nDescription=Timer pour la sauvegarde quotidienne\n[Timer]\nOnCalendar=daily\nPersistent=true\n[Install]\nWantedBy=timers.target",
            },
            {
              type: "kv",
              items: [
                { k: "OnCalendar=daily", v: "exécution chaque jour" },
                { k: "Persistent=true", v: "exécute la tâche si elle a été manquée (machine éteinte)" },
                { k: "OnBootSec=", v: "temps d'attente après le démarrage avant d'exécuter" },
                { k: "OnActiveSec=", v: "temps après l'activation du timer" },
                { k: "OnCalendar=", v: "planification calendaire (comme cron, mais plus puissante)" },
              ],
            },
            {
              type: "cmd",
              commands: [
                { cmd: "systemctl enable --now backup.timer", desc: "enable = activation permanente au boot ; --now = lancement immédiat" },
                { cmd: "systemctl list-timers", desc: "affiche les timers actifs : dernière exécution, prochaine exécution, unité .timer et .service associée" },
              ],
            },
          ],
        },
        {
          heading: "journald et journalctl",
          blocks: [
            {
              type: "cmd",
              commands: [
                { cmd: "journalctl", desc: "affiche tous les logs collectés par journald (services, kernel, boot, erreurs…)" },
                { cmd: "journalctl -u ssh", desc: "logs d'un service spécifique" },
                { cmd: "journalctl -b", desc: "logs du dernier démarrage (-b -1 : démarrage précédent)" },
                { cmd: "journalctl -f", desc: "suivi en temps réel" },
                { cmd: "journalctl --since \"1 hour ago\"", desc: "filtrer par période (--until pour une borne haute, --since \"2025-02-18 08:00\")" },
                { cmd: "journalctl -p err", desc: "filtrer par priorité (sévérité)" },
                { cmd: "sudo journalctl --vacuum-size=500M", desc: "conserve uniquement les 500 Mo les plus récents" },
                { cmd: "sudo journalctl --vacuum-time=7d", desc: "supprime les journaux plus vieux que 7 jours" },
                { cmd: "sudo journalctl --vacuum-files=10", desc: "limite le nombre de fichiers de logs" },
              ],
            },
          ],
        },
      ],
    },

    // ─────────────────────────── MODULE 8 ───────────────────────────
    {
      id: "m8",
      title: "Module 8 — Configuration réseau",
      summary:
        "IP, masque CIDR, gateway, DNS, MAC, interfaces, OSI simplifié (niveaux 2/3/4), IPv4/IPv6, DHCP vs statique, iproute2, configuration persistante (interfaces, Netplan, ifcfg), DNS.",
      sections: [
        {
          heading: "Concepts fondamentaux du réseau",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Adresse IP", v: "Identifie une machine sur un réseau. IPv4 : 192.168.1.10 (32 bits, ~4,3 milliards d'adresses). IPv6 : 2001:db8::1 (128 bits, quasi illimité, intègre IPsec, meilleure gestion du multicast, auto-configuration simplifiée). Rôles : identifier un hôte, permettre l'acheminement des paquets, définir le réseau d'appartenance." },
                { k: "Masque / CIDR", v: "Détermine la partie réseau et la partie hôte. /24 → 255.255.255.0 (256 adresses), /16 → 255.255.0.0, /32 → une seule adresse (hôte unique). Fonction : définir la taille du réseau et séparer les sous-réseaux." },
                { k: "Passerelle (gateway)", v: "Adresse du routeur permettant de sortir du réseau local (ex. 192.168.1.1). Achemine le trafic vers les réseaux externes, nécessaire pour Internet. Sans gateway → communication limitée au réseau local." },
                { k: "DNS", v: "Traduction nom de domaine (google.com) ↔ adresse IP (142.250.184.238) ; « annuaire d'Internet ». Serveurs courants : 8.8.8.8 (Google), 1.1.1.1 (Cloudflare), DNS du FAI." },
                { k: "Adresse MAC", v: "Identifiant physique unique d'une carte réseau, format AA:BB:CC:DD:EE:FF, gravée par le constructeur, niveau 2 (Ethernet), utilisée par ARP pour associer IP ↔ MAC." },
                { k: "Interfaces réseau", v: "Composant physique ou virtuel de communication : eth0/eth1 (Ethernet), wlan0 (Wi-Fi), lo (loopback 127.0.0.1), ens33/enp0s3 (conventions systemd)." },
              ],
            },
          ],
        },
        {
          heading: "Modèle OSI simplifié (niveaux essentiels)",
          blocks: [
            {
              type: "diagram",
              id: "osi-tcpip",
              caption: "Modèle OSI (7 couches) vs modèle TCP/IP (4 couches) : Application, Transport, Internet/Réseau, Accès réseau/Liaison+Physique.",
            },
            {
              type: "kv",
              items: [
                { k: "Niveau 2 — Liaison", v: "Adresse MAC, ARP (traduit IP ↔ MAC), switches et communication locale. Fonctions : détection d'erreurs, encapsulation des trames, transmission via eth0/wlan0." },
                { k: "Niveau 3 — Réseau", v: "Adresse IP, routage, passerelle, ICMP (ping, traceroute). Fonctions : choix du meilleur chemin, découpage en sous-réseaux (CIDR), passage par un routeur pour sortir du LAN. Exemple : ip route show." },
                { k: "Niveau 4 — Transport", v: "TCP (fiable, orienté connexion : contrôle d'erreur, réémission, ordre des paquets, handshake SYN/SYN-ACK/ACK) et UDP (rapide, sans garantie : DNS, VoIP, streaming)." },
              ],
            },
          ],
        },
        {
          heading: "DHCP, IP statique et réseaux privés",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "DHCP", v: "Dynamic Host Configuration Protocol : attribution automatique de l'IP, du masque, de la passerelle et du DNS. Utilisé sur la majorité des postes utilisateurs, simplifie l'administration. Commandes : dhclient, logs DHCP." },
                { k: "IP statique", v: "Définie manuellement dans /etc/network/interfaces, Netplan ou ifcfg (RHEL). Utilisée pour serveurs, routeurs/firewalls, équipements critiques. Stable et prévisible → indispensable pour les services." },
                { k: "Réseaux privés", v: "Plages non routées sur Internet : 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. Utilisés dans les LAN, nécessitent la NAT pour sortir sur Internet, sécurisés et isolés." },
                { k: "Réseaux publics", v: "Routés directement sur Internet, fournis par les FAI ou hébergeurs (OVH, AWS, GCP…). Exemple : 154.12.87.50." },
              ],
            },
          ],
        },
        {
          heading: "Configuration moderne avec iproute2",
          blocks: [
            {
              type: "p",
              text: "iproute2 remplace les anciennes commandes (ifconfig, route, arp) et fournit une gestion moderne, complète et plus puissante du réseau sous Linux. Outils principaux : ip addr (adresses IP), ip link (interfaces), ip route (routage), ip neigh (table ARP / voisinage).",
            },
            {
              type: "cmd",
              commands: [
                { cmd: "ip link", desc: "liste les interfaces" },
                { cmd: "ip link set eth0 up / down", desc: "active / désactive une interface" },
                { cmd: "ip addr add 192.168.1.10/24 dev eth0", desc: "ajoute une adresse IP" },
                { cmd: "ip addr del 192.168.1.10/24 dev eth0", desc: "supprime une adresse IP" },
                { cmd: "ip addr", desc: "affiche toutes les adresses IP" },
                { cmd: "ip route show", desc: "affiche la table de routage" },
                { cmd: "ip route add 10.0.0.0/24 via 192.168.1.1", desc: "ajoute une route statique" },
                { cmd: "ip route add default via 192.168.1.1", desc: "ajoute la passerelle par défaut" },
                { cmd: "ip route del 10.0.0.0/24", desc: "supprime une route" },
                { cmd: "ip neigh", desc: "affiche la table ARP" },
                { cmd: "ip neigh flush all", desc: "vide la table ARP" },
                { cmd: "ip neigh add 192.168.1.20 lladdr AA:BB:CC:DD:EE:FF dev eth0", desc: "entrée ARP manuelle (réseaux avancés)" },
              ],
            },
          ],
        },
        {
          heading: "Configuration persistante",
          blocks: [
            {
              type: "code",
              lang: "bash",
              code: "# ── Debian / Ubuntu classique : /etc/network/interfaces ──\niface eth0 inet static\n    address 192.168.1.10\n    netmask 255.255.255.0\n    gateway 192.168.1.1\nsudo ifup eth0      # activer\nsudo ifdown eth0    # désactiver",
            },
            {
              type: "code",
              lang: "yaml",
              code: "# ── Ubuntu modernes (Netplan, depuis 17.10) : /etc/netplan/*.yaml ──\nnetwork:\n  version: 2\n  ethernets:\n    eth0:\n      dhcp4: no\n      addresses: [192.168.1.10/24]\n      gateway4: 192.168.1.1\n      nameservers:\n        addresses: [8.8.8.8, 1.1.1.1]\n# Appliquer : sudo netplan apply",
            },
            {
              type: "code",
              lang: "bash",
              code: "# ── RHEL / CentOS / Rocky / AlmaLinux : /etc/sysconfig/network-scripts/ifcfg-eth0 ──\nDEVICE=eth0\nBOOTPROTO=none\nONBOOT=yes\nIPADDR=192.168.1.10\nNETMASK=255.255.255.0\nGATEWAY=192.168.1.1\nDNS1=8.8.8.8\n# Redémarrer : sudo systemctl restart network",
            },
            {
              type: "kv",
              items: [
                { k: "/etc/resolv.conf", v: "contient les serveurs DNS à utiliser. Exemple : nameserver 8.8.8.8 / nameserver 1.1.1.1." },
                { k: "/etc/hosts", v: "résolution locale : 127.0.0.1 localhost ; 192.168.1.10 serveur-web. PRIORITÉ : /etc/hosts est consulté avant les DNS." },
              ],
            },
          ],
        },
      ],
    },
  ],

  quiz: [
    { id: "a1", chapter: "m1", question: "Quelle norme internationale définit les exigences d'un Système de Management de la Sécurité de l'Information (SMSI) ?", options: ["ISO/IEC 20000", "ISO/IEC 27001", "RGPD", "ITIL"], correct: 1, explanation: "ISO/IEC 27001 définit les exigences du SMSI : protéger les données et gérer les risques de sécurité de l'information. ISO 20000 concerne la gestion des services IT." },
    { id: "a2", chapter: "m1", question: "L'article 33 du RGPD impose de notifier les violations de données personnelles sous quel délai ?", options: ["24 heures", "48 heures", "72 heures", "1 semaine"], correct: 2, explanation: "L'article 33 du RGPD impose la notification des violations de données personnelles sous 72 heures." },
    { id: "a3", chapter: "m1", question: "Quels outils sont cités pour la supervision et le monitoring des serveurs ?", options: ["Nagios, Zabbix, Grafana", "Word, Excel, PowerPoint", "Photoshop, Lightroom", "Vue, React, Angular"], correct: 0, explanation: "Nagios, Zabbix et Grafana sont des outils de supervision/monitoring utilisés par les administrateurs." },
    { id: "a4", chapter: "m1", question: "En cas d'attaque ransomware, quelle est la bonne réaction face à la rançon ?", options: ["Payer immédiatement en cryptomonnaie", "Ne pas payer, effacer les systèmes compromis et restaurer depuis les sauvegardes sécurisées", "Négocier avec les attaquants par email", "Formater uniquement la machine infectée et continuer"], correct: 1, explanation: "On ne paie jamais la rançon : on isole, analyse, efface les systèmes compromis et restaure depuis des sauvegardes sécurisées (non connectées au réseau)." },
    { id: "a5", chapter: "m2", question: "Quel système de fichiers a une taille maximale de 4 Go par fichier ?", options: ["NTFS", "FAT32", "ext4", "Btrfs"], correct: 1, explanation: "FAT32 est très compatible mais limité à 4 Go par fichier. exFAT a été créé pour lever cette limite." },
    { id: "a6", chapter: "m2", question: "Dans quel répertoire installe-t-on manuellement un logiciel tiers hors gestionnaire de paquets ?", options: ["/tmp", "/opt", "/boot", "/proc"], correct: 1, explanation: "/opt (« optional ») est réservé aux applications tierces : chaque logiciel y a son propre dossier (ex. /opt/google/chrome/, /opt/vmware/)." },
    { id: "a7", chapter: "m2", question: "Que se passe-t-il pour /tmp à chaque redémarrage ?", options: ["Il est sauvegardé", "Il est chiffré", "Il est effacé", "Il devient /var/tmp"], correct: 2, explanation: "/tmp est un répertoire temporaire partagé, effacé à chaque redémarrage." },
    { id: "a8", chapter: "m2", question: "Quelle commande teste la validité de /etc/fstab sans redémarrer ?", options: ["sudo fsck -a", "sudo mount -a", "sudo fstab --test", "sudo blkid"], correct: 1, explanation: "sudo mount -a monte tous les systèmes définis dans fstab ; si aucune erreur n'apparaît, la configuration est correcte." },
    { id: "a9", chapter: "m2", question: "Comment nomme-t-on la première partition du premier disque NVMe détecté ?", options: ["/dev/sda1", "/dev/nvme0n1p1", "/dev/mmcblk0p1", "/dev/hda1"], correct: 1, explanation: "Les SSD NVMe se nomment /dev/nvme0n1 (périphérique) et /dev/nvme0n1p1 (première partition)." },
    { id: "a10", chapter: "m2", question: "Quelle affirmation sur GPT est correcte ?", options: ["Max 4 partitions primaires et ≤ 2 To", "Jusqu'à 128 partitions et > 2 To, recommandé pour UEFI", "Ancien système remplacé par MBR", "Compatible uniquement avec Windows"], correct: 1, explanation: "GPT (GUID Partition Table) supporte jusqu'à 128 partitions et les disques > 2 To ; il est recommandé pour UEFI. MBR est limité à 4 primaires et 2 To." },
    { id: "a11", chapter: "m2", question: "À quoi sert la commande blkid ?", options: ["Monter un disque", "Formater une partition", "Afficher UUID, labels et types de systèmes de fichiers", "Créer un système de fichiers"], correct: 2, explanation: "blkid affiche les UUID, labels, types de FS (ext4, vfat…) et emplacements des partitions. Les UUID sont plus fiables que /dev/sdX." },
    { id: "a12", chapter: "m3", question: "Quelle précaution est OBLIGATOIRE avant de lancer fsck sur une partition ?", options: ["Formater la partition", "Démonter la partition", "Désactiver le swap", "Redémarrer le système"], correct: 1, explanation: "Toujours démonter la partition (sudo umount) avant fsck, sinon les corrections risquent d'endommager davantage le FS." },
    { id: "a13", chapter: "m3", question: "Quel outil de vérification utilise-t-on pour un système de fichiers XFS ?", options: ["fsck", "xfs_repair", "btrfs check", "chkdsk"], correct: 1, explanation: "XFS n'utilise pas fsck : on utilise xfs_repair. Btrfs utilise btrfs check." },
    { id: "a14", chapter: "m3", question: "Que mesure la commande iostat -x 5 ?", options: ["Les erreurs du noyau", "Les statistiques d'E/S disque toutes les 5 secondes", "L'espace disque libre", "Les processus en mémoire"], correct: 1, explanation: "iostat -x 5 affiche les statistiques détaillées d'E/S (utilisation %, temps de lecture/écriture, latence) toutes les 5 secondes." },
    { id: "a15", chapter: "m3", question: "Quelle est la valeur par défaut du swappiness sur la plupart des distributions Linux ?", options: ["0", "20", "60", "100"], correct: 2, explanation: "vm.swappiness vaut 60 par défaut : équilibre RAM/swap. 0 privilégie la RAM au maximum, 100 utilise le swap de façon agressive." },
    { id: "a16", chapter: "m3", question: "Dans la ligne crontab « 0 2 * * 0 /sbin/fsck -AR -y », que signifie -R ?", options: ["Réparer", "Redémarrer après", "Ignorer la racine /", "Mode récursif"], correct: 2, explanation: "-R signifie que fsck ignore la racine / pour éviter de bloquer le système. -A vérifie tous les FS de fstab, -y répond oui automatiquement." },
    { id: "a17", chapter: "m3", question: "Quel outil moderne remplace tmpwatch sur les systèmes systemd ?", options: ["systemd-tmpfiles", "systemd-cron", "journalctl", "systemctl clean"], correct: 0, explanation: "systemd-tmpfiles remplace et complète tmpwatch : sudo systemd-tmpfiles --clean supprime les fichiers temporaires selon les règles de /etc/tmpfiles.d." },
    { id: "a18", chapter: "m4", question: "Quelle limite majeure d'ext2 a été corrigée par ext3 ?", options: ["La taille maximale des fichiers", "L'absence de journalisation", "Le manque de permissions", "L'incompatibilité avec Linux"], correct: 1, explanation: "Ext3 a ajouté la journalisation : après un crash, la restauration est rapide, contrairement à ext2 où la vérification est longue et la perte de données possible." },
    { id: "a19", chapter: "m4", question: "Quels systèmes de fichiers offrent nativement snapshots, compression et auto-réparation ?", options: ["ext4 et XFS", "Btrfs et ZFS", "FAT32 et NTFS", "HPFS et UFS"], correct: 1, explanation: "Btrfs et ZFS intègrent nativement snapshots, compression/déduplication et vérification d'intégrité avec auto-réparation. ext4/XFS n'ont aucune de ces fonctions." },
    { id: "a20", chapter: "m4", question: "Dans LVM, que fait le Volume Group (VG) ?", options: ["Représente un disque physique", "Regroupe plusieurs PV en un seul grand espace de stockage", "Monte le volume logique", "Crée un snapshot"], correct: 1, explanation: "Le VG regroupe plusieurs Physical Volumes (PV) en un seul espace ; les Logical Volumes (LV) y sont découpés et montés comme des disques virtuels." },
    { id: "a21", chapter: "m4", question: "Quelle sauvegarde copie uniquement les fichiers modifiés depuis la DERNIÈRE sauvegarde complète ?", options: ["Incrémentale", "Différentielle", "Miroir", "Clone"], correct: 1, explanation: "La différentielle sauvegarde tout ce qui a changé depuis la dernière complète. L'incrémentale sauvegarde depuis la dernière sauvegarde de n'importe quel type." },
    { id: "a22", chapter: "m4", question: "Quel outil recommande-t-on pour une sauvegarde quotidienne ?", options: ["dd car il copie bit à bit", "rsync car il ne copie que les fichiers modifiés", "cp car il est simple", "tar car il compresse"], correct: 1, explanation: "rsync est le plus pratique au quotidien : copie différentielle (uniquement les modifications), local ou distant (rsync -avz /home/ user@serveur:/sauvegarde/)." },
    { id: "a23", chapter: "m4", question: "Quel outil restaure des partitions perdues ou corrompues ?", options: ["photorec", "testdisk", "extundelete", "ddrescue"], correct: 1, explanation: "testdisk restaure les partitions perdues/corrompues ; photorec récupère des fichiers même sur FS endommagé ; extundelete récupère des fichiers supprimés sur ext3/ext4." },
    { id: "a24", chapter: "m5", question: "Quel fichier contient les mots de passe chiffrés et n'est accessible qu'à root ?", options: ["/etc/passwd", "/etc/shadow", "/etc/group", "/etc/skel"], correct: 1, explanation: "/etc/shadow contient les mots de passe chiffrés et les politiques de sécurité ; /etc/passwd est public et lisible par tous." },
    { id: "a25", chapter: "m5", question: "Que fait l'option -m de la commande useradd ?", options: ["Définit le shell", "Crée le répertoire personnel /home/user", "Ajoute au groupe sudo", "Force le changement de mot de passe"], correct: 1, explanation: "useradd -m crée le répertoire personnel en copiant les modèles de /etc/skel. -s définit le shell." },
    { id: "a26", chapter: "m5", question: "Que signifie l'option -aG dans « sudo usermod -aG projetA alice » ?", options: ["Ajoute alice au groupe projetA en conservant ses groupes existants", "Supprime alice du groupe projetA", "Crée le groupe projetA", "Change le GID"], correct: 0, explanation: "-a (append) + -G (supplementary groups) ajoute l'utilisateur au groupe sans retirer ses autres groupes." },
    { id: "a27", chapter: "m5", question: "Avec umask 022, quelles permissions obtiennent les nouveaux fichiers ?", options: ["600", "644", "755", "770"], correct: 1, explanation: "umask 022 donne fichiers 644 (rw-r--r--) et dossiers 755. umask 077 donne des fichiers privés 600." },
    { id: "a28", chapter: "m5", question: "Quel est le rôle de PAM (Pluggable Authentication Modules) ?", options: ["Gérer les quotas disque", "Centraliser et configurer l'authentification sans modifier le code des applications", "Chiffrer /etc/shadow", "Créer des groupes"], correct: 1, explanation: "PAM est une infrastructure flexible d'authentification centralisée et configurable ; les administrateurs personnalisent les services via /etc/pam.d." },
    { id: "a29", chapter: "m5", question: "Quelle séquence active la gestion des quotas sur /home ?", options: ["quotaon /home après quotacheck -cum /home", "edquota --enable", "repquota /home", "umask /home"], correct: 0, explanation: "On active avec sudo quotacheck -cum /home (crée la base des quotas) puis sudo quotaon /home. edquota modifie les quotas, repquota affiche les rapports." },
    { id: "a30", chapter: "m5", question: "Quelles limites un quota disque définit-il pour un utilisateur ?", options: ["Soft limit (avertissement) et hard limit (blocage)", "Min et max de CPU", "Nombre de fichiers uniquement", "Largeur de bande réseau"], correct: 0, explanation: "Le soft limit (ex. 500M) déclenche un avertissement/période de grâce, le hard limit (ex. 550M) bloque strictement l'écriture." },
    { id: "a31", chapter: "m6", question: "Qu'est-ce qui distingue un paquet binaire d'un paquet source ?", options: ["Le binaire est déjà compilé, le source contient le code + scripts de compilation", "Le binaire est plus sûr, le source est plus léger", "Le binaire est pour Windows, le source pour Linux", "Aucune différence"], correct: 0, explanation: "Le paquet binaire (htop.deb, nginx.rpm) s'installe rapidement ; le paquet source (nginx-1.24.tar.gz) permet personnalisation et recompilation." },
    { id: "a32", chapter: "m6", question: "Quelle affirmation sur dpkg et rpm est correcte ?", options: ["Ce sont des gestionnaires haut-niveau", "Ils gèrent automatiquement les dépendances", "Ce sont des gestionnaires bas-niveau qui ne gèrent pas les dépendances", "Ils sont interchangeables"], correct: 2, explanation: "dpkg (Debian) et rpm (Red Hat) sont bas-niveau : ils installent des paquets individuels sans dépendances. APT/DNF/YUM sont haut-niveau." },
    { id: "a33", chapter: "m6", question: "Quelle commande nettoie le cache DNF ?", options: ["apt clean", "dnf clean all", "dnf purge", "yum flush"], correct: 1, explanation: "sudo dnf clean all vide le cache DNF. Côté APT : sudo apt clean." },
    { id: "a34", chapter: "m6", question: "Où se trouvent les fichiers de configuration des dépôts DNF/YUM ?", options: ["/etc/apt/sources.list", "/etc/yum.repos.d/ (fichiers .repo)", "/etc/dnf/sources", "/var/repo"], correct: 1, explanation: "Les dépôts DNF/YUM sont définis dans /etc/yum.repos.d/ ; les dépôts APT dans /etc/apt/sources.list." },
    { id: "a35", chapter: "m6", question: "À quoi sert la signature GPG d'un paquet ?", options: ["Compresser le paquet", "Garantir l'authenticité du fournisseur (clé privée signe, clé publique vérifie)", "Vérifier l'intégrité avec SHA256", "Automatiser les mises à jour"], correct: 1, explanation: "GPG authentifie l'origine : le développeur signe avec sa clé privée, l'utilisateur vérifie avec la clé publique. Le hash (SHA256/MD5) vérifie l'intégrité, pas l'origine." },
    { id: "a36", chapter: "m6", question: "Quelle étape de compilation détecte l'environnement et génère le Makefile ?", options: ["make", "make install", "./configure", "make clean"], correct: 2, explanation: "./configure vérifie les dépendances et génère le Makefile (options : --prefix=/usr/local, --enable-/--disable-). make compile, make install installe." },
    { id: "a37", chapter: "m6", question: "Quelle commande sauvegarde la liste des paquets gérés par dpkg ?", options: ["apt list --installed > file", "dpkg --get-selections > sauvegarde.txt", "dpkg -l --save", "rpm -qa > file"], correct: 1, explanation: "dpkg --get-selections > sauvegarde.txt sauvegarde l'état exact des paquets ; on restaure avec dpkg --set-selections puis apt-get dselect-upgrade." },
    { id: "a38", chapter: "m7", question: "Quel processus prend le rôle de PID 1 sur les distributions Linux modernes ?", options: ["init (SysVinit)", "systemd", "bash", "cron"], correct: 1, explanation: "systemd est le système d'initialisation des distributions modernes (Ubuntu, Debian, Fedora, RHEL…) : PID 1, démarrage et supervision continue. Vérification : ps -p 1 -o comm= → systemd." },
    { id: "a39", chapter: "m7", question: "Quelle commande est INDISPENSABLE après création ou modification d'un fichier unit ?", options: ["systemctl restart all", "sudo systemctl daemon-reload", "journalctl --flush", "systemctl enable --force"], correct: 1, explanation: "systemd ne détecte pas automatiquement les changements : sudo systemctl daemon-reload recharge toutes les définitions d'unités et met à jour les dépendances." },
    { id: "a40", chapter: "m7", question: "Que signifie le target multi-user.target ?", options: ["Démarrage graphique complet", "Mode multi-utilisateur sans interface graphique (équivalent runlevel 3)", "Mode rescue avec shell root", "Arrêt du système"], correct: 1, explanation: "multi-user.target = mode multi-utilisateur sans GUI (runlevel 3). graphical.target démarre avec serveur graphique, rescue.target = maintenance." },
    { id: "a41", chapter: "m7", question: "Quelle différence entre Requires= et Wants= ?", options: ["Requires est une dépendance forte, Wants une dépendance faible", "Requires ordonne le démarrage, Wants le stoppe", "Wants est réservé aux timers", "Aucune différence"], correct: 0, explanation: "Requires= : le service ne démarre pas si l'unité liée échoue. Wants= : le service tente de démarrer l'unité mais ne dépend pas de son succès. Before=/After= ne font qu'ordonner." },
    { id: "a42", chapter: "m7", question: "Quel Type de service convient à un script qui s'exécute puis se termine ?", options: ["simple", "forking", "oneshot", "notify"], correct: 2, explanation: "Type=oneshot exécute une tâche unique puis sort (scripts initiaux, sauvegardes). simple reste au premier processus, forking pour les démons détachés." },
    { id: "a43", chapter: "m7", question: "Que fait Persistent=true dans un timer systemd ?", options: ["Garde le service actif en permanence", "Exécute la tâche si elle a été manquée (machine éteinte)", "Bloque les autres timers", "Envoie les logs par email"], correct: 1, explanation: "Persistent=true rattrape les exécutions manquées pendant que la machine était éteinte. OnCalendar=daily planifie quotidiennement." },
    { id: "a44", chapter: "m7", question: "Quelle commande limite la taille totale des journaux journald à 500 Mo ?", options: ["journalctl --size=500M", "sudo journalctl --vacuum-size=500M", "logrotate -s 500M", "systemctl set-logsize 500M"], correct: 1, explanation: "journalctl --vacuum-size=500M conserve les 500 Mo les plus récents ; --vacuum-time=7d supprime les logs > 7 jours ; --vacuum-files=10 limite le nombre de fichiers." },
    { id: "a45", chapter: "m7", question: "Quel avantage les timers systemd ont-ils sur cron ?", options: ["Ils sont plus anciens", "Logs intégrés dans journalctl + dépendances systemd + supervision automatique", "Ils utilisent moins de RAM", "Ils fonctionnent sans fichier .service"], correct: 1, explanation: "Les timers offrent traçabilité/audit via journald, dépendances (targets, sockets) et supervision (relances, exit codes, cgroups)." },
    { id: "a46", chapter: "m8", question: "Que détermine le CIDR /24 ?", options: ["256 adresses avec masque 255.255.255.0", "65536 adresses", "Une seule adresse hôte", "Le numéro de port"], correct: 0, explanation: "/24 = 255.255.255.0 → 256 adresses (254 utilisables). /16 = 255.255.0.0, /32 = hôte unique." },
    { id: "a47", chapter: "m8", question: "Quelle plage d'adresses est PRIVÉE (non routée sur Internet) ?", options: ["154.12.87.0/24", "192.168.0.0/16", "8.8.8.0/24", "172.32.0.0/12"], correct: 1, explanation: "Les plages privées sont 10.0.0.0/8, 172.16.0.0/12 et 192.168.0.0/16. Elles nécessitent la NAT pour sortir sur Internet." },
    { id: "a48", chapter: "m8", question: "Quel outil moderne remplace ifconfig, route et arp ?", options: ["netstat", "iproute2 (ip addr, ip link, ip route, ip neigh)", "nmap", "dhclient"], correct: 1, explanation: "iproute2 fournit ip addr (adresses), ip link (interfaces), ip route (routage) et ip neigh (table ARP), remplaçant ifconfig/route/arp." },
    { id: "a49", chapter: "m8", question: "Où place-t-on la configuration persistante réseau sous Ubuntu moderne ?", options: ["/etc/network/interfaces", "/etc/netplan/*.yaml puis sudo netplan apply", "/etc/sysconfig/network-scripts/", "/etc/resolv.conf"], correct: 1, explanation: "Ubuntu 17.10+ utilise Netplan (/etc/netplan/*.yaml) appliqué avec sudo netplan apply. /etc/network/interfaces = Debian classique, ifcfg = RHEL." },
    { id: "a50", chapter: "m8", question: "Quel fichier est consulté AVANT les serveurs DNS pour la résolution de noms ?", options: ["/etc/resolv.conf", "/etc/hosts", "/etc/hostname", "/etc/networks"], correct: 1, explanation: "/etc/hosts (résolution locale) est consulté avant les DNS. /etc/resolv.conf liste les serveurs DNS (nameserver 8.8.8.8…)." },
    { id: "a51", chapter: "m8", question: "Quel protocole du niveau 2 associe les adresses IP aux adresses MAC ?", options: ["ICMP", "ARP", "DHCP", "DNS"], correct: 1, explanation: "ARP (Address Resolution Protocol) traduit IP ↔ MAC au niveau liaison (niveau 2). ip neigh affiche la table ARP." },
    { id: "a52", chapter: "m8", question: "Pour quels équipements privilégie-t-on une adresse IP statique ?", options: ["Postes utilisateurs portables", "Serveurs, routeurs/firewalls et équipements critiques", "Smartphones", "Imprimantes Wi-Fi"], correct: 1, explanation: "L'IP statique (définie dans interfaces/Netplan/ifcfg) est stable et prévisible : indispensable pour serveurs, routeurs et équipements critiques." },
  ],
};
