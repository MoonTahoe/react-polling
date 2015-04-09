var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute } = Router;
var APP = require('./views/APP');
var Audience = require('./views/Audience');
var Speaker = require('./views/Speaker');
var Scoreboard = require('./views/Scoreboard');

var routes = (
    <Route handler={APP}>
        <DefaultRoute handler={Audience}/>
        <Route name="speaker" path="speaker" handler={Speaker}></Route>
        <Route name="scoreboard" path="scoreboard" handler={Scoreboard}></Route>
    </Route>
);

Router.run(routes, function (Handler, state) {
    React.render(<Handler/>, document.getElementById('target'));
});
