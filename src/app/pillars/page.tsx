export default function Pillars() {
  return (
    <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem' }}>
      <h1 className="section-title">Our Pillars</h1>
      <p className="section-subtitle">The 2026–2029 Strategy Framework</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div id="security" className="card">
          <h2 style={{ marginBottom: '1rem', color: 'var(--primary-navy)' }}>Security & Intelligence</h2>
          <p style={{ lineHeight: '1.6' }}>
            <strong>SecuraNG:</strong> Our flagship platform for civil intelligence and community safety. We leverage advanced data analytics and community reporting to mitigate risks and foster a secure environment for national development.
          </p>
        </div>

        <div id="leadership" className="card">
          <h2 style={{ marginBottom: '1rem', color: 'var(--primary-navy)' }}>Leadership Development</h2>
          <p style={{ lineHeight: '1.6' }}>
            <strong>Launching Leaders Initiative:</strong> Mentoring the next generation of ethical, visionary Nigerian leaders. We provide comprehensive training, networking, and mentorship to young professionals, preparing them to take on critical roles in public and private sectors.
          </p>
        </div>

        <div id="economic" className="card">
          <h2 style={{ marginBottom: '1rem', color: 'var(--primary-navy)' }}>Economic Empowerment</h2>
          <p style={{ lineHeight: '1.6' }}>
            <strong>Agribusiness & Digital Support:</strong> Revolutionizing agribusiness practices to ensure food security. Concurrently, we provide high-impact digital branding and technology support for local SMEs, integrating them into the global economy.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '5rem' }}>
        <h2 className="section-title" style={{ fontSize: '2rem' }}>Projects Powered by CSCI AFRICA</h2>
        <p className="section-subtitle">
          AnyanwuConnect is powering multiple transformative initiatives across the continent in partnership with CSCI AFRICA. We celebrate over 50 recorded live testimonies from CSCI AFRICA alumni!
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary-navy)' }}>1. Launching Leaders Worldwide</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              All CSCI members are Alumni of this community in Africa. A completely free 12-week intensive course. <br/>
              <a href="https://llworldwide.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-emerald)', fontWeight: '600' }}>Visit llworldwide.org (USA)</a>
            </p>
          </div>
          
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary-navy)' }}>2. Interweave Solutions</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Promoting the Self-Reliance & Cooperative Model to build sustainable local economies. (USA)
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary-navy)' }}>3. Leading Through Institute (LTI)</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Serving as the Official Leadership Mentor of the company to foster ethical leadership. (USA)
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary-navy)' }}>4. Studyflares</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              An AI-powered machine learning platform creating Study Guide Concepts, flashcards, quizzes, and game fictions for schools. <br/>
              <a href="https://www.studyflares.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-emerald)', fontWeight: '600' }}>Visit studyflares.com</a>
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary-navy)' }}>5. FS Initiative</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Farmers Support group dedicated to the promotion of organic seeds across Africa and Asia. (UK)
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary-navy)' }}>6. Umunnabuike Initiative</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Located in Alaigbo, advocating for Igbo Pan AFRICA and regional solidarity.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary-navy)' }}>7. SecuraNG</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Our definitive solution to address and correct the security impasse across Africa.
            </p>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary-navy)' }}>8. RADIUS</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              A powerful content platform for African development, advertised seamlessly within our ecosystem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
