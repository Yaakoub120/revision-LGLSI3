import type { CourseModule } from '@/types/course';

export const module6: CourseModule = {
  id: 6,
  slug: 'replicasets',
  title: 'ReplicaSets — la réplication dans MongoDB',
  subtitle: 'La tolérance aux pannes par le principe M/E : le nœud PRIMARY qui reçoit toutes les requêtes, les SECONDARY qui répliquent, et l’architecture complète d’un replicaSet.',
  icon: 'Users',
  accent: 'cyan',
  sections: [
    {
      id: 'tolerance',
      title: 'Le problème de la tolérance aux pannes',
      blocks: [
        { kind: 'p', text: '**Comment résoudre le problème de la tolérance aux pannes ?** MongoDB utilise pour cela une architecture basée sur **le principe « M/E »** (Maître / Esclave — Master / Slave) : un nœud décide, les autres copient.' },
        { kind: 'h3', text: 'Ce qu’apporte la réplication en MongoDB' },
        { kind: 'list', items: [
          'Assure la **redondance** et **augmente la disponibilité** des données',
          'Offre un niveau de **tolérance aux pannes contre la perte d’un seul serveur** de base de données',
        ]},
      ],
    },
    {
      id: 'replicaset',
      title: 'Le ReplicaSet : définition et rôles',
      blocks: [
        { kind: 'def', term: 'ReplicaSet', text: 'Un **groupe d’instances mongod** qui conservent **le même jeu de données**. Un replicaSet contient **plusieurs nœuds porteurs de données** ; parmi ces nœuds, **un seul membre est considéré comme le nœud principal (PRIMARY)** et les autres sont **secondaires (SECONDARY)**.' },
        { kind: 'def', term: 'Le serveur primaire « Primary »', text: 'C’est **à lui que toutes les requêtes sont envoyées (lecture/écriture)**. Il va s’occuper de **gérer la cohérence des données**.' },
        { kind: 'def', term: 'Les serveurs secondaires', text: 'Ils sont utilisés dans le **processus de réplication des données lors d’une mise à jour** : le Primary leur réplique chaque écriture.' },
        { kind: 'diagram', id: 'replicaset-arch', caption: 'Architecture du ReplicaSet : Writes et Reads vont au Primary, la réplication descend vers les Secondaries' },
        { kind: 'note', variant: 'warn', text: 'Si le **Primary** tombe en panne, le replicaSet **élit un nouveau Primary** parmi les secondaires : c’est ce mécanisme d’élection qui assure la **haute disponibilité** (on ne perd qu’un niveau de tolérance si l’on ne perd qu’un seul serveur).' },
        { kind: 'table', headers: ['Nœud', 'Rôle'], rows: [
          ['**PRIMARY**', 'Reçoit **toutes les requêtes** (lecture/écriture) · gère la **cohérence** des données'],
          ['**SECONDARY**', '**Réplication des données** lors d’une mise à jour · copies à jour du même jeu de données'],
        ]},
        { kind: 'p', text: 'L’application cliente ne parle jamais directement aux secondaires : elle passe par le **Driver** qui connaît le Primary. C’est le schéma **Client Application → Driver → Writes/Reads → Primary → (Replication) → Secondary & Secondary**.' },
      ],
    },
  ],
};
