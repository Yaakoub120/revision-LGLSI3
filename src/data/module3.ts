import type { Module } from './types'

// ═══════════════════════════════════════════════════════════════
// MODULE 3 — Hadoop & MapReduce (hdfs-mapreduce-1.pdf, chapitre 2)
// ═══════════════════════════════════════════════════════════════
export const module3: Module = {
  id: 'm3',
  num: 3,
  title: 'Hadoop & MapReduce',
  subtitle: 'Le standard de gestion des données et applications distribuées',
  icon: '🐘',
  color: 'yellow',
  source: 'hdfs-mapreduce-1.pdf — Chapitre 2',
  sections: [
    {
      id: 'm3s1',
      title: 'Traitement des Données Massives : « Diviser pour Régner »',
      blocks: [
        {
          type: 'paragraph',
          text: "Pour traiter des données massives, la stratégie est de « Diviser pour Régner » :",
        },
        {
          type: 'list',
          items: [
            "Répartir les données",
            "Répartir et dupliquer les traitements",
            "Dupliquer les données",
          ],
        },
        {
          type: 'kv',
          items: [
            { k: 'Tolérance aux Pannes', v: 'grâce au Parallélisme de Données' },
            { k: 'Répartition de Charge', v: 'grâce au Parallélisme de Traitement' },
          ],
        },
        {
          type: 'paragraph',
          text: "L'idée Map-Reduce : une pile énorme de livres (données) est traitée par plusieurs Mappers (chacun travaille sur une partie), puis les résultats sont mélangés et ordonnés (Mélanger & Ordanner), puis agrégés par les Reducers qui produisent le résultat final.",
        },
        { type: 'diagram', diagram: 'divide-reign' },
      ],
    },
    {
      id: 'm3s2',
      title: 'Chapitre 2 — Plan du chapitre Hadoop',
      blocks: [
        {
          type: 'list',
          items: [
            "Problématiques du calcul distribué",
            "La solution : Apache Hadoop",
            "L'écosystème Hadoop",
            "Partie 1 : HDFS (Hadoop Distributed File System) — Présentation, Architecture, Écriture/Lecture d'un fichier",
            "Partie 2 : MapReduce — Présentation, Modèle de programmation, Exemples",
          ],
        },
        {
          type: 'definition',
          term: "L'équation Hadoop",
          def: 'Hadoop = excellent équilibre coût / performance / stockage / flexibilité',
        },
      ],
    },
    {
      id: 'm3s3',
      title: 'MapReduce — Présentation',
      blocks: [
        {
          type: 'paragraph',
          text: "Pour pouvoir traiter un grand volume de données sur un cluster de machines, il faut découper le problème en plusieurs problèmes de taille réduite à exécuter sur différentes machines (stratégie « diviser pour régner »).",
        },
        {
          type: 'paragraph',
          text: "De multiples approches existent et ont existé pour cette division d'un problème en plusieurs « sous-tâches ».",
        },
        {
          type: 'definition',
          term: 'MapReduce',
          def: "Un paradigme (modèle) de programmation distribuée popularisé par Google.",
        },
        {
          type: 'note',
          title: 'Les 4 étapes du traitement MapReduce',
          text: "1. Split  2. Mapper  3. Shuffle  4. Reduce",
        },
        { type: 'diagram', diagram: 'mapreduce-pipeline' },
      ],
    },
    {
      id: 'm3s4',
      title: 'Exemple Word Count — Étape 1 « Split »',
      blocks: [
        {
          type: 'note',
          title: 'Objectif',
          text: "Compter le nombre d'occurrences de chaque mot dans un texte.",
        },
        {
          type: 'paragraph',
          text: "Première étape : déterminer une manière de découper (split) les données d'entrée pour que chacune des machines puisse travailler sur une partie du texte. Notre problème est ici très simple — on peut par exemple décider de découper les données d'entrée ligne par ligne. Chacune des lignes du texte sera un fragment de nos données d'entrée.",
        },
        {
          type: 'code',
          lang: 'text',
          caption: "Nos données d'entrée (le texte) :",
          code: `Celui qui croyait au ciel
Celui qui n'y croyait pas
[…]
Fou qui fait le délicat
Fou qui songe à ses querelles`,
        },
        {
          type: 'paragraph',
          text: "Après découpage, on obtient 4 fragments depuis nos données d'entrée : « celui qui croyait au ciel » • « celui qui ny croyait pas » • « fou qui fait le delicat » • « fou qui songe a ses querelles ».",
        },
      ],
    },
    {
      id: 'm3s5',
      title: 'Exemple Word Count — Étape 2 « MAP »',
      blocks: [
        {
          type: 'paragraph',
          text: "Le code de notre opération MAP sera donc (ici en pseudo code) :",
        },
        {
          type: 'code',
          lang: 'pseudo',
          code: `POUR MOT dans LIGNE, FAIRE :
  GENERER COUPLE (MOT ; 1)`,
        },
        {
          type: 'paragraph',
          text: "Pour chacun de nos fragments, les couples (clef ; valeur) générés seront donc :",
        },
        {
          type: 'table',
          headers: ['Fragment', 'Couples générés'],
          rows: [
            ['celui qui croyait au ciel', '(celui;1) (qui;1) (croyait;1) (au;1) (ciel;1)'],
            ['celui qui ny croyait pas', '(celui;1) (qui;1) (ny;1) (croyait;1) (pas;1)'],
            ['fou qui fait le delicat', '(fou;1) (qui;1) (fait;1) (le;1) (delicat;1)'],
            ['fou qui songe a ses querelles', '(fou;1) (qui;1) (songe;1) (a;1) (ses;1) (querelles;1)'],
          ],
        },
      ],
    },
    {
      id: 'm3s6',
      title: 'Exemple Word Count — Étape 3 « SHUFFLE »',
      blocks: [
        {
          type: 'paragraph',
          text: "Le shuffle (mélange/tri) regroupe les couples par clef identique :",
        },
        {
          type: 'kv',
          items: [
            { k: '(celui;1) (celui;1)', v: 'regroupement de la clef « celui »' },
            { k: '(qui;1) (qui;1) (qui;1) (qui;1)', v: 'regroupement de la clef « qui »' },
            { k: '(croyait;1) (croyait;1)', v: 'regroupement de la clef « croyait »' },
            { k: '(au;1)   (ny;1)', v: 'cles isolées' },
            { k: '(ciel;1)   (pas;1)', v: 'cles isolées' },
            { k: '(fou;1) (fou;1)', v: 'regroupement de la clef « fou »' },
            { k: '(fait;1)   (le;1)', v: 'cles isolées' },
            { k: '(delicat;1)   (songe;1)', v: 'cles isolées' },
            { k: '(a;1)   (ses;1)   (querelles;1)', v: 'cles isolées' },
          ],
        },
      ],
    },
    {
      id: 'm3s7',
      title: 'Exemple Word Count — Étape 4 « REDUCE » et résultat',
      blocks: [
        {
          type: 'code',
          lang: 'pseudo',
          code: `TOTAL=0
POUR COUPLE dans GROUPE, FAIRE :
  TOTAL=TOTAL+1
RENVOYER TOTAL`,
        },
        {
          type: 'paragraph',
          text: "Une fois l'opération REDUCE effectuée, on obtiendra donc une valeur unique pour chaque clef distincte. En l'occurrence, notre résultat sera :",
        },
        {
          type: 'code',
          lang: 'text',
          code: `qui: 4
celui: 2
croyait: 2
fou: 2
au: 1
ciel: 1
ny: 1
pas: 1
fait: 1
[…]`,
        },
      ],
    },
    {
      id: 'm3s8',
      title: 'Récapitulatif du pipeline MapReduce',
      blocks: [
        {
          type: 'paragraph',
          text: "Le schéma récapitulatif du cours (avec un autre extrait : « celui qui croyait / ciel ciel croyait / celui ciel qui ») montre le flux complet : Données d'entrée → Splitting (fragmentation) → MAP (génération des couples clef;valeur) → Shuffling (mélange/tri par clef) → REDUCE (agrégation) → Résultat final (qui: 2, ciel: 3, celui: 2, croyait: 2).",
        },
        { type: 'diagram', diagram: 'wordcount-demo' },
      ],
    },
    {
      id: 'm3s9',
      title: 'Autre exemple — Statistiques web',
      blocks: [
        {
          type: 'paragraph',
          text: "Un autre exemple : on souhaite compter le nombre de visiteurs sur chacune des pages d'un site Internet. On dispose des fichiers de logs sous la forme suivante :",
        },
        {
          type: 'code',
          lang: 'text',
          code: `/index.html [19/Oct/2013:18:45:03 +0200]
/contact.html [19/Oct/2013:18:46:15 +0200]
/news.php?id=5 [24/Oct/2013:18:13:02 +0200]
/news.php?id=4 [24/Oct/2013:18:13:12 +0200]
/news.php?id=18 [24/Oct/2013:18:14:31 +0200]
...etc...`,
        },
      ],
    },
    {
      id: 'm3s10',
      title: 'Exemple 2 — La longueur moyenne des mots',
      blocks: [
        {
          type: 'kv',
          items: [
            { k: 'Entrée', v: 'un grand fichier texte' },
            { k: 'Sortie', v: 'la longueur moyenne des mots dans le fichier' },
          ],
        },
        {
          type: 'paragraph',
          text: "Flux des données : Input (dogs, like, cats) → Map → Shuffle & Sort → Reduce → Output (count, 3) et (length, 12) → Finish : mean = length/count = 12/3 = 4. Le Map émet pour chaque mot un couple (longueur;1) et (1;mot), le Reduce somme les longueurs (12) et compte les mots (3).",
        },
        { type: 'diagram', diagram: 'mean-length' },
      ],
    },
    {
      id: 'm3s11',
      title: 'Exemple 3 — Le nombre de voyelles et consonnes',
      blocks: [
        {
          type: 'paragraph',
          text: "Le flux des données : Input (dogs, like, cats) → Map produit (C,3)(V,1) pour dogs, (C,2)(V,2) pour like, (C,3)(V,1) pour cats → Shuffle & Sort → Reduce → Output : C : 8, V : 4.",
        },
        { type: 'diagram', diagram: 'vowels-demo' },
      ],
    },
  ],
}
