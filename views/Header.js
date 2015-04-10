var React = require('react');

var Header = React.createClass({

    showSpeaker() {
        return (this.props.speaker.name) ? { display: 'block' } : { display: 'none' };
    },

    showMember() {
        return (this.props.member.name) ? { display: 'block' } : { display: 'none' };
    },

    cnxStatus() {
        return (this.props.connected) ? "connected" : "disconnected";
    },

    render: function() {
        return <header>
            <div>
                <h1>{this.props.speaker.title}</h1>
                <span style={this.showSpeaker()}>speaker: {this.props.speaker.name}</span>
            </div>
            <div>
                <div style={this.showMember()}>{this.props.member.name}</div>
                <div>{this.props.audience.length} audience members</div>
            </div>
            <div>
                <span className={this.cnxStatus()}></span>
            </div>
        </header>

    }
});

module.exports = Header;