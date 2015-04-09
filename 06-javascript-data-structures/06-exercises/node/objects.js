
// Instructions
// cd into the correct directory and run the file with `node objects.js`
// You will see a number of failing tests.
// Complete each of the 9 problem by filling in the provided variables
// with the correct values to get the tests to pass.


// 1. 
// Create an object with a `name` property whose value is 'Michael'

var obj1 = { };


// 2. 
// Create an object with a `name` property whose value is 'James' 
// and and `age` property with the value 48

var obj2 = { };


// 3.
// Create an object with a `happy-days` property whose value is true
// Be sure to include the dash (-) in the property name. You'll need
// to define the object slightly differently. 
// See lecture notes for help

var obj3 = { };


// 4.
// Modify the object so that its `music` property is updated to 'Techno'

var obj4 = {
  name: 'Carissa',
  age: 23,
  music: 'Country'
};


// 5.
// Create an object with a `name` property that is itself an object.
// The name object should have `first` and `last` properties whose
// values are 'Ada' and 'Lovelace' respectively.

var obj5 = { };


// 6.
// Create an object with a `name` property that is itself an object.
// The name object should have `first` and `last` properties whose
// values are 'Susan' and 'Kare' respectively.
// The object should also have a `job` property that is an object.
// The job object should `title` and `company` propeties whose 
// values are 'Creative Director' and 'NeXT' respectively.
// Watch the capitalization and syntax!

var obj6 = { };


// 7.
// Create an object with a single function named `meaningOfLife` which
// returns the number 42.

// Remember that you can declare a function and assign it to a variable like:

var func = function() {
  // do something
};

var obj7 = { };


// 8.
// Create an object with two functions named `completed` and `failed`.
// The completed function should update the variable `successMsg` below to 'Completed',
// and the failed function should update `failureMsg` to 'Failed'.
// e.g. successMsg = 'Completed' or failureMsg = 'Incomplete'
// Don't redeclare the variables!

var obj8 = { };

// do not modify the following code for problem 8, but examine it 
// in order to under how it works. make sure you understand the control flow

var successMsg = undefined;
var failureMsg = undefined;

function succeed(callbacks) {
  var succeeded = true;
  if (succeeded && callbacks.completed) {
    callbacks.completed();
  }
}

function fail(callbacks) {
  var succeeded = false;
  if (!succeeded && callbacks.failed) {
    callbacks.failed();
  }
}

succeed(obj8);
fail(obj8)


// 9.
// Create an object with single function `quadruple` which takes a single numeric
// paramater and returns its value multipled by 4

var obj9 = { };













// ====================================================
// tests


if (obj1.name === 'Michael') {
  console.log('test 1 passed');
} else {
  console.log('test 1 failed *')
}

if (obj2.name === 'James' && obj2.age === 48) {
  console.log('test 2 passed');
} else {
  console.log('test 2 failed *')
}

if (obj3['happy-days'] === true) {
  console.log('test 3 passed');
} else {
  console.log('test 3 failed *')
}

if (obj4.music === 'Techno' ) {
  console.log('test 4 passed');
} else {
  console.log('test 4 failed *')
}

if (obj5.name && obj5.name.first === 'Ada' && obj5.name.last === 'Lovelace') {
  console.log('test 5 passed');
} else {
  console.log('test 5 failed *')
}

if (obj6.name && obj6.name.first === 'Susan' && obj6.name.last === 'Kare' &&
  obj6.job && obj6.job.title === 'Creative Director' && obj6.job.company === 'NeXT' ) {
  console.log('test 6 passed');
} else {
  console.log('test 6 failed *')
}

if (obj7.meaningOfLife && obj7.meaningOfLife() === 42) {
  console.log('test 7 passed');
} else {
  console.log('test 7 failed *')
}

if (successMsg === 'Completed' && failureMsg === 'Failed') {
  console.log('test 8 passed');
} else {
  console.log('test 8 failed *')
}

if (obj9.quadruple && obj9.quadruple(1) === 4 && obj9.quadruple(2) == 8 ) {
  console.log('test 9 passed');
} else {
  console.log('test 9 failed *')
}
