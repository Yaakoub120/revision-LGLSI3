// ─── Types multi-matières (AdminSys + Big Data) ───

export type DiagramId =
  // Administration des Systèmes
  | 'fhs-tree'
  | 'fs-architecture'
  | 'mounting'
  | 'device-naming'
  | 'partitions'
  | 'ext-evolution'
  | 'lvm'
  | 'backup-types'
  | 'swap-memory'
  | 'swappiness'
  | 'systemd-arch'
  | 'service-lifecycle'
  | 'targets'
  | 'timer-anatomy'
  | 'osi'
  | 'network-lan'
  | 'ip-anatomy'
  | 'permissions'
  | 'passwd-anatomy'
  | 'user-group'
  | 'package-levels'
  | 'quota'
  // Big Data
  | 'bigdata-evolution'
  | 'storage-units'
  | 'web-evolution'
  | 'bigdata-timeline'
  | 'five-v'
  | 'nv-history'
  | 'hadoop-ecosystem'
  | 'hdfs-arch'
  | 'hdfs-write'
  | 'hdfs-read'
  | 'mapreduce-flow'
  | 'mean-length-flow'
  | 'nosql-mapping'
  | 'replicaset-arch'
  | 'sharding-arch'
  | 'chunk-sharding';

export type Block =
  | { kind: 'h2'; text: string; icon?: string }
  | { kind: 'h3'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'list'; items: string[]; ordered?: boolean }
  | { kind: 'table'; headers: string[]; rows: string[][]; caption?: string }
  | { kind: 'cmd'; code: string; note?: string }
  | { kind: 'code'; title?: string; code: string; lang?: string }
  | { kind: 'def'; term: string; text: string }
  | { kind: 'note'; text: string; variant: 'info' | 'warn' | 'tip' | 'danger' }
  | { kind: 'diagram'; id: DiagramId; caption?: string }
  | { kind: 'steps'; items: { title: string; text: string }[] }
  | { kind: 'example'; title: string; text: string };

export interface ModuleSection {
  id: string;
  title: string;
  blocks: Block[];
}

export interface CourseModule {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  icon: string; // lucide icon name
  accent: string; // tailwind color token base e.g. "emerald"
  sections: ModuleSection[];
}

// ─── Quiz ───

export interface QuizQuestion {
  id: string;
  moduleId: number;
  q: string;
  choices: string[];
  answer: number; // index of correct choice
  explain: string;
  tag?: string;
}

// ─── Commandes (anti-sèche) ───

export interface CommandEntry {
  cmd: string;
  module: number;
  desc: string;
  example?: string;
  category: string;
}

// ─── Lexique ───

export interface GlossaryEntry {
  term: string;
  def: string;
  module: number;
}
