"use client";
import { useRef } from "react";
import { type SiteContent } from "@/lib/siteContent";
import { apiUploadImage, isBackendConfigured } from "@/lib/api";
import styles from "./admin.module.css";

// ── Image upload field ─────────────────────────────────────────
export function ImageField({
  label, value, onChange,
}: {
  label: string; value: string; onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!isBackendConfigured()) {
      alert("Backend not configured. Please set NEXT_PUBLIC_API_URL.");
      return;
    }
    try {
      const url = await apiUploadImage(file);
      onChange(url);
    } catch (err: unknown) {
      alert("Upload failed: " + (err as Error).message);
    }
    // reset so same file can be re-selected
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.imageFieldRow}>
        {value && (
          <img src={value} alt="preview" className={styles.imagePreview} />
        )}
        <div className={styles.imageFieldInputs}>
          <input
            className={styles.fieldInput}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste URL or upload below"
          />
          <label className={styles.uploadBtn}>
            📁 Upload New Image
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

// ── Shared helpers ─────────────────────────────────────────────
export function Field({
  label, value, onChange, multiline = false, rows = 3,
}: {
  label: string; value: string; onChange: (v: string) => void;
  multiline?: boolean; rows?: number;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      {multiline ? (
        <textarea className={styles.fieldInput} value={value} rows={rows}
          onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={styles.fieldInput} value={value}
          onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className={styles.section}>
      <summary className={styles.sectionToggle}>{title}</summary>
      <div className={styles.sectionBody}>{children}</div>
    </details>
  );
}

export function ArrayCard({ header, children }: { header: string; children: React.ReactNode }) {
  return (
    <div className={styles.arrayCard}>
      <div className={styles.arrayCardHeader}>{header}</div>
      {children}
    </div>
  );
}

// ── Content Editor ─────────────────────────────────────────────
export default function ContentEditor({
  content, setContent, onSave,
}: {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  onSave: () => void;
}) {
  function set(updater: (d: SiteContent) => void) {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as SiteContent;
      updater(next);
      return next;
    });
  }

  return (
    <div className={styles.editor}>

      {/* ── HOMEPAGE ── */}
      <div className={styles.pageBlock}>
        <h2 className={styles.pageBlockTitle}>🏠 Homepage</h2>

        <Section title="Hero Section">
          <Field label="Badge" value={content.hero.badge} onChange={(v) => set((d) => { d.hero.badge = v; })} />
          <Field label="Title Line 1" value={content.hero.titleLine1} onChange={(v) => set((d) => { d.hero.titleLine1 = v; })} />
          <Field label="Title Line 2" value={content.hero.titleLine2} onChange={(v) => set((d) => { d.hero.titleLine2 = v; })} />
          <Field label="Title Line 3" value={content.hero.titleLine3} onChange={(v) => set((d) => { d.hero.titleLine3 = v; })} />
          <Field label="Title Accent Word" value={content.hero.titleAccent} onChange={(v) => set((d) => { d.hero.titleAccent = v; })} />
          <Field label="Subtitle" value={content.hero.subtitle} onChange={(v) => set((d) => { d.hero.subtitle = v; })} multiline rows={3} />
          <Field label="Primary CTA Button" value={content.hero.ctaPrimary} onChange={(v) => set((d) => { d.hero.ctaPrimary = v; })} />
          <Field label="Secondary CTA Button" value={content.hero.ctaSecondary} onChange={(v) => set((d) => { d.hero.ctaSecondary = v; })} />
        </Section>

        <Section title="Overview / Who We Are">
          <Field label="Watermark" value={content.overviewSection.watermark} onChange={(v) => set((d) => { d.overviewSection.watermark = v; })} />
          <Field label="Label" value={content.overviewSection.label} onChange={(v) => set((d) => { d.overviewSection.label = v; })} />
          <Field label="Heading" value={content.overviewSection.heading} onChange={(v) => set((d) => { d.overviewSection.heading = v; })} />
          <Field label="Heading Accent" value={content.overviewSection.headingAccent} onChange={(v) => set((d) => { d.overviewSection.headingAccent = v; })} />
          <Field label="Body 1" value={content.overviewSection.body1} onChange={(v) => set((d) => { d.overviewSection.body1 = v; })} multiline rows={3} />
          <Field label="Body 2" value={content.overviewSection.body2} onChange={(v) => set((d) => { d.overviewSection.body2 = v; })} multiline rows={3} />
          <Field label="CTA Button" value={content.overviewSection.cta} onChange={(v) => set((d) => { d.overviewSection.cta = v; })} />
          <p className={styles.arrayLabel}>Stats</p>
          {content.overviewSection.stats.map((s, i) => (
            <div key={i} className={styles.arrayRow}>
              <Field label="Number" value={s.number} onChange={(v) => set((d) => { d.overviewSection.stats[i].number = v; })} />
              <Field label="Label" value={s.label} onChange={(v) => set((d) => { d.overviewSection.stats[i].label = v; })} />
            </div>
          ))}
        </Section>

        <Section title="Pillars Section">
          <Field label="Watermark" value={content.pillarsSection.watermark} onChange={(v) => set((d) => { d.pillarsSection.watermark = v; })} />
          <Field label="Label" value={content.pillarsSection.label} onChange={(v) => set((d) => { d.pillarsSection.label = v; })} />
          <Field label="Heading" value={content.pillarsSection.heading} onChange={(v) => set((d) => { d.pillarsSection.heading = v; })} />
          <Field label="Subtitle" value={content.pillarsSection.subtitle} onChange={(v) => set((d) => { d.pillarsSection.subtitle = v; })} multiline rows={2} />
          {content.pillarsSection.pillars.map((p, i) => (
            <ArrayCard key={i} header={`Pillar ${i+1}: ${p.title}`}>
              <Field label="Title" value={p.title} onChange={(v) => set((d) => { d.pillarsSection.pillars[i].title = v; })} />
              <Field label="Description" value={p.description} onChange={(v) => set((d) => { d.pillarsSection.pillars[i].description = v; })} multiline rows={3} />
              <ImageField label="Image" value={p.image} onChange={(v) => set((d) => { d.pillarsSection.pillars[i].image = v; })} />
              <Field label="Link" value={p.href} onChange={(v) => set((d) => { d.pillarsSection.pillars[i].href = v; })} />
            </ArrayCard>
          ))}
        </Section>

        <Section title="Partners Section">
          <Field label="Watermark" value={content.partnersSection.watermark} onChange={(v) => set((d) => { d.partnersSection.watermark = v; })} />
          <Field label="Label" value={content.partnersSection.label} onChange={(v) => set((d) => { d.partnersSection.label = v; })} />
          <Field label="Heading" value={content.partnersSection.heading} onChange={(v) => set((d) => { d.partnersSection.heading = v; })} />
          <Field label="Subtitle" value={content.partnersSection.subtitle} onChange={(v) => set((d) => { d.partnersSection.subtitle = v; })} multiline rows={2} />
          {content.partnersSection.partners.map((p, i) => (
            <ArrayCard key={i} header={`Partner ${i+1}: ${p.name}`}>
              <Field label="Name" value={p.name} onChange={(v) => set((d) => { d.partnersSection.partners[i].name = v; })} />
              <Field label="Description" value={p.description} onChange={(v) => set((d) => { d.partnersSection.partners[i].description = v; })} multiline rows={2} />
              <ImageField label="Logo" value={p.logo} onChange={(v) => set((d) => { d.partnersSection.partners[i].logo = v; })} />
            </ArrayCard>
          ))}
        </Section>

        <Section title="CSCI Projects">
          <Field label="Watermark" value={content.projectsSection.watermark} onChange={(v) => set((d) => { d.projectsSection.watermark = v; })} />
          <Field label="Label" value={content.projectsSection.label} onChange={(v) => set((d) => { d.projectsSection.label = v; })} />
          <Field label="Heading" value={content.projectsSection.heading} onChange={(v) => set((d) => { d.projectsSection.heading = v; })} />
          <Field label="Heading Accent" value={content.projectsSection.headingAccent} onChange={(v) => set((d) => { d.projectsSection.headingAccent = v; })} />
          <Field label="Subtitle" value={content.projectsSection.subtitle} onChange={(v) => set((d) => { d.projectsSection.subtitle = v; })} multiline rows={2} />
          {content.projectsSection.projects.map((p, i) => (
            <ArrayCard key={i} header={`Project ${i+1}: ${p.name}`}>
              <Field label="Name" value={p.name} onChange={(v) => set((d) => { d.projectsSection.projects[i].name = v; })} />
              <Field label="Description" value={p.description} onChange={(v) => set((d) => { d.projectsSection.projects[i].description = v; })} multiline rows={2} />
              <Field label="Domain" value={p.domain} onChange={(v) => set((d) => { d.projectsSection.projects[i].domain = v; })} />
            </ArrayCard>
          ))}
        </Section>

        <Section title="Testimonials">
          <Field label="Label" value={content.testimonialsSection.label} onChange={(v) => set((d) => { d.testimonialsSection.label = v; })} />
          <Field label="Heading" value={content.testimonialsSection.heading} onChange={(v) => set((d) => { d.testimonialsSection.heading = v; })} />
          <Field label="Subtitle" value={content.testimonialsSection.subtitle} onChange={(v) => set((d) => { d.testimonialsSection.subtitle = v; })} multiline rows={2} />
          {content.testimonialsSection.testimonials.map((t, i) => (
            <ArrayCard key={i} header={`Testimonial ${i+1}: ${t.name}`}>
              <Field label="Name" value={t.name} onChange={(v) => set((d) => { d.testimonialsSection.testimonials[i].name = v; })} />
              <Field label="Role" value={t.role} onChange={(v) => set((d) => { d.testimonialsSection.testimonials[i].role = v; })} />
              <Field label="Quote" value={t.quote} onChange={(v) => set((d) => { d.testimonialsSection.testimonials[i].quote = v; })} multiline rows={4} />
              <ImageField label="Avatar" value={t.avatar} onChange={(v) => set((d) => { d.testimonialsSection.testimonials[i].avatar = v; })} />
            </ArrayCard>
          ))}
        </Section>

        <Section title="Call To Action">
          <Field label="Label" value={content.ctaSection.label} onChange={(v) => set((d) => { d.ctaSection.label = v; })} />
          <Field label="Heading" value={content.ctaSection.heading} onChange={(v) => set((d) => { d.ctaSection.heading = v; })} multiline rows={2} />
          <Field label="Subtitle" value={content.ctaSection.subtitle} onChange={(v) => set((d) => { d.ctaSection.subtitle = v; })} multiline rows={2} />
          <Field label="Button Text" value={content.ctaSection.cta} onChange={(v) => set((d) => { d.ctaSection.cta = v; })} />
        </Section>
      </div>

      {/* ── ABOUT PAGE ── */}
      <div className={styles.pageBlock}>
        <h2 className={styles.pageBlockTitle}>📖 About Page</h2>

        <Section title="About Hero">
          <Field label="Badge" value={content.about.hero.badge} onChange={(v) => set((d) => { d.about.hero.badge = v; })} />
          <Field label="Title (\\n = line break)" value={content.about.hero.title} onChange={(v) => set((d) => { d.about.hero.title = v; })} multiline rows={2} />
          <Field label="Subtitle" value={content.about.hero.subtitle} onChange={(v) => set((d) => { d.about.hero.subtitle = v; })} multiline rows={3} />
        </Section>

        <Section title="Who We Are">
          <Field label="Label" value={content.about.whoWeAre.label} onChange={(v) => set((d) => { d.about.whoWeAre.label = v; })} />
          <Field label="Heading" value={content.about.whoWeAre.heading} onChange={(v) => set((d) => { d.about.whoWeAre.heading = v; })} />
          <Field label="Heading Accent" value={content.about.whoWeAre.headingAccent} onChange={(v) => set((d) => { d.about.whoWeAre.headingAccent = v; })} />
          <Field label="Body 1" value={content.about.whoWeAre.body1} onChange={(v) => set((d) => { d.about.whoWeAre.body1 = v; })} multiline rows={3} />
          <Field label="Body 2" value={content.about.whoWeAre.body2} onChange={(v) => set((d) => { d.about.whoWeAre.body2 = v; })} multiline rows={3} />
          <Field label="Body 3" value={content.about.whoWeAre.body3} onChange={(v) => set((d) => { d.about.whoWeAre.body3 = v; })} multiline rows={3} />
        </Section>

        <Section title="Mission & Vision">
          <Field label="Mission Label" value={content.about.missionVision.missionLabel} onChange={(v) => set((d) => { d.about.missionVision.missionLabel = v; })} />
          <Field label="Mission Heading" value={content.about.missionVision.missionHeading} onChange={(v) => set((d) => { d.about.missionVision.missionHeading = v; })} />
          <Field label="Mission Body" value={content.about.missionVision.missionBody} onChange={(v) => set((d) => { d.about.missionVision.missionBody = v; })} multiline rows={3} />
          <Field label="Vision Label" value={content.about.missionVision.visionLabel} onChange={(v) => set((d) => { d.about.missionVision.visionLabel = v; })} />
          <Field label="Vision Heading" value={content.about.missionVision.visionHeading} onChange={(v) => set((d) => { d.about.missionVision.visionHeading = v; })} />
          <Field label="Vision Body" value={content.about.missionVision.visionBody} onChange={(v) => set((d) => { d.about.missionVision.visionBody = v; })} multiline rows={3} />
          <Field label="Motto" value={content.about.missionVision.motto} onChange={(v) => set((d) => { d.about.missionVision.motto = v; })} />
        </Section>

        <Section title="Core Values">
          <Field label="Label" value={content.about.coreValues.label} onChange={(v) => set((d) => { d.about.coreValues.label = v; })} />
          <Field label="Heading" value={content.about.coreValues.heading} onChange={(v) => set((d) => { d.about.coreValues.heading = v; })} />
          <Field label="Subtitle" value={content.about.coreValues.subtitle} onChange={(v) => set((d) => { d.about.coreValues.subtitle = v; })} multiline rows={2} />
          {content.about.coreValues.values.map((v2, i) => (
            <ArrayCard key={i} header={`Value ${i+1}: ${v2.title}`}>
              <Field label="Icon (emoji)" value={v2.icon} onChange={(v) => set((d) => { d.about.coreValues.values[i].icon = v; })} />
              <Field label="Title" value={v2.title} onChange={(v) => set((d) => { d.about.coreValues.values[i].title = v; })} />
              <Field label="Description" value={v2.description} onChange={(v) => set((d) => { d.about.coreValues.values[i].description = v; })} multiline rows={2} />
            </ArrayCard>
          ))}
        </Section>

        <Section title="Timeline / Milestones">
          <Field label="Label" value={content.about.timeline.label} onChange={(v) => set((d) => { d.about.timeline.label = v; })} />
          <Field label="Heading" value={content.about.timeline.heading} onChange={(v) => set((d) => { d.about.timeline.heading = v; })} />
          <Field label="Subtitle" value={content.about.timeline.subtitle} onChange={(v) => set((d) => { d.about.timeline.subtitle = v; })} multiline rows={2} />
          {content.about.timeline.events.map((ev, i) => (
            <ArrayCard key={i} header={`${ev.year} — ${ev.title}`}>
              <Field label="Year" value={ev.year} onChange={(v) => set((d) => { d.about.timeline.events[i].year = v; })} />
              <Field label="Title" value={ev.title} onChange={(v) => set((d) => { d.about.timeline.events[i].title = v; })} />
              <Field label="Description" value={ev.description} onChange={(v) => set((d) => { d.about.timeline.events[i].description = v; })} multiline rows={3} />
            </ArrayCard>
          ))}
        </Section>

        <Section title="Leadership Team">
          <Field label="Label" value={content.about.leadership.label} onChange={(v) => set((d) => { d.about.leadership.label = v; })} />
          <Field label="Heading" value={content.about.leadership.heading} onChange={(v) => set((d) => { d.about.leadership.heading = v; })} />
          <Field label="Subtitle" value={content.about.leadership.subtitle} onChange={(v) => set((d) => { d.about.leadership.subtitle = v; })} multiline rows={2} />
          {content.about.leadership.team.map((m, i) => (
            <ArrayCard key={i} header={`${m.name} — ${m.role}`}>
              <Field label="Name" value={m.name} onChange={(v) => set((d) => { d.about.leadership.team[i].name = v; })} />
              <Field label="Role" value={m.role} onChange={(v) => set((d) => { d.about.leadership.team[i].role = v; })} />
              <Field label="Bio" value={m.bio} onChange={(v) => set((d) => { d.about.leadership.team[i].bio = v; })} multiline rows={3} />
              <ImageField label="Avatar" value={m.avatar} onChange={(v) => set((d) => { d.about.leadership.team[i].avatar = v; })} />
            </ArrayCard>
          ))}
        </Section>

        <Section title="About CTA">
          <Field label="Label" value={content.about.aboutCta.label} onChange={(v) => set((d) => { d.about.aboutCta.label = v; })} />
          <Field label="Heading" value={content.about.aboutCta.heading} onChange={(v) => set((d) => { d.about.aboutCta.heading = v; })} />
          <Field label="Subtitle" value={content.about.aboutCta.subtitle} onChange={(v) => set((d) => { d.about.aboutCta.subtitle = v; })} multiline rows={2} />
          <Field label="Button Text" value={content.about.aboutCta.cta} onChange={(v) => set((d) => { d.about.aboutCta.cta = v; })} />
        </Section>
      </div>

      {/* ── CONTACT PAGE ── */}
      <div className={styles.pageBlock}>
        <h2 className={styles.pageBlockTitle}>📞 Contact Page</h2>
        <Section title="Contact Hero">
          <Field label="Title" value={content.contact.hero.title} onChange={(v) => set((d) => { d.contact.hero.title = v; })} />
          <Field label="Subtitle" value={content.contact.hero.subtitle} onChange={(v) => set((d) => { d.contact.hero.subtitle = v; })} multiline rows={2} />
        </Section>
        <Section title="Contact Info">
          <Field label="HQ Title" value={content.contact.info.hqTitle} onChange={(v) => set((d) => { d.contact.info.hqTitle = v; })} />
          <Field label="HQ Address (\\n = new line)" value={content.contact.info.hqAddress} onChange={(v) => set((d) => { d.contact.info.hqAddress = v; })} multiline rows={3} />
          <Field label="Email Label" value={content.contact.info.emailLabel} onChange={(v) => set((d) => { d.contact.info.emailLabel = v; })} />
          <Field label="Email Address" value={content.contact.info.emailAddress} onChange={(v) => set((d) => { d.contact.info.emailAddress = v; })} />
          <Field label="Phone Label" value={content.contact.info.phoneLabel} onChange={(v) => set((d) => { d.contact.info.phoneLabel = v; })} />
          <Field label="Phone Number" value={content.contact.info.phoneNumber} onChange={(v) => set((d) => { d.contact.info.phoneNumber = v; })} />
          <Field label="Programmes Label" value={content.contact.info.programmesLabel} onChange={(v) => set((d) => { d.contact.info.programmesLabel = v; })} />
          <Field label="Programmes Text" value={content.contact.info.programmesText} onChange={(v) => set((d) => { d.contact.info.programmesText = v; })} />
          <Field label="Programmes Link" value={content.contact.info.programmesLink} onChange={(v) => set((d) => { d.contact.info.programmesLink = v; })} />
        </Section>
      </div>

      {/* ── IMPACT PAGE ── */}
      <div className={styles.pageBlock}>
        <h2 className={styles.pageBlockTitle}>🌍 Impact Page</h2>
        <Section title="Impact Hero">
          <Field label="Title" value={content.impact.hero.title} onChange={(v) => set((d) => { d.impact.hero.title = v; })} />
          <Field label="Subtitle" value={content.impact.hero.subtitle} onChange={(v) => set((d) => { d.impact.hero.subtitle = v; })} multiline rows={2} />
        </Section>
        <Section title="Research & White Papers">
          <Field label="Section Title" value={content.impact.research.title} onChange={(v) => set((d) => { d.impact.research.title = v; })} />
          {content.impact.research.items.map((item, i) => (
            <ArrayCard key={i} header={`Document ${i+1}: ${item.title}`}>
              <Field label="Title" value={item.title} onChange={(v) => set((d) => { d.impact.research.items[i].title = v; })} />
              <Field label="Date/Info" value={item.date} onChange={(v) => set((d) => { d.impact.research.items[i].date = v; })} />
              <Field label="Button Text" value={item.buttonText} onChange={(v) => set((d) => { d.impact.research.items[i].buttonText = v; })} />
              <Field label="Download URL / Link" value={item.url} onChange={(v) => set((d) => { d.impact.research.items[i].url = v; })} />
            </ArrayCard>
          ))}
        </Section>
        <Section title="Recent News">
          <Field label="Section Title" value={content.impact.news.title} onChange={(v) => set((d) => { d.impact.news.title = v; })} />
          {content.impact.news.items.map((item, i) => (
            <ArrayCard key={i} header={`News ${i+1}: ${item.title}`}>
              <Field label="Title" value={item.title} onChange={(v) => set((d) => { d.impact.news.items[i].title = v; })} />
              <Field label="Excerpt" value={item.excerpt} onChange={(v) => set((d) => { d.impact.news.items[i].excerpt = v; })} multiline rows={2} />
            </ArrayCard>
          ))}
        </Section>
      </div>

      {/* ── PILLARS PAGE ── */}
      <div className={styles.pageBlock}>
        <h2 className={styles.pageBlockTitle}>🏛️ Pillars Page</h2>
        <Section title="Pillars Hero">
          <Field label="Title" value={content.pillarsPage.hero.title} onChange={(v) => set((d) => { d.pillarsPage.hero.title = v; })} />
          <Field label="Subtitle" value={content.pillarsPage.hero.subtitle} onChange={(v) => set((d) => { d.pillarsPage.hero.subtitle = v; })} multiline rows={2} />
        </Section>
        <Section title="Pillars Detailed List">
          {content.pillarsPage.pillarsList.map((item, i) => (
            <ArrayCard key={i} header={`Pillar ${i+1}: ${item.title}`}>
              <Field label="ID (anchor link)" value={item.id} onChange={(v) => set((d) => { d.pillarsPage.pillarsList[i].id = v; })} />
              <Field label="Title" value={item.title} onChange={(v) => set((d) => { d.pillarsPage.pillarsList[i].title = v; })} />
              <Field label="Description" value={item.description} onChange={(v) => set((d) => { d.pillarsPage.pillarsList[i].description = v; })} multiline rows={3} />
            </ArrayCard>
          ))}
        </Section>
        <Section title="Projects Powered by CSCI AFRICA">
          <Field label="Section Title" value={content.pillarsPage.projects.title} onChange={(v) => set((d) => { d.pillarsPage.projects.title = v; })} />
          <Field label="Section Subtitle" value={content.pillarsPage.projects.subtitle} onChange={(v) => set((d) => { d.pillarsPage.projects.subtitle = v; })} multiline rows={2} />
          {content.pillarsPage.projects.items.map((item, i) => (
            <ArrayCard key={i} header={`Project ${i+1}: ${item.title}`}>
              <Field label="Title" value={item.title} onChange={(v) => set((d) => { d.pillarsPage.projects.items[i].title = v; })} />
              <Field label="Description" value={item.description} onChange={(v) => set((d) => { d.pillarsPage.projects.items[i].description = v; })} multiline rows={3} />
              <Field label="Link Text (optional)" value={item.linkText} onChange={(v) => set((d) => { d.pillarsPage.projects.items[i].linkText = v; })} />
              <Field label="Link URL (optional)" value={item.linkUrl} onChange={(v) => set((d) => { d.pillarsPage.projects.items[i].linkUrl = v; })} />
            </ArrayCard>
          ))}
        </Section>
      </div>

      <div className={styles.saveBar}>
        <p className={styles.saveBarNote}>💡 Click Save Changes above, or use the button below.</p>
        <button className={styles.btnSave} onClick={onSave}>Save All Changes</button>
      </div>
    </div>
  );
}
