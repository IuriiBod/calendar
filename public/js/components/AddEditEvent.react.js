var React = require('react');
var ListActions = require('../actions/ListActions');
var FormEvent = require('./FormEvent.react');
var CalendarStore = require('../stores/CalendarStore');


var AddEditEvent = React.createClass({

	getInitialState: function() {
		return { showform: false };
	},

	componentDidMount: function() {
		CalendarStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		CalendarStore.removeChangeListener(this._onChange);
	},

	openForm: function() {
		ListActions.closeForm();
		this.setState({showform: !this.state.showform});
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
		this.setState({ showform: false });
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