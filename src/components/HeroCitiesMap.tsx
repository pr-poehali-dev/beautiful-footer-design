import { useState } from 'react';
import Icon from '@/components/ui/icon';
import UssrMap from '@/components/UssrMap';
import { heroCities, type HeroCity } from '@/data/content';

const HeroCitiesMap = () => {
  const [active, setActive] = useState<HeroCity>(heroCities[0]);

  return (
    <div className="grid lg:grid-cols-[1fr_340px] gap-6">
      <div className="relative rounded-2xl border border-border bg-card grain overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 pointer-events-none" />
        <UssrMap className="relative w-full h-auto">
          {heroCities.map((c) => {
            const on = active.id === c.id;
            return (
              <g key={c.id} className="cursor-pointer" onClick={() => setActive(c)}>
                {on && <circle cx={c.cx} cy={c.cy} r="16" fill="hsl(var(--primary) / 0.25)" className="animate-ping-slow" />}
                <circle
                  cx={c.cx}
                  cy={c.cy}
                  r={on ? 9 : 6}
                  fill={on ? 'hsl(var(--primary))' : 'hsl(var(--accent))'}
                  stroke="hsl(var(--background))"
                  strokeWidth="2.5"
                  className="transition-all"
                />
                <text
                  x={c.cx + 12}
                  y={c.cy + 4}
                  fontSize="15"
                  fontFamily="Oswald"
                  className={on ? 'fill-current text-primary' : 'fill-current text-foreground/70'}
                >
                  {c.name}
                </text>
              </g>
            );
          })}
        </UssrMap>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 flex flex-col">
        <div key={active.id} className="animate-float-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
              <Icon name="Star" className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-display uppercase leading-none">{active.name}</h3>
              <span className="text-xs text-muted-foreground">Звание присвоено в {active.year} г.</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{active.desc}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {heroCities.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c)}
              className={`rounded-md px-2 py-1 text-[11px] font-display uppercase tracking-wide transition-colors ${
                active.id === c.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 text-xs text-muted-foreground/70 flex items-center gap-2">
          <Icon name="MousePointerClick" size={14} />
          Нажмите на город на карте
        </div>
      </div>
    </div>
  );
};

export default HeroCitiesMap;
