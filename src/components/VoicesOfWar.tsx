import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Voice = {
  id: number;
  role: string;
  name: string;
  year: string;
  text: string;
  tag: string;
  tagColor: string;
};

const voices: Voice[] = [
  {
    id: 1, role: 'Рядовой солдат', name: 'Иван Добробабин', year: 'Панфиловец, 1941', tag: 'Москва', tagColor: '#f97316',
    text: 'Нас оставалось двадцать восемь. Позади была Москва. Мы знали, что умрём здесь, но не пустим их дальше. И не пустили.',
  },
  {
    id: 2, role: 'Ленинградка, блокада', name: 'Лена Мухина', year: 'Дневник, 1941–1942', tag: 'Блокада', tagColor: '#ef4444',
    text: '125 граммов хлеба. Это всё, что дают на весь день. Но мы живы. И город живёт. Пока мы живём — он не сдался.',
  },
  {
    id: 3, role: 'Лётчик-истребитель', name: 'Николай Гастелло', year: 'Капитан, июнь 1941', tag: 'Авиация', tagColor: '#22c55e',
    text: 'Когда самолёт был подбит, он направил горящую машину на колонну вражеской техники. Первый таран Великой Отечественной.',
  },
  {
    id: 4, role: 'Морской пехотинец', name: 'Цезарь Куников', year: 'Майор, 1943', tag: 'Новороссийск', tagColor: '#3b82f6',
    text: 'Малая Земля — клочок берега шириной 6 км. 225 дней мы держали его. Немцы называли нас «чёрными дьяволами».',
  },
  {
    id: 5, role: 'Снайпер', name: 'Людмила Павличенко', year: 'Герой СССР, 1942', tag: 'Севастополь', tagColor: '#a855f7',
    text: '309 подтверждённых уничтоженных. Пусть они называют меня «леди Смерть». Я защищала свою Родину.',
  },
  {
    id: 6, role: 'Медсестра', name: 'Зинаида Самсонова', year: 'Герой СССР, 1944', tag: 'Подвиг', tagColor: '#ec4899',
    text: 'Под шквальным огнём она выносила раненых. Когда убили командира, подняла бойцов в атаку. Ей было восемнадцать.',
  },
];

const VoicesOfWar = () => {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<'left' | 'right' | null>(null);
  const [dragStart, setDragStart] = useState<number | null>(null);

  const go = (next: number, d: 'left' | 'right') => {
    setDir(d);
    setTimeout(() => {
      setCurrent((next + voices.length) % voices.length);
      setDir(null);
    }, 280);
  };

  const prev = () => go(current - 1, 'right');
  const next = () => go(current + 1, 'left');

  const onPointerDown = (e: React.PointerEvent) => setDragStart(e.clientX);
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart === null) return;
    const dx = e.clientX - dragStart;
    if (Math.abs(dx) > 50) { if (dx < 0) { next(); } else { prev(); } }
    setDragStart(null);
  };

  const v = voices[current];

  return (
    <section className="border-t border-border bg-card/30">
      <div className="container py-20">
        <div className="mb-12 text-center">
          <span className="text-xs font-display uppercase tracking-widest text-primary">Живая память</span>
          <h2 className="text-4xl md:text-5xl font-display uppercase mt-2">Голоса войны</h2>
          <p className="mt-3 text-muted-foreground">Слова тех, кто был там. Свайп или стрелки для листания.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Стопка карточек */}
          <div className="relative h-72 mb-8">
            {/* Фоновые карточки */}
            {[2, 1].map(offset => (
              <div
                key={offset}
                className="absolute inset-0 rounded-2xl border border-border bg-card"
                style={{
                  transform: `translateY(${offset * 8}px) scale(${1 - offset * 0.03})`,
                  zIndex: 3 - offset,
                }}
              />
            ))}

            {/* Активная карточка */}
            <div
              className="absolute inset-0 rounded-2xl border border-border bg-gradient-to-br from-card via-card to-background z-10 p-8 cursor-grab active:cursor-grabbing select-none"
              style={{
                borderColor: v.tagColor + '55',
                boxShadow: `0 20px 60px -20px ${v.tagColor}33`,
                transform: dir === 'left' ? 'translateX(-60px) rotate(-3deg)' : dir === 'right' ? 'translateX(60px) rotate(3deg)' : 'translateX(0) rotate(0)',
                opacity: dir ? 0 : 1,
                transition: 'all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl opacity-20" style={{ background: v.tagColor }} />
              </div>

              {/* Тег */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-display uppercase tracking-wide"
                  style={{ borderColor: v.tagColor + '55', color: v.tagColor, background: v.tagColor + '15' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: v.tagColor }} />
                  {v.tag}
                </span>
                <span className="text-xs text-muted-foreground font-display">{current + 1} / {voices.length}</span>
              </div>

              {/* Цитата */}
              <blockquote className="text-lg md:text-xl leading-relaxed font-display italic text-foreground/90 mb-6">
                «{v.text}»
              </blockquote>

              <div className="border-t border-border pt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0" style={{ background: v.tagColor + '22' }}>
                  <Icon name="User" size={18} style={{ color: v.tagColor }} />
                </div>
                <div>
                  <div className="font-display text-sm uppercase leading-tight">{v.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{v.role} · {v.year}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Управление */}
          <div className="flex items-center justify-center gap-4">
            <button onClick={prev} className="h-11 w-11 rounded-xl border border-border bg-card flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
              <Icon name="ChevronLeft" size={20} />
            </button>

            <div className="flex gap-2">
              {voices.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > current ? 'left' : 'right')}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? 28 : 8, height: 8,
                    background: i === current ? voices[i].tagColor : 'hsl(var(--border))',
                  }}
                />
              ))}
            </div>

            <button onClick={next} className="h-11 w-11 rounded-xl border border-border bg-card flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoicesOfWar;