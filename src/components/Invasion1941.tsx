import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Phase = {
  date: string;
  event: string;
  detail: string;
};

type Army = {
  id: string;
  name: string;
  commander: string;
  direction: string;
  icon: string;
  color: string;
  strength: string;
  divisions: number;
  advanceKm: number;
  result: string;
  outcome: 'stopped' | 'partial' | 'failed';
  phases: Phase[];
};

const armies: Army[] = [
  {
    id: 'north',
    name: 'Группа армий «Север»',
    commander: 'Фельдмаршал В. фон Лееб',
    direction: 'Восточная Пруссия → Прибалтика → Ленинград',
    icon: 'Navigation',
    color: '#ef4444',
    strength: '29 дивизий',
    divisions: 29,
    advanceKm: 900,
    result: 'Остановлена у Ленинграда. Началась блокада (8 сент. 1941).',
    outcome: 'partial',
    phases: [
      { date: '22 июня', event: 'Прорыв границы в Восточной Пруссии', detail: 'Три армейских корпуса атакуют одновременно по всей полосе.' },
      { date: '28 июня', event: 'Захват Риги', detail: 'Стремительный марш через Литву и Латвию — 300 км за 6 дней.' },
      { date: '10 июля', event: 'Бои на реке Луга', detail: 'Советские войска организуют первую серьёзную оборонительную линию.' },
      { date: '8 сент.', event: 'Блокада Ленинграда', detail: 'Кольцо замыкается. Начинается 872-дневная осада города.' },
    ],
  },
  {
    id: 'center',
    name: 'Группа армий «Центр»',
    commander: 'Фельдмаршал Ф. фон Бок',
    direction: 'Польша → Минск → Смоленск → Москва',
    icon: 'Target',
    color: '#f97316',
    strength: '51 дивизия (главный удар)',
    divisions: 51,
    advanceKm: 1000,
    result: 'Разбита под Москвой зимой 1941–42. Первое поражение вермахта.',
    outcome: 'failed',
    phases: [
      { date: '22 июня', event: 'Двойное окружение под Белостоком и Минском', detail: 'В котлы попало более 300 тыс. советских солдат.' },
      { date: '3 июля', event: 'Захват Минска', detail: 'Столица БССР занята. Группа армий продвигается рекордными темпами.' },
      { date: '10–18 июля', event: 'Смоленское сражение', detail: 'Упорные бои задержали наступление на Москву на 2 месяца.' },
      { date: '2 окт.', event: 'Операция «Тайфун»', detail: 'Финальный удар на Москву. Советская оборона трещит по швам.' },
      { date: '5–6 дек.', event: 'Контрнаступление под Москвой', detail: 'Красная Армия отбрасывает вермахт на 100–250 км. Первое стратегическое поражение Германии.' },
    ],
  },
  {
    id: 'south',
    name: 'Группа армий «Юг»',
    commander: 'Фельдмаршал Г. фон Рундштедт',
    direction: 'Польша + Румыния → Украина → Кавказ',
    icon: 'Flame',
    color: '#eab308',
    strength: '57 дивизий',
    divisions: 57,
    advanceKm: 1400,
    result: 'Заняла Украину, Донбасс. Остановлена у Сталинграда в 1942.',
    outcome: 'partial',
    phases: [
      { date: '22 июня', event: 'Удар из Польши и Румынии', detail: 'Два фланга смыкаются, охватывая западную Украину.' },
      { date: '19 сент.', event: 'Падение Киева', detail: 'Крупнейшее окружение в истории войн — более 600 тыс. пленных.' },
      { date: '16 окт.', event: 'Захват Одессы', detail: 'После 73 дней героической обороны советские войска эвакуированы морем.' },
      { date: 'Нояб. 1941', event: 'Захват Крыма и подход к Ростову', detail: 'Севастополь держится в осаде. Ростов взят и вскоре отбит.' },
    ],
  },
];

const outcomeLabel: Record<Army['outcome'], { label: string; icon: string; cls: string }> = {
  failed: { label: 'Разбита', icon: 'XCircle', cls: 'text-green-400' },
  partial: { label: 'Остановлена', icon: 'MinusCircle', cls: 'text-yellow-400' },
  stopped: { label: 'Отброшена', icon: 'CheckCircle', cls: 'text-green-400' },
};

const Invasion1941 = () => {
  const [open, setOpen] = useState<string>('center');
  const [activePhase, setActivePhase] = useState<number>(0);

  const active = armies.find((a) => a.id === open)!;

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-0 rounded-2xl border border-border overflow-hidden">
      {/* Sidebar — выбор группы армий */}
      <div className="bg-card border-r border-border grain divide-y divide-border">
        {armies.map((a) => {
          const on = open === a.id;
          return (
            <button
              key={a.id}
              onClick={() => { setOpen(a.id); setActivePhase(0); }}
              className={`w-full text-left px-5 py-5 transition-colors ${on ? 'bg-accent/10' : 'hover:bg-muted/50'}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-transform"
                  style={{ background: `${a.color}22`, border: `1.5px solid ${a.color}66` }}
                >
                  <Icon name={a.icon} size={18} style={{ color: a.color }} />
                </div>
                <div>
                  <div className="text-xs font-display uppercase tracking-wide leading-tight" style={{ color: on ? a.color : undefined }}>
                    {a.name.replace('Группа армий ', '')}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{a.divisions} дивизий</div>
                </div>
                <Icon name="ChevronRight" size={14} className={`ml-auto shrink-0 text-muted-foreground transition-transform ${on ? 'rotate-90' : ''}`} />
              </div>
              {on && (
                <div className="mt-3 h-1 rounded-full bg-border overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(active.advanceKm / 16, 100)}%`, background: a.color }} />
                </div>
              )}
            </button>
          );
        })}

        <div className="px-5 py-4 text-[11px] text-muted-foreground/70 leading-relaxed">
          22 июня 1941 года три группы армий атаковали СССР одновременно
        </div>
      </div>

      {/* Основная панель */}
      <div className="bg-card/60 flex flex-col">
        {/* Шапка группы армий */}
        <div className="px-7 py-6 border-b border-border" style={{ borderLeftColor: active.color, borderLeftWidth: 3 }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-display uppercase tracking-widest text-muted-foreground">Удар вермахта · 1941</span>
              <h3 className="text-2xl font-display uppercase mt-1 leading-tight">{active.name}</h3>
              <div className="flex flex-wrap gap-4 mt-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="User" size={12} /> {active.commander}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="Route" size={12} /> {active.direction}
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl font-display" style={{ color: active.color }}>{active.advanceKm}</div>
              <div className="text-xs text-muted-foreground">км прошла</div>
            </div>
          </div>

          {/* Прогресс-бар */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>Глубина продвижения</span>
              <span>{active.strength}</span>
            </div>
            <div className="h-2 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(active.advanceKm / 16, 100)}%`, background: `linear-gradient(90deg, ${active.color}, ${active.color}88)` }}
              />
            </div>
          </div>
        </div>

        {/* Фазы наступления */}
        <div className="px-7 py-5 flex-1">
          <div className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-4">Хроника наступления</div>

          <div className="flex gap-3 mb-5 flex-wrap">
            {active.phases.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePhase(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-display uppercase tracking-wide transition-all ${
                  activePhase === i
                    ? 'text-black font-semibold shadow-md'
                    : 'bg-background text-muted-foreground hover:text-foreground'
                }`}
                style={activePhase === i ? { background: active.color } : {}}
              >
                {p.date}
              </button>
            ))}
          </div>

          {/* Карточка события */}
          <div
            key={`${active.id}-${activePhase}`}
            className="rounded-xl border p-5 animate-float-up"
            style={{ borderColor: `${active.color}55`, background: `${active.color}0d` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: `${active.color}33` }}>
                <Icon name={active.icon} size={16} style={{ color: active.color }} />
              </div>
              <span className="font-display text-sm uppercase tracking-wide" style={{ color: active.color }}>
                {active.phases[activePhase].date}
              </span>
            </div>
            <h4 className="font-display text-lg uppercase leading-tight mb-2">
              {active.phases[activePhase].event}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {active.phases[activePhase].detail}
            </p>
          </div>

          {/* Итог */}
          <div className="mt-5 rounded-xl border border-border bg-background p-4 flex items-start gap-3">
            <Icon name={outcomeLabel[active.outcome].icon} size={18} className={outcomeLabel[active.outcome].cls + ' shrink-0 mt-0.5'} />
            <div>
              <span className={`text-xs font-display uppercase tracking-wide ${outcomeLabel[active.outcome].cls}`}>
                Итог: {outcomeLabel[active.outcome].label}
              </span>
              <p className="text-sm text-muted-foreground mt-1">{active.result}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invasion1941;
