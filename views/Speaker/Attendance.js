var React = require('react');
var Display = require('../Display');

var Attendance = React.createClass({
    ping(id) {
      this.props.emit('ping', id);
    },
    addMemberRow(member, i) {
        return <tr key={i}>
            <td><button onClick={this.ping.bind(null, member.id)}>Ping</button></td>
            <td>{member.name}</td>
            <td>{member.id}</td>
        </tr>
    },
    render() {
        return <div>
            <h2>Attendance</h2>
            <Display if={this.props.audience.length}>
                <table>
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th>Audience Member</th>
                            <th>Socket ID</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.audience.map(this.addMemberRow)}
                    </tbody>
                </table>
            </Display>
            <Display if={!this.props.audience.length}>
                <span class="message">Awaiting Audience...</span>
            </Display>
        </div>
    }
});

module.exports = Attendance;