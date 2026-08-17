export type ListeningItem = {
  id: string;
  prompt: string;
  answer: string;
  jyutping: string;
  options: string[];
  note: string;
  source: string;
  sourceSlug?: string;
};

export const listeningItems: ListeningItem[] = [
  { id: "mou5", prompt: "普通话“没有”最自然的粤语是什么？", answer: "冇", jyutping: "mou5", options: ["冇", "無有", "唔有"], note: "冇 mou5 是日常口语的高频整词。", source: "普通话转换桥" },
  { id: "ngo5", prompt: "哪一个读法对应“我”？", answer: "ngo5", jyutping: "ngo5", options: ["ngo5", "wo5", "o5"], note: "粤语我以 ng- 起首，普通话 w- 不能直接套用。", source: "声音地图" },
  { id: "hok6", prompt: "哪一个读法对应“学”？", answer: "hok6", jyutping: "hok6", options: ["hok6", "hok2", "haau6"], note: "學 hok6 的 -k 韵尾是普通话学习者常漏掉的部分。", source: "声音地图" },
  { id: "neoi5", prompt: "哪一个读法对应“女”？", answer: "neoi5", jyutping: "neoi5", options: ["neoi5", "nui5", "jyu5"], note: "eoi 是需要单独建立听觉记忆的粤语韵母。", source: "声音地图" },
  { id: "repair-slow", prompt: "你听到的是哪一句“请说慢一点”？", answer: "可唔可以講慢啲？", jyutping: "ho2 m4 ho2 ji5 gong2 maan6 di1?", options: ["可唔可以講慢啲？", "可唔可以講快啲？", "我聽唔清楚。"], note: "慢啲是“慢一点”；快啲则是“快一点”，方向相反。", source: "先把对话接回来", sourceSlug: "repair-the-conversation" },
  { id: "cha-no-ice", prompt: "哪一句是在茶餐厅点“冻柠茶走冰”？", answer: "凍檸茶走冰，唔該。", jyutping: "dung3 ling4 caa4 zau2 bing1, m4 goi1.", options: ["凍檸茶走冰，唔該。", "熱檸茶加冰，唔該。", "凍奶茶少甜，唔該。"], note: "走冰是香港饮品店的固定表达，表示不要冰。", source: "茶餐厅生存课", sourceSlug: "cha-chaan-teng" },
  { id: "transport-where-off", prompt: "哪一句是在问“我在哪个站下车”？", answer: "我喺邊個站落車？", jyutping: "ngo5 hai2 bin1 go3 zaam6 lok6 ce1?", options: ["我喺邊個站落車？", "仲有幾多個站？", "去A出口要行邊邊？"], note: "落車是下车；仲有幾多個站则是在问还剩几站。", source: "交通与方向", sourceSlug: "transport-and-directions" },
  { id: "work-reply-later", prompt: "哪一句是在职场中说“我晚点再回复你”？", answer: "我遲啲再覆你。", jyutping: "ngo5 ci4 di1 zoi3 fuk1 nei5.", options: ["我遲啲再覆你。", "我而家覆咗你。", "我等緊你覆我。"], note: "遲啲是晚一点；覆在这里是回复信息。", source: "工作沟通", sourceSlug: "work-communication" },
  { id: "shopping-cheaper", prompt: "哪一句是在店里问“有没有便宜一点的款式”？", answer: "有冇平啲嘅款？", jyutping: "jau5 mou5 peng4 di1 ge3 fun2?", options: ["有冇平啲嘅款？", "有冇大啲嘅舖？", "可唔可以快啲埋單？"], note: "平啲嘅款是“便宜一点的款式”，嘅把修饰关系连起来。", source: "买东西", sourceSlug: "shopping-and-returns" },
  { id: "social-subtext", prompt: "哪一句带有“真的吗？我真的不知道喎”的社交语气？", answer: "係咩？我真係唔知喎。", jyutping: "hai6 me1? ngo5 zan1 hai6 m4 zi1 wo3.", options: ["係咩？我真係唔知喎。", "係咪你知？我而家去。", "我唔知，等陣先。"], note: "喎常带出新信息、提醒或带一点“你看吧”的语气。", source: "日常社交", sourceSlug: "social-updates" },
  { id: "grammar-gan", prompt: "哪一句表示“我正在等你”？", answer: "我等緊你。", jyutping: "ngo5 dang2 gan2 nei5.", options: ["我等緊你。", "我等咗你。", "我等你啦。"], note: "緊放在动词后表示动作正在进行；咗则表示完成。", source: "口语语法" },
  { id: "tone-si5", prompt: "听到粤拼 si5，哪个字对应这个读音？", answer: "市", jyutping: "si5", options: ["詩", "試", "市"], note: "si1 詩、si3 試、si5 市是很适合成组比较的声调练习。", source: "六声调" },
  { id: "ending-m", prompt: "哪个字的粤拼以 -m 收尾？", answer: "心", jyutping: "sam1", options: ["心", "山", "生"], note: "心 sam1 的 -m 在口腔闭合处收住；山 saan1 和生 saang1 要继续对比。", source: "声音地图" },
];
