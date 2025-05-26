import { NuDBCore } from './core.js';

export class NuDB extends NuDBCore {
  constructor(wsUrl, options = {}) {
    super(wsUrl, options);
  }

  connect() {
    this.socket = new WebSocket(this.wsUrl);

    this.socket.onopen = () => {
      console.log("🟢 NuDB WebSocket connected");
      this._processQueue();
      this._resubscribe();
    };

    this.socket.onmessage = this._handleMessage.bind(this);
    this.socket.onclose = this._handleClose.bind(this);
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

  _handleMessage(event) {
    try {
      const msg = JSON.parse(event.data);
      console.log("📩 NuDB received:", msg);

      if (msg.type === "update" && this.listeners[msg.path]) {
        this.listeners[msg.path].forEach((callback) => callback(msg.data));
      }

      if (msg.type === "data" && this.dataCallbacks[msg.path]) {
        this.dataCallbacks[msg.path].forEach((callback) => callback(msg.data));
        delete this.dataCallbacks[msg.path];
      }
    } catch (err) {
      console.error("NuDB message parse error:", err);
    }
  }

  _handleClose() {
    console.warn("🔴 NuDB WebSocket disconnected. Reconnecting...");
    setTimeout(() => this.connect(), 3000);
  }
}