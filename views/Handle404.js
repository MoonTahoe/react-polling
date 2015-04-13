var React = require('react');
var Message = require('./Message');

var Handle404 = React.createClass({
    render() {
        return <Message title="404 Not Found">Cannot find content for "INSERT ROUTING VAR"</Message>
    }
});

module.exports = Handle404;