'use client';

import React, { useState, useEffect, useCallback } from 'react';
import StarWarsCrawl from '@/components/StarWarsCrawl';
import LanguageToggle from '@/components/LanguageToggle';
import { useI18n } from '@/lib/i18n';

type CrawlPhase = 'logo-center' | 'logo-flying' | 'intro' | 'crawl' | 'done';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
}

const projects: Project[] = [
  {
    id: 'sihlhack',
    title: 'SihlHack',
    description: 'Participant-driven energy hackathon platform where hackers unlock Zurich\'s industrial heritage data to innovate on decentralized energy, compute, and resilience.',
    tags: ['Next.js', 'React 19', 'Three.js', 'Drizzle ORM', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://sihlhack.ch',
  },
  {
    id: 'luckhack',
    title: 'LuckHack',
    description: 'CTF-style statistics hackathon with SSH terminal access. Teams solve probability and statistics challenges in a terminal environment.',
    tags: ['Go', 'PostgreSQL', 'SSH', 'Next.js', 'Docker', 'Caddy'],
    liveUrl: 'https://luckhack.ch',
  },
  {
    id: 'openleg',
    title: 'openLEG',
    description: 'Swiss-sovereign AI compute prototype using retired servers, solar energy, heat recovery, and local observability.',
    tags: ['Python', 'FastAPI', 'DuckDB', 'TimescaleDB', 'Grafana', 'Docker'],
    liveUrl: 'https://openleg.ch',
  },
];

export default function Home() {
  const { t } = useI18n();

  const [crawlDone, setCrawlDone] = useState(false);
  const [crawlPhase, setCrawlPhase] = useState<CrawlPhase>('logo-center');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleCrawlComplete = useCallback(() => {
    setCrawlDone(true);
  }, []);

  const handlePhaseChange = useCallback((phase: CrawlPhase) => {
    setCrawlPhase(phase);
  }, []);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      const isInteractive = target.matches('a, button, [role="button"], [data-interactive]') ||
        target.closest('a, button, [role="button"], [data-interactive]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  const getLogoStyle = (): React.CSSProperties => {
    if (!isDesktop) {
      return {
        position: 'fixed', top: '0.75rem', left: '0.75rem',
        width: '36px', height: '36px', zIndex: 60, borderRadius: '50%', opacity: 1,
      };
    }
    if (crawlPhase === 'logo-center') {
      return {
        position: 'fixed', top: '50%', left: '50%',
        width: '160px', height: '160px', transform: 'translate(-50%, -50%)',
        zIndex: 60, borderRadius: '50%', animation: 'logoFadeIn 1.5s ease-out forwards',
      };
    }
    if (crawlPhase === 'logo-flying') {
      return {
        position: 'fixed', top: '50%', left: '50%',
        width: '160px', height: '160px', zIndex: 60, borderRadius: '50%',
        animation: 'logoFly 2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
      };
    }
    return {
      position: 'fixed', top: '1rem', left: '1rem',
      width: '48px', height: '48px', zIndex: 60, borderRadius: '50%',
      transition: 'all 0.3s ease',
    };
  };

  return (
    <main id="main-content" className="min-h-screen relative bg-black" tabIndex={-1}>
      <div className="stars-small" />
      <div className="stars-medium" />
      <div className="stars-large" />

      <div
        className={`custom-cursor hidden md:block ${isHovering ? 'hover' : ''}`}
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      />

      <LanguageToggle />

      <div style={getLogoStyle()}>
        <img
          src="/design-tokens/logos/sihliconvalley/icon.svg"
          alt="Sihliconvalley"
          className="w-full h-full object-contain rounded-full"
        />
      </div>

      {!crawlDone && (
        <StarWarsCrawl
          onComplete={handleCrawlComplete}
          onPhaseChange={handlePhaseChange}
        />
      )}

      {crawlDone && (
        <div className="projects-enter">
          <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 pt-24 md:pt-32 pb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-river font-terminal mb-10 md:mb-16">
              {t('nav.exploreProjects')}
            </h2>

            <div className="flex flex-col gap-8 md:gap-12">
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-interactive
                  className="block border border-purple/40 rounded-lg p-6 md:p-8 hover:border-purple transition-colors bg-black/40"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-yellow-river font-terminal mb-3">
                    {t(`projects.${project.id}.title`)}
                  </h3>
                  <p className="text-light-gray/80 font-terminal text-base md:text-lg leading-relaxed">
                    {t(`projects.${project.id}.description`)}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <footer className="py-8 text-center border-t border-purple/20">
            <p className="text-light-gray/60 font-terminal text-sm">
              {t('footer.builtIn')} <span className="text-mint-text">Sihliconvalley</span>
              <span className="mx-2 text-light-gray/30">|</span>
              <a href="https://gusty.ch" target="_blank" rel="noopener noreferrer" className="text-mint-text/70 hover:text-mint-text transition-colors" data-interactive>
                gusty.ch
              </a>
            </p>
          </footer>
        </div>
      )}

    </main>
  );
}
