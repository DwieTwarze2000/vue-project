import router from '../router';
import { io, Socket } from 'socket.io-client';
import { apiUrl } from './api.service';

class ViewManager {
  static status: string | null;
  static interval: any;

  constructor() {
    ViewManager.interval = null;
    ViewManager.status = null;
  }

  private static changeView(): void {
    switch (this.status) {
      case 'CONNECTED':
        router.push({ name: 'connected' });
        break;
      case 'FAILED':
        router.push({ name: 'failed' });
        break;
      case 'ANSWERED':
        router.push({ name: 'answered' });
        break;
      case 'RINGING':
        router.push({ name: 'ringing' });
        break;
    }
  }

  public static checkStatus(): void {
    console.log('Checking status...');
    const socket: Socket = io(apiUrl, {
      reconnection: false,
      transports: ['websocket', 'polling'],
    });

    socket.on('status', (status: string) => {
      if (status !== this.status) {
        this.status = status;
        this.changeView();
      }
    });
  }
}

export default ViewManager;
