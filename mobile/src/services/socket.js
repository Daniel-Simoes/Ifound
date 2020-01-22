import socketio from 'socket.io-client';

const socket = socketio('http://192.168.43.92:3333', {
    autoConnect: false,
});

function connect() {
    socket.connect();
}

function disconnect() {
    if (socketConnected) {
        socketDisconnect();
    }
}

export {
    connect,
    disconnect,
};