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
          <p className="eyebrow">SCENE {unit.number} / 情景微课</p>
          <h1>{unit.title}</h1>
          <p>{unit.copy}。先听完整句，再把每个回合放进真实任务。</p>
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
        <div className="lesson-list-heading"><p className="eyebrow">4 MICRO LESSONS / 四个回合</p><h2>每一节只解决一个<em>真实开口点。</em></h2></div>
        <div className="lesson-grid">
          {unit.lessons.map((lesson, index) => (
            <article className="lesson-card" key={lesson.title}>
              <div className="lesson-card-top"><span>0{index + 1}</span><small>听 · 说 · 反应</small></div>
              <h3>{lesson.title}</h3>
              <p className="lesson-phrase">{lesson.phrase}</p>
              <code>{lesson.jyutping}</code>
              <CantoneseAudio text={lesson.phrase} label={`播放：${lesson.phrase}`} compact />
              <p className="lesson-note">{lesson.note}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="course-detail-next page-shell">
        <div><p className="eyebrow">NEXT STEP / 下一步</p><h2>把这句带进转换桥和练习。</h2></div>
        <div className="course-detail-actions"><a className="secondary-link" href="/bridge">查普通话分岔 <span>→</span></a><a className="primary-button" href="/practice">立即做反应 <span>→</span></a></div>
      </section>
    </main>
  );
}
