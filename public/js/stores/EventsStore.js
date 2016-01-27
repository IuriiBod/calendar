var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var StorageUtils = require('../utils/StorageUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

function _createNewOccasion(date_id, obj) {
  StorageUtils.saveOccasion(date_id, obj);
}

function _deleteOccasion(id) {
  StorageUtils.deleteOccasion(id);
}

function  _searchOccasion(q) {
  StorageUtils.searchOccasion(q);
}

var EventsStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getEventsCurrentDay: function() {

    var date_id = StorageUtils.getCurrentDay();
    var obj = assign({date_id: date_id}, StorageUtils.getOccasion(date_id));

    return obj;
  }

});

EventsStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.CREATE_NEW_OCCASION:
      _createNewOccasion(action.date_id, action.occasion);
      EventsStore.emitChange();
      break;

    case ActionTypes.DELETE_OCCASION:
      _deleteOccasion(action.idoccasion);
      EventsStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = EventsStore;