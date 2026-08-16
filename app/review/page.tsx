"use client";

import { useState } from "react";
import { CantoneseAudio, CantoneseAudioSettings } from "../components/CantoneseAudio";

const reviewItems = [
  ["冇", "mou5", "没有", "口语替换"],
  ["而家", "ji4 gaa1", "现在", "必须整词记"],
  ["係咪", "hai6 mai6", "是不是", "高频句式"],
  ["點解", "dim2 gaai2", "为什么", "疑问词"],
];

export default function ReviewPage() {
  const [completed] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("vivid-cantonese-progress") || "[]"); } catch { return []; }
  });
  const progress = Math.min(100, completed.length * 25);

  return (
    <main className="subpage">
      <header className="subpage-header"><a className="brand" href="/"><span className="brand-mark">粵</span><span><strong>粤语鲜活学堂</strong><small>Vivid Cantonese</small></span></a><a className="back-link" href="/">← 回到首页</a></header>
      <section className="subpage-hero page-shell compact"><p className="eyebrow">REVIEW CENTER / 复习中心</p><h1>把今天遇到的差异，<br /><em>留到下一次对话。</em></h1><p>学习进度保存在当前浏览器中。完成转换桥、场景和练习后，今天的复习清单会自动变得更具体。</p></section>
      <div className="page-shell"><CantoneseAudioSettings /></div>
      <section className="review-layout page-shell">
        <div className="review-progress"><div><span>今日完成度</span><b>{progress}%</b></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><p>{completed.length ? "很好，继续把短语放进完整句子。" : "先完成首页的今日一句，再回来复习。"}</p><a className="primary-button" href="/practice">开始复习 <span>→</span></a></div>
        <div className="review-list"><div className="review-list-head"><b>今日词条</b><small>按“普通话使用者非直觉”排序</small></div>{reviewItems.map(([word, jyutping, meaning, tag], index) => <article className="review-item" key={word}><span className="review-number">0{index + 1}</span><div><strong>{word}</strong><code>{jyutping}</code></div><p>{meaning}</p><small>{tag}</small><CantoneseAudio text={word} label={`播放：${word}`} compact /><a href="/bridge">复习 →</a></article>)}</div>
      </section>
    </main>
  );
}
