import Button from '@components/button';
import Container from '@components/container';
import Section from '@components/section';
import styles from './design-system-page.module.css';

function DesignSystemPage() {
  return (
    <main className={styles.page}>
      <Container>
        <header className={styles.hero}>
          <p className={styles.kicker}>Premium foundation</p>
          <h1>Luxury software consultancy, expressed through restraint.</h1>
          <p className={styles.intro}>
            A black canvas, white typography, and champagne gold accents establish the beginning of
            a refined digital presence.
          </p>
          <div className={styles.actions}>
            <Button>Arrange a consultation</Button>
            <Button as="a" href="#principles" variant="secondary">
              Review principles
            </Button>
          </div>
        </header>
      </Container>

      <Section title="Colour palette" intro="The tone is disciplined, dark, and quietly rich.">
        <div className={styles.swatches}>
          {[
            ['Background', 'var(--color-bg)'],
            ['Surface', 'var(--color-surface)'],
            ['Accent', 'var(--color-accent)'],
            ['Text', 'var(--color-text)'],
          ].map(([name, value]) => (
            <div key={name} className={styles.swatch}>
              <div className={styles.swatchBlock} style={{ ['--swatch-color' as string]: value }} />
              <div>
                <strong>{name}</strong>
                <p>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Typography hierarchy"
        intro="Elegant rhythm and generous spacing frame the message."
      >
        <div className={styles.typographyCard}>
          <h3>Editorial headline</h3>
          <p className={styles.label}>Display / Serif</p>
          <p className={styles.lead}>
            Quiet confidence in every line, built for modern software partners and thoughtful
            clients.
          </p>
          <p>
            Subtext is rendered in a clean sans-serif voice to keep the reading experience crisp and
            intentional.
          </p>
        </div>
      </Section>

      <Section title="Buttons and links" intro="Actions stay deliberate, minimal, and accessible.">
        <div className={styles.inlineStack}>
          <Button>Primary action</Button>
          <Button variant="secondary">Secondary action</Button>
          <a href="#craft">View our approach</a>
        </div>
      </Section>

      <Section
        title="Surface and border language"
        intro="Material depth comes from contrast, not ornament."
      >
        <div className={styles.cardGrid}>
          <article className={styles.card}>
            <h3>Surface</h3>
            <p>Layered panels define structure without distracting from the content.</p>
          </article>
          <article className={styles.cardAlt}>
            <h3>Edge</h3>
            <p>Fine gold borders give a precise finish without excess visual noise.</p>
          </article>
        </div>
      </Section>

      <Section
        title="Spacing rhythm"
        intro="A measured grid makes the composition feel authoritative."
      >
        <div className={styles.spacingRow}>
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className={styles.spacingBox}>
              <span>Space {step}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Premium content block"
        intro="The final expression remains calm and confident."
      >
        <article className={styles.featureBlock} id="principles">
          <div>
            <p className={styles.kicker}>Crafted systems</p>
            <h3>Every interface decision is considered for clarity, longevity, and trust.</h3>
          </div>
          <p>
            This foundation is designed to support a consultancy website that feels precise, modern,
            and quietly luxurious.
          </p>
        </article>
      </Section>
    </main>
  );
}

export default DesignSystemPage;
