'use client';

import { useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizQuestion } from '@/types/course';
import type { Subject } from '@/data/subjects';
import { useAppStore, isMastered } from '@/lib/store';
import { moduleColor } from '@/data/modules';

interface QuizSession {
  queue: QuizQuestion[]; // questions restantes à réussir
  current: QuizQuestion | null;
  solved: Set<string>;
  attempts: number;
  mistakes: number;
  startTime: number;
}

type Phase = 'playing' | 'feedback' | 'done';

export function QuizRunner({
  subject,
  questions,
  title,
  onExit,
  onRestart,
}: {
  subject: Subject;
  questions: QuizQuestion[];
  title: string;
  onExit: () => void;
  onRestart: () => void;
}) {
  const recordAnswer = useAppStore((s) => s.recordAnswer);
  const completeSession = useAppStore((s) => s.completeSession);
  const stats = useAppStore((s) => s.stats);

  const [session, setSession] = useState<QuizSession>(() => ({
    queue: questions.slice(1),
    current: questions[0] ?? null,
    solved: new Set(),
    attempts: 0,
    mistakes: 0,
    startTime: Date.now(),
  }));
  const [phase, setPhase] = useState<Phase>('playing');
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const total = questions.length;
  const answeredCorrect = session.solved.size;

  const handleChoice = useCallback(
    (idx: number) => {
      if (phase !== 'playing' || !session.current) return;
      const q = session.current;
      const correct = idx === q.answer;
      setSelected(idx);
      recordAnswer(q.id, correct);
      setSession((s) => ({
        ...s,
        attempts: s.attempts + 1,
        mistakes: s.mistakes + (correct ? 0 : 1),
      }));
      setPhase('feedback');
    },
    [phase, session.current, recordAnswer]
  );

  const handleNext = useCallback(() => {
    if (!session.current) return;
    const q = session.current;
    const correct = selected === q.answer;
    const solved = new Set(session.solved);
    let queue = [...session.queue];
    if (correct) {
      solved.add(q.id);
    } else {
      // Ré-insérer la question ratée 2 positions plus loin (boucle de maîtrise)
      const pos = Math.min(queue.length, 2);
      queue = [...queue.slice(0, pos), q, ...queue.slice(pos)];
    }
    const next = queue.shift() ?? null;
    setSession((s) => ({ ...s, queue, current: next, solved }));
    setSelected(null);
    if (next) {
      setPhase('playing');
    } else {
      setPhase('done');
      setDone(true);
      const moduleIds = [...new Set(questions.map((q) => q.moduleId))];
      completeSession(moduleIds);
    }
  }, [session, selected, completeSession, questions]);

  const moduleInfo = useMemo(() => {
    if (!session.current) return null;
    return subject.modules.find((m) => m.id === session.current!.moduleId);
  }, [session.current, subject]);

  const accent = moduleInfo ? moduleColor(moduleInfo.accent) : moduleColor('emerald');

  // ─── Écran de fin ───
  if (done) {
    const elapsed = Math.round((Date.now() - session.startTime) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const accuracy = session.attempts > 0 ? Math.round((total / session.attempts) * 100) : 100;
    const perfect = session.mistakes === 0;
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl">
            {perfect ? '🏆' : '✅'}
          </div>
          <h2 className="text-2xl font-extrabold text-emerald-800">
            {perfect ? 'Sans-faute ! Maîtrise parfaite !' : 'Session maîtrisée !'}
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            {perfect
              ? 'Vous avez répondu correctement à toutes les questions du premier coup.'
              : 'Toutes les questions ont fini par être réussies — même celles où vous vous êtes trompé.'}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { l: 'Questions', v: total },
              { l: 'Tentatives', v: session.attempts },
              { l: 'Erreurs', v: session.mistakes },
              { l: 'Temps', v: `${mins}m ${String(secs).padStart(2, '0')}s` },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border border-zinc-200 bg-white p-3">
                <p className="text-xl font-extrabold text-zinc-900">{s.v}</p>
                <p className="text-[11px] font-medium text-zinc-500">{s.l}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-zinc-500">Efficacité de la session : {accuracy}%</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={onRestart}
              className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-teal-700"
            >
              🔁 Rejouer ce test
            </button>
            <button
              onClick={onExit}
              className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
            >
              ← Choisir un autre test
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  const q = session.current!;
  const mi = subject.modules.find((m) => m.id === q.moduleId);
  const mAccent = mi ? moduleColor(mi.accent) : accent;
  const stat = stats[q.id];
  const wasMasteredBefore = isMastered(stat);

  return (
    <div className="mx-auto max-w-3xl">
      {/* Barre de progression */}
      <div className="mb-4 flex items-center justify-between text-xs font-medium text-zinc-500">
        <span>{title}</span>
        <span>
          {answeredCorrect}/{total} maîtrisées · reste {session.queue.length + 1}
        </span>
      </div>
      <div className="mb-6 h-2.5 overflow-hidden rounded-full bg-zinc-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${(answeredCorrect / total) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id + '-' + session.attempts}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22 }}
          className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-md sm:p-7"
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold text-white ${mAccent.solid}`}>
              {mi?.title.split('—')[0].trim() ?? `Module ${q.moduleId}`}
            </span>
            {q.tag && (
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-600">{q.tag}</span>
            )}
            {session.mistakes > 0 && (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                {session.mistakes} erreur{session.mistakes > 1 ? 's' : ''} en cours
              </span>
            )}
            {wasMasteredBefore && phase === 'playing' && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                déjà maîtrisée ✓
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold leading-snug text-zinc-900 sm:text-xl">{q.q}</h3>

          <div className="mt-5 space-y-2.5">
            {q.choices.map((choice, idx) => {
              const isCorrect = idx === q.answer;
              const isPicked = selected === idx;
              let cls = 'border-zinc-200 bg-white hover:border-teal-400 hover:bg-teal-50/50';
              if (phase === 'feedback') {
                if (isCorrect) cls = 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500';
                else if (isPicked) cls = 'border-rose-400 bg-rose-50 ring-1 ring-rose-400';
                else cls = 'border-zinc-200 bg-white opacity-60';
              }
              return (
                <button
                  key={idx}
                  disabled={phase !== 'playing'}
                  onClick={() => handleChoice(idx)}
                  className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-[14.5px] leading-snug transition ${cls}`}
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                      phase === 'feedback' && isCorrect
                        ? 'bg-emerald-500 text-white'
                        : phase === 'feedback' && isPicked
                          ? 'bg-rose-500 text-white'
                          : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    {phase === 'feedback' && isCorrect ? '✓' : phase === 'feedback' && isPicked ? '✕' : String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-zinc-800">{choice}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {phase === 'feedback' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0 }}
                className="overflow-hidden"
              >
                <div
                  className={`mt-4 rounded-xl p-4 ${
                    selected === q.answer ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'
                  }`}
                >
                  <p className={`text-sm font-bold ${selected === q.answer ? 'text-emerald-800' : 'text-amber-800'}`}>
                    {selected === q.answer ? '✅ Bonne réponse !' : '❌ Pas tout à fait — la question reviendra plus tard !'}
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-zinc-700">{q.explain}</p>
                </div>
                <button
                  onClick={handleNext}
                  className="mt-4 w-full rounded-xl bg-teal-600 py-3 text-sm font-bold text-white shadow transition hover:bg-teal-700"
                >
                  {session.queue.length > 0 ? 'Question suivante →' : 'Voir le bilan →'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 text-center">
        <button onClick={onExit} className="text-xs text-zinc-400 underline transition hover:text-zinc-600">
          Quitter la session (progression sauvegardée)
        </button>
      </div>
    </div>
  );
}
