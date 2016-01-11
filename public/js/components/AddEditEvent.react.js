var React = require('react');
var ListActions = require('../actions/ListActions');
var EventsStore = require('../stores/EventsStore');
var StorageUtils = require('../utils/StorageUtils');
var strings = require('../settings');
var Modal = require('react-modal');

var appElement = document.getElementById('add-edit-event');
Modal.setAppElement(appElement);

function getCurrentDay() {
  return EventsStore.getCurrentDay();
}

var AddEditEvent = React.createClass({

	getInitialState: function() {
		return { 
			modalIsOpen: false 
		};
	},

	componentDidMount: function() {
      EventsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      EventsStore.removeChangeListener(this._onChange);
    },

	openModal: function() {
		
		this.setState({modalIsOpen: true});

		var obj = getCurrentDay();
		this._setDate(obj.dayId);
		this._setOccasion(obj.dayId);
	},

	closeModal: function() {
		this.setState({modalIsOpen: false});
	},

	_setDate: function(date) {
		var d = new Date( date );
		var str = d.getDate() +' '+  strings.month[d.getMonth()] +' '+ d.getFullYear();

		this.setState({
			dayId: date,
			currentday: str
	    });
	},

	_setOccasion: function(idDay) {

		var obj = JSON.parse( StorageUtils.getOccasion(idDay) );

		if(obj) {
	  		this.setState({
				occasion: obj.occasion,
				names: obj.names,
				text: obj.text
		    });
	  	} else {
	  		this.setState({
				occasion: '',
				names: '',
				text: ''
		    });
	  	}
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

		ListActions.deleteOccasion( this.state.dayId);

	    this.closeModal();
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
	    		dayId: this.state.dayId,
		  		occasion: occasion,
		  		names: names,
		  		text: text
	    	};

	    ListActions.createNewOccasion( this.state.dayId, JSON.stringify(obj) );

	    this.closeModal();
	    
  	},

	render: function() {

		return (
    		<div className = "add-edit-event" id = "add-edit-event">
				<button type="button" className = "btn btn-primary" onClick={this.openModal}>Добавить</button>
				<button type="button" className = "btn btn-primary">Обновить</button>
				
				<Modal
			          isOpen={this.state.modalIsOpen}
			          onRequestClose={this.closeModal}
			          style={customStyles} >
			 
			          
						<form className="form-horizontal" onSubmit={this.handleSubmit}>

							<div className="form-group">
								<button type="button" className="btn btn-danger" onClick={this.closeModal}>X</button>
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
								<button type="submit" className="btn btn-success"> Готово </button>
								<button type="button" className="btn btn-danger" onClick={this._handleDelOccasion}> Удалить </button>
							</div>
						</form>
		        </Modal>
			</div>
		)
			
	},

    _onChange: function() {
      this.setState(getCurrentDay());
    }

});

module.exports = AddEditEvent;


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '40%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};