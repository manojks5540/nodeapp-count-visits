var http = require('http');

var redis = require('redis');

var client = redis.createClient();

var userCount = 0;

var server = http.createServer(function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.write('Hello World!\n');
 
    userCount++;	 
 
    res.write('We have had ' + userCount + ' visits!\n');
	
    client.set(['visits', userCount]);

    res.end();

 

});

server.listen(8500);

console.log('server running...')
