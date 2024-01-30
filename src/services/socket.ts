import http from 'http';
import { Server } from 'socket.io'

const initializeSocket = (server: http.Server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:8080' //fronend url
        },
    });
    return io;
};

export default initializeSocket;