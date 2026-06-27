import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { frontRegions, type FrontRegion } from '@/data/content';

const FrontMap1941 = () => {
  const [hover, setHover] = useState<FrontRegion | null>(null);

  return (
    <div className="relative aspect-[16/9] rounded-2xl border border-border bg-card grain overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-primary/10" />

      <div className="absolute left-4 top-4 z-20 text-xs font-display uppercase tracking-widest text-muted-foreground">
        Восточный фронт · 1941
      </div>
      <div className="absolute right-4 top-4 z-20 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="h-2 w-4 rounded-sm bg-accent/70" /> Наступление вермахта
      </div>

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-25" preserveAspectRatio="none">
        <path d="M18,28 Q40,16 62,22 T92,32 Q96,55 82,72 T55,86 Q32,88 22,72 T18,28 Z" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.3" />
      </svg>

      {frontRegions.map((r) => (
        <button
          key={r.id}
          onMouseEnter={() => setHover(r)}
          onMouseLeave={() => setHover(null)}
          onClick={() => setHover(r)}
          style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` }}
          className="absolute rounded-lg border-2 border-dashed border-accent/40 bg-accent/5 hover:bg-accent/20 hover:border-accent transition-colors group"
        >
          <span className="absolute left-2 top-2 text-[10px] font-display uppercase text-accent/80 group-hover:text-accent">
            {r.date}
          </span>
          <Icon name="Crosshair" className="absolute inset-0 m-auto text-accent/40 group-hover:text-accent transition-colors" size={20} />
        </button>
      ))}

      {hover && (
        <div
          className="absolute z-30 w-72 rounded-xl border border-border bg-popover shadow-2xl overflow-hidden animate-float-up pointer-events-none"
          style={{
            left: `${Math.min(hover.x + hover.w + 1, 62)}%`,
            top: `${Math.min(hover.y, 55)}%`,
          }}
        >
          <div className="h-28 w-full overflow-hidden relative">
            <img src={hover.img} alt={hover.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-popover via-popover/20 to-transparent" />
            <span className="absolute bottom-2 left-3 text-xs font-display uppercase tracking-wide text-primary">{hover.date}</span>
          </div>
          <div className="p-4">
            <h4 className="font-display text-lg uppercase leading-tight mb-2">{hover.name}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{hover.info}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrontMap1941;
