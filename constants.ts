import { WindowId, ConversationTree, ResumeData, ResumeCategory, Project, CityTime, DesktopIconConfig } from './types';
import { FileTextIcon, FolderIcon, MailIcon } from './components/icons';

export const INITIAL_WINDOW_Z_INDEX = 20;

export const DEFAULT_WINDOW_SIZE = { width: '76vw', height: '62vh' };

// Specific desktop sizes for certain windows
export const PROJECTS_WINDOW_DESKTOP_SIZE = { width: '84vw', height: '78vh' };
export const CONTACT_WINDOW_DESKTOP_SIZE = { width: DEFAULT_WINDOW_SIZE.width, height: '58vh' };

export const MOBILE_WINDOW_POSITION = { top: 8 };
export const MOBILE_WINDOW_SIZE = { width: '96vw', height: '84dvh' };

export const DESKTOP_ICON_CONFIGS: DesktopIconConfig[] = [
  { id: WindowId.README, label: 'README', icon: FileTextIcon },
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
    id: 'qareeb',
    name: 'Qareeb',
    role: 'Co-Developer & Project Manager',
    roleGroup: 'lead',
    statusText: 'STATUS_LIVE',
    statusColor: 'green',
    category: 'Food Platform · Operations & Engineering',
    launchUrl: 'https://www.qareebfood.com/',
    description:
      'Contributed across all aspects of the application, including UI/UX design, software development, company mission and vision, and day-to-day administrative operations.',
  },
  {
    id: 'nouakchott-energy-map',
    name: 'Nouakchott Energy Map',
    role: 'Creator, Founder, Project Manager & Lead Developer',
    roleGroup: 'founder',
    statusText: 'STATUS_LIVE',
    statusColor: 'green',
    category: 'Civic GIS · Utility & Fuel Foresight',
    launchUrl: 'https://emernouk.ai.studio/',
    description:
      'Inspired by living in Nouakchott, this platform empowers the local community with real-time awareness and foresight around power outages and fuel availability—giving residents the tools to stay informed and proactive instead of left waiting. Designed and built the entire website end-to-end.',
  },
  {
    id: 'charity-trash-bounties',
    name: 'Charity Trash Bounties',
    role: 'Creator, Founder, Project Manager & Lead Developer',
    roleGroup: 'founder',
    statusText: 'STATUS_LIVE',
    statusColor: 'green',
    category: 'Civic Sanitation · Charitable Bounties',
    launchUrl: 'https://nouakchott-trash-bounty.ai.studio/',
    description:
      "Conceptualized and engineered a transparent civic sanitation system designed to solve waste management challenges in developing communities—creating a direct loop from charitable donations to local workers' pockets and measurable, real-world results for a cleaner, safer city.",
  },
  {
    id: 'shtreli',
    name: 'Shtreli',
    role: 'Co-Developer',
    roleGroup: 'lead',
    statusText: 'STATUS_LIVE',
    statusColor: 'green',
    category: 'E-Commerce · Classifieds Marketplace',
    launchUrl: 'https://www.shterili.com/',
    description:
      'Assisted with targeted development features and overall project direction.',
  },
  {
    id: 'mahdara-al-andalous',
    name: 'Mahdara Al-Andalous Al-Ilmiyya',
    role: 'Web Developer',
    roleGroup: 'lead',
    statusText: 'STATUS_LIVE',
    statusColor: 'green',
    category: 'Education · Classical Arabic & Sciences',
    launchUrl: 'https://nkcquran.ai.studio/',
    description:
      'Fully designed and developed the web platform, and continue to handle backend infrastructure and ongoing site management.',
  },
  {
    id: 'global-resistance-network',
    name: 'Global Resistance Network',
    role: 'Creator, Founder, Project Manager & Lead Developer',
    roleGroup: 'founder',
    statusText: 'STATUS_LIVE',
    statusColor: 'green',
    category: 'Independent Media · Global Conflict & Geopolitics',
    launchUrl: 'https://grnosint.ai.studio/',
    description:
      'A passion project built with a friend to track breaking global news, world conflicts, and geopolitics. Designed, developed, and actively manage the entire platform.',
  },
  {
    id: 'islamic-contracts',
    name: 'Islamic Contracts',
    role: 'Creator, Founder, Project Manager & Lead Developer',
    roleGroup: 'founder',
    statusText: 'STATUS_WIP',
    statusColor: 'yellow',
    category: 'Islamic Finance · Digital Agreements',
    launchUrl: 'https://studio--icontractchain.us-central1.hosted.app/',
    description:
      'Originally designed and developed for an Islamic finance course; currently an active work-in-progress exploring structured digital Islamic financial agreements.',
  },
  {
    id: 'al-jisr-institute',
    name: 'Al Jisr Institute',
    role: 'Lead Developer & Project Management',
    roleGroup: 'lead',
    statusText: 'STATUS_LIVE',
    statusColor: 'green',
    category: 'Academic Portal · Recruitment & Strategy',
    launchUrl: 'https://teacher-recruitment.ai.studio/',
    description:
      'Designed and developed the web platform while collaborating directly with the founder to shape the business plan and long-term vision.',
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