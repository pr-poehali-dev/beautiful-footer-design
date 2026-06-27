import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { heroCities, type HeroCity } from '@/data/content';

const HeroCitiesMap = () => {
  const [active, setActive] = useState<HeroCity | null>(heroCities[0]);

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-6">
      <div className="relative aspect-[4/3] rounded-2xl border border-border bg-card grain overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none">
          <path d="M20,30 Q35,18 55,24 T85,30 Q90,45 80,60 T60,78 Q40,82 28,70 T20,30 Z" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.4" />
        </svg>

        {heroCities.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c)}
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            aria-label={c.name}
          >
            <span className={`absolute inset-0 m-auto h-3 w-3 rounded-full ${active?.id === c.id ? 'bg-primary animate-ping-slow' : 'bg-accent/60'}`} />
            <span className={`relative block h-3 w-3 rounded-full ring-2 ring-background transition-transform group-hover:scale-150 ${active?.id === c.id ? 'bg-primary' : 'bg-accent'}`} />
            <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-[10px] font-display uppercase tracking-wide text-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity">
              {c.name}
            </span>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
        {active && (
          <div key={active.id} className="animate-float-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center">
                <Icon name="Star" className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-display uppercase leading-none">{active.name}</h3>
                <span className="text-xs text-muted-foreground">Звание присвоено в {active.year} г.</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{active.desc}</p>
          </div>
        )}
        <div className="mt-auto pt-6 text-xs text-muted-foreground/70 flex items-center gap-2">
          <Icon name="MousePointerClick" size={14} />
          Нажмите на точку на карте
        </div>
      </div>
    </div>
  );
};

export default HeroCitiesMap;
