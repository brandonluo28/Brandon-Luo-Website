import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { portfolioBySlug, portfolioItems } from '@/lib/portfolio';

export function generateStaticParams() {
  return portfolioItems.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioBySlug[slug];
  return item ? { title: `${item.title} | Brandon Luo`, description: item.summary } : {};
}

function AssetImage({ src, alt }: { src: string; alt: string }) {
  return <img src={`/assets/${src}`} alt={alt} loading="lazy" decoding="async"/>;
}

function ToolsCard({ skills }: { skills: string[] }) {
  return <section className="tools-card"><p className="detail-label">COMPONENT LIBRARY</p><h2>Tools &amp; systems</h2><div className="detail-tags">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></section>;
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = portfolioBySlug[slug];
  if (!item) notFound();
  const index = portfolioItems.findIndex((entry) => entry.slug === slug);
  const previous = portfolioItems[(index - 1 + portfolioItems.length) % portfolioItems.length];
  const next = portfolioItems[(index + 1) % portfolioItems.length];

  return <main className="detail-shell">
    <header className="detail-header">
      <a href="/" className="pcb-brand"><span className="logo-chip">BL</span><span><b>BRANDON LUO</b><small>ELECTRICAL AND COMPUTER ENGINEERING</small></span></a>
      <a className="back-board" href="/"><span>←</span> RETURN TO BOARD</a>
      <a href="mailto:brandonluo@gatech.edu">CONTACT ↗</a>
    </header>

    <div className="detail-trace" aria-hidden="true"><span className="trace-port">J1</span><i/><b>{item.ref}</b></div>

    <article className="detail-page">
      <div className="detail-kicker"><span>{item.ref}</span><p>{item.eyebrow}</p><p>{item.period}</p></div>
      <div className="detail-hero">
        <div><p className="detail-role">{item.role}</p><h1>{item.title}</h1><p className="detail-summary">{item.summary}</p></div>
        <div className="detail-component component-ic" aria-hidden="true"><span>{item.ref}</span><i/><i/><i/><i/><i/><i/></div>
      </div>

      {item.stats && <section className="detail-stats" aria-labelledby={`${slug}-stats-title`}>
        <h2 id={`${slug}-stats-title`} className="detail-stats-title">{item.statsTitle || 'Key Results'}</h2>
        {item.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
      </section>}

      <div className="detail-body">
        {item.projectSections ? <div className="project-sections" aria-label="Personal project details">
          {item.projectSections.map((project) => <section className="project-section" key={project.title}>
            <p className="detail-label">{project.eyebrow}</p><h2>{project.title}</h2><p className="project-summary">{project.summary}</p>
            <ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          </section>)}
        </div> : <section className="detail-findings" aria-labelledby="details-heading">
          <p className="detail-label">SIGNAL PATH / 01</p><h2 id="details-heading">What I worked on</h2>
          <ol>{item.bullets.map((bullet, bulletIndex) => <li key={bullet}><span>{String(bulletIndex + 1).padStart(2,'0')}</span><p>{bullet}</p></li>)}</ol>
        </section>}
        <aside className="detail-sidebar">
          {item.context && <section className="context-card"><p className="detail-label">BOARD CONTEXT</p><h2>The larger system</h2><p>{item.context}</p>{item.sourceLinks && <div className="source-links">{item.sourceLinks.map((source)=><a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</div>}</section>}
          {slug !== 'the-hive' && <ToolsCard skills={item.skills}/>}
        </aside>
      </div>

      {item.image && !['spacex','about-me','the-hive'].includes(slug) && <section className={`detail-media detail-media-${slug}`} aria-label={`${item.shortTitle} image`}>
        <div className="detail-media-copy"><p className="detail-label">FIELD VIEW / 02</p><h2>{item.mediaTitle || 'In context.'}</h2><p>{item.mediaText || 'A closer look at the people, hardware, and places behind this part of the schematic.'}</p></div>
        <figure><AssetImage src={item.image} alt={item.imageAlt || ''}/><figcaption>{item.imageCaption}</figcaption></figure>
      </section>}

      {slug === 'spacex' && <section className="detail-media detail-media-spacex" aria-labelledby="spacex-media-title">
        <div className="detail-media-copy"><p className="detail-label">STARLINK HARDWARE / 02</p><h2 id="spacex-media-title">V3 at production scale.</h2><p>My work supported the V3 generation. The V2 Mini stack shown here is its direct predecessor; the winter facility photo grounds that work in Starlink’s Redmond production environment.</p></div>
        <figure className="media-wide"><AssetImage src="starlink-exterior.webp" alt="Starlink production facility in Redmond, Washington during winter"/><figcaption>STARLINK PRODUCTION / REDMOND, WASHINGTON</figcaption></figure>
        <figure className="media-portrait"><AssetImage src="starlink-v2.jpg" alt="A stack of Starlink V2 Mini satellites inside a Falcon 9 payload fairing"/><figcaption>V2 MINI STACK / PREDECESSOR TO V3 / PHOTO: SPACEX</figcaption></figure>
      </section>}

      {slug === 'beta-technologies' && <section className="hardware-gallery" aria-labelledby="gallery-title">
        <div className="hardware-gallery-copy"><p className="detail-label">FABRICATED HARDWARE / 03</p><h2 id="gallery-title">From layout to bench.</h2></div>
        <div className="hardware-gallery-grid">
          <figure><AssetImage src="angle-of-attack-side-a.webp" alt="Top view of the Angle of Attack sensor PCB"/><figcaption>ANGLE OF ATTACK SENSOR PCB / TOP VIEW</figcaption></figure>
          <figure><AssetImage src="angle-of-attack-side-b.webp" alt="Opposite side of the Angle of Attack sensor PCB"/><figcaption>ANGLE OF ATTACK SENSOR PCB / SIDE B</figcaption></figure>
          <figure><AssetImage src="interface-board.webp" alt="Avionics interface board with multiple test connectors"/><figcaption>AVIONICS INTERFACE BOARD</figcaption></figure>
        </div>
      </section>}

      {slug === 'about-me' && <section className="about-gallery" aria-labelledby="about-gallery-title">
        <div className="about-gallery-copy"><p className="detail-label">OFF THE BENCH / 02</p><h2 id="about-gallery-title">Seattle roots. Always exploring.</h2><p>Whether it is a backpacking trip, a late-night game of chess, or a new circuit on the bench, I like learning by getting immersed in the thing itself.</p></div>
        <div className="about-gallery-stack">
          <figure><AssetImage src="seattle.webp" alt="Downtown Seattle at night during a public celebration"/><figcaption>SEATTLE, WASHINGTON / HOME</figcaption></figure>
          <figure><AssetImage src="montana-camp.webp" alt="Friends gathered around a campfire during a backpacking trip"/><figcaption>BACKPACKING / MONTANA</figcaption></figure>
          <figure><AssetImage src="friends.webp" alt="Brandon with friends at Georgia Tech"/><figcaption>GEORGIA TECH / COMMUNITY</figcaption></figure>
        </div>
        <figure className="about-portrait"><AssetImage src="brandon-portrait.webp" alt="Brandon Luo outdoors beside a rocky coastline"/><figcaption>BRANDON / OFF THE BENCH</figcaption></figure>
      </section>}

      {slug === 'the-hive' && <section className="hive-tools-row" aria-label="The Hive workspace and tools">
        <figure><AssetImage src="hive-benchtops.jpg" alt="Students working at electronics benchtops inside The Hive at Georgia Tech"/><figcaption>THE HIVE ELECTRONICS BENCHTOPS / PHOTO: GEORGIA TECH</figcaption></figure>
        <ToolsCard skills={item.skills}/>
      </section>}

      <nav className="detail-pagination" aria-label="Portfolio pages"><a href={`/work/${previous.slug}/`}><small>PREVIOUS NODE</small><span>← {previous.shortTitle}</span></a><a href={`/work/${next.slug}/`}><small>NEXT NODE</small><span>{next.shortTitle} →</span></a></nav>
    </article>
    <footer className="detail-footer"><span>BRANDON LUO / ELECTRICAL AND COMPUTER ENGINEERING</span><a href="/Brandon-Luo-Resume.pdf" target="_blank">RESUME ↗</a></footer>
  </main>;
}
