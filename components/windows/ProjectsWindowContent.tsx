import React, { useState } from 'react';
import { Project } from '../../types';
import { PROJECTS_DATA } from '@/constants';
import PixelProjectAnimation from '../PixelProjectAnimation';
import ProjectDemoGame from '../ProjectDemoGame';
import PulsingLight from '../PulsingLight';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDemo: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpenDemo }) => {
  const readableStatus = project.statusText.replace('STATUS_', '').replace(/_/g, ' ');

  return (
    <article
      id={`project-card-${project.id}`}
      className="rounded-none x11-outset p-3 sm:p-4 flex flex-col justify-between gap-3 text-[#111827]"
    >
      <div className="space-y-2.5">
        {/* 1. Header: Project Title + Animated Pixel Preview Banner */}
        <div className="space-y-2">
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

          <PixelProjectAnimation projectId={project.id} projectName={project.name} />
        </div>

        {/* 2. My Role */}
        <div className="bg-[#1e3a5f] text-white px-2.5 py-1.5 border-t border-l border-[#60a5fa] border-r border-b border-[#0f172a] flex flex-wrap items-center gap-1.5">
          <span className="font-pixel-ui text-[10px] uppercase tracking-wider text-[#93c5fd] shrink-0">
            My Role:
          </span>
          <span className="font-pixel-ui text-xs font-bold text-white leading-snug">
            {project.role}
          </span>
        </div>

        {/* 3. My Contribution */}
        <div className="bg-white x11-inset p-3 text-[#111827] space-y-1">
          <div className="font-pixel-ui text-[10px] font-bold uppercase tracking-wider text-[#1e3a5f]">
            My Contribution
          </div>
          <p className="text-[13px] sm:text-[14px] font-mono-body leading-relaxed text-[#111827]">
            {project.contribution}
          </p>
        </div>

        {/* 4. Mission Goal */}
        <div className="bg-[#f8fafc] x11-inset p-3 text-[#111827] space-y-1">
          <div className="font-pixel-ui text-[10px] font-bold uppercase tracking-wider text-[#15803d]">
            Mission Goal
          </div>
          <p className="text-[13px] sm:text-[14px] font-mono-body leading-relaxed text-[#1f2937]">
            {project.missionGoal}
          </p>
        </div>
      </div>

      {/* 5. Action Buttons: [ Demo ] & [ Visit Site ↗ ] */}
      <div className="pt-1 flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={() => onOpenDemo(project)}
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 x11-btn px-3 py-2.5 font-pixel-ui text-xs sm:text-sm font-bold whitespace-nowrap cursor-pointer"
        >
          <span>[ Demo ]</span>
        </button>

        <a
          href={project.launchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 x11-btn-primary px-3 py-2.5 font-pixel-ui text-xs sm:text-sm font-bold whitespace-nowrap cursor-pointer"
        >
          <span>[ Visit Site ↗ ]</span>
        </a>
      </div>
    </article>
  );
};

const ProjectsWindowContent: React.FC = () => {
  const [activeDemoProject, setActiveDemoProject] = useState<Project | null>(null);

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

      {/* Filter-free Projects Grid (Single-column on mobile, 2-column on wide desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 pb-6">
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpenDemo={setActiveDemoProject}
          />
        ))}
      </div>

      {activeDemoProject && (
        <ProjectDemoGame
          project={activeDemoProject}
          onClose={() => setActiveDemoProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectsWindowContent;
