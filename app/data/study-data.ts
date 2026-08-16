import { courseUnits } from "../course/course-data";

export type StudyItem = {
  id: string;
  mandarin: string;
  cantonese: string;
  jyutping: string;
  kind: "口语替换" | "句式" | "场景词" | "语气" | "发音";
  note: string;
  source: string;
  sourceSlug?: string;
};

const bridgeItems: StudyItem[] = [
  { id: "bridge-no-have", mandarin: "没有", cantonese: "冇", jyutping: "mou5", kind: "口语替换", note: "日常口语最常见的替换词；先把整词记住。", source: "普通话转换桥" },
  { id: "bridge-not", mandarin: "不", cantonese: "唔", jyutping: "m4", kind: "口语替换", note: "普通话的“不”不能直接按字音搬过去。", source: "普通话转换桥" },
  { id: "bridge-now", mandarin: "现在", cantonese: "而家", jyutping: "ji4 gaa1", kind: "口语替换", note: "而家是高频整词；不要只猜“家”的读音。", source: "普通话转换桥" },
  { id: "bridge-where", mandarin: "哪里", cantonese: "邊度", jyutping: "bin1 dou6", kind: "口语替换", note: "香港日常问地点的常用词组。", source: "普通话转换桥" },
  { id: "bridge-why", mandarin: "为什么", cantonese: "點解", jyutping: "dim2 gaai2", kind: "口语替换", note: "比书面“為什麼”更像真实口语。", source: "普通话转换桥" },
  { id: "bridge-yes-no", mandarin: "是不是", cantonese: "係咪", jyutping: "hai6 mai6", kind: "句式", note: "正反结构是粤语确认信息的高频工具。", source: "普通话转换桥" },
  { id: "bridge-can", mandarin: "可以吗", cantonese: "得唔得", jyutping: "dak1 m4 dak1", kind: "句式", note: "可用于询问许可、可行性和对方是否同意。", source: "普通话转换桥" },
  { id: "bridge-what", mandarin: "什么", cantonese: "咩", jyutping: "me1", kind: "口语替换", note: "咩短而高频；乜嘢则是更完整的说法。", source: "普通话转换桥" },
  { id: "bridge-see", mandarin: "看", cantonese: "睇", jyutping: "tai2", kind: "口语替换", note: "睇人、睇下、睇吓先都是高频搭配。", source: "普通话转换桥" },
  { id: "bridge-give", mandarin: "给", cantonese: "俾", jyutping: "bei2", kind: "口语替换", note: "俾我、俾你是非常常用的给与结构。", source: "普通话转换桥" },
  { id: "bridge-do", mandarin: "怎么做", cantonese: "點做", jyutping: "dim2 zou6", kind: "句式", note: "點 + 动词是询问方法的自然框架。", source: "普通话转换桥" },
  { id: "bridge-already", mandarin: "已经", cantonese: "已經", jyutping: "ji5 ging1", kind: "句式", note: "和咗一起学习时，要理解“动作完成”而非简单过去时。", source: "普通话转换桥" },
];

const grammarItems: StudyItem[] = [
  { id: "grammar-zo", mandarin: "已经完成 / 状态改变", cantonese: "咗", jyutping: "zo2", kind: "语气", note: "我食咗飯。重点是完成体；我食飯喇。还可以表达新状态。", source: "口语语法" },
  { id: "grammar-gan", mandarin: "正在进行", cantonese: "緊", jyutping: "gan2", kind: "语气", note: "緊通常放在动词后面：等緊、做緊、落緊雨。", source: "口语语法" },
  { id: "grammar-wo", mandarin: "新信息 / 提醒", cantonese: "喎", jyutping: "wo3", kind: "语气", note: "不要把喎当成一个固定普通话字，要从对话关系理解它。", source: "口语语法" },
  { id: "grammar-laa", mandarin: "请求 / 缓和 / 推进", cantonese: "啦", jyutping: "laa1", kind: "语气", note: "同一句话换上啦，可能变成邀请、催促或缓和语气。", source: "口语语法" },
];

const pronunciationItems: StudyItem[] = [
  { id: "sound-checked-k", mandarin: "学", cantonese: "學", jyutping: "hok6", kind: "发音", note: "粤语保留 -k 韵尾；不要把普通话 xué 直接换声调。", source: "声音地图" },
  { id: "sound-checked-t", mandarin: "八", cantonese: "八", jyutping: "baat3", kind: "发音", note: "-t 是普通话学习者需要主动听和说出来的闭塞韵尾。", source: "声音地图" },
  { id: "sound-ng", mandarin: "我", cantonese: "我", jyutping: "ngo5", kind: "发音", note: "普通话 w- 不能直接推粤语 w-；这是高频单独记忆项。", source: "声音地图" },
  { id: "sound-neoi", mandarin: "女", cantonese: "女", jyutping: "neoi5", kind: "发音", note: "eoi 是普通话没有的高频粤语韵母，需要听辨和模仿。", source: "声音地图" },
];

const courseItems: StudyItem[] = courseUnits.flatMap((unit) => unit.lessons.slice(0, 2).map((lesson, index) => ({
  id: `lesson-${unit.slug}-${index + 1}`,
  mandarin: lesson.mandarin,
  cantonese: lesson.phrase,
  jyutping: lesson.jyutping,
  kind: "场景词" as const,
  note: lesson.note,
  source: unit.title,
  sourceSlug: unit.slug,
})));

export const studyItems: StudyItem[] = [...bridgeItems, ...grammarItems, ...pronunciationItems, ...courseItems];

export const todaySeedItems = studyItems.slice(0, 8);

export function getStudyItem(id: string) {
  return studyItems.find((item) => item.id === id);
}
