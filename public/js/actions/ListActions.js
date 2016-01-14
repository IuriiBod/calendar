var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;


var ListActions = {
	getCurrentMonth: function() {
	    AppDispatcher.dispatch({
	      type: ActionTypes.GET_MONTH
	    });
	},
	getNextMonth: function() {
	    AppDispatcher.dispatch({
	      type: ActionTypes.GET_NEXT_MONTH
	    });
	},
	getPrevMonth: function() {
	    AppDispatcher.dispatch({
	      type: ActionTypes.GET_PREV_MONTH
	    });
	},
	setToday: function(date_id) {
		AppDispatcher.dispatch({
	      type: ActionTypes.SET_TODAY,
	      date_id: date_id
	    });
	},
	getToday: function() {
	    AppDispatcher.dispatch({
	      type: ActionTypes.GET_TODAY
	    });
	},
	setIdDay: function(date_id) {
		AppDispatcher.dispatch({
	      type: ActionTypes.SET_CURRENT_DAY,
	      date_id: date_id
	    });
	},
	getEventsCurrentDay: function() {
		AppDispatcher.dispatch({
	      type: ActionTypes.GET_OCCASION_CURRENT_DAY
	    });
	},

	createNewOccasion: function(date_id, obj) {
		AppDispatcher.dispatch({
	      type: ActionTypes.CREATE_NEW_OCCASION,
	      date_id: date_id,
	      occasion: obj
	    });	
	},
	
	deleteOccasion: function(id) {
		AppDispatcher.dispatch({
	      type: ActionTypes.DELETE_OCCASION,
	      idoccasion: id
	    });		
	},

	searchOccasion: function(q) {
		AppDispatcher.dispatch({
	      type: ActionTypes.SEARCH_OCCASION,
	      q: q
	    });		
	}

};

module.exports = ListActions;