var colors = require('colors/safe');
var extend = require('util-extend');
var $ = require('jquery');

var state = {
    audience: [],
    speaker: {
        name: '',
        id: '',
        title: 'Presentation'
    },
    currentQuestion: false,
    currentAnswers: {
        "a": 0,
        "b": 0,
        "c": 0,
        "d": 0
    },
    membersAnswered: [],
    questions: require('./app-questions'),
    connections: [],
    scoreboard: null
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

function resetAnswers() {
    state.membersAnswered = [];
    Object.keys(state.currentAnswers).forEach(function (option) {
        state.currentAnswers[option] = 0;
    });
}

module.exports = function (io) {

    io.sockets.on('connection', function (socket) {

        var clientState = extend({}, state);
        delete clientState.connections;
        delete clientState.scoreboard;

        socket.once('disconnect', function () {
            var member = getMemberBySocketId(socket.id);
            if (socket.id === state.speaker.id) {
                console.log(colors.magenta("Presentation Ended: " + state.speaker.title + " by " + state.speaker.name));
                state.speaker = {
                    name: '',
                    id: '',
                    title: 'Presentation',
                    currentQuestion: false,
                    currentAnswers: {
                        "a": 0,
                        "b": 0,
                        "c": 0,
                        "d": 0
                    },
                    membersAnswered: []
                };
                socket.server.sockets.emit("presentation:end", state.speaker);
            } else if (member) {
                state.audience.splice(state.audience.indexOf(member), 1);
                socket.server.sockets.emit("audience", state.audience);
                console.log(colors.yellow("Left: " + member.name + " remaining. (" + state.audience.length + ") "));
            } else {
                console.log(colors.grey("Scoreboard Socket Disconnected"));
            }
            state.connections.splice(state.connections.indexOf(socket), 1);
            console.log(colors.red("Disconnected: " + state.connections.length + " remaining. (" + socket.id + ") "));
            socket.disconnect();
        });

        socket.on('scoreboard:connected', function () {
            state.scoreboard = this;
            console.log(colors.grey("Scoreboard Socket Connected"));
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
            state.currentQuestion = question;
            resetAnswers();
            this.server.sockets.emit('ask:question', question);
            console.log(colors.bgBlue(colors.yellow('Ask: ' + question.q)));
        });

        socket.on('answer:question', function (payload) {
            var member = getMemberBySocketId(this.id);
            if (member) {
                switch (payload.choice) {
                    case "a" : state.currentAnswers.a++; break;
                    case "b" : state.currentAnswers.b++; break;
                    case "c" : state.currentAnswers.c++; break;
                    case "d" : state.currentAnswers.d++; break;
                }
                state.membersAnswered.push(member.name);
                this.server.sockets.emit('question:answered', { currentAnswers: state.currentAnswers, membersAnswered: state.membersAnswered });
                console.log(colors.bgYellow(colors.blue('Answer ' + member.name + ': (' + payload.choice + ') ' + payload.question[payload.choice])));
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
        socket.emit('serverState', clientState);
        console.log(colors.green("Connected: " + state.connections.length + " sockets connected. (" + socket.id + ")"));

    });

    return Object.create(state);

};