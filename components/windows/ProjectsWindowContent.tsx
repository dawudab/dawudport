import React from 'react';
import { Project } from '../../types';
import { PROJECTS_DATA } from '@/constants';
import PixelProjectBanner from '../PixelProjectBanner';
import PulsingLight from '../PulsingLight';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const readableStatus = project.statusText.replace('STATUS_', '').replace(/_/g, ' ');

  return (
    <article
      id={`project-card-${project.id}`}
      className="rounded-none x11-outset p-3 sm:p-4 flex flex-col justify-between gap-3 text-[#111827]"
    >
      <div className="space-y-2.5">
        {/* 1. Project Header & Title */}
        <div className="flex items-start justify-between gap-2 border-b border-[#808080] pb-2">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono-body text-xs font-bold text-[#4b5563] tabular-nums shrink-0">
                {String(index + 1).padStart(2, '0')}.
              </span>
              <h3 className="font-pixel-ui text-sm sm:text-base font-bold text-[#111827] leading-snug break-words">
                {project.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
            <PulsingLight color={project.statusColor} />
            <span className="font-mono-body text-[11px] font-semibold text-[#111827]">
              {readableStatus}
            </span>
          </div>
        </div>

        {/* 2. Prominent Role Badge */}
        <div className="bg-[#1e3a5f] text-white px-2.5 py-1.5 border-t border-l border-[#60a5fa] border-r border-b border-[#0f172a] flex flex-wrap items-center gap-1.5">
          <span className="font-pixel-ui text-[10px] uppercase tracking-wider text-[#93c5fd] shrink-0">
            Role:
          </span>
          <span className="font-pixel-ui text-xs font-bold text-white leading-snug">
            {project.role}
          </span>
        </div>

        {/* 3. Simple Pixelated Mission Illustration */}
        <PixelProjectBanner projectId={project.id} projectName={project.name} />

        {/* 4. Clean, Readable Description on Sunken Light Panel */}
        <div className="bg-white x11-inset p-3 text-[#111827]">
          <p className="text-[14px] sm:text-[15px] font-mono-body leading-relaxed text-[#111827]">
            {project.description}
          </p>
        </div>
      </div>

      {/* 5. Full-Width / Accessible [ Launch Project ↗ ] Button */}
      <div className="pt-1">
        <a
          href={project.launchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 x11-btn-primary px-4 py-2.5 font-pixel-ui text-xs sm:text-sm font-bold whitespace-nowrap cursor-pointer"
        >
          <span>[ Launch Project ↗ ]</span>
        </a>
      </div>
    </article>
  );
};

const ProjectsWindowContent: React.FC = () => {
  return (
    <div className="h-full terminal-style p-3 sm:p-4 overflow-y-auto overflow-x-hidden overscroll-contain font-mono-body bg-[#e5e7eb] text-[#111827]">
      {/* Clean Retro Linux Path Header */}
      <div className="x11-outset p-2.5 sm:p-3 mb-3.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="font-pixel-ui text-xs font-bold text-[#111827] shrink-0">
            Path:
          </span>
          <div className="bg-white x11-inset px-2.5 py-1 text-xs font-mono-body text-[#111827] truncate flex-1">
            /home/user/projects
          </div>
        </div>

        <div className="bg-white x11-inset px-2.5 py-1 text-xs font-pixel-ui font-bold text-[#1e3a5f] shrink-0">
          {PROJECTS_DATA.length} items
        </div>
      </div>

      {/* Straightforward, Scannable Projects Grid (Single-column on mobile, 2-column on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 pb-6">
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsWindowContent;
