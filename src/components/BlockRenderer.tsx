'use client'

import type { ComponentType } from 'react'
import type { Block } from '@/data/types'
import { Diagram as BigDataDiagram } from './diagrams'

type DiagramRegistry = Record<string, ComponentType>

function CodeBlock({ code, lang, caption }: { code: string; lang?: string; caption?: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-zinc-800">
      {caption && <div className="border-b border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-400">{caption}</div>}
      <pre className="overflow-x-auto bg-zinc-950 p-4 text-[13px] leading-relaxed text-emerald-200">
        <code>{code}</code>
      </pre>
      {lang && <div className="bg-zinc-900 px-4 py-1 text-right text-[10px] uppercase tracking-widest text-zinc-600">{lang}</div>}
    </div>
  )
}

export function BlockRenderer({ block, diagrams }: { block: Block; diagrams?: DiagramRegistry }) {
  const renderDiagram = (name: string) => {
    const C = diagrams?.[name]
    if (C) return <C />
    return <BigDataDiagram name={name} />
  }
  switch (block.type) {
    case 'paragraph':
      return <p className="my-3 leading-relaxed text-zinc-300">{block.text}</p>
    case 'list':
      return block.ordered ? (
        <ol className="my-3 list-decimal space-y-1.5 pl-6 text-zinc-300">
          {block.items.map((it, i) => <li key={i} className="leading-relaxed">{it}</li>)}
        </ol>
      ) : (
        <ul className="my-3 list-disc space-y-1.5 pl-6 text-zinc-300">
          {block.items.map((it, i) => <li key={i} className="leading-relaxed">{it}</li>)}
        </ul>
      )
    case 'definition':
      return (
        <div className="my-4 rounded-xl border-l-4 border-amber-500 bg-amber-500/10 p-4">
          <p className="text-sm font-black uppercase tracking-wider text-amber-400">📌 {block.term}</p>
          <p className="mt-1.5 whitespace-pre-line leading-relaxed text-zinc-200">{block.def}</p>
        </div>
      )
    case 'note':
      return (
        <div className="my-4 rounded-xl border border-sky-800/60 bg-sky-500/10 p-4">
          {block.title && <p className="text-sm font-black uppercase tracking-wider text-sky-300">💡 {block.title}</p>}
          <p className="mt-1 whitespace-pre-line leading-relaxed text-zinc-200">{block.text}</p>
        </div>
      )
    case 'quote':
      return (
        <blockquote className="my-4 rounded-xl border-l-4 border-purple-500 bg-purple-500/10 p-4">
          <p className="italic leading-relaxed text-zinc-200">« {block.text} »</p>
          {block.source && <p className="mt-2 text-xs font-bold uppercase tracking-wider text-purple-300">— {block.source}</p>}
        </blockquote>
      )
    case 'table':
      return (
        <div className="my-4">
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="bg-zinc-900">
                  {block.headers.map((h) => <th key={h} className="border-b border-zinc-800 px-4 py-2.5 font-bold text-amber-400">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r, i) => (
                  <tr key={i} className={i % 2 ? 'bg-zinc-950/50' : ''}>
                    {r.map((c, j) => <td key={j} className={`border-b border-zinc-900 px-4 py-2.5 align-top leading-relaxed text-zinc-300 ${j === 0 ? 'font-semibold text-zinc-100' : ''}`}>{c}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <p className="mt-1.5 text-center text-xs text-zinc-500">{block.caption}</p>}
        </div>
      )
    case 'code':
      return <CodeBlock code={block.code} lang={block.lang} caption={block.caption} />
    case 'stats':
      return (
        <div className="my-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {block.items.map((s, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-center">
              <p className="text-2xl font-black text-amber-400">{s.value}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">{s.label}</p>
            </div>
          ))}
        </div>
      )
    case 'timeline':
      return (
        <div className="my-4 ml-3 border-l-2 border-zinc-800 pl-6">
          {block.items.map((t, i) => (
            <div key={i} className="relative mb-4 last:mb-0">
              <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-amber-500 bg-zinc-950" />
              <p className="text-sm font-bold text-amber-400">{t.time}</p>
              <p className="leading-relaxed text-zinc-300">{t.text}</p>
            </div>
          ))}
        </div>
      )
    case 'steps':
      return (
        <div className="my-4 space-y-3">
          {block.items.map((s, i) => (
            <div key={i} className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500/20 text-sm font-black text-teal-300">{i + 1}</div>
              <div>
                <p className="font-bold text-zinc-100">{s.title}</p>
                <p className="mt-1 leading-relaxed text-zinc-300">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      )
    case 'kv':
      return (
        <div className="my-4 grid gap-2 sm:grid-cols-2">
          {block.items.map((kv, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
              <p className="text-sm font-bold text-teal-300">{kv.k}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-zinc-300">{kv.v}</p>
            </div>
          ))}
        </div>
      )
    case 'diagram':
      return renderDiagram(block.diagram)
    default:
      return null
  }
}
