import { WindowId, ConversationTree, ResumeData, ResumeCategory, Project, CityTime, DesktopIconConfig } from './types';
import { FileTextIcon, FolderIcon, MailIcon } from './components/icons';

export const INITIAL_WINDOW_Z_INDEX = 20;

export const DEFAULT_WINDOW_SIZE = { width: '75vw', height: '55vh' }; // Default for desktop

// Specific desktop sizes for certain windows
export const PROJECTS_WINDOW_DESKTOP_SIZE = { width: '78vw', height: '72vh' };
export const CONTACT_WINDOW_DESKTOP_SIZE = { width: DEFAULT_WINDOW_SIZE.width, height: '52vh' };

export const MOBILE_WINDOW_POSITION = { top: 60 };
export const MOBILE_WINDOW_SIZE = { width: '90vw', height: '70dvh' };

export const DESKTOP_ICON_CONFIGS: DesktopIconConfig[] = [
  { id: WindowId.README, label: 'README.md', icon: FileTextIcon },
  { id: WindowId.PROJECTS, label: 'Projects', icon: FolderIcon },
  { id: WindowId.CONTACT, label: 'Contact', icon: MailIcon },
];

export const CONVERSATION_TREE: ConversationTree = {
  start: { text: ["🛰️ [Transmission Received - 0x345jffn83j2mnf]", "Assalāmu ʿAlaikum wa Rahmatullāh.", "To whoever’s out there reading this… welcome to my console."], options: [{ text: "Who are you?", next: "who" }] },
  who: { text: ["I am Dawud.", "I’m a Muslim.", "I’m an American.", "I’m a developer.", "A seeker of knowledge."], options: [{ text: "What is your mission?", next: "mission" }] },
  mission: { text: ["My mission? To integrate blockchain into every layer of life — business, individual, industrial, even governmental — in alignment with Shariah law."], options: [{ text: "Why blockchain?", next: "why_blockchain" }, { text: "Why focus on Shariah law?", next: "why_shariah" }] },
  why_shariah: { text: ["Because I believe Islamic law, at its core, was always meant to move humanity forward.", "And technology is the most powerful tool we have to do that."], options: [{ text: "Tell me more about the technology.", next: "why_blockchain" }] },
  why_blockchain: { text: ["I believe blockchain is more than tech —", "It's freedom. It’s governance for a digital age.", "With the right people and the right purpose, we can build systems that empower — not exploit.", "Systems that create real financial opportunity, not just profit."], options: [{ text: "So what's the point of all this?", next: "point" }] },
  point: { text: ["This is my signal. My landing page. My proof-of-work.", "Here, you’ll find what I’ve done, what I’m building, and what I stand for."], options: [{ text: "What now?", next: "final_options" }] },
  final_options: {
    text: ["If you're aligned — reach out.", "If you resonate — let's build.", "Assalāmu ʿAlaikum.", "Transmission End."],
    options: [
      { text: "Send Transmission", next: "contact" },
      { text: "View Bounties", next: "projects" },
      { text: "Replay Transmission", action: () => window.location.reload() }
    ]
  }
};

export const RESUME_DATA: ResumeData = {
  [ResumeCategory.WORK]: [
    "Highlife Studios :: Manager, IT Lead (2023-2025)",
    "New York Sports Club :: Personal Trainer (2024-2025)",
    "MetaWorld :: Founder (2020-2022)",
    "The Foundry BJJ :: Kickboxing Instructor (2018-2019)",
    "Sport and Health Club :: Front Desk (2016-2020)",
    "Wingstop :: Cook, Cashier (2015-2016)",
    "Walmart Distribution :: Warehouse Worker (2020-2022)",
    "Bellhop :: Mover (2020-2023)",
    "Take 5 :: Oil Technician (2020-2022)",
    "Trappin Out the Tool Box :: Mobile Mechanic (2020-2021)",
    "Precious Metals and Stone :: Custom Handmade Jewelry (2020-2022)",
    "Cordelia Fish Bar :: Cook (2024-Present)"
  ],
  [ResumeCategory.EDUCATION]: [
    "International school of sports science :: Personal Training (2023)",
    "Ethica Institute of Islamic Finance :: Certified Islamic Finance Executive (2025)",
    "Albalagh Academy :: Islamic Banking and Finance (2025)",
    "Jump Start Automotive Training Center :: Intro Train / Tech-1 (2021)"
  ],
  [ResumeCategory.CERTS]: [
    "International Sports Sciences Association :: Personal Trainer (2023)"
  ],
  [ResumeCategory.LIFE]: [
    "Languages: English (Fluent), Arabic (Basics), Spanish (Beginner)",
    "Traveled to: China, Malaysia, Myanmar, Thailand, Egypt, Ireland, Denmark, Saudi Arabia",
    "Core Skills: Project Management and Development, Client Relations, Teamwork, Critical Thinking"
  ]
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'osint-news',
    name: 'OSINT News',
    statusText: 'STATUS_LIVE',
    statusColor: 'green',
    category: 'Media · Open Intelligence',
    thumbnailUrl: '/src/assets/images/proj_osint_news_1793913613261.jpg',
    launchUrl: 'https://grnosint.ai.studio/',
    detailsInitiallyOpen: true,
    description: 'Stylized independent anonymous news platform.',
    fullSummary: 'An independent open-source intelligence (OSINT) and anonymous news publishing platform built with a kinetic editorial telemetry interface and verified signal feeds.',
    highlights: ['Anonymous dispatch feeds', 'Global event radar', 'Stylized editorial typography']
  },
  {
    id: 'trash-bounty',
    name: 'Trash Bounty Ecosystem',
    statusText: 'STATUS_LIVE',
    statusColor: 'green',
    category: 'Web3 · Civic Charity',
    thumbnailUrl: '/src/assets/images/proj_trash_bounty_1793913614661.jpg',
    launchUrl: 'https://nouakchott-trash-bounty.ai.studio/',
    detailsInitiallyOpen: false,
    description: 'Decentralized trash bounty system that utilizes global charity.',
    fullSummary: 'A decentralized environmental cleanup bounty protocol connecting global charitable contributions with verified local sanitation action across Nouakchott neighborhoods.',
    highlights: ['Geo-verified cleanup bounties', 'Transparent charity treasury', 'Community reward payouts']
  },
  {
    id: 'nouakchott-energy-map',
    name: 'Nouakchott Energy Map',
    statusText: 'STATUS_LIVE',
    statusColor: 'green',
    category: 'GIS · Infrastructure',
    thumbnailUrl: '/src/assets/images/proj_energy_map_1793913615834.jpg',
    launchUrl: 'https://emernouk.ai.studio/',
    detailsInitiallyOpen: false,
    description: 'Community-based energy report map.',
    fullSummary: 'Real-time crowdsourced utility and power grid status map for Nouakchott, empowering residents to report outages, voltage stability, and neighborhood restoration timelines.',
    highlights: ['Live district grid status', 'Community outage reporting', 'Interactive geospatial heatmap']
  },
  {
    id: 'shtreli',
    name: 'Shtreli',
    statusText: 'STATUS_LIVE',
    statusColor: 'green',
    category: 'Commerce · Classifieds',
    thumbnailUrl: '/src/assets/images/proj_shtreli_market_1793913617637.jpg',
    launchUrl: 'https://www.shterili.com/',
    detailsInitiallyOpen: false,
    description: 'E-commerce marketplace for classified ads.',
    fullSummary: 'A streamlined multi-category classifieds and peer-to-peer e-commerce marketplace engineered for fast local discovery, verified listings, and direct buyer-seller communication.',
    highlights: ['Multi-category classified ads', 'Mobile-first listing search', 'Direct seller messaging']
  },
  {
    id: 'arabic-school-nkc',
    name: 'Arabic School Landing Page',
    statusText: 'STATUS_LIVE',
    statusColor: 'green',
    category: 'Education · Linguistic Arts',
    thumbnailUrl: '/src/assets/images/proj_arabic_school_1793913618277.jpg',
    launchUrl: 'https://nkcquran.ai.studio/',
    detailsInitiallyOpen: false,
    description: 'Arabic school in Nouakchott.',
    fullSummary: 'Digital enrollment and curriculum portal for classical Arabic and Quranic studies in Nouakchott, connecting international and local students with traditional scholars.',
    highlights: ['Classical Arabic & Tajweed', 'Structured study tracks', 'Student registration portal']
  },
  {
    id: 'islamic-contracts',
    name: 'Islamic Contracts',
    statusText: 'STATUS_LIVE',
    statusColor: 'green',
    category: 'FinTech · Shariah Web3',
    thumbnailUrl: '/src/assets/images/proj_islamic_contracts_1793913619138.jpg',
    launchUrl: 'https://studio--icontractchain.us-central1.hosted.app/',
    detailsInitiallyOpen: false,
    description: 'Blockchain-based Islamic contract platform.',
    fullSummary: 'An on-chain financial agreement and smart contract platform structured around authentic Islamic jurisprudence (Fiqh al-Muamalat) for transparent Murabaha, Mudarabah, and Wakalah execution.',
    highlights: ['Shariah-compliant templates', 'Immutable cryptographic audit', 'Multi-party covenant signing']
  },
];

export const CITIES_FOR_CLOCK: CityTime[] = [
  { name: 'Mecca', timeZone: 'Asia/Riyadh' },
  { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
  { name: 'New York', timeZone: 'America/New_York' },
  { name: 'Moscow', timeZone: 'Europe/Moscow' },
  { name: 'Paris', timeZone: 'Europe/Paris' },
  { name: 'London', timeZone: 'Europe/London' },
  { name: 'Johannesburg', timeZone: 'Africa/Johannesburg' },
  { name: 'Sydney', timeZone: 'Australia/Sydney' },
];

export const COIN_IDS_FOR_TICKER: string[] = ['bitcoin', 'ethereum', 'bittensor', 'solana', 'cosmos', 'arbitrum', 'cardano', 'uniswap', 'binancecoin'];

export const NAME_ENGLISH = "Dawud";
export const NAME_ARABIC = "داود";
export const NAME_MOBILE = "DAWUD";

export const CONTACT_EMAIL = "jihad@dawud.dev";
export const CONTACT_WHATSAPP = "+12026502773";
export const CONTACT_WHATSAPP_DISPLAY = "+1 (202) 650-2773";
export const CONTACT_WHATSAPP_URL = "https://wa.me/12026502773";