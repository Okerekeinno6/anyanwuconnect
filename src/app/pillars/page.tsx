"use client";

import { useState, useEffect } from "react";
import { getSiteContent, defaultContent } from "@/lib/siteContent";

export default function Pillars() {
  const [content, setContent] = useState(defaultContent.pillarsPage);

  useEffect(() => {
    setContent(getSiteContent().pillarsPage);
  }, []);

  return (
    <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem' }}>
      <h1 className="section-title" style={{ whiteSpace: "pre-wrap" }}>{content.hero.title}</h1>
      <p className="section-subtitle" style={{ whiteSpace: "pre-wrap" }}>{content.hero.subtitle}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {content.pillarsList.map((pillar) => (
          <div key={pillar.id} id={pillar.id} className="card">
            <h2 style={{ marginBottom: '1rem', color: 'var(--primary-navy)' }}>{pillar.title}</h2>
            <p style={{ lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '5rem' }}>
        <h2 className="section-title" style={{ fontSize: '2rem', whiteSpace: "pre-wrap" }}>{content.projects.title}</h2>
        <p className="section-subtitle" style={{ whiteSpace: "pre-wrap" }}>
          {content.projects.subtitle}
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {content.projects.items.map((item, i) => (
            <div key={i} className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary-navy)' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <span style={{ whiteSpace: 'pre-wrap' }}>{item.description}</span>
                {item.linkText && item.linkUrl && (
                  <>
                    <br/>
                    <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-emerald)', fontWeight: '600' }}>
                      {item.linkText}
                    </a>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
