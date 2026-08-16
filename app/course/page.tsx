import Link from "next/link";

export const metadata = {
  title: "情景课程｜粤语鲜活学堂",
  description: "按香港真实生活场景学习粤语，从听不清到工作沟通。",
};

const units = [
  ["01", "先把对话接回来", "澄清、重复、确认和修复对话", "唔好意思，可唔可以再講一次？", "coral"],
  ["02", "茶餐厅生存课", "早餐、饮品、加冰、少甜和打包", "唔該，一個奶茶，少甜。", "gold"],
  ["03", "交通与方向", "地铁、巴士、的士、转车和落车", "呢架車去唔去尖沙咀？", "mint"],
  ["04", "买东西与退换", "尺码、付款、找续、优惠和退货", "有冇平啲嘅款？", "violet"],
  ["05", "电话和语音消息", "接听、回拨、听不清和稍后回复", "我遲啲再覆你。", "blue"],
  ["06", "工作沟通基础", "进度、交接、会议和礼貌请求", "你得閒嗰陣覆我啦。", "peach"],
  ["07", "约时间与改约", "约人、迟到、取消和确认下一步", "聽日三點見，得唔得？", "coral"],
  ["08", "社交与近况", "寒暄、邀请、拒绝和关系维护", "最近搞成點呀？", "gold"],
  ["09", "住房与维修", "管理处、邻居、冷气和水电煤", "個水喉好似漏水喎。", "mint"],
  ["10", "医生与药房", "预约、症状、药物和注意事项", "我由尋日開始喉嚨痛。", "blue"],
  ["11", "银行与公共服务", "排队、证件、表格和身份确认", "請問要填邊張表？", "violet"],
  ["12", "投诉与解决问题", "讲清楚经过、表达不满和谈解决方案", "我想問下可唔可以跟進？", "peach"],
];

export default function CoursePage() {
  return <main className="subpage"><header className="subpage-header"><Link className="brand" href="/"><span className="brand-mark">粵</span><span><strong>粤语鲜活学堂</strong><small>Vivid Cantonese</small></span></Link><Link className="back-link" href="/">← 回到首页</Link></header><section className="subpage-hero page-shell"><p className="eyebrow">THE COURSE / 情景课程</p><h1>先学会把事情办成，<br /><em>再慢慢变得流利。</em></h1><p>每个单元都围绕一个真实任务展开：你要说什么、对方会怎样回应、发生意外时如何把话接回来。</p><div className="route-meta"><span><b>12</b> 个场景单元</span><span><b>48</b> 节微课</span><span><b>360+</b> 个核心词句</span></div></section><section className="course-grid page-shell">{units.map(([number,title,copy,phrase,color]) => <article className={`course-unit ${color}`} key={number}><div className="unit-top"><span>{number}</span><small>4 lessons</small></div><h2>{title}</h2><p>{copy}</p><div className="unit-phrase"><b>{phrase}</b><small>看例句 · 听发音 · 做反应</small></div><button type="button">开始这个场景 <span>→</span></button></article>)}</section><section className="subpage-footer page-shell"><p>想先解决“普通话说法怎么变成自然粤语”？</p><Link className="primary-button" href="/bridge">进入普通话转换桥 <span>→</span></Link></section></main>;
}
