import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { armyGroups, vehiclesWehrmacht, vehiclesRedArmy, type ArmyGroup, type Vehicle } from '@/data/content';

// ── Карточка техники ──────────────────────────────────────────────────────────
const VehicleCard = ({ v }: { v: Vehicle }) => {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((x) => !x)}
      className="w-full rounded-xl border border-border bg-background overflow-hidden text-left transition-all hover:border-primary/50 group"
    >
      <div className="relative h-24 overflow-hidden shrink-0">
        <img src={v.photo} alt={v.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
        <span className="absolute bottom-2 left-3 text-[10px] font-display uppercase tracking-widest text-primary">{v.type}</span>
        <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-background/70 flex items-center justify-center">
          <Icon name={open ? 'ChevronUp' : 'ChevronDown'} size={11} className="text-muted-foreground" />
        </div>
      </div>
      <div className="px-3 py-2.5">
        <h5 className="font-display text-xs uppercase leading-tight">{v.name}</h5>
        {open && (
          <div className="mt-2 animate-float-up">
            <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">{v.desc}</p>
            <div className="grid grid-cols-2 gap-1">
              {v.specs.map((s) => (
                <div key={s.label} className="rounded-md bg-muted/50 px-2 py-1">
                  <div className="text-[9px] text-muted-foreground/70 uppercase">{s.label}</div>
                  <div className="text-[11px] font-display mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </button>
  );
};

// ── Значок результата сражения ────────────────────────────────────────────────
const ResultBadge = ({ result, label }: { result: string; label: string }) => {
  const cls: Record<string, string> = {
    'ussr-win': 'bg-green-500/15 text-green-400 border-green-500/30',
    'ger-win': 'bg-red-500/15 text-red-400 border-red-500/30',
    'draw': 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-display uppercase tracking-wide whitespace-nowrap ${cls[result]}`}>
      {label}
    </span>
  );
};

type Tab = 'battles' | 'forces' | 'vehicles';

const Invasion1941 = () => {
  const [activeId, setActiveId] = useState<string>('center');
  const [tab, setTab] = useState<Tab>('battles');
  const [activeBattle, setActiveBattle] = useState<string | null>(null);

  const ag = armyGroups.find((a) => a.id === activeId)!;
  const gVehicles = vehiclesWehrmacht.filter((v) => ag.germanyVehicles.includes(v.id));
  const uVehicles = vehiclesRedArmy.filter((v) => ag.ussrVehicles.includes(v.id));

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'battles', label: 'Сражения', icon: 'Swords' },
    { id: 'forces', label: 'Силы сторон', icon: 'Users' },
    { id: 'vehicles', label: 'Техника', icon: 'Truck' },
  ];

  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="grid lg:grid-cols-[260px_1fr]">

        {/* ── Сайдбар ────────────────────────────────────────────────── */}
        <div className="bg-card border-r border-border grain flex flex-col divide-y divide-border">
          <div className="px-4 py-3 text-[11px] font-display uppercase tracking-widest text-muted-foreground">
            Группы армий вермахта
          </div>
          {armyGroups.map((a) => {
            const on = activeId === a.id;
            return (
              <button
                key={a.id}
                onClick={() => { setActiveId(a.id); setTab('battles'); setActiveBattle(null); }}
                className={`w-full text-left px-4 py-4 transition-colors ${on ? 'bg-muted/30' : 'hover:bg-muted/20'}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${a.color}22`, border: `1.5px solid ${a.color}55` }}
                  >
                    <Icon name={a.icon} size={16} style={{ color: a.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-display uppercase leading-tight" style={{ color: on ? a.color : undefined }}>
                      {a.name.replace('Группа армий ', '')}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{a.battles.length} сражения</div>
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

          <div className="p-4 mt-auto">
            <div className="rounded-lg bg-accent/10 border border-accent/20 p-3 text-[11px] text-muted-foreground leading-relaxed">
              <Icon name="Info" size={11} className="text-accent inline mr-1" />
              22 июня 1941 — три удара одновременно по всей советско-германской границе
            </div>
          </div>
        </div>

        {/* ── Правая панель ────────────────────────────────────────────── */}
        <div className="flex flex-col bg-card/60">

          {/* Шапка */}
          <div className="px-6 py-5 border-b border-border" style={{ borderLeftColor: ag.color, borderLeftWidth: 4 }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <span className="text-xs font-display uppercase tracking-widest text-muted-foreground">Операция «Барбаросса» · 1941</span>
                <h3 className="text-xl md:text-2xl font-display uppercase mt-0.5 leading-tight">{ag.name}</h3>
                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon name="User" size={12} /> {ag.commander}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon name="Route" size={12} /> {ag.direction}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-3xl font-display" style={{ color: ag.color }}>{ag.advanceKm} км</div>
                <div className="text-xs text-muted-foreground">макс. продвижение</div>
              </div>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(ag.advanceKm / 16, 100)}%`, background: `linear-gradient(90deg, ${ag.color}, ${ag.color}77)` }}
              />
            </div>
          </div>

          {/* Вкладки */}
          <div className="flex border-b border-border px-6 gap-1 pt-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-display uppercase tracking-wide border-b-2 transition-colors ${
                  tab === t.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={t.icon} size={13} /> {t.label}
              </button>
            ))}
          </div>

          {/* Контент */}
          <div className="flex-1 overflow-auto p-6">

            {/* ── СРАЖЕНИЯ ── */}
            {tab === 'battles' && (
              <div className="space-y-2">
                {ag.battles.map((b) => {
                  const isOpen = activeBattle === b.id;
                  return (
                    <div key={b.id} className="rounded-xl border border-border overflow-hidden">
                      <button
                        onClick={() => setActiveBattle(isOpen ? null : b.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${ag.color}22` }}>
                          <Icon name="Swords" size={14} style={{ color: ag.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-display text-sm uppercase leading-tight">{b.name}</div>
                          <div className="text-[11px] text-muted-foreground mt-0.5">{b.dates} · {b.location}</div>
                        </div>
                        <ResultBadge result={b.result} label={b.resultLabel} />
                        <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={13} className="text-muted-foreground ml-1 shrink-0" />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 pt-3 border-t border-border bg-muted/10 animate-float-up">
                          <p className="text-sm font-medium mb-1">{b.desc}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">{b.details}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="mt-3 rounded-xl border border-border bg-background p-4 flex items-start gap-3">
                  {ag.outcome === 'failed'
                    ? <Icon name="XCircle" size={16} className="text-green-400 shrink-0 mt-0.5" />
                    : <Icon name="MinusCircle" size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  }
                  <div>
                    <span className="text-xs font-display uppercase tracking-wide text-muted-foreground">Итог</span>
                    <p className="text-sm mt-1">{ag.outcomeFull}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── СИЛЫ СТОРОН ── */}
            {tab === 'forces' && (
              <div className="grid md:grid-cols-2 gap-4">
                {/* Вермахт */}
                <div className="rounded-xl border border-red-500/30 overflow-hidden">
                  <div className="bg-red-500/10 px-4 py-3 border-b border-red-500/20 flex items-center gap-2">
                    <Icon name="Shield" size={15} className="text-red-400" />
                    <span className="font-display text-sm uppercase tracking-wide text-red-400">Вермахт</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Численность</div>
                      <div className="text-sm font-display mt-0.5">{ag.germanyForce}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-muted/30 p-3 text-center">
                        <Icon name="Truck" className="mx-auto mb-1 text-red-400" size={18} />
                        <div className="text-xl font-display text-red-400">{ag.germanyTanks.toLocaleString('ru')}</div>
                        <div className="text-[10px] text-muted-foreground">танков</div>
                      </div>
                      <div className="rounded-lg bg-muted/30 p-3 text-center">
                        <Icon name="Wind" className="mx-auto mb-1 text-red-400" size={18} />
                        <div className="text-xl font-display text-red-400">{ag.germanyAircraft.toLocaleString('ru')}</div>
                        <div className="text-[10px] text-muted-foreground">самолётов</div>
                      </div>
                    </div>
                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Потери (1941)</div>
                      <div className="text-xs">{ag.germanyLoss}</div>
                    </div>
                  </div>
                </div>

                {/* Красная Армия */}
                <div className="rounded-xl border border-green-600/30 overflow-hidden">
                  <div className="bg-green-600/10 px-4 py-3 border-b border-green-600/20 flex items-center gap-2">
                    <Icon name="Star" size={15} className="text-green-400" />
                    <span className="font-display text-sm uppercase tracking-wide text-green-400">Красная Армия</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Командование</div>
                      <div className="text-xs font-display mt-0.5">{ag.ussrCommander}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Численность</div>
                      <div className="text-sm font-display mt-0.5">{ag.ussrForce}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-muted/30 p-3 text-center">
                        <Icon name="Truck" className="mx-auto mb-1 text-green-400" size={18} />
                        <div className="text-xl font-display text-green-400">{ag.ussrTanks.toLocaleString('ru')}</div>
                        <div className="text-[10px] text-muted-foreground">танков</div>
                      </div>
                      <div className="rounded-lg bg-muted/30 p-3 text-center">
                        <Icon name="Wind" className="mx-auto mb-1 text-green-400" size={18} />
                        <div className="text-xl font-display text-green-400">{ag.ussrAircraft.toLocaleString('ru')}</div>
                        <div className="text-[10px] text-muted-foreground">самолётов</div>
                      </div>
                    </div>
                    <div className="rounded-lg border border-green-600/20 bg-green-600/5 p-3">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Потери (1941)</div>
                      <div className="text-xs">{ag.ussrLoss}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── ТЕХНИКА ── */}
            {tab === 'vehicles' && (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px flex-1 bg-red-500/30" />
                    <span className="text-[11px] font-display uppercase tracking-widest text-red-400 px-1">Техника вермахта</span>
                    <div className="h-px flex-1 bg-red-500/30" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {gVehicles.map((v) => <VehicleCard key={v.id} v={v} />)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px flex-1 bg-green-600/30" />
                    <span className="text-[11px] font-display uppercase tracking-widest text-green-400 px-1">Техника Красной Армии</span>
                    <div className="h-px flex-1 bg-green-600/30" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {uVehicles.map((v) => <VehicleCard key={v.id} v={v} />)}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Invasion1941;
