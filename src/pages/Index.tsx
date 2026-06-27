import Icon from '@/components/ui/icon';
import HeroCitiesMap from '@/components/HeroCitiesMap';
import FrontMap1941 from '@/components/FrontMap1941';
import SiteFooter from '@/components/SiteFooter';
import { stats, timeline } from '@/data/content';

const heroImg = 'https://cdn.poehali.dev/projects/7836e47e-38ae-4724-91ec-b2ed2318e8c0/files/81542781-7838-41ef-bb0a-83445c7faae1.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <header className="relative min-h-[88vh] flex items-end overflow-hidden">
        <img src={heroImg} alt="Мемориал" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-transparent to-transparent" />

        <div className="container relative pb-20 pt-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 mb-6 animate-float-up">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-display uppercase tracking-widest text-primary">1941 — 1945</span>
          </div>
          <h1 className="max-w-3xl text-5xl md:text-7xl font-display uppercase leading-[0.95] animate-float-up" style={{ animationDelay: '0.1s' }}>
            Города-герои <span className="text-gradient">великой</span> победы
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground animate-float-up" style={{ animationDelay: '0.2s' }}>
            Интерактивная карта подвига, хроника боёв и память о тех, кто отстоял свободу.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 animate-float-up" style={{ animationDelay: '0.3s' }}>
            <a href="#cities" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-display uppercase text-sm tracking-wide text-primary-foreground hover:brightness-110 transition">
              <Icon name="MapPin" size={18} /> Открыть карту
            </a>
            <a href="#timeline" className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-display uppercase text-sm tracking-wide hover:border-primary transition">
              <Icon name="Clock" size={18} /> Хроника войны
            </a>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="border-y border-border bg-card">
        <div className="container grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-8 text-center">
              <Icon name={s.icon} className="mx-auto mb-3 text-primary" size={26} />
              <div className="text-3xl md:text-4xl font-display text-gradient">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HERO CITIES MAP */}
      <section id="cities" className="container py-20">
        <div className="mb-10">
          <span className="text-xs font-display uppercase tracking-widest text-primary">Карта подвига</span>
          <h2 className="text-4xl md:text-5xl font-display uppercase mt-2">Города-герои</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">Нажмите на отмеченные города, чтобы узнать их историю.</p>
        </div>
        <HeroCitiesMap />
      </section>

      {/* FRONT MAP 1941 */}
      <section className="border-t border-border bg-card/40">
        <div className="container py-20">
          <div className="mb-10">
            <span className="text-xs font-display uppercase tracking-widest text-accent">22 июня 1941</span>
            <h2 className="text-4xl md:text-5xl font-display uppercase mt-2">Карта вторжения</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">Наведите курсор на направления удара, чтобы открыть карточку с деталями.</p>
          </div>
          <FrontMap1941 />
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="container py-20">
        <div className="mb-10">
          <span className="text-xs font-display uppercase tracking-widest text-primary">Хроника</span>
          <h2 className="text-4xl md:text-5xl font-display uppercase mt-2">Таймлайн войны</h2>
        </div>
        <div className="relative pl-6 md:pl-0">
          <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
          <div className="space-y-10">
            {timeline.map((t, i) => (
              <div key={t.date} className={`relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 ? 'md:[direction:rtl]' : ''}`}>
                <div className={`[direction:ltr] ${i % 2 ? 'md:text-left md:col-start-2' : 'md:text-right'}`}>
                  <div className="absolute -left-[22px] md:left-1/2 top-1 h-4 w-4 rounded-full bg-primary ring-4 ring-background md:-translate-x-1/2" />
                  <span className="text-sm font-display uppercase tracking-wide text-primary">{t.date}</span>
                  <h3 className="text-xl font-display uppercase mt-1">{t.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
