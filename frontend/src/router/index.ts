import { createRouter, createWebHashHistory } from 'vue-router';
import Start from '../views/StartView.vue';
import Ringing from '../views/RingingView.vue';
import Connected from '../views/ConnectedView.vue';
import Answered from '../views/AnsweredView.vue';
import Settings from '../views/SettingsView.vue';
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';
import Home from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/start',
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
    path: '/connected',
    name: 'connected',
    component: Connected,
  },
  {
    path: '/answered',
    name: 'answered',
    component: Answered,
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
