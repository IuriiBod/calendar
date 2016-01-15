var React = require('react');
var CalendarMenu = require('./CalendarMenu.react');
var Calendar = require('./Calendar.react');

var CalendarContainer = React.createClass({

  render: function() {
    return (
      <div className = "calendar-container">
        <CalendarMenu />
        <Calendar data={this.props.data} />
      </div>
    );
  }

});

module.exports = CalendarContainer;