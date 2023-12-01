import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import { defaultLocale, messages } from './i18n';
import { getLanguage } from './utils/language.utils';
import { Language } from './types/i18n.type';
import ViewManager from './services/viewManager.service';
import appStore from './store/app.store';
import CallUsModal from './components/CallUsModal.vue';
import RingingComponent from './components/RingingComponent.vue';
import AnsweredComponent from './components/AnsweredComponent.vue';
import BadNumberComponent from './components/BadNumberComponent.vue';
import BusyComponent from './components/BusyComponent.vue';
import ConnectedComponent from './components/ConnectedComponent.vue';
import FailedComponent from './components/FailedComponent.vue';
import NoAnswerComponent from './components/NoAnswerComponent.vue';

export const i18n = createI18n({
  locale: defaultLocale,
  fallbackFormat: defaultLocale,
  messages: messages,
});

ViewManager.checkStatus();
const language: Language = getLanguage();
i18n.global.locale = language;

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(appStore);
app.component('app-call-us-modal', CallUsModal);
app.component('app-ringing', RingingComponent);
app.component('app-answered', AnsweredComponent);
app.component('app-bad-number', BadNumberComponent);
app.component('app-busy', BusyComponent);
app.component('app-connected', ConnectedComponent);
app.component('app-failed', FailedComponent);
app.component('app-no-answer', NoAnswerComponent);

app.mount('#app');
