"use client";

import Link from 'next/link';
import styles from './page.module.css';
import HeroCarousel from '@/components/ui/HeroCarousel';
import ScrollFadeIn from '@/components/ui/ScrollFadeIn';
import { useEffect, useState } from 'react';
import { getSiteContent, saveSiteContent, defaultContent, type SiteContent } from '@/lib/siteContent';
import { apiGetContent, isBackendConfigured } from '@/lib/api';

export default function Home() {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    async function loadContent() {
      // Always try the backend first so admin edits show for all visitors
      if (isBackendConfigured()) {
        try {
          const remote = await apiGetContent();
          if (remote && Object.keys(remote).length > 0) {
            const merged = remote as unknown as SiteContent;
            setContent(merged);
            saveSiteContent(merged); // keep localStorage in sync as cache
            return;
          }
        } catch {
          // fall through to localStorage
        }
      }
      setContent(getSiteContent());
    }
    loadContent();
  }, []);

  const c = content;

  return (
    <>
      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        <HeroCarousel />
        <div className={styles.heroOverlay} />

        <div className={styles.heroDecor} aria-hidden="true">
          <div className={`${styles.heroCircle} ${styles.heroCircle3}`} />
          <div className={`${styles.heroCircle} ${styles.heroCircle1}`} />
          <div className={`${styles.heroCircle} ${styles.heroCircle2}`} />
          <div className={`${styles.heroCircle} ${styles.heroCircleDot}`} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <div className="animate-fade-in">
            <span className={styles.heroBadge}>{c.hero.badge}</span>
            <h1 className={styles.heroTitle}>
              {c.hero.titleLine1}<br />
              {c.hero.titleLine2}<br />
              {c.hero.titleLine3}<span className="accent-gold">{c.hero.titleAccent}</span>
            </h1>
            <p className={styles.heroSubtitle}>{c.hero.subtitle}</p>
            <div className={styles.heroActions}>
              <Link href="/about" className="btn btn-primary">{c.hero.ctaPrimary}</Link>
              <Link href="/impact" className="btn btn-outline">{c.hero.ctaSecondary}</Link>
            </div>
          </div>
        </div>

        <div className={styles.heroScroll} aria-hidden="true">
          <span className={styles.heroScrollLabel}>Scroll</span>
          <span className={styles.heroScrollLine} />
        </div>
      </section>

      {/* ── About Overview ── */}
      <section className="section" style={{ backgroundColor: 'var(--surface-muted)' }}>
        <span className="section-watermark" aria-hidden="true">{c.overviewSection.watermark}</span>
        <div className="container">
          <div className={styles.overviewGrid}>
            <ScrollFadeIn delay={0.1}>
              <div>
                <div className={styles.sectionHeader} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                  <span className={styles.sectionLabel}>{c.overviewSection.label}</span>
                </div>
                <h2 className="section-title">
                  {c.overviewSection.heading}<br /><span className="accent">{c.overviewSection.headingAccent}</span>
                </h2>
                <p className="section-subtitle" style={{ marginBottom: '1.25rem', color: 'var(--primary-navy)', fontWeight: 600 }}>
                  {c.overviewSection.body1}
                </p>
                <p className="section-subtitle">{c.overviewSection.body2}</p>
                <Link href="/about" className="btn btn-secondary">{c.overviewSection.cta}</Link>
              </div>
            </ScrollFadeIn>

            <div className={styles.overviewStats}>
              {c.overviewSection.stats.map((s, i) => (
                <ScrollFadeIn key={i} delay={0.2 + i * 0.1}>
                  <div className={styles.statBox}>
                    <h3 className={styles.statNumber}>{s.number}</h3>
                    <p className={styles.statLabel}>{s.label}</p>
                    <span className="stat-underline" />
                  </div>
                </ScrollFadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Strategic Pillars ── */}
      <section className="section">
        <span className="section-watermark" aria-hidden="true">{c.pillarsSection.watermark}</span>
        <div className="container">
          <ScrollFadeIn delay={0.1}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>{c.pillarsSection.label}</span>
              <h2 className="section-title">{c.pillarsSection.heading}</h2>
              <p className="section-subtitle" style={{ margin: '0 auto 4rem auto' }}>{c.pillarsSection.subtitle}</p>
            </div>
          </ScrollFadeIn>

          <div className={styles.pillarsGrid}>
            {c.pillarsSection.pillars.map((pillar, i) => (
              <ScrollFadeIn key={i} delay={0.2 + i * 0.1}>
                <div className={styles.pillarCard}>
                  <div className={styles.pillarImageWrap}>
                    <img src={pillar.image} alt={pillar.title} />
                    <span className={styles.pillarNum} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className={styles.pillarBody}>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                    <Link href={pillar.href} className={styles.pillarLink}>Explore Pillar →</Link>
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Strategic Partners ── */}
      <section className="section" style={{ backgroundColor: 'var(--surface-muted)' }}>
        <span className="section-watermark" aria-hidden="true">{c.partnersSection.watermark}</span>
        <div className="container">
          <ScrollFadeIn delay={0.1}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>{c.partnersSection.label}</span>
              <h2 className="section-title">{c.partnersSection.heading}</h2>
              <p className="section-subtitle" style={{ margin: '0 auto 4rem auto' }}>{c.partnersSection.subtitle}</p>
            </div>
          </ScrollFadeIn>

          <div className={styles.partnersGrid} style={{ maxWidth: '900px', margin: '0 auto' }}>
            {c.partnersSection.partners.map((p, i) => (
              <ScrollFadeIn key={i} delay={0.2 + i * 0.1}>
                <div className={styles.partnerCard}>
                  <img src={p.logo} alt={`${p.name} Logo`} className={styles.partnerLogoImg} style={{ borderRadius: '0', objectFit: 'contain' }} />
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CSCI Powered Projects ── */}
      <section className="section">
        <span className="section-watermark" aria-hidden="true">{c.projectsSection.watermark}</span>
        <div className="container">
          <ScrollFadeIn delay={0.1}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>{c.projectsSection.label}</span>
              <h2 className="section-title">{c.projectsSection.heading}<span className="accent">{c.projectsSection.headingAccent}</span></h2>
              <p className="section-subtitle" style={{ margin: '0 auto 4rem auto' }}>{c.projectsSection.subtitle}</p>
            </div>
          </ScrollFadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {c.projectsSection.projects.map((project, idx) => (
              <ScrollFadeIn key={idx} delay={0.05 * idx}>
                <div className={styles.projectCard}>
                  <span className={styles.projectNum}>{String(idx + 1).padStart(2, '0')}</span>
                  <img
                    src={project.domain ? `https://logo.clearbit.com/${project.domain}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name)}&background=0B192C&color=10B981&rounded=true&bold=true&size=128`}
                    alt={`${project.name} Logo`}
                    style={{ width: '52px', height: '52px', objectFit: 'contain', marginBottom: '1rem', borderRadius: project.domain ? '0' : '50%' }}
                  />
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--primary-navy)', fontWeight: 700, fontFamily: 'var(--font-outfit), sans-serif' }}>{project.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{project.description}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className={`section ${styles.testimonialsSection}`}>
        <div className="container">
          <ScrollFadeIn delay={0.1}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel} style={{ color: 'var(--accent-emerald-light)' }}>{c.testimonialsSection.label}</span>
              <h2 className="section-title" style={{ color: '#fff' }}>{c.testimonialsSection.heading}</h2>
              <p className="section-subtitle" style={{ margin: '0 auto 4rem auto', color: '#94a3b8' }}>{c.testimonialsSection.subtitle}</p>
            </div>
          </ScrollFadeIn>

          <div className={styles.testimonialsGrid}>
            {c.testimonialsSection.testimonials.map((t, idx) => (
              <ScrollFadeIn key={idx} delay={0.1 * (idx % 3)}>
                <div className={styles.testimonialCard}>
                  <span className={styles.testimonialQuoteMark} aria-hidden="true">&ldquo;</span>
                  <div className={styles.testimonialStars}>{'★'.repeat(5)}</div>
                  <p className={styles.testimonialQuote}>{t.quote}</p>
                  <div className={styles.testimonialAuthor}>
                    <img src={t.avatar} alt={t.name} className={styles.testimonialAvatar} />
                    <div>
                      <h4 className={styles.testimonialName}>{t.name}</h4>
                      <p className={styles.testimonialRole}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <ScrollFadeIn delay={0.1}>
            <div className={styles.ctaBox}>
              <div className={styles.ctaInner}>
                <span className={styles.sectionLabel} style={{ justifyContent: 'center', color: 'var(--accent-gold-light)', marginBottom: '1.5rem', display: 'flex' }}>{c.ctaSection.label}</span>
                <h2>
                  {c.ctaSection.heading.split('\n').map((line, i) => (
                    <span key={i}>{line}{i === 0 ? <br /> : null}</span>
                  ))}
                </h2>
                <p>{c.ctaSection.subtitle}</p>
                <Link href="/contact" className="btn btn-primary">{c.ctaSection.cta}</Link>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </>
  );
}
