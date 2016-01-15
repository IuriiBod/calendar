var React = require('react');
var ListActions = require('../actions/ListActions');
var FormEvent = require('./FormEvent.react');
var AddEventStore = require('../stores/AddEventStore');


function getIsShowForm() {
  return AddEventStore.getOpenForm();
}

var AddEditEvent = React.createClass({

	getInitialState: function() {
		return getIsShowForm();
	},

	componentDidMount: function() {
		AddEventStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AddEventStore.removeChangeListener(this._onChange);
	},
	
	openForm: function() {
		ListActions.getEventsCurrentDay();
		ListActions.openForm();
	},

	_showForm: function() {
		var cls = {btn: true, day: false};

		return ( this.state.showform )
		    ? <FormEvent data={cls} />
		    : '';
	},

	render: function() {
		var cls = {btn: true, day: false};

		return (
    		<div className="add-edit-event" id ="add-edit-event">
				<button type="button" className = "btn btn-primary" onClick={this.openForm}>Добавить</button>
				<button type="button" className = "btn btn-primary">Обновить</button>

				{this._showForm}
				
			</div>
		)
			
	},

	_onChange: function() {
		this.setState(getIsShowForm());
	}

});

module.exports = AddEditEvent;