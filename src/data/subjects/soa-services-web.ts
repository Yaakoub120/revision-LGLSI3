import type { Subject } from "@/lib/learn-types";

// ═══════════════════════════════════════════════════════════════════════════
// SUJET 9 — ARCHITECTURE SOA & SERVICES WEB (FSM · LGLSI3)
// Support : Cours.pdf — Dr. Ghada Feki, Maître Assistante à la Faculté des
// Sciences de Monastir — 3ème année Licence Génie Logiciel et Système
// d'information. 279 diapositives intégrales extraites (texte + rendu
// visuel des pages imagées).
// Plan : 1 Introduction · 2 Les Services · 3 Web Services SOAP ·
// 4 Web Services REST · (Web Services gRPC, numéroté « Chapitre 4 » dans
// les slides) · 5 Orchestration & Chorégraphie. + QCM (20 questions) et
// vidéos listés dans le support.
// Contenu intégral : définitions, 8 aspects d'un service, pile protocolaire
// SOAP complète (HTTP, XML, SOAP 9 principes, WSDL, UDDI), tous les exemples
// XML (enveloppes 1.1/1.2, headers, Fault, attachements MIME, SoapUI),
// REST/JAX-RS avec tous les codes, gRPC/protobuf, BPMN/BPEL/WS-CDL.
// ═══════════════════════════════════════════════════════════════════════════

export const soaServicesWeb: Subject = {
  id: "soa",
  name: "Architecture SOA & Services Web",
  shortName: "SOA & WS",
  teacher: "Dr. Ghada Feki — FSM · LGLSI3",
  icon: "Workflow",
  gradient: "from-blue-500 via-indigo-500 to-violet-600",
  accent: "#3b82f6",
  description:
    "Faire communiquer des applications hétérogènes : problématique d'intégration (spaghetti, EAI), architecture orientée services et ses 8 aspects (contrat, couplage lâche, abstraction, réutilisabilité, autonomie, stateless, découvrabilité, composabilité), Web Services SOAP (pile HTTP/XML/SOAP/WSDL/UDDI, enveloppes, Fault, WS-*), REST (Fielding, ressources, CRUD, JAX-RS), gRPC (protobuf, HTTP/2, streaming) et Orchestration vs Chorégraphie (BPEL, WS-CDL).",
  chapters: [
    // ──────────────── CHAPITRE 1 : INTRODUCTION ────────────────
    {
      id: "soa1-intro",
      title: "Chapitre 1 — Introduction",
      summary:
        "Problématique de l'intégration d'applications (approche spaghetti, EAI, limites), naissance des services web, définitions (service, service web, SOA), avantages/inconvénients, top business, concepts et acteurs d'une architecture SOA, fonctionnement, comparaison SOA vs programmation distribuée et POO, niveau d'abstraction grandissant, approches Bottom-Up/Top-down et bilan SOA.",
      sections: [
        {
          heading: "Problématique : faire communiquer des applications indépendantes",
          blocks: [
            { type: "p", text: "Un système d'information d'entreprise est un assemblage d'applications indépendantes. Il y a un besoin de communication, d'échange entre ces applications et d'intégration de nouvelles applications généralement hétérogènes." },
            { type: "p", text: "Parmi les solutions existantes pour faire communiquer ces applications indépendantes, et intégrer de nouvelles applications, on trouve : l'approche spaghetti — une communication point à point — et l'EAI (Enterprise Application Integration)." },
            { type: "p", text: "L'EAI vient remplacer l'approche spaghetti et alléger l'architecture d'interconnexion en mettant à la disposition des applications un nœud central de communication. Elle consiste à réunir les différents programmes d'une organisation au sein d'un même espace." },
            { type: "callout", variant: "warn", title: "Limites de ces solutions", text: "Développement coûteux · Interconnexions redondantes · Grande complexité · Réutilisation et maintenance difficiles." },
          ],
        },
        {
          heading: "Solution : la naissance des services Web",
          blocks: [
            { type: "p", text: "La solution est la naissance de la notion des services Web qui :" },
            { type: "list", items: [
              "Garantit l'interopérabilité.",
              "Fait interagir des composants hétérogènes, distants, et indépendants.",
              "Simplifie la communication entre ces composants.",
              "Se base sur des technologies qui existent déjà (XML, HTTP).",
            ] },
          ],
        },
        {
          heading: "Définitions : service, service web, architecture SOA",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Service", v: "« Un service est un comportement défini par contrat, qui peut être réalisé et fourni par tout composant pour être utilisé par tout composant sur la base unique du contrat. »" },
                { k: "Service Web", v: "entité logicielle mise à disposition sur l'internet ou sur un réseau privé, publiable et accessible en utilisant le langage XML et les protocoles standards du web. Elle est indépendante du système d'exploitation et du langage de programmation." },
                { k: "Architecture SOA", v: "(Service-Oriented Architecture) modèle de conception qui rend des composants logiciels réutilisables, grâce à des interfaces de services qui utilisent un langage commun pour communiquer via un réseau." },
              ],
            },
          ],
        },
        {
          heading: "Avantages de la SOA",
          blocks: [
            { type: "list", items: [
              "Mise sur le marché accélérée et plus grande flexibilité : le caractère réutilisable des services facilite et accélère le regroupement des applications. Les développeurs ne doivent plus repartir de zéro à chaque fois, comme c'est le cas pour les applications monolithiques.",
              "Utilisation de l'infrastructure existante sur les nouveaux marchés : grâce à l'architecture SOA, les développeurs peuvent plus facilement étendre et mettre à l'échelle les fonctionnalités d'une plateforme ou d'un environnement.",
              "Coûts réduits grâce à une meilleure agilité et à un développement plus efficace.",
              "Maintenance facilitée : les services étant autonomes et indépendants, ils peuvent être modifiés et mis à jour autant que nécessaire, sans affecter les autres services.",
              "Évolutivité : comme l'architecture SOA s'adapte à plusieurs services, plateformes et langages de programmation, l'évolutivité est considérablement accrue.",
              "Fiabilité améliorée : il est plus facile de déboguer des petits services plutôt qu'un long code, ce qui permet de créer des applications plus fiables.",
              "Grande disponibilité : les fonctions de l'architecture SOA sont à la portée de tous.",
            ] },
          ],
        },
        {
          heading: "Inconvénients de la SOA",
          blocks: [
            { type: "list", items: [
              "Assez coûteuse en termes de main-d'œuvre : plusieurs équipes d'unités informatiques et de développeurs sont nécessaires pour configurer et gérer chaque code de service. Bien que ce coût soit principalement supporté par les prestataires de services tiers, il peut en fin de compte se traduire par des coûts financiers pour l'entreprise et ses clients.",
              "Surcharge du trafic de données : dans le cadre des protocoles de sécurité, les commandes et les entrées doivent être vérifiées avant d'être transférées au tiers. À mesure que le nombre de services sur une architecture SOA augmente, le nombre d'entrées et de codes de vérification augmente également. La quantité supplémentaire de trafic de données chargera votre système.",
              "Besoin en ressources plus élevé : l'élément d'une charge de données plus élevée nécessite une bande passante plus importante pour garantir que la vitesse du réseau est suffisante pour assurer la satisfaction du client.",
            ] },
          ],
        },
        {
          heading: "Top business utilisant SOA et exemple",
          blocks: [
            { type: "list", items: [
              "Hôtels qui externalisent les services de blanchisserie et de restauration.",
              "Entreprises géantes utilisant des fournisseurs de services tiers.",
              "Tout site Web utilisant PayPal ou d'autres services de paiement.",
              "Site de vente utilisant un service de livraison en ligne.",
              "Un magasin de médias / livres utilisant iTunes, Amazon ou d'autres systèmes de vente.",
              "Le système de réservation de la SNCF (recherche d'horaire, demande de tarif, réservation…) prend en charge à la fois les terminaux des guichets des agences et gares, et les sollicitations de son site web de commande en ligne.",
            ] },
            { type: "callout", variant: "info", title: "Exemple du cours", text: "A good example would be an online food delivery service. The food delivery company can use a Paypal for payment service, FedEx for delivery, and Bluehost for Webhosting. (Un service de livraison de nourriture en ligne utilise PayPal pour le paiement, FedEx pour la livraison et Bluehost pour l'hébergement web.)" },
          ],
        },
        {
          heading: "Concepts d'une architecture SOA",
          blocks: [
            { type: "list", items: [
              "Un service web est une composante web qui possède une interface lui permettant la communication.",
              "Une interface est un ensemble de fonctions qu'on peut invoquer suivant une spécification bien définie.",
              "Un service est conçu/développé par un fournisseur et consommé par un consommateur.",
            ] },
          ],
        },
        {
          heading: "Acteurs d'une architecture SOA",
          blocks: [
            {
              type: "kv",
              items: [
                { k: "Fournisseur (Service Provider)", v: "Application s'exécutant sur un serveur et comportant un module logiciel accessible par Internet en XML. Il a accès au code source du service dans le but de faire une mise à jour ou une maintenance du service." },
                { k: "Client (Service Requester)", v: "Application cliente se liant à un service et invoquant ses fonctions par des messages XML (SOAP). Il a accès à l'interface du service pour invoquer une fonctionnalité particulière." },
                { k: "Annuaire de services (Service Registry)", v: "Annuaire des services publiés par les providers (UDDI)." },
              ],
            },
            { type: "list", items: [
              "Le fournisseur publie son service dans un registre de services.",
              "Le consommateur cherche la disponibilité d'un service particulier dans ce registre.",
              "Pour invoquer un service, le consommateur doit respecter la spécification du service (ou aussi dit son contrat).",
            ] },
            { type: "diagram", id: "soa-triangle", caption: "Les 3 acteurs SOA : déploiement, publication (publier), découverte (chercher), invocation (consommer)" },
          ],
        },
        {
          heading: "Fonctionnement : les charges de chaque acteur",
          blocks: [
            { type: "p", text: "Le fournisseur de service (Service Provider) est chargé de :" },
            { type: "list", ordered: true, items: [
              "Définir le service : implémentation, description, contrat d'utilisation.",
              "Publier sa description dans l'annuaire.",
              "Réaliser les opérations.",
            ] },
            { type: "p", text: "L'annuaire (Entrepôt) (Discovery Agency) est chargé de :" },
            { type: "list", ordered: true, items: [
              "Recevoir et enregistrer les descriptions de services publiées par les fournisseurs.",
              "Recevoir et répondre aux recherches de services lancées par les clients.",
            ] },
            { type: "p", text: "Le client (Service Requestor) est chargé de :" },
            { type: "list", ordered: true, items: [
              "Lancer la recherche sur un service approprié.",
              "Obtenir la description du service grâce à l'annuaire.",
              "Utiliser le service.",
            ] },
          ],
        },
        {
          heading: "SOA vs POO : caractéristiques et limites de la programmation orientée objets",
          blocks: [
            { type: "p", text: "La programmation orientée objets est basée sur le principe d'encapsulation d'un ensemble d'informations dans un objet doté d'un ensemble de méthodes permettant la manipulation de ses informations. Ce style de programmation a un grand avantage surtout du côté séparation du code, ce qui facilite largement les tâches suivantes du développement du logiciel." },
            { type: "callout", variant: "warn", title: "Limites de cette architecture", text: "1. Structure et architecture de l'application peu visibles. 2. Interactions entre objets enfouies dans le code. 3. Évolution / modification difficile. 4. Gestion de la consistance d'un changement délicate. 5. Granularité encore trop fine : ce qui la rend mal adaptée à la programmation à grande échelle. 6. Couplage fort : ce qui rend difficile la réutilisation et accroît la complexité des Systèmes Orientés Objet." },
          ],
        },
        {
          heading: "SOA vs applications distribuées (orientées composants)",
          blocks: [
            { type: "p", text: "Une application distribuée est formée d'un ensemble de composants logiciels qui :" },
            { type: "list", ordered: true, items: [
              "Collaborent pour l'exécution de tâches communes.",
              "Sont distants géographiquement.",
              "Sont interconnectés via un réseau de communication.",
              "Sont hétérogènes.",
              "Solutions qui ont fait leur preuve : DCOM, CORBA, EJB, RMI, .Net, …",
            ] },
            { type: "callout", variant: "warn", title: "Faiblesses de ces solutions", text: "1) Format de représentation de données spécifiques. 2) Interopérabilité uniquement si les composants utilisent la même solution. 3) Parfois elles utilisent des protocoles de transport spécifiques, ce qui nécessite une configuration spécifique du réseau. 4) Couplage fort : phénomène du plat de spaghetti." },
          ],
        },
        {
          heading: "L'architecture orientée service face aux autres paradigmes",
          blocks: [
            { type: "list", ordered: true, items: [
              "Elle partage l'aspect modulaire (ensemble de fonctionnalités qui font sens) avec la programmation orientée objets.",
              "Elle partage les caractéristiques suivantes d'un composant (application distribuée) : boîte noire (séparation interface/implémentation), indépendance de la localisation, neutralité vis-à-vis des protocoles de transport.",
              "Elle correspond à un périmètre fonctionnel que l'on souhaite exposer à des consommateurs.",
              "Services faiblement couplés (indépendants des autres services).",
              "Expose un petit nombre d'opérations offrant un traitement de bout en bout.",
              "Utilisation de standards.",
              "Pas de remise en cause de l'existant lors d'évolutions technologiques.",
              "Découplage entre fournisseur et consommateur de services.",
            ] },
            { type: "diagram", id: "soa-abstraction", caption: "Niveau d'abstraction grandissant : procédurale → objets → composants → services" },
          ],
        },
        {
          heading: "Approches de SOA : Bottom-Up et Top-down",
          blocks: [
            { type: "p", text: "Deux approches sont définies pour implémenter l'architecture SOA :" },
            {
              type: "kv",
              items: [
                { k: "Bottom-Up", v: "son principe est de commencer par un petit groupe et ajouter jusqu'à ce qu'on obtienne une grande entreprise." },
                { k: "Top-down", v: "c'est l'inverse de Bottom-Up. Top-down est la décomposition d'un système ou problème jusqu'à l'obtention d'un petit service de base." },
              ],
            },
            { type: "callout", variant: "info", title: "Schéma du support", text: "L'approche Bottom up monte du bas vers le haut, tandis que TOP_down descend. La démarche contract-first illustrée suit : Interface WSDL → Interface JAVA → Implémentation java." },
          ],
        },
        {
          heading: "Bilan SOA : avantages et inconvénients",
          blocks: [
            { type: "p", text: "Avantages :" },
            { type: "list", ordered: true, items: [
              "Accès à distance via un navigateur Web.",
              "Pas de logiciel sur le poste client.",
              "Possibilité d'interagir par n'importe quel appareil connecté à Internet.",
              "Compatibilité avec différents systèmes d'exploitation et différentes plates-formes (utilisation des standards).",
              "Système d'information flexible (anticiper les évolutions technologiques). Il suffit de faire évoluer un service ou d'ajouter un nouveau service sans avoir de perturbations pour les autres services.",
              "Réutilisation de code.",
              "Une plus grande tolérance aux pannes (maintenance facile).",
            ] },
            { type: "p", text: "Inconvénients :" },
            { type: "list", ordered: true, items: [
              "Recentralisation des systèmes (charge très importante sur le serveur).",
              "Coûts de conception et de développement initiaux importants à la fois financier et humain (formation d'une équipe d'experts pour la conception et des équipes pour l'implémentation et l'administration).",
              "Lenteur d'exécution (services asynchrones).",
              "Manque de maturité de standards (course à la spécification entre W3C et OASIS).",
            ] },
          ],
        },
      ],
    },
    // ──────────────── CHAPITRE 2 : LES SERVICES ────────────────
    {
      id: "soa2-services",
      title: "Chapitre 2 — Les Services",
      summary:
        "Définition d'un service et ses huit aspects : contrat standardisé (syntaxique, sémantique, QoS/SLA), couplage lâche (technique vs fonctionnel, contract-first/last), abstraction et prédictibilité, réutilisabilité et ses 3 freins, autonomie (2 niveaux), sans état, découvrabilité (repository), composabilité et granularité ; applications des services web en B2B et B2C, réseaux sociaux, et types de services web (SOAP, REST, gRPC).",
      sections: [
        {
          heading: "Définitions du service",
          blocks: [
            { type: "list", items: [
              "Un service est un comportement défini par contrat, qui peut être réalisé et fourni par tout composant pour être utilisé par tout composant sur la base unique du contrat.",
              "Un Service est un composant logiciel distribué, exposant les fonctionnalités à forte valeur ajoutée d'un domaine métier.",
              "Les aspects d'un service sont : le contrat standardisé, le couplage lâche, l'abstraction, la réutilisabilité, l'autonomie, sans état, découvrabilité, et composabilité.",
            ] },
            { type: "callout", variant: "important", title: "Les 8 aspects d'un service", text: "Un service est un composant logiciel distribué satisfaisant les huit aspects (caractéristiques) suivants : 1) il est exposé à travers un contrat standardisé ; 2) il permet un couplage lâche entre le consommateur et le fournisseur ; 3) il est abstrait (vu comme une boîte noire) ; 4) il est réutilisable ; 5) il est autonome ; 6) il est sans état ; 7) il est découvrable (possibilité de découverte de service) ; 8) il est composable (capacité de composition en modules de services)." },
          ],
        },
        {
          heading: "Aspect 1 — Contrat standardisé : les 3 contrats",
          blocks: [
            { type: "p", text: "L'ensemble des services d'un même Système Technique sont exposés au travers de contrats respectant les mêmes règles de standardisation. Le contrat de service définit un accord entre le fournisseur et le consommateur. Il est composé :" },
            { type: "list", items: [
              "D'un contrat syntaxique qui propose une représentation technique du service : il constitue le contrat d'utilisation du service (son interface). Il présente le nom du traitement, ses paramètres d'entrée et de sortie et les contraintes structurelles (format et contrainte sur les données) qui s'y appliquent.",
              "D'un contrat sémantique qui fournit une description informelle du traitement : il précise les règles et contraintes d'utilisation du service : la valorisation des messages de réponse, les exceptions, les pré-conditions et post-conditions techniques ou métiers.",
              "D'un contrat de niveau de service (QoS et SLA) qui précise les engagements du service : il spécifie par exemple le temps de réponse maximum attendu, les plages horaires d'accessibilité, le temps de reprise après interruption, les procédures mises en œuvre en cas de panne, les procédures de prise en charge du support, …",
            ] },
            { type: "callout", variant: "tip", title: "Sigles", text: "QoS : Quality of Service · SLA : Service Level Agreement" },
          ],
        },
        {
          heading: "Exemple de contrat d'un service web",
          blocks: [
            { type: "p", text: "Pour un service web (service implémenté sous forme de web service), son contrat peut être formé comme suit :" },
            { type: "list", items: [
              "Un document WSDL décrivant l'interface du service (les modalités d'accès) : ceci fait partie du contrat syntaxique.",
              "Un ensemble de « policies » qui définissent les règles d'utilisation du service : les policies font partie du contrat sémantique. Les règles et contraintes qu'elles expriment adressent des domaines variés : sécurité, encodage, langue, versioning, métiers, …",
              "Un ensemble de schémas XML (XSD) qui définissent les types de données échangées par le service : les XSD font partie du contrat syntaxique (elles définissent les formats de données et les contraintes structurelles) et également du contrat sémantique — la richesse des types et restrictions XSD permet d'auto-documenter les valeurs possibles et évite souvent des confusions.",
              "Documentations complémentaires : elles complètent le contrat sémantique (on y décrit par exemple les prés et post conditions d'utilisation du service) et constituent le contrat de niveau de service (QoS & SLA) — un contrat qui définit un ensemble d'indicateurs et de valeurs seuils.",
            ] },
            { type: "callout", variant: "tip", title: "Sigles", text: "XML : Extensible Markup Language · XSD : XML Schema Definition" },
            { type: "p", text: "Standardisation du contrat : le contrat de service est une notion complexe qui ne se limite pas à la (simple) définition d'interfaces. Il est constitué de nombreux éléments (techniques ou non) qui forment un fond documentaire pour lequel il est préférable (voire indispensable) de respecter un formalisme commun — le meilleur moyen de construire un modèle cohérent et donc facile à comprendre et à partager." },
            { type: "p", text: "En plus de cadrer la définition des contrats (et donc de faciliter la communication), l'utilisation d'un formalisme commun et de règles de standardisation facilite la centralisation des éléments constituant les contrats. Cette centralisation encourage la réutilisation : les règles d'utilisation (policies) et les formats des données (XSD) sont de bons candidats à la réutilisation vu qu'en général les mêmes règles d'utilisation et les mêmes structures de données sont partagées entre les services dans un seul système. Il est ainsi indispensable de séparer les différents éléments du contrat de service afin de permettre leur réutilisation." },
          ],
        },
        {
          heading: "Aspect 2 — Couplage lâche : couplage technique et fonctionnel",
          blocks: [
            { type: "p", text: "L'objectif de la SOA est de permettre aux entreprises de s'adapter en permanence et d'être de plus en plus réactives aux variations des marchés et aux avancements technologiques. Il est primordial d'éviter les chausse-trappes des grands projets d'architectures distribuées ou intégrées, et en particulier le couplage technique et fonctionnel entre consommateurs et fournisseurs de services." },
            {
              type: "kv",
              items: [
                { k: "Couplage technique", v: "impose au consommateur de connaître le protocole d'échange du fournisseur. À grande échelle, un tel couplage complique, voire interdit l'évolution du socle technique, et risque de figer le SI dans une inertie sclérosante." },
                { k: "Couplage fonctionnel", v: "impose au client de connaître le format d'échange du fournisseur. Ainsi toute évolution du fournisseur a un impact potentiel sur chacun de ses consommateurs. Mal gérée, cette dépendance peut conduire à de véritables verrous fonctionnels dans le Système d'Informations — interdisant toute évolution ou, plus sûrement, augmentant de façon exponentielle le coût de ces évolutions." },
              ],
            },
          ],
        },
        {
          heading: "Couplage lâche : la nature des dépendances",
          blocks: [
            { type: "p", text: "La question qui se pose : comment garantir l'indépendance entre le consommateur (interface client) et le fournisseur (service) ? Sachant que la logique d'un service est fortement liée à son environnement d'implémentation, examinons tout d'abord la nature de dépendances qui existent :" },
            { type: "list", items: [
              "La logique d'un service est directement dépendante de son implémentation (1). Cette implémentation s'appuie sur un ensemble de ressources qui constituent l'environnement d'implémentation du service : la logique d'un service est donc couplée à ces ressources.",
              "De la même façon, la logique d'un service est fortement liée aux technologies sur lesquelles son implémentation s'appuie (2).",
              "Dans le cadre de services composites, la logique d'un service est également dépendante des services qui le composent (3).",
              "Enfin, le contrat de service ainsi que sa logique peuvent être couplés aux processus qui les utilisent (4).",
            ] },
            { type: "p", text: "Ces couplages sont inévitables. Du côté consommateur, celui-ci est lié directement avec le service à travers son contrat. C'est le quatrième type de couplage (couplage Service/Contrat) qu'il faut réduire afin de permettre un découplage entre le consommateur et le service." },
          ],
        },
        {
          heading: "Contract last vs Contract first",
          blocks: [
            { type: "p", text: "Le contrat d'un service et sa logique peuvent être couplés de deux façons différentes :" },
            { type: "list", items: [
              "Couplage du contrat de service vers la logique d'implémentation du service : un tel couplage résulte d'une approche Contract last lors du design du service (le contrat dérive de l'implémentation). Cette approche est à exclure car elle induit un couplage du contrat avec l'environnement du service.",
              "Couplage de la logique du service au contrat : ce couplage dénote une approche Contract first dans la conception du service (le contrat est écrit préalablement à l'implémentation du service). Cette approche est toujours préférable et le couplage du service vers son contrat est considéré comme un couplage positif.",
            ] },
            { type: "callout", variant: "important", title: "Couplage lâche vs couplage fort", text: "Il faut établir la dépendance dans le bon sens : le consommateur d'un service est lié au contrat de ce dernier, et ne doit être lié qu'à celui-ci (pas au service lui-même). C'est ce que l'on appelle le couplage lâche. Or, si le contrat est couplé avec la logique du service, le consommateur va hériter par transitivité de l'ensemble des dépendances de la logique du service avec son environnement : on se retrouve avec un consommateur fortement couplé au service (Couplage Fort)." },
          ],
        },
        {
          heading: "Aspect 3 — Abstraction et prédictibilité",
          blocks: [
            { type: "p", text: "Le principe d'abstraction consiste à fournir les services du SI sur un modèle boîte noire : les seules informations fournies au consommateur sont celles contenues dans son contrat. Ainsi, il est quasiment indispensable de n'y mettre que les informations essentielles à son invocation." },
            { type: "list", items: [
              "Il est souvent inutile de fournir les informations complètes sur les détails d'implémentation du service ; le fournisseur du service peut permettre un accès contrôlé à ce genre de détails à des concepteurs particuliers de consommateurs.",
              "Cependant cette restriction d'accès aux informations du service ne doit pas violer le principe de la prédictibilité du service.",
            ] },
            { type: "callout", variant: "info", title: "Prédictibilité du service", text: "La prédictibilité d'un service signifie que son comportement et la réponse qu'il donne suite à une requête ne doivent pas varier (suite à une concurrence d'accès par exemple). Ce principe est induit par le respect du contrat du service. Ainsi le principe de l'abstraction de service signifie qu'il faut mettre dans le contrat du service toutes et uniquement les informations nécessaires et suffisantes à son invocation." },
          ],
        },
        {
          heading: "Aspect 4 — Réutilisabilité",
          blocks: [
            { type: "p", text: "La réutilisabilité des services (et plus largement des ressources du SI) constitue une des pierres angulaires de la mise en œuvre d'une architecture orientée service. En effet, la mise en œuvre d'une architecture SOA vise, entre autres, à éviter le gaspillage des ressources en éliminant les redondances. D'autre part, la réutilisation est une condition première de l'agilisation du SI indispensable à la réduction du time-to-market." },
            { type: "p", text: "La réutilisabilité d'un service désigne la capacité du service à répondre aux besoins de plusieurs types de consommateurs (est-ce que plusieurs consommateurs vont utiliser ce service ?). Les services identifiés comme réutilisables sont mis à la disposition d'un large spectre de services composites, de processus, d'applications, … Au fil du temps, de tels services ont vocation à prendre part à un nombre croissant de compositions, d'orchestrations, de workflow, …" },
          ],
        },
        {
          heading: "Les 3 freins à la réutilisation",
          blocks: [
            { type: "p", text: "Les principaux freins qui peuvent influencer négativement le degré de réutilisation d'un service sont :" },
            { type: "list", ordered: true, items: [
              "La centralisation et la standardisation des ressources : la centralisation des contrats de service garantit qu'un consommateur n'a accès au service que par son contrat, et la centralisation de la logique métier permet d'obtenir un inventaire de services hautement normalisé. La standardisation de cet inventaire est essentielle pour maximiser la réutilisabilité des services disponibles au sein de l'entreprise.",
              "La démarche suivie dans la conception de service (voir section suivante).",
              "La granularité de service : la granularité d'un service est définie par le nombre de fonctions recouvertes par celui-ci. Ce facteur est très critique et une mauvaise granularité va sûrement limiter sa réutilisation.",
            ] },
            { type: "p", text: "Sur la granularité — on parle de mauvaise granularité lorsque le service couvre trop ou trop peu de fonctionnalités : un service qui fait trop de choses causera des mauvaises performances et risquerait d'être moins réutilisable à cause des fonctionnalités non utiles pour le consommateur ; un service qui fait trop peu de choses sera sans valeur ajoutée métier et risque de ne pas être réutilisable car il a besoin de collaborer avec d'autres services pour répondre aux besoins du consommateur." },
          ],
        },
        {
          heading: "Frein 2 : la démarche de conception (Bottom-up Push/Pull, Top-down)",
          blocks: [
            { type: "p", text: "Le processus de conception « Bottom-up » : un service émerge d'une démarche « Push » initiée par un fournisseur ou « Pull » initiée par un consommateur. Selon l'initiateur de cette démarche, le résultat de ce processus est un service plus générique (Push) qui essaye de répondre aux besoins de tous les partenaires (risque d'être sans valeur ajoutée métier), ou bien un service qui répond au besoin d'un client particulier sans forcément prendre en compte des perspectives de réutilisation du service. Cela s'explique par le fait que ce genre de demande se conjugue généralement avec des impératifs « Time To Market » imposés par le client du service." },
            { type: "p", text: "Un processus de conception « Top-down » : le service est le résultat d'une étude plus globale et systémique du SI ou d'un bloc du SI. Cette démarche garantit une cohérence globale de l'ensemble des services ; néanmoins, sa mise en place s'avère un challenge difficile dont les bénéfices sont loin d'être acquis." },
            { type: "callout", variant: "tip", title: "Quelle démarche favoriser ? (Bottom-up, Top-down, Push, Pull)", text: "Il n'y a pas de démarche à favoriser en particulier. Les 3 peuvent coexister selon le contexte et l'offre de services existants. Néanmoins, en phase de conception et de mise en œuvre du service, il est primordial de : favoriser une démarche itérative et collaborative entre clients et fournisseurs de services ; penser un service donné en tant qu'offre de services, plutôt qu'un mono-service qui essaie de répondre à tous les besoins ; ne pas considérer l'étude d'urbanisation, s'il y en avait une, comme une cible en elle-même, mais plutôt comme un fil conducteur pour la cible." },
          ],
        },
        {
          heading: "Aspect 5 — Autonomie (2 niveaux)",
          blocks: [
            { type: "p", text: "L'autonomie de service signifie que le service n'a pas besoin d'autres services pour accomplir sa tâche (il est indépendant des autres), et par conséquent cela implique que le comportement d'un service ne dépend pas du contexte dans lequel il est invoqué (contexte fonctionnel ou contexte technique)." },
            { type: "p", text: "Afin qu'un service s'acquitte au mieux de ses engagements (comportement, fiabilité, performances, …), il doit exercer un contrôle fort sur son environnement d'exécution sous-jacent. Plus ce contrôle est fort, plus l'exécution d'un service est prédictible. C'est au moment de la décomposition des fonctions du SI en inventaire de services qu'il faut définir les membres de ce registre comme des blocs indépendants — c'est un haut niveau d'autonomie individuelle des services qui est visé. Réduire l'accès partagé aux ressources d'un service et augmenter le niveau d'isolation physique des services sont deux leviers permettant d'augmenter cette capacité des services à fonctionner de façon autonome." },
            { type: "p", text: "Cependant, il est quasiment impossible de satisfaire cette caractéristique pour l'ensemble des services ; c'est pourquoi on a introduit deux niveaux basiques d'autonomie :" },
            { type: "list", items: [
              "Autonomie de niveau de service : les frontières des services entrant dans cette catégorie sont clairement définies et les services sont indépendants les uns des autres, mais il se peut que ces services partagent encore certaines ressources sur lesquelles ils s'appuient.",
              "Autonomie pure : la logique sous-jacente au service et les ressources qu'il utilise sont la propriété du service et sous son contrôle exclusif. C'est le niveau d'autonomie que l'on pourra atteindre lors de la création de « nouveaux » services quand la logique sous-jacente est construite spécifiquement pour supporter le service. Cependant, ceci reste un objectif difficilement atteignable au sein d'un système déjà existant et avec lequel il faut vivre pendant longtemps.",
            ] },
          ],
        },
        {
          heading: "Aspect 6 — Sans état (Stateless)",
          blocks: [
            { type: "p", text: "Un service doit minimiser la consommation de ressources en déléguant la gestion des informations d'état quand cela est nécessaire. D'une manière plus générale, la gestion d'états (d'informations de contexte) au sein d'un service pose des problèmes :" },
            { type: "list", items: [
              "De compréhension et de maintenabilité : la gestion d'états va sensiblement augmenter la complexité de l'implémentation et donc rendre difficile sa lecture, sa documentation, sa testabilité, … Dans le cadre d'une composition de services, la complexité du composé étant directement liée à celle de ses composants, la complexité des services de plus haut niveau peut rapidement devenir ingérable.",
              "De réutilisation : la gestion d'états au sein du service brouille la lisibilité de son contrat puisque l'adaptation de son comportement en fonction de son état ne transparaît pas dans son contrat. Or la lisibilité et la transparence des contrats de service sont des facteurs clés de la réutilisation. D'autre part, l'utilisation d'états présuppose souvent l'utilisation de ce service au sein d'un enchaînement d'invocations défini à l'avance — il sera donc difficile de réutiliser le service au sein d'une autre orchestration ou composition.",
              "De performances : car la gestion des états est consommatrice de ressources systèmes, notamment en termes de stockage de ces états (en mémoire ou sur disque).",
            ] },
            { type: "callout", variant: "important", title: "Conclusion stateless", text: "On préférera donc la conception et l'implémentation de services sans état. La responsabilité de la gestion d'états sera alors déléguée aux utilisateurs (consommateurs) des services : compositions, orchestrations, processus, …" },
          ],
        },
        {
          heading: "Aspect 7 — Découvrabilité (repository de services)",
          blocks: [
            { type: "p", text: "Un service est complété par un ensemble de métas-données de communication au travers desquelles il peut être découvert et interprété de façon effective. Cette découvrabilité des services existants passe par la mise en œuvre d'un repository de services qui vient outiller l'inventaire des services disponibles. Ce repository stocke l'ensemble des métadonnées nécessaires à :" },
            { type: "list", items: [
              "La recherche des services de l'inventaire.",
              "La récupération de l'ensemble des artefacts relatifs aux services de l'inventaire (Spécifications, SLAs, Policies, Schémas XML, WSDL, Interfaces, …).",
            ] },
            { type: "p", text: "Le concepteur d'un consommateur de service (service composé, application composite, orchestration, processus, …) pourra s'appuyer sur ce repository de la façon suivante :" },
            { type: "list", ordered: true, items: [
              "Le concepteur recherche dans le repository un service possédant les fonctionnalités dont il a besoin (1).",
              "En se basant sur les métadonnées contenues dans le repository, le concepteur est capable de découvrir et d'identifier un service potentiellement capable de répondre à ces besoins (2).",
              "Le concepteur peut alors accéder au contrat du service : syntaxique, sémantique et de niveau de service (3).",
            ] },
          ],
        },
        {
          heading: "Aspect 8 — Composabilité et bonne granularité",
          blocks: [
            { type: "p", text: "Un service doit être conçu de façon à participer à des compositions de services. Ce dernier aspect constitue en quelque sorte l'aboutissement des sept précédents : l'ensemble des principes présentés vise à la réutilisation des services, or cette réutilisabilité n'a de sens que si les services sont effectivement réutilisés en prenant part à des compositions de services." },
            { type: "p", text: "C'est grâce à la composabilité que sera mis en œuvre le principe de « separation of concerns » au sein d'une architecture orientée services. L'objectif est de déterminer la « bonne » granularité de services afin de décomposer la solution à un problème métier de haut niveau en un ensemble de « plus petites unités réutilisables » de traitement : les services. L'idée est de pouvoir recomposer notre logique métier à l'infini au sein de processus ou de services composites de haut niveau." },
            { type: "callout", variant: "warn", title: "Le bon niveau de granularité", text: "Un service trop large ne pourra pas être réutilisé : il implémente un enchaînement de traitements qui n'ont, a priori, de sens que dans le contexte où le service a été écrit — un service trop large n'est utilisable que par une seule (ou quelques) application(s). À l'opposé, un service trop fin ne sera pas réutilisé : il implémente un traitement atomique qui n'apporte pas de valeur ajoutée — un service trop fin propose un niveau de détail qui n'est pas pertinent d'un point de vue métier." },
          ],
        },
        {
          heading: "Les applications des services Web : B2C et B2B",
          blocks: [
            { type: "p", text: "Les technologies des services Web peuvent être appliquées à toutes sortes d'applications auxquelles elles offrent des avantages considérables en comparaison aux anciennes API propriétaires, aux implémentations spécifiques à une plate-forme et à quelques autres restrictions classiques que l'on peut rencontrer (multiplateforme, multi-langage, disponible sur Internet avec une information actualisée disponible en temps réel, ...)." },
            { type: "p", text: "L'application des services Web est multiple, autant dans les domaines du B2C, B2B que pour des domaines de gestion, par exemple gestion de stock, gestion commerciale, etc..." },
            {
              type: "kv",
              items: [
                { k: "B2C (Business to Consumer)", v: "qualifie une application, un site Internet destiné au grand public." },
                { k: "B2B (Business to Business)", v: "qualifie une application, un site Internet destiné au commerce de professionnel à professionnel." },
              ],
            },
          ],
        },
        {
          heading: "Applications B2B concrètes (5 exemples)",
          blocks: [
            { type: "p", text: "En B2B, les services web sont principalement utilisés pour automatiser et fluidifier les processus métier entre entreprises partenaires. L'accent est mis sur l'intégration, l'automatisation et l'efficacité." },
            { type: "list", items: [
              "Intégration de la chaîne logistique (Supply Chain) : un fabricant (ex: Renault) connecte son système de gestion des stocks (ERP) à ceux de ses fournisseurs de pièces détachées via des services web. Quand le stock d'un composant est bas, le système de Renault commande automatiquement auprès du fournisseur, qui reçoit la commande directement dans son propre système. Avantage : réduction des stocks, livraison juste-à-temps, moins d'erreurs humaines.",
              "Paiements et facturation électronique (E-invoicing) : une entreprise utilise un service web comme PayPal for Business pour intégrer la facturation dans son logiciel de comptabilité. Les factures sont générées, envoyées et les paiements sont enregistrés automatiquement. Avantage : automatisation de la trésorerie, réduction des retards de paiement.",
              "Services financiers et bancaires : une application de gestion financière (comme QuickBooks) se connecte via des API (services web) aux comptes bancaires de l'entreprise pour récupérer automatiquement les transactions et les catégoriser. Avantage : vue financière en temps réel, comptabilité simplifiée.",
              "Logiciel en tant que Service (SaaS) et interopérabilité : une entreprise utilise Salesforce (CRM) connectée via des API à son outil de marketing Mailchimp et à son ERP SAP. Quand un nouveau lead est qualifié dans Salesforce, il est automatiquement ajouté à une campagne Mailchimp et créé comme client potentiel dans SAP. Avantage : écosystème logiciel cohérent et données synchronisées.",
              "Réservation et logistique : un site de voyage d'affaires se connecte via des services web aux systèmes de réservation (GDS) des compagnies aériennes et des chaînes hôtelières pour afficher la disponibilité et les prix en temps réel. Avantage : accès à un inventaire global, processus de réservation simplifié.",
            ] },
          ],
        },
        {
          heading: "Applications B2C concrètes (5 exemples)",
          blocks: [
            { type: "p", text: "En B2C, les services web sont la colonne vertébrale de l'expérience utilisateur directe. Ils sont utilisés pour fournir des services rapides, personnalisés et engageants aux consommateurs finaux." },
            { type: "list", items: [
              "E-commerce et Retail : l'application Amazon fait appel à des dizaines de services web en arrière-plan : pour afficher les recommandations de produits, vérifier la disponibilité en stock, calculer les frais de port, et traiter le paiement via son service Amazon Pay. Avantage : expérience d'achat fluide, personnalisée et sécurisée.",
              "Réseaux sociaux et partage de contenu : quand vous voyez un tweet de Twitter intégré dans un article de presse, c'est un service web de l'API Twitter qui fournit ce contenu. De même, se connecter à un site via son compte Facebook/Google utilise des services web d'authentification (OAuth). Avantage : intégration et partage de contenu sans friction.",
              "Services de cartographie et de géolocalisation : Uber utilise les API de Google Maps pour afficher la carte, calculer l'itinéraire optimal et estimer le temps de trajet. L'application de météo sur votre smartphone utilise un service web pour obtenir les données météorologiques en temps réel. Avantage : fonctionnalités complexes externalisées, développement plus rapide.",
              "Streaming de médias : Netflix et Spotify utilisent des services web pour vous recommander des films ou de la musique basés sur votre historique de visionnage/écoute, gérer votre playlist, et streamer le contenu depuis le cloud. Avantage : expérience hautement personnalisée et adaptive.",
              "Services bancaires aux particuliers (Fintech) : les applications de banque en ligne (ex: Revolut, N26) utilisent des services web pour toutes leurs opérations : consulter son solde, effectuer un virement, ou analyser ses dépenses. Avantage : accès 24/7, interface utilisateur moderne et réactive.",
            ] },
          ],
        },
        {
          heading: "Réseaux sociaux : Google+, Twitter, WordPress, Viadeo/LinkedIn, Facebook/Myspace",
          blocks: [
            { type: "p", text: "Google+ (B2B et B2C) : c'est le futur carrefour d'influence pour les marques et les entreprises adeptes du marketing sur les réseaux sociaux. Google Plus offre des perspectives intéressantes aux professionnels : développer votre marque, travailler en mode collaboratif, organiser une veille d'informations. Actions pour l'entreprise : créer un portfolio, créer des cercles à vocation professionnels, chat, vidéo conférences, veille d'informations, réseautage sur mobile lors des déplacements…" },
            { type: "p", text: "Twitter (B2B) : permet d'obtenir des informations brutes, rapides et de se tenir au courant de l'actualité des industries. Il regroupe essentiellement les personnes qui travaillent dans la publication d'information, l'évènementiel, la publicité, la veille concurrentielle. Twitter est un mégaphone qui permet via quelques mots d'accroître la popularité et solliciter les foules en temps réel — idéal pour créer du trafic autour de l'entreprise. Créer une plateforme d'expert : l'entreprise est entourée d'experts afin de bénéficier de leur savoir-faire. Un tweet est viral puisqu'il se transmet ou se renvoie « retweet » en un clic." },
            { type: "p", text: "WordPress (B2B) : communique des informations sérieuses et fiables sur un sujet et permet de donner son avis. Ce site (il s'agit de créer des blogs) s'adresse à des clients qui cherchent à recevoir des informations ou à consulter les services de l'entreprise qu'ils suivent. WordPress est réputé pour ses nombreuses fonctionnalités permettant à des utilisateurs, avancés ou non, de créer un site Internet et de le personnaliser." },
            { type: "p", text: "Viadeo et LinkedIn (B2B) : permettent de construire un réseau solide de votre activité. Les deux réseaux permettent de cibler, respectivement à l'échelle française et internationale. Ces réseaux du B2B sont des portails très intéressants qui communiquent entre le monde de l'emploi, des formations et de l'entreprise : plateformes d'échange entre candidats, étudiants, entreprises, recruteurs." },
            { type: "p", text: "Facebook et Myspace (B2C) : ce sont des réseaux sociaux majoritairement utilisés pour rester en contact avec des amis ou fans, communiquer, partager des photos, des liens ou des vidéos, ou encore échanger des informations sur divers centres d'intérêt." },
          ],
        },
        {
          heading: "Types de Services Web + QCM et vidéos du support",
          blocks: [
            { type: "p", text: "L'architecture fonctionnelle des services web utilise plusieurs langages et protocoles durant le déploiement et l'invocation des services web. Les services web se basent sur l'utilisation des normes actuelles d'Internet comme le protocole HTTP. Les types de Services Web sont : SOAP, REST, gRPC." },
            { type: "callout", variant: "info", title: "Ressources du support (Chapitre 2)", text: "QCM : 20 questions (Google Forms — lien fourni dans le support) · Vidéos : https://youtu.be/Vnk0p-63mHQ · https://youtu.be/gBmEo_Lw_KI · https://youtu.be/V01GwRMCk2s · puis une séance de Discussion." },
          ],
        },
      ],
    },
    // ──────────────── CHAPITRE 3 : WEB SERVICES SOAP ────────────────
    {
      id: "soa3-soap",
      title: "Chapitre 3 — Web Services SOAP",
      summary:
        "Technologies SOAP (WSDL, SOAP, UDDI, ESB), pile protocolaire simplifiée, couche transport HTTP (entités, verbes, requête/réponse), langage XML (XSD, XSLT, XPath, espaces de noms, grammaires DTD/XML Schema), protocole SOAP et ses 9 principes fondamentaux, structure des messages (Envelope, Header et ses 4 attributs, Body, Fault et codes d'erreurs), messages avec pièces jointes MIME, SOAP en 2026 et normes WS-*, couche de description WSDL (niveaux abstrait/concret), UDDI moderne et exemples (GetLastTradePrice, SoapUI, PayPal).",
      sections: [
        {
          heading: "Technologies de l'architecture SOAP : WSDL, SOAP, UDDI, ESB",
          blocks: [
            { type: "p", text: "Le schéma de l'architecture : le Fournisseur déploie le Service Web (1. Déploiement), publie sa Description WSDL dans l'Annuaire/Entrepôt UDDI (2. Publication), le Client cherche la description (3. Découverte via Description WSDL), puis consomme le service (4. Invocation) via SOAP et l'ESB. Le client est composé d'une Application et d'un Proxy qui dispose de la Description WSDL ; le fournisseur relie son Web Service à son Application." },
            { type: "list", items: [
              "Contrat / description WSDL (Web Service Description Language) : contient la description du service et de son utilisation, échangée entre le fournisseur de service et le client.",
              "SOAP (Simple Object Access Protocol) : protocole de communication au sein de la SOA.",
              "Annuaire UDDI (Universal Description Discovery and Integration) : liste dynamique de recherche de descriptions de services dans laquelle les fournisseurs de services publient leurs descriptions.",
              "Bus ESB (Enterprise Service Bus) : le moyen par lequel s'effectue la communication entre le client et le fournisseur du service. Son but est avant tout de permettre la communication des applications qui à la base ne sont pas pensées pour fonctionner ensemble.",
            ] },
            { type: "diagram", id: "soa-triangle", caption: "Technologies SOAP : UDDI (annuaire), WSDL (description), SOAP (communication), ESB (bus)" },
          ],
        },
        {
          heading: "La pile protocolaire simplifiée SOAP WS",
          blocks: [
            { type: "p", text: "La pile protocolaire est constituée de couches fonctionnelles empilées — de bas en haut : Transport (HTTP), Communication (SOAP), Description (WSDL), Découverte/Publication (UDDI) — et de mécanismes non fonctionnels qui traversent la pile : Sécurité, Transaction, …" },
            { type: "diagram", id: "soap-stack", caption: "Pile protocolaire SOAP WS : HTTP → SOAP → WSDL → UDDI + mécanismes non fonctionnels (sécurité, transaction)" },
          ],
        },
        {
          heading: "Couche Transport HTTP (1) : protocoles et cookies",
          blocks: [
            { type: "p", text: "Cette couche s'intéresse aux protocoles de transport de bas niveau ; ces derniers vont transporter les requêtes et les réponses échangées entre services. HTTPS est la variante sécurisée de ce protocole." },
            { type: "p", text: "Le protocole le plus utilisé et recommandé par le consortium WS-I (Web Service Interoperability) est l'HTTP, mais d'autres implémentations peuvent utiliser un autre ensemble de protocoles tels que : FTP (File Transfer Protocol), JMS (java messagerie services), SMTP (Simple Mail Transfer Protocol), etc." },
            { type: "p", text: "Le protocole HTTP, à travers les Cookies, fournit un moyen pour « marquer » l'agent client de façon suffisamment précise : l'application est marquée, puisque c'est dans le container de cette application que l'information de marquage est stockée ; l'utilisateur d'une machine multi-utilisateur est marqué, puisque les informations de marquage sont stockées dans le profil particulier de cet utilisateur." },
          ],
        },
        {
          heading: "Couche Transport HTTP (2) : structure et notion d'entité",
          blocks: [
            { type: "p", text: "Le HTTP est un protocole destiné à transporter des entités document. Il est constitué de messages-requêtes (du client au serveur) et de messages-réponse (du serveur au client). Il implémente parfaitement un paradigme client-serveur en ce sens que : le client (agent utilisateur) est toujours l'initiateur de la requête (PULL) ; le serveur est toujours en attente d'un client." },
            { type: "p", text: "Les messages transportent des entités. Le cas le plus fréquent est celui d'une entité unique. L'entité est toujours définie par : une entête d'entité (méta informations sur le contenu et la transmission) et un corps d'entité (le contenu)." },
            { type: "p", text: "Le protocole admet cependant que plusieurs entités puissent être transportées par le même message. C'est le cas du téléchargement de fichiers accompagnant des données de formulaire, ou de téléchargements multiples. Dans ce cas, le message doit permettre de séparer proprement les différentes entités qu'il transporte." },
          ],
        },
        {
          heading: "Couche Transport HTTP (3) : construction de la requête",
          blocks: [
            { type: "p", text: "1. Le libellé de requête : la requête HTTP est une demande à un serveur pour qu'il exécute un ordre (principalement d'obtenir un document). Ces ordres sont symbolisés par des verbes. Les verbes les plus connus sont :" },
            { type: "list", items: [
              "HEAD : « donne-moi les métas informations concernant un document ».",
              "GET : « donne-moi le contenu du document (et ses méta informations par la même occasion) ».",
              "POST : « fais ce que tu veux (ou tu peux) avec les données que je t'envoie ».",
              "PUT : « mets le document que je t'envoie où je te le dis ».",
            ] },
            { type: "p", text: "2. La Cible : elle est représentée par une URL absolue ou relative. Le serveur est chargé de « consommer » cette cible, la traduire en une réalité physique tangible (un fichier physique, un exécutable, un répertoire)." },
            { type: "p", text: "La requête peut informer le serveur d'un certain nombre de prédispositions de l'agent utilisateur. Des mécanismes de gestion de préférences, convenus entre le client et le serveur, permettent d'améliorer le service rendu sans faire appel à des choix explicites de l'utilisateur. Ces préférences sont, par exemple : le choix de la langue la plus appropriée, le choix d'un encodage acceptable du côté du client, le choix d'une version suffisamment récente ou au contraire de versions plus anciennes. Les champs de requête sont placés à la suite de la « ligne VERBE » sous la syntaxe : NomChamp : [ValeurChamp] LF. L'en-tête doit se terminer par une ligne vide, pour indiquer que ce qui suit est un corps d'entité (ou que le message est fini)." },
            { type: "p", text: "3. Un corps de requête : certains verbes (PUT, POST) supposent très fortement une transmission de contenu du client vers le serveur. Ce contenu pouvant être a priori d'une taille quelconque, il s'agit bien d'un corps d'entité. Dans ce cas, on doit considérer potentiellement une requête comme étant une transmission d'un document à part entière : le client pousse un document local vers le serveur." },
            { type: "p", text: "4. Détermination de la longueur du corps d'entité : il n'existe pas en HTTP de bloc de fin de message identifiable, et le corps de l'entité peut virtuellement contenir n'importe quelle séquence binaire. La question de prévoir la fin du corps d'entité doit être réglée dès l'entête : toute requête portant un contenu d'une certaine longueur doit informer le serveur de cette longueur. On utilise le champ : Content-Length." },
            { type: "p", text: "Construction de la réponse : le schéma de réponse est symétrique à celui de la requête, à la différence près que le corps d'entité est le plus souvent non vide." },
            { type: "code", lang: "http", caption: "Une requête mono-entité, dans le cas général, se construit ainsi", code: "[verbe] [Url] [version HTTP] LF\nContent-Length : [longueur du corps]\n[Nom Champ]:[Valeur Champ] LF\n...\nLF  (sépare l'en-tête et le corps d'entité)\n[Octets de l'entité]" },
          ],
        },
        {
          heading: "Le langage XML : définition et apports",
          blocks: [
            { type: "p", text: "XML est un standard qui permet de décrire des documents structurés transportables sur les protocoles d'Internet. Il apporte à l'architecture des services web l'extensibilité et la neutralité vis-à-vis des plateformes et des langages de développement. De plus, grâce à la structuration, XML permet la distinction entre les données des applications et les données des protocoles." },
            { type: "p", text: "La technologie des services web a été conçue pour fonctionner dans des environnements totalement hétérogènes. Cependant, l'interopérabilité entre les systèmes hétérogènes demande des mécanismes puissants de correspondance et de gestion des types de données des messages entre les différents participants (clients et fournisseurs). C'est une tâche où les schémas de type de données XML s'avèrent bien adaptés : c'est pour cette raison que la technologie des services web est essentiellement basée sur XML." },
          ],
        },
        {
          heading: "Spécifications de XML : XSD, XSLT, XPath, espaces de noms",
          blocks: [
            { type: "list", items: [
              "XSD (XML Schema) : c'est un langage qui sert à décrire formellement un vocabulaire.",
              "XSLT (Extensible Stylesheet Language Transformations) : est utilisé pour transformer un document XML basé sur un certain schéma en un autre document XML qui peut être un document lui-même basé sur un autre schéma.",
              "XPath (XML Path Language) : fournit une syntaxe d'expressions utilisées pour créer des chemins de localisation.",
            ] },
            { type: "p", text: "Espaces de noms : mécanismes permettant de partitionner les balises XML (permet d'avoir deux fois le même nom de balise). Un espace de nom est défini dans n'importe quelle balise par l'attribut xmlns et par une URI. Dans un document XML, un espace de noms est identifié par un nom logique ; les balises appartenant à cet espace doivent alors être préfixées par ce nom logique." },
            { type: "code", lang: "xml", caption: "Exemple d'espace de noms", code: '<meta:body xmlns:meta="http://meta.lip6.fr/meta/">' },
            { type: "code", lang: "xml", caption: "Exemple d'un fichier XML", code: "<livre>\n  <titre> le super livre </titre>\n  <chapitre>\n    <numero> 1 </numero>\n    <titre> titre du chapitre 1 </titre>\n    <contenu> xxxxxxxxx </contenu>\n  </chapitre>\n  <chapitre>\n    …\n  </chapitre>\n</livre>" },
          ],
        },
        {
          heading: "Grammaires XML et avantages du langage",
          blocks: [
            { type: "p", text: "Deux façons de définir une grammaire XML :" },
            {
              type: "table",
              headers: ["Grammaire", "Nature", "Usage", "Expression"],
              rows: [
                ["DTD", "langage de définition de grammaire XML", "largement utilisé", "faible (type, structure)"],
                ["XML Schéma", "langage XML de définition de grammaire XML", "de plus en plus utilisé", "puissante (type, structure, héritage)"],
              ],
            },
            { type: "p", text: "Un document XML est dit valide lorsqu'il est conforme à une grammaire." },
            { type: "p", text: "Avantages du langage XML : standard W3C ; la syntaxe XML ne contient que peu de mots-clés (Simplicité) ; XML est indépendant des plates-formes (Portabilité) ; XML est un méta-langage, il est possible de créer ses propres balises (Extensibilité) ; outils disponibles (et gratuits) ; largement utilisé pour les échanges inter-applications." },
          ],
        },
        {
          heading: "Le protocole SOAP : définition et objectif",
          blocks: [
            { type: "p", text: "SOAP (Simple Object Access Protocol) est un protocole standardisé par W3C, et qui assure le transfert des messages et les appels de procédures RPC (appels de procédures distants) indépendamment du transport. SOAP définit le cadre général pour l'échange de données structurées en XML. Il permet d'échanger des structures de données complexes en XML avec les espaces de noms et la spécification XML Schéma. L'atout principal des protocoles SOAP et UDDI ainsi que du langage WSDL est de se reposer sur le langage XML (eXtensible Markup Language)." },
            { type: "p", text: "Objectif : permettre la normalisation des échanges de données. SOAP définit un moyen uniforme d'échange de données encodées XML sous forme d'appels de procédures à distance RPC, en utilisant souvent le HTTP comme protocole de transport ainsi que les protocoles SMTP, POP et FTP dans certains cas. Il assure l'interopérabilité entre composants tout en restant indépendant des plates-formes et des langages de programmation." },
            { type: "p", text: "Il repose sur deux standards : XML pour la structuration des messages et HTTP pour le transport. Il permet une interopérabilité avec divers environnements logiciels (.NET, Java/RMI, CORBA, COM/DCOM …) quel que soit leur plate-forme d'exécution." },
            { type: "p", text: "Les paquets de données circulent sous format XML, mais tous types de données peuvent être transportés même si les données binaires peuvent faire l'objet d'un encodage spécifique. Les données ayant un format binaire sont transportées sous forme de pièces jointes avec le message SOAP principal. Les messages SOAP peuvent traverser les Proxy et les pare-feu. Il permet l'échange de données que ce soit en mode synchrone (requête/réponse) ou asynchrone (accompagnement des processus)." },
          ],
        },
        {
          heading: "Les 9 principes fondamentaux du protocole SOAP",
          blocks: [
            { type: "list", ordered: true, items: [
              "Framework de messagerie.",
              "Encodage et sérialisation standard pour les objets.",
              "Invocation de services d'objets distants via SOAP RPC.",
              "Messages SOAP.",
              "Acheminement des messages.",
              "Nœud intermédiaire actif.",
              "Règles d'encodage.",
              "Liaison du SOAP avec les protocoles du transport.",
              "Sécurité du SOAP.",
            ] },
          ],
        },
        {
          heading: "Principe 1 — Framework de messagerie : nœud SOAP et rôles",
          blocks: [
            { type: "p", text: "Concepts relatifs spécifiquement à la manière avec laquelle les messages sont manipulés. Un nœud SOAP (identifié par un URI) est l'infrastructure technique qui alimente les différents scénarios de communication entre services. Il peut être vu comme étant le processeur logique permettant de recevoir, transmettre, et exécuter un ensemble d'opérations sur les messages SOAP." },
            { type: "p", text: "Différents rôles joués par un nœud :" },
            { type: "list", items: [
              "Expéditeur initial (Demandeur de service) : Initial Sender ou Service Requestor.",
              "Récepteur final (Fournisseur de service) : Ultimate Receiver ou Service Provider.",
              "Nœud intermédiaire : Intermediary.",
            ] },
          ],
        },
        {
          heading: "Principe 2 — Encodage et sérialisation standard",
          blocks: [
            { type: "p", text: "Le protocole SOAP impose une spécification d'encodage/sérialisation standard, qui doit être appliquée sur les données du message, que ce soit du côté client ou bien fournisseur. Cette tâche est assurée par le runtime SOAP implanté des deux côtés (client, fournisseur), et essentiellement utilisée avec le RPC." },
            { type: "code", lang: "xml", caption: "Exemple : encodage d'un tableau d'entiers", code: '<SOAP-ENC:Array SOAP-ENC:ArrayType="xsd:int[3]">\n    < SOAP-ENC:int> 8 </ SOAP-ENC:int>\n    <SOAP-ENC:int> 8 </ SOAP-ENC:int>\n    <SOAP-ENC:int> 8 </ SOAP-ENC:int>\n</SOAP-ENC:Array>' },
          ],
        },
        {
          heading: "Principe 3 — Invocation de services distants via SOAP RPC",
          blocks: [
            { type: "p", text: "Le protocole SOAP permet d'invoquer un objet distant en communiquant les informations nécessaires à l'appel : nom de la méthode et sa signature numérique (ses arguments) dans un message au format XML. La réponse à la requête est aussi renvoyée encapsulée dans un message au format XML. La librairie SOAP assure l'envoi du RPC à l'aide du protocole de transport choisi." },
            { type: "p", text: "Les différentes étapes d'invocation des objets distants sont :" },
            { type: "list", ordered: true, items: [
              "Le programme client SOAP crée le document XML contenant les informations nécessaires à l'invocation d'un objet distant, et le transmet au protocole HTTP (requête POST).",
              "Le message est transmis au serveur via une connexion HTTP.",
              "Le serveur reçoit le message et fait appel à l'objet concerné.",
              "L'objet effectue le traitement demandé et renvoie les résultats au serveur SOAP.",
              "Le serveur SOAP encapsule les résultats et les envoie dans un document XML au client via le protocole HTTP.",
              "Le client SOAP décode le message et envoie les résultats au demandeur initial.",
            ] },
          ],
        },
        {
          heading: "Principe 4 — Messages SOAP : Envelope, Header, Body",
          blocks: [
            { type: "p", text: "Le framework de messagerie SOAP demande que les messages SOAP soient composés d'une enveloppe (Envelope) contenant un entête (Header) et un corps (Body). La partie entête du message, qui sert à véhiculer les méta-données du message, est une partie optionnelle. Elle est formée d'un ensemble de blocs appelés « entrées entête », dont chacun peut contenir plusieurs attributs. La partie Body est la partie principale du message : elle contient les données applicatives destinées au récepteur final." },
            { type: "p", text: "Cependant un message SOAP peut avoir des fichiers attachés au fichier principal : ainsi tout fichier qui n'est pas au format XML doit apparaître dans la partie attachement. Tous les fichiers attachés en pièces jointes doivent être référencés par des URL dans le message principal." },
            { type: "code", lang: "xml", caption: "Squelette d'un message SOAP", code: '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">\n  <env:Header>\n    ...\n  </env:Header>\n  <env:Body>\n    ...\n  </env:Body>\n</env:Envelope>' },
            { type: "diagram", id: "soap-message", caption: "Message SOAP simple (Envelope > Header + Body) vs message SOAP avec pièces jointes (structure MIME)" },
          ],
        },
        {
          heading: "Principes 5 et 6 — Acheminement des messages et nœud intermédiaire actif",
          blocks: [
            { type: "p", text: "Acheminement des messages : à l'arrivée d'un message chez un nœud SOAP, celui-ci doit :" },
            { type: "list", ordered: true, items: [
              "Vérifier la structure du message : enveloppe, entête, et corps du message.",
              "Déterminer les entrées d'entêtes destinées à lui-même, et l'ensemble des rôles à en exécuter.",
              "Sélectionner parmi ces entrées celles qui sont mandataires.",
              "Si une de ces entrées n'est pas comprise ou bien qu'il n'a pas la capacité de la traiter, envoyer un message d'erreur à l'expéditeur initial.",
              "Traiter toutes les entrées mandataires, ainsi que celles qui sont optionnelles et dont il a la capacité de les traiter.",
              "Traiter le corps du message s'il s'agit du récepteur final.",
              "Retransmettre le message au nœud suivant s'il s'agit d'un nœud intermédiaire.",
            ] },
            { type: "p", text: "Nœud intermédiaire actif : en plus du traitement effectué par des intermédiaires de réacheminement, les intermédiaires actifs entreprennent du traitement supplémentaire pouvant modifier le message sortant selon des manières non décrites dans le message entrant — c'est-à-dire qu'ils peuvent entreprendre un traitement non décrit par un bloc d'en-tête SOAP du message arrivé. L'ensemble potentiel de services fournis par un intermédiaire actif inclut : des services de sécurité, des services d'annotation et des services de manipulation de contenu." },
          ],
        },
        {
          heading: "Principes 7 et 8 — Règles d'encodage et liaison au transport",
          blocks: [
            { type: "p", text: "Règles d'encodage : les règles d'encodage SOAP expriment les types de données définis pour l'application en XML. Elles constituent un ensemble unique de règles d'encodage défini par la spécification SOAP, fondé sur les schémas XML W3C. Il existe deux types de données :" },
            { type: "list", items: [
              "Les types de données simples : chaînes de caractères, énumérations, tableaux d'octets.",
              "Les types composés : Struct (enregistrement) qui désigne une valeur composée dans laquelle le nom d'accesseur seul permet de différencier les valeurs de membres, chaque accesseur ayant un nom unique ; Array qui désigne un tableau dont les éléments sont de même type.",
            ] },
            { type: "p", text: "Liaison du SOAP avec les protocoles du transport : a) les messages sont véhiculés soit en mode RPC ou bien en mode messagerie. b) Utilisation de SOAP avec RPC : le protocole SOAP encapsule et permet d'échanger les appels RPC en utilisant la flexibilité du XML. Les appels et réponses de méthodes RPC sont transmis encapsulés dans l'élément Body du message. Pour effectuer une invocation de méthode distante, les informations suivantes sont nécessaires : URI de l'objet cible, nom de la méthode, signature de la méthode (facultative), paramètres de la méthode et données de l'entête (facultatives)." },
          ],
        },
        {
          heading: "Principe 9 — Sécurité du SOAP",
          blocks: [
            { type: "p", text: "La structure de messages SOAP ne fournit pas directement de mécanismes pour traiter le contrôle d'accès, la confidentialité, l'intégrité et la non répudiation. De tels mécanismes peuvent être fournis sous forme d'extensions SOAP grâce au modèle d'extensibilité." },
            { type: "p", text: "Le concepteur et l'implémenteur du protocole SOAP doivent prendre en considération différents types de risques qui peuvent se produire :" },
            { type: "list", items: [
              "Risque dû au contenu du message (nœud SOAP).",
              "Risque dû au transport (nœuds intermédiaires).",
              "Risque dû aux spécifications (protocole de transport).",
            ] },
          ],
        },
        {
          heading: "Implémentation SOAP et structure des messages",
          blocks: [
            { type: "p", text: "Implémentation SOAP (voir TP1) : une multitude d'implémentations du protocole SOAP et Toolkits existent aujourd'hui, qui correspondent aux différents environnements et langages de programmation (Java, C++, C, Perl, PHP, Python..) et qui peuvent répondre aux différents besoins de l'utilisateur. Ces outils peuvent implémenter, au-delà des fonctionnalités de base communes : le processus fondamental de création, déploiement et utilisation des services web ; comprendre et réaliser tous les traitements concernant les styles d'encodage et la translation des types natifs de données vers XML et vice versa ; l'encodage, le décodage et le routage des messages SOAP à travers le protocole de transport." },
            { type: "p", text: "Structure des messages SOAP : la structure d'un message SOAP diffère selon les types d'informations transportées. Si ces informations sont toutes textuelles, le format de message simple suffit ; par contre s'il y a des informations nécessitant des formats de données binaires spécifiques (image, vidéo, son, pdf, ...), le format simple ne suffit plus et l'ensemble de ces informations doivent être encapsulées dans un format MIME qui devient indispensable." },
          ],
        },
        {
          heading: "Message simple : l'enveloppe SOAP (versions 1.1 et 1.2)",
          blocks: [
            { type: "p", text: "Un message SOAP simple est un message contenant uniquement du texte (XML). Il est composé de : a) l'enveloppe SOAP (Envelope) ; b) l'entête du message (Header) ; c) le corps du message (Body)." },
            { type: "p", text: "L'enveloppe SOAP (Envelope) : c'est l'élément récipient (conteneur) qui englobe tous les autres éléments du message. Sa déclaration est strictement obligatoire puisque c'est elle qui détermine le début et la fin de la partie SOAP dans une requête. Le mot-clé Envelope (qui doit suivre le nom local de l'enveloppe) est suivi d'un espace de nom contenant un URI qui pointe vers un schéma XML. La valeur de cet URI (schéma XML) varie selon la version du message SOAP." },
            { type: "code", lang: "xml", caption: "Déclaration de l'enveloppe d'un message SOAP version 1.1 contenant un attribut encodingStyle", code: '<SOAP-ENV:Envelope\nxmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"\nSOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">\n    ...\n</SOAP-ENV:Envelope>' },
            { type: "p", text: "Un message SOAP peut commencer par une déclaration XML (qui indique la version du langage XML utilisée)." },
            { type: "code", lang: "xml", caption: "Déclaration de l'enveloppe d'un message SOAP version 1.2 précédée d'une ligne XML", code: '<?xml version="1.0"?>\n<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">\n    ...\n</env:Envelope>' },
          ],
        },
        {
          heading: "L'entête du message (Header) et ses 4 attributs",
          blocks: [
            { type: "p", text: "L'entête du message (Header) : c'est une partie optionnelle (souvent) qui sert comme mécanisme d'extension du protocole SOAP. Elle est composée d'une ou plusieurs entrées (Header entry / Header Block), chacune d'elles pouvant être destinée à un ou plusieurs nœuds SOAP (nœuds intermédiaires et/ou récepteur final du message). Chaque entrée peut contenir des attributs ; parmi ces attributs, quatre ont une importance dans le traitement du message : encodingStyle, role (actor), mustUnderstand et relay." },
            { type: "list", items: [
              "Attribut « encodingStyle » : style d'encodage.",
              "Attribut « role » (actor pour la version 1.1) : désigne le destinataire concerné par le traitement de cette entrée. Un destinataire peut être : un émetteur, un récepteur final ou bien aucun ou plusieurs intermédiaires.",
              "Attribut « mustUnderstand » : détermine si la compréhension de l'entrée par le nœud concerné est obligatoire ou non.",
              "Attribut « relay » : détermine si une entrée dans l'entête d'un message SOAP arrivé chez un intermédiaire doit être réacheminée ou non lorsque le traitement de cette entrée est impossible par le nœud actuel. Cet attribut ne prend effet que sur les entrées non obligatoires destinées au nœud intermédiaire actuel.",
            ] },
            { type: "code", lang: "xml", caption: "Exemple — attribut role (actor)", code: '<SOAP-ENV:Header>\n  <m:local xmlns:m ="http://www.w3edfRetD.edu/local/"\n     soap:actor= http://www.w3edfRetD.edu/appli>\n     <m:language> dk </m:language>\n  </m:local>\n</soap:Header>' },
            {
              type: "table",
              headers: ["Valeur", "Nom (URI)", "Description"],
              rows: [
                ["next", "http://www.w3.org/2003/05/soap-envelope/role/next", "Tous les nœuds intermédiaires y compris le récepteur final"],
                ["none", "http://www.w3.org/2003/05/soap-envelope/role/none", "Aucun nœud n'est concerné"],
                ["UltimateReceiver", "http://www.w3.org/2003/05/soap-envelope/role/ultimateReceiver", "Récepteur final uniquement"],
              ],
            },
            { type: "callout", variant: "info", title: "Cas d'absence de l'attribut role", text: "Dans le cas d'absence de cet attribut, tous les nœuds sont concernés." },
          ],
        },
        {
          heading: "Exemples de Header : role, mustUnderstand, relay",
          blocks: [
            { type: "code", lang: "xml", caption: "Exemple — header avec role et mustUnderstand", code: '<env:Header>\n  <p:oneBlock xmlns:p="http://example.com"\n  env:role="http://example.com/Log" env:mustUnderstand="true">\n      ...\n  </p:oneBlock>\n  <q:anotherBlock xmlns:q="http://example.com"\n  env:role="http://www.w3.org/2003/05/soap-envelope/role/next">\n      ...\n  </q:anotherBlock>\n  <r:aThirdBlock xmlns:r="http://example.com"> ...\n  </r:aThirdBlock>\n</env:Header>' },
            { type: "code", lang: "xml", caption: "Exemple — mustUnderstand (l'entrée « preferences » est obligatoire)", code: "<soap:Header>\n  <ns1:preferences soap:mustUnderstand='1'>\n      <genre>Noir</genre>\n      <format>WMV</format>\n  </ns1:preferences>\n  <ns2:priority>\n      <level>low</level>\n  </ns2:priority>\n</soap:Header>" },
            { type: "callout", variant: "important", title: "Comportement mustUnderstand", text: "Dans cet exemple l'entrée « preferences » est obligatoire (attribut soap:mustUnderstand à \"1\"). Le service traitant ce message doit reconnaître ce header et le traiter correctement. Si ce header ne peut être traité correctement parce que le récepteur n'en a pas la capacité, alors un message d'erreur SOAP (SOAP fault message) doit être renvoyé." },
            { type: "code", lang: "xml", caption: "Exemple d'analyse : destinations des entrées du header", code: '<soap:Header>\n   <m:User xmlns:m="http://www.exemple.com/rights/"\n      soap:actor="http://www.exemple.com/rights/RightsManager">\n         Toto\n   </m:User>\n   <m:Session xmlns:m="http://www.exemple.com/session/"\n      soap:mustUnderstand="1">12AE3C\n   </m:Session>\n   <m:Language xmlns:m="http://www.exemple.com/lang/"\n      soap:actor="http://schemas.xmlsoap.org/soap/next"\n      soap:mustUnderstand="0"> FR\n   </m:Language>\n</soap:Header>' },
            { type: "callout", variant: "info", title: "Analyse (questions du support)", text: "Élément User → destination = Nœud RightsManager (soap:actor). Élément Session → destination = ? (pas d'attribut actor/role → tous les nœuds sont concernés). Élément Language → destination = Nœud prochain (actor = soap/next)." },
            { type: "code", lang: "xml", caption: "Exemple — attribut relay", code: '<m:Language xmlns:m="http://www.example.com/lang/"\nsoap:role="http://www.w3.org/2003/05/soap-envelope/role/next"\nsoap:mustUnderstand="0"\nsoap:relay="true">\n    FR\n</m:Language>' },
            {
              type: "table",
              headers: ["Valeur de l'attribut « role »", "Nœud concerné par le traitement ?", "Compris & traité ?", "Réacheminé ?"],
              rows: [
                ["next", "Oui", "Oui", "Non, sauf si réinséré"],
                ["next", "Oui", "Non", "Non, sauf si relay=\"true\""],
                ["Défini par l'utilisateur", "Oui", "Oui", "Non, sauf si réinséré"],
                ["Défini par l'utilisateur", "Oui", "Non", "Non, sauf si relay=\"true\""],
                ["Défini par l'utilisateur", "Non", "-", "Oui"],
                ["ultimateReceiver", "Oui", "Oui", "-"],
                ["ultimateReceiver", "Oui", "Non", "-"],
                ["ultimateReceiver", "Non", "-", "Oui"],
                ["none", "Non", "-", "Oui"],
              ],
            },
          ],
        },
        {
          heading: "Le corps du message (Body)",
          blocks: [
            { type: "p", text: "Le corps du message (Body) : c'est le bloc qui contient le corps du message. Il doit absolument être présent de manière unique dans chaque message et être contenu dans le bloc Envelope. Les entrées de cette partie sont destinées toutes au récepteur final du message. Chaque entrée peut contenir l'attribut encodingStyle." },
            { type: "p", text: "Le protocole SOAP n'exige l'utilisation d'aucune entrée prédéfinie dans le corps du message, sauf que pour le corps d'un message d'erreur qui ne doit contenir que l'entrée « fault » qui sert à reporter et expliquer la nature de l'erreur rencontrée." },
          ],
        },
        {
          heading: "Les messages d'erreur : l'entrée Fault",
          blocks: [
            { type: "p", text: "Les messages d'erreur sont des messages SOAP envoyés suite à une erreur dans le traitement d'un message de requête ; ils servent à expliquer le type d'erreur à l'expéditeur du message requête. Le corps d'un message d'erreur est constitué d'une entrée unique appelée l'entrée « Fault ». Cette entrée sert à définir le type du message d'erreur et à donner plus de détails sur cette erreur. Selon le type d'erreur signalée, l'entête du message peut exister ou non. S'il existe, il doit contenir des entrées spécifiques définies par le protocole SOAP." },
            {
              type: "table",
              headers: ["Structure (Version 1.2)", "Version 1.1"],
              rows: [
                ["Code (Value / Subcode)", "Faultcode"],
                ["Reason", "Faultstring"],
                ["Node", "---"],
                ["Detail", "Detail"],
                ["Role", "Faultactor"],
              ],
            },
            { type: "code", lang: "xml", caption: "Exemple de Fault (version 1.1)", code: '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">\n<s:Body>\n<s:Fault>\n<faultcode xmlns="">s:Client</faultcode>\n<faultstring xml:lang="fr-FR" xmlns="">\nUne opération invalide s\'est produite.\n</faultstring>\n</s:Fault>\n</s:Body>\n</s:Envelope>' },
            {
              type: "table",
              headers: ["Code d'erreur (v1.2)", "Code (v1.1)", "Désignation"],
              rows: [
                ["VersionMismatch", "VersionMismatch", "Erreur dans l'enveloppe (espace de nom ou nom local)"],
                ["MustUnderstand", "MustUnderstand", "Elément dans l'en-tête n'est pas compris ou ne peut être traité"],
                ["DataEncodingUnknown", "--", "Encodage d'un élément dans l'entête ou dans le corps non supporté par le nœud traitant"],
                ["Sender", "Client", "Message incorrect (structure) ou bien ne contient pas assez d'informations (informations d'authentification ou de paiement oubliées)"],
                ["Receiver", "Server", "Erreur dans le traitement par le nœud (exemple temps dépassé)"],
              ],
            },
            { type: "code", lang: "xml", caption: "Exemple — VersionMismatch (version 1.2)", code: '<env:Body>\n    <env:Fault>\n      <env:Code>\n        <env:Value>\n          env:VersionMismatch\n        </env:Value>\n      </env:Code>\n      <env:Reason>\n        <env:Text xml:lang="en">\n          Versions do not match\n        </env:Text>\n      </env:Reason>\n    </env:Fault>\n</env:Body>' },
          ],
        },
        {
          heading: "Message avec pièce jointe (MIME) et Manifest Header",
          blocks: [
            { type: "p", text: "L'utilisation de SOAP avec des données non XML est parfois très utile, par exemple si on désire transmettre des images à partir d'une caméra à travers une liaison sans fil en utilisant SOAP vers un serveur client. Le support des données non XML requiert un packaging complémentaire du message qui peut être fourni par une structure MIME multipart et impacte la liaison d'un message à son protocole de transport sous-jacent." },
            { type: "p", text: "L'enveloppe MIME contient un ensemble de parties MIME individuelles : la 1ère contient le message SOAP qui doit comporter un bloc Manifest Header créé par le Handler Message Manifest ; la 2ème partie MIME contient les payloads qui peuvent être des documents XML ou d'autres formats. Le Manifest Header peut contenir les éléments qui référencent les parties MIME séparées en utilisant leurs identificateurs de contenu — ceci peut être réalisé en utilisant les références XLink." },
            { type: "code", lang: "xml", caption: "Exemple de Manifest Header avec références XLink", code: "<env:Envelope xmlns:env='http://www.w3.org/2001/12/soap-envelope'\n   <env:Header>\n      <n:Manifest xmlns:n=\"http://exampleorg/manifest\">\n         <n:Reference n:id=\"image01\"\n              Xlink:href=\"cid:payload-1\"\n              Xlink:role=\"http://example.org/image\">\n            <n.description> Photo numero 1 </n:description>\n         </n:Reference>\n         <n:Reference n:id=\"image02\"\n              Xlink:href=\"cid:payload-2\"\n              Xlink:role=\"http://example.org/image\">\n            <n.description> Photo numero 2 </n:description>\n         </n:Reference>\n      </n:Manifest>\n   </env:Header>\n   <env:Body>\n   . . .\n   </env:Body>\n</env:Envelope>" },
          ],
        },
        {
          heading: "SOAP en 2026 : pourquoi il est toujours vivant ?",
          blocks: [
            { type: "p", text: "SOAP continue de rôder dans l'ombre des systèmes d'entreprise. SOAP vs REST vs gRPC :" },
            { type: "list", items: [
              "SOAP : le protocole en « costume-cravate ». Strict, verbeux, mais très structuré.",
              "REST : le « vendredi décontracté » des API. Flexible, orienté ressource, et fonctionne bien avec HTTP.",
              "gRPC : le « petit nouveau ». Rapide, efficace, et idéal pour les microservices.",
            ] },
            { type: "p", text: "Alors que REST et gRPC ont volé la vedette, SOAP a tranquillement maintenu sa position dans certains secteurs. Dans certains domaines, il prospère." },
            { type: "list", items: [
              "L'une des forces de SOAP est sa compatibilité ascendante : vous pouvez mettre à jour un service SOAP sans casser les clients existants, ce qui est une bonne nouvelle pour les entreprises avec de grands systèmes distribués qui ne peuvent pas tous être mis à jour simultanément.",
              "SOAP dans les systèmes critiques : pour les systèmes où l'échec n'est pas une option, les normes complètes de SOAP pour la sécurité, la fiabilité et les transactions sont difficiles à battre. Pensez aux institutions financières, aux systèmes de santé et aux agences gouvernementales — SOAP est essentiel à leurs opérations quotidiennes.",
            ] },
          ],
        },
        {
          heading: "Les normes WS-* (Web Services)",
          blocks: [
            { type: "p", text: "SOAP ne se limite pas à envelopper des appels de méthode dans du XML. Il est accompagné d'une suite de normes connues sous le nom de WS-* (Web Services) qui traitent divers aspects de la communication au niveau de l'entreprise — le couteau suisse des services Web :" },
            { type: "list", items: [
              "WS-Security : fournit une sécurité de bout en bout pour les messages.",
              "WS-ReliableMessaging : assure la livraison des messages même dans des conditions de réseau peu fiables.",
              "WS-AtomicTransaction : prend en charge les transactions distribuées entre plusieurs services.",
              "WS-Addressing : permet le routage des messages entre services indépendamment des protocoles de transport.",
            ] },
            { type: "p", text: "Ces normes font de SOAP une puissance pour les systèmes complexes et distribués où la sécurité et la fiabilité sont primordiales." },
            { type: "p", text: "SOAP dans le monde des microservices : bien que les microservices préfèrent généralement des protocoles plus légers comme REST ou gRPC, SOAP peut encore jouer un rôle : intégration de systèmes hérités (les services SOAP peuvent servir de pont entre les nouveaux microservices et les systèmes hérités) ; opérations complexes (pour les opérations nécessitant des transactions entre plusieurs services, le WS-AtomicTransaction de SOAP peut être inestimable)." },
            { type: "p", text: "SOAP dans le cloud : les principaux fournisseurs de cloud n'ont pas oublié SOAP — Amazon Web Services (AWS) prend en charge SOAP pour plusieurs de ses services, y compris Amazon EC2 et Amazon S3 (bien qu'ils recommandent REST pour les nouvelles implémentations) ; Microsoft Azure fournit des outils pour créer et consommer des services SOAP, reconnaissant son utilisation continue dans les environnements d'entreprise." },
            { type: "p", text: "Bibliothèques et frameworks modernes : Java — Spring Web Services offre des outils puissants pour créer et consommer des services SOAP ; Python — Zeep est un client SOAP moderne et convivial ; JavaScript — strong-soap est un client et serveur SOAP pour Node.js ; .NET — WCF (Windows Communication Foundation) est toujours actif, et .NET Core a introduit de nouvelles façons de travailler avec SOAP." },
          ],
        },
        {
          heading: "La couche de Description WSDL : niveaux abstrait et concret",
          blocks: [
            { type: "p", text: "Le protocole SOAP met à la disposition des services web un moyen standard de structuration et d'échange de messages XML. WSDL est un langage de description des capacités de services web basé sur XML. Un document WSDL décrit essentiellement le nom de la méthode utilisée, son nombre de paramètres, et leur type, ce qu'un service web offre, où il réside et comment on peut l'invoquer. La description d'un service doit inclure la définition des composants nécessaires au protocole de communication (SOAP pour les services web) et à l'interaction avec un client ou un autre service web." },
            { type: "p", text: "Les différents éléments décrits dans WSDL sont : les opérations proposées par le service web ; les données et messages échangés lors de l'appel d'une opération ; le protocole de communication ; les ports d'accès au service." },
            { type: "p", text: "Dans WSDL, il existe une séparation entre deux niveaux indépendants, respectivement nommés abstrait et concret. Le niveau abstrait regroupe les informations pouvant être réutilisées (non spécifique à un service), tandis que le niveau concret est constitué de la description des protocoles d'accès au service web (information particulière à un service). Le niveau abstrait est utilisé principalement lors du processus de sélection, tandis que le niveau concret est seulement utilisé lors de l'invocation des méthodes du service web." },
            { type: "p", text: "1. Niveau abstrait :" },
            { type: "list", items: [
              "Les types de données (types) : le document WSDL permet de décrire les types de données échangées. WSDL supporte les types élémentaires (tels que les entiers, les chaînes de caractères) et les types complexes. Si les données échangées possèdent une structure particulière (i.e. un type complexe), il est possible de les décrire par l'intermédiaire d'un schéma XML.",
              "Les messages (message) : un message correspond aux données qui sont véhiculées selon les méthodes invoquées. Chaque opération du service possède deux définitions de message : la première correspond à la requête et la seconde correspond à la réponse. La description d'un message contient le nom de l'élément en paramètre — d'entrée ou de sortie selon le type du message — et son type.",
              "Les opérations (portType) : une opération représente une unité de travail, c'est-à-dire une méthode proposée par le service web décrit. Chaque opération est identifiée par son nom.",
            ] },
            { type: "p", text: "2. Niveau concret :" },
            { type: "list", items: [
              "Le protocole de communication (binding) : la description des protocoles de communication permet de définir le protocole à utiliser pour l'appel des méthodes du service. Si nécessaire, le document WSDL peut contenir autant de descriptions de protocole que d'opérations, étant donné que le protocole de communication peut être différent pour chaque opération du service décrit.",
              "Les ports d'accès au service (service) : dans un document WSDL, l'accès au service est défini par une collection de ports d'accès. Chaque port représente la localisation du service (i.e. son URL). Un même service peut être accessible sur plusieurs ports différents. Les informations contenues dans WSDL constituent la description du profil fonctionnel du service. Le client peut invoquer le service par le biais de sa description abstraite (méthodes disponibles, paramètres d'entrée et sortie) et concrète (description des protocoles de communication et des points d'accès du service).",
            ] },
            {
              type: "table",
              headers: ["Concepts", "WSDL 1.1", "WSDL 2.0", "Niveau"],
              rows: [
                ["Types de données", "<types/>", "<types/>", "abstrait"],
                ["Opérations", "<portType/>", "<interface><operation/></interface>", "abstrait"],
                ["Messages", "<message/>", "<input/><output/>", "abstrait"],
                ["Protocole de communication", "<binding/>", "<binding/>", "concret"],
                ["Ports d'accès", "<service/>", "<service/>", "concret"],
              ],
            },
            { type: "callout", variant: "info", title: "Structure d'un document WSDL", text: "Voir TP2 pour la structure complète d'un document WSDL (mentionnée dans le support)." },
          ],
        },
        {
          heading: "UDDI moderne : les registres d'entreprise privés",
          blocks: [
            { type: "p", text: "Le concept et la technologie de l'UDDI sont toujours vivants et pertinents aujourd'hui, mais sous une forme différente : en tant que registre de services privé au sein des grandes entreprises ou d'écosystèmes spécifiques. Les grandes organisations, notamment dans la finance, le gouvernement et les télécommunications, utilisent des registres UDDI privés pour gérer leurs écosystèmes internes de SOA (Architecture Orientée Services) ou de microservices." },
            { type: "p", text: "Scénario réel — une grande banque : la banque dispose de centaines de services internes pour les données clients, les vérifications de crédit, le traitement des transactions et la détection de la fraude. Différents départements et applications doivent découvrir et utiliser ces services de manière fiable. Solution : un registre UDDI privé." },
            { type: "p", text: "Comment cela fonctionne : une équipe de développement crée un nouveau service SOAP/WSDL « Vérification d'Éligibilité aux Prêts ». Elle publie le fichier WSDL du service dans le registre UDDI privé. L'entrée du registre comprend :" },
            { type: "list", items: [
              "Business Entity (Entité Commerciale) : « Division des Prêts aux Particuliers ».",
              "Business Service (Service Commercial) : « Service d'Éligibilité aux Prêts ».",
              "Binding Template : l'URL technique (point de terminaison) où le service peut être appelé.",
              "tModel : une « empreinte digitale » technique décrivant l'interface du service et les normes qu'il respecte (par ex., une version spécifique du protocole de sécurité interne).",
            ] },
            { type: "p", text: "Une autre équipe, qui construit une nouvelle application bancaire mobile, a besoin de vérifier l'éligibilité aux prêts. Elle interroge le registre UDDI pour trouver le « Service d'Éligibilité aux Prêts » officiel et approuvé, ainsi que son point de terminaison actuel. Le registre fournit le WSDL et le point de terminaison corrects, garantissant que l'application mobile s'intègre au bon service." },
            { type: "callout", variant: "tip", title: "Exemple technologique : Apache jUDDI", text: "C'est un registre UDDI v3 open-source entièrement fonctionnel, toujours activement développé et utilisé. Les entreprises déploient jUDDI sur leurs propres serveurs pour créer un registre de services privé. Il peut être intégré à des bus de services comme Apache Camel et des plateformes de gouvernance." },
          ],
        },
        {
          heading: "Exemples complets SOAP : GetLastTradePrice, SoapUI, PayPal",
          blocks: [
            { type: "code", lang: "http", caption: "Exemple — appel du service GetLastTradePrice", code: 'Post /StockQuote HTTP/1.1\nHost : www.stockquoteserver.com\nContent-Type: text/xml; charset="utf-8"\nContent-Length: nnnn\nSOAPAction: "http://example.org/2001/06/quotes"\n<env:Envelope xmlns:env="http://www.w3.org/2001/06/soap-envelope">\n    <env:Body>\n        <m: GetLastTradePrice\n        Env:encodingStyle="http://www.w3.org/2001/06/soap-encoding"\n        Xmlns:m="http://example.org/2001/06/quotes">\n            <symbol>DIS</symbol>\n        </m: GetLastTradePrice>\n    </env:Body>\n</env:Envelope' },
            { type: "p", text: "Exemple SoapUI (outil de test) — projet testFirstService avec l'opération « addition » (bindings Soap11 et Soap12), endpoint http://localhost:2525/Axis2WSTest/services/MainServiceClass.MainServiceClassHttpSoap12Endpoint/. Opération de type Request-Response, SOAPAction urn:addition, sans attachements." },
            { type: "code", lang: "xml", caption: "Requête SOAP — addition de 6 et 2", code: '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:jsp="http://jsp.com">\n   <soap:Header/>\n   <soap:Body>\n      <jsp:addition>\n         <!--Optional:-->\n         <jsp:a>6</jsp:a>\n         <!--Optional:-->\n         <jsp:b>2</jsp:b>\n      </jsp:addition>\n   </soap:Body>\n</soap:Envelope>' },
            { type: "code", lang: "xml", caption: "Réponse SOAP — return = 8", code: '<soapenv:Envelope xmlns:soapenv="http://www.w3.org/2003/05/soap-envelope">\n   <soapenv:Body>\n      <ns:additionResponse xmlns:ns="http://jsp.com">\n         <ns:return>8</ns:return>\n      </ns:additionResponse>\n   </soapenv:Body>\n</soapenv:Envelope>' },
            { type: "callout", variant: "info", title: "Exemple — SOAP Request Envelope (PayPal/eBL)", text: "Header : eBL:RequesterCredentials avec API user-id (<username>), API user password (<password>), API Signature (<signature>), Third-party Authorization (<subject>). Body : eBL Payload — éléments spécifiques à l'API PayPal particulière." },
          ],
        },
        {
          heading: "Référence rapide — SOAP, HTTP, WSDL, UDDI",
          blocks: [
            { type: "cmd", commands: [
              { cmd: "HEAD / GET / POST / PUT", desc: "Verbes HTTP : métas informations / contenu du document / traiter les données envoyées / ranger le document" },
              { cmd: "Content-Length: nnnn", desc: "Champ HTTP obligatoire informant le serveur de la longueur du corps d'entité" },
              { cmd: "SOAPAction: \"…\"", desc: "En-tête HTTP de la requête SOAP identifiant l'opération visée (ex. http://example.org/2001/06/quotes)" },
              { cmd: "xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\"", desc: "Espace de noms de l'enveloppe SOAP 1.1" },
              { cmd: "xmlns:env=\"http://www.w3.org/2003/05/soap-envelope\"", desc: "Espace de noms de l'enveloppe SOAP 1.2" },
              { cmd: "soap:actor / soap:role", desc: "Attribut du header désignant le destinataire de l'entrée (actor = v1.1, role = v1.2)" },
              { cmd: "role = next / none / ultimateReceiver", desc: "3 valeurs particulières : tous les nœuds intermédiaires + récepteur final / aucun nœud / récepteur final uniquement" },
              { cmd: "soap:mustUnderstand=\"1\"", desc: "Rend la compréhension de l'entrée obligatoire — sinon SOAP fault message" },
              { cmd: "soap:relay=\"true\"", desc: "Réachemine l'entrée non obligatoire non traitée (nœud intermédiaire actuel)" },
              { cmd: "<faultcode>/<faultstring>/<faultactor>/<detail>", desc: "Structure Fault v1.1 (v1.2 : Code Value/Subcode, Reason, Node, Detail, Role)" },
              { cmd: "VersionMismatch / MustUnderstand", desc: "Codes d'erreur communs 1.1 et 1.2 : enveloppe invalide / élément d'en-tête non compris" },
              { cmd: "DataEncodingUnknown", desc: "Code d'erreur v1.2 uniquement : encodage non supporté par le nœud traitant" },
              { cmd: "Sender (v1.2) = Client (v1.1)", desc: "Message incorrect ou incomplet (authentification, paiement oubliés)" },
              { cmd: "Receiver (v1.2) = Server (v1.1)", desc: "Erreur dans le traitement par le nœud (ex. temps dépassé)" },
              { cmd: "<types/> <message/> <portType/>", desc: "Éléments WSDL 1.1 du niveau abstrait (types, messages, opérations)" },
              { cmd: "<binding/> <service/>", desc: "Éléments WSDL 1.1 du niveau concret (protocole de communication, ports d'accès/URL)" },
              { cmd: "<interface><operation/></interface> + <input/><output/>", desc: "Équivalents WSDL 2.0 de portType et message" },
              { cmd: "Business Entity / Business Service", desc: "Entrées UDDI : entité commerciale et service commercial" },
              { cmd: "Binding Template / tModel", desc: "Entrées UDDI : URL technique du service et empreinte technique de l'interface" },
            ] },
          ],
        },
      ],
    },
    // ──────────────── CHAPITRE 4 : WEB SERVICES REST ────────────────
    {
      id: "soa4-rest",
      title: "Chapitre 4 — Web Services REST",
      summary:
        "Architecture REST (Roy Fielding 2000), 6 propriétés et caractéristiques (stateless, cache, orienté ressources), ressources/URI/CRUD, représentations et JSON, WADL, JAX-RS (spécification et implémentations Jersey, CXF, RESTEasy, RESTLET), annotations complètes (@Path, @GET/@POST/@PUT/@DELETE, @Produces/@Consumes, @PathParam/@FormParam/@QueryParam/@HeaderParam/@CookieParam), JAXB, plateformes de gestion des API, et exemple REST complet avec Spring Boot (JPA, repository, service, contrôleur).",
      sections: [
        {
          heading: "Architecture des Web Services REST : définition",
          blocks: [
            { type: "p", text: "REST est l'acronyme de REpresentational State Transfert, défini dans la thèse de Roy Fielding en 2000. REST n'est pas un protocole ou un format, contrairement à SOAP, HTTP ou RPC, mais un style d'architecture inspiré de l'architecture du web fortement basé sur le protocole HTTP (il peut utiliser d'autres protocoles)." },
            { type: "p", text: "L'architecture des Web Services REST est utilisée dans le développement des applications orientées ressources (ROA) ou orientées données (DOA). Les applications respectant l'architecture REST sont dites RESTful." },
            { type: "list", items: [
              "Ce qu'il est : un système d'architecture ; une approche pour construire une application.",
              "Ce qu'il n'est pas : un protocole ; un format ; un standard.",
            ] },
          ],
        },
        {
          heading: "Les 6 propriétés et les caractéristiques de REST",
          blocks: [
            { type: "p", text: "REST est une architecture simple basée sur 6 propriétés principales :" },
            { type: "list", items: [
              "Performance : interaction simple entre les composants.",
              "Evolutivité : supporte une large variété de composants.",
              "Simplicité : entre les interfaces.",
              "Modification : peut être modifié sans impacter les clients.",
              "Visibilité : communication claire entre les composantes.",
              "Confiance : reprise sur panne.",
            ] },
            { type: "p", text: "Caractéristiques :" },
            { type: "list", items: [
              "Séparation Client/Serveur.",
              "Sans Etats (Stateless) : chaque requête envoyée au serveur doit contenir toutes les informations relatives à son état et est traitée indépendamment de toutes autres requêtes — aucune gestion de session ou d'état des ressources par le serveur.",
              "Possibilité de mise en cache.",
              "Orienté Ressources.",
              "Messages auto-descriptifs.",
              "Hypermedia : aucune autre action n'est supportée outre celles qui sont décrites.",
            ] },
          ],
        },
        {
          heading: "Ressources, URI et opérations CRUD",
          blocks: [
            { type: "list", items: [
              "Une ressource est un objet identifiable sur le système (Livre, Client, Prêt, ..). Une ressource n'est pas forcément une entité physique, elle peut être virtuelle (Prêt, Consultation,…).",
              "Une ressource est identifiée par une URI : une URI identifie uniquement une ressource sur le système.",
              "Une ressource peut subir des actions correspondant aux opérations effectuées sur la ressource.",
              "Actions sur les ressources : les opérations de base (CRUD) sont identifiées par les types de requêtes HTTP (GET, PUT, POST, DELETE).",
            ] },
            { type: "p", text: "Une représentation désigne les données échangées entre le client et le serveur pour une ressource :" },
            { type: "list", items: [
              "GET : le serveur renvoie au client l'état de la ressource.",
              "PUT, POST : le client envoie l'état d'une ressource au serveur. Peut être sous différents formats : JSON, XML, XHTML, CSV, Text/plain, ...",
              "DELETE : suppression de la ressource.",
            ] },
            { type: "code", lang: "http", caption: "Exemple d'API REST — gestion des étudiants", code: "GET    /api/students   → Récupérer tous les étudiants\nGET    /api/students/1 → Récupérer l'étudiant n°1\nPOST   /api/students   → Créer un nouvel étudiant\nPUT    /api/students/1 → Modifier l'étudiant n°1\nDELETE /api/students/1 → Supprimer l'étudiant n°1" },
            { type: "diagram", id: "rest-crud", caption: "REST : une ressource identifiée par une URI, manipulée via les verbes HTTP (CRUD)" },
          ],
        },
        {
          heading: "JSON et WADL",
          blocks: [
            { type: "p", text: "JSON « JavaScript Object Notation » est un format d'échange de données, facile à lire par un humain et interpréter par une machine. Basé sur JavaScript, il est complètement indépendant des langages de programmation mais utilise des conventions qui sont communes à tous les langages de programmation (C, C++, Perl, Python, Java, C#, VB, JavaScript,…). Deux structures : une collection de clefs/valeurs (Object) ; une collection ordonnée d'objets (Array)." },
            { type: "p", text: "WADL : Web Application Description Language — langage de description des services REST au format XML / Standard du W3C. Permet de décrire les éléments des services : Resource, Méthode, Paramètre, Réponse. Permet d'interagir de manière dynamique avec les applications REST. Fournit les informations descriptives d'un service permettant de construire des applications clientes exploitant les services REST. Moins exploité que le WSDL pour les Services SOAP." },
            { type: "callout", variant: "info", title: "Exemple WADL du support", text: "Le support montre un document WADL généré par Jersey 2.0 (application xmlns=\"http://wadl.dev.java.net/2009/02\") décrivant une ressource path=\"category\" avec method name=\"GET\" (id=\"test\") et réponses aux medias types application/xml et application/json, des méthodes OPTIONS, et la ressource application.wadl (méthode getWadl en GET) — base http://localhost:8080/Bibliotheque/webresources/." },
          ],
        },
        {
          heading: "JAX-RS : la spécification Java et ses implémentations",
          blocks: [
            { type: "p", text: "Implémentation d'un web service REST — JAX-RS API (développer des Web Services REST avec JAVA) : JAX-RS est l'acronyme de Java API for RestFul Web Services. Version courante 2.0 décrite par JSR 339. Depuis la version 1.1, il fait partie intégrante de la spécification Java EE 6. Il décrit la mise en œuvre des services REST web côté serveur. Son architecture se repose sur l'utilisation des classes et des annotations pour développer les services web." },
            { type: "p", text: "JAX-RS est une spécification et autour de cette spécification sont développées plusieurs implémentations :" },
            { type: "list", items: [
              "JERSEY : implémentation de référence fournie par Oracle (http://jersey.java.net). Version actuelle 2.24.1 implémentant les spécifications de JAX-RS 2.0 ; intégrée dans Glassfish et l'implémentation Java EE (6,7) ; supportée dans Netbeans.",
              "CXF : fournie par Apache (http://cfx.apache.org).",
              "RESTEasy : fournie par JBOSS.",
              "RESTLET : l'un des premiers frameworks implémentant REST pour Java.",
            ] },
            { type: "p", text: "JAX-RS est basé sur POJO (Plain Old Java Object) en utilisant des annotations spécifiques JAX-RS. Pas de modifications dans les fichiers de configuration. Le service est déployé dans une application web. Pas de possibilité de développer le service à partir d'un WADL contrairement à SOAP. Approche Bottom/Up : développer et annoter les classes — le WSDL est automatiquement généré par l'API." },
            { type: "p", text: "La spécification JAX-RS dispose d'un ensemble d'annotations permettant d'exposer une classe et ses méthodes dans un service web : @Path ; @GET, @POST, @PUT, @DELETE ; @Produces, @Consumes ; @PathParam." },
          ],
        },
        {
          heading: "L'annotation @Path (classe et méthode)",
          blocks: [
            { type: "p", text: "L'annotation @Path permet de définir l'URI des ressources modélisées par une classe. À positionner au-dessus de la déclaration d'une classe. Syntaxe : @Path(\"nom_de_la_ressource\"). Elle expose la classe comme ressource dans le WS : @Path définit la racine des ressources (Root Racine Ressources) et sa valeur correspond à l'URI relative de la ressource." },
            { type: "code", lang: "java", caption: "Exemple @Path sur une classe", code: '@Path("hello")\npublic class HelloWorld {\n  @GET\n  @Produces(MediaType.TEXT_PLAIN)\n  public String sayHello()\n  {\n    return "Hello World!";\n  }\n}' },
            { type: "p", text: "@Path peut être utilisée pour annoter des méthodes d'une classe. Elle permet de définir des URIs pour les actions sur une ressource. L'URI résultante est la concaténation entre la valeur de @Path de la classe et celle de la méthode." },
            { type: "code", lang: "java", caption: "Exemple @Path sur une méthode", code: '@Path("hello")\npublic class CategoryFacade {\n  @GET\n  @Produces(MediaType.TEXT_PLAIN)\n  @Path("greetings")\n  public String hello()\n  {\n    return "Hello World!";\n  }\n}' },
          ],
        },
        {
          heading: "@Produces et @Consumes",
          blocks: [
            { type: "p", text: "@Produces, placée sur les méthodes, spécifie le format de données renvoyées par la méthode — correspond à la clef Content-Type de l'en-tête des requêtes HTTP." },
            { type: "p", text: "@Consumes spécifie le format des données d'entrées de la méthode. Placée au-dessus de la déclaration des méthodes, elle correspond à la clef Accept de l'en-tête des requêtes HTTP." },
            { type: "p", text: "Valeurs @Consumes/@Produces — plusieurs Mime-Type :" },
            { type: "list", items: [
              "text/plain",
              "application/json",
              "application/xml",
              "application/x-www-form-urlencoded",
              "application/csv",
              "…",
            ] },
          ],
        },
        {
          heading: "Annotations dynamiques et paramètres (@PathParam, @FormParam, @QueryParam, @HeaderParam, @CookieParam)",
          blocks: [
            { type: "p", text: "Annotation dynamique : la valeur définie dans l'annotation @Path n'est pas forcément une constante, elle peut être variable. Possibilité de définir des expressions plus complexes, appelées Template Parameters. Les contenus complexes sont délimités par « {} ». Possibilité de mixer dans la valeur @Path des expressions régulières." },
            { type: "p", text: "Paramètres dynamiques :" },
            { type: "list", items: [
              "@PathParam : récupérer dans l'URL (Path).",
              "@FormParam : récupérer dans le formulaire (Form).",
              "@QueryParam : récupérer dans les paramètres de l'URL (Query).",
              "@HeaderParam : récupérer dans l'entête de la requête (Header).",
              "@CookieParam : récupérer les informations de cookies.",
            ] },
            { type: "code", lang: "java", caption: "Exemple — dire bonjour à la personne passée en paramètre (@FormParam)", code: '@Path("hello")\npublic class HelloWorld {\n  @GET\n  @Produces(MediaType.TEXT_PLAIN)\n  @Path("calcul")\n  public String calculPost(@FormParam("nom") String nom){\n    return "Hello " + nom;\n  }\n}' },
            { type: "code", lang: "java", caption: "Exemple — somme de deux nombres via @PathParam", code: '@Path("hello")\npublic class HelloWorld {\n  @GET\n  @Produces(MediaType.TEXT_PLAIN)\n  @Path("calcul/{nb1}+{nb2}")\n  public double calcul(@PathParam("nb1") int nb1,\n                       @PathParam("nb2") int nb2){\n    return nb1 + nb2;\n  }\n}' },
            { type: "code", lang: "java", caption: "Exemple — somme de deux nombres via @QueryParam", code: '@Path("hello")\npublic class HelloWorld {\n  @GET\n  @Produces(MediaType.TEXT_PLAIN)\n  @Path("calcul/")\n  public double calcul(@QueryParam("nb1") int nb1,\n                       @QueryParam("nb2") int nb2){\n    return nb1 + nb2;\n  }\n}' },
          ],
        },
        {
          heading: "Les 4 annotations de verbes HTTP : @GET, @POST, @PUT, @DELETE",
          blocks: [
            { type: "p", text: "Quatre types principaux : @GET — opération de lecture (Read) ; @POST — opération d'écriture (Create) ; @PUT — opération d'écriture (Create/Update) ; @DELETE — opération de suppression (Delete)." },
            { type: "list", items: [
              "@GET : placé sur les méthodes à exposer pour des opérations de lecture ; répond uniquement aux requêtes HTTP de type GET ; accepte des données dans l'URL de la requête ; une annotation @Consumes serait obsolète ; @Produces format des données de retour (obligatoire).",
              "@POST : précise que la méthode n'est accessible que par des requêtes HTTP de type POST ; opération d'écriture (Create) ; doit recevoir logiquement des paramètres dans le corps de la requête ; peut accepter des paramètres dans l'URL ; @Consumes pour définir le format des données d'entrée ; @Produces format des données de retour (optionnel).",
              "@PUT : précise que la méthode n'est accessible que par des requêtes HTTP de type PUT ; opération d'écriture (Create, Update) ; doit recevoir logiquement des données dans le corps de la requête ; peut accepter des paramètres dans l'URL ; @Consumes pour définir le format des données d'entrée ; @Produces format des données de retour (optionnel).",
              "@DELETE : précise que la méthode n'est accessible que par des requêtes HTTP de type DELETE ; opération de suppression (Delete) ; peut accepter des paramètres dans l'URL ; @Consumes serait obsolète ; @Produces format des données de retour (pas obligatoire).",
            ] },
            { type: "code", lang: "java", caption: "Exemple @FormParam avec @Consumes", code: '@Path("hello")\npublic class HelloWorld {\n  @GET\n  @Produces(MediaType.TEXT_PLAIN)\n  @Consumes(MediaType.APPLICATION_FORM_URLENCODED)\n  @Path("calcul/")\n  public double calcul(@FormParam("nb1") int nb1,\n                       @FormParam("nb2") int nb2)\n  { return nb1 + nb2; }\n}' },
            { type: "p", text: "@GET, @POST, @PUT, @DELETE permettent de mapper une méthode à un type de requête HTTP. Ne sont utilisables que sur des méthodes. Plusieurs méthodes peuvent avoir le même chemin : le mapping uri/méthode est fait automatiquement par JAX-RS en fonction du type de la requête." },
          ],
        },
        {
          heading: "JAXB : mapping XML ↔ POJO",
          blocks: [
            { type: "p", text: "La spécification JAXB permet d'utiliser des types personnalisés (i.e. Class). JAXB permet de faire le mapping XML à POJO : manipuler les objets directement sans avoir à gérer directement du XML. JAXB définit des annotations permettant de faire le mapping : @XmlRootElement, @XmlElement, @XmlType." },
            { type: "p", text: "Toute classe (entité) annotée par @XmlRootElement est automatiquement mappée en XML. Le format JSON est également supporté. Le format adopté dépend des annotations :" },
            { type: "list", items: [
              "@Consumes → Désérialisation.",
              "@Produces → Sérialisation.",
              "XML : text/xml, application/xml…",
              "JSON : application/json.",
            ] },
          ],
        },
        {
          heading: "Plateformes de gestion des API : le successeur moderne de l'UDDI",
          blocks: [
            { type: "p", text: "Pour les API REST modernes et les microservices, l'UDDI a été largement remplacé par les Plateformes de Gestion des API. Ces plateformes offrent les mêmes fonctions principales — description, découverte et intégration — mais d'une manière plus conviviale et centrée sur le web." },
            {
              type: "table",
              headers: ["Concept UDDI", "Équivalent Moderne (Gestion des API)"],
              rows: [
                ["Business Entity", "Fournisseur d'API / Équipe"],
                ["Business Service", "Produit API / Collection"],
                ["Binding Template", "Route / Endpoint de la Passerelle API"],
                ["tModel", "Schéma d'API (OpenAPI/Swagger)"],
                ["Registre UDDI", "Portail Développeur / Catalogue d'API"],
              ],
            },
            { type: "p", text: "Exemples :" },
            { type: "list", items: [
              "Google Cloud API Gateway / Apigee : vous publiez la Spécification OpenAPI de votre API (le WSDL moderne) sur Apigee. Apigee agit comme la passerelle et le registre gérés. Les développeurs découvrent les API disponibles via un Portail Développeur — un catalogue de tous les services, consultable et documenté — remplissant directement le rôle de « Découverte » de l'UDDI.",
              "AWS API Gateway & AWS Service Catalog : vous déployez votre API sur AWS API Gateway. Vous pouvez enregistrer votre API en tant que produit dans AWS Service Catalog pour la découverte interne et la gouvernance. Les équipes de l'organisation peuvent parcourir le Service Catalog pour trouver et consommer les API internes approuvées.",
              "Azure API Management : vous importez le schéma OpenAPI de votre API dans Azure API Management. Il génère automatiquement un portail développeur qui agit comme un registre de services. Les autres développeurs de votre organisation peuvent visiter ce portail pour découvrir, apprendre et obtenir les clés pour utiliser votre API.",
              "Open-Source : Kong Gateway & Kong Developer Portal : similaire aux fournisseurs cloud, Kong fournit une passerelle et un portail développeur personnalisable où toutes les API enregistrées sont listées et documentées pour une découverte et une intégration faciles.",
            ] },
          ],
        },
        {
          heading: "Exemple REST complet avec Spring Boot : configuration et dépendances",
          blocks: [
            { type: "p", text: "Exemple REST — les étapes : 1) Configuration de la base de données ; 2) Ajout des dépendances pour MySQL et javax.persistence ; 3) Création des entités JPA ; 4) Création d'un Service ; 5) Création d'un contrôleur REST ; 6) Lancement de l'application ; 7) Tester l'application." },
            { type: "code", lang: "properties", caption: "Étape 1 : Configuration H2 (en mémoire) — src/main/resources/application.properties", code: "# Configuration pour H2 Database\nspring.datasource.url=jdbc:h2:mem:testdb\nspring.datasource.driverClassName=org.h2.Driver\nspring.datasource.username=sa\nspring.datasource.password=password\nspring.jpa.database-platform=org.hibernate.dialect.H2Dialect\nspring.h2.console.enabled=true" },
            { type: "code", lang: "properties", caption: "Étape 1 : Configuration MySQL", code: "# Configuration pour MySQL\nspring.datasource.url=jdbc:mysql://localhost:3306/nom_de_la_base\nspring.datasource.driverClassName=com.mysql.cj.jdbc.Driver\nspring.datasource.username=root\nspring.datasource.password=motdepasse\nspring.jpa.hibernate.ddl-auto=update\nspring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect" },
            { type: "code", lang: "xml", caption: "Étape 2 : Dépendances MySQL et javax.persistence (pom.xml)", code: "<dependency>\n  <groupId>mysql</groupId>\n  <artifactId>mysql-connector-java</artifactId>\n</dependency>\n<dependency>\n  <groupId>javax.persistence</groupId>\n  <artifactId>javax.persistence-api</artifactId>\n  <version>2.2</version> <!-- ou la version qui vous convient -->\n</dependency>" },
          ],
        },
        {
          heading: "Entité JPA, Repository, Service et Contrôleur REST",
          blocks: [
            { type: "code", lang: "java", caption: "Étape 3.1 : Entité Utilisateur (src/main/java/com/example/springbootdb/model)", code: 'package com.example.springbootdb.model;\nimport javax.persistence.Entity;\nimport javax.persistence.Id;\nimport javax.persistence.GeneratedValue;\nimport javax.persistence.GenerationType;\n@Entity\npublic class Utilisateur {\n  @Id\n  @GeneratedValue(strategy = GenerationType.IDENTITY)\n  private Long id;\n  private String nom;\n  private String email;\n  // Getters et Setters\n  public Long getId() { return id; }\n  public void setId(Long id) { this.id = id; }\n  public String getNom() { return nom; }\n  public void setNom(String nom) { this.nom = nom; }\n  public String getEmail() { return email; }\n  public void setEmail(String email) { this.email = email; }\n}' },
            { type: "code", lang: "java", caption: "Étape 3.2 : Repository (package repository)", code: 'package com.example.springbootdb.repository;\nimport com.example.springbootdb.model.Utilisateur;\nimport org.springframework.data.jpa.repository.JpaRepository;\npublic interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {\n  // Nous pouvons ajouter des méthodes de recherche personnalisées ici, par exemple :\n  Utilisateur findByNom(String nom);\n}' },
            { type: "code", lang: "java", caption: "Étape 4 : Service (package service)", code: 'package com.example.springbootdb.service;\nimport com.example.springbootdb.model.Utilisateur;\nimport com.example.springbootdb.repository.UtilisateurRepository;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.stereotype.Service;\nimport java.util.List;\nimport java.util.Optional;\n@Service\npublic class UtilisateurService {\n  @Autowired\n  private UtilisateurRepository utilisateurRepository;\n  public List<Utilisateur> getAllUtilisateurs() {\n    return utilisateurRepository.findAll();\n  }\n  public Optional<Utilisateur> getUtilisateurById(Long id) {\n    return utilisateurRepository.findById(id);\n  }\n  public Utilisateur saveUtilisateur(Utilisateur utilisateur) {\n    return utilisateurRepository.save(utilisateur);\n  }\n  public void deleteUtilisateur(Long id) {\n    utilisateurRepository.deleteById(id);\n  }\n}' },
            { type: "code", lang: "java", caption: "Étape 5 : Contrôleur REST (package controller)", code: 'package com.example.springbootdb.controller;\nimport com.example.springbootdb.model.Utilisateur;\nimport com.example.springbootdb.service.UtilisateurService;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.web.bind.annotation.*;\nimport java.util.List;\nimport java.util.Optional;\n@RestController\n@RequestMapping("/api/utilisateurs")\npublic class UtilisateurController {\n  @Autowired\n  private UtilisateurService utilisateurService;\n  @GetMapping\n  public List<Utilisateur> getAllUtilisateurs() {\n    return utilisateurService.getAllUtilisateurs();\n  }\n  @GetMapping("/{id}")\n  public Optional<Utilisateur> getUtilisateurById(@PathVariable Long id) {\n    return utilisateurService.getUtilisateurById(id);\n  }\n  @PostMapping\n  public Utilisateur saveUtilisateur(@RequestBody Utilisateur utilisateur) {\n    return utilisateurService.saveUtilisateur(utilisateur);\n  }\n  @DeleteMapping("/{id}")\n  public void deleteUtilisateur(@PathVariable Long id) {\n    utilisateurService.deleteUtilisateur(id);\n  }\n}' },
          ],
        },
        {
          heading: "Lancement et tests de l'API REST",
          blocks: [
            { type: "code", lang: "java", caption: "Étape 6 : Lancer l'application (classe principale Spring Boot)", code: 'package com.example.springbootdb;\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\n@SpringBootApplication\npublic class SpringbootDbApplication {\n  public static void main(String[] args) {\n    SpringApplication.run(SpringbootDbApplication.class, args);\n  }\n}' },
            { type: "p", text: "L'application sera accessible sur http://localhost:8080/." },
            { type: "p", text: "Étape 7 : Tester l'application — vous pouvez maintenant tester votre API avec un outil comme Postman ou curl : GET /api/utilisateurs pour obtenir tous les utilisateurs ; GET /api/utilisateurs/{id} pour obtenir un utilisateur par ID ; POST /api/utilisateurs pour ajouter un utilisateur ; DELETE /api/utilisateurs/{id} pour supprimer un utilisateur." },
            { type: "code", lang: "http", caption: "Exemples de requêtes", code: 'GET http://localhost:8080/api/utilisateurs\nPOST http://localhost:8080/api/utilisateurs avec un body JSON comme :\n{\n  "nom": "Jean Dupont",\n  "email": "jean.dupont@example.com"\n}' },
          ],
        },
        {
          heading: "Référence rapide — annotations JAX-RS et Spring Boot",
          blocks: [
            { type: "cmd", commands: [
              { cmd: '@Path("nom_de_la_ressource")', desc: "Définit l'URI de la ressource (classe = racine, méthode = concaténée) — Template Parameters {…}" },
              { cmd: "@GET / @POST / @PUT / @DELETE", desc: "Mappe la méthode aux requêtes HTTP : lecture (Read) / écriture (Create) / écriture (Create-Update) / suppression (Delete)" },
              { cmd: "@Produces(MediaType.TEXT_PLAIN)", desc: "Format de retour — clef Content-Type (obligatoire pour @GET)" },
              { cmd: "@Consumes(MediaType.APPLICATION_FORM_URLENCODED)", desc: "Format des données d'entrée — clef Accept (obsolète sur @GET/@DELETE)" },
              { cmd: "@PathParam(\"nb1\")", desc: "Récupère le paramètre depuis l'URL (Path), ex. calcul/{nb1}+{nb2}" },
              { cmd: "@QueryParam(\"nb1\")", desc: "Récupère le paramètre depuis les paramètres de l'URL (Query)" },
              { cmd: "@FormParam(\"nom\")", desc: "Récupère la donnée du formulaire (application/x-www-form-urlencoded)" },
              { cmd: "@HeaderParam / @CookieParam", desc: "Récupère l'entête de la requête / les informations de cookies" },
              { cmd: "@XmlRootElement", desc: "JAXB : toute classe (entité) annotée est automatiquement mappée en XML (aussi @XmlElement, @XmlType)" },
              { cmd: "@RestController + @RequestMapping(\"/api/utilisateurs\")", desc: "Spring Boot : contrôleur REST + URI de base du contrôleur" },
              { cmd: "@GetMapping / @PostMapping / @DeleteMapping", desc: "Spring Boot : mappings des méthodes du contrôleur (avec \"/{id}\" pour le détail)" },
              { cmd: "@PathVariable / @RequestBody", desc: "Spring Boot : paramètre d'URL {id} / corps de requête JSON désérialisé" },
              { cmd: "@Service + @Autowired", desc: "Spring Boot : bean de service et injection du repository/service" },
              { cmd: "@Entity + @Id + @GeneratedValue(strategy = GenerationType.IDENTITY)", desc: "JPA : entité Utilisateur avec id auto-incrémenté (Long)" },
              { cmd: "JpaRepository<Utilisateur, Long>", desc: "Repository : findAll, findById, save, deleteById + findByNom(String nom)" },
              { cmd: "spring.datasource.url=jdbc:h2:mem:testdb", desc: "Configuration H2 en mémoire (driver org.h2.Driver, dialecte H2Dialect, console activée)" },
              { cmd: "spring.datasource.url=jdbc:mysql://localhost:3306/nom_de_la_base", desc: "Configuration MySQL (driver com.mysql.cj.jdbc.Driver, dialecte MySQL8Dialect, ddl-auto=update)" },
              { cmd: "POST http://localhost:8080/api/utilisateurs", desc: "Test avec Postman ou curl — body JSON {\"nom\": \"Jean Dupont\", \"email\": \"jean.dupont@example.com\"}" },
            ] },
          ],
        },
      ],
    },
    // ──────────────── CHAPITRE 5 : WEB SERVICES gRPC (+ BILANS) ────────────────
    {
      id: "soa5-grpc",
      title: "Chapitre 5 — Web Services gRPC & Bilans",
      summary:
        "gRPC (framework RPC open-source de Google, HTTP/2, Protocol Buffers), workflow de développement, caractéristiques et avantages (performance, contrat strict, 4 modèles de communication incluant le streaming), mailles de services (Istio, Kubernetes), évolution des registres de services (UDDI public → privé → gestion des API → service mesh), exemple gRPC avec Spring Boot (student.proto, StudentGrpcService), et bilans comparatifs SOAP/REST/gRPC + comment choisir.",
      sections: [
        {
          heading: "gRPC : définition et architecture",
          blocks: [
            { type: "p", text: "gRPC (Remote Procedure Calls) est un framework RPC open-source développé par Google qui utilise HTTP/2 comme protocole de transport et Protocol Buffers (protobuf) comme format d'échange de données et comme interface de définition de service (IDL). Il est idéal pour la communication inter-services." },
            { type: "p", text: "Architecture gRPC : Client → Protobuf (sérialisation) → HTTP/2 → Serveur → Protobuf (désérialisation)." },
            { type: "diagram", id: "grpc-arch", caption: "Architecture gRPC : sérialisation protobuf sur HTTP/2" },
          ],
        },
        {
          heading: "Workflow de développement et caractéristiques",
          blocks: [
            { type: "p", text: "Workflow de développement :" },
            { type: "list", ordered: true, items: [
              "Définition : création du fichier .proto.",
              "Génération : compilation pour générer le code client/serveur.",
              "Implémentation : développement de la logique métier.",
              "Déploiement : lancement du serveur et connexion des clients.",
            ] },
            { type: "p", text: "Caractéristiques :" },
            { type: "list", items: [
              "Performance : format binaire (Protocol Buffers).",
              "Bidirectionnel : communication dans les deux sens.",
              "Multi-langage : client et serveur dans différents langages.",
              "Streaming : envoi de données en continu.",
            ] },
          ],
        },
        {
          heading: "Avantages principaux de gRPC",
          blocks: [
            { type: "p", text: "Performances supérieures :" },
            { type: "list", items: [
              "Binaire : format Protobuf plus compact que JSON.",
              "HTTP/2 : multiplexing, compression des headers, connexions persistantes.",
              "Faible latence : sérialisation/désérialisation rapide.",
            ] },
            { type: "p", text: "Contrat strict :" },
            { type: "list", items: [
              "Interface bien définie via les fichiers .proto.",
              "Génération de code automatique pour multiples langages.",
              "Validation automatique des données.",
            ] },
            { type: "p", text: "Modèles de communication avancés :" },
            { type: "list", items: [
              "Unary RPC : requête-réponse classique.",
              "Server Streaming : le serveur envoie un flux de réponses.",
              "Client Streaming : le client envoie un flux de requêtes.",
              "Bidirectional Streaming : communication bidirectionnelle en temps réel.",
            ] },
          ],
        },
        {
          heading: "Mailles de services (Service Meshes) : l'évolution des microservices",
          blocks: [
            { type: "p", text: "Dans un monde cloud-native, basé sur Kubernetes, le rôle de la découverte de services est devenu encore plus automatisé et est géré par les Mailles de Services (Service Meshes). Exemple : Istio Service Mesh." },
            { type: "p", text: "Comment cela fonctionne : vous ne « publiez » pas manuellement un service. Lorsque vous déployez un microservice sur Kubernetes, vous définissez une ressource Kubernetes Service. Un maillage de services comme Istio découvre automatiquement ce service." },
            { type: "list", items: [
              "Le « Registre » : le plan de contrôle (control plane) du maillage de services (Istiod) agit comme un registre de services dynamique en temps réel. Il connaît chaque instance de service (pod) et son état de santé.",
              "Découverte & Intégration : le « plan de données » (data plane) — les proxies Envoy — interroge le plan de contrôle pour trouver les instances disponibles d'un service qu'ils doivent appeler. Ceci est entièrement automatisé et transparent pour le développeur.",
            ] },
            {
              type: "table",
              headers: ["Époque", "Technologie", "Cas d'usage principal", "Exemple de « registre »"],
              rows: [
                ["Années 2000", "UDDI Public", "Découverte globale des services web", "Défunt : nœuds publics IBM, Microsoft"],
                ["Ère SOA", "UDDI Privé", "Gouvernance SOA interne", "Apache jUDDI déployé sur site"],
                ["Économie des API", "Gestion des API", "Gérer et monétiser les API REST", "Google Apigee, Azure API Management"],
                ["Cloud-Native", "Mailles de Services", "Communication automatisée des microservices", "Istio, Linkerd, Consul (plan de contrôle)"],
              ],
            },
          ],
        },
        {
          heading: "Exemple gRPC avec Spring Boot : dépendances et fichier .proto",
          blocks: [
            { type: "p", text: "Exemple gRPC — implémentation avec Spring Boot. Les étapes : 1) Dépendances ; 2) Définition du service Protobuf ; 3) Implémentation du service gRPC (fichier : StudentGrpcService.java) ; 4) Configuration gRPC (fichier : application.properties)." },
            { type: "code", lang: "xml", caption: "Étape 1 : Dépendances (pom.xml)", code: '<dependencies>\n  <!-- gRPC Spring Boot Starter -->\n  <dependency>\n    <groupId>net.devh</groupId>\n    <artifactId>grpc-server-spring-boot-starter</artifactId>\n    <version>2.14.0.RELEASE</version>\n  </dependency>\n  <!-- Protobuf Java -->\n  <dependency>\n    <groupId>com.google.protobuf</groupId>\n    <artifactId>protobuf-java</artifactId>\n    <version>3.21.12</version>\n  </dependency>\n</dependencies>\n<build>\n  <plugins>\n    <!-- Plugin pour générer le code Protobuf -->\n    <plugin>\n      <groupId>org.xolstice.maven.plugins</groupId>\n      <artifactId>protobuf-maven-plugin</artifactId>\n      <version>0.6.1</version>\n      <configuration>\n        <protocArtifact>com.google.protobuf:protoc:3.21.12:exe:${os.detected.classifier}</protocArtifact>\n        <pluginId>grpc-java</pluginId>\n        <pluginArtifact>io.grpc:protoc-gen-grpc-java:1.52.1:exe:${os.detected.classifier}</pluginArtifact>\n      </configuration>\n      <executions>\n        <execution>\n          <goals>\n            <goal>compile</goal>\n            <goal>compile-custom</goal>\n          </goals>\n        </execution>\n      </executions>\n    </plugin>\n  </plugins>\n</build>' },
            { type: "code", lang: "protobuf", caption: "Étape 2 : Définition du service Protobuf (src/main/proto/student.proto)", code: 'syntax = "proto3";\noption java_package = "com.example.university.grpc";\noption java_multiple_files = true;\n// Définition du service gRPC\nservice StudentService {\n  // RPC simple : un request → un response\n  rpc GetStudent (GetStudentRequest) returns (StudentResponse);\n  // RPC pour créer un étudiant\n  rpc CreateStudent (CreateStudentRequest) returns (StudentResponse);\n  // Streaming : serveur envoie plusieurs réponses\n  rpc GetAllStudents (GetAllStudentsRequest) returns (stream StudentResponse);\n}\n// Messages (équivalents aux DTOs)\nmessage GetStudentRequest {\n  int64 student_id = 1;\n}\nmessage CreateStudentRequest {\n  string first_name = 1;\n  string last_name = 2;\n  string email = 3;\n  int32 age = 4;\n}\nmessage GetAllStudentsRequest {\n  // Peut être vide ou contenir des filtres\n}\nmessage StudentResponse {\n  int64 student_id = 1;\n  string first_name = 2;\n  string last_name = 3;\n  string email = 4;\n  int32 age = 5;\n}' },
            { type: "p", text: "Dans le fichier .proto : service définit les méthodes RPC ; message définit des structures de données (comme les classes) ; rpc définit une méthode distante ; stream permet l'envoi/réception de multiples messages." },
          ],
        },
        {
          heading: "Implémentation du service gRPC (StudentGrpcService) et configuration",
          blocks: [
            { type: "code", lang: "java", caption: "Étape 3 : StudentGrpcService.java — GetStudent", code: 'package com.example.university.grpc;\nimport com.example.university.models.Student;\nimport com.example.university.services.StudentService;\nimport io.grpc.stub.StreamObserver;\nimport net.devh.boot.grpc.server.service.GrpcService;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport java.util.List;\n@GrpcService\npublic class StudentGrpcService extends StudentServiceGrpc.StudentServiceImplBase {\n  @Autowired\n  private StudentService studentService;\n  @Override\n  public void getStudent(GetStudentRequest request,\n      StreamObserver<StudentResponse> responseObserver) {\n    Long studentId = request.getStudentId();\n    try {\n      Student student = studentService.getStudentById(studentId)\n          .orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));\n      // Convertir l\'entité Student en StudentResponse gRPC\n      StudentResponse response = StudentResponse.newBuilder()\n          .setStudentId(student.getId())\n          .setFirstName(student.getFirstName())\n          .setLastName(student.getLastName())\n          .setEmail(student.getEmail())\n          .setAge(student.getAge())\n          .build();\n      // Envoyer la réponse\n      responseObserver.onNext(response);\n      responseObserver.onCompleted();\n    } catch (Exception e) {\n      responseObserver.onError(io.grpc.Status.NOT_FOUND\n          .withDescription("Étudiant non trouvé")\n          .asRuntimeException());\n    }\n  }' },
            { type: "code", lang: "java", caption: "Étape 3 (suite) : CreateStudent", code: '@Override\npublic void createStudent(CreateStudentRequest request,\n    StreamObserver<StudentResponse> responseObserver) {\n  try {\n    // Convertir la request gRPC en entité Student\n    Student student = new Student(\n        request.getFirstName(),\n        request.getLastName(),\n        request.getEmail(),\n        request.getAge()\n    );\n    Student savedStudent = studentService.createStudent(student);\n    // Construire la réponse\n    StudentResponse response = StudentResponse.newBuilder()\n        .setStudentId(savedStudent.getId())\n        .setFirstName(savedStudent.getFirstName())\n        .setLastName(savedStudent.getLastName())\n        .setEmail(savedStudent.getEmail())\n        .setAge(savedStudent.getAge())\n        .build();\n    responseObserver.onNext(response);\n    responseObserver.onCompleted();\n  } catch (Exception e) {\n    responseObserver.onError(io.grpc.Status.ALREADY_EXISTS\n        .withDescription("Erreur création étudiant: " + e.getMessage())\n        .asRuntimeException());\n  }\n}' },
            { type: "code", lang: "java", caption: "Étape 3 (suite) : GetAllStudents (server streaming)", code: '@Override\npublic void getAllStudents(GetAllStudentsRequest request,\n    StreamObserver<StudentResponse> responseObserver) {\n  List<Student> students = studentService.getAllStudents();\n  // Envoyer chaque étudiant dans le stream\n  for (Student student : students) {\n    StudentResponse response = StudentResponse.newBuilder()\n        .setStudentId(student.getId())\n        .setFirstName(student.getFirstName())\n        .setLastName(student.getLastName())\n        .setEmail(student.getEmail())\n        .setAge(student.getAge())\n        .build();\n    responseObserver.onNext(response);\n  }\n  // Terminer le stream\n  responseObserver.onCompleted();\n}\n}' },
            { type: "code", lang: "properties", caption: "Étape 4 : Configuration gRPC (application.properties)", code: "# Port gRPC\ngrpc.server.port=9090\n# Base de données H2 (développement)\nspring.datasource.url=jdbc:h2:mem:universitydb\nspring.datasource.driverClassName=org.h2.Driver\nspring.datasource.username=sa\nspring.datasource.password=\n# Console H2\nspring.h2.console.enabled=true" },
          ],
        },
        {
          heading: "Bilans SOAP / REST / gRPC et comment choisir",
          blocks: [
            {
              type: "table",
              headers: ["Technologie", "Avantages", "Inconvénients"],
              rows: [
                ["SOAP", "Standardisé · Interopérabilité · Sécurité (WS-Security)", "Performances (enveloppe SOAP supplémentaire) · Complexité, lourdeur"],
                ["REST", "Simplicité de mise en œuvre · Lisibilité par un humain · Evolutivité · Repose sur les principes du web · Représentations multiples (XML, JSON,…) · API publique · Communication browser-frontend · Développement rapide", "Sécurité restreinte par l'emploi des méthodes HTTP"],
                ["gRPC", "Communication microservices · Performance critique · Environnement contrôlé · Streaming de données", "Navigateur supporté limité · Plus complexe · Cache manuel"],
              ],
            },
            { type: "p", text: "Comment choisir ? Choisir entre SOAP, REST, gRPC ou tout autre protocole n'est pas seulement une décision technique — c'est une décision commerciale. Les facteurs à considérer incluent :" },
            { type: "list", items: [
              "Infrastructure existante et compétences au sein de l'organisation.",
              "Exigences d'interopérabilité avec les partenaires ou les clients.",
              "Besoins de conformité réglementaire.",
              "Exigences de performance.",
              "Plans de maintenance et de scalabilité à long terme.",
            ] },
            { type: "callout", variant: "info", title: "Conclusion du support", text: "Dans certains cas, les normes robustes et la compatibilité ascendante de SOAP peuvent l'emporter sur la simplicité et les avantages de performance des nouveaux protocoles." },
          ],
        },
        {
          heading: "Référence rapide — gRPC, .proto et services",
          blocks: [
            { type: "cmd", commands: [
              { cmd: 'syntax = "proto3";', desc: "Version de la syntaxe Protocol Buffers (1re ligne du fichier .proto)" },
              { cmd: "option java_package = \"…\";", desc: "Package Java du code généré (avec java_multiple_files = true)" },
              { cmd: "service StudentService { … }", desc: "Définit les méthodes RPC du service" },
              { cmd: "rpc GetStudent (Request) returns (Response);", desc: "Méthode distante unary : un request → un response" },
              { cmd: "rpc GetAllStudents (…) returns (stream StudentResponse);", desc: "Server streaming : le serveur envoie plusieurs réponses" },
              { cmd: "message StudentResponse { int64 id = 1; }", desc: "Structure de données (équivalent DTO) — champs numérotés" },
              { cmd: "net.devh:grpc-server-spring-boot-starter", desc: "Dépendance Maven gRPC Spring Boot (2.14.0.RELEASE) + protobuf-java 3.21.12" },
              { cmd: "protobuf-maven-plugin (0.6.1)", desc: "Plugin Maven générant le code Protobuf (goals compile + compile-custom)" },
              { cmd: "@GrpcService extends …ImplBase", desc: "Classe d'implémentation du service gRPC dans Spring Boot" },
              { cmd: "responseObserver.onNext(response); onCompleted();", desc: "StreamObserver : envoyer la réponse / terminer le stream" },
              { cmd: "responseObserver.onError(Status.NOT_FOUND…)", desc: "Erreur gRPC (ex. Status.ALREADY_EXISTS à la création)" },
              { cmd: "grpc.server.port=9090", desc: "Port du serveur gRPC (application.properties)" },
              { cmd: "Istiod (control plane) / Envoy (data plane)", desc: "Service mesh : registre dynamique temps réel / proxies qui l'interrogent" },
              { cmd: "BPMN → BPEL", desc: "Orchestration : modélisation visuelle de la séquence → code XML d'exécution" },
              { cmd: "invoke / receive / reply", desc: "Activités de base BPEL (interaction avec les services externes)" },
              { cmd: "WS-CDL", desc: "Chorégraphie : description XML de l'échange de messages (non exécutable, succède à WSCI)" },
            ] },
          ],
        },
      ],
    },
    // ──────────────── CHAPITRE 6 : ORCHESTRATION & CHORÉGRAPHIE ────────────────
    {
      id: "soa6-orchestration",
      title: "Chapitre 6 — Orchestration & Chorégraphie",
      summary:
        "Composant de service (vue externe/interne), bus d'entreprise (ESB), données d'échange et persistantes, du service au processus (service composite, mashup), utilité de la composition, orchestration des services (moteur, BPMN, BPEL, activités de base et structurées) et ses limites, chorégraphie (WS-CDL, collaboration décentralisée, composition dynamique) et ses limites, et comparaison Orchestration vs Chorégraphie.",
      sections: [
        {
          heading: "Composant de service : vue externe et vue interne",
          blocks: [
            { type: "p", text: "Le composant de service est la brique de base de l'architecture, composé d'une vue externe et interne." },
            { type: "list", items: [
              "La vue externe ou spécification : expose la facette service proprement dite. Elle est constituée d'un ensemble d'opérations de service regroupées en interfaces et de l'appareillage pour les utiliser (types de données échangées, contrat de service, propriétés…). Elle est décrite par un fichier WSDL ou équivalent. Elle comporte aussi le Périmètre (domaine d'appartenance, visibilité), les Données d'échange (TDE : Types de données d'échange) et les Contrats (contrat d'utilisation des services).",
              "La vue interne : décrit le contenu du composant. Elle est masquée aux consommateurs du composant. Elle contient des informations relatives à la logique interne (détail de traitement ou bases de données) et des références vers les services utilisés par le composant.",
            ] },
          ],
        },
        {
          heading: "Bus d'entreprise (ESB) et données",
          blocks: [
            { type: "p", text: "Bus d'entreprise : le schéma du support montre Application 1, Application 2 et un MainFrame (ainsi qu'un SGBD, un ERP et d'autres ressources) reliés à un Bus de communication (ESB) au travers d'adaptateurs — le bus permet à des applications a priori hétérogènes de communiquer." },
            { type: "p", text: "Données :" },
            { type: "list", items: [
              "Données d'échange : informations véhiculées entre les participants à travers l'invocation des opérations de service. TDE (Types de donnée d'échange) : établissent la sémantique, la structure et le format de ces données, définis à l'aide de schémas XML ou classes UML.",
              "Données persistantes : informations contenues et gérées dans les bases de données, structurées de façon habituelle (SGBD relationnel, par exemple).",
            ] },
          ],
        },
        {
          heading: "Du service au processus",
          blocks: [
            { type: "p", text: "Le processus (processus métier) est un service plus complexe. Le processus est un service qui est le résultat de la composition d'autres services moins complexes. Parmi les huit caractéristiques déjà vues concernant les services, on a dit qu'un service doit être composable, c'est-à-dire qu'il peut être une pièce parmi un ensemble de pièces formant un nouveau service, ce dernier pouvant lui-même être regroupé avec d'autres, et ainsi de suite." },
            { type: "p", text: "Un processus métier peut être vu comme étant une collaboration entre un ensemble de services, dans laquelle (collaboration) chaque service doit intervenir pour accomplir le travail des autres." },
            { type: "p", text: "Exemples :" },
            { type: "list", items: [
              "Inscription d'un étudiant à une école : Inscription (nom, adresse…) ; Paiement des frais d'inscription (services d'une banque) ; Attribution d'un numéro d'étudiant.",
              "Chercher un logement dans un foyer d'étudiants (CROUS) : Inscription à partir du numéro d'étudiant ; Choisir le type de logement ; Paiement des frais d'hébergement ; Attribution d'un numéro au foyer.",
              "S'abonner au transport : Sélectionner la ligne entre l'école et le logement ; Choix de la réduction proposée (num d'étudiant) ; Inscription et Paiement.",
            ] },
            { type: "p", text: "Le support illustre aussi le passage de 3 sites séparés (site de l'école : inscription, payement, générer numéro étudiant INE ; site du CROUS : inscription à partir INE, payement, générer numéro CROUS ; site de transport de BUS : inscription à partir INE et CROUS, payement, générer carte BUS) vers un site web unique adapté pour couvrir les besoins métiers des sous SI, appuyé sur un Moteur Orchestration qui invoque les SI de l'Ecole, du CROUS et du BUS." },
          ],
        },
        {
          heading: "Service composite, mashup et utilité de la composition",
          blocks: [
            { type: "p", text: "Implémentation d'une application (offerte comme service) dont la logique implique l'invocation d'opérations offertes par d'autres services : le nouveau service est appelé service composite et les services invoqués sont des composants de service. Du point de vue du client, un service composite et un service basique (implémenté par un langage de programmation traditionnel) sont indistinguables. Notion de Service Mashup : forme plus légère de composition, pour les applications web." },
            { type: "p", text: "Utilité :" },
            { type: "list", items: [
              "Capacité d'invoquer les services d'une manière asynchrone.",
              "Gestion des exceptions et de l'intégrité transactionnelle — les études montrent que presque 80% du temps de construction des processus métier est passé dans la gestion des exceptions.",
              "Fourniture d'un framework dynamique, flexible et adaptable pour une séparation claire entre la logique métier et les services utilisés.",
            ] },
            { type: "p", text: "Dépendamment des besoins, la composition des services peut se faire en utilisant deux approches : l'Orchestration et la Chorégraphie." },
          ],
        },
        {
          heading: "Orchestration des services",
          blocks: [
            { type: "list", items: [
              "Un processus central prend le contrôle sur les web services impliqués et coordonne l'exécution des différentes opérations sur ces web services.",
              "Les services invoqués ne savent pas qu'ils sont invoqués par un service métier complexe ; seul le coordinateur le sait.",
              "L'orchestration est centralisée avec des définitions explicites des opérations et l'ordre d'invocation des web services.",
              "Utilisée par les processus métier privés.",
            ] },
            { type: "p", text: "L'orchestration décrit l'interaction entre services, en incluant la logique d'affaire et l'ordre d'exécution des interactions. Ces interactions peuvent traverser des applications ou/et des organisations, et résultent en un modèle de processus à multi étapes transactionnel et de longue durée." },
            { type: "p", text: "Elle consiste à avoir un service « chef d'orchestre » qui joue le rôle d'intermédiaire entre les services en les appelant suivant un enchaînement prédéfini (script d'orchestration). Ce service est souvent appelé « moteur d'orchestration ». L'orchestration peut être vue comme une composition ascendante dans laquelle les services web appelés existent au préalable et n'ont pas besoin de savoir qu'ils font partie d'un processus plus gros — c'est uniquement le moteur d'orchestration qui connaît la logique de composition." },
            { type: "p", text: "Pour des compositions de services simples, l'orchestration est faite dans le code (Java, C#...) résidant dans le composite. Pour des orchestrations complexes, un outil est utilisé pour : créer un modèle visuel d'une séquence, générer le code qui exécute cette séquence dans un environnement d'exécution dédié → approche BPM (Business Process Model)." },
          ],
        },
        {
          heading: "BPMN et BPEL",
          blocks: [
            { type: "list", items: [
              "BPMN (Business Process Modeling Notation) : succède à BPML (Business Process Modeling Langage). Définit une représentation visuelle de la séquence.",
              "BPEL (Business Process Execution Language) ou BPEL4WS (BPEL for Web Services) : code qui exécute la séquence, exprimé en XML. Utilise WSDL à deux niveaux : interagir avec les ressources requises par le processus, et décrire le processus BPEL lui-même.",
            ] },
            { type: "p", text: "BPEL définit deux types d'activités :" },
            { type: "list", items: [
              "Activités de base : interagissant avec les services externes (invoke, receive, reply).",
              "Activités structurées : contrôle de flux du processus interne (flux séquentiel, condition, boucle…).",
            ] },
          ],
        },
        {
          heading: "Limites de l'orchestration",
          blocks: [
            { type: "list", items: [
              "Approche centralisée autour du moteur de composition : en cas de panne, plus de composition.",
              "Schéma de composition statique : en cas de changement dans les besoins, le schéma devient invalide.",
            ] },
            { type: "diagram", id: "orch-vs-choreo", caption: "Orchestration (moteur central qui contrôle les web services) vs Chorégraphie (collaboration décentralisée entre orchestrations)" },
          ],
        },
        {
          heading: "La chorégraphie",
          blocks: [
            { type: "p", text: "Au lieu d'un coordinateur central, chaque web service impliqué dans la chorégraphie sait exactement quand exécuter ses opérations et avec qui interagir. La chorégraphie est un effort de collaboration focalisé sur l'échange de messages dans des processus métiers publics ; elle est supportée par le standard WS-CDL (Web Service Choregraphy Definition Language)." },
            { type: "p", text: "Tous les participants à la chorégraphie doivent savoir :" },
            { type: "list", items: [
              "Leurs rôles dans le processus métier.",
              "Les opérations à exécuter.",
              "Les messages à échanger.",
              "Le temps d'échange de ces messages.",
            ] },
            { type: "p", text: "WS-CDL (Web Services Choregraphy Description Language) : succède à WSCI (Web Services Choregraphy Interface). Langage de description en XML. Décrit les messages qui sont impliqués dans l'échange collaboratif entre services. Ne définit pas de processus métier exécutable (contrairement à BPEL). Un seul document WS-CDL spécifie la contribution d'un partenaire à l'échange de messages." },
          ],
        },
        {
          heading: "Chorégraphie : collaboration décentralisée et composition dynamique",
          blocks: [
            { type: "p", text: "La chorégraphie trace la séquence des messages qui peuvent impliquer de multiples parties et de multiples sources, en incluant les clients, fournisseurs et partenaires. Elle est typiquement associée à l'échange de messages publics qui se produisent entre de multiples services web plutôt qu'à un processus métier spécifique exécuté par une seule partie." },
            { type: "p", text: "La collaboration de services dans une chorégraphie se passe d'une manière décentralisée sans utiliser un procédé principal — elle dispense du rôle de chef d'orchestre, mais plutôt plusieurs procédés distribués (services participants à la collaboration) dont chacun doit être au courant de la logique du (ou des) processus auquel il appartient. Ainsi la logique de contrôle est supervisée par chacun des services intervenant dans la composition et l'exécution du processus est alors distribuée." },
            { type: "p", text: "Pour concevoir une chorégraphie, les interactions entre les différents services doivent être décrites. Ainsi la description de chaque service intervenant dans la chorégraphie inclut la description de sa participation dans le processus." },
            { type: "p", text: "La chorégraphie est aussi appelée composition dynamique, du fait que l'exécution n'est pas régie de manière statique comme dans une orchestration. Dans une chorégraphie, à chaque pas de l'exécution (i.e. à chaque étape de la composition), un service web choisit le service web qui lui succède et implémente ainsi une partie de la chorégraphie. La composition de type chorégraphie n'est pas connue, ni décrite à l'avance." },
            { type: "p", text: "WS-CDL contient un ensemble d'interactions, représentant les échanges de messages entre parties. Il décrit l'ordre des messages dans lequel ils doivent être observés : si cet ordre n'est pas respecté, WS-CDL considère les messages comme hors de la séquence, donc erronés." },
          ],
        },
        {
          heading: "Limites de la chorégraphie et synthèse Orchestration vs Chorégraphie",
          blocks: [
            { type: "p", text: "Limites de la chorégraphie :" },
            { type: "list", items: [
              "Collaborations et partenaires statiques : si les besoins ou partenaires changent, les collaborations deviennent impossibles.",
              "Pas de langage pour exprimer les besoins : les travaux existants proposent une chorégraphie statique.",
            ] },
            { type: "p", text: "Le schéma final du support montre deux orchestrations (Moteur d'orchestration1 contrôlant Web service1 et Web service2, et Moteur d'orchestration2 contrôlant ses propres web services) qui collaborent par chorégraphie : Request purchase order → Acknowledge, puis Accept purchase order → Acknowledge." },
            {
              type: "table",
              headers: ["Critère", "Orchestration", "Chorégraphie"],
              rows: [
                ["Contrôle", "centralisé (moteur d'orchestration / chef d'orchestre)", "décentralisé (chaque service connaît sa logique)"],
                ["Connaissance de la composition", "seul le coordinateur le sait", "chaque participant sait quand exécuter ses opérations et avec qui interagir"],
                ["Nature des processus", "processus métier privés", "processus métier publics (échange de messages)"],
                ["Ordre d'invocation", "définitions explicites, script d'orchestration", "à chaque pas, un service choisit son successeur (composition dynamique)"],
                ["Standard", "BPMN (modélisation) + BPEL (exécution XML)", "WS-CDL (description, pas de processus exécutable)"],
                ["Limite", "panne du moteur ; schéma statique", "collaborations/partenaires statiques ; pas de langage pour exprimer les besoins"],
              ],
            },
          ],
        },
      ],
    },
  ],
  quiz: [
    // ─── Chapitre 1 : Introduction ───
    { id: "soa1-01", chapter: "soa1-intro", question: "Dans la problématique d'intégration, qu'est-ce que l'approche spaghetti ?", options: ["Un protocole de transport", "Un langage de description de services", "Une communication point à point entre applications", "Un nœud central de communication"], correct: 2, explanation: "L'approche spaghetti est une communication point à point entre les applications indépendantes, qui mène à des interconnexions redondantes." },
    { id: "soa1-02", chapter: "soa1-intro", question: "Que fait l'EAI (Enterprise Application Integration) ?", options: ["Elle standardise les messages SOAP", "Elle remplace l'approche spaghetti en mettant à disposition un nœud central de communication", "Elle crée des services web réutilisables", "Elle remplace XML par JSON"], correct: 1, explanation: "L'EAI réunit les différents programmes d'une organisation au sein d'un même espace et allège l'architecture d'interconnexion grâce à un nœud central de communication." },
    { id: "soa1-03", chapter: "soa1-intro", question: "Parmi les limites des solutions (spaghetti, EAI), laquelle est correcte ?", options: ["Développement coûteux, interconnexions redondantes, grande complexité, réutilisation et maintenance difficiles", "Trop de standards ouverts", "Absence de protocole HTTP", "Incompatibilité avec XML"], correct: 0, explanation: "Les limites citées : développement coûteux, interconnexions redondantes, grande complexité, réutilisation et maintenance difficile." },
    { id: "soa1-04", chapter: "soa1-intro", question: "Sur quelles technologies existantes les services web se basent-ils ?", options: ["CORBA et DCOM", "RMI et EJB", "FTP et SMTP uniquement", "XML et HTTP"], correct: 3, explanation: "Les services web garantissent l'interopérabilité et se basent sur des technologies qui existent déjà : XML et HTTP." },
    { id: "soa1-05", chapter: "soa1-intro", question: "Qu'est-ce qu'un service selon la définition du cours ?", options: ["Une base de données partagée", "Un protocole réseau", "Un comportement défini par contrat, réalisé et fourni par tout composant, utilisé par tout composant sur la base unique du contrat", "Un programme compilé lié à un OS"], correct: 2, explanation: "Définition exacte : « Un service est un comportement défini par contrat, qui peut être réalisé et fourni par tout composant pour être utilisé par tout composant sur la base unique du contrat. »" },
    { id: "soa1-06", chapter: "soa1-intro", question: "Un service web est indépendant de quoi ?", options: ["Du langage XML", "Du système d'exploitation et du langage de programmation", "Du réseau", "Du protocole HTTP"], correct: 1, explanation: "Un service web est une entité logicielle publiable et accessible en XML et protocoles standards du web, indépendante du système d'exploitation et du langage de programmation." },
    { id: "soa1-07", chapter: "soa1-intro", question: "Qu'est-ce que la SOA ?", options: ["Un modèle de conception qui rend des composants logiciels réutilisables via des interfaces de services utilisant un langage commun", "Un protocole de transport sécurisé", "Un annuaire de services public", "Un format binaire compact"], correct: 0, explanation: "SOA (Service-Oriented Architecture) : modèle de conception qui rend des composants logiciels réutilisables grâce à des interfaces de services qui utilisent un langage commun pour communiquer via un réseau." },
    { id: "soa1-08", chapter: "soa1-intro", question: "Parmi les avantages de la SOA, on trouve :", options: ["Recentralisation des systèmes", "Lenteur d'exécution", "Manque de maturité des standards", "Mise sur le marché accélérée, maintenance facilitée, fiabilité améliorée, grande disponibilité"], correct: 3, explanation: "Les autres options sont des inconvénients du bilan SOA. Les avantages incluent : accélération du time-to-market, infrastructure réutilisée, coûts réduits, maintenance facilitée, évolutivité, fiabilité, disponibilité." },
    { id: "soa1-09", chapter: "soa1-intro", question: "Pourquoi la SOA est-elle coûteuse en main-d'œuvre ?", options: ["Les services sont payants", "Elle interdit la réutilisation du code", "Plusieurs équipes sont nécessaires pour configurer et gérer chaque code de service", "Elle exige du matériel spécifique"], correct: 2, explanation: "Plusieurs équipes d'unités informatiques et de développeurs sont nécessaires pour configurer et gérer chaque code de service — coût surtout supporté par les prestataires tiers mais qui peut retomber sur l'entreprise et ses clients." },
    { id: "soa1-10", chapter: "soa1-intro", question: "Quel exemple concret de composition de services le cours cite-t-il ?", options: ["Un système de fichiers", "Un compilateur Java", "Un service de livraison de nourriture utilisant PayPal (paiement), FedEx (livraison) et Bluehost (hébergement)", "Un navigateur web"], correct: 2, explanation: "Exemple du support : une société de livraison de nourriture en ligne utilise PayPal pour le paiement, FedEx pour la livraison et Bluehost pour l'hébergement web." },
    { id: "soa1-11", chapter: "soa1-intro", question: "Quel est le rôle de l'annuaire de services (Service Registry) ?", options: ["Il stocke les données applicatives", "C'est l'annuaire des services publiés par les providers (UDDI)", "Il exécute les services", "Il chiffre les messages"], correct: 1, explanation: "L'annuaire de services (Service Registry) est l'annuaire des services publiés par les providers — UDDI. Il reçoit et enregistre les descriptions, et répond aux recherches des clients." },
    { id: "soa1-12", chapter: "soa1-intro", question: "Que doit respecter le consommateur pour invoquer un service ?", options: ["La spécification du service (son contrat)", "Le langage de programmation du fournisseur", "Le système d'exploitation du serveur", "La licence du fournisseur"], correct: 0, explanation: "Pour invoquer un service, le consommateur doit respecter la spécification du service (ou aussi dit son contrat)." },
    { id: "soa1-13", chapter: "soa1-intro", question: "Qui est chargé de « définir le service, publier sa description dans l'annuaire et réaliser les opérations » ?", options: ["Le client (Service Requestor)", "L'annuaire (Discovery Agency)", "L'ESB", "Le fournisseur de service (Service Provider)"], correct: 3, explanation: "Le fournisseur (Service Provider) : 1) définit le service (implémentation, description, contrat d'utilisation) ; 2) publie sa description dans l'annuaire ; 3) réalise les opérations." },
    { id: "soa1-14", chapter: "soa1-intro", question: "Le client (Service Requestor) est chargé de :", options: ["Déployer le service web", "Gérer la sécurité des messages", "Lancer la recherche, obtenir la description via l'annuaire, utiliser le service", "Enregistrer les descriptions publiées"], correct: 2, explanation: "Le client : 1) lance la recherche sur un service approprié ; 2) obtient la description du service grâce à l'annuaire ; 3) utilise le service." },
    { id: "soa1-15", chapter: "soa1-intro", question: "Parmi les limites de la programmation orientée objets face à la SOA :", options: ["Pas de réutilisation possible du code", "Granularité encore trop fine et couplage fort", "Absence d'encapsulation", "Trop d'abstraction"], correct: 1, explanation: "Limites de la POO : architecture peu visible, interactions enfouies dans le code, évolution difficile, consistance délicate, granularité trop fine (mal adaptée à la grande échelle), couplage fort." },
    { id: "soa1-16", chapter: "soa1-intro", question: "Quelles solutions d'applications distribuées « ont fait leur preuve » selon le cours ?", options: ["DCOM, CORBA, EJB, RMI, .Net", "SOAP, REST, gRPC", "HTTP, FTP, SMTP", "BPEL, BPMN, WS-CDL"], correct: 0, explanation: "Solutions distribuées (orientées composants) ayant fait leur preuve : DCOM, CORBA, EJB, RMI, .Net, … — mais avec des faiblesses : formats spécifiques, interopérabilité limitée à la même solution, protocoles spécifiques, couplage fort (spaghetti)." },
    { id: "soa1-17", chapter: "soa1-intro", question: "Quel est l'ordre du niveau d'abstraction grandissant ?", options: ["Orientée Services → Composants → Objets → Procédurale", "Orientée Objets → Procédurale → Services → Composants", "Orientée Composants → Services → Procédurale → Objets", "Programmation Procédurale → Orientée Objets → Orientée Composants → Orientée Services"], correct: 3, explanation: "Niveau d'abstraction grandissant : Programmation Procédurale, Programmation Orientée Objets, Programmation Orientée Composants, Programmation Orientée Services." },
    { id: "soa1-18", chapter: "soa1-intro", question: "Qu'est-ce que l'approche Bottom-Up ?", options: ["Écrire le contrat avant l'implémentation", "Générer le WSDL depuis le code", "Commencer par un petit groupe et ajouter jusqu'à obtenir une grande entreprise", "Décomposer un système jusqu'au petit service de base"], correct: 2, explanation: "Bottom-Up : commencer par un petit groupe et ajouter jusqu'à obtenir une grande entreprise. Top-down est l'inverse : décomposition d'un système ou problème jusqu'à l'obtention d'un petit service de base." },
    { id: "soa1-19", chapter: "soa1-intro", question: "Parmi les inconvénients du bilan SOA :", options: ["Tolérance aux pannes faible", "Recentralisation des systèmes, coûts initiaux importants, lenteur d'exécution (services asynchrones), manque de maturité des standards", "Pas d'accès à distance", "Code non réutilisable"], correct: 1, explanation: "Bilan SOA inconvénients : recentralisation (charge serveur), coûts de conception/développement initiaux financiers et humains, lenteur d'exécution (services asynchrones), manque de maturité des standards (course W3C/OASIS)." },
    { id: "soa1-20", chapter: "soa1-intro", question: "L'architecture orientée service partage avec les composants (applications distribuées) :", options: ["La dépendance au langage", "Boîte noire, indépendance de la localisation, neutralité vis-à-vis des protocoles de transport", "Le couplage fort", "Les formats propriétaires"], correct: 1, explanation: "La SOA partage avec les composants : boîte noire (séparation interface/implémentation), indépendance de la localisation, neutralité vis-à-vis des protocoles de transport — et partage l'aspect modulaire avec la POO." },
    // ─── Chapitre 2 : Les Services ───
    { id: "soa2-01", chapter: "soa2-services", question: "Citez les 8 aspects d'un service.", options: ["Syntaxique, sémantique, QoS, SLA, policies, XSD, WADL, JAXB", "Contrat standardisé, couplage lâche, abstraction, réutilisabilité, autonomie, sans état, découvrabilité, composabilité", "Sécurité, fiabilité, disponibilité, performance, scalabilité, testabilité, maintenabilité, portabilité", "WSDL, SOAP, UDDI, ESB, HTTP, XML, JSON, gRPC"], correct: 1, explanation: "Les 8 aspects : exposé à travers un contrat standardisé ; couplage lâche ; abstrait (boîte noire) ; réutilisable ; autonome ; sans état ; découvrable ; composable." },
    { id: "soa2-02", chapter: "soa2-services", question: "Le contrat syntaxique présente :", options: ["Le nom du traitement, ses paramètres d'entrée/sortie et les contraintes structurelles", "Les engagements du service (temps de réponse, plages horaires)", "Les règles métier et les exceptions", "La politique de prix"], correct: 0, explanation: "Le contrat syntaxique (interface) propose une représentation technique : nom du traitement, paramètres d'entrée et de sortie, contraintes structurelles (format et contrainte sur les données)." },
    { id: "soa2-03", chapter: "soa2-services", question: "Que précise le contrat de niveau de service (QoS & SLA) ?", options: ["Le nom des opérations", "Les types de données XSD", "L'encodage des messages", "Temps de réponse maximum, plages horaires d'accessibilité, temps de reprise, procédures en cas de panne et de support"], correct: 3, explanation: "Le contrat QoS/SLA précise les engagements : temps de réponse max attendu, plages horaires d'accessibilité, temps de reprise après interruption, procédures en cas de panne, procédures de prise en charge du support… (QoS = Quality of Service, SLA = Service Level Agreement)." },
    { id: "soa2-04", chapter: "soa2-services", question: "Dans un service web, où le document WSDL se situe-t-il dans le contrat ?", options: ["Contrat QoS", "Ni l'un ni l'autre", "Contrat syntaxique (description de l'interface et des modalités d'accès)", "Contrat sémantique uniquement"], correct: 2, explanation: "Le WSDL décrit l'interface du service (modalités d'accès) → contrat syntaxique. Les policies → sémantique ; les XSD → à la fois syntaxique et sémantique ; les documentations → sémantique + QoS/SLA." },
    { id: "soa2-05", chapter: "soa2-services", question: "Qu'est-ce que le couplage technique ?", options: ["Il relie deux bases de données", "Il impose au consommateur de connaître le protocole d'échange du fournisseur", "Il impose au client de connaître le format d'échange", "Il lie le contrat à l'implémentation"], correct: 1, explanation: "Couplage technique : le consommateur doit connaître le protocole d'échange du fournisseur — à grande échelle, cela complique voire interdit l'évolution du socle technique. Le couplage fonctionnel, lui, impose de connaître le format d'échange." },
    { id: "soa2-06", chapter: "soa2-services", question: "Quel type de couplage faut-il réduire pour découpler consommateur et service ?", options: ["Le couplage Service/Contrat (quatrième type)", "Le couplage logique/implémentation", "Le couplage technologie", "Le couplage ressources"], correct: 0, explanation: "Les 4 couplages (implémentation, technologies, services composites, processus) sont inévitables ; c'est le quatrième type (Couplage Service/Contrat) qu'il faut réduire pour permettre un découplage entre le consommateur et le service." },
    { id: "soa2-07", chapter: "soa2-services", question: "Que signifie l'approche Contract first ?", options: ["Le contrat dérive de l'implémentation", "Le contrat est généré après le déploiement", "Le contrat est écrit par le client", "Le contrat est écrit préalablement à l'implémentation du service (approche préférable)"], correct: 3, explanation: "Contract first : le contrat est écrit avant l'implémentation — approche toujours préférable (couplage positif). Contract last (le contrat dérive de l'implémentation) est à exclure car il couple le contrat à l'environnement du service." },
    { id: "soa2-08", chapter: "soa2-services", question: "Que signifie la prédictibilité d'un service ?", options: ["Il garantit les délais de livraison", "Il met le résultat en cache", "Son comportement et sa réponse à une requête ne doivent pas varier (concurrence d'accès par exemple)", "Il prédit les pannes"], correct: 2, explanation: "La prédictibilité signifie que le comportement et la réponse ne doivent pas varier (ex. suite à une concurrence d'accès). Ce principe est induit par le respect du contrat." },
    { id: "soa2-09", chapter: "soa2-services", question: "Un service qui fait « trop peu de choses » (granularité trop fine) :", options: ["Violera le contrat sémantique", "Sera sans valeur ajoutée métier et devra collaborer avec d'autres services", "Aura de mauvaises performances", "Sera très réutilisable"], correct: 1, explanation: "Service trop fin = traitement atomique sans valeur ajoutée métier, non pertinent d'un point de vue métier. Service trop large = mauvaises performances et fonctionnalités inutiles pour le consommateur." },
    { id: "soa2-10", chapter: "soa2-services", question: "Quelle différence entre autonomie de niveau de service et autonomie pure ?", options: ["L'autonomie de niveau de service est plus forte", "En autonomie de niveau de service les services peuvent encore partager certaines ressources ; en autonomie pure, logique et ressources sont sous contrôle exclusif du service", "Il n'y a aucune différence", "L'autonomie pure s'applique aux services existants"], correct: 1, explanation: "Autonomie de niveau de service : frontières claires, services indépendants mais peuvent partager des ressources. Autonomie pure : logique et ressources propriété du service sous contrôle exclusif — atteignable lors de la création de nouveaux services, difficile dans un système existant." },
    { id: "soa2-11", chapter: "soa2-services", question: "Pourquoi préférer des services sans état (stateless) ?", options: ["La gestion d'états pose des problèmes de compréhension/maintenabilité, de réutilisation et de performances", "Parce que l'état est interdit par le W3C", "Parce que les états ne peuvent pas être stockés", "Pour économiser le XML"], correct: 0, explanation: "La gestion d'états pose 3 problèmes : compréhension/maintenabilité (complexité accrue), réutilisation (comportement non visible dans le contrat, enchaînement d'invocations prédéfini), performances (stockage des états en mémoire ou disque). La gestion d'états est déléguée aux consommateurs." },
    { id: "soa2-12", chapter: "soa2-services", question: "Que stocke le repository de services (découvrabilité) ?", options: ["Les données applicatives des services", "Les messages SOAP en transit", "Les mots de passe des consommateurs", "Les métadonnées nécessaires à la recherche des services et à la récupération des artefacts (Spécifications, SLAs, Policies, Schémas XML, WSDL, Interfaces…)"], correct: 3, explanation: "Le repository outille l'inventaire des services disponibles : métadonnées pour la recherche et récupération des artefacts (Spécifications, SLAs, Policies, Schémas XML, WSDL, Interfaces, …)." },
    { id: "soa2-13", chapter: "soa2-services", question: "Quel principe est mis en œuvre grâce à la composabilité ?", options: ["PULL/POST", "DNS round-robin", "Separation of concerns", "Contract first"], correct: 2, explanation: "C'est grâce à la composabilité que sera mis en œuvre le principe de « separation of concerns » : décomposer un problème métier de haut niveau en plus petites unités réutilisables — les services." },
    { id: "soa2-14", chapter: "soa2-services", question: "Quelle démarche de conception favoriser pour la réutilisation ?", options: ["Toujours Pull", "Aucune en particulier : les 3 (Bottom-up Push/Pull, Top-down) peuvent coexister selon le contexte", "Toujours Top-down", "Toujours Push"], correct: 1, explanation: "Il n'y a pas de démarche à favoriser en particulier ; les 3 peuvent coexister. Points clés : démarche itérative et collaborative, penser le service comme une offre de services, ne pas considérer l'urbanisation comme une cible en soi." },
    { id: "soa2-15", chapter: "soa2-services", question: "Que signifie B2B ?", options: ["Business to Business : application destinée au commerce de professionnel à professionnel", "Business to Consumer : destinée au grand public", "Browser to Backend", "Blockchain to Business"], correct: 0, explanation: "B2B (Business to Business) : application/site destiné au commerce de professionnel à professionnel. B2C (Business to Consumer) : destiné au grand public." },
    { id: "soa2-16", chapter: "soa2-services", question: "Dans l'exemple Renault, quels sont les avantages de l'intégration de la chaîne logistique par services web ?", options: ["Augmentation des stocks pour sécuriser", "Suppression des fournisseurs", "Facturation manuelle", "Réduction des stocks, livraison juste-à-temps, moins d'erreurs humaines"], correct: 3, explanation: "Renault connecte son ERP à ceux de ses fournisseurs : quand le stock d'un composant est bas, la commande est automatique. Avantages : réduction des stocks, livraison juste-à-temps, moins d'erreurs humaines." },
    { id: "soa2-17", chapter: "soa2-services", question: "Quel mécanisme d'authentification le cours cite-t-il pour la connexion via compte Facebook/Google ?", options: ["LDAP", "SAML uniquement", "OAuth", "Kerberos"], correct: 2, explanation: "Se connecter à un site via son compte Facebook/Google utilise des services web d'authentification (OAuth)." },
    { id: "soa2-18", chapter: "soa2-services", question: "Quels sont les 3 types de services web cités ?", options: ["XML, JSON, CSV", "SOAP, REST, gRPC", "SOAP, WSDL, UDDI", "HTTP, FTP, SMTP"], correct: 1, explanation: "Les types de Services Web sont : SOAP, REST et gRPC." },
    // ─── Chapitre 3 : SOAP ───
    { id: "soa3-01", chapter: "soa3-soap", question: "Que contient le WSDL ?", options: ["La description du service et de son utilisation, échangée entre fournisseur et client", "Les messages SOAP chiffrés", "La liste des serveurs DNS", "Le code source du service"], correct: 0, explanation: "WSDL (Web Service Description Language) : contrat/description contenant la description du service et de son utilisation, échangée entre le fournisseur de service et le client." },
    { id: "soa3-02", chapter: "soa3-soap", question: "Quel est le but de l'ESB (Enterprise Service Bus) ?", options: ["Stocker les descriptions WSDL", "Remplacer le protocole HTTP", "Générer les fichiers .proto", "Permettre la communication d'applications qui à la base ne sont pas pensées pour fonctionner ensemble"], correct: 3, explanation: "L'ESB est le moyen par lequel s'effectue la communication entre client et fournisseur ; son but est avant tout de permettre la communication des applications qui à la base ne sont pas pensées pour fonctionner ensemble." },
    { id: "soa3-03", chapter: "soa3-soap", question: "Quelles sont les 4 couches fonctionnelles de la pile protocolaire SOAP WS (de bas en haut) ?", options: ["HTTP, HTTPS, FTP, SMTP", "Header, Body, Envelope, Fault", "Transport (HTTP), Communication (SOAP), Description (WSDL), Découverte/Publication (UDDI)", "UDDI, WSDL, SOAP, XML"], correct: 2, explanation: "Pile protocolaire simplifiée : Transport (HTTP) → Communication (SOAP) → Description (WSDL) → Découverte/Publication (UDDI), avec des mécanismes non fonctionnels (sécurité, transaction, …)." },
    { id: "soa3-04", chapter: "soa3-soap", question: "Quel protocole de transport est recommandé par le consortium WS-I ?", options: ["JMS", "HTTP", "FTP", "SMTP"], correct: 1, explanation: "Le protocole le plus utilisé et recommandé par le consortium WS-I (Web Service Interoperability) est l'HTTP ; d'autres implémentations peuvent utiliser FTP, JMS, SMTP, etc. HTTPS est la variante sécurisée." },
    { id: "soa3-05", chapter: "soa3-soap", question: "Dans le paradigme HTTP, qui initie toujours la requête ?", options: ["Le client (agent utilisateur) — mode PULL", "Le serveur", "L'annuaire UDDI", "L'ESB"], correct: 0, explanation: "HTTP implémente le paradigme client-serveur : le client (agent utilisateur) est toujours l'initiateur de la requête (PULL) ; le serveur est toujours en attente d'un client." },
    { id: "soa3-06", chapter: "soa3-soap", question: "Quel champ HTTP indique la longueur du corps d'entité ?", options: ["Content-Type", "SOAPAction", "Accept", "Content-Length"], correct: 3, explanation: "Il n'existe pas en HTTP de bloc de fin de message identifiable : toute requête portant un contenu doit informer le serveur de sa longueur via le champ Content-Length." },
    { id: "soa3-07", chapter: "soa3-soap", question: "Que fait le verbe HTTP HEAD ?", options: ["« Fais ce que tu veux avec mes données »", "« Mets le document où je te le dis »", "« Donne-moi les métas informations concernant un document »", "« Donne-moi le contenu du document »"], correct: 2, explanation: "HEAD = métas informations d'un document ; GET = contenu (+ méta informations) ; POST = fais ce que tu veux/peux avec les données envoyées ; PUT = mets le document où je te le dis." },
    { id: "soa3-08", chapter: "soa3-soap", question: "À quoi servent les spécifications XSD, XSLT et XPath ?", options: ["Les trois remplacent HTTP", "XSD décrit formellement un vocabulaire, XSLT transforme un document XML, XPath crée des chemins de localisation", "XSD transporte, XSLT chiffre, XPath compresse", "Les trois servent à encrypter"], correct: 1, explanation: "XSD (XML Schema) : langage décrivant formellement un vocabulaire. XSLT : transforme un document XML basé sur un schéma en un autre document XML. XPath : syntaxe d'expressions pour créer des chemins de localisation." },
    { id: "soa3-09", chapter: "soa3-soap", question: "À quoi servent les espaces de noms XML ?", options: ["Partitionner les balises XML (permettre deux fois le même nom de balise)", "Chiffrer les balises", "Compresser le document", "Valider la grammaire"], correct: 0, explanation: "Les espaces de noms permettent de partitionner les balises XML (avoir deux fois le même nom de balise). Définis par l'attribut xmlns et une URI ; les balises sont préfixées par le nom logique." },
    { id: "soa3-10", chapter: "soa3-soap", question: "Quand un document XML est-il dit valide ?", options: ["Lorsqu'il est conforme à une grammaire", "Lorsqu'il est bien formé uniquement", "Lorsqu'il contient un header", "Lorsqu'il est signé"], correct: 0, explanation: "Un document XML est dit valide lorsqu'il est conforme à une grammaire (DTD ou XML Schéma)." },
    { id: "soa3-11", chapter: "soa3-soap", question: "Quelle différence entre DTD et XML Schéma ?", options: ["DTD est plus puissant que XML Schéma", "XML Schéma est obsolète", "Aucune différence", "DTD : expression faible (type, structure), largement utilisé ; XML Schéma : langage XML, expression puissante (type, structure, héritage)"], correct: 3, explanation: "DTD : langage de définition de grammaire XML, largement utilisé, expression faible (type, structure). XML Schéma : langage XML de définition, de plus en plus utilisé, expression puissante (type, structure, héritage)." },
    { id: "soa3-12", chapter: "soa3-soap", question: "SOAP est standardisé par qui et repose sur quels standards ?", options: ["W3C ; CORBA et RMI", "ISO ; TCP et UDP", "W3C ; XML (structuration) et HTTP (transport)", "OASIS ; JSON et FTP"], correct: 2, explanation: "SOAP est un protocole standardisé par W3C qui repose sur deux standards : XML pour la structuration des messages et HTTP pour le transport. Il assure l'interopérabilité (.NET, Java/RMI, CORBA, COM/DCOM…)." },
    { id: "soa3-13", chapter: "soa3-soap", question: "Comment sont transportées les données binaires dans SOAP ?", options: ["Via un canal séparé FTP", "Sous forme de pièces jointes avec le message SOAP principal", "Directement dans le Body en base64 obligatoire", "Elles ne peuvent pas l'être"], correct: 1, explanation: "Les données au format binaire sont transportées sous forme de pièces jointes avec le message SOAP principal (structure MIME). Les messages SOAP peuvent traverser les Proxy et les pare-feu." },
    { id: "soa3-14", chapter: "soa3-soap", question: "Quels sont les 3 rôles joués par un nœud SOAP ?", options: ["Expéditeur initial (Initial Sender), Récepteur final (Ultimate Receiver), Nœud intermédiaire (Intermediary)", "Client, Serveur, Proxy", "Émetteur, Transport, Récepteur", "Publisher, Subscriber, Broker"], correct: 0, explanation: "Rôles d'un nœud SOAP : Expéditeur initial (Demandeur de service / Initial Sender / Service Requestor), Récepteur final (Fournisseur / Ultimate Receiver / Service Provider), Nœud intermédiaire (Intermediary)." },
    { id: "soa3-15", chapter: "soa3-soap", question: "Qui assure l'encodage/sérialisation standard des données du message SOAP ?", options: ["Le navigateur", "Le serveur DNS", "Le protocole TCP", "Le runtime SOAP implanté des deux côtés (client, fournisseur)"], correct: 3, explanation: "La spécification d'encodage/sérialisation standard est appliquée par le runtime SOAP implanté des deux côtés (client, fournisseur), essentiellement utilisée avec le RPC." },
    { id: "soa3-16", chapter: "soa3-soap", question: "Étape 1 de l'invocation RPC SOAP :", options: ["Le client décode la réponse", "L'objet renvoie les résultats", "Le programme client SOAP crée le document XML et le transmet au protocole HTTP (requête POST)", "Le serveur invoque l'objet"], correct: 2, explanation: "Étapes : 1) le client crée le document XML d'invocation et le transmet à HTTP (POST) ; 2) transmission au serveur via HTTP ; 3) le serveur fait appel à l'objet ; 4) l'objet traite et renvoie les résultats au serveur SOAP ; 5) le serveur encapsule les résultats en XML vers le client ; 6) le client décode et envoie les résultats au demandeur initial." },
    { id: "soa3-17", chapter: "soa3-soap", question: "Quelle partie d'un message SOAP contient les données applicatives destinées au récepteur final ?", options: ["L'attachement", "Le Body", "Le Header", "L'Envelope"], correct: 1, explanation: "La partie Body est la partie principale du message : elle contient les données applicatives destinées au récepteur final. Le Header (optionnel) véhicule les méta-données." },
    { id: "soa3-18", chapter: "soa3-soap", question: "Que doit faire un nœud SOAP si une entrée d'entête mandataire n'est pas comprise ?", options: ["Envoyer un message d'erreur à l'expéditeur initial", "Ignorer l'entrée silencieusement", "Supprimer le Header", "Renvoyer le message sans le lire"], correct: 0, explanation: "À l'arrivée d'un message : vérifier la structure, déterminer les entrées destinées à lui-même, sélectionner les mandataires ; si une entrée mandataire n'est pas comprise ou ne peut être traitée → message d'erreur à l'expéditeur initial." },
    { id: "soa3-19", chapter: "soa3-soap", question: "Qu'est-ce qu'un nœud intermédiaire actif ?", options: ["Un simple routeur de paquets", "Le récepteur final du message", "Un annuaire UDDI", "Un intermédiaire qui entreprend un traitement supplémentaire pouvant modifier le message sortant (sécurité, annotation, manipulation de contenu)"], correct: 3, explanation: "Les intermédiaires actifs entreprennent un traitement supplémentaire non décrit par un bloc d'en-tête du message arrivé, pouvant modifier le message sortant : services de sécurité, d'annotation et de manipulation de contenu." },
    { id: "soa3-20", chapter: "soa3-soap", question: "Quels sont les deux types de données des règles d'encodage SOAP ?", options: ["Types XML et JSON", "Types statiques et dynamiques", "Types publics et privés", "Types simples (chaînes, énumérations, tableaux d'octets) et types composés (Struct, Array)"], correct: 3, explanation: "Types simples : chaînes de caractères, énumérations, tableaux d'octets. Types composés : Struct (valeurs différenciées par le nom d'accesseur unique) et Array (éléments de même type)." },
    { id: "soa3-21", chapter: "soa3-soap", question: "Quelles informations sont nécessaires pour une invocation de méthode distante en mode RPC ?", options: ["Uniquement le port TCP", "La clé publique du serveur", "URI de l'objet cible, nom de la méthode, signature (facultative), paramètres, données d'entête (facultatives)", "Uniquement l'URL du WSDL"], correct: 2, explanation: "Pour une invocation RPC : URI de l'objet cible, nom de la méthode, signature de la méthode (facultative), paramètres de la méthode, données de l'entête (facultatives) — appels et réponses encapsulés dans l'élément Body." },
    { id: "soa3-22", chapter: "soa3-soap", question: "La structure de messages SOAP fournit-elle directement des mécanismes de sécurité ?", options: ["Uniquement avec HTTPS", "Non : contrôle d'accès, confidentialité, intégrité et non-répudiation sont fournis sous forme d'extensions SOAP (modèle d'extensibilité)", "Oui, nativement", "Oui, via le Body"], correct: 1, explanation: "La structure de messages SOAP ne fournit pas directement ces mécanismes ; ils peuvent être fournis sous forme d'extensions SOAP grâce au modèle d'extensibilité (ex. WS-Security). Risques : contenu du message, transport, spécifications." },
    { id: "soa3-23", chapter: "soa3-soap", question: "Quand le format MIME devient-il indispensable pour un message SOAP ?", options: ["Lorsqu'il y a des informations nécessitant des formats binaires spécifiques (image, vidéo, son, pdf…)", "Toujours", "Pour les messages texte", "Lorsque le Header est présent"], correct: 0, explanation: "Si les informations sont toutes textuelles, le format simple suffit ; s'il y a des données binaires spécifiques, elles doivent être encapsulées dans un format MIME." },
    { id: "soa3-24", chapter: "soa3-soap", question: "Quel URI d'espace de noms correspond à SOAP 1.2 ?", options: ["http://schemas.xmlsoap.org/soap/envelope/", "http://www.w3.org/2001/06/quotes", "http://example.org/soap", "http://www.w3.org/2003/05/soap-envelope"], correct: 3, explanation: "SOAP 1.2 : http://www.w3.org/2003/05/soap-envelope. SOAP 1.1 : http://schemas.xmlsoap.org/soap/envelope/ (avec SOAP-ENV:encodingStyle http://schemas.xmlsoap.org/soap/encoding/)." },
    { id: "soa3-25", chapter: "soa3-soap", question: "Que signifie la valeur « next » de l'attribut role ?", options: ["Récepteur final uniquement", "Le nœud précédent", "Tous les nœuds intermédiaires y compris le récepteur final", "Aucun nœud n'est concerné"], correct: 2, explanation: "role=next (http://www.w3.org/2003/05/soap-envelope/role/next) : tous les nœuds intermédiaires y compris le récepteur final. none : aucun nœud ; ultimateReceiver : récepteur final uniquement. Absence d'attribut → tous les nœuds sont concernés." },
    { id: "soa3-26", chapter: "soa3-soap", question: "Dans l'exemple du support, l'élément Session avec soap:mustUnderstand=\"1\" mais sans attribut actor/role a pour destination :", options: ["Aucun nœud", "Tous les nœuds (absence de l'attribut role)", "Le nœud RightsManager", "Le nœud prochain uniquement"], correct: 1, explanation: "L'élément Session (mustUnderstand=1) n'a pas d'attribut actor/role → tous les nœuds sont concernés. Le User pointe vers RightsManager (actor) et le Language vers le nœud prochain (actor=soap/next)." },
    { id: "soa3-27", chapter: "soa3-soap", question: "Que se passe-t-il si un récepteur ne peut pas traiter un header marqué mustUnderstand=\"1\" ?", options: ["Un message d'erreur SOAP (SOAP fault message) doit être renvoyé", "Le header est ignoré", "Le message est retransmis en boucle", "Le Body est supprimé"], correct: 0, explanation: "mustUnderstand détermine si la compréhension de l'entrée est obligatoire. Si le récepteur n'en a pas la capacité, un SOAP fault message doit être renvoyé (code MustUnderstand)." },
    { id: "soa3-28", chapter: "soa3-soap", question: "Sur quelles entrées l'attribut relay prend-il effet ?", options: ["Toutes les entrées", "Les entrées obligatoires uniquement", "Le Body uniquement", "Les entrées non obligatoires destinées au nœud intermédiaire actuel"], correct: 3, explanation: "relay détermine si une entrée doit être réacheminée quand son traitement est impossible par le nœud actuel ; il ne prend effet que sur les entrées non obligatoires destinées au nœud intermédiaire actuel." },
    { id: "soa3-29", chapter: "soa3-soap", question: "Pour une entrée de rôle « next » comprise et traitée, quand est-elle réacheminée ?", options: ["Uniquement si relay=true", "Jamais réinsérable", "Non, sauf si réinsérée", "Toujours"], correct: 2, explanation: "Tableau du support : next + compris/traité=Oui → réacheminé « Non, sauf si réinséré » ; next + Non → « Non, sauf si relay=true ». Entrée non concernée (Oui de réacheminement) pour les rôles non ciblés et none." },
    { id: "soa3-30", chapter: "soa3-soap", question: "Quelle entrée unique doit contenir le corps d'un message d'erreur SOAP ?", options: ["Header", "Manifest", "Fault", "Body"], correct: 2, explanation: "Le corps d'un message d'erreur est constitué d'une entrée unique appelée « Fault », qui définit le type d'erreur et donne des détails." },
    { id: "soa3-31", chapter: "soa3-soap", question: "En SOAP 1.1, quel élément correspond à « Role » de la version 1.2 ?", options: ["Detail", "Faultactor", "Faultcode", "Faultstring"], correct: 1, explanation: "Correspondance Fault 1.2 ↔ 1.1 : Code (Value/Subcode) ↔ Faultcode ; Reason ↔ Faultstring ; Node ↔ --- ; Detail ↔ Detail ; Role ↔ Faultactor." },
    { id: "soa3-32", chapter: "soa3-soap", question: "Le code d'erreur « Sender » (v1.2) correspond à quel code en v1.1 ?", options: ["Client", "Server", "MustUnderstand", "VersionMismatch"], correct: 0, explanation: "Sender (v1.2) = Client (v1.1) : message incorrect (structure) ou ne contenant pas assez d'informations. Receiver (v1.2) = Server (v1.1) : erreur dans le traitement par le nœud (ex. temps dépassé)." },
    { id: "soa3-33", chapter: "soa3-soap", question: "Le code DataEncodingUnknown existe-t-il en SOAP 1.1 ?", options: ["Oui, identique", "Oui, sous le nom Client", "Oui, sous le nom Server", "Non, il n'existe qu'en version 1.2"], correct: 3, explanation: "DataEncodingUnknown (encodage d'un élément dans l'entête ou le corps non supporté par le nœud traitant) n'existe qu'en version 1.2 (v1.1 : --)." },
    { id: "soa3-34", chapter: "soa3-soap", question: "Dans un message avec pièces jointes, que contient la 1ère partie MIME ?", options: ["Le certificat X.509", "Le fichier WSDL", "Le message SOAP comportant un bloc Manifest Header", "Les payloads binaires"], correct: 2, explanation: "La 1ère partie MIME contient le message SOAP (avec bloc Manifest Header créé par le Handler Message Manifest) ; la 2ème partie contient les payloads (documents XML ou autres formats), référencés par XLink." },
    { id: "soa3-35", chapter: "soa3-soap", question: "Dans la métaphore du cours, SOAP est :", options: ["Un format binaire compact", "Le protocole en « costume-cravate » : strict, verbeux, mais très structuré", "Le « vendredi décontracté » des API", "Le « petit nouveau » rapide"], correct: 1, explanation: "SOAP = « costume-cravate » (strict, verbeux, structuré) ; REST = « vendredi décontracté » (flexible, orienté ressource) ; gRPC = « petit nouveau » (rapide, efficace, idéal microservices)." },
    { id: "soa3-36", chapter: "soa3-soap", question: "Quelle norme WS-* fournit une sécurité de bout en bout pour les messages ?", options: ["WS-Security", "WS-Addressing", "WS-ReliableMessaging", "WS-AtomicTransaction"], correct: 0, explanation: "WS-Security : sécurité de bout en bout des messages. WS-ReliableMessaging : livraison même sur réseau peu fiable. WS-AtomicTransaction : transactions distribuées. WS-Addressing : routage indépendant du transport." },
    { id: "soa3-37", chapter: "soa3-soap", question: "Quelle force de SOAP est cruciale pour les grands systèmes distribués d'entreprise ?", options: ["Sa légèreté", "Son format JSON natif", "Son absence de standardisation", "Sa compatibilité ascendante : mise à jour du service sans casser les clients existants"], correct: 3, explanation: "La compatibilité ascendante permet de mettre à jour un service SOAP sans casser les clients existants — précieux pour les grands systèmes distribués qui ne peuvent pas tous être mis à jour simultanément. SOAP domine aussi dans les systèmes critiques (finance, santé, gouvernement)." },
    { id: "soa3-38", chapter: "soa3-soap", question: "Quels services AWS supportent SOAP (selon le support) ?", options: ["EKS et RDS", "Aucun", "Amazon EC2 et Amazon S3", "Lambda et DynamoDB"], correct: 2, explanation: "AWS prend en charge SOAP pour plusieurs services, y compris Amazon EC2 et Amazon S3 (bien qu'ils recommandent REST pour les nouvelles implémentations). Azure fournit aussi des outils SOAP." },
    { id: "soa3-39", chapter: "soa3-soap", question: "Quel est le client SOAP moderne pour Python cité ?", options: ["WCF", "Zeep", "Requests", "strong-soap"], correct: 1, explanation: "Python : Zeep (client SOAP moderne et convivial). Java : Spring Web Services. JavaScript/Node.js : strong-soap. .NET : WCF (Windows Communication Foundation)." },
    { id: "soa3-40", chapter: "soa3-soap", question: "Que décrit essentiellement un document WSDL ?", options: ["La configuration réseau", "Le nom de la méthode, le nombre de paramètres et leur type, ce que le service offre, où il réside et comment l'invoquer", "Le code source du service", "Les données de la base"], correct: 1, explanation: "WSDL décrit essentiellement : nom de la méthode, nombre de paramètres et leur type, ce que le service web offre, où il réside et comment on peut l'invoquer." },
    { id: "soa3-41", chapter: "soa3-soap", question: "Quel niveau WSDL est utilisé principalement lors du processus de sélection ?", options: ["Le niveau abstrait", "Le niveau concret", "Le binding", "Les ports"], correct: 0, explanation: "Le niveau abstrait (types, message, portType) regroupe les informations réutilisables — utilisé lors du processus de sélection. Le niveau concret (binding, service) est utilisé lors de l'invocation des méthodes." },
    { id: "soa3-42", chapter: "soa3-soap", question: "En WSDL 1.1, quel élément décrit les opérations ?", options: ["<types/>", "<binding/>", "<service/>", "<portType/>"], correct: 3, explanation: "WSDL 1.1 : <types/> (types de données), <portType/> (opérations), <message/> (messages) — abstraits ; <binding/> (protocole), <service/> (ports d'accès) — concrets. WSDL 2.0 : <interface><operation/></interface> et <input/><output/>." },
    { id: "soa3-43", chapter: "soa3-soap", question: "Que représente un port dans un document WSDL ?", options: ["Une opération", "Un type complexe", "La localisation du service (son URL)", "Le protocole de transport uniquement"], correct: 2, explanation: "L'accès au service est défini par une collection de ports d'accès ; chaque port représente la localisation du service (son URL). Un même service peut être accessible sur plusieurs ports différents." },
    { id: "soa3-44", chapter: "soa3-soap", question: "Quelles sont les 4 parties d'une entrée du registre UDDI privé (scénario banque) ?", options: ["GET, POST, PUT, DELETE", "Business Entity, Business Service, Binding Template, tModel", "Header, Body, Envelope, Fault", "Types, Message, portType, Binding"], correct: 1, explanation: "Entrée UDDI : Business Entity (entité commerciale), Business Service (service commercial), Binding Template (URL technique/point de terminaison), tModel (« empreinte digitale » technique de l'interface et des normes respectées)." },
    { id: "soa3-45", chapter: "soa3-soap", question: "Qu'est-ce qu'Apache jUDDI ?", options: ["Un registre UDDI v3 open-source entièrement fonctionnel, activement développé et utilisé", "Un framework REST", "Un parseur XML", "Un outil de test SoapUI"], correct: 0, explanation: "Apache jUDDI : registre UDDI v3 open-source, déployé sur les serveurs des entreprises pour créer un registre de services privé, intégrable à des bus comme Apache Camel et des plateformes de gouvernance." },
    { id: "soa3-46", chapter: "soa3-soap", question: "Dans la réponse SoapUI de l'exemple « addition » (a=6, b=2), que contient <ns:return> ?", options: ["6", "2", "12", "8"], correct: 3, explanation: "La requête appelle jsp:addition avec a=6 et b=2 ; la réponse retourne <ns:additionResponse><ns:return>8</ns:return> — 6+2=8." },
    // ─── Chapitre 4 : REST ───
    { id: "soa4-01", chapter: "soa4-rest", question: "Qui a défini REST et en quelle année ?", options: ["Tim Berners-Lee, en 1991", "Google, en 2015", "Le W3C, en 2005", "Roy Fielding, dans sa thèse en 2000"], correct: 3, explanation: "REST (REpresentational State Transfert) est défini dans la thèse de Roy Fielding en 2000." },
    { id: "soa4-02", chapter: "soa4-rest", question: "REST est :", options: ["Un format d'échange", "Un standard W3C", "Un style d'architecture (pas un protocole, pas un format, pas un standard)", "Un protocole binaire"], correct: 2, explanation: "REST n'est pas un protocole ou un format (contrairement à SOAP, HTTP ou RPC) mais un style d'architecture inspiré du web, fortement basé sur HTTP (peut utiliser d'autres protocoles). Ce qu'il est : un système d'architecture, une approche pour construire une application." },
    { id: "soa4-03", chapter: "soa4-rest", question: "Comment appelle-t-on les applications respectant l'architecture REST ?", options: ["DOA", "RESTful", "RESTless", "ROA"], correct: 1, explanation: "Les applications respectant l'architecture REST sont dites RESTful. L'architecture REST est utilisée dans le développement d'applications orientées ressources (ROA) ou orientées données (DOA)." },
    { id: "soa4-04", chapter: "soa4-rest", question: "Que signifie la caractéristique Stateless de REST ?", options: ["Chaque requête contient toutes les informations de son état et est traitée indépendamment ; aucune gestion de session par le serveur", "Le serveur garde les sessions en mémoire", "Les cookies sont obligatoires", "Le cache est interdit"], correct: 0, explanation: "Sans Etats (Stateless) : chaque requête envoyée au serveur doit contenir toutes les informations relatives à son état et est traitée indépendamment de toutes autres requêtes — aucune gestion de session ou d'état des ressources par le serveur." },
    { id: "soa4-05", chapter: "soa4-rest", question: "Les 6 propriétés de REST incluent :", options: ["Contrat, Couplage, Abstraction, Réutilisation, Autonomie, Etat", "GET, POST, PUT, DELETE, HEAD, OPTIONS", "XML, JSON, CSV, HTML, PDF, TXT", "Performance, Evolutivité, Simplicité, Modification, Visibilité, Confiance"], correct: 3, explanation: "6 propriétés : Performance (interaction simple), Evolutivité (large variété de composants), Simplicité (entre interfaces), Modification (sans impacter les clients), Visibilité (communication claire), Confiance (reprise sur panne)." },
    { id: "soa4-06", chapter: "soa4-rest", question: "Une ressource REST peut-elle être virtuelle ?", options: ["Uniquement si elle est en JSON", "Uniquement en XML", "Oui : elle n'est pas forcément une entité physique (Prêt, Consultation…)", "Non, uniquement physique"], correct: 2, explanation: "Une ressource est un objet identifiable sur le système (Livre, Client, Prêt, …) ; elle n'est pas forcément une entité physique — elle peut être virtuelle (Prêt, Consultation, …). Elle est identifiée par une URI unique." },
    { id: "soa4-07", chapter: "soa4-rest", question: "Que fait GET /api/students/1 ?", options: ["Supprimer l'étudiant n°1", "Récupérer l'étudiant n°1", "Créer l'étudiant n°1", "Modifier l'étudiant n°1"], correct: 1, explanation: "GET /api/students/1 → récupérer l'étudiant n°1 (le serveur renvoie l'état de la ressource). POST /api/students → créer ; PUT /api/students/1 → modifier ; DELETE /api/students/1 → supprimer." },
    { id: "soa4-08", chapter: "soa4-rest", question: "Quelles sont les deux structures de JSON ?", options: ["Une collection de clefs/valeurs (Object) et une collection ordonnée d'objets (Array)", "Une table et une vue", "Un graphe et un arbre", "Un header et un body"], correct: 0, explanation: "JSON (JavaScript Object Notation) : format d'échange lisible par un humain et interprétable par une machine, indépendant des langages. Deux structures : collection de clefs/valeurs (Object) et collection ordonnée d'objets (Array)." },
    { id: "soa4-09", chapter: "soa4-rest", question: "Le WADL est :", options: ["Un protocole de transport", "Une implémentation de JAX-RS", "Un format binaire", "Un langage de description des services REST au format XML, moins exploité que le WSDL"], correct: 3, explanation: "WADL (Web Application Description Language) : langage de description des services REST (XML, standard W3C) — décrit Resource, Méthode, Paramètre, Réponse ; permet l'interaction dynamique ; moins exploité que le WSDL pour les services SOAP." },
    { id: "soa4-10", chapter: "soa4-rest", question: "JAX-RS signifie :", options: ["Java XML for REST", "JavaScript API for REST", "Java Application eXtension for REST", "Java API for RestFul Web Services"], correct: 3, explanation: "JAX-RS = Java API for RestFul Web Services ; version courante 2.0 décrite par JSR 339 ; depuis la 1.1, partie intégrante de Java EE 6 ; décrit la mise en œuvre côté serveur avec classes et annotations." },
    { id: "soa4-11", chapter: "soa4-rest", question: "Quelle est l'implémentation de référence de JAX-RS ?", options: ["RESTEasy", "RESTLET", "JERSEY (fournie par Oracle, intégrée dans Glassfish)", "CXF"], correct: 2, explanation: "JERSEY : implémentation de référence fournie par Oracle (2.24.1, JAX-RS 2.0, intégrée dans Glassfish et Java EE 6/7, supportée dans Netbeans). CXF : Apache. RESTEasy : JBOSS. RESTLET : l'un des premiers frameworks REST Java." },
    { id: "soa4-12", chapter: "soa4-rest", question: "L'approche de développement JAX-RS est :", options: ["Basée sur les fichiers .proto", "Bottom/Up : développer et annoter les classes, le WSDL est automatiquement généré", "Top/Down : partir du WADL", "Contract first obligatoire"], correct: 1, explanation: "JAX-RS est basé sur POJO avec annotations, pas de modifications des fichiers de configuration, pas de développement à partir d'un WADL (contrairement à SOAP) — approche Bottom/Up : développer et annoter les classes, le WSDL est automatiquement généré par l'API." },
    { id: "soa4-13", chapter: "soa4-rest", question: "L'URI résultante d'une méthode annotée @Path est :", options: ["La concaténation entre la valeur de @Path de la classe et celle de la méthode", "Uniquement la valeur de la méthode", "Uniquement la valeur de la classe", "Générée aléatoirement"], correct: 0, explanation: "@Path peut annoter des méthodes pour définir des URIs d'actions sur une ressource : l'URI résultante est la concaténation de la valeur @Path de la classe (ex. \"hello\") et celle de la méthode (ex. \"greetings\")." },
    { id: "soa4-14", chapter: "soa4-rest", question: "@Produces correspond à quelle clef de l'en-tête HTTP ?", options: ["Accept", "Content-Length", "Authorization", "Content-Type"], correct: 3, explanation: "@Produces spécifie le format des données renvoyées → clef Content-Type. @Consumes spécifie le format des données d'entrée → clef Accept." },
    { id: "soa4-15", chapter: "soa4-rest", question: "Quelle annotation récupère un paramètre depuis les paramètres de l'URL (Query) ?", options: ["@FormParam", "@CookieParam", "@QueryParam", "@PathParam"], correct: 2, explanation: "@QueryParam : paramètres de l'URL (Query). @PathParam : dans l'URL (Path). @FormParam : dans le formulaire. @HeaderParam : dans l'entête de la requête. @CookieParam : les cookies." },
    { id: "soa4-16", chapter: "soa4-rest", question: "Dans @Path(\"calcul/{nb1}+{nb2}\"), les contenus complexes {nb1}, {nb2} sont appelés :", options: ["Regex Groups", "Template Parameters", "Query Strings", "Path Roots"], correct: 1, explanation: "La valeur de @Path peut être variable : expressions complexes appelées Template Parameters, délimitées par « {} », avec possibilité de mixer des expressions régulières." },
    { id: "soa4-17", chapter: "soa4-rest", question: "Pour @GET, quelle annotation serait obsolète ?", options: ["@Consumes", "@Produces", "@Path", "@GET"], correct: 0, explanation: "@GET accepte des données dans l'URL de la requête → une annotation @Consumes serait obsolète. @Produces est obligatoire (format des données de retour)." },
    { id: "soa4-18", chapter: "soa4-rest", question: "@PUT correspond à quelle(s) opération(s) CRUD ?", options: ["Lecture (Read)", "Suppression (Delete)", "Création uniquement", "Opération d'écriture (Create, Update)"], correct: 3, explanation: "@GET : lecture (Read) ; @POST : écriture (Create) ; @PUT : écriture (Create/Update) ; @DELETE : suppression (Delete)." },
    { id: "soa4-19", chapter: "soa4-rest", question: "Plusieurs méthodes peuvent-elles avoir le même chemin en JAX-RS ?", options: ["Uniquement en XML", "Uniquement avec Jersey", "Oui : le mapping uri/méthode est fait automatiquement selon le type de la requête", "Non, jamais"], correct: 2, explanation: "@GET/@POST/@PUT/@DELETE ne sont utilisables que sur des méthodes ; plusieurs méthodes peuvent avoir le même chemin — le mapping uri/méthode est fait automatiquement par JAX-RS en fonction du type de la requête." },
    { id: "soa4-20", chapter: "soa4-rest", question: "Que fait l'annotation @XmlRootElement ?", options: ["Elle crée une table", "Elle désactive JSON", "Toute classe (entité) annotée est automatiquement mappée en XML", "Elle chiffre la classe"], correct: 2, explanation: "JAXB : toute classe annotée @XmlRootElement est automatiquement mappée en XML (annotations @XmlRootElement, @XmlElement, @XmlType). JSON également supporté : @Consumes → désérialisation, @Produces → sérialisation." },
    { id: "soa4-21", chapter: "soa4-rest", question: "À quel concept UDDI correspond le « Schéma d'API (OpenAPI/Swagger) » ?", options: ["Registre UDDI", "tModel", "Business Entity", "Binding Template"], correct: 1, explanation: "Correspondances : Business Entity → Fournisseur d'API/Équipe ; Business Service → Produit API/Collection ; Binding Template → Route/Endpoint de la Passerelle API ; tModel → Schéma d'API (OpenAPI/Swagger) ; Registre UDDI → Portail Développeur/Catalogue d'API." },
    { id: "soa4-22", chapter: "soa4-rest", question: "Quel outil open-source fournit une passerelle et un portail développeur personnalisable ?", options: ["Kong Gateway & Kong Developer Portal", "Apigee", "Azure API Management", "AWS Service Catalog"], correct: 0, explanation: "Kong (open-source) fournit une passerelle et un portail développeur personnalisable où toutes les API enregistrées sont listées et documentées. Les solutions cloud : Google Apigee, AWS API Gateway + Service Catalog, Azure API Management." },
    { id: "soa4-23", chapter: "soa4-rest", question: "Dans l'exemple Spring Boot, quel dialecte JPA est configuré pour H2 ?", options: ["org.hibernate.dialect.MySQL8Dialect", "org.h2.Driver", "jdbc:h2:mem", "org.hibernate.dialect.H2Dialect"], correct: 3, explanation: "H2 : spring.jpa.database-platform=org.hibernate.dialect.H2Dialect (driver org.h2.Driver, URL jdbc:h2:mem:testdb). MySQL : dialect MySQL8Dialect, driver com.mysql.cj.jdbc.Driver." },
    { id: "soa4-24", chapter: "soa4-rest", question: "Dans l'exemple Spring Boot, l'entité Utilisateur utilise quelle stratégie de génération d'ID ?", options: ["GenerationType.SEQUENCE", "UUID manuel", "GenerationType.IDENTITY", "GenerationType.AUTO"], correct: 2, explanation: "@Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id — avec @Entity sur la classe Utilisateur (champs id, nom, email + getters/setters)." },
    { id: "soa4-25", chapter: "soa4-rest", question: "Quelle interface le Repository étend-il dans l'exemple ?", options: ["SessionFactory", "JpaRepository<Utilisateur, Long>", "CrudRepository<String, Integer>", "JdbcRepository"], correct: 1, explanation: "public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> — avec possibilité d'ajouter des méthodes de recherche personnalisées comme findByNom(String nom)." },
    { id: "soa4-26", chapter: "soa4-rest", question: "Sur quelle URL l'application Spring Boot de l'exemple est-elle accessible ?", options: ["http://localhost:8080/", "http://localhost:9090/", "http://localhost:2525/", "http://localhost:3306/"], correct: 0, explanation: "L'application Spring Boot est accessible sur http://localhost:8080/ (le port 9090 est celui du serveur gRPC de l'exemple, 3306 celui de MySQL)." },
    // ─── Chapitre 5 : gRPC ───
    { id: "soa5-01", chapter: "soa5-grpc", question: "Qui a développé gRPC et avec quelles technologies ?", options: ["Oracle ; RMI et Java", "Apache ; JSON et HTTP/1.1", "Google ; HTTP/2 comme transport et Protocol Buffers (protobuf) comme format et IDL", "Microsoft ; SOAP et XML"], correct: 2, explanation: "gRPC est un framework RPC open-source développé par Google utilisant HTTP/2 comme protocole de transport et Protocol Buffers (protobuf) comme format d'échange et interface de définition de service (IDL). Idéal pour la communication inter-services." },
    { id: "soa5-02", chapter: "soa5-grpc", question: "Quelle est l'architecture gRPC ?", options: ["Client → UDDI → WSDL → Serveur", "Client → Protobuf (sérialisation) → HTTP/2 → Serveur → Protobuf (désérialisation)", "Client → XML → SOAP → Serveur", "Client → JSON → REST → Serveur"], correct: 1, explanation: "Architecture gRPC : Client → Protobuf (sérialisation) → HTTP/2 → Serveur → Protobuf (désérialisation)." },
    { id: "soa5-03", chapter: "soa5-grpc", question: "Quelle est la 1ère étape du workflow de développement gRPC ?", options: ["Définition : création du fichier .proto", "Déploiement du serveur", "Compilation du client", "Écriture de la logique métier"], correct: 0, explanation: "Workflow : 1) Définition (création du .proto) ; 2) Génération (compilation pour générer le code client/serveur) ; 3) Implémentation (logique métier) ; 4) Déploiement (lancement du serveur et connexion des clients)." },
    { id: "soa5-04", chapter: "soa5-grpc", question: "Pourquoi Protobuf est-il plus performant que JSON ?", options: ["Il compresse le texte", "Il évite HTTP", "Il utilise XML", "Format binaire plus compact, sérialisation/désérialisation rapide"], correct: 3, explanation: "Performances gRPC : format binaire Protobuf plus compact que JSON ; HTTP/2 (multiplexing, compression des headers, connexions persistantes) ; faible latence grâce à une sérialisation/désérialisation rapide." },
    { id: "soa5-05", chapter: "soa5-grpc", question: "Quel modèle de communication gRPC fait communiquer les deux sens en temps réel ?", options: ["Server Streaming", "Client Streaming", "Bidirectional Streaming", "Unary RPC"], correct: 2, explanation: "4 modèles : Unary RPC (requête-réponse classique), Server Streaming (le serveur envoie un flux de réponses), Client Streaming (le client envoie un flux de requêtes), Bidirectional Streaming (communication bidirectionnelle en temps réel)." },
    { id: "soa5-06", chapter: "soa5-grpc", question: "Dans Istio, qu'est-ce qui agit comme registre de services dynamique en temps réel ?", options: ["Le fichier .proto", "Le plan de contrôle (control plane) : Istiod", "Le plan de données : les proxies Envoy", "Kubectl"], correct: 1, explanation: "Le plan de contrôle du maillage (Istiod) agit comme un registre dynamique en temps réel (connaît chaque pod et son état de santé) ; le plan de données (proxies Envoy) l'interroge pour trouver les instances disponibles — entièrement automatisé et transparent." },
    { id: "soa5-07", chapter: "soa5-grpc", question: "À quelle époque correspondent les Mailles de Services (Istio, Linkerd, Consul) ?", options: ["Cloud-Native", "Années 2000 (UDDI Public)", "Ère SOA (UDDI Privé)", "Économie des API"], correct: 0, explanation: "Évolution : Années 2000 → UDDI Public (nœuds IBM/Microsoft, défunt) ; Ère SOA → UDDI Privé (Apache jUDDI) ; Économie des API → Gestion des API (Apigee, Azure APIM) ; Cloud-Native → Mailles de Services (Istio, Linkerd, Consul)." },
    { id: "soa5-08", chapter: "soa5-grpc", question: "Quel port gRPC l'exemple Spring Boot configure-t-il ?", options: ["grpc.server.port=8080", "grpc.server.port=2525", "grpc.server.port=3306", "grpc.server.port=9090"], correct: 3, explanation: "application.properties : grpc.server.port=9090 (8080 = Spring Boot REST, 2525 = SoapUI Axis2, 3306 = MySQL)." },
    { id: "soa5-09", chapter: "soa5-grpc", question: "Dans student.proto, le mot-clé « stream » permet :", options: ["De définir une table", "De générer le WSDL", "L'envoi/réception de multiples messages", "De chiffrer le canal"], correct: 2, explanation: "Dans le .proto : service définit les méthodes RPC ; message = structures de données (comme les classes) ; rpc = méthode distante ; stream = envoi/réception de multiples messages (ex. GetAllStudents returns (stream StudentResponse))." },
    { id: "soa5-10", chapter: "soa5-grpc", question: "Quel starter Maven est utilisé pour gRPC avec Spring Boot ?", options: ["io.grpc : grpc-all", "com.google.protobuf : protobuf-compiler", "net.devh : grpc-server-spring-boot-starter", "org.springframework : spring-grpc"], correct: 2, explanation: "Dépendances : net.devh:grpc-server-spring-boot-starter (2.14.0.RELEASE) + com.google.protobuf:protobuf-java (3.21.12) + plugin protobuf-maven-plugin (org.xolstice.maven.plugins, 0.6.1)." },
    { id: "soa5-11", chapter: "soa5-grpc", question: "Quel inconvénient de gRPC est cité dans le bilan ?", options: ["Pas de contrat strict", "Navigateur supporté limité, plus complexe, cache manuel", "Pas de streaming", "Format XML verbeux"], correct: 1, explanation: "Bilan gRPC — avantages : communication microservices, performance critique, environnement contrôlé, streaming de données. Inconvénients : navigateur supporté limité, plus complexe, cache manuel." },
    { id: "soa5-12", chapter: "soa5-grpc", question: "Choisir entre SOAP, REST et gRPC est selon le support :", options: ["Une décision commerciale (infrastructure, interopérabilité, conformité, performance, maintenance)", "Une décision purement technique", "Toujours REST", "Toujours le plus récent"], correct: 0, explanation: "Ce n'est pas seulement une décision technique mais commerciale : infrastructure et compétences existantes, interopérabilité avec partenaires, conformité réglementaire, performance, plans de maintenance/scalabilité. Parfois les normes robustes et la compatibilité ascendante de SOAP l'emportent." },
    // ─── Chapitre 6 : Orchestration & Chorégraphie ───
    { id: "soa6-01", chapter: "soa6-orchestration", question: "Le composant de service est décrit (vue externe) par :", options: ["Un script BPEL", "Un fichier WSDL ou équivalent", "Un fichier .proto", "Un document JSON"], correct: 1, explanation: "La vue externe (spécification) expose la facette service : opérations regroupées en interfaces + appareillage (types de données, contrat, propriétés) — décrite par un fichier WSDL ou équivalent. La vue interne (logique, données, services utilisés) est masquée aux consommateurs." },
    { id: "soa6-02", chapter: "soa6-orchestration", question: "Que sont les données d'échange (TDE) ?", options: ["Informations véhiculées entre participants, dont la sémantique/structure/format est défini par schémas XML ou classes UML", "Les données stockées dans le SGBD", "Les messages d'erreur SOAP", "Les fichiers joints MIME"], correct: 0, explanation: "Données d'échange : informations véhiculées via l'invocation des opérations ; TDE (Types de donnée d'échange) définissent sémantique, structure et format via schémas XML ou classes UML. Données persistantes : informations dans les bases de données (SGBD relationnel)." },
    { id: "soa6-03", chapter: "soa6-orchestration", question: "Qu'est-ce qu'un processus métier dans la SOA ?", options: ["Une base de données", "Un protocole de transport", "Un annuaire de services", "Un service plus complexe, résultat de la composition d'autres services moins complexes"], correct: 3, explanation: "Le processus (processus métier) est un service plus complexe, résultat de la composition d'autres services — grâce à la composabilité (aspect n°8). C'est une collaboration entre services où chacun intervient pour accomplir le travail des autres." },
    { id: "soa6-04", chapter: "soa6-orchestration", question: "Comment appelle-t-on le nouveau service dont la logique invoque des opérations d'autres services ?", options: ["Service Registry", "Mashup serveur", "Service composite", "Service mesh"], correct: 2, explanation: "Le nouveau service est appelé service composite ; les services invoqués sont des composants de service. Du point de vue du client, composite et basique sont indistinguables. Service Mashup : forme plus légère de composition pour les applications web." },
    { id: "soa6-05", chapter: "soa6-orchestration", question: "Selon les études citées, quel pourcentage du temps de construction des processus métier est passé dans la gestion des exceptions ?", options: ["Environ 30%", "Presque 80%", "Presque 20%", "Environ 50%"], correct: 1, explanation: "Les études montrent que presque 80% du temps de construction des processus métier est passé dans la gestion des exceptions." },
    { id: "soa6-06", chapter: "soa6-orchestration", question: "Dans l'orchestration, qui sait qu'un service métier complexe coordonne les invocations ?", options: ["Seul le coordinateur (les services invoqués ne le savent pas)", "Tous les services invoqués", "Le client uniquement", "L'annuaire UDDI"], correct: 0, explanation: "Orchestration : un processus central prend le contrôle et coordonne l'exécution des opérations ; les services invoqués ne savent pas qu'ils sont invoqués par un service métier complexe — seul le coordinateur le sait. Composition centralisée, processus métier privés." },
    { id: "soa6-07", chapter: "soa6-orchestration", question: "Comment appelle-t-on le service « chef d'orchestre » qui appelle les services suivant un enchaînement prédéfini ?", options: ["Annuaire UDDI", "ESB", "Proxy WSDL", "Moteur d'orchestration"], correct: 3, explanation: "L'orchestration consiste à avoir un service « chef d'orchestre » intermédiaire appelant les services suivant un enchaînement prédéfini (script d'orchestration) — souvent appelé « moteur d'orchestration ». Composition ascendante : les services appelés existent au préalable." },
    { id: "soa6-08", chapter: "soa6-orchestration", question: "Que définit BPMN ?", options: ["Un registre de services", "Un protocole de streaming", "Une représentation visuelle de la séquence (succède à BPML)", "Le code exécutable XML de la séquence"], correct: 2, explanation: "BPMN (Business Process Modeling Notation) succède à BPML : représentation visuelle de la séquence. BPEL (ou BPEL4WS) : code qui exécute la séquence, exprimé en XML." },
    { id: "soa6-09", chapter: "soa6-orchestration", question: "BPEL utilise WSDL à quels deux niveaux ?", options: ["Router et filtrer", "Interagir avec les ressources requises par le processus, et décrire le processus BPEL lui-même", "Publier et découvrir", "Chiffrer et signer"], correct: 1, explanation: "BPEL utilise WSDL à deux niveaux : interagir avec les ressources requises par le processus, et décrire le processus BPEL lui-même." },
    { id: "soa6-10", chapter: "soa6-orchestration", question: "Quels sont les deux types d'activités BPEL ?", options: ["Activités Header et Body", "Activités de base (invoke, receive, reply) et activités structurées (flux séquentiel, condition, boucle)", "Activités sync et async", "Activités GET et POST"], correct: 1, explanation: "BPEL définit : activités de base interagissant avec les services externes (invoke, receive, reply) et activités structurées pour le contrôle de flux interne (flux séquentiel, condition, boucle…)." },
    { id: "soa6-11", chapter: "soa6-orchestration", question: "Quelles sont les 2 limites de l'orchestration ?", options: ["Approche centralisée (panne du moteur = plus de composition) et schéma de composition statique (invalide si les besoins changent)", "Pas de standard disponible", "Trop de standards concurrents", "Impossible à modéliser"], correct: 0, explanation: "Limites orchestration : approche centralisée autour du moteur de composition (en cas de panne, plus de composition) ; schéma de composition statique (en cas de changement dans les besoins, le schéma devient invalide)." },
    { id: "soa6-12", chapter: "soa6-orchestration", question: "Que doit savoir chaque participant à la chorégraphie ?", options: ["Uniquement son URL", "Uniquement le WSDL global", "Le code des autres services", "Ses rôles, les opérations à exécuter, les messages à échanger, le temps d'échange de ces messages"], correct: 3, explanation: "Chaque web service impliqué sait exactement quand exécuter ses opérations et avec qui interagir. Tous les participants doivent savoir : leurs rôles dans le processus métier, les opérations à exécuter, les messages à échanger, le temps d'échange de ces messages." },
    { id: "soa6-13", chapter: "soa6-orchestration", question: "Que signifie WS-CDL ?", options: ["Web Service Central Dispatcher and Locator", "Web Services Content Delivery Layer", "Web Services Choregraphy Description Language (succède à WSCI)", "Web Services Composition Definition Language"], correct: 2, explanation: "WS-CDL (Web Services Choregraphy Description Language) succède à WSCI (Web Services Choregraphy Interface) : langage de description XML des messages de l'échange collaboratif entre services." },
    { id: "soa6-14", chapter: "soa6-orchestration", question: "WS-CDL définit-il un processus métier exécutable ?", options: ["Uniquement avec BPMN", "Non (contrairement à BPEL)", "Oui, comme BPEL", "Oui, en Java"], correct: 1, explanation: "WS-CDL ne définit pas de processus métier exécutable (contrairement à BPEL). Un seul document WS-CDL spécifie la contribution d'un partenaire à l'échange de messages ; il décrit l'ordre des messages — hors séquence = erronés." },
    { id: "soa6-15", chapter: "soa6-orchestration", question: "Pourquoi la chorégraphie est-elle appelée composition dynamique ?", options: ["À chaque pas de l'exécution, un service web choisit le service qui lui succède — la composition n'est pas connue ni décrite à l'avance", "Parce que le moteur la recalcule", "Parce qu'elle utilise des APIs dynamiques", "Parce que les partenaires changent automatiquement"], correct: 0, explanation: "L'exécution n'est pas régie de manière statique comme dans l'orchestration : à chaque étape, un service web choisit le service web qui lui succède et implémente ainsi une partie de la chorégraphie — la composition n'est pas connue, ni décrite à l'avance." },
    { id: "soa6-16", chapter: "soa6-orchestration", question: "Dans le schéma final du support, comment deux orchestrations collaborent-elles ?", options: ["Par un moteur central unique", "Par UDDI", "Par un ESB obligatoire", "Par chorégraphie : Request purchase order → Acknowledge, puis Accept purchase order → Acknowledge"], correct: 3, explanation: "Le schéma montre Moteur d'orchestration1 et Moteur d'orchestration2 (chacun contrôlant Web service1 et Web service2) qui collaborent par chorégraphie : Request purchase order → Acknowledge, puis Accept purchase order → Acknowledge." },
    { id: "soa6-17", chapter: "soa6-orchestration", question: "Les processus métier privés utilisent plutôt :", options: ["Le mashup", "L'UDDI public", "L'orchestration", "La chorégraphie"], correct: 2, explanation: "L'orchestration est utilisée par les processus métier privés ; la chorégraphie est un effort de collaboration focalisé sur l'échange de messages dans des processus métiers publics." },
  ],
};
