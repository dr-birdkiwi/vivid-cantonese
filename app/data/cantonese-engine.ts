import {
  bridgeEntries,
  isChinese,
  normalizeText,
  pronunciationByCharacter,
  type CantoneseLookupSegment,
  type CantoneseLookupResult as LegacyLookupResult,
} from "./cantonese-dictionary";

export type LookupRegister = "daily" | "work" | "polite" | "friends";

export const lookupRegisters: Array<{ id: LookupRegister; label: string }> = [
  { id: "daily", label: "日常口语" },
  { id: "work", label: "工作沟通" },
  { id: "polite", label: "更礼貌" },
  { id: "friends", label: "朋友之间" },
];

export type CantoneseAlternative = {
  cantonese: string;
  jyutping: string;
  segments: CantoneseLookupSegment[];
  label: string;
  note: string;
  confidence: "high" | "medium" | "low";
};

export type CantoneseEngineResult = LegacyLookupResult & {
  alternatives: CantoneseAlternative[];
  register: LookupRegister;
  confidence: "high" | "medium" | "low";
  matchedRules: string[];
};

type ConversionRule = {
  input: string;
  output: string;
  label: string;
  note: string;
};

type AlternativeRule = ConversionRule & {
  registers: LookupRegister[];
};

const primaryRules: ConversionRule[] = [
  { input: "沒有時間", output: "冇時間", label: "整词替换", note: "“没有时间”在日常粤语里通常说“冇時間”。" },
  { input: "沒有辦法", output: "冇辦法", label: "整词替换", note: "“没有办法”是高频口语词组，直接记整词更自然。" },
  { input: "不方便", output: "唔方便", label: "口语替换", note: "否定词“不”在这个口语结构里变成“唔”。" },
  { input: "有空吗", output: "得唔得閒", label: "场景句式", note: "约人时“得唔得閒”比直译更像日常粤语。" },
  { input: "有空", output: "得閒", label: "高频词组", note: "“得閒”是确认对方有没有时间的常用说法。" },
  { input: "能不能", output: "可唔可以", label: "正反问句", note: "请求别人做事时，粤语常用“可唔可以”。" },
  { input: "要不要", output: "要唔要", label: "正反问句", note: "“要唔要”是粤语里很高频的正反问结构。" },
  { input: "是不是", output: "係咪", label: "正反问句", note: "粤语的是非问句通常用“係咪”。" },
  { input: "有没有", output: "有冇", label: "正反问句", note: "“有冇”是粤语里最常见的“有没有”问法。" },
  { input: "可以吗", output: "得唔得", label: "确认句式", note: "询问可行性、许可或是否妥当时常用“得唔得”。" },
  { input: "不知道", output: "唔知", label: "口语替换", note: "“唔知”比“我不知道”更适合作为日常回应。" },
  { input: "不可以", output: "唔得", label: "口语替换", note: "“唔得”是日常拒绝或表示不可行的说法。" },
  { input: "怎麼做", output: "點做", label: "疑问词组", note: "“点做”比逐字读“怎么做”更像粤语口语。" },
  { input: "怎麼", output: "點", label: "疑问词", note: "“怎么”在粤语口语中常用“点”开头。" },
  { input: "為什麼", output: "點解", label: "疑问词", note: "“点解”是日常粤语最常用的“为什么”。" },
  { input: "什麼", output: "咩", label: "疑问词", note: "“咩”是非常高频的短疑问词。" },
  { input: "現在", output: "而家", label: "时间词", note: "“而家”需要作为整词记忆，不能只按字音推。" },
  { input: "剛才", output: "頭先", label: "时间词", note: "“头先”是复述刚才发生的事时的常用口语。" },
  { input: "剛剛", output: "啱啱", label: "时间词", note: "“啱啱”比书面“刚刚”更像日常说法。" },
  { input: "晚一點", output: "遲啲", label: "时间词", note: "“迟啲”常用于回复消息或改约时间。" },
  { input: "回覆", output: "覆", label: "沟通用语", note: "香港粤语里“覆消息”“覆电话”都很常见。" },
  { input: "看一下", output: "睇下", label: "轻量请求", note: "句末的“下”会让请求更轻、更像自然对话。" },
  { input: "說一下", output: "講下", label: "轻量请求", note: "“讲下”适合请对方简单说明或分享想法。" },
  { input: "一起", output: "一齊", label: "社交表达", note: "邀请别人一起做事时常用“一齐”。" },
  { input: "漂亮", output: "靚", label: "自然表达", note: "日常描述外表、设计或效果时常用“靓”。" },
  { input: "喜歡", output: "鍾意", label: "自然表达", note: "“钟意”比直译“喜欢”更接近日常粤语。" },
  { input: "東西", output: "嘢", label: "口语替换", note: "“嘢”可泛指东西、事情或某种内容。" },
  { input: "謝謝", output: "唔該", label: "礼貌表达", note: "感谢别人帮忙或提供服务时常用“唔该”。" },
  { input: "對不起", output: "唔好意思", label: "礼貌表达", note: "道歉、打扰或请求重复时都可以说“唔好意思”。" },
  { input: "幫我", output: "幫我", label: "请求表达", note: "“帮我”通常和“可唔可以”“唔该”一起使用。" },
  { input: "給我", output: "俾我", label: "请求表达", note: "“俾我”是非常高频的给与结构。" },
];

const alternativeRules: AlternativeRule[] = [
  { input: "沒有時間", output: "冇得閒", label: "更口语", note: "朋友之间也常说“冇得閒”，语气更生活化。", registers: ["daily", "friends"] },
  { input: "沒有時間", output: "唔係咁方便", label: "更婉转", note: "工作或礼貌场景中，可以用“唔係咁方便”缓和拒绝。", registers: ["work", "polite"] },
  { input: "不方便", output: "唔係咁方便", label: "更婉转", note: "比“唔方便”更柔和，适合工作和不想直接拒绝时。", registers: ["work", "polite"] },
  { input: "謝謝", output: "唔該晒", label: "更完整", note: "“唔该晒”是更完整、更有感谢语气的说法。", registers: ["daily", "friends"] },
  { input: "再說一次", output: "可唔可以再講一次", label: "更礼貌", note: "请求对方重复时，加上“可唔可以”会更自然。", registers: ["work", "polite"] },
];

const sourceEntries = bridgeEntries
  .map((entry) => ({ entry, mandarin: normalizeText(entry.mandarin) }))
  .sort((left, right) => right.mandarin.length - left.mandarin.length);

const cantoneseEntries = bridgeEntries
  .map((entry) => ({ entry, cantonese: normalizeText(entry.cantonese) }))
  .sort((left, right) => right.cantonese.length - left.cantonese.length);

function makeCantoneseSegments(text: string): CantoneseLookupSegment[] {
  const segments: CantoneseLookupSegment[] = [];
  let index = 0;
  while (index < text.length) {
    const phrase = cantoneseEntries.find(({ cantonese }) => cantonese.length > 1 && text.startsWith(cantonese, index));
    if (phrase) {
      segments.push({ source: text.slice(index, index + phrase.cantonese.length), output: phrase.entry.cantonese, jyutping: phrase.entry.jyutping, known: true });
      index += phrase.cantonese.length;
      continue;
    }
    const character = text[index];
    if (!isChinese(character)) {
      segments.push({ source: character, output: character, jyutping: "", known: true });
      index += 1;
      continue;
    }
    const jyutping = pronunciationByCharacter[character] || "";
    segments.push({ source: character, output: character, jyutping, known: Boolean(jyutping) });
    index += 1;
  }
  return segments;
}

function makeSourceSegments(input: string): CantoneseLookupSegment[] {
  const segments: CantoneseLookupSegment[] = [];
  let index = 0;
  while (index < input.length) {
    const phrase = sourceEntries.find(({ mandarin }) => mandarin.length > 1 && input.startsWith(mandarin, index));
    if (phrase) {
      segments.push({ source: input.slice(index, index + phrase.mandarin.length), output: phrase.entry.cantonese, jyutping: phrase.entry.jyutping, known: true });
      index += phrase.mandarin.length;
      continue;
    }
    const character = input[index];
    if (!isChinese(character)) {
      segments.push({ source: character, output: character, jyutping: "", known: true });
      index += 1;
      continue;
    }
    const jyutping = pronunciationByCharacter[character] || "";
    segments.push({ source: character, output: character, jyutping, known: Boolean(jyutping) });
    index += 1;
  }
  return segments;
}

function isComplete(segments: CantoneseLookupSegment[]) {
  return segments.filter((segment) => isChinese(segment.source)).every((segment) => segment.known);
}

function applyRules(input: string, rules: ConversionRule[]) {
  let output = input;
  const matched: ConversionRule[] = [];
  const orderedRules = [...rules].sort((left, right) => right.input.length - left.input.length);
  for (const rule of orderedRules) {
    if (!output.includes(rule.input)) continue;
    output = output.split(rule.input).join(rule.output);
    matched.push(rule);
  }
  return { output, matched };
}

function buildCandidate(text: string, note: string, matched: ConversionRule[]) {
  const segments = makeCantoneseSegments(text);
  const complete = isComplete(segments);
  return {
    cantonese: segments.map((segment) => segment.output).join(""),
    jyutping: segments.map((segment) => segment.jyutping).filter(Boolean).join(" "),
    segments,
    complete,
    note: matched.length ? `${matched.map((rule) => `${rule.input} → ${rule.output}`).join("；")}。${note}` : note,
  };
}

function buildAlternative(input: string, rule: AlternativeRule, primaryText: string) {
  const variant = applyRules(input, [rule]);
  const base = applyRules(variant.output, primaryRules);
  if (base.output === primaryText) return null;
  const candidate = buildCandidate(base.output, rule.note, [...variant.matched, ...base.matched]);
  return {
    cantonese: candidate.cantonese,
    jyutping: candidate.jyutping,
    segments: candidate.segments,
    label: rule.label,
    note: candidate.note,
    confidence: candidate.complete ? "medium" : "low",
  } satisfies CantoneseAlternative;
}

function emptyResult(input: string, register: LookupRegister): CantoneseEngineResult {
  return {
    input,
    normalizedInput: "",
    cantonese: "",
    jyutping: "",
    literalText: "",
    literalJyutping: "",
    literalSegments: [],
    literalComplete: false,
    segments: [],
    exact: false,
    complete: false,
    note: "请输入一字或一句中文。",
    alternatives: [],
    register,
    confidence: "low",
    matchedRules: [],
  };
}

export function lookupCantonese(input: string, options: { register?: LookupRegister } = {}): CantoneseEngineResult {
  const register = options.register || "daily";
  const trimmed = input.trim();
  if (!trimmed) return emptyResult(input, register);

  const normalizedInput = normalizeText(trimmed);
  if (!Array.from(normalizedInput).some(isChinese)) {
    return { ...emptyResult(input, register), normalizedInput, note: "这里先输入中文；简体和繁体都可以。" };
  }

  const legacy = normalizedInput.length ? bridgeEntries
    .map((entry) => ({ entry, mandarin: normalizeText(entry.mandarin), cantonese: normalizeText(entry.cantonese) }))
    .find(({ mandarin, cantonese }) => mandarin === normalizedInput || cantonese === normalizedInput) : undefined;

  const literalSegments = Array.from(normalizedInput).map((character) => {
    if (!isChinese(character)) return { source: character, output: character, jyutping: "", known: true };
    const jyutping = pronunciationByCharacter[character] || "";
    return { source: character, output: character, jyutping, known: Boolean(jyutping) };
  });
  const literalChineseSegments = literalSegments.filter((segment) => isChinese(segment.source));
  const literalComplete = literalChineseSegments.length > 0 && literalChineseSegments.every((segment) => segment.known);
  const literalReading = {
    literalText: trimmed,
    literalJyutping: literalSegments.map((segment) => segment.jyutping).filter(Boolean).join(" "),
    literalSegments,
    literalComplete,
  };

  let primaryText = "";
  let primarySegments: CantoneseLookupSegment[] = [];
  let primaryNote = "";
  let matchedRules: ConversionRule[] = [];
  let exact = false;

  if (legacy) {
    primaryText = legacy.entry.cantonese;
    primarySegments = [{ source: normalizedInput, output: legacy.entry.cantonese, jyutping: legacy.entry.jyutping, known: true }];
    primaryNote = legacy.mandarin === normalizedInput ? `${legacy.entry.tag}：${legacy.entry.note}` : "这句已经是粤语写法；下面是对应粤拼和试听。";
    exact = true;
  } else {
    const transformed = applyRules(normalizedInput, primaryRules);
    matchedRules = transformed.matched;
    if (transformed.output !== normalizedInput) {
      const candidate = buildCandidate(transformed.output, "已用词组和句式规则生成；如果是正式或复杂表达，请优先参考场景例句。", matchedRules);
      primaryText = candidate.cantonese;
      primarySegments = candidate.segments;
      primaryNote = candidate.note;
    } else {
      primarySegments = makeSourceSegments(normalizedInput);
      primaryText = primarySegments.map((segment) => segment.output).join("");
      primaryNote = "已按已收录的高频词组和粤拼标注；复杂句子建议再放进具体场景确认语气。";
    }
  }

  const complete = isComplete(primarySegments);
  const alternatives = alternativeRules
    .filter((rule) => rule.registers.includes(register))
    .map((rule) => buildAlternative(normalizedInput, rule, primaryText))
    .filter((alternative): alternative is CantoneseAlternative => Boolean(alternative))
    .filter((alternative, index, all) => all.findIndex((candidate) => candidate.cantonese === alternative.cantonese) === index)
    .slice(0, 3);

  return {
    input,
    normalizedInput,
    cantonese: primaryText,
    jyutping: primarySegments.map((segment) => segment.jyutping).filter(Boolean).join(" "),
    ...literalReading,
    segments: primarySegments,
    exact,
    complete,
    note: primaryNote,
    alternatives,
    register,
    confidence: exact || (matchedRules.length > 0 && complete) ? "high" : complete ? "medium" : "low",
    matchedRules: matchedRules.map((rule) => `${rule.input} → ${rule.output}`),
  };
}
