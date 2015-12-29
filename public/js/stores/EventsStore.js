var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
//var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
//var ThreadStore = require('../stores/ThreadStore');
var strings = require('../settings');
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _events = {};

function _addEvent(data) {
  _events = data.event;
}

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

  get: function(id) {
    return _events[id];
  },

  getAll: function() {
    return _events;
  },

  getCurrentMonth: function() {
    var date = new Date();
    
    console.log(date);
    console.log(Date.parse('2012-01-26'));


    var month = strings.month[date.getMonth()];
    var str = month +' '+ date.getFullYear();

    return {date: str};
  },

  _getNextMonth: function() {
    return {mars: 'mars'};
  },

  _getPrevMonth: function() {
    return {jan: 'jan'};
  }

});

EventsStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.CREATE_EVENT:
      _addEvent(action.data);
      break;

    case ActionTypes.GET_CURRENT_MONTH:
      _getCurrentMonth();
      EventsStore.emitChange();
      break;

    case ActionTypes.GET_NEXT_MONTH:
      EventsStore._getNextMonth();
      EventsStore.emitChange();
      break;

    case ActionTypes.GET_PREV_MONTH:
      EventsStore._getPrevMonth();
      EventsStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = EventsStore;