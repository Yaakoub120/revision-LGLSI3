'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuestionStat {
  attempts: number; // nombre de réponses données
  wrong: number; // nombre d'erreurs
  lastWrong: boolean; // dernière réponse était-elle fausse ?
}

interface AppState {
  stats: Record<string, QuestionStat>;
  sessionsCompleted: number;
  moduleSessions: Record<string, number>;
  preferredSubject: string; // matière sélectionnée (adminsys | bigdata | …)
  recordAnswer: (qid: string, correct: boolean) => void;
  completeSession: (moduleIds: number[]) => void;
  setPreferredSubject: (id: string) => void;
  resetAll: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      stats: {},
      sessionsCompleted: 0,
      moduleSessions: {},
      preferredSubject: 'adminsys',
      recordAnswer: (qid, correct) =>
        set((state) => {
          const prev = state.stats[qid] ?? { attempts: 0, wrong: 0, lastWrong: false };
          return {
            stats: {
              ...state.stats,
              [qid]: {
                attempts: prev.attempts + 1,
                wrong: prev.wrong + (correct ? 0 : 1),
                lastWrong: !correct,
              },
            },
          };
        }),
      completeSession: (moduleIds) =>
        set((state) => {
          const ms = { ...state.moduleSessions };
          for (const id of moduleIds) ms[String(id)] = (ms[String(id)] ?? 0) + 1;
          return { sessionsCompleted: state.sessionsCompleted + 1, moduleSessions: ms };
        }),
      setPreferredSubject: (id) => set({ preferredSubject: id }),
      resetAll: () => set({ stats: {}, sessionsCompleted: 0, moduleSessions: {} }),
    }),
    { name: 'adminsys-progress' }
  )
);

export function isMastered(stat: QuestionStat | undefined): boolean {
  return !!stat && stat.attempts > 0 && !stat.lastWrong;
}
