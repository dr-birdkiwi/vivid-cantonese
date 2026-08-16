"use client";

import Link from "next/link";
import { useState } from "react";

const questions = [
  { prompt: "你想喝什么？", answer: "你想飲咩？", options: ["你想飲咩？", "你想喝什么？", "你想飲乜嘢呀？"], note: "咩 me1 是很常用的口语疑问词。" },
  { prompt: "我现在没有时间。", answer: "我而家冇時間。", options: ["我而家冇時間。", "我現在唔時間。", "我喺而家冇時間。"], note: "而家 = 现在；冇 = 没有。" },
  { prompt: "是不是你？", answer: "係咪你呀？", options: ["是唔是你呀？", "係咪你呀？", "係你唔係？"], note: "係咪是非常高频的是非问句格式。" },
];

export default function PracticePage() {
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const question = questions[index];
  const correct = choice === question.answer;

  function next() { setIndex((index + 1) % questions.length); setChoice(null); }

  return <main className="subpage practice-page"><header className="subpage-header"><Link className="brand" href="/"><span className="brand-mark">粵</span><span><strong>粤语鲜活学堂</strong><small>Vivid Cantonese</small></span></Link><Link className="back-link" href="/">← 回到首页</Link></header><section className="subpage-hero page-shell compact"><p className="eyebrow">QUICK PRACTICE / 立即反应</p><h1>先凭直觉选，<br /><em>再看差异在哪里。</em></h1><p>练习不是为了考你记住多少，而是让你在真实对话里更快找到下一句。</p></section><section className="practice-page-card page-shell"><div className="question-side"><span className="question-count">{String(index + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}</span><p>普通话</p><h2>“{question.prompt}”</h2><div className="practice-dots">{questions.map((_, item) => <i className={item === index ? "active" : ""} key={item} />)}</div></div><div className="answer-side"><p className="answer-label">自然粤语怎么说？</p>{question.options.map((option) => <button className={`practice-option${choice === option ? " selected" : ""}`} key={option} onClick={() => setChoice(option)} type="button"><span>{choice === option ? (option === question.answer ? "✓" : "×") : "○"}</span>{option}</button>)}{choice && <div className={`practice-feedback ${correct ? "correct" : "incorrect"}`}><b>{correct ? "啱！" : "再听一次。"}</b><span>{question.note}</span></div>}{choice && <button className="next-question" onClick={next} type="button">下一题 <span>→</span></button>}</div></section></main>;
}
