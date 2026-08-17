"use client";

import { useMemo, useState } from "react";
import { CantoneseAudio, CantoneseAudioSettings } from "../components/CantoneseAudio";
import { SiteHeader } from "../components/SiteHeader";
import { sitePath } from "../lib/site-path";

type BridgeEntry = [string, string, string, string, string];

const entries: BridgeEntry[] = [
  ["没有", "冇", "mou5", "普通话“不”", "我而家冇時間。"], ["不", "唔", "m4", "普通话“不”", "我唔知。"], ["是", "係", "hai6", "判断句", "係咪你呀？"], ["在", "喺", "hai2", "地点", "我喺公司。"], ["现在", "而家", "ji4 gaa1", "整词记忆", "而家方便講電話嗎？"], ["喜欢", "鍾意", "zung1 ji3", "自然表达", "你鍾意食辣嘢嗎？"], ["漂亮", "靚", "leng3", "自然表达", "今日好靚喎。"], ["东西", "嘢", "je5", "口语替换", "呢啲嘢幾好食。"], ["哪里", "邊度", "bin1 dou6", "疑问词", "你而家喺邊度？"], ["为什么", "點解", "dim2 gaai2", "疑问词", "你點解唔食飯？"], ["怎么做", "點做", "dim2 zou6", "疑问词", "呢個要點做？"], ["多少", "幾多", "gei2 do1", "疑问词", "呢個幾多錢？"], ["等一下", "等陣", "dang2 zan6", "场景短语", "等陣先。"], ["是不是", "係咪", "hai6 mai6", "句式", "你係咪第一次嚟？"], ["可以吗", "得唔得", "dak1 m4 dak1", "句式", "聽日三點見，得唔得？"], ["没关系", "唔緊要", "m4 gan2 jiu3", "回应", "唔緊要，慢慢嚟。"],
];

const soundRules = [
  { group: "声母 01", title: "b / p / m / f 多数可以先保留", mandarin: "b、p、m、f", cantonese: "b、p、m、f", explanation: "这是最适合拿来建立信心的一组：先保留声母，再处理韵母和声调。", example: ["班", "baan1", "bān"] },
  { group: "声母 02", title: "d / t / n / l 也常保持同组", mandarin: "d、t、n、l", cantonese: "d、t、n、l", explanation: "普通话使用者可以先抓住开头的舌尖位置；例如“年、来”的声母迁移很直观。", example: ["年", "nin4", "nián"] },
  { group: "声母 03", title: "zh / ch / sh 往往前移成 z / c / s", mandarin: "zh、ch、sh", cantonese: "z、c、s（高频）", explanation: "粤语没有普通话那套卷舌对立，很多字会变成较前的舌尖音；但韵母仍要另外处理。", example: ["出", "ceot1", "chū"] },
  { group: "声母 04", title: "j / q / x 是最大分岔区之一", mandarin: "j、q、x", cantonese: "z / c / s、g / k / h、j 等", explanation: "不要背成单一替换。家 gaa1、见 gin3、去 heoi3、求 kau4、想 soeng2，属于不同的历史音类。", example: ["想", "soeng2", "xiǎng"] },
  { group: "声母 05", title: "普通话 r 常见粤语 j / y 开头", mandarin: "r", cantonese: "j / y（常见）", explanation: "普通话的卷舌 r 在粤语里通常没有直接对应；人 jan4、日 jat6、肉 juk6 都要按词记。", example: ["人", "jan4", "rén"] },
  { group: "声母 06", title: "y / w 不是简单的“同一个声母”", mandarin: "y、w、零声母", cantonese: "j、w、ng 或零声母", explanation: "我 ngo5、五 ng5、有 jau5 都提醒你：普通话拼音开头的 y / w 有时只是拼写提示。", example: ["我", "ngo5", "wǒ"] },
  { group: "韵母 01", title: "普通话 -ang / -eng 可能分到多个粤语韵母", mandarin: "-ang、-eng", cantonese: "-ong、-aang、-ang、-ing", explanation: "这是不能只看拼音尾巴的一组：中 zung1、冷 laang5、能 nang4、生 sang1 的韵母路线不同。", example: ["中", "zung1", "zhōng"] },
  { group: "韵母 02", title: "-ao / -ou 常见 ou / au / aau", mandarin: "-ao、-ou", cantonese: "-ou、-au、-aau", explanation: "高 gou1、好 hou2、口 hau2、手 sau2 都很适合用来训练“先听韵母，再听声调”。", example: ["好", "hou2", "hǎo"] },
  { group: "韵母 03", title: "-ian / -iang 经常收窄成 in / oeng / ong", mandarin: "-ian、-iang", cantonese: "-in、-aan、-oeng、-ong", explanation: "年 nin4、见 gin3、想 soeng2、亮 loeng6 是高频代表；同样的普通话拼写不代表同一个粤语韵母。", example: ["亮", "loeng6", "liàng"] },
  { group: "韵母 04", title: "-u / -ü 可能变成 u / yu / eoi / oe", mandarin: "u、ü、-uan、-üan", cantonese: "u、yu、eoi、oe、yun", explanation: "书 syu1、女 neoi5、去 heoi3、选 syun2，重点是粤语保留了普通话没有的圆唇对立。", example: ["女", "neoi5", "nǚ"] },
  { group: "韵尾 01", title: "粤语保留普通话消失的 -p / -t / -k", mandarin: "普通话无明显闭塞韵尾", cantonese: "-p、-t、-k（入声）", explanation: "这是最值得优先学的结构差异：八 baat3、十 sap6、六 luk6、国 gwok3、学 hok6。", example: ["学", "hok6", "xué"] },
  { group: "韵尾 02", title: "普通话 -n / -ng 不能机械互换", mandarin: "-n、-ng", cantonese: "-n、-ng、-m", explanation: "粤语保留更多鼻音韵尾，甚至有心 sam1 这样的 -m；看到普通话鼻音尾，要重新确认粤拼。", example: ["心", "sam1", "xīn"] },
];

const toneRules = [
  ["普通话一声", "粤语一声", "高平 → 高平", "郊 gaau1 / jiāo1"],
  ["普通话二声", "粤语四声或六声", "上升 → 低降或低平", "牛 ngau4 / niú2"],
  ["普通话三声", "粤语二声或五声", "曲折 → 上升", "找 zaau2 / zhǎo3"],
  ["普通话四声", "粤语三声或六声", "下降 → 中平或低平", "怪 gwaai3 / guài4"],
];

const exceptionRows = [
  ["我", "我", "ngo5 / wǒ", "字音分岔", "普通话 w- 不能直接读成粤语 w-。"],
  ["你", "你", "nei5 / nǐ", "字音分岔", "人称代词属于高频词，直接单独记住最省力。"],
  ["他 / 她", "佢", "keoi5 / tā", "口语替换", "日常粤语常用佢，而不是把“他”按普通话字音搬过去。"],
  ["什么", "咩 / 乜嘢", "me1 / mat1 je5 / shénme", "疑问词替换", "咩很短，乜嘢更完整；两者都不能只按汉字推读。"],
  ["吃", "食", "sik6 / chī", "动词替换", "食保留入声 -k，是普通话使用者很容易漏掉的闭塞韵尾。"],
  ["喝", "飲", "jam2 / hē", "动词替换", "粤语日常用飲，不要把“喝”当成只换声调。"],
  ["看", "睇", "tai2 / kàn", "动词替换", "睇是香港口语最常用的“看”。"],
  ["说", "講", "gong2 / shuō", "动词替换", "讲嘢、講電話等搭配都以講为核心。"],
  ["找", "搵", "wan2 / zhǎo", "动词替换", "找人、找东西、找资料常用搵。"],
  ["给", "俾", "bei2 / gěi", "动词替换", "俾我、俾你是非常高频的给与结构。"],
  ["怎么样", "點樣", "dim2 joeng6 / zěnmeyàng", "整词记忆", "點樣比“怎么 + 样”更像真实口语。"],
];

const multipleReadingRows = [
  ["长", "長度 coeng4 dou6", "长大 zoeng2 daai6", "同字不同词，读音随词义分化。"],
  ["重", "重量 zung6 loeng6", "重複 cung4 fuk1", "“重”作重量和重复时读音不同。"],
  ["行", "行路 haang4 lou6", "银行 ngan4 hong4", "走路和行业 / 银行词族的读音不同。"],
  ["便", "方便 fong1 bin6", "便宜 pin4 ji4", "同一个字进入不同词语后不保持同音。"],
  ["乐", "快乐 faai3 lok6", "音乐 jam1 ngok6", "词语内部的声母和韵母都可能改变。"],
  ["难", "難過 naan4 gwo3", "困難 kwan3 naan4", "同字在不同词族里的粤语读法不同。"],
];

export default function BridgePage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<BridgeEntry>(entries[0]);
  const filtered = useMemo(() => entries.filter((entry) => entry.join(" ").toLowerCase().includes(query.trim().toLowerCase())), [query]);

  return (
    <main className="subpage bridge-page">
      <SiteHeader />
      <section className="subpage-hero page-shell compact"><p className="eyebrow">THE MANDARIN BRIDGE / 普通话转换桥</p><h1>你已经会说中文，<br /><em>先学会看懂规律。</em></h1><p>普通话和粤语不是逐字换一套读音：声母、韵母、韵尾和声调都有高频对应；但口语词、入声和多音字必须单独建立词汇记忆。</p><div className="bridge-primer-nav"><a href="#sound-patterns">声母与韵母</a><a href="#tone-map">声调迁移</a><a href="#exceptions">不规则高频词</a></div></section>
      <div className="page-shell"><CantoneseAudioSettings /></div>

      <section className="bridge-primer page-shell" id="sound-patterns">
        <div className="section-intro"><div><p className="eyebrow">01 / SOUND MAP</p><h2>先建立“可迁移”的<em>声音地图。</em></h2></div><p>以下是高频倾向，不是逐字保证。先用它缩小猜测范围，再用粤拼和语音确认。</p></div>
        <div className="rule-summary-grid"><article><span>01 / 先听开头</span><strong>声母先找同组</strong><p>b / p / m / f 等可以先保留，先把猜测范围缩小。</p></article><article><span>02 / 再看中间</span><strong>韵母会分岔</strong><p>普通话的 -ang、-ao、-ian 不一定落到一个固定粤语韵母。</p></article><article><span>03 / 检查结尾</span><strong>-p / -t / -k</strong><p>看到闭塞韵尾，优先想到入声，再用粤拼确认数字。</p></article><article><span>04 / 最后查词</span><strong>口语词不硬猜</strong><p>冇、唔、而家、鍾意等直接收进词库，不和规则表重复。</p></article></div>
        <div className="rule-table sound-rule-table"><div className="rule-table-head"><span>层次</span><span>普通话入口</span><span>粤语常见方向</span><span>代表字</span><span>给普通话使用者的提示</span></div>{soundRules.map((rule) => <div className="rule-table-row" key={rule.group}><b>{rule.group}<small>{rule.title}</small></b><span>{rule.mandarin}</span><strong>{rule.cantonese}</strong><div className="rule-example"><b>{rule.example[0]}</b><code>{rule.example[1]}</code><small>{rule.example[2]}</small><CantoneseAudio text={rule.example[0]} label={`播放：${rule.example[0]}`} compact /></div><p>{rule.explanation}</p></div>)}</div>
      </section>

      <section className="tone-section page-shell" id="tone-map">
        <div className="section-intro"><div><p className="eyebrow">02 / TONE MAP</p><h2>声调不是随机，<em>但也不能硬套。</em></h2></div><p>普通话四声与粤语六声来自不同系统。先记最常见的迁移，再用粤拼数字确认。</p></div>
        <div className="tone-layout"><div className="tone-card"><div className="tone-card-head"><span>普通话 → 粤语</span><small>高频倾向</small></div>{toneRules.map(([mandarin, cantonese, contour, example]) => <div className="tone-row" key={mandarin}><b>{mandarin}</b><strong>{cantonese}</strong><span>{contour}</span><code>{example}</code></div>)}<p className="tone-note">研究中的单字统计显示：普通话一声常对应粤语一声；二声多落在粤语四声，三声多落在二 / 五声，四声多落在三 / 六声。词语、入声和历史音类会造成偏离。</p></div><div className="tone-side"><span className="tone-number">1—6</span><h3>粤拼数字是确认器，<br />不是装饰。</h3><p>先看韵尾，再看数字：<b>学 hok6</b> 的 -k 和 6 一起出现，说明它不是普通话“xué”的直接读法。</p><div className="tone-check"><span>读法顺序</span><b>中文字 → 韵尾 → 声调</b></div></div></div>
      </section>

      <section className="exception-section page-shell" id="exceptions">
        <div className="section-intro"><div><p className="eyebrow">03 / EXCEPTIONS</p><h2>不能靠规律猜的，<em>单独收进词库。</em></h2></div><p>这里不是“失败案例”，而是普通话使用者最值得提前建立的粤语词汇网络。</p></div>
        <div className="exception-layout"><div className="exception-list"><div className="exception-list-head"><b>高频口语替换</b><small>看到普通话就直接想粤语</small></div>{exceptionRows.map(([mandarin, cantonese, jyutping, tag, why]) => <article className="exception-row" key={mandarin}><span>{mandarin}</span><div><strong>{cantonese}</strong><code>{jyutping}</code></div><small>{tag}</small><p>{why}</p><CantoneseAudio text={cantonese} label={`播放：${cantonese}`} compact /></article>)}</div><aside className="multiple-reading-card"><p className="eyebrow">同字异读</p><h3>先记词，不要只记单字。</h3><p>粤语和普通话都保留了很多历史层次。同一个字进入不同词语，可能触发不同读音；看到下面这类词，直接把整词和粤拼一起存。</p>{multipleReadingRows.map(([character, first, second, note]) => <div className="multiple-reading-row" key={character}><b>{character}</b><span>{first}<br />{second}</span><small>{note}</small></div>)}</aside></div>
      </section>

      <section className="bridge-page-layout page-shell" id="word-bridge">
        <div className="bridge-table"><div className="bridge-table-intro"><p className="eyebrow">04 / WORD BRIDGE</p><h2>把规律落回每天会说的词。</h2></div><label className="search-box"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索普通话、粤语或粤拼" aria-label="搜索转换桥" /></label><div className="bridge-table-head"><span>普通话</span><span>粤语口语</span><span>粤拼</span><span>类型</span><span className="bridge-table-audio-head" aria-hidden="true" /></div>{filtered.map((entry) => <div className={`bridge-table-row-wrap${active[0] === entry[0] ? " active" : ""}`} key={entry[0]}><button className={`bridge-table-row${active[0] === entry[0] ? " active" : ""}`} onClick={() => setActive(entry)} type="button"><b>{entry[0]}</b><strong>{entry[1]}</strong><code>{entry[2]}</code><small>{entry[3]}</small></button><CantoneseAudio text={entry[1]} label={`播放：${entry[1]}`} compact /></div>)}</div>
      <aside className="bridge-page-detail"><span className="detail-tag">{active[3]}</span><p className="detail-label">普通话</p><h2>{active[0]} <i>→</i> <em>{active[1]}</em></h2><div className="detail-jyutping-large"><span>{active[2]}</span><CantoneseAudio text={active[1]} label={`播放：${active[1]}`} /></div><div className="example-box"><span>放进一句话</span><b>{active[4]}</b><CantoneseAudio text={active[4]} label={`播放：${active[4]}`} compact /><small>先记住整句，再回头观察每个词。</small></div><p className="bridge-principle">自然粤语不是“把普通话汉字换一套读音”，而是同时处理词汇、语序、语气和关系。</p><a className="primary-button" href={sitePath("/practice")}>用一句话练习 <span>→</span></a></aside>
      </section>

      <section className="bridge-sources page-shell"><span>资料说明</span><p>声母、韵母和声调表按香港语言学学会粵拼方案整理；声调对应参考香港中文大学关于粤语—普通话声调迁移的研究。所有“规律”都应当视为高频倾向，最终以粤拼、词语和语音为准。</p><a href="https://jyutping.org/en/jyutping/" target="_blank" rel="noreferrer">查看 Jyutping 方案 ↗</a><a href="https://ling.cuhk.edu.hk/people/peggy/Mok%20et%20al._SC_Orthography_2018.pdf" target="_blank" rel="noreferrer">查看声调对应研究 ↗</a></section>
    </main>
  );
}
