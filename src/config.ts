export const SITE = {
  website: 'https://aia-illinois.netlify.app/', // TODO: Update with actual URL if known
  author: 'AI Alignment @ Illinois',
  description: 'A community at UIUC of researchers, philosophers, and builders focused on safe, aligned, and human-centered artificial intelligence',
  title: 'AI Alignment @ Illinois',
  ogImage: 'astropaper-og.jpg',
  lightAndDarkMode: true,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes

  // Lab Info
  labName: 'AI Alignment @ Illinois',
  university: 'University of Illinois Urbana-Champaign',
  logo: '/assets/aia-logo.png', // Logo path (absolute so it resolves on all routes)
  avatar: './assets/logo-real.svg', // Avatar for SEO/Schema
  email: 'contact@aiaillinois.org', // Placeholder

  // Hero Section (Home Page)
  hero: {
    title: 'AI Alignment @ Illinois',
    subtitle: 'A community at UIUC of researchers, philosophers, and builders focused on safe, aligned, and human-centered artificial intelligence',
    action: 'Join Now',
    image: './assets/hero-image-2026.jpg',
  },

  // Navigation
  nav: [
    { text: 'Home', link: '/', key: 'home' },
    { text: 'Get Involved', link: '/spring-2026', key: 'get_involved' },
    { text: 'Team', link: '/team', key: 'team' },
    { text: 'Events', link: '/events', key: 'events' },
  ],

  // Custom Pages
  customPages: [
    { text: 'Resources', link: '/resources', key: 'resources' },
  ],

  // i18n Config
  i18n: {
    enabled: false,
    defaultLocale: 'en',
  }
};

export const LOCALE = {
  lang: 'en', // html lang code. Set this empty and default will be "en"
  langTag: ['en-US'], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: true,
  svg: false, // Changed to false since it's a PNG
  width: 50, // Adjusted width for header
  height: 50,
};

export const SOCIALS = [
  {
    link: 'https://discord.com/invite/hGcu53KNrY',
    active: true,
  },
  {
    link: 'https://www.instagram.com/aialignmentuiuc',
    active: true,
  },
];

// Default language configuration
export const DEFAULT_LANG: 'zh' | 'en' | 'ja' | 'ko' | 'fr' | 'de' | 'es' | 'ru' = 'en';


export const ResourcesUrl = "https://www.notion.so/Resources-31321c93aa7f80c3b556c584cefe4fb2?source=copy_link"

export const OpportunitiesUrl = 'https://alignmentopportunities.vercel.app/'

export const LAYOUT_CONFIG = {
  defaultFooterBg: 'bg-[#0A0F1A]',
  fallbackFooterColor: '#0A0F1A',
  ogSupportedPages: ['index', 'research', 'team', 'publications', 'news', 'join'] as const,
};
