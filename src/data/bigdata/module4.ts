import type { CourseModule } from '@/types/course';

export const module4: CourseModule = {
  id: 4,
  slug: 'mapreduce',
  title: 'MapReduce — le modèle de programmation distribuée',
  subtitle: 'Le principe « diviser pour régner », les 4 étapes (Split, Mapper, Shuffle, Reduce) et 3 exemples complets : Word Count, longueur moyenne des mots, voyelles et consonnes.',
  icon: 'Network',
  accent: 'orange',
  sections: [
    {
      id: 'principe',
      title: 'Le paradigme MapReduce',
      blocks: [
        { kind: 'p', text: 'Pour pouvoir traiter un grand volume de données sur un cluster de machines, il faut **découper le problème en plusieurs problèmes de taille réduite** à exécuter sur différentes machines — la stratégie **« diviser pour régner »**. De multiples approches existent et ont existé pour cette division d’un problème en plusieurs « sous-tâches ».' },
        { kind: 'def', term: 'MapReduce', text: 'Un **paradigme (modèle) de programmation distribuée popularisé par Google** (article de Jeffrey Dean et Sanjay Ghemawat, 2004), conçu pour distribuer des traitements sur un ensemble de machines.' },
        { kind: 'h3', text: 'Les 4 étapes du traitement MapReduce' },
        { kind: 'list', ordered: true, items: [
          '**Split** — découpage des données d’entrée',
          '**Mapper** — traitement de chaque fragment',
          '**Shuffle** — regroupement par clé (mélange / tri)',
          '**Reduce** — agrégation finale',
        ]},
        { kind: 'diagram', id: 'mapreduce-flow', caption: 'Les 4 étapes de MapReduce illustrées sur le Word Count' },
      ],
    },
    {
      id: 'word-count',
      title: 'Exemple 1 : Word Count (compter les mots)',
      blocks: [
        { kind: 'p', text: '**Objectif : compter le nombre d’occurrences de chaque mot dans un texte.** Les données d’entrée du cours (un poème) :' },
        { kind: 'code', title: 'Données d’entrée (le texte)', lang: 'texte', code: `Celui qui croyait au ciel
Celui qui n'y croyait pas
[…]
Fou qui fait le délicat
Fou qui songe à ses querelles` },
        { kind: 'h3', text: '1ʳᵉ étape « Split »' },
        { kind: 'p', text: 'Déterminer une **manière de découper (split) les données d’entrée** pour que **chacune des machines** puisse **travailler** sur une **partie** du texte. Notre problème est ici très simple — on peut par exemple décider de **découper les données d’entrée ligne par ligne**. Chacune des **lignes** du texte sera un **fragment** de nos données d’entrée ⇒ on obtient **4 fragments** depuis nos données d’entrée.' },
        { kind: 'list', items: [
          'Fragment 1 : `celui qui croyait au ciel`',
          'Fragment 2 : `celui qui ny croyait pas`',
          'Fragment 3 : `fou qui fait le delicat`',
          'Fragment 4 : `fou qui songe a ses querelles`',
        ]},
        { kind: 'h3', text: '2ᵉ étape « MAP »' },
        { kind: 'p', text: 'Le code de notre opération MAP (en pseudo-code) : **pour chaque mot de la ligne, générer un couple (mot ; 1)** :' },
        { kind: 'code', title: 'Pseudo-code de l’opération MAP', code: `POUR MOT dans LIGNE, FAIRE :
  GENERER COUPLE (MOT ; 1)` },
        { kind: 'p', text: 'Pour chacun de nos **fragments**, les **couples (clef ; valeur)** générés seront donc :' },
        { kind: 'table', headers: ['Fragment', 'Couples générés par le MAP'], rows: [
          ['celui qui croyait au ciel', '**(celui;1) (qui;1) (croyait;1) (au;1) (ciel;1)**'],
          ['celui qui ny croyait pas', '**(celui;1) (qui;1) (ny;1) (croyait;1) (pas;1)**'],
          ['fou qui fait le delicat', '**(fou;1) (qui;1) (fait;1) (le;1) (delicat;1)**'],
          ['fou qui songe a ses querelles', '**(fou;1) (qui;1) (songe;1) (a;1) (ses;1) (querelles;1)**'],
        ]},
        { kind: 'h3', text: '3ᵉ étape « SHUFFLE »' },
        { kind: 'p', text: 'Le **Shuffle** regroupe toutes les occurrences **d’une même clé ensemble** (mélange/tri) :' },
        { kind: 'list', items: [
          '`(celui;1) (celui;1)` — les 2 « celui »',
          '`(qui;1) (qui;1) (qui;1) (qui;1)` — les 4 « qui »',
          '`(croyait;1) (croyait;1)` — les 2 « croyait »',
          '`(au;1)` · `(ny;1)` · `(ciel;1)` · `(pas;1)` — clés uniques',
          '`(fou;1) (fou;1)` — les 2 « fou »',
          '`(fait;1) (le;1) (delicat;1) (songe;1) (a;1) (ses;1) (querelles;1)` — clés uniques',
        ]},
        { kind: 'h3', text: '4ᵉ étape « REDUCE »' },
        { kind: 'code', title: 'Pseudo-code de l’opération REDUCE', code: `TOTAL = 0
POUR COUPLE dans GROUPE, FAIRE :
  TOTAL = TOTAL + 1
RENVOYER TOTAL` },
        { kind: 'p', text: 'Une fois l’opération REDUCE effectuée, on obtiendra donc **une valeur unique pour chaque clef distincte**. En l’occurrence, notre résultat sera :' },
        { kind: 'code', title: 'Résultat final du Word Count', lang: 'résultat', code: `qui : 4
celui : 2
croyait : 2
fou : 2
au : 1
ciel : 1
ny : 1
pas : 1
fait : 1
[...]` },
        { kind: 'h3', text: 'Récapitulatif visuel' },
        { kind: 'p', text: 'Le schéma récapitulatif du cours suit le flux complet sur un exemple réduit (« celui qui croyait / ciel ciel croyait / celui ciel qui ») : **Données d’entrée → Splitting (fragmentation) → MAP → Shuffling (mélange/tri) → REDUCE → Résultat final** (qui : 2, ciel : 3, celui : 2, croyait : 2).' },
      ],
    },
    {
      id: 'stats-web',
      title: 'Exemple bonus : Statistiques web',
      blocks: [
        { kind: 'p', text: 'Un autre exemple : **on souhaite compter le nombre de visiteurs sur chacune des pages d’un site Internet**. On dispose des **fichiers de logs** sous la forme suivante :' },
        { kind: 'code', title: 'Fichiers de logs', lang: 'texte', code: `/index.html    [19/Oct/2013:18:45:03 +0200]
/contact.html [19/Oct/2013:18:46:15 +0200]
/news.php?id=5  [24/Oct/2013:18:13:02 +0200]
/news.php?id=4  [24/Oct/2013:18:13:12 +0200]
/news.php?id=18 [24/Oct/2013:18:14:31 +0200]
...etc...` },
        { kind: 'p', text: 'C’est le **même schéma** que Word Count : le MAP génère un couple `(page ; 1)` pour chaque ligne de log, le SHUFFLE regroupe par page, le REDUCE somme → nombre de visiteurs par page.' },
      ],
    },
    {
      id: 'longueur-moyenne',
      title: 'Exemple 2 : la longueur moyenne des mots',
      blocks: [
        { kind: 'p', text: '**Entrée : un grand fichier texte. Sortie : la longueur moyenne des mots dans le fichier.** L’astuce : produire **deux compteurs** — un compteur de mots et un compteur de lettres — puis les diviser à la fin.' },
        { kind: 'list', items: [
          '**MAP** : pour chaque mot, émettre `(count ; 1)` et `(length ; longueurDuMot)`',
          '**Reduce** : sommer → `(count, 3)` et `(length, 12)` pour l’entrée `dogs, like, cats`',
          '**Finish** : **mean = length / count = 12 / 3 = 4**',
        ]},
        { kind: 'diagram', id: 'mean-length-flow', caption: 'Flux des données pour la longueur moyenne : deux clés (count, length) puis mean = length/count' },
        { kind: 'note', variant: 'tip', text: 'À retenir : MapReduce n’est pas limité au comptage — la **clé** décide de ce que le REDUCE agrège. Ici, deux clés particulières (`count`, `length`) transportent l’information utile.' },
      ],
    },
    {
      id: 'voyelles-consonnes',
      title: 'Exemple 3 : le nombre de voyelles et consonnes',
      blocks: [
        { kind: 'p', text: '**Entrée : `dogs`, `like`, `cats`. Sortie : le nombre de voyelles (V) et de consonnes (C).**' },
        { kind: 'table', headers: ['Mot', 'Sortie du MAP'], rows: [
          ['dogs', '**(C, 3) (V, 1)**'],
          ['like', '**(C, 2) (V, 2)**'],
          ['cats', '**(C, 3) (V, 1)**'],
        ]},
        { kind: 'p', text: 'Le **Shuffle & Sort** regroupe les `C` ensemble et les `V` ensemble, puis le **REDUCE** somme : sortie finale **C : 8** et **V : 4**.' },
        { kind: 'note', variant: 'info', text: 'Vérification : d-o-g-s = 3 consonnes + 1 voyelle ; l-i-k-e = 2 + 2 ; c-a-t-s = 3 + 1. Total : 3+2+3 = **8 consonnes**, 1+2+1 = **4 voyelles**. ✔' },
      ],
    },
  ],
};
