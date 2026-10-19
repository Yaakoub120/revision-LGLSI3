'use client'

// ─── Concept diagrams: 5V, notions, triangle, divide&reign, MapReduce ───
import { useState } from 'react'

const VS = [
  { v: 'Volume', color: '#d946ef', icon: '📦', desc: 'Téraoctets • Enreg./Archives • Transactions • Tables, fichiers', issue: '→ Stockage', year: 'Gartner 2001' },
  { v: 'Variété', color: '#38bdf8', icon: '🎨', desc: 'Structurées • Non structurées • Probabilistes', issue: '→ Collecte', year: 'Gartner 2001' },
  { v: 'Vélocité', color: '#22c55e', icon: '⚡', desc: 'Batch • Temps réel • Processus • Flot de données — « au cœur du Time to Market »', issue: '→ Traitement', year: 'Gartner 2001' },
  { v: 'Véracité', color: '#f97316', icon: '🎯', desc: 'Confiance • Authenticité • Origine, réputation • Disponibilité • Responsabilité', issue: 'Fiabilité', year: 'IBM 2012' },
  { v: 'Valeur', color: '#eab308', icon: '💎', desc: 'Statistiques • Évènements • Corrélations • Hypothétiques', issue: '⭐ LE V le plus important', year: '2015' },
]

export function FiveVDiagram() {
  const [sel, setSel] = useState(0)
  const v = VS[sel]
  return (
    <div className="my-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {VS.map((x, i) => (
          <button
            key={x.v}
            onClick={() => setSel(i)}
            className="rounded-full border px-3 py-1.5 text-sm font-semibold transition-all"
            style={{
              borderColor: sel === i ? x.color : '#3f3f46',
              background: sel === i ? x.color + '22' : 'transparent',
              color: sel === i ? x.color : '#a1a1aa',
            }}
          >
            {x.icon} {x.v}
          </button>
        ))}
      </div>
      <div className="rounded-xl p-5" style={{ background: v.color + '14', border: `1px solid ${v.color}44` }}>
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-xl font-bold" style={{ color: v.color }}>{v.icon} {v.v}</h4>
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">{v.year}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-200">{v.desc}</p>
        <p className="mt-2 text-sm font-semibold" style={{ color: v.color }}>{v.issue}</p>
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        Évolution : Gartner (2001) 3V → IBM (2012) 4V → 2015 : 5V → 2016 : 7V ? (+ Variabilité, + Visualisation) → 2017 : 10V ? (+ Viability, + Virality, + Viscosity, + Volatility, + Validity, + Vagueness, + Vocabulary, + Venue)
      </p>
    </div>
  )
}

export function FiveNotions() {
  const notions = [
    { n: '1', t: 'Explosion de la quantité', d: '5 000 Go/personne en 2020 ; 130 Eo (2005) → 40 026 Eo (2020) ; double chaque année', c: '#f59e0b' },
    { n: '2', t: 'Partage de données', d: 'Données partagées sur plusieurs serveurs, réplication, restitution', c: '#22c55e' },
    { n: '3', t: 'Recherche des données', d: 'Réponse optimisée en terme de recherche ET de résultat', c: '#38bdf8' },
    { n: '4', t: 'Stockage massif', d: 'Fiable, moins cher, le plus pertinemment possible — pour restituer et traiter plus tard', c: '#a855f7' },
    { n: '5', t: 'Traitement des flux', d: 'Données énormes dans un temps précis, à coût de traitement moins cher', c: '#ef4444' },
  ]
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {notions.map((x) => (
        <div key={x.n} className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4" style={{ borderTop: `3px solid ${x.c}` }}>
          <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold" style={{ background: x.c + '22', color: x.c }}>{x.n}</div>
          <h4 className="text-sm font-bold text-zinc-100">{x.t}</h4>
          <p className="mt-1 text-xs leading-relaxed text-zinc-400">{x.d}</p>
        </div>
      ))}
    </div>
  )
}

export function ThreeVTriangle() {
  return (
    <div className="my-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <div className="rounded-full px-5 py-2 text-sm font-bold" style={{ background: '#22c55e22', color: '#4ade80', border: '1px solid #22c55e66' }}>Volume → Stockage</div>
        <div className="rounded-2xl px-6 py-3 text-lg font-black tracking-wide" style={{ background: '#f59e0b18', color: '#fbbf24', border: '1px solid #f59e0b55' }}>Big Data</div>
        <div className="flex gap-4">
          <div className="rounded-full px-5 py-2 text-sm font-bold" style={{ background: '#38bdf822', color: '#7dd3fc', border: '1px solid #38bdf866' }}>Vélocité → Traitement</div>
          <div className="rounded-full px-5 py-2 text-sm font-bold" style={{ background: '#d946ef22', color: '#f0abfc', border: '1px solid #d946ef66' }}>Variété → Collecte</div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-zinc-500">Les 3 problématiques majeures pour les données massives</p>
    </div>
  )
}

export function DivideReign() {
  return (
    <div className="my-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h4 className="mb-4 text-center font-bold text-amber-400">« Diviser pour Régner »</h4>
      <div className="grid items-center gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-center">
          <div className="text-2xl">📚</div>
          <p className="mt-1 text-sm font-semibold text-zinc-200">Données massives</p>
        </div>
        <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-zinc-400">3 actions</p>
          <ul className="mt-2 space-y-1 text-center text-xs text-zinc-300">
            <li>➊ Répartir les données</li>
            <li>➋ Répartir &amp; dupliquer les traitements</li>
            <li>➌ Dupliquer les données</li>
          </ul>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl p-3 text-center text-xs font-bold" style={{ background: '#22c55e18', color: '#4ade80', border: '1px solid #22c55e55' }}>Tolérance aux pannes<br /><span className="font-normal text-zinc-400">Parallélisme de données</span></div>
          <div className="rounded-xl p-3 text-center text-xs font-bold" style={{ background: '#38bdf818', color: '#7dd3fc', border: '1px solid #38bdf855' }}>Répartition de charge<br /><span className="font-normal text-zinc-400">Parallélisme de traitement</span></div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-center text-xs text-zinc-400">
        <span className="font-semibold text-zinc-200">📚 Pile de livres</span> →
        <span>🔍 <b className="text-sky-300">Mappers</b> (chacun une partie)</span> →
        <span>⚙️ <b className="text-amber-300">Mélanger &amp; Ordonner</b></span> →
        <span>🧮 <b className="text-emerald-300">Reducers</b></span> →
        <span>📊 <b className="text-zinc-100">Résultat</b></span>
      </div>
    </div>
  )
}

export function MapReducePipeline() {
  const steps = [
    { t: 'Split', d: 'Découpage des données d\'entrée (ex. ligne par ligne)', c: '#f59e0b', icon: '✂️' },
    { t: 'Mapper', d: 'Génère les couples (clef ; valeur)', c: '#38bdf8', icon: '🗺️' },
    { t: 'Shuffle', d: 'Mélange & tri — regroupe par clef identique', c: '#a855f7', icon: '🔀' },
    { t: 'Reduce', d: 'Agrège chaque groupe en une valeur unique', c: '#22c55e', icon: '🧮' },
  ]
  return (
    <div className="my-6 flex flex-wrap items-stretch justify-center gap-2">
      {steps.map((s, i) => (
        <div key={s.t} className="flex items-center gap-2">
          <div className="w-40 rounded-xl border border-zinc-800 bg-zinc-900/70 p-3 text-center" style={{ borderTop: `3px solid ${s.c}` }}>
            <div className="text-xl">{s.icon}</div>
            <div className="mt-1 text-sm font-bold" style={{ color: s.c }}>{i + 1}. {s.t}</div>
            <div className="mt-1 text-[11px] leading-snug text-zinc-400">{s.d}</div>
          </div>
          {i < 3 && <span className="text-zinc-600">→</span>}
        </div>
      ))}
    </div>
  )
}

export function MeanLength() {
  return (
    <div className="my-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h4 className="mb-3 text-center font-bold text-sky-300">Flux des données — longueur moyenne des mots</h4>
      <div className="flex flex-wrap items-center justify-center gap-3 text-center text-xs">
        <div className="rounded-lg border border-emerald-700/50 bg-emerald-900/20 p-3">
          <p className="font-bold text-emerald-300">Input</p>
          <p className="mt-1 font-mono text-zinc-300">dogs · like · cats</p>
        </div>
        <span className="text-zinc-600">→</span>
        <div className="rounded-lg border border-sky-700/50 bg-sky-900/20 p-3">
          <p className="font-bold text-sky-300">Map</p>
          <p className="mt-1 font-mono text-zinc-300">(len;1) par mot</p>
        </div>
        <span className="text-zinc-600">→</span>
        <div className="rounded-lg border border-purple-700/50 bg-purple-900/20 p-3">
          <p className="font-bold text-purple-300">Shuffle &amp; Sort</p>
        </div>
        <span className="text-zinc-600">→</span>
        <div className="rounded-lg border border-amber-700/50 bg-amber-900/20 p-3">
          <p className="font-bold text-amber-300">Reduce</p>
          <p className="mt-1 font-mono text-zinc-300">count, 3 · length, 12</p>
        </div>
        <span className="text-zinc-600">→</span>
        <div className="rounded-lg border border-zinc-600 bg-zinc-800/60 p-3">
          <p className="font-bold text-zinc-100">Finish</p>
          <p className="mt-1 font-mono text-amber-300">mean = length/count = 12/3 = 4</p>
        </div>
      </div>
    </div>
  )
}

export function VowelsDemo() {
  return (
    <div className="my-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h4 className="mb-3 text-center font-bold text-rose-300">Le flux des données — voyelles et consonnes</h4>
      <div className="overflow-x-auto">
        <table className="mx-auto text-center text-xs">
          <tbody>
            <tr className="text-zinc-400">
              <td className="px-4 py-2 font-bold">Input</td>
              <td className="px-4 py-2 font-bold">Map</td>
              <td className="px-4 py-2 font-bold">Shuffle &amp; Sort</td>
              <td className="px-4 py-2 font-bold">Reduce</td>
              <td className="px-4 py-2 font-bold">Output</td>
            </tr>
            <tr>
              <td className="px-4 py-1.5 font-mono text-zinc-300">dogs</td>
              <td className="px-4 py-1.5 font-mono text-zinc-300">(C,3) (V,1)</td>
              <td rowSpan={3} className="px-4 py-1.5 text-zinc-500">regroupement par clef</td>
              <td rowSpan={3} className="px-4 py-1.5 font-mono text-amber-300">somme par clef</td>
              <td rowSpan={3} className="px-4 py-1.5 text-lg font-mono font-bold text-emerald-300">C: 8 · V: 4</td>
            </tr>
            <tr>
              <td className="px-4 py-1.5 font-mono text-zinc-300">like</td>
              <td className="px-4 py-1.5 font-mono text-zinc-300">(C,2) (V,2)</td>
            </tr>
            <tr>
              <td className="px-4 py-1.5 font-mono text-zinc-300">cats</td>
              <td className="px-4 py-1.5 font-mono text-zinc-300">(C,3) (V,1)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
