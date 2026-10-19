import type { CourseModule } from '@/types/course';
import { module1 } from './module1';
import { module2p1 } from './module2p1';
import { module2p2 } from './module2p2';
import { module3 } from './module3';
import { module4 } from './module4';
import { module5 } from './module5';
import { module6 } from './module6';
import { module7 } from './module7';
import { module8 } from './module8';

// L'ordre pédagogique du cours : M1 intro, M2a hiérarchie, M2b médias, M3 maintenance,
// M4 FS modernes + sauvegarde, M5 utilisateurs, M6 paquets, M7 systemd, M8 réseaux.
export const courseModules: CourseModule[] = [
  module1,
  module2p1,
  module2p2,
  module3,
  module4,
  module5,
  module6,
  module7,
  module8,
];

export function getModule(id: number): CourseModule | undefined {
  return courseModules.find((m) => m.id === id);
}

export const moduleColors: Record<string, { bg: string; text: string; border: string; solid: string; soft: string }> = {
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', solid: 'bg-emerald-600', soft: 'bg-emerald-50' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-200', solid: 'bg-teal-600', soft: 'bg-teal-50' },
  cyan: { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-200', solid: 'bg-cyan-600', soft: 'bg-cyan-50' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', solid: 'bg-amber-600', soft: 'bg-amber-50' },
  violet: { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-200', solid: 'bg-violet-600', soft: 'bg-violet-50' },
  rose: { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200', solid: 'bg-rose-600', soft: 'bg-rose-50' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200', solid: 'bg-orange-600', soft: 'bg-orange-50' },
  lime: { bg: 'bg-lime-100', text: 'text-lime-700', border: 'border-lime-200', solid: 'bg-lime-600', soft: 'bg-lime-50' },
  sky: { bg: 'bg-sky-100', text: 'text-sky-700', border: 'border-sky-200', solid: 'bg-sky-600', soft: 'bg-sky-50' },
};

export function moduleColor(accent: string) {
  return moduleColors[accent] ?? moduleColors.emerald;
}
