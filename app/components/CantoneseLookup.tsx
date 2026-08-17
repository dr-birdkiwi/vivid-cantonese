"use client";

import { useMemo, useState } from "react";
import { CantoneseAudio } from "./CantoneseAudio";
import { lookupCantonese, lookupRegisters, type LookupRegister } from "../data/cantonese-engine";

type CantoneseLookupProps = { compact?: boolean };

export function CantoneseLookup({ compact = false }: CantoneseLookupProps) {
  const [input, setInput] = useState("我现在没有时间");
  const [register, setRegister] = useState<LookupRegister>("daily");
  const result = useMemo(() => lookupCantonese(input, { register }), [input, register]);

  const registerControls = <div className="lookup-register-row" aria-label="选择表达场景"><span>表达场景</span>{lookupRegisters.map((item) => <button className={register === item.id ? "active" : ""} key={item.id} type="button" onClick={() => setRegister(item.id)}>{item.label}</button>)}</div>;

  if (compact) {
    return (
      <div className="hero-lookup-tool" id="instant-lookup" aria-label="即时粤语标注工具">
        <div className="hero-lookup-head"><div><p className="eyebrow">INSTANT CANTONESE / 即时粤语</p><strong>输入一句，马上听懂。</strong></div><span>简体 / 繁体</span></div>
        <label className="hero-lookup-input-label">普通话 / 中文<textarea value={input} onChange={(event) => setInput(event.target.value)} aria-label="输入普通话或中文" placeholder="试试：我现在没有时间" rows={2} /></label>
        {registerControls}
        <div className="hero-lookup-result">
          <div className="hero-lookup-result-top"><span>粤语表达</span><small>{result.exact ? "已找到整句" : result.matchedRules.length ? "词组与句式已匹配" : result.complete ? "已逐段标注" : "部分识别"}</small></div>
          {result.cantonese ? <>
            <div className="hero-lookup-answer"><div><strong>{result.cantonese}</strong><code>{result.jyutping || "粤拼待补充"}</code></div><CantoneseAudio text={result.cantonese} label={`播放自然粤语：${result.cantonese}`} compact /></div>
            <div className="hero-lookup-literal">
              <div className="hero-lookup-literal-head"><span>输入原文直读</span><small>{result.literalComplete ? "只读字，不改词" : "部分字未收录"}</small></div>
              <div className="hero-lookup-literal-row"><div><b>{result.literalText}</b><code>{result.literalJyutping || "粤拼待补充"}</code></div><CantoneseAudio text={result.literalText} label={`播放原文直读：${result.literalText}`} compact /></div>
            </div>
            {result.alternatives.length ? <div className="hero-lookup-alternatives"><span>换一种说法</span>{result.alternatives.map((alternative) => <div className="hero-lookup-alternative" key={`${alternative.label}-${alternative.cantonese}`}><div><b>{alternative.cantonese}</b><code>{alternative.jyutping || "粤拼待补充"}</code><small>{alternative.label} · {alternative.note}</small></div><CantoneseAudio text={alternative.cantonese} label={`播放${alternative.label}：${alternative.cantonese}`} compact /></div>)}</div> : null}
          </> : <p className="hero-lookup-empty">{result.note}</p>}
        </div>
        <div className="hero-lookup-foot"><span>自然口语</span><span>·</span><span>原文直读</span><span>·</span><span>粤拼与试听</span></div>
      </div>
    );
  }

  return (
    <div className="cantonese-lookup">
      <div className="lookup-input-card">
        <div className="lookup-card-label"><span>输入中文</span><small>简体 / 繁体 · 一字或多字</small></div>
        <textarea value={input} onChange={(event) => setInput(event.target.value)} aria-label="输入中文" placeholder="例如：我现在没有时间 / 我而家冇時間" rows={4} />
        {registerControls}
        <p>先给你香港人真的会说的自然版本，再附上输入原文直读；直读只标注字音，不等于地道表达。</p>
      </div>
      <div className="lookup-result-card">
        <div className="lookup-card-label"><span>粤语表达 / 粤拼</span><small>{result.exact ? "已找到整句" : result.matchedRules.length ? "词组与句式已匹配" : result.complete ? "已逐段标注" : "部分识别"}</small></div>
        {result.cantonese ? <>
          <div className="lookup-result-main"><div><strong>{result.cantonese}</strong><code>{result.jyutping || "粤拼待补充"}</code></div><CantoneseAudio text={result.cantonese} label={`播放粤语：${result.cantonese}`} /></div>
          <div className="lookup-segments" aria-label="逐段粤语发音"><span className="lookup-segment-label">发音拆开看</span>{result.segments.map((segment, index) => <span className={`lookup-segment${segment.known ? " known" : " unknown"}`} key={`${segment.source}-${index}`}><b>{segment.output}</b>{segment.jyutping ? <code>{segment.jyutping}</code> : <code>未收录</code>}</span>)}</div>
          <div className="lookup-literal-reading"><div className="lookup-literal-label"><span>输入原文直读</span><small>{result.literalComplete ? "只读字，不改词" : "部分字未收录"}</small></div><div className="lookup-literal-main"><div><strong>{result.literalText}</strong><code>{result.literalJyutping || "粤拼待补充"}</code></div><CantoneseAudio text={result.literalText} label={`播放原文直读：${result.literalText}`} /></div><p>保留你输入的字，只标注它们在粤语里的读法；这不是自然口语改写。</p></div>
          {result.alternatives.length ? <div className="lookup-alternatives"><div className="lookup-alternatives-head"><span>其他自然说法</span><small>根据表达场景排列</small></div>{result.alternatives.map((alternative) => <article className="lookup-alternative" key={`${alternative.label}-${alternative.cantonese}`}><div><strong>{alternative.cantonese}</strong><code>{alternative.jyutping || "粤拼待补充"}</code><p>{alternative.label} · {alternative.note}</p></div><CantoneseAudio text={alternative.cantonese} label={`播放${alternative.label}：${alternative.cantonese}`} /></article>)}</div> : null}
          {result.matchedRules.length ? <p className="lookup-rule-note">本次识别：{result.matchedRules.join(" · ")}</p> : null}
          <p className="lookup-note">{result.note}</p>
        </> : <div className="lookup-empty">{result.note}</div>}
      </div>
    </div>
  );
}
