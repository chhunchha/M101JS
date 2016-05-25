var http = require('http');

var server = http.createServer( function(request, response){
   response.writeHead(200, {"content-type": "text/plain"});
   response.end("Hello World"); 
});


// run server and access localhost:8000
// we will see Hello world.
var port = 8000;
server.listen(port);
console.log("Starting server at " + port);
