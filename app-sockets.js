var colors = require('colors/safe');

var state = {
    audience: [
        {
            name: "Paul Bunyon",
            id: "HHDIDHFIDDLBLDJF"
        },
        {
            name: "Paul Bunyon",
            id: "HHDIDHFIDDLBLDJF"
        },
        {
            name: "Paul Bunyon",
            id: "HHDIDHFIDDLBLDJF"
        },
        {
            name: "Paul Bunyon",
            id: "HHDIDHFIDDLBLDJF"
        }
    ],
    speaker: {
        name: 'Alex Banks',
        id: 'IOEGNODIOD:BNOHBOFHDOIFOID'
    },
    connections: []
};

module.exports = function (io) {

    io.sockets.on('connection', function (socket) {

        socket.once('disconnect', function () {
            state.connections.splice(state.connections.indexOf(socket), 1);
            console.log(colors.red("Disconnected: " + state.connections.length + " remaining. (" + socket.id + ") "));
            socket.disconnect();
        });

        state.connections.push(socket);
        console.log(colors.green("Connected: " + state.connections.length + " sockets connected. (" + socket.id + ")"));

    });

    return Object.create(state);

};