var React = require('react');
var Display = require('../Display');
var JoinSpeaker = require('./JoinSpeaker');
var Attendance = require('./Attendance');
var Questions = require('./Questions');

var Speaker = React.createClass({
    render: function() {
        return <div id="Speaker">
            <Display if={this.props.connected && this.props.member.name}>
                <Questions {...this.props} />
                <Attendance {...this.props} />
            </Display>
            <Display if={this.props.connected && !this.props.member.name}>
                <h2>Start the presentation</h2>
                <JoinSpeaker {...this.props} />
            </Display>
        </div>
    }
});

module.exports = Speaker;