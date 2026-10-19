// ─── Content block model for the study sites (generic, multi-subject) ───
export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'definition'; term: string; def: string }
  | { type: 'note'; title?: string; text: string }
  | { type: 'quote'; text: string; source?: string }
  | { type: 'table'; headers: string[]; rows: string[][]; caption?: string }
  | { type: 'code'; code: string; lang?: string; caption?: string }
  | { type: 'stats'; items: { value: string; label: string }[] }
  | { type: 'timeline'; items: { time: string; text: string }[] }
  | { type: 'steps'; items: { title: string; text: string }[] }
  | { type: 'kv'; items: { k: string; v: string }[] }
  | { type: 'diagram'; diagram: string } // named interactive diagram

export type Section = { id: string; title: string; blocks: Block[] }
export type Module = {
  id: string
  num: number
  title: string
  subtitle: string
  icon: string
  color: string
  source: string
  sections: Section[]
}
export type Question = {
  id: string
  module: string
  q: string
  options: string[]
  answer: number
  explain: string
}
