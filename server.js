
//include server dependencies
var express = require('express'); 
var bodyParser = require('body-parser'); 
var logger = require('morgan'); 
var mongoose = require('mongoose'); 

var Article = require('./models/Article.js'); 

var app = express(); 
var PORT = process.env.PORT || 8000; //Initial port

//Logger Morgan
app.use(logger('dev')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.text()); 
app.use(bodyParser.json({type: 'application/vnd.api+json'})); 

app.use(express.static('./public')); 

// MongoDB configuration
mongoose.connect('mongodb://localhost/NYTReact'); 

var db = mongoose.connection; 

db.on('error', function(err) {
	console.log('Mongoose Error: ', err); 
}); 

db.once('open', function(){
	console.log('Mongoose connection successful.'); 
}); 

//Main Route
app.get('/', function(req, res){
	res.sendFile('./public/index.html'); 
})

app.get('/api/saved', function(req, res){

	Article.find({})
	.exec(function(err, doc){

		if(err){
			console.log(err); 
		}
		else{
			res.send(doc); 
		}
	})
}); 

app.post('/api/saved', function(req, res){
	var newArticle = new Article({
		title:req.body.title, 
		date:req.body.date, 
		url:req.body.url
	}); 

	newArticle.save(function(err, doc){
		if(err){
			console.log(err); 
			res.send(err); 
		} else {
			res.json(doc); 
		}
	}); 
}); 

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT); 
}); 
