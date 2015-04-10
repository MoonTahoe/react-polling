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
                id: ''
            },
            member: {
                name: '',
                id: ''
            },
            title: 'Audience Polling',
            connected: false
        };
    },

    componentWillMount() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', this.connect);
        this.socket.on('disconnect', this.disconnect);
        this.socket.on('serverState', this.serverState);
        this.socket.on('audience', this.audienceUpdate);
        this.socket.on('member:joined', this.joined);
    },

    emit(event, payload) {
        this.socket.emit(event, payload);
    },

    connect() {
        this.setState({ connected: true, title: 'Audience Polling' });
        var member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;
        if (member && member.type === 'audience') {
            this.emit('audience:join', member);
        }
    },

    serverState(state) {
        this.setState(state);
    },

    joined(data) {
        sessionStorage.member = JSON.stringify(data);
        this.setState({ member: data });
    },

    audienceUpdate(audience) {
        this.setState({ audience: audience });
    },

    disconnect() {
        this.setState({ connected: false, title: 'disconnected' });
        this.setState({
            audience: [],
            speaker: {},
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