import type { QuizQuestion } from '@/types/course';
import { bdQuiz1 } from './quiz1';
import { bdQuiz2 } from './quiz2';
import { bdQuiz3 } from './quiz3';
import { bdQuiz4 } from './quiz4';
import { bdQuiz5 } from './quiz5';
import { bdQuiz6 } from './quiz6';
import { bdQuiz7 } from './quiz7';

export const bdQuestions: QuizQuestion[] = [
  ...bdQuiz1, ...bdQuiz2, ...bdQuiz3, ...bdQuiz4, ...bdQuiz5, ...bdQuiz6, ...bdQuiz7,
];

export function bdQuestionsForModule(moduleId: number): QuizQuestion[] {
  return bdQuestions.filter((q) => q.moduleId === moduleId);
}
