'use client';

import { useMemo, useState } from 'react';
import type { Subject } from '@/data/subjects';
import { Input } from '@/components/ui/input';

export function GlossaryView({ subject }: { subject: Subject }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();
    const list = [...subject.glossary].sort((a, b) => a.term.localeCompare(b.term, 'fr'));
    if (!s) return list;
    return list.filter((g) => g.term.toLowerCase().includes(s) || g.def.toLowerCase().includes(s));
  }, [search, subject]);

  return (
    <div>
      <div className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 text-white shadow-lg sm:p-8">
        <h1 className="text-2xl font-extrabold sm:text-3xl">📚 Lexique du cours</h1>
        <p className="mt-2 text-sm text-zinc-300">
          {subject.glossary.length} définitions essentielles de « {subject.name} », par ordre alphabétique. Tout ce qu’il
          faut savoir dire à l’examen.
        </p>
      </div>

      <div className="sticky top-0 z-10 -mx-4 mt-5 bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un terme ou une définition…"
          className="max-w-xl bg-white"
          aria-label="Rechercher dans le lexique"
        />
      </div>

      <div className="mt-4 grid gap-3 pb-10 md:grid-cols-2">
        {filtered.map((g) => (
          <div key={g.term} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow">
            <div className="flex items-start justify-between gap-2">
              <p className="font-bold text-teal-900">{g.term}</p>
              <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-500">
                {subject.moduleLabel(g.module)}
              </span>
            </div>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-zinc-600">{g.def}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-zinc-400">Aucun terme trouvé.</p>
        )}
      </div>
    </div>
  );
}
