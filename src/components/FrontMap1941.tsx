import { useState } from 'react';
import Icon from '@/components/ui/icon';
import UssrMap from '@/components/UssrMap';
import { offensives, type Offensive } from '@/data/content';

const FrontMap1941 = () => {
  const [active, setActive] = useState<Offensive | null>(null);

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
      <div className="relative rounded-2xl border border-border bg-card grain overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-primary/5 pointer-events-none" />

        <div className="absolute left-4 top-4 z-20 text-xs font-display uppercase tracking-widest text-muted-foreground">
          Восточный фронт · 22 июня 1941
        </div>

        <UssrMap
          className="relative w-full h-auto"
          defs={
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--accent))" />
            </marker>
          }
        >
          {/* линия фронта (граница 1941) */}
          <path d="M 250 220 L 250 380" stroke="hsl(var(--accent) / 0.5)" strokeWidth="3" strokeDasharray="8 6" fill="none" />

          {offensives.map((o) => {
            const on = active?.id === o.id;
            return (
              <g
                key={o.id}
                className="cursor-pointer"
                onMouseEnter={() => setActive(o)}
                onClick={() => setActive(o)}
              >
                <path
                  d={o.path}
                  fill="none"
                  stroke="hsl(var(--accent))"
                  strokeWidth={on ? 7 : 4}
                  strokeLinecap="round"
                  markerEnd="url(#arrow)"
                  opacity={on ? 1 : 0.55}
                  className="transition-all"
                />
                <circle cx={o.lx} cy={o.ly} r={on ? 7 : 5} fill="hsl(var(--accent))" stroke="hsl(var(--background))" strokeWidth="2" className="transition-all" />
              </g>
            );
          })}
        </UssrMap>

        <div className="absolute right-4 bottom-4 z-20 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-5 rounded-sm bg-accent/70" /> Удары вермахта
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {active ? (
          <div key={active.id} className="animate-float-up">
            <div className="bg-gradient-to-r from-accent/20 to-transparent p-5 border-b border-border">
              <span className="text-xs font-display uppercase tracking-widest text-accent">{active.date}</span>
              <h4 className="font-display text-xl uppercase leading-tight mt-1">{active.name}</h4>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Icon name="Swords" size={14} className="text-accent" />
                {active.army}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{active.info}</p>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <Icon name="Crosshair" className="mx-auto mb-3 text-accent/60" size={32} />
            <p className="text-sm">Наведите на стрелку удара,<br />чтобы открыть карточку направления</p>
          </div>
        )}

        <div className="px-5 pb-5 flex flex-col gap-1.5">
          {offensives.map((o) => (
            <button
              key={o.id}
              onMouseEnter={() => setActive(o)}
              onClick={() => setActive(o)}
              className={`text-left rounded-lg px-3 py-2 text-xs font-display uppercase tracking-wide transition-colors ${
                active?.id === o.id ? 'bg-accent text-accent-foreground' : 'bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              {o.army}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrontMap1941;
