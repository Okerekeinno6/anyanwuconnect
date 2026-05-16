"use client";

import { useState, useEffect } from "react";
import { getSiteContent, defaultContent } from "@/lib/siteContent";

export default function Impact() {
  const [content, setContent] = useState(defaultContent.impact);

  useEffect(() => {
    setContent(getSiteContent().impact);
  }, []);

  return (
    <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 4rem)', paddingBottom: '4rem' }}>
      <h1 className="section-title" style={{ whiteSpace: "pre-wrap" }}>{content.hero.title}</h1>
      <p className="section-subtitle" style={{ whiteSpace: "pre-wrap" }}>{content.hero.subtitle}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>{content.research.title}</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {content.research.items.map((item, i) => (
              <li key={i} style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item.date}</p>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>{item.buttonText}</button>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-navy)' }}>{content.news.title}</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {content.news.items.map((item, i) => (
              <li key={i} style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
