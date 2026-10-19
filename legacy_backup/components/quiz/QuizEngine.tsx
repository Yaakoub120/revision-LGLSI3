'use client'

// ─── Mastery-loop quiz engine (subject-agnostic) ───
// Loop rule: a question answered wrong comes back until you answer it right.
// A module is "mastered" when every question has been answered correctly
// at least once in the current cycle. Progress persists in localStorage.
import { useCallback, useEffect, useMemo, useState } from 'react'
import { questions as bigdataQuestions } from '@/data/quiz'
import { modules as bigdataModules } from '@/data/modules'
import type { Question, Module } from '@/data/types'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'

type AnswerState = { correct: number; wrong: number; mastered: boolean }

const DEFAULT_KEY = 'bigdata-quiz-state-v1'

function loadState(storageKey: string): Record<string, AnswerState> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(storageKey)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

type ModuleFilter = 'all' | string

export function QuizEngine({
  questions = bigdataQuestions,
  modules = bigdataModules,
  storageKey = DEFAULT_KEY,
}: {
  questions?: Question[]
  modules?: Module[]
  storageKey?: string
}) {
  const [state, setState] = useState<Record<string, AnswerState>>({})
  const [filter, setFilter] = useState<ModuleFilter>('all')
  const [queue, setQueue] = useState<Question[]>([])
  const [current, setCurrent] = useState<Question | null>(null)
  const [picked, setPicked] = useState<number | null>(null)
  const [sessionTried, setSessionTried] = useState(0)
  const [sessionCorrect, setSessionCorrect] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // one-time hydration of persisted quiz progress from localStorage (external system)
    const stored = loadState(storageKey)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(stored)
    setLoaded(true)
  }, [storageKey])

  useEffect(() => {
    if (loaded) localStorage.setItem(storageKey, JSON.stringify(state))
  }, [state, loaded, storageKey])

  const pool = useMemo(
    () => (filter === 'all' ? questions : questions.filter((q) => q.module === filter)),
    [filter, questions]
  )

  const buildQueue = useCallback(
    (moduleId: ModuleFilter) => {
      const p = moduleId === 'all' ? questions : questions.filter((q) => q.module === moduleId)
      const wrongFirst = shuffle(p.filter((q) => state[q.id]?.mastered !== true))
      const mastered = shuffle(p.filter((q) => state[q.id]?.mastered === true))
      return [...wrongFirst, ...mastered]
    },
    [state, questions]
  )

  const start = (moduleId: ModuleFilter) => {
    const full = buildQueue(moduleId)
    const [first, ...rest] = full
    setFilter(moduleId)
    setPicked(null)
    setQueue(rest)
    setCurrent(first ?? null)
  }

  // Move to the next question in the queue (user-driven, from the "next" button)
  const next = () => {
    setPicked(null)
    setQueue((q) => {
      const [head, ...rest] = q
      setCurrent(head ?? null)
      return rest
    })
  }

  const answer = (idx: number) => {
    if (!current || picked !== null) return
    setPicked(idx)
    setSessionTried((t) => t + 1)
    const ok = idx === current.answer
    if (ok) setSessionCorrect((c) => c + 1)
    setState((s) => {
      const prev = s[current.id] ?? { correct: 0, wrong: 0, mastered: false }
      const nextSt: AnswerState = ok
        ? { correct: prev.correct + 1, wrong: prev.wrong, mastered: true }
        : { correct: prev.correct, wrong: prev.wrong + 1, mastered: false }
      return { ...s, [current.id]: nextSt }
    })
    // Mastery loop: wrong answers re-enter the END of the queue
    if (!ok) setQueue((q) => [...q, current])
  }

  const resetProgress = () => {
    setState({})
    setQueue([])
    setCurrent(null)
    setPicked(null)
    setSessionTried(0)
    setSessionCorrect(0)
    try {
      localStorage.removeItem(storageKey)
    } catch {}
  }

  // Stats per module
  const moduleStats = modules.map((m) => {
    const qs = questions.filter((q) => q.module === m.id)
    const masteredCount = qs.filter((q) => state[q.id]?.mastered).length
    return { m, total: qs.length, mastered: masteredCount }
  })
  const totalQ = questions.length
  const totalMastered = questions.filter((q) => state[q.id]?.mastered).length

  const queuePending = queue.length + (current ? 1 : 0)

  if (!loaded) return <div className="py-20 text-center text-zinc-500">Chargement…</div>

  // ── Start screen / module picker ──
  if (!current) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h3 className="text-lg font-bold text-zinc-100">🎯 Quiz — boucle de maîtrise</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Règle du jeu : réponds à toutes les questions. <b className="text-amber-400">Une question ratée revient</b> dans la file
            jusqu'à ce que tu la réussisses. Un module est <b className="text-emerald-400">MAÎTRISÉ</b> quand toutes ses questions
            ont été réussies — objectif : <b className="text-zinc-100">zéro erreur</b>. Ta progression est sauvegardée
            automatiquement dans le navigateur.
          </p>
          <div className="mt-4 rounded-xl bg-zinc-950 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Progression globale</span>
              <span className="font-black text-amber-400">{totalMastered} / {totalQ}</span>
            </div>
            <Progress value={(totalMastered / totalQ) * 100} className="mt-2 h-2.5" />
          </div>
          {sessionTried > 0 && (
            <p className="mt-3 text-center text-sm text-zinc-400">
              Session : <b className="text-emerald-400">{sessionCorrect}</b> bonnes / <b className="text-zinc-200">{sessionTried}</b> réponses
              ({Math.round((sessionCorrect / sessionTried) * 100)} %)
            </p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {moduleStats.map(({ m, total, mastered }) => {
            const done = mastered === total
            return (
              <button
                key={m.id}
                onClick={() => start(m.id)}
                className="group rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 text-left transition hover:border-amber-600/60 hover:bg-zinc-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-2xl">{m.icon}</p>
                    <h4 className="mt-1 font-bold text-zinc-100">Module {m.num} — {m.title}</h4>
                    <p className="mt-0.5 text-xs text-zinc-500">{total} questions</p>
                  </div>
                  {done && <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-black text-emerald-400">MAÎTRISÉ ✓</span>}
                </div>
                <div className="mt-3">
                  <Progress value={(mastered / total) * 100} className="h-2" />
                  <p className="mt-1 text-xs text-zinc-500">{mastered}/{total} maîtrisées</p>
                </div>
              </button>
            )
          })}
          <button
            onClick={() => start('all')}
            className="group rounded-2xl border border-amber-700/60 bg-amber-500/10 p-5 text-left transition hover:bg-amber-500/20 sm:col-span-2"
          >
            <h4 className="font-bold text-amber-300">🔥 EXAM FINAL — toutes les questions ({totalQ})</h4>
            <p className="mt-1 text-xs text-zinc-400">Mélange de tous les modules · les erreurs reviennent en boucle jusqu'au sans-faute</p>
          </button>
        </div>

        {Object.keys(state).length > 0 && (
          <div className="text-center">
            <Button variant="ghost" onClick={resetProgress} className="text-xs text-zinc-500 hover:text-rose-400">
              ⟲ Réinitialiser toute ma progression
            </Button>
          </div>
        )}
      </div>
    )
  }

  // ── Question view ──
  const isOk = picked !== null && picked === current.answer
  const moduleOf = modules.find((m) => m.id === current.module)
  const remaining = queuePending

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
        <span className="rounded-full bg-zinc-900 px-3 py-1">
          {moduleOf?.icon} Module {moduleOf?.num} — {moduleOf?.title}
        </span>
        <span>{remaining} question(s) restante(s) dans la file</span>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <p className="text-lg font-bold leading-relaxed text-zinc-100">{current.q}</p>
        <div className="mt-5 space-y-2.5">
          {current.options.map((opt, i) => {
            let cls = 'border-zinc-700 bg-zinc-950 text-zinc-200 hover:border-zinc-500'
            if (picked !== null) {
              if (i === current.answer) cls = 'border-emerald-600 bg-emerald-500/15 text-emerald-200'
              else if (i === picked) cls = 'border-rose-600 bg-rose-500/15 text-rose-200'
              else cls = 'border-zinc-800 bg-zinc-950 text-zinc-500'
            }
            return (
              <button
                key={i}
                onClick={() => answer(i)}
                disabled={picked !== null}
                className={`w-full rounded-xl border p-3.5 text-left text-sm leading-relaxed transition ${cls}`}
              >
                <span className="mr-2 font-black text-zinc-500">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            )
          })}
        </div>

        {picked !== null && (
          <div className={`mt-5 rounded-xl border p-4 ${isOk ? 'border-emerald-700/60 bg-emerald-500/10' : 'border-rose-700/60 bg-rose-500/10'}`}>
            <p className={`text-sm font-black ${isOk ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isOk ? '✅ Correct !' : '❌ Faux — cette question reviendra dans la file !'}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">{current.explain}</p>
            <Button
              onClick={next}
              className="mt-4 w-full bg-amber-500 font-bold text-zinc-950 hover:bg-amber-400"
            >
              {queue.length === 0 ? 'Terminer la session →' : 'Question suivante →'}
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button variant="ghost" size="sm" onClick={() => { setCurrent(null); setPicked(null) }} className="text-xs text-zinc-500">
          ← Retour au menu du quiz
        </Button>
      </div>
    </div>
  )
}
