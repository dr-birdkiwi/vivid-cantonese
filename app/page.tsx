"use client";

import { useMemo, useState } from "react";
import { CantoneseAudio, CantoneseAudioSettings } from "./components/CantoneseAudio";
import { SiteHeader } from "./components/SiteHeader";
import { sitePath } from "./lib/site-path";

type BridgeEntry = {
  mandarin: string;
  cantonese: string;
  jyutping: string;
  note: string;
  tag: string;
  example: string;
};

const bridgeEntries: BridgeEntry[] = [
  { mandarin: "没有", cantonese: "冇", jyutping: "mou5", note: "日常口语最常见的替换词。", tag: "口语替换", example: "我而家冇時間。" },
  { mandarin: "不", cantonese: "唔", jyutping: "m4", note: "普通话的“不”通常不能直接读成粤语。", tag: "口语替换", example: "我唔知。" },
  { mandarin: "是", cantonese: "係", jyutping: "hai6", note: "判断句、确认和“是不是”中的核心词。", tag: "核心词", example: "係咪你呀？" },
  { mandarin: "在", cantonese: "喺", jyutping: "hai2", note: "表示地点，不要和“係”混淆。", tag: "核心词", example: "我喺公司。" },
  { mandarin: "现在", cantonese: "而家", jyutping: "ji4 gaa1", note: "高频整词记忆，不能只按汉字读音推。", tag: "必须记", example: "而家方便講電話嗎？" },
  { mandarin: "喜欢", cantonese: "鍾意", jyutping: "zung1 ji3", note: "比直译“喜歡”更自然的日常说法。", tag: "自然表达", example: "你鍾意食辣嘢嗎？" },
  { mandarin: "东西", cantonese: "嘢", jyutping: "je5", note: "泛指东西、事情或某种内容。", tag: "口语替换", example: "呢啲嘢幾好食。" },
  { mandarin: "哪里", cantonese: "邊度", jyutping: "bin1 dou6", note: "香港日常问地点的常用词组。", tag: "疑问词", example: "你而家喺邊度？" },
  { mandarin: "为什么", cantonese: "點解", jyutping: "dim2 gaai2", note: "比书面“為什麼”更口语。", tag: "疑问词", example: "你點解唔食飯？" },
  { mandarin: "等一下", cantonese: "等陣", jyutping: "dang2 zan6", note: "适合电话、排队和短暂等待。", tag: "场景短语", example: "等陣先，我未準備好。" },
  { mandarin: "是不是", cantonese: "係咪", jyutping: "hai6 mai6", note: "高频的是非问句格式。", tag: "句式", example: "你係咪第一次嚟？" },
  { mandarin: "可以吗", cantonese: "得唔得", jyutping: "dak1 m4 dak1", note: "询问可行性、许可或是否妥当。", tag: "句式", example: "聽日三點見，得唔得？" },
];

const scenes = [
  { number: "01", slug: "repair-the-conversation", label: "听不清时", title: "先把对话接回来", copy: "请对方慢一点、再说一次，确认自己有没有听错。", phrase: "唔好意思，可唔可以再講一次？", jyutping: "m4 hou2 ji3 si1, ho2 m4 ho2 ji5 zoi3 gong2 jat1 ci3?", color: "coral" },
  { number: "02", slug: "cha-chaan-teng", label: "茶餐厅", title: "点餐不再只会指菜单", copy: "从早餐、饮品、加冰到打包，练习真正会遇到的细节。", phrase: "唔該，一個奶茶，少甜。", jyutping: "m4 goi1, jat1 go3 naai5 caa4, siu2 tim4.", color: "gold" },
  { number: "03", slug: "transport-and-directions", label: "交通", title: "听懂司机和站名", copy: "问路线、转车、落车和“还有几站”，把移动变成可控任务。", phrase: "呢架車去唔去尖沙咀？", jyutping: "ni1 gaa3 ce1 heoi3 m4 heoi3 zim1 saa1 zeoi2?", color: "mint" },
  { number: "04", slug: "work-communication", label: "工作沟通", title: "把请求说得清楚", copy: "跟同事确认进度、改时间、交接任务，也理解香港职场的语气。", phrase: "我遲啲再覆你。", jyutping: "ngo5 ci4 di1 zoi3 fuk1 nei5.", color: "blue" },
  { number: "05", slug: "shopping-and-returns", label: "买东西", title: "付款、找续和退换", copy: "从“有冇細一點”到“可唔可以換”，覆盖商店里最实用的回合。", phrase: "有冇平啲嘅款？", jyutping: "jau5 mou5 peng4 di1 ge3 fun2?", color: "violet" },
  { number: "06", slug: "social-updates", label: "日常社交", title: "听出话外的语气", copy: "用语气词和回应方式区分客气、亲密、惊讶和轻微不满。", phrase: "係咩？我真係唔知喎。", jyutping: "hai6 me1? ngo5 zan1 hai6 m4 zi1 wo3.", color: "peach" },
];

const grammarCards = [
  { symbol: "咗", title: "状态已经发生", copy: "唔好只翻译成“了”，先看动作完成，还是状态改变。", example: "我食咗飯喇。" },
  { symbol: "緊", title: "动作正在进行", copy: "把“正在”放进真实对话：工作、等人、落雨都能用。", example: "我等緊你。" },
  { symbol: "嘅", title: "所属、解释与确认", copy: "同一个字会进入名词短语，也会在句尾改变语气。", example: "呢個係我嘅。" },
  { symbol: "喎", title: "新信息和提醒", copy: "普通话里没有完全对应的一个字，要从语境和语调理解。", example: "佢今日放假喎。" },
];

const featureCards = [
  { number: "01", label: "转换桥", title: "普通话 → 自然粤语", copy: "先看高频读音规律，再识别冇、唔、而家这类不能逐字搬运的口语词。", link: "试试转换桥", href: "#bridge", tone: "coral" },
  { number: "02", label: "情景课程", title: "用完整对话办成事", copy: "从茶餐厅、交通到职场沟通，练习开口、追问、处理意外和自然收尾。", link: "浏览真实场景", href: "#scenes", tone: "gold" },
  { number: "03", label: "听辨与复习", title: "听见差异，也记得住", copy: "用粤拼、短音对比和主动回忆，把“看懂”推进到真正听得出、说得出。", link: "进入听辨与复习", href: "/audio", tone: "mint" },
];

const SpeakButton = CantoneseAudio;

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="section-intro"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><p>{copy}</p></div>;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedBridge, setSelectedBridge] = useState(bridgeEntries[0]);
  const [practiceChoice, setPracticeChoice] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("vivid-cantonese-progress") || "[]"); } catch { return []; }
  });

  function complete(id: string) {
    setCompleted((current) => {
      const next = current.includes(id) ? current : [...current, id];
      localStorage.setItem("vivid-cantonese-progress", JSON.stringify(next));
      return next;
    });
  }

  const filteredBridge = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return bridgeEntries;
    return bridgeEntries.filter((entry) => [entry.mandarin, entry.cantonese, entry.jyutping, entry.tag].join(" ").toLowerCase().includes(normalized));
  }, [query]);

  const practiceCorrect = practiceChoice === "你想飲咩？";

  return (
    <main>
      <SiteHeader home />

      <section className="hero feature-hero" id="top">
        <div className="hero-copy"><div className="hero-kicker"><span className="live-dot" /> 香港粤语 · Jyutping · 口语优先</div><h1>不是学一套新中文，<br /><em>是把会的中文说成粤语。</em></h1><p className="hero-lede">为已经读得懂中文的普通话使用者设计。把读音规律、口语替换、真实场景和听力反馈放在同一条学习路径上。</p><div className="hero-actions"><a className="primary-button" href="#features">认识三大功能 <span>→</span></a><a className="secondary-link" href="#bridge">直接试转换桥 <span>↓</span></a></div><div className="hero-proof"><span>✦</span><strong>从看得懂，到听得出，再到说得自然</strong></div></div>
        <div className="hero-feature-preview" aria-label="粤语学习系统概览"><div className="hero-preview-head"><div><p className="eyebrow">LEARNING SYSTEM / 学习系统</p><strong>三步，把听得懂变成说得出</strong></div><span>香港粤语</span></div><div className="hero-preview-flow"><div className="hero-step coral"><span>01</span><b>看懂规律</b><small>普通话 → 粤语</small><code>没有 → 冇 · mou5</code></div><div className="hero-step gold"><span>02</span><b>放进场景</b><small>完整对话 · 真实任务</small><code>唔該，一個奶茶。</code></div><div className="hero-step mint"><span>03</span><b>听出差异</b><small>粤拼 · 声调 · 语气</small><code>我而家冇時間。</code></div></div><div className="hero-preview-note"><span>给普通话使用者的学习优势</span><p>不重新教你认字，专门解释“为什么香港人会这样说”。</p></div></div>
      </section>

      <section className="feature-overview page-shell" id="features"><div className="feature-overview-heading"><div><p className="eyebrow">ONE SITE / 三个核心入口</p><h2>所有功能，都指向同一件事：<em>自然开口。</em></h2></div><p>先用你已经掌握的普通话建立桥，再把词放入完整对话，最后用声音确认自己真的听见和说出了差异。</p></div><div className="feature-card-grid">{featureCards.map((feature) => <a className={`feature-card ${feature.tone}`} href={sitePath(feature.href)} key={feature.number}><div className="feature-card-top"><span>{feature.number}</span><small>{feature.label}</small></div><h3>{feature.title}</h3><p>{feature.copy}</p><span className="feature-card-link">{feature.link} <b>→</b></span></a>)}</div><div className="feature-proof-row"><span>普通话使用者专属</span><span>·</span><span>完整粤拼</span><span>·</span><span>每个粤语句子都可以试听</span></div></section>

      <section className="home-audio-feature page-shell"><div className="home-audio-heading"><div><p className="eyebrow">VOICE CONTROL / 声音选择</p><h2>选择你真正听得顺耳的粤语。</h2></div><p>设备如果安装了多个香港粤语音色，可以在这里展开、试听并选择。之后全站播放都会使用你的选择。</p></div><CantoneseAudioSettings /></section>

      <section className="bridge-section page-shell" id="bridge"><SectionIntro eyebrow="THE MANDARIN BRIDGE / 你的优势" title="别从零开始。先找到普通话和粤语的分岔口。" copy="输入一个你每天会说的普通话词，看看粤语里是同一个字、另一个读法，还是必须换成真正的口语词。" /><div className="bridge-lab"><div className="bridge-search-panel"><div className="search-heading"><span>普通话词库</span><small>{filteredBridge.length} 个结果</small></div><label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="试试：没有、喜欢、为什么…" aria-label="搜索普通话词语" /></label><div className="bridge-results">{filteredBridge.map((entry) => <div className="bridge-result-wrap" key={entry.mandarin}><button className={`bridge-result${selectedBridge.mandarin === entry.mandarin ? " active" : ""}`} onClick={() => setSelectedBridge(entry)} type="button"><span>{entry.mandarin}</span><b>{entry.cantonese}</b><small>{entry.tag}</small></button><SpeakButton text={entry.cantonese} label={`播放：${entry.cantonese}`} compact /></div>)}</div></div><div className="bridge-detail"><div className="detail-top"><span className="detail-tag">{selectedBridge.tag}</span><span className="detail-rule">普通话 → 自然粤语</span></div><div className="mapping-row"><div><small>普通话</small><strong>{selectedBridge.mandarin}</strong></div><span className="mapping-arrow">→</span><div className="cantonese-answer"><small>粤语口语</small><strong>{selectedBridge.cantonese}</strong></div></div><div className="detail-jyutping"><span>粤拼</span><b>{selectedBridge.jyutping}</b><SpeakButton text={selectedBridge.cantonese} label={`播放：${selectedBridge.cantonese}`} /></div><p className="detail-note">{selectedBridge.note}</p><div className="example-box"><span>放进一句话</span><b>{selectedBridge.example}</b><SpeakButton text={selectedBridge.example} label={`播放：${selectedBridge.example}`} compact /><small>{selectedBridge.example === "我而家冇時間。" ? "我现在没有时间。" : "先听整体，再拆开看每个词。"}</small></div><button className="save-button" onClick={() => complete("bridge")} type="button">{completed.includes("bridge") ? "转换桥已完成 ✓" : "把这一组加入今日复习 →"}</button></div></div></section>

      <section className="scenes-section" id="scenes"><div className="page-shell"><SectionIntro eyebrow="REAL LIFE / 真实场景" title="你不是为了背词，是为了把一件事办成。" copy="每个场景都从完整对话出发：开口、追问、处理意外，再自然结束互动。" /><div className="scene-grid">{scenes.map((scene) => <article className={`scene-card ${scene.color}`} key={scene.number}><div className="scene-head"><span>{scene.number}</span><small>{scene.label}</small></div><h3>{scene.title}</h3><p>{scene.copy}</p><div className="scene-phrase"><b>{scene.phrase}</b><small>{scene.jyutping}</small><SpeakButton text={scene.phrase} label={`播放：${scene.phrase}`} /></div><div className="scene-actions"><a className="scene-link" href={sitePath(`/course/${scene.slug}`)}>打开场景 →</a><button className="scene-complete" onClick={() => complete(`scene-${scene.number}`)} type="button">{completed.includes(`scene-${scene.number}`) ? "已加入学习 ✓" : "加入学习"}</button></div></article>)}</div></div></section>

      <section className="grammar-section page-shell"><SectionIntro eyebrow="SPOKEN GRAMMAR / 口语语法" title="真正让粤语听起来像粤语的，常常不是名词。" copy="咗、緊、嘅、喎这些小词，会改变动作的时间、信息的新旧和说话人的态度。" /><div className="grammar-grid">{grammarCards.map((card) => <article className="grammar-card" key={card.symbol}><div className="grammar-symbol">{card.symbol}</div><div><h3>{card.title}</h3><p>{card.copy}</p><div className="grammar-example"><b>{card.example}</b><SpeakButton text={card.example} label={`播放：${card.example}`} compact /></div></div></article>)}</div><div className="grammar-callout"><span className="callout-mark">?</span><div><b>普通话使用者的隐藏难点</b><p>“我听懂了每个字，但还是不知道对方是在陈述、提醒，还是反问。”语气实验室会把这些差异单独拆开。</p></div><a href="#practice">去练习 <span>↗</span></a></div></section>

      <section className="practice-section page-shell" id="practice"><div className="practice-card"><div className="practice-copy"><p className="eyebrow">QUICK CHECK / 立即反应</p><h2>“你想喝什么？”<br /><em>自然粤语怎么说？</em></h2><p>先不看答案，凭直觉选一句。答错也没关系，错的地方就是下一轮复习入口。</p></div><div className="practice-options">{["你想飲咩？", "你想喝什么？", "你想飲乜嘢呀？"].map((choice) => <div className="practice-option-row" key={choice}><button className={`practice-option${practiceChoice === choice ? " selected" : ""}`} onClick={() => { setPracticeChoice(choice); complete("practice"); }} type="button"><span>{practiceChoice === choice ? (choice === "你想飲咩？" ? "✓" : "×") : "○"}</span>{choice}</button><SpeakButton text={choice} label={`播放：${choice}`} compact /></div>)}{practiceChoice && <div className={`practice-feedback ${practiceCorrect ? "correct" : "incorrect"}`}><b>{practiceCorrect ? "啱！" : "再听一次。"}</b><span>{practiceCorrect ? "咩 me1 是很常用的口语疑问词。" : "日常口语里，咩 / 乜嘢会比普通话词序更自然。"}</span></div>}</div></div></section>

      <footer className="site-footer page-shell"><div><a className="brand footer-brand" href="#top"><span className="brand-mark">粵</span><span><strong>粤语鲜活学堂</strong><small>Vivid Cantonese</small></span></a><p>为普通话使用者，把看得懂的中文变成说得出的粤语。</p></div><div className="footer-links"><a href="#bridge">普通话 → 粤语</a><a href="#scenes">真实场景</a><a href="#practice">立即反应</a></div><span className="footer-note">香港粤语 · Jyutping</span></footer>
    </main>
  );
}
