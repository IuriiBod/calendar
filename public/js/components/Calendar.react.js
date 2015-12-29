var ListActions = require('../actions/ListActions');
var EventsStore = require('../stores/EventsStore');

var React = require('react');


function getCurrentMonth() {

  return {
    date: EventsStore.getCurrentMonth()
  };
}



var Calendar = React.createClass({

    getInitialState: function() {
      return getCurrentMonth();
    },
    
    _nextMonth: function(event) {
      event.preventDefault();
      ListActions.getNextMonth();
    },

    _prevMonth: function(event) {
      event.preventDefault();
      ListActions.getPrevMonth();
    },



    render: function() {
        return (
            <div className="row commentBox">
                <h1>Comments</h1>
                <div className = "btn-group" role="group">
                  <button type="button" className = "btn btn-default" onClick={this._prevMonth}>&laquo;</button>
                  <div className = "btn btn-default">{this.state.date.date}</div>
                  <button type="button" className = "btn btn-default" onClick={this._nextMonth}>&raquo;</button>
                </div>
            </div>
        );
    }
});

module.exports = Calendar;