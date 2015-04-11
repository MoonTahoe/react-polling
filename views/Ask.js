var React = require('react');
var Display = require('./Display');

var Ask = React.createClass({

    getInitialState() {
        return {
            answer: '',
            choices: []
        }
    },

    componentWillMount() {
        this.setUpChoices();
    },

    componentWillReceiveProps() {
        this.setUpChoices();
    },

    setUpChoices() {
        var choices = Object.keys(this.props.currentQuestion);
        choices.shift();
        this.setState({
            answer: '',
            choices: choices
        });
    },

    choose(choice) {
        this.setState({answer: choice + '. ' + this.props.currentQuestion[choice]});
        this.props.emit('answer:question', {question: this.props.currentQuestion, choice: choice});
    },

    addChoice(choice, i) {
        return <button onClick={this.choose.bind(null, choice)} key={i}>{choice}: {this.props.currentQuestion[choice]}</button>
    },

    render() {
        return <div id="asking">
            <h2>{this.props.currentQuestion.q}</h2>

            <Display if={!this.state.answer}>
                <div className="choose">{this.state.choices.map(this.addChoice)}</div>
            </Display>

            <Display if={this.state.answer}>
                <span>You answered: {this.state.answer}</span>
            </Display>

        </div>
    }
});

module.exports = Ask;