var React = require('react'); 

var Saved = React.createClass({

	//render
	render:function(){

		return(

			<div className='panel panel-default'>
				<div className='panel-heading'>
					<h3 className='panel-title'>
						Saved Articles</h3>
				</div>
				<div className='panel-body text-center'>
			
				<h1>{this.props.savedArticles(function(search, i)
					{
						return <div className='listOfArticles' key={i}>{search.title}<br />{search.date}<br />{search.url}<br /><button type='button' className='btn btn-success'>Delete</button>
							</div>
					}
					)} 
				</h1></div>
			</div>
		)
	}
}); 

module.exports = Saved; 