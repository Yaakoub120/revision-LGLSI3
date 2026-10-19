'use client'

// ─── MongoDB diagrams: ReplicaSet + Sharding architecture ───

export function ReplicaSetDiagram() {
  return (
    <div className="my-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h4 className="mb-4 text-center font-bold text-green-300">Architecture du ReplicaSet (principe M/E)</h4>
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-xl border border-zinc-700 bg-zinc-950 px-6 py-3 text-center">
          <p className="text-sm font-bold text-zinc-100">Client Application</p>
          <p className="text-xs text-zinc-400">Driver</p>
          <div className="mt-2 flex justify-center gap-4 text-[11px]">
            <span className="text-sky-300">Writes ↓</span>
            <span className="text-emerald-300">Reads ↓</span>
          </div>
        </div>
        <div className="text-2xl text-zinc-600">↓</div>
        <div className="rounded-xl px-8 py-3 text-center text-sm font-black tracking-wide" style={{ background: '#3b82f620', color: '#60a5fa', border: '1px solid #3b82f666' }}>
          PRIMARY
          <p className="text-[11px] font-normal text-zinc-400">Toutes les requêtes (lecture/écriture) · cohérence des données</p>
        </div>
        <div className="flex w-full max-w-md justify-around">
          <div className="text-center">
            <p className="rotate-[-60deg] text-[11px] text-zinc-500">Réplication ↙</p>
          </div>
          <div className="text-center">
            <p className="rotate-[60deg] text-[11px] text-zinc-500">↘ Réplication</p>
          </div>
        </div>
        <div className="flex w-full max-w-md justify-around">
          <div className="rounded-xl px-6 py-3 text-center text-sm font-bold" style={{ background: '#22c55e18', color: '#4ade80', border: '1px solid #22c55e55' }}>
            Secondary
            <p className="text-[11px] font-normal text-zinc-400">réplication lors d'une mise à jour</p>
          </div>
          <div className="rounded-xl px-6 py-3 text-center text-sm font-bold" style={{ background: '#22c55e18', color: '#4ade80', border: '1px solid #22c55e55' }}>
            Secondary
            <p className="text-[11px] font-normal text-zinc-400">réplication lors d'une mise à jour</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ShardingArchitecture() {
  return (
    <div className="my-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h4 className="mb-4 text-center font-bold text-green-300">Architecture de partitionnement (Sharding)</h4>
      <div className="flex flex-col items-center gap-3">
        <div className="flex w-full max-w-lg justify-around gap-3">
          <div className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-center text-xs">
            <p className="font-bold text-zinc-200">MovieReviewApp</p>
            <p className="mt-0.5 text-zinc-500">App Server</p>
          </div>
          <div className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-center text-xs">
            <p className="font-bold text-zinc-200">MovieRentingApp</p>
            <p className="mt-0.5 text-zinc-500">App Server</p>
          </div>
        </div>
        <div className="text-xl text-zinc-600">↓</div>
        <div className="flex w-full max-w-lg justify-around gap-3">
          <div className="flex-1 rounded-xl px-3 py-2 text-center text-xs font-bold" style={{ background: '#3b82f618', color: '#60a5fa', border: '1px solid #3b82f655' }}>
            Router (mongos)
          </div>
          <div className="flex-1 rounded-xl px-3 py-2 text-center text-xs font-bold" style={{ background: '#3b82f618', color: '#60a5fa', border: '1px solid #3b82f655' }}>
            Router (mongos)
          </div>
        </div>
        <div className="flex w-full max-w-2xl items-center justify-center gap-4">
          <div className="text-center text-xl text-zinc-600">↓</div>
          <div className="flex-1 rounded-xl px-3 py-2 text-center text-xs font-bold" style={{ background: '#f59e0b18', color: '#fbbf24', border: '1px dashed #f59e0b66' }}>
            Config Servers (ReplicaSet) — métadonnées du partitionnement · « dans quel shard est la donnée ? »
          </div>
        </div>
        <div className="text-xl text-zinc-600">↓ &nbsp;2 or more Shards</div>
        <div className="grid w-full max-w-3xl grid-cols-3 gap-3">
          {[
            { t: 'Shard 1', k: 'title: a-h', rs: 'ReplicaSet' },
            { t: 'Shard 2', k: 'title: i-p', rs: 'ReplicaSet' },
            { t: 'Shard 3', k: 'title: q-z', rs: 'ReplicaSet' },
          ].map((s) => (
            <div key={s.t} className="rounded-xl p-3 text-center text-xs" style={{ background: '#22c55e12', border: '1px solid #22c55e44' }}>
              <p className="font-bold text-emerald-300">{s.t}</p>
              <p className="mt-1 font-mono text-zinc-300">{s.k}</p>
              <p className="mt-0.5 text-[10px] text-zinc-500">{s.rs}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-2 text-xs text-zinc-400 sm:grid-cols-3">
        <div className="rounded-lg bg-zinc-950 p-2"><b className="text-sky-300">1. Routeurs : mongos</b><br />point d'entrée des requêtes</div>
        <div className="rounded-lg bg-zinc-950 p-2"><b className="text-amber-300">2. Config Server</b><br />métadonnées du partitionnement</div>
        <div className="rounded-lg bg-zinc-950 p-2"><b className="text-emerald-300">3. Shard</b><br />serveurs de données</div>
      </div>
    </div>
  )
}

export function StoragePyramid() {
  const units = [
    { u: 'Yota Octet (Yo)', v: '1 Yo = 1 024 Zo', w: 100, c: '#f97316', ex: 'En 2013, le plus grand data center traite 1 YotaO' },
    { u: 'Zéta Octet (Zo)', v: '1 Zo = 1 024 Eo', w: 88, c: '#a1a1aa', ex: 'Données produites en 2011 = 1,8 Zo' },
    { u: 'Exa Octet (Eo)', v: '1 Eo = 1 024 Po', w: 76, c: '#eab308', ex: "Infos jusqu'à 2003 = 5 Eo" },
    { u: 'Péta Octet (Po)', v: '1 Po = 1 024 To', w: 64, c: '#3b82f6', ex: '2 milliards de photos réseaux sociales = 1 Po' },
    { u: 'Téra Octet (To)', v: '1 To = 1 024 Go', w: 52, c: '#22c55e', ex: '6 millions de livres = 1 To' },
    { u: 'Méga Octet (Mo)', v: '1 Mo = 1 024 ko', w: 40, c: '#84cc16', ex: '1 morceau de musique = 5 Mo' },
    { u: 'Kilo Octet (ko)', v: '1 ko = 1 024 o', w: 28, c: '#f59e0b', ex: '1 page de texte = 30 ko' },
    { u: 'Octet', v: '8 bits', w: 16, c: '#a16207', ex: '1 caractère = 1 octet' },
  ]
  return (
    <div className="my-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h4 className="mb-4 text-center font-bold text-amber-300">Ordre de mesure de stockage des données — les préfixes multiplicatifs</h4>
      <div className="flex flex-col items-center gap-1.5">
        {units.map((x) => (
          <div
            key={x.u}
            className="flex items-center justify-between gap-3 rounded-lg px-3 py-1.5 text-xs"
            style={{ width: `${x.w}%`, background: x.c + '1c', border: `1px solid ${x.c}55` }}
          >
            <span className="font-bold" style={{ color: x.c }}>{x.u}</span>
            <span className="hidden font-mono text-zinc-300 sm:inline">{x.v}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-1.5 text-[11px] text-zinc-400 sm:grid-cols-2">
        {units.map((x) => (
          <div key={x.u}>• {x.ex}</div>
        ))}
      </div>
    </div>
  )
}

export function HistoryTimeline() {
  const items = [
    { y: '1996', t: "Sauvegarder sur support électronique coûte moins cher que l'archivage papier" },
    { y: '1997', t: "1ʳᵉ utilisation du terme « Big Data » (conférence informatique)" },
    { y: '1998', t: '1ères estimations de croissance & volumétrie des données internet' },
    { y: '2000', t: "1ers modèles de données dynamiques (conférence « économetrie »)" },
    { y: '2001', t: 'Définition des 3V du Big Data' },
    { y: '2002', t: 'The beginning of the digital age' },
    { y: '2003', t: 'GFS — Google File System (propriétaire)' },
    { y: '2004', t: "Article MapReduce — Dean & Ghemawat" },
    { y: '2005', t: 'Définition du WEB 2.0' },
    { y: '2008', t: "1ères analyses de l'impact du Big Data (commerce, science, médecine…)" },
  ]
  return (
    <div className="my-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h4 className="mb-4 text-center font-bold text-amber-300">Historique du Big Data</h4>
      <div className="relative ml-3 border-l-2 border-zinc-800 pl-6">
        {items.map((x) => (
          <div key={x.y} className="relative mb-4 last:mb-0">
            <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-amber-500 bg-zinc-950" />
            <p className="text-sm font-bold text-amber-400">{x.y}</p>
            <p className="text-sm text-zinc-300">{x.t}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
