var React = require('react');
var Display = require('./Display');
var BarChart = require('react-d3').BarChart;

var Scoreboard = React.createClass({

    getInitialState() {
        return {
            width: 0,
            height: 0,
            color: '#3182bd'
        }
    },

    componentWillMount() {
        this.setState({
            width: window.innerWidth * 0.9,
            height: window.innerHeight * 0.7
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
        return {label: choice, value: this.getChoiceAnswers(choice)}
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
                    fill={this.state.color}
                    title={this.props.currentQuestion.q} />
            </Display>

            <Display if={this.props.connected && this.props.currentQuestion && !this.props.audience.length}>
                <h2>Awaiting Audience</h2>
                <p>We are wating for an audience to answer the question:
                    <strong>{this.props.currentQuestion.q}</strong>
                </p>
            </Display>

            <Display if={this.props.connected && !this.props.currentQuestion}>
                <h2>Welcome</h2>
                <p>We are awaiting a question.</p>
            </Display>

        </div>
    }
});

module.exports = Scoreboard;