import type { ReactNode } from 'react';
import Container from '@components/container';
import styles from './section.module.css';

type SectionProps = {
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
};

function Section({ title, intro, children, className }: SectionProps) {
  return (
    <section className={[styles.section, className].filter(Boolean).join(' ')}>
      <Container>
        <div className={styles.header}>
          <p className={styles.kicker}>Design system</p>
          <h2>{title}</h2>
          {intro ? <p className={styles.intro}>{intro}</p> : null}
        </div>
        <div className={styles.content}>{children}</div>
      </Container>
    </section>
  );
}

export default Section;
