import { createRouter, createWebHashHistory } from 'vue-router';
import Start from '../views/StartView.vue';
import Ringing from '../views/RingingView.vue';
import Settings from '../views/SettingsView.vue';
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';

const routes = [
  {
    path: '/',
    name: 'start',
    component: Start,
  },
  {
    path: '/ringing',
    name: 'ringing',
    component: Ringing,
    props: true,
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
