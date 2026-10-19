import type { CourseModule } from '@/types/course';

export const module7: CourseModule = {
  id: 8,
  slug: 'systemd',
  title: 'Systemd',
  subtitle: 'PID 1, unités, systemctl, journalctl, targets, dépendances, services personnalisés, timers',
  icon: 'Settings2',
  accent: 'lime',
  sections: [
    {
      id: 'm7-definition',
      title: '1. Qu’est-ce que systemd ?',
      blocks: [
        {
          kind: 'def',
          term: 'systemd',
          text: "Système d'**initialisation** et de **gestion de services** utilisé par la majorité des distributions Linux modernes. Il prend le rôle du processus **PID 1**, responsable du **démarrage du système** et de la **supervision continue** des services.",
        },
        { kind: 'h3', text: 'Fonctions principales' },
        {
          kind: 'list',
          items: [
            '**Initialisation** du système au démarrage',
            '**Gestion et supervision** des services (start, stop, restart, auto-restart)',
            '**Gestion centralisée des journaux** via journald',
            '**Gestion des dépendances** entre services',
            '**Gestion de l’arborescence des cgroups**',
            '**Gestion des timers** (alternative moderne à cron)',
          ],
        },
        { kind: 'h3', text: 'Distributions utilisant systemd' },
        {
          kind: 'list',
          items: ['Ubuntu ✓', 'Debian ✓', 'Fedora ✓', 'CentOS / Rocky / AlmaLinux ✓', 'RHEL ✓', 'Arch Linux ✓'],
        },
        { kind: 'h3', text: 'Pourquoi systemd ?' },
        {
          kind: 'table',
          headers: ['Argument', 'Détails'],
          rows: [
            ['**Démarrage plus rapide**', 'Exécute plusieurs services **en parallèle**, réduit le temps de boot, optimise les dépendances'],
            ['**Supervision automatique**', 'Relance automatique en cas d’échec (Restart=), surveillance continue des processus, gestion propre des arrêts/redémarrages'],
            ['**Standardisation**', 'Commande unique **systemctl**, fichiers de config homogènes, comportement identique sur toutes les distributions'],
            ['**Journalisation centralisée**', 'Journaux unifiés via **journald**, recherche facile avec **journalctl**, format structuré, filtrage avancé'],
            ['**Fonctionnalités modernes**', 'Timers, activation par socket, gestion intégrée des **cgroups**, dépendances avancées'],
          ],
        },
      ],
    },
    {
      id: 'm7-architecture',
      title: '2. Architecture générale',
      blocks: [
        { kind: 'diagram', id: 'systemd-arch', caption: 'Écosystème systemd : PID 1 + journald + logind + networkd + cgroups' },
        {
          kind: 'table',
          headers: ['Composant', 'Rôle'],
          rows: [
            ['**systemd (PID 1)**', 'Cœur du système : lance les services au démarrage, supervise les processus, gère les dépendances et les targets'],
            ['**systemd-journald**', 'Journalisation : collecte les logs du noyau, centralise les logs des services, filtrage avancé via journalctl'],
            ['**systemd-logind**', 'Gestion des sessions : connexions utilisateurs, gestion des TTY, alimentation (verrouillage, veille…)'],
            ['**systemd-networkd**', 'Gestion réseau intégrée (optionnel selon distribution) : interfaces, DHCP / statiques, configuration simple via fichiers'],
            ['**systemd-cgroups**', 'Isolation via les control groups : limitation ressources CPU/RAM, isolation de services, hiérarchisation'],
          ],
        },
        { kind: 'h3', text: 'Outils complémentaires' },
        {
          kind: 'list',
          items: [
            '**systemd-tmpfiles** : gestion des fichiers temporaires',
            '**systemd-timedated** : gestion de l’heure',
            '**systemd-localed** : locales système',
            '**systemd-hostnamed** : informations machine',
          ],
        },
        {
          kind: 'note',
          variant: 'info',
          text: '🔍 **Vision d’ensemble :** systemd n’est pas seulement un service d’amorçage — c’est un **écosystème complet** pour piloter le système d’exploitation de manière cohérente et centralisée.',
        },
      ],
    },
    {
      id: 'm7-units',
      title: '3. Les unités (Units)',
      blocks: [
        {
          kind: 'def',
          term: 'Unit',
          text: 'Un **objet géré par systemd**. Chaque unité représente une ressource ou un composant : service, timer, socket…',
        },
        {
          kind: 'table',
          headers: ['Type', 'Rôle', 'Exemples'],
          rows: [
            ['.service', 'Gère les démons et processus', 'nginx.service, ssh.service'],
            ['.socket', 'Activation par socket', 'cups.socket'],
            ['.timer', 'Tâches planifiées', 'backup.timer'],
            ['.mount', 'Montage de systèmes de fichiers', 'home.mount'],
            ['.device', 'Périphériques', 'dev-sda1.device'],
            ['.target', 'Groupes d’unités / états', 'multi-user.target'],
            ['.path', 'Déclenchement basé sur des changements de fichiers', 'myapp.path'],
            ['.slice', 'Groupes de cgroups', 'user.slice'],
          ],
        },
        {
          kind: 'list',
          items: [
            '**/lib/systemd/system/** → units du système',
            '**/etc/systemd/system/** → units personnalisées',
          ],
        },
        {
          kind: 'p',
          text: '**Exemple .device :** les unités .device représentent les périphériques matériels détectés par le noyau (disques, partitions, USB…). Exemples : `systemctl list-units --type=device` · `systemctl status dev-sda.device` · `systemctl status dev-sdb1.device` (clé USB montée).',
        },
      ],
    },
    {
      id: 'm7-commandes',
      title: '4. Commandes de base : systemctl et outils',
      blocks: [
        { kind: 'h3', text: 'systemctl — gestion des services et units' },
        {
          kind: 'table',
          headers: ['Commande', 'Rôle'],
          rows: [
            ['systemctl start nom.service', 'Démarrer'],
            ['systemctl stop nom.service', 'Arrêter'],
            ['systemctl enable nom.service', 'Activer au démarrage'],
            ['systemctl status nom.service', 'Statut (état, logs, PID)'],
            ['systemctl list-units', 'Lister les units'],
          ],
        },
        { kind: 'h3', text: 'Les 4 outils de base' },
        {
          kind: 'table',
          headers: ['Outil', 'Usage'],
          rows: [
            ['**journalctl**', 'Consultation des journaux : journalctl (tout) · -u nom.service (un service) · -b (dernier boot) · -f (temps réel)'],
            ['**hostnamectl**', 'Identité machine : hostnamectl (voir) · sudo hostnamectl set-hostname nouveau-nom · affiche aussi version OS, architecture'],
            ['**localectl**', 'Locales : localectl status · sudo localectl set-locale LANG=fr_FR.UTF-8 · sudo localectl set-keymap fr (clavier)'],
            ['**systemctl**', 'Gestion globale des units et services'],
          ],
        },
        { kind: 'h3', text: 'Identifier systemd' },
        {
          kind: 'p',
          text: 'Le **PID 1** est le premier processus lancé par le noyau au démarrage. S\'il s\'agit de systemd, votre système utilise ce gestionnaire.',
        },
        {
          kind: 'cmd',
          code: 'ps -p 1 -o comm=',
          note: 'Sortie attendue : systemd — si la sortie est « init », vous êtes sur SysVinit (rare aujourd’hui)',
        },
        { kind: 'h3', text: 'Gérer l’état global du système' },
        {
          kind: 'list',
          items: [
            '`systemctl status` → état global : target actif, services actifs/inactifs/en échec, erreurs',
            '`systemctl list-units` → units actives — options : **--type=service**, **--state=failed**',
            '`systemctl list-unit-files` → **toutes** les units disponibles (actives ou non) avec leur état : **enabled, disabled, static, masked**',
          ],
        },
        { kind: 'h3', text: 'Statut d’une unit' },
        {
          kind: 'table',
          headers: ['État', 'Signification'],
          rows: [
            ['active', 'Le service ou le device fonctionne normalement'],
            ['inactive', 'Le service est arrêté ou le device n’est pas utilisé'],
            ['failed', 'Le service a rencontré une **erreur** dans l’exécution'],
          ],
        },
        { kind: 'h3', text: 'Redémarrage et arrêt' },
        {
          kind: 'cmd',
          code: 'systemctl reboot',
          note: 'Redémarrer',
        },
        {
          kind: 'cmd',
          code: 'systemctl poweroff',
          note: 'Éteindre la machine',
        },
        {
          kind: 'note',
          variant: 'warn',
          text: '⚠️ Ces commandes utilisent les appels systemd (meilleure gestion du shutdown) — les services sont arrêtés **proprement selon leurs dépendances**. Alternative forcée : `systemctl reboot -i` (à utiliser avec prudence).',
        },
      ],
    },
    {
      id: 'm7-cycle-deps',
      title: '5. Cycle de vie et dépendances',
      blocks: [
        { kind: 'diagram', id: 'service-lifecycle', caption: 'Cycle de vie d’un service systemd : load → start → supervise → reload → stop → disable' },
        {
          kind: 'table',
          headers: ['Phase', 'Description'],
          rows: [
            ['**load**', 'systemd lit le fichier .service (configuration)'],
            ['**start**', 'Lancement du service'],
            ['**supervise**', 'systemd surveille le service (restart automatique, logs…)'],
            ['**reload**', 'Recharge la configuration sans redémarrer (si supporté)'],
            ['**stop**', 'Arrêt du service'],
            ['**disable**', 'Le service ne se lance plus au démarrage'],
          ],
        },
        { kind: 'h3', text: 'Dépendances entre unités' },
        {
          kind: 'table',
          headers: ['Directive', 'Type', 'Comportement'],
          rows: [
            ['**Requires=**', 'Dépendance **forte**', 'Le service ne peut PAS démarrer si l’unité référencée ne démarre pas. Ex : Requires=network-online.target'],
            ['**Wants=**', 'Dépendance **faible**', 'Le service tente de démarrer l’unité liée, mais ne dépend pas de son succès. Ex : Wants=sshd-keygen.service'],
            ['**Before=**', 'Ordre', 'Le service doit être démarré **avant** une autre unité'],
            ['**After=**', 'Ordre', 'Le service doit démarrer **après** une autre unité — n’ajoute pas de dépendance, seulement un ordre de démarrage'],
          ],
        },
      ],
    },
    {
      id: 'm7-targets',
      title: '6. Les Targets',
      blocks: [
        {
          kind: 'def',
          term: 'Target',
          text: 'État **prédéfini** du système géré par systemd. Ils jouent le rôle moderne des **runlevels** de SysVinit. Un target = un **ensemble d’unités** décrivant un état global du système.',
        },
        { kind: 'diagram', id: 'targets', caption: 'Les 4 targets principaux : graphical, multi-user, rescue, emergency' },
        {
          kind: 'table',
          headers: ['Target', 'Rôle / Description'],
          rows: [
            ['**multi-user.target**', 'Mode multi-utilisateur **sans interface graphique** (équivalent runlevel 3)'],
            ['**graphical.target**', 'Démarrage avec **serveur graphique + gestionnaire d’affichage**'],
            ['**rescue.target**', 'Mode **maintenance** avec root shell et services minimum'],
            ['**emergency.target**', 'Shell root **ultra minimal**, pas de services — réparations critiques'],
          ],
        },
        {
          kind: 'cmd',
          code: 'systemctl get-default',
          note: 'Voir le target actuel — ex. de sortie : graphical.target',
        },
        {
          kind: 'cmd',
          code: 'sudo systemctl set-default multi-user.target',
          note: 'Changer le mode de démarrage **permanent** (affecte les prochains boots, pas l’état actuel) — utile pour passer en mode console, désactiver l’interface graphique, forcer un serveur en mode minimal',
        },
        {
          kind: 'note',
          variant: 'danger',
          text: '⚠️ Passer en **rescue.target** ou **emergency.target** peut couper SSH et les services réseau !',
        },
      ],
    },
    {
      id: 'm7-services',
      title: '7. Gestion avancée des services',
      blocks: [
        {
          kind: 'table',
          headers: ['Commande', 'Rôle'],
          rows: [
            ['systemctl start <service>', 'Démarrer un service'],
            ['systemctl stop <service>', 'Arrêter un service'],
            ['systemctl restart <service>', 'Arrêter puis relancer'],
            ['systemctl reload <service>', 'Recharger la configuration (si supporté)'],
            ['systemctl enable <service>', 'Activer au démarrage'],
            ['systemctl disable <service>', 'Désactiver au démarrage'],
            ['systemctl status <service>', 'Afficher état, logs, PID'],
          ],
        },
        {
          kind: 'example',
          title: 'Exemple : démarrer et activer nginx',
          text: '`systemctl start nginx` → démarre immédiatement le serveur web. `systemctl enable nginx` → crée un lien dans **/etc/systemd/system/multi-user.target.wants/** → Nginx démarre automatiquement au prochain reboot.',
        },
        { kind: 'h3', text: 'Structure d’un fichier .service' },
        {
          kind: 'code',
          title: 'Structure générale',
          lang: 'ini',
          code: `[Unit]
Description=Description du service
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/script.sh
Restart=on-failure

[Install]
WantedBy=multi-user.target`,
        },
        {
          kind: 'table',
          headers: ['Section', 'Rôle'],
          rows: [
            ['**[Unit]**', 'Métadonnées, dépendances'],
            ['**[Service]**', 'Configuration du processus (comment lancer, gérer, redémarrer…)'],
            ['**[Install]**', 'Indique comment activer le service (enable)'],
          ],
        },
        { kind: 'h3', text: 'Paramètres importants de [Service]' },
        {
          kind: 'table',
          headers: ['Paramètre', 'Description'],
          rows: [
            ['**ExecStart=**', 'Commande exécutée pour démarrer le service'],
            ['**ExecReload=**', 'Commande pour recharger la configuration (si possible)'],
            ['**ExecStop=**', 'Commande pour arrêter proprement'],
            ['**Restart=**', 'Politique de redémarrage : **on-failure, always, no**'],
            ['**Type=simple**', '(par défaut) le service reste au premier processus lancé'],
            ['**Type=forking**', 'Utilisé pour les démons qui se détachent en arrière-plan'],
            ['**Type=oneshot**', 'Pour exécuter une tâche puis sortir (scripts initiaux)'],
          ],
        },
        { kind: 'h3', text: 'Service personnalisé complet' },
        {
          kind: 'code',
          title: 'Fichier : /etc/systemd/system/backup.service',
          lang: 'ini',
          code: `[Unit]
Description=Script de sauvegarde personnalisé

[Service]
Type=oneshot
ExecStart=/usr/local/bin/backup.sh

[Install]
WantedBy=multi-user.target`,
        },
        {
          kind: 'code',
          title: 'Activation du service',
          code: `sudo systemctl daemon-reload
sudo systemctl start backup.service
sudo systemctl enable backup.service`,
        },
        {
          kind: 'note',
          variant: 'tip',
          text: '💡 À retenir : **Type=oneshot** car le script s’exécute puis se termine · **daemon-reload** obligatoire après création ou modification · très utile pour automatiser des tâches administratives.',
        },
        { kind: 'h3', text: 'Recharger systemd' },
        {
          kind: 'p',
          text: 'Lorsque tu crées ou modifies un fichier **.service**, **.timer** ou toute unité systemd — systemd **ne détecte pas automatiquement** les changements.',
        },
        {
          kind: 'cmd',
          code: 'sudo systemctl daemon-reload',
          note: 'Recharge toutes les définitions d’unités, met à jour les dépendances, NE redémarre AUCUN service',
        },
        { kind: 'h3', text: 'Dépannage des services' },
        {
          kind: 'list',
          items: [
            '`journalctl -u nom.service` → logs d’un service (options : **-f** temps réel, **--since "10 min ago"**)',
            '`systemctl status nom.service` → état (active/inactive/failed), PID, journal récent, **code d’erreur** (exit code)',
            '`systemctl reset-failed` → **réinitialise** l’état « failed » : supprime les marqueurs d’échec persistants, utile après un crash résolu',
          ],
        },
      ],
    },
    {
      id: 'm7-timers',
      title: '8. Les Timers systemd',
      blocks: [
        { kind: 'h3', text: 'Pourquoi les timers plutôt que cron ?' },
        {
          kind: 'table',
          headers: ['Avantage', 'Détails'],
          rows: [
            ['✓ Remplacent cron', 'Solution **native** pour planifier des tâches, sans dépendre de crontab'],
            ['✓ Logs intégrés', 'Chaque exécution enregistrée dans **journalctl** → traçabilité, audit, dépannage'],
            ['✓ Dépendances systemd', 'Peuvent dépendre de targets, services, sockets → lancer une tâche **seulement si le système est prêt**'],
            ['✓ Supervision automatique', 'Gestion des erreurs, relances automatiques, contrôle des exit codes, protection ressources (cgroups)'],
          ],
        },
        { kind: 'diagram', id: 'timer-anatomy', caption: 'Anatomie d’un timer : le .timer déclenche le .service (même nom)' },
        { kind: 'h3', text: 'Anatomie : deux fichiers obligatoires' },
        {
          kind: 'p',
          text: 'Les timers se composent de **deux fichiers** portant **le même nom** : le **.service** définit **quoi** exécuter, le **.timer** définit **quand**. Séparation claire entre logique (service) et planification (timer).',
        },
        {
          kind: 'code',
          title: 'Fichier : /etc/systemd/system/backup.service',
          lang: 'ini',
          code: `[Unit]
Description=Script de sauvegarde automatique

[Service]
Type=oneshot
ExecStart=/usr/local/bin/backup.sh`,
        },
        {
          kind: 'code',
          title: 'Fichier : /etc/systemd/system/backup.timer',
          lang: 'ini',
          code: `[Unit]
Description=Timer pour la sauvegarde quotidienne

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target`,
        },
        {
          kind: 'table',
          headers: ['Paramètre', 'Signification'],
          rows: [
            ['**OnCalendar=daily**', 'Exécution chaque jour'],
            ['**Persistent=true**', 'Exécute la tâche **si elle a été manquée** (machine éteinte)'],
            ['**WantedBy=timers.target**', 'Activation standard des timers'],
          ],
        },
        { kind: 'h3', text: 'Activer et vérifier' },
        {
          kind: 'cmd',
          code: 'systemctl enable --now backup.timer',
          note: 'enable = activation permanente au boot · --now = lancement immédiat sans attendre',
        },
        {
          kind: 'cmd',
          code: 'systemctl list-timers',
          note: 'Affiche : dernière exécution, prochaine exécution, unité .timer, .service associée',
        },
        { kind: 'h3', text: 'Types de déclenchement' },
        {
          kind: 'table',
          headers: ['Paramètre', 'Rôle'],
          rows: [
            ['**OnBootSec=**', 'Temps d’attente après le **démarrage** avant d’exécuter le service'],
            ['**OnActiveSec=**', 'Temps après l’**activation du timer**'],
            ['**OnCalendar=**', 'Planification basée sur le **calendrier** (comme cron, mais plus puissante)'],
          ],
        },
      ],
    },
    {
      id: 'm7-journalctl',
      title: '9. Journalisation : journalctl',
      blocks: [
        {
          kind: 'table',
          headers: ['Commande', 'Rôle'],
          rows: [
            ['journalctl', 'Affiche **tous** les logs du système (services, kernel, boot, erreurs…)'],
            ['journalctl -u ssh', 'Filtre uniquement les logs du service ssh.service'],
            ['journalctl -b', 'Messages depuis le **dernier démarrage** (-b = boot)'],
            ['journalctl -b -1', 'Démarrage **précédent**'],
            ['journalctl --since "1 hour ago"', 'Filtrer par période (aussi : --since "2025-02-18 08:00")'],
            ['journalctl --until "10 minutes ago"', 'Jusqu’à un moment précis'],
            ['journalctl -p err', 'Filtrer par **priorité** (sévérité)'],
            ['journalctl -f', 'Suivi en **temps réel**'],
          ],
        },
        { kind: 'h3', text: 'Gestion de l’espace des logs' },
        {
          kind: 'table',
          headers: ['Commande', 'Effet'],
          rows: [
            ['sudo journalctl --vacuum-size=500M', 'Conserve uniquement les **500 Mo** les plus récents'],
            ['sudo journalctl --vacuum-time=7d', 'Supprime les journaux plus vieux que **7 jours**'],
            ['sudo journalctl --vacuum-files=10', 'Limite le **nombre de fichiers**'],
          ],
        },
      ],
    },
  ],
};
