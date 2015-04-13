var React = require('react');
var Message = React.createClass({
    render() {
        return <div>
            <h2>{this.props.title}</h2>
            <p>{this.props.children}</p>
        </div>
    }
});
module.exports = Message;