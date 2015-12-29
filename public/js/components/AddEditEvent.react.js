var React = require('react');

var AddEditEvent = React.createClass({
	render: function() {
		return (
			<div className = "pull-left add-edit-event">
				<button type="button" className = "btn btn-primary">Добавить</button>
				<button type="button" className = "btn btn-primary">Обновить</button>
			</div>
		)
	}
});

module.exports = AddEditEvent;