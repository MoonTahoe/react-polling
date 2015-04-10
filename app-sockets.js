var colors = require('colors/safe');
var $ = require('jquery');

var state = {
    audience: [],
    speaker: {
        name: '',
        id: ''
    },
    connections: []
};

function getMemberBySocketId(id) {
    return state.audience.filter(function (member) {
        return member.socketid === id;
    })[0];
}

module.exports = function (io) {

    io.sockets.on('connection', function (socket) {

        socket.once('disconnect', function () {
            var member = getMemberBySocketId(socket.id);
            state.audience.splice(state.audience.indexOf(member), 1);
            if (member) {
                socket.server.sockets.emit("audience", state.audience);
                console.log(colors.yellow("Left: " + member.name + " remaining. (" + state.audience.length + ") "));
            }
            state.connections.splice(state.connections.indexOf(socket), 1);
            console.log(colors.red("Disconnected: " + state.connections.length + " remaining. (" + socket.id + ") "));
            socket.disconnect();
        });

        socket.on('audience:join', function (payload) {
            state.audience.push({name: payload.name, socketid: socket.id});
            this.emit("member:joined", {type: 'audience', name: payload.name});
            this.server.sockets.emit('audience', state.audience);
            console.log(colors.blue('Audience Joined: ' + payload.name + ' (' + state.audience.length + ')'));
        });

        state.connections.push(socket);
        socket.emit('serverState', {audience: state.audience, speaker: state.speaker});
        console.log(colors.green("Connected: " + state.connections.length + " sockets connected. (" + socket.id + ")"));

    });

    return Object.create(state);

};