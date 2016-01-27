var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var EventsStore = require('./EventsStore');
var StorageUtils = require('../utils/StorageUtils');
var ConversionDateUtils = require('../utils/ConversionDateUtils');


var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _showform = null;

function _setDate(key, date) {
  StorageUtils.setDate(key, date);
}

function _getDate(key) {
  return StorageUtils.getDate(key);
}

function _getCurrentDay() {
  return StorageUtils.getCurrentDay();
}

function _setCurrentDay(date_id) {
  _setDate('currentday', {currentday: date_id});
}

function _setShowform(date_id) {
  if ( _showform == date_id) {
    _showform = null;
  } else {
    _showform = date_id;
  }
}

function _getToday() {
  return StorageUtils.getToday();
}

function _getHighlight() {
  var highlight = _getDate('highlight');
      
  if (highlight && highlight.highlight) {
    highlight = highlight.highlight;
  } else {
    highlight = {};
  }

  return highlight;
}

function _buildCalendar() {
 
    var date = _getDate('currentdate');
    date = new Date(date.currentdate);

    return ConversionDateUtils.buildCalendar(date);   
}

function _setNextMonth() {
  StorageUtils.changeCurrentMonth('inc');
}

function _setPrevMonth() {
  StorageUtils.changeCurrentMonth('dec');
}

function _setCurrentDateInToday() {
  var date = _getToday();
  _setDate('currentdate', {currentdate: date});
}

function _setHighlightResult(date_id) {
  _setDate('highlight', {highlight: date_id});
}

function _setRehighlightResult(date_id) {
  _setDate('highlight', {});
}



var CalendarStore = assign({}, EventEmitter.prototype, {

  getCurrentDate: function() {
    
    var date = _getDate('currentdate');

    if (date) {
      date = date.currentdate;
    } else {
      date = _getToday();
      _setDate('currentdate', {currentdate: date});
    }
    
    var currentdate = ConversionDateUtils.conversionDate(new Date(date));

    return {
              currentdate: currentdate,
              today: _getToday(),
              highlight: _getHighlight(),
              currentday: _getCurrentDay(),
              showform: _showform 
            };
  },

  getCalendarCurrentMonth: function() {
    return _buildCalendar();
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});




CalendarStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.SET_NEXT_MONTH:
      _setNextMonth();
      CalendarStore.emitChange();
      break;

    case ActionTypes.SET_PREV_MONTH:
      _setPrevMonth();
      CalendarStore.emitChange();
      break;

    case ActionTypes.SET_TODAY:
      _setCurrentDateInToday();
      CalendarStore.emitChange();
      break;

    case ActionTypes.SET_CURRENT_DAY:
      _setCurrentDay(action.date_id);
      _setShowform(action.date_id);
      CalendarStore.emitChange();
      break;

    case ActionTypes.CREATE_NEW_OCCASION:
      AppDispatcher.waitFor([EventsStore.dispatchToken]);
      _setShowform(null);
      CalendarStore.emitChange();
      break;

    case ActionTypes.DELETE_OCCASION:
      AppDispatcher.waitFor([EventsStore.dispatchToken]);
      _setShowform(null);
      CalendarStore.emitChange();
      break;

    case ActionTypes.HIGHLIGHT_RESULT:
      _setHighlightResult(action.date_id);
      CalendarStore.emitChange();
      break;

    case ActionTypes.RE_HIGHLIGHT_RESULT:
      _setRehighlightResult(action.date_id);
      CalendarStore.emitChange();
      break;

    case ActionTypes.CLOSE_FORM:
      _setShowform(null);
      CalendarStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = CalendarStore;