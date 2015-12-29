var React = require('react');
var AddEditEvent = require('./AddEditEvent.react');
var SearchEvent = require('./SearchEvent.react');
var SelectDate = require('./SelectDate.react');

var CalendarMenu = React.createClass({
	render: function() {
		return (
			<div className = "calendar-header">
				<div className = "calendar-menu">
					<AddEditEvent />
					<SearchEvent />
				</div>
				<div className = "calendar-select-date">
					<SelectDate />
				</div>
			</div>
		)
	}
});

module.exports = CalendarMenu;