
// Instructions
// cd into the correct directory and run the file with `node arrays.js`
// You will see a number of failing tests.
// Complete each of the 7 problems by filling in the provided variables
// with the correct values to get the tests to pass.

// 1.
// Create an array with the following values in it in this order:
// 1, 1, 2, 3, 5, 8, 13, 21

var array1 = [ ];


// 2.
// Create an array with the following names in it in this order:
// "Philip"
// "Mary"
// "Shafi"
// "Marissa"

var array2 = [ ];


// 3.
// Update the following array so that the third item has a value of 100

var array3 = [1, 2, 3, 4, 5, 6, 7];


// 4.
// Create two dimenional array with three nested arrays each with three items
// Fill the arrays with the numbers 1 through 9, so 3 numbers in each nested array

var array4 = [ ];


// 5.
// Create an array with a single object in it. The object should represent a person
// with a `name` property set to "Luke", an `age` property set to 56, and a `sex`
// property set to 'M'

var array5 = [ ];


// 6.
// Write a for loop that adds up all the values in the following array and 
// assigns the result to the `total` variable.

var array6 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var total = 0;


// 7.
// Turn the following `csv` string into an array, separating the text where commas occur.
// Store the result in array7

var csv = 'Philip,Dow,32,Male,Oklahoma City,OK,Developer'
var array7 = [ ];

















// ==================================================
// tests

if ( array1[0] === 1 && array1[1] === 1 && array1[2] === 2 && array1[3] === 3 &&
   array1[4] === 5 && array1[5] === 8 && array1[6] === 13 && array1[7] === 21 ) {
  console.log("test 1 passed");
} else {
  console.log("test 1 failed *");
}

if ( array2[0] === "Philip" && array2[1] === "Mary" && array2[2] === "Shafi" && array2[3] === "Marissa" ) {
  console.log("test 2 passed");
} else {
  console.log("test 2 failed *");
}

if ( array3[2] === 100 ) {
  console.log("test 3 passed");
} else {
  console.log("test 3 failed *");
}

if ( array4[0] && array4[0][0] === 1 && array4[0][1] === 2 && array4[0][2] === 3 &&
   array4[1] && array4[1][0] === 4 && array4[1][1] === 5 && array4[1][2] === 6 &&
   array4[2] && array4[2][0] === 7 && array4[2][1] === 8 && array4[2][2] === 9 ) {
  console.log("test 4 passed");
} else {
  console.log("test 4 failed *");
}

if ( typeof array5[0] == 'object' &&  array5[0].name === 'Luke' &&  array5[0].age === 56 && array5[0].sex === 'M') {
  console.log("test 5 passed");
} else {
  console.log("test 5 failed *");
}

if ( total === 45 ) {
  console.log("test 6 passed");
} else {
  console.log("test 6 failed *");
}

if ( array7[0] === "Philip" && array7[1] === "Dow" && array7[2] === "32" && array7[3] === "Male" &&
   array7[4] === "Oklahoma City" && array7[5] === "OK" && array7[6] === "Developer" ) {
  console.log("test 7 passed");
} else {
  console.log("test 7 failed *");
}