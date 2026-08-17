"use client";

import { useEffect, useMemo, useState } from "react";
import { CantoneseAudio, CantoneseAudioSettings } from "../components/CantoneseAudio";
import { SiteHeader } from "../components/SiteHeader";
import { studyItems } from "../data/study-data";
import { getDueIds, getMasteryLabel, readLearningRecords, recordAnswer, type LearningRecord } from "../lib/learning-store";
import { sitePath } from "../lib/site-path";

export default function ReviewPage() {
  const [records, setRecords] = useState<Record<string, LearningRecord>>({});
  const [revealed, setRevealed] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => setRecords(readLearningRecords());
    refresh();
    window.addEventListener("vivid-cantonese-progress-changed", refresh);
    return () => window.removeEventListener("vivid-cantonese-progress-changed", refresh);
  }, []);

  const dueIds = useMemo(() => getDueIds(studyItems.map((item) => item.id), records), [records]);
  const dueItems = useMemo(() => dueIds.map((id) => studyItems.find((item) => item.id === id)).filter((item): item is (typeof studyItems)[number] => Boolean(item)).slice(0, 8), [dueIds]);
  const learnedCount = Object.keys(records).length;
  const masteredCount = Object.values(records).filter((record) => record.mastery === "mastered").length;
  const progress = Math.min(100, Math.round((learnedCount / studyItems.length) * 100));

  function reveal(id: string) {
    setRevealed((items) => items.includes(id) ? items : [...items, id]);
  }

  function answer(id: string, correct: boolean) {
    recordAnswer(id, correct);
    setRecords(readLearningRecords());
  }

  function sourceHref(sourceSlug?: string, kind?: string) {
    if (sourceSlug) return sitePath(`/course/${sourceSlug}`);
    if (kind === "发音") return sitePath("/audio");
    if (kind === "语气") return sitePath("/bridge");
    return sitePath("/bridge");
  }

  return (
    <main className="subpage review-page">
      <SiteHeader backHref="/" />
      <section className="subpage-hero page-shell compact"><p className="eyebrow">REVIEW CENTER / 复习中心</p><h1>把今天遇到的差异，<br /><em>留到下一次对话。</em></h1><p>复习不是把整页重新看一遍，而是先从普通话提示回忆粤语，再用间隔安排决定下一次什么时候回来。</p></section>
      <div className="page-shell"><CantoneseAudioSettings /></div>
      <section className="review-layout page-shell">
        <aside className="review-progress"><div><span>已建立学习记录</span><b>{progress}%</b></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="review-stat-row"><span>待复习 <b>{dueIds.length}</b></span><span>已稳定 <b>{masteredCount}</b></span></div><p>{dueIds.length ? "先看普通话，尽量在脑中说出粤语，再点击显示答案。" : "今天没有到期词条；可以去场景课程或听力实验室继续建立新记录。"}</p><a className="primary-button" href={sitePath("/today")}>开始今日学习 <span>→</span></a></aside>
        <div className="review-list"><div className="review-list-head"><b>现在该复习什么</b><small>按到期时间和学习状态排列 · 显示前 8 项</small></div>{dueItems.length ? dueItems.map((item) => { const isRevealed = revealed.includes(item.id); const record = records[item.id]; return <article className="review-card" key={item.id}><div className="review-card-top"><span>{item.kind}</span><small>{getMasteryLabel(record?.mastery)} · {item.source}</small></div><p className="review-prompt">普通话提示：<strong>{item.mandarin}</strong></p>{isRevealed ? <div className="review-answer"><strong>{item.cantonese}</strong><code>{item.jyutping}</code><p>{item.note}</p><CantoneseAudio text={item.cantonese} label={`播放：${item.cantonese}`} compact /><div className="review-rating"><button type="button" onClick={() => answer(item.id, false)}>再来一次</button><button type="button" onClick={() => answer(item.id, true)}>我记住了</button></div></div> : <button className="review-reveal" type="button" onClick={() => reveal(item.id)}>显示粤语答案 <span>→</span></button>}<a className="review-source" href={sourceHref(item.sourceSlug, item.kind)}>回到来源：{item.source} ↗</a></article>; }) : <div className="review-empty"><strong>这一轮复习清空了。</strong><p>把新的词条加入学习记录，或者去听力实验室做一轮听辨。</p><a href={sitePath("/audio")}>去听力实验室 →</a></div>}</div>
      </section>
    </main>
  );
}
