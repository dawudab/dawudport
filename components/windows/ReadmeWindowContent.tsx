import React from 'react';
import { WindowId, ThemeMode } from '../../types';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY, CONTACT_WHATSAPP_URL } from '@/constants';

interface ReadmeWindowContentProps {
  onOpenWindow: (windowId: WindowId) => void;
  isActive: boolean;
  theme?: ThemeMode;
}

const ReadmeWindowContent: React.FC<ReadmeWindowContentProps> = ({
  onOpenWindow,
  theme = 'dark',
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`h-full terminal-style p-4 sm:p-6 overflow-y-auto font-['JetBrains_Mono'] bg-transparent text-[13px] sm:text-sm leading-relaxed ${
        isDark ? 'text-zinc-100' : 'text-slate-800'
      }`}
      style={{
        height: '100%',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        wordBreak: 'break-word',
        boxSizing: 'border-box',
      }}
    >
      {/* Terminal Header Banner */}
      <div
        className={`border-b pb-4 mb-5 ${
          isDark ? 'border-white/[0.08]' : 'border-slate-900/[0.08]'
        }`}
      >
        <div
          className={`flex items-center gap-2 text-xs mb-1.5 ${
            isDark ? 'text-zinc-400' : 'text-slate-500'
          }`}
        >
          <span className="text-emerald-500">●</span>
          <span>SYSTEM_INIT // READY</span>
          <span>·</span>
          <span>DAWUD_PORTAL v2.5</span>
        </div>
        <h1
          className={`text-lg sm:text-xl font-semibold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Assalāmu ʿAlaikum — Welcome to my Console
        </h1>
        <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
          Personal landing console, digital proof-of-work, and system directory.
        </p>
      </div>

      {/* About Dawud */}
      <div className="space-y-4 mb-6">
        <div>
          <h2
            className={`text-xs uppercase font-semibold tracking-wider mb-2 flex items-center gap-2 ${
              isDark ? 'text-zinc-400' : 'text-slate-500'
            }`}
          >
            <span>//</span> 01. About Me
          </h2>
          <div
            className={`backdrop-blur-xl rounded-xl p-4 sm:p-5 space-y-2.5 border ${
              isDark
                ? 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-white/[0.14] text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_rgba(0,0,0,0.35)]'
                : 'bg-gradient-to-b from-white/85 to-white/65 border-slate-900/[0.12] text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_20px_rgba(15,23,42,0.06)]'
            }`}
          >
            <p>
              I am{' '}
              <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-950'}`}>
                Dawud
              </span>{' '}
              — a developer, tech strategist, and builder based in the United States.
            </p>
            <p>
              My focus is on integrating decentralized networks, blockchain architecture, and
              artificial intelligence into practical, real-world systems. I believe in engineering
              open technology that empowers individuals, creates authentic financial opportunity,
              and aligns with high ethical principles.
            </p>
          </div>
        </div>

        {/* About This Website */}
        <div>
          <h2
            className={`text-xs uppercase font-semibold tracking-wider mb-2 flex items-center gap-2 ${
              isDark ? 'text-zinc-400' : 'text-slate-500'
            }`}
          >
            <span>//</span> 02. About This Website
          </h2>
          <div
            className={`backdrop-blur-xl rounded-xl p-4 sm:p-5 space-y-2 border ${
              isDark
                ? 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-white/[0.14] text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_rgba(0,0,0,0.35)]'
                : 'bg-gradient-to-b from-white/85 to-white/65 border-slate-900/[0.12] text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_20px_rgba(15,23,42,0.06)]'
            }`}
          >
            <p>
              This website is an interactive desktop operating system modeled after modern Bittensor
              terminal architecture and iOS frosted glass aesthetics, featuring both Dark and Light
              modes.
            </p>
            <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
              Key subsystems: interactive 3D neural geodesic core, expandable live
              project previews, and direct encrypted transmission channels.
            </p>
          </div>
        </div>

        {/* Quick Directory / Actions */}
        <div>
          <h2
            className={`text-xs uppercase font-semibold tracking-wider mb-2 flex items-center gap-2 ${
              isDark ? 'text-zinc-400' : 'text-slate-500'
            }`}
          >
            <span>//</span> 03. Quick Launch Directory
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onOpenWindow(WindowId.PROJECTS)}
              className={`text-left p-3.5 rounded-xl backdrop-blur-xl border transition-all duration-200 group cursor-pointer active:scale-[0.98] ${
                isDark
                  ? 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.04] border-white/[0.14] hover:border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_6px_20px_rgba(0,0,0,0.35)]'
                  : 'bg-gradient-to-b from-white/85 to-white/65 hover:from-white hover:to-white/90 border-slate-900/[0.12] hover:border-slate-900/25 shadow-[0_4px_14px_rgba(15,23,42,0.06)]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span
                  className={`font-medium ${
                    isDark
                      ? 'text-zinc-400 group-hover:text-white'
                      : 'text-slate-600 group-hover:text-slate-950'
                  }`}
                >
                  ./projects
                </span>
                <span className="text-emerald-500 text-[11px] font-semibold">6 LIVE</span>
              </div>
              <p
                className={`text-xs ${
                  isDark
                    ? 'text-zinc-300 group-hover:text-white'
                    : 'text-slate-700 group-hover:text-slate-950'
                }`}
              >
                Explore all 6 live websites & expandable previews ›
              </p>
            </button>

            <button
              type="button"
              onClick={() => onOpenWindow(WindowId.CONTACT)}
              className={`text-left p-3.5 rounded-xl backdrop-blur-xl border transition-all duration-200 group cursor-pointer active:scale-[0.98] ${
                isDark
                  ? 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.04] border-white/[0.14] hover:border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_6px_20px_rgba(0,0,0,0.35)]'
                  : 'bg-gradient-to-b from-white/85 to-white/65 hover:from-white hover:to-white/90 border-slate-900/[0.12] hover:border-slate-900/25 shadow-[0_4px_14px_rgba(15,23,42,0.06)]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span
                  className={`font-medium ${
                    isDark
                      ? 'text-zinc-400 group-hover:text-white'
                      : 'text-slate-600 group-hover:text-slate-950'
                  }`}
                >
                  ./contact
                </span>
                <span className={isDark ? 'text-zinc-400 text-[11px]' : 'text-slate-500 text-[11px]'}>
                  RELAY
                </span>
              </div>
              <p
                className={`text-xs ${
                  isDark
                    ? 'text-zinc-300 group-hover:text-white'
                    : 'text-slate-700 group-hover:text-slate-950'
                }`}
              >
                Send transmission via Email or WhatsApp ›
              </p>
            </button>

            <button
              type="button"
              onClick={() => onOpenWindow(WindowId.INFO)}
              className={`text-left p-3.5 rounded-xl backdrop-blur-xl border transition-all duration-200 group cursor-pointer active:scale-[0.98] ${
                isDark
                  ? 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.04] border-white/[0.14] hover:border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_6px_20px_rgba(0,0,0,0.35)]'
                  : 'bg-gradient-to-b from-white/85 to-white/65 hover:from-white hover:to-white/90 border-slate-900/[0.12] hover:border-slate-900/25 shadow-[0_4px_14px_rgba(15,23,42,0.06)]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span
                  className={`font-medium ${
                    isDark
                      ? 'text-zinc-400 group-hover:text-white'
                      : 'text-slate-600 group-hover:text-slate-950'
                  }`}
                >
                  ./dawud --info
                </span>
                <span className={isDark ? 'text-zinc-400 text-[11px]' : 'text-slate-500 text-[11px]'}>
                  BIO
                </span>
              </div>
              <p
                className={`text-xs ${
                  isDark
                    ? 'text-zinc-300 group-hover:text-white'
                    : 'text-slate-700 group-hover:text-slate-950'
                }`}
              >
                View bio profile, location, and details ›
              </p>
            </button>

            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-left p-3.5 rounded-xl backdrop-blur-xl border transition-all duration-200 group cursor-pointer active:scale-[0.98] ${
                isDark
                  ? 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:from-emerald-500/15 hover:to-emerald-500/5 border-white/[0.14] hover:border-emerald-500/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_6px_20px_rgba(0,0,0,0.35)]'
                  : 'bg-gradient-to-b from-white/85 to-white/65 hover:from-emerald-50 hover:to-white border-slate-900/[0.12] hover:border-emerald-500/40 shadow-[0_4px_14px_rgba(15,23,42,0.06)]'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span
                  className={`font-medium ${
                    isDark
                      ? 'text-zinc-400 group-hover:text-emerald-400'
                      : 'text-slate-600 group-hover:text-emerald-600'
                  }`}
                >
                  WhatsApp
                </span>
                <span className="text-emerald-500 text-[11px] font-semibold">DIRECT</span>
              </div>
              <p
                className={`text-xs ${
                  isDark
                    ? 'text-zinc-300 group-hover:text-white'
                    : 'text-slate-700 group-hover:text-slate-950'
                }`}
              >
                {CONTACT_WHATSAPP_DISPLAY} ↗
              </p>
            </a>
          </div>
        </div>
      </div>

      {/* Footer signoff */}
      <div
        className={`pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
          isDark ? 'border-white/[0.06] text-zinc-500' : 'border-slate-900/[0.08] text-slate-500'
        }`}
      >
        <span>If you resonate or have projects to build — reach out.</span>
        <span className={`font-medium ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
          {CONTACT_EMAIL}
        </span>
      </div>
    </div>
  );
};

export default ReadmeWindowContent;
