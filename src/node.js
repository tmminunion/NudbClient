import { NuDBCore } from './core.js';
import WebSocket from 'isomorphic-ws';

export class NuDB extends NuDBCore {
  constructor(wsUrl, options = {}) {
    super(wsUrl, options);
  }

  connect() {
    this.socket = new WebSocket(this.wsUrl);

    this.socket.on('open', () => {
      console.log("🟢 NuDB WebSocket connected");
      this._processQueue();
      this._resubscribe();
    });

    // Use arrow functions to maintain 'this' context
    this.socket.on('message', (data) => this._handleMessage(data));
    this.socket.on('close', () => this._handleClose());
    this.socket.on('error', (err) => {
      console.error("NuDB WebSocket error:", err);
    });
  }

  _processQueue() {
    while (this.queue.length > 0) {
      const action = this.queue.shift();
      this.socket.send(JSON.stringify(action));
    }
  }

  _resubscribe() {
    Object.keys(this.listeners).forEach((path) => {
      this.sendMessage({ type: "subscribe", path });
    });
  }
}