"use client";

import { useState } from "react";
import { queueForReview, readLearningRecords } from "../lib/learning-store";

type CourseReviewButtonProps = { ids: string[]; count: number };

export function CourseReviewButton({ ids, count }: CourseReviewButtonProps) {
  const [queued, setQueued] = useState(() => {
    const records = readLearningRecords();
    return ids.every((id) => Boolean(records[id]));
  });

  function addSceneToReview() {
    queueForReview(ids);
    setQueued(true);
  }

  return <button className={`course-review-queue${queued ? " queued" : ""}`} type="button" onClick={addSceneToReview}>{queued ? `本场景 ${count} 条已进入复习 ✓` : `完成本场景？加入 ${count} 条复习内容 →`}</button>;
}
