"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { CantoneseAudio, CantoneseAudioSettings } from "../components/CantoneseAudio";
import { cultureCategories, cultureSources, hongKongCultureEntries, type CultureCategory, type CultureEntry } from "../data/hong-kong-culture";
import { SiteHeader } from "../components/SiteHeader";
import { sitePath } from "../lib/site-path";

type CategoryFilter = "全部" | CultureCategory;

const eraLabels: Record<CultureEntry["era"], string> = {
  "持续使用": "现在仍常用",
  "传统俗语": "传统俗语",
  "旧香港": "旧香港",
  "近代潮语": "近代潮语",
  "当代网络": "当代／网络",
};

const riskLabels: Record<CultureEntry["risk"], string> = {
  日常: "可以自然使用",
  语境: "看关系和语气",
  旧式: "认识即可，偏旧",
  敏感: "敏感，先听懂",
  粗口: "粗口，只供识别",
};

const CULTURE_KNOWN_STORAGE_KEY = "vivid-cantonese:culture-known:v1";
const CULTURE_KNOWN_CHANGE_EVENT = "vivid-cantonese:culture-known-change";
const cultureEntryIds = new Set(hongKongCultureEntries.map((entry) => entry.id));

function subscribeToKnownEntries(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CULTURE_KNOWN_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CULTURE_KNOWN_CHANGE_EVENT, onStoreChange);
  };
}

function getKnownEntriesSnapshot() {
  try {
    return window.localStorage.getItem(CULTURE_KNOWN_STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function getServerKnownEntriesSnapshot() {
  return "[]";
}

function parseKnownEntryIds(snapshot: string) {
  try {
    const saved = JSON.parse(snapshot);
    return new Set<string>(Array.isArray(saved) ? saved.filter((id): id is string => typeof id === "string" && cultureEntryIds.has(id)) : []);
  } catch {
    return new Set<string>();
  }
}

function entrySearchText(entry: CultureEntry) {
  return [entry.term, entry.jyutping, entry.meaning, entry.note, entry.example, entry.tags.join(" "), entry.category, entry.era].join(" ").toLowerCase();
}

export default function CulturePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("全部");
  const [showSensitive, setShowSensitive] = useState(true);
  const [showKnown, setShowKnown] = useState(false);
  const [activeEntry, setActiveEntry] = useState<string | null>(null);

  const knownEntriesSnapshot = useSyncExternalStore(subscribeToKnownEntries, getKnownEntriesSnapshot, getServerKnownEntriesSnapshot);
  const knownEntryIds = useMemo(() => parseKnownEntryIds(knownEntriesSnapshot), [knownEntriesSnapshot]);

  const toggleKnown = (entryId: string) => {
    const next = new Set(knownEntryIds);
    if (next.has(entryId)) next.delete(entryId);
    else next.add(entryId);
    try {
      window.localStorage.setItem(CULTURE_KNOWN_STORAGE_KEY, JSON.stringify([...next]));
    } catch {
      // Keep the in-memory state even when the browser declines storage access.
    }
    window.dispatchEvent(new Event(CULTURE_KNOWN_CHANGE_EVENT));
  };

  const clearKnown = () => {
    try {
      window.localStorage.removeItem(CULTURE_KNOWN_STORAGE_KEY);
    } catch {
      // The visible state is still cleared for this visit.
    }
    window.dispatchEvent(new Event(CULTURE_KNOWN_CHANGE_EVENT));
  };

  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return hongKongCultureEntries.filter((entry) => {
      if (!showKnown && knownEntryIds.has(entry.id)) return false;
      if (!showSensitive && (entry.risk === "敏感" || entry.risk === "粗口")) return false;
      if (category !== "全部" && entry.category !== category) return false;
      return !normalized || entrySearchText(entry).includes(normalized);
    });
  }, [category, knownEntryIds, query, showKnown, showSensitive]);

  const visibleActiveEntry = hongKongCultureEntries.find((entry) => entry.id === activeEntry) ?? null;

  return (
    <main className="subpage culture-page">
      <SiteHeader />
      <section className="culture-hero page-shell">
        <div className="culture-hero-copy">
          <p className="eyebrow">HONG KONG CANTONESE / 香港口语与文化</p>
          <h1>先听懂香港人<br /><em>为什么这样说。</em></h1>
          <p>一页收集日常口语、茶记用语、传统俗语、港式外来词、年代潮语和委婉表达。这里的重点不是把词背成孤立翻译，而是知道它从哪种生活、哪一代人和哪种关系里长出来。</p>
          <div className="culture-hero-proof"><span>{hongKongCultureEntries.length}</span><b>个已整理词条</b><i>·</i><span>9</span><b>个文化层</b><i>·</i><span>5</span><b>类来源</b></div>
        </div>
        <div className="culture-hero-card">
          <span className="culture-hero-card-mark">本地话，不只是翻译 · 只听懂，不乱用</span>
          <strong>唔係每个词<br />都应该马上拿来讲。</strong>
          <p>先看「年代」「风险」和「语境」，再决定是学习输出，还是只需要听得明白。</p>
          <div className="culture-legend"><span><i className="legend-dot safe" />日常</span><span><i className="legend-dot context" />语境</span><span><i className="legend-dot caution" />敏感</span></div>
        </div>
      </section>

      <section className="culture-method page-shell">
        <div className="culture-method-heading">
          <p className="eyebrow">HOW TO READ / 使用方法</p>
          <h2>把词放回香港的<br /><em>时间、地方和关系里。</em></h2>
        </div>
        <div className="culture-method-grid">
          <article><span>01</span><h3>先看年代</h3><p>持续使用、旧香港、近代潮语和网络词不会被混成一类。</p></article>
          <article><span>02</span><h3>再看关系</h3><p>同一句话对老友、同事、陌生人和长辈，礼貌程度可以完全不同。</p></article>
          <article><span>03</span><h3>最后听语气</h3><p>㗎、喎、啫、咩等句末词，会告诉你对方是在确认、缓和还是反问。</p></article>
        </div>
      </section>

      <div className="page-shell culture-audio-settings"><CantoneseAudioSettings /></div>

      <section className="culture-library page-shell" id="culture-library">
        <div className="culture-library-heading">
          <div><p className="eyebrow">LIVING LEXICON / 活的词库</p><h2>从「日常」开始，<em>一路听到文化深处。</em></h2></div>
          <p>搜索简体、繁体、粤拼、意思或例句。每张卡都附上一个可以听的粤语读法；风险标签是学习内容的一部分。</p>
        </div>

        <div className="culture-controls">
          <label className="culture-search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索：吹水、茶走、ceoi1 seoi2、意思……" aria-label="搜索香港口语词库" /></label>
          <label className="culture-sensitive-toggle"><input type="checkbox" checked={showSensitive} onChange={(event) => setShowSensitive(event.target.checked)} /> 显示敏感词条（仅供识别）</label>
        </div>

        <div className="culture-mastery-panel">
          <div className="culture-mastery-copy"><p className="eyebrow">MY PROGRESS / 我的学习状态</p><strong>{knownEntryIds.size} <small>/ {hongKongCultureEntries.length}</small></strong><span>个词条已标记为“会”</span><p>默认隐藏已会词条；记录只保存在这台设备的浏览器中，刷新页面仍会保留。</p></div>
          <div className="culture-mastery-actions"><label><input type="checkbox" checked={showKnown} onChange={(event) => setShowKnown(event.target.checked)} /> 显示已会词条</label><button type="button" onClick={clearKnown} disabled={!knownEntryIds.size}>清除已会记录</button></div>
        </div>

        <div className="culture-category-scroll" role="tablist" aria-label="口语文化分类">
          <button className={category === "全部" ? "active" : ""} onClick={() => setCategory("全部")} type="button">全部 <small>{hongKongCultureEntries.length}</small></button>
          {cultureCategories.map((item) => <button className={category === item.label ? "active" : ""} key={item.label} onClick={() => setCategory(item.label)} type="button">{item.label} <small>{hongKongCultureEntries.filter((entry) => entry.category === item.label).length}</small></button>)}
        </div>
        <p className="culture-category-description">{category === "全部" ? "先从可以自然使用的高频口语开始，再按兴趣进入俗语、外来词、年代和禁忌。" : cultureCategories.find((item) => item.label === category)?.description}</p>

        <div className="culture-result-bar"><span>显示 <b>{filteredEntries.length}</b> 个词条</span>{query || category !== "全部" || !showSensitive ? <button onClick={() => { setQuery(""); setCategory("全部"); setShowSensitive(true); }} type="button">清除筛选 ×</button> : <span>资料按使用范围和文化层整理</span>}</div>

        <div className="culture-entry-grid">
          {filteredEntries.map((entry) => {
            const expanded = visibleActiveEntry?.id === entry.id;
            const known = knownEntryIds.has(entry.id);
            return <article className={`culture-entry-card risk-${entry.risk}${expanded ? " expanded" : ""}`} key={entry.id}>
              <div className="culture-entry-top"><div className="culture-entry-meta"><span className="culture-category-label">{entry.category}</span><span className="culture-era-label">{eraLabels[entry.era]}</span></div><button className={`culture-known-toggle${known ? " known" : ""}`} onClick={() => toggleKnown(entry.id)} type="button" aria-pressed={known}>{known ? "已会 ✓" : "标记已会"}</button></div>
              <div className="culture-entry-word"><div><h3>{entry.term}</h3><code>{entry.jyutping}</code></div><CantoneseAudio text={entry.audioText ?? entry.term} label={`播放：${entry.term}`} compact /></div>
              <p className="culture-entry-meaning">{entry.meaning}</p>
              <div className="culture-entry-risk"><span className={`risk-pill risk-pill-${entry.risk}`}>{riskLabels[entry.risk]}</span>{entry.tags.map((tag) => <span className="culture-tag" key={tag}>{tag}</span>)}</div>
              <p className="culture-entry-note">{entry.note}</p>
              <button className="culture-example-toggle" onClick={() => setActiveEntry(expanded ? null : entry.id)} type="button" aria-expanded={expanded}>{expanded ? "收起例句 ↑" : "看例句与文化提示 ↓"}</button>
              {expanded ? <div className="culture-entry-example"><p>{entry.example}</p><code>{entry.exampleJyutping}</code><CantoneseAudio text={entry.example} label={`播放例句：${entry.example}`} compact /><small>资料层级：{entry.source} · 先听整句，再看粤拼。</small></div> : null}
            </article>;
          })}
        </div>
        {!filteredEntries.length ? <div className="culture-empty"><strong>{knownEntryIds.size && !showKnown && !query.trim() && category === "全部" && showSensitive ? "已会词条已隐藏。" : "暂时没有这个组合。"}</strong><p>{knownEntryIds.size && !showKnown && !query.trim() && category === "全部" && showSensitive ? "打开“显示已会词条”，就可以重新查看和复习。" : "试试输入普通话、繁体字、粤拼，或先清除分类。"}</p></div> : null}
      </section>

      <section className="culture-sources page-shell">
        <div className="culture-sources-heading"><p className="eyebrow">RESEARCH NOTES / 研究说明</p><h2>这不是“香港人都会说”的<br /><em>扁平词表。</em></h2><p>香港粤语有年龄、阶层、地区、媒体和书写习惯的差异。词库优先收录有词典、研究或文化资料支持的表达；社区资料只作为线索，并在页面上标注风险。</p></div>
        <div className="culture-source-grid">{cultureSources.map((source) => <a className="culture-source-card" href={source.href} key={source.label} target="_blank" rel="noreferrer"><span>{source.type}</span><h3>{source.label} <b>↗</b></h3><p>{source.note}</p></a>)}</div>
      </section>

      <footer className="site-footer page-shell culture-footer"><div><a className="brand footer-brand" href={sitePath("/")}><span className="brand-mark">粵</span><span><strong>粤语鲜活学堂</strong><small>Vivid Cantonese</small></span></a><p>先听懂香港人怎么说，再决定自己怎么说。</p></div><span className="footer-note">香港粤语 · Living Lexicon</span></footer>
    </main>
  );
}
