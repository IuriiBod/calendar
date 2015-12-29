var React = require('react');
var CalendarMenu = require('./CalendarMenu.react');
var Calendar = require('./Calendar.react');

var InitApp = React.createClass({
    render: function() {
	    return (
	    	<div>
	    		<CalendarMenu />
				<Calendar />
	    	</div>
		);
  	}
});

module.exports = InitApp;