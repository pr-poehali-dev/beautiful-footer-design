const BASE = 'https://cdn.poehali.dev/projects/7836e47e-38ae-4724-91ec-b2ed2318e8c0/files';
const HERO_IMG = `${BASE}/b9f6cb6e-a89e-42c1-91cf-77125c7a6dd1.jpg`;
const TANK_IMG = `${BASE}/4f7e7082-a61f-41b1-9dcc-29239db816ba.jpg`;
const PLANE_IMG = `${BASE}/09dbdd4b-7f2f-4fac-84ef-fcd7132f52fc.jpg`;
const ROCKET_IMG = `${BASE}/936c697f-8b91-4e91-b633-cae9b581607e.jpg`;

export type HeroCity = {
  id: string;
  name: string;
  year: string;
  photo: string;
  desc: string;
};

export const heroCities: HeroCity[] = [
  { id: 'leningrad', name: 'Ленинград', year: '1965', photo: HERO_IMG, desc: '872 дня блокады. Город не сдался, несмотря на голод и бомбардировки.' },
  { id: 'moscow', name: 'Москва', year: '1965', photo: HERO_IMG, desc: 'Битва за Москву (1941–1942) — первое крупное поражение вермахта. Столица выстояла.' },
  { id: 'volgograd', name: 'Волгоград', year: '1965', photo: HERO_IMG, desc: 'Сталинградская битва — коренной перелом в ходе всей Второй мировой войны.' },
  { id: 'kyiv', name: 'Киев', year: '1965', photo: HERO_IMG, desc: 'Героическая оборона 1941 года сковала крупные силы противника на три месяца.' },
  { id: 'sevastopol', name: 'Севастополь', year: '1965', photo: HERO_IMG, desc: '250 дней обороны главной базы Черноморского флота в 1941–1942 гг.' },
  { id: 'odessa', name: 'Одесса', year: '1965', photo: HERO_IMG, desc: '73 дня героической обороны черноморского города. Город эвакуирован морем.' },
  { id: 'minsk', name: 'Минск', year: '1974', photo: HERO_IMG, desc: 'Центр партизанского движения Белоруссии, подпольной борьбы в тылу врага.' },
  { id: 'kerch', name: 'Керчь', year: '1973', photo: HERO_IMG, desc: 'Кровопролитные бои за Керченский полуостров, каменоломни Аджимушкая.' },
  { id: 'novorossiysk', name: 'Новороссийск', year: '1973', photo: HERO_IMG, desc: 'Малая Земля — 225 дней обороны плацдарма. Десант Куникова.' },
  { id: 'tula', name: 'Тула', year: '1976', photo: HERO_IMG, desc: 'Оборона Тулы прикрыла Москву с юга осенью 1941 года. Город оружейников.' },
  { id: 'murmansk', name: 'Мурманск', year: '1985', photo: HERO_IMG, desc: 'Заполярный порт, через который шли поставки союзников по ленд-лизу.' },
  { id: 'smolensk', name: 'Смоленск', year: '1985', photo: HERO_IMG, desc: 'Смоленское сражение задержало наступление на Москву на два месяца.' },
];

// ─── ТЕХНИКА ─────────────────────────────────────────────────────────────────
export type Vehicle = {
  id: string;
  name: string;
  type: string;
  photo: string;
  desc: string;
  specs: { label: string; value: string }[];
};

export const vehiclesWehrmacht: Vehicle[] = [
  {
    id: 'pz4', name: 'Panzerkampfwagen IV', type: 'Танк',
    photo: TANK_IMG,
    desc: 'Основной средний танк вермахта в 1941 году. Вооружён 75-мм орудием.',
    specs: [{ label: 'Броня', value: '30–80 мм' }, { label: 'Орудие', value: '75 мм KwK 40' }, { label: 'Экипаж', value: '5 чел.' }, { label: 'Скорость', value: '42 км/ч' }],
  },
  {
    id: 'pz3', name: 'Panzerkampfwagen III', type: 'Танк',
    photo: TANK_IMG,
    desc: 'Лёгкий танк — основа танковых клиньев 1941 года. 50-мм пушка.',
    specs: [{ label: 'Броня', value: '30 мм' }, { label: 'Орудие', value: '50 мм KwK 38' }, { label: 'Экипаж', value: '5 чел.' }, { label: 'Скорость', value: '40 км/ч' }],
  },
  {
    id: 'bf109', name: 'Messerschmitt Bf 109', type: 'Истребитель',
    photo: PLANE_IMG,
    desc: 'Господство в воздухе в первые месяцы войны. Уничтожал советские самолёты прямо на аэродромах.',
    specs: [{ label: 'Скорость', value: '578 км/ч' }, { label: 'Вооружение', value: '2×MG 17 + 2×MG 151' }, { label: 'Дальность', value: '660 км' }, { label: 'Потолок', value: '11 000 м' }],
  },
  {
    id: 'stuka', name: 'Junkers Ju 87 Stuka', type: 'Пикирующий бомбардировщик',
    photo: PLANE_IMG,
    desc: 'Символ блицкрига. Сирена при пикировании наводила ужас. Поддержка наземных войск.',
    specs: [{ label: 'Бомбовая нагрузка', value: '500 кг' }, { label: 'Скорость', value: '410 км/ч' }, { label: 'Экипаж', value: '2 чел.' }, { label: 'Дальность', value: '790 км' }],
  },
];

export const vehiclesRedArmy: Vehicle[] = [
  {
    id: 't34', name: 'Танк Т-34', type: 'Средний танк',
    photo: TANK_IMG,
    desc: 'Лучший танк Второй мировой по мнению многих историков. Наклонная броня и 76-мм пушка.',
    specs: [{ label: 'Броня', value: '45–52 мм (наклонная)' }, { label: 'Орудие', value: '76 мм Ф-34' }, { label: 'Экипаж', value: '4 чел.' }, { label: 'Скорость', value: '55 км/ч' }],
  },
  {
    id: 'kv1', name: 'Тяжёлый танк КВ-1', type: 'Тяжёлый танк',
    photo: TANK_IMG,
    desc: 'Непробиваемый для большинства орудий вермахта в 1941 году. Один КВ мог остановить колонну.',
    specs: [{ label: 'Броня', value: '75–110 мм' }, { label: 'Орудие', value: '76 мм ЗИС-5' }, { label: 'Экипаж', value: '5 чел.' }, { label: 'Масса', value: '47,5 т' }],
  },
  {
    id: 'il2', name: 'Штурмовик Ил-2', type: 'Штурмовик',
    photo: PLANE_IMG,
    desc: '«Летающий танк» — самый массовый боевой самолёт в истории. Бронированный корпус.',
    specs: [{ label: 'Бронирование', value: '4–12 мм' }, { label: 'Вооружение', value: '2×ВЯ-23 + бомбы 600 кг' }, { label: 'Скорость', value: '404 км/ч' }, { label: 'Экипаж', value: '2 чел.' }],
  },
  {
    id: 'katyusha', name: 'Реактивный миномёт БМ-13 «Катюша»', type: 'РСЗО',
    photo: ROCKET_IMG,
    desc: 'Секретное оружие 1941 года. Залп из 16 ракет накрывал площадь 4 га за 7–10 секунд.',
    specs: [{ label: 'Ракеты', value: '16 × М-13' }, { label: 'Дальность', value: 'до 8,5 км' }, { label: 'Время залпа', value: '7–10 сек' }, { label: 'Шасси', value: 'ЗИС-6 / Studebaker' }],
  },
];

// ─── ГРУППЫ АРМИЙ / СРАЖЕНИЯ ──────────────────────────────────────────────────
export type Battle = {
  id: string;
  name: string;
  dates: string;
  location: string;
  result: 'ussr-win' | 'ger-win' | 'draw';
  resultLabel: string;
  desc: string;
  details: string;
};

export type ArmyGroup = {
  id: string;
  name: string;
  commander: string;
  direction: string;
  icon: string;
  color: string;
  // Вермахт
  germanyForce: string;
  germanyTanks: number;
  germanyAircraft: number;
  germanyLoss: string;
  // СССР
  ussrCommander: string;
  ussrForce: string;
  ussrTanks: number;
  ussrAircraft: number;
  ussrLoss: string;
  // итог
  advanceKm: number;
  outcome: 'stopped' | 'partial' | 'failed';
  outcomeFull: string;
  // подчинённые сражения
  battles: Battle[];
  // техника
  germanyVehicles: string[]; // id из vehiclesWehrmacht
  ussrVehicles: string[]; // id из vehiclesRedArmy
};

export const armyGroups: ArmyGroup[] = [
  {
    id: 'north',
    name: 'Группа армий «Север»',
    commander: 'Фельдмаршал В. фон Лееб',
    direction: 'Восточная Пруссия → Прибалтика → Ленинград',
    icon: 'Navigation',
    color: '#ef4444',
    germanyForce: '725 000 чел., 3 армии',
    germanyTanks: 686,
    germanyAircraft: 1070,
    germanyLoss: '90 000 убитых и раненых (1941)',
    ussrCommander: 'Генерал Ф. Кузнецов / К. Ворошилов',
    ussrForce: '~540 000 чел.',
    ussrTanks: 1500,
    ussrAircraft: 1100,
    ussrLoss: '~500 000 убитыми, ранеными и плен.',
    advanceKm: 900,
    outcome: 'partial',
    outcomeFull: 'Остановлена у стен Ленинграда. Началась блокада (8 сент. 1941 г.) — 872 дня.',
    germanyVehicles: ['pz3', 'bf109', 'stuka'],
    ussrVehicles: ['t34', 'il2', 'katyusha'],
    battles: [
      { id: 'b1', name: 'Приграничные сражения в Прибалтике', dates: '22–29 июня 1941', location: 'Литва, Латвия', result: 'ger-win', resultLabel: 'Победа Германии', desc: 'Стремительный прорыв через прибалтийские республики.', details: 'За 6 дней группа армий продвинулась на 300–400 км, прорвав советскую оборону в нескольких местах.' },
      { id: 'b2', name: 'Оборона Таллина', dates: '5–28 авг. 1941', location: 'Таллин, Эстония', result: 'ger-win', resultLabel: 'Эвакуация флота', desc: 'Героическая оборона столицы Эстонии и прорыв Балтийского флота.', details: 'Гарнизон держался 3 недели. Флот прорвался в Кронштадт под ударами авиации.' },
      { id: 'b3', name: 'Битва за Ленинград', dates: '10 июля – 9 авг. 1944', location: 'Ленинград и окрестности', result: 'ussr-win', resultLabel: 'Победа СССР', desc: '872 дня осады. Город выстоял. Блокада снята 27 января 1944 г.', details: 'Несмотря на голод и бомбардировки, город продолжал работать и обороняться. По «Дороге жизни» доставлялось продовольствие.' },
    ],
  },
  {
    id: 'center',
    name: 'Группа армий «Центр»',
    commander: 'Фельдмаршал Ф. фон Бок',
    direction: 'Польша → Минск → Смоленск → Москва',
    icon: 'Target',
    color: '#f97316',
    germanyForce: '1 180 000 чел., 4 армии + 2 танк. группы',
    germanyTanks: 1700,
    germanyAircraft: 1500,
    germanyLoss: '170 000 убитых и раненых (1941)',
    ussrCommander: 'Маршал С. Тимошенко / Г. Жуков',
    ussrForce: '~1 250 000 чел.',
    ussrTanks: 2900,
    ussrAircraft: 1800,
    ussrLoss: '~2 000 000 убитыми, ранеными и плен.',
    advanceKm: 1000,
    outcome: 'failed',
    outcomeFull: 'Разбита под Москвой в декабре 1941. Первое стратегическое поражение вермахта во Второй мировой.',
    germanyVehicles: ['pz4', 'pz3', 'bf109', 'stuka'],
    ussrVehicles: ['t34', 'kv1', 'il2', 'katyusha'],
    battles: [
      { id: 'b1', name: 'Белостокско-Минский котёл', dates: '22 июня – 8 июля 1941', location: 'Белоруссия', result: 'ger-win', resultLabel: 'Победа Германии', desc: 'Двойное окружение западнее Минска — одна из крупнейших катастроф Красной Армии.', details: 'В котёл попало более 320 000 советских солдат. Взято 287 000 пленных. Вермахт потерял около 12 000 человек.' },
      { id: 'b2', name: 'Смоленское сражение', dates: '10 июля – 10 сент. 1941', location: 'Смоленск', result: 'draw', resultLabel: 'Пиррова победа Германии', desc: 'Двухмесячная битва задержала наступление на Москву.', details: 'Первый советский контрудар под Ельней. Немецкие потери — 51 000 человек. Сроки операции «Барбаросса» сорваны.' },
      { id: 'b3', name: 'Вяземский котёл', dates: '2–13 окт. 1941', location: 'Вязьма', result: 'ger-win', resultLabel: 'Победа Германии', desc: 'Операция «Тайфун» — окружение трёх советских армий под Вязьмой.', details: 'Немцы взяли в плен более 600 000 советских солдат. Путь на Москву казался открытым.' },
      { id: 'b4', name: 'Битва за Москву', dates: '30 сент. 1941 – 20 апр. 1942', location: 'Москва', result: 'ussr-win', resultLabel: 'Победа СССР', desc: 'Контрнаступление отбросило вермахт на 100–250 км от столицы.', details: 'Первое поражение вермахта на Восточном фронте. Миф о непобедимости немецкой армии разрушен.' },
    ],
  },
  {
    id: 'south',
    name: 'Группа армий «Юг»',
    commander: 'Фельдмаршал Г. фон Рундштедт',
    direction: 'Польша + Румыния → Украина → Кавказ',
    icon: 'Flame',
    color: '#eab308',
    germanyForce: '1 000 000 чел. (включая румын. войска)',
    germanyTanks: 1100,
    germanyAircraft: 1300,
    germanyLoss: '120 000 убитых и раненых (1941)',
    ussrCommander: 'Маршал С. Будённый / С. Тимошенко',
    ussrForce: '~1 400 000 чел.',
    ussrTanks: 3400,
    ussrAircraft: 2200,
    ussrLoss: '~1 500 000 убитыми, ранеными и плен.',
    advanceKm: 1400,
    outcome: 'partial',
    outcomeFull: 'Заняла Украину и Донбасс. Остановлена под Сталинградом в 1942–43 гг.',
    germanyVehicles: ['pz4', 'pz3', 'stuka'],
    ussrVehicles: ['t34', 'kv1', 'katyusha'],
    battles: [
      { id: 'b1', name: 'Танковое сражение под Дубно–Луцком–Бродами', dates: '23–30 июня 1941', location: 'Западная Украина', result: 'draw', resultLabel: 'Контрудар СССР', desc: 'Крупнейшее танковое сражение начального периода войны.', details: 'Советские мехкорпуса нанесли мощный контрудар. Несмотря на потери, немецкое наступление замедлилось на неделю.' },
      { id: 'b2', name: 'Оборона Киева', dates: '7 июля – 19 сент. 1941', location: 'Киев', result: 'ger-win', resultLabel: 'Победа Германии', desc: 'Крупнейшее окружение в истории: более 650 000 пленных.', details: 'Сталин запретил отступление. Киевский котёл стал крупнейшей катастрофой в военной истории по числу пленных.' },
      { id: 'b3', name: 'Оборона Одессы', dates: '5 авг. – 16 окт. 1941', location: 'Одесса', result: 'ussr-win', resultLabel: 'Успешная эвакуация', desc: '73 дня обороны. Гарнизон эвакуирован и переброшен в Крым.', details: 'Небольшой гарнизон сдерживал 18 румынских дивизий. Успешная морская эвакуация.' },
      { id: 'b4', name: 'Оборона Севастополя', dates: '30 окт. 1941 – 4 июля 1942', location: 'Севастополь', result: 'ger-win', resultLabel: 'Пал после 250 дней', desc: '250 дней героической обороны главной военно-морской базы.', details: 'Осада длилась 8 месяцев. Защитники сковали значительные силы 11-й армии Манштейна.' },
    ],
  },
];

export const timeline = [
  { date: '22 июня 1941', title: 'Начало войны', text: 'Германия напала на СССР без объявления войны по всей линии границы.' },
  { date: 'Сентябрь 1941', title: 'Блокада Ленинграда', text: 'Город оказался в кольце. Началась 872-дневная оборона.' },
  { date: 'Декабрь 1941', title: 'Битва за Москву', text: 'Контрнаступление Красной Армии отбросило вермахт от столицы.' },
  { date: 'Ноябрь 1942', title: 'Сталинград', text: 'Начало контрнаступления, окружившего 6-ю армию Паулюса.' },
  { date: 'Июль 1943', title: 'Курская дуга', text: 'Крупнейшее танковое сражение. Стратегическая инициатива у СССР.' },
  { date: '9 мая 1945', title: 'Победа', text: 'Капитуляция Германии. Конец Великой Отечественной войны.' },
];

export type Stat = {
  target: number;
  suffix?: string;
  label: string;
  icon: string;
  detail: string;
};

export const stats: Stat[] = [
  { target: 12, label: 'Городов-героев', icon: 'Shield', detail: 'Высшее звание за массовый героизм при обороне' },
  { target: 1418, label: 'Дней и ночей войны', icon: 'CalendarDays', detail: 'С 22 июня 1941 по 9 мая 1945 года' },
  { target: 11657, label: 'Героев Советского Союза', icon: 'Award', detail: 'Удостоены высшей степени отличия' },
  { target: 27, suffix: ' млн', label: 'Жизней за Победу', icon: 'Flame', detail: 'Цена свободы, которую помнят поколения' },
];
