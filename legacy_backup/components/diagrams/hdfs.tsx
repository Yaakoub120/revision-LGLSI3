'use client'

// ─── HDFS diagrams: architecture, write flow, read flow + WordCount demo ───
import { useState } from 'react'

function ServerNode({ label, accent, sub }: { label: string; accent: string; sub?: string }) {
  return (
    <div className="rounded-xl border p-3 text-center" style={{ borderColor: accent + '66', background: accent + '12' }}>
      <p className="text-sm font-bold" style={{ color: accent }}>{label}</p>
      {sub && <p className="mt-0.5 text-[11px] text-zinc-400">{sub}</p>}
    </div>
  )
}

export function HdfsArchitecture() {
  return (
    <div className="my-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h4 className="mb-4 text-center font-bold text-teal-300">Architecture HDFS — blocs de 128 Mo</h4>
      <div className="flex flex-col items-center gap-4">
        <ServerNode label="NameNode" accent="#f87171" sub="Métadonnées des blocs (localisation, taille, date de création) — ×2 (Hadoop 2) / ×3 (Hadoop 3)" />
        <div className="text-2xl text-zinc-600">↓</div>
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
          {['DataNode 1', 'DataNode 2', 'DataNode 3', 'DataNode N'].map((d) => (
            <ServerNode key={d} label={d} accent="#818cf8" sub="1 par machine · stocke des blocs (réplication ×3)" />
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-2 text-center text-xs text-zinc-400 sm:grid-cols-3">
        <div className="rounded-lg bg-zinc-950 p-2">🧱 Block = <b className="text-zinc-200">128 Mo</b> par défaut</div>
        <div className="rounded-lg bg-zinc-950 p-2">📑 Distribué : données réparties sur le cluster</div>
        <div className="rounded-lg bg-zinc-950 p-2">♻️ Répliqué : défaut <b className="text-zinc-200">3</b></div>
      </div>
    </div>
  )
}

export function HdfsWrite() {
  return (
    <div className="my-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h4 className="mb-4 text-center font-bold text-teal-300">Écriture HDFS — « data.txt » (3 blocs)</h4>
      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <span className="mt-1 rounded-lg bg-emerald-900/40 px-2 py-1 text-xs font-bold text-emerald-300">1. Client</span>
          <div className="flex-1 rounded-xl border border-emerald-800/50 bg-zinc-950 p-3 text-zinc-300">« Je veux écrire le fichier <b className="text-emerald-300">data.txt</b> sur HDFS (3 blocs) » — le fichier est découpé en 🟡 Bloc 1, Bloc 2, Bloc 3</div>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 rounded-lg bg-rose-900/40 px-2 py-1 text-xs font-bold text-rose-300">2. NameNode</span>
          <div className="flex-1 rounded-xl border border-rose-800/50 bg-zinc-950 p-3 text-zinc-300">« OK. Envoie aux <b className="text-rose-300">DataNodes 1, 3 et 5</b>. »</div>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 rounded-lg bg-indigo-900/40 px-2 py-1 text-xs font-bold text-indigo-300">3. Envoi</span>
          <div className="flex-1 rounded-xl border border-indigo-800/50 bg-zinc-950 p-3 text-zinc-300">Bloc 1 → DataNode 1 · Bloc 2 → DataNode 3 · Bloc 3 → DataNode 5</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {['DataNode 1\n🟡 Bloc 1', 'DataNode 2\n—', 'DataNode 3\n🟡 Bloc 2', 'DataNode 4\n—', 'DataNode 5\n🟡 Bloc 3'].map((d) => (
          <div key={d} className="whitespace-pre-line rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-center text-xs text-zinc-300">{d}</div>
        ))}
      </div>
    </div>
  )
}

export function HdfsRead() {
  return (
    <div className="my-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h4 className="mb-4 text-center font-bold text-teal-300">Lecture HDFS — « data.txt »</h4>
      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <span className="mt-1 rounded-lg bg-emerald-900/40 px-2 py-1 text-xs font-bold text-emerald-300">1. Client</span>
          <div className="flex-1 rounded-xl border border-emerald-800/50 bg-zinc-950 p-3 text-zinc-300">« Je veux lire le fichier <b className="text-emerald-300">data.txt</b> sur HDFS »</div>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 rounded-lg bg-rose-900/40 px-2 py-1 text-xs font-bold text-rose-300">2. NameNode</span>
          <div className="flex-1 rounded-xl border border-rose-800/50 bg-zinc-950 p-3 text-zinc-300">« OK. 3 blocs. <b className="text-rose-300">Bloc 1 : DN 1, 2, 5 · Bloc 2 : DN 2, 3 · Bloc 3 : DN 1, 3, 5</b> »</div>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 rounded-lg bg-indigo-900/40 px-2 py-1 text-xs font-bold text-indigo-300">3. Lecture</span>
          <div className="flex-1 rounded-xl border border-indigo-800/50 bg-zinc-950 p-3 text-zinc-300">Le client lit les blocs directement sur les DataNodes puis reconstitue data.txt</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {['DataNode 1\n🟡 Bloc 1 · Bloc 3', 'DataNode 2\n🟡 Bloc 1 · Bloc 2', 'DataNode 3\n🟡 Bloc 2 · Bloc 3', 'DataNode 5\n🟡 Bloc 1'].map((d) => (
          <div key={d} className="whitespace-pre-line rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-center text-xs text-zinc-300">{d}</div>
        ))}
      </div>
    </div>
  )
}

const WC_INPUT = ['celui qui croyait au ciel', 'celui qui ny croyait pas', 'fou qui fait le delicat', 'fou qui songe a ses querelles']

export function WordCountDemo() {
  const [step, setStep] = useState(0)
  const steps = ['Entrée + Split', 'MAP', 'SHUFFLE', 'REDUCE']
  const mapped = WC_INPUT.map((l) => l.split(' ').map((w) => `(${w};1)`).join(' '))
  const shuffle: Record<string, number> = {}
  WC_INPUT.forEach((l) => l.split(' ').forEach((w) => { shuffle[w] = (shuffle[w] || 0) + 1 }))
  const shuffled = Object.entries(shuffle).map(([k, n]) => `(${k};1)`.repeat(n).split(')').filter(Boolean))
  const shuffledGroups: string[] = []
  Object.entries(shuffle).forEach(([k, n]) => shuffledGroups.push(Array(n).fill(`(${k};1)`).join(' ')))
  const result = Object.entries(shuffle).sort((a, b) => b[1] - a[1])

  return (
    <div className="my-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h4 className="mb-1 text-center font-bold text-amber-300">Démo interactive — Word Count (MapReduce)</h4>
      <p className="mb-4 text-center text-xs text-zinc-500">Cliquez sur les étapes pour voir le flux complet (exemple du cours)</p>
      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${step === i ? 'bg-amber-500 text-zinc-950' : 'border border-zinc-700 text-zinc-400 hover:text-zinc-200'}`}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>
      {step === 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Données d'entrée → Splitting ligne par ligne → 4 fragments :</p>
          {WC_INPUT.map((l, i) => (
            <div key={i} className="rounded-lg border border-amber-800/40 bg-amber-500/5 px-3 py-2 font-mono text-xs text-zinc-300">
              Fragment {i + 1} : {l}
            </div>
          ))}
        </div>
      )}
      {step === 1 && (
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">MAP — POUR MOT dans LIGNE, FAIRE : GENERER COUPLE (MOT ; 1)</p>
          {WC_INPUT.map((l, i) => (
            <div key={i} className="flex flex-col gap-1 rounded-lg border border-sky-800/40 bg-sky-500/5 px-3 py-2 font-mono text-xs sm:flex-row sm:items-center sm:gap-3">
              <span className="text-zinc-500">{l}</span>
              <span className="text-zinc-600">→</span>
              <span className="text-sky-300">{mapped[i]}</span>
            </div>
          ))}
        </div>
      )}
      {step === 2 && (
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">SHUFFLE — mélange/tri : regroupement par clef</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {shuffledGroups.map((g, i) => (
              <div key={i} className="rounded-lg border border-purple-800/40 bg-purple-500/5 px-3 py-2 font-mono text-xs text-purple-300">{g}</div>
            ))}
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">REDUCE — TOTAL=0 ; POUR COUPLE dans GROUPE : TOTAL=TOTAL+1 → valeur unique par clef :</p>
          <div className="mx-auto max-w-xs rounded-xl border border-emerald-800/40 bg-emerald-500/5 p-4 font-mono text-sm text-emerald-300">
            {result.map(([k, n]) => (
              <div key={k} className="flex justify-between"><span>{k}:</span><span>{n}</span></div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
