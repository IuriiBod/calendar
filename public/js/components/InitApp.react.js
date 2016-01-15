var React = require('react');
var CalendarContainer = require('./CalendarContainer.react');
var CalendarStore = require('../stores/CalendarStore');

function setToday() {
  return CalendarStore.setToday();
}

var InitApp = React.createClass({

	getInitialState: function() {
		var today = setToday();
      	return {today: today};
    },

    render: function() {
	    return (
	    	<div>
	    		<CalendarContainer data={this.state} />
			</div>
		);
  	}
});

module.exports = InitApp;