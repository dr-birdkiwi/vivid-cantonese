import { CantoneseAudio, CantoneseAudioSettings } from "../components/CantoneseAudio";
import { courseUnits } from "./course-data";

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
        <p>每个单元都围绕一个真实任务展开：你要说什么、对方会怎样回应、发生意外时如何把话接回来。</p>
        <div className="route-meta"><span><b>12</b> 个场景单元</span><span><b>48</b> 节微课</span><span><b>360+</b> 个核心词句</span></div>
      </section>
      <div className="page-shell"><CantoneseAudioSettings /></div>
      <section className="course-grid page-shell">
        {courseUnits.map((unit) => (
          <article className={`course-unit ${unit.color}`} key={unit.slug}>
            <div className="unit-top"><span>{unit.number}</span><small>4 lessons</small></div>
            <h2>{unit.title}</h2>
            <p>{unit.copy}</p>
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
