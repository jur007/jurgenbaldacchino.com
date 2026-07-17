import '@/styles/app.css';

const expertise = [
  {
    index: '01',
    title: 'Frontend architecture',
    copy: 'Scalable foundations, thoughtful boundaries, and systems that stay understandable as teams and products grow.',
    tags: ['React', 'TypeScript', 'Design systems'],
  },
  {
    index: '02',
    title: 'Engineering leadership',
    copy: 'Clear technical direction, healthy delivery practices, and an environment where engineers can do their best work.',
    tags: ['Strategy', 'Mentoring', 'Delivery'],
  },
  {
    index: '03',
    title: 'Product experience',
    copy: 'Accessible, high-quality interfaces shaped through close collaboration with product and design partners.',
    tags: ['UX craft', 'Accessibility', 'Performance'],
  },
];

function HomeSection() {
  return (
    <div id="top">
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true"></div>
        <div className="hero-copy">
          <div className="availability">
            <span aria-hidden="true"></span>
            Open to the right opportunity
          </div>
          <p className="eyebrow">Senior Frontend Developer · Head of Frontend</p>
          <h1 id="hero-title">
            I build frontend teams and products that <em>endure.</em>
          </h1>
          <p className="hero-intro">
            Twelve years turning complex product challenges into clear, scalable experiences—and
            helping the engineers behind them grow.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#expertise">
              Explore my expertise <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-secondary" href="#contact">
              Start a conversation
            </a>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Experience overview">
          <div className="hero-monogram" aria-hidden="true">
            <span>JB</span>
          </div>
          <div className="panel-status">
            <span>Current focus</span>
            <strong>Frontend at scale</strong>
          </div>
          <dl className="metrics">
            <div>
              <dt>Experience</dt>
              <dd>
                12<small>+ years</small>
              </dd>
            </div>
            <div>
              <dt>Perspective</dt>
              <dd>
                IC<small>+ leader</small>
              </dd>
            </div>
          </dl>
          <div className="signal" aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </aside>
      </section>

      <section className="proof-strip" aria-label="Professional qualities">
        <p>Strategy with technical depth</p>
        <span aria-hidden="true">◆</span>
        <p>Systems built for people</p>
        <span aria-hidden="true">◆</span>
        <p>Quality without theatre</p>
      </section>

      <section className="expertise-section" id="expertise" aria-labelledby="expertise-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">What I bring</p>
            <h2 id="expertise-title">From interface detail to organisational direction.</h2>
          </div>
          <p>
            I work across the full frontend landscape: shaping the product, strengthening the
            platform, and creating the conditions for teams to deliver with confidence.
          </p>
        </div>

        <div className="expertise-grid">
          {expertise.map((item) => (
            <article className="expertise-card" key={item.index}>
              <span className="card-index">{item.index}</span>
              <div className="card-icon" aria-hidden="true">
                <span></span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <ul aria-label={`${item.title} skills`}>
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="approach-section" id="approach" aria-labelledby="approach-title">
        <div className="approach-visual" aria-hidden="true">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>
          <div className="core">12</div>
          <span>years of perspective</span>
        </div>
        <div className="approach-copy">
          <p className="eyebrow">How I lead</p>
          <h2 id="approach-title">Clarity creates momentum.</h2>
          <p>
            The best frontend organisations combine high standards with low ego. I make the
            important decisions visible, turn ambiguity into a workable path, and keep quality
            connected to real customer outcomes.
          </p>
          <div className="principles">
            <div>
              <span>01</span>
              <strong>Make the system legible</strong>
            </div>
            <div>
              <span>02</span>
              <strong>Give ownership with context</strong>
            </div>
            <div>
              <span>03</span>
              <strong>Measure what users feel</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeSection;
