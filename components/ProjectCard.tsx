'use client';

import Image from 'next/image';
import { useI18n } from '@/lib/i18n';

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  column: 'design' | 'ai' | 'bridged' | 'danger';
  status?: 'live' | 'development' | 'archived';
  liveUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  activeFilter?: 'design' | 'ai' | 'bridged' | null;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { t } = useI18n();

  const translatedTitle = t(`projects.${project.id}.title`);
  const translatedDesc = t(`projects.${project.id}.description`);
  const title = translatedTitle !== `projects.${project.id}.title` ? translatedTitle : project.title;
  const description = translatedDesc !== `projects.${project.id}.description` ? translatedDesc : project.description;

  const getBgColor = () => {
    if (project.column === 'design') return 'bg-purple/30 md:bg-navy-bg/80 border border-purple/40';
    if (project.column === 'ai') return 'bg-mint-text/10 md:bg-navy-bg/80 border border-mint-text/30';
    if (project.column === 'bridged') return 'bg-transparent md:bg-navy-bg/80 border border-purple/30';
    return 'bg-navy-bg/80 border border-purple/30';
  };

  return (
    <article
      className={`w-full ${getBgColor()} p-4 md:p-6 rounded-lg shadow-lg cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-dot focus-within:ring-offset-2 font-terminal relative`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View project: ${title}`}
      data-interactive
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {project.column === 'bridged' && (
        <div className="md:hidden absolute inset-0 bg-gradient-to-r from-purple/40 to-mint-text/20 rounded-lg z-0"></div>
      )}

      {project.imageUrl && (
        <div className="relative w-full h-48 mb-4 rounded overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 font-terminal text-yellow-river relative z-10">
        {title}
      </h3>

      <p className="text-xs md:text-sm mb-3 md:mb-4 font-terminal relative z-10 text-light-gray/80">
        {description}
      </p>

    </article>
  );
}
