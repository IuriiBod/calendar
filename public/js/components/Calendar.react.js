var ListActions = require('../actions/ListActions');
var EventsStore = require('../stores/EventsStore');

var React = require('react');

// function getQuantityDays() {
//   return {q: EventsStore.getQuantityDays()};
// }


var Calendar = React.createClass({
    // getInitialState: function() {
    //   return getQuantityDays();
    // },

    render: function() {
        return (
            <div className="row commentBox">
                <h1>Comments</h1>
                <h2></h2>
            </div>
        );
    },

    _onChange: function() {
      this.setState(getQuantityDays());
    }

});

module.exports = Calendar;