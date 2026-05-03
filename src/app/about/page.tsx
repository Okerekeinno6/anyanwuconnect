"use client";

import Link from "next/link";
import ScrollFadeIn from "@/components/ui/ScrollFadeIn";
import { getSiteContent } from "@/lib/siteContent";
import { useEffect, useState } from "react";
import { defaultContent, type SiteContent } from "@/lib/siteContent";
import styles from "./about.module.css";

export default function About() {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    setContent(getSiteContent());
  }, []);

  const a = content.about;

  return (
    <>
      {/* ── About Hero ── */}
      <section className={styles.aboutHero}>
        <div className={styles.aboutHeroBg} aria-hidden="true">
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroGrid} />
        </div>

        <div className={`container ${styles.aboutHeroContent}`}>
          <ScrollFadeIn delay={0.1}>
            <span className={styles.heroBadge}>{a.hero.badge}</span>
            <h1 className={styles.aboutHeroTitle}>
              {a.hero.title.split("\n").map((line, i) =>
                i === 0 ? (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ) : (
                  <span key={i} className={styles.titleAccent}>
                    {line}
                  </span>
                )
              )}
            </h1>
            <p className={styles.aboutHeroSubtitle}>{a.hero.subtitle}</p>

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>8+</span>
                <span className={styles.heroStatLabel}>Live Projects</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>50+</span>
                <span className={styles.heroStatLabel}>CSCI Alumni</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>6+</span>
                <span className={styles.heroStatLabel}>African Nations</span>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>2018</span>
                <span className={styles.heroStatLabel}>Est. Nigeria</span>
              </div>
            </div>
          </ScrollFadeIn>
        </div>

        <div className={styles.heroScroll} aria-hidden="true">
          <span className={styles.heroScrollLine} />
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className={`section ${styles.whoSection}`}>
        <span className="section-watermark" aria-hidden="true">
          WHO WE ARE
        </span>
        <div className="container">
          <div className={styles.whoGrid}>
            <ScrollFadeIn delay={0.1}>
              <div className={styles.whoText}>
                <span className={styles.sectionLabel}>{a.whoWeAre.label}</span>
                <h2 className={`section-title ${styles.whoHeading}`}>
                  {a.whoWeAre.heading}
                  <span className="accent">{a.whoWeAre.headingAccent}</span>
                </h2>
                <p className={styles.whoBody}>{a.whoWeAre.body1}</p>
                <p className={styles.whoBody}>{a.whoWeAre.body2}</p>
                <p className={styles.whoBody}>{a.whoWeAre.body3}</p>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.2}>
              <div className={styles.whoVisual}>
                <div className={styles.whoCard}>
                  <span className={styles.whoCardIcon}>🏗️</span>
                  <h3>Development Architect</h3>
                  <p>
                    We design and deploy end-to-end systems — not just campaigns
                    — that create lasting, self-sustaining transformation.
                  </p>
                </div>
                <div className={styles.whoCard}>
                  <span className={styles.whoCardIcon}>🧠</span>
                  <h3>Executive Think-Tank</h3>
                  <p>
                    Home to Africa's sharpest community intelligence minds,
                    combining data, strategy, and human capital.
                  </p>
                </div>
                <div className={styles.whoCard}>
                  <span className={styles.whoCardIcon}>🌍</span>
                  <h3>Continental Platform</h3>
                  <p>
                    Based in Nigeria, built for Africa — our programmes reach
                    communities from Lagos to Nairobi.
                  </p>
                </div>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section
        className={`section ${styles.mvSection}`}
        style={{ backgroundColor: "var(--surface-muted)" }}
      >
        <span className="section-watermark" aria-hidden="true">
          PURPOSE
        </span>
        <div className="container">
          <div className={styles.mvGrid}>
            <ScrollFadeIn delay={0.1}>
              <div className={styles.mvCard}>
                <div className={styles.mvCardIcon}>🎯</div>
                <span className={styles.mvLabel}>
                  {a.missionVision.missionLabel}
                </span>
                <h3 className={styles.mvHeading}>
                  {a.missionVision.missionHeading}
                </h3>
                <p className={styles.mvBody}>{a.missionVision.missionBody}</p>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.2}>
              <div className={`${styles.mvCard} ${styles.mvCardAccent}`}>
                <div className={styles.mvCardIcon}>🔭</div>
                <span className={styles.mvLabel}>
                  {a.missionVision.visionLabel}
                </span>
                <h3 className={styles.mvHeading}>
                  {a.missionVision.visionHeading}
                </h3>
                <p className={styles.mvBody}>{a.missionVision.visionBody}</p>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={0.3}>
              <div className={`${styles.mvCard} ${styles.mvCardMotto}`}>
                <div className={styles.mvCardIcon}>✨</div>
                <span className={styles.mvLabel}>Our Motto</span>
                <blockquote className={styles.mottoQuote}>
                  {a.missionVision.motto}
                </blockquote>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="section">
        <span className="section-watermark" aria-hidden="true">
          VALUES
        </span>
        <div className="container">
          <ScrollFadeIn delay={0.1}>
            <div className={styles.sectionCentered}>
              <span className={styles.sectionLabel}>
                {a.coreValues.label}
              </span>
              <h2 className="section-title">{a.coreValues.heading}</h2>
              <p className="section-subtitle" style={{ margin: "0 auto 4rem" }}>
                {a.coreValues.subtitle}
              </p>
            </div>
          </ScrollFadeIn>

          <div className={styles.valuesGrid}>
            {a.coreValues.values.map((val, i) => (
              <ScrollFadeIn key={i} delay={0.05 * i}>
                <div className={styles.valueCard}>
                  <span className={styles.valueIcon}>{val.icon}</span>
                  <h3 className={styles.valueTitle}>{val.title}</h3>
                  <p className={styles.valueDesc}>{val.description}</p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section
        className={`section ${styles.timelineSection}`}
        style={{ backgroundColor: "var(--surface-muted)" }}
      >
        <span className="section-watermark" aria-hidden="true">
          HISTORY
        </span>
        <div className="container">
          <ScrollFadeIn delay={0.1}>
            <div className={styles.sectionCentered}>
              <span className={styles.sectionLabel}>
                {a.timeline.label}
              </span>
              <h2 className="section-title">{a.timeline.heading}</h2>
              <p className="section-subtitle" style={{ margin: "0 auto 4rem" }}>
                {a.timeline.subtitle}
              </p>
            </div>
          </ScrollFadeIn>

          <div className={styles.timeline}>
            {a.timeline.events.map((event, i) => (
              <ScrollFadeIn key={i} delay={0.07 * i}>
                <div
                  className={`${styles.timelineItem} ${
                    i % 2 === 0 ? styles.timelineLeft : styles.timelineRight
                  }`}
                >
                  <div className={styles.timelineContent}>
                    <span className={styles.timelineYear}>{event.year}</span>
                    <h3 className={styles.timelineTitle}>{event.title}</h3>
                    <p className={styles.timelineDesc}>{event.description}</p>
                  </div>
                  <div className={styles.timelineDot} />
                </div>
              </ScrollFadeIn>
            ))}
            <div className={styles.timelineLine} />
          </div>
        </div>
      </section>

      {/* ── Leadership Team ── */}
      <section className="section">
        <span className="section-watermark" aria-hidden="true">
          TEAM
        </span>
        <div className="container">
          <ScrollFadeIn delay={0.1}>
            <div className={styles.sectionCentered}>
              <span className={styles.sectionLabel}>
                {a.leadership.label}
              </span>
              <h2 className="section-title">{a.leadership.heading}</h2>
              <p className="section-subtitle" style={{ margin: "0 auto 4rem" }}>
                {a.leadership.subtitle}
              </p>
            </div>
          </ScrollFadeIn>

          <div className={styles.teamGrid}>
            {a.leadership.team.map((member, i) => (
              <ScrollFadeIn key={i} delay={0.1 * i}>
                <div className={styles.teamCard}>
                  <div className={styles.teamAvatarWrap}>
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className={styles.teamAvatar}
                    />
                    <div className={styles.teamAvatarRing} />
                  </div>
                  <div className={styles.teamInfo}>
                    <h3 className={styles.teamName}>{member.name}</h3>
                    <span className={styles.teamRole}>{member.role}</span>
                    <p className={styles.teamBio}>{member.bio}</p>
                  </div>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── About CTA ── */}
      <section className={styles.aboutCtaSection}>
        <div className="container">
          <ScrollFadeIn delay={0.1}>
            <div className={styles.aboutCtaBox}>
              <div className={styles.aboutCtaInner}>
                <span className={styles.ctaLabel}>{a.aboutCta.label}</span>
                <h2 className={styles.ctaHeading}>{a.aboutCta.heading}</h2>
                <p className={styles.ctaSubtitle}>{a.aboutCta.subtitle}</p>
                <Link href="/contact" className="btn btn-primary">
                  {a.aboutCta.cta}
                </Link>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </>
  );
}
