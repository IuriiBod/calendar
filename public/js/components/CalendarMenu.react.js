var React = require('react');
var AddEditEvent = require('./AddEditEvent.react');
var SearchEvent = require('./SearchEvent.react');

var CalendarMenu = React.createClass({

    render: function() {
	    return (
			<div className = "calendar-menu">
				<AddEditEvent />
				<SearchEvent />
			</div>
		);
  	}
});

module.exports = CalendarMenu;