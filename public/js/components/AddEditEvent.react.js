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
		ListActions.closeForm();
		ListActions.getEventsCurrentDay();
		ListActions.openForm();
	},

	render: function() {
		
		return (
    		<div className="add-edit-event" id ="add-edit-event">
				<button type="button" className = "btn btn-primary" onClick={this.openForm}>Добавить</button>
				<button type="button" className = "btn btn-primary">Обновить</button>

				<ShowForm data={this.state.showform}/>
				
			</div>
		)
			
	},

	_onChange: function() {
		this.setState(getIsShowForm());
	}

});

module.exports = AddEditEvent;

var ShowForm = React.createClass({
	
	render: function() {
		var cls = {btn: true, day: false};

		return ( this.props.data )
		    ? <FormEvent data={cls} />
		    : <p></p>;
	}

});