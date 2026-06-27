import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { armyGroups, vehiclesWehrmacht, vehiclesRedArmy, type FullBattle, type Vehicle } from '@/data/content';

const CmdCard = ({ c, side }: { c: FullBattle['germanyForce']['commander']; side: 'ger' | 'ussr' }) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl border ${side === 'ussr' ? 'border-green-600/30 bg-green-600/5' : 'border-red-500/30 bg-red-500/5'}`}>
    <img src={c.photo} alt={c.name} className="h-12 w-12 rounded-full object-cover border-2 shrink-0" style={{ borderColor: side === 'ussr' ? '#22c55e66' : '#ef444466' }} />
    <div>
      <div className={`text-[10px] font-display uppercase tracking-widest ${side === 'ussr' ? 'text-green-400' : 'text-red-400'}`}>{c.rank}</div>
      <div className="text-sm font-display leading-tight">{c.name}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{c.bio}</div>
    </div>
  </div>
);

const VehicleChip = ({ v }: { v: Vehicle }) => {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(x => !x)} className="flex-shrink-0 rounded-xl border border-border bg-background overflow-hidden w-36 text-left hover:border-primary/50 transition-all group">
      <div className="relative h-20 overflow-hidden">
        <img src={v.photo} alt={v.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <span className="absolute bottom-1.5 left-2 text-[9px] font-display uppercase tracking-wider text-primary">{v.type}</span>
      </div>
      <div className="px-2 py-2">
        <div className="text-[11px] font-display leading-tight">{v.name}</div>
        {open && (
          <div className="mt-1.5 space-y-0.5 animate-float-up">
            {v.specs.map(s => (
              <div key={s.label} className="flex justify-between text-[10px]">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-display">{s.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </button>
  );
};

const getResult = (patrioticNote: string): 'ussr-win' | 'ger-win' | 'draw' => {
  if (patrioticNote.includes('НЕ СДАЛСЯ') || patrioticNote.includes('ПОБЕДА') || patrioticNote.includes('победил') || patrioticNote.includes('СНЯТИЕ') || patrioticNote.includes('КОНТРНАСТУП') || patrioticNote.includes('Выстояли') || patrioticNote.includes('БЕССМЕРТЕН')) return 'ussr-win';
  if (patrioticNote.includes('котёл') || patrioticNote.includes('вынуждена') || patrioticNote.includes('задержан')) return 'ger-win';
  return 'ger-win';
};

const ResultBadge = ({ note }: { note: string }) => {
  const r = getResult(note);
  const map: Record<string, { cls: string; text: string }> = {
    'ussr-win': { cls: 'bg-green-500/20 text-green-400 border-green-500/30', text: 'Выстояли!' },
    'ger-win': { cls: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', text: 'Тяжёлые потери' },
    'draw': { cls: 'bg-blue-500/20 text-blue-400 border-blue-500/30', text: 'Упорные бои' },
  };
  const m = map[r];
  return <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-display uppercase tracking-wide whitespace-nowrap ${m.cls}`}>{m.text}</span>;
};

const BattleDetail = ({ b, agColor }: { b: FullBattle; agColor: string }) => {
  const gVehicles = vehiclesWehrmacht.filter(v => b.germanyForce.vehicles.includes(v.id));
  const uVehicles = vehiclesRedArmy.filter(v => b.ussrForce.vehicles.includes(v.id));

  return (
    <div className="border-t border-border bg-muted/5 animate-float-up">
      {/* Таймлайн */}
      <div className="px-5 pt-5 pb-3 overflow-x-auto">
        <div className="flex gap-0 min-w-max">
          {b.keyEvents.map((ev, i) => (
            <div key={i} className="flex items-start">
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full border-2 mt-0.5 shrink-0" style={{ borderColor: agColor, background: `${agColor}55` }} />
                {i < b.keyEvents.length - 1 && <div className="h-1.5 w-16 mt-1" style={{ background: `linear-gradient(90deg, ${agColor}44, transparent)` }} />}
              </div>
              <div className="ml-2 mr-6 max-w-[150px]">
                <div className="text-[10px] font-display uppercase tracking-wide" style={{ color: agColor }}>{ev.date}</div>
                <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">{ev.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Резюме */}
      <div className="px-5 pb-3">
        <p className="text-sm text-foreground/80 leading-relaxed">{b.summary}</p>
      </div>

      {/* Стороны */}
      <div className="grid md:grid-cols-2 gap-3 px-5 pb-4">
        {/* Германия */}
        <div className="space-y-2">
          <div className="text-[10px] font-display uppercase tracking-widest text-red-400 flex items-center gap-2">
            <span className="h-px flex-1 bg-red-500/30" /> Вермахт <span className="h-px flex-1 bg-red-500/30" />
          </div>
          <CmdCard c={b.germanyForce.commander} side="ger" />
          <div className="grid grid-cols-2 gap-1.5">
            {[['Войска', b.germanyForce.troops, 'Users'], ['Танки', b.germanyForce.tanks, 'Truck'], ['Авиация', b.germanyForce.aircraft, 'Wind'], ['Артиллерия', b.germanyForce.artillery, 'Crosshair']].map(([lbl, val, icn]) => (
              <div key={lbl} className="rounded-lg bg-background border border-border px-2 py-1.5">
                <div className="flex items-center gap-1 mb-0.5"><Icon name={icn} size={10} className="text-muted-foreground/60" /><span className="text-[9px] text-muted-foreground uppercase">{lbl}</span></div>
                <div className="text-[11px] font-display leading-tight">{val}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-[11px]">
            <div className="text-[9px] text-red-400 uppercase tracking-wide mb-0.5">Потери</div>
            {b.germanyForce.losses}
          </div>
        </div>

        {/* СССР */}
        <div className="space-y-2">
          <div className="text-[10px] font-display uppercase tracking-widest text-green-400 flex items-center gap-2">
            <span className="h-px flex-1 bg-green-600/30" /> Красная Армия <span className="h-px flex-1 bg-green-600/30" />
          </div>
          <CmdCard c={b.ussrForce.commander} side="ussr" />
          <div className="grid grid-cols-2 gap-1.5">
            {[['Войска', b.ussrForce.troops, 'Users'], ['Танки', b.ussrForce.tanks, 'Truck'], ['Авиация', b.ussrForce.aircraft, 'Wind'], ['Артиллерия', b.ussrForce.artillery, 'Crosshair']].map(([lbl, val, icn]) => (
              <div key={lbl} className="rounded-lg bg-background border border-border px-2 py-1.5">
                <div className="flex items-center gap-1 mb-0.5"><Icon name={icn} size={10} className="text-muted-foreground/60" /><span className="text-[9px] text-muted-foreground uppercase">{lbl}</span></div>
                <div className="text-[11px] font-display leading-tight">{val}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-green-600/20 bg-green-600/5 px-3 py-2 text-[11px]">
            <div className="text-[9px] text-green-400 uppercase tracking-wide mb-0.5">Потери</div>
            {b.ussrForce.losses}
          </div>
          {b.ussrForce.heroism && (
            <div className="rounded-lg border border-primary/40 bg-primary/10 p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <Icon name="Star" size={13} className="text-primary shrink-0 animate-pulse" />
                <span className="text-[10px] font-display uppercase tracking-widest text-primary">Подвиг</span>
              </div>
              <p className="text-[11px] leading-relaxed">{b.ussrForce.heroism}</p>
            </div>
          )}
        </div>
      </div>

      {/* Техника */}
      {(gVehicles.length > 0 || uVehicles.length > 0) && (
        <div className="px-5 pb-4 space-y-2 border-t border-border pt-4">
          <div className="text-[10px] font-display uppercase tracking-widest text-muted-foreground">Задействованная техника</div>
          {gVehicles.length > 0 && (
            <div>
              <div className="text-[10px] text-red-400 uppercase tracking-wide mb-1.5">Вермахт</div>
              <div className="flex gap-2 overflow-x-auto pb-1">{gVehicles.map(v => <VehicleChip key={v.id} v={v} />)}</div>
            </div>
          )}
          {uVehicles.length > 0 && (
            <div>
              <div className="text-[10px] text-green-400 uppercase tracking-wide mb-1.5">Красная Армия</div>
              <div className="flex gap-2 overflow-x-auto pb-1">{uVehicles.map(v => <VehicleChip key={v.id} v={v} />)}</div>
            </div>
          )}
        </div>
      )}

      {/* Патриотичный итог */}
      <div className="mx-5 mb-4 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 flex items-start gap-3">
        <Icon name="Award" size={18} className="text-primary shrink-0 mt-0.5" />
        <div>
          <div className="text-[10px] font-display uppercase tracking-widest text-primary mb-1">Подвиг советского народа</div>
          <p className="text-sm leading-relaxed font-medium">{b.patrioticNote}</p>
        </div>
      </div>

      {/* Историческое значение */}
      <div className="mx-5 mb-5 text-[11px] text-muted-foreground leading-relaxed border-l-2 border-muted pl-3">
        <span className="text-[10px] font-display uppercase tracking-wide text-muted-foreground/60 block mb-1">Историческое значение</span>
        {b.significance}
      </div>
    </div>
  );
};

const Invasion1941 = () => {
  const [activeId, setActiveId] = useState('center');
  const [openBattle, setOpenBattle] = useState<string | null>('b4');
  const ag = armyGroups.find(a => a.id === activeId)!;

  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="grid lg:grid-cols-[250px_1fr]">
        {/* Сайдбар */}
        <div className="bg-card border-r border-border grain flex flex-col divide-y divide-border">
          <div className="px-4 py-3 text-[11px] font-display uppercase tracking-widest text-muted-foreground">Вермахт · 1941</div>
          {armyGroups.map(a => {
            const on = activeId === a.id;
            return (
              <button key={a.id} onClick={() => { setActiveId(a.id); setOpenBattle(null); }}
                className={`w-full text-left px-4 py-4 transition-colors ${on ? 'bg-muted/30' : 'hover:bg-muted/20'}`}>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${a.color}22`, border: `1.5px solid ${a.color}55` }}>
                    <Icon name={a.icon} size={16} style={{ color: a.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-display uppercase leading-tight" style={{ color: on ? a.color : undefined }}>
                      {a.name.replace('Группа армий ', '')}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{a.battles.length} сражения · {a.advanceKm} км</div>
                  </div>
                  <Icon name="ChevronRight" size={12} className={`text-muted-foreground shrink-0 transition-transform ${on ? 'rotate-90' : ''}`} />
                </div>
                {on && (
                  <div className="mt-2.5 h-1 rounded-full bg-border overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(a.advanceKm / 16, 100)}%`, background: a.color }} />
                  </div>
                )}
              </button>
            );
          })}
          <div className="p-4 mt-auto text-[11px] text-muted-foreground/70 leading-relaxed">
            <Icon name="Info" size={11} className="text-accent inline mr-1" />
            22 июня 1941 — три удара одновременно
          </div>
        </div>

        {/* Правая панель */}
        <div className="flex flex-col bg-card/60">
          {/* Шапка */}
          <div className="px-6 py-5 border-b border-border" style={{ borderLeftColor: ag.color, borderLeftWidth: 4 }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <span className="text-xs font-display uppercase tracking-widest text-muted-foreground">Операция «Барбаросса» · 1941</span>
                <h3 className="text-xl md:text-2xl font-display uppercase mt-0.5 leading-tight">{ag.name}</h3>
                <span className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1"><Icon name="Route" size={12} />{ag.direction}</span>
              </div>
              <div className="text-right shrink-0">
                <div className="text-3xl font-display" style={{ color: ag.color }}>{ag.advanceKm} км</div>
                <div className="text-xs text-muted-foreground">макс. продвижение</div>
              </div>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-border overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(ag.advanceKm / 16, 100)}%`, background: `linear-gradient(90deg, ${ag.color}, ${ag.color}77)` }} />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-[11px]">
                <div className="text-[9px] text-red-400 uppercase tracking-wide mb-1">Вермахт · всего</div>
                <div className="font-display">{ag.germanyTotal}</div>
              </div>
              <div className="rounded-lg border border-green-600/20 bg-green-600/5 p-3 text-[11px]">
                <div className="text-[9px] text-green-400 uppercase tracking-wide mb-1">Красная Армия · всего</div>
                <div className="font-display">{ag.ussrTotal}</div>
              </div>
            </div>
          </div>

          {/* Аккордеон сражений */}
          <div className="flex-1 overflow-auto divide-y divide-border">
            {ag.battles.map(b => {
              const isOpen = openBattle === b.id;
              return (
                <div key={b.id}>
                  <button onClick={() => setOpenBattle(isOpen ? null : b.id)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/20 transition-colors">
                    <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${ag.color}22`, border: `1px solid ${ag.color}44` }}>
                      {isOpen
                        ? <Icon name="ChevronDown" size={15} style={{ color: ag.color }} />
                        : <Icon name="Swords" size={15} style={{ color: ag.color }} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-sm uppercase leading-tight">{b.name}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{b.dates} · {b.location}</div>
                    </div>
                    <ResultBadge note={b.patrioticNote} />
                    <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={13} className="text-muted-foreground ml-1 shrink-0" />
                  </button>
                  {isOpen && <BattleDetail b={b} agColor={ag.color} />}
                </div>
              );
            })}
            <div className="px-5 py-4 bg-gradient-to-r from-primary/10 to-transparent flex items-start gap-3">
              <Icon name="Award" size={18} className="text-primary shrink-0 mt-0.5" />
              <div>
                <div className="text-[10px] font-display uppercase tracking-widest text-primary mb-1">Итог группы армий</div>
                <p className="text-sm">{ag.outcomeFull}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invasion1941;
