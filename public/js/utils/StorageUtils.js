module.exports = {

	setCurrentDate: function(date) {
		localStorage.setItem('currentDate', JSON.stringify(date));
	},

	getCurrentDate: function() {
		return JSON.parse(localStorage.getItem('currentDate'));
	},

	changeDate: function(parametr) {

		var date = this.getCurrentDate();	
		date = new Date(date.currentdate);

		if( parametr === 'inc') {
			date.setMonth(date.getMonth() + 1);	
		} else {
			date.setMonth(date.getMonth() - 1);			
		}
		
		this.setCurrentDate({currentdate: Date.parse(date)});

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
	getOccasion: function(id) {
		
		var events = JSON.parse(localStorage.getItem("events"));

		if(events && events[id]) {
			return events[id];
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

		console.log(result);
		return result;
	}
};