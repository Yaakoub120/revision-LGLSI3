import type { CourseModule } from '@/types/course';

export const module2: CourseModule = {
  id: 2,
  slug: 'caracteristiques-nv',
  title: 'Caractéristiques du Big Data — les n-V',
  subtitle: 'Les 3 problématiques majeures, l’évolution des 3V aux 10V, le détail des 5 V (Volume, Variété, Vélocité, Véracité, Valeur) et la problématique du volume.',
  icon: 'Gauge',
  accent: 'amber',
  sections: [
    {
      id: '3-problematiques',
      title: 'Les 3 problématiques majeures',
      blocks: [
        { kind: 'p', text: 'Quand peut-on dire qu’on a affaire à des **BIG DATA** ? La réponse tient dans **les n-V**. Trois problématiques majeures résument le défi des données massives, chacune associée à son enjeu :' },
        { kind: 'table', headers: ['Problématique', 'Enjeu'], rows: [
          ['**Volume**', '→ **Stockage**'],
          ['**Vélocité**', '→ **Traitement**'],
          ['**Variété**', '→ **Collecte**'],
        ], caption: 'Volume → stockage · Vélocité → traitement · Variété → collecte' },
        { kind: 'diagram', id: 'five-v', caption: 'Les 5 V du Big Data' },
      ],
    },
    {
      id: 'nv-history',
      title: 'Des 3V aux 10V — l’historique des caractéristiques',
      blocks: [
        { kind: 'p', text: 'Le nombre de « V » n’a cessé de croître avec le temps :' },
        { kind: 'diagram', id: 'nv-history', caption: 'L’inflation des V : de 3 à 10' },
        { kind: 'table', headers: ['Année', 'Source', 'Les V'], rows: [
          ['**2001**', '**Gartner**', '**3 V** : Volume, Variété, Vélocité'],
          ['**2012**', '**IBM**', '**4 V** : + **Véracité**'],
          ['**2015**', '—', 'encore plus de V : + **Valeur**'],
          ['**2016**', '—', '**7 V ?** : + **Variabilité** et **Visualisation**'],
          ['**2017**', '—', '**10 V ?** : + Validity, Viability, Volatility, Venue, Vocabulary, Virality, Viscosity, Vagueness…'],
        ], caption: 'L’évolution des caractéristiques du Big Data' },
        { kind: 'note', variant: 'info', text: 'À retenir : les **3 premiers V** (Volume, Variété, Vélocité) viennent de **Gartner (2001)** ; le **4ᵉ (Véracité)** vient d’**IBM (2012)** ; la **Valeur** est considérée comme **le V le plus important**.' },
      ],
    },
    {
      id: 'volume',
      title: 'Le Volume — le stockage',
      blocks: [
        { kind: 'p', text: 'Le **Volume** fait référence aux **téraoctets** : enregistrements / archives, transactions, tables, fichiers. Les chiffres du cours :' },
        { kind: 'list', items: [
          'En 2017 : **4,4 zettaoctets** de données dans le monde',
          'Prévision **2020** : **40 zettaoctets** (40 000 milliards de Go) — soit **5 200 Go** par personne sur Terre',
          'En 2013, il y avait déjà **4,4 zettaoctets** de données, et **50 milliards** d’objets connectés à la même date dans le monde',
          'Croissance observée : **0,12 Zo en 2005** → **0,5 Zo en 2010** → **1,2 Zo en 2012** → **8,5 Zo en 2015** → **40 Zo en 2020**',
        ]},
        { kind: 'p', text: 'Une autre façon de voir le volume : **Big Data ≈ Transactions + Interactions + Observations**. Les transactions (systèmes ERP, MRO,_DB2, secteur public, mobile Web…) s’ajoutent aux interactions (réseaux sociaux, user clickstreams, web interactions, ADS landing, system logs, CRM…) et aux observations (user generated content, social networks, sentiment & OPINION graphics, batch & OPEX communities, RFID, telematics & GPS, KD videos, unstructured text, search & text analytics, MACHINE DATA).' },
        { kind: 'note', variant: 'warn', text: 'La croissance du volume vient d’**outils numériques plus performants et plus connectés** (ordinateurs et smartphones), de l’**Open Data** (réseaux sociaux comme Facebook, données d’administrations publiques) et de l’**Internet des Objets** (RFID : cartes de transport, codes bar… ; **Éricsson** a estimé le nombre d’objets connectés dans le monde à **50 milliards en 2020** — 12 milliards en 2013).' },
      ],
    },
    {
      id: 'variete',
      title: 'La Variété — la collecte',
      blocks: [
        { kind: 'p', text: 'La **Variété** distingue les données **structurées**, **non structurées** et **probabilistes**. Le point clé du cours :' },
        { kind: 'note', variant: 'danger', text: 'Pour un stockage dans des **bases de données** ou des **entrepôts de données**, les données doivent respecter **un format prédéfini** ! **Mais** la plupart des données existantes sont **non structurées ou semi structurées** ; les données sont sous plusieurs formats et types (fichiers **xml, json, txt**, base de données relationnelle, etc.).' },
        { kind: 'h3', text: 'Données structurées' },
        { kind: 'list', items: [
          'Données que l’on peut **clairment coder et identifier**',
          'Les données d’un **tableur** sont typiquement des données structurées',
          'On peut comprendre leurs significations en **croissant les titres de la ligne et de la colonne** dans laquelle se trouvent les données',
          'Les systèmes et **algorithmes** ont depuis toujours été développés pour traiter **ce type de données**',
          '**Organisées pour faciliter le traitement**, structurées et formatées pour simplifier l’analyse — **format défini**',
          '**Exemples** : Nom, Adresse, Âge — ou le tableau Employees (Id, FirstName, LastName, DepartmentName)',
        ]},
        { kind: 'h3', text: 'Données semi-structurées' },
        { kind: 'p', text: '**Non organisées mais peuvent être associées à des données qui le sont.** Exemple : le **Web** avec le langage **XML** — métadonnées décrivant les autres données. Fichier XML du cours : `<rec><name>Precnost, Pac</name><sex>Male</sex><age>35</age></rec>` etc., où chaque enregistrement porte ses propres balises.' },
        { kind: 'h3', text: 'Données non structurées' },
        { kind: 'list', items: [
          'Données qui **ne répondent à aucun format prédéfini** — sans structure : difficile de les coder et d’en tirer l’information directement',
          '**Non organisées et sans format défini** — **plus difficile à analyser**',
          'En analysant les contenus des messages électroniques, conversations, documents, **fichiers texte**, audio, vidéo, etc., on peut **chercher à coder et identifier**',
          '**Exemples** : photos, dessins, livres, vidéos…',
          'Le modèle mental du cours : **BIG DATA = données structurées + données non structurées**',
        ]},
        { kind: 'h3', text: 'Le lac de données (Data Lake)' },
        { kind: 'p', text: 'Face à cette variété, le concept de **lac de données** : on y verse les **données brutes** de tous types, puis on les soumet à un **traitement** et à une **analyse**. **Tous types de données** y sont acceptés.' },
      ],
    },
    {
      id: 'velocite',
      title: 'La Vélocité / Vitesse — le traitement',
      blocks: [
        { kind: 'p', text: 'La **Vélocité (Velocity)** combine **la fréquence d’arrivée des données** et **la vitesse de traitement des données**. Elle est **« au cœur du Time to Market »**. Ses composantes : **batch**, **temps réel**, **processus**, **flot de données**.' },
        { kind: 'list', items: [
          'Les données doivent être **stockées à l’arrivée** — parfois même des **téraoctets par jour** !',
          '**Sinon, risque de les perdre !**',
          'Les entreprises se trouvent de plus en plus **au milieu d’un flux continuel de données**',
        ]},
        { kind: 'example', title: 'Une minute sur Internet (2016)', text: 'En 60 secondes : 1,5 million de dollars de ventes Amazon, 900 000 likes Facebook, 972 222 swipes Tinder, 15 000 GIF envoyés via Messenger, 347 222 photos Instagram, 527 760 snacks Snapchat, 2,4 millions de requêtes Google, 70 261 heures Netflix, 1,5 million de lectures Spotify, 15 000 messages WhatsApp… Facebook comptait 1,65 milliard d’utilisateurs en 2016 et 2 milliards en 2017.' },
      ],
    },
    {
      id: 'veracite',
      title: 'La Véracité — la fiabilité',
      blocks: [
        { kind: 'p', text: 'La **Véracité (Veracity)** fait référence à **la fiabilité des données**. Règle clé : **si la quantité des données augmente, alors la qualité et la précision sont moins vérifiées !**' },
        { kind: 'p', text: 'Ses dimensions : **confiance**, **authenticité**, **origine / réputation**, **disponibilité**, **responsabilité**.' },
        { kind: 'example', title: 'Exemple du cours : Twitter', text: 'Les tweets peuvent contenir : des **abréviations**, des **hashtags #**, du **langage familier**, l’**alphabet de tchat arabe**, des problèmes de fiabilité et d’exactitude des données, etc.' },
        { kind: 'list', items: [
          'Les **solutions Big Data et l’analytique** doivent remédier à cela en **se référant au volume des données existantes**',
          'Le **manque de qualité et d’exactitude** résulte souvent des **gros volumes**',
        ]},
      ],
    },
    {
      id: 'valeur',
      title: 'La Valeur — le V le plus important',
      blocks: [
        { kind: 'p', text: 'La **Valeur (Value)** : il faut **transformer toutes les données en valeurs exploitables** — **les données sans valeur sont inutiles**. Ses composantes : **statistiques**, **évènements**, **corrélations**, **hypothétiques**.' },
        { kind: 'list', items: [
          'Attendre des **objectifs stratégiques de création de valeur** pour les clients et pour l’entreprise, dans tous les domaines d’activité',
          'Il est primordial que les entreprises évaluent la **rentabilité** d’une récolte de données par exemple',
        ]},
        { kind: 'note', variant: 'tip', text: '**Un projet Big Data et son accès aux utilisateurs n’a d’intérêt que s’il apporte de la valeur à l’entreprise → le V le plus important !**' },
        { kind: 'h3', text: 'Résumé des 5 V' },
        { kind: 'table', headers: ['V', 'Contenu'], rows: [
          ['**Volume**', 'Téraoctets · Enreg. / Archives · Transactions · Tables, fichiers'],
          ['**Variété**', 'Structurées · Non structurées · Probabilistes'],
          ['**Vélocité**', 'Batch · Temps réel · Processus · Flot de données'],
          ['**Véracité**', 'Confiance · Authenticité · Origine, réputation · Disponibilité · Responsabilité'],
          ['**Valeur**', 'Statistiques · Évènements · Corrélations · Hypothétiques'],
        ], caption: 'Le résumé officiel des 5 V du cours' },
      ],
    },
    {
      id: 'problematique-volume',
      title: 'Problématique du Volume et adaptabilité',
      blocks: [
        { kind: 'h3', text: 'Pourquoi les systèmes classiques ne suffisent plus' },
        { kind: 'list', items: [
          'Auparavant, quand les systèmes d’application de gestion de base de données ont été réalisés, ils ont été construits **avec une échelle à l’esprit** — même les organisations n’ont **pas été préparées à l’échelle** que nous produisons aujourd’hui',
          'Comme les exigences de ces organisations ont augmenté au fil du temps, elles doivent **repenser et réinvestir dans l’infrastructure**. Actuellement, le coût des ressources impliquées dans l’extension de l’infrastructure **s’augmente avec un facteur exponentiel**',
          'De plus, il y a une **limitation sur les différents facteurs** tels que la taille de la machine, CPU, RAM, etc. qui peuvent être mis à l’échelle (**scaled up**) — ces systèmes **traditionnels** ne seraient pas en mesure de soutenir l’échelle requise par la plupart des entreprises',
        ]},
        { kind: 'h3', text: 'L’adaptabilité' },
        { kind: 'p', text: 'Dans ce nouveau contexte, les **méthodes de traitement** de ces données — **capture, stockage, recherche, partage, analyse, visualisation** — doivent être **redéfinies** car l’ensemble de ces données devient **difficilement manipulable par les outils classiques**.' },
        { kind: 'h3', text: 'Est-ce une innovation ? Comment innover face à l’explosion des volumes' },
        { kind: 'p', text: 'L’explosion des volumes des données nécessite **une innovation** en termes de :' },
        { kind: 'list', ordered: true, items: [
          '**Accélération matérielle** : bénéfices des mémoires rapides (DRAM dynamique), meilleur bénéfice des processeurs multicœurs',
          '**Bases de données d’analyse massivement parallèle (MPP)** : des bases conformes SQL, conçues pour répartir les traitements sur plusieurs machines',
          '**Mode Map-Reduce, Hadoop et autres approches NoSQL** : elles permettent de traiter d’énormes quantités de données en **déchargeant les SGBD relationnels** et le stockage sur SQL, et permettent de **répartir les données sur plusieurs machines distinctes**',
        ]},
        { kind: 'note', variant: 'warn', text: 'Deux messages forts du cours : **« Arrêter de réfléchir en relationnel ! »** et **« Absolument TOUTES les données sont importantes ! »**' },
        { kind: 'h3', text: 'Les 2 grands challenges — et la transition' },
        { kind: 'p', text: 'Face à ces situations complexes, le Big Data doit relever **2 grands challenges** : le **Stockage** et le **Traitement**. La réponse à « Comment le Big Data gère ces situations complexes ? » s’appelle **Hadoop** — objet du module suivant.' },
      ],
    },
  ],
};
