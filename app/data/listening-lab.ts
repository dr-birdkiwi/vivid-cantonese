export type AudioContrast = {
  id: string;
  label: string;
  left: { text: string; jyutping: string; meaning: string };
  right: { text: string; jyutping: string; meaning: string };
  note: string;
};

export type ConnectedSpeechItem = {
  id: string;
  phrase: string;
  jyutping: string;
  meaning: string;
  chunks: string[];
  note: string;
};

export const audioContrasts: AudioContrast[] = [
  { id: "hai-tone", label: "同音不同调", left: { text: "係", jyutping: "hai6", meaning: "是" }, right: { text: "喺", jyutping: "hai2", meaning: "在" }, note: "两个字声母和韵母相近，靠声调和句子位置分辨；喺通常放在地点或正在发生的结构里。" },
  { id: "maai-tone", label: "买卖对比", left: { text: "買", jyutping: "maai5", meaning: "买" }, right: { text: "賣", jyutping: "maai6", meaning: "卖" }, note: "maai5 由低位向上，maai6 低而平；在街市、购物和工作沟通里都很实用。" },
  { id: "zou-zau", label: "韵母对比", left: { text: "早", jyutping: "zou2", meaning: "早／早晨" }, right: { text: "走", jyutping: "zau2", meaning: "走" }, note: "ou 和 au 不是一个音；早 zou2、走 zau2 适合放在同一轮慢听。" },
  { id: "saam-sam", label: "韵尾对比", left: { text: "三", jyutping: "saam1", meaning: "三" }, right: { text: "心", jyutping: "sam1", meaning: "心" }, note: "saam1 以 -m 收尾但保留长元音，sam1 的元音较短；先听元音，再听收音。" },
  { id: "saan-saang", label: "-n / -ng", left: { text: "山", jyutping: "saan1", meaning: "山" }, right: { text: "生", jyutping: "saang1", meaning: "生／出生" }, note: "saan1 在舌尖位置收 -n，saang1 在后部收 -ng；不要把两个鼻音尾混成普通话的 n。" },
  { id: "bak-baak", label: "入声＋声调", left: { text: "北", jyutping: "bak1", meaning: "北" }, right: { text: "白", jyutping: "baak6", meaning: "白" }, note: "两字都有 -k 韵尾，但韵母长短和声调不同；入声尾要短促收住。" },
  { id: "cin-tone", label: "声调辨认", left: { text: "錢", jyutping: "cin2", meaning: "钱" }, right: { text: "前", jyutping: "cin4", meaning: "前／以前" }, note: "cin2 高升，cin4 低降或低平；听完整词组会比孤立音节更容易。" },
  { id: "m4-mou5", label: "日常高频词", left: { text: "唔", jyutping: "m4", meaning: "不／没（动作）" }, right: { text: "冇", jyutping: "mou5", meaning: "没有" }, note: "唔是否定动词或形容词，冇是“没有／不存在”的整词；这是普通话使用者最值得先分清的一组。" },
];

export const connectedSpeechItems: ConnectedSpeechItem[] = [
  { id: "repair-heard", phrase: "唔好意思，頭先嗰句我聽唔清。", jyutping: "m4 hou2 ji3 si1, tau4 sin1 go2 geoi3 ngo5 teng1 m4 cing1.", meaning: "不好意思，刚才那句我听不清。", chunks: ["唔好意思", "頭先嗰句", "我聽唔清"], note: "先抓唔好意思，再抓聽唔清；中间的嗰句常会被压得很轻。" },
  { id: "waiting-now", phrase: "我而家喺樓下等緊你。", jyutping: "ngo5 ji4 gaa1 hai2 lau4 haa6 dang2 gan2 nei5.", meaning: "我现在在楼下等你。", chunks: ["我而家", "喺樓下", "等緊你"], note: "而家、喺和緊连在一起时，信息集中在时间、地点和进行状态三个位置。" },
  { id: "reply-later", phrase: "如果方便嘅話，麻煩你覆一覆我。", jyutping: "jyu4 gwo2 fong1 bin6 ge3 waa6, maa4 faan4 nei5 fuk1 jat1 fuk1 ngo5.", meaning: "如果方便的话，麻烦你回复我一下。", chunks: ["如果方便嘅話", "麻煩你", "覆一覆我"], note: "嘅話是条件框架；覆一覆是轻量、礼貌的请求，不等于正式书面语“回复”。" },
  { id: "check-first", phrase: "等我睇下先，再覆你。", jyutping: "dang2 ngo5 tai2 haa5 sin1, zoi3 fuk1 nei5.", meaning: "让我先看一下，再回复你。", chunks: ["等我睇下先", "再覆你"], note: "下先和再把先后顺序说清楚；自然语速下，睇下先往往是一整块听。" },
  { id: "not-sure", phrase: "我唔係好肯定，可能要問下人。", jyutping: "ngo5 m4 hai6 hou2 hang2 ding6, ho2 nang4 jiu3 man6 haa5 jan4.", meaning: "我不太确定，可能要问问别人。", chunks: ["我唔係好肯定", "可能", "要問下人"], note: "唔係好＋形容词是很常见的缓和表达，语气比直接说“不确定”更自然。" },
  { id: "no-rush", phrase: "唔使急，慢慢嚟就得喇。", jyutping: "m4 sai2 gap1, maan6 maan6 lai4 zau6 dak1 laa3.", meaning: "不用急，慢慢来就行了。", chunks: ["唔使急", "慢慢嚟", "就得喇"], note: "就得喇把结论收得很轻松；连续三个短块，是练习粤语节奏的好句子。" },
  { id: "meal-check", phrase: "你食咗飯未呀？", jyutping: "nei5 sik6 zo2 faan6 mei6 aa3?", meaning: "你吃饭了吗？", chunks: ["你食咗飯", "未呀"], note: "咗表示完成，未把问题打开；未呀在快语流里常听起来像一个短尾巴。" },
  { id: "come-back", phrase: "我陣間返嚟，你哋先行住。", jyutping: "ngo5 zan6 gaan1 faan1 lai4, nei5 dei6 sin1 haang4 zyu6.", meaning: "我一会儿回来，你们先走吧。", chunks: ["我陣間返嚟", "你哋先行住"], note: "陣間是香港口语里很常用的“一会儿”；住在这里表示先维持这个安排。" },
];
