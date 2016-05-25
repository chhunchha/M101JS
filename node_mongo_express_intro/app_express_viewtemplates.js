var express = require('express'),
    app = express(),
    engines = require('consolidate'); // Template engines
    
// what engine is used for html views
app.engine('html', engines.nunjucks);

// view engine used for html
app.set('view engine', 'html');

// says where views are
app.set('views', __dirname + '/views');

// __dirname is provided by node js which gets full path of current directory 
// where this file is

app.get('/', function(req, res){
    res.render('hello', {'name' : 'Sumant'});
    // res.send('Hello World');
});

app.use(function(req, res){
    res.sendStatus(404);
});

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Express server listening on port %s', port);
});


/*
Access localhost:3000 - should say Hello World.
localhost:3000/{something} - this will say not found as not route exists

*/