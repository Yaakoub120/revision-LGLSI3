'use client';

// Diagrammes SVG — Big Data : introduction, unités, timeline, les n-V

export function BigdataEvolution() {
  const bars = [
    { v: 90, label: 'des données créées sur les 7 dernières années', c: '#059669' },
    { v: 80, label: 'des données actuelles non structurées', c: '#d97706' },
    { v: 20, label: 'traitables par des systèmes traditionnels', c: '#dc2626' },
  ];
  return (
    <svg viewBox="0 0 760 300" className="w-full h-auto" role="img" aria-label="Évolution des données 90-80-20" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="300" rx="12" fill="#fafafa" />
      <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">L’évolution des données : explosion contre exploitation</text>
      {bars.map((b, i) => {
        const x = 80 + i * 220;
        const h = (b.v / 100) * 150;
        return (
          <g key={i}>
            <rect x={x} y={230 - h} width="140" height={h} rx="8" fill={b.c} opacity="0.9" />
            <text x={x + 70} y={220 - h} textAnchor="middle" fontSize="30" fontWeight="900" fill={b.c}>{b.v} %</text>
            <text x={x + 70} y="252" textAnchor="middle" fontSize="11" fontWeight="600" fill="#57534e">{b.label}</text>
          </g>
        );
      })}
      <rect x="80" y="266" width="600" height="24" rx="6" fill="#fef3c7" stroke="#d97706" />
      <text x="380" y="282" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#92400e">Les données ont explosé ! (l’iceberg Big Data)</text>
    </svg>
  );
}

export function StorageUnits() {
  const units = [
    { n: 'Bit', d: '0 ou 1', w: 90, c: '#a8a29e' },
    { n: 'Octet', d: '= 1 caractère', w: 140, c: '#78716c' },
    { n: 'Kilo Octet (ko)', d: '1 ko = 1024 o · 1 page de texte ≈ 30 ko', w: 200, c: '#f59e0b' },
    { n: 'Mega Octet (Mo)', d: '1 Mo = 1024 ko · 1 morceau de musique ≈ 5 Mo', w: 260, c: '#f97316' },
    { n: 'Giga Octet (Go)', d: '1 Go = 1024 Mo · 1 film de 2 h ≈ 1 Go', w: 320, c: '#16a34a' },
    { n: 'Tera Octet (To)', d: '1 To = 1024 Go · 6 millions de livres ≈ 1 To', w: 380, c: '#0891b2' },
    { n: 'Peta Octet (Po)', d: '1 Po = 1024 To · 2 milliards de photos ≈ 1 Po', w: 440, c: '#2563eb' },
    { n: 'Exa Octet (Eo)', d: '1 Eo = 1024 Po · infos produites jusqu’en 2003 ≈ 5 Eo', w: 500, c: '#7c3aed' },
    { n: 'Zeta Octet (Zo)', d: '1 Zo = 1024 Eo · données produites en 2011 ≈ 1,8 Zo', w: 560, c: '#c026d3' },
    { n: 'Yota Octet (Yo)', d: '1 Yo = 1024 Eo · le plus grand data center 2013 : 1 Yo', w: 620, c: '#dc2626' },
  ];
  return (
    <svg viewBox="0 0 760 520" className="w-full h-auto" role="img" aria-label="Ordre de mesure de stockage" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="520" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Ordre de mesure de stockage des données — chaque niveau = × 1024</text>
      {units.map((u, i) => {
        const w = u.w;
        const x = (760 - w) / 2;
        const y = 48 + i * 46;
        return (
          <g key={u.n}>
            <rect x={x} y={y} width={w} height="38" rx="7" fill={u.c} />
            <text x="380" y={y + 16} textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#fff">{u.n}</text>
            <text x="380" y={y + 31} textAnchor="middle" fontSize="9.5" fill="#ffffffdd">{u.d}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function WebEvolution() {
  const stages = [
    { t: 'Web 1.0', st: 'Web passif', d: 'producteur → internautes', c: '#0891b2', y: 70 },
    { t: 'Web 2.0', st: 'Web collaboratif (2005)', d: 'internautes contributeurs, réseaux sociaux, RSS', c: '#16a34a', y: 160 },
    { t: 'Web 3.0', st: 'Web sémantique (?)', d: 'agents intelligents, widgets', c: '#7c3aed', y: 250 },
    { t: 'Mobile + IoT + Cloud', st: 'Monde interconnecté et instrumenté', d: 'smartphones, objets connectés, RFID, GPS, smart meters', c: '#dc2626', y: 340 },
  ];
  return (
    <svg viewBox="0 0 760 420" className="w-full h-auto" role="img" aria-label="Évolution du web" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="420" rx="12" fill="#fafafa" />
      <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">« Un peu d’histoire » : de Web 1.0 au Cloud — chaque étape multiplie les sources de données</text>
      <line x1="120" y1="60" x2="120" y2="390" stroke="#a8a29e" strokeWidth="3" />
      {stages.map((s, i) => (
        <g key={s.t}>
          <circle cx="120" cy={s.y + 18} r="9" fill={s.c} />
          {i < stages.length - 1 && <line x1="120" y1={s.y + 27} x2="120" y2={stages[i + 1].y + 9} stroke="#a8a29e" strokeWidth="2" />}
          <rect x="150" y={s.y} width="560" height="62" rx="9" fill={s.c} opacity="0.12" />
          <rect x="150" y={s.y} width="6" height="62" rx="3" fill={s.c} />
          <text x="172" y={s.y + 25} fontSize="14" fontWeight="800" fill={s.c}>{s.t} — {s.st}</text>
          <text x="172" y={s.y + 45} fontSize="11.5" fill="#57534e">{s.d}</text>
        </g>
      ))}
      <rect x="150" y="386" width="560" height="24" rx="6" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="430" y="402" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#44403c">Avant : « les données étaient statiques, fiables et peu nombreuses » · le bon vieux temps…</text>
    </svg>
  );
}

export function BigdataTimeline() {
  const events = [
    { y: '1996', d: 'Sauvegarder sur support électronique coûte moins cher que l’archivage papier', c: '#78716c' },
    { y: '1997', d: '1ʳᵉ utilisation du terme « Big Data » lors d’une conférence informatique', c: '#0891b2' },
    { y: '1998', d: '1ères estimations de croissance & volumétrie des données internet', c: '#16a34a' },
    { y: '2000', d: 'Présentation des 1ers modèles de données dynamiques (conférence « économetrie »)', c: '#65a30d' },
    { y: '2001', d: 'Définition des 3V du Big Data (Gartner)', c: '#d97706' },
    { y: '2005', d: 'Définition du WEB 2.0', c: '#f97316' },
    { y: '2008', d: '1ères analyses sur l’impact du Big Data (commerces, sciences, médecine…)', c: '#dc2626' },
  ];
  return (
    <svg viewBox="0 0 760 340" className="w-full h-auto" role="img" aria-label="Frise historique du Big Data" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="340" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Les origines du Big Data : frise 1996 → 2008</text>
      {events.map((e, i) => {
        const y = 58 + i * 38;
        return (
          <g key={e.y}>
            <rect x="50" y={y} width="66" height="28" rx="7" fill={e.c} />
            <text x="83" y={y + 18.5} textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">{e.y}</text>
            <line x1="116" y1={y + 14} x2="150" y2={y + 14} stroke={e.c} strokeWidth="2.5" />
            <text x="160" y={y + 18} fontSize="12" fontWeight="600" fill="#44403c">{e.d}</text>
          </g>
        );
      })}
      <rect x="50" y="306" width="660" height="24" rx="6" fill="#f5f5f4" stroke="#a8a29e" strokeDasharray="4 3" />
      <text x="380" y="322" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#44403c">Volumes associés sur la frise du cours : 1 Go → 1 To → 1 Po → 1 Eo → 1 Zo</text>
    </svg>
  );
}

export function FiveV() {
  const vs = [
    { t: 'Volume', d: 'Téraoctets · Enreg./Archives · Transactions · Tables, fichiers', c: '#a21caf', x: 380, y: 88 },
    { t: 'Variété', d: 'Structurées · Non structurées · Probabilistes', c: '#0891b2', x: 130, y: 210 },
    { t: 'Vélocité', d: 'Batch · Temps réel · Processus · Flot de données', c: '#16a34a', x: 630, y: 210 },
    { t: 'Véracité', d: 'Confiance · Authenticité · Origine, réputation · Disponibilité · Responsabilité', c: '#ea580c', x: 230, y: 330 },
    { t: 'Valeur', d: 'Statistiques · Évènements · Corrélations · Hypothétiques — LE V le plus important !', c: '#d97706', x: 530, y: 330 },
  ];
  return (
    <svg viewBox="0 0 760 420" className="w-full h-auto" role="img" aria-label="Les 5 V du Big Data" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="420" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">Les 5 V de Big Data</text>
      {vs.map((v) => {
        const w = 230;
        return (
          <g key={v.t}>
            <line x1="380" y1="205" x2={v.x} y2={v.y + 10} stroke="#d6d3d1" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x={v.x - w / 2} y={v.y} width={w} height="64" rx="10" fill={v.c} opacity="0.14" />
            <rect x={v.x - w / 2} y={v.y} width={w} height="26" rx="10" fill={v.c} />
            <text x={v.x} y={v.y + 18} textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#fff">{v.t}</text>
            <text x={v.x} y={v.y + 42} textAnchor="middle" fontSize="9.5" fill="#44403c">{v.d}</text>
          </g>
        );
      })}
      <circle cx="380" cy="210" r="52" fill="#fbbf24" opacity="0.9" />
      <text x="380" y="205" textAnchor="middle" fontSize="15" fontWeight="900" fill="#78350f">Big</text>
      <text x="380" y="224" textAnchor="middle" fontSize="15" fontWeight="900" fill="#78350f">Data</text>
      <rect x="120" y="392" width="520" height="22" rx="6" fill="#fef3c7" stroke="#d97706" />
      <text x="380" y="407" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#92400e">3 problématiques majeures : Volume → stockage · Vélocité → traitement · Variété → collecte</text>
    </svg>
  );
}

export function NvHistory() {
  const rows = [
    { y: '2001', src: 'Gartner', vs: ['Volume', 'Variété', 'Vélocité'], extra: '3V', c: '#0891b2' },
    { y: '2012', src: 'IBM', vs: ['Volume', 'Variété', 'Vélocité', 'Véracité'], extra: '4V', c: '#ea580c' },
    { y: '2015', src: '—', vs: ['Volume', 'Variété', 'Vélocité', 'Véracité', 'Valeur'], extra: '5V', c: '#d97706' },
    { y: '2016', src: '—', vs: ['+ Variabilité', '+ Visualisation'], extra: '7V ?', c: '#7c3aed' },
    { y: '2017', src: '—', vs: ['+ Validity, Viability, Volatility, Venue, Vocabulary, Virality, Viscosity, Vagueness…'], extra: '10V ?', c: '#dc2626' },
  ];
  return (
    <svg viewBox="0 0 760 330" className="w-full h-auto" role="img" aria-label="Évolution des n-V" style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
      <rect x="0" y="0" width="760" height="330" rx="12" fill="#fafafa" />
      <text x="380" y="28" textAnchor="middle" fontSize="15" fontWeight="800" fill="#18181b">L’inflation des V : de 3 à 10</text>
      {rows.map((r, i) => {
        const y = 52 + i * 52;
        return (
          <g key={r.y}>
            <rect x="40" y={y} width="70" height="40" rx="8" fill={r.c} />
            <text x="75" y={y + 18} textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">{r.y}</text>
            <text x="75" y={y + 32} textAnchor="middle" fontSize="9" fill="#ffffffcc">{r.src}</text>
            {r.vs.map((v, j) => (
              <g key={v}>
                <rect x={120 + j * 105} y={y + 5} width={v.startsWith('+') ? 200 : 96} height="30" rx="7" fill={r.c} opacity="0.15" />
                <text x={122 + j * 105 + (v.startsWith('+') ? 100 : 48)} y={y + 24} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={r.c}>{v}</text>
              </g>
            ))}
            <text x="712" y={y + 25} fontSize="15" fontWeight="900" fill={r.c}>{r.extra}</text>
          </g>
        );
      })}
    </svg>
  );
}
