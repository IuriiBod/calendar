var strings = require('../settings');
var StorageUtils = require('./StorageUtils');

module.exports = {

  days: [],

  conversionDate: function(date) {
    return strings.month[date.getMonth()] +' '+ date.getFullYear();
  },

  _getDescriptionDay: function(number) {

  	number = (number === 7) ? 0 : number;

  	return strings.day[number];
  },

  buildCalendar: function(date) {

  	this.days = [];
  	
  	this._addDaysBefore(date);	
  	
  	this._addDays(date);

  	this._addDaysAfter(date); 

    return this.days;
  },

  _getQuantityDaysInMonth: function(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  },

  _getNumberFirstDayInMonth: function(date) {
    return date.getDay();
  },

  _addDaysBefore: function(date) {

	date.setDate(1);
  	var numberFirstDay = this._getNumberFirstDayInMonth(date);

  	if (numberFirstDay === 1) {
  		return;
  	}
  	if ( numberFirstDay === 0 ) {
  		numberFirstDay = 7;
  	} 

	var d = new Date(date.getFullYear(), date.getMonth(), date.getDate() - numberFirstDay);
  	
  	this._getNumberAndDescription(d, numberFirstDay, false);

  },

  _addDays: function(date) {

  	var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  	var numberDays = this._getQuantityDaysInMonth(d) + 1;
  	d.setDate(0);
  	
  	this._getNumberAndDescription(d, numberDays, true);

  },

  _addDaysAfter: function(date, numberDays) {

  	var d = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
  	var numberFirstDay = this._getNumberFirstDayInMonth(d);

  	if (numberFirstDay === 1) {
  		return;
  	}
  	if ( numberFirstDay === 0 ) {
  		numberFirstDay = 7;
  	}
  	var numberFirstDay = 9 - numberFirstDay;
  	d.setDate(0);
  	
  	this._getNumberAndDescription(d, numberFirstDay, false);

  },

  _getNumberAndDescription: function(date, numberDays, addId) {
	var d, day = {}, i = 1, idDay;

	while ( i < numberDays ) {
  		
  		day = {};
  		
  		d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i);

  		if (addId) {
  			idDay = Date.parse(d);
  			day.id = idDay;
  			
  			this._parseOccasionCurrentDay(idDay, day);
  		}
  		
  		if (this.days.length < 7) {
  			day.title = this._getDescriptionDay( d.getDay() );
  		}
  		day.number = d.getDate();
  		      	
      	this.days.push(day);

      	i++;
  	}

  },

  _parseOccasionCurrentDay: function(idDay, day) {

  	var obj = JSON.parse( StorageUtils.getOccasion(idDay) );

  	if(obj) {
  		day.occasion = obj.occasion;
  		day.names = obj.names;
  		day.text = obj.text;
  	}
  
  }

};