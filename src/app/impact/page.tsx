export default function Impact() {
  return (
    <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem' }}>
      <h1 className="section-title">Our Impact</h1>
      <p className="section-subtitle">Think-Tank Resource Library & Latest Updates</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>Research & White Papers</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>The Future of Civil Intelligence in Nigeria</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Published: Q1 2026</p>
              <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Download PDF</button>
            </li>
            <li style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Agribusiness Resiliency Report</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Published: Q4 2025</p>
              <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>Download PDF</button>
            </li>
          </ul>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>Recent News</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Launch of SecuraNG Beta</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>AnyanwuConnect successfully rolls out the first phase of the SecuraNG platform in key pilot states.</p>
            </li>
            <li style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Launching Leaders Cohort 3</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Welcoming 500 new young professionals into our intensive mentorship ecosystem.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
