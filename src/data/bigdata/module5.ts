import type { CourseModule } from '@/types/course';

export const module5: CourseModule = {
  id: 5,
  slug: 'nosql-mongodb',
  title: 'NoSQL & MongoDB — les bases de données orientées documents',
  subtitle: 'Pourquoi sortir du relationnel, la philosophie Not Only SQL, MongoDB et la correspondance SQL ↔ MongoDB (table → collection, colonne → field, ligne → document).',
  icon: 'Database',
  accent: 'teal',
  sections: [
    {
      id: 'intro-nosql',
      title: 'Introduction : pourquoi le NoSQL ?',
      blocks: [
        { kind: 'p', text: '**Depuis les années 70, la BD relationnelle était l’incontournable référence** pour gérer les données d’un système d’information. Mais deux questions finissent par se poser : **comment gérer une énorme base de données et comment l’interroger efficacement ?**' },
        { kind: 'p', text: 'Ces questions, on se les pose **dès que le volume devient ingérable** et que **répondre à de simples requêtes prend des heures**. **Oubliez les SGBD traditionnels, ils peinent à passer à l’échelle !** Vous devez être capable de **choisir la bonne solution parmi les dizaines** qui s’offrent à vous.' },
        { kind: 'def', term: 'NoSQL — « Not Only SQL »', text: 'Cette approche propose de **relâcher certaines contraintes lourdes du relationnel** (par exemple le schéma fixe et les jointures) **pour favoriser la distribution** des données sur plusieurs machines.' },
        { kind: 'note', variant: 'info', text: 'À relier avec le module 2 : **« Arrêter de réfléchir en relationnel ! »** — le NoSQL est une des réponses des géants du web au passage à l’échelle.' },
      ],
    },
    {
      id: 'mongodb',
      title: 'MongoDB en 3 points',
      blocks: [
        { kind: 'list', items: [
          '**Base de données NoSQL**',
          '**Enregistre les données sous forme de documents, syntaxe JSON**',
          '**+ rapide pour certaines opérations**',
        ]},
        { kind: 'p', text: 'Un document MongoDB est un ensemble de **couples clé : valeur**. Là où une ligne de table SQL a des colonnes fixes, un document JSON embarque ses propres champs et peut en ajouter sans modifier un « schéma » global :' },
        { kind: 'code', title: 'Exemple de document (cours : structured → non structured)', lang: 'json', code: `{
  'firstname' : 'Ahmed',
  'lastname'  : 'salim',
  'mobile'    : 95656565,
  'country'   : 'Oman'
}` },
        { kind: 'p', text: 'Le cours illustre le passage du **modèle structuré** (table students avec Id, Firstname, Lastname, Email, Mobile — « Row 1 », « Row 2 ») au **modèle non structuré** : **Document → Row**, avec des **key value paired : key : value**. On voit notamment un étudiant dont la colonne **Mobile (900011111)** n’existait pas dans le schéma initial : en SQL il faut **modifier la table**, en MongoDB le document **possède simplement le champ en plus**.' },
      ],
    },
    {
      id: 'mapping',
      title: 'La correspondance SQL ↔ MongoDB',
      blocks: [
        { kind: 'p', text: 'Pour passer du monde relationnel à MongoDB, le cours donne la **table de correspondance officielle** :' },
        { kind: 'diagram', id: 'nosql-mapping', caption: 'SQL ↔ MongoDB : la traduction des concepts' },
        { kind: 'table', headers: ['Monde relationnel (SQL)', 'MongoDB'], rows: [
          ['**Table**', '**Collection**'],
          ['**Columns** (colonnes)', '**field** (champ)'],
          ['**rows** (lignes)', '**document**'],
        ], caption: 'Table → Collection · Columns → field · rows → document' },
        { kind: 'example', title: 'Exemple du cours (collection students)', text: 'La table `students` (Id, Firstname, Lastname, Email) devient la collection `students` : chaque ligne (1, Ahmed, Jasim, ahmed@test.com) devient un document `{ Id : 1, Firstname : ‘Ahmed’, Lastname : ‘Jasim’, Email : ‘ahmed@test.com’, Mobile : 900011111 }`. Le champ **Mobile**, ajouté au document, n’existe pas dans les autres documents — c’est la **flexibilité** du modèle documentaire.' },
      ],
    },
  ],
};
