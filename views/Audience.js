var React = require('react');
var Display = require('./Display');
var Join = require('./Join');
var Welcome = require('./Welcome');

var Audience = React.createClass({

    getInitialState() {
        return {
            connected: false
        }
    },

    render() {

        return <div>

            <Display if={this.props.connected && this.props.member.name}>
                <Welcome name={this.props.member.name} />
            </Display>

            <Display if={this.props.connected && !this.props.member.name}>
                <h2>Join the session</h2>
                <Join {...this.props} />
            </Display>

        </div>

    }

});

module.exports = Audience;