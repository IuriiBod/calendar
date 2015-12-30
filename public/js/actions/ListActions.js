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
	}

};

module.exports = ListActions;