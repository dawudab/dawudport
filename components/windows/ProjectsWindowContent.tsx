import React, { useState } from 'react';
import { Project, ThemeMode } from '../../types';
import { PROJECTS_DATA } from '@/constants';
import PulsingLight from '../PulsingLight';

interface ExpandableProjectPreviewProps {
  project: Project;
  isExpanded: boolean;
  onToggleExpand: () => void;
  theme: ThemeMode;
}

const ExpandableProjectPreview: React.FC<ExpandableProjectPreviewProps> = ({
  project,
  isExpanded,
  onToggleExpand,
  theme,
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const isDark = theme === 'dark';
  const readableStatus = project.statusText.replace('STATUS_', '').replace(/_/g, ' ');

  return (
    <div
      className={`group rounded-2xl backdrop-blur-2xl transition-all duration-300 flex flex-col overflow-hidden border ${
        isDark
          ? isExpanded
            ? 'bg-gradient-to-b from-white/[0.11] via-white/[0.05] to-white/[0.02] border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_16px_40px_rgba(0,0,0,0.55)]'
            : 'bg-gradient-to-b from-white/[0.07] to-white/[0.02] border-white/[0.15] hover:border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_8px_28px_rgba(0,0,0,0.4)]'
          : isExpanded
          ? 'bg-gradient-to-b from-white/95 via-white/90 to-slate-50/90 border-slate-900/25 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_16px_36px_rgba(15,23,42,0.12)]'
          : 'bg-gradient-to-b from-white/80 to-white/60 border-slate-900/[0.12] hover:border-slate-900/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_20px_rgba(15,23,42,0.06)]'
      }`}
    >
      {/* Top Card Row: Thumbnail + Title + Expand Trigger */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div
          className="flex items-center gap-3.5 min-w-0 flex-1 cursor-pointer"
          onClick={onToggleExpand}
        >
          {/* Generated Project Thumbnail */}
          <div
            className={`relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 border transition-transform duration-300 group-hover:scale-[1.03] ${
              isDark ? 'border-white/20 bg-zinc-900/80' : 'border-slate-900/15 bg-slate-100'
            }`}
          >
            {project.thumbnailUrl && !imgFailed ? (
              <img
                src={project.thumbnailUrl}
                alt={`${project.name} thumbnail preview`}
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sky-500/20 via-emerald-500/15 to-indigo-500/20 text-xs font-['JetBrains_Mono'] font-semibold">
                τ
              </div>
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-xl pointer-events-none" />
          </div>

          {/* Project Title & Brief Description */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <PulsingLight color={project.statusColor} />
              <h3
                className={`font-['JetBrains_Mono'] text-sm sm:text-base font-semibold truncate ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {project.name}
              </h3>
              <span className={isDark ? 'text-zinc-600 text-xs' : 'text-slate-400 text-xs'}>
                ·
              </span>
              <span
                className={`font-['JetBrains_Mono'] text-[11px] font-medium ${
                  isDark ? 'text-emerald-400' : 'text-emerald-600'
                }`}
              >
                {readableStatus}
              </span>
            </div>

            {project.category && (
              <p
                className={`text-[11px] font-['JetBrains_Mono'] mb-1 ${
                  isDark ? 'text-zinc-400' : 'text-slate-500'
                }`}
              >
                {project.category}
              </p>
            )}

            {project.description && (
              <p
                className={`text-xs font-['Plus_Jakarta_Sans'] line-clamp-1 ${
                  isDark ? 'text-zinc-300' : 'text-slate-600'
                }`}
              >
                {project.description}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons: Expand Preview Toggle & Direct Launch */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            onClick={onToggleExpand}
            aria-expanded={isExpanded}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-['JetBrains_Mono'] cursor-pointer transition-all border active:scale-95 ${
              isDark
                ? isExpanded
                  ? 'bg-white/[0.15] text-white border-white/35'
                  : 'bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 border-white/15'
                : isExpanded
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-slate-900/[0.06] hover:bg-slate-900/[0.12] text-slate-800 border-slate-900/15'
            }`}
          >
            <span>{isExpanded ? 'Hide Preview' : 'Preview'}</span>
            <span
              className={`inline-block transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            >
              ▾
            </span>
          </button>

          {project.launchUrl && (
            <a
              href={project.launchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-['JetBrains_Mono'] font-medium transition-all whitespace-nowrap active:scale-95 ${
                isDark
                  ? 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-[0_4px_14px_rgba(255,255,255,0.16)]'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-[0_4px_14px_rgba(15,23,42,0.18)]'
              }`}
            >
              <span>Open</span>
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Expandable Glassmorphic Preview Drawer */}
      {isExpanded && (
        <div
          className={`px-4 pb-4 sm:px-5 sm:pb-5 pt-3 border-t transition-all duration-300 ${
            isDark
              ? 'border-white/[0.10] bg-zinc-950/40'
              : 'border-slate-900/[0.08] bg-slate-100/60'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* Larger Preview Image in Expanded Mode */}
            <div className="sm:col-span-5">
              <a
                href={project.launchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block relative rounded-xl overflow-hidden border aspect-video group/img ${
                  isDark ? 'border-white/20 bg-zinc-900' : 'border-slate-900/15 bg-slate-200'
                }`}
              >
                {project.thumbnailUrl && !imgFailed ? (
                  <img
                    src={project.thumbnailUrl}
                    alt={`${project.name} expanded preview`}
                    referrerPolicy="no-referrer"
                    onError={() => setImgFailed(true)}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/img:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm font-['JetBrains_Mono']">
                    {project.name}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[11px] font-['JetBrains_Mono'] text-white/95 flex items-center gap-1">
                    <span>Click to launch live application</span>
                    <span>↗</span>
                  </span>
                </div>
              </a>
            </div>

            {/* Detailed Summary, Highlights & Clickable URL */}
            <div className="sm:col-span-7 flex flex-col justify-between space-y-3">
              <div>
                <div
                  className={`text-[11px] font-['JetBrains_Mono'] uppercase tracking-wider mb-1 ${
                    isDark ? 'text-sky-400' : 'text-sky-700'
                  }`}
                >
                  // System Overview
                </div>
                <p
                  className={`text-xs sm:text-[13px] font-['Plus_Jakarta_Sans'] leading-relaxed ${
                    isDark ? 'text-zinc-200' : 'text-slate-700'
                  }`}
                >
                  {project.fullSummary || project.description}
                </p>
              </div>

              {project.highlights && project.highlights.length > 0 && (
                <div
                  className={`text-xs font-['JetBrains_Mono'] ${
                    isDark ? 'text-zinc-400' : 'text-slate-600'
                  }`}
                >
                  {project.highlights.join(' · ')}
                </div>
              )}

              {project.launchUrl && (
                <div
                  className={`pt-2.5 border-t flex flex-wrap items-center justify-between gap-2 ${
                    isDark ? 'border-white/[0.08]' : 'border-slate-900/[0.08]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <span
                      className={`text-[11px] font-['JetBrains_Mono'] block ${
                        isDark ? 'text-zinc-500' : 'text-slate-500'
                      }`}
                    >
                      LIVE ENDPOINT
                    </span>
                    <a
                      href={project.launchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs font-['JetBrains_Mono'] underline underline-offset-2 truncate block ${
                        isDark
                          ? 'text-sky-300 hover:text-white'
                          : 'text-sky-700 hover:text-slate-950'
                      }`}
                    >
                      {project.launchUrl}
                    </a>
                  </div>

                  <a
                    href={project.launchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-['JetBrains_Mono'] font-semibold text-xs px-3.5 py-2 rounded-lg transition-all shadow-[0_4px_14px_rgba(16,185,129,0.25)] whitespace-nowrap"
                  >
                    <span>Launch Website</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface ProjectsWindowContentProps {
  theme?: ThemeMode;
}

const ProjectsWindowContent: React.FC<ProjectsWindowContentProps> = ({ theme = 'dark' }) => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    PROJECTS_DATA.forEach((p, index) => {
      initial[p.id] = index === 0 || Boolean(p.detailsInitiallyOpen);
    });
    return initial;
  });

  const isDark = theme === 'dark';

  const toggleProject = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const allExpanded = PROJECTS_DATA.every((p) => expandedIds[p.id]);

  const toggleAll = () => {
    const nextState = !allExpanded;
    const updated: Record<string, boolean> = {};
    PROJECTS_DATA.forEach((p) => {
      updated[p.id] = nextState;
    });
    setExpandedIds(updated);
  };

  return (
    <div
      className={`h-full terminal-style p-4 sm:p-6 overflow-y-auto font-['JetBrains_Mono'] bg-transparent ${
        isDark ? 'text-zinc-100' : 'text-slate-900'
      }`}
    >
      {/* Header */}
      <div
        className={`border-b pb-3.5 mb-5 flex flex-wrap items-center justify-between gap-3 ${
          isDark ? 'border-white/[0.10]' : 'border-slate-900/[0.10]'
        }`}
      >
        <div>
          <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
            // DEPLOYMENTS & LIVE SYSTEMS · CLICK ANY CARD TO PREVIEW
          </p>
          <h2
            className={`text-base sm:text-lg font-semibold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Portfolio Projects ({PROJECTS_DATA.length})
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleAll}
            className={`text-xs font-['JetBrains_Mono'] px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
              isDark
                ? 'text-zinc-200 bg-white/[0.06] hover:bg-white/[0.12] border-white/15'
                : 'text-slate-700 bg-slate-900/[0.05] hover:bg-slate-900/[0.10] border-slate-900/15'
            }`}
          >
            {allExpanded ? 'Collapse All Previews' : 'Expand All Previews'}
          </button>
        </div>
      </div>

      {/* Consistent 2-Column Grid Layout with Generated Thumbnails & Expandable Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-6">
        {PROJECTS_DATA.map((project) => (
          <ExpandableProjectPreview
            key={project.id}
            project={project}
            isExpanded={Boolean(expandedIds[project.id])}
            onToggleExpand={() => toggleProject(project.id)}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsWindowContent;
