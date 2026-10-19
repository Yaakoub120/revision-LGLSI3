"use client";

import type { ContentBlock, Section } from "@/lib/learn-types";
import { Diagram } from "./diagrams";
import { Info, AlertTriangle, Lightbulb, Zap, Terminal } from "lucide-react";

const CALLOUT_STYLES: Record<string, { cls: string; Icon: typeof Info }> = {
  info: { cls: "border-sky-400 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-100", Icon: Info },
  warn: { cls: "border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100", Icon: AlertTriangle },
  tip: { cls: "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100", Icon: Lightbulb },
  important: { cls: "border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100", Icon: Zap },
};

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{block.text}</p>;
    case "list":
      return block.ordered ? (
        <ol className="list-decimal list-outside pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          {block.items.map((it, i) => <li key={i} className="leading-relaxed">{it}</li>)}
        </ol>
      ) : (
        <ul className="list-disc list-outside pl-5 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
          {block.items.map((it, i) => <li key={i} className="leading-relaxed">{it}</li>)}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-900">
                {block.headers.map((h, hi) => (
                  <th key={hi} className="text-left px-3 py-2 font-semibold text-zinc-700 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="even:bg-zinc-50 dark:even:bg-zinc-900/50">
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-3 py-2 align-top border-b border-zinc-100 dark:border-zinc-800/60 text-zinc-700 dark:text-zinc-300 ${ci === 0 ? "font-medium text-zinc-800 dark:text-zinc-100" : ""}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "cmd":
      return (
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
            <Terminal className="h-3.5 w-3.5 text-zinc-500" />
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">Commandes</span>
          </div>
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {block.commands.map((c) => (
              <div key={c.cmd} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 px-3 py-2">
                <code className="shrink-0 max-w-full overflow-x-auto rounded bg-zinc-800 text-emerald-300 px-2 py-1 text-[11px] font-mono sm:min-w-[180px] sm:max-w-[46%] whitespace-nowrap">{c.cmd}</code>
                <span className="text-xs text-zinc-600 dark:text-zinc-400 leading-snug">{c.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case "callout": {
      const s = CALLOUT_STYLES[block.variant] ?? CALLOUT_STYLES.info;
      const { Icon } = s;
      return (
        <div className={`rounded-lg border-l-4 px-4 py-3 ${s.cls}`}>
          <div className="flex items-start gap-2.5">
            <Icon className="h-4 w-4 mt-0.5 shrink-0" />
            <div>
              {block.title && <div className="text-sm font-semibold mb-0.5">{block.title}</div>}
              <p className="text-xs leading-relaxed">{block.text}</p>
            </div>
          </div>
        </div>
      );
    }
    case "code":
      return (
        <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
          {block.caption && <div className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-900 text-xs font-medium text-zinc-600 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">{block.caption}</div>}
          <pre className="bg-zinc-950 text-zinc-100 px-4 py-3 text-[11px] leading-relaxed overflow-x-auto"><code>{block.code}</code></pre>
        </div>
      );
    case "diagram":
      return (
        <figure className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 p-4">
          <Diagram id={block.id} />
          {block.caption && <figcaption className="mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">{block.caption}</figcaption>}
        </figure>
      );
    case "kv":
      return (
        <div className="space-y-2">
          {block.items.map((it) => (
            <div key={it.k} className="rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2.5">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-100">{it.k}</span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400"> — </span>
              <span className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">{it.v}</span>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export function SectionRenderer({ section, accent }: { section: Section; accent: string }) {
  return (
    <section className="space-y-3">
      <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
        <span className="h-4 w-1.5 rounded-full inline-block" style={{ background: accent }} />
        {section.heading}
      </h3>
      <div className="space-y-3 pl-0 sm:pl-3.5">
        {section.blocks.map((b, i) => <Block key={i} block={b} />)}
      </div>
    </section>
  );
}
