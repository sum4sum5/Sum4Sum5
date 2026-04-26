/**
 * Theme tokens derived from BASE_THEMES for each randomizer / wheel tool.
 */

import { BASE_THEMES, type BaseTheme } from '@/constants/themes';

export type NameRandomizerTheme = BaseTheme & {
  accent: string;
  bgGlow1: string;
  bgGlow2: string;
};

export const NAME_RANDOMIZER_THEMES: NameRandomizerTheme[] = BASE_THEMES.map((base) => {
  const bgGlow1 = `${base.primary}1a`;
  const bgGlow2 = base.secondary ? `${base.secondary}10` : `${base.primary}08`;
  return {
    ...base,
    accent:
      base.name === 'Default'
        ? '#FFD700'
        : base.name === 'Vibrant'
          ? '#FFE66D'
          : base.name === 'Pastel'
            ? '#34D399'
            : '#E9C46A',
    bgGlow1,
    bgGlow2,
  };
});

export type NumberRandomizerTheme = BaseTheme & {
  accent: string;
  machineTop: string;
  glow: string;
  lever: string;
  bgGlow1: string;
  bgGlow2: string;
};

export const NUMBER_RANDOMIZER_THEMES: NumberRandomizerTheme[] = BASE_THEMES.map((base) => {
  let glow = 'rgba(255, 140, 0, 0.2)';
  let bgGlow1 = 'rgba(255, 140, 0, 0.1)';
  let bgGlow2 = 'rgba(255, 69, 0, 0.05)';
  let lever = base.primary;

  if (base.name === 'Vibrant') {
    glow = 'rgba(255, 107, 107, 0.2)';
    bgGlow1 = 'rgba(255, 107, 107, 0.12)';
    bgGlow2 = 'rgba(78, 205, 196, 0.08)';
  } else if (base.name === 'Pastel') {
    glow = 'rgba(129, 140, 248, 0.2)';
    bgGlow1 = 'rgba(129, 140, 248, 0.1)';
    bgGlow2 = 'rgba(244, 114, 182, 0.08)';
    lever = '#F472B6';
  } else if (base.name === 'Modern') {
    glow = 'rgba(38, 70, 83, 0.2)';
    bgGlow1 = 'rgba(38, 70, 83, 0.08)';
    bgGlow2 = 'rgba(231, 111, 81, 0.06)';
    lever = '#E76F51';
  }

  return {
    ...base,
    accent:
      base.name === 'Default'
        ? '#FFD700'
        : base.name === 'Vibrant'
          ? '#FFE66D'
          : base.name === 'Pastel'
            ? '#34D399'
            : '#E9C46A',
    machineTop: base.primary,
    glow,
    lever,
    bgGlow1,
    bgGlow2,
  };
});

export type FortuneWheelTheme = BaseTheme & {
  colors: string[];
  ring: string;
  button: string;
};

export const FORTUNE_WHEEL_THEMES: FortuneWheelTheme[] = BASE_THEMES.map((base) => {
  let wheelColors = [
    '#FF8C00',
    '#FFB347',
    '#FFD700',
    '#FFA500',
    '#FF7F50',
    '#FF6347',
    '#D35400',
    '#E67E22',
  ];
  let buttonColor = base.primary;

  if (base.name === 'Vibrant') {
    wheelColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF8C00', '#9B5DE5', '#F15BB5', '#00BBF9', '#00F5D4'];
  } else if (base.name === 'Pastel') {
    wheelColors = ['#818CF8', '#60A5FA', '#34D399', '#F472B6', '#FBBF24', '#F43F5E'];
    buttonColor = '#F472B6';
  } else if (base.name === 'Modern') {
    wheelColors = ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51', '#3D405B', '#81B29A', '#F2CC8F'];
  }

  return {
    ...base,
    colors: wheelColors,
    ring: base.secondary || base.primary,
    button: buttonColor,
  };
});
