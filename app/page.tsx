"use client";

import { CantoneseAudioSettings } from "./components/CantoneseAudio";
import { CantoneseLookup } from "./components/CantoneseLookup";
import { SiteHeader } from "./components/SiteHeader";
import { sitePath } from "./lib/site-path";

const learningSteps = [
  {
    number: "01",
    label: "普通话 → 粤语",
    title: "先找到普通话和粤语的分岔口",
    copy: "从你已经会读的中文出发，识别高频读音规律、口语替换和不能逐字搬运的例外。",
    tags: ["读音规律", "口语替换", "粤拼"],
    action: "进入普通话转换桥",
    href: "/bridge",
    tone: "coral",
  },
  {
    number: "02",
    label: "情景课程",
    title: "再把词放进真实场景",
    copy: "在茶餐厅、交通、工作、购物和社交对话里，练习开口、追问、修复和自然收尾。",
    tags: ["完整对话", "任务回合", "进阶挑战"],
    action: "浏览情景课程",
    href: "/course",
    tone: "gold",
  },
  {
    number: "03",
    label: "听力实验室",
    title: "然后把看懂变成听得出",
    copy: "拆开声调、声母、韵尾和句末语气，做短听辨回合，建立真正的粤语听觉记忆。",
    tags: ["六声调", "声音地图", "语气节奏"],
    action: "进入听力实验室",
    href: "/audio",
    tone: "mint",
  },
  {
    number: "04",
    label: "复习中心",
    title: "最后把学过的带回下一次对话",
    copy: "你在情景课程中加入复习的任务、词汇和句型，会按间隔安排回来，不用重新翻整页教材。",
    tags: ["间隔复习", "场景关联", "优先回忆"],
    action: "打开复习中心",
    href: "/review",
    tone: "violet",
  },
  {
    number: "05",
    label: "香港口语库",
    title: "最后走进香港人真正会说的话",
    copy: "把茶记、俗语、港式外来词、年代潮语和委婉表达放回文化与关系里，知道哪些可以说，哪些只要听得懂。",
    tags: ["地道用语", "香港文化", "语境标签"],
    action: "进入香港口语库",
    href: "/culture",
    tone: "blue",
  },
] as const;

export default function Home() {
  return (
    <main className="home-page">
      <SiteHeader home />

      <section className="hero feature-hero" id="top">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="live-dot" /> 香港粤语 · Jyutping · 口语优先</div>
          <h1>先从普通话出发，<br /><em>一步一步说到自然。</em></h1>
          <p className="hero-lede">为已经读得懂中文的普通话使用者设计。先找分岔口，再进真实场景，接着练听力，最后用复习把差异留下来。</p>
          <div className="hero-actions"><a className="primary-button" href="#learning-path">查看学习顺序 <span>→</span></a><a className="secondary-link" href="#instant-lookup">先试一句粤语 <span>↓</span></a></div>
          <div className="hero-proof"><span>01 → 02 → 03 → 04</span><strong>桥接 · 场景 · 听力 · 复习</strong></div>
        </div>
        <CantoneseLookup compact />
      </section>

      <section className="learning-path-section page-shell" id="learning-path">
        <div className="learning-path-intro section-intro">
          <div><p className="eyebrow">YOUR ROUTE / 学习顺序</p><h2>每一步都解决一个不同的问题。</h2></div>
          <p>不要把四个入口当成四套独立教材。按照这个顺序走，你会从“看得懂”逐步走到“听得出、说得自然”。</p>
        </div>
        <div className="learning-path-list">
          {learningSteps.map((step) => (
            <article className={`learning-step ${step.tone}`} key={step.number}>
              <div className="learning-step-number">{step.number}</div>
              <div className="learning-step-content">
                <p className="eyebrow">{step.label}</p>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
                <div className="learning-step-tags">{step.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <a className="learning-step-action" href={sitePath(step.href)}>{step.action}<span>→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="home-start-section page-shell">
        <div className="home-start-card">
          <div><p className="eyebrow">START HERE / 开始方式</p><h2>今天只走第一步，<em>不要一次学完。</em></h2><p>先在转换桥输入一个你每天会说的中文词，再把它带进一个场景。听力和复习会在后面接上。</p></div>
          <div className="home-start-actions"><a className="primary-button" href={sitePath("/bridge")}>从第一步开始 <span>→</span></a><span>建议顺序：桥 → 场景 → 听力 → 复习</span></div>
        </div>
      </section>

      <section className="home-audio-feature page-shell">
        <div className="home-audio-heading"><div><p className="eyebrow">SETUP / 开始前</p><h2>先选一个你听得顺耳的粤语音色。</h2></div><p>如果设备安装了多个香港粤语音色，可以在这里展开、试听并选择；之后全站播放都会使用你的选择。</p></div>
        <CantoneseAudioSettings />
      </section>

      <footer className="site-footer page-shell">
        <div><a className="brand footer-brand" href="#top"><span className="brand-mark">粵</span><span><strong>粤语鲜活学堂</strong><small>Vivid Cantonese</small></span></a><p>为普通话使用者，把看得懂的中文变成说得出的粤语。</p></div>
        <div className="footer-links"><a href={sitePath("/bridge")}>普通话 → 粤语</a><a href={sitePath("/course")}>情景课程</a><a href={sitePath("/audio")}>听力实验室</a><a href={sitePath("/review")}>复习中心</a><a href={sitePath("/culture")}>香港口语库</a></div>
        <span className="footer-note">香港粤语 · Jyutping</span>
      </footer>
    </main>
  );
}
