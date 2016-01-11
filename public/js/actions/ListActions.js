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
	getToday: function() {
	    AppDispatcher.dispatch({
	      type: ActionTypes.GET_TODAY
	    });
	},
	setIdDay: function(dayId) {
		AppDispatcher.dispatch({
	      type: ActionTypes.SET_CURRENT_DAY,
	      dayId: dayId
	    });
	},
	getCurrentDay: function() {
		AppDispatcher.dispatch({
	      type: ActionTypes.GET_CURRENT_DAY
	    });
	},

	createNewOccasion: function(id, obj) {
		AppDispatcher.dispatch({
	      type: ActionTypes.CREATE_NEW_OCCASION,
	      id: id,
	      occasion: obj
	    });	
	},
	
	deleteOccasion: function(id) {
		AppDispatcher.dispatch({
	      type: ActionTypes.DELETE_OCCASION,
	      idoccasion: id
	    });		
	}

};

module.exports = ListActions;