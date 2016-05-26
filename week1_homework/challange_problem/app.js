var express = require('express'),
    app = express(),
    engine = require('consolidate')
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
    
app.engine('html', engine.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));

function errorHandler(err, req, res, next) {
    console.error(err.message);
    console.error(err.stack);
    res.status(500).render('error_template', {error: err});
}

var movies_collection;

function render_movies(req, res, next, message) {
    if(typeof message == undefined) message = "";
    
    movies_collection.find({}).toArray(function(err, docs){
        res.render('new_movie', {'movies': docs, 'message': message});
    });
}

MongoClient.connect("mongodb://localhost:27017/movies", function(err, db){
    assert.equal(null, err);
    console.log("Successfully connected to mongodb server");
    
    movies_collection = db.collection('movies');

    app.get('/', function(req, res, next){
        render_movies(req, res, next);
    });
});

app.post('/save_movie', function(req, res, next){
    var title = req.body.title;
    var year = req.body.year;
    var imdb = req.body.imdb;
    console.log("Got movie details %s %s %s", title, year, imdb);
    //res.redirect('/');
    var movie = { 'title': title, 'year': year, 'imdb': imdb};
    movies_collection.insertOne(movie, function(err, records){
        if(err) {
            var message = "Fail to save movie";
        } else {
            var message = "Movie saved.";  
        }
        render_movies(req, res, next, message);
    });
});


app.use(errorHandler);

var server = app.listen(3000, function(){
var port = server.address().port;
    console.log('Express server listening on port %s', port);
})