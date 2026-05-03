import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllSlugs, blogPosts } from '@/lib/blog';
import styles from './post.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  let post = getPostBySlug(slug); // fallback
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`);
    if (res.ok) post = await res.json();
  } catch (e) {}
  
  if (!post) return {};
  return {
    title: `${post.title} | AnyanwuConnect`,
    description: post.excerpt,
  };
}

const categoryColors: Record<string, string> = {
  'Leadership': 'var(--accent-emerald)',
  'Security': 'var(--primary-navy)',
  'Economic Empowerment': '#D97706',
  'Technology & Education': '#7C3AED',
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  
  let post = getPostBySlug(slug);
  let related = blogPosts.filter(p => p.slug !== slug).slice(0, 2);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`, { next: { revalidate: 60 }});
    if (res.ok) post = await res.json();

    const allRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, { next: { revalidate: 60 }});
    if (allRes.ok) {
      const allPosts: any[] = await allRes.json();
      related = allPosts.filter(p => p.slug !== slug).slice(0, 2);
    }
  } catch (e) {
    console.error("Failed to fetch dynamic single post", e);
  }

  if (!post) notFound();



  return (
    <>
      {/* Hero */}
      <section className={styles.postHero} style={{ backgroundImage: `url(${post.coverImage})` }}>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <Link href="/blog" className={styles.backLink}>← Back to Journal</Link>
          <span className={styles.categoryBadge} style={{ backgroundColor: categoryColors[post.category] || 'var(--accent-emerald)' }}>
            {post.category}
          </span>
          <h1 className={styles.postTitle}>{post.title}</h1>
          <div className={styles.postMeta}>
            <img src={post.authorAvatar} alt={post.author} className={styles.authorAvatar} />
            <div>
              <p className={styles.authorName}>{post.author}</p>
              <p className={styles.postDate}>{post.date} · {post.readTime}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className={styles.contentLayout}>
            <article className={styles.article}>
              <p className={styles.leadParagraph}>{post.excerpt}</p>
              {post.content.trim().split('\n').map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return null;
                if (trimmed.startsWith('## ')) return <h2 key={i} className={styles.h2}>{trimmed.slice(3)}</h2>;
                if (trimmed.startsWith('# ')) return <h1 key={i} className={styles.h1}>{trimmed.slice(2)}</h1>;
                if (trimmed.startsWith('- ') || trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. '))
                  return <li key={i} className={styles.li}>{trimmed.replace(/^[-\d]+[.)]\s/, '')}</li>;
                return <p key={i} className={styles.paragraph} dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />;
              })}

              <div className={styles.tags}>
                {post.tags.map(tag => (
                  <span key={tag} className={styles.tag}>#{tag}</span>
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.sideCard}>
                <h3 className={styles.sideTitle}>About AnyanwuConnect</h3>
                <p className={styles.sideText}>We are an Executive Think Tank and community development organisation working at the intersection of leadership, security, and economic empowerment across Nigeria and Africa.</p>
                <Link href="/about" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}>Learn More</Link>
              </div>
              <div className={styles.sideCard}>
                <h3 className={styles.sideTitle}>Join CSCI AFRICA</h3>
                <p className={styles.sideText}>Complete the free 12-week Launching Leaders Worldwide course and join 50+ alumni transforming their communities.</p>
                <a href="https://llworldwide.org" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.6rem 1.2rem' }}>Apply Now →</a>
              </div>
            </aside>
          </div>

          {/* Related Posts */}
          {related.length > 0 && (
            <div className={styles.related}>
              <h2 className={styles.relatedTitle}>Continue Reading</h2>
              <div className={styles.relatedGrid}>
                {related.map(p => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.relatedCard}>
                    <div className={styles.relatedImage} style={{ backgroundImage: `url(${p.coverImage})` }}>
                      <span className={styles.categoryBadge} style={{ backgroundColor: categoryColors[p.category] || 'var(--accent-emerald)', position: 'absolute', top: '1rem', left: '1rem' }}>
                        {p.category}
                      </span>
                    </div>
                    <div className={styles.relatedBody}>
                      <h3 className={styles.relatedPostTitle}>{p.title}</h3>
                      <p className={styles.relatedDate}>{p.date} · {p.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
