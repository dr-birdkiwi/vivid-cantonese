"use client";

import { useMemo, useState } from "react";
import { CantoneseAudio } from "./CantoneseAudio";
import { lookupCantonese } from "../data/cantonese-dictionary";

export function CantoneseLookup() {
  const [input, setInput] = useState("我现在没有时间");
  const result = useMemo(() => lookupCantonese(input), [input]);

  return (
    <div className="cantonese-lookup">
      <div className="lookup-input-card">
        <div className="lookup-card-label"><span>输入中文</span><small>简体 / 繁体 · 一字或多字</small></div>
        <textarea value={input} onChange={(event) => setInput(event.target.value)} aria-label="输入中文" placeholder="例如：我现在没有时间 / 我而家冇時間" rows={4} />
        <p>这里不是逐字翻译器：遇到高频口语词，会优先给你香港人真的会说的版本。</p>
      </div>
      <div className="lookup-result-card">
        <div className="lookup-card-label"><span>粤语表达 / 粤拼</span><small>{result.exact ? "已找到整句" : result.complete ? "已逐段标注" : "部分识别"}</small></div>
        {result.cantonese ? <>
          <div className="lookup-result-main"><div><strong>{result.cantonese}</strong><code>{result.jyutping || "粤拼待补充"}</code></div><CantoneseAudio text={result.cantonese} label={`播放粤语：${result.cantonese}`} /></div>
          <div className="lookup-segments" aria-label="逐段粤语发音"><span className="lookup-segment-label">发音拆开看</span>{result.segments.map((segment, index) => <span className={`lookup-segment${segment.known ? " known" : " unknown"}`} key={`${segment.source}-${index}`}><b>{segment.output}</b>{segment.jyutping ? <code>{segment.jyutping}</code> : <code>未收录</code>}</span>)}</div>
          <p className="lookup-note">{result.note}</p>
        </> : <div className="lookup-empty">{result.note}</div>}
      </div>
    </div>
  );
}
