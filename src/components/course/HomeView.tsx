'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Subject } from '@/data/subjects';
import { brandClasses } from '@/data/subjects';
import { moduleColor } from '@/data/modules';
import { useAppStore, isMastered } from '@/lib/store';
import { moduleEmoji } from '@/lib/emoji';
import { Progress } from '@/components/ui/progress';

export function HomeView({
  subject,
  onOpenModule,
  onOpenQuiz,
  onOpenCommands,
  onOpenGlossary,
}: {
  subject: Subject;
  onOpenModule: (id: number) => void;
  onOpenQuiz: () => void;
  onOpenCommands: () => void;
  onOpenGlossary: () => void;
}) {
  const stats = useAppStore((s) => s.stats);
  const sessions = useAppStore((s) => s.sessionsCompleted);
  const brand = brandClasses[subject.brand];

  const totalMastered = useMemo(() => subject.questions.filter((q) => isMastered(stats[q.id])).length, [stats, subject]);

  const perModule = useMemo(
    () =>
      subject.modules.map((m) => {
        const qs = subject.questionsForModule(m.id);
        const mastered = qs.filter((q) => isMastered(stats[q.id])).length;
        return { m, count: qs.length, mastered };
      }),
    [stats, subject]
  );

  const sectionsCount = subject.modules.reduce((acc, m) => acc + m.sections.length, 0);

  return (
    <div>
      {/* Hero */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${brand.gradient} p-7 text-white shadow-xl sm:p-10`}>
        <div className={`pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full ${brand.softBg} blur-2xl`} />
        <div className="pointer-events-none absolute -bottom-14 left-1/3 h-40 w-40 rounded-full bg-emerald-500/10 blur-2xl" />
        <p className={`text-xs font-bold uppercase tracking-[0.2em] ${brand.text}`}>{subject.instructor}</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">{subject.name}</h1>
        <p className={`mt-1 text-lg font-semibold ${brand.text}`}>{subject.tagline}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300">{subject.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={onOpenQuiz}
            className={`rounded-xl ${brand.bg} px-5 py-2.5 text-sm font-bold text-zinc-950 shadow-lg transition hover:opacity-90`}
          >
            🎯 Commencer les tests
          </button>
          <button
            onClick={() => onOpenModule(subject.modules[0]?.id ?? 1)}
            className="rounded-xl border border-zinc-600 px-5 py-2.5 text-sm font-bold text-zinc-200 transition hover:border-zinc-400 hover:bg-zinc-800"
          >
            📖 Lire le cours
          </button>
          <button
            onClick={onOpenCommands}
            className="rounded-xl border border-zinc-600 px-5 py-2.5 text-sm font-bold text-zinc-200 transition hover:border-zinc-400 hover:bg-zinc-800"
          >
            ⌨️ Anti-sèche commandes
          </button>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { v: String(subject.modules.length), l: 'modules complets' },
            { v: String(sectionsCount), l: 'sections détaillées' },
            { v: String(subject.questions.length), l: 'questions de quiz' },
            { v: String(subject.diagramsCount), l: 'diagrammes explicatifs' },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-zinc-700/60 bg-zinc-800/50 p-3 text-center backdrop-blur">
              <p className={`text-2xl font-extrabold ${brand.text}`}>{s.v}</p>
              <p className="text-[11px] text-zinc-400">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progression globale */}
      <div className="mt-6 flex flex-wrap items-center gap-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div>
          <p className="text-sm font-bold text-zinc-900">Votre progression</p>
          <p className="text-xs text-zinc-500">
            {totalMastered}/{subject.questions.length} questions maîtrisées · {sessions} session(s) terminée(s)
          </p>
        </div>
        <div className="min-w-[220px] flex-1">
          <Progress value={(totalMastered / subject.questions.length) * 100} className="h-2.5" />
        </div>
        <button onClick={onOpenGlossary} className="rounded-lg border border-zinc-200 px-3.5 py-2 text-xs font-bold text-zinc-600 transition hover:bg-zinc-50">
          📚 Lexique
        </button>
      </div>

      {/* Grille des modules */}
      <h2 className="mt-9 mb-4 text-xl font-extrabold text-zinc-900">Les modules du cours</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {perModule.map(({ m, count, mastered }, idx) => {
          const c = moduleColor(m.accent);
          const pct = count > 0 ? Math.round((mastered / count) * 100) : 0;
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.3 }}
              className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${c.bg}`}>
                  {moduleEmoji(m.icon)}
                </span>
                <div className="min-w-0">
                  <p className={`text-[10.5px] font-extrabold uppercase tracking-wide ${c.text}`}>{subject.moduleTag(m.id)}</p>
                  <h3 className="text-[15px] font-extrabold leading-snug text-zinc-900">{m.title}</h3>
                </div>
              </div>
              <p className="mt-2.5 line-clamp-2 flex-1 text-[13px] leading-relaxed text-zinc-500">{m.subtitle}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100">
                  <div className={`h-full rounded-full ${c.solid}`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[10.5px] font-bold text-zinc-400">{pct}%</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => onOpenModule(m.id)}
                  className={`flex-1 rounded-lg ${c.solid} py-2 text-xs font-bold text-white transition hover:opacity-90`}
                >
                  📖 Étudier
                </button>
                <button
                  onClick={onOpenQuiz}
                  disabled={count === 0}
                  className="flex-1 rounded-lg border border-zinc-200 py-2 text-xs font-bold text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-40"
                >
                  🎯 Tester ({count})
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
