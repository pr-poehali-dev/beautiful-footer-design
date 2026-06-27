import Icon from '@/components/ui/icon';

const socials = [
  { name: 'Telegram', icon: 'Send' },
  { name: 'VK', icon: 'Share2' },
  { name: 'YouTube', icon: 'Youtube' },
];

const sources = [
  'Архивные фотографии — Министерство обороны РФ',
  'Хроника событий — «Великая Отечественная война 1941–1945»',
  'Карты боевых действий — открытые исторические атласы',
  'Изображения мемориалов — собственные материалы',
];

const SiteFooter = () => {
  return (
    <footer className="relative border-t border-border bg-card grain">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Icon name="Star" className="text-white" size={20} />
              </div>
              <span className="font-display text-xl uppercase tracking-wide">Память Победы</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Просветительский проект о городах-героях и хронике Великой Отечественной войны.
            </p>
            <div className="text-xs text-muted-foreground/80 space-y-1">
              <p>ООО «Память Победы»</p>
              <p>ИНН 7700000000</p>
              <p>© 2026. Все права защищены.</p>
            </div>
          </div>

          <div>
            <h4 className="font-display uppercase text-sm tracking-widest text-muted-foreground mb-4">Контакты</h4>
            <a href="mailto:info@pamyat-pobedy.ru" className="flex items-center gap-2 text-sm hover:text-primary transition-colors mb-3">
              <Icon name="Mail" size={16} /> info@pamyat-pobedy.ru
            </a>
            <div className="flex gap-3 mt-4">
              {socials.map((s) => (
                <button
                  key={s.name}
                  aria-label={s.name}
                  className="h-10 w-10 rounded-lg border border-border bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Icon name={s.icon} size={18} />
                </button>
              ))}
            </div>
          </div>

          <div className="group [perspective:1000px]">
            <h4 className="font-display uppercase text-sm tracking-widest text-muted-foreground mb-4">Источники материалов</h4>
            <div className="relative h-44 rounded-xl border border-border bg-background overflow-hidden transition-all duration-500 group-hover:border-primary group-hover:shadow-[0_0_30px_-8px_hsl(var(--primary))]">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-4">
                <Icon name="BookOpen" className="text-primary" size={28} />
                <span className="text-sm font-display uppercase tracking-wide">Откуда материалы</span>
                <span className="text-xs text-muted-foreground">Наведите курсор</span>
              </div>
              <div className="absolute inset-0 p-4 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 bg-gradient-to-br from-card to-background">
                <ul className="space-y-2">
                  {sources.map((s) => (
                    <li key={s} className="flex gap-2 text-xs text-muted-foreground leading-snug">
                      <Icon name="Check" className="text-primary shrink-0 mt-0.5" size={13} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/70">
          <span>Никто не забыт, ничто не забыто.</span>
          <span>Сделано с уважением к подвигу народа</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
