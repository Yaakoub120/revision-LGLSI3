'use client';

// Diagrammes SVG — Big Data : MongoDB (mapping SQL↔Mongo, ReplicaSet, Sharding, Chunks)

export function NosqlMapping() {
  const rows = [
    { sql: 'Table', mongo: 'Collection', c: '#0891b2' },
    { sql: 'Columns (colonnes)', mongo: 'field (champ)', c: '#16a34a' },
    { sql: 'rows (lignes)', mongo: 'document', c: '#d97706' },
  ];
  return (
    <svg viewBox="0 0 760 320" className="w-full h-auto" role="img" aria-label="Correspondance SQL MongoDB" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="320" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">SQL ↔ MongoDB : la traduction des concepts</text>
      {rows.map((r, i) => {
        const y = 60 + i * 66;
        return (
          <g key={r.sql}>
            <rect x="60" y={y} width="240" height="48" rx="9" fill="#475569" />
            <text x="180" y={y + 29} textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#fff">{r.sql}</text>
            <line x1="300" y1={y + 24} x2="460" y2={y + 24} stroke={r.c} strokeWidth="3" markerEnd="url(#nmA)" />
            <rect x="462" y={y} width="240" height="48" rx="9" fill={r.c} />
            <text x="582" y={y + 29} textAnchor="middle" fontSize="13.5" fontWeight="800" fill="#fff">{r.mongo}</text>
          </g>
        );
      })}
      <rect x="60" y="252" width="642" height="52" rx="9" fill="#fef3c7" stroke="#d97706" />
      <text x="381" y="273" textAnchor="middle" fontSize="11" fontWeight="800" fill="#92400e">Exemple du cours (collection students) : la ligne (1, Ahmed, Jasim, ahmed@test.com)</text>
      <text x="381" y="291" textAnchor="middle" fontSize="11" fontWeight="800" fill="#92400e">devient un document {`{ Id : 1, Firstname : 'Ahmed', Lastname : 'Jasim', Email : 'ahmed@test.com', Mobile : 900011111 }`}</text>
      <defs>
        <marker id="nmA" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#78716c" />
        </marker>
      </defs>
    </svg>
  );
}

export function ReplicasetArch() {
  return (
    <svg viewBox="0 0 760 320" className="w-full h-auto" role="img" aria-label="Architecture du ReplicaSet" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="320" rx="12" fill="#fafafa" />
      <text x="380" y="26" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">L’architecture du ReplicaSet — principe « M/E » (tolérance aux pannes)</text>
      {/* Client */}
      <rect x="280" y="48" width="200" height="56" rx="10" fill="#57534e" />
      <text x="380" y="72" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#fff">Client Application</text>
      <text x="380" y="92" textAnchor="middle" fontSize="10.5" fill="#e7e5e4">Driver</text>
      {/* Primary */}
      <rect x="300" y="150" width="160" height="46" rx="10" fill="#0284c7" />
      <text x="380" y="179" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">Primary</text>
      {/* Secondaries */}
      <rect x="120" y="240" width="160" height="46" rx="10" fill="#16a34a" />
      <text x="200" y="269" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">Secondary</text>
      <rect x="480" y="240" width="160" height="46" rx="10" fill="#16a34a" />
      <text x="560" y="269" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">Secondary</text>
      {/* Flèches */}
      <line x1="345" y1="104" x2="350" y2="150" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#rsA)" />
      <text x="322" y="132" fontSize="10.5" fontWeight="800" fill="#0284c7">Writes</text>
      <line x1="415" y1="104" x2="410" y2="150" stroke="#57534e" strokeWidth="2.5" markerEnd="url(#rsA)" />
      <text x="420" y="132" fontSize="10.5" fontWeight="800" fill="#57534e">Reads</text>
      <line x1="350" y1="196" x2="230" y2="240" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#rsA)" />
      <text x="245" y="216" fontSize="10" fontWeight="800" fill="#16a34a" transform="rotate(24 245 216)">Réplication</text>
      <line x1="410" y1="196" x2="530" y2="240" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#rsA)" />
      <text x="452" y="212" fontSize="10" fontWeight="800" fill="#16a34a" transform="rotate(-24 452 212)">Réplication</text>
      <rect x="90" y="292" width="580" height="22" rx="6" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="307" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#44403c">Toutes les requêtes (lecture/écriture) → PRIMARY · cohérence gérée par le Primary · secondaires = copie lors des mises à jour</text>
      <defs>
        <marker id="rsA" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#78716c" />
        </marker>
      </defs>
    </svg>
  );
}

export function ShardingArch() {
  return (
    <svg viewBox="0 0 760 380" className="w-full h-auto" role="img" aria-label="Architecture du sharding MongoDB" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="380" rx="12" fill="#fafafa" />
      <text x="380" y="26" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Sharding MongoDB : mongos (routeurs) + Config Servers + Shards</text>
      {/* Apps */}
      <rect x="80" y="52" width="200" height="52" rx="10" fill="#0891b2" />
      <text x="180" y="83" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#fff">MovieReviewApp</text>
      <rect x="480" y="52" width="200" height="52" rx="10" fill="#0891b2" />
      <text x="580" y="83" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#fff">MovieRentingApp</text>
      {/* mongos */}
      <rect x="80" y="150" width="200" height="46" rx="10" fill="#0ea5e9" />
      <text x="180" y="179" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">mongos (routeur)</text>
      <rect x="480" y="150" width="200" height="46" rx="10" fill="#0ea5e9" />
      <text x="580" y="179" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">mongos (routeur)</text>
      <line x1="180" y1="104" x2="180" y2="150" stroke="#78716c" strokeWidth="2.5" markerEnd="url(#shA)" />
      <line x1="580" y1="104" x2="580" y2="150" stroke="#78716c" strokeWidth="2.5" markerEnd="url(#shA)" />
      {/* Config servers */}
      <rect x="280" y="150" width="200" height="46" rx="10" fill="#d97706" />
      <text x="380" y="171" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#fff">Config Servers (ReplicaSet)</text>
      <text x="380" y="188" textAnchor="middle" fontSize="9" fill="#fef3c7">où se trouve la donnée ? répartition dynamique</text>
      <line x1="280" y1="173" x2="252" y2="173" stroke="#78716c" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#shA)" />
      <line x1="480" y1="173" x2="452" y2="173" stroke="#78716c" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#shA)" />
      {/* Shards */}
      {[
        { n: 'Shard 1 (ReplicaSet)', d: 'title : a-h', x: 140 },
        { n: 'Shard 2 (ReplicaSet)', d: 'title : i-p', x: 380 },
        { n: 'Shard 3 (ReplicaSet)', d: 'title : q-z', x: 620 },
      ].map((s) => (
        <g key={s.n}>
          <line x1="380" y1="196" x2={s.x} y2="250" stroke="#78716c" strokeWidth="2" markerEnd="url(#shA)" />
          <rect x={s.x - 105} y="250" width="210" height="56" rx="10" fill="#16a34a" />
          <text x={s.x} y="273" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#fff">{s.n}</text>
          <text x={s.x} y="293" textAnchor="middle" fontSize="10" fill="#dcfce7">{s.d}</text>
        </g>
      ))}
      <rect x="60" y="326" width="640" height="40" rx="8" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="342" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#44403c">Requête AVEC la clé « title » → routage direct vers le bon shard · SANS la clé → tous les shards interrogés (scatter/gather)</text>
      <text x="380" y="358" textAnchor="middle" fontSize="10" fill="#57534e">3 types de nœuds : routeurs (mongos) · serveurs de configuration (Config Server) · serveurs de données (Shard)</text>
      <defs>
        <marker id="shA" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#78716c" />
        </marker>
      </defs>
    </svg>
  );
}

export function ChunkSharding() {
  const docs = ['Any Given Sunday', 'Alien 3', 'Babe', 'Edward Scissorhand', 'Wonder Woman', 'West Side Story', 'Wall Street'];
  return (
    <svg viewBox="0 0 760 330" className="w-full h-auto" role="img" aria-label="Chunks MongoDB" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="330" rx="12" fill="#fafafa" />
      <text x="380" y="26" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Chunks : découpage (64 Mo par défaut) et migration entre shards</text>
      {/* Premier chunk */}
      <text x="380" y="52" textAnchor="middle" fontSize="11" fontWeight="700" fill="#57534e">1) Dès la définition de la clé de sharding : un premier Chunk contenant TOUS les documents</text>
      <rect x="80" y="62" width="600" height="56" rx="9" fill="#0ea5e9" opacity="0.16" />
      <rect x="80" y="62" width="600" height="24" rx="9" fill="#0284c7" />
      <text x="380" y="79" textAnchor="middle" fontSize="11" fontWeight="900" fill="#fff">Chunk unique (title : tous les films)</text>
      {docs.map((d, i) => (
        <text key={d} x={90 + (i % 4) * 150} y={i < 4 ? 102 : 114} textAnchor="start" fontSize="7.5" fontWeight="600" fill="#0c4a6e">‘{d}’</text>
      ))}
      {/* Split */}
      <line x1="380" y1="122" x2="380" y2="148" stroke="#78716c" strokeWidth="2.5" markerEnd="url(#ckA)" />
      <text x="395" y="140" fontSize="10.5" fontWeight="800" fill="#d97706">dépasse 64 Mo → split</text>
      {/* Trois chunks */}
      {[
        { r: 'title a-h', d: ['Any Given Sunday', 'Edward Scissorhand'], x: 140 },
        { r: 'title i-p', d: ['Alien 3', 'Wonder Woman'], x: 380 },
        { r: 'title q-z', d: ['Babe', 'West Side Story', 'Wall Street'], x: 620 },
      ].map((c) => (
        <g key={c.r}>
          <rect x={c.x - 105} y="150" width="210" height="76" rx="9" fill="#16a34a" opacity="0.15" />
          <rect x={c.x - 105} y="150" width="210" height="24" rx="9" fill="#16a34a" />
          <text x={c.x} y="167" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#fff">Chunk ({c.r})</text>
          {c.d.map((d, j) => (
            <text key={d} x={c.x} y={190 + j * 12} textAnchor="middle" fontSize="8" fontWeight="600" fill="#166534">‘{d}’</text>
          ))}
        </g>
      ))}
      {/* Migration */}
      <line x1="245" y1="240" x2="275" y2="240" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#ckA)" markerStart="url(#ckA)" />
      <text x="380" y="262" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#dc2626">Migration automatique : si une partition possède assez de chunks, MongoDB les migre (rééquilibrage)</text>
      <rect x="60" y="278" width="640" height="36" rx="8" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="294" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#44403c">MongoDB divise les données partitionnées en chunks · split chaque fois qu’un chunk dépasse la taille fixée (64 Mo par défaut)</text>
      <text x="380" y="308" textAnchor="middle" fontSize="10" fill="#57534e">Une collection partitionnée possède une seule clé de partition, composée d’un champ qui existe dans les documents</text>
      <defs>
        <marker id="ckA" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#78716c" />
        </marker>
      </defs>
    </svg>
  );
}
