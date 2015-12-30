var ListActions = require('../actions/ListActions');
var EventsStore = require('../stores/EventsStore');

var React = require('react');


function getCurrentMonth() {
  return EventsStore.getCurrentMonth();
}



var SelectDate = React.createClass({

    getInitialState: function() {
      return getCurrentMonth();
    },

    componentDidMount: function() {
      EventsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      EventsStore.removeChangeListener(this._onChange);
    },
    
    _nextMonth: function(event) {
      event.preventDefault();
      ListActions.getNextMonth();
    },

    _prevMonth: function(event) {
      event.preventDefault();
      ListActions.getPrevMonth();
    },

    _toDay: function(event) {
      event.preventDefault();
      ListActions.getToday();
    },
	
	render: function() {
		return (
			<div className = "pull-left select-date-btn-container">
				<button type="button" className = "btn select-date-btn" onClick={this._prevMonth}>&laquo;</button>
				<div className = "show-current-date">{this.state.currentdate}</div>
				<button type="button" className = "btn select-date-btn" onClick={this._nextMonth}>&raquo;</button>

				<button type="button" className = "btn select-date-btn" onClick={this._toDay}>Сегодня</button>
			</div>
		)
	},

    _onChange: function() {
      this.setState(getCurrentMonth());
    }

});

module.exports = SelectDate;