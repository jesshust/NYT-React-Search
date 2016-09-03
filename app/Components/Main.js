var axios = require('axios'); 

//include react
var React = require('react'); 

//children
var Form = require('./Children/Form'); 
var Results = require('./Children/Results'); 
var Saved = require('./Children/Saved'); 

//helper function
var helpers = require('./utils/helpers.js'); 

//main component
var Main = React.createClass({

	//clicks
	getInitialState: function(){
		return {
				topic: "", 
				startYear: "", 
				endYear: "", 
				results: [], 
				saved: []
		}
	}, 


	setTerm: function(top, start, end){
		this.setState({
			topic: top, 
			startYear: start, 
			endYear: end
		})
	}, 

	savedArticles: function(title, date, url){
		helpers.postArticles(title, date, url); 
		this.getArticles(); 
	}, 

	getArticles: function(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({
						savedArticles: response.data
				}); 
			}.bind(this)); 
	
	}, 
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.topic != this.state.topic){
			console.log('Updated'); 

			helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear)
			.then(function(data){
				console.log(data); 
				if (data != this.state.results)
				{
					this.setState({
						results: data
					})
				}
			}.bind(this))
		}
	}, 

	componentDidMount: function(){
		axios.get('/api/saved')
			.then(function(response){
				this.setState({
					savedArticles: response.data
				}); 
			}.bind(this)); 
	}, 

	render: function(){
		return(
			<div className="container">
				<div className="row">

					<div className="jumbotron">
					<h2>New York Times Articles</h2>
					<h3>Search and Save Articles</h3>
					</div>
				</div>

			<div className="row">
				<Form setTerm={this.setTerm}/>
			</div>

			<div className="row">
				<Results results={this.state.results} savedArticles={this.savedArticles}/>
			</div>

			<div className="row">
				<Saved savedArticles={this.state.savedArticles}/>
			</div>
		</div>

		)
	}

}); 

module.exports = Main; 