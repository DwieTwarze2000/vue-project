import { getToken } from '@/utils/auth.utils';
import { createStore } from 'vuex';
import { CallStatus } from '@/types/call.type';

interface AppState {
  token: string | null;
  phoneCallStatus: CallStatus;
}

const appStore = createStore<AppState>({
  state: {
    token: getToken(),
    phoneCallStatus: CallStatus.START,
  },
  mutations: {
    setToken(state: AppState, token: string): void {
      state.token = token;
    },
    logout(state: AppState): void {
      state.token = null;
    },
    setPhoneCallStatus(state: AppState, status: CallStatus): void {
      state.phoneCallStatus = status;
    },
  },
});

export default appStore;
