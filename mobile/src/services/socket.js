import socketio from 'socket.io-client';

const socket = socketio('http://192.168.43.92:3333', {
    autoConnect: false,
});

function subscribeToNewUsers(subscribeFuncion) {
    socket.on('new-user', subscribeFuncion);

}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {latitude, longitude, techs,};
    
    socket.connect();

    
}

function disconnect() {
    if (socketConnected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewUsers,
};