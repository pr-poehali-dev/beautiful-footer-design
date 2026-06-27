import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const FLAME_IMG = 'https://cdn.poehali.dev/projects/7836e47e-38ae-4724-91ec-b2ed2318e8c0/files/0bfaae99-0795-4afc-b584-d694a8c0ff97.jpg';

const quotes = [
  { text: 'Велика Россия, а отступать некуда — позади Москва.', author: '28 панфиловцев, ноябрь 1941' },
  { text: 'Я умираю, но не сдаюсь. Прощай, Родина.', author: 'Надпись на стене Брестской крепости, 1941' },
  { text: 'Никто не забыт, и ничто не забыто.', author: 'Ольга Берггольц, Ленинград, 1941' },
  { text: 'Мы победим, потому что должны победить.', author: 'Из обращений советских командиров, 1941' },
  { text: 'Наше дело правое. Враг будет разбит. Победа будет за нами.', author: 'Юрий Левитан, 22 июня 1941' },
];

const useCountUp = (target: number, duration = 2000, trigger: boolean) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [trigger, target, duration]);
  return value;
};

const EternalFlame = () => {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [changing, setChanging] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 400);
    return () => clearTimeout(t);
  }, []);

  const days = useCountUp(1418, 1800, started);
  const heroes = useCountUp(11657, 2200, started);
  const cities = useCountUp(12, 800, started);

  const nextQuote = () => {
    setChanging(true);
    setTimeout(() => {
      setQuoteIdx(i => (i + 1) % quotes.length);
      setChanging(false);
    }, 300);
  };

  return (
    <section className="relative border-t border-border overflow-hidden">
      {/* Фон */}
      <div className="absolute inset-0">
        <img src={FLAME_IMG} alt="" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" />
      </div>

      <div className="container relative py-24">
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center mb-6">
            {/* Пульсирующие кольца */}
            {[1, 2, 3].map(i => (
              <span key={i} className="absolute rounded-full border border-primary/30 animate-ping-slow"
                style={{ width: 40 + i * 30, height: 40 + i * 30, animationDelay: `${i * 0.6}s`, animationDuration: '3s' }} />
            ))}
            {/* Огонь */}
            <div className="relative h-16 w-16 rounded-full bg-gradient-to-t from-accent via-primary to-primary/60 flex items-center justify-center shadow-[0_0_40px_hsl(var(--primary)/0.6)]">
              <Icon name="Flame" size={32} className="text-white animate-pulse" />
            </div>
          </div>

          <span className="text-xs font-display uppercase tracking-widest text-primary">Вечный огонь</span>
          <h2 className="text-4xl md:text-5xl font-display uppercase mt-2">Помним. Скорбим. Гордимся.</h2>
        </div>

        {/* Счётчики */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
          {[
            { val: days.toLocaleString('ru'), label: 'дней войны', icon: 'CalendarDays' },
            { val: cities, label: 'городов-героев', icon: 'Shield' },
            { val: heroes.toLocaleString('ru'), label: 'Героев СССР', icon: 'Award' },
          ].map(c => (
            <div key={c.label} className="text-center">
              <Icon name={c.icon} className="mx-auto mb-2 text-primary" size={22} />
              <div className="text-3xl md:text-4xl font-display text-gradient tabular-nums">{c.val}</div>
              <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">{c.label}</div>
            </div>
          ))}
        </div>

        {/* Цитата */}
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="transition-all duration-300"
            style={{ opacity: changing ? 0 : 1, transform: changing ? 'translateY(8px)' : 'translateY(0)' }}
          >
            <blockquote className="text-xl md:text-2xl font-display italic leading-relaxed text-foreground/90 mb-4">
              «{quotes[quoteIdx].text}»
            </blockquote>
            <cite className="text-sm text-muted-foreground not-italic font-display uppercase tracking-wide">
              — {quotes[quoteIdx].author}
            </cite>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => { setChanging(true); setTimeout(() => { setQuoteIdx(i); setChanging(false); }, 300); }}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === quoteIdx ? 24 : 8,
                  height: 8,
                  background: i === quoteIdx ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                }}
              />
            ))}
            <button
              onClick={nextQuote}
              className="ml-2 h-8 w-8 rounded-full border border-border bg-card/80 flex items-center justify-center hover:border-primary transition-colors"
            >
              <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EternalFlame;
