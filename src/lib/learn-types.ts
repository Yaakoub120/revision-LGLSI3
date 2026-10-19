// ─── Types shared across the whole learning platform ───────────────────────

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "cmd"; commands: { cmd: string; desc: string }[] }
  | {
      type: "callout";
      variant: "info" | "warn" | "tip" | "important";
      title?: string;
      text: string;
    }
  | { type: "code"; lang?: string; code: string; caption?: string }
  | { type: "diagram"; id: string; caption?: string }
  | { type: "kv"; items: { k: string; v: string }[] };

export interface Section {
  heading: string;
  blocks: ContentBlock[];
}

export interface Chapter {
  id: string;
  title: string;
  summary: string;
  sections: Section[];
}

export interface QuizQuestion {
  id: string;
  chapter?: string;
  question: string;
  options: string[];
  correct: number; // index into options
  explanation: string;
}

export interface Subject {
  id: string;
  name: string;
  shortName: string;
  teacher: string;
  icon: string; // lucide icon name
  gradient: string; // tailwind gradient classes for the card
  accent: string; // hex accent color for charts/diagrams
  description: string;
  chapters: Chapter[];
  quiz: QuizQuestion[];
}

export interface MasteryState {
  // question ids still to answer correctly in the current loop
  pending: string[];
  // ids answered correctly at least once (session history)
  done: string[];
  // per-question stats
  stats: Record<string, { attempts: number; wrong: number; lastOk: boolean }>;
  // completed full loops (zero-error runs)
  loops: number;
  totalErrors: number;
}
