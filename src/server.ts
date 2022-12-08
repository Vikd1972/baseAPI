/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-void */
import { createServer } from 'http';
import { Server } from 'socket.io';

import app from './app';
import type { ServerToClientEvents, ClientToServerEvents } from './typeSocket';
import setComment from './utils/setComment';
import { connect } from './db/data-source';
import config from './config';

const httpServer = createServer(app);
const io = new Server<ServerToClientEvents, ClientToServerEvents>(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  socket.on('comment', (...options) => {
    setComment(options[0]);
    socket.broadcast.emit('comment', ...options);
  });
});

void (async () => {
  try {
    await connect();
    httpServer.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log('Server start on port', config.port);
    });
  } catch (error) {
    console.error(error);
  }
})();
