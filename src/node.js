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

    this.socket.on('message', this._handleMessage.bind(this));
    this.socket.on('close', this._handleClose.bind(this));
    this.socket.on('error', (err) => {
      console.error("NuDB WebSocket error:", err);
    });
  }

  // ... (same helper methods as browser implementation)
}