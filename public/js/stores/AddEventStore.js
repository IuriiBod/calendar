var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var AddEventStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  _setOpenForm: function(bool) {
  	this._showform = bool;
  },

  getOpenForm: function() {
  	return {
  		showform: this._showform
  	}
  },

  _showform: false
  

});

AddEventStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.CLOSE_FORM:
      AddEventStore._setOpenForm(false);
      AddEventStore.emitChange();
      break;

    case ActionTypes.OPEN_FORM:
      AddEventStore._setOpenForm(true);
      AddEventStore.emitChange();
      break;  

  

    default:
      // do nothing
  }

});

module.exports = AddEventStore;