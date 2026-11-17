import type { SVGProps, JSX } from 'react';

export type OSStage = 'booting' | 'login' | 'desktop';

export type LoggedInUser = 'User' | 'Guest';

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
  isMinimized?: boolean;
  zIndex: number;
  position: { top: number; left: number };
  size: { width: string; height: string };
  isMaximized?: boolean;
}

export interface CityTime {
  name: string;
  timeZone: string;
  currentTime?: string;
}

export interface TerminalOption {
  text: string;
  next?: string;
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
  role: string;
  roleGroup: 'founder' | 'lead';
  statusText: string;
  statusColor: 'green' | 'yellow' | 'red';
  description: string;
  contribution: string;
  missionGoal: string;
  category?: string;
  thumbnailUrl?: string;
  launchUrl: string;
}

export interface DesktopIconConfig {
  id: WindowId;
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}
