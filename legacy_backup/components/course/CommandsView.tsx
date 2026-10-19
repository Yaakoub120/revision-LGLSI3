'use client';

import { useMemo, useState } from 'react';
import type { Subject } from '@/data/subjects';
import { Input } from '@/components/ui/input';

export function CommandsView({ subject }: { subject: Subject }) {
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState<number | 'all'>('all');

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return subject.commands.filter((c) => {
      if (moduleFilter !== 'all' && c.module !== moduleFilter) return false;
      if (!s) return true;
      return (
        c.cmd.toLowerCase().includes(s) ||
        c.desc.toLowerCase().includes(s) ||
        c.category.toLowerCase().includes(s) ||
        (c.example ?? '').toLowerCase().includes(s)
      );
    });
  }, [search, moduleFilter, subject]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const c of filtered) {
      const arr = map.get(c.category) ?? [];
      arr.push(c);
      map.set(c.category, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div>
      <div className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 text-white shadow-lg sm:p-8">
        <h1 className="text-2xl font-extrabold sm:text-3xl">⌨️ Anti-sèche des commandes</h1>
        <p className="mt-2 text-sm text-zinc-300">
          Toutes les commandes de « {subject.name} » ({subject.commands.length} entrées) avec explication et exemple.
          Cherchez, filtrez, copiez.
        </p>
      </div>

      <div className="sticky top-0 z-10 -mx-4 mt-5 bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une commande, un outil, un mot-clé…"
          className="max-w-xl bg-white"
          aria-label="Rechercher une commande"
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          <FilterChip active={moduleFilter === 'all'} onClick={() => setModuleFilter('all')} label="Tous" />
          {subject.modules.map((m) => (
            <FilterChip
              key={m.id}
              active={moduleFilter === m.id}
              onClick={() => setModuleFilter(m.id)}
              label={`${subject.moduleLabel(m.id)} · ${m.title.split('—')[0].trim().slice(0, 26)}`}
            />
          ))}
        </div>
      </div>

      <p className="mt-3 text-xs text-zinc-500">{filtered.length} commande(s) trouvée(s)</p>

      <div className="mt-3 space-y-6 pb-10">
        {grouped.map(([category, cmds]) => (
          <section key={category}>
            <h2 className="mb-2 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-teal-800">
              <span className="h-4 w-1 rounded bg-teal-500" />
              {category}
            </h2>
            <div className="grid gap-2.5 md:grid-cols-2">
              {cmds.map((c, i) => (
                <div
                  key={c.cmd + i}
                  className="group rounded-xl border border-zinc-200 bg-white p-3.5 shadow-sm transition hover:border-teal-300 hover:shadow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <code className="break-all rounded bg-zinc-900 px-2 py-1 font-mono text-[12.5px] font-bold text-emerald-300">
                      {c.cmd}
                    </code>
                    {c.example && (
                      <button
                        onClick={() => navigator.clipboard?.writeText(c.example!)}
                        className="shrink-0 rounded border border-zinc-200 px-1.5 py-0.5 text-[10px] text-zinc-400 transition hover:border-teal-400 hover:text-teal-600"
                      >
                        copier ex.
                      </button>
                    )}
                  </div>
                  <p className="mt-2 text-[13px] leading-snug text-zinc-600">{c.desc}</p>
                  {c.example && (
                    <p className="mt-1.5 truncate font-mono text-[11.5px] text-zinc-400" title={c.example}>
                      → {c.example}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-zinc-400">Aucune commande ne correspond à votre recherche.</p>
        )}
      </div>
    </div>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-[11.5px] font-semibold transition ${
        active ? 'bg-teal-600 text-white shadow' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
      }`}
    >
      {label}
    </button>
  );
}
