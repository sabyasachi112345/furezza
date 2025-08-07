import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// Prevent TS error by casting SockJS to WebSocket-compatible type
const SOCKET_URL = 'http://localhost:8080/ws';

const stompClient = new Client({
  webSocketFactory: () => new SockJS(SOCKET_URL),
  reconnectDelay: 5000,
  debug: (str) => console.log('[STOMP]', str),
});

export function connectStomp(onMessage: (msg: string) => void) {
  stompClient.onConnect = () => {
    console.log('✅ STOMP connected via SockJS');
    stompClient.subscribe('/topic/jobUpdates', (message: IMessage) => {
      console.log('📥 Message received:', message.body);
      onMessage(message.body);
    });
  };

  stompClient.onStompError = (frame) => {
    console.error('❌ STOMP error:', frame.headers['message']);
  };

  stompClient.activate();
}

export function disconnectStomp() {
  if (stompClient.connected) {
    stompClient.deactivate();
    console.log('🛑 STOMP disconnected');
  }
}