"use client";

import { useMemo, useState } from "react";
import { CantoneseAudio, CantoneseAudioSettings } from "../components/CantoneseAudio";
import { todaySeedItems } from "../data/study-data";
import { recordAnswer } from "../lib/learning-store";

const sessionLength = 5;

export default function TodayPage() {
  const items = useMemo(() => todaySeedItems.slice(0, sessionLength), []);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(0);
  const item = items[index];
  const progress = Math.round((finished ? sessionLength : index) / sessionLength * 100);

  function answer(correct: boolean) {
    if (!item) return;
    recordAnswer(item.id, correct);
    setAnswered((value) => value + 1);
    if (index === items.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setRevealed(false);
  }

  return (
    <main className="subpage today-page">
      <header className="subpage-header">
        <a className="brand" href="/"><span className="brand-mark">粵</span><span><strong>粤语鲜活学堂</strong><small>给已经会读中文的你</small></span></a>
        <a className="back-link" href="/course">← 情景课程</a>
      </header>
      <section className="subpage-hero page-shell compact">
        <p className="eyebrow">TODAY / 今日学习</p>
        <h1>每天十五分钟，<br /><em>把粤语带进下一次对话。</em></h1>
        <p>先主动回忆，再看答案；今天的词会在之后的复习中重新出现，不靠一次看懂来假装已经学会。</p>
      </section>
      <div className="page-shell"><CantoneseAudioSettings /></div>
      <section className="today-session page-shell">
        <div className="today-session-top"><div><span className="eyebrow">LEARN LOOP / 学习循环</span><strong>{finished ? "今日学习完成" : `第 ${index + 1} / ${sessionLength} 项`}</strong></div><span>{progress}%</span></div>
        <div className="today-progress"><span style={{ width: `${progress}%` }} /></div>
        {!finished && item ? (
          <article className="today-study-card">
            <div className="today-study-meta"><span>{item.kind}</span><small>{item.source}</small></div>
            <p className="today-prompt-label">普通话提示</p>
            <h2>{item.mandarin}</h2>
            <p className="today-instruction">先在心里说出自然粤语，再打开答案。不要急着看粤拼。</p>
            {!revealed ? <button className="primary-button today-reveal" onClick={() => setRevealed(true)} type="button">显示粤语答案 <span>→</span></button> : <div className="today-answer"><strong>{item.cantonese}</strong><code>{item.jyutping}</code><CantoneseAudio text={item.cantonese} label={`播放：${item.cantonese}`} /><p>{item.note}</p><div className="today-rating"><span>这次回忆得怎样？</span><div><button className="rating-button again" onClick={() => answer(false)} type="button">再练一次</button><button className="rating-button remembered" onClick={() => answer(true)} type="button">我记住了</button></div></div></div>}
          </article>
        ) : <article className="today-complete"><span className="today-complete-mark">✓</span><h2>很好，今天的五项已经进入学习记录。</h2><p>{answered ? `你完成了 ${answered} 次主动回忆。明天会根据今天的表现安排下一轮。` : "继续从复习中心或一个新场景开始。"}</p><div className="today-complete-actions"><a className="primary-button" href="/review">查看待复习 <span>→</span></a><a className="secondary-link" href="/audio">去听力实验室 <span>↗</span></a></div></article>}
        <p className="today-session-note">学习记录保存在当前设备。稍后会按每个词的表现安排间隔复习，而不是只记录“看过”。</p>
      </section>
      <section className="today-route-links page-shell"><a href="/bridge"><span>01</span><b>普通话转换桥</b><small>查规律，也查例外 →</small></a><a href="/course"><span>02</span><b>情景课程</b><small>把词放进真实任务 →</small></a><a href="/audio"><span>03</span><b>听力实验室</b><small>训练声调和韵尾 →</small></a></section>
    </main>
  );
}
