
// Import the fs module. The fs module includes APIs for dealing with the file system.
// The functions are attached to the fs module so that it behaves like an object.
// Call them with fs.functionName()

var fs = require('fs');

// Get the sync/async argument from the command line

var async = (process.argv[2] != 'sync');

if (async) {
  
  // Demonstrate asynchronous file reading. Note that "Called the Read File Method"
  // is printed to the console before the file's contents are.

  // fs.readFile() is an asynchronous operation. Your program continues executing
  // while it does work in the background. You provide a callback function that is
  // executed once its operation is complete.

  console.log("About to Read File");

  fs.readFile('about.txt', function(err, data) {
    if (err) {
      console.log("Unable to read file about.txt");
    } else {
      console.log("File Contents:");
      console.log(data.toString());
    }
  });

  console.log("Called fs.readFile()\n");

} else {

  // Demonstrate synchronous file reading. Note that this time "Called the Read File Method"
  // is printed to the console before the file's contents are. 

  // Because fs.readFileSync() is synchronous, it completes its operation before
  // returning control to your code and returns the result

  console.log("About to Read File\n");

  var data = fs.readFileSync('about.txt');
  if (!data) {
    console.log("Unable to read file about.txt");
  } else {
    console.log("File Contents:");
    console.log(data.toString());
  }


  console.log("\nCalled fs.readFileSync()")
}