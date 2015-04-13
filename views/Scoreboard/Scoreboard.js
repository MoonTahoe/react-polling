var React = require('react');
var BarChart = require('react-d3').BarChart;
var Display = require('../Display');
var Message = require('../Message');
var $ = require('jquery');

var Scoreboard = React.createClass({
    getInitialState() {
        return {
            width: 0,
            height: 0
        }
    },
    componentWillMount() {
        this.setState({
            width: window.innerWidth * 0.9,
            height: window.innerHeight * 0.6
        });
        this.props.emit('scoreboard:connected');
    },
    parseData() {
        return Object.keys(this.props.currentQuestion)
            .map(x => (x !== 'q') ? x + ": " + this.props.currentQuestion[x] : false)
            .filter(x => x)
            .map(this.mapAnswers);
    },
    mapAnswers(choice) {
        return {label: choice.substr(2), value: this.getChoiceAnswers(choice)}
    },
    getChoiceAnswers(choice) {
        return this.props.currentAnswers[choice[0]];
    },
    render() {
        return <div id="scoreboard">
            <Display if={this.props.connected && this.props.currentQuestion && this.props.audience.length}>
                <BarChart data={this.parseData()}
                    width={this.state.width}
                    height={this.state.height}
                    title={this.props.currentQuestion.q} />
            </Display>
            <Display if={this.props.connected && this.props.currentQuestion && !this.props.audience.length}>
                <Message title="Awaiting Audience">We are waiting for at least one audience member to join</Message>
            </Display>
            <Display if={this.props.connected && !this.props.currentQuestion}>
                <Message title="Welcome">We are awaiting a question.</Message>
            </Display>
        </div>
    }
});

module.exports = Scoreboard;