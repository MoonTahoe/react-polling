var React = require('react');

var Welcome = React.createClass({
    render() {
        return <div>
            <h2>Welcome {this.props.name}</h2>
            <p>Questions asked by the speaker will appear here</p>
        </div>
    }
});

module.exports = Welcome;