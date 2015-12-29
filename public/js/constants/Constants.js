var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
  	GET_CURRENT_MONTH: null,
    GET_NEXT_MONTH: null,
    GET_PREV_MONTH: null,
    RECEIVE_RAW_CREATED_MESSAGE: null,
    RECEIVE_RAW_MESSAGES: null
  })

};
