'use client';

import { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';

type Phase = 'logo-center' | 'logo-flying' | 'intro' | 'crawl' | 'done';

interface StarWarsCrawlProps {
  onComplete: () => void;
  onPhaseChange?: (phase: Phase) => void;
}

const SCROLL_DURATION = 43.0; // 20% slower than previous 35.8s

export default function StarWarsCrawl({ onComplete, onPhaseChange }: StarWarsCrawlProps) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>('logo-center');
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    if (!isDesktop) {
      setPhase('intro');
      onPhaseChange?.('intro');

      timers.push(setTimeout(() => {
        setPhase('crawl');
        onPhaseChange?.('crawl');
      }, 2500));

      timers.push(setTimeout(() => {
        setPhase('done');
        onPhaseChange?.('done');
        onComplete();
      }, 2500 + (SCROLL_DURATION * 1000) + 2000));
    } else {
      setPhase('logo-center');
      onPhaseChange?.('logo-center');

      timers.push(setTimeout(() => {
        setPhase('logo-flying');
        onPhaseChange?.('logo-flying');
      }, 2500));

      timers.push(setTimeout(() => {
        setPhase('intro');
        onPhaseChange?.('intro');
      }, 4500));

      timers.push(setTimeout(() => {
        setPhase('crawl');
        onPhaseChange?.('crawl');
      }, 7000));

      timers.push(setTimeout(() => {
        setPhase('done');
        onPhaseChange?.('done');
        onComplete();
      }, 7000 + (SCROLL_DURATION * 1000) + 2000));
    }

    return () => timers.forEach(clearTimeout);
  }, [isDesktop, onComplete, onPhaseChange]);

  if (phase === 'done') return null;

  return (
    <div className="crawl-container">
      {phase === 'intro' && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ animation: 'introFade 2.5s ease-in-out forwards' }}
        >
          <p className="text-yellow-river font-terminal tracking-[0.15em] text-center px-6 md:px-12 uppercase leading-relaxed text-7xl md:text-9xl lg:text-9xl" style={{ fontSize: 'clamp(4.5rem, 8vw, 10rem)' }}>
            {t('crawl.intro')}
          </p>
        </div>
      )}

      {phase === 'crawl' && (
        <div className="crawl-perspective">
          <div
            className="crawl-scroll-wrapper"
            style={{ '--scroll-duration': `${SCROLL_DURATION}s` } as React.CSSProperties}
          >
            <p className="text-yellow-river font-terminal leading-relaxed text-6xl md:text-8xl lg:text-9xl text-center mb-16 md:mb-20">
              {t('crawl.p1')}
            </p>
            <p className="text-yellow-river font-terminal leading-relaxed text-6xl md:text-8xl lg:text-9xl text-center mb-16 md:mb-20">
              {t('crawl.p2')}
            </p>
            <p className="text-yellow-river font-terminal leading-relaxed text-6xl md:text-8xl lg:text-9xl text-center mb-16 md:mb-20">
              {t('crawl.p3')}
            </p>
            <p className="text-yellow-river font-terminal leading-relaxed text-6xl md:text-8xl lg:text-9xl text-center mb-16 md:mb-20">
              {t('crawl.p4')}
            </p>
            <p className="text-yellow-river font-terminal leading-relaxed text-6xl md:text-8xl lg:text-9xl text-center mb-40 md:mb-56">
              {t('crawl.p5')}
            </p>
            <p className="text-yellow-river font-terminal leading-relaxed text-6xl md:text-8xl lg:text-9xl text-center mb-20 md:mb-28">
              {t('crawl.joke')}
            </p>
            <p className="text-yellow-river font-terminal leading-relaxed text-6xl md:text-8xl lg:text-9xl text-center mb-20 md:mb-28">
              {t('crawl.p6')}
            </p>
            <p className="text-yellow-river font-terminal leading-relaxed text-6xl md:text-8xl lg:text-9xl text-center">
              {t('crawl.p7')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
