var React = require('react');
var Calendar = require('./Calendar.react');
var CalendarStore = require('../stores/CalendarStore');

var InitApp = React.createClass({
	
    render: function() {
	    return (
	    	<div>
	    		<Calendar />
			</div>
		);
  	}
});

module.exports = InitApp;