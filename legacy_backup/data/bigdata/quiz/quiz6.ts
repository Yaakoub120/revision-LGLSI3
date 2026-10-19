import type { QuizQuestion } from '@/types/course';

export const bdQuiz6: QuizQuestion[] = [
  {
    id: 'bd6-q1', moduleId: 6, tag: 'Tolérance aux pannes',
    q: 'Comment MongoDB résout-il le problème de la tolérance aux pannes ?',
    choices: ['Par une architecture basée sur le principe « M/E » (Maître/Esclave)', 'En dupliquant la base sur DVD', 'En désactivant les écritures', 'En utilisant SQL'],
    answer: 0,
    explain: 'MongoDB utilise une architecture basée sur le principe « M/E » (maître/esclave) : réplication avec un PRIMARY et des SECONDARY.',
  },
  {
    id: 'bd6-q2', moduleId: 6, tag: 'Réplication',
    q: 'Qu’assure la réplication en MongoDB ?',
    choices: ['La redondance, l’augmentation de la disponibilité, et un niveau de tolérance contre la perte d’un seul serveur', 'La suppression des doublons', 'L’encryption automatique', 'La vitesse des requêtes SELECT'],
    answer: 0,
    explain: 'Réplication : assure la redondance et augmente la disponibilité des données ; offre un niveau de tolérance aux pannes contre la perte d’un seul serveur de BD.',
  },
  {
    id: 'bd6-q3', moduleId: 6, tag: 'ReplicaSet',
    q: 'Qu’est-ce qu’un replicaSet ?',
    choices: ['Un groupe d’instances mongod qui conservent le même jeu de données', 'Un index unique', 'Un type de collection shardée', 'Un backup hebdomadaire'],
    answer: 0,
    explain: 'Un réplicatset est un groupe d’instances mongod qui conservent le même jeu de données. Il contient plusieurs nœuds porteurs de données.',
  },
  {
    id: 'bd6-q4', moduleId: 6, tag: 'ReplicaSet',
    q: 'Combien de membres principaux (PRIMARY) y a-t-il dans un replicaSet ?',
    choices: ['Un seul — les autres sont secondaires', 'Deux', 'Tous', 'Aucun'],
    answer: 0,
    explain: 'Parmi ces nœuds, un seul membre est considéré comme le nœud principal, et les autres sont secondaires.',
  },
  {
    id: 'bd6-q5', moduleId: 6, tag: 'PRIMARY',
    q: 'À qui sont envoyées toutes les requêtes (lecture/écriture) dans un replicaSet ?',
    choices: ['Au serveur primaire « Primary »', 'Aux secondaires en round-robin', 'Au mongos', 'À n’importe quel nœud'],
    answer: 0,
    explain: 'Le serveur primaire « Primary », à qui toutes les requêtes sont envoyées (lecture/écriture), s’occupe de gérer la cohérence des données.',
  },
  {
    id: 'bd6-q6', moduleId: 6, tag: 'SECONDARY',
    q: 'Quel est le rôle des serveurs secondaires ?',
    choices: ['Ils sont utilisés dans le processus de réplication des données lors d’une mise à jour', 'Ils répondent aux écritures', 'Ils font le sharding', 'Ils gèrent les index'],
    answer: 0,
    explain: 'Les serveurs secondaires sont utilisés dans le processus de réplication des données lors d’une mise à jour : le Primary leur réplique chaque écriture.',
  },
  {
    id: 'bd6-q7', moduleId: 6, tag: 'Architecture',
    q: 'Dans le schéma Client Application → Driver → Primary/Secondaries, qui émet les « Writes » ?',
    choices: ['Le client, via le driver, vers le Primary', 'Le Secondary', 'Le Config Server', 'Le mongos'],
    answer: 0,
    explain: 'L’architecture du replicaSet : Client Application → Driver ; Writes et Reads vont au Primary ; la « Replication » descend du Primary vers chaque Secondary.',
  },
  {
    id: 'bd6-q8', moduleId: 6, tag: 'mongod',
    q: 'Qu’est-ce qu’une instance « mongod » ?',
    choices: ['Le processus serveur de MongoDB', 'Le shell interactif', 'Un outil de visualisation', 'Un driver Java'],
    answer: 0,
    explain: 'mongod = le processus serveur (daemon) de MongoDB ; un replicaSet est un groupe d’instances mongod. (mongo = le shell client.)',
  },
];
