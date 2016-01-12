var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var StorageUtils = require('../utils/StorageUtils');
var ConversionDateUtils = require('../utils/ConversionDateUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var currentDay;

var CalendarStore = assign({}, EventEmitter.prototype, {

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
    } else {
      date = new Date(this._getToday());
    }
    
    currentdate = ConversionDateUtils.conversionDate(date);
    
    return {currentdate: currentdate};
  },

  _getNextMonth: function() {
    var date = StorageUtils.changeDate('inc');
  },

  _getPrevMonth: function() {
    var date = StorageUtils.changeDate('dec');
  },

  _setToday: function(date) {
    StorageUtils.setCurrentDate({currentdate: date});
  },

  _getToday: function() {
    var date = new Date();
    date = Date.parse(date);

    StorageUtils.setCurrentDate({currentdate: date});

    return date;
  },

  getCalendar: function() {

    var date = StorageUtils.getCurrentDate();
    date = new Date(date.currentdate);

    return ConversionDateUtils.buildCalendar(date);   

  },
  
  _setCurrentDay: function(dayId) {
  	currentDay = dayId;
  },

  getCurrentDay: function() {
    
	  	if (!currentDay) {
	  		var date = StorageUtils.getCurrentDate();
	    	date = new Date(date.currentdate);
	    	currentDay = Date.parse(date);
	  	}

	    return currentDay;
    }

});

CalendarStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.GET_CURRENT_MONTH:
      _getCurrentMonth();
      CalendarStore.emitChange();
      break;

    case ActionTypes.GET_NEXT_MONTH:
      CalendarStore._getNextMonth();
      CalendarStore.emitChange();
      break;

    case ActionTypes.GET_PREV_MONTH:
      CalendarStore._getPrevMonth();
      CalendarStore.emitChange();
      break;

    case ActionTypes.SET_TODAY:
      CalendarStore._setToday(action.dayId);
      CalendarStore.emitChange();
      break;

    case ActionTypes.GET_TODAY:
      CalendarStore._getToday();
      CalendarStore.emitChange();
      break;

    case ActionTypes.SET_CURRENT_DAY:
      CalendarStore._setCurrentDay(action.dayId);
      //CalendarStore.emitChange();
      break;

    case ActionTypes.GET_CURRENT_DAY:
      CalendarStore.getCurrentDay();
      CalendarStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = CalendarStore;