import { io, Socket } from 'socket.io-client';
import { apiUrl } from './api.service';
import appStore from '@/store/app.store';
import { CallStatus } from '@/types/call.type';

class ViewManager {
  static status: CallStatus;

  constructor() {
    ViewManager.status = CallStatus.START;
  }

  public static checkStatus(): void {
    console.log('Checking status...');
    const socket: Socket = io(apiUrl, {
      reconnection: false,
      transports: ['websocket', 'polling'],
    });

    socket.on('status', (status: CallStatus) => {
      console.log('status', status);
      console.log('this.status', ViewManager.status);
      if (status !== ViewManager.status) {
        this.status = status;
        appStore.commit('setPhoneCallStatus', status);
      }
    });
  }
}

export default ViewManager;
