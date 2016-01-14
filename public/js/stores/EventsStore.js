var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var CalendarStore = require('./CalendarStore');
var StorageUtils = require('../utils/StorageUtils');
var ConversionDateUtils = require('../utils/ConversionDateUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var EventsStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  _createNewOccasion: function(date_id, obj) {
    StorageUtils.saveOccasion(date_id, obj);
  },

  getOccasionsCurrentDay: function() {

    var date_id = CalendarStore.getCurrentDay();
    var obj = assign({date_id: date_id}, StorageUtils.getOccasion(date_id));

    return obj;
  },

  _deleteOccasion: function(id) {
    StorageUtils.deleteOccasion(id);
  },

  searchOccasion: function(q) {
    StorageUtils.searchOccasion(q);
  }

});

EventsStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.CREATE_NEW_OCCASION:
      EventsStore._createNewOccasion(action.date_id, action.occasion);
      CalendarStore.emitChange();
      break;

    case ActionTypes.DELETE_OCCASION:
      EventsStore._deleteOccasion(action.idoccasion);
      CalendarStore.emitChange();
      break;

    case ActionTypes.GET_OCCASION_CURRENT_DAY:
      EventsStore.getOccasionsCurrentDay();
      EventsStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = EventsStore;