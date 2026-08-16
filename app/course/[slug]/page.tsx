import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CantoneseAudio, CantoneseAudioSettings } from "../../components/CantoneseAudio";
import { courseUnits } from "../course-data";

type CourseDetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courseUnits.map((unit) => ({ slug: unit.slug }));
}

export async function generateMetadata({ params }: CourseDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const unit = courseUnits.find((item) => item.slug === slug);
  return { title: unit ? `${unit.title}｜情景课程｜粤语鲜活学堂` : "情景课程｜粤语鲜活学堂" };
}

export default async function CourseDetailPage({ params }: CourseDetailProps) {
  const { slug } = await params;
  const unit = courseUnits.find((item) => item.slug === slug);
  if (!unit) notFound();

  return (
    <main className="subpage course-detail-page">
      <header className="subpage-header">
        <a className="brand" href="/"><span className="brand-mark">粵</span><span><strong>粤语鲜活学堂</strong><small>Vivid Cantonese</small></span></a>
        <a className="back-link" href="/course">← 全部场景</a>
      </header>
      <section className="course-detail-hero page-shell">
        <div>
          <p className="eyebrow">SCENE {unit.number} / {unit.track}</p>
          <div className="course-detail-tags"><span>{unit.level}</span><span>{unit.lessons.length} 个任务回合</span><span>{unit.vocabulary.length} 个词汇重点</span></div>
          <h1>{unit.title}</h1>
          <p>{unit.goal}</p>
          <div className="course-detail-stats"><span><b>{unit.lessons.length}</b> 听说回合</span><span><b>{unit.grammar.length}</b> 句型与语气</span><span><b>{unit.challenges.length}</b> 进阶挑战</span></div>
        </div>
        <div className={`course-detail-phrase ${unit.color}`}>
          <span>本场景先记这一句</span>
          <strong>{unit.phrase}</strong>
          <code>{unit.jyutping}</code>
          <CantoneseAudio text={unit.phrase} label={`播放：${unit.phrase}`} />
        </div>
      </section>
      <div className="page-shell"><CantoneseAudioSettings /></div>
      <section className="lesson-list page-shell">
        <div className="lesson-list-heading"><div><p className="eyebrow">{unit.lessons.length} MICRO LESSONS / 任务回合</p><h2>先把一句话，<em>放进一个任务。</em></h2></div><p>每一回合都标出普通话意思、粤拼、学习焦点和一个可以迁移到其他场景的提示。</p></div>
        <div className="lesson-grid">
          {unit.lessons.map((lesson, index) => (
            <article className="lesson-card" key={lesson.title}>
              <div className="lesson-card-top"><span>{String(index + 1).padStart(2, "0")}</span><small>{lesson.focus}</small></div>
              <h3>{lesson.title}</h3>
              <p className="lesson-phrase">{lesson.phrase}</p>
              <code>{lesson.jyutping}</code>
              <CantoneseAudio text={lesson.phrase} label={`播放：${lesson.phrase}`} compact />
              <p className="lesson-meaning">普通话：{lesson.mandarin}</p>
              <p className="lesson-note">{lesson.note}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="course-focus-grid page-shell">
        <article className="course-vocabulary-panel">
          <div className="course-panel-heading"><div><p className="eyebrow">WORD BANK / 词汇与发音</p><h2>看到就要会听，<em>听到就要会用。</em></h2></div><span>{unit.vocabulary.length} 个</span></div>
          <div className="vocabulary-grid">{unit.vocabulary.map((item) => <div className="vocabulary-item" key={item.word}><div className="vocabulary-main"><strong>{item.word}</strong><code>{item.jyutping}</code></div><span>{item.meaning}</span><small>{item.note}</small><CantoneseAudio text={item.word} label={`播放：${item.word}`} compact /></div>)}</div>
        </article>
        <article className="course-grammar-panel">
          <div className="course-panel-heading"><div><p className="eyebrow">GRAMMAR / 句型与语气</p><h2>别只背词，<em>看它怎样连起来。</em></h2></div><span>{unit.grammar.length} 个</span></div>
          <div className="grammar-points">{unit.grammar.map((point) => <div className="grammar-point" key={point.pattern}><div className="grammar-point-top"><b>{point.pattern}</b><small>{point.label}</small></div><strong>{point.example}</strong><code>{point.jyutping}</code><CantoneseAudio text={point.example} label={`播放：${point.example}`} compact /><p>{point.note}</p></div>)}</div>
        </article>
      </section>
      <section className="course-challenge page-shell">
        <div className="course-panel-heading"><div><p className="eyebrow">ADVANCED TASK / 进阶挑战</p><h2>把这套表达带进<em>更难的现场。</em></h2></div><p>这里不再给你一句“标准答案”，而是让你处理信息不完整、时间变化和关系语气。</p></div>
        <div className="challenge-grid">{unit.challenges.map((challenge, index) => <article className={`challenge-card ${unit.color}`} key={challenge.title}><div className="challenge-number">0{index + 1}</div><small>{challenge.situation}</small><h3>{challenge.title}</h3><strong>{challenge.phrase}</strong><code>{challenge.jyutping}</code><CantoneseAudio text={challenge.phrase} label={`播放：${challenge.phrase}`} compact /><p>{challenge.note}</p></article>)}</div>
      </section>
      <section className="course-detail-next page-shell">
        <div><p className="eyebrow">NEXT STEP / 下一步</p><h2>把这句带进转换桥和练习。</h2><p>先听整句，再回到 Bridge 观察普通话与粤语的分岔。</p></div>
        <div className="course-detail-actions"><a className="secondary-link" href="/bridge">查普通话分岔 <span>→</span></a><a className="primary-button" href="/practice">立即做反应 <span>→</span></a></div>
      </section>
    </main>
  );
}
