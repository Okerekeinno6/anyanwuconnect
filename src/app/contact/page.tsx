export default function Contact() {
  return (
    <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem' }}>
      <h1 className="section-title">Contact & Partner With Us</h1>
      <p className="section-subtitle">Reach out to AnyanwuConnect for partnerships, inquiries, or media requests.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-start' }}>
        <div className="card">
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
              <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--surface-border)', backgroundColor: 'var(--surface)', color: 'var(--foreground)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
              <input type="email" placeholder="john@example.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--surface-border)', backgroundColor: 'var(--surface)', color: 'var(--foreground)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subject</label>
              <select style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--surface-border)', backgroundColor: 'var(--surface)', color: 'var(--foreground)' }}>
                <option>Partnership Inquiry</option>
                <option>Media & Press</option>
                <option>General Support</option>
                <option>SecuraNG Access</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
              <textarea rows={5} placeholder="How can we collaborate?" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--surface-border)', backgroundColor: 'var(--surface)', color: 'var(--foreground)' }}></textarea>
            </div>
            <button type="button" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
          </form>
        </div>

        <div>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>Headquarters</h2>
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Abuja Office</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              AnyanwuConnect Development Hub<br />
              Federal Capital Territory,<br />
              Abuja, Nigeria
            </p>
          </div>

          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>Direct Contact</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>✉️</span>
              <div>
                <p style={{ fontWeight: '500' }}>Email</p>
                <a href="mailto:info@anyanwuconnect.com" style={{ color: 'var(--accent-emerald)' }}>info@anyanwuconnect.com</a>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>📞</span>
              <div>
                <p style={{ fontWeight: '500' }}>Phone</p>
                <p style={{ color: 'var(--text-muted)' }}>Available upon request</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
