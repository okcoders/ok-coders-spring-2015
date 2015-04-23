OK Coders: Lesson 10 Exercises
==============================

You have a number of homework assignments this week. Complete each assignment. These homework assignments will be difficult. The javascript is not difficult but you will likely spend a great deal of time reading online documentation to understand what built-in modules and functions to use in order to complete the assignments.

You may download this entire respository from the command line with the git command:

	git clone https://github.com/okcoders/node-introduction-homework.git

You'll find a number of files in the template subdirectory. Complete the assignment by modifying these files.

## References

[Node API Documentation](http://nodejs.org/api/)

## Assignment 1

**Files**

- reader.js
- test.txt

**Instructions**

Modify the simple file reader we built in class to accept a file path from the command line. The reader will print the contents of that file instead of one that we've *hard coded* into the program. You'll need to use `process.argv[2]` to read arguments from the command line and get the file to read.

Example Usage:

	$ node reader.js relative/path/to/file

Test it with text files on your computer. Try the "test.txt" file first. Remember you can use `..` to go up directories. When you get it working you'll have built the most basic version of the `cat` command line program.

**Documentation**

[File System Module](http://nodejs.org/api/fs.html)

[Process global object](http://nodejs.org/api/process.html)

## Assignemnt 2

**Files**

- printer.js
- printer-test.js
- test.txt

**Instructions**

Copy the reader code responsible for reading a file and printing it to the console to a module, namely the printer.js file. Wrap all of that functionality in a single function which takes a parameter for the filename and export it as the `print` function.

Run print-test.js to test if your printer works. The print-test is hardcoded to use the reader-sample.txt file. Modify it to accept any file path from the command line, like you did with the first assignment.

Example usage:

	$ node printer-test.js

And
	
	$ node printer-test.js relative/path/to/file

**Documentation**

[File System Module](http://nodejs.org/api/fs.html)

[Process Global Object](http://nodejs.org/api/process.html)

[Creating Modules](http://nodejs.org/api/modules.html)

## Assignment 3

**Files**

- mycopy.js
- test.txt

**Instructions**

Create a program that can take two arguments when called from the command line. Both arguments should be filenames. Your program copies the contents of the file in the first argument to the file identified by the second argument.

Be careful that you don't overwrite existing files! Keep it simple, try copying test.txt to test-copy.txt, for example.

Example Usage

	node mycopy filename1 filename2

Specifically

	node mycopy test.txt test-copy.txt

You'll need to use the `process.argv` array to get the filenames from the command line.

**Documentation**

[File System Module](http://nodejs.org/api/fs.html)

[Process Global Object](http://nodejs.org/api/process.html)

## Assignment 4

**Files**

- server.js
- public/
- public/index.html

**Instructions**

The simple http server we created in class responds to every request with the same page. Create an http server than can tell what file a user is requesting and send that file if it is located in the public directory.

For example, if a user browses to *http://127.0.0.1/index.html* then respond with the *public/index.html* file. If they browse to *http://127.0.0.1/about.html* send *public/about.html* (you'll have to create that file). If the file does not exist, send back an error like our simple example from class does.

You will need to understand the request object (req) in the server callback, part of the `http` module, how to parse the url on the request object with the `url` module, how to build a path with the `path` module, how to check for the existence of a file and read its contents with the fs module, and how to send the file back as the server's response through the response object (res) in the server callback.

When you are finished you won't have a lot of code. This is actually a very small application. But you will probably spend a great deal of time studying documentation and looking up examples on Stack Overflow.

Refer back to the Important APIs section of today's class material for more information about some of the modules you'll need to use.

**Usage**

	$ node server.js

**Documentation**

[File System Module](http://nodejs.org/api/fs.html)

[Path Module](http://nodejs.org/api/path.html)

[URL Module](http://nodejs.org/api/url.html)

[HTTP](http://nodejs.org/api/http.html)

Specifically, you may find the following subsections of the http documentation helpful:

- [http event request](http://nodejs.org/api/http.html#http_event_request)
- [http incoming message](http://nodejs.org/api/http.html#http_http_incomingmessage)
- [http server response](http://nodejs.org/api/http.html#http_class_http_serverresponse)

## Assignment 5

Begin studying the express documentation. Browse through the Guide and the API Reference.

[Express](http://expressjs.com/)