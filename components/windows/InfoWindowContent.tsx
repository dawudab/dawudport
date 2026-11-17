import React from 'react';
import { InfoIcon } from '../icons';
import { CONTACT_EMAIL, CONTACT_WHATSAPP_DISPLAY, CONTACT_WHATSAPP_URL } from '@/constants';

const InfoWindowContent: React.FC = () => {
  return (
    <div className="h-full terminal-style p-4 sm:p-6 overflow-y-auto font-mono-body bg-[#e5e7eb] text-[#111827] text-[13px] sm:text-sm">
      {/* System Info Header */}
      <div className="border-b-2 border-[#808080] pb-5 mb-5">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 shrink-0 bg-white x11-inset p-2 flex items-center justify-center">
            <InfoIcon className="w-full h-full" />
          </div>
          <div className="min-w-0">
            <div className="font-pixel-ui text-xs text-[#1e3a5f] font-bold mb-1">
              L3-OS // SYSTEM INFORMATION
            </div>
            <h2 className="font-pixel-ui text-base sm:text-lg text-[#111827] font-bold">
              L3-OS Workstation
            </h2>
            <p className="text-xs text-[#374151] mt-1">
              Web &amp; Application Development · System Modernization · Community Platforms
            </p>
          </div>
        </div>

        {/* Sanitized Metadata Matrix (Only Nationality alongside non-personal system metadata — no age or DOB) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs mt-4 pt-4 border-t border-[#808080]">
          <div className="p-2.5 bg-white x11-inset">
            <span className="text-[10px] font-pixel-ui text-[#4b5563] block">
              NATIONALITY
            </span>
            <span className="text-[#111827] font-semibold block mt-0.5">
              American (USA)
            </span>
          </div>
          <div className="p-2.5 bg-white x11-inset">
            <span className="text-[10px] font-pixel-ui text-[#4b5563] block">
              SYSTEM
            </span>
            <span className="text-[#111827] font-semibold block mt-0.5">
              L3-OS X11 Desktop
            </span>
          </div>
          <div className="p-2.5 bg-white x11-inset">
            <span className="text-[10px] font-pixel-ui text-[#4b5563] block">
              AVAILABILITY
            </span>
            <span className="text-[#15803d] font-semibold block mt-0.5">
              Open for Projects
            </span>
          </div>
        </div>
      </div>

      {/* Non-Personal Overview */}
      <div className="space-y-5 mb-6">
        <div>
          <h3 className="font-pixel-ui text-xs font-bold uppercase text-[#1e3a5f] mb-2">
            System Overview
          </h3>
          <div className="bg-white x11-inset p-4 text-[#1f2937] space-y-2 leading-relaxed">
            <p>
              L3-OS is an interactive retro Linux desktop environment showcasing live web and
              mobile applications, digital modernization services, and community-focused platforms.
            </p>
          </div>
        </div>

        {/* Direct Channels */}
        <div>
          <h3 className="font-pixel-ui text-xs font-bold uppercase text-[#1e3a5f] mb-2">
            Direct Channels
          </h3>
          <div className="flex flex-wrap gap-2.5">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 x11-btn-primary px-3.5 py-2 font-pixel-ui text-xs font-bold"
            >
              <span>Email: {CONTACT_EMAIL}</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 x11-btn px-3.5 py-2 font-pixel-ui text-xs font-bold"
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
