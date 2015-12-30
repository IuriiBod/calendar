var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var StorageUtils = require('../utils/StorageUtils');
var ConversionDateUtils = require('../utils/ConversionDateUtils');
var EventEmitter = require('events').EventEmitter;
//var ThreadStore = require('../stores/ThreadStore');
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

  getCurrentMonth: function() {
    
    var currentdate = '',
        date = StorageUtils.getCurrentDate();

    if (date) {

      date = new Date(date.currentdate);
      currentdate = ConversionDateUtils.conversionDate(date);

    } else {

      return this._getToday();

    }
    
    return {currentdate: currentdate};
  },

  _getNextMonth: function() {
    var date = StorageUtils.changeDate('inc');
    var currentdate = ConversionDateUtils.conversionDate(date);

    return {currentdate: currentdate};
  },

  _getPrevMonth: function() {
    var date = StorageUtils.changeDate('dec');
    var currentdate = ConversionDateUtils.conversionDate(date);

    return {currentdate: currentdate};
  },

  _getToday: function() {
    var date = new Date();

      StorageUtils.setCurrentDate({currentdate: date});
    var  currentdate = ConversionDateUtils.conversionDate(date);

    return {currentdate: currentdate};
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

    case ActionTypes.GET_TODAY:
      EventsStore._getToday();
      EventsStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = EventsStore;