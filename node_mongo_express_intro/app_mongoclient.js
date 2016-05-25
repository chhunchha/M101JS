var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

MongoClient.connect("mongodb://127.0.0.1:27017/video", function(err, db) {
    assert.equal(null, err);
    console.log("Successfully connected to server");
    
    //find some documents in our collection
    db.collection('movies').find({}).toArray(function(err, docs){
        docs.forEach(function(doc){
            console.log(doc.title);
        });
        db.close();
    });
    
    console.log("Called find()");
});