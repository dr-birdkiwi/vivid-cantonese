export type DialogueLine = {
  speaker: string;
  cantonese: string;
  jyutping: string;
  mandarin: string;
  mood: string;
};

export const courseDialogues: Record<string, DialogueLine[]> = {
  "repair-the-conversation": [
    { speaker: "对方", cantonese: "你聽日交份表俾我就得喇。", jyutping: "nei5 ting1 jat6 gaau1 fan6 biu2 bei2 ngo5 zau6 dak1 laa3.", mandarin: "你明天把表交给我就行了。", mood: "交代安排" },
    { speaker: "你", cantonese: "唔好意思，可唔可以再講一次？", jyutping: "m4 hou2 ji3 si1, ho2 m4 ho2 ji5 zoi3 gong2 jat1 ci3?", mandarin: "不好意思，可以再说一次吗？", mood: "礼貌修复" },
    { speaker: "对方", cantonese: "我話聽日之前交返份表。", jyutping: "ngo5 waa6 ting1 jat6 zi1 cin4 gaau1 faan1 fan6 biu2.", mandarin: "我是说在明天之前交回表格。", mood: "重新说明" },
    { speaker: "你", cantonese: "如果我冇聽錯，即係聽日之前交，係咪？", jyutping: "jyu4 gwo2 ngo5 mou5 teng1 co3, zik1 hai6 ting1 jat6 zi1 cin4 gaau1, hai6 mai6?", mandarin: "如果我没听错，就是明天之前交，对吗？", mood: "复述确认" },
  ],
  "cha-chaan-teng": [
    { speaker: "你", cantonese: "唔該，一個奶茶，少甜。", jyutping: "m4 goi1, jat1 go3 naai5 caa4, siu2 tim4.", mandarin: "麻烦一杯奶茶，少甜。", mood: "开始点餐" },
    { speaker: "对方", cantonese: "凍定熱呀？堂食定外賣？", jyutping: "dung3 ding6 jit6 aa3? tong4 sik6 ding6 ngoi6 maai6?", mandarin: "要冷的还是热的？堂食还是外带？", mood: "追问选项" },
    { speaker: "你", cantonese: "凍嘅，走冰，堂食。仲要一個菠蘿包。", jyutping: "dung3 ge3, zau2 bing1, tong4 sik6. zung6 jiu3 jat1 go3 bo1 lo4 baau1.", mandarin: "要冷的，不要冰，堂食。还要一个菠萝包。", mood: "组合要求" },
    { speaker: "对方", cantonese: "好呀，一共四十八蚊，埋單先。", jyutping: "hou2 aa3, jat1 gung6 sei3 sap6 baat3 man1, maai4 daan1 sin1.", mandarin: "好的，一共四十八元，先结账。", mood: "确认收款" },
  ],
  "transport-and-directions": [
    { speaker: "你", cantonese: "唔該，呢架車去唔去尖沙咀？", jyutping: "m4 goi1, ni1 gaa3 ce1 heoi3 m4 heoi3 zim1 saa1 zeoi2?", mandarin: "麻烦问一下，这班车去不去尖沙咀？", mood: "问路" },
    { speaker: "对方", cantonese: "去呀，不過你要喺旺角轉車。", jyutping: "heoi3 aa3, bat1 gwo3 nei5 jiu3 hai2 wong6 gok3 zyun2 ce1.", mandarin: "去，不过你要在旺角换车。", mood: "补充路线" },
    { speaker: "你", cantonese: "咁仲有幾多個站？要唔要行好耐？", jyutping: "gam2 zung6 jau5 gei2 do1 go3 zaam6? jiu3 m4 jiu3 haang4 hou2 noi6?", mandarin: "那还有几站？要走很久吗？", mood: "确认距离" },
    { speaker: "对方", cantonese: "四個站左右，落車之後跟住指示行就得。", jyutping: "sei3 go3 zaam6 zo2 jau6, lok6 ce1 zi1 hau6 gan1 zyu6 zi2 si6 haang4 zau6 dak1.", mandarin: "大约四站，下车后跟着指示走就行。", mood: "给出下一步" },
  ],
  "shopping-and-returns": [
    { speaker: "你", cantonese: "呢件有冇細個碼啲？", jyutping: "ni1 gin6 jau5 mou5 sai3 go3 maa5 di1?", mandarin: "这件有没有小一码的？", mood: "询问尺码" },
    { speaker: "对方", cantonese: "有呀，你可以試下呢件。", jyutping: "jau5 aa3, nei5 ho2 ji5 si3 haa5 ni1 gin6.", mandarin: "有，你可以试试这件。", mood: "提供选择" },
    { speaker: "你", cantonese: "如果唔啱，可唔可以換第二隻色？", jyutping: "jyu4 gwo2 m4 ngaam1, ho2 m4 ho2 ji5 wun6 dai6 ji6 zek3 sik1?", mandarin: "如果不合适，可以换另一个颜色吗？", mood: "确认条件" },
    { speaker: "对方", cantonese: "可以，保留收據，三十日內都可以換。", jyutping: "ho2 ji5, bou2 cyun4 sau1 geoi3, saam1 sap6 jat6 noi6 dou1 ho2 ji5 wun6.", mandarin: "可以，保留收据，三十天内都可以换。", mood: "说明售后" },
  ],
  "phone-and-voice-messages": [
    { speaker: "对方", cantonese: "喂，你而家方便講電話嗎？", jyutping: "wai3, nei5 ji4 gaa1 fong1 bin6 gong2 din6 waa2 maa3?", mandarin: "喂，你现在方便讲电话吗？", mood: "开场确认" },
    { speaker: "你", cantonese: "我而家開緊會，未方便講住。", jyutping: "ngo5 ji4 gaa1 hoi1 gan2 wui2, mei6 fong1 bin6 gong2 zyu6.", mandarin: "我现在正在开会，暂时不方便说。", mood: "交代状态" },
    { speaker: "对方", cantonese: "咁你幾時得閒？我想同你講返份文件。", jyutping: "gam2 nei5 gei2 si4 dak1 haan4? ngo5 soeng2 tung4 nei5 gong2 faan1 fan6 man4 gin6.", mandarin: "那你什么时候有空？我想和你说一下文件。", mood: "提出后续" },
    { speaker: "你", cantonese: "散會之後我打返俾你，或者你打字俾我都得。", jyutping: "saan3 wui2 zi1 hau6 ngo5 daa2 faan1 bei2 nei5, waak6 ze2 nei5 daa2 zi6 bei2 ngo5 dou1 dak1.", mandarin: "散会后我回拨给你，或者你打字发给我也行。", mood: "给出选项" },
  ],
  "work-communication": [
    { speaker: "对方", cantonese: "呢份資料你今日做唔做得切？", jyutping: "ni1 fan6 zi1 liu6 nei5 gam1 jat6 zou6 m4 zou6 dak1 cit3?", mandarin: "这份资料你今天来得及做完吗？", mood: "确认进度" },
    { speaker: "你", cantonese: "呢部分今日可以交，另外嗰部分要聽日先得。", jyutping: "ni1 bou6 fan6 gam1 jat6 ho2 ji5 gaau1, ling6 ngoi6 go2 bou6 fan6 jiu3 ting1 jat6 sin1 dak1.", mandarin: "这部分今天可以交，另外那部分要明天才行。", mood: "设定边界" },
    { speaker: "对方", cantonese: "明白，咁你得閒嗰陣先睇埋剩低嗰啲。", jyutping: "ming4 baak6, gam2 nei5 dak1 haan4 go2 zan6 sin1 tai2 maai4 zing6 dai1 go2 di1.", mandarin: "明白，那你有空时再看剩下的那些。", mood: "调整安排" },
    { speaker: "你", cantonese: "好，搞掂之後我再覆你。", jyutping: "hou2, gaau2 dim6 zi1 hau6 ngo5 zoi3 fuk1 nei5.", mandarin: "好，处理好后我再回复你。", mood: "承诺后续" },
  ],
  "appointments-and-rescheduling": [
    { speaker: "你", cantonese: "聽日三點見，得唔得？", jyutping: "ting1 jat6 saam1 dim2 gin3, dak1 m4 dak1?", mandarin: "明天三点见，可以吗？", mood: "提出时间" },
    { speaker: "对方", cantonese: "三點可能趕唔切，四點半得唔得？", jyutping: "saam1 dim2 ho2 nang4 gon2 m4 cit3, sei3 dim2 bun3 dak1 m4 dak1?", mandarin: "三点可能赶不上，四点半可以吗？", mood: "提出替代" },
    { speaker: "你", cantonese: "得呀，如果你遲到就同我講聲。", jyutping: "dak1 aa3, jyu4 gwo2 nei5 ci4 dou3 zau6 tung4 ngo5 gong2 seng1.", mandarin: "可以，如果你迟到就跟我说一声。", mood: "接受并设边界" },
    { speaker: "对方", cantonese: "冇問題，到時見。", jyutping: "mou5 man6 tai4, dou3 si4 gin3.", mandarin: "没问题，到时见。", mood: "确认结束" },
  ],
  "social-updates": [
    { speaker: "对方", cantonese: "最近搞成點呀？仲習慣香港未？", jyutping: "zeoi3 gan6 gaau2 sing4 dim2 aa3? zung6 zaap6 gwaan3 hoeng1 gong2 mei6?", mandarin: "最近过得怎么样？还习惯香港吗？", mood: "寒暄关心" },
    { speaker: "你", cantonese: "都幾好，係返工忙咗啲。", jyutping: "dou1 gei2 hou2, hai6 faan1 gung1 mong4 zo2 di1.", mandarin: "还不错，就是工作忙了一点。", mood: "回应近况" },
    { speaker: "对方", cantonese: "有時間一齊食飯呀？", jyutping: "jau5 si4 gaan3 jat1 cai4 sik6 faan6 aa3?", mandarin: "有时间一起吃饭吗？", mood: "发出邀请" },
    { speaker: "你", cantonese: "今個星期未必得，下個星期再約啦。", jyutping: "gam1 go3 sing1 kei4 mei6 bit1 dak1, haa6 go3 sing1 kei4 zoi3 joek3 laa1.", mandarin: "这周不一定行，下周再约吧。", mood: "婉拒保留" },
  ],
  "housing-and-repairs": [
    { speaker: "你", cantonese: "唔好意思，個水喉好似漏水喎。", jyutping: "m4 hou2 ji3 si1, go3 seoi2 hau4 hou2 ci5 lau6 seoi2 wo3.", mandarin: "不好意思，水管好像漏水了。", mood: "报告问题" },
    { speaker: "管理处", cantonese: "係廚房嗰條？有冇影相俾我睇下？", jyutping: "hai6 cyu4 fong2 go2 tiu4? jau5 mou5 jing2 soeng2 bei2 ngo5 tai2 haa5?", mandarin: "是厨房那条吗？可以拍张照片给我看看吗？", mood: "确认细节" },
    { speaker: "你", cantonese: "係呀，琴晚開始一路滴水，地下都濕晒。", jyutping: "hai6 aa3, kam4 maan5 hoi1 ci2 jat1 lou6 dik6 seoi2, dei6 haa6 dou1 sap1 saai3.", mandarin: "是的，昨晚开始一直滴水，地面都湿了。", mood: "描述影响" },
    { speaker: "管理处", cantonese: "我安排師傅聽日上門，時間再通知你。", jyutping: "ngo5 on1 paai4 si1 fu6 ting1 jat6 soeng5 mun4, si4 gaan3 zoi3 tung1 zi1 nei5.", mandarin: "我安排师傅明天上门，时间再通知你。", mood: "安排维修" },
  ],
  "doctor-and-pharmacy": [
    { speaker: "医生", cantonese: "你由幾時開始唔舒服？", jyutping: "nei5 jau4 gei2 si4 hoi1 ci2 m4 syu1 fuk6?", mandarin: "你从什么时候开始不舒服？", mood: "询问时间线" },
    { speaker: "你", cantonese: "我由尋日開始喉嚨痛，吞嘢嗰陣更加痛。", jyutping: "ngo5 jau4 cam4 jat6 hoi1 ci2 hau4 lung4 tung3, tan1 je5 go2 zan6 gang3 gaa1 tung3.", mandarin: "我从昨天开始喉咙痛，吞东西时更痛。", mood: "描述症状" },
    { speaker: "医生", cantonese: "有冇發燒或者咳？對咩藥物敏感嗎？", jyutping: "jau5 mou5 faat3 siu1 waak6 ze2 haak3? deoi3 me1 joek6 mat6 man5 gam2 maa3?", mandarin: "有没有发烧或咳嗽？对什么药物过敏吗？", mood: "追问风险" },
    { speaker: "你", cantonese: "冇發燒，暫時都冇藥物敏感。呢啲藥要食幾耐？", jyutping: "mou5 faat3 siu1, zaam6 si4 dou1 mou5 joek6 mat6 man5 gam2. ni1 di1 joek6 jiu3 sik6 gei2 noi6?", mandarin: "没有发烧，暂时也没有药物过敏。这些药要吃多久？", mood: "确认用药" },
  ],
  "bank-and-public-services": [
    { speaker: "你", cantonese: "請問要填邊張表？", jyutping: "cing2 man6 jiu3 tin4 bin1 zoeng1 biu2?", mandarin: "请问要填哪张表？", mood: "确认文件" },
    { speaker: "职员", cantonese: "填呢張，另外要影印身份證。", jyutping: "tin4 ni1 zoeng1, ling6 ngoi6 jiu3 jing2 jan3 san1 fan6 zing3.", mandarin: "填这张，另外要复印身份证。", mood: "说明材料" },
    { speaker: "你", cantonese: "如果今日交齊，幾時可以有結果？", jyutping: "jyu4 gwo2 gam1 jat6 gaau1 cai4, gei2 si4 ho2 ji5 jau5 git3 gwo2?", mandarin: "如果今天交齐，什么时候可以有结果？", mood: "询问时限" },
    { speaker: "职员", cantonese: "一般要五個工作天，有需要我哋會再聯絡你。", jyutping: "jat1 bun1 jiu3 ng5 go3 gung1 zok3 tin1, jau5 seoi1 jiu3 ngo5 dei6 wui5 zoi3 lyun4 lok6 nei5.", mandarin: "一般需要五个工作日，如有需要我们会再联系你。", mood: "交代流程" },
  ],
  "complaints-and-solutions": [
    { speaker: "你", cantonese: "我想問下，點解退款仲未到？", jyutping: "ngo5 soeng2 man6 haa5, dim2 gaai2 teoi3 fun2 zung6 mei6 dou3?", mandarin: "我想问一下，为什么退款还没到账？", mood: "提出事实" },
    { speaker: "对方", cantonese: "唔好意思，我幫你查下紀錄先。", jyutping: "m4 hou2 ji3 si1, ngo5 bong1 nei5 caa4 haa5 gei2 luk6 sin1.", mandarin: "不好意思，我先帮你查一下记录。", mood: "开始处理" },
    { speaker: "你", cantonese: "我上個星期已經問過一次，但係仲未收到。", jyutping: "ngo5 soeng6 go3 sing1 kei4 ji5 ging1 man6 gwo3 jat1 ci3, daan6 hai6 zung6 mei6 sau1 dou2.", mandarin: "我上周已经问过一次，但还是没收到。", mood: "补充经过" },
    { speaker: "对方", cantonese: "我明白你嘅情況，今日會幫你跟進，最遲聽日覆你。", jyutping: "ngo5 ming4 baak6 nei5 ge3 cing4 fong3, gam1 jat6 wui5 bong1 nei5 gan1 zeon3, zeoi3 ci4 ting1 jat6 fuk1 nei5.", mandarin: "我明白你的情况，今天会帮你跟进，最晚明天回复你。", mood: "给出承诺" },
  ],
  "school-and-childcare": [
    { speaker: "老师", cantonese: "小朋友最近上堂比較分心。", jyutping: "siu2 pang4 jau5 zeoi3 gan6 soeng5 tong4 bei2 gaau3 fan1 sam1.", mandarin: "孩子最近上课比较分心。", mood: "反馈观察" },
    { speaker: "家长", cantonese: "係咪有咩特別原因？佢喺屋企都好似攰咗啲。", jyutping: "hai6 mai6 jau5 me1 dak6 bit6 jyun4 jan1? keoi5 hai2 uk1 kei2 dou1 hou2 ci5 gui6 zo2 di1.", mandarin: "是不是有什么特别原因？他在家也好像累了一点。", mood: "询问背景" },
    { speaker: "老师", cantonese: "我哋會再觀察幾日，亦都會提醒佢小息嗰陣休息下。", jyutping: "ngo5 dei6 wui5 zoi3 gun1 caat3 gei2 jat6, jik6 dou1 wui5 tai4 sing2 keoi5 siu2 sik1 go2 zan6 jau1 sik1 haa5.", mandarin: "我们会再观察几天，也会提醒他小息时休息一下。", mood: "提出办法" },
    { speaker: "家长", cantonese: "好呀，有新情況麻煩你再通知我。", jyutping: "hou2 aa3, jau5 san1 cing4 fong3 maa4 faan4 nei5 zoi3 tung1 zi1 ngo5.", mandarin: "好的，有新情况麻烦你再通知我。", mood: "建立合作" },
  ],
  "lease-renewal-and-moving": [
    { speaker: "你", cantonese: "份租約下個月到期，我想問續約條件。", jyutping: "fan6 zou1 joek3 haa6 go3 jyut6 dou3 kei4, ngo5 soeng2 man6 zuk6 joek3 tiu4 gin6.", mandarin: "租约下个月到期，我想问一下续约条件。", mood: "开启协商" },
    { speaker: "业主", cantonese: "續約可以，不過租金會加一千蚊。", jyutping: "zuk6 joek3 ho2 ji5, bat1 gwo3 zou1 gam1 wui5 gaa1 jat1 cin1 man1.", mandarin: "可以续约，不过租金会加一千元。", mood: "提出条件" },
    { speaker: "你", cantonese: "加幅比較大，可唔可以再傾下？", jyutping: "gaa1 fuk1 bei2 gaau3 daai6, ho2 m4 ho2 ji5 zoi3 king1 haa5?", mandarin: "涨幅比较大，可以再谈谈吗？", mood: "保留立场" },
    { speaker: "业主", cantonese: "咁我哋睇下可唔可以各讓一步，遲啲再覆你。", jyutping: "gam2 ngo5 dei6 tai2 haa5 ho2 m4 ho2 ji5 gok3 joeng6 jat1 bou6, ci4 di1 zoi3 fuk1 nei5.", mandarin: "那我们看看能不能各让一步，晚点再回复你。", mood: "留下空间" },
  ],
  "community-and-neighbours": [
    { speaker: "你", cantonese: "唔好意思，夜晚可唔可以細聲啲？", jyutping: "m4 hou2 ji3 si1, je6 maan5 ho2 m4 ho2 ji5 sai3 seng1 di1?", mandarin: "不好意思，晚上可以小声一点吗？", mood: "提出边界" },
    { speaker: "邻居", cantonese: "唔好意思，係咪嘈到你？我哋即刻細聲啲。", jyutping: "m4 hou2 ji3 si1, hai6 mai6 cou4 dou3 nei5? ngo5 dei6 zik1 hak1 sai3 seng1 di1.", mandarin: "不好意思，是不是吵到你了？我们马上小声一点。", mood: "回应善意" },
    { speaker: "你", cantonese: "唔緊要，多謝你。其實過咗十一點先比較嘈。", jyutping: "m4 gan2 jiu3, do1 ze6 nei5. kei4 sat6 gwo3 zo2 sap6 jat1 dim2 sin1 bei2 gaau3 cou4.", mandarin: "没关系，谢谢你。其实过了十一点才比较吵。", mood: "补充具体时间" },
    { speaker: "邻居", cantonese: "明白，我哋會留意，唔好意思喎。", jyutping: "ming4 baak6, ngo5 dei6 wui5 lau4 ji3, m4 hou2 ji3 si1 wo3.", mandarin: "明白，我们会注意，不好意思。", mood: "修复关系" },
  ],
  "workplace-subtext": [
    { speaker: "你", cantonese: "我覺得呢個方案可以快啲落實。", jyutping: "ngo5 gok3 dak1 ni1 go3 fong1 on3 ho2 ji5 faai3 di1 lok6 sat6.", mandarin: "我觉得这个方案可以更快落实。", mood: "提出建议" },
    { speaker: "对方", cantonese: "我明你嘅考慮，不過呢個方案可能要再諗下。", jyutping: "ngo5 ming4 nei5 ge3 haau2 leoi6, bat1 gwo3 ni1 go3 fong1 on3 ho2 nang4 jiu3 zoi3 nam2 haa5.", mandarin: "我明白你的考虑，不过这个方案可能要再想想。", mood: "含蓄保留" },
    { speaker: "你", cantonese: "你主要係擔心時間，定係資源唔夠？", jyutping: "nei5 zyu2 jiu3 hai6 daam1 sam1 si4 gaan3, ding6 hai6 zi1 jyun4 m4 gau3?", mandarin: "你主要是担心时间，还是资源不够？", mood: "拆解异议" },
    { speaker: "对方", cantonese: "兩樣都有，所以不如先做個小範圍測試。", jyutping: "loeng5 joeng6 dou1 jau5, so2 ji5 bat1 jyu4 sin1 zou6 go3 siu2 faan6 wai4 cak1 si3.", mandarin: "两方面都有，所以不如先做一个小范围测试。", mood: "提出折衷" },
  ],
};
