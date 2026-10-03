
import type { SVGProps, JSX } from 'react';

export enum WindowId {
  README = 'readme-window',
  PROJECTS = 'projects-window',
  CONTACT = 'contact-window',
  INFO = 'info-window',
}

export interface WindowInstance {
  id: WindowId;
  title: string;
  isVisible: boolean;
  zIndex: number;
  position: { top: number; left: number }; // Percentage or pixels
  size: { width: string; height: string }; // Percentage or pixels string
  isMaximized?: boolean; // For potential future use
}

export interface CryptoCoin {
  id: string;
  name: string; // e.g., Bitcoin
  symbol: string; // e.g., BTC
  usd: number;
  usd_market_cap: number;
  usd_24h_change: number;
}

export interface CityTime {
  name: string;
  timeZone: string;
  currentTime?: string;
}

export interface TerminalOption {
  text: string;
  next?: string; // key for next node in conversationTree
  action?: () => void;
}

export interface TerminalNode {
  id?: string;
  text: string[];
  options?: TerminalOption[];
}

export interface ConversationTree {
  start: TerminalNode;
  who: TerminalNode;
  mission: TerminalNode;
  why_shariah: TerminalNode;
  why_blockchain: TerminalNode;
  point: TerminalNode;
  final_options: TerminalNode;
  [key: string]: TerminalNode;
}

export enum ResumeCategory {
  WORK = 'work',
  EDUCATION = 'education',
  CERTS = 'certs',
  LIFE = 'life',
}

export interface ResumeData {
  [ResumeCategory.WORK]: string[];
  [ResumeCategory.EDUCATION]: string[];
  [ResumeCategory.CERTS]: string[];
  [ResumeCategory.LIFE]: string[];
}

export interface Project {
  id: string;
  name: string;
  statusText: string;
  statusColor: 'green' | 'yellow' | 'red'; // For pulsing light
  description?: string; // Optional, if needed later
  launchUrl?: string;
  detailsInitiallyOpen?: boolean;
}

export interface DesktopIconConfig {
  id: WindowId;
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element; // Icon component
}
