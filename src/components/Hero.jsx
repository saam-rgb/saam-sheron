import AskMe from './AskMe';

export default function Hero() {
  return (
    <section className="hero">
      <div className="eyebrow">
        <span className="dot" />
        <span>Saam Sheron · Frontend Engineer · HealthTech (RIS/PACS)</span>
        <span className="sep">·</span>
        <span>Chennai, IN</span>
      </div>

      <h1 className="hero-headline">
        Don't read<br />
        a resume. <span className="it">Just</span>{' '}
        <span className="hl">ask me.</span>
      </h1>

      <p className="hero-sub">
        I'm a frontend engineer shipping{' '}
        <b>enterprise medical-imaging software</b> at Live Medica — RIS/PACS
        systems for clinical radiology workflows.{' '}
        <b>Open to Mid-Level, Senior Frontend, and Team Lead roles.</b> Skip the
        back-and-forth. Ask me anything below — you'll get a real answer in
        seconds.
      </p>

      <AskMe />
    </section>
  );
}
