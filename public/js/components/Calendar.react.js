var React = require('react');
var ListActions = require('../actions/ListActions');
var CalendarStore = require('../stores/CalendarStore');
var FormEvent = require('./FormEvent.react');
var ClassNames = require('classnames');


function getCurrentDate() {
  return CalendarStore.getCurrentDate();
}

var Calendar = React.createClass({

	getInitialState: function() {
		return getCurrentDate();
	},

	componentDidMount: function() {
		CalendarStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		CalendarStore.removeChangeListener(this._onChange);
	},

	_setNextMonth: function(event) {
		event.preventDefault();
		ListActions.setNextMonth();
	},

	_setPrevMonth: function(event) {
		event.preventDefault();
		ListActions.setPrevMonth();
	},

	_setToday: function(event) {
		event.preventDefault();
		ListActions.setToday();
	},

	_onClick: function(id) {
		ListActions.setIdCurrentDay(id);
	},	

	_showForm: function(id) {
		var cls = {btn: false, day: true};

		return ( id === this.state.showform )
		    ? <FormEvent data={cls} />
		    : '';
	},

	render: function() {
  	
  		var items = CalendarStore.getCalendarCurrentMonth();

		var itemHtml = items.map( function( listItem ) {

			return (
				<div 
					className={ClassNames({
						'days': true,
						'current_day': listItem.id === this.state.today,
						'event': listItem.event.is_event,
						'highlight': listItem.id === this.state.highlight
			        })}

					key={listItem.id} onClick={this._onClick.bind(this, listItem.id)}>

					<div className="title-day">
						<p className="title-day-title">{ listItem.title }</p> 
						<p className="title-day-number">{ listItem.number }</p>
					</div>
					<div className="event-day">
						<p className="event-day-occasion">{ listItem.event.occasion }</p> 
						<p>{ listItem.event.names }</p> 
					</div>

					{this._showForm(listItem.id)}

				</div>
			)
		}, this);

		return (
			<div className = "calendar">
				<div className = "select-date-btn-container">
					<button type="submit" className = "btn select-date-btn-prev" onClick={this._setPrevMonth}>
						<span className = "glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
					</button>
					<div className = "show-current-date">{this.state.currentdate}</div>
					<button type="submit" className = "btn select-date-btn-next" onClick={this._setNextMonth}>
						<span className = "glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
					</button>
					<button type="button" className = "btn select-date-btn-today" onClick={this._setToday}>Сегодня</button>
				</div>

				<div className="days-list-container">
					{ itemHtml }
				</div>
			</div>
		)
	},

	_onChange: function() {
		this.setState(getCurrentDate());
	}

});

module.exports = Calendar;