var colors = require('colors/safe');
var $ = require('jquery');

var state = {
    audience: [],
    speaker: {
        name: '',
        id: '',
        title: 'Presentation'
    },
    questions: require('./app-questions'),
    answers: [],
    connections: []
};

function getMemberBySocketId(id) {
    return state.audience.filter(function (member) {
        return member.id === id;
    })[0];
}

function getSocketById(id) {
    return state.connections.filter(function (cnx) {
        return id === cnx.id;
    })[0];
}

module.exports = function (io) {

    io.sockets.on('connection', function (socket) {

        socket.once('disconnect', function () {
            if (socket.id === state.speaker.id) {
                console.log(colors.magenta("Presentation Ended: " + state.speaker.title + " by " + state.speaker.name));
                state.speaker = {
                    name: '',
                    id: '',
                    title: 'Presentation'
                };
                socket.server.sockets.emit("presentation:end", state.speaker);
            } else {
                var member = getMemberBySocketId(socket.id);
                state.audience.splice(state.audience.indexOf(member), 1);
                if (member) {
                    socket.server.sockets.emit("audience", state.audience);
                    console.log(colors.yellow("Left: " + member.name + " remaining. (" + state.audience.length + ") "));
                }
            }
            state.connections.splice(state.connections.indexOf(socket), 1);
            console.log(colors.red("Disconnected: " + state.connections.length + " remaining. (" + socket.id + ") "));
            socket.disconnect();
        });

        socket.on('ping', function (id) {
            var member = getMemberBySocketId(id);
            var targetSocket = getSocketById(id);
            if (targetSocket && member) {
                targetSocket.emit('ping', socket.id);
                console.log(colors.cyan('Ping: ' + member.name + ' (' + id + ')'));
            }
        });

        socket.on('ask:question', function (question) {
            state.answers.push({ q: question.q });
            this.server.sockets.emit('ask:question', question);
            console.log(colors.bgBlue(colors.yellow('Ask: ' + question.q)));
        });

        socket.on('answer:question', function (payload) {
            var member = getMemberBySocketId(this.id);
            if (member) {
                console.log(colors.bgYellow(colors.blue('Answer ' + member.name + ': (' + payload.choice + ') ' + payload.question[payload.choice] )));
            }
        });

        socket.on('speaker:join', function (payload) {
            state.speaker.name = payload.name;
            state.speaker.id = socket.id;
            state.speaker.title = payload.title;
            this.emit('member:joined', {type: 'speaker', name: payload.name, title: payload.title});
            this.emit('questions', state.questions);
            this.server.sockets.emit('presentation:start', state.speaker);
            console.log(colors.magenta("Presentation Started: " + payload.title + " by " + payload.name));
        });

        socket.on('audience:join', function (payload) {
            state.audience.push({name: payload.name, id: socket.id});
            this.emit("member:joined", {type: 'audience', name: payload.name, id: socket.id});
            this.server.sockets.emit('audience', state.audience);
            console.log(colors.yellow('Audience Joined: ' + payload.name + ' (' + state.audience.length + ')'));
        });

        state.connections.push(socket);
        socket.emit('serverState', {audience: state.audience, speaker: state.speaker});
        console.log(colors.green("Connected: " + state.connections.length + " sockets connected. (" + socket.id + ")"));

    });

    return Object.create(state);

};