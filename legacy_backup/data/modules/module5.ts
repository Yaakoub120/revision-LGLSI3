import type { CourseModule } from '@/types/course';

export const module5: CourseModule = {
  id: 6,
  slug: 'gestion-utilisateurs',
  title: 'Gestion des utilisateurs',
  subtitle: '/etc/passwd, /etc/shadow, groupes, permissions, umask, PAM, quotas disque, scripts d’automatisation',
  icon: 'Users',
  accent: 'rose',
  sections: [
    {
      id: 'm5-intro',
      title: '1. Introduction et concepts fondamentaux',
      blocks: [
        {
          kind: 'p',
          text: '**Objectifs du module :** comprendre les fichiers de configuration utilisateur · savoir créer, modifier et supprimer des comptes · gérer les permissions et les **quotas disque**.',
        },
        { kind: 'h3', text: 'Rôle de l’administrateur système' },
        {
          kind: 'list',
          items: [
            'Maintenir la **sécurité et la stabilité** du système',
            'Créer et gérer les **utilisateurs et groupes**',
            'Gérer les **droits d’accès** et la confidentialité',
            'Surveiller les **ressources** et appliquer des quotas',
          ],
        },
        { kind: 'h3', text: 'Concepts fondamentaux' },
        {
          kind: 'table',
          headers: ['Concept', 'Définition'],
          rows: [
            ['Utilisateur', 'Entité identifiée par un **UID** (User ID)'],
            ['Groupe', 'Ensemble d’utilisateurs **partageant des droits**'],
            ['UID / GID', 'Identifiants numériques uniques utilisateur / groupe'],
            ['Superutilisateur (root)', 'Compte avec tous les droits — UID 0'],
            ['Utilisateurs standards', 'Comptes avec droits limités'],
          ],
        },
        { kind: 'diagram', id: 'user-group', caption: 'Utilisateurs, groupes et droits d’accès aux ressources' },
      ],
    },
    {
      id: 'm5-fichiers',
      title: '2. Les fichiers de configuration',
      blocks: [
        { kind: 'diagram', id: 'passwd-anatomy', caption: 'Anatomie d’une ligne de /etc/passwd : 7 champs séparés par « : »' },
        {
          kind: 'def',
          term: '/etc/passwd',
          text: 'Fichier de configuration **fondamental** des systèmes Unix/Linux contenant les informations essentielles sur les comptes d’utilisateurs.',
        },
        {
          kind: 'code',
          title: 'Format de /etc/passwd (7 champs)',
          code: `nom:x:UID:GID:infoComplementaire:répertoire_perso:shell

# Exemple :
etudiant:x:1001:1001:Etudiant:/home/etudiant:/bin/bash`,
        },
        {
          kind: 'def',
          term: '/etc/shadow',
          text: "Contrairement à /etc/passwd qui est **public**, /etc/shadow n'est accessible **qu'à l'utilisateur root**. Il contient les **mots de passe chiffrés** et les politiques de sécurité.",
        },
        {
          kind: 'code',
          title: 'Format de /etc/shadow',
          code: `nom:motdepasse:lastchg:min:max:warn:inactive:expire

# lastchg   : dernier changement du mot de passe
# min       : nb de jours MINI avant de pouvoir rechanger le mot de passe
# max       : nb de jours MAXI après lequel le mot de passe doit être changé
# warn      : période d'avertissement
# inactive  : période d'inactivité
# expire    : date d'expiration
# (+ champ réservé)`,
        },
        {
          kind: 'def',
          term: '/etc/group et /etc/gshadow',
          text: '/etc/group contient les **informations de base** sur les groupes ; /etc/gshadow stocke de manière **sécurisée** les données sensibles des groupes (mots de passe de groupes).',
        },
        { kind: 'h3', text: '/etc/login.defs et /etc/default/useradd' },
        {
          kind: 'p',
          text: 'Ces deux fichiers définissent le **comportement par défaut lors de la création** de nouveaux utilisateurs :',
        },
        {
          kind: 'list',
          items: [
            '**/etc/login.defs** : paramètres globaux de sécurité — UID_MIN, UID_MAX, PASS_MAX_DAYS, PASS_MIN_DAYS.',
            '**/etc/default/useradd** : paramètres par défaut de useradd — HOME, SHELL (souvent /bin/bash), CREATE_HOME.',
            '**SKEL :** répertoire /etc/skel contenant les **fichiers modèles** copiés dans le répertoire personnel — créé automatiquement avec l’option **-m** de useradd.',
          ],
        },
        { kind: 'h3', text: 'Commandes d’exploration' },
        {
          kind: 'cmd',
          code: 'cat /etc/passwd',
          note: 'Lister les utilisateurs avec leurs informations de base',
        },
        {
          kind: 'cmd',
          code: "grep 'etudiant' /etc/passwd",
          note: 'Chercher uniquement les lignes contenant « etudiant »',
        },
        {
          kind: 'cmd',
          code: 'cut -d: -f1 /etc/passwd',
          note: 'Extraire les noms d’utilisateurs — -d: = séparateur « : », -f1 = 1er champ',
        },
        {
          kind: 'cmd',
          code: 'less /etc/shadow',
          note: 'Consulter /etc/shadow de manière sécurisée et paginée',
        },
      ],
    },
    {
      id: 'm5-crud',
      title: '3. Créer, modifier, supprimer des utilisateurs',
      blocks: [
        { kind: 'h3', text: 'Création' },
        {
          kind: 'cmd',
          code: 'sudo useradd -m -s /bin/bash etudiant',
          note: '-m : crée le dossier /home/etudiant · -s : définit le shell',
        },
        { kind: 'h3', text: 'Modification' },
        {
          kind: 'cmd',
          code: 'sudo usermod -s /bin/zsh etudiant',
          note: 'Change le shell',
        },
        {
          kind: 'cmd',
          code: 'sudo usermod -d /home/newhome etudiant',
          note: 'Change le répertoire personnel',
        },
        { kind: 'h3', text: 'Suppression' },
        {
          kind: 'cmd',
          code: 'sudo userdel etudiant',
          note: 'Supprime le compte',
        },
        {
          kind: 'cmd',
          code: 'sudo userdel -r etudiant',
          note: 'Supprime aussi le répertoire personnel',
        },
        { kind: 'h3', text: 'Informations utilisateur' },
        {
          kind: 'table',
          headers: ['Commande', 'Rôle principal'],
          rows: [
            ['id user', 'Identité et groupes d’un utilisateur'],
            ['who / w', 'Utilisateurs actuellement connectés'],
            ['last', 'Historique des connexions'],
            ['finger user', 'Informations détaillées sur un utilisateur'],
          ],
        },
        { kind: 'h3', text: 'Profils utilisateurs : /etc/skel' },
        {
          kind: 'p',
          text: 'Le dossier **/etc/skel** contient les **fichiers modèles** utilisés lors de la création d’un nouvel utilisateur. Il permet de **personnaliser les environnements par défaut**.',
        },
        {
          kind: 'cmd',
          code: 'ls -a /etc/skel',
          note: 'Voir le contenu du squelette (fichiers cachés inclus)',
        },
      ],
    },
    {
      id: 'm5-groupes',
      title: '4. Gestion des groupes',
      blocks: [
        {
          kind: 'p',
          text: 'Un **groupe** est un ensemble d’utilisateurs qui partagent des droits ou des ressources communes.',
        },
        {
          kind: 'cmd',
          code: 'sudo groupadd developpeurs',
          note: 'Créer un groupe',
        },
        {
          kind: 'cmd',
          code: 'sudo groupmod -n dev developpeurs',
          note: 'Renommer « developpeurs » en « dev »',
        },
        {
          kind: 'cmd',
          code: 'sudo groupdel dev',
          note: 'Supprimer le groupe',
        },
        { kind: 'h3', text: 'Ajouter plusieurs utilisateurs à un groupe' },
        {
          kind: 'cmd',
          code: 'sudo usermod -aG projetA alice',
          note: 'Ajoute alice au groupe projetA (-aG = append + group)',
        },
        {
          kind: 'cmd',
          code: 'sudo usermod -aG projetA bob',
          note: 'Ajoute bob au groupe projetA',
        },
        { kind: 'h3', text: 'Donner au groupe accès à un dossier' },
        {
          kind: 'cmd',
          code: 'sudo chown :projetA /srv/projetA',
          note: 'Change le groupe propriétaire du dossier',
        },
        {
          kind: 'cmd',
          code: 'sudo chmod 770 /srv/projetA',
          note: 'rwx pour propriétaire et groupe, rien pour les autres',
        },
        { kind: 'h3', text: 'Bonnes pratiques de gestion des groupes' },
        {
          kind: 'list',
          items: [
            'Créer des **groupes logiques** (ex : web, dev, admin)',
            '**Éviter** les utilisateurs dans trop de groupes',
            'Utiliser les **permissions de groupe** correctement',
          ],
        },
      ],
    },
    {
      id: 'm5-motsdepasse',
      title: '5. Gestion des mots de passe et sécurité',
      blocks: [
        {
          kind: 'cmd',
          code: 'sudo passwd etudiant',
          note: 'Définir ou modifier un mot de passe',
        },
        {
          kind: 'cmd',
          code: 'sudo chage -l etudiant',
          note: 'Vérifier la validité du mot de passe',
        },
        {
          kind: 'cmd',
          code: 'sudo chage -M 90 etudiant',
          note: 'Définir une expiration à 90 jours',
        },
        { kind: 'h3', text: 'Politiques de sécurité' },
        {
          kind: 'list',
          items: [
            '**/etc/login.defs** : définit la longueur et la durée des mots de passe',
            '**pam_pwquality** : gère la complexité des mots de passe',
            'Fichier de configuration : **/etc/security/pwquality.conf**',
          ],
        },
        { kind: 'h3', text: 'Surveillance des connexions' },
        {
          kind: 'table',
          headers: ['Outil', 'Fonction'],
          rows: [
            ['faillog', 'Affiche le nombre d’**échecs** de connexion pour chaque utilisateur'],
            ['lastlog', 'Affiche la **dernière connexion réussie** de chaque utilisateur'],
            ['sudo pam_tally2', '**Verrouillage** après échecs répétés'],
          ],
        },
        { kind: 'h3', text: 'Bonnes pratiques' },
        {
          kind: 'list',
          items: [
            'Forcer le **changement périodique** de mot de passe',
            '**Interdire** les mots de passe faibles',
            '**Surveiller** les comptes inactifs',
          ],
        },
      ],
    },
    {
      id: 'm5-permissions',
      title: '6. Permissions, ownership et umask',
      blocks: [
        { kind: 'diagram', id: 'permissions', caption: 'Lecture des permissions : -rw-r--r-- → type, propriétaire (u), groupe (g), autres (o)' },
        { kind: 'h3', text: 'Lecture des permissions' },
        {
          kind: 'cmd',
          code: 'ls -l',
          note: 'Exemple de sortie : -rw-r--r-- 1 alice dev 1024 Oct 28 12:00 fichier.txt',
        },
        { kind: 'h3', text: 'Modifier les permissions : chmod' },
        {
          kind: 'cmd',
          code: 'chmod u+x fichier.txt',
          note: 'Ajoute le droit **exécution** au **propriétaire**',
        },
        {
          kind: 'cmd',
          code: 'chmod g-w fichier.txt',
          note: 'Retire le droit **écriture** au **groupe**',
        },
        {
          kind: 'cmd',
          code: 'chmod 755 fichier.txt',
          note: 'rwx pour propriétaire, r-x pour groupe et autres',
        },
        {
          kind: 'note',
          variant: 'tip',
          text: '💡 Bonnes pratiques : fichiers personnels → **600** · dossiers partagés → **770 ou 775**',
        },
        { kind: 'h3', text: 'Modifier propriétaire et groupe : chown / chgrp' },
        {
          kind: 'cmd',
          code: 'sudo chown alice fichier.txt',
          note: 'Change le propriétaire',
        },
        {
          kind: 'cmd',
          code: 'sudo chgrp dev fichier.txt',
          note: 'Change le groupe',
        },
        {
          kind: 'cmd',
          code: 'sudo chown alice:dev fichier.txt',
          note: 'Change les deux en une commande',
        },
        { kind: 'h3', text: 'umask — permissions par défaut' },
        {
          kind: 'p',
          text: 'umask définit les **permissions par défaut** lors de la création de fichiers/dossiers :',
        },
        {
          kind: 'table',
          headers: ['umask', 'Résultat'],
          rows: [
            ['umask 022', 'Fichiers **644**, dossiers **755** (valeur standard)'],
            ['umask 077', 'Fichiers **privés** (600)'],
            ['umask 002', 'Fichiers **partagés** (664)'],
          ],
        },
      ],
    },
    {
      id: 'm5-outils',
      title: '7. Outils d’administration, PAM et centralisation',
      blocks: [
        { kind: 'h3', text: 'Interfaces graphiques' },
        {
          kind: 'list',
          items: ['GNOME, KDE, XFCE → gestion utilisateurs via GUI', '**Webmin** → interface web d’administration'],
        },
        { kind: 'h3', text: 'Outils centralisés' },
        {
          kind: 'table',
          headers: ['Outil', 'Rôle'],
          rows: [
            ['**LDAP**', 'Annuaire centralisé, authentification globale'],
            ['**NIS**', 'Ancien système de gestion réseau des utilisateurs'],
            ['**Kerberos**', 'Authentification sécurisée par **tickets**'],
          ],
        },
        { kind: 'h3', text: 'PAM — Pluggable Authentication Modules' },
        {
          kind: 'def',
          term: 'PAM',
          text: "Infrastructure **flexible** qui permet aux systèmes d'exploitation de gérer l'authentification des utilisateurs de manière **centralisée et configurable**, sans avoir à modifier le code des applications. Les administrateurs personnalisent l'authentification pour un service en modifiant ses fichiers de configuration dans **/etc/pam.d**.",
        },
        {
          kind: 'note',
          variant: 'tip',
          text: '💡 Bonne pratique : sauvegarder **/etc/passwd, /etc/shadow et /etc/group** régulièrement.',
        },
      ],
    },
    {
      id: 'm5-scripts',
      title: '8. Automatisation avec scripts Bash',
      blocks: [
        { kind: 'h3', text: 'Création d’utilisateurs depuis un CSV' },
        {
          kind: 'code',
          lang: 'bash',
          title: 'Script de création en masse',
          code: `while IFS=, read -r user pwd; do
  sudo useradd -m -s /bin/bash "$user"
  echo "$user:$pwd" | sudo chpasswd
done < utilisateurs.csv`,
        },
        { kind: 'h3', text: 'Script de sauvegarde des comptes' },
        {
          kind: 'code',
          lang: 'bash',
          code: `#!/bin/bash
cp /etc/passwd /backup/passwd_$(date +%F).bak
cp /etc/shadow /backup/shadow_$(date +%F).bak
echo "Sauvegarde effectuée $(date)"`,
        },
        { kind: 'h3', text: 'Script de suppression des utilisateurs inactifs' },
        {
          kind: 'code',
          lang: 'bash',
          code: `#!/bin/bash
for user in $(awk -F: '$3>=1000 {print $1}' /etc/passwd); do
  lastlog -u $user | grep -q 'Never logged in' && sudo userdel -r $user
done`,
        },
        {
          kind: 'p',
          text: "**Explication :** `awk -F: '$3>=1000 {print $1}'` sélectionne les utilisateurs dont l'UID ≥ 1000 (comptes humains, pas les comptes système), puis `lastlog` vérifie s'ils ne se sont jamais connectés.",
        },
      ],
    },
    {
      id: 'm5-quotas',
      title: '9. Quotas disque',
      blocks: [
        {
          kind: 'p',
          text: '**Objectif :** limiter l’espace disque d’un utilisateur ou d’un groupe — évite qu’un utilisateur **monopolise tout le stockage**.',
        },
        { kind: 'diagram', id: 'quota', caption: 'Quota disque : soft limit (avertissement) vs hard limit (blocage)' },
        { kind: 'h3', text: 'Activer la gestion des quotas' },
        {
          kind: 'cmd',
          code: 'sudo quotacheck -cum /home',
          note: 'Analyse le système de fichiers (-c crée, -u utilisateurs, -m)',
        },
        {
          kind: 'cmd',
          code: 'sudo quotaon /home',
          note: 'Active les quotas',
        },
        { kind: 'h3', text: 'Édition et affichage' },
        {
          kind: 'cmd',
          code: 'sudo edquota etudiant',
          note: 'Modifier les quotas d’un utilisateur',
        },
        {
          kind: 'cmd',
          code: 'repquota /home',
          note: 'Afficher les rapports de quotas',
        },
        { kind: 'h3', text: 'Application pratique : limiter l’espace disque' },
        {
          kind: 'steps',
          items: [
            { title: '1. Activer les quotas', text: 'quotaon /home' },
            { title: '2. Attribuer un quota', text: 'edquota etudiant' },
            { title: '3. Définir la soft limit', text: '500M — avertissement au-delà' },
            { title: '4. Définir la hard limit', text: '550M — blocage strict au-delà' },
          ],
        },
        {
          kind: 'list',
          items: [
            '**Vérification :** repquota /home et quota -u etudiant',
            '**Tester** la limitation en créant des fichiers',
          ],
        },
        {
          kind: 'note',
          variant: 'warn',
          text: '⚠️ Erreurs fréquentes : oublier d’activer **quotaon**, mauvaise unité (K/M/G).',
        },
        { kind: 'h3', text: 'Cas d’usage des quotas' },
        {
          kind: 'table',
          headers: ['Cas d’usage', 'Action'],
          rows: [
            ['Plusieurs étudiants sur le même serveur', 'Activer le quota sur /home et définir une limite par utilisateur'],
            ['Serveur web multi-sites dans /var/www', 'Activer le quota sur /var pour limiter chaque compte FTP'],
            ['Projet commun entre développeurs', 'Activer le quota de groupe sur /srv/projet'],
          ],
        },
      ],
    },
  ],
};
