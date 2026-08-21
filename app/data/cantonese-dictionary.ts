export type CantoneseDictionaryEntry = {
  mandarin: string;
  cantonese: string;
  jyutping: string;
  note: string;
  tag: string;
  example: string;
};

export const bridgeEntries: CantoneseDictionaryEntry[] = [
  { mandarin: "没有", cantonese: "冇", jyutping: "mou5", note: "日常口语最常见的替换词。", tag: "口语替换", example: "我而家冇時間。" },
  { mandarin: "不", cantonese: "唔", jyutping: "m4", note: "普通话的“不”通常不能直接读成粤语。", tag: "口语替换", example: "我唔知。" },
  { mandarin: "是", cantonese: "係", jyutping: "hai6", note: "判断句、确认和“是不是”中的核心词。", tag: "核心词", example: "係咪你呀？" },
  { mandarin: "在", cantonese: "喺", jyutping: "hai2", note: "表示地点，不要和“係”混淆。", tag: "核心词", example: "我喺公司。" },
  { mandarin: "现在", cantonese: "而家", jyutping: "ji4 gaa1", note: "高频整词记忆，不能只按汉字读音推。", tag: "必须记", example: "而家方便講電話嗎？" },
  { mandarin: "喜欢", cantonese: "鍾意", jyutping: "zung1 ji3", note: "比直译“喜歡”更自然的日常说法。", tag: "自然表达", example: "你鍾意食辣嘢嗎？" },
  { mandarin: "东西", cantonese: "嘢", jyutping: "je5", note: "泛指东西、事情或某种内容。", tag: "口语替换", example: "呢啲嘢幾好食。" },
  { mandarin: "漂亮", cantonese: "靚", jyutping: "leng3", note: "描述外表、设计或效果时，日常粤语更常用靚。", tag: "自然表达", example: "今日件衫幾靚喎。" },
  { mandarin: "哪里", cantonese: "邊度", jyutping: "bin1 dou6", note: "香港日常问地点的常用词组。", tag: "疑问词", example: "你而家喺邊度？" },
  { mandarin: "多少", cantonese: "幾多", jyutping: "gei2 do1", note: "问数量或价格都用幾多；买东西时尤其高频。", tag: "疑问词", example: "呢個幾多錢？" },
  { mandarin: "为什么", cantonese: "點解", jyutping: "dim2 gaai2", note: "比书面“為什麼”更口语。", tag: "疑问词", example: "你點解唔食飯？" },
  { mandarin: "怎么", cantonese: "點", jyutping: "dim2", note: "怎么做、怎么说等句式里通常用點开头。", tag: "疑问词", example: "呢個要點做？" },
  { mandarin: "怎么做", cantonese: "點做", jyutping: "dim2 zou6", note: "把疑问词和动作一起记，比逐字读更接近日常表达。", tag: "疑问词", example: "呢個要點做？" },
  { mandarin: "什么", cantonese: "咩", jyutping: "me1", note: "咩是最常用的短疑问词；乜嘢则更完整。", tag: "疑问词", example: "你想食咩？" },
  { mandarin: "等一下", cantonese: "等陣", jyutping: "dang2 zan6", note: "适合电话、排队和短暂等待。", tag: "场景短语", example: "等陣先，我未準備好。" },
  { mandarin: "刚才", cantonese: "頭先", jyutping: "tau4 sin1", note: "指刚刚发生的事情，听力修复和复述时很常用。", tag: "时间词", example: "頭先嗰句我聽唔清。" },
  { mandarin: "刚刚", cantonese: "啱啱", jyutping: "ngaam1 ngaam1", note: "比“剛剛”更像口语，表示事情刚发生。", tag: "时间词", example: "我啱啱到。" },
  { mandarin: "晚一点", cantonese: "遲啲", jyutping: "ci4 di1", note: "回复消息、改约时间时的高频说法。", tag: "时间词", example: "我遲啲再覆你。" },
  { mandarin: "回复", cantonese: "覆", jyutping: "fuk1", note: "香港粤语里覆消息、覆电话都很常见。", tag: "沟通用语", example: "我遲啲覆你。" },
  { mandarin: "听不清", cantonese: "聽唔清", jyutping: "teng1 m4 cing1", note: "电话和面对面沟通中，用来定位听力问题。", tag: "听力修复", example: "唔好意思，頭先嗰句我聽唔清。" },
  { mandarin: "有空", cantonese: "得閒", jyutping: "dak1 haan4", note: "约人或确认时间时，得閒比“有時間”更自然。", tag: "约时间", example: "你得閒一齊食飯？" },
  { mandarin: "一起", cantonese: "一齊", jyutping: "jat1 cai4", note: "邀请别人一起做事的高频词。", tag: "社交表达", example: "得閒一齊飲茶。" },
  { mandarin: "是不是", cantonese: "係咪", jyutping: "hai6 mai6", note: "高频的是非问句格式。", tag: "句式", example: "你係咪第一次嚟？" },
  { mandarin: "有没有", cantonese: "有冇", jyutping: "jau5 mou5", note: "有冇是粤语里最常见的“有没有”问法。", tag: "句式", example: "附近有冇洗手間？" },
  { mandarin: "要不要", cantonese: "要唔要", jyutping: "jiu3 m4 jiu3", note: "正反问句的高频结构，买东西和邀约都常用。", tag: "句式", example: "你要唔要一齊去？" },
  { mandarin: "能不能", cantonese: "可唔可以", jyutping: "ho2 m4 ho2 ji5", note: "请求别人做某事时，比直译“能不能”更自然。", tag: "句式", example: "可唔可以講慢啲？" },
  { mandarin: "可以吗", cantonese: "得唔得", jyutping: "dak1 m4 dak1", note: "询问可行性、许可或是否妥当。", tag: "句式", example: "聽日三點見，得唔得？" },
  { mandarin: "你好", cantonese: "你好", jyutping: "nei5 hou2", note: "粤语里仍然常用；重点是声调和语气。", tag: "日常开口", example: "你好，第一次見。" },
  { mandarin: "谢谢", cantonese: "唔該", jyutping: "m4 goi1", note: "感谢别人帮忙、提供服务时最常用。", tag: "礼貌表达", example: "唔該晒。" },
  { mandarin: "对不起", cantonese: "唔好意思", jyutping: "m4 hou2 ji3 si1", note: "道歉、打扰别人或请求重复时都能用。", tag: "礼貌表达", example: "唔好意思，借借。" },
  { mandarin: "再见", cantonese: "拜拜", jyutping: "baai1 baai3", note: "日常分别常说拜拜；正式场合可用下次見。", tag: "日常开口", example: "咁我走先，拜拜！" },
  { mandarin: "我们", cantonese: "我哋", jyutping: "ngo5 dei6", note: "哋是粤语复数标记，常和人称代词一起记。", tag: "人称代词", example: "我哋一陣見。" },
  { mandarin: "你们", cantonese: "你哋", jyutping: "nei5 dei6", note: "不要把普通话“们”直接读成粤语音。", tag: "人称代词", example: "你哋食咗飯未？" },
  { mandarin: "他们", cantonese: "佢哋", jyutping: "keoi5 dei6", note: "他、她、它在日常粤语里通常都用佢。", tag: "人称代词", example: "佢哋仲未到。" },
  { mandarin: "他", cantonese: "佢", jyutping: "keoi5", note: "口语里不按普通话“他”的读音处理。", tag: "人称代词", example: "佢係我同事。" },
  { mandarin: "这里", cantonese: "呢度", jyutping: "ni1 dou6", note: "呢 + 度是指当前位置的高频组合。", tag: "指示词", example: "呢度有人坐喎。" },
  { mandarin: "那里", cantonese: "嗰度", jyutping: "go2 dou6", note: "嗰度和呢度成对记忆。", tag: "指示词", example: "我喺嗰度等你。" },
  { mandarin: "什么时候", cantonese: "幾時", jyutping: "gei2 si4", note: "幾時问时间点，幾耐问持续多久。", tag: "疑问词", example: "你幾時得閒？" },
  { mandarin: "今天", cantonese: "今日", jyutping: "gam1 jat6", note: "今日是常用说法；正式书面语也会看到今天。", tag: "时间词", example: "今日放工食飯？" },
  { mandarin: "明天", cantonese: "聽日", jyutping: "ting1 jat6", note: "聽日是高频口语整词。", tag: "时间词", example: "聽日再講。" },
  { mandarin: "昨天", cantonese: "琴日", jyutping: "kam4 jat6", note: "琴日比昨日更像日常对话。", tag: "时间词", example: "琴日落大雨。" },
  { mandarin: "当然", cantonese: "梗係", jyutping: "gang2 hai6", note: "梗係可以表达当然、明显是这样。", tag: "回应语气", example: "梗係得啦。" },
  { mandarin: "没关系", cantonese: "唔緊要", jyutping: "m4 gan2 jiu3", note: "回应道歉或小问题时很常见。", tag: "回应语气", example: "唔緊要，下次小心啲。" },
  { mandarin: "没办法", cantonese: "冇辦法", jyutping: "mou5 baan6 faat3", note: "冇辦法比“沒有辦法”更口语。", tag: "口语替换", example: "冇辦法，唯有等陣。" },
  { mandarin: "不方便", cantonese: "唔方便", jyutping: "m4 fong1 bin6", note: "说明现在不适合通话、见面或处理某件事。", tag: "状态说明", example: "我而家唔方便講電話。" },
  { mandarin: "看一下", cantonese: "睇下", jyutping: "tai2 haa5", note: "请求对方看一眼或自己先查看时的口语说法。", tag: "口语替换", example: "你睇下邊個出口近啲。" },
  { mandarin: "说一下", cantonese: "講下", jyutping: "gong2 haa5", note: "下让请求变轻、更像自然对话。", tag: "口语替换", example: "你講下想點安排。" },
  { mandarin: "帮我", cantonese: "幫我", jyutping: "bong1 ngo5", note: "提出请求时常和可唔可以、唔該一起使用。", tag: "请求表达", example: "可唔可以幫我睇下？" },
  { mandarin: "给我", cantonese: "俾我", jyutping: "bei2 ngo5", note: "俾我、俾你是非常高频的给与结构。", tag: "请求表达", example: "你打字俾我啦。" },
  { mandarin: "真的", cantonese: "真係", jyutping: "zan1 hai6", note: "真係可表达确认、惊讶或强调。", tag: "回应语气", example: "真係幾好食。" },
  { mandarin: "好吃", cantonese: "好食", jyutping: "hou2 sik6", note: "食在粤语里可以表示吃，也可以表示好吃。", tag: "生活词", example: "呢間嘢真係好食。" },
  { mandarin: "吃饭", cantonese: "食飯", jyutping: "sik6 faan6", note: "食是最常见的“吃”字口语读法。", tag: "生活词", example: "你食咗飯未？" },
  { mandarin: "喝茶", cantonese: "飲茶", jyutping: "jam2 caa4", note: "飲茶也可以指去茶楼吃点心。", tag: "生活词", example: "得閒一齊飲茶。" },
  { mandarin: "上班", cantonese: "返工", jyutping: "faan1 gung1", note: "返工是去工作；收工是下班。", tag: "工作用语", example: "我返緊工，遲啲覆你。" },
  { mandarin: "下班", cantonese: "收工", jyutping: "sau1 gung1", note: "收工既可表示下班，也可表示工作暂告一段落。", tag: "工作用语", example: "我收工先搵你。" },
  { mandarin: "回家", cantonese: "返屋企", jyutping: "faan1 uk1 kei2", note: "屋企是粤语里非常高频的“家”。", tag: "生活词", example: "我而家返屋企。" },
  { mandarin: "多少钱", cantonese: "幾多錢", jyutping: "gei2 do1 cin2", note: "买东西、结账时用幾多錢。", tag: "购物用语", example: "呢個幾多錢？" },
  { mandarin: "有空吗", cantonese: "得唔得閒", jyutping: "dak1 m4 dak1 haan4", note: "约人和确认时间时很实用。", tag: "约时间", example: "你今晚得唔得閒？" },
  { mandarin: "不知道", cantonese: "唔知", jyutping: "m4 zi1", note: "唔知是日常对话最常用的“不知道”。", tag: "口语替换", example: "我唔知喎。" },
  { mandarin: "可以", cantonese: "得", jyutping: "dak1", note: "得可以表示可以、行、没问题。", tag: "口语替换", example: "咁樣得唔得？" },
  { mandarin: "不可以", cantonese: "唔得", jyutping: "m4 dak1", note: "唔得比“不可以”更自然直接。", tag: "口语替换", example: "今日唔得，聽日先。" },
  { mandarin: "还有", cantonese: "仲有", jyutping: "zung6 jau5", note: "仲有表示仍然有、另外还有。", tag: "核心词", example: "仲有冇位？" },
  { mandarin: "怎么办", cantonese: "點算", jyutping: "dim2 syun3", note: "遇到突发情况时的高频反应。", tag: "应急表达", example: "而家點算好？" },
  { mandarin: "我不知道", cantonese: "我唔知", jyutping: "ngo5 m4 zi1", note: "把人称和否定词一起练，开口更快。", tag: "完整短句", example: "我唔知佢去咗邊。" },
  { mandarin: "我现在没有时间", cantonese: "我而家冇時間", jyutping: "ngo5 ji4 gaa1 mou5 si4 gaan3", note: "整句同时练习人称、时间和冇的替换。", tag: "完整短句", example: "我而家冇時間，遲啲再講。" },
  { mandarin: "你在做什么", cantonese: "你做緊咩", jyutping: "nei5 zou6 gan2 me1", note: "做緊表示正在做，咩是高频口语疑问词。", tag: "完整短句", example: "你做緊咩呀？" },
  { mandarin: "请说慢一点", cantonese: "可唔可以講慢啲", jyutping: "ho2 m4 ho2 ji5 gong2 maan6 di1", note: "把礼貌请求和程度词放进真实听力修复。", tag: "完整短句", example: "可唔可以講慢啲？" },
  { mandarin: "没问题", cantonese: "冇問題", jyutping: "mou5 man6 tai4", note: "回应安排、请求和确认时都很常用。", tag: "回应语气", example: "冇問題，交俾我啦。" },
  { mandarin: "好久不见", cantonese: "好耐冇見", jyutping: "hou2 noi6 mou5 gin3", note: "耐表示时间长；冇見是没有见面。", tag: "社交表达", example: "好耐冇見，最近點呀？" },
  { mandarin: "再说一次", cantonese: "再講一次", jyutping: "zoi3 gong2 jat1 ci3", note: "搭配唔好意思或可唔可以会更礼貌。", tag: "听力修复", example: "唔好意思，可唔可以再講一次？" },
];

const simplifiedToTraditional: Record<string, string> = {
  没: "沒", 有: "有", 个: "個", 这: "這", 这: "這", 那: "那", 哪: "哪", 们: "們", 他: "他", 她: "她", 你: "你", 现: "現", 在: "在", 欢: "歡", 东: "東", 西: "西", 么: "麼", 为: "為", 什: "什", 么: "麼", 习: "習", 说: "說", 见: "見", 谢: "謝", 再: "再", 对: "對", 起: "起", 这: "這", 里: "裡", 时: "時", 间: "間", 今: "今", 天: "天", 明: "明", 昨: "昨", 工: "工", 作: "作", 吃: "吃", 饭: "飯", 喝: "喝", 茶: "茶", 回: "回", 家: "家", 多: "多", 钱: "錢", 问: "問", 题: "題", 知: "知", 道: "道", 还: "還", 怎: "怎", 麼: "麼", 办: "辦", 法: "法", 真: "真", 好: "好", 味: "味", 上: "上", 班: "班", 下: "下", 朋: "朋", 友: "友", 需: "需", 要: "要", 帮: "幫", 忙: "忙", 可: "可", 以: "以", 什: "什", 么: "麼", 讲: "講", 慢: "慢", 一: "一", 点: "點", 现: "現", 电: "電", 话: "話", 该: "該", 处: "處", 理: "理", 复: "複", 复: "複", 读: "讀", 音: "音", 学: "學", 女: "女", 国: "國", 八: "八", 百: "百", 北: "北", 六: "六", 十: "十", 心: "心", 新: "新", 生: "生", 车: "車", 站: "站", 路: "路", 左: "左", 右: "右", 中: "中", 环: "環", 机: "機", 场: "場", 线: "線", 转: "轉", 出: "出", 口: "口", 远: "遠", 近: "近", 清: "清", 楚: "楚", 第: "第", 句: "句", 钟: "鐘", 分: "分", 先: "先", 后: "後", 其: "其", 它: "它", 俩: "倆", 处: "處", 觉: "覺", 得: "得", 喜: "喜", 欢: "歡", 话: "話", 语: "語", 词: "詞", 视: "視", 听: "聽", 讲: "講", 谁: "誰", 让: "讓", 再: "再", 试: "試", 识: "識", 别: "別", 过: "過", 变: "變", 体: "體", 对: "對", 该: "該", 轻: "輕", 松: "鬆", 诉: "訴", 诉: "訴", 许: "許", 诉: "訴", 线: "線", 线: "線", 号: "號", 级: "級", 见: "見", 开: "開", 关: "關", 门: "門", 间: "間", 够: "夠", 难: "難", 认: "認", 识: "識", 义: "義", 备: "備", 记: "記", 忘: "忘", 课: "課", 题: "題", 进: "進", 阶: "階", 挑: "挑", 战: "戰", 场: "場", 景: "景", 课: "課", 程: "程", 复: "複", 习: "習", 试: "試", 听: "聽", 力: "力", 实: "實", 验: "驗", 室: "室", 粤: "粵", 语: "語", 发: "發", 飞: "飛", 声: "聲", 调: "調", 韵: "韻", 尾: "尾", 规: "規", 律: "律", 异: "異", 读: "讀", 写: "寫", 字: "字", 通: "通", 过: "過", 里: "裡", 头: "頭", 刚: "剛", 才: "才", 最: "最", 结: "結", 果: "果", 需: "需", 仅: "僅", 逐: "逐", 该: "該", 仍: "仍", 旧: "舊", 识: "識", 决: "決", 定: "定", 选: "選", 择: "擇", 手: "手", 动: "動", 提: "提", 供: "供", 设: "設", 置: "置", 全: "全", 部: "部", 当: "當", 前: "前", 设: "設", 备: "備", 安: "安", 装: "裝", 音: "音", 色: "色", 自: "自", 然: "然", 口: "口", 说: "說", 法: "法", 直: "直", 接: "接", 拆: "拆", 解: "解", 高: "高", 频: "頻", 词: "詞", 库: "庫", 搜: "搜", 索: "索", 输: "輸", 入: "入", 任: "任", 意: "意", 单: "單", 多: "多", 繁: "繁", 简: "簡", 都: "都", 支: "支", 持: "持", 正: "正", 确: "確", 标: "標", 注: "註", 读: "讀", 播: "播", 放: "放", 逐: "逐", 个: "個", 可: "可", 以: "以", 识: "識", 未: "未", 收: "收", 录: "錄", 先: "先", 听: "聽", 再: "再", 看: "看", 结: "結", 果: "果", 部: "部", 分: "分", 仍: "仍", 未: "未", 完: "完", 整: "整", 查: "查", 看: "看", 结: "結", 果: "果", 请: "請", 选: "選", 目: "目", 录: "錄", 传: "傳", 统: "統", 繁: "繁", 体: "體", 简: "簡", 体: "體"
};

const characterPronunciations: Record<string, string> = {
  我: "ngo5", 你: "nei5", 好: "hou2", 唔: "m4", 冇: "mou5", 有: "jau5", 係: "hai6", 喺: "hai2", 佢: "keoi5", 哋: "dei6", 呢: "ni1", 嗰: "go2", 度: "dou6", 邊: "bin1", 點: "dim2", 解: "gaai2", 咩: "me1", 乜: "mat1", 嘢: "je5", 俾: "bei2", 等: "dang2", 陣: "zan6", 先: "sin1", 再: "zoi3", 次: "ci3", 一: "jat1", 個: "go3", 幾: "gei2", 多: "do1", 錢: "cin2", 大: "daai6", 細: "sai3", 快: "faai3", 慢: "maan6", 清: "cing1", 楚: "co2", 句: "geoi3", 時: "si4", 間: "gaan3", 今: "gam1", 日: "jat6", 明: "ming4", 天: "tin1", 昨: "zok3", 聽: "teng1", 講: "gong2", 話: "waa6", 問: "man6", 答: "daap3", 想: "soeng2", 要: "jiu3", 知: "zi1", 明: "ming4", 白: "baak6", 真: "zan1", 食: "sik6", 飯: "faan6", 飲: "jam2", 茶: "caa4", 水: "seoi2", 返: "faan1", 工: "gung1", 收: "sau1", 屋: "uk1", 企: "kei5", 朋友: "pang4 jau5", 返: "faan1", 車: "ce1", 站: "zaam6", 落: "lok6", 轉: "zyun2", 路: "lou6", 行: "haang4", 近: "gan6", 遠: "jyun5", 左: "zo2", 右: "jau6", 中: "zung1", 環: "waan4", 機: "gei1", 場: "coeng4", 學: "hok6", 八: "baat3", 女: "neoi5", 心: "sam1", 新: "san1", 生: "saang1", 國: "gwok3", 北: "bak1", 百: "baak3", 十: "sap6", 六: "luk6", 單: "daan1", 甜: "tim4", 冰: "bing1", 凍: "dung3", 包: "baau1", 奶: "naai5", 檸: "ling4", 早: "zou2", 晨: "san4", 晚: "maan5", 夜: "je6", 飲: "jam2", 住: "zyu6", 返: "faan1", 見: "gin3", 來: "loi4", 去: "heoi3", 到: "dou3", 會: "wui5", 得: "dak1", 仲: "zung6", 再: "zoi3", 幫: "bong1", 手: "sau2", 閒: "haan4", 平: "peng4", 正: "zeng3", 算: "syun3", 啱: "ngaam1", 細: "sai3", 大: "daai6", 頭: "tau4", 先: "sin1", 最: "zeoi3", 後: "hau6", 聲: "sing1", 調: "diu6", 讀: "duk6", 音: "jam1", 會: "wui5", 變: "bin3", 知: "zi1"
};

// This second layer is intentionally for literal reading only. It fills in common
// characters that are not themselves natural Cantonese substitutions, so learners
// can still ask: “how would these exact Chinese characters sound in Cantonese?”
const additionalCharacterPronunciations: Record<string, string> = {
  他: "taa1", 她: "taa1", 們: "mun4", 這: "ze5", 裡: "lei5", 那: "naa5", 哪: "naa5",
  現: "jin6", 在: "zoi6", 沒: "mut6", 而: "ji4", 家: "gaa1", 嗎: "maa3", 怎: "zam2",
  麼: "mo1", 什: "sap6", 樣: "joeng6", 做: "zou6", 能: "nang4", 夠: "gau3", 不: "bat1",
  方: "fong1", 便: "bin6", 打: "daa2", 字: "zi6", 下: "haa5", 睇: "tai2", 啦: "laa1",
  咁: "gam2", 喎: "wo3", 問: "man6", 洗: "sai2", 跟: "gan1", 齊: "cai4", 剛: "gong1",
  遲: "ci4", 覆: "fuk1", 已: "ji5", 經: "ging1", 之: "zi1", 如: "jyu4", 果: "gwo2",
  會: "wui5", 對: "deoi3", 讓: "joeng6", 自: "zi6", 己: "gei2", 發: "faat3",
  語: "jyu5", 詞: "ci4", 說: "syut3", 試: "si3", 識: "sik1", 別: "bit6", 過: "gwo3", 回: "wui4",
  看: "hon3", 聽: "teng1", 讀: "duk6", 寫: "se2", 直: "zik6", 接: "zip3", 請: "cing2",
  給: "kap1", 给: "kap1", 錯: "co3", 复: "fuk1", 複: "fuk1", 習: "zaap6", 練: "lin6",
  開: "hoi1", 始: "ci2", 周: "zau1", 五: "ng5", 前: "cin4", 仍: "jing4", 其: "kei4",
  外: "ngoi6", 飛: "fei1", 最: "zeoi3", 尾: "mei5", 概: "koi3", 出: "ceot1", 口: "hau2",
  近: "gan6", 由: "jau4", 估: "gu2", 計: "gai3", 大: "daai6", 約: "joek3", 安: "on1",
  排: "paai4", 隊: "deoi6", 表: "biu2", 帶: "daai3", 證: "zing3", 件: "gin6", 資: "zi1",
  料: "liu6", 通: "tung1", 常: "soeng4", 結: "git3",
};

export const pronunciationByCharacter: Record<string, string> = { ...characterPronunciations, ...additionalCharacterPronunciations, 可: "ho2", 以: "ji5", 麻: "maa4", 煩: "faan4", 再: "zoi3", 講: "gong2" };

export function normalizeText(value: string) {
  return Array.from(value).map((character) => simplifiedToTraditional[character] || character).join("");
}

export function isChinese(character: string) {
  return /[\u3400-\u9fff]/u.test(character);
}

export type CantoneseLookupSegment = {
  source: string;
  output: string;
  jyutping: string;
  known: boolean;
};

export type CantoneseLookupResult = {
  input: string;
  normalizedInput: string;
  cantonese: string;
  jyutping: string;
  literalText: string;
  literalJyutping: string;
  literalSegments: CantoneseLookupSegment[];
  literalComplete: boolean;
  segments: CantoneseLookupSegment[];
  exact: boolean;
  complete: boolean;
  note: string;
};

const normalizedEntries = bridgeEntries.map((entry) => ({ entry, mandarin: normalizeText(entry.mandarin) })).sort((left, right) => right.mandarin.length - left.mandarin.length);

function makeEmptyResult(input: string): CantoneseLookupResult {
  return { input, normalizedInput: "", cantonese: "", jyutping: "", literalText: "", literalJyutping: "", literalSegments: [], literalComplete: false, segments: [], exact: false, complete: false, note: "请输入一字或一句中文。" };
}

function makeLiteralReading(normalizedInput: string, displayText: string) {
  const literalSegments = Array.from(normalizedInput).map((character) => {
    if (!isChinese(character)) return { source: character, output: character, jyutping: "", known: true };
    const jyutping = pronunciationByCharacter[character] || "";
    return { source: character, output: character, jyutping, known: Boolean(jyutping) };
  });
  const chineseSegments = literalSegments.filter((segment) => isChinese(segment.source));
  return {
    literalText: displayText,
    literalJyutping: literalSegments.map((segment) => segment.jyutping).filter(Boolean).join(" "),
    literalSegments,
    literalComplete: chineseSegments.length > 0 && chineseSegments.every((segment) => segment.known),
  };
}

export function lookupCantonese(input: string): CantoneseLookupResult {
  const trimmed = input.trim();
  if (!trimmed) return makeEmptyResult(input);
  const normalizedInput = normalizeText(trimmed);
  if (!Array.from(normalizedInput).some(isChinese)) return { ...makeEmptyResult(input), normalizedInput, note: "这里先输入中文；简体和繁体都可以。" };
  const literalReading = makeLiteralReading(normalizedInput, trimmed);

  const exact = normalizedEntries.find(({ mandarin }) => mandarin === normalizedInput);
  const existingCantonese = exact || normalizedEntries.find(({ entry }) => normalizeText(entry.cantonese) === normalizedInput);
  if (existingCantonese) {
    return {
      input,
      normalizedInput,
      cantonese: existingCantonese.entry.cantonese,
      jyutping: existingCantonese.entry.jyutping,
      ...literalReading,
      segments: [{ source: normalizedInput, output: existingCantonese.entry.cantonese, jyutping: existingCantonese.entry.jyutping, known: true }],
      exact: true,
      complete: true,
      note: exact ? `${existingCantonese.entry.tag}：${existingCantonese.entry.note}` : "这句已经是粤语写法；下面是对应粤拼和试听。",
    };
  }

  const segments: CantoneseLookupSegment[] = [];
  let index = 0;
  while (index < normalizedInput.length) {
    const phrase = normalizedEntries.find(({ mandarin }) => mandarin.length > 1 && normalizedInput.startsWith(mandarin, index));
    if (phrase) {
      segments.push({ source: normalizedInput.slice(index, index + phrase.mandarin.length), output: phrase.entry.cantonese, jyutping: phrase.entry.jyutping, known: true });
      index += phrase.mandarin.length;
      continue;
    }
    const character = normalizedInput[index];
    if (!isChinese(character)) {
      segments.push({ source: character, output: character, jyutping: "", known: true });
      index += 1;
      continue;
    }
    const jyutping = pronunciationByCharacter[character] || "";
    segments.push({ source: character, output: character, jyutping, known: Boolean(jyutping) });
    index += 1;
  }

  const complete = segments.filter((segment) => isChinese(segment.source)).every((segment) => segment.known);
  return {
    input,
    normalizedInput,
    cantonese: segments.map((segment) => segment.output).join(""),
    jyutping: segments.map((segment) => segment.jyutping).filter(Boolean).join(" "),
    ...literalReading,
    segments,
    exact: false,
    complete,
    note: complete ? "已按已收录的高频词组和逐字粤拼标注；整句仍建议放进场景里再听一次。" : "橙色部分已识别；灰色字暂未收录，先不要把它当成确定读音。",
  };
}
