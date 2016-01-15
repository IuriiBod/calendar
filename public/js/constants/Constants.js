var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
  	SET_NEXT_MONTH: null,
    SET_PREV_MONTH: null,
    SET_TODAY: null,
    SET_CURRENT_DAY:null,
    GET_EVENTS_CURRENT_DAY:null,
    CREATE_NEW_OCCASION:null,
    DELETE_OCCASION:null,
    SEARCH_OCCASION:null,
    HIGHLIGHT_RESULT:null,
    RE_HIGHLIGHT_RESULT:null,
    CLOSE_FORM:null,
    OPEN_FORM:null
  })

};
