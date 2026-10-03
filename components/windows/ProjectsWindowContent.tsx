
import React, { useState } from 'react';
import { Project } from '../../types';
import { PROJECTS_DATA } from '@/constants'; // Changed from ../../constants
import PulsingLight from '../PulsingLight';

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const [isOpen, setIsOpen] = useState(project.detailsInitiallyOpen || false);

  return (
    <div className="mb-2">
      <div
        className={`flex items-center gap-3 cursor-pointer mb-0 ${project.launchUrl ? 'hover:text-white' : ''}`}
        onClick={() => project.launchUrl && setIsOpen(!isOpen)}
      >
        <PulsingLight color={project.statusColor} />
        <p className="flex-grow font-['Share_Tech_Mono'] text-base">
          &gt; {project.name}{' '}
          <span className={project.statusColor === 'green' ? 'text-green-400' : 'text-yellow-400'}>
            :: {project.statusText}
          </span>
        </p>
        {project.launchUrl && (
           <span className={`transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45' : ''}`}>[+]</span>
        )}
      </div>
      {project.launchUrl && isOpen && (
        <div className="pl-[calc(0.75rem+10px+0.75rem)] mt-2"> {/* Indent past light and gap */}
          <button
            className="bg-transparent border border-[#00ff41] text-[#00ff41] px-3 py-1 cursor-pointer font-['Share_Tech_Mono'] text-shadow-none hover:bg-[#00ff41] hover:text-[#0d0d0d]"
            onClick={() => window.open(project.launchUrl, '_blank')}
          >
            Launch App
          </button>
        </div>
      )}
    </div>
  );
};

const ProjectsWindowContent: React.FC = () => {
  const activeBounties = PROJECTS_DATA.filter(p => p.statusColor === 'green');
  const queuedTransmissions = PROJECTS_DATA.filter(p => p.statusColor === 'yellow');

  return (
    <div className="h-full terminal-style p-4 overflow-y-auto font-['Share_Tech_Mono'] text-[#00ff41] bg-[#0d0d0d]">
      {activeBounties.length > 0 && (
        <>
          <p className="text-amber-400 text-lg mb-2">[ACTIVE BOUNTIES]</p>
          {activeBounties.map(project => <ProjectItem key={project.id} project={project} />)}
          <br/>
        </>
      )}

      {queuedTransmissions.length > 0 && (
         <>
          <p className="text-amber-400 text-lg mb-2">[QUEUED TRANSMISSIONS]</p>
          {queuedTransmissions.map(project => <ProjectItem key={project.id} project={project} />)}
        </>
      )}
    </div>
  );
};

export default ProjectsWindowContent;
