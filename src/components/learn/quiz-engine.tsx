"use client";

// ═══════════════════════════════════════════════════════════════════════════
// MASTERY-LOOP QUIZ ENGINE
// Une question répondue incorrectement est REINJECTÉE en fin de file :
// la boucle ne se termine que lorsque TOUTES les questions ont été répondues
// correctement (zéro erreur restante).
// ═══════════════════════════════════════════════════════════════════════════

import { useCallback, useEffect, useMemo, useState } from "react";
import type { QuizQuestion, MasteryState } from "@/lib/learn-types";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight, Repeat, Target } from "lucide-react";

const STORAGE_KEY = "study-hub-mastery-v1";

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface EngineProps {
  subjectId: string;
  subjectName: string;
  accent: string;
  questions: QuizQuestion[];
  onExit: () => void;
  globalKey?: string; // used for "exam global" mode
}

type AnswerState = {
  selected: number | null;
  correct: boolean;
} | null;

function loadMasteryState(storageId: string, questions: QuizQuestion[]) {
  const allIds = questions.map((q) => q.id);
  const validIds = new Set(allIds);
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}:${storageId}`);
    if (raw) {
      const parsed = JSON.parse(raw) as MasteryState;
      const validPending = parsed.pending.filter((id) => validIds.has(id));
      const validDone = parsed.done.filter((id) => validIds.has(id));
      const state: MasteryState = {
        pending: validPending.length ? validPending : shuffled(allIds),
        done: validDone,
        stats: parsed.stats ?? {},
        loops: parsed.loops ?? 0,
        totalErrors: parsed.totalErrors ?? 0,
      };
      return { mastery: state, queue: state.pending };
    }
  } catch {
    // corrupted storage → fresh state below
  }
  const fresh: MasteryState = { pending: [], done: [], stats: {}, loops: 0, totalErrors: 0 };
  return { mastery: fresh, queue: shuffled(allIds) };
}

export function QuizEngine({ subjectId, subjectName, accent, questions, onExit, globalKey }: EngineProps) {
  const storageId = globalKey ?? subjectId;
  // Lazy init from localStorage — this component only mounts on the client
  const [{ mastery: initialMastery, queue: initialQueue }] = useState(() =>
    loadMasteryState(storageId, questions)
  );
  const [mastery, setMastery] = useState<MasteryState>(initialMastery);
  const [queue, setQueue] = useState<string[]>(initialQueue);
  const [answered, setAnswered] = useState<AnswerState>(null);
  const [sessionErrors, setSessionErrors] = useState(0);
  const [sessionAttempts, setSessionAttempts] = useState(0);

  const qMap = useMemo(() => {
    const m = new Map<string, QuizQuestion>();
    questions.forEach((q) => m.set(q.id, q));
    return m;
  }, [questions]);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}:${storageId}`, JSON.stringify({ ...mastery, pending: queue }));
    } catch { /* quota */ }
  }, [mastery, queue, storageId]);

  const currentQ = queue.length > 0 ? qMap.get(queue[0]) : undefined;

  const answer = useCallback(
    (idx: number) => {
      if (!currentQ || answered) return;
      const isCorrect = idx === currentQ.correct;
      setAnswered({ selected: idx, correct: isCorrect });
      setSessionAttempts((a) => a + 1);
      setMastery((prev) => {
        const stat = prev.stats[currentQ.id] ?? { attempts: 0, wrong: 0, lastOk: true };
        return {
          ...prev,
          stats: {
            ...prev.stats,
            [currentQ.id]: { attempts: stat.attempts + 1, wrong: stat.wrong + (isCorrect ? 0 : 1), lastOk: isCorrect },
          },
        };
      });
      if (!isCorrect) setSessionErrors((e) => e + 1);
    },
    [currentQ, answered]
  );

  const next = useCallback(() => {
    if (!currentQ || !answered) return;
    const id = currentQ.id;
    const rest = queue.slice(1);
    if (answered.correct) {
      setMastery((m) => ({
        ...m,
        done: m.done.includes(id) ? m.done : [...m.done, id],
        loops: rest.length === 0 ? m.loops + 1 : m.loops,
      }));
      setQueue(rest);
    } else {
      // WRONG → re-queue at the END of the remaining queue (mastery loop)
      setQueue([...rest, id]);
    }
    setAnswered(null);
  }, [currentQ, answered, queue]);

  const restart = useCallback(() => {
    setQueue(shuffled(questions.map((q) => q.id)));
    setAnswered(null);
    setSessionErrors(0);
    setSessionAttempts(0);
    setMastery((m) => ({ ...m, done: [] }));
  }, [questions]);

  const totalQuestions = questions.length;
  const remaining = queue.length;
  const completed = totalQuestions - remaining;
  const progressPct = totalQuestions ? Math.round((completed / totalQuestions) * 100) : 0;
  const loopComplete = remaining === 0;

  // ── Loop complete screen ──
  if (loopComplete) {
    const perfect = sessionErrors === 0;
    const weakPoints = Object.entries(mastery.stats)
      .filter(([, s]) => s.wrong > 0)
      .sort((a, b) => b[1].wrong - a[1].wrong)
      .slice(0, 5);
    return (
      <div className="max-w-2xl mx-auto text-center py-10 space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
          <Trophy className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
            Maîtrise {perfect ? "PARFAITE" : "acquise"} — {subjectName}
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Les {totalQuestions} questions ont été répondues correctement — zéro erreur restante dans la boucle.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="text-2xl font-bold" style={{ color: accent }}>{mastery.loops + 1}</div>
            <div className="text-xs text-zinc-500">boucles terminées</div>
          </div>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="text-2xl font-bold text-amber-600">{mastery.totalErrors}</div>
            <div className="text-xs text-zinc-500">erreurs cumulées</div>
          </div>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
            <div className="text-2xl font-bold text-emerald-600">{sessionErrors}</div>
            <div className="text-xs text-zinc-500">erreurs cette boucle</div>
          </div>
        </div>
        {weakPoints.length > 0 && (
          <div className="text-left rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2">
              <Repeat className="h-4 w-4" /> Questions qui t&apos;ont posé le plus de difficultés
            </div>
            <ul className="space-y-1.5">
              {weakPoints.map(([id, s]) => {
                const q = qMap.get(id);
                return q ? (
                  <li key={id} className="text-xs text-amber-900 dark:text-amber-100">
                    <span className="font-semibold">({s.wrong}× erronée)</span> {q.question}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={restart} style={{ background: accent }} className="text-white gap-2">
            <RotateCcw className="h-4 w-4" /> Nouvelle boucle (mémorisation active)
          </Button>
          <Button variant="outline" onClick={onExit}>Retour au cours</Button>
        </div>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Astuce : relancer une nouvelle boucle consolide la mémorisation — les questions se re-mélangent et les
          erreurs repassent jusqu&apos;à la maîtrise parfaite.
        </p>
      </div>
    );
  }

  // ── Question card ──
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Target className="h-4 w-4 shrink-0" style={{ color: accent }} />
          <span className="text-sm font-semibold truncate text-zinc-800 dark:text-zinc-100">Boucle de maîtrise — {subjectName}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onExit}>Quitter</Button>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-zinc-500">
          <span>{completed}/{totalQuestions} maîtrisées</span>
          <span>{remaining} restante(s) · {sessionErrors} erreur(s) réinjectée(s)</span>
        </div>
        <Progress value={progressPct} className="h-2" />
      </div>

      {currentQ && (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-5 sm:p-6 space-y-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-50 leading-snug">{currentQ.question}</h3>
            <span className="shrink-0 text-[10px] uppercase tracking-wide text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded px-1.5 py-0.5">
              essai n°{(mastery.stats[currentQ.id]?.attempts ?? 0) + 1}
            </span>
          </div>
          <div className="space-y-2">
            {currentQ.options.map((opt, i) => {
              const isSelected = answered?.selected === i;
              const isCorrectOne = i === currentQ.correct;
              let cls = "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 bg-white dark:bg-zinc-900";
              if (answered) {
                if (isCorrectOne) cls = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50";
                else if (isSelected) cls = "border-rose-500 bg-rose-50 dark:bg-rose-950/50";
                else cls = "border-zinc-200 dark:border-zinc-800 opacity-60";
              }
              return (
                <button
                  key={i}
                  disabled={!!answered}
                  onClick={() => answer(i)}
                  className={`w-full text-left rounded-xl border px-4 py-3 text-sm transition-all flex items-start gap-2.5 ${cls}`}
                >
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${isSelected ? "border-transparent text-white" : "text-zinc-500 border-zinc-300 dark:border-zinc-600"}`}
                    style={isSelected ? { background: isCorrectOne ? "#10b981" : "#f43f5e" } : undefined}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-zinc-800 dark:text-zinc-200 leading-snug">{opt}</span>
                  {answered && isCorrectOne && <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-emerald-500" />}
                  {answered && isSelected && !isCorrectOne && <XCircle className="ml-auto h-4 w-4 shrink-0 text-rose-500" />}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className={`rounded-xl border-l-4 px-4 py-3 text-sm ${answered.correct ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40" : "border-rose-500 bg-rose-50 dark:bg-rose-950/40"}`}>
              <div className="font-semibold mb-1 text-zinc-900 dark:text-zinc-50">
                {answered.correct ? "✓ Correct !" : "✗ Incorrect — cette question reviendra dans la boucle"}
              </div>
              <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">{currentQ.explanation}</p>
            </div>
          )}

          {answered && (
            <Button onClick={next} className="w-full gap-2 text-white" style={{ background: accent }}>
              {answered.correct ? "Continuer" : "Réessayer plus tard"}
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      <p className="text-center text-xs text-zinc-400">
        Ta progression est sauvegardée automatiquement · les questions ratées sont remises en file jusqu&apos;à zéro erreur
      </p>
    </div>
  );
}
