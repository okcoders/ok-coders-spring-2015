Introduction to Node.js
============================

Node.js is a platform for writing server-side javascript, or javascript that can be run from the command line instead of in the browser. Node allows you to write programs in javascript but also gives you access to underlying system functionality such as reading and writing files or making connections to other computer across the internet.

Node is also the command line program which runs your javascript code. It implements that lower level functionality like file system access and exposes it to your application in what are known as modules. The node program is also an *interpreter* which is able to turn your plain text javascript file into a running application on your computer.

The node platform is large and we won't be covering all of it in this class by any means. We'll focus on those parts of node that we need to know in order to build web applications. Importantly, we'll emphasize the higher-level design patterns that are common in node such as asynchronous I/O (input/output) and modules. 

## References

[Node](http://nodejs.org/)

The node home. Definitely want to check out the Docs page.

[Node APIs](http://nodejs.org/api/)

The node documentation page.

[Express](http://expressjs.com/)

The web development framework we will ultimately be using.

[Learn You Node](https://github.com/rvagg/learnyounode)

An introduction to node.js via a series of self-guided workshops.

## Asynchronous Programming

Asynchronous functions are those which run in the background. When the function completes its task it calls back into code you've provided which can then handle the result of the operation. In the meantime the rest of your application is able to continue executing.

What makes node so popular is its asynchronous approach to almost all long running operations. And long running is a relative term. For a computer, an operation that takes a hundred milliseconds might be considered long running.

Long running operations are extremely common in web servers and include common *I/O* or *input/output* operations such as reading files from disk and accessing databases. For example, a web server receives a request in the form of someone browsing to a file hosted by the server. The server responds to the request by reading from a file or accessing a database and it typically does so in one of two ways. 

The first option is to perform the operation (read the file, access the database) and wait for it to finish before sending the results back to the browser. This prevents the server from handling new requests in the meantime. If a server receives many requests simultaneously it could take many seconds to handle the most recent ones, leading some of the requests to be dropped or ignored.

The second option for the server is to start up a copy of itself to handle the request separately. For each new request the operating system must allocates memory for that copy of the server code. It may only be a small amount, as little as 2-5MB, but if thousands of requests are received simultaneously the computer will run out of memory and the server may crash.

With the help of node we'll be able to write code that doesn't suffer from either of these problems, and we can do it with the javascript that we already know.

## Asynchronous File Access

Let's look an example. Node provides *Application Programming Interfaces* (APIs, or really just collections of functions) that automatically support asynchronous access to files and databases. The collections of functions are made available in *modules*, which we'll learn more about below. One of those is the [File System](http://nodejs.org/api/fs.html) module, abbreviated `fs`. Let's use the file system module to read a text file and print it to the console.

First make sure you have a text file called *test.txt* in the current directory filled with some text, perhaps a bit of [lorem ipsum](http://www.lipsum.com/). Create a new file called *reader.js*. Add the following code to that file.

First we need to *import* or *require* the file system module. Save it to a variable:

```js
var fs = require('fs');
```

The variable `fs` now acts like an object with many file system functions attached to it. Use the dot notation `.` to call those function on the `fs` object.

One of those functions is `readFile`, which takes two parameters, the name of the file you want to read and a callback function which will be executed once the contents of the file are available:

```js
fs.readFile('test.txt', function(err, data) {

});
```

Notice the use of the anonymous, inline function for the callback which takes two parameters, `err` and `data`. This is an extremely common pattern with node's asynchronous operations.

Our callback function is responsible for dealing with the contents of the file. `data` is a *stream* object which we won't go into. For now it's satisfactory to know that you can call `toString()` on it to get the text contents of the file. But first we should check for errors. Modify the function to include *error checking*:

```js
fs.readFile('test.txt', function(err, data) {
	if (err) {
		console.log("Unable to read file about.txt");
	}
});
```

We're now ready to extract the contents of the file and print them to the screen:

```js
fs.readFile('test.txt', function(err, data) {
	if (err) {
		console.log("Unable to read file test.txt");
	} else {
		console.log("File Contents:");
      	console.log(data.toString());
	}
});
```

Run the program from the command line with node:

	$ node reader.js test.txt

It should read the contents of the *test.txt* file and print it to the screen!

This may not seem exceptional. Almost every programming environment provides a way to read files. But this function is doing it asynchronously. Add two `console.log` commands, one before and one after the call to `js.readFile`, so that you can see the effect of an asynchronous operation:

```js
console.log("About to Read File");

fs.readFile('test.txt', function(err, data) {
	if (err) {
		console.log("Unable to read file test.txt");
	} else {
		console.log("File Contents:");
      	console.log(data.toString());
	}
});

console.log("Called fs.readFile()\n");
```

Run the program again. This time you'll see the string "Called fs.readFile()" printed to the console *before* the contents of the file are. Our program is able to continue executing even while the file is being read in the background. That makes it asynchronous.

Here's the code for the entire example:

```js
var fs = require('fs');

console.log("About to Read File");

fs.readFile('test.txt', function(err, data) {
	if (err) {
		console.log("Unable to read file test.txt");
	} else {
		console.log("File Contents:");
      	console.log(data.toString());
	}
});

console.log("Called fs.readFile()\n");

```

## Modules

Node organizes code in modules. A module is a collection of functions and data all contained in a single file. Every file in a node application is its own module. Node also provides a number of built in modules.

Modules are accessed with the `require` function, which is available in the global scope. For built-in modules, pass the module's *alias* as a string. We've already seen that the alias for the file system module is "fs":

```js
var fs = require('fs');
```

Assign the result of requiring a module to a variable. The variable now behaves as an object with the module's functions attached to it.

Refer to the [Node API Documentation](http://nodejs.org/api/) for information on modules and their aliases.

## The HTTP Module

Let's look at another module, the `http` module. Create a new file called "server.js" and import the http module:

```js
var fs = require('http');
```

The http module includes the functionality needed to create a web server in node. Let's do that. Creating a server is as simple as calling the appropriately named function:

```js
var server = http.createServer(function (req, res) {
	console.log(req.url);
});
```

`createServer()` create a new server instance. It takes a single parameter, a callback function that itself takes two parameters, the *request* and *response* object for the current server operation. 

We'll learn more about http requests and responses in the next lesson. For now it's important to know that the request object has a `url` property that indicates which resource on the server is being requested and that a proper response must have *headers* and *body* content. Headers include information or *metadata* about the response, and the body is composed of text like html or perhaps an image.

When `createServer` is set up like this the callback is responsible for handling all requests to the server, or anytime someone browses to it. The connection expects a response, so let's send back "hello world". Write the headers and use the `end` function on the `res` object to write out plain text:

```js
var server = http.createServer(function (req, res) {
  	console.log(req.url);
	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end('Hello World\n');
});
```

Finally, run the server by calling the `listen` function on the `server` variable. Listen takes two parameters, the port to listen on and the url:

```js
server.listen(3000, '127.0.0.1');
```

Save your file and start the application in the console with:

	$ node server.js

Visit `http://127.0.0.1:3000` in a browser. The browser should show "hello world". Watch the console. Try any path at that address and node prints it to the console.

Congratulations! You just built a web server in node. Here's the code in its entirety:

```js
var fs = require('http');

var server = http.createServer(function (req, res) {
  	console.log(req.url);
	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end('Hello World\n');
});

server.listen(3000, '127.0.0.1');
```

Let's make our server slightly more advanced. We know how to read files with the `fs` module. Let's import that module and send back an "index.html" file that lives in the same directory as the server.

First create an "index.html" file and add some html to it. You might try the bootstrap template. You'll need to fix the links to the css and javascript files, but use the content distribution network (CDN) resources instead of local ones:

```html
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">

<!-- Latest compiled and minified JavaScript -->
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
``` 

Now modify server.js first to include the `fs` module. Put it at the top of the file with the http require:

```js
var http = require('http');
var fs = require('fs');
```

In the server callback, use the `readFile()` function on the `fs` module to read in index.html:

```js
var server = http.createServer(function (req, res) {
	console.log(req.url);
	fs.readFile('index.html', function(err, data) {
	 
	});
});
```

Notice that we are using callback functions inside callback functions. This is known as [callback hell](http://callbackhell.com/), although here it isn't too bad.

In the callback to `readFile`, check if there is an error and if so send an appropriate response to the browser. Otherwise send the contents of the file:

```js
var server = http.createServer(function (req, res) {
	console.log(req.url);
	fs.readFile('index.html', function(err, data) {
		if (err) {
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end("Unable to read file index.html\n");
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(data.toString());
		}
	});
});
```

You now have a server that can respond to browsers with files from your hard drive. Imagine having a *public* folder that contains all the files you want to send so that your server restricts access to that folder only. Sound familiar?


## The Event Loop

Our server node program behaves differently from previous node programs we've written. In earlier programs, node stopped running once the last line of code had been reached. Node executed everything in the program and when there was nothing left to execute node exited.

Our server program, on the other hand, keeps running even after the last line of code is reached. Why?

Javascript programs run with a built-in event loop. An event loop handles and processes external events and converts them into callback invocations. Events in the browser include activity like a user clicking the mouse on a button, scrolling or entering some text. On the server events include the completion of file system operations or network connections.

When a program registers a callback for events that may occur sometime in the future, node ensures the event loop continues to run while waiting for events to occur. If there is nothing for your program to do in the meantime no code will be executed, but as soon as an event does occur your callback code is run so that your program has the opportunity to respond to it. Your program will continue to run, waiting for events to occur, as long as you have callbacks registered for events.

## Creating Your Own Modules

So far we've been building small programs, a function here, some data there, nothing very complex, and we've been keeping all of a program's code in a single file. Once our program grows beyond a few hundred lines of code it is a good idea to organize related bits and keep them in separate files. Node makes it possible to do this using the same module pattern we learned above.

In addition to including built-in modules, node allows us to create our own modules. There is a one-to-one correspondence between modules and files in node. A file is automatically a module, and you can use functions in a file by exporting them from it and then requiring the file from other parts of your application.

Let's create a module to handle geometric calculations for circles. Create a new file called *circle.js* and add the following code to it:

```js
var PI = Math.PI;

function area(r) {
  return PI * r * r;
};

function circumference(r) {
  return 2 * PI * r;
};
```

Now lets create a program that uses this functionality. Create another file called "calculator.js" in the same directory. Import the "circle.js" file like so:

```js
var circle = require('./circle');
```

Notice that the string we pass to `require` is slightly different. Preceed the name of the file with `./`, which indicates that the file is relative to the current directory. Then provide the name of the file but leave off the `.js` part. All we're doing is providing the path to the file instead of an alias while leaving off the file extension.

Access the functions as you would on built-in modules with the object dot notation:

```js
var area = circle.area(10);
console.log(area); 
```

Run the program from the command line:

	$ node calculator.js

Oops. It doesn't work! The module does not have the `area` method defined. What happened?

Every file in node -- and so every module -- has its own scope. The functions in a file are not available to other parts of an application unless they are explicitly exported. To export a function or some other bit of data in a file, attach it to the `exports` object just as you attach a property to a normal javascript object. Fix *circle.js* to do this at the bottom of the file:

```js
var PI = Math.PI;

function area(r) {
  return PI * r * r;
};

function circumference(r) {
  return 2 * PI * r;
};

/* export the functions by attaching them to the exports object */

exports.area = area;
exports.circumference = circumference;
```

Now save and run the calculator program. It works!

Note that the exported functions are available under the property name you use on the `exports` object, not the function name itself.

## Important APIs

[Modules](http://nodejs.org/api/modules.html)

Application Programming Interfaces (APIs) in node are organized into modules. Modules are like self-contained objects that make functions and data available to other parts of your program.

Use the `exports` object inside a module to make a function available: 

```js
var PI = Math.PI;

exports.area = function (r) {
  return PI * r * r;
};

exports.circumference = function (r) {
  return 2 * PI * r;
};
```

Alternatively use the `module.exports` variable and assign it an object that includes all your functions in one go:

```js
var PI = Math.PI;

module.exports = {
	area: function (r) {
		return PI * r * r;
	},
	circumference: function (r) {
		return 2 * PI * r;
	}
};
```

The two approaches produce the same result.

[File System](http://nodejs.org/api/fs.html)

Interact with the file system, including opening files, creating and writing to files and working with directories.

File system operations are asynchronous by default but most functions include a synchronous counterpart. 

```js
var fs = require('fs');

fs.readFile('file.txt', function(err, data) {
	// check for err
	// do something with data, like convert it to a string
	var txt = data.toString();
});
```

[Path](http://nodejs.org/api/path.html)

Construct paths and normalize them in accordance with operating system requirements.

Don't hardcode paths. Different OS's treat the directory separators `/` and `\` differently. Use the `path` module to compose paths.

```js
var path = require('path');

var filepath = path.join('examples','about.txt');
// filepath is 'examples/about.txt'
```

[HTTP](http://nodejs.org/api/http.html)

Creates an HTTP server and responds to incoming HTTP requests. The `express` framework we'll use is built on top of the `http` module.

```js
var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

http.listen(3000, '127.0.0.1');
```