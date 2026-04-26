/**
 * Shared Theme Constants
 * Centralizing themes ensures visual consistency across all tools.
 * Each tool can extend these base themes with tool-specific properties.
 */

export interface BaseTheme {
  name: string;
  label: string;
  primary: string;
  secondary: string;
}

export const BASE_THEMES: BaseTheme[] = [
  {
    name: 'Default',
    label: 'ค่าเริ่มต้น',
    primary: '#FF8C00',
    secondary: '#FFB347',
  },
  {
    name: 'Vibrant',
    label: 'สีสันสดใส',
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
  },
  {
    name: 'Pastel',
    label: 'พาสเทล',
    primary: '#818CF8',
    secondary: '#60A5FA',
  },
  {
    name: 'Modern',
    label: 'โมเดิร์น',
    primary: '#264653',
    secondary: '#2A9D8F',
  }
];
