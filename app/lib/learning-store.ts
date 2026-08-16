export type Mastery = "new" | "learning" | "review" | "mastered";

export type LearningRecord = {
  id: string;
  attempts: number;
  correct: number;
  streak: number;
  mastery: Mastery;
  nextReviewAt: number;
  updatedAt: number;
};

const STORAGE_KEY = "vivid-cantonese-learning-records";
const intervals = [0, 1, 3, 7, 14, 30];

function canUseStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

export function readLearningRecords(): Record<string, LearningRecord> {
  if (!canUseStorage()) return {};
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function writeLearningRecords(records: Record<string, LearningRecord>) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  window.dispatchEvent(new CustomEvent("vivid-cantonese-progress-changed"));
}

export function recordAnswer(id: string, correct: boolean, now = Date.now()) {
  const records = readLearningRecords();
  const previous = records[id];
  const attempts = (previous?.attempts || 0) + 1;
  const correctCount = (previous?.correct || 0) + (correct ? 1 : 0);
  const streak = correct ? (previous?.streak || 0) + 1 : 0;
  const intervalIndex = correct ? Math.min(intervals.length - 1, streak + 1) : 0;
  const days = intervals[intervalIndex];
  records[id] = {
    id,
    attempts,
    correct: correctCount,
    streak,
    mastery: correct && streak >= 4 ? "mastered" : correct && streak >= 2 ? "review" : "learning",
    nextReviewAt: now + days * 24 * 60 * 60 * 1000,
    updatedAt: now,
  };
  writeLearningRecords(records);
  return records[id];
}

export function isDue(record: LearningRecord | undefined, now = Date.now()) {
  return !record || record.nextReviewAt <= now;
}

export function getDueIds(ids: string[], records: Record<string, LearningRecord>, now = Date.now()) {
  return ids.filter((id) => isDue(records[id], now));
}

export function getMasteryLabel(mastery: Mastery | undefined) {
  if (mastery === "mastered") return "已稳定";
  if (mastery === "review") return "巩固中";
  if (mastery === "learning") return "学习中";
  return "待学习";
}
