import { getToken } from '@/utils/auth.utils';
import { createStore } from 'vuex';
import { CallStatus } from '@/types/call.type';

const appStore = createStore({
  state: {
    token: getToken(),
    phoneCallStatus: CallStatus.START,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    logout(state) {
      state.token = null;
    },
    setPhoneCallStatus(state, status) {
      state.phoneCallStatus = status;
    },
  },
});

export default appStore;
