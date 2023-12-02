import { Language } from '@/types/i18n.type';

import en from './en.json';
import pl from './pl.json';
import de from './de.json';
import ch from './ch.json';

export const messages = {
  [Language.EN]: en,
  [Language.PL]: pl,
  [Language.DE]: de,
  [Language.CH]: ch,
};

export const defaultLocale = Language.PL;
