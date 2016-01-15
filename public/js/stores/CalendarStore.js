var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var StorageUtils = require('../utils/StorageUtils');
var ConversionDateUtils = require('../utils/ConversionDateUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var CalendarStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  setDate: function(key, date) {
    StorageUtils.setDate(key, date);
  },

  getDate: function(key) {
    return StorageUtils.getDate(key);
  },

  setToday: function(date) {
    var date = new Date();

    date.setHours(0,0,0,0);
    date = Date.parse(date);

    this.setDate('today', {today: date});

    return date;
  },

  _getToday: function() {
    return this.getDate('today');
  },

  getCurrentDate: function() {
    
    var date = this.getDate('currentdate');

    if (date) {
      date = date.currentdate;
    } else {
      date = this._getToday();
      date = date.today;
      this.setDate('currentdate', {currentdate: date});
    }
    
    date = new Date(date);

    var currentdate = ConversionDateUtils.conversionDate(new Date(date));
    
    
    return {currentdate: currentdate, 
              highlight: this._getHighlight(),
              currentday: this.getCurrentDay(),
              showform: this._showform };
  },

  _setCurrentDateInToday: function() {
    var date = this._getToday();
    this.setDate('currentdate', {currentdate: date.today});
  },

  _setNextMonth: function() {
    StorageUtils.changeCurrentMonth('inc');
  },

  _setPrevMonth: function() {
    StorageUtils.changeCurrentMonth('dec');
  },

  getCalendar: function() {

    var date = this.getDate('currentdate');
    date = new Date(date.currentdate);

    return ConversionDateUtils.buildCalendar(date);   

  },

  _setCurrentDay: function(date_id) {
    this.setDate('currentday', {currentday: date_id});
  },
  
  getCurrentDay: function() {

    var date = this.getDate('currentday');

    if(date) {
      return date.currentday;
    }

    date = this._getToday();
    return  date.today;
  },

  _setHighlightResult: function(date_id) {
    this.setDate('highlight', {highlight: date_id});
  },

  _setRehighlightResult: function(date_id) {
    this.setDate('highlight', {});
  },

  _getHighlight: function() {
    var highlight = this.getDate('highlight');
        
    if (highlight && highlight.highlight) {
      highlight = highlight.highlight;
    } else {
      highlight = {};
    }

    return highlight;
  },

  _showform: false


});




CalendarStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.SET_NEXT_MONTH:
      CalendarStore._setNextMonth();
      CalendarStore.emitChange();
      break;

    case ActionTypes.SET_PREV_MONTH:
      CalendarStore._setPrevMonth();
      CalendarStore.emitChange();
      break;

    case ActionTypes.SET_TODAY:
      CalendarStore.setToday();
      CalendarStore._setCurrentDateInToday();
      CalendarStore.emitChange();
      break;

    case ActionTypes.SET_CURRENT_DAY:
      CalendarStore._setCurrentDay(action.date_id);
      CalendarStore.emitChange();
      break;

    case ActionTypes.HIGHLIGHT_RESULT:
      CalendarStore._setHighlightResult(action.date_id);
      CalendarStore.emitChange();
      break;

    case ActionTypes.RE_HIGHLIGHT_RESULT:
      CalendarStore._setRehighlightResult(action.date_id);
      CalendarStore.emitChange();
      break;

    case ActionTypes.CLOSE_FORM:
      CalendarStore._showform = false;
      CalendarStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = CalendarStore;