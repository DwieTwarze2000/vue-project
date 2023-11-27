import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import { defaultLocale, messages } from './i18n';
import { getLanguage } from './utils/language.utils';
import { Language } from './types/i18n.type';

export const i18n = createI18n({
  locale: defaultLocale,
  fallbackFormat: defaultLocale,
  messages: messages,
});

const language: Language = getLanguage();
i18n.global.locale = language;

const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount('#app');
