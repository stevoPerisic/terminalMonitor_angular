function buildPunchesObject(_stringPunches){

}

(function(){
	'use strict';

	var express = require('express');
	var logger = require('express-logger');
	var bodyParser = require('body-parser');
	var app = express();
	var path = require("path");
	var http = require('http');
	
	app.use(logger({path: "../logfile.txt"}));
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }));

	// parse application/json
	app.use(bodyParser.json());

	// parse application/vnd.api+json as json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

	app.use(express.static(path.join(__dirname, '../')));

	// THIS IS GOOD FOR TRANSACTIONS ONLY!! 
	app.get('/getData', function(req, res){
		var data;
		var url = 'http://qa1-www.mypeoplenet.com/clockmessages.cfm?terminalID=4311340001BU&Startdate=7-24-14%2008:00&ServerID=QA';
		http.get(url, function(response){
			var str;
			var headers;
			var rows = [];
			var returnObj = {};
			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				headers = str.match(/<th\b[^>]*>(.*?)<\/th>/ig); // match all the th tags
				for(var i=0, l=headers.length; i<l; i++){
					headers[i] = headers[i].replace(/(<([^>]+)>)/ig,""); // strip the html tags
				}

				console.log(headers);
				str = str.replace(/\s{2,}/g, ""); // replace something.... maybe ...
				str = str.replace(/ /g,''); // and another one....
				str = str.match(/<trvalign\b[^>]*>(.*?)<\/tr>/ig); // mathc the trs whre the data is...

				for(var j=0, k=str.length; j<k; j++){
					var temp = str[j].replace(/(<([^>]+)>)/ig,","); // strip the html tags

					console.log('________________________________');
					console.log('Temp: '+temp);

					var tempArr = temp.split(',');
					rows[j] = {};

					for(var m=0, n=tempArr.length; m<n; m++){
						// rows[j] = {};
						// console.log('m = '+m+', value: '+tempArr[m]);
						if(tempArr[m].length > 0){
							rows[j][m] = tempArr[m];
						}
					}

					console.log(JSON.stringify(rows[j]));

				}

				// console.log('\n\nString: \n'+str);
				console.log('\n\nRows: \n'+JSON.stringify(rows));
				returnObj.headers = headers;
				returnObj.data = rows;


				// // send response
				res.send(returnObj);
				// your code here if you want to use the results !
			});

		}).on('error', function(e){
			console.log("Got error: "+e.message);
		});
	});

var port = process.env.PORT || 8888;
app.listen(port, function() {
	console.log("Listening on " + port);
});

})();

