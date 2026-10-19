import type { Module } from './types'

// ═══════════════════════════════════════════════════════════════
// MODULE 4 — HDFS (Hadoop Distributed File System)
// ═══════════════════════════════════════════════════════════════
export const module4: Module = {
  id: 'm4',
  num: 4,
  title: 'HDFS',
  subtitle: 'Hadoop Distributed File System — architecture, blocs, lecture/écriture',
  icon: '💾',
  color: 'teal',
  source: 'hdfs-mapreduce-1.pdf — Partie 1',
  sections: [
    {
      id: 'm4s1',
      title: 'HDFS — Présentation',
      blocks: [
        {
          type: 'definition',
          term: 'HDFS',
          def: 'HDFS = Hadoop Distributed File System = Système de fichiers (FileSystem) d\'Hadoop par défaut. HDFS est inspiré de GFS — « The Google File System », 2003.',
        },
        {
          type: 'note',
          title: 'Principales caractéristiques',
          text: "• Distribué : les données sont réparties sur les machines du cluster.\n• Répliqué : les données sont répliquées (par défaut 3) pour palier la défaillance d'une machine.\n• HDFS est « taillé » pour les fortes volumétries.",
        },
      ],
    },
    {
      id: 'm4s2',
      title: 'HDFS — Architecture',
      blocks: [
        {
          type: 'list',
          items: [
            "Dans HDFS, les données sont découpées en « blocks » — 128 Mo par défaut.",
          ],
        },
        {
          type: 'kv',
          items: [
            { k: 'Le NameNode', v: '2 NameNodes par Cluster (Hadoop 2), et 3 NameNodes par Cluster (Hadoop 3).' },
            { k: 'Le DataNode', v: '1 DataNode par machine du Cluster.' },
            { k: 'Namenode =', v: 'stocke les métadonnées des blocks (leur localisation, taille, date de création, …).' },
          ],
        },
        { type: 'diagram', diagram: 'hdfs-architecture' },
      ],
    },
    {
      id: 'm4s3',
      title: "HDFS : écriture d'un fichier",
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: '1. Le Client Hadoop demande',
              text: '"Je veux écrire le fichier data.txt sur HDFS (3 blocs)" → il s\'adresse au NameNode.',
            },
            {
              title: '2. Le NameNode répond',
              text: '"OK. Envoie aux DataNodes 1, 3 et 5." (il connaît la répartition des blocs).',
            },
            {
              title: '3. Le client écrit les blocs',
              text: "Le fichier data.txt est découpé en Bloc 1, Bloc 2, Bloc 3 : le Bloc 1 part vers DataNode 1, le Bloc 2 vers DataNode 3, le Bloc 3 vers DataNode 5.",
            },
          ],
        },
        { type: 'diagram', diagram: 'hdfs-write' },
      ],
    },
    {
      id: 'm4s4',
      title: "HDFS : lecture d'un fichier",
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: '1. Le Client Hadoop demande',
              text: '"Je veux lire le fichier data.txt sur HDFS" → il s\'adresse au NameNode.',
            },
            {
              title: '2. Le NameNode répond',
              text: '"OK. 3 blocs. Bloc 1 : DN 1, 2, 5 — Bloc 2 : DN 2, 3 — Bloc 3 : DN 1, 3, 5" (chaque bloc a plusieurs répliques).',
            },
            {
              title: '3. Le client lit les blocs',
              text: "Le client récupère les blocs directement depuis les DataNodes : DN1 (Bloc 1, Bloc 3), DN2 (Bloc 1, Bloc 2), DN3 (Bloc 2, Bloc 3), DN5 (Bloc 1) — puis reconstitue data.txt.",
            },
          ],
        },
        { type: 'diagram', diagram: 'hdfs-read' },
      ],
    },
    {
      id: 'm4s5',
      title: 'HDFS : quelques commandes (référence complète du cours)',
      blocks: [
        {
          type: 'table',
          headers: ['Commande', 'Rôle'],
          rows: [
            ['hdfs dfs -ls /user', 'Lister le contenu du répertoire /user sur HDFS'],
            ['hdfs dfs -mkdir nom_dossier_hdfs', 'Créer un dossier sur HDFS'],
            ['hdfs dfs -put fichier_en_local destination_sur_hdfs', 'Copier un fichier local vers HDFS'],
            ['hdfs dfs -copyToLocal fichier_hdfs destination_en_local', "Copier un fichier HDFS vers la machine locale"],
            ['hdfs dfs -cat fichier_sur_hdfs', 'Afficher le contenu d\'un fichier HDFS'],
            ['hdfs dfs -cp fichier_sur_hdfs destination_sur_hdfs', 'Copier un fichier à l\'intérieur de HDFS'],
            ['hdfs dfs -mv fichier_sur_hdfs destination_sur_hdfs', 'Déplacer un fichier dans HDFS'],
            ['hdfs dfs -rm fichier_sur_hdfs', 'Supprimer un fichier sur HDFS'],
            ['hdfs dfs -du -h dossier_sur_hdfs', "Afficher la taille (format lisible) d'un dossier HDFS"],
            ['hdfs dfs -setrep -R -w 3 fichier_sur_hdfs', 'Changer le facteur de réplication (récursif, en attente) à 3'],
          ],
        },
      ],
    },
  ],
}
