var express = require('express'),
    app = express(),
    cons = require('consolidate');

app.engine('html', cons.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', {error : err});
}

app.get('/', function(req, res, next) {
    res.send('Nothing at / </br> try accessing /sumant?getvar1=firstvalue&getvar2=secondvalue');
});

app.get('/:name', function(req, res, next) {
   var name = req.params.name;
   var getvar1 = req.query.getvar1;
   var getvar2 = req.query.getvar2;
   res.render('getparams', { name: name, getvar1: getvar1, getvar2: getvar2}); 
});

app.use(errorHandler);

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Express server listening on port %s', port);
});