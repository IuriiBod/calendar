var strings = require('../settings');

module.exports = {

  conversionDate: function(date) {
    return strings.month[date.getMonth()] +' '+ date.getFullYear();
  }
};