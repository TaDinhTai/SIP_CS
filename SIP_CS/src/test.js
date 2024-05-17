import app from "./app.js";
import "./database.js";
import { PORT } from "./config.js";
import "./libs/initialSetup.js";
import http from 'http';
import { Server } from 'socket.io';

const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000","http://localhost:8080","http://localhost:19335"],
        method: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    console.log('A user connected to socket');

    socket.on('disconnect', () => {
        console.log('User disconnected from socket');
    });
});

// Pass 'io' to app.locals so that it's accessible within controllers

httpServer.listen(PORT, () => {
    console.log("Server on port", PORT);
});

socket1.on('employeeCreated', () => {
  console.log("employeeCreated")
  fetchEmployee();
});
socket1.on('employeeUpdated', () => {
  console.log("employeeUpdated")
  fetchEmployee();
});
socket1.on('employeeDeleted', () => {
  console.log("employeeDeleted")
  fetchEmployee();
});

const socket1 = io('http://localhost:4000');