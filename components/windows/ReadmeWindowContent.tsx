import React from 'react';
import { WindowId } from '../../types';
import { CONTACT_EMAIL } from '@/constants';

interface ReadmeWindowContentProps {
  onOpenWindow: (windowId: WindowId) => void;
  isActive: boolean;
}

const ReadmeWindowContent: React.FC<ReadmeWindowContentProps> = ({ onOpenWindow }) => {
  return (
    <div
      className="h-full terminal-style p-4 sm:p-6 overflow-y-auto font-mono-body bg-[#ffffff] text-[#111827] text-[13px] sm:text-sm leading-relaxed"
      style={{
        height: '100%',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        wordBreak: 'break-word',
      }}
    >
      {/* Document Header */}
      <div className="border-b-2 border-[#808080] pb-4 mb-5">
        <div className="font-pixel-ui text-xs text-[#1e3a5f] mb-1">
          L3-OS Document Viewer — README
        </div>
        <h1 className="font-pixel-ui text-base sm:text-lg text-[#111827] font-bold">
          Practical Digital Solutions for Real-World Problems
        </h1>
      </div>

      <div className="space-y-5 mb-6">
        {/* 01. What I Do / Mission */}
        <div>
          <h2 className="font-pixel-ui text-xs text-[#1e3a5f] font-bold uppercase mb-2">
            01. What I Do / Mission
          </h2>
          <div className="bg-[#f3f4f6] x11-inset p-4 text-[#111827]">
            <p>
              Creating practical digital solutions for real-world problems—solving everyday
              challenges through clean, reliable technology.
            </p>
          </div>
        </div>

        {/* 02. Services Offered */}
        <div>
          <h2 className="font-pixel-ui text-xs text-[#1e3a5f] font-bold uppercase mb-2">
            02. Services Offered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="x11-outset p-4 space-y-1.5">
              <h3 className="font-pixel-ui text-xs text-[#1e3a5f] font-bold">
                Website &amp; App Development
              </h3>
              <p className="text-xs text-[#1f2937] leading-relaxed">
                End-to-end design, engineering, and deployment of modern web and mobile
                applications.
              </p>
            </div>

            <div className="x11-outset p-4 space-y-1.5">
              <h3 className="font-pixel-ui text-xs text-[#1e3a5f] font-bold">
                Redesign &amp; Modernization
              </h3>
              <p className="text-xs text-[#1f2937] leading-relaxed">
                Helping established businesses transition into the digital age by revitalizing
                outdated websites and applications.
              </p>
            </div>

            <div className="x11-outset p-4 space-y-1.5">
              <h3 className="font-pixel-ui text-xs text-[#1e3a5f] font-bold">
                Ongoing Management &amp; Support
              </h3>
              <p className="text-xs text-[#1f2937] leading-relaxed">
                Continuous maintenance, updates, and technical management so systems run smoothly.
              </p>
            </div>
          </div>
        </div>

        {/* 03. Community Impact */}
        <div>
          <h2 className="font-pixel-ui text-xs text-[#1e3a5f] font-bold uppercase mb-2">
            03. Community Impact
          </h2>
          <div className="bg-[#f3f4f6] x11-inset p-4 text-[#111827]">
            <p>
              Building targeted digital tools and platforms that help developing and third-world
              communities solve persistent daily problems.
            </p>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="pt-1 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onOpenWindow(WindowId.PROJECTS)}
            className="x11-btn-primary px-4 py-2 font-pixel-ui text-xs font-bold cursor-pointer whitespace-nowrap"
          >
            Open Projects
          </button>
          <button
            type="button"
            onClick={() => onOpenWindow(WindowId.CONTACT)}
            className="x11-btn px-4 py-2 font-pixel-ui text-xs font-bold cursor-pointer whitespace-nowrap"
          >
            Contact &amp; Inquiries
          </button>
        </div>
      </div>

      {/* Document Footer */}
      <div className="pt-3 border-t border-[#808080] flex flex-wrap items-center justify-between gap-2 text-xs text-[#4b5563]">
        <span>L3-OS Desktop Environment</span>
        <span className="text-[#1e3a5f] font-semibold">{CONTACT_EMAIL}</span>
      </div>
    </div>
  );
};

export default ReadmeWindowContent;
