var React = require('react');
var AddEditEvent = require('./AddEditEvent.react');
var SearchEvent = require('./SearchEvent.react');
var ListActions = require('../actions/ListActions');
var CalendarStore = require('../stores/CalendarStore');


function getCurrentMonth() {
  return CalendarStore.getCurrentMonth();
}

var Calendar = React.createClass({

    getInitialState: function() {
      return getCurrentMonth();
    },

    componentDidMount: function() {
      CalendarStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      CalendarStore.removeChangeListener(this._onChange);
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

    _onClick: function(id) {
      ListActions.setIdDay(id);
	},	

	render: function() {
    
    var items = CalendarStore.getCalendar();

  	var itemHtml = items.map( function( listItem ) {
   
        return <div className = "days" onClick={this._onClick.bind(this, listItem.id)}>
	            <p className = "title">{ listItem.title }</p> 
	            <p className = "number">{ listItem.number }</p>
	            <p className = "occasion">{ listItem.occasion }</p>
	            <p className = "occasion">{ listItem.names }</p>
	            <p className = "occasion">{ listItem.text }</p>
          </div>;

    }, this);

		return (
			<div className = "calendar-container">
				<div className = "calendar-menu">
					<AddEditEvent />
					<SearchEvent />

					<div className = "select-date-btn-container">
		    			<button type="button" className = "btn select-date-btn" onClick={this._prevMonth}>&laquo;</button>
		    			<div className = "show-current-date">{this.state.currentdate}</div>
		    			<button type="button" className = "btn select-date-btn" onClick={this._nextMonth}>&raquo;</button>

		    			<button type="button" className = "btn select-date-btn" onClick={this._toDay}>Сегодня</button>
		    		</div>
				</div>

				<div className = "calendar">
					<div className="message-list" ref="messageList">
			            { itemHtml }
		          	</div>
				</div>
			</div>
		)
	},

    _onChange: function() {
      this.setState(getCurrentMonth());
    }

});

module.exports = Calendar;