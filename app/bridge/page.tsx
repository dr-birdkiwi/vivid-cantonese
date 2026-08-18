"use client";

import { useMemo, useState } from "react";
import { CantoneseAudio, CantoneseAudioSettings } from "../components/CantoneseAudio";
import { SiteHeader } from "../components/SiteHeader";
import { recordAnswer } from "../lib/learning-store";

type SoundRuleExample = { character: string; jyutping: string; mandarinPinyin: string };
type SoundRule = {
  group: string;
  title: string;
  mandarin: string;
  cantonese: string;
  explanation: string;
  examples: SoundRuleExample[];
};

const soundRules: SoundRule[] = [
  { group: "声母 01", title: "b / p / m / f 多数可以先保留", mandarin: "b、p、m、f", cantonese: "b、p、m、f", explanation: "这是最适合拿来建立信心的一组：先保留声母，再处理韵母和声调。", examples: [{ character: "班", jyutping: "baan1", mandarinPinyin: "bān" }, { character: "比", jyutping: "bei2", mandarinPinyin: "bǐ" }, { character: "明", jyutping: "ming4", mandarinPinyin: "míng" }, { character: "花", jyutping: "faa1", mandarinPinyin: "huā" }, { character: "快", jyutping: "faai3", mandarinPinyin: "kuài" }] },
  { group: "声母 02", title: "d / t / n / l 也常保持同组", mandarin: "d、t、n、l", cantonese: "d、t、n、l", explanation: "普通话使用者可以先抓住开头的舌尖位置；年、天、来、大都能看出这条迁移。", examples: [{ character: "大", jyutping: "daai6", mandarinPinyin: "dà" }, { character: "天", jyutping: "tin1", mandarinPinyin: "tiān" }, { character: "年", jyutping: "nin4", mandarinPinyin: "nián" }, { character: "来", jyutping: "lai4", mandarinPinyin: "lái" }, { character: "多", jyutping: "do1", mandarinPinyin: "duō" }] },
  { group: "声母 03", title: "zh / ch / sh 往往前移成 z / c / s", mandarin: "zh、ch、sh", cantonese: "z、c、s（高频）", explanation: "粤语没有普通话那套卷舌对立，很多字会变成较前的舌尖音；但韵母仍要另外处理。", examples: [{ character: "知", jyutping: "zi1", mandarinPinyin: "zhī" }, { character: "出", jyutping: "ceot1", mandarinPinyin: "chū" }, { character: "书", jyutping: "syu1", mandarinPinyin: "shū" }, { character: "十", jyutping: "sap6", mandarinPinyin: "shí" }, { character: "中", jyutping: "zung1", mandarinPinyin: "zhōng" }] },
  { group: "声母 04", title: "j / q / x 是最大分岔区之一", mandarin: "j、q、x", cantonese: "z / c / s、g / k / h、j 等", explanation: "不要背成单一替换。家、见、去、求、想、学属于不同历史音类，必须用更多词来建立范围感。", examples: [{ character: "家", jyutping: "gaa1", mandarinPinyin: "jiā" }, { character: "见", jyutping: "gin3", mandarinPinyin: "jiàn" }, { character: "去", jyutping: "heoi3", mandarinPinyin: "qù" }, { character: "求", jyutping: "kau4", mandarinPinyin: "qiú" }, { character: "想", jyutping: "soeng2", mandarinPinyin: "xiǎng" }, { character: "学", jyutping: "hok6", mandarinPinyin: "xué" }] },
  { group: "声母 05", title: "普通话 r 常见粤语 j / y 开头", mandarin: "r", cantonese: "j / y（常见）", explanation: "普通话的卷舌 r 在粤语里通常没有直接对应；人、日、肉、热、然都要按词记。", examples: [{ character: "人", jyutping: "jan4", mandarinPinyin: "rén" }, { character: "日", jyutping: "jat6", mandarinPinyin: "rì" }, { character: "肉", jyutping: "juk6", mandarinPinyin: "ròu" }, { character: "热", jyutping: "jit6", mandarinPinyin: "rè" }, { character: "然", jyutping: "jin4", mandarinPinyin: "rán" }] },
  { group: "声母 06", title: "y / w 不是简单的“同一个声母”", mandarin: "y、w、零声母", cantonese: "j、w、ng 或零声母", explanation: "我、五、有、外、云提醒你：普通话拼音开头的 y / w 有时只是拼写提示，粤语会重新分配声母。", examples: [{ character: "我", jyutping: "ngo5", mandarinPinyin: "wǒ" }, { character: "五", jyutping: "ng5", mandarinPinyin: "wǔ" }, { character: "外", jyutping: "ngoi6", mandarinPinyin: "wài" }, { character: "有", jyutping: "jau5", mandarinPinyin: "yǒu" }, { character: "云", jyutping: "wan4", mandarinPinyin: "yún" }] },
  { group: "韵母 01", title: "普通话 -ang / -eng 可能分到多个粤语韵母", mandarin: "-ang、-eng、-ing", cantonese: "-ong、-aang、-ang、-eng", explanation: "这是不能只看拼音尾巴的一组：中、冷、能、生、听的韵母路线不同，不能归成一个固定答案。", examples: [{ character: "中", jyutping: "zung1", mandarinPinyin: "zhōng" }, { character: "冷", jyutping: "laang5", mandarinPinyin: "lěng" }, { character: "能", jyutping: "nang4", mandarinPinyin: "néng" }, { character: "生", jyutping: "saang1", mandarinPinyin: "shēng" }, { character: "听", jyutping: "teng1", mandarinPinyin: "tīng" }] },
  { group: "韵母 02", title: "-ao / -ou 常见 ou / au / aau", mandarin: "-ao、-ou", cantonese: "-ou、-au、-aau", explanation: "高、好、口、手、到适合用来训练“先听韵母，再听声调”；同一个普通话韵尾不等于同一个粤语韵母。", examples: [{ character: "高", jyutping: "gou1", mandarinPinyin: "gāo" }, { character: "好", jyutping: "hou2", mandarinPinyin: "hǎo" }, { character: "口", jyutping: "hau2", mandarinPinyin: "kǒu" }, { character: "手", jyutping: "sau2", mandarinPinyin: "shǒu" }, { character: "到", jyutping: "dou3", mandarinPinyin: "dào" }] },
  { group: "韵母 03", title: "-ian / -iang 经常收窄成 in / oeng / ong", mandarin: "-ian、-iang", cantonese: "-in、-aan、-oeng、-ong", explanation: "年、见、想、亮、先是高频代表；同样的普通话拼写不代表同一个粤语韵母。", examples: [{ character: "年", jyutping: "nin4", mandarinPinyin: "nián" }, { character: "见", jyutping: "gin3", mandarinPinyin: "jiàn" }, { character: "想", jyutping: "soeng2", mandarinPinyin: "xiǎng" }, { character: "亮", jyutping: "loeng6", mandarinPinyin: "liàng" }, { character: "先", jyutping: "sin1", mandarinPinyin: "xiān" }] },
  { group: "韵母 04", title: "-u / -ü 可能变成 u / yu / eoi / oe", mandarin: "u、ü、-uan、-üan", cantonese: "u、yu、eoi、oe、yun", explanation: "书、女、去、选、远、船展示了粤语保留的圆唇对立；这一组尤其适合用成对的粤拼和语音记忆。", examples: [{ character: "书", jyutping: "syu1", mandarinPinyin: "shū" }, { character: "女", jyutping: "neoi5", mandarinPinyin: "nǚ" }, { character: "去", jyutping: "heoi3", mandarinPinyin: "qù" }, { character: "选", jyutping: "syun2", mandarinPinyin: "xuǎn" }, { character: "远", jyutping: "jyun5", mandarinPinyin: "yuǎn" }, { character: "船", jyutping: "syun4", mandarinPinyin: "chuán" }] },
  { group: "韵尾 01", title: "粤语保留普通话消失的 -p / -t / -k", mandarin: "普通话无明显闭塞韵尾", cantonese: "-p、-t、-k（入声）", explanation: "这是最值得优先学的结构差异：八、十、六、国、学、立都要把结尾收住，不能拖成普通话长元音。", examples: [{ character: "八", jyutping: "baat3", mandarinPinyin: "bā" }, { character: "十", jyutping: "sap6", mandarinPinyin: "shí" }, { character: "六", jyutping: "luk6", mandarinPinyin: "liù" }, { character: "国", jyutping: "gwok3", mandarinPinyin: "guó" }, { character: "学", jyutping: "hok6", mandarinPinyin: "xué" }, { character: "立", jyutping: "lap6", mandarinPinyin: "lì" }] },
  { group: "韵尾 02", title: "普通话 -n / -ng 不能机械互换", mandarin: "-n、-ng", cantonese: "-n、-ng、-m", explanation: "粤语保留更多鼻音韵尾，甚至有心 sam1 这样的 -m；看到普通话鼻音尾，要重新确认粤拼。", examples: [{ character: "山", jyutping: "saan1", mandarinPinyin: "shān" }, { character: "生", jyutping: "saang1", mandarinPinyin: "shēng" }, { character: "心", jyutping: "sam1", mandarinPinyin: "xīn" }, { character: "年", jyutping: "nin4", mandarinPinyin: "nián" }, { character: "风", jyutping: "fung1", mandarinPinyin: "fēng" }] },
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

type ReadingWord = { text: string; jyutping: string; meaning: string };
type MultipleReadingEntry = {
  id: string;
  character: string;
  category: "词义分化" | "词族读法" | "进阶词";
  level: "入门" | "进阶";
  first: ReadingWord;
  second: ReadingWord;
  note: string;
};

const multipleReadingRows: MultipleReadingEntry[] = [
  { id: "coeng-zoeng", character: "长", category: "词义分化", level: "入门", first: { text: "長度", jyutping: "coeng4 dou6", meaning: "长度" }, second: { text: "長大", jyutping: "zoeng2 daai6", meaning: "长大" }, note: "表示长度时读 coeng4，表示成长或年纪时读 zoeng2。" },
  { id: "zung-cung", character: "重", category: "词义分化", level: "入门", first: { text: "重量", jyutping: "zung6 loeng6", meaning: "重量" }, second: { text: "重複", jyutping: "cung4 fuk1", meaning: "重复" }, note: "“重”作重量是 zung6，作重复、重做是 cung4；两个词都很常见。" },
  { id: "haang-hong", character: "行", category: "词族读法", level: "入门", first: { text: "行路", jyutping: "haang4 lou6", meaning: "走路" }, second: { text: "銀行", jyutping: "ngan4 hong4", meaning: "银行" }, note: "行路的行是 haang4，银行的行是 hong4；不要只凭普通话“行”来猜。" },
  { id: "bin-pin", character: "便", category: "词义分化", level: "入门", first: { text: "方便", jyutping: "fong1 bin6", meaning: "方便" }, second: { text: "便宜", jyutping: "bin6 ji4", meaning: "便宜" }, note: "两个词都读 bin6；粤语这里与普通话“便宜”的声母印象不同，整词记更稳。" },
  { id: "lok-ngok", character: "乐", category: "词族读法", level: "入门", first: { text: "快樂", jyutping: "faai3 lok6", meaning: "快乐" }, second: { text: "音樂", jyutping: "jam1 ngok6", meaning: "音乐" }, note: "乐在快乐里读 lok6，在音乐里读 ngok6；词语内部还会连带改变声母。" },
  { id: "naan-kwan", character: "难", category: "词族读法", level: "入门", first: { text: "難過", jyutping: "naan4 gwo3", meaning: "难过" }, second: { text: "困難", jyutping: "kwan3 naan4", meaning: "困难" }, note: "难过的“难”读 naan4，困难的“难”读 naan4，但前字读音和整词节奏很容易误听。" },
  { id: "gaa-gaa2", character: "假", category: "词义分化", level: "入门", first: { text: "放假", jyutping: "fong3 gaa3", meaning: "放假" }, second: { text: "假裝", jyutping: "gaa2 zong1", meaning: "假装" }, note: "表示休假时读 gaa3，表示不真实或假装时读 gaa2。" },
  { id: "jing-jing3", character: "应", category: "进阶词", level: "进阶", first: { text: "應該", jyutping: "jing1 goi1", meaning: "应该" }, second: { text: "應承", jyutping: "jing3 sing4", meaning: "答应" }, note: "应该是 jing1，应承是 jing3；职场和日常回应里都很有用。" },
  { id: "sou-sou2", character: "数", category: "词义分化", level: "进阶", first: { text: "數字", jyutping: "sou3 zi6", meaning: "数字" }, second: { text: "數人頭", jyutping: "sou2 jan4 tau4", meaning: "数人数" }, note: "名词“数字”读 sou3，表示计算、清点时读 sou2。" },
  { id: "caa-caai", character: "差", category: "词义分化", level: "进阶", first: { text: "差不多", jyutping: "caa1 bat1 do1", meaning: "差不多" }, second: { text: "差人", jyutping: "caai1 jan4", meaning: "警察（旧称）" }, note: "差不多的差是 caa1；差人是香港旧式口语，理解影视或旧新闻时会遇到。" },
  { id: "zoek-zyu", character: "着", category: "词义分化", level: "进阶", first: { text: "着數", jyutping: "zoek6 sou3", meaning: "好处／划算" }, second: { text: "著名", jyutping: "zyu3 meng4", meaning: "著名" }, note: "着数和著名里的字形相近但读法不同；着数也是香港口语里的高频词。" },
  { id: "dou-dou3", character: "度", category: "词族读法", level: "进阶", first: { text: "程度", jyutping: "cing4 dou6", meaning: "程度" }, second: { text: "度數", jyutping: "dou6 sou3", meaning: "度数" }, note: "程度的度读 dou6，度数的度也读 dou6；真正要留意的是前字连读带来的辨认难度。" },
  { id: "ziu-ciu", character: "朝", category: "进阶词", level: "进阶", first: { text: "朝早", jyutping: "ziu1 zou2", meaning: "早上" }, second: { text: "朝夕", jyutping: "ciu4 zik6", meaning: "早晚" }, note: "朝早是香港日常口语，朝夕偏书面；两者在影视、新闻和正式表达里都可能出现。" },
  { id: "daan-daan", character: "单", category: "词族读法", level: "进阶", first: { text: "單位", jyutping: "daan1 wai6", meaning: "单位／工作机构" }, second: { text: "單車", jyutping: "daan1 ce1", meaning: "自行车" }, note: "单在这两组里都读 daan1，但单车是香港常用词，不能只按普通话词义联想。" },
  { id: "sik-sik1", character: "识", category: "词族读法", level: "入门", first: { text: "識字", jyutping: "sik1 zi6", meaning: "识字" }, second: { text: "識得", jyutping: "sik1 dak1", meaning: "懂得／会" }, note: "识在两组里都读 sik1；重点是识得是非常高频的粤语结构，意思不是普通话“认识”那么窄。" },
  { id: "daa-daa2", character: "打", category: "词族读法", level: "入门", first: { text: "打電話", jyutping: "daa2 din6 waa2", meaning: "打电话" }, second: { text: "打擊", jyutping: "daa2 gik1", meaning: "打击" }, note: "打在这两组里读 daa2；整词练习有助于熟悉粤语动词和宾语的节奏。" },
];

const readingQuizItems = [
  { id: "quiz-coeng", prompt: "听到这个词，它表示“长大”还是“长度”？", audioText: "長大", answer: "長大", jyutping: "zoeng2 daai6", options: ["長度", "長大", "長期"], note: "長大 zoeng2 daai6 的长表示成长，不是长度。" },
  { id: "quiz-cung", prompt: "哪一个词里的“重”读 cung4？", audioText: "重複", answer: "重複", jyutping: "cung4 fuk1", options: ["重量", "重複", "重點"], note: "重複 cung4 fuk1 表示再次做；重量 zung6 loeng6 的重则是 zung6。" },
  { id: "quiz-hong", prompt: "你听到的是“行路”还是“银行”？", audioText: "銀行", answer: "銀行", jyutping: "ngan4 hong4", options: ["行路", "銀行", "行李"], note: "銀行 ngan4 hong4 的行读 hong4；行路 haang4 lou6 的行读 haang4。" },
  { id: "quiz-lok", prompt: "哪一个词里的“乐”读 lok6？", audioText: "快樂", answer: "快樂", jyutping: "faai3 lok6", options: ["快樂", "音樂", "樂器"], note: "快樂 faai3 lok6 的乐读 lok6，音樂 jam1 ngok6 的乐读 ngok6。" },
  { id: "quiz-gaa", prompt: "听到 gaa2，哪个词最符合？", audioText: "假裝", answer: "假裝", jyutping: "gaa2 zong1", options: ["放假", "假裝", "假期"], note: "假裝 gaa2 zong1 表示不真实地扮作；放假 fong3 gaa3 的假是 gaa3。" },
  { id: "quiz-jing", prompt: "哪一个词里的“应”读 jing3？", audioText: "應承", answer: "應承", jyutping: "jing3 sing4", options: ["應該", "應承", "應用"], note: "應承 jing3 sing4 是答应；應該 jing1 goi1 的应是 jing1。" },
  { id: "quiz-sou", prompt: "表示“计算人数”时，哪一个读 sou2？", audioText: "數人頭", answer: "數人頭", jyutping: "sou2 jan4 tau4", options: ["數字", "數人頭", "數量"], note: "數人頭 sou2 jan4 tau4 是清点人数；數字 sou3 zi6 的数是 sou3。" },
  { id: "quiz-zoek", prompt: "哪一个词是香港口语里的“好处／划算”？", audioText: "着數", answer: "着數", jyutping: "zoek6 sou3", options: ["著名", "着數", "着急"], note: "着數 zoek6 sou3 是好处、划算；著名 zyu3 meng4 则偏书面。" },
];

export default function BridgePage() {
  const [readingQuery, setReadingQuery] = useState("");
  const [readingCategory, setReadingCategory] = useState<"全部" | MultipleReadingEntry["category"]>("全部");
  const [readingQuizIndex, setReadingQuizIndex] = useState(0);
  const [readingQuizSelected, setReadingQuizSelected] = useState<string | null>(null);
  const filteredReadingRows = useMemo(() => {
    const normalizedQuery = readingQuery.trim().toLowerCase();
    return multipleReadingRows.filter((row) => {
      const matchesCategory = readingCategory === "全部" || row.category === readingCategory;
      const searchable = [row.character, row.category, row.level, row.first.text, row.first.jyutping, row.first.meaning, row.second.text, row.second.jyutping, row.second.meaning, row.note].join(" ").toLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [readingCategory, readingQuery]);
  const readingQuiz = readingQuizItems[readingQuizIndex];

  function chooseReadingAnswer(option: string) {
    if (readingQuizSelected) return;
    setReadingQuizSelected(option);
    recordAnswer(`bridge-reading-${readingQuiz.id}`, option === readingQuiz.answer);
  }

  function nextReadingQuestion() {
    setReadingQuizIndex((index) => (index + 1) % readingQuizItems.length);
    setReadingQuizSelected(null);
  }

  return (
    <main className="subpage bridge-page">
      <SiteHeader />
      <section className="subpage-hero page-shell compact"><p className="eyebrow">THE MANDARIN BRIDGE / 普通话转换桥</p><h1>你已经会说中文，<br /><em>先学会看懂规律。</em></h1><p>普通话和粤语不是逐字换一套读音：声母、韵母、韵尾和声调都有高频对应；但口语词、入声和多音字必须单独建立词汇记忆。</p><div className="bridge-primer-nav"><a href="#sound-patterns">声母与韵母</a><a href="#tone-map">声调迁移</a><a href="#exceptions">不规则高频词</a><a href="#multiple-readings">同字异读</a></div></section>
      <div className="page-shell"><CantoneseAudioSettings /></div>

      <section className="bridge-primer page-shell" id="sound-patterns">
        <div className="section-intro"><div><p className="eyebrow">01 / SOUND MAP</p><h2>先建立“可迁移”的<em>声音地图。</em></h2></div><p>以下是高频倾向，不是逐字保证。每条规律配有多个代表例子，先用它缩小猜测范围，再用粤拼和语音确认。</p></div>
        <div className="rule-summary-grid"><article><span>01 / 先听开头</span><strong>声母先找同组</strong><p>b / p / m / f 等可以先保留，先把猜测范围缩小。</p></article><article><span>02 / 再看中间</span><strong>韵母会分岔</strong><p>普通话的 -ang、-ao、-ian 不一定落到一个固定粤语韵母。</p></article><article><span>03 / 检查结尾</span><strong>-p / -t / -k</strong><p>看到闭塞韵尾，优先想到入声，再用粤拼确认数字。</p></article><article><span>04 / 最后查词</span><strong>口语词不硬猜</strong><p>冇、唔、而家、鍾意等直接收进词库，不和规则表重复。</p></article></div>
        <div className="rule-table sound-rule-table"><div className="rule-table-head"><span>层次</span><span>普通话入口</span><span>粤语常见方向</span><span>多个代表例子</span><span>给普通话使用者的提示</span></div>{soundRules.map((rule) => <div className="rule-table-row" key={rule.group}><b>{rule.group}<small>{rule.title}</small></b><span>{rule.mandarin}</span><strong>{rule.cantonese}</strong><div className="rule-examples">{rule.examples.map((example) => <div className="rule-example" key={example.character}><b>{example.character}</b><code>{example.jyutping}</code><small>{example.mandarinPinyin}</small><CantoneseAudio text={example.character} label={`播放：${example.character}`} compact /></div>)}</div><p>{rule.explanation}</p></div>)}</div>
      </section>

      <section className="tone-section page-shell" id="tone-map">
        <div className="section-intro"><div><p className="eyebrow">02 / TONE MAP</p><h2>声调不是随机，<em>但也不能硬套。</em></h2></div><p>普通话四声与粤语六声来自不同系统。先记最常见的迁移，再用粤拼数字确认。</p></div>
        <div className="tone-layout"><div className="tone-card"><div className="tone-card-head"><span>普通话 → 粤语</span><small>高频倾向</small></div>{toneRules.map(([mandarin, cantonese, contour, example]) => <div className="tone-row" key={mandarin}><b>{mandarin}</b><strong>{cantonese}</strong><span>{contour}</span><code>{example}</code></div>)}<p className="tone-note">研究中的单字统计显示：普通话一声常对应粤语一声；二声多落在粤语四声，三声多落在二 / 五声，四声多落在三 / 六声。词语、入声和历史音类会造成偏离。</p></div><div className="tone-side"><span className="tone-number">1—6</span><h3>粤拼数字是确认器，<br />不是装饰。</h3><p>先看韵尾，再看数字：<b>学 hok6</b> 的 -k 和 6 一起出现，说明它不是普通话“xué”的直接读法。</p><div className="tone-check"><span>读法顺序</span><b>中文字 → 韵尾 → 声调</b></div></div></div>
      </section>

      <section className="exception-section page-shell" id="exceptions">
        <div className="section-intro"><div><p className="eyebrow">03 / EXCEPTIONS</p><h2>不能靠规律猜的，<em>单独收进词库。</em></h2></div><p>这里不是“失败案例”，而是普通话使用者最值得提前建立的粤语词汇网络。</p></div>
        <div className="exception-layout single"><div className="exception-list"><div className="exception-list-head"><b>高频口语替换</b><small>看到普通话就直接想粤语</small></div>{exceptionRows.map(([mandarin, cantonese, jyutping, tag, why]) => <article className="exception-row" key={mandarin}><span>{mandarin}</span><div><strong>{cantonese}</strong><code>{jyutping}</code></div><small>{tag}</small><p>{why}</p><CantoneseAudio text={cantonese} label={`播放：${cantonese}`} compact /></article>)}</div></div>
      </section>


      <section className="multiple-reading-section page-shell" id="multiple-readings">
        <div className="section-intro"><div><p className="eyebrow">04 / MULTIPLE READINGS</p><h2>先记词，<em>不要只记单字。</em></h2></div><p>同一个汉字进入不同词语，可能换声母、韵母或声调。把整词、粤拼和意思一起存，才是普通话使用者最省力的记法。</p></div>
        <div className="multiple-reading-intro"><div><span>为什么会这样？</span><strong>粤语保留了不同历史层次的读音。</strong><p>不要把它当成例外清单；它更像一张“词语地图”。常用词先收进记忆，进阶词再通过听辨建立速度。</p></div><div className="multiple-reading-intro-stat"><b>{multipleReadingRows.length}</b><small>组词语对比</small><b>{readingQuizItems.length}</b><small>道听音练习</small></div></div>
        <div className="multiple-reading-controls"><label className="multiple-reading-search"><span aria-hidden="true">⌕</span><input value={readingQuery} onChange={(event) => setReadingQuery(event.target.value)} placeholder="搜索汉字、词语、粤拼或含义" aria-label="搜索同字异读" /></label><div className="multiple-reading-filters" aria-label="筛选同字异读类别">{(["全部", "词义分化", "词族读法", "进阶词"] as const).map((category) => <button className={readingCategory === category ? "active" : ""} key={category} onClick={() => setReadingCategory(category)} type="button">{category}</button>)}</div></div>
        <div className="multiple-reading-result-bar"><span>目前显示 <b>{filteredReadingRows.length}</b> 组{readingQuery ? "，匹配“" + readingQuery + "”" : ""}</span>{readingQuery || readingCategory !== "全部" ? <button onClick={() => { setReadingQuery(""); setReadingCategory("全部"); }} type="button">清除筛选 ↗</button> : <small>每个词语都可以单独试听</small>}</div>
        <div className="multiple-reading-grid">{filteredReadingRows.map((row) => <article className={`multiple-reading-entry${row.level === "进阶" ? " advanced" : ""}`} key={row.id}><div className="multiple-reading-entry-head"><span>{row.character}</span><div><b>{row.category}</b><small>{row.level}</small></div></div><div className="multiple-reading-word-pair"><div className="multiple-reading-word"><div><small>词语 A · {row.first.meaning}</small><strong>{row.first.text}</strong><code>{row.first.jyutping}</code></div><CantoneseAudio text={row.first.text} label={`播放：${row.first.text}`} compact /></div><div className="multiple-reading-divider" aria-hidden="true">/</div><div className="multiple-reading-word"><div><small>词语 B · {row.second.meaning}</small><strong>{row.second.text}</strong><code>{row.second.jyutping}</code></div><CantoneseAudio text={row.second.text} label={`播放：${row.second.text}`} compact /></div></div><p>{row.note}</p></article>)}</div>
        {filteredReadingRows.length ? null : <div className="multiple-reading-empty"><strong>没有找到对应词语。</strong><p>可以试试输入单字、粤拼，或清除筛选重新浏览。</p></div>}

        <div className="multiple-reading-practice"><div className="multiple-reading-practice-head"><div><p className="eyebrow">LISTEN &amp; CHOOSE / 听音选词</p><h3>把“看懂差异”变成<em>听得出来。</em></h3></div><span>{String(readingQuizIndex + 1).padStart(2, "0")} / {String(readingQuizItems.length).padStart(2, "0")}</span></div><p className="multiple-reading-question">{readingQuiz.prompt}</p><CantoneseAudio text={readingQuiz.audioText} label={`播放听辨题：${readingQuiz.audioText}`} /><div className="multiple-reading-options">{readingQuiz.options.map((option) => <button className={`multiple-reading-option${readingQuizSelected === option ? " selected" : ""}${readingQuizSelected && option === readingQuiz.answer ? " correct" : ""}`} key={option} onClick={() => chooseReadingAnswer(option)} type="button"><span>{readingQuizSelected === option ? (option === readingQuiz.answer ? "✓" : "×") : "○"}</span>{option}</button>)}</div>{readingQuizSelected ? <div className={`multiple-reading-feedback ${readingQuizSelected === readingQuiz.answer ? "correct" : "incorrect"}`}><div><b>{readingQuizSelected === readingQuiz.answer ? "啱，听到词里的读法了。" : "答案是「" + readingQuiz.answer + "」。"}</b><code>{readingQuiz.jyutping}</code></div><p>{readingQuiz.note}</p><CantoneseAudio text={readingQuiz.audioText} label={`重听：${readingQuiz.audioText}`} compact /></div> : null}<div className="multiple-reading-practice-actions"><span>先听 → 选词 → 看粤拼 → 重听</span>{readingQuizSelected ? <button className="primary-button" onClick={nextReadingQuestion} type="button">下一题 <span>→</span></button> : null}</div></div>
      </section>
      <section className="bridge-sources page-shell"><span>资料说明</span><p>声母、韵母和声调表按香港语言学学会粵拼方案整理；声调对应参考香港中文大学关于粤语—普通话声调迁移的研究。所有“规律”都应当视为高频倾向，最终以粤拼、词语和语音为准。</p><a href="https://jyutping.org/en/jyutping/" target="_blank" rel="noreferrer">查看 Jyutping 方案 ↗</a><a href="https://ling.cuhk.edu.hk/people/peggy/Mok%20et%20al._SC_Orthography_2018.pdf" target="_blank" rel="noreferrer">查看声调对应研究 ↗</a></section>
    </main>
  );
}
