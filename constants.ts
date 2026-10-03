import { WindowId, ConversationTree, ResumeData, ResumeCategory, Project, CityTime, DesktopIconConfig } from './types';
import { FileTextIcon, FolderIcon, MailIcon } from './components/icons';

export const INITIAL_WINDOW_Z_INDEX = 20;

// DEFAULT_WINDOW_POSITION is removed as desktop positions are calculated dynamically.
export const DEFAULT_WINDOW_SIZE = { width: '75vw', height: '50vh' }; // Default for desktop

// Specific desktop sizes for certain windows
export const PROJECTS_WINDOW_DESKTOP_SIZE = { width: DEFAULT_WINDOW_SIZE.width, height: '40vh' };
export const CONTACT_WINDOW_DESKTOP_SIZE = { width: DEFAULT_WINDOW_SIZE.width, height: '40vh' };


// For WindowComponent: top is interpreted as px, left as vw when mobile.
// MOBILE_WINDOW_POSITION.left (vw units) will be calculated based on MOBILE_WINDOW_SIZE.width to ensure centering.
// MOBILE_WINDOW_POSITION.top (px units) is the fixed top offset for mobile windows.
export const MOBILE_WINDOW_POSITION = { top: 60 }; // Increased from 45px to 60px for better spacing
export const MOBILE_WINDOW_SIZE = { width: '90vw', height: '70dvh' }; // Adjusted dimensions for better mobile layout


export const DESKTOP_ICON_CONFIGS: DesktopIconConfig[] = [
  { id: WindowId.README, label: 'README.md', icon: FileTextIcon },
  { id: WindowId.PROJECTS, label: 'Projects', icon: FolderIcon },
  { id: WindowId.CONTACT, label: 'Contact', icon: MailIcon },
];

export const CONVERSATION_TREE: ConversationTree = {
      start: { text: ["🛰️ [Transmission Received - 0x345jffn83j2mnf]", "Assalāmu ʿAlaikum wa Rahmatullāh.", "To whoever’s out there reading this… welcome to my console."], options: [{ text: "Who are you?", next: "who" }] },
  who: { text: ["I am Dawud.", "I’m a Muslim.", "I’m an American.", "I’m a developer.", "A seeker of knowledge."], options: [ { text: "What is your mission?", next: "mission" } ] },
  mission: { text: ["My mission? To integrate blockchain into every layer of life — business, individual, industrial, even governmental — in alignment with Shariah law."], options: [ { text: "Why blockchain?", next: "why_blockchain" }, { text: "Why focus on Shariah law?", next: "why_shariah" } ] },
  why_shariah: { text: ["Because I believe Islamic law, at its core, was always meant to move humanity forward.", "And technology is the most powerful tool we have to do that."], options: [ { text: "Tell me more about the technology.", next: "why_blockchain" } ] },
  why_blockchain: { text: ["I believe blockchain is more than tech —", "It's freedom. It’s governance for a digital age.", "With the right people and the right purpose, we can build systems that empower — not exploit.", "Systems that create real financial opportunity, not just profit."], options: [ { text: "So what's the point of all this?", next: "point" } ] },
  point: { text: ["This is my signal. My landing page. My proof-of-work.", "Here, you’ll find what I’ve done, what I’m building, and what I stand for."], options: [ { text: "What now?", next: "final_options" } ] },
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
  { id: 'tlj', name: "The Language Journal", statusText: "STATUS_ALPHA", statusColor: 'green', launchUrl: 'https://www.tlj.app', detailsInitiallyOpen: true },
  { id: 'halal-dex', name: "Halal Dex", statusText: "STATUS_IN_DEVELOPMENT", statusColor: 'yellow' },
  { id: 'halal-swap', name: "HalalSwap", statusText: "STATUS_IN_DEVELOPMENT", statusColor: 'yellow' },
  { id: 'icontracts', name: "iContracts", statusText: "STATUS_DEMO", statusColor: 'green', launchUrl: 'https://studio--icontractchain.us-central1.hosted.app/' },
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

export const COIN_IDS_FOR_TICKER: string[] = ['bitcoin', 'ethereum', 'solana', 'cosmos', 'arbitrum', 'cardano', 'uniswap', 'matic-network', 'binancecoin'];

export const NAME_ENGLISH = "Dawud Jihad Abdullah";
export const NAME_ARABIC = "داود جهاد عبدالله";
export const NAME_MOBILE = "DAWUD J. ABDULLAH";