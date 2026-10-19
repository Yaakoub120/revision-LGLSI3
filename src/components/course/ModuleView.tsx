'use client';

import { useEffect, useRef, useState } from 'react';
import type { CourseModule } from '@/types/course';
import type { Subject } from '@/data/subjects';
import { brandClasses } from '@/data/subjects';
import { moduleColor } from '@/data/modules';
import { BlockRenderer } from './BlockRenderer';
import { QuizView } from '@/components/quiz/QuizView';
import { Button } from '@/components/ui/button';

export function ModuleView({
  subject,
  module,
  onOpenQuiz,
  onBack,
}: {
  subject: Subject;
  module: CourseModule;
  onOpenQuiz: () => void;
  onBack: () => void;
}) {
  const [activeSection, setActiveSection] = useState(module.sections[0]?.id ?? '');
  const contentRef = useRef<HTMLDivElement>(null);
  const c = moduleColor(module.accent);
  const brand = brandClasses[subject.brand];
  const qCount = subject.questionsForModule(module.id).length;

  // Scrollspy simple
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );
    module.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [module]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      {/* En-tête du module */}
      <div className={`rounded-2xl border ${c.border} ${c.soft} p-5 sm:p-7`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <button onClick={onBack} className="mb-2 text-xs font-semibold text-zinc-500 underline transition hover:text-zinc-700">
              ← Tous les modules
            </button>
            <p className={`text-xs font-bold uppercase tracking-wide ${c.text}`}>{subject.moduleTag(module.id)} du cours</p>
            <h1 className="mt-1 text-2xl font-extrabold text-zinc-900 sm:text-3xl">{module.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600">{module.subtitle}</p>
          </div>
          <div className="flex flex-col gap-2">
            {qCount > 0 && (
              <Button onClick={onOpenQuiz} className="bg-teal-600 hover:bg-teal-700">
                🎯 Tester ce module ({qCount} questions)
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-6">
        {/* Sommaire latéral */}
        <nav className="sticky top-6 hidden h-fit w-64 shrink-0 self-start rounded-xl border border-zinc-200 bg-white p-3 shadow-sm lg:block" aria-label="Sommaire">
          <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wide text-zinc-400">Sommaire</p>
          <ul className="space-y-0.5">
            {module.sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollTo(s.id)}
                  className={`w-full rounded-lg px-2.5 py-1.5 text-left text-[13px] leading-snug transition ${
                    activeSection === s.id
                      ? `${brand.softBg} font-bold text-zinc-900`
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                  }`}
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contenu */}
        <div ref={contentRef} className="min-w-0 flex-1">
          {module.sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-20">
              <h2 className="mt-8 mb-1 text-xl font-extrabold text-zinc-900 sm:text-2xl">{s.title}</h2>
              <div className={`mb-4 h-1 w-14 rounded ${brand.bg}`} />
              {s.blocks.map((b, i) => (
                <BlockRenderer key={i} block={b} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
