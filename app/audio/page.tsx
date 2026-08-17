"use client";

import { useState } from "react";
import { CantoneseAudio, CantoneseAudioSettings } from "../components/CantoneseAudio";
import { SiteHeader } from "../components/SiteHeader";
import { recordAnswer } from "../lib/learning-store";

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

export default function AudioPage() {
  const [mode, setMode] = useState<"tones" | "sounds">("tones");
  const [listenIndex, setListenIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const listening = listeningItems[listenIndex];

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
    setMode(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="subpage audio-lab-page">
      <SiteHeader />
      <section className="subpage-hero page-shell compact"><p className="eyebrow">AUDIO LAB / 听力实验室</p><h1>先听见差异，<br /><em>再把它说出来。</em></h1><p>普通话使用者最容易卡在声调、韵尾和少数不规则映射。这里用短而集中的听辨回合，建立“听到—辨认—复述”的路径。</p></section>
      <div className="page-shell"><CantoneseAudioSettings /></div>

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
        <div className="listening-card"><div className="listening-card-top"><span>{String(listenIndex + 1).padStart(2, "0")} / {String(listeningItems.length).padStart(2, "0")}</span><span>先听 → 选择 → 看粤拼 → 重听</span></div><p className="listening-prompt">{listening.prompt}</p><CantoneseAudio text={listening.answer} label={`播放听辨题：${listening.answer}`} /><div className="listening-options">{listening.options.map((option) => <button className={`listening-option${selected === option ? " selected" : ""}${selected && option === listening.answer ? " correct" : ""}`} key={option} onClick={() => chooseListening(option)} type="button"><span>{selected === option ? (option === listening.answer ? "✓" : "×") : "○"}</span>{option}</button>)}</div>{selected ? <div className={`listening-feedback ${selected === listening.answer ? "correct" : "incorrect"}`}><b>{selected === listening.answer ? "啱，听得好。" : `答案是 ${listening.answer}。`}</b><code>{listening.jyutping}</code><p>{listening.note}</p><CantoneseAudio text={listening.answer} label={`重听：${listening.answer}`} compact /></div> : null}<div className="listening-actions"><button className={`lab-tab${mode === "tones" ? " active" : ""}`} onClick={() => jumpToSection("tones")} type="button">声调卡</button><button className={`lab-tab${mode === "sounds" ? " active" : ""}`} onClick={() => jumpToSection("sounds")} type="button">声音地图</button>{selected ? <button className="primary-button" onClick={nextListening} type="button">下一题 <span>→</span></button> : null}</div></div>
      </section>
    </main>
  );
}
