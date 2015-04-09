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
                name: 'doug dougson',
                id: ''
            }
        };
    },

    connect() {
        this.refs.header.setState({ connected: true, title: 'Audience Polling' });
    },

    disconnect() {
        this.refs.header.setState({ connected: false, title: 'disconnected' });
        this.setState({
            audience: [],
            speaker: {},
            member: {
                name: '',
                id: ''
            }
        });
    },

    componentWillMount() {
        $.getJSON('/state', result => this.setState(result));
    },

    componentDidMount() {
        var socket = io('http://localhost:3000');
        socket.on('connect', this.connect);
        socket.on('disconnect', this.disconnect);
    },

    render() {
        return <div>
            <Header ref="header"
                speaker={this.state.speaker.name}
                audience={this.state.audience.length}
                member={this.state.member.name} />
            <RouteHandler />
        </div>
    }
});

module.exports = APP;