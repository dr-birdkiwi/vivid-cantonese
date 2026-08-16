export type CourseLesson = {
  title: string;
  phrase: string;
  jyutping: string;
  mandarin: string;
  focus: string;
  note: string;
};

export type VocabularyItem = {
  word: string;
  jyutping: string;
  meaning: string;
  note: string;
};

export type GrammarPoint = {
  pattern: string;
  label: string;
  example: string;
  jyutping: string;
  note: string;
};

export type Challenge = {
  title: string;
  situation: string;
  phrase: string;
  jyutping: string;
  note: string;
};

export type CourseUnit = {
  number: string;
  slug: string;
  title: string;
  copy: string;
  phrase: string;
  jyutping: string;
  color: string;
  track: string;
  level: string;
  audience: string;
  goal: string;
  lessons: CourseLesson[];
  vocabulary: VocabularyItem[];
  grammar: GrammarPoint[];
  challenges: Challenge[];
};

export const courseTracks = [
  { label: "0–3 个月", title: "先把生活办成", copy: "听不清、点餐、问路、买东西：先建立开口的安全感。", units: "01–04", color: "coral" },
  { label: "3–12 个月", title: "把日常接顺", copy: "电话、工作、约时间和社交，开始处理连续两三轮对话。", units: "05–08", color: "gold" },
  { label: "1–2 年", title: "说得更像本地", copy: "住房、看医生、办手续和投诉，学习语气、体貌和策略。", units: "09–12", color: "mint" },
  { label: "2–5 年", title: "听懂弦外之音", copy: "家庭、邻里、续租和职场协商，进入含蓄表达与关系管理。", units: "13–16", color: "violet" },
];

export const courseUnits: CourseUnit[] = [
  {
    number: "01", slug: "repair-the-conversation", title: "先把对话接回来", copy: "澄清、重复、确认和修复对话", phrase: "唔好意思，可唔可以再講一次？", jyutping: "m4 hou2 ji3 si1, ho2 m4 ho2 ji5 zoi3 gong2 jat1 ci3?", color: "coral", track: "0–3 个月", level: "生存基础", audience: "刚到香港，能读中文但听不完整句", goal: "你不需要假装听懂；你要学会让对方慢下来，并用粤语确认关键信息。",
    lessons: [
      { title: "请对方再说一次", phrase: "唔好意思，可唔可以再講一次？", jyutping: "m4 hou2 ji3 si1, ho2 m4 ho2 ji5 zoi3 gong2 jat1 ci3?", mandarin: "不好意思，可以再说一次吗？", focus: "礼貌开口", note: "唔好意思先接住语气，再提出请求，比直接说“再说一次”柔和。" },
      { title: "请对方说慢一点", phrase: "可唔可以講慢啲？", jyutping: "ho2 m4 ho2 ji5 gong2 maan6 di1?", mandarin: "可以说慢一点吗？", focus: "程度表达", note: "啲表示程度稍微增加；慢啲、快啲、清楚啲都非常高频。" },
      { title: "确认自己有没有听错", phrase: "你係咪話星期五？", jyutping: "nei5 hai6 mai6 waa6 sing1 kei4 ng5?", mandarin: "你是说星期五吗？", focus: "是非问句", note: "係咪把普通话“是不是”变成自然的确认句。" },
      { title: "给对方继续说的信号", phrase: "哦，明白，咁你繼續啦。", jyutping: "o4, ming4 baak6, gam2 nei5 gai3 zuk6 laa1.", mandarin: "哦，明白，那你继续吧。", focus: "连接语气", note: "咁是“那么 / 这样”的连接词，繼續啦让对方知道你还在听。" },
      { title: "指出听不清的部分", phrase: "頭先最後嗰句我聽唔清。", jyutping: "tau4 sin1 zeoi3 hau6 go2 geoi3 ngo5 teng1 m4 cing1.", mandarin: "刚才最后那句我听不清。", focus: "听力修复", note: "嗰句把问题定位到具体内容，不会让对方从头重复整段。" },
      { title: "用自己的话复述", phrase: "如果我冇聽錯，你係想我星期五之前交？", jyutping: "jyu4 gwo2 ngo5 mou5 teng1 co3, nei5 hai6 soeng2 ngo5 sing1 kei4 ng5 zi1 cin4 gaau1?", mandarin: "如果我没听错，你是想我周五之前交？", focus: "进阶确认", note: "先复述再确认，是工作和办事场景中最可靠的听力策略。" },
    ],
    vocabulary: [
      { word: "頭先", jyutping: "tau4 sin1", meaning: "刚才", note: "比啱啱更适合指刚刚发生的对话。" },
      { word: "聽唔清", jyutping: "teng1 m4 cing1", meaning: "听不清", note: "清楚可以替换成明白，意思会略有不同。" },
      { word: "意思", jyutping: "ji3 si1", meaning: "意思 / 含义", note: "你意思係……是复述对方意图的常用开头。" },
      { word: "重複", jyutping: "cung4 fuk1", meaning: "重复", note: "正式场合可以用；口语请求更常说再講一次。" },
      { word: "嗰句", jyutping: "go2 geoi3", meaning: "那句话", note: "嗰 + 量词 + 名词是高频指示结构。" },
    ],
    grammar: [
      { pattern: "可唔可以 + 动词", label: "礼貌请求", example: "可唔可以再講一次？", jyutping: "ho2 m4 ho2 ji5 zoi3 gong2 jat1 ci3?", note: "粤语的是非问句常用正反结构，不需要把“吗”单独翻出来。" },
      { pattern: "唔係好 + 形容词", label: "缓和否定", example: "我唔係好明。", jyutping: "ngo5 m4 hai6 hou2 ming4.", note: "比“我不明白”更不绝对，适合在对话中继续求助。" },
    ],
    challenges: [
      { title: "会议确认", situation: "对方语速很快，交代了日期和截止时间。", phrase: "我想確認一下，你係話今日定係聽日？", jyutping: "ngo5 soeng2 jan6 zoek6 jat1 haa5, nei5 hai6 waa6 gam1 jat6 ding6 hai6 ting1 jat6?", note: "用定係连接两个选择，比只问“係咪”更精确。" },
      { title: "不要假装听懂", situation: "你听懂大意，但不确定对方要你做什么。", phrase: "我大概明白，不過想再確認下要做邊幾步。", jyutping: "ngo5 daai6 koi3 ming4 baak6, bat1 gwo3 soeng2 zoi3 jan6 zoek6 haa5 jiu3 zou6 bin1 gei2 bou6.", note: "大概 + 不過是自然表达不确定性的高级组合。" },
    ],
  },
  {
    number: "02", slug: "cha-chaan-teng", title: "茶餐厅生存课", copy: "早餐、饮品、加冰、少甜和打包", phrase: "唔該，一個奶茶，少甜。", jyutping: "m4 goi1, jat1 go3 naai5 caa4, siu2 tim4.", color: "gold", track: "0–3 个月", level: "生存基础", audience: "能处理简单点餐，想听懂店员追问", goal: "从指菜单升级到自己组合要求：堂食、外卖、甜度、冰量、加底和埋单。",
    lessons: [
      { title: "先叫店员", phrase: "唔該，我要個菠蘿包。", jyutping: "m4 goi1, ngo5 jiu3 go3 bo1 lo4 baau1.", mandarin: "谢谢，我要一个菠萝包。", focus: "点餐核心", note: "個 go3 是点餐时非常自然的量词，唔該既可表示谢谢，也可用来叫人。" },
      { title: "调整甜度", phrase: "少甜，唔該。", jyutping: "siu2 tim4, m4 goi1.", mandarin: "少甜，谢谢。", focus: "饮品要求", note: "少甜比“少糖”更像香港点饮品时的说法。" },
      { title: "问有没有套餐", phrase: "有冇早餐跟呀？", jyutping: "jau5 mou5 zou2 caan1 gan1 aa3?", mandarin: "有早餐套餐吗？", focus: "追问搭配", note: "跟在这里表示搭配、随餐附送，不是普通话“跟着”。" },
      { title: "打包带走", phrase: "唔該幫我打包。", jyutping: "m4 goi1 bong1 ngo5 daa2 baau1.", mandarin: "麻烦帮我打包。", focus: "外卖表达", note: "幫我比“请帮我”更直接自然；外卖也常说外賣。" },
      { title: "处理冰量", phrase: "凍檸茶走冰，唔該。", jyutping: "dung3 ling4 caa4 zau2 bing1, m4 goi1.", mandarin: "冻柠茶不要冰，谢谢。", focus: "高频词组", note: "走冰是香港饮品店固定说法，不能按普通话逐字翻译。" },
      { title: "结账离开", phrase: "唔該埋單，幾多錢？", jyutping: "m4 goi1 maai4 daan1, gei2 do1 cin2?", mandarin: "麻烦结账，多少钱？", focus: "收尾回合", note: "埋單是结账；餐厅里问价常用幾多錢而不是多少錢。" },
    ],
    vocabulary: [
      { word: "堂食", jyutping: "tong4 sik6", meaning: "堂食 / 在店内吃", note: "和外賣成对记。" },
      { word: "走冰", jyutping: "zau2 bing1", meaning: "不要冰", note: "走糖、走葱等结构也可以迁移。" },
      { word: "加底", jyutping: "gaa1 dai2", meaning: "加饭底 / 加面底", note: "底是主食部分，不是“底下”。" },
      { word: "跟", jyutping: "gan1", meaning: "搭配 / 随餐", note: "早餐跟饮品是茶餐厅常见表达。" },
      { word: "埋單", jyutping: "maai4 daan1", meaning: "结账", note: "單在这里是账单，不是单独。" },
    ],
    grammar: [
      { pattern: "一個 / 一杯 / 一碗 + 名词", label: "量词选择", example: "一杯凍檸茶。", jyutping: "jat1 bui1 dung3 ling4 caa4.", note: "饮品、面食、包点会换不同量词，先把整体搭配记住。" },
      { pattern: "走 + 名词", label: "去除要求", example: "走冰、走甜。", jyutping: "zau2 bing1, zau2 tim4.", note: "走不是离开，而是不要某项配料或调味。" },
    ],
    challenges: [
      { title: "套餐变更", situation: "你想点套餐，但饮品不合口味。", phrase: "呢份係咪包飲品？如果唔包，可唔可以轉做凍檸茶？", jyutping: "ni1 fan6 hai6 mai6 baau1 jam2 ban2? jyu4 gwo2 m4 baau1, ho2 m4 ho2 ji5 zyun2 zou6 dung3 ling4 caa4?", note: "如果……可唔可以……把询问和条件放进同一回合。" },
      { title: "店员听错", situation: "你要少甜，店员重复成正常甜度。", phrase: "唔好意思，我係要少甜，唔係正常甜。", jyutping: "m4 hou2 ji3 si1, ngo5 hai6 jiu3 siu2 tim4, m4 hai6 zing3 soeng4 tim4.", note: "用係……唔係……纠正信息，比只说“不对”更清楚。" },
    ],
  },
  {
    number: "03", slug: "transport-and-directions", title: "交通与方向", copy: "地铁、巴士、的士、转车和落车", phrase: "呢架車去唔去尖沙咀？", jyutping: "ni1 gaa3 ce1 heoi3 m4 heoi3 zim1 saa1 zeoi2?", color: "mint", track: "0–3 个月", level: "生存基础", audience: "会看地图，但还听不懂站名和方向", goal: "掌握上车、转车、出口、落车和时间估算，把问路变成连续任务。",
    lessons: [
      { title: "问这班车去不去", phrase: "呢架車去唔去中環？", jyutping: "ni1 gaa3 ce1 heoi3 m4 heoi3 zung1 waan4?", mandarin: "这班车去不去中环？", focus: "正反问句", note: "去唔去是交通场景的固定口语格式。" },
      { title: "问在哪里下车", phrase: "我喺邊個站落車？", jyutping: "ngo5 hai2 bin1 go3 zaam6 lok6 ce1?", mandarin: "我在哪个站下车？", focus: "地点问句", note: "落車是下车；喺邊個站比“在哪个站下”更自然。" },
      { title: "问还要几站", phrase: "仲有幾多個站？", jyutping: "zung6 jau5 gei2 do1 go3 zaam6?", mandarin: "还有几站？", focus: "数量表达", note: "仲有表示“还有”，不要只说“再有”。" },
      { title: "请司机停一下", phrase: "唔該前面有落，唔該。", jyutping: "m4 goi1 cin4 min6 jau5 lok6, m4 goi1.", mandarin: "麻烦前面有下车的，谢谢。", focus: "的士用语", note: "有落是告诉司机前面有人下车，香港很常用。" },
      { title: "找对出口", phrase: "去A出口要行邊邊？", jyutping: "heoi3 A ceot1 hau2 jiu3 haang4 bin1 bin1?", mandarin: "去 A 出口要往哪边走？", focus: "方向词", note: "邊邊是“哪一边”，比只说邊更口语。" },
      { title: "估算车程", phrase: "由呢度去機場大概要幾耐？", jyutping: "jau4 ni1 dou6 heoi3 gei1 coeng4 daai6 koi3 jiu3 gei2 noi6?", mandarin: "从这里去机场大概要多久？", focus: "时间估算", note: "幾耐问持续时间；幾點问时刻，不要混用。" },
    ],
    vocabulary: [
      { word: "轉車", jyutping: "zyun2 ce1", meaning: "换乘", note: "转车和转线都可以用。" },
      { word: "出口", jyutping: "ceot1 hau2", meaning: "出口", note: "A出口在口语中常直接读英文字母。" },
      { word: "月台", jyutping: "jyut6 toi4", meaning: "月台 / 站台", note: "港铁语境中很高频。" },
      { word: "塞車", jyutping: "sak1 ce1", meaning: "堵车", note: "塞不是普通话的 sāi，在粤语中保留入声。" },
      { word: "幾耐", jyutping: "gei2 noi6", meaning: "多久", note: "问时长，不是问几点。" },
    ],
    grammar: [
      { pattern: "由 A 去 B", label: "移动起点", example: "由公司去屋企。", jyutping: "jau4 gung1 si1 heoi3 uk1 kei2.", note: "由表示从，去表示往；口语中起点终点都说得很清楚。" },
      { pattern: "要 + 动词 + 幾耐", label: "估算时间", example: "要行幾耐？", jyutping: "jiu3 haang4 gei2 noi6?", note: "幾耐也可以搭配等、坐、行、做等动词。" },
    ],
    challenges: [
      { title: "港铁换乘", situation: "你知道目的地，但不确定应从哪个出口出。", phrase: "我想去呢間商場，應該喺邊個出口出？", jyutping: "ngo5 soeng2 heoi3 ni1 gaan1 soeng1 coeng4, jing1 goi1 hai2 bin1 go3 ceot1 hau2 ceot1?", note: "應該是“应该”的常用读法，适合询问路线判断。" },
      { title: "出租车沟通", situation: "司机问你走哪条路，你想让他按最快路线。", phrase: "你睇下邊條路快啲就行嗰條啦。", jyutping: "nei5 tai2 haa5 bin1 tiu4 lou6 faai3 di1 zau6 haang4 go2 tiu4 laa1.", note: "就……啦表达把选择交给对方，语气自然而不生硬。" },
    ],
  },
  {
    number: "04", slug: "shopping-and-returns", title: "买东西与退换", copy: "尺码、付款、找续、优惠和退货", phrase: "有冇平啲嘅款？", jyutping: "jau5 mou5 peng4 di1 ge3 fun2?", color: "violet", track: "0–3 个月", level: "生存基础", audience: "能处理付款，想学会比较、试用和退换", goal: "从“多少钱”升级到比较款式、确认条款、保存收据和处理售后。",
    lessons: [
      { title: "问有没有便宜一点的", phrase: "有冇平啲嘅？", jyutping: "jau5 mou5 peng4 di1 ge3?", mandarin: "有没有便宜一点的？", focus: "比较表达", note: "嘅把前面的描述接到被省略的名词上。" },
      { title: "问有没有小一码", phrase: "有冇細個碼啲？", jyutping: "jau5 mou5 sai3 go3 maa5 di1?", mandarin: "有没有小一码的？", focus: "尺码词汇", note: "碼 maa5 是尺码，細個碼是小一码。" },
      { title: "请求试穿", phrase: "可唔可以試下件上衣？", jyutping: "ho2 m4 ho2 ji5 si3 haa5 gin6 soeng6 ji1?", mandarin: "可以试一下这件上衣吗？", focus: "礼貌请求", note: "件 gin6 是衣服的量词，試下比試一試更口语。" },
      { title: "问可不可以换颜色", phrase: "可唔可以換第二隻色？", jyutping: "ho2 m4 ho2 ji5 wun6 dai6 ji6 zek3 sik1?", mandarin: "可以换另一个颜色吗？", focus: "量词迁移", note: "隻用于颜色、款式等可数项目。" },
      { title: "确认退换条件", phrase: "如果唔啱，可唔可以退錢？", jyutping: "jyu4 gwo2 m4 ngaam1, ho2 m4 ho2 ji5 teoi3 cin2?", mandarin: "如果不合适，可以退款吗？", focus: "条件句", note: "唔啱是不合适；退錢是退款，不是退回钱。" },
      { title: "付款后确认找续", phrase: "唔該，找返幾多錢？", jyutping: "m4 goi1, zaau2 faan1 gei2 do1 cin2?", mandarin: "谢谢，应该找回多少钱？", focus: "收尾确认", note: "找返是找零；返也有“回到原处”的方向感。" },
    ],
    vocabulary: [
      { word: "試身", jyutping: "si3 san1", meaning: "试穿", note: "比試衫更明确地指试穿衣服。" },
      { word: "收據", jyutping: "sau1 geoi3", meaning: "收据", note: "退换货时很重要的词。" },
      { word: "退錢", jyutping: "teoi3 cin2", meaning: "退款", note: "退貨是退货，退錢是退钱，两者不同。" },
      { word: "特價", jyutping: "dak6 gaa3", meaning: "特价", note: "價的读音不是普通话 jià。" },
      { word: "原價", jyutping: "jyun4 gaa3", meaning: "原价", note: "比较折扣时常和特價一起出现。" },
    ],
    grammar: [
      { pattern: "有冇 + 形容词 + 啲嘅", label: "比较选择", example: "有冇大啲嘅？", jyutping: "jau5 mou5 daai6 di1 ge3?", note: "啲嘅把“大一点的那款”压缩成自然口语。" },
      { pattern: "如果……就……", label: "条件与结果", example: "如果唔啱就換。", jyutping: "jyu4 gwo2 m4 ngaam1 zau6 wun6.", note: "粤语中后半句的就可以很快带过，重点是条件关系。" },
    ],
    challenges: [
      { title: "售后换货", situation: "衣服已经买了，但回家发现尺码不合。", phrase: "我琴日買咗呢件，但係返到屋企先發現大咗，可唔可以換細碼？", jyutping: "ngo5 kam4 jat6 maai5 zo2 ni1 gin6, daan6 hai6 faan1 dou3 uk1 kei2 sin1 faat3 jin6 daai6 zo2, ho2 m4 ho2 ji5 wun6 sai3 maa5?", note: "咗、先和发现的时间顺序一起使用，是比点餐更复杂的叙事。" },
      { title: "比较优惠", situation: "店员介绍会员价，你想确认是否值得。", phrase: "如果做會員平幾多？同原價比抵唔抵？", jyutping: "jyu4 gwo2 zou6 wui6 jyun4 peng4 gei2 do1? tung4 jyun4 gaa3 bei2 dai2 m4 dai2?", note: "抵唔抵是“划不划算”，属于香港高频评价词。" },
    ],
  },
  {
    number: "05", slug: "phone-and-voice-messages", title: "电话和语音消息", copy: "接听、回拨、听不清和稍后回复", phrase: "我遲啲再覆你。", jyutping: "ngo5 ci4 di1 zoi3 fuk1 nei5.", color: "blue", track: "3–12 个月", level: "生活适应", audience: "日常沟通已够用，但电话和语音仍然吃力", goal: "学会在不方便、断线、漏听和需要回拨时，快速交代状态和下一步。",
    lessons: [
      { title: "说明现在不方便", phrase: "我而家唔方便講電話。", jyutping: "ngo5 ji4 gaa1 m4 fong1 bin6 gong2 din6 waa2.", mandarin: "我现在不方便讲电话。", focus: "状态说明", note: "而家是现在，方便后面直接接动词。" },
      { title: "稍后回复", phrase: "我遲啲再覆你。", jyutping: "ngo5 ci4 di1 zoi3 fuk1 nei5.", mandarin: "我晚一点再回复你。", focus: "时间安排", note: "覆 fuk1 在香港很常用于回复消息。" },
      { title: "让对方发文字", phrase: "你打字俾我啦。", jyutping: "nei5 daa2 zi6 bei2 ngo5 laa1.", mandarin: "你打字发给我吧。", focus: "替代沟通", note: "俾是给，发消息时很高频。" },
      { title: "回拨", phrase: "我陣間打返俾你。", jyutping: "ngo5 zan6 gaan1 daa2 faan1 bei2 nei5.", mandarin: "我一会儿打回给你。", focus: "回拨表达", note: "陣間表示等一会儿、稍后；打返带有回拨方向。" },
      { title: "确认有没有听到", phrase: "喂，你聽唔聽到我講嘢？", jyutping: "wai3, nei5 teng1 m4 teng1 dou2 ngo5 gong2 je5?", mandarin: "喂，你听不听得到我说话？", focus: "通话修复", note: "聽唔聽到是正反结构，聲音正常时也常这样确认。" },
      { title: "说明语音重点", phrase: "我頭先段語音最尾有樣嘢想補充。", jyutping: "ngo5 tau4 sin1 dyun6 jyu5 jam1 zeoi3 mei5 jau5 joeng6 je5 soeng2 bou2 cung1.", mandarin: "我刚才那段语音最后还有一点想补充。", focus: "连续表达", note: "最尾是最后；補充比“再说一点”更适合工作语音。" },
    ],
    vocabulary: [
      { word: "打返", jyutping: "daa2 faan1", meaning: "打回去 / 回拨", note: "返常带有回到原来方向的意思。" },
      { word: "收線", jyutping: "sau1 sin3", meaning: "挂线", note: "电话结束时比掛電話更口语。" },
      { word: "留言", jyutping: "lau4 jin4", meaning: "留言", note: "语音留言和文字留言都可以用。" },
      { word: "斷線", jyutping: "tyun3 sin3", meaning: "断线", note: "网络、电话都能用。" },
      { word: "方便", jyutping: "fong1 bin6", meaning: "方便 / 适合", note: "你幾時方便？是很自然的约时间问法。" },
    ],
    grammar: [
      { pattern: "而家 + 动词 + 緊", label: "正在进行", example: "我而家開緊會。", jyutping: "ngo5 ji4 gaa1 hoi1 gan2 wui2.", note: "緊标记正在进行，不等于普通话每一个“在”。" },
      { pattern: "遲啲 / 陣間 + 再 + 动词", label: "延后安排", example: "遲啲再傾。", jyutping: "ci4 di1 zoi3 king1.", note: "再表示下一次动作，和遲啲一起形成清晰的后续安排。" },
    ],
    challenges: [
      { title: "开会中来电", situation: "你正在会议中，不能立即处理对方的问题。", phrase: "我而家開緊會，未方便講住，散會之後我打返俾你。", jyutping: "ngo5 ji4 gaa1 hoi1 gan2 wui2, mei6 fong1 bin6 gong2 zyu6, saan3 wui2 zi1 hau6 ngo5 daa2 faan1 bei2 nei5.", note: "講住表示暂时先这样；散會之後交代下一步。" },
      { title: "语音听漏", situation: "你听懂大部分，只漏掉一个数字。", phrase: "前面我聽到，淨係最後個數字唔肯定，你可唔可以再講一次？", jyutping: "cin4 min6 ngo5 teng1 dou2, zing6 hai6 zeoi3 hau6 go3 sou3 zi6 m4 hang2 ding6, nei5 ho2 m4 ho2 ji5 zoi3 gong2 jat1 ci3?", note: "淨係是“只是”，把不确定范围缩小，沟通更高效。" },
    ],
  },
  {
    number: "06", slug: "work-communication", title: "工作沟通基础", copy: "进度、交接、会议和礼貌请求", phrase: "你得閒嗰陣覆我啦。", jyutping: "nei5 dak1 haan4 go2 zan6 fuk1 ngo5 laa1.", color: "peach", track: "3–12 个月", level: "生活适应", audience: "能完成简单工作沟通，想减少直译和生硬语气", goal: "把普通话式的命令、汇报和催办，换成香港职场更自然的协作表达。",
    lessons: [
      { title: "请对方有空回复", phrase: "你得閒嗰陣覆我啦。", jyutping: "nei5 dak1 haan4 go2 zan6 fuk1 ngo5 laa1.", mandarin: "你有空的时候回复我吧。", focus: "协作请求", note: "得閒是有空，嗰陣是那时候；啦让请求不那么命令式。" },
      { title: "汇报目前进度", phrase: "而家做到呢度。", jyutping: "ji4 gaa1 zou6 dou3 ni1 dou6.", mandarin: "现在做到这里。", focus: "结果补语", note: "做到呢度是做到这里、进展到这里，不能只译成“做”。" },
      { title: "请求对方确认", phrase: "麻煩你睇一睇。", jyutping: "maa4 faan4 nei5 tai2 jat1 tai2.", mandarin: "麻烦你看一下。", focus: "动词重叠", note: "睇一睇让请求更轻；正式程度仍取决于上下文。" },
      { title: "结束会议", phrase: "咁今日先到呢度。", jyutping: "gam2 gam1 jat6 sin1 dou3 ni1 dou6.", mandarin: "那今天先到这里。", focus: "会议收尾", note: "先到呢度是今天先这样、先结束到这里。" },
      { title: "说明交接", phrase: "呢份我會交低俾你跟。", jyutping: "ni1 fan6 ngo5 wui5 gaau1 dai1 bei2 nei5 gan1.", mandarin: "这份我会交给你跟进。", focus: "工作搭配", note: "交低俾你跟是很实用的交接表达，跟在这里是跟进处理。" },
      { title: "确认截止时间", phrase: "最遲幾時要交？我好安排時間。", jyutping: "zeoi3 ci4 gei2 si4 jiu3 gaau1? ngo5 hou2 on1 paai4 si4 gaan3.", mandarin: "最晚什么时候要交？我好安排时间。", focus: "边界确认", note: "我好……表示“这样我就方便……”，是职场中很自然的解释。" },
    ],
    vocabulary: [
      { word: "得閒", jyutping: "dak1 haan4", meaning: "有空", note: "得閒嗎？可以直接用来约时间。" },
      { word: "跟進", jyutping: "gan1 zeon3", meaning: "跟进处理", note: "不是跟随某人，而是继续推进事项。" },
      { word: "交低", jyutping: "gaau1 dai1", meaning: "交接给别人", note: "低在这里有留下、交到对方手上的感觉。" },
      { word: "搞掂", jyutping: "gaau2 dim6", meaning: "搞定", note: "完成任务后很常听到。" },
      { word: "麻煩", jyutping: "maa4 faan4", meaning: "麻烦 / 劳驾", note: "可放在请求前，也可单独回应别人。" },
    ],
    grammar: [
      { pattern: "先……再……", label: "工作顺序", example: "我先睇資料，再覆你。", jyutping: "ngo5 sin1 tai2 zi1 liu6, zoi3 fuk1 nei5.", note: "先、再把任务顺序说清楚，能减少对方的不确定感。" },
      { pattern: "做到 + 地点 / 状态", label: "结果补语", example: "做到呢度先。", jyutping: "zou6 dou3 ni1 dou6 sin1.", note: "粤语常用动词加到描述进展或达到的结果。" },
    ],
    challenges: [
      { title: "温和催办", situation: "对方还没回复，你想提醒而不是施压。", phrase: "想問下呢件事而家有冇新進展？如果未得閒，遲啲覆我都得。", jyutping: "soeng2 man6 haa5 ni1 gin6 si6 ji4 gaa1 jau5 mou5 san1 zeon3 zin2? jyu4 gwo2 mei6 dak1 haan4, ci4 di1 fuk1 ngo5 dou1 dak1.", note: "都得把选择权留给对方，语气比直接催更协作。" },
      { title: "表达范围", situation: "你能按时完成一部分，其他部分需要更多时间。", phrase: "呢部分我今日可以交，另外嗰部分要聽日先得。", jyutping: "ni1 bou6 fan6 ngo5 gam1 jat6 ho2 ji5 gaau1, ling6 ngoi6 go2 bou6 fan6 jiu3 ting1 jat6 sin1 dak1.", note: "先得表示要到那个时间才可以，带有明确边界。" },
    ],
  },
  {
    number: "07", slug: "appointments-and-rescheduling", title: "约时间与改约", copy: "约人、迟到、取消和确认下一步", phrase: "聽日三點見，得唔得？", jyutping: "ting1 jat6 saam1 dim2 gin3, dak1 m4 dak1?", color: "coral", track: "3–12 个月", level: "生活适应", audience: "能约时间，但遇到变动时容易只会说普通话", goal: "学会约实、迟到、改期和留下下一步，避免只说一句“改天”。",
    lessons: [
      { title: "确认约会时间", phrase: "聽日三點見，得唔得？", jyutping: "ting1 jat6 saam1 dim2 gin3, dak1 m4 dak1?", mandarin: "明天三点见，可以吗？", focus: "约时间", note: "見可以直接表示见面，不需要说“见面”。" },
      { title: "说明会迟到", phrase: "我可能會遲到一陣。", jyutping: "ngo5 ho2 nang4 wui5 ci4 dou3 jat1 zan6.", mandarin: "我可能会迟到一会儿。", focus: "时间缓冲", note: "一陣表示一会儿，时间感比“一下”更长。" },
      { title: "改到另一天", phrase: "不如改下星期？", jyutping: "bat1 jyu4 goi2 haa5 sing1 kei4?", mandarin: "不如改到下星期？", focus: "提出替代", note: "不如是提出替代方案的自然开头。" },
      { title: "确认下一步", phrase: "到時再傾啦。", jyutping: "dou3 si4 zoi3 king1 laa1.", mandarin: "到时候再聊吧。", focus: "留下后续", note: "傾是谈、商量，也能表示之后再联系。" },
      { title: "给出明确缓冲", phrase: "我最快六點半到，遲過呢個時間就未必得。", jyutping: "ngo5 zeoi3 faai3 luk6 dim2 bun3 dou3, ci4 gwo3 ni1 go3 si4 gaan3 zau6 mei6 bit1 dak1.", mandarin: "我最快六点半到，晚于这个时间可能不行。", focus: "设定边界", note: "未必不是简单的“不”，而是保留可能性。" },
      { title: "避免临时失联", phrase: "如果有變我早啲通知你。", jyutping: "jyu4 gwo2 jau5 bin3 ngo5 zou2 di1 tung1 zi1 nei5.", mandarin: "如果有变化我早点通知你。", focus: "条件安排", note: "早啲是提前一点，通知比講更适合安排变动。" },
    ],
    vocabulary: [
      { word: "改期", jyutping: "goi2 kei4", meaning: "改期", note: "比改時間覆盖范围更大，适合正式约会。" },
      { word: "約實", jyutping: "joek3 sat6", meaning: "约定确定", note: "我哋約實六點是确认已经说定。" },
      { word: "臨時", jyutping: "lam4 si4", meaning: "临时", note: "臨時有事是高频搭配。" },
      { word: "趕得切", jyutping: "gon2 dak1 cit3", meaning: "赶得上 / 来得及", note: "切在这里是及时、完成到的感觉。" },
      { word: "到時", jyutping: "dou3 si4", meaning: "到时候", note: "常与再、先、再傾一起出现。" },
    ],
    grammar: [
      { pattern: "不如 + 建议", label: "提出替代方案", example: "不如星期六先？", jyutping: "bat1 jyu4 sing1 kei4 luk6 sin1?", note: "先放句尾有“那先这样”的缓和感。" },
      { pattern: "如果……就……", label: "条件安排", example: "如果趕唔切就遲啲到。", jyutping: "jyu4 gwo2 gon2 m4 cit3 zau6 ci4 di1 dou3.", note: "条件句可以放在约时间、交通和工作安排里。" },
    ],
    challenges: [
      { title: "临时改约", situation: "你突然有事，但不想让对方觉得被敷衍。", phrase: "唔好意思，臨時有啲事，今日可能見唔到。不如我哋改星期二？", jyutping: "m4 hou2 ji3 si1, lam4 si4 jau5 di1 si6, gam1 jat6 ho2 nang4 gin3 m4 dou2. bat1 jyu4 ngo5 dei6 goi2 sing1 kei4 ji6?", note: "見唔到是“见不到”，否定放在结果补语之后。" },
      { title: "迟到但不失联", situation: "你已经迟到，对方在等。", phrase: "我已經出發，不過架車塞緊，預你要再等我十分鐘。", jyutping: "ngo5 ji5 ging1 ceot1 faat3, bat1 gwo3 gaa3 ce1 sak1 gan2, jyu6 nei5 jiu3 zoi3 dang2 ngo5 sap6 fan1 zung1.", note: "預你是让对方预留心理时间，属于更成熟的交代。" },
    ],
  },
  {
    number: "08", slug: "social-updates", title: "社交与近况", copy: "寒暄、邀请、拒绝和关系维护", phrase: "最近搞成點呀？", jyutping: "zeoi3 gan6 gaau2 sing4 dim2 aa3?", color: "gold", track: "3–12 个月", level: "生活适应", audience: "能完成事务型沟通，想听懂熟人之间的距离感", goal: "不只会问“最近怎么样”，还要会接话、邀请、拒绝和保留关系。",
    lessons: [
      { title: "问最近怎么样", phrase: "最近搞成點呀？", jyutping: "zeoi3 gan6 gaau2 sing4 dim2 aa3?", mandarin: "最近过得怎么样？", focus: "熟人寒暄", note: "搞成點比“最近怎么样”更口语、更像熟人寒暄。" },
      { title: "回答还不错", phrase: "都係咁上下啦。", jyutping: "dou1 hai6 gam2 haa6 soeng6 laa1.", mandarin: "也就差不多吧。", focus: "模糊回应", note: "咁上下是差不多、还行，不等于真的上下位置。" },
      { title: "邀请对方吃饭", phrase: "得閒一齊食飯呀？", jyutping: "dak1 haan4 jat1 cai4 sik6 faan6 aa3?", mandarin: "有空一起吃饭吗？", focus: "轻邀请", note: "呀让邀约更像开放提议，不是正式通知。" },
      { title: "礼貌拒绝", phrase: "今次真係唔得，下次啦。", jyutping: "gam1 ci3 zan1 hai6 m4 dak1, haa6 ci3 laa1.", mandarin: "这次真的不行，下次吧。", focus: "关系维护", note: "下次啦把拒绝留在关系里，不会太生硬。" },
      { title: "承接对方分享", phrase: "係咩？之後點呀？", jyutping: "hai6 me1? zi1 hau6 dim2 aa3?", mandarin: "是吗？后来怎么样？", focus: "追问回应", note: "之後點是很自然的故事追问，不能只靠“然后呢”。" },
      { title: "留下模糊空间", phrase: "到時睇下先啦，有消息再話你知。", jyutping: "dou3 si4 tai2 haa5 sin1 laa1, jau5 si1 sik1 zoi3 waa6 nei5 zi1.", mandarin: "到时候再看看，有消息再告诉你。", focus: "关系语气", note: "睇下先不是敷衍本身，语气和上下文决定它是保留还是婉拒。" },
    ],
    vocabulary: [
      { word: "搞成點", jyutping: "gaau2 sing4 dim2", meaning: "过得怎样 / 进展如何", note: "比單純問點樣更有熟人语气。" },
      { word: "咁上下", jyutping: "gam2 haa6 soeng6", meaning: "差不多 / 还行", note: "常用于不想给出精确评价时。" },
      { word: "一齊", jyutping: "jat1 cai4", meaning: "一起", note: "邀约和共同做事都常用。" },
      { word: "睇下", jyutping: "tai2 haa5", meaning: "看看 / 视情况", note: "可表示真实观察，也可表示保留。" },
      { word: "話你知", jyutping: "waa6 nei5 zi1", meaning: "告诉你", note: "字面是“说给你知道”。" },
    ],
    grammar: [
      { pattern: "都係 + 咁 + 形容词 / 咁上下", label: "模糊评价", example: "都係咁上下啦。", jyutping: "dou1 hai6 gam2 haa6 soeng6 laa1.", note: "这类表达不追求精确，重点是维持轻松的互动。" },
      { pattern: "啦 / 呀 / 喎", label: "句末语气", example: "下次啦。", jyutping: "haa6 ci3 laa1.", note: "句末助词不能只按一个普通话词翻译，要结合关系和语调。" },
    ],
    challenges: [
      { title: "婉拒邀约", situation: "你这次没空，但想保留下一次见面的可能。", phrase: "呢排真係比較忙，今次未必得；遲啲鬆動啲再約啦。", jyutping: "ni1 paai4 zan1 hai6 bei2 gaau3 mong4, gam1 ci3 mei6 bit1 dak1; ci4 di1 sung1 dung6 di1 zoi3 joek3 laa1.", note: "鬆動啲表示时间安排松一点，语气比直接“我不去”柔和。" },
      { title: "听出隐藏意思", situation: "朋友说“睇下先”，你想确认是不是暂时没决定。", phrase: "你係未決定，定係嗰日未必得閒？", jyutping: "nei5 hai6 mei6 kyut3 ding6, ding6 hai6 go2 jat6 mei6 bit1 dak1 haan4?", note: "定係把两种可能摊开说，避免把模糊回应误解成答应。" },
    ],
  },
  {
    number: "09", slug: "housing-and-repairs", title: "住房与维修", copy: "管理处、邻居、冷气和水电煤", phrase: "個水喉好似漏水喎。", jyutping: "go3 seoi2 hau4 hou2 ci5 lau6 seoi2 wo3.", color: "mint", track: "1–2 年", level: "在港进阶", audience: "已经能生活，开始独立处理住房和维修问题", goal: "描述故障、安排上门、确认责任和表达不便；学习方向词和发现语气。",
    lessons: [
      { title: "报告漏水", phrase: "個水喉好似漏水喎。", jyutping: "go3 seoi2 hau4 hou2 ci5 lau6 seoi2 wo3.", mandarin: "这个水管好像漏水。", focus: "发现语气", note: "好似表示好像，喎表示带来一个新发现。" },
      { title: "请管理处跟进", phrase: "可唔可以幫我跟進下？", jyutping: "ho2 m4 ho2 ji5 bong1 ngo5 gan1 zeon3 haa5?", mandarin: "可以帮我跟进一下吗？", focus: "维修请求", note: "跟進是跟进处理，不需要直译成跟随。" },
      { title: "说明冷气问题", phrase: "部冷氣唔凍。", jyutping: "bou6 laang5 hei3 m4 dung3.", mandarin: "空调不凉。", focus: "量词与状态", note: "部是电器常用量词，唔凍是“不凉”。" },
      { title: "约维修时间", phrase: "師傅幾時得閒上嚟？", jyutping: "si1 fu6 gei2 si4 dak1 haan4 soeng5 lei4?", mandarin: "师傅什么时候有空上门？", focus: "方向补语", note: "上嚟表示到这里来，方向感很重要。" },
      { title: "描述持续影响", phrase: "個雪櫃由琴晚開始一路嘈到而家。", jyutping: "go3 syut3 gwai6 jau4 kam4 maan5 hoi1 ci2 jat1 lou6 cou4 dou3 ji4 gaa1.", mandarin: "冰箱从昨晚开始一直吵到现在。", focus: "持续状态", note: "一路……到……描述持续到某个时间点。" },
      { title: "安排入屋维修", phrase: "如果要入屋整，麻煩你預早通知我。", jyutping: "jyu4 gwo2 jiu3 jap6 uk1 zing2, maa4 faan4 nei5 jyu6 zou2 tung1 zi1 ngo5.", mandarin: "如果要进屋维修，麻烦你提前通知我。", focus: "边界表达", note: "預早是提前；安排维修时把进屋和通知条件说清楚。" },
    ],
    vocabulary: [
      { word: "管理處", jyutping: "gun2 lei5 cyu3", meaning: "物业管理处", note: "住宅、商场和大厦都常用。" },
      { word: "水喉", jyutping: "seoi2 hau4", meaning: "水管 / 水龙头", note: "具体指哪一部分要看上下文。" },
      { word: "漏水", jyutping: "lau6 seoi2", meaning: "漏水", note: "漏的韵尾 -k 要特别留意。" },
      { word: "交租", jyutping: "gaau1 zou1", meaning: "交租金", note: "日常说交租，不一定说交房租。" },
      { word: "按金", jyutping: "on3 gam1", meaning: "押金", note: "租房、设备租借都可能用到。" },
    ],
    grammar: [
      { pattern: "好似……喎", label: "新发现 / 不确定", example: "好似漏水喎。", jyutping: "hou2 ci5 lau6 seoi2 wo3.", note: "喎把信息包装成刚发现的情况，不像断言或责备。" },
      { pattern: "上嚟 / 落嚟 / 搬入嚟", label: "方向补语", example: "師傅幾時上嚟？", jyutping: "si1 fu6 gei2 si4 soeng5 lei4?", note: "嚟以说话地点为参照，和普通话“来”一样但组合更多。" },
    ],
    challenges: [
      { title: "维修延误", situation: "师傅还没来，问题已经影响日常生活。", phrase: "頭先話今日會到，但係而家仲未見人，想問下大概幾點到？", jyutping: "tau4 sin1 waa6 gam1 jat6 wui5 dou3, daan6 hai6 ji4 gaa1 zung6 mei6 gin3 jan4, soeng2 man6 haa5 daai6 koi3 gei2 dim2 dou3?", note: "仲未表示到现在仍未发生，适合表达延误而不直接责备。" },
      { title: "租户责任", situation: "你想先确认是自己负责还是管理处负责。", phrase: "呢個問題係租客負責，定係管理處會安排？", jyutping: "ni1 go3 man6 tai4 hai6 zou1 haak3 fu6 zaak3, ding6 hai6 gun2 lei5 cyu3 wui5 on1 paai4?", note: "定係将责任选项明确列出，避免维修来回推诿。" },
    ],
  },
  {
    number: "10", slug: "doctor-and-pharmacy", title: "医生与药房", copy: "预约、症状、药物和注意事项", phrase: "我由尋日開始喉嚨痛。", jyutping: "ngo5 jau4 cam4 jat6 hoi1 ci2 hau4 lung4 tung3.", color: "blue", track: "1–2 年", level: "在港进阶", audience: "需要准确描述症状，不能只停留在“唔舒服”", goal: "用时间线、程度、持续状态和药物问题把症状说清楚；实际医疗决定仍应听从专业人员。",
    lessons: [
      { title: "说明症状何时开始", phrase: "我由尋日開始喉嚨痛。", jyutping: "ngo5 jau4 cam4 jat6 hoi1 ci2 hau4 lung4 tung3.", mandarin: "我从昨天开始喉咙痛。", focus: "时间起点", note: "由尋日開始把症状的时间起点说得很清楚。" },
      { title: "描述轻微不舒服", phrase: "我有啲頭暈。", jyutping: "ngo5 jau5 di1 tau4 wan4.", mandarin: "我有一点头晕。", focus: "程度表达", note: "有啲表示有一点，适合描述轻微症状。" },
      { title: "问怎么服药", phrase: "一日食幾多次？", jyutping: "jat1 jat6 sik6 gei2 do1 ci3?", mandarin: "一天吃几次？", focus: "用药提问", note: "食药是香港口语里非常常见的说法。" },
      { title: "确认有没有忌口", phrase: "有冇咩要避免？", jyutping: "jau5 mou5 me1 jiu3 bei6 min5?", mandarin: "有什么需要避免的吗？", focus: "疑问词", note: "咩是“什么”，疑问词不能只按普通话汉字推读。" },
      { title: "说明药后变化", phrase: "食咗藥之後好啲，但係夜晚仲係咳。", jyutping: "sik6 zo2 joek6 zi1 hau6 hou2 di1, daan6 hai6 je6 maan5 zung6 hai6 kat1.", mandarin: "吃药后好一点，但晚上还是咳。", focus: "前后对比", note: "好啲和仲係同时出现，分别表达改善程度与持续症状。" },
      { title: "询问成分", phrase: "我對青霉素有敏感，可唔可以幫我睇下成份？", jyutping: "ngo5 deoi3 cing1 mei4 sou3 jau5 man5 gam2, ho2 m4 ho2 ji5 bong1 ngo5 tai2 haa5 sing4 fan6?", mandarin: "我对青霉素过敏，可以帮我看一下成分吗？", focus: "风险说明", note: "描述过敏史时先说清楚对象，再提出确认成分的请求。" },
    ],
    vocabulary: [
      { word: "發燒", jyutping: "faat3 siu1", meaning: "发烧", note: "燒的声调不是普通话一声。" },
      { word: "咳嗽", jyutping: "kat1 sau3", meaning: "咳嗽", note: "口语中也常直接说咳。" },
      { word: "敏感", jyutping: "man5 gam2", meaning: "过敏 / 敏感", note: "有敏感是香港常见搭配。" },
      { word: "副作用", jyutping: "fu6 zok3 jung6", meaning: "副作用", note: "可以直接问有冇副作用。" },
      { word: "處方", jyutping: "cyu2 fong1", meaning: "处方", note: "药房沟通中比药单更正式。" },
    ],
    grammar: [
      { pattern: "由……開始", label: "症状时间线", example: "由琴日開始發燒。", jyutping: "jau4 kam4 jat6 hoi1 ci2 faat3 siu1.", note: "把起点先说清楚，医生更容易追问。" },
      { pattern: "食咗……之後", label: "动作先后", example: "食咗藥之後好啲。", jyutping: "sik6 zo2 joek6 zi1 hau6 hou2 di1.", note: "咗标记已完成的动作，之後引出变化。" },
    ],
    challenges: [
      { title: "看医生叙述", situation: "医生问症状如何变化，你需要给出时间线。", phrase: "一開始係喉嚨痛，之後開始咳，食咗藥就好少少，但夜晚仲有。", jyutping: "jat1 hoi1 ci2 hai6 hau4 lung4 tung3, zi1 hau6 hoi1 ci2 kat1, sik6 zo2 joek6 zau6 hou2 siu2 siu2, daan6 je6 maan5 zung6 jau5.", note: "一開始、之後、但把症状按时间和转折组织起来。" },
      { title: "药房确认", situation: "你有过敏史，想让药剂师确认替代药物。", phrase: "我以前食呢類藥會出疹，呢隻有冇其他成份相近嘅選擇？", jyutping: "ngo5 ji5 cin4 sik6 ni1 leoi6 joek6 wui5 ceot1 zan2, ni1 zek3 jau5 mou5 kei4 taa1 sing4 fan6 soeng1 gan6 ge3 syun2 zaak6?", note: "出疹是起疹子；医疗场景要说清楚经历，不要只说唔啱。" },
    ],
  },
  {
    number: "11", slug: "bank-and-public-services", title: "银行与公共服务", copy: "排队、证件、表格和身份确认", phrase: "請問要填邊張表？", jyutping: "cing2 man6 jiu3 tin4 bin1 zoeng1 biu2?", color: "violet", track: "1–2 年", level: "在港进阶", audience: "已经独立生活，开始处理银行、证件和公共柜台", goal: "学会问清文件、程序、补交方式和预计时间，不再只会说“我要办理这个”。",
    lessons: [
      { title: "问填哪张表", phrase: "請問要填邊張表？", jyutping: "cing2 man6 jiu3 tin4 bin1 zoeng1 biu2?", mandarin: "请问要填哪张表？", focus: "柜台问法", note: "邊張是“哪一张”，張用于表格。" },
      { title: "问要带什么证件", phrase: "要帶咩證件？", jyutping: "jiu3 daai3 me1 zing3 gin6?", mandarin: "要带什么证件？", focus: "资料确认", note: "帶是带上，咩是高频疑问词。" },
      { title: "确认是否需要排队", phrase: "係咪要排隊？", jyutping: "hai6 mai6 jiu3 paai4 deoi6?", mandarin: "是不是要排队？", focus: "流程确认", note: "係咪要……是办事场景里的固定问法。" },
      { title: "确认办理完成", phrase: "咁樣就得喇？", jyutping: "gam2 joeng6 zau6 dak1 laa3?", mandarin: "这样就可以了吗？", focus: "完成确认", note: "就得喇是“这样就可以了吗”的自然口语。" },
      { title: "询问补交资料", phrase: "如果資料唔齊，可唔可以之後補交？", jyutping: "jyu4 gwo2 zi1 liu6 m4 cai4, ho2 m4 ho2 ji5 zi1 hau6 bou2 gaau1?", mandarin: "如果资料不齐，可以之后补交吗？", focus: "条件流程", note: "唔齊是资料不完整；補交是后来补交文件。" },
      { title: "确认处理时间", phrase: "通常要幾耐先有結果？", jyutping: "tung1 soeng4 jiu3 gei2 noi6 sin1 jau5 git3 gwo2?", mandarin: "通常要多久才有结果？", focus: "时间预期", note: "先有結果把“要等多久”与结果联系起来。" },
    ],
    vocabulary: [
      { word: "開戶口", jyutping: "hoi1 wu6 hau2", meaning: "开户", note: "口是账户的口语组成部分。" },
      { word: "預約", jyutping: "jyu6 joek3", meaning: "预约", note: "预约柜台、服务和医生都可以用。" },
      { word: "文件", jyutping: "man4 gin6", meaning: "文件 / 资料", note: "手续场景比資料更正式。" },
      { word: "身份證", jyutping: "san1 fan6 zing3", meaning: "身份证", note: "證的韵尾要读清楚。" },
      { word: "補交", jyutping: "bou2 gaau1", meaning: "补交", note: "补交文件、资料、证明都能用。" },
    ],
    grammar: [
      { pattern: "需要 + 名词 / 动词", label: "手续要求", example: "需要帶正本嗎？", jyutping: "seoi1 jiu3 daai3 zing3 bun2 maa3?", note: "需要比要更正式，柜台沟通中很常见。" },
      { pattern: "要……先……", label: "必要条件", example: "要預約先可以辦。", jyutping: "jiu3 jyu6 joek3 sin1 ho2 ji5 baan6.", note: "先可以表示必须满足前项才能做后项。" },
    ],
    challenges: [
      { title: "资料不齐", situation: "柜台告诉你缺一份文件，你想确认是否可以先开档。", phrase: "如果我今日未帶齊，可唔可以先開檔，之後再補返？", jyutping: "jyu4 gwo2 ngo5 gam1 jat6 mei6 daai3 cai4, ho2 m4 ho2 ji5 sin1 hoi1 dong2, zi1 hau6 zoi3 bou2 faan1?", note: "開檔是建立申请记录，補返有补回缺项的语感。" },
      { title: "问清楚下一步", situation: "你已经递交文件，但不知道何时会收到通知。", phrase: "咁我而家係等短訊，定係要自己上網查？", jyutping: "gam2 ngo5 ji4 gaa1 hai6 dang2 dyun2 seon3, ding6 hai6 jiu3 zi6 gei2 soeng5 mong5 caa4?", note: "定係用来列出两种后续流程，避免遗漏。" },
    ],
  },
  {
    number: "12", slug: "complaints-and-solutions", title: "投诉与解决问题", copy: "讲清楚经过、表达不满和谈解决方案", phrase: "我想問下可唔可以跟進？", jyutping: "ngo5 soeng2 man6 haa5 ho2 m4 ho2 ji5 gan1 zeon3?", color: "peach", track: "1–2 年", level: "在港进阶", audience: "需要处理退款、服务失误或反复未解决的问题", goal: "把不满说得有事实、有要求、有下一步；坚定不等于失礼。",
    lessons: [
      { title: "先礼貌开口", phrase: "唔好意思，我想問下。", jyutping: "m4 hou2 ji3 si1, ngo5 soeng2 man6 haa5.", mandarin: "不好意思，我想问一下。", focus: "投诉铺垫", note: "問下比直接问更缓和，适合投诉前铺垫。" },
      { title: "讲清楚发生了什么", phrase: "頭先部機突然停咗。", jyutping: "tau4 sin1 bou6 gei1 dat6 jin4 ting4 zo2.", mandarin: "刚才机器突然停了。", focus: "事件叙述", note: "頭先是刚才，咗标记动作已经发生。" },
      { title: "请求跟进", phrase: "可唔可以跟進下？", jyutping: "ho2 m4 ho2 ji5 gan1 zeon3 haa5?", mandarin: "可以跟进一下吗？", focus: "提出要求", note: "下在这里有“一下”的缓和作用。" },
      { title: "确认解决方案", phrase: "咁你哋會點處理？", jyutping: "gam2 nei5 dei6 wui5 dim2 cyu2 lei5?", mandarin: "那你们会怎么处理？", focus: "追问责任", note: "你哋是你们，處理是处理问题。" },
      { title: "说明已经联系过", phrase: "我之前已經聯絡過，但係到而家都未有回覆。", jyutping: "ngo5 zi1 cin4 ji5 ging1 lyun4 lok3 gwo3, daan6 hai6 dou3 ji4 gaa1 dou1 mei6 jau5 wui4 fuk1.", mandarin: "我之前已经联系过，但到现在都没有回复。", focus: "经历与持续", note: "過表示经历；到而家都未把“到现在仍然没有”说完整。" },
      { title: "留下书面记录", phrase: "麻煩你用電郵覆返我，等我有個紀錄。", jyutping: "maa4 faan4 nei5 jung6 din6 jau4 fuk1 faan1 ngo5, dang2 ngo5 jau5 go3 gei2 luk6.", mandarin: "麻烦你用邮件回复我，方便我留个记录。", focus: "正式收尾", note: "有個紀錄把要求包装成双方都方便的流程，而不是单纯施压。" },
    ],
    vocabulary: [
      { word: "投訴", jyutping: "tou4 sou3", meaning: "投诉", note: "正式场合可用，口语也常说有問題想反映。" },
      { word: "回覆", jyutping: "wui4 fuk1", meaning: "回复", note: "邮件、电话、机构跟进都可用。" },
      { word: "安排", jyutping: "on1 paai4", meaning: "安排", note: "會點安排是追问下一步的常用搭配。" },
      { word: "負責", jyutping: "fu6 zaak3", meaning: "负责", note: "問邊個負責比“谁负责的”更自然。" },
      { word: "退款", jyutping: "teoi3 fun2", meaning: "退款", note: "具体金额和时间可以继续追问。" },
    ],
    grammar: [
      { pattern: "已經……但係……", label: "经历与转折", example: "已經聯絡過，但係未有回覆。", jyutping: "ji5 ging1 lyun4 lok3 gwo3, daan6 hai6 mei6 jau5 wui4 fuk1.", note: "已經和過都在表达过去经历，但重点落在问题至今未解决。" },
      { pattern: "到而家都未……", label: "持续未发生", example: "到而家都未處理。", jyutping: "dou3 ji4 gaa1 dou1 mei6 cyu2 lei5.", note: "都加强“到现在仍然”的语气，适合事实陈述。" },
    ],
    challenges: [
      { title: "退款跟进", situation: "你已提交申请，想知道退款何时到账。", phrase: "想問下退款而家去到邊一步，仲要等幾耐？", jyutping: "soeng2 man6 haa5 teoi3 fun2 ji4 gaa1 heoi3 dou3 bin1 jat1 bou6, zung6 jiu3 dang2 gei2 noi6?", note: "去到邊一步是询问流程进度，比只问“好了没有”更具体。" },
      { title: "坚定但不失礼", situation: "对方一直让你等待，你要明确要求时间表。", phrase: "我明白你哋要時間處理，不過可唔可以俾個預計日期我？", jyutping: "ngo5 ming4 baak6 nei5 dei6 jiu3 si4 gaan3 cyu2 lei5, bat1 gwo3 ho2 m4 ho2 ji5 bei2 go3 jyu6 gai3 jat6 kei4 ngo5?", note: "先承认对方需要时间，再提出预计日期，是成熟的协商策略。" },
    ],
  },
  {
    number: "13", slug: "school-and-childcare", title: "学校与家庭沟通", copy: "家长、老师、功课、活动和接送", phrase: "老師話小朋友最近上堂比較分心。", jyutping: "lou5 si1 waa6 siu2 pang4 jau5 zeoi3 gan6 soeng5 tong4 bei2 gaau3 fan1 sam1.", color: "coral", track: "2–5 年", level: "长期居港", audience: "有家庭、需要和学校或照顾者持续沟通", goal: "学会询问孩子的表现、确认安排、表达担心，并和老师一起找办法。",
    lessons: [
      { title: "询问课堂表现", phrase: "小朋友最近上堂點呀？", jyutping: "siu2 pang4 jau5 zeoi3 gan6 soeng5 tong4 dim2 aa3?", mandarin: "孩子最近上课怎么样？", focus: "开放提问", note: "點呀让对方提供整体观察，不会一上来就带入结论。" },
      { title: "问功课安排", phrase: "今個星期有冇咩功課要交？", jyutping: "gam1 go3 sing1 kei4 jau5 mou5 me1 gung1 fo3 jiu3 gaau1?", mandarin: "这周有什么作业要交吗？", focus: "家校沟通", note: "今個星期和咩功課是很自然的询问组合。" },
      { title: "说明接送安排", phrase: "我今日會早啲嚟接佢。", jyutping: "ngo5 gam1 jat6 wui5 zou2 di1 lei4 zip3 keoi5.", mandarin: "我今天会早点来接他。", focus: "安排说明", note: "嚟接佢把来和接的方向、对象都说清楚。" },
      { title: "表达孩子的困难", phrase: "佢近排好似唔係好適應。", jyutping: "keoi5 gan6 paai4 hou2 ci5 m4 hai6 hou2 sik1 jing3.", mandarin: "他最近好像不太适应。", focus: "缓和表达", note: "好似和唔係好让担心听起来是观察，不是指责。" },
      { title: "和老师找办法", phrase: "我哋一齊睇下有咩方法幫到佢。", jyutping: "ngo5 dei6 jat1 cai4 tai2 haa5 jau5 me1 fong1 faat3 bong1 dou2 keoi5.", mandarin: "我们一起看看有什么办法能帮到他。", focus: "共同解决", note: "幫到佢是帮得到他，带结果补语意味。" },
      { title: "确认活动细节", phrase: "如果要參加，最遲幾時要交回條？", jyutping: "jyu4 gwo2 jiu3 caam1 gaa1, zeoi3 ci4 gei2 si4 jiu3 gaau1 wui4 tiu4?", mandarin: "如果要参加，最晚什么时候要交回条？", focus: "流程确认", note: "交回條是交回同意书或回条，属于学校高频词。" },
    ],
    vocabulary: [
      { word: "家長", jyutping: "gaa1 zoeng2", meaning: "家长", note: "家長會是家长会。" },
      { word: "功課", jyutping: "gung1 fo3", meaning: "作业", note: "功课也可泛指学习任务。" },
      { word: "默書", jyutping: "mak6 syu1", meaning: "听写", note: "香港学校场景很高频。" },
      { word: "接送", jyutping: "zip3 sung3", meaning: "接送", note: "接放學、送返學都常用。" },
      { word: "適應", jyutping: "sik1 jing3", meaning: "适应", note: "唔係好適應是描述过程，不一定是严重问题。" },
    ],
    grammar: [
      { pattern: "好似……", label: "基于观察的判断", example: "佢好似唔係好開心。", jyutping: "keoi5 hou2 ci5 m4 hai6 hou2 hoi1 sam1.", note: "好似留出观察空间，适合和老师讨论孩子状态。" },
      { pattern: "幫到 + 人", label: "结果补语", example: "有咩可以幫到佢？", jyutping: "jau5 me1 ho2 ji5 bong1 dou2 keoi5?", note: "到表示帮助产生实际效果，不只是“帮一下”。" },
    ],
    challenges: [
      { title: "和老师沟通困难", situation: "老师说孩子在课堂分心，你想先了解具体情况。", phrase: "我想了解多啲，係邊一類活動比較難集中？屋企有冇嘢可以配合？", jyutping: "ngo5 soeng2 liu5 gaai2 do1 di1, hai6 bin1 jat1 leoi6 wut6 dung6 bei2 gaau3 naan4 zaap6 zung1? uk1 kei2 jau5 mou5 je5 ho2 ji5 pui3 hap6?", note: "多啲和邊一類把问题从抽象评价拉回具体场景。" },
      { title: "协调接送变更", situation: "你临时不能按原定时间接孩子。", phrase: "我今日臨時趕唔切，想問下可唔可以改由外婆接？", jyutping: "ngo5 gam1 jat6 lam4 si4 gon2 m4 cit3, soeng2 man6 haa5 ho2 m4 ho2 ji5 goi2 jau4 ngoi6 po4 zip3?", note: "改由……接是正式而清晰的安排变更。" },
    ],
  },
  {
    number: "14", slug: "lease-renewal-and-moving", title: "续租、搬屋与租约", copy: "到期、加租、维修责任和搬迁", phrase: "份租約下個月到期，我想問續約條件。", jyutping: "fan6 zou1 joek3 haa6 go3 jyut6 dou3 kei4, ngo5 soeng2 man6 zuk6 joek3 tiu4 gin6.", color: "gold", track: "2–5 年", level: "长期居港", audience: "已经熟悉香港生活，需要处理长期住房关系", goal: "从报修升级到谈续租、加租、通知期、交接和搬迁责任。",
    lessons: [
      { title: "询问续租条件", phrase: "份租約下個月到期，我想問續約條件。", jyutping: "fan6 zou1 joek3 haa6 go3 jyut6 dou3 kei4, ngo5 soeng2 man6 zuk6 joek3 tiu4 gin6.", mandarin: "租约下个月到期，我想问续租条件。", focus: "正式询问", note: "條件是条件；份是文件或合约的量词。" },
      { title: "确认加租幅度", phrase: "如果租金要調整，可唔可以先講清楚？", jyutping: "jyu4 gwo2 zou1 gam1 jiu3 tiu4 zing2, ho2 m4 ho2 ji5 sin1 gong2 cing1 co2?", mandarin: "如果租金要调整，可以先说清楚吗？", focus: "协商语气", note: "講清楚把金额、日期和条件都纳入讨论。" },
      { title: "询问通知期", phrase: "如果我決定搬，最遲幾時要通知？", jyutping: "jyu4 gwo2 ngo5 kyut3 ding6 bun1, zeoi3 ci4 gei2 si4 jiu3 tung1 zi1?", mandarin: "如果我决定搬，最晚什么时候要通知？", focus: "合同流程", note: "決定搬是做出决定；最遲问最后期限。" },
      { title: "说明维修责任", phrase: "呢樣係正常損耗，定係租客要負責？", jyutping: "ni1 joeng6 hai6 zing3 soeng4 syun2 hou3, ding6 hai6 zou1 haak3 jiu3 fu6 zaak3?", mandarin: "这个是正常损耗，还是租客要负责？", focus: "责任边界", note: "定係把责任判断说成两个选项，避免直接争执。" },
      { title: "确认交接状态", phrase: "搬走之前要唔要安排驗樓？", jyutping: "bun1 zau2 zi1 cin4 jiu3 m4 jiu3 on1 paai4 jim6 lau4?", mandarin: "搬走之前要不要安排验房？", focus: "交接词汇", note: "驗樓是检查房屋状态，常用于退租交接。" },
      { title: "谈搬迁时间", phrase: "我想預留兩個星期清理同搬嘢。", jyutping: "ngo5 soeng2 jyu6 lau4 loeng5 go3 sing1 kei4 cing1 lei5 tung4 bun1 je5.", mandarin: "我想预留两周清理和搬东西。", focus: "时间规划", note: "預留、清理、搬嘢把实际搬迁任务说完整。" },
    ],
    vocabulary: [
      { word: "租約", jyutping: "zou1 joek3", meaning: "租约", note: "约的韵尾 -k 是重点。" },
      { word: "到期", jyutping: "dou3 kei4", meaning: "到期", note: "合约、证件、优惠都能用。" },
      { word: "續約", jyutping: "zuk6 joek3", meaning: "续约", note: "續的入声要读短促。" },
      { word: "加租", jyutping: "gaa1 zou1", meaning: "加租", note: "正式沟通中可再问幅度与生效日期。" },
      { word: "損耗", jyutping: "syun2 hou3", meaning: "损耗", note: "正常損耗是租约交接的常用词。" },
    ],
    grammar: [
      { pattern: "如果……定係……", label: "二选一确认", example: "係正常損耗，定係我哋負責？", jyutping: "hai6 zing3 soeng4 syun2 hou3, ding6 hai6 ngo5 dei6 fu6 zaak3?", note: "定係不只是问选择，也能把责任边界摊开。" },
      { pattern: "要唔要 + 动词", label: "确认是否需要", example: "要唔要驗樓？", jyutping: "jiu3 m4 jiu3 jim6 lau4?", note: "比“需要吗”更直接，是日常办事高频结构。" },
    ],
    challenges: [
      { title: "续租协商", situation: "房东提出加租，你想先问清楚依据和条件。", phrase: "我有意續租，不過想先了解加租幅度、租期同埋其他條件。", jyutping: "ngo5 jau5 ji3 zuk6 zou1, bat1 gwo3 soeng2 sin1 liu5 gaai2 gaa1 zou1 fuk1 dou6, zou1 kei4 tung4 maai4 kei4 taa1 tiu4 gin6.", note: "同埋是“以及 / 还有”，让列表听起来更自然。" },
      { title: "搬屋交接", situation: "你要搬走，想明确钥匙、按金和验房安排。", phrase: "交匙、退按金同驗樓，想問下大家通常點安排？", jyutping: "gaau1 si4, teoi3 on3 gam1 tung4 jim6 lau4, soeng2 man6 haa5 daai6 gaa1 tung1 soeng4 dim2 on1 paai4?", note: "大家通常點安排是一种不预设对方有错的协商问法。" },
    ],
  },
  {
    number: "15", slug: "community-and-neighbours", title: "邻里与社区生活", copy: "街坊、噪音、垃圾、回收和公共空间", phrase: "唔好意思，夜晚可唔可以細聲啲？", jyutping: "m4 hou2 ji3 si1, je6 maan5 ho2 m4 ho2 ji5 sai3 seng1 di1?", color: "mint", track: "2–5 年", level: "长期居港", audience: "已经建立社区生活，需要处理邻里关系和公共规则", goal: "学会在不伤关系的情况下提出边界，也能听懂街坊之间的热心提醒。",
    lessons: [
      { title: "问社区活动", phrase: "呢區平時有冇街坊活動？", jyutping: "ni1 keoi1 ping4 si4 jau5 mou5 gaai1 fong1 wut6 dung6?", mandarin: "这区平时有邻里活动吗？", focus: "社区词汇", note: "街坊是邻居、街坊朋友，也可泛指社区居民。" },
      { title: "礼貌提醒噪音", phrase: "唔好意思，夜晚可唔可以細聲啲？", jyutping: "m4 hou2 ji3 si1, je6 maan5 ho2 m4 ho2 ji5 sai3 seng1 di1?", mandarin: "不好意思，晚上可以小声一点吗？", focus: "边界表达", note: "細聲啲比“不要吵”柔和很多，适合先礼貌沟通。" },
      { title: "询问回收安排", phrase: "紙皮應該放喺邊度回收？", jyutping: "zi2 pei4 jing1 goi1 fong3 hai2 bin1 dou6 wui4 sau1?", mandarin: "纸箱应该放在哪里回收？", focus: "公共流程", note: "紙皮是纸箱、纸板，香港生活里很常听到。" },
      { title: "回应邻居提醒", phrase: "唔該你提我，我下次會留意。", jyutping: "m4 goi1 nei5 tai4 ngo5, ngo5 haa6 ci3 wui5 lau4 ji3.", mandarin: "谢谢你提醒我，我下次会注意。", focus: "关系修复", note: "提我是提醒我；留意比注意更口语。" },
      { title: "表达公共空间冲突", phrase: "呢度係共用地方，可唔可以唔好長期擺嘢？", jyutping: "ni1 dou6 hai6 gung6 jung6 dei6 fong1, ho2 m4 ho2 ji5 m4 hou2 coeng4 kei4 baai2 je5?", mandarin: "这里是公共地方，可以不要长期放东西吗？", focus: "规则协商", note: "長期擺嘢把问题从“你不应该”变成具体行为。" },
      { title: "留下台阶", phrase: "如果有需要，我哋可以一齊問下管理處。", jyutping: "jyu4 gwo2 jau5 seoi1 jiu3, ngo5 dei6 ho2 ji5 jat1 cai4 man6 haa5 gun2 lei5 cyu3.", mandarin: "如果有需要，我们可以一起问一下管理处。", focus: "共同解决", note: "一齊問下给出共同解决方案，避免邻里对立。" },
    ],
    vocabulary: [
      { word: "街坊", jyutping: "gaai1 fong1", meaning: "邻里 / 街坊", note: "既可指邻居，也可指社区居民。" },
      { word: "噪音", jyutping: "zou6 jam1", meaning: "噪音", note: "正式投诉时可以使用。" },
      { word: "垃圾", jyutping: "laap6 saap3", meaning: "垃圾", note: "圾的韵尾是 -p。" },
      { word: "回收", jyutping: "wui4 sau1", meaning: "回收", note: "回收箱是 wui4 sau1 soeng1。" },
      { word: "留意", jyutping: "lau4 ji3", meaning: "注意", note: "多用于生活提醒和观察。" },
    ],
    grammar: [
      { pattern: "可唔可以 + 形容词 + 啲", label: "缓和边界", example: "細聲啲、快啲、清楚啲。", jyutping: "sai3 seng1 di1, faai3 di1, cing1 co2 di1.", note: "啲让要求变成可调整的程度，而不是绝对命令。" },
      { pattern: "如果有需要……", label: "保留台阶", example: "如果有需要再問管理處。", jyutping: "jyu4 gwo2 jau5 seoi1 jiu3 zoi3 man6 gun2 lei5 cyu3.", note: "先给共同行动的可能，不把对话推向冲突。" },
    ],
    challenges: [
      { title: "邻居噪音", situation: "连续几晚听到噪音，你想先直接沟通。", phrase: "唔好意思，呢幾晚夜晚都有聲，可能影響到休息，可唔可以留意下？", jyutping: "m4 hou2 ji3 si1, ni1 gei2 maan5 je6 maan5 dou1 jau5 seng1, ho2 nang4 jing2 hoeng2 dou2 jau1 sik1, ho2 m4 ho2 ji5 lau4 ji3 haa5?", note: "可能影響到休息把影响说成结果，不直接给邻居贴标签。" },
      { title: "街坊提醒", situation: "邻居提醒你垃圾分类不对，你想自然回应。", phrase: "哦，原來要分開放，唔該你話我知。", jyutping: "o4, jyun4 loi4 jiu3 fan1 hoi1 fong3, m4 goi1 nei5 waa6 ngo5 zi1.", note: "原來是“原来如此”，适合接收新信息和表达感谢。" },
    ],
  },
  {
    number: "16", slug: "workplace-subtext", title: "职场弦外之音", copy: "会议、协商、含蓄拒绝和共识", phrase: "我明你嘅考慮，不過呢個方案可能要再諗下。", jyutping: "ngo5 ming4 nei5 ge3 haau2 leoi6, bat1 gwo3 ni1 go3 fong1 on3 ho2 nang4 jiu3 zoi3 nam2 haa5.", color: "violet", track: "2–5 年", level: "长期居港", audience: "已经能工作沟通，想听懂含蓄反对和团队关系", goal: "处理会议里的保留、不同意、让步、共识和收尾；重点不只是词，而是说话人的立场。",
    lessons: [
      { title: "先承认对方考虑", phrase: "我明你嘅考慮。", jyutping: "ngo5 ming4 nei5 ge3 haau2 leoi6.", mandarin: "我明白你的考虑。", focus: "协商铺垫", note: "明你嘅考慮先承认对方立场，后面的不同意见不会马上变成对抗。" },
      { title: "委婉提出保留", phrase: "不過呢個方案可能要再諗下。", jyutping: "bat1 gwo3 ni1 go3 fong1 on3 ho2 nang4 jiu3 zoi3 nam2 haa5.", mandarin: "不过这个方案可能要再想想。", focus: "含蓄反对", note: "要再諗下在很多职场语境里可能意味着“现在不建议直接做”。" },
      { title: "提出替代方向", phrase: "不如我哋先試細個範圍？", jyutping: "bat1 jyu4 ngo5 dei6 sin1 si3 sai3 go3 faan6 wai4?", mandarin: "不如我们先试小范围？", focus: "降低风险", note: "先試是把冲突转成可验证的下一步。" },
      { title: "确认团队共识", phrase: "大家如果冇其他意見，就照呢個方向行。", jyutping: "daai6 gaa1 jyu4 gwo2 mou5 kei4 taa1 ji3 gin3, zau6 ziu3 ni1 go3 fong1 hoeng3 haang4.", mandarin: "如果大家没有其他意见，就按这个方向做。", focus: "会议收口", note: "照……行是按这个方向推进，不是字面上的照着走。" },
      { title: "表达资源限制", phrase: "照而家嘅人手，未必可以同時做晒兩樣。", jyutping: "ziu3 ji4 gaa1 ge3 jan4 sau2, mei6 bit1 ho2 ji5 tung4 si4 zou6 saai3 loeng5 joeng6.", mandarin: "按现在的人手，可能没办法同时做完两件事。", focus: "能力边界", note: "未必、做晒和同時一起表达限制与完成范围。" },
      { title: "会后确认行动", phrase: "咁我哋今日先定呢兩點，其他下次再傾。", jyutping: "gam2 ngo5 dei6 gam1 jat6 sin1 ding6 ni1 loeng5 dim2, kei4 taa1 haa6 ci3 zoi3 king1.", mandarin: "那我们今天先定这两点，其他下次再谈。", focus: "共识与取舍", note: "先定、其他再傾是会议里明确范围的成熟收尾。" },
    ],
    vocabulary: [
      { word: "考慮", jyutping: "haau2 leoi6", meaning: "考虑", note: "正式职场和日常都能用。" },
      { word: "方案", jyutping: "fong1 on3", meaning: "方案", note: "案的韵尾要读清楚。" },
      { word: "配合", jyutping: "pui3 hap6", meaning: "配合", note: "常用于跨团队协作。" },
      { word: "取捨", jyutping: "ceoi2 se2", meaning: "取舍", note: "表达资源有限时很有用。" },
      { word: "共識", jyutping: "gung6 sik1", meaning: "共识", note: "会议总结和决策语境常用。" },
    ],
    grammar: [
      { pattern: "不過……可能要……", label: "婉转保留", example: "不過可能要再諗下。", jyutping: "bat1 gwo3 ho2 nang4 jiu3 zoi3 nam2 haa5.", note: "不是所有“可能”都表示五五开，在职场中常是软化拒绝。" },
      { pattern: "照……行 / 做晒", label: "按方案推进", example: "照呢個方向行。", jyutping: "ziu3 ni1 go3 fong1 hoeng3 haang4.", note: "照表示按照，晒表示全部完成；两者都值得整体记忆。" },
    ],
    challenges: [
      { title: "听懂软拒绝", situation: "同事说“可以再諗下”，但你需要判断是否继续投入。", phrase: "我想確認下，你嘅意思係暫時唔建議，定係要我補充資料先再決定？", jyutping: "ngo5 soeng2 jan6 zoek6 haa5, nei5 ge3 ji3 si1 hai6 zaan6 si4 m4 gin3 ji5, ding6 hai6 jiu3 ngo5 bou2 cung1 zi1 liu6 sin1 zoi3 kyut3 ding6?", note: "把含蓄立场拆成两个可回答的选项，是高级听力和协商能力。" },
      { title: "会议形成共识", situation: "大家意见不完全一致，你想先定最重要的两点。", phrase: "我哋未必一次過處理晒，不如先定最影響進度嗰兩點。", jyutping: "ngo5 dei6 mei6 bit1 jat1 ci3 gwo3 cyu2 lei5 saai3, bat1 jyu4 sin1 ding6 zeoi3 jing2 hoeng2 zeon3 dou6 go2 loeng5 dim2.", note: "未必一次過和先定优先级，是长期工作中很实用的表达。" },
    ],
  },
];
