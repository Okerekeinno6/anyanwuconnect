import Link from 'next/link';
import { blogPosts } from '@/lib/blog';
import styles from './blog.module.css';
import ScrollFadeIn from '@/components/ui/ScrollFadeIn';

export const metadata = {
  title: 'Blog & Insights | AnyanwuConnect',
  description: 'Thought leadership, research, and strategic insights on African development, security, leadership, and economic empowerment from the AnyanwuConnect think tank.',
};

const categoryColors: Record<string, string> = {
  'Leadership': 'var(--accent-emerald)',
  'Security': 'var(--primary-navy)',
  'Economic Empowerment': '#D97706',
  'Technology & Education': '#7C3AED',
};

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  let posts = blogPosts; // Fallback static data
  try {
    const apiUrl = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
    const res = await fetch(`${apiUrl}/api/blogs`, { 
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        posts = data;
      }
    }
  } catch (e) {
    console.error("Failed to fetch dynamic blogs", e);
  }

  const featured = posts[0];
  const rest = posts.slice(1);

  if (!featured) {
    return <section className="section"><div className="container">No blog posts found.</div></section>;
  }

  return (
    <>
      {/* Page Hero */}
      <section className={styles.blogHero}>
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <ScrollFadeIn>
            <span className={styles.badge}>Think Tank Insights</span>
            <h1 className={styles.heroTitle}>The AnyanwuConnect Journal</h1>
            <p className={styles.heroSubtitle}>
              Research, strategy, and bold ideas shaping the future of Nigeria and the African continent — from our executive think tank to the world.
            </p>
          </ScrollFadeIn>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {/* Featured Post */}
          <ScrollFadeIn delay={0.1}>
            <Link href={`/blog/${featured.slug}`} className={styles.featuredCard}>
              <div className={styles.featuredImage} style={{ backgroundImage: `url(${featured.coverImage})` }}>
                <div className={styles.featuredOverlay}></div>
                <div className={styles.featuredContent}>
                  <span className={styles.categoryBadge} style={{ backgroundColor: categoryColors[featured.category] || 'var(--accent-emerald)' }}>
                    {featured.category}
                  </span>
                  <h2 className={styles.featuredTitle}>{featured.title}</h2>
                  <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                  <div className={styles.featuredMeta}>
                    <img src={featured.authorAvatar} alt={featured.author} className={styles.metaAvatar} />
                    <span>{featured.author}</span>
                    <span className={styles.metaDot}>·</span>
                    <span>{featured.date}</span>
                    <span className={styles.metaDot}>·</span>
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollFadeIn>

          {/* Post Grid */}
          <div className={styles.postsGrid}>
            {rest.map((post, idx) => (
              <ScrollFadeIn key={post.slug} delay={0.1 * (idx + 1)}>
                <Link href={`/blog/${post.slug}`} className={styles.postCard}>
                  <div className={styles.postImage} style={{ backgroundImage: `url(${post.coverImage})` }}>
                    <span className={styles.categoryBadge} style={{ backgroundColor: categoryColors[post.category] || 'var(--accent-emerald)' }}>
                      {post.category}
                    </span>
                  </div>
                  <div className={styles.postBody}>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                    <div className={styles.postMeta}>
                      <img src={post.authorAvatar} alt={post.author} className={styles.metaAvatar} />
                      <div>
                        <p className={styles.metaName}>{post.author}</p>
                        <p className={styles.metaDate}>{post.date} · {post.readTime}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollFadeIn>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
