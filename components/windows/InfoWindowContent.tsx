import React, { useState, useEffect } from 'react';
import Avatar from '../Avatar';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY, CONTACT_WHATSAPP_URL } from '@/constants';

const InfoWindowContent: React.FC = () => {
  const [age, setAge] = useState<number | null>(null);
  const [hijriDOB, setHijriDOB] = useState<string>('16/4/1417');

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
    <div className="h-full terminal-style p-4 sm:p-6 overflow-y-auto font-['JetBrains_Mono'] text-zinc-100 bg-transparent text-[13px] sm:text-sm">
      {/* Header Profile Section */}
      <div className="border-b border-white/[0.08] pb-5 mb-5">
        <div className="flex gap-4 items-center">
          <Avatar src="https://i.imgur.com/v8iI51q.jpeg" alt="Dawud Profile" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-zinc-400 font-['Cairo']">داود</span>
              <span className="text-zinc-600">·</span>
              <span className="text-[11px] text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                ONLINE
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Dawud
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5 font-['Plus_Jakarta_Sans']">
              Developer · Web3 & Decentralized Systems · AI Applications
            </p>
          </div>
        </div>

        {/* Quick Metadata Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs tabular-nums mt-4 pt-4 border-t border-white/[0.08]">
          <div className="p-3 rounded-xl backdrop-blur-md bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
            <span className="text-[11px] text-zinc-500 block">AGE</span>
            <span className="text-zinc-100 font-medium">{age !== null ? age : '28'}</span>
          </div>
          <div className="p-3 rounded-xl backdrop-blur-md bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
            <span className="text-[11px] text-zinc-500 block">LOCATION</span>
            <span className="text-zinc-100 font-medium">USA</span>
          </div>
          <div className="p-3 rounded-xl backdrop-blur-md bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
            <span className="text-[11px] text-zinc-500 block">DOB (G)</span>
            <span className="text-zinc-100 font-medium">08/30/1996</span>
          </div>
          <div className="p-3 rounded-xl backdrop-blur-md bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
            <span className="text-[11px] text-zinc-500 block">DOB (H)</span>
            <span className="text-zinc-100 font-medium truncate block">{hijriDOB}</span>
          </div>
        </div>
      </div>

      {/* Simple Bio */}
      <div className="space-y-4 mb-6">
        <div>
          <h3 className="text-xs uppercase font-semibold tracking-wider text-zinc-400 mb-2">
            // Bio & Mission
          </h3>
          <div className="backdrop-blur-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.14] rounded-xl p-4 sm:p-5 text-zinc-300 space-y-3 leading-relaxed shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_rgba(0,0,0,0.35)]">
            <p>
              I am Dawud — a Muslim, American developer, and builder passionate about decentralized infrastructure, blockchain integration, and emerging AI technologies.
            </p>
            <p>
              My goal is to engineer open, transparent digital systems that empower individuals rather than exploit them, creating genuine economic opportunities aligned with strong ethical and Shariah principles.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div>
          <h3 className="text-xs uppercase font-semibold tracking-wider text-zinc-400 mb-2">
            // Core Focus Areas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3.5 rounded-xl backdrop-blur-md bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
              <span className="text-white font-medium text-xs block mb-1">01. Web3 & Blockchain</span>
              <p className="text-xs text-zinc-400">Decentralized networks, smart contracts, and digital sovereignty.</p>
            </div>
            <div className="p-3.5 rounded-xl backdrop-blur-md bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
              <span className="text-white font-medium text-xs block mb-1">02. Modern Applications</span>
              <p className="text-xs text-zinc-400">Interactive GIS mapping, real-time telemetry, and resilient web apps.</p>
            </div>
            <div className="p-3.5 rounded-xl backdrop-blur-md bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
              <span className="text-white font-medium text-xs block mb-1">03. Ethical Tech</span>
              <p className="text-xs text-zinc-400">Shariah-aligned systems that prioritize fairness, utility, and human progress.</p>
            </div>
          </div>
        </div>

        {/* Contact Links */}
        <div>
          <h3 className="text-xs uppercase font-semibold tracking-wider text-zinc-400 mb-2">
            // Direct Channels
          </h3>
          <div className="flex flex-wrap gap-2.5">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 bg-white text-zinc-950 hover:bg-zinc-200 px-3.5 py-2 rounded-lg text-xs font-medium transition-colors"
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
