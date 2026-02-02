
import { NavItem } from './types';

export const SITE_CONTENT = {
  global: {
    name: 'Murad Alaskarov',
    email: 'muradalaskarov@outlook.com',
    location: 'Baku, Azerbaijan',
    socials: {
      linkedin: 'https://www.linkedin.com/in/murad-alaskarov-5106b31b2/',
      instagram: 'https://www.instagram.com/muradalaskardraxano/',
    }
  },
  home: {
    hero: {
      badge: 'xx',
      titleStart: 'Learning tech by breaking things, fixing them, and pretending',
      titleHighlight: 'that was the plan',
      subtitle: 'Software engineering and wiritng',
      ctaPrimary: 'View Portfolio',
      ctaSecondary: 'Read My Blog'
    },
    latestWork: {
      title: 'Latest Work',
      subtitle: 'A selection of recent projects I\'ve worked on or am currently building.'
    },
    insights: {
      title: 'A bento of writings.',
      subtitle: 'Software engineering, philosophy, and related explorations.'
    },
    ctaSection: {
      title: "In for an adventure?",
      subtitle: "Want to join forces and build something together? Then press the button below.",
      buttonPrimary: "Get Started",
      buttonSecondary: "Book a Call"
    }
  },
  about: {
    title: 'About Me',
    intro: "I'm Murad Alaskarov, a software engineer at Azerconnect, one of the largest tech companies in Azerbaijan.",
    bio: "I'm deeply invested in learning and implementing robust software solutions. I have over three years of experience working in fast-paced environments, delivering backend systems and translating business requirements into clear, reliable server-side architectures.",
    stats: [
      { value: '3+', label: 'Years Exp.' }
    ],
    skills: ['Git & GitHub', 'Java', 'SpringBoot', 'Hibernate', 'Docker', 'MicroService Architecture', 'Testing', 'PostgreSQL', 'Redis', 'Rest API', 'Authorization & Authentication', 'SOAP', 'Python', 'Flutter'],
    journey: [
      { year: '2025 — Present', role: 'Back End Developer', company: 'Azerconnect Group', desc: '' },
      { year: '2023 — 2025', role: 'Junior Back End Developer', company: 'Azerconnect Group', desc: '' },
      { year: '2022 — 2023', role: 'Product Owner Intern', company: 'Azerconnect LLC', desc: '' }
    ]
  },
  projectsPage: {
    title: 'Work Showcase',
    subtitle: 'A curated collection of projects exploring the boundaries of design and functional engineering.',
    cta: {
      title: "Have a vision?",
      highlight: "Let's build it.",
      button: "Start a Project"
    }
  },
  writingsPage: {
    title: 'Writings',
    subtitle: 'I write about software engineering, philosophy, and physical training, with occasional reflections from daily life.'
  }
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Writings', path: '/writings' },
];
