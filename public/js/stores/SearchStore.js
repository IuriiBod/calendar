var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var StorageUtils = require('../utils/StorageUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _searchResult = [];

function _searchOccasion(q) {
  _searchResult = StorageUtils.searchOccasion(q);
}

var SearchStore = assign({}, EventEmitter.prototype, {
  
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getSearchResult: function() {
    return _searchResult;  
  }


});

SearchStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.SEARCH_OCCASION:
      _searchOccasion(action.q);
      SearchStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = SearchStore;