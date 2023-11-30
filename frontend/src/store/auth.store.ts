import { getToken } from '@/utils/auth.utils';
import { createStore } from 'vuex';

const authStore = createStore({
  state: {
    token: getToken(),
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    logout(state) {
      state.token = null;
    },
  },
});

export default authStore;
