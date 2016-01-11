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
		
		if(events) {
			return events[id];
		}

		return false;
	},
	deleteOccasion: function(id) {

		var events = JSON.parse(localStorage.getItem("events"));
		delete events[id];

		localStorage.setItem("events", JSON.stringify(events));
	}
};