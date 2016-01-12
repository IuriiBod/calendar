var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
  	GET_CURRENT_MONTH: null,
    GET_NEXT_MONTH: null,
    GET_PREV_MONTH: null,
    GET_TODAY: null,
    SET_TODAY: null,
    GET_QUANTITY_DAYS: null,
    SET_CURRENT_DAY:null,
    GET_CURRENT_DAY:null,
    GET_OCCASION_CURRENT_DAY:null,
    CREATE_NEW_OCCASION:null,
    DELETE_OCCASION:null,
    SEARCH_OCCASION:null
  })

};
