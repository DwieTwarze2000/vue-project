import { Language } from '@/types/i18n.type';

export const saveLanguage = (language: Language) => {
  localStorage.setItem('language', language);
};

export const getLanguage = (): Language => {
  const language = localStorage.getItem('language');
  if (language) {
    return language as Language;
  }
  return Language.PL;
};
