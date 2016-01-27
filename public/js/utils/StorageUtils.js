module.exports = {

	setDate: function(key, date) {
		localStorage.setItem(key, JSON.stringify(date));
	},

	getDate: function(key) {
		return JSON.parse(localStorage.getItem(key));
	},

	getToday: function() {
		var date = new Date();

		date.setHours(0,0,0,0);
		date = Date.parse(date);

		return date;
	},

	getCurrentDay: function() {

		var date = this.getDate('currentday');

		if(date) {
			return date.currentday;
		}

		return getToday();
	},

	changeCurrentMonth: function(parametr) {

		var date = this.getDate('currentdate');	
		date = new Date(date.currentdate);

		if( parametr === 'inc') {
			date.setMonth(date.getMonth() + 1);	
		} else {
			date.setMonth(date.getMonth() - 1);			
		}
		
		this.setDate('currentdate', {currentdate: Date.parse(date)});

		return date;
	},
	saveOccasion: function(id, obj) {
		
		var events = JSON.parse(localStorage.getItem("events"));

		if (events) {
			events[id] = obj;
		} else {
			events = {};
			events[id] = obj;
		}
		
		localStorage.setItem("events", JSON.stringify(events));

	},
	getOccasion: function(day_id) {
		
		var events = JSON.parse(localStorage.getItem("events"));

		if(events && events[day_id]) {
			return events[day_id];
		}
		
		return {};
	},
	deleteOccasion: function(id) {

		var events = JSON.parse(localStorage.getItem("events"));
		delete events[id];

		localStorage.setItem("events", JSON.stringify(events));
	},
	searchOccasion: function(q) {

		var events = JSON.parse(localStorage.getItem("events")),
			str = '',
			result = [],
			q = q ? q : '';

		for (var dayid in events) {
			for (var key in events[dayid]) {
				str = events[dayid][key];

				if ( typeof(str) === "string") {
					
					str = str.toLowerCase();
					q = q.toLowerCase();
					
					if ( str.indexOf(q) >= 0 ) {
						result.push(events[dayid]);
						break;
					}	
				}
				
			}
		}

		return result;
	}
};