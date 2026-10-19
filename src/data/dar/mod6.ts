import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// Modules 11 & 12 — Architectures : fondations + architectures classiques
// ═══════════════════════════════════════════════════════════════

export const dmod11: Module = {
  id: 'd11',
  num: 11,
  title: 'Architectures réparties : fondations',
  subtitle: 'Définition, évolution et les 12 qualités architecturales',
  icon: '🏛️',
  color: 'sky',
  source: 'Chapitre 3 — slides 108-115',
  sections: [
    {
      id: 'd11s1',
      title: 'Définition de l\u2019architecture d\u2019une application répartie',
      blocks: [
        { type: 'definition', term: 'Architecture d\u2019une application répartie', def: 'La manière dont les différents composants logiciels d\u2019une application sont organisés, répartis sur plusieurs machines et coordonnent leurs interactions afin de fournir un service global. C\u2019est la structure qui décrit :\n✓ où sont placés les composants ?\n✓ comment ils communiquent ?\n✓ comment ils coopèrent pour réaliser une fonctionnalité ?' },
        { type: 'note', title: 'En résumé', text: 'L\u2019architecture sert de plan d\u2019organisation d\u2019une application exécutée sur plusieurs ordinateurs connectés par un réseau.' },
      ],
    },
    {
      id: 'd11s2',
      title: 'Évolution des architectures',
      blocks: [
        { type: 'timeline', items: [
          { time: 'Années 1960', text: 'Architecture centralisée : un seul ordinateur puissant partagé par plusieurs utilisateurs.' },
          { time: 'Années 1980', text: 'Architecture client-serveur : répartition des rôles entre un client et un serveur.' },
          { time: 'Années 1990', text: 'Architecture multi-couches : apparition des serveurs d\u2019applications et des middleware comme CORBA.' },
          { time: 'Années 2000', text: 'Architecture orientée services (SOA) : pour faciliter l\u2019intégration entre systèmes via les services Web.' },
          { time: 'Années 2010+', text: 'Les architectures micro-services, événementielles et serverless.' },
        ] },
        { type: 'diagram', diagram: 'ArchEvolution' },
      ],
    },
    {
      id: 'd11s3',
      title: 'Qualités architecturales (1-6)',
      blocks: [
        { type: 'paragraph', text: 'L\u2019architecture d\u2019une application répartie cherche à assurer plusieurs qualités essentielles — en voici les six premières.' },
        { type: 'definition', term: '1. Scalabilité', def: 'La capacité du système à augmenter efficacement ses ressources pour supporter une charge plus élevée sans dégradation notable des performances.' },
        { type: 'definition', term: '2. Performance', def: 'La rapidité avec laquelle le système traite les requêtes et répond aux utilisateurs tout en utilisant ses ressources de manière optimale.' },
        { type: 'definition', term: '3. Fiabilité', def: 'La capacité du système à fonctionner correctement sur une longue durée sans erreurs ni interruptions.' },
        { type: 'definition', term: '4. Tolérance aux pannes', def: 'L\u2019aptitude du système à continuer de fonctionner malgré la défaillance de l\u2019un de ses composants.' },
        { type: 'definition', term: '5. Disponibilité', def: 'La capacité du système à rester opérationnel et accessible aux utilisateurs quasiment en permanence.' },
        { type: 'definition', term: '6. Sécurité', def: 'Assure la protection des données et des services contre les accès non autorisés, les attaques et les manipulations malveillantes.' },
      ],
    },
    {
      id: 'd11s4',
      title: 'Qualités architecturales (7-12)',
      blocks: [
        { type: 'definition', term: '7. Maintenabilité', def: 'La facilité avec laquelle le système peut être corrigé, modifié ou amélioré sans perturber son fonctionnement global.' },
        { type: 'definition', term: '8. Modularité', def: 'La capacité du système à être composé de modules indépendants, facilitant le développement, la compréhension et le remplacement des composants.' },
        { type: 'definition', term: '9. Faible couplage', def: 'Les composants du système interagissent avec un minimum de dépendances, permettant une évolution indépendante des modules.' },
        { type: 'definition', term: '10. Interopérabilité', def: 'La capacité du système à communiquer et à fonctionner avec d\u2019autres systèmes ou technologies, quels que soient leurs langages ou plateformes.' },
        { type: 'definition', term: '11. Transparence', def: 'Vise à masquer la complexité et la distribution du système, afin que l\u2019utilisateur ou le programmeur perçoive un fonctionnement homogène et simple.' },
        { type: 'definition', term: '12. Compatibilité', def: 'La capacité du système à fonctionner correctement avec d\u2019autres logiciels, protocoles ou versions, afin de garantir une intégration harmonieuse.' },
      ],
    },
    {
      id: 'd11s5',
      title: 'Les grandes familles d\u2019architectures réparties',
      blocks: [
        { type: 'kv', items: [
          { k: 'Les architectures classiques', v: '• L\u2019architecture client/serveur • L\u2019architecture en couches • L\u2019architecture Pair-à-pair.' },
          { k: 'Les architectures modernes', v: '• L\u2019architecture orientée Service (SOA) • L\u2019architecture micro-services • L\u2019architecture serverless (et l\u2019architecture événementielle).' },
        ] },
      ],
    },
  ],
}

export const dmod12: Module = {
  id: 'd12',
  num: 12,
  title: 'Les architectures classiques',
  subtitle: 'Client/Serveur, en couches (3-tiers, n-tiers) et Pair-à-Pair + comparaison complète',
  icon: '🏢',
  color: 'sky',
  source: 'Chapitre 3 — slides 116-121',
  sections: [
    {
      id: 'd12s1',
      title: 'Architecture classique : Client/Serveur',
      blocks: [
        { type: 'definition', term: 'Architecture client–serveur', def: 'Un modèle où l\u2019application est divisée en deux parties distinctes. Le client envoie des requêtes au serveur, qui traite la demande et renvoie une réponse.' },
        { type: 'list', items: [
          'Client layer : interfaces graphiques.',
          'Server layer : serveurs.',
          'Flux : Send request (client → serveur) / Response to request (serveur → client).',
          'Cette architecture repose sur le principe d\u2019accès à des ressources centralisées via un réseau.',
        ] },
        { type: 'note', title: 'Exemple', text: 'Une application desktop qui interroge une base de données sur un serveur.' },
        { type: 'diagram', diagram: 'ClassicArchs' },
      ],
    },
    {
      id: 'd12s2',
      title: 'Architecture classique : en couches',
      blocks: [
        { type: 'definition', term: 'Architecture en couches', def: 'Un modèle conceptuel qui organise une application en plusieurs niveaux logiques, chacun remplissant une fonction spécifique. Chaque couche possède une responsabilité propre (présentation, logique métier, accès aux données, etc.) et ne communique qu\u2019avec les couches voisines.' },
        { type: 'kv', items: [
          { k: 'Objectifs', v: 'Améliorer la modularité, faciliter la maintenance, encourager la réutilisabilité et clarifier la séparation des préoccupations.' },
        ] },
        { type: 'paragraph', text: 'Dans les applications réparties, l\u2019architecture en couches peut être déployée physiquement sur plusieurs machines. Parmi les architectures qui implémentent ce modèle conceptuel, on trouve notamment : l\u2019architecture 3-tiers, qui sépare physiquement l\u2019interface utilisateur, la logique applicative et les données ; et les architectures n-tiers basées sur le Web, qui rajoutent des tiers supplémentaires tels que le serveur Web. → Ces architectures sont donc des déclinaisons physiques et distribuées de l\u2019architecture en couches.' },
        { type: 'diagram', diagram: 'TierArch' },
      ],
    },
    {
      id: 'd12s3',
      title: 'Architecture classique : Pair-à-Pair (P2P)',
      blocks: [
        { type: 'definition', term: 'Architecture Pair-à-Pair (P2P)', def: 'Un modèle d\u2019organisation distribué dans lequel chaque nœud du réseau, appelé pair, joue simultanément le rôle de client et de serveur.' },
        { type: 'paragraph', text: 'Contrairement à l\u2019architecture client-serveur, il n\u2019existe pas de serveur central : les pairs communiquent directement entre eux, partagent des ressources (fichiers, puissance de calcul, stockage, …) et collaborent pour assurer le fonctionnement global du système.' },
        { type: 'note', title: 'Propriétés du réseau P2P', text: 'Décentralisé, autonome, scalable et robuste, car le système continue de fonctionner même si plusieurs nœuds tombent en panne.' },
      ],
    },
    {
      id: 'd12s4',
      title: 'Comparaison des architectures classiques',
      blocks: [
        { type: 'table', headers: ['Critère', 'Client/Serveur', 'En Couches', 'Pair-à-Pair (P2P)'], rows: [
          ['Organisation', '1 serveur central, plusieurs clients.', 'Plusieurs couches logiques dépendant les unes des autres (2, 3, n couches).', 'Réseau maillé de pairs interconnectés sans serveur central.'],
          ['Communication', 'Client → Serveur.', 'Entre couches voisines (présentation, métier, données).', 'Directement entre pairs (Peer to Peer).'],
          ['Centralisation', 'Forte centralisation.', 'Dépend du déploiement (souvent centralisé dans les tiers).', 'Décentralisation complète ou partielle.'],
          ['Scalabilité', 'Limitée par la capacité du serveur.', 'Bonne scalabilité si les tiers sont distribués.', 'Très élevée : chaque nouveau pair ajoute des ressources.'],
          ['Tolérance aux pannes', 'Faible : si le serveur tombe, tout s\u2019arrête.', 'Moyenne : dépend des tiers critiques.', 'Très élevée : le réseau continue même si plusieurs pairs tombent.'],
          ['Complexité de mise en œuvre', 'Faible à moyenne.', 'Moyenne (plus de couches à gérer).', 'Plus complexe.'],
          ['Avantages principaux', 'Simplicité, contrôle centralisé, maintenance facilitée.', 'Modulaire, maintenable, réutilisable.', 'Scalabilité, robustesse, absence de point unique de défaillance.'],
          ['Inconvénients principaux', 'Point unique de défaillance, surcharge du serveur.', 'Complexité accrue, risque de surcouches inutiles.', 'Sécurité complexe, performances variables, cohérence difficile.'],
        ] },
      ],
    },
  ],
}
