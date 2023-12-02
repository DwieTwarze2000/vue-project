import { createRouter, createWebHashHistory } from 'vue-router';
import Settings from '../views/SettingsView.vue';
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';
import Home from '../views/HomeView.vue';
import PhoneCallHistory from '../views/PhoneCallHistoryView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    props: true,
  },
  {
    path: '/phoneCallHistory',
    name: 'phoneCallHistory',
    component: PhoneCallHistory,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
