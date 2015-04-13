var React = require('react');
var Link = require('react-router').Link;
var Display = require('../Display');

var Join = React.createClass({

    join() {
        var fullName = this.refs.fname.getDOMNode().value + " " + this.refs.lname.getDOMNode().value;
        this.props.emit('audience:join', { name: fullName });
    },

    componentDidMount() {
        this.getDOMNode().className = 'fadeIn';
    },

    render() {
        return <form action="javascript:void(0)" onSubmit={this.join}>

            <label>First Name</label>
            <input ref="fname" placeholder="enter your first name..." required />

            <label>Last name</label>
            <input ref="lname" placeholder="enter your last name..." required />

            <button>Join</button>

            <Display if={!this.props.speaker.name}>
                <Link to="/speaker">Join as speaker...</Link>
            </Display>

        </form>
    }
});

module.exports = Join;