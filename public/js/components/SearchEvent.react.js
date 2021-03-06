var React = require('react');
var ListActions = require('../actions/ListActions');
var SearchStore = require('../stores/SearchStore');
var assign = require('object-assign');


function getSearchEvents() {
	
	var results = SearchStore.getSearchResult();
	return {results: results};
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

    _onClick: function(id) {
  		ListActions.setToday(id);
		this.setState({q:'', results: [] });
	},

	_mouseOver: function (id) {
        ListActions.highlightResult(id);
    },
    _mouseOut: function (id) {
        ListActions.rehighlightResult(id);
    },

    _showContainerResult: function() {
    	console.log(this.state.results);
    	return ( this.state.results.length > 0 )
		    ? <div className="show-search-result-container" id="show-search-result-container">
					<div className = "search-result-list">
						{ this.state.results.map( function( result ) {
				        	return 	<div className="item-result" key={result.date_id} >
					        			<div className="result"
					        				onClick={this._onClick.bind(this, result.date_id)}
					        				onMouseOver={this._mouseOver.bind(this, result.date_id)}
					        				onMouseOut={this._mouseOut.bind(this, result.date_id)}>
					        				<p className="result-occasion">{result.occasion}</p>
					        				<p className="result-date">{result.names}</p>
							    		</div>
							    		<div className="line-separetor-result">
							    		</div>
						    		</div>;
				        }, this) }
				    </div>
		    	</div>
		    : '';
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
						{ this._showContainerResult() }
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

		if ( q.length >= 3 ) {
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

module.exports = SearchEvent;