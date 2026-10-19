"use client";

import { useMemo, useState } from "react";
import { subjects, totalChapters, totalQuizQuestions } from "@/data/subjects";
import type { Subject } from "@/lib/learn-types";
import { SubjectView } from "@/components/learn/subject-view";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Terminal, Network, Cloud, Smartphone, Cpu, Database, BrainCircuit, ShieldCheck, Workflow,
  GraduationCap, ListChecks, BookOpen, Sparkles, Search,
} from "lucide-react";

const ICONS: Record<string, typeof Terminal> = {
  Terminal, Network, Cloud, Smartphone, Cpu, Database, BrainCircuit, ShieldCheck, Workflow,
};

export default function Home() {
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [query, setQuery] = useState("");

  const filteredSubjects = useMemo(() => {
    if (!query.trim()) return subjects;
    const q = query.toLowerCase();
    return subjects.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.chapters.some((c) => c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q))
    );
  }, [query]);

  if (activeSubject) {
    return <SubjectView subject={activeSubject} onBack={() => setActiveSubject(null)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* Hero */}
      <header className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white px-4 sm:px-8 pt-10 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
            <GraduationCap className="h-4 w-4" /> Plateforme de révision — LGLSI 3
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Ma <span className="text-emerald-400">Bibliothèque</span> de Révision
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-zinc-300 leading-relaxed">
            Toute la matière des 9 sujets — chaque définition, chaque commande, chaque concept, sans rien omettre —
            organisée en fiches, schémas explicatifs et boucles de maîtrise qui te re-testent jusqu&apos;au zéro erreur.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs">
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1.5"><BookOpen className="h-3.5 w-3.5 text-emerald-400" />{subjects.length} sujets · {totalChapters} chapitres</span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1.5"><ListChecks className="h-3.5 w-3.5 text-emerald-400" />{totalQuizQuestions} questions de maîtrise</span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1.5"><Sparkles className="h-3.5 w-3.5 text-emerald-400" />Schémas + référence commandes</span>
          </div>
        </div>
      </header>

      {/* Subject grid */}
      <main className="max-w-5xl w-full mx-auto px-4 sm:px-8 -mt-10 pb-16 flex-1">
        <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6">
          <div className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 px-3 py-2.5 mb-5 bg-zinc-50 dark:bg-zinc-950">
            <Search className="h-4 w-4 text-zinc-400 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un sujet, un chapitre…"
              className="w-full bg-transparent text-sm outline-none text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {filteredSubjects.map((s) => {
              const Icon = ICONS[s.icon] ?? BookOpen;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSubject(s)}
                  className="group text-left rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className={`bg-gradient-to-r ${s.gradient} px-5 py-4 flex items-center gap-3`}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                      <Icon className="h-5 w-5 text-white" />
                    </span>
                    <div className="min-w-0">
                      <div className="font-bold text-white truncate">{s.shortName}</div>
                      <div className="text-[11px] text-white/80 truncate">{s.teacher}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">{s.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="text-[10px]">{s.chapters.length} chapitres</Badge>
                      <Badge variant="secondary" className="text-[10px]">{s.quiz.length} questions</Badge>
                      <Badge variant="secondary" className="text-[10px]">
                        {s.chapters.reduce((a, c) => a + c.sections.length, 0)} sections
                      </Badge>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredSubjects.length === 0 && (
            <p className="text-center text-sm text-zinc-500 py-10">Aucun sujet ne correspond à « {query} ».</p>
          )}
        </div>

        {/* How it works */}
        <div className="mt-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6">
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-emerald-500" /> Comment fonctionne la boucle de maîtrise
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              { n: "1", t: "Answer tout", d: "Chaque sujet possède un quiz complet couvrant toutes les définitions, commandes et concepts du cours." },
              { n: "2", t: "Les erreurs reviennent", d: "Une question ratée est réinjectée à la fin de la file — elle repassera jusqu'à ce que tu la réussisses." },
              { n: "3", t: "Zéro erreur = maîtrise", d: "La boucle ne se termine que lorsque TOUTES les questions ont été répondues correctement. Ta progression est sauvegardée." },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-zinc-100 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-950">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white text-xs font-bold">{s.n}</div>
                <div className="mt-2.5 text-sm font-semibold text-zinc-800 dark:text-zinc-100">{s.t}</div>
                <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
              <span>Sujets disponibles</span><span>{subjects.length}/9</span>
            </div>
            <Progress value={100} className="h-1.5" />
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500">
          <span>Bibliothèque de révision — construite à partir de tous les documents de cours fournis (FSM · 2025-2026)</span>
          <span>Progression sauvegardée localement dans ton navigateur</span>
        </div>
      </footer>
    </div>
  );
}
