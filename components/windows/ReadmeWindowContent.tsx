import React from 'react';
import { WindowId } from '../../types';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY, CONTACT_WHATSAPP_URL } from '@/constants';

interface ReadmeWindowContentProps {
  onOpenWindow: (windowId: WindowId) => void;
  isActive: boolean;
}

const ReadmeWindowContent: React.FC<ReadmeWindowContentProps> = ({ onOpenWindow }) => {
  return (
    <div
      className="h-full terminal-style p-4 sm:p-6 overflow-y-auto font-['JetBrains_Mono'] text-zinc-100 bg-transparent text-[13px] sm:text-sm leading-relaxed"
      style={{
        height: '100%',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        wordBreak: 'break-word',
        boxSizing: 'border-box',
      }}
    >
      {/* Terminal Header Banner */}
      <div className="border-b border-white/[0.08] pb-4 mb-5">
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1.5">
          <span className="text-emerald-400">●</span>
          <span>SYSTEM_INIT // READY</span>
          <span className="text-zinc-600">·</span>
          <span>DAWUD_PORTAL v2.4</span>
        </div>
        <h1 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
          Assalāmu ʿAlaikum — Welcome to my Console
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Personal landing console, digital proof-of-work, and system directory.
        </p>
      </div>

      {/* About Dawud */}
      <div className="space-y-4 mb-6">
        <div>
          <h2 className="text-xs uppercase font-semibold tracking-wider text-zinc-400 mb-2 flex items-center gap-2">
            <span className="text-zinc-600">//</span> 01. About Me
          </h2>
          <div className="backdrop-blur-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.14] rounded-xl p-4 sm:p-5 text-zinc-300 space-y-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_rgba(0,0,0,0.35)]">
            <p>
              I am <span className="text-white font-medium">Dawud</span> — a developer, tech strategist, and builder based in the United States.
            </p>
            <p>
              My focus is on integrating decentralized networks, blockchain architecture, and artificial intelligence into practical, real-world systems. I believe in engineering open technology that empowers individuals, creates authentic financial opportunity, and aligns with high ethical principles.
            </p>
          </div>
        </div>

        {/* About This Website */}
        <div>
          <h2 className="text-xs uppercase font-semibold tracking-wider text-zinc-400 mb-2 flex items-center gap-2">
            <span className="text-zinc-600">//</span> 02. About This Website
          </h2>
          <div className="backdrop-blur-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.14] rounded-xl p-4 sm:p-5 text-zinc-300 space-y-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_rgba(0,0,0,0.35)]">
            <p>
              This website is an interactive desktop operating system modeled after modern Bittensor terminal architecture and iOS frosted glass aesthetics.
            </p>
            <p className="text-xs text-zinc-400">
              Key subsystems: live multi-currency crypto oracle ticker, 3D neural subnet lattice globe, global time matrix, and encrypted transmission channels.
            </p>
          </div>
        </div>

        {/* Quick Directory / Actions */}
        <div>
          <h2 className="text-xs uppercase font-semibold tracking-wider text-zinc-400 mb-2 flex items-center gap-2">
            <span className="text-zinc-600">//</span> 03. Quick Launch Directory
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onOpenWindow(WindowId.PROJECTS)}
              className="text-left p-3.5 rounded-xl backdrop-blur-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.04] border border-white/[0.14] hover:border-white/30 transition-all duration-200 group cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_6px_20px_rgba(0,0,0,0.35)] active:scale-[0.98]"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-zinc-400 group-hover:text-white font-medium">./projects</span>
                <span className="text-emerald-400 text-[11px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">ACTIVE</span>
              </div>
              <p className="text-xs text-zinc-300 group-hover:text-white">
                View Nouakchott E-Map & deployment status ›
              </p>
            </button>

            <button
              type="button"
              onClick={() => onOpenWindow(WindowId.CONTACT)}
              className="text-left p-3.5 rounded-xl backdrop-blur-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.04] border border-white/[0.14] hover:border-white/30 transition-all duration-200 group cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_6px_20px_rgba(0,0,0,0.35)] active:scale-[0.98]"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-zinc-400 group-hover:text-white font-medium">./contact</span>
                <span className="text-zinc-300 text-[11px] bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded">RELAY</span>
              </div>
              <p className="text-xs text-zinc-300 group-hover:text-white">
                Send transmission via Email or WhatsApp ›
              </p>
            </button>

            <button
              type="button"
              onClick={() => onOpenWindow(WindowId.INFO)}
              className="text-left p-3.5 rounded-xl backdrop-blur-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.04] border border-white/[0.14] hover:border-white/30 transition-all duration-200 group cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_6px_20px_rgba(0,0,0,0.35)] active:scale-[0.98]"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-zinc-400 group-hover:text-white font-medium">./dawud --info</span>
                <span className="text-zinc-300 text-[11px] bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded">BIO</span>
              </div>
              <p className="text-xs text-zinc-300 group-hover:text-white">
                View bio profile, location, and details ›
              </p>
            </button>

            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left p-3.5 rounded-xl backdrop-blur-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:from-emerald-500/15 hover:to-emerald-500/5 border border-white/[0.14] hover:border-emerald-500/40 transition-all duration-200 group cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_6px_20px_rgba(0,0,0,0.35)] active:scale-[0.98]"
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-zinc-400 group-hover:text-emerald-400 font-medium">WhatsApp</span>
                <span className="text-emerald-400 text-[11px] bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">DIRECT</span>
              </div>
              <p className="text-xs text-zinc-300 group-hover:text-white">
                {CONTACT_WHATSAPP_DISPLAY} ↗
              </p>
            </a>
          </div>
        </div>
      </div>

      {/* Footer signoff */}
      <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
        <span>If you resonate or have projects to build — reach out.</span>
        <span className="text-zinc-400 font-medium">jihad@dawud.dev</span>
      </div>
    </div>
  );
};

export default ReadmeWindowContent;
