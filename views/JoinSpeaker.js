var React = require('react');

var JoinSpeaker = React.createClass({

    join() {
        var fullName = this.refs.fname.getDOMNode().value + " " + this.refs.lname.getDOMNode().value,
            title = this.refs.title.getDOMNode().value;
        this.props.emit('speaker:join', { name: fullName, title: title });
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

            <label>Presentation Title</label>
            <input ref="title" placeholder="enter a title..." required />

            <button>Join</button>

        </form>
    }

});

module.exports = JoinSpeaker;
