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
      document.documentElement.style.setProperty(
        '--bg-color',
        'linear-gradient(168deg, #E84062 0%, #F6AB60 79.17%)'
      );
      document.documentElement.style.setProperty('--color', '#000000');
      break;
    case Theme.DARK:
      document.documentElement.style.setProperty(
        '--bg-color',
        'linear-gradient(168deg, #0a1d50 0%, #440384 79.17%)'
      );
      document.documentElement.style.setProperty('--color', '#ffffff');
      break;
  }
};
