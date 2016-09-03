var axios = require('axios'); 

var nytAPI = "dff5e79cdef84b3b860d40e5b3f6ea28"; 

var helpers = {

	runQuery: function(topic, startYear, endYear){

		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";

		return axios.get(queryURL)
			.then(function(response){

				var results =[]; 
				var allResults = response.data.response.docs; 
				var counter = 0; 

				for (var i = 0; i < allResults.length; i++){
					if(counter > 4) {
						return results; 
					}
					if(allResults[counter].headline.main && allResults[counter].publication && allResults[counter].webUrl){
						results.push(allResults[counter]); 
					}
				}

				return results;  
			})
	}, 


	postArticle: function(title, date, url){

		axios.post('/api/saved', {title: title, date: date, url: url})
		.then(function(results){

			console.log("MongoDB success!")
			return(results); 
		})
	}
}

module.exports = helpers; 