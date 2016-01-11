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
		
		this.setCurrentDate({currentdate: date});

		return date;
	},
	saveOccasion: function(id, obj) {
		localStorage.setItem(id, obj);	
	},
	getOccasion: function(id) {
		return localStorage.getItem(id);
	},
	deleteOccasion: function(id) {
		localStorage.removeItem(id);
	}
};