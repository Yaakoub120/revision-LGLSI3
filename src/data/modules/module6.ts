import type { CourseModule } from '@/types/course';

export const module6: CourseModule = {
  id: 7,
  slug: 'gestion-paquets',
  title: 'Gestion des paquets',
  subtitle: 'Formats .deb/.rpm, APT, DNF/YUM, dpkg/rpm, compilation depuis les sources, sécurité GPG, dépôts et automatisation',
  icon: 'Package',
  accent: 'orange',
  sections: [
    {
      id: 'm6-definition',
      title: '1. Définition d’un paquet logiciel',
      blocks: [
        {
          kind: 'def',
          term: 'Paquet logiciel',
          text: 'Archive contenant **tous les éléments nécessaires** à l\'installation d\'un programme. ⚠️ NB : un paquet n\'est **pas un simple fichier exécutable**, mais une structure complète assurant une installation **cohérente et traçable** sur le système.',
        },
        { kind: 'h3', text: 'Contenu d’un paquet' },
        {
          kind: 'list',
          items: [
            'Les **fichiers binaires exécutables** (le programme compilé)',
            'Les **bibliothèques** nécessaires à son fonctionnement',
            'Les **fichiers de configuration**',
            'Les **scripts de post-installation / suppression** (pour automatiser certaines tâches)',
            'Les **métadonnées** : nom, version, dépendances, architecture, mainteneur…',
          ],
        },
        { kind: 'h3', text: 'Paquet source vs paquet binaire' },
        {
          kind: 'table',
          headers: ['Type', 'Contenu', 'Utilisation', 'Exemple'],
          rows: [
            ['Paquet **binaire**', 'Programme déjà compilé', 'Installation rapide et stable', 'htop.deb, nginx.rpm'],
            ['Paquet **source**', 'Code source + scripts de compilation', 'Personnalisation, adaptation, recompilation', 'nginx-1.24.tar.gz'],
          ],
        },
      ],
    },
    {
      id: 'm6-gestionnaires',
      title: '2. Gestionnaires de paquets et formats',
      blocks: [
        {
          kind: 'def',
          term: 'Gestionnaire de paquets',
          text: "Outil qui permet d'**installer, mettre à jour et supprimer** des logiciels automatiquement, sans passer par les étapes manuelles de compilation. Il gère : les **dépendances** (bibliothèques nécessaires), les **mises à jour**, les **signatures de sécurité** et la **désinstallation propre**.",
        },
        {
          kind: 'table',
          headers: ['Distribution', 'Gestionnaire principal', 'Commandes typiques', 'Format'],
          rows: [
            ['Debian / Ubuntu', 'APT', 'apt install, apt update', '.deb'],
            ['Fedora / CentOS / RHEL', 'DNF (anciennement YUM)', 'dnf install, dnf update', '.rpm'],
            ['OpenSUSE', 'Zypper', 'zypper install', '.rpm'],
            ['Arch Linux', 'Pacman', 'pacman -S', '.rpm*'],
          ],
          caption: '*Le cours indique pacman -S ; format Arch = .pkg.tar.xz en réalité, retenir le gestionnaire',
        },
        { kind: 'h3', text: 'Avantages des gestionnaires de paquets' },
        {
          kind: 'list',
          items: [
            '**Vérification automatique des signatures** (sécurité)',
            '**Gestion simplifiée** des dépendances',
            'Installation rapide depuis des **dépôts officiels**',
            '**Mises à jour centralisées** du système',
          ],
        },
        {
          kind: 'example',
          title: 'Exemple',
          text: '`sudo apt install htop` → **une seule commande** : le système télécharge, compile (si besoin), installe et configure le logiciel automatiquement.',
        },
        { kind: 'h3', text: 'Formats standards' },
        {
          kind: 'list',
          items: [
            '**.deb** → Debian, Ubuntu, Linux Mint… — outils dédiés : **dpkg, apt**',
            '**.rpm** → Red Hat, CentOS, Fedora, openSUSE — outils dédiés : **rpm, dnf, yum**',
            '⚠️ Ces formats **ne sont pas interchangeables**',
          ],
        },
        { kind: 'h3', text: 'Cycle de vie d’un paquet' },
        {
          kind: 'steps',
          items: [
            { title: '1. Téléchargement', text: 'Récupération depuis un dépôt ou source externe (apt download, wget…)' },
            { title: '2. Installation', text: 'Décompression et copie des fichiers dans le système (apt install, dnf install, rpm -i)' },
            { title: '3. Mise à jour', text: 'Remplacement propre d’une version par une autre (apt upgrade, dnf update)' },
            { title: '4. Suppression / purge', text: 'Désinstallation du paquet et de ses fichiers associés (apt remove, rpm -e)' },
          ],
        },
        { kind: 'h3', text: 'Dépendances et cohérence du système' },
        {
          kind: 'list',
          items: [
            '**Dépendance :** un paquet nécessite d’autres paquets pour fonctionner → ex : **vlc dépend de libavcodec et libqt5gui**.',
            '**Gestion automatique :** téléchargement des dépendances manquantes + vérification de compatibilité des versions.',
            '**Cohérence du système :** prévention des conflits de version, suppression propre sans casser les autres paquets.',
            '**Outils clés :** `apt-get -f install` (Debian/Ubuntu) · `dnf check` / `yum check` (RedHat/Fedora).',
          ],
        },
        { kind: 'diagram', id: 'package-levels', caption: 'Gestion bas-niveau (dpkg, rpm) vs haut-niveau (apt, dnf) : le haut-niveau résout les dépendances' },
      ],
    },
    {
      id: 'm6-source',
      title: '3. Installation par le code source',
      blocks: [
        { kind: 'h3', text: 'Pourquoi et quand ?' },
        {
          kind: 'list',
          items: [
            '**Points clés :** flexibilité, personnalisation, compatibilité avec le matériel',
            '**Cas d’usage :** absence de paquet précompilé, versions récentes',
            '**Inconvénients :** plus long, erreurs possibles',
          ],
        },
        { kind: 'h3', text: 'Fichiers essentiels à la compilation' },
        {
          kind: 'table',
          headers: ['Fichier', 'Rôle'],
          rows: [
            ['**configure**', 'Détecte l’environnement'],
            ['**Makefile**', 'Définit les règles de compilation'],
            ['**CMakeLists.txt**', 'Alternative moderne via CMake : génère un Makefile propre, gère les dépendances, détecte la config système, rend le projet portable (Linux, Windows, macOS)'],
          ],
        },
        { kind: 'h3', text: 'Pré-requis et outils' },
        {
          kind: 'list',
          items: [
            '**Outils indispensables :** gcc, g++, make, autoconf, automake, libtool, build-essential',
            '**Vérifier leur présence :** gcc --version, make --version',
            '**Installer selon la distribution :** apt / dnf',
          ],
        },
        { kind: 'h3', text: 'Les 8 étapes classiques' },
        {
          kind: 'steps',
          items: [
            { title: '1. Télécharger le code source', text: 'wget https://exemple.org/app-1.0.tar.gz' },
            { title: '2. Extraire les fichiers', text: 'tar -xzvf app-1.0.tar.gz' },
            { title: '3. Configuration du projet', text: './configure — vérifie les dépendances et génère le Makefile. Paramètres courants : --prefix=/usr/local (répertoire d’installation), --enable-feature / --disable-feature' },
            { title: '4. Compilation', text: 'make — traduit le code source en binaire, génère exécutables/librairies. Option : make -j4 pour le multithreading' },
            { title: '5. Installation', text: 'sudo make install — avec privilèges administrateur. Fichiers installés dans /usr/local/bin, /usr/local/lib' },
            { title: '6. Désinstallation', text: 'sudo make uninstall — si supporté ; sinon suppression manuelle avec find ou whereis pour localiser les fichiers' },
          ],
        },
        { kind: 'h3', text: 'Comparaison : code source vs gestionnaire de paquets' },
        {
          kind: 'table',
          headers: ['Critère', 'Installation par source', 'Gestionnaire de paquets'],
          rows: [
            ['Flexibilité', '**Très haute**', 'Moyenne'],
            ['Sécurité', 'Moins contrôlée', '**Signatures et vérifications**'],
            ['Facilité de mise à jour', 'Manuelle', '**Automatique**'],
            ['Temps d’installation', 'Long', '**Rapide**'],
          ],
        },
        { kind: 'h3', text: 'Bonnes pratiques & maintenance' },
        {
          kind: 'list',
          items: [
            '**Documenter** chaque installation (journal d’admin)',
            '**Sauvegarder** les commandes et versions utilisées',
            '**Tester** avant déploiement en production',
            'Utiliser **/usr/local ou /opt** pour isoler les installations',
            '**Nettoyer** régulièrement (make clean)',
          ],
        },
      ],
    },
    {
      id: 'm6-securite',
      title: '4. Sécurité & intégrité : hash et signature GPG',
      blocks: [
        { kind: 'h3', text: 'Vérification d’intégrité du code source' },
        {
          kind: 'p',
          text: '**Objectif :** s\'assurer que le fichier téléchargé n\'a pas été **altéré ou corrompu**. Méthodes :',
        },
        {
          kind: 'list',
          items: [
            'Chaque projet open source publie une **empreinte (Hash)** : **SHA256 ou MD5**',
            'On compare la somme du fichier téléchargé avec celle fournie sur le **site officiel**',
            '**Code source :** vérification manuelle avant compilation · **Paquet binaire :** vérifiée automatiquement par le gestionnaire',
            '**Si les valeurs correspondent** → fichier authentique et intact. **Sinon** → ne JAMAIS l’exécuter ni le compiler',
          ],
        },
        { kind: 'h3', text: 'Vérification de la signature GPG' },
        {
          kind: 'p',
          text: '**Objectif :** s\'assurer que le paquet provient bien du **fournisseur légitime** (authenticité). **Principe :** le développeur **signe** le paquet avec sa **clé privée GPG**, et l\'utilisateur **vérifie** la signature avec la **clé publique** du projet.',
        },
        {
          kind: 'list',
          items: [
            'L’utilisateur doit **importer la clé publique** du fournisseur pour vérifier la signature',
            '**Paquet source :** souvent fichier **.asc ou .sig** accompagnant le code',
            '**Paquet binaire :** apt, dnf et zypper vérifient **automatiquement** les clés GPG',
          ],
        },
        { kind: 'h3', text: 'Importance en environnement professionnel' },
        {
          kind: 'list',
          items: [
            'Protection contre les paquets compromis (**supply chain attack**)',
            'Conformité aux politiques de sécurité IT',
            'Traçabilité et audibilité des installations',
            'Assurance qualité lors de déploiements automatisés',
          ],
        },
        {
          kind: 'note',
          variant: 'danger',
          text: '🚫 Bonne pratique : toujours télécharger depuis des **sources officielles**, importer les clés GPG de manière sécurisée, et **ne jamais désactiver la vérification** (--nogpgcheck ou --allow-unauthenticated interdits).',
        },
      ],
    },
    {
      id: 'm6-bas-haut',
      title: '5. Gestion bas-niveau vs haut-niveau',
      blocks: [
        {
          kind: 'def',
          term: 'Gestion bas-niveau (low-level)',
          text: "Permet d'**installer, supprimer ou interroger directement** des paquets individuels. ⚠️ **Ne gère PAS automatiquement les dépendances.** Outils : **RPM** (Red Hat, CentOS, Fedora) et **DPKG** (Debian, Ubuntu).",
        },
        {
          kind: 'cmd',
          code: 'rpm -i package.rpm',
          note: 'Installer un paquet RPM (bas-niveau)',
        },
        {
          kind: 'cmd',
          code: 'dpkg -i package.deb',
          note: 'Installer un paquet DEB (bas-niveau)',
        },
        {
          kind: 'def',
          term: 'Gestion haut-niveau (high-level)',
          text: "Automatise l'installation, la mise à jour et la suppression des paquets **avec toutes leurs dépendances**. Utilise les **dépôts officiels** pour récupérer les paquets. Outils : **APT** (Debian, Ubuntu) et **YUM/DNF** (Red Hat, CentOS, Fedora).",
        },
      ],
    },
    {
      id: 'm6-apt',
      title: '6. APT — commandes et dépôts',
      blocks: [
        {
          kind: 'table',
          headers: ['Commande', 'Rôle'],
          rows: [
            ['sudo apt update', 'Mise à jour de la **liste** des paquets'],
            ['sudo apt install paquet', 'Installer un paquet (avec dépendances)'],
            ['sudo apt remove paquet', 'Supprimer un paquet'],
            ['sudo apt upgrade', 'Mettre à niveau **tous** les paquets'],
            ['sudo apt search mot_clef', 'Rechercher un paquet'],
            ['sudo apt show paquet', 'Détails d’un paquet'],
            ['sudo apt autoremove', 'Nettoyage des dépendances inutiles'],
          ],
        },
        { kind: 'h3', text: 'Configuration des dépôts APT' },
        {
          kind: 'list',
          items: [
            '**Fichier principal :** /etc/apt/sources.list',
            '**Exemple d’entrée :** `deb http://archive.ubuntu.com/ubuntu jammy main restricted universe`',
            '**Ajouter un PPA :** `sudo add-apt-repository ppa:graphics-drivers/ppa` puis `sudo apt update`',
            '**Supprimer un dépôt :** supprimer le fichier du dossier **/etc/apt/sources.list.d/**',
          ],
        },
      ],
    },
    {
      id: 'm6-dnf',
      title: '7. DNF / YUM — commandes et EPEL',
      blocks: [
        {
          kind: 'table',
          headers: ['Commande', 'Rôle'],
          rows: [
            ['sudo dnf install paquet', 'Installer'],
            ['sudo dnf remove paquet', 'Supprimer'],
            ['sudo dnf update', 'Mettre à jour'],
            ['sudo dnf search mot_clef', 'Rechercher'],
            ['sudo dnf info paquet', 'Informations sur un paquet'],
            ['sudo dnf history', 'Historique des opérations'],
            ['sudo dnf clean all', 'Nettoyage du cache'],
          ],
        },
        {
          kind: 'p',
          text: '**Gestion des dépôts :** fichiers **.repo** dans **/etc/yum.repos.d/**',
        },
        { kind: 'h3', text: 'Atelier pratique : dépôt EPEL' },
        {
          kind: 'code',
          title: 'EPEL = Extra Packages for Enterprise Linux',
          code: `sudo dnf install epel-release   # CentOS/RHEL 8+
sudo yum install epel-release   # CentOS/RHEL 7
sudo dnf install htop           # Installer depuis ce dépôt
dnf info htop                   # Vérifier la provenance
sudo dnf remove htop            # Supprimer`,
        },
      ],
    },
    {
      id: 'm6-automatisation',
      title: '8. Automatisation, sauvegarde des paquets et logs',
      blocks: [
        { kind: 'h3', text: 'Script Bash d’installation automatique' },
        {
          kind: 'code',
          lang: 'bash',
          title: 'Utile pour audit, documentation ou sauvegarde de l’état des paquets',
          code: `#!/bin/bash
sudo apt update -y
sudo apt install -y curl vim
sudo apt remove -y nano
apt list --installed > liste_paquets.txt`,
        },
        { kind: 'h3', text: 'Sauvegarde / restauration de la liste des paquets' },
        {
          kind: 'cmd',
          code: 'dpkg --get-selections > sauvegarde.txt',
          note: 'Connaît l’état exact des paquets gérés par dpkg',
        },
        {
          kind: 'cmd',
          code: 'dpkg --set-selections < sauvegarde.txt',
          note: 'Restaurer la liste des paquets depuis la sauvegarde',
        },
        {
          kind: 'cmd',
          code: 'sudo apt-get dselect-upgrade',
          note: 'Appliquer les changements avec APT, synchroniser le système',
        },
        { kind: 'h3', text: 'Automatiser les mises à jour avec Cron' },
        {
          kind: 'code',
          title: 'sudo crontab -e',
          code: `0 2 * * * /usr/bin/apt update && /usr/bin/apt upgrade -y
# Exécute les mises à jour tous les jours à 02h00`,
        },
        { kind: 'h3', text: 'Audit, logs et dépannage' },
        {
          kind: 'table',
          headers: ['Fichier / Outil', 'Rôle'],
          rows: [
            ['/var/log/dpkg.log', 'Logs de dpkg'],
            ['/var/log/yum.log', 'Logs de yum'],
            ['/var/log/dnf.log', 'Logs de dnf'],
            ['/var/log/apt/history.log', '**Historique** des actions APT'],
            ['/var/log/apt/term.log', '**Détail des sorties** (messages) des commandes APT'],
            ['rpm -Va', 'Vérifie l’**intégrité** des paquets RPM'],
            ['dpkg --audit', 'Vérifie les paquets **défectueux**'],
          ],
        },
        { kind: 'h3', text: 'Problèmes courants' },
        {
          kind: 'table',
          headers: ['Problème', 'Solution'],
          rows: [
            ['Cache corrompu', 'sudo apt clean'],
            ['Fichier verrouillé', 'sudo fuser -v /var/lib/dpkg/lock'],
          ],
        },
      ],
    },
  ],
};
