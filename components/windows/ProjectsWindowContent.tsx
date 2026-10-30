import React, { useState } from 'react';
import { Project } from '../../types';
import { PROJECTS_DATA } from '@/constants';
import PulsingLight from '../PulsingLight';

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const [isOpen, setIsOpen] = useState(project.detailsInitiallyOpen || false);
  const readableStatus = project.statusText.replace('STATUS_', '').replace(/_/g, ' ');

  return (
    <div className="border border-white/[0.08] bg-white/[0.02] rounded-xl p-4 sm:p-5 transition-all duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <PulsingLight color={project.statusColor} />
          <h3 className="font-['JetBrains_Mono'] text-base font-semibold text-white">
            {project.name}
          </h3>
          <span className="text-zinc-600 text-xs" aria-hidden="true">·</span>
          <span
            className={`font-['JetBrains_Mono'] text-xs font-medium px-2 py-0.5 rounded ${
              project.statusColor === 'green'
                ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20'
                : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
            }`}
          >
            {readableStatus}
          </span>
        </div>

        {project.launchUrl && (
          <a
            href={project.launchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-zinc-950 hover:bg-zinc-200 px-4 py-2 rounded-lg text-xs font-['JetBrains_Mono'] font-medium transition-all shadow-[0_4px_16px_rgba(255,255,255,0.15)] whitespace-nowrap self-start sm:self-auto"
          >
            <span>Launch Live App</span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>

      {project.description && (
        <p className="text-xs text-zinc-400 font-['JetBrains_Mono'] leading-relaxed mb-3">
          {project.description}
        </p>
      )}

      {project.launchUrl && (
        <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06] text-xs font-['JetBrains_Mono'] text-zinc-500">
          <span>Endpoint:</span>
          <a
            href={project.launchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white underline underline-offset-2 truncate"
          >
            {project.launchUrl}
          </a>
        </div>
      )}
    </div>
  );
};

const ProjectsWindowContent: React.FC = () => {
  return (
    <div className="h-full terminal-style p-4 sm:p-6 overflow-y-auto font-['JetBrains_Mono'] text-zinc-100 bg-transparent">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-3 mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-400">// DEPLOYMENTS & LIVE SYSTEMS</p>
          <h2 className="text-sm sm:text-base font-semibold text-white">Featured Project</h2>
        </div>
        <span className="text-xs font-['JetBrains_Mono'] text-zinc-500">
          1 Active Deployment
        </span>
      </div>

      {/* Projects List */}
      <div className="space-y-4 mb-6">
        {PROJECTS_DATA.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>

      {/* Staging notice for new upcoming projects */}
      <div className="p-4 rounded-xl border border-dashed border-white/[0.12] bg-white/[0.01] text-xs text-zinc-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-zinc-300 font-medium mb-0.5">Additional Projects in Staging</p>
          <p className="text-zinc-500">New Web3, mapping, and decentralized protocol repositories will be indexed here shortly.</p>
        </div>
        <span className="text-[11px] font-['JetBrains_Mono'] text-zinc-500 whitespace-nowrap bg-white/[0.04] px-2.5 py-1 rounded">
          QUEUE_STANDBY
        </span>
      </div>
    </div>
  );
};

export default ProjectsWindowContent;
