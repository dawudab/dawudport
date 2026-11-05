import React, { useState, useEffect } from 'react';
import Avatar from '../Avatar';
import { ThemeMode } from '../../types';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY, CONTACT_WHATSAPP_URL } from '@/constants';

interface InfoWindowContentProps {
  theme?: ThemeMode;
}

const InfoWindowContent: React.FC<InfoWindowContentProps> = ({ theme = 'dark' }) => {
  const [age, setAge] = useState<number | null>(null);
  const [hijriDOB, setHijriDOB] = useState<string>('16/4/1417');

  const isDark = theme === 'dark';

  useEffect(() => {
    const calculateAge = (birthDate: string): number => {
      const today = new Date();
      const birth = new Date(birthDate);
      let currentAge = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        currentAge--;
      }
      return currentAge;
    };
    setAge(calculateAge('1996-08-30'));

    try {
      const dob = new Date('1996-08-30');
      const hijriFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      setHijriDOB(hijriFormatter.format(dob));
    } catch (e) {
      console.error('Could not calculate Hijri date.', e);
    }
  }, []);

  return (
    <div
      className={`h-full terminal-style p-4 sm:p-6 overflow-y-auto font-['JetBrains_Mono'] bg-transparent text-[13px] sm:text-sm ${
        isDark ? 'text-zinc-100' : 'text-slate-800'
      }`}
    >
      {/* Header Profile Section */}
      <div
        className={`border-b pb-5 mb-5 ${
          isDark ? 'border-white/[0.08]' : 'border-slate-900/[0.08]'
        }`}
      >
        <div className="flex gap-4 items-center">
          <Avatar src="https://i.imgur.com/v8iI51q.jpeg" alt="Dawud Profile" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-['Cairo'] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                داود
              </span>
              <span className={isDark ? 'text-zinc-600' : 'text-slate-400'}>·</span>
              <span className="text-[11px] text-emerald-500 font-semibold">ONLINE</span>
            </div>
            <h2
              className={`text-xl sm:text-2xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Dawud
            </h2>
            <p
              className={`text-xs mt-0.5 font-['Plus_Jakarta_Sans'] ${
                isDark ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              Developer · Web3 & Decentralized Systems · AI Applications
            </p>
          </div>
        </div>

        {/* Quick Metadata Matrix */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs tabular-nums mt-4 pt-4 border-t ${
            isDark ? 'border-white/[0.08]' : 'border-slate-900/[0.08]'
          }`}
        >
          {[
            { label: 'AGE', value: age !== null ? String(age) : '28' },
            { label: 'LOCATION', value: 'USA' },
            { label: 'DOB (G)', value: '08/30/1996' },
            { label: 'DOB (H)', value: hijriDOB },
          ].map((item) => (
            <div
              key={item.label}
              className={`p-3 rounded-xl backdrop-blur-md border ${
                isDark
                  ? 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]'
                  : 'bg-gradient-to-b from-white/85 to-white/65 border-slate-900/[0.12] shadow-[0_4px_12px_rgba(15,23,42,0.05)]'
              }`}
            >
              <span className={`text-[11px] block ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                {item.label}
              </span>
              <span
                className={`font-medium truncate block ${
                  isDark ? 'text-zinc-100' : 'text-slate-900'
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Bio */}
      <div className="space-y-4 mb-6">
        <div>
          <h3
            className={`text-xs uppercase font-semibold tracking-wider mb-2 ${
              isDark ? 'text-zinc-400' : 'text-slate-500'
            }`}
          >
            // Bio & Mission
          </h3>
          <div
            className={`backdrop-blur-xl rounded-xl p-4 sm:p-5 space-y-3 leading-relaxed border ${
              isDark
                ? 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-white/[0.14] text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_rgba(0,0,0,0.35)]'
                : 'bg-gradient-to-b from-white/85 to-white/65 border-slate-900/[0.12] text-slate-700 shadow-[0_6px_20px_rgba(15,23,42,0.06)]'
            }`}
          >
            <p>
              I am Dawud — a Muslim, American developer, and builder passionate about decentralized
              infrastructure, blockchain integration, and emerging AI technologies.
            </p>
            <p>
              My goal is to engineer open, transparent digital systems that empower individuals
              rather than exploit them, creating genuine economic opportunities aligned with strong
              ethical and Shariah principles.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div>
          <h3
            className={`text-xs uppercase font-semibold tracking-wider mb-2 ${
              isDark ? 'text-zinc-400' : 'text-slate-500'
            }`}
          >
            // Core Focus Areas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              {
                title: '01. Web3 & Blockchain',
                desc: 'Decentralized networks, smart contracts, and digital sovereignty.',
              },
              {
                title: '02. Modern Applications',
                desc: 'Interactive GIS mapping, real-time telemetry, and resilient web apps.',
              },
              {
                title: '03. Ethical Tech',
                desc: 'Shariah-aligned systems that prioritize fairness, utility, and human progress.',
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className={`p-3.5 rounded-xl backdrop-blur-md border ${
                  isDark
                    ? 'bg-gradient-to-b from-white/[0.06] to-white/[0.02] border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]'
                    : 'bg-gradient-to-b from-white/85 to-white/65 border-slate-900/[0.12] shadow-[0_4px_14px_rgba(15,23,42,0.05)]'
                }`}
              >
                <span
                  className={`font-medium text-xs block mb-1 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {pillar.title}
                </span>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Links */}
        <div>
          <h3
            className={`text-xs uppercase font-semibold tracking-wider mb-2 ${
              isDark ? 'text-zinc-400' : 'text-slate-500'
            }`}
          >
            // Direct Channels
          </h3>
          <div className="flex flex-wrap gap-2.5">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                isDark
                  ? 'bg-white text-zinc-950 hover:bg-zinc-200'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <span>Email: {CONTACT_EMAIL}</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors"
            >
              <span>WhatsApp: {CONTACT_WHATSAPP_DISPLAY}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoWindowContent;
