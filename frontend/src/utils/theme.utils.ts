import { Theme } from '../types/theme.type';

export const saveTheme = (theme: Theme): void => {
  localStorage.setItem('theme', theme);
};

export const getTheme = (): Theme => {
  const theme = localStorage.getItem('theme');
  if (theme) {
    return theme as Theme;
  }
  return Theme.LIGHT;
};

export const setThemeColors = (theme: Theme): void => {
  switch (theme) {
    case Theme.LIGHT:
      document.documentElement.style.setProperty('--bg-color', '#aabff3');
      document.documentElement.style.setProperty(
        '--bg-color-secondary',
        '#bfd1ff'
      );
      document.documentElement.style.setProperty('--color', '#000000');
      break;
    case Theme.DARK:
      document.documentElement.style.setProperty('--bg-color', '#0a1d50');
      document.documentElement.style.setProperty(
        '--bg-color-secondary',
        '#0f2c79'
      );
      document.documentElement.style.setProperty('--color', '#ffffff');
      break;
  }
};
