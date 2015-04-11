var React = require('react');
var Questions = React.createClass({
    getInitialState() {
      return { currentQuestion: null }
    },
    ask(question) {
        this.props.emit('ask:question', question);
        this.setState({ currentQuestion: question });
    },
    addQuestion(question, i) {
        return <div key={i}>
            <span className={(this.state.currentQuestion === question) ? "selected" : ""}
                  onClick={this.ask.bind(null, question)}>{question.q}</span>
        </div>
    },
    render() {
        return <div id="questions">
            <h2>Questions</h2>
            {this.props.questions.map(this.addQuestion)}
        </div>
    }
});
module.exports = Questions;