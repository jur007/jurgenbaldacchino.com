import type { ReactNode } from 'react';

type PageLayoutProps = {
  children: ReactNode;
};

function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="page-layout">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Jurgen Baldacchino — home">
          <span className="brand-mark" aria-hidden="true">
            JB
          </span>
          <span className="brand-copy">
            Jurgen Baldacchino
            <small>Frontend engineering · Leadership</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#expertise">Expertise</a>
          <a href="#approach">Approach</a>
          <a className="nav-cta" href="#contact">
            Let&apos;s talk
          </a>
        </nav>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer" id="contact">
        <div>
          <span className="eyebrow">Start a conversation</span>
          <h2>Building something ambitious?</h2>
        </div>
        <a className="text-link" href="mailto:hello@jurgenbaldacchino.com">
          hello@jurgenbaldacchino.com <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </div>
  );
}

export default PageLayout;
