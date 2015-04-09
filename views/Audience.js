var React = require('react');

var Audience = React.createClass({

    render() {
        return <h1>{this.props.myProp}</h1>
    }

});

module.exports = Audience;