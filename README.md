# NuDB - Universal Realtime Database

NuDB is a lightweight realtime database that works in both Node.js and browser environments.

## Installation

```bash
npm install nudb
# or
yarn add nudb
```

## Usage

### Browser
```javascript
import NuDB from 'nudb';

const db = new NuDB('ws://your-server-url');

db.on('messages', (data) => {
  console.log('New message:', data);
});

db.set('messages/123', { text: 'Hello world' });
```

### Node.js
```javascript
const { NuDB } = require('nudb');

const db = new NuDB('ws://your-server-url');

db.get('config', (data) => {
  console.log('Server config:', data);
});
```

## API

- `new NuDB(url, options)` - Create new connection
- `setHeader(key, value)` - Set authentication headers
- `on(path, callback)` - Subscribe to data changes
- `get(path, callback)` - Get data once
- `set(path, data)` - Set data
- `push(path, data)` - Push data with auto-generated ID
- `update(path, data)` - Update existing data
- `delete(path)` - Delete data
- `close()` - Close connection# NudbClient
