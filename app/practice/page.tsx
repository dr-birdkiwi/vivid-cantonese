"use client";

import { useState } from "react";
import { CantoneseAudio, CantoneseAudioSettings } from "../components/CantoneseAudio";
import { studyItems, type StudyItem } from "../data/study-data";
import { recordAnswer } from "../lib/learning-store";

const practiceItems = studyItems.filter((item) => item.kind === "口语替换" || item.kind === "句式").slice(0, 8);
const questions = practiceItems.map((item, index) => {
  const alternatives = practiceItems.filter((candidate) => candidate.id !== item.id).slice(0, 2).map((candidate) => candidate.cantonese);
  const values = [item.cantonese, ...alternatives];
  const rotation = index % values.length;
  return { ...item, options: values.map((_, offset) => values[(rotation + offset) % values.length]) };
});

function sourceLabel(item: StudyItem) {
  return item.kind === "口语替换" ? "普通话迁移" : "粤语句式";
}

export default function PracticePage() {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const question = questions[index];
  const correct = choice === question.cantonese;

  function choose(option: string) {
    if (choice) return;
    setChoice(option);
    recordAnswer(`practice-${question.id}`, option === question.cantonese);
  }

  function next() {
    setIndex((current) => (current + 1) % questions.length);
    setChoice(null);
  }

  return (
    <main className="subpage practice-page">
      <header className="subpage-header"><a className="brand" href="/"><span className="brand-mark">粵</span><span><strong>粤语鲜活学堂</strong><small>Vivid Cantonese</small></span></a><a className="back-link" href="/">← 回到首页</a></header>
      <section className="subpage-hero page-shell compact"><p className="eyebrow">QUICK PRACTICE / 立即反应</p><h1>先凭直觉选，<br /><em>再看差异在哪里。</em></h1><p>练习不是为了考你记住多少，而是让你从普通话提示出发，更快找到真实对话里的下一句。</p></section>
      <div className="page-shell"><CantoneseAudioSettings /></div>
      <section className="practice-page-card page-shell">
        <div className="question-side"><span className="question-count">{String(index + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}</span><p>{sourceLabel(question)}</p><h2>“{question.mandarin}”</h2><small className="practice-prompt-note">先在脑中说粤语，再看选项。</small><div className="practice-dots">{questions.map((_, item) => <i className={item === index ? "active" : ""} key={item} />)}</div></div>
        <div className="answer-side"><p className="answer-label">自然粤语怎么说？</p>{question.options.map((option) => <div className="practice-option-row" key={option}><button className={`practice-option${choice === option ? " selected" : ""}${choice && option === question.cantonese ? " correct-answer" : ""}`} onClick={() => choose(option)} type="button"><span>{choice === option ? (option === question.cantonese ? "✓" : "×") : "○"}</span>{option}</button><CantoneseAudio text={option} label={`播放：${option}`} compact /></div>)}{choice && <div className={`practice-feedback ${correct ? "correct" : "incorrect"}`}><b>{correct ? "啱！" : `答案是：${question.cantonese}`}</b><code>{question.jyutping}</code><span>{question.note}</span></div>}{choice && <button className="next-question" onClick={next} type="button">下一题 <span>→</span></button>}</div>
      </section>
      <section className="practice-method page-shell"><p className="eyebrow">WHY THIS ORDER / 为什么这样练</p><p>先从普通话意义主动回忆，再听粤语选项，最后看粤拼和解释。答错会缩短下一次复习间隔，答对会逐步拉长。</p><a href="/review">去复习中心查看安排 →</a></section>
    </main>
  );
}
