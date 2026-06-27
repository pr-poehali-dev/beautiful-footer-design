import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { heroCities } from '@/data/content';

const HeroCitiesCards = () => {
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {heroCities.map((c) => {
        const isFlipped = flipped === c.id;
        return (
          <button
            key={c.id}
            onClick={() => setFlipped(isFlipped ? null : c.id)}
            className="relative h-64 sm:h-72 [perspective:1000px] group text-left"
            aria-label={c.name}
          >
            <div
              className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              {/* ── ЛИЦО ── */}
              <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden border border-border group-hover:border-primary/60 transition-colors flex flex-col">
                {/* Фото */}
                <div className="relative h-2/3 overflow-hidden shrink-0">
                  <img
                    src={c.photo}
                    alt={c.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                  {/* Флип-подсказка */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="rounded-full bg-background/80 backdrop-blur-sm p-1.5">
                      <Icon name="RefreshCw" size={12} className="text-primary" />
                    </div>
                  </div>
                </div>

                {/* Нижняя часть */}
                <div className="flex flex-col flex-1 justify-between px-4 py-3 bg-card">
                  {/* Полоска */}
                  <div className="h-px w-full bg-gradient-to-r from-primary via-accent to-transparent mb-2" />
                  <div>
                    <h3 className="font-display text-lg uppercase leading-tight tracking-wide">{c.name}</h3>
                    <span className="text-xs text-muted-foreground mt-0.5 block">Город-герой · {c.year}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <Icon name="Star" className="text-primary" size={16} />
                    <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">Нажмите →</span>
                  </div>
                </div>
              </div>

              {/* ── ОБРАТНАЯ ── */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border border-primary bg-gradient-to-b from-card via-card to-background overflow-hidden flex flex-col p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Icon name="Shield" size={15} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-[10px] font-display uppercase tracking-widest text-primary block">Город-герой</span>
                    <h4 className="font-display text-xl uppercase leading-none">{c.name}</h4>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-primary/60 to-transparent mb-4" />

                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{c.desc}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wide block">Звание присвоено</span>
                    <span className="font-display text-2xl text-primary">{c.year}</span>
                  </div>
                  <div className="h-10 w-10 rounded-full border border-primary/30 flex items-center justify-center">
                    <Icon name="Star" className="text-primary" size={18} />
                  </div>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default HeroCitiesCards;
