
// Import the http and fs module. The fs module includes APIs for dealing with the file system,
// while the http module is used for handling HTTP web requests.
// The functions are attached to the fs module so that it behaves like an object.
// Call them with fs.functionName()

var http = require('http'),
    fs = require('fs');

// Get the simple/advanced argument from the command line

var simple = (process.argv[2] != 'advanced');

if (simple) {

  // Create the server. The function takes a callback that is called every time
  // the server receives a request and returns the server object.

  // The callback function includes two parameters, a request object that describes
  // the http request and a response object to which the response is written

  var server = http.createServer(function (req, res) {
    console.log(req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  });

  // Begin listening for requests at the localhost address on port 3000

  server.listen(3000, '127.0.0.1');
  console.log('Simple server running at http://127.0.0.1:3000/');

} else {

  // Create the server. The function takes a callback that is called every time
  // the server receives a request and returns the server object.

  // But this time our callback function will read in the index.html file and
  // send that as the response.

  var server = http.createServer(function (req, res) {
    console.log(req.url);
    fs.readFile('index.html', {encoding: 'utf8'}, function(err, data) {
      if (err) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end("Unable to read file index.html\n");
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  });

  // Begin listening for requests at the localhost address on port 3000

  server.listen(3000, '127.0.0.1');
  console.log('Advanced server running at http://127.0.0.1:3000/');

}