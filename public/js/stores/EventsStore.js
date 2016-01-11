var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var StorageUtils = require('../utils/StorageUtils');
var ConversionDateUtils = require('../utils/ConversionDateUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _events = {};

var currentDay = {};

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
    } else {
      date = this._getToday();
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

  _getToday: function() {
    var date = new Date();

    StorageUtils.setCurrentDate({currentdate: date});
    
    return date;
  },

  _getCalendar: function() {

    var date = StorageUtils.getCurrentDate();
    date = new Date(date.currentdate);

    return ConversionDateUtils.buildCalendar(date);   

  },
  
  _setCurrentDay: function(dayId) {
    currentDay.dayId = dayId;
  },

  getCurrentDay: function() {

    for(var prop in currentDay) {
        if(currentDay.hasOwnProperty(prop))
            return currentDay;
    }

    var date = StorageUtils.getCurrentDate();
    date = new Date(date.currentdate);
    currentDay.dayId = date;

    return currentDay;
  },

  _createNewOccasion: function(id, occasion) {
    StorageUtils.saveOccasion(id, occasion);
  },

  _deleteOccasion: function(id) {
    StorageUtils.deleteOccasion(id);
  }

//   function isEmpty(obj) {
//     for(var prop in obj) {
//         if(obj.hasOwnProperty(prop))
//             return false;
//     }

//     return true;
// }
  

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

    case ActionTypes.SET_CURRENT_DAY:
      EventsStore._setCurrentDay(action.dayId);
      EventsStore.emitChange();
      break;

    case ActionTypes.CREATE_NEW_OCCASION:
      EventsStore._createNewOccasion(action.idoccasion, action.occasion);
      EventsStore.emitChange();
      break;

    case ActionTypes.DELETE_OCCASION:
      EventsStore._deleteOccasion(action.idoccasion);
      EventsStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = EventsStore;