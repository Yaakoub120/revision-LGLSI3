import type { Subject } from "@/lib/learn-types";
import { adminSystemes } from "./admin-systemes";
import { appsReparties } from "./apps-reparties";
import { virtualisation } from "./virtualisation";
import { android } from "./android";
import { iot } from "./iot";
import { bigdata } from "./bigdata";

export const subjects: Subject[] = [
  adminSystemes,
  appsReparties,
  virtualisation,
  android,
  iot,
  bigdata,
];

export const totalQuizQuestions = subjects.reduce(
  (acc, s) => acc + s.quiz.length,
  0
);

export const totalChapters = subjects.reduce(
  (acc, s) => acc + s.chapters.length,
  0
);
