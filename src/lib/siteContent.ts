"use client";

// ─────────────────────────────────────────────────────────────────
// AnyanwuConnect — Site Content Store
// All text displayed on public pages lives here so the Admin panel
// can read, edit, and persist changes (localStorage until Namecheap
// backend is connected).
// ─────────────────────────────────────────────────────────────────

export interface SiteContent {
  // ── HOMEPAGE ──────────────────────────────────────────────────
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };

  overviewSection: {
    watermark: string;
    label: string;
    heading: string;
    headingAccent: string;
    body1: string;
    body2: string;
    cta: string;
    stats: { number: string; label: string }[];
  };

  pillarsSection: {
    watermark: string;
    label: string;
    heading: string;
    subtitle: string;
    pillars: {
      image: string;
      title: string;
      description: string;
      href: string;
    }[];
  };

  partnersSection: {
    watermark: string;
    label: string;
    heading: string;
    subtitle: string;
    partners: {
      logo: string;
      name: string;
      description: string;
    }[];
  };

  projectsSection: {
    watermark: string;
    label: string;
    heading: string;
    headingAccent: string;
    subtitle: string;
    projects: {
      name: string;
      domain: string;
      description: string;
    }[];
  };

  testimonialsSection: {
    label: string;
    heading: string;
    subtitle: string;
    testimonials: {
      quote: string;
      name: string;
      role: string;
      avatar: string;
    }[];
  };

  ctaSection: {
    label: string;
    heading: string;
    subtitle: string;
    cta: string;
  };

  // ── ABOUT PAGE ────────────────────────────────────────────────
  about: {
    hero: {
      badge: string;
      title: string;
      subtitle: string;
    };
    whoWeAre: {
      label: string;
      heading: string;
      headingAccent: string;
      body1: string;
      body2: string;
      body3: string;
    };
    missionVision: {
      missionLabel: string;
      missionHeading: string;
      missionBody: string;
      visionLabel: string;
      visionHeading: string;
      visionBody: string;
      motto: string;
    };
    coreValues: {
      label: string;
      heading: string;
      subtitle: string;
      values: { icon: string; title: string; description: string }[];
    };
    timeline: {
      label: string;
      heading: string;
      subtitle: string;
      events: { year: string; title: string; description: string }[];
    };
    leadership: {
      label: string;
      heading: string;
      subtitle: string;
      team: {
        name: string;
        role: string;
        bio: string;
        avatar: string;
      }[];
    };
    aboutCta: {
      label: string;
      heading: string;
      subtitle: string;
      cta: string;
    };
  };

  // ── CONTACT PAGE ──────────────────────────────────────────────
  contact: {
    hero: { title: string; subtitle: string; };
    info: {
      hqTitle: string;
      hqAddress: string;
      emailLabel: string;
      emailAddress: string;
      phoneLabel: string;
      phoneNumber: string;
      programmesLabel: string;
      programmesLink: string;
      programmesText: string;
    };
  };

  // ── IMPACT PAGE ───────────────────────────────────────────────
  impact: {
    hero: { title: string; subtitle: string; };
    research: {
      title: string;
      items: { title: string; date: string; buttonText: string; url: string; }[];
    };
    news: {
      title: string;
      items: { title: string; excerpt: string; }[];
    };
  };

  // ── PILLARS PAGE ──────────────────────────────────────────────
  pillarsPage: {
    hero: { title: string; subtitle: string; };
    pillarsList: { id: string; title: string; description: string; }[];
    projects: {
      title: string;
      subtitle: string;
      items: { title: string; description: string; linkText: string; linkUrl: string; }[];
    };
  };
}

// ── DEFAULT CONTENT ───────────────────────────────────────────────
export const defaultContent: SiteContent = {
  hero: {
    badge: "Development Architect",
    titleLine1: "Architecting a Secure,",
    titleLine2: "Prosperous & Globally",
    titleLine3: "Competitive ",
    titleAccent: "Africa.",
    subtitle:
      "An elite cadre of Community Development Experts and Executive Strategists based in Nigeria. We engineer self-sustaining ecosystems to solve systemic socio-economic challenges at their root.",
    ctaPrimary: "Discover Our Vision",
    ctaSecondary: "Explore Our Impact",
  },

  overviewSection: {
    watermark: "OVERVIEW",
    label: "Who We Are",
    heading: "Africa's Premier",
    headingAccent: "Development Architect",
    body1:
      "We do not just advocate for change — we engineer it. AnyanwuConnect operates at the critical intersection of executive leadership, strategic security, and economic empowerment.",
    body2:
      "Unlike traditional NGOs, we are a vanguard of community development experts. Leveraging cutting-edge technology and intelligence-driven frameworks, we build scalable platforms and incubate the next generation of visionary African leaders through CSCI AFRICA.",
    cta: "Review Our Strategy",
    stats: [
      { number: "8+", label: "Powered Projects" },
      { number: "50+", label: "CSCI Alumni" },
      { number: "3+", label: "Core Pillars" },
    ],
  },

  pillarsSection: {
    watermark: "PILLARS",
    label: "Our Framework",
    heading: "Strategic Pillars",
    subtitle:
      "The 2026–2029 Framework guiding our mission to establish a resilient and empowered society across Africa.",
    pillars: [
      {
        image: "/hero_security.png",
        title: "Security & Intelligence",
        description:
          "Showcasing SecuraNG, our platform for civil intelligence and community safety, mitigating risks through proactive data and community-driven insights.",
        href: "/pillars#security",
      },
      {
        image:
          "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
        title: "Leadership Development",
        description:
          "The Launching Leaders initiative — mentoring the next generation of ethical, visionary Nigerian and African leaders through our free 12-week programme.",
        href: "/pillars#leadership",
      },
      {
        image:
          "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=800&q=80",
        title: "Economic Empowerment",
        description:
          "Revolutionizing agribusiness and providing high-impact digital branding support for local SMEs and startups to drive continental economic growth.",
        href: "/pillars#economic",
      },
    ],
  },

  partnersSection: {
    watermark: "PARTNERS",
    label: "Ecosystem",
    heading: "Strategic Partners",
    subtitle:
      "Collaborating with industry leaders to deliver exceptional value and robust infrastructure for Africa's development.",
    partners: [
      {
        logo: "/siiqo-logo.avif",
        name: "Siiqo",
        description:
          "Powering SMEs and freelancers with comprehensive digital storefronts and escrow solutions to drive sustained economic growth across Africa.",
      },
      {
        logo: "/roots-logo.png",
        name: "Roots & Squares Consulting",
        description:
          "Our official Technical Partner, ensuring robust, secure, and scalable infrastructure for all our digital initiatives and platforms.",
      },
    ],
  },

  projectsSection: {
    watermark: "IMPACT",
    label: "Our Ecosystem",
    heading: "Powered by ",
    headingAccent: "CSCI AFRICA",
    subtitle:
      "Driving transformative initiatives across the continent — each project a building block of Africa's prosperous future.",
    projects: [
      {
        name: "Launching Leaders",
        domain: "llworldwide.org",
        description: "Free 12-week mentoring course for ethical African leaders.",
      },
      {
        name: "Interweave Solutions",
        domain: "interweavesolutions.org",
        description: "Promoting the Self-Reliance & Cooperative Model.",
      },
      {
        name: "LTI",
        domain: "",
        description: "Official Leadership Mentor fostering ethical capacity building.",
      },
      {
        name: "Studyflares",
        domain: "studyflares.com",
        description: "AI-powered platform creating study guides and flashcards.",
      },
      {
        name: "FS Initiative",
        domain: "",
        description:
          "Farmers Support group promoting organic seeds across Africa/Asia.",
      },
      {
        name: "Umunnabuike",
        domain: "",
        description: "Advocating for Igbo Pan AFRICA and regional solidarity.",
      },
      {
        name: "SecuraNG",
        domain: "",
        description:
          "Leveraging civil intelligence to correct the security impasse.",
      },
      {
        name: "RADIUS",
        domain: "",
        description: "A powerful content platform for African development.",
      },
    ],
  },

  testimonialsSection: {
    label: "Community Voices",
    heading: "Voices of Transformation",
    subtitle:
      "Real stories from CSCI AFRICA alumni and community members whose lives have been changed through our programmes.",
    testimonials: [
      {
        quote:
          "The Launching Leaders Worldwide programme completely redefined how I understand leadership. As a young Nigerian woman in a competitive industry, I now lead with data, empathy, and strategic vision. AnyanwuConnect gave me the blueprint.",
        name: "Adaeze Okonkwo",
        role: "Community Development Officer, Lagos",
        avatar: "/avatar1.png",
      },
      {
        quote:
          "Before CSCI AFRICA, I struggled to connect my local farming cooperative to modern markets. The FS Initiative connected me with organic seed networks across Africa. My cooperative now serves over 200 families.",
        name: "Emeka Chibuike",
        role: "Agricultural Entrepreneur, Enugu State",
        avatar: "/avatar2.png",
      },
      {
        quote:
          "The Studyflares AI platform transformed how I teach my secondary school students. Lesson preparation that used to take hours now takes minutes. AnyanwuConnect is building real infrastructure for African education.",
        name: "Chioma Nwachukwu",
        role: "Senior Educator, Anambra State",
        avatar:
          "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&q=80",
      },
      {
        quote:
          "Through the Interweave Solutions cooperative model, our youth group built a self-reliant savings and skills cooperative. We have supported over 50 young people gain meaningful livelihoods in our community.",
        name: "Tunde Adesanya",
        role: "Youth Leader & Cooperative Founder, Ibadan",
        avatar:
          "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&h=200&fit=crop&q=80",
      },
      {
        quote:
          "AnyanwuConnect's think-tank approach to security through SecuraNG is exactly what Nigeria needs. It is community intelligence — not just technology. We feel the difference on our streets today.",
        name: "Brig. Gen. (Rtd.) Patrick Ezema",
        role: "Security Consultant, Abuja",
        avatar:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80",
      },
      {
        quote:
          "The 12-week Launching Leaders course is completely free yet worth more than any executive programme I have attended. I graduated with a clearer vision, stronger values, and a powerful network of African leaders.",
        name: "Ngozi Obi-Ezeagu",
        role: "CSCI AFRICA Alumni, Port Harcourt",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80",
      },
    ],
  },

  ctaSection: {
    label: "Join the Movement",
    heading: "Join Africa's Most Ambitious\nDevelopment Movement",
    subtitle:
      "Partner with AnyanwuConnect to fund, support, or collaborate on groundbreaking initiatives transforming Nigeria and the African continent.",
    cta: "Partner With Us →",
  },

  // ── ABOUT ─────────────────────────────────────────────────────
  about: {
    hero: {
      badge: "Our Story",
      title: "Building Africa's Future,\nOne Ecosystem at a Time",
      subtitle:
        "AnyanwuConnect is more than a non-governmental organisation — it is a living architecture of leadership, security, and economic empowerment designed to transform Nigeria and the African continent.",
    },
    whoWeAre: {
      label: "Who We Are",
      heading: "The ",
      headingAccent: "Development Architect",
      body1:
        "AnyanwuConnect is a forward-thinking, non-governmental organisation (NGO) and strategic development think-tank headquartered in Nigeria. We operate at the critical intersection of leadership excellence, national security intelligence, and grassroots economic empowerment.",
      body2:
        "Unlike conventional NGOs that operate through advocacy alone, AnyanwuConnect functions as a 'Development Architect' — designing and deploying end-to-end systems that create self-sustaining communities. We utilise technology, data-driven strategies, and a network of exceptional human capital to solve systemic challenges at their root.",
      body3:
        "Our flagship incubator, CSCI AFRICA (Centre for Strategic Community Intelligence), is the engine behind our ecosystem of platforms and initiatives — from SecuraNG and Launching Leaders to Studyflares and the FS Initiative — each engineered to deliver measurable, generational impact.",
    },
    missionVision: {
      missionLabel: "Our Mission",
      missionHeading: "Why We Exist",
      missionBody:
        "To architect self-sustaining socio-economic ecosystems across Africa by leveraging technology, intelligence, and an elite network of community development experts — transforming systemic challenges into generational opportunity.",
      visionLabel: "Our Vision",
      visionHeading: "Where We Are Going",
      visionBody:
        "An Executive Think Tank engineering self-sustaining ecosystems for a prosperous, secure, and globally competitive Nigeria — and by extension, Africa — where every community has the infrastructure, leadership, and agency to thrive.",
      motto: '"We Serve to Save Humanity!"',
    },
    coreValues: {
      label: "Our DNA",
      heading: "Core Values",
      subtitle:
        "The principles that guide every decision, programme, and partnership at AnyanwuConnect.",
      values: [
        {
          icon: "🏛️",
          title: "Integrity",
          description:
            "We operate with radical transparency and ethical clarity in every initiative, partnership, and resource allocation.",
        },
        {
          icon: "⚡",
          title: "Innovation",
          description:
            "We refuse the status quo. Every challenge is an opportunity to design smarter, more scalable solutions for Africa.",
        },
        {
          icon: "🤝",
          title: "Collaboration",
          description:
            "Transformation requires collective intelligence. We build coalitions of purpose-driven individuals, institutions, and governments.",
        },
        {
          icon: "📊",
          title: "Impact-Driven",
          description:
            "Every programme is measured by real-world outcomes — lives improved, communities strengthened, systems redesigned.",
        },
        {
          icon: "🌍",
          title: "Pan-African Vision",
          description:
            "Our work transcends borders. Nigeria is our base; Africa is our mandate. We build for the continent.",
        },
        {
          icon: "🎓",
          title: "Excellence",
          description:
            "We recruit, develop, and deploy only the best minds — holding ourselves and our programmes to world-class standards.",
        },
      ],
    },
    timeline: {
      label: "Our Journey",
      heading: "Milestones of Impact",
      subtitle:
        "Key moments that have shaped AnyanwuConnect into Africa's foremost development architecture organisation.",
      events: [
        {
          year: "2018",
          title: "Foundation",
          description:
            "AnyanwuConnect was established in Nigeria with a founding vision to architect self-sustaining ecosystems for community development.",
        },
        {
          year: "2019",
          title: "CSCI AFRICA Launch",
          description:
            "The Centre for Strategic Community Intelligence (CSCI AFRICA) was established as our flagship incubator and leadership training body.",
        },
        {
          year: "2020",
          title: "Launching Leaders Worldwide",
          description:
            "Launched our flagship free 12-week mentoring programme for ethical African leaders, reaching participants across 5 states in Year 1.",
        },
        {
          year: "2021",
          title: "SecuraNG & FS Initiative",
          description:
            "Deployed SecuraNG — our civil intelligence platform — and launched the Farmers Support Initiative connecting cooperatives to organic seed networks.",
        },
        {
          year: "2022",
          title: "Digital Expansion",
          description:
            "Studyflares and Interweave Solutions were launched, expanding our ecosystem into education technology and cooperative economic models.",
        },
        {
          year: "2023",
          title: "Strategic Partnerships",
          description:
            "Formalised strategic partnerships with Siiqo and Roots & Squares Consulting, establishing robust technical infrastructure for all our platforms.",
        },
        {
          year: "2024",
          title: "Continental Scale",
          description:
            "Extended our CSCI AFRICA programmes beyond Nigeria, reaching communities in Ghana, Kenya, and across the diaspora with 50+ verified alumni.",
        },
        {
          year: "2026",
          title: "2026–2029 Strategic Framework",
          description:
            "Unveiled our bold 2026–2029 strategic framework — an ambitious blueprint to engineer a secure, prosperous, and globally competitive Africa.",
        },
      ],
    },
    leadership: {
      label: "Leadership",
      heading: "The Executive Team",
      subtitle:
        "A cadre of visionary strategists, community development experts, and technology leaders united by a singular mission.",
      team: [
        {
          name: "Dr. Chidi Anyanwu",
          role: "Founder & Executive Director",
          bio: "A distinguished community development strategist and security intelligence expert with over two decades of experience designing transformative ecosystems across Nigeria and Sub-Saharan Africa.",
          avatar:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80",
        },
        {
          name: "Adaeze Okonkwo",
          role: "Director of Programmes",
          bio: "Overseeing all flagship initiatives including Launching Leaders and CSCI AFRICA, Adaeze brings a decade of programme management excellence and deep community engagement expertise.",
          avatar:
            "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop&q=80",
        },
        {
          name: "Emeka Chibuike",
          role: "Head of Economic Empowerment",
          bio: "Driving the organisation's agribusiness and cooperative economics initiatives, Emeka is a seasoned agricultural entrepreneur connecting African farmers to global markets.",
          avatar:
            "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&q=80",
        },
        {
          name: "Ngozi Obi-Ezeagu",
          role: "Technology & Innovation Lead",
          bio: "Architect of the AnyanwuConnect digital ecosystem — overseeing SecuraNG, Studyflares, and the technical partnerships that power our continental platforms.",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&q=80",
        },
      ],
    },
    aboutCta: {
      label: "Get Involved",
      heading: "Ready to Engineer Change?",
      subtitle:
        "Join AnyanwuConnect as a partner, donor, or volunteer and become part of Africa's most ambitious development movement.",
      cta: "Partner With Us →",
    },
  },

  // ── CONTACT ───────────────────────────────────────────────────
  contact: {
    hero: {
      title: "Contact & Partner With Us",
      subtitle: "Reach out to AnyanwuConnect for partnerships, inquiries, or media requests.",
    },
    info: {
      hqTitle: "Abuja Office",
      hqAddress: "AnyanwuConnect Development Hub\nFederal Capital Territory,\nAbuja, Nigeria",
      emailLabel: "Email",
      emailAddress: "info@anyanwuconnect.com",
      phoneLabel: "Phone",
      phoneNumber: "Available upon request",
      programmesLabel: "Programmes",
      programmesText: "llworldwide.org",
      programmesLink: "https://llworldwide.org",
    },
  },

  // ── IMPACT ────────────────────────────────────────────────────
  impact: {
    hero: {
      title: "Our Impact",
      subtitle: "Think-Tank Resource Library & Latest Updates",
    },
    research: {
      title: "Research & White Papers",
      items: [
        {
          title: "The Future of Civil Intelligence in Nigeria",
          date: "Published: Q1 2026",
          buttonText: "Download PDF",
          url: "#",
        },
        {
          title: "Agribusiness Resiliency Report",
          date: "Published: Q4 2025",
          buttonText: "Download PDF",
          url: "#",
        },
      ],
    },
    news: {
      title: "Recent News",
      items: [
        {
          title: "Launch of SecuraNG Beta",
          excerpt: "AnyanwuConnect successfully rolls out the first phase of the SecuraNG platform in key pilot states.",
        },
        {
          title: "Launching Leaders Cohort 3",
          excerpt: "Welcoming 500 new young professionals into our intensive mentorship ecosystem.",
        },
      ],
    },
  },

  // ── PILLARS PAGE ──────────────────────────────────────────────
  pillarsPage: {
    hero: {
      title: "Our Pillars",
      subtitle: "The 2026–2029 Strategy Framework",
    },
    pillarsList: [
      {
        id: "security",
        title: "Security & Intelligence",
        description: "SecuraNG: Our flagship platform for civil intelligence and community safety. We leverage advanced data analytics and community reporting to mitigate risks and foster a secure environment for national development.",
      },
      {
        id: "leadership",
        title: "Leadership Development",
        description: "Launching Leaders Initiative: Mentoring the next generation of ethical, visionary Nigerian leaders. We provide comprehensive training, networking, and mentorship to young professionals, preparing them to take on critical roles in public and private sectors.",
      },
      {
        id: "economic",
        title: "Economic Empowerment",
        description: "Agribusiness & Digital Support: Revolutionizing agribusiness practices to ensure food security. Concurrently, we provide high-impact digital branding and technology support for local SMEs, integrating them into the global economy.",
      },
    ],
    projects: {
      title: "Projects Powered by CSCI AFRICA",
      subtitle: "AnyanwuConnect is powering multiple transformative initiatives across the continent in partnership with CSCI AFRICA. We celebrate over 50 recorded live testimonies from CSCI AFRICA alumni!",
      items: [
        {
          title: "1. Launching Leaders Worldwide",
          description: "All CSCI members are Alumni of this community in Africa. A completely free 12-week intensive course.",
          linkText: "Visit llworldwide.org (USA)",
          linkUrl: "https://llworldwide.org",
        },
        {
          title: "2. Interweave Solutions",
          description: "Promoting the Self-Reliance & Cooperative Model to build sustainable local economies. (USA)",
          linkText: "",
          linkUrl: "",
        },
        {
          title: "3. Leading Through Institute (LTI)",
          description: "Serving as the Official Leadership Mentor of the company to foster ethical leadership. (USA)",
          linkText: "",
          linkUrl: "",
        },
        {
          title: "4. Studyflares",
          description: "An AI-powered machine learning platform creating Study Guide Concepts, flashcards, quizzes, and game fictions for schools.",
          linkText: "Visit studyflares.com",
          linkUrl: "https://www.studyflares.com",
        },
        {
          title: "5. FS Initiative",
          description: "Farmers Support group dedicated to the promotion of organic seeds across Africa and Asia. (UK)",
          linkText: "",
          linkUrl: "",
        },
        {
          title: "6. Umunnabuike Initiative",
          description: "Located in Alaigbo, advocating for Igbo Pan AFRICA and regional solidarity.",
          linkText: "",
          linkUrl: "",
        },
        {
          title: "7. SecuraNG",
          description: "Our definitive solution to address and correct the security impasse across Africa.",
          linkText: "",
          linkUrl: "",
        },
        {
          title: "8. RADIUS",
          description: "A powerful content platform for African development, advertised seamlessly within our ecosystem.",
          linkText: "",
          linkUrl: "",
        },
      ],
    },
  },
};

// ─────────────────────────────────────────────────────────────────
// Content accessor — reads from localStorage if available,
// otherwise returns defaults. Works in browser only.
// ─────────────────────────────────────────────────────────────────
const STORAGE_KEY = "anyanwu_site_content_v1";

export function getSiteContent(): SiteContent {
  if (typeof window === "undefined") return defaultContent;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultContent;
    // Deep merge so new default keys are always present
    return deepMerge(defaultContent, JSON.parse(stored)) as SiteContent;
  } catch {
    return defaultContent;
  }
}

export function saveSiteContent(content: SiteContent): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function resetSiteContent(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// Simple recursive deep merge (source values win)
function deepMerge(target: unknown, source: unknown): unknown {
  if (typeof source !== "object" || source === null) return source ?? target;
  if (typeof target !== "object" || target === null) return source;
  if (Array.isArray(source)) return source; // arrays: source wins entirely
  const output = { ...(target as Record<string, unknown>) };
  for (const key of Object.keys(source as Record<string, unknown>)) {
    output[key] = deepMerge(
      (target as Record<string, unknown>)[key],
      (source as Record<string, unknown>)[key]
    );
  }
  return output;
}
