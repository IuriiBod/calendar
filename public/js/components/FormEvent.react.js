var React = require('react');
var EventsStore = require('../stores/EventsStore');
var ListActions = require('../actions/ListActions');
var strings = require('../settings');
var ClassNames = require('classnames');

function getEventsCurrentDay() {
	
	var obj = EventsStore.getEventsCurrentDay();
	var d = new Date( obj.date_id );
	var str = d.getDate() +' '+  strings.month[d.getMonth()] +' '+ d.getFullYear();

	return { 
		date_id: obj.date_id,
		currentday: str,
		occasion: obj.occasion ? obj.occasion : '',
		names: obj.names ? obj.names : '',
		text: obj.text ? obj.text : ''
	};

}

var FormEvent = React.createClass({

	getInitialState: function() {
		return getEventsCurrentDay();
	},

	componentDidMount: function() {
      EventsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      EventsStore.removeChangeListener(this._onChange);
    },

	closeForm: function() {
		ListActions.closeForm();
	},

	_handleOccasionChange: function(event) {
		this.setState({occasion: event.target.value});
	},

	_handleNamesChange: function(event) {
	    this.setState({names: event.target.value});
	},

	_handleTextChange: function(event, value) {
		this.setState({text: event.target.value});	
	},

	_handleDelOccasion: function(event) {
		event.preventDefault();
		ListActions.deleteOccasion( this.state.date_id );
	},

	handleSubmit: function(event) {
		event.preventDefault();

	    var occasion = this.state.occasion.trim();
	    var names = this.state.names.trim();
	    var text = this.state.text.trim();
	    
	    if (!occasion) {
	      return;
	    }

	    var obj = {
	    		date_id: this.state.date_id,
		  		occasion: occasion,
		  		names: names,
		  		text: text
	    	};

	    ListActions.createNewOccasion( this.state.date_id, obj );

	},
	_onClick:function(event){
		//event.preventDefault(); ???
		event.stopPropagation();
	},

    render: function() {
	    return (
			<div className={ClassNames({
						'form-container': true,
						'form-container-btn': this.props.data.btn,
						'form-container-day': this.props.data.day
			        })}
			        id="form-container">	

				<form className="form-horizontal" onSubmit={this.handleSubmit} onClick={this._onClick}>
					<div className="form-group">
						<button type="button" className="btn btn-close-form" onClick={this.closeForm}>X</button>
					</div>
					
					<div className="form-group">
						<input type="text" className="form-control" id="inputEvent" placeholder="Событие"
							value={this.state.occasion} onChange={this._handleOccasionChange}  />
					</div>
					<div className="form-group">
						<input type="text" className="form-control" id="inputData" disabled="disabled"
							value={this.state.currentday} />
					</div>
					<div className="form-group">
						<input type="text" className="form-control" id="inputName" placeholder="Имена"
							value={this.state.names} onChange={this._handleNamesChange} />
					</div>
					<div className="form-group">
						<textarea className="form-control" rows="3" name="description" value={this.state.text} 
							onChange={this._handleTextChange} placeholder="Описание" ></textarea>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-create-event"> Готово </button>
						<button type="button" className="btn btn-delete-event" onClick={this._handleDelOccasion}> Удалить </button>
					</div>
				</form>
	        </div>
		);
  	},

    _onChange: function() {
      this.setState(getEventsCurrentDay());
    }
});

module.exports = FormEvent;