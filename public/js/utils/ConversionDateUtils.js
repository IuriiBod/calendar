var strings = require('../settings');
var StorageUtils = require('./StorageUtils');
var $ = require('jQuery');

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
  	
  	this._getNumberAndDescription(d, numberFirstDay);

  },

  _addDays: function(date) {

  	var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  	var numberDays = this._getQuantityDaysInMonth(d) + 1;
  	d.setDate(0);
  	
  	this._getNumberAndDescription(d, numberDays);

  },

  _addDaysAfter: function(date) {

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
  	
  	this._getNumberAndDescription(d, numberFirstDay);

  },

  _getNumberAndDescription: function(date, numberDays) {
	 
    var d, day = {}, i = 1, day_id;

    while ( i < numberDays ) {
  		
  		day = {};
  		
  		d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i);

  		day_id = Date.parse(d);
  		
      day.id = day_id;
      day.number = d.getDate();
  		
      if (this.days.length < 7) {
        day.title = this._getDescriptionDay( d.getDay() ) + ',';
      }	
			
      this._parseOccasionCurrentDay(day_id, day);
  		
  		this.days.push(day);

      i++;
  	}

  },

  _parseOccasionCurrentDay: function(day_id, day) {

  	var obj = StorageUtils.getOccasion(day_id) ;
    
    if ( Object.keys(obj).length ) {
      day.event = {
        is_event: true,
        occasion: obj.occasion,        
        names: obj.names,
        text: obj.text
      }      
    } else {
      day.event = { is_event: false, occasion: '', names: '', text: ''}
    }

 }

};