import Icon from '@/components/ui/icon';
import { useCountUp } from '@/hooks/useCountUp';
import { stats, type Stat } from '@/data/content';

const StatCard = ({ s, index }: { s: Stat; index: number }) => {
  const { value, ref } = useCountUp(s.target, 1400 + index * 200);
  const formatted = value.toLocaleString('ru-RU');

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-500 hover:border-primary hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_hsl(var(--primary))]"
    >
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-all duration-500 group-hover:bg-primary/25" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-accent scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />

      <div className="relative">
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
          <Icon name={s.icon} className="text-primary" size={24} />
        </div>
        <div className="font-display text-5xl leading-none tabular-nums text-gradient">
          {formatted}
          {s.suffix ?? ''}
        </div>
        <div className="mt-3 text-sm font-display uppercase tracking-wide">{s.label}</div>
        <div className="mt-2 max-h-0 overflow-hidden text-xs text-muted-foreground opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
          {s.detail}
        </div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="container py-20">
        <div className="mb-10 text-center">
          <span className="text-xs font-display uppercase tracking-widest text-primary">Цифры памяти</span>
          <h2 className="text-4xl md:text-5xl font-display uppercase mt-2">Статистика войны</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
