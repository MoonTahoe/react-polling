var React = require('react');
var Router = require('react-router');
var { RouteHandler, Link } = Router;
var $ = require('jquery');
var Header = require('./Header');
var io = require('socket.io-client');

var APP = React.createClass({
    getInitialState() {
        return {
            audience: [],
            speaker: {
                name: '',
                id: '',
                title: ''
            },
            member: {
                name: '',
                id: ''
            },
            questions: [],
            currentQuestion: false,
            currentAnswers: {
                "a": 0,
                "b": 0,
                "c": 0,
                "d": 0
            },
            membersAnswered: [],
            connected: false
        };
    },
    componentWillMount() {
        this.socket = io(window.location.replace('#/',''));  //http://localhost:3000, but root on heroku
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('member:joined', this.joined);
        this.socket.on('ping', this.ping);
        this.socket.on('serverState', x => this.setState(x));
        this.socket.on('audience', x => this.setState({audience: x}));
        this.socket.on('presentation:start', x => this.setState({speaker: x}));
        this.socket.on('presentation:end', x => this.setState(x));
        this.socket.on('questions', x => this.setState({questions: x}));
        this.socket.on('ask:question', x =>  this.setState({membersAnswered: [], currentQuestion: x, currentAnswers: { "a": 0, "b": 0, "c": 0, "d": 0}}));
        this.socket.on('question:answered', x => this.setState(x));
    },
    emit(event, payload) {
        this.socket.emit(event, payload);
    },
    connect() {
        this.setState({connected: true});
        var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;
        if (member && member.type === 'audience') {
            this.emit('audience:join', member);
        } else if (member && member.type === 'speaker') {
            this.emit('speaker:join', member);
        } else if (window.location.href.indexOf('/scoreboard') !== -1) {
            alert(window.location);
            this.emit('scoreboard:connected');
        }
    },
    joined(data) {
        sessionStorage.member = JSON.stringify(data);
        this.setState({member: data});
    },
    ping() {
        $('body').addClass('ping');
        alert("Hey, " + this.state.member.name + " PAY ATTENTION!!");
        $('body').removeClass('ping');
    },
    disconnect() {
        this.setState({
            connected: false,
            audience: [],
            speaker: {title: 'Disconnected'},
            member: {
                name: '',
                id: ''
            }
        });
    },
    render() {
        return <div>
            <Header {...this.state} />
            <RouteHandler emit={this.emit} {...this.state} />
        </div>
    }
});

module.exports = APP;