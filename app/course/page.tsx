import { CantoneseAudio, CantoneseAudioSettings } from "../components/CantoneseAudio";
import { courseTracks, courseUnits } from "./course-data";

export const metadata = {
  title: "情景课程｜粤语鲜活学堂",
  description: "按香港真实生活场景学习粤语，从听不清到工作沟通。",
};

export default function CoursePage() {
  return (
    <main className="subpage">
      <header className="subpage-header">
        <a className="brand" href="/"><span className="brand-mark">粵</span><span><strong>粤语鲜活学堂</strong><small>Vivid Cantonese</small></span></a>
        <a className="back-link" href="/">← 回到首页</a>
      </header>
      <section className="subpage-hero page-shell">
        <p className="eyebrow">THE COURSE / 情景课程</p>
        <h1>先学会把事情办成，<br /><em>再慢慢变得流利。</em></h1>
        <p>每个单元都围绕一个真实任务展开：你要说什么、对方会怎样回应、发生意外时如何把话接回来。内容按居港时间分层，初学者和已经住了几年的人都能找到下一步。</p>
        <div className="route-meta"><span><b>{courseUnits.length}</b> 个场景单元</span><span><b>{courseUnits.reduce((total, unit) => total + unit.lessons.length, 0)}</b> 个任务回合</span><span><b>{courseUnits.reduce((total, unit) => total + unit.vocabulary.length, 0)}+</b> 个词汇重点</span></div>
      </section>
      <div className="page-shell"><CantoneseAudioSettings /></div>
      <section className="course-tracks page-shell">
        <div className="section-intro"><div><p className="eyebrow">FOUR STAGES / 四条路线</p><h2>你住在香港多久，<em>决定下一种难度。</em></h2></div><p>不按“初级 / 高级”硬切，而是按你每天会遇到的任务，逐步加入体貌、句末语气、方向补语和含蓄协商。</p></div>
        <div className="track-grid">{courseTracks.map((track) => <article className={`track-card ${track.color}`} key={track.label}><div className="track-card-top"><span>{track.label}</span><small>课程 {track.units}</small></div><h3>{track.title}</h3><p>{track.copy}</p></article>)}</div>
      </section>
      <section className="course-grid page-shell">
        {courseUnits.map((unit) => (
          <article className={`course-unit ${unit.color}`} key={unit.slug}>
            <div className="unit-top"><span>{unit.number}</span><small>{unit.track}</small></div>
            <h2>{unit.title}</h2>
            <p>{unit.copy}</p>
            <div className="unit-level"><b>{unit.level}</b><span>{unit.audience}</span></div>
            <div className="unit-meta"><span>{unit.lessons.length} 回合</span><span>{unit.vocabulary.length} 词</span><span>{unit.grammar.length} 个句型</span></div>
            <div className="unit-phrase">
              <b>{unit.phrase}</b>
              <small>{unit.jyutping}</small>
              <CantoneseAudio text={unit.phrase} label={`播放：${unit.phrase}`} compact />
            </div>
            <a className="course-unit-link" href={`/course/${unit.slug}`}>打开这个场景 <span>→</span></a>
          </article>
        ))}
      </section>
      <section className="subpage-footer page-shell"><p>想先解决“普通话说法怎么变成自然粤语”？</p><a className="primary-button" href="/bridge">进入普通话转换桥 <span>→</span></a></section>
    </main>
  );
}
