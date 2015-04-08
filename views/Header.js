var React = require('react');

var Header = React.createClass({

    getInitialState() {
        return {
            connected: false,
            title: 'Audience Polling'
        }
    },

    showSpeaker() {
        return (this.props.speaker) ? { display: 'block' } : { display: 'none' };
    },

    showMember() {
        return (this.props.member) ? { display: 'block' } : { display: 'none' };
    },

    cnxStatus() {
        return (this.state.connected) ? "connected" : "disconnected";
    },

    render: function() {
        return <header>
            <div>
                <h1>{this.state.title}</h1>
                <span style={this.showSpeaker()}>speaker: {this.props.speaker}</span>
            </div>
            <div>
                <div style={this.showMember()}>{this.props.member}</div>
                <div>{this.props.audience} audience members</div>
            </div>
            <div>
                <span className={this.cnxStatus()}></span>
            </div>
        </header>

    }
});

module.exports = Header;