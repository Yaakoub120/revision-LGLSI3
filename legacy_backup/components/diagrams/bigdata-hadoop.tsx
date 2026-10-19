'use client';

// Diagrammes SVG — Big Data : écosystème Hadoop, HDFS, MapReduce

export function HadoopEcosystem() {
  return (
    <svg viewBox="0 0 760 360" className="w-full h-auto" role="img" aria-label="Écosystème Hadoop" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="360" rx="12" fill="#fafafa" />
      <text x="380" y="26" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">L’écosystème Hadoop — l’équation : coût / performance / stockage / flexibilité</text>
      {/* Stockage */}
      <rect x="50" y="52" width="320" height="76" rx="10" fill="#65a30d" opacity="0.15" />
      <rect x="50" y="52" width="320" height="28" rx="10" fill="#65a30d" />
      <text x="210" y="71" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">STOCKAGE — HDFS</text>
      <text x="210" y="100" textAnchor="middle" fontSize="10.5" fill="#44403c">blocks de 128 Mo · NameNode (métadonnées) · DataNode (données)</text>
      {/* Calcul */}
      <rect x="390" y="52" width="320" height="76" rx="10" fill="#0891b2" opacity="0.15" />
      <rect x="390" y="52" width="320" height="28" rx="10" fill="#0891b2" />
      <text x="550" y="71" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">CALCUL — MapReduce</text>
      <text x="550" y="100" textAnchor="middle" fontSize="10.5" fill="#44403c">Split → Map → Shuffle → Reduce · « diviser pour régner »</text>
      <line x1="370" y1="90" x2="390" y2="90" stroke="#78716c" strokeWidth="2" markerEnd="url(#ecoArrow)" />
      <line x1="390" y1="100" x2="370" y2="100" stroke="#78716c" strokeWidth="2" markerEnd="url(#ecoArrow)" />
      {/* Couches */}
      <text x="380" y="160" textAnchor="middle" fontSize="12" fontWeight="800" fill="#57534e">Couches spécialisées construites au-dessus :</text>
      {[
        { t: 'Processing', d: 'Hadoop, Hive, Pig, mrjob, Caffeine', c: '#16a34a', x: 130 },
        { t: 'NoSQL Databases', d: 'HBase, MongoDB, Vertica, Cassandra, Neo4j', c: '#d97706', x: 380 },
        { t: 'Servers', d: 'EC2, Google App Engine, Elastic Beanstalk, Heroku', c: '#7c3aed', x: 630 },
        { t: 'Analytics', d: 'R, SAS, scikit-learn, Spark MLLib, Mahout', c: '#dc2626', x: 280 },
        { t: 'Search', d: 'Solr/Lucene, ElasticSearch', c: '#0891b2', x: 530 },
      ].map((b) => (
        <g key={b.t}>
          <rect x={b.x - 115} y="178" width="230" height="52" rx="9" fill={b.c} opacity="0.14" />
          <rect x={b.x - 115} y="178" width="230" height="24" rx="9" fill={b.c} />
          <text x={b.x} y="195" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#fff">{b.t}</text>
          <text x={b.x} y="220" textAnchor="middle" fontSize="9.5" fill="#44403c">{b.d}</text>
        </g>
      ))}
      <rect x="50" y="258" width="660" height="82" rx="10" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="282" textAnchor="middle" fontSize="12" fontWeight="800" fill="#44403c">Qui a construit quoi ?</text>
      <text x="380" y="304" textAnchor="middle" fontSize="10.5" fill="#57534e">Google : Big Table (→ a inspiré HBase) &amp; MapReduce (GFS, 2003) · Yahoo : Hadoop &amp; S4</text>
      <text x="380" y="324" textAnchor="middle" fontSize="10.5" fill="#57534e">Facebook : Cassandra &amp; Hive · Twitter : Storm &amp; FlockDB · LinkedIn : SenseiDB &amp; Voldemort</text>
      <defs>
        <marker id="ecoArrow" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#78716c" />
        </marker>
      </defs>
    </svg>
  );
}

export function HdfsArch() {
  const dns = [
    { n: 'DataNode 1', b: ['Bloc 1', 'Bloc 3'] },
    { n: 'DataNode 2', b: ['Bloc 1', 'Bloc 2'] },
    { n: 'DataNode 3', b: ['Bloc 2', 'Bloc 3'] },
    { n: 'DataNode 5', b: ['Bloc 1'] },
  ];
  return (
    <svg viewBox="0 0 760 340" className="w-full h-auto" role="img" aria-label="Architecture HDFS" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="340" rx="12" fill="#fafafa" />
      <text x="380" y="26" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">HDFS : NameNode (métadonnées) + DataNodes (données) — blocks de 128 Mo, réplication ×3</text>
      {/* NameNode */}
      <rect x="290" y="48" width="180" height="66" rx="10" fill="#dc2626" />
      <text x="380" y="75" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff">NameNode</text>
      <text x="380" y="95" textAnchor="middle" fontSize="9.5" fill="#fecaca">métadonnées : localisation, taille, date</text>
      <text x="380" y="108" textAnchor="middle" fontSize="9" fill="#fecaca">2/cluster (Hadoop 2) · 3/cluster (Hadoop 3)</text>
      {/* DataNodes */}
      {dns.map((d, i) => (
        <g key={d.n}>
          <line x1="380" y1="114" x2={110 + i * 180} y2="170" stroke="#78716c" strokeWidth="2" strokeDasharray="4 3" />
          <rect x={110 + i * 180 - 75} y="170" width="150" height="92" rx="10" fill="#6366f1" opacity="0.16" />
          <rect x={110 + i * 180 - 75} y="170" width="150" height="26" rx="10" fill="#4f46e5" />
          <text x={110 + i * 180} y="188" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#fff">{d.n}</text>
          {d.b.map((b, j) => (
            <g key={b}>
              <rect x={110 + i * 180 - 62 + j * 66} y="204" width="58" height="46" rx="6" fill="#f59e0b" />
              <text x={110 + i * 180 - 33 + j * 66} y="231" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#78350f">{b}</text>
            </g>
          ))}
        </g>
      ))}
      <rect x="50" y="284" width="660" height="40" rx="8" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="301" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#44403c">1 DataNode par machine du cluster · chaque bloc répliqué 3 fois par défaut</text>
      <text x="380" y="316" textAnchor="middle" fontSize="10" fill="#57534e">HDFS = inspiré de GFS (Google File System, 2003) · taillé pour les fortes volumétries</text>
    </svg>
  );
}

export function HdfsWrite() {
  return (
    <svg viewBox="0 0 760 320" className="w-full h-auto" role="img" aria-label="Écriture HDFS" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="320" rx="12" fill="#fafafa" />
      <text x="380" y="26" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">HDFS : écriture d’un fichier (data.txt — 3 blocs)</text>
      {/* Client */}
      <rect x="70" y="70" width="170" height="52" rx="10" fill="#16a34a" />
      <text x="155" y="92" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#fff">Client Hadoop</text>
      <text x="155" y="110" textAnchor="middle" fontSize="9" fill="#dcfce7">« Je veux écrire data.txt (3 blocs) »</text>
      {/* NameNode */}
      <rect x="500" y="70" width="180" height="52" rx="10" fill="#dc2626" />
      <text x="590" y="92" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#fff">NameNode</text>
      <text x="590" y="110" textAnchor="middle" fontSize="9" fill="#fecaca">« OK. Envoie aux DataNodes 1, 3 et 5 »</text>
      <line x1="240" y1="96" x2="500" y2="96" stroke="#78716c" strokeWidth="2.5" markerEnd="url(#hwA)" />
      {/* DataNodes */}
      {[
        { n: 'DataNode 1', b: 'Bloc 1', x: 120 },
        { n: 'DataNode 3', b: 'Bloc 2', x: 340 },
        { n: 'DataNode 5', b: 'Bloc 3', x: 560 },
      ].map((d) => (
        <g key={d.n}>
          <line x1="155" y1="122" x2={d.x} y2="190" stroke="#78716c" strokeWidth="2" markerEnd="url(#hwA)" />
          <rect x={d.x - 70} y="190" width="140" height="40" rx="9" fill="#4f46e5" />
          <text x={d.x} y="215" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#fff">{d.n}</text>
          <rect x={d.x - 40} y="240" width="80" height="42" rx="7" fill="#f59e0b" />
          <text x={d.x} y="266" textAnchor="middle" fontSize="11" fontWeight="900" fill="#78350f">{d.b}</text>
        </g>
      ))}
      <rect x="70" y="290" width="620" height="22" rx="6" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="305" textAnchor="middle" fontSize="10" fontWeight="600" fill="#44403c">Le NameNode décide de la placement des blocs — le client distribue, puis réplication vers les autres DataNodes</text>
      <defs>
        <marker id="hwA" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#78716c" />
        </marker>
      </defs>
    </svg>
  );
}

export function HdfsRead() {
  return (
    <svg viewBox="0 0 760 320" className="w-full h-auto" role="img" aria-label="Lecture HDFS" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="320" rx="12" fill="#fafafa" />
      <text x="380" y="26" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">HDFS : lecture d’un fichier (data.txt)</text>
      <rect x="70" y="70" width="170" height="52" rx="10" fill="#16a34a" />
      <text x="155" y="92" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#fff">Client Hadoop</text>
      <text x="155" y="110" textAnchor="middle" fontSize="9" fill="#dcfce7">« Je veux lire data.txt »</text>
      <rect x="440" y="62" width="250" height="70" rx="10" fill="#dc2626" />
      <text x="565" y="82" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">NameNode</text>
      <text x="565" y="99" textAnchor="middle" fontSize="9" fill="#fecaca">« OK. 3 blocs. Bloc 1 : DN 1, 2, 5.</text>
      <text x="565" y="113" textAnchor="middle" fontSize="9" fill="#fecaca">Bloc 2 : DN 2, 3. Bloc 3 : DN 1, 3, 5 »</text>
      <line x1="240" y1="96" x2="440" y2="96" stroke="#78716c" strokeWidth="2.5" markerEnd="url(#hrA)" />
      {[
        { n: 'DataNode 1', bs: ['1', '3'], x: 120 },
        { n: 'DataNode 2', bs: ['1', '2'], x: 340 },
        { n: 'DataNode 3', bs: ['2', '3'], x: 540 },
      ].map((d) => (
        <g key={d.n}>
          <line x1="155" y1="122" x2={d.x} y2="185" stroke="#78716c" strokeWidth="2" markerEnd="url(#hrA)" />
          <rect x={d.x - 75} y="185" width="150" height="38" rx="9" fill="#4f46e5" />
          <text x={d.x} y="209" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#fff">{d.n}</text>
          {d.bs.map((b, j) => (
            <rect key={b} x={d.x - 58 + j * 64} y="232" width="56" height="40" rx="6" fill="#f59e0b" />
          ))}
          {d.bs.map((b, j) => (
            <text key={b + 't'} x={d.x - 30 + j * 64} y="257" textAnchor="middle" fontSize="11" fontWeight="900" fill="#78350f">B{b}</text>
          ))}
        </g>
      ))}
      <rect x="70" y="286" width="620" height="24" rx="6" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="302" textAnchor="middle" fontSize="10" fontWeight="600" fill="#44403c">Le client lit chaque bloc directement auprès des DataNodes (en parallèle) — le NameNode ne transporte jamais les données</text>
      <defs>
        <marker id="hrA" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#78716c" />
        </marker>
      </defs>
    </svg>
  );
}

export function MapreduceFlow() {
  const frags = ['celui qui croyait au ciel', 'celui qui ny croyait pas', 'fou qui fait le delicat', 'fou qui songe a ses querelles'];
  const mapped = [
    '(celui;1)(qui;1)(croyait;1)(au;1)(ciel;1)',
    '(celui;1)(qui;1)(ny;1)(croyait;1)(pas;1)',
    '(fou;1)(qui;1)(fait;1)(le;1)(delicat;1)',
    '(fou;1)(qui;1)(songe;1)(a;1)(ses;1)(querelles;1)',
  ];
  const shuffled = ['celui;1 ×2', 'qui;1 ×4', 'croyait;1 ×2', 'fou;1 ×2', 'au;1 · ny;1 · ciel;1 · pas;1 · …'];
  const reduced = ['qui : 4', 'celui : 2', 'croyait : 2', 'fou : 2', '… : 1'];
  const colX = [75, 210, 390, 570, 700];
  const headers = ['Entrée', 'Split', 'MAP', 'Shuffle', 'Reduce'];
  return (
    <svg viewBox="0 0 760 360" className="w-full h-auto" role="img" aria-label="Flux MapReduce Word Count" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="360" rx="12" fill="#fafafa" />
      <text x="380" y="26" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Word Count : les 4 étapes de MapReduce (diviser pour régner)</text>
      {headers.map((h, i) => (
        <text key={h} x={colX[i]} y="52" textAnchor="middle" fontSize="12" fontWeight="900" fill="#57534e">{h}</text>
      ))}
      {frags.map((f, i) => {
        const y = 70 + i * 58;
        return (
          <g key={f}>
            <rect x="12" y={y} width="128" height="46" rx="8" fill="#a8a29e" opacity="0.25" />
            <text x="76" y={y + 20} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#44403c">{f.slice(0, 22)}</text>
            <text x="76" y={y + 33} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#44403c">{f.slice(22)}</text>
            <line x1="140" y1={y + 23} x2="200" y2={y + 23} stroke="#78716c" strokeWidth="1.8" markerEnd="url(#mrA)" />
            <rect x="202" y={y} width="176" height="46" rx="8" fill="#16a34a" opacity="0.14" />
            <text x="290" y={y + 18} textAnchor="middle" fontSize="7.8" fontWeight="700" fill="#166534">{mapped[i].slice(0, 40)}</text>
            <text x="290" y={y + 32} textAnchor="middle" fontSize="7.8" fontWeight="700" fill="#166534">{mapped[i].slice(40)}</text>
            <line x1="378" y1={y + 23} x2="555" y2="150" stroke="#0891b2" strokeWidth="1.6" opacity="0.7" markerEnd="url(#mrA)" />
          </g>
        );
      })}
      <rect x="557" y="70" width="108" height="180" rx="8" fill="#0891b2" opacity="0.14" />
      {shuffled.map((s, i) => (
        <text key={s} x="611" y={96 + i * 32} textAnchor="middle" fontSize="8" fontWeight="700" fill="#0e7490">{s}</text>
      ))}
      <line x1="665" y1="160" x2="676" y2="160" stroke="#d97706" strokeWidth="2" markerEnd="url(#mrA)" />
      <rect x="678" y="70" width="76" height="180" rx="8" fill="#d97706" opacity="0.16" />
      {reduced.map((r, i) => (
        <text key={r} x="716" y={96 + i * 32} textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#92400e">{r}</text>
      ))}
      <rect x="12" y="300" width="742" height="44" rx="8" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="383" y="318" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#44403c">Split : découper ligne par ligne → 4 fragments · MAP : POUR MOT dans LIGNE : (MOT ; 1)</text>
      <text x="383" y="334" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#44403c">Shuffle : regrouper par clé · REDUCE : TOTAL = TOTAL + 1 → une valeur unique par clef distincte</text>
      <defs>
        <marker id="mrA" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#78716c" />
        </marker>
      </defs>
    </svg>
  );
}

export function MeanLengthFlow() {
  return (
    <svg viewBox="0 0 760 300" className="w-full h-auto" role="img" aria-label="Longueur moyenne des mots" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="300" rx="12" fill="#fafafa" />
      <text x="380" y="26" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Exemple 2 : la longueur moyenne des mots — mean = length / count</text>
      {[
        { w: 'dogs', c: '#16a34a', x: 100 },
        { w: 'like', c: '#16a34a', x: 100, dy: 76 },
        { w: 'cats', c: '#16a34a', x: 100, dy: 152 },
      ].map((m) => (
        <g key={m.w}>
          <rect x="40" y={70 + (m.dy ?? 0)} width="120" height="46" rx="8" fill={m.c} opacity="0.16" />
          <text x="100" y={98 + (m.dy ?? 0)} textAnchor="middle" fontSize="13" fontWeight="900" fill="#166534">{m.w}</text>
          <line x1="160" y1={93 + (m.dy ?? 0)} x2="250" y2={110} stroke="#78716c" strokeWidth="2" markerEnd="url(#mlA)" />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <ellipse cx="300" cy={110} rx="40" ry="16" fill="#fff" stroke="#166534" strokeWidth="2" />
          <text x="300" y="115" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#166534">map</text>
        </g>
      ))}
      <text x="300" y="150" textAnchor="middle" fontSize="9.5" fill="#57534e">map : (count;1) + (length; longueur)</text>
      <line x1="340" y1="110" x2="430" y2="90" stroke="#0891b2" strokeWidth="2" markerEnd="url(#mlA)" />
      <line x1="340" y1="110" x2="430" y2="170" stroke="#0891b2" strokeWidth="2" markerEnd="url(#mlA)" />
      <rect x="432" y="70" width="140" height="40" rx="8" fill="#0891b2" opacity="0.15" />
      <text x="502" y="95" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0e7490">reduce → count, 3</text>
      <rect x="432" y="150" width="140" height="40" rx="8" fill="#0891b2" opacity="0.15" />
      <text x="502" y="175" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0e7490">reduce → length, 12</text>
      <line x1="572" y1="130" x2="620" y2="130" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#mlA)" />
      <rect x="622" y="100" width="120" height="60" rx="10" fill="#d97706" />
      <text x="682" y="126" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#fff">mean =</text>
      <text x="682" y="146" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">12 / 3 = 4</text>
      <rect x="40" y="240" width="700" height="40" rx="8" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="390" y="258" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#44403c">Entrée : un grand fichier texte · Sortie : la longueur moyenne des mots dans le fichier</text>
      <text x="390" y="273" textAnchor="middle" fontSize="10" fill="#57534e">Deux clés particulières (count, length) transportent l’information — le REDUCE les somme</text>
      <defs>
        <marker id="mlA" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#78716c" />
        </marker>
      </defs>
    </svg>
  );
}
