var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var ActionTypes = Constants.ActionTypes;


var ListActions = {
	setNextMonth: function() {
	    AppDispatcher.dispatch({
	      type: ActionTypes.SET_NEXT_MONTH
	    });
	},
	setPrevMonth: function() {
	    AppDispatcher.dispatch({
	      type: ActionTypes.SET_PREV_MONTH
	    });
	},
	setToday: function() {
		AppDispatcher.dispatch({
	      type: ActionTypes.SET_TODAY
	    });
	},
	setIdCurrentDay: function(date_id) {
		AppDispatcher.dispatch({
	      type: ActionTypes.SET_CURRENT_DAY,
	      date_id: date_id
	    });
	},
	getEventsCurrentDay: function() {
		AppDispatcher.dispatch({
	      type: ActionTypes.GET_EVENTS_CURRENT_DAY
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
	},
	highlightResult: function(date_id) {
		AppDispatcher.dispatch({
	      	type: ActionTypes.HIGHLIGHT_RESULT,
			date_id: date_id
	    });			
	},
	rehighlightResult: function(date_id) {
		AppDispatcher.dispatch({
	      	type: ActionTypes.RE_HIGHLIGHT_RESULT,
			date_id: date_id
	    });			
	},
	closeForm: function() {
		AppDispatcher.dispatch({
	      	type: ActionTypes.CLOSE_FORM
		});				
	},
	openForm: function() {
		AppDispatcher.dispatch({
	      	type: ActionTypes.OPEN_FORM
		});				
	}

};

module.exports = ListActions;