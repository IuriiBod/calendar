var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var StorageUtils = require('../utils/StorageUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var SearchStore = assign({}, EventEmitter.prototype, {
  
  searchResult: [],

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

  _searchOccasion: function(q) {
    this.searchResult = StorageUtils.searchOccasion(q);
  },

  getSearchResult: function() {
    return this.searchResult;  
  }


});

SearchStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.SEARCH_OCCASION:
      SearchStore._searchOccasion(action.q);
      SearchStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = SearchStore;