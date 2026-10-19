import type { CourseModule, CommandEntry, GlossaryEntry, QuizQuestion } from '@/types/course';
import { courseModules } from '@/data/modules';
import { allQuestions as adminsysQuestions, questionsForModule as adminsysQuestionsForModule } from '@/data/quiz';
import { allCommands as adminsysCommands } from '@/data/commands';
import { glossary as adminsysGlossary } from '@/data/glossary';
import { bigdataModules } from '@/data/bigdata';
import { bdQuestions, bdQuestionsForModule } from '@/data/bigdata/quiz';
import { bigdataCommands } from '@/data/bigdata/commands';
import { bigdataGlossary } from '@/data/bigdata/glossary';

export type BrandColor = 'teal' | 'amber';

export interface Subject {
  id: string;
  name: string;
  short: string;
  logo: string;
  tagline: string;
  emoji: string;
  instructor: string;
  description: string;
  brand: BrandColor;
  modules: CourseModule[];
  commands: CommandEntry[];
  glossary: GlossaryEntry[];
  questions: QuizQuestion[];
  questionsForModule: (moduleId: number) => QuizQuestion[];
  moduleLabel: (id: number) => string;
  moduleTag: (id: number) => string;
  diagramsCount: number;
  footer: string;
}

export const subjects: Subject[] = [
  {
    id: 'adminsys',
    name: 'Administration des Systèmes',
    short: 'AdminSys',
    logo: '$',
    tagline: 'Cours complet + tests de maîtrise continue',
    emoji: '🧑‍💼',
    instructor: 'Faculté des Sciences de Monastir — Hédi Nsibi',
    description:
      'Tout le contenu des 8 modules du cours — définitions, commandes, tableaux, cas pratiques — enrichi de diagrammes explicatifs et d’un système de quiz qui vous teste jusqu’au sans-faute.',
    brand: 'teal',
    modules: courseModules,
    commands: adminsysCommands,
    glossary: adminsysGlossary,
    questions: adminsysQuestions,
    questionsForModule: adminsysQuestionsForModule,
    moduleLabel: (id) => (id === 1 ? 'M1' : id === 2 ? 'M2a' : id === 3 ? 'M2b' : `M${id - 1}`),
    moduleTag: (id) => (id === 1 ? 'Module 1' : id === 2 ? 'Module 2 — Partie 1' : id === 3 ? 'Module 2 — Partie 2' : `Module ${id - 1}`),
    diagramsCount: 22,
    footer: 'Administration des Systèmes — Modules 1 à 8 · Hédi Nsibi, Faculté des Sciences de Monastir',
  },
  {
    id: 'bigdata',
    name: 'Traitement de Big Data Avancé',
    short: 'Big Data',
    logo: 'B',
    tagline: 'Cours complet + tests de maîtrise continue',
    emoji: '📊',
    instructor: 'Elaboré par Dr. Souheyl MALLAT — 2025-2026',
    description:
      'Tout le contenu du cours : introduction au Big Data, les 5 V, Hadoop & HDFS, MapReduce, NoSQL & MongoDB, ReplicaSets et Sharding — définitions, commandes, exemples complets, diagrammes explicatifs et quiz de maîtrise jusqu’au sans-faute.',
    brand: 'amber',
    modules: bigdataModules,
    commands: bigdataCommands,
    glossary: bigdataGlossary,
    questions: bdQuestions,
    questionsForModule: bdQuestionsForModule,
    moduleLabel: (id) => `M${id}`,
    moduleTag: (id) => `Chapitre ${id}`,
    diagramsCount: 15,
    footer: 'Traitement de Big Data Avancé · Elaboré par Dr. Souheyl MALLAT — 2025-2026',
  },
];

export function getSubject(id: string): Subject {
  return subjects.find((s) => s.id === id) ?? subjects[0];
}

export function getSubjectModule(subject: Subject, id: number): CourseModule | undefined {
  return subject.modules.find((m) => m.id === id);
}

// Couleurs de marque par sujet (classes Tailwind complètes pour éviter le purge)
export const brandClasses: Record<BrandColor, { text: string; bg: string; softBg: string; ring: string; gradient: string }> = {
  teal: {
    text: 'text-teal-300',
    bg: 'bg-teal-500',
    softBg: 'bg-teal-500/15',
    ring: 'border-teal-500',
    gradient: 'from-zinc-900 via-zinc-900 to-teal-950',
  },
  amber: {
    text: 'text-amber-300',
    bg: 'bg-amber-500',
    softBg: 'bg-amber-500/15',
    ring: 'border-amber-500',
    gradient: 'from-zinc-900 via-zinc-900 to-amber-950',
  },
};
