var React = require('react');
var ListActions = require('../actions/ListActions');
var SearchStore = require('../stores/SearchStore');
var $ = require('jquery');
var assign = require('object-assign');


function getSearchEvents() {
	
	var results = SearchStore.getSearchResult();

	if (results.length > 0) {
		$('#search-result').show();
		return {results: results};
	} else {
		$('#search-result').hide();
		return {q:'', results: results}
	}

}

var SearchEvent = React.createClass({

	getInitialState: function() {
		
		var obj = assign({ q: '', timer: 0 }, getSearchEvents() );
		return obj;
	},

	componentDidMount: function() {
      SearchStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      SearchStore.removeChangeListener(this._onChange);
    },

	render: function() {
		
		return (
			<div className = "search-event">
				<form className = "form-inline" onSubmit={this.handleSubmit}>
					<button type="submit" className = "btn">
						<span className = "glyphicon glyphicon-search" aria-hidden="true"></span>
					</button>
					<div className = "form-group search-event-group">
						<input type="text" className = "form-control" id="searchevent_field" name="q"
							placeholder="события, дата или участник" value={this.state.q} onChange={this._handleQChange} />
						<ul className = "search-result-ul" id = "search-result">
					        {this.state.results.map(function(result) {
					           return <ListItemSearchResult key={result.dayId} data={result}/>;
					        })}
					    </ul>
					</div>
				</form>
			</div>
		)
	},

	handleSubmit: function() {
		return false;
	},

	_handleQChange: function(event) {

		var q = event.target.value;

		this.setState({q: q});	

		if (q.length < 3) {
			$('#search-result').hide();
		} else {
	        this.state.timer = window.setTimeout(
	        	ListActions.searchOccasion( q ), 
	        	1000
        	);
		}
	},

	_onChange: function() {
      this.setState(getSearchEvents());
    }

});

var ListItemSearchResult = React.createClass({
  render: function() {
    return <li onClick={this._onClick.bind(this, this.props.data.dayId)}>
    			{this.props.data.names}: {this.props.data.occasion}
			</li>;
  },

  _onClick: function(id) {
  	ListActions.setToday(id);
  	ListActions.searchOccasion('');
  }

});

module.exports = SearchEvent;