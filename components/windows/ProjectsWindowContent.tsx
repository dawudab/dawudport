
import React, { useState } from 'react';
import { Project } from '../../types';
import { PROJECTS_DATA } from '@/constants'; // Changed from ../../constants
import PulsingLight from '../PulsingLight';

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const [isOpen, setIsOpen] = useState(project.detailsInitiallyOpen || false);

  const readableStatus = project.statusText.replace('STATUS_', '').replace(/_/g, ' ');

  return (
    <div className="border-b border-white/[0.06] last:border-b-0 py-2.5">
      <div
        className={`flex items-center justify-between gap-3 ${
          project.launchUrl ? 'cursor-pointer group' : ''
        }`}
        onClick={() => project.launchUrl && setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <PulsingLight color={project.statusColor} />
          <p className="font-['JetBrains_Mono'] text-sm text-zinc-100 group-hover:text-white transition-colors truncate">
            {project.name}
          </p>
          <span className="text-zinc-600 text-xs" aria-hidden="true">·</span>
          <span
            className={`font-['JetBrains_Mono'] text-xs tracking-tight ${
              project.statusColor === 'green' ? 'text-emerald-400' : 'text-amber-400'
            }`}
          >
            {readableStatus}
          </span>
        </div>
        {project.launchUrl && (
          <span className="text-zinc-500 group-hover:text-zinc-200 font-['JetBrains_Mono'] text-xs transition-colors">
            {isOpen ? '−' : '+'}
          </span>
        )}
      </div>
      {project.launchUrl && isOpen && (
        <div className="pl-5 mt-2.5 flex items-center gap-3">
          <a
            href={project.launchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white text-zinc-950 hover:bg-zinc-200 px-3.5 py-1.5 rounded-lg text-xs font-['JetBrains_Mono'] font-medium transition-colors whitespace-nowrap shadow-[0_4px_16px_rgba(255,255,255,0.15)]"
          >
            <span>Launch Application</span>
            <span aria-hidden="true">↗</span>
          </a>
          <span className="text-zinc-500 font-['JetBrains_Mono'] text-xs truncate">
            {project.launchUrl}
          </span>
        </div>
      )}
    </div>
  );
};

const ProjectsWindowContent: React.FC = () => {
  const activeBounties = PROJECTS_DATA.filter(p => p.statusColor === 'green');
  const queuedTransmissions = PROJECTS_DATA.filter(p => p.statusColor === 'yellow');

  return (
    <div className="h-full terminal-style p-4 sm:p-5 overflow-y-auto font-['JetBrains_Mono'] text-zinc-100 bg-transparent">
      {activeBounties.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-medium text-zinc-400 tracking-wider mb-2">
            Active Deployments
          </p>
          <div className="divide-y divide-white/[0.06]">
            {activeBounties.map(project => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {queuedTransmissions.length > 0 && (
        <div>
          <p className="text-xs font-medium text-zinc-400 tracking-wider mb-2">
            Queued Subnets & Protocols
          </p>
          <div className="divide-y divide-white/[0.06]">
            {queuedTransmissions.map(project => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsWindowContent;
