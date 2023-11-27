import { Language } from '@/types/i18n.type';

import en from './en.json';
import pl from './pl.json';
import de from './de.json';

export const messages = {
  [Language.EN]: en,
  [Language.PL]: pl,
  [Language.DE]: de,
};

export const defaultLocale = Language.PL;
