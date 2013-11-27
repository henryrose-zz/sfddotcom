
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./src/routes');
var user = require('./src/routes/user');
var glossary = require('./src/routes/glossary'); 
var http = require('http');
var path = require('path');

var app = express();

app.engine('html', require('hogan-express'));
app.enable('view cache');


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'html');
app.use(express.favicon(path.join(__dirname,'/public/img/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, '/src/public') }));
app.use(express.static(path.join(__dirname, '/src/public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', glossary.index);
app.get('/users', user.list);

app.get('/glossary', glossary.index);

app.get('/g/:term', glossary.singleTermPage);

app.get('/adddefinition', glossary.showAddDefinition);
app.post('/adddefinition', glossary.restAddDefinition); 

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
