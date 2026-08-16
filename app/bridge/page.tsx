"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CantoneseAudio, CantoneseAudioSettings } from "../components/CantoneseAudio";

const entries = [
  ["没有", "冇", "mou5", "普通话“不”", "我而家冇時間。"], ["不", "唔", "m4", "普通话“不”", "我唔知。"], ["是", "係", "hai6", "判断句", "係咪你呀？"], ["在", "喺", "hai2", "地点", "我喺公司。"], ["现在", "而家", "ji4 gaa1", "整词记忆", "而家方便講電話嗎？"], ["喜欢", "鍾意", "zung1 ji3", "自然表达", "你鍾意食辣嘢嗎？"], ["漂亮", "靚", "leng3", "自然表达", "今日好靚喎。"], ["东西", "嘢", "je5", "口语替换", "呢啲嘢幾好食。"], ["哪里", "邊度", "bin1 dou6", "疑问词", "你而家喺邊度？"], ["为什么", "點解", "dim2 gaai2", "疑问词", "你點解唔食飯？"], ["怎么做", "點做", "dim2 zou6", "疑问词", "呢個要點做？"], ["多少", "幾多", "gei2 do1", "疑问词", "呢個幾多錢？"], ["等一下", "等陣", "dang2 zan6", "场景短语", "等陣先。"], ["是不是", "係咪", "hai6 mai6", "句式", "你係咪第一次嚟？"], ["可以吗", "得唔得", "dak1 m4 dak1", "句式", "聽日三點見，得唔得？"], ["没关系", "唔緊要", "m4 gan2 jiu3", "回应", "唔緊要，慢慢嚟。"],
];

export default function BridgePage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(entries[0]);
  const filtered = useMemo(() => entries.filter((entry) => entry.join(" ").toLowerCase().includes(query.trim().toLowerCase())), [query]);

  return (
    <main className="subpage">
      <header className="subpage-header"><Link className="brand" href="/"><span className="brand-mark">粵</span><span><strong>粤语鲜活学堂</strong><small>Vivid Cantonese</small></span></Link><Link className="back-link" href="/">← 回到首页</Link></header>
      <section className="subpage-hero page-shell compact"><p className="eyebrow">THE MANDARIN BRIDGE / 普通话转换桥</p><h1>你已经会说中文，<br /><em>只需要看懂分岔。</em></h1><p>这里不做逐字替换。每个词都标记它是口语替代、整词记忆、疑问词还是需要放进上下文理解的表达。</p></section>
      <div className="page-shell"><CantoneseAudioSettings /></div>
      <section className="bridge-page-layout page-shell">
        <div className="bridge-table">
          <label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索普通话、粤语或粤拼" aria-label="搜索转换桥" /></label>
          <div className="bridge-table-head"><span>普通话</span><span>粤语口语</span><span>粤拼</span><span>类型</span></div>
          {filtered.map((entry) => <div className="bridge-table-row-wrap" key={entry[0]}><button className={`bridge-table-row${active[0] === entry[0] ? " active" : ""}`} onClick={() => setActive(entry)} type="button"><b>{entry[0]}</b><strong>{entry[1]}</strong><code>{entry[2]}</code><small>{entry[3]}</small></button><CantoneseAudio text={entry[1]} label={`播放：${entry[1]}`} compact /></div>)}
        </div>
        <aside className="bridge-page-detail">
          <span className="detail-tag">{active[3]}</span><p className="detail-label">普通话</p><h2>{active[0]} <i>→</i> <em>{active[1]}</em></h2>
          <div className="detail-jyutping-large"><span>{active[2]}</span><CantoneseAudio text={active[1]} label={`播放：${active[1]}`} /></div>
          <div className="example-box"><span>放进一句话</span><b>{active[4]}</b><CantoneseAudio text={active[4]} label={`播放：${active[4]}`} compact /><small>先记住整句，再回头观察每个词。</small></div>
          <p className="bridge-principle">自然粤语不是“把普通话汉字换一套读音”，而是同时处理词汇、语序、语气和关系。</p><Link className="primary-button" href="/practice">用一句话练习 <span>→</span></Link>
        </aside>
      </section>
    </main>
  );
}
