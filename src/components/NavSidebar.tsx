import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const sections = [
  { id: 'cities', label: 'Города-герои', icon: 'Shield', tip: '12 городов · перевернуть карточки' },
  { id: 'invasion', label: 'Вторжение 1941', icon: 'Swords', tip: '3 группы армий · сражения · техника' },
  { id: 'timeline', label: 'Путь к Победе', icon: 'Clock', tip: 'Хроника 1941–1945' },
];

const NavSidebar = () => {
  const [active, setActive] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s.id);
        if (el && window.scrollY >= el.offsetTop - 200) { setActive(s.id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 items-end">
      {sections.map(s => {
        const isActive = active === s.id;
        const isHovered = hovered === s.id;
        return (
          <div key={s.id} className="relative flex items-center justify-end">
            <div
              className="absolute right-12 flex items-center gap-2 pointer-events-none transition-all duration-300"
              style={{ opacity: isHovered ? 1 : 0, transform: isHovered ? 'translateX(0)' : 'translateX(8px)' }}
            >
              <div className="rounded-lg border border-border bg-card/95 backdrop-blur-sm px-3 py-2 shadow-xl whitespace-nowrap">
                <div className="text-[10px] font-display uppercase tracking-widest text-primary mb-0.5">{s.label}</div>
                <div className="text-[11px] text-muted-foreground">{s.tip}</div>
              </div>
              <div className="h-px w-3 bg-border shrink-0" />
            </div>

            <button
              onClick={() => scrollTo(s.id)}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              aria-label={s.label}
              className="relative h-10 w-10 rounded-xl border flex items-center justify-center transition-all duration-300"
              style={{
                background: isActive ? 'hsl(var(--primary) / 0.9)' : 'hsl(var(--card) / 0.9)',
                borderColor: isActive ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                backdropFilter: 'blur(8px)',
                boxShadow: isActive ? '0 0 20px hsl(var(--primary) / 0.5)' : undefined,
              }}
            >
              {isActive && <span className="absolute inset-0 rounded-xl animate-ping-slow opacity-25" style={{ background: 'hsl(var(--primary))' }} />}
              <Icon name={s.icon} size={16} className={isActive ? 'text-white' : 'text-muted-foreground'} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NavSidebar;
