"use client";

import { useEffect, useMemo, useState } from "react";
import { CantoneseAudio, CantoneseAudioSettings } from "../components/CantoneseAudio";
import { SiteHeader } from "../components/SiteHeader";
import { studyItems, type StudyItem } from "../data/study-data";
import { getDueIds, getMasteryLabel, readLearningRecords, recordAnswer, type LearningRecord } from "../lib/learning-store";
import { sitePath } from "../lib/site-path";

type ReviewMode = "recall" | "listen" | "scene";
type SourceFilter = "all" | "scene" | "bridge" | "audio";

const reviewModes: Array<{ id: ReviewMode; number: string; label: string; title: string; copy: string; action: string; tone: string }> = [
  { id: "recall", number: "01", label: "主动回忆", title: "先看普通话，再说粤语", copy: "把答案藏起来，先在脑中完成一次转换。", action: "开始回忆", tone: "coral" },
  { id: "listen", number: "02", label: "听力辨认", title: "先听声音，再找答案", copy: "把已经学过的粤语句子重新放回耳朵里。", action: "开始听辨", tone: "mint" },
  { id: "scene", number: "03", label: "场景回放", title: "把句子放回原来的任务", copy: "从茶餐厅、工作或交通场景重新想起它为什么这样说。", action: "回放场景", tone: "gold" },
];

const sourceFilters: Array<{ id: SourceFilter; label: string }> = [
  { id: "all", label: "全部内容" },
  { id: "scene", label: "情景课程" },
  { id: "bridge", label: "转换桥与语法" },
  { id: "audio", label: "听力实验室" },
];

const strategyCards = [
  { number: "01", title: "先猜，不要先看", copy: "哪怕只想起一个字，也比直接打开答案更能建立记忆线索。", tone: "coral" },
  { number: "02", title: "答案要连同声音记", copy: "看粤语字、读粤拼、听一次，再把整句放回场景。", tone: "mint" },
  { number: "03", title: "按难度诚实评分", copy: "“再来一次”不是失败，而是告诉系统这张卡应该更早回来。", tone: "gold" },
];

function isAudioItem(item: StudyItem) {
  return item.kind === "发音" || item.source === "声音地图" || item.source === "六声调";
}

function matchesSource(item: StudyItem, filter: SourceFilter) {
  if (filter === "all") return true;
  if (filter === "scene") return Boolean(item.sourceSlug);
  if (filter === "audio") return isAudioItem(item);
  return !item.sourceSlug && !isAudioItem(item);
}

export default function ReviewPage() {
  const [records, setRecords] = useState<Record<string, LearningRecord>>({});
  const [revealed, setRevealed] = useState<string[]>([]);
  const [mode, setMode] = useState<ReviewMode>("recall");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");

  useEffect(() => {
    const refresh = () => setRecords(readLearningRecords());
    refresh();
    window.addEventListener("vivid-cantonese-progress-changed", refresh);
    return () => window.removeEventListener("vivid-cantonese-progress-changed", refresh);
  }, []);

  const activeItems = useMemo(() => studyItems.filter((item) => !item.sourceSlug || Boolean(records[item.id])), [records]);
  const dueIds = useMemo(() => getDueIds(activeItems.map((item) => item.id), records), [activeItems, records]);
  const dueItems = useMemo(() => dueIds
    .map((id) => activeItems.find((item) => item.id === id))
    .filter((item): item is StudyItem => Boolean(item))
    .sort((left, right) => {
      const leftRecord = records[left.id];
      const rightRecord = records[right.id];
      const leftQueued = Boolean(leftRecord);
      const rightQueued = Boolean(rightRecord);
      if (leftQueued !== rightQueued) return Number(rightQueued) - Number(leftQueued);
      return (rightRecord?.updatedAt || 0) - (leftRecord?.updatedAt || 0);
    }), [activeItems, dueIds, records]);
  const reviewItems = useMemo(() => {
    const filtered = dueItems.filter((item) => matchesSource(item, sourceFilter));
    const modeFiltered = mode === "listen" ? filtered.filter(isAudioItem) : mode === "scene" ? filtered.filter((item) => Boolean(item.sourceSlug)) : filtered;
    return modeFiltered.slice(0, 12);
  }, [dueItems, mode, sourceFilter]);
  const learnedCount = activeItems.filter((item) => Boolean(records[item.id])).length;
  const masteredCount = activeItems.filter((item) => records[item.id]?.mastery === "mastered").length;
  const linkedCourseItems = activeItems.filter((item) => item.sourceSlug);
  const linkedScenes = new Set(linkedCourseItems.map((item) => item.sourceSlug)).size;
  const newCount = dueItems.filter((item) => !records[item.id] || records[item.id]?.mastery === "new").length;
  const audioDueCount = dueItems.filter(isAudioItem).length;
  const sceneDueCount = dueItems.filter((item) => Boolean(item.sourceSlug)).length;
  const progress = activeItems.length ? Math.min(100, Math.round((learnedCount / activeItems.length) * 100)) : 0;
  const selectedMode = reviewModes.find((item) => item.id === mode) || reviewModes[0];

  function selectMode(nextMode: ReviewMode) {
    setMode(nextMode);
    setRevealed([]);
  }

  function selectSource(nextSource: SourceFilter) {
    setSourceFilter(nextSource);
    setRevealed([]);
  }

  function reveal(id: string) {
    setRevealed((items) => items.includes(id) ? items : [...items, id]);
  }

  function answer(id: string, correct: boolean) {
    recordAnswer(id, correct);
    setRevealed((items) => items.filter((itemId) => itemId !== id));
    setRecords(readLearningRecords());
  }

  function sourceHref(sourceSlug?: string, kind?: string) {
    if (sourceSlug) return sitePath(`/course/${sourceSlug}`);
    if (kind === "发音") return sitePath("/audio");
    if (kind === "语气") return sitePath("/bridge");
    return sitePath("/bridge");
  }

  function emptyMessage() {
    if (mode === "scene" && !linkedScenes) return "完成一个情景课程后，在场景页底部加入复习，这里就会出现完整对话和进阶挑战。";
    if (mode === "listen" && !audioDueCount) return "当前没有到期的听力卡。可以先去听力实验室建立一轮新的声音记录。";
    if (sourceFilter !== "all") return "这个来源目前没有到期内容，换一个来源或先继续学习。";
    return "这一轮复习清空了。继续完成课程或听力练习，新的内容会在这里回来。";
  }

  return (
    <main className="subpage review-page">
      <SiteHeader />
      <section className="subpage-hero page-shell compact"><p className="eyebrow">REVIEW CENTER / 复习中心</p><h1>复习不是翻答案，<br /><em>是把它重新想出来。</em></h1><p>普通话转换桥、听力实验室和你在情景课程中主动加入的内容，会在这里汇合。每一轮都先回忆，再听声音，最后回到它原本的生活场景。</p></section>
      <div className="page-shell"><CantoneseAudioSettings /></div>

      <section className="review-methods page-shell">
        <div className="review-methods-head"><div><p className="eyebrow">THREE WAYS / 三种复习动作</p><h2>同一张卡，<em>换一种方式再遇见。</em></h2></div><p>只认得答案不等于会用。主动回忆、听力辨认和场景回放，分别训练你说出、听出和用出粤语。</p></div>
        <div className="review-mode-grid">{reviewModes.map((reviewMode) => <button className={`review-mode-card ${reviewMode.tone}${mode === reviewMode.id ? " active" : ""}`} key={reviewMode.id} type="button" onClick={() => selectMode(reviewMode.id)}><div className="review-mode-top"><span>{reviewMode.number}</span><small>{mode === reviewMode.id ? "当前模式" : reviewMode.label}</small></div><strong>{reviewMode.title}</strong><p>{reviewMode.copy}</p><span className="review-mode-action">{reviewMode.action} <b>→</b></span></button>)}</div>
      </section>

      <section className="review-layout page-shell">
        <aside className="review-progress">
          <div><span>已建立学习记录</span><b>{progress}%</b></div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <div className="review-stat-row"><span>待复习 <b>{dueIds.length}</b></span><span>已稳定 <b>{masteredCount}</b></span><span>已关联场景 <b>{linkedScenes}</b></span></div>
          <div className="review-breakdown"><div><span>新加入</span><b>{newCount}</b></div><div><span>听力卡</span><b>{audioDueCount}</b></div><div><span>场景卡</span><b>{sceneDueCount}</b></div></div>
          <p>{dueIds.length ? "先看提示，尽量在脑中说出粤语，再打开答案。每次只练一小组，记忆会更稳。" : "今天没有到期词条；可以去场景课程或听力实验室继续建立新记录。"}</p>
          <a className="primary-button" href={sitePath("/course")}>继续学新场景 <span>→</span></a>
          <div className="review-connection-card"><span>场景关联</span><strong>{linkedScenes ? `已连接 ${linkedScenes} 个场景` : "还没有连接场景"}</strong><p>{linkedScenes ? "你在课程中加入的词汇、句型和挑战，会带着来源回到这里。" : "完成课程后，点击“加入复习”，复习会自动知道它来自哪一场。"}</p><a href={sitePath(linkedScenes ? "/course" : "/course")}>{linkedScenes ? "继续扩展场景 →" : "去完成一个场景 →"}</a></div>
        </aside>

        <div className="review-list">
          <div className="review-list-head"><div><b>现在该复习什么</b><small>{selectedMode.label} · 显示 {reviewItems.length} / {dueItems.length} 项</small></div><span className="review-list-count">{reviewItems.length.toString().padStart(2, "0")}</span></div>
          <div className="review-filter-row"><span>按来源</span>{sourceFilters.map((filter) => <button className={sourceFilter === filter.id ? "active" : ""} key={filter.id} type="button" onClick={() => selectSource(filter.id)}>{filter.label}</button>)}</div>
          {reviewItems.length ? reviewItems.map((item) => {
            const isRevealed = revealed.includes(item.id);
            const record = records[item.id];
            return <article className="review-card" key={item.id}>
              <div className="review-card-top"><span>{item.kind}</span><small>{getMasteryLabel(record?.mastery)} · {item.source}</small></div>
              {mode === "listen" ? <div className="review-audio-prompt"><div><span>先听粤语</span><strong>不要看文字，先听两次。</strong><p>听完后，猜它对应的普通话意思。</p></div><CantoneseAudio text={item.cantonese} label={`播放复习音频：${item.cantonese}`} compact /></div> : mode === "scene" ? <div className="review-scene-prompt"><span>场景线索 · {item.source}</span><strong>{item.mandarin}</strong><p>想一想：这句话在什么任务回合里会用到？</p></div> : <p className="review-prompt">普通话提示：<strong>{item.mandarin}</strong></p>}
              {isRevealed ? <div className="review-answer"><div className="review-answer-main"><strong>{item.cantonese}</strong><code>{item.jyutping}</code></div><CantoneseAudio text={item.cantonese} label={`播放：${item.cantonese}`} compact /><p className="review-answer-meaning">普通话：{item.mandarin}</p><p>{item.note}</p><div className="review-rating"><button type="button" onClick={() => answer(item.id, false)}>再来一次</button><button type="button" onClick={() => answer(item.id, true)}>我记住了</button></div></div> : <button className="review-reveal" type="button" onClick={() => reveal(item.id)}>{mode === "listen" ? "显示普通话答案" : "显示粤语答案"} <span>→</span></button>}
              <a className="review-source" href={sourceHref(item.sourceSlug, item.kind)}>回到来源：{item.source} ↗</a>
            </article>;
          }) : <div className="review-empty"><strong>{mode === "scene" && !linkedScenes ? "先把一个场景带回来。" : mode === "listen" && !audioDueCount ? "先建立一轮听力记忆。" : "这一轮复习清空了。"}</strong><p>{emptyMessage()}</p><a href={sitePath(mode === "listen" ? "/audio" : "/course")}>{mode === "listen" ? "去听力实验室 →" : "去情景课程 →"}</a></div>}
        </div>
      </section>

      <section className="review-strategy page-shell"><div className="review-strategy-head"><div><p className="eyebrow">HOW TO REVIEW / 复习方法</p><h2>每次复习，完成三个动作。</h2></div><p>把“我看过”变成“我可以在没有提示时说出来”。复习的目标不是清空列表，而是让下一次对话少一个停顿。</p></div><div className="review-strategy-grid">{strategyCards.map((card) => <article className={`review-strategy-card ${card.tone}`} key={card.number}><span>{card.number}</span><strong>{card.title}</strong><p>{card.copy}</p></article>)}</div></section>
    </main>
  );
}
