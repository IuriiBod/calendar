var ListActions = require('../actions/ListActions');
var EventsStore = require('../stores/EventsStore');

var React = require('react');


var Calendar = React.createClass({

    render: function() {
        return (
            <div className="row commentBox">
                <h1>Comments</h1>
            </div>
        );
    }

});

module.exports = Calendar;