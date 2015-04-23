OK Coders: Lesson 9, Introduction to Node
===========================

Lesson material contained in intro-node.md.

The examples directory contains example code used during the lesson. `cd` into the eamples directory to run each program with node.

## Reading Files

`readfile.js` reads the content in `about.txt` and prints it to the console.

**Usage**

	$ node readfile.js

## Using Modules

`calculator.js` imports `circle.js` as a module and uses it to compute the area of a circle.

**Usage**

	$ node calculator.js

## A Simple HTTP Server

`server.js` creates a web server and can either send a hello world response or a file.

**Simple Usage**

Sends "hello world" to every request.

	$ node server.js

**Advanced Usage**

Sends the "index.html" file to every request.

	$ node server.js advanced