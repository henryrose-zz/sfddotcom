var DB_NAME = 'sfdtest1'; 
var PROD_DB = 'mongodb://dbuser:welikeboats@ds045107.mongolab.com:45107/MongoLab-xl'; 

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/' + DB_NAME);

//mongoose.connect(PROD_DB); 

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});


var definitionSchema = mongoose.Schema({
    term: String, 
    definition: String
}); 

var Definition = mongoose.model('Definition', definitionSchema); 


/** GET glossary Index **/

exports.index = function(req, res){

	var definitions = Definition.find(function(err, definitions){

		if(err){
			console.log(err); 
			return; 
		}

		res.render('glossary', { 
			title: 'Sailing For Dummies: Glossary',
			defs : definitions
		});		

	});

 	
};

exports.singleTermPage = function (req, res) {

	var definition = Definition.findOne({ term : req.params.term}, function (err, definition_obj){
		if (err){
			console.log(err); 
		}
		res.render('single-term-page', definition_obj);
	})

}; 

exports.restAddDefinition = function (req, res){


	var new_definition = new Definition({
		term : req.body.term, 
		definition: req.body.definition
	});


	new_definition.save(function(err) {

		if (err) {
			console.log(err); 
			res.json({
				status : 'bad'
			})
		}

		res.json({
			status : 'ok'
		})

	})
};

exports.showAddDefinition = function (req, res) {
	res.render('add-definition', {
		title : 'Add Definition'
	});
}