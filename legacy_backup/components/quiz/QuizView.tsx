'use client';

import { useMemo, useState } from 'react';
import type { QuizQuestion } from '@/types/course';
import type { Subject } from '@/data/subjects';
import { brandClasses } from '@/data/subjects';
import { moduleColor } from '@/data/modules';
import { useAppStore, isMastered } from '@/lib/store';
import { moduleEmoji } from '@/lib/emoji';
import { shuffle } from '@/data/quiz';
import { QuizRunner } from './QuizRunner';
import { Progress } from '@/components/ui/progress';

type Mode = 'menu' | 'run';

export function QuizView({ subject, initialModuleId }: { subject: Subject; initialModuleId?: number }) {
  const stats = useAppStore((s) => s.stats);
  const [mode, setMode] = useState<Mode>(initialModuleId ? 'run' : 'menu');
  const [pool, setPool] = useState<QuizQuestion[]>(() =>
    initialModuleId ? subject.questionsForModule(initialModuleId) : []
  );
  const [title, setTitle] = useState(() =>
    initialModuleId ? `Quiz — ${subject.modules.find((m) => m.id === initialModuleId)?.title ?? 'Module'}` : ''
  );
  const [runKey, setRunKey] = useState(0);

  const startSession = (qs: QuizQuestion[], t: string) => {
    if (qs.length === 0) return;
    // Prioriser les questions jamais maîtrisées ou ratées récemment
    const weak = qs.filter((q) => !isMastered(stats[q.id]));
    const strong = qs.filter((q) => isMastered(stats[q.id]));
    const ordered = [...shuffle(weak), ...shuffle(strong)];
    setPool(ordered);
    setTitle(t);
    setRunKey((k) => k + 1);
    setMode('run');
  };

  if (mode === 'run') {
    return (
      <QuizRunner
        key={runKey}
        subject={subject}
        questions={pool}
        title={title}
        onExit={() => setMode('menu')}
        onRestart={() => startSession(pool, title)}
      />
    );
  }

  return <QuizMenu subject={subject} onStart={startSession} />;
}

function QuizMenu({ subject, onStart }: { subject: Subject; onStart: (qs: QuizQuestion[], t: string) => void }) {
  const stats = useAppStore((s) => s.stats);
  const brand = brandClasses[subject.brand];

  const perModule = useMemo(() => {
    return subject.modules
      .map((m) => {
        const qs = subject.questionsForModule(m.id);
        const mastered = qs.filter((q) => isMastered(stats[q.id])).length;
        return { m, count: qs.length, mastered };
      })
      .filter((x) => x.count > 0);
  }, [stats, subject]);

  const totalQuestions = subject.questions.length;
  const totalMastered = subject.questions.filter((q) => isMastered(stats[q.id])).length;

  return (
    <div>
      <div className={`rounded-2xl bg-gradient-to-br ${brand.gradient} p-6 text-white shadow-lg sm:p-8`}>
        <h1 className="text-2xl font-extrabold sm:text-3xl">🎯 Test de maîtrise continue</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300">
          Le quiz vous teste <strong className="text-white">sans fin</strong> : chaque question ratée revient jusqu’à ce
          que vous la réussissiez. Une session se termine uniquement quand{' '}
          <strong className="text-white">toutes les questions du lot sont maîtrisées</strong>. Les questions faibles
          passent en premier.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-6">
          <div>
            <p className={`text-3xl font-extrabold ${brand.text}`}>
              {totalMastered}
              <span className="text-lg text-zinc-400">/{totalQuestions}</span>
            </p>
            <p className="text-xs text-zinc-400">questions maîtrisées globalement</p>
          </div>
          <div className="min-w-[200px] flex-1">
            <Progress value={(totalMastered / totalQuestions) * 100} className="h-2.5 bg-zinc-700" />
            <p className="mt-1.5 text-xs text-zinc-400">
              {Math.round((totalMastered / totalQuestions) * 100)}% de la banque de questions maîtrisée
            </p>
          </div>
        </div>
      </div>

      {/* Mode examen */}
      <button
        onClick={() => onStart(shuffle(subject.questions), 'Examen blanc — tous les modules')}
        className="group mt-6 flex w-full items-center justify-between rounded-2xl border-2 border-teal-600 bg-teal-50 p-5 text-left shadow-sm transition hover:bg-teal-100"
      >
        <div>
          <p className="text-lg font-extrabold text-teal-900">🏆 Examen blanc — tous les modules</p>
          <p className="text-sm text-teal-700">
            {totalQuestions} questions mélangées de tout le cours. Le test ultime avant l’examen.
          </p>
        </div>
        <span className="ml-4 shrink-0 rounded-xl bg-teal-600 px-4 py-2 text-sm font-bold text-white transition group-hover:bg-teal-700">
          Lancer
        </span>
      </button>

      <h2 className="mt-8 mb-3 text-lg font-bold text-zinc-800">Quiz par module</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {perModule.map(({ m, count, mastered }) => {
          const c = moduleColor(m.accent);
          const pct = Math.round((mastered / count) * 100);
          return (
            <button
              key={m.id}
              onClick={() => onStart(subject.questionsForModule(m.id), `Quiz — ${m.title}`)}
              className="group flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition hover:border-zinc-300 hover:shadow-md"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${c.bg}`}>
                <span>{moduleEmoji(m.icon)}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-zinc-900">{m.title}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100">
                    <div className={`h-full rounded-full ${c.solid}`} style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-500">
                    {mastered}/{count}
                  </span>
                </div>
              </div>
              <span className="shrink-0 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-700 transition group-hover:bg-teal-600 group-hover:text-white">
                Tester
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-600">
        <p className="font-bold text-zinc-800">💡 Comment ça marche ?</p>
        <ul className="mt-1.5 list-disc space-y-1 pl-5 text-[13.5px]">
          <li>Réponse correcte → la question sort du lot (maîtrisée pour la session).</li>
          <li>Réponse fausse → explication immédiate + la question est réinjectée 2 positions plus loin.</li>
          <li>
            Votre progression par question est sauvegardée localement — les questions faibles reviennent en priorité dans
            les prochaines sessions.
          </li>
          <li>
            Objectif : terminer une session <strong>sans aucune erreur</strong> 🏆.
          </li>
        </ul>
      </div>
    </div>
  );
}
