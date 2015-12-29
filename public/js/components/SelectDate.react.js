var React = require('react');
var strings = require('../settings');

var SelectDate = React.createClass({
	getInitialState: function(){
    	var date = new Date();
        
        return {year : date.getFullYear(), month : date.getMonth()};
    },
	render: function() {
		return (
			<div className = "pull-left select-date-btn-container">
				<button type="button" className = "btn select-date-btn">&laquo;</button>
				<div className = "show-current-date">{strings.month[this.state.month]} {this.state.year}</div>
				<button type="button" className = "btn select-date-btn">&raquo;</button>

				<button type="button" className = "btn select-date-btn">Сегодня</button>
			</div>
		)
	}
});

module.exports = SelectDate;