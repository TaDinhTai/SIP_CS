import app from "./app.js";
import "./database.js";
import { PORT } from "./config.js";
import "./libs/initialSetup.js";

import { Server } from 'socket.io';
import http from 'http';
// import { socketServices } from "./services/socket.services.js";


const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
  cors: {
      origin: ["http://localhost:3000","http://localhost:4000","http://localhost:3001","http://localhost:3001/employees", "http://localhost:19335"],
      method: ["GET", "POST"],
  }
});
global._io = io;

// global._io.on('connection',  socketServices.connection);

io.on('connection', (socket) => {
  console.log('A user connected to socket');

  socket.on('disconnect', () => {
      console.log('User disconnected from socket');
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});

// app.listen(PORT);
// console.log("Server on port", app.get("port"));
