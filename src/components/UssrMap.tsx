import type { ReactNode } from 'react';

// Стилизованная, но узнаваемая карта европейской части СССР.
// viewBox 1000 x 640. Контур суши, моря, крупные ориентиры.
const LAND =
  'M 250 230 C 300 200, 360 195, 420 185 C 470 150, 470 95, 480 60 C 500 95, 505 150, 540 175 ' +
  'C 600 175, 700 185, 800 210 C 880 230, 940 280, 950 350 C 935 420, 880 460, 800 470 ' +
  'C 760 440, 720 440, 700 460 C 660 450, 630 470, 600 480 C 590 510, 560 525, 530 515 ' +
  'C 520 540, 480 545, 455 525 C 430 540, 395 530, 380 505 C 340 510, 320 490, 330 460 ' +
  'C 300 470, 280 450, 290 425 C 250 430, 235 400, 250 375 C 230 360, 235 330, 255 320 ' +
  'C 235 300, 240 265, 250 230 Z';

type Props = {
  className?: string;
  children?: ReactNode;
  defs?: ReactNode;
  landFill?: string;
  landStroke?: string;
};

const UssrMap = ({ className, children, defs, landFill = 'hsl(var(--muted))', landStroke = 'hsl(var(--primary) / 0.5)' }: Props) => {
  return (
    <svg viewBox="0 0 1000 640" className={className} preserveAspectRatio="xMidYMid meet">
      <defs>{defs}</defs>

      {/* Моря */}
      <text x="120" y="120" className="fill-current text-muted-foreground/40" fontSize="14" fontFamily="Oswald">
        БАЛТИЙСКОЕ МОРЕ
      </text>
      <text x="430" y="560" className="fill-current text-muted-foreground/40" fontSize="14" fontFamily="Oswald">
        ЧЁРНОЕ МОРЕ
      </text>
      <text x="760" y="520" className="fill-current text-muted-foreground/40" fontSize="13" fontFamily="Oswald">
        КАСПИЙ
      </text>

      {/* Суша */}
      <path d={LAND} fill={landFill} stroke={landStroke} strokeWidth="2" strokeLinejoin="round" />
      {/* Внутренние «реки/линии» для фактуры */}
      <path d="M 545 270 L 700 410" stroke="hsl(var(--border))" strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M 430 180 L 545 270" stroke="hsl(var(--border))" strokeWidth="1.2" fill="none" opacity="0.5" />

      {children}
    </svg>
  );
};

export default UssrMap;
