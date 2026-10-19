import type { CourseModule } from '@/types/course';

export const module1: CourseModule = {
  id: 1,
  slug: 'metier-administrateur',
  title: "Introduction au métier d'administrateur",
  subtitle: "Domaines d'intervention, activités, compétences, droits & devoirs, certifications, normes et lois",
  icon: 'UserCog',
  accent: 'emerald',
  sections: [
    {
      id: 'm1-domaines',
      title: "1. Domaines d'intervention d'un administrateur",
      blocks: [
        {
          kind: 'p',
          text: "L'administrateur systèmes et réseaux intervient sur **l'ensemble du patrimoine informatique** de l'entreprise. Son rôle couvre six grands domaines complémentaires, qui vont de l'installation matérielle jusqu'au support utilisateur. Voici la liste exhaustive des domaines d'intervention présentés dans le cours :",
        },
        {
          kind: 'table',
          headers: ['Domaine', 'Missions détaillées', 'Technologies citées'],
          rows: [
            ['🖥️ Systèmes', "Installation, configuration et maintenance des systèmes", 'Linux, Windows Server, Unix'],
            ['🌐 Réseaux', 'Supervision, sécurité, gestion des VLAN, VPN, pare-feu', 'VLAN, VPN, Firewall'],
            ['🔒 Sécurité', 'Sauvegarde, restauration, gestion des accès, conformité RGPD', 'RGPD, backups'],
            ['🗄️ Bases de données', 'Administration des bases de données', 'SQL, Oracle'],
            ['☁️ Virtualisation & Cloud', 'Gestion de machines virtuelles et services cloud', 'VMware, Docker, AWS, Azure'],
            ['🛠️ Support technique', "Gestion des incidents, helpdesk, maintenance", 'Helpdesk, tickets'],
          ],
        },
        {
          kind: 'note',
          variant: 'info',
          text: "💡 À retenir : l'administrateur est un métier **stratégique et polyvalent** — il touche à tout le système d'information, du disque dur jusqu'à l'application utilisateur.",
        },
      ],
    },
    {
      id: 'm1-cas-pratique-surveillance',
      title: "2. Cas pratique : surveillance d'un serveur web",
      blocks: [
        {
          kind: 'example',
          title: '📌 Contexte',
          text: "Une entreprise héberge son site vitrine et son application interne sur un serveur web **Apache (Linux)**. Les utilisateurs se plaignent parfois de **lenteurs aux heures de pointe**. L'administrateur doit mettre en place une stratégie de **surveillance proactive** afin d'anticiper les problèmes et éviter une panne complète.",
        },
        { kind: 'h3', text: 'Objectifs pédagogiques' },
        {
          kind: 'list',
          items: [
            'Mettre en place un outil de supervision.',
            'Collecter et analyser les métriques critiques.',
            'Définir des seuils d’alerte.',
            'Proposer un plan d’action préventif.',
          ],
        },
        { kind: 'h3', text: 'Travail demandé' },
        {
          kind: 'steps',
          items: [
            { title: 'Étape 1 — Installer un outil de monitoring', text: 'Exemples : Nagios, Zabbix ou Grafana.' },
            { title: 'Étape 2 — Surveiller les métriques critiques', text: 'CPU, RAM, Stockage, temps de réponse du serveur en millisecondes (ms).' },
            { title: 'Étape 3 — Définir des seuils d’alerte', text: 'Au-delà d’un seuil, une alerte est déclenchée automatiquement.' },
            { title: 'Étape 4 — Mettre en place des notifications', text: 'Par email ou SMS.' },
            { title: 'Étape 5 — Proposer un plan d’action préventif', text: "1) Optimisation des logs et nettoyage disque. 2) Augmentation des ressources serveur (RAM/CPU). 3) Mise en place d'un load balancer si nécessaire." },
          ],
        },
      ],
    },
    {
      id: 'm1-activites',
      title: '3. Activités liées à l’administration',
      blocks: [
        {
          kind: 'p',
          text: "Les activités quotidiennes de l'administrateur sont réparties en cinq grandes catégories. Elles structurent son planning et couvrent l'ensemble du cycle de vie du système d'information :",
        },
        {
          kind: 'list',
          items: [
            '**Installation et configuration** des serveurs',
            '**Supervision & monitoring** : Nagios, Zabbix, Grafana',
            '**Gestion des utilisateurs et permissions** : Active Directory',
            '**Gestion des sauvegardes** & Plan de continuité et reprise d’activité (PRA/PCA)',
            '**Documentation et reporting**',
          ],
        },
        { kind: 'h3', text: 'Tableau des activités hebdomadaires' },
        {
          kind: 'table',
          headers: ['Jour', 'Activités principales', 'Outils utilisés', 'Objectif'],
          rows: [
            ['Lundi', 'Supervision des serveurs et réseaux, vérification des sauvegardes', 'Nagios, Zabbix, Veeam', 'Assurer la continuité de service'],
            ['Mardi', 'Gestion des utilisateurs et droits (création, suppression, mises à jour)', 'Active Directory, LDAP', 'Sécurité et conformité'],
            ['Mercredi', 'Mises à jour systèmes & patchs de sécurité', 'WSUS, Ansible, apt/yum', 'Renforcer la sécurité'],
            ['Jeudi', 'Documentation, reporting mensuel, analyse logs', 'Grafana, ELK, Excel', 'Traçabilité et suivi'],
            ['Vendredi', 'Tests PRA/PCA (plan de reprise), audit interne sécurité', 'VMware, scripts PowerShell', 'Préparation aux incidents'],
            ['Samedi', 'Support technique avancé & résolution incidents', 'Helpdesk, tickets GLPI', 'Assistance utilisateurs'],
            ['Dimanche', 'Astreinte ou veille technologique', 'Portails RSS, veille cybersécurité', 'Anticipation des évolutions'],
          ],
          caption: 'Planning type d’une semaine d’un administrateur systèmes',
        },
      ],
    },
    {
      id: 'm1-competences',
      title: '4. Compétences requises',
      blocks: [
        { kind: 'h3', text: 'Hard Skills (compétences techniques)' },
        {
          kind: 'list',
          items: [
            '**OS & Réseaux** : maîtrise des systèmes d’exploitation et du réseau',
            '**Sécurité** : normes ISO 27001, RGPD',
            '**Scripting** : Bash, PowerShell, Python',
          ],
        },
        { kind: 'h3', text: 'Soft Skills (compétences humaines)' },
        {
          kind: 'list',
          items: [
            '**Rigueur, communication, organisation**',
            '**Veille technologique** (voir définition ci-dessous)',
            '**Gestion du stress**',
          ],
        },
        {
          kind: 'def',
          term: 'Veille technologique',
          text: "Processus stratégique **continu** de collecte, d'analyse et de diffusion d'informations sur les innovations et les tendances scientifiques et techniques d'un domaine donné, afin d'**anticiper les changements**, de **stimuler l'innovation** et de **maintenir la compétitivité** de l'entreprise.",
        },
        {
          kind: 'def',
          term: 'ISO 27001',
          text: "Norme internationale définissant les exigences pour un **Système de Management de la Sécurité de l'Information (SMSI)**, permettant aux organisations de protéger leurs données et de gérer les risques liés à la sécurité de l'information.",
        },
        {
          kind: 'def',
          term: 'RGPD',
          text: "**Règlement Général sur la Protection des Données** — texte législatif européen qui harmonise et renforce les règles de traitement des données personnelles au sein de l'UE depuis **mai 2018**.",
        },
      ],
    },
    {
      id: 'm1-droits-devoirs',
      title: '5. Droits et devoirs de l’administrateur',
      blocks: [
        {
          kind: 'table',
          headers: ['Droits ✅', 'Devoirs ⚖️'],
          rows: [
            ['Accès aux systèmes', 'Confidentialité & respect des lois'],
            ['Décision en matière de sécurité', 'Éthique professionnelle'],
            ['', 'Documentation claire'],
          ],
        },
        {
          kind: 'note',
          variant: 'warn',
          text: '⚠️ Le pouvoir d’accès total s’accompagne d’une responsabilité égale : un administrateur doit être irréprochable sur la confidentialité et l’éthique.',
        },
      ],
    },
    {
      id: 'm1-certifications',
      title: '6. Intérêts de la certification',
      blocks: [
        {
          kind: 'list',
          items: [
            '**Reconnaissance internationale**',
            '**Opportunités professionnelles**',
            '**Validation des compétences**',
          ],
        },
        {
          kind: 'table',
          headers: ['Domaine', 'Exemples de certifications'],
          rows: [
            ['Linux', 'LPIC-1, RHCSA'],
            ['Microsoft', 'Azure Admin'],
            ['Sécurité', 'Security+, CEH'],
          ],
        },
      ],
    },
    {
      id: 'm1-normes-lois',
      title: '7. Normes ISO & textes de lois',
      blocks: [
        {
          kind: 'table',
          headers: ['Norme / Loi', 'Objet'],
          rows: [
            ['ISO/IEC 27001', 'Sécurité des systèmes d’information (SMSI)'],
            ['ISO/IEC 20000', 'Gestion des services IT'],
            ['RGPD (UE 2016/679)', 'Protection des données personnelles dans l’UE'],
            ['Loi tunisienne 2004-63', 'Protection des données personnelles en Tunisie'],
          ],
        },
        { kind: 'h3', text: 'ISO/IEC 20000 — Gestion des services IT' },
        {
          kind: 'p',
          text: "Norme internationale qui définit les exigences pour **établir, mettre en œuvre, maintenir et améliorer** un système de gestion des services (SMS).",
        },
        {
          kind: 'list',
          items: [
            '**Objectif 1 :** Aligner les services IT avec les besoins métiers.',
            '**Objectif 2 :** Améliorer la qualité et la continuité des services.',
            '**Objectif 3 :** Réduire les coûts liés aux incidents et interruptions.',
          ],
        },
        {
          kind: 'p',
          text: '**Domaines couverts :** gestion des incidents et problèmes · gestion des changements et des configurations · gestion de la continuité et disponibilité · amélioration continue.',
        },
        { kind: 'h3', text: 'RGPD — Articles clés' },
        {
          kind: 'example',
          title: 'Citation (Art. 32 RGPD)',
          text: '« Le responsable du traitement et le sous-traitant mettent en œuvre des mesures techniques et organisationnelles appropriées afin de garantir un niveau de sécurité adapté au risque. »',
        },
        {
          kind: 'table',
          headers: ['Article', 'Contenu'],
          rows: [
            ['Article 5', 'Les données doivent être traitées de manière **licite, loyale et transparente**.'],
            ['Article 32', "Obligation de mesures **techniques et organisationnelles** pour assurer la sécurité : **chiffrement, sauvegarde, tests réguliers**."],
            ['Article 33', "**Notification des violations** de données personnelles sous **72 heures**."],
          ],
        },
        { kind: 'h3', text: 'Loi tunisienne n°2004-63' },
        {
          kind: 'list',
          items: [
            'Nécessité d’obtenir le **consentement** avant tout traitement de données personnelles.',
            'Obligation de **déclaration auprès de l’INPDP** (Instance Nationale de Protection des Données Personnelles).',
            '**Interdiction de transférer** des données personnelles vers un pays n’assurant pas un niveau de protection adéquat.',
            '**Sanctions pénales** en cas de non-respect.',
          ],
        },
      ],
    },
    {
      id: 'm1-cas-panne',
      title: '8. Étude de cas : panne serveur & plan d’action',
      blocks: [
        {
          kind: 'example',
          title: '📌 Mise en situation',
          text: "**Vendredi matin**, le serveur principal d'une entreprise (hébergeant la **messagerie + ERP**) tombe en panne suite à une **défaillance matérielle du disque dur**. Impact : **80 utilisateurs bloqués**, interruption de service critique.",
        },
        { kind: 'h3', text: "Plan d'action de l'administrateur" },
        {
          kind: 'steps',
          items: [
            { title: '1. Identification du problème', text: 'Vérifier les journaux systèmes ; diagnostiquer la panne (hardware / software).' },
            { title: '2. Communication', text: 'Informer la direction et les utilisateurs du problème et du délai estimé.' },
            { title: '3. Mise en place du PRA', text: 'Activer le serveur de secours (réplication / virtualisation) ; restaurer les données depuis la dernière sauvegarde.' },
            { title: '4. Suivi et vérification', text: 'Contrôler l’intégrité des données restaurées ; vérifier les accès utilisateurs et les performances.' },
            { title: '5. Documentation & retour d’expérience', text: 'Rédiger un rapport d’incident ; mettre à jour les procédures pour éviter que cela se reproduise.' },
          ],
        },
      ],
    },
    {
      id: 'm1-cas-ransomware',
      title: '9. Étude de cas : attaque ransomware',
      blocks: [
        {
          kind: 'example',
          title: '📌 Mise en situation',
          text: "Un **lundi matin**, plusieurs utilisateurs signalent qu'ils n'arrivent plus à ouvrir leurs fichiers : tous les documents sont **chiffrés**, un **message de rançon** (demande de paiement en cryptomonnaie) s'affiche, et le **serveur de fichiers** de l'entreprise est impacté.",
        },
        { kind: 'h3', text: "Plan d'action de l'administrateur" },
        {
          kind: 'steps',
          items: [
            { title: '1. Isolement immédiat', text: 'Déconnecter les machines infectées du réseau.' },
            { title: '2. Analyse et identification', text: 'Vérifier les journaux systèmes pour déterminer l’origine de l’attaque ; identifier l’utilisateur et le vecteur d’infection (phishing, clé USB, etc.).' },
            { title: '3. Restauration et continuité', text: '**Ne pas payer la rançon** ; effacer les systèmes compromis et restaurer les données depuis les sauvegardes sécurisées (non connectées au réseau).' },
            { title: '4. Communication', text: 'Informer la direction, l’équipe de sécurité et éventuellement les autorités compétentes ; prévenir les utilisateurs et donner des consignes.' },
            { title: '5. Prévention future', text: 'Mettre à jour les correctifs de sécurité ; renforcer la politique de sauvegarde (tests réguliers de restauration) ; sensibiliser les utilisateurs (campagnes anti-phishing).' },
          ],
        },
        {
          kind: 'note',
          variant: 'danger',
          text: '🚫 Règle d’or face au ransomware : **ne jamais payer la rançon** — on restaure depuis des sauvegardes saines et déconnectées du réseau.',
        },
      ],
    },
    {
      id: 'm1-conclusion',
      title: '10. Conclusion du module',
      blocks: [
        {
          kind: 'list',
          items: [
            "Un métier **stratégique et polyvalent**",
            'Nécessite des compétences **techniques + éthiques**',
            '**Certifications et normes** = valeur ajoutée',
            'Importance du **respect des lois** et de la **sécurité**',
          ],
        },
      ],
    },
  ],
};
