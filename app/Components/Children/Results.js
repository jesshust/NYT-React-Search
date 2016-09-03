var React = require('react'); 

var Results = React.createClass({

	getInitialState: function(){
		return {
			title:"", 
			date: "", 
			url: "", 
			results:[]
		}
	}, 
	//user click

	clickToSave: function(result){

		this.props.article(result.headline.main, result.publication, result.webUrl); 
	}, 

	componentWillReceiveProps: function(newProps) {
		var that = this; 
		var myResults = newProps.results(function(search, i){
			var boundClick = that.clickToSave.bind(that, search); 
			return <div className='listOfArticles' key={i}>{search.title}<br />{search.date}<br />{search.url}<br /><button type='button' className='btn btn-warning' onClick={boundClick}>Save</button>
				</div>
		}); 

		this.setState({results: newResults}); 
	}, 

	render:function(){

		return(

			<div className='panel panel-warning'>
				<div className='panel-heading'>
					<h3 className='panel-title text-center'>Results</h3>
				</div>
				<div className='panel-body'>
					{this.state.results}
				</div>
			</div>
		)
	}
}); 

module.exports = Results; 