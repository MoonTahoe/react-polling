var React = require('react');
var Display = require('../Display');
var Message = require('../Message');
var Join = require('./Join');
var Ask = require('./Ask');

var Audience = React.createClass({
    render() {
        return <div>
            <Display if={this.props.connected && this.props.member.name}>
                <Display if={!this.props.currentQuestion}>
                    <Message title={'Welcome ' + this.props.member.name}>Questions asked by the speaker will appear here</Message>
                </Display>
                <Display if={this.props.currentQuestion}>
                    <Ask {...this.props} />
                </Display>
            </Display>
            <Display if={this.props.connected && !this.props.member.name}>
                <h2>Join the session</h2>
                <Join {...this.props} />
            </Display>
        </div>
    }
});

module.exports = Audience;