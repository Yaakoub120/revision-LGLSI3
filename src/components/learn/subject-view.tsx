"use client";

import { useMemo, useState } from "react";
import type { Subject } from "@/lib/learn-types";
import { SectionRenderer } from "./content-renderer";
import { QuizEngine } from "./quiz-engine";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, ListChecks, TerminalSquare, User, Layers } from "lucide-react";
import { BookMarked } from "lucide-react";

type Tab = "cours" | "quiz" | "commandes";

export function SubjectView({ subject, onBack }: { subject: Subject; onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("cours");
  const [chapterFilter, setChapterFilter] = useState<string | "all">("all");

  const allCommands = useMemo(() => {
    const rows: { cmd: string; desc: string; chapter: string }[] = [];
    subject.chapters.forEach((ch) =>
      ch.sections.forEach((s) =>
        s.blocks.forEach((b) => {
          if (b.type === "cmd") b.commands.forEach((c) => rows.push({ ...c, chapter: ch.title }));
        })
      )
    );
    return rows;
  }, [subject]);

  const filteredChapters = chapterFilter === "all" ? subject.chapters : subject.chapters.filter((c) => c.id === chapterFilter);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className={`bg-gradient-to-br ${subject.gradient} px-4 sm:px-8 pt-6 pb-16`}>
        <div className="max-w-4xl mx-auto">
          <Button variant="secondary" size="sm" onClick={onBack} className="mb-5 gap-2 bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur">
            <ArrowLeft className="h-4 w-4" /> Tous les sujets
          </Button>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">{subject.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-white/90 text-sm">
            <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{subject.teacher}</span>
            <span className="flex items-center gap-1.5"><Layers className="h-4 w-4" />{subject.chapters.length} chapitres</span>
            <span className="flex items-center gap-1.5"><ListChecks className="h-4 w-4" />{subject.quiz.length} questions de maîtrise</span>
          </div>
          <p className="mt-3 max-w-2xl text-sm text-white/85 leading-relaxed">{subject.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 -mt-8 relative z-10">
        <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow-lg border border-zinc-200 dark:border-zinc-800 p-1.5 flex gap-1">
          {([
            { id: "cours" as Tab, label: "Cours complet", Icon: BookOpen },
            { id: "quiz" as Tab, label: "Boucle de maîtrise", Icon: ListChecks },
            { id: "commandes" as Tab, label: `Commandes (${allCommands.length})`, Icon: TerminalSquare },
          ]).map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex-1 min-w-0 flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold transition-all ${tab === id ? "text-white shadow" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"}`}
              style={tab === id ? { background: subject.accent } : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
        {tab === "cours" && (
          <div className="space-y-4">
            {/* Chapter filter chips */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setChapterFilter("all")}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors ${chapterFilter === "all" ? "text-white border-transparent" : "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-500"}`}
                style={chapterFilter === "all" ? { background: subject.accent } : undefined}
              >
                Tout le cours
              </button>
              {subject.chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setChapterFilter(ch.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors max-w-full truncate ${chapterFilter === ch.id ? "text-white border-transparent" : "border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-zinc-500"}`}
                  style={chapterFilter === ch.id ? { background: subject.accent } : undefined}
                >
                  {ch.title.split("—")[0].trim()}
                </button>
              ))}
            </div>

            <Accordion type="multiple" defaultValue={filteredChapters.map((c) => c.id)} className="space-y-3">
              {filteredChapters.map((ch, ci) => (
                <AccordionItem key={ch.id} value={ch.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 sm:px-6 shadow-sm">
                  <AccordionTrigger className="hover:no-underline py-4 min-w-0">
                    <div className="flex flex-col items-start gap-1 text-left min-w-0">
                      <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-50">{ch.title}</span>
                      <span className="text-xs font-normal text-zinc-500 leading-relaxed break-words [overflow-wrap:anywhere]">{ch.summary}</span>
                      <Badge variant="secondary" className="mt-1">{ch.sections.length} sections · {ci + 1}/{subject.chapters.length}</Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 space-y-8">
                    {ch.sections.map((s, si) => <SectionRenderer key={si} section={s} accent={subject.accent} />)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {tab === "quiz" && (
          <QuizEngine
            subjectId={subject.id}
            subjectName={subject.shortName}
            accent={subject.accent}
            questions={subject.quiz}
            onExit={() => setTab("cours")}
          />
        )}

        {tab === "commandes" && (
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
              <BookMarked className="h-4 w-4" style={{ color: subject.accent }} />
              <h2 className="text-sm font-bold text-zinc-800 dark:text-zinc-100">
                Référence des commandes — {subject.shortName} ({allCommands.length})
              </h2>
            </div>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 max-h-[70vh] overflow-y-auto">
              {allCommands.map((c, i) => (
                <div key={i} className="px-4 py-2.5 flex flex-col sm:flex-row gap-1 sm:gap-3">
                  <code className="shrink-0 text-[11px] font-mono rounded bg-zinc-800 text-emerald-300 px-2 py-1 sm:max-w-[44%] overflow-x-auto whitespace-nowrap">{c.cmd}</code>
                  <div className="min-w-0">
                    <span className="text-xs text-zinc-700 dark:text-zinc-300">{c.desc}</span>
                    <span className="block text-[10px] text-zinc-400">{c.chapter.split("—")[0].trim()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
