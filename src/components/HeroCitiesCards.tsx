import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { heroCities } from '@/data/content';

const medal: Record<string, string> = {
  leningrad: '★', moscow: '★', volgograd: '★', kyiv: '★', sevastopol: '★', odessa: '★',
  minsk: '★', kerch: '★', novorossiysk: '★', tula: '★', murmansk: '★', smolensk: '★',
};

const emoji: Record<string, string> = {
  leningrad: '🏙️', moscow: '🏛️', volgograd: '⚔️', kyiv: '🌿', sevastopol: '⚓', odessa: '🌊',
  minsk: '🌲', kerch: '⛏️', novorossiysk: '🛡️', tula: '🔔', murmansk: '❄️', smolensk: '🔥',
};

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
            className="relative h-52 sm:h-60 [perspective:900px] group"
            aria-label={c.name}
          >
            <div
              className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]"
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              {/* ЛИЦО */}
              <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl border border-border bg-card grain overflow-hidden flex flex-col items-center justify-center gap-3 group-hover:border-primary/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                <span className="text-3xl relative z-10">{emoji[c.id]}</span>
                <span className="relative z-10 text-4xl font-display text-primary leading-none">{medal[c.id]}</span>
                <h3 className="relative z-10 font-display text-lg uppercase leading-tight text-center px-3">{c.name}</h3>
                <span className="relative z-10 text-xs text-muted-foreground">{c.year}</span>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="RotateCw" size={14} className="text-muted-foreground" />
                </div>
              </div>

              {/* ОБРАТНАЯ */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border border-primary bg-gradient-to-br from-primary/20 via-card to-accent/10 overflow-hidden p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-7 w-7 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon name="Shield" size={14} className="text-primary" />
                    </div>
                    <span className="font-display text-sm uppercase text-primary">Город-герой</span>
                  </div>
                  <h4 className="font-display text-xl uppercase leading-tight mb-3">{c.name}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground/70">Звание: {c.year}</span>
                  <Icon name="X" size={14} className="text-muted-foreground/50" />
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
