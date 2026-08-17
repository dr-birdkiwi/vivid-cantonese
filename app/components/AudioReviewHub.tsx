"use client";

import { useEffect, useMemo, useState } from "react";
import { CantoneseAudio, CantoneseAudioSettings } from "./CantoneseAudio";
import { SiteHeader } from "./SiteHeader";
import { studyItems } from "../data/study-data";
import { getDueIds, getMasteryLabel, readLearningRecords, recordAnswer, type LearningRecord } from "../lib/learning-store";
import { sitePath } from "../lib/site-path";

type HubMode = "training" | "review";

const toneRows = [
  { tone: "1", jyutping: "si1", label: "高平", example: "詩", meaning: "诗", note: "高而平，保持稳定。" },
  { tone: "2", jyutping: "si2", label: "高升", example: "史", meaning: "史", note: "从中高位置向上升。" },
  { tone: "3", jyutping: "si3", label: "中平", example: "試", meaning: "试", note: "中位平稳，日常非常常见。" },
  { tone: "4", jyutping: "si4", label: "低降 / 低平", example: "時", meaning: "时", note: "低起，重心在低音区。" },
  { tone: "5", jyutping: "si5", label: "低升", example: "市", meaning: "市", note: "由低位向上，和第二声靠近。" },
  { tone: "6", jyutping: "si6", label: "低平", example: "事", meaning: "事", note: "低而平；入声字还要留意韵尾。" },
];

const soundRows = [
  { label: "普通话 w- → ng-", example: "我", jyutping: "ngo5", note: "我、五、外等高频字不能直接沿用普通话 w-。" },
  { label: "普通话 x- → h-", example: "学", jyutping: "hok6", note: "學还带 -k 韵尾；要把声母和韵尾一起听。" },
  { label: "保留塞音韵尾", example: "八", jyutping: "baat3", note: "-t 不是可有可无的尾音，八、六、十都值得成组练。" },
  { label: "粤语独有韵母", example: "女", jyutping: "neoi5", note: "eoi 不能用普通话的 ü 或 ou 近似带过。" },
  { label: "鼻音韵尾", example: "心", jyutping: "sam1", note: "-m、-n、-ng 要听清收尾位置。" },
  { label: "入声韵尾", example: "國", jyutping: "gwok3", note: "-k 使音节短促收住，不要把尾音拖长。" },
];

const listeningItems = [
  { id: "mou5", prompt: "普通话“没有”最自然的粤语是什么？", answer: "冇", jyutping: "mou5", options: ["冇", "無有", "唔有"], note: "冇 mou5 是日常口语的高频整词。" },
  { id: "ngo5", prompt: "哪一个读法对应“我”？", answer: "ngo5", jyutping: "ngo5", options: ["ngo5", "wo5", "o5"], note: "粤语我以 ng- 起首，普通话 w- 不能直接套用。" },
  { id: "hok6", prompt: "哪一个读法对应“学”？", answer: "hok6", jyutping: "hok6", options: ["hok6", "hok2", "haau6"], note: "學 hok6 的 -k 韵尾是普通话学习者常漏掉的部分。" },
  { id: "neoi5", prompt: "哪一个读法对应“女”？", answer: "neoi5", jyutping: "neoi5", options: ["neoi5", "nui5", "jyu5"], note: "eoi 是需要单独建立听觉记忆的粤语韵母。" },
];

const trainingSteps = [
  { number: "01", title: "先听整体", copy: "暂时不看粤语字和粤拼，先判断音高、长短和收尾。", tone: "coral" },
  { number: "02", title: "再做辨认", copy: "选择你听到的词或音，逼自己从声音里取回信息。", tone: "gold" },
  { number: "03", title: "最后复述", copy: "打开粤拼和解释，再听一遍，尝试跟着说出来。", tone: "mint" },
];

export function AudioReviewHub({ initialMode = "training" }: { initialMode?: HubMode }) {
  const [mode, setMode] = useState<HubMode>(initialMode);
  const [soundMode, setSoundMode] = useState<"tones" | "sounds">("tones");
  const [listenIndex, setListenIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [records, setRecords] = useState<Record<string, LearningRecord>>({});
  const [revealed, setRevealed] = useState<string[]>([]);

  useEffect(() => {
    const refresh = () => setRecords(readLearningRecords());
    refresh();
    window.addEventListener("vivid-cantonese-progress-changed", refresh);
    return () => window.removeEventListener("vivid-cantonese-progress-changed", refresh);
  }, []);

  const listening = listeningItems[listenIndex];
  const dueIds = useMemo(() => getDueIds(studyItems.map((item) => item.id), records), [records]);
  const dueItems = useMemo(() => dueIds.map((id) => studyItems.find((item) => item.id === id)).filter((item): item is (typeof studyItems)[number] => Boolean(item)).slice(0, 8), [dueIds]);
  const learnedCount = Object.keys(records).length;
  const masteredCount = Object.values(records).filter((record) => record.mastery === "mastered").length;
  const progress = Math.min(100, Math.round((learnedCount / studyItems.length) * 100));

  function chooseListening(option: string) {
    if (selected) return;
    setSelected(option);
    recordAnswer(`audio-${listening.id}`, option === listening.answer);
  }

  function nextListening() {
    setListenIndex((index) => (index + 1) % listeningItems.length);
    setSelected(null);
  }

  function jumpToSection(section: "tones" | "sounds") {
    setSoundMode(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function reveal(id: string) {
    setRevealed((items) => items.includes(id) ? items : [...items, id]);
  }

  function answer(id: string, correct: boolean) {
    recordAnswer(id, correct);
    setRecords(readLearningRecords());
    setRevealed((items) => items.filter((item) => item !== id));
  }

  function sourceHref(sourceSlug?: string, kind?: string) {
    if (sourceSlug) return sitePath(`/course/${sourceSlug}`);
    if (kind === "发音") return sitePath("/audio");
    if (kind === "语气") return sitePath("/bridge");
    return sitePath("/bridge");
  }

  return (
    <main className="subpage audio-review-page">
      <SiteHeader />
      <section className="subpage-hero page-shell compact audio-review-hero">
        <p className="eyebrow">LISTEN &amp; REMEMBER / 听辨与复习</p>
        <h1>听见差异，<br /><em>记得住，也说得出。</em></h1>
        <p>把新声音的辨认和旧内容的主动回忆放在同一条学习路径上：先听，后判断，再在下一次对话前回来。</p>
      </section>

      <section className="audio-review-overview page-shell" aria-label="听辨与复习学习路径">
        <div className="audio-review-overview-head">
          <div><p className="eyebrow">ONE LEARNING LOOP / 一条学习闭环</p><h2>今天学新的，<em>下次记得住。</em></h2></div>
          <p>听力训练负责建立新的声音记忆，间隔复习负责把它从“见过”变成“想得起来”。两个模式共用你的学习记录。</p>
        </div>
        <div className="audio-review-steps">
          <div><span>01</span><b>听辨</b><small>建立声音差异</small></div>
          <i aria-hidden="true">→</i>
          <div><span>02</span><b>回忆</b><small>主动说出答案</small></div>
          <i aria-hidden="true">→</i>
          <div><span>03</span><b>安排</b><small>下次适时回来</small></div>
        </div>
        <div className="audio-review-stats" aria-label="学习进度">
          <span>已建立记录 <b>{learnedCount}</b></span>
          <span>待复习 <b>{dueIds.length}</b></span>
          <span>已稳定 <b>{masteredCount}</b></span>
          <span>学习覆盖 <b>{progress}%</b></span>
        </div>
      </section>

      <section className="audio-review-switch page-shell" aria-label="选择学习模式">
        <button className={`audio-review-mode-card training${mode === "training" ? " active" : ""}`} type="button" aria-pressed={mode === "training"} onClick={() => setMode("training")}>
          <span className="mode-card-number">01</span><span className="mode-card-status">学新内容</span><strong>听力训练</strong><p>声调、韵尾、音韵规律和情景句。先听再判断，把“看得懂”推进到“听得出”。</p><span className="mode-card-action">开始一轮听辨 <b>→</b></span>
        </button>
        <button className={`audio-review-mode-card review${mode === "review" ? " active" : ""}`} type="button" aria-pressed={mode === "review"} onClick={() => setMode("review")}>
          <span className="mode-card-number">02</span><span className="mode-card-status">巩固旧内容 · {dueIds.length} 项到期</span><strong>到期复习</strong><p>先从普通话提示回忆粤语，再看答案和粤拼。每次判断都会影响下一次复习时间。</p><span className="mode-card-action">打开复习队列 <b>→</b></span>
        </button>
      </section>

      <div className="page-shell"><CantoneseAudioSettings /></div>

      {mode === "training" ? <>
        <section className="audio-training-guide page-shell">
          <div className="audio-training-guide-head"><div><p className="eyebrow">HOW TO PRACTICE / 训练方式</p><h2>每一轮都遵循同一个节奏。</h2></div><p>不要一开始就盯着粤拼。先让耳朵做判断，再用文字解释刚才听到的差异。</p></div>
          <div className="audio-training-guide-grid">{trainingSteps.map((step) => <article className={`audio-training-guide-card ${step.tone}`} key={step.number}><span>{step.number}</span><strong>{step.title}</strong><p>{step.copy}</p></article>)}</div>
        </section>

        <section id="tones" className="audio-lab-section page-shell">
          <div className="audio-lab-heading"><div><p className="eyebrow">SIX TONES / 六声调</p><h2>先抓音高轮廓，<em>不要只背数字。</em></h2></div><p>粤拼数字是记忆标签，不是普通话声调的直接换算。先听音高，再看 si1–si6。</p></div>
          <div className="tone-grid">{toneRows.map((row) => <article className="tone-card" key={row.tone}><div className="tone-card-top"><span>粤调 {row.tone}</span><b>{row.label}</b></div><strong>{row.example}</strong><code>{row.jyutping}</code><p>{row.meaning} · {row.note}</p><CantoneseAudio text={row.example} label={`播放：${row.example}`} compact /></article>)}</div>
        </section>

        <section id="sounds" className="audio-lab-section audio-sound-section page-shell">
          <div className="audio-lab-heading"><div><p className="eyebrow">SOUND MAP / 声音地图</p><h2>这些地方，<em>不要靠猜。</em></h2></div><p>把普通话迁移规则和例外放在一起，先听整字，再拆声母、韵母和韵尾。</p></div>
          <div className="sound-grid">{soundRows.map((row) => <article className="sound-card" key={row.example}><div><small>{row.label}</small><strong>{row.example}</strong><code>{row.jyutping}</code></div><p>{row.note}</p><CantoneseAudio text={row.example} label={`播放：${row.example}`} compact /></article>)}</div>
        </section>

        <section id="listening" className="audio-lab-section listening-section page-shell">
          <div className="audio-lab-heading"><div><p className="eyebrow">LISTENING CHECK / 听辨回合</p><h2>只听一次，<em>你听到哪个？</em></h2></div><p>先播放粤语，不要看答案；选择后才显示粤拼和解释。每次作答都会进入你的复习记录。</p></div>
          <div className="listening-card"><div className="listening-card-top"><span>{String(listenIndex + 1).padStart(2, "0")} / {String(listeningItems.length).padStart(2, "0")}</span><span>先听 → 选择 → 看粤拼 → 重听</span></div><p className="listening-prompt">{listening.prompt}</p><CantoneseAudio text={listening.answer} label={`播放听辨题：${listening.answer}`} /><div className="listening-options">{listening.options.map((option) => <button className={`listening-option${selected === option ? " selected" : ""}${selected && option === listening.answer ? " correct" : ""}`} key={option} onClick={() => chooseListening(option)} type="button"><span>{selected === option ? (option === listening.answer ? "✓" : "×") : "○"}</span>{option}</button>)}</div>{selected ? <div className={`listening-feedback ${selected === listening.answer ? "correct" : "incorrect"}`}><b>{selected === listening.answer ? "啱，听得好。" : `答案是 ${listening.answer}。`}</b><code>{listening.jyutping}</code><p>{listening.note}</p><CantoneseAudio text={listening.answer} label={`重听：${listening.answer}`} compact /></div> : null}<div className="listening-actions"><button className={`lab-tab${soundMode === "tones" ? " active" : ""}`} onClick={() => jumpToSection("tones")} type="button">声调卡</button><button className={`lab-tab${soundMode === "sounds" ? " active" : ""}`} onClick={() => jumpToSection("sounds")} type="button">声音地图</button>{selected ? <button className="primary-button" onClick={nextListening} type="button">下一题 <span>→</span></button> : null}</div></div>
        </section>
      </> : <section className="review-layout page-shell">
        <aside className="review-progress"><div><span>已建立学习记录</span><b>{progress}%</b></div><div className="progress-track"><span style={{ width: `${progress}%` }} /></div><div className="review-stat-row"><span>待复习 <b>{dueIds.length}</b></span><span>已稳定 <b>{masteredCount}</b></span></div><p>{dueIds.length ? "先看普通话，尽量在脑中说出粤语，再点击显示答案。" : "今天没有到期词条；可以切回听力训练，建立新的声音记录。"}</p><button className="secondary-mode-button" type="button" onClick={() => setMode("training")}>去听力训练 <span>→</span></button></aside>
        <div className="review-list"><div className="review-list-head"><b>现在该复习什么</b><small>按到期时间和学习状态排列 · 显示前 8 项</small></div>{dueItems.length ? dueItems.map((item) => { const isRevealed = revealed.includes(item.id); const record = records[item.id]; return <article className="review-card" key={item.id}><div className="review-card-top"><span>{item.kind}</span><small>{getMasteryLabel(record?.mastery)} · {item.source}</small></div><p className="review-prompt">普通话提示：<strong>{item.mandarin}</strong></p>{isRevealed ? <div className="review-answer"><strong>{item.cantonese}</strong><code>{item.jyutping}</code><p>{item.note}</p><CantoneseAudio text={item.cantonese} label={`播放：${item.cantonese}`} compact /><div className="review-rating"><button type="button" onClick={() => answer(item.id, false)}>再来一次</button><button type="button" onClick={() => answer(item.id, true)}>我记住了</button></div></div> : <button className="review-reveal" type="button" onClick={() => reveal(item.id)}>显示粤语答案 <span>→</span></button>}<a className="review-source" href={sourceHref(item.sourceSlug, item.kind)}>回到来源：{item.source} ↗</a></article>; }) : <div className="review-empty"><strong>这一轮复习清空了。</strong><p>切回听力训练建立新的记录，或者去情景课程学习更多真实对话。</p><button type="button" onClick={() => setMode("training")}>去听力训练 →</button></div>}</div>
      </section>}

      <section className="audio-review-bottom page-shell"><div><p className="eyebrow">KEEP THE LOOP GOING / 继续学习</p><h2>{mode === "training" ? "听完这一轮，下一次回来复习。" : "复习之后，再去听新的差异。"}</h2></div><button className="primary-button" type="button" onClick={() => setMode(mode === "training" ? "review" : "training")}>{mode === "training" ? "打开到期复习" : "开始听力训练"} <span>→</span></button></section>
    </main>
  );
}
