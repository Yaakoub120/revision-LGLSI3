import type { QuizQuestion } from '@/types/course';
import { quiz1 } from './quiz1';
import { quiz2a } from './quiz2a';
import { quiz2b } from './quiz2b';
import { quiz3 } from './quiz3';
import { quiz4 } from './quiz4';
import { quiz5 } from './quiz5';
import { quiz6 } from './quiz6';
import { quiz7 } from './quiz7';
import { quiz8 } from './quiz8';

export const allQuestions: QuizQuestion[] = [
  ...quiz1, ...quiz2a, ...quiz2b, ...quiz3, ...quiz4, ...quiz5, ...quiz6, ...quiz7, ...quiz8,
];

export function questionsForModule(moduleId: number): QuizQuestion[] {
  return allQuestions.filter((q) => q.moduleId === moduleId);
}

export function moduleHasQuiz(moduleId: number): boolean {
  return allQuestions.some((q) => q.moduleId === moduleId);
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
