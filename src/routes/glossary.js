var DB_NAME = 'sfdtest1'; 
var db_connection_string; 


var mongoose = require('mongoose');

if (process.env.CUSTOMCONNSTR_MONGODB_DEFINITIONS) {
    db_connection_string = process.env.CUSTOMCONNSTR_MONGODB_DEFINITIONS; 
} else {
    db_connection_string = 'mongodb://localhost/' + DB_NAME ;
}

mongoose.connect(db_connection_string); 

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
});


var definitionSchema = mongoose.Schema({
    term: String, 
    short_definition: String, 
    long_definition: String
}); 

var Definition = mongoose.model('Definition', definitionSchema); 


/** GET glossary Index **/

exports.index = function(req, res){

    var definitions = Definition.find(
        {}, 
        'term short_definition', 
        {
            sort : {
                term : 1
            }
        },
        function(err, definitions){

            if(err){
                console.log(err); 
                return; 
            }

            res.locals = {
                title : 'Sailing For Dummys: A Glossary', 
                defs : definitions
            }

            res.render(
                'layout',{
                partials : {
                    page_body : 'glossary'
                }
            });     

    });

    
};

exports.singleTermPage = function (req, res) {

    var definition = Definition.findOne({ term : req.params.term}, function (err, definition_obj){
        if (err){
            console.log(err); 
        }

        res.locals = definition_obj; 
        //res.render('single-term-page', definition_obj);

        res.render(
            'layout', {
            partials : {
                page_body : 'single-term-page'
            }
        });
    });

}; 

exports.restAddDefinition = function (req, res){


    var new_definition = new Definition({
        term : req.body.term.toLowerCase(), 
        short_definition: req.body.short_definition,
        long_definition: req.body.long_definition
    });


    new_definition.save(function(err) {

        if (err) {
            console.log(err); 
            res.json({
                status : 'bad'
            });
        }

        res.json({
            status : 'ok'
        });

    });
};

exports.showAddDefinition = function (req, res) {

    res.locals = {
        title : 'Add Definition'
    }

    res.render(
        'layout', 
        {
            partials : {
                page_body : 'add-defnition'
            }
        }
        );
};
