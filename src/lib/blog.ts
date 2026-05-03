// src/lib/blog.ts
// Static blog post data - replace with CMS/markdown files as your blog grows

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  coverImage: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'africa-leadership-deficit-solution',
    title: 'Nigeria\'s Leadership Deficit: Why Character-Driven Development is the Only Way Forward',
    excerpt: 'Decades of governance failures in Nigeria trace back to a single root cause — a leadership pipeline that rewards politics over competence and connections over character. AnyanwuConnect proposes a bold, data-driven path forward.',
    category: 'Leadership',
    date: 'April 28, 2026',
    readTime: '6 min read',
    author: 'The AnyanwuConnect Team',
    authorRole: 'Executive Think Tank',
    authorAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80',
    tags: ['Leadership', 'Nigeria', 'Governance', 'CSCI AFRICA'],
    content: `
Nigeria's leadership crisis is not simply a political problem — it is a structural one. For decades, the nation has produced leaders who are highly intelligent and academically decorated yet fundamentally disconnected from the values of service, accountability, and long-term thinking.

The Launching Leaders Worldwide programme, powered by AnyanwuConnect through CSCI AFRICA, is built on a radical premise: **leadership development must begin before a person enters public life, not after they have already failed.** 

The 12-week, completely free programme guides participants through rigorous frameworks in ethical decision-making, community accountability, and strategic governance — drawing on both global best practices and deeply African wisdom systems.

## Why Character Comes First

Research consistently shows that technical competence without ethical grounding is one of the most dangerous combinations in governance. Nigeria's history is filled with technically brilliant ministers and executives who plundered institutions for personal gain.

The solution is not better laws alone, but a generation of leaders whose first instinct is to serve. AnyanwuConnect's approach integrates mentorship from global and African leaders, real-world accountability exercises, and peer learning networks that reinforce values long after the programme ends.

## The Data is Clear

Of our 50+ recorded CSCI AFRICA alumni testimonies, the most consistent theme is not professional success — it is a fundamental shift in how participants define leadership itself. From viewing it as a position of authority to understanding it as a responsibility of service.

This is the foundation on which a prosperous Nigeria — and a competitive Africa — will be built.
    `
  },
  {
    slug: 'community-security-intelligence-africa',
    title: 'SecuraNG: How Community Intelligence is Redefining Security in Nigeria',
    excerpt: 'Traditional policing has failed Nigeria\'s communities. SecuraNG, powered by AnyanwuConnect, offers a data-driven, community-centred approach to civil intelligence that is already showing measurable results.',
    category: 'Security',
    date: 'April 20, 2026',
    readTime: '5 min read',
    author: 'The AnyanwuConnect Team',
    authorRole: 'Executive Think Tank',
    authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1200&q=80',
    tags: ['Security', 'Nigeria', 'Technology', 'SecuraNG'],
    content: `
Nigeria's security landscape has deteriorated not simply because of a lack of resources — but because of a fundamental breakdown in the relationship between communities and formal security institutions.

SecuraNG is AnyanwuConnect's answer to this systemic impasse. Rather than replacing formal security structures, SecuraNG builds a layer of **civil intelligence** — a network of informed, organised, and empowered communities that gather, verify, and act on local security data responsibly.

## The Community Intelligence Model

At its core, SecuraNG operates on three pillars:

1. **Community Mapping**: Equipping local leaders with tools to identify and document security vulnerabilities, patterns, and actors within their communities.
2. **Data Verification**: A structured protocol to prevent rumour from being treated as intelligence — a critical failure mode that has led to mob justice incidents across Nigeria.
3. **Coordinated Response**: Clear channels that connect verified community intelligence with appropriate formal responses, whether law enforcement, local government, or civil society.

## Why This Works

The most successful security ecosystems globally — from Rwanda's community policing model to Japan's neighbourhood watch systems — share a common element: **trust between citizens and the institutions designed to protect them.**

SecuraNG is rebuilding that trust, one community at a time.
    `
  },
  {
    slug: 'organic-farming-africa-fs-initiative',
    title: 'Feeding Africa Differently: The FS Initiative and the Case for Organic Seeds',
    excerpt: 'Nigeria imports food it has the land and climate to grow abundantly. The FS Initiative is changing this by connecting African farmers with organic seed networks and cooperatives that bypass exploitative supply chains.',
    category: 'Economic Empowerment',
    date: 'April 12, 2026',
    readTime: '7 min read',
    author: 'The AnyanwuConnect Team',
    authorRole: 'Executive Think Tank',
    authorAvatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=1200&q=80',
    tags: ['Agribusiness', 'Food Security', 'FS Initiative', 'Africa'],
    content: `
Africa is a continent of extraordinary agricultural potential. Nigeria alone has over 79 million hectares of arable land — yet the nation spends billions annually importing food commodities it has every capacity to produce.

The Farmers Support (FS) Initiative, powered through AnyanwuConnect's CSCI AFRICA partnership, is addressing this paradox at its roots — not its symptoms.

## The Organic Seed Revolution

Industrial hybrid seeds, while high-yield in the short term, create farmer dependency on corporate seed suppliers, degrade soil health over time, and often produce crops poorly adapted to local microclimates. The FS Initiative champions a return to **organic, open-pollinated seeds** that farmers can save, replant, and trade freely.

This is not nostalgia — it is strategic economic sovereignty.

## The Cooperative Advantage

By connecting smallholder farmers in Nigeria with organic seed networks across Africa and Asia, the FS Initiative enables:

- **Collective purchasing power**: Cooperatives negotiate better prices for inputs and sell at better prices as a unified bloc.
- **Knowledge transfer**: Farmers learn sustainable practices — composting, intercropping, natural pest management — that reduce costs and build soil health.
- **Market access**: Partnerships with urban markets, restaurants, and export channels that value organic certification.

The result is a farming community that is not just surviving — but building generational wealth.
    `
  },
  {
    slug: 'studyflares-ai-education-nigeria',
    title: 'AI in the Classroom: How Studyflares is Democratizing Quality Education Across Africa',
    excerpt: 'A teacher in rural Anambra now has access to the same quality of lesson preparation tools as a teacher in London. Studyflares — powered by AnyanwuConnect — is making this a reality.',
    category: 'Technology & Education',
    date: 'April 5, 2026',
    readTime: '5 min read',
    author: 'The AnyanwuConnect Team',
    authorRole: 'Executive Think Tank',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80',
    tags: ['Education', 'AI', 'Studyflares', 'Technology', 'Nigeria'],
    content: `
The quality of education in Nigeria — and across most of Africa — has long been constrained not primarily by the intelligence or dedication of its teachers, but by a severe lack of tools, time, and resources.

A teacher managing a class of 60 students in Anambra State does not have 3 hours per night to craft differentiated lesson plans, build engaging quizzes, and create visual study aids. Until now.

## Studyflares: AI That Understands Education

Studyflares is an AI-powered machine learning platform capable of generating:
- **Comprehensive study guides** tailored to curriculum objectives
- **Intelligent flashcards** optimised for spaced repetition learning
- **Dynamic quizzes** with adaptive difficulty levels
- **Game-based fiction lessons** that transform abstract concepts into engaging narratives

What once took hours now takes minutes. And the quality is not diminished — it is enhanced by AI that draws on vast global educational resources and adapts them for local contexts.

## The Equity Impact

The most powerful thing about Studyflares is not its sophistication — it is its accessibility. The platform is designed to function in low-bandwidth environments, making it viable in schools and universities across Nigeria, whether in Lagos Island or rural Kebbi State.

This is educational equity in action. Powered by AnyanwuConnect.
    `
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map(post => post.slug);
}
