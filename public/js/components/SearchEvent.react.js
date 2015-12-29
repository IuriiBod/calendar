var React = require('react');

var SearchEvent = React.createClass({
	render: function() {
		return (
			<div className = "pull-right search-event">
				<form className = "form-inline">
					<button type="submit" className = "btn">
						<span className = "glyphicon glyphicon-search" aria-hidden="true"></span>
					</button>
					<div className = "form-group">
						<input type="text" className = "form-control" id="searchevent_field" placeholder="события, дата или участник" />
					</div>
				</form>
			</div>
		)
	}
});

module.exports = SearchEvent;