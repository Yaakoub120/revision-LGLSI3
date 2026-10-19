'use client';

import { Fragment } from 'react';
import type { Block } from '@/types/course';
import { Diagram } from '@/components/diagrams';

// Parser inline minimal : **gras** et `code`
export function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) {
          return <strong key={i} className="font-semibold text-zinc-900">{p.slice(2, -2)}</strong>;
        }
        if (p.startsWith('`') && p.endsWith('`')) {
          return (
            <code key={i} className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-teal-800 ring-1 ring-zinc-200">
              {p.slice(1, -1)}
            </code>
          );
        }
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

const noteStyles = {
  info: { wrap: 'border-sky-300 bg-sky-50', text: 'text-sky-900' },
  warn: { wrap: 'border-amber-400 bg-amber-50', text: 'text-amber-900' },
  tip: { wrap: 'border-emerald-400 bg-emerald-50', text: 'text-emerald-900' },
  danger: { wrap: 'border-rose-400 bg-rose-50', text: 'text-rose-900' },
};

function CommandBlock({ code, note }: { code: string; note?: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
      <div className="flex items-start justify-between gap-2 px-4 py-3">
        <code className="break-all font-mono text-[13px] leading-relaxed text-emerald-300 sm:text-sm">$ {code}</code>
        <button
          onClick={() => navigator.clipboard?.writeText(code)}
          className="shrink-0 rounded border border-zinc-700 px-2 py-0.5 text-[10px] text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-200"
          aria-label={`Copier ${code}`}
        >
          Copier
        </button>
      </div>
      {note && <div className="border-t border-zinc-800 bg-zinc-950/60 px-4 py-2 text-xs text-zinc-400">{note}</div>}
    </div>
  );
}

function CodeBlock({ title, code, lang }: { title?: string; code: string; lang?: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
      {title && (
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/70 px-4 py-2">
          <span className="text-xs font-semibold text-zinc-300">{title}</span>
          {lang && <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] uppercase text-zinc-400">{lang}</span>}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-zinc-200">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case 'h2':
      return (
        <h2 className="mt-10 mb-4 scroll-mt-24 border-l-4 border-teal-600 pl-3 text-xl font-bold text-zinc-900 sm:text-2xl">
          {block.text}
        </h2>
      );
    case 'h3':
      return <h3 className="mt-6 mb-3 text-base font-bold text-teal-800 sm:text-lg">{block.text}</h3>;
    case 'p':
      return (
        <p className="my-3 text-[15px] leading-relaxed text-zinc-700">
          <InlineText text={block.text} />
        </p>
      );
    case 'list':
      return block.ordered ? (
        <ol className="my-3 list-decimal space-y-1.5 pl-6 text-[15px] leading-relaxed text-zinc-700">
          {block.items.map((it, i) => <li key={i}><InlineText text={it} /></li>)}
        </ol>
      ) : (
        <ul className="my-3 list-disc space-y-1.5 pl-6 text-[15px] leading-relaxed text-zinc-700">
          {block.items.map((it, i) => <li key={i}><InlineText text={it} /></li>)}
        </ul>
      );
    case 'table':
      return (
        <div className="my-5">
          {block.caption && <p className="mb-2 text-xs font-medium text-zinc-500">{block.caption}</p>}
          <div className="max-h-[28rem] overflow-auto rounded-lg border border-zinc-200 shadow-sm">
            <table className="w-full min-w-[560px] border-collapse text-left text-[13.5px]">
              <thead>
                <tr className="bg-zinc-100">
                  {block.headers.map((h, i) => (
                    <th key={i} className="border-b border-zinc-200 px-3 py-2.5 font-bold text-zinc-800">
                      <InlineText text={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-zinc-50/60'}>
                    {row.map((cell, j) => (
                      <td key={j} className="border-b border-zinc-100 px-3 py-2 align-top text-zinc-700">
                        <InlineText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    case 'cmd':
      return <CommandBlock code={block.code} note={block.note} />;
    case 'code':
      return <CodeBlock title={block.title} code={block.code} lang={block.lang} />;
    case 'def':
      return (
        <div className="my-4 rounded-lg border-l-4 border-teal-500 bg-teal-50/70 p-4">
          <p className="font-bold text-teal-900">📖 {block.term}</p>
          <p className="mt-1 text-[14.5px] leading-relaxed text-teal-950/90">
            <InlineText text={block.text} />
          </p>
        </div>
      );
    case 'note': {
      const s = noteStyles[block.variant];
      return (
        <div className={`my-4 rounded-lg border-l-4 ${s.wrap} p-4`}>
          <p className={`text-[14.5px] leading-relaxed ${s.text}`}>
            <InlineText text={block.text} />
          </p>
        </div>
      );
    }
    case 'diagram':
      return <Diagram id={block.id} caption={block.caption} />;
    case 'steps':
      return (
        <ol className="my-4 space-y-3">
          {block.items.map((s, i) => (
            <li key={i} className="flex gap-3 rounded-lg border border-zinc-200 bg-white p-3.5 shadow-sm">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-bold text-zinc-900">{s.title}</p>
                <p className="mt-0.5 text-[13.5px] leading-relaxed text-zinc-600">
                  <InlineText text={s.text} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
    case 'example':
      return (
        <div className="my-4 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-bold text-zinc-800">{block.title}</p>
          <p className="mt-1 text-[14.5px] leading-relaxed text-zinc-600">
            <InlineText text={block.text} />
          </p>
        </div>
      );
    default:
      return null;
  }
}
