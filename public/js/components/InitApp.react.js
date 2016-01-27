var React = require('react');
var CalendarMenu = require('./CalendarMenu.react');
var Calendar = require('./Calendar.react');
var CalendarStore = require('../stores/CalendarStore');


var InitApp = React.createClass({

    render: function() {
	    return (
	    	<div className = "calendar-container">
				<CalendarMenu />
				<Calendar />
			</div>
		);
  	}
});

module.exports = InitApp;