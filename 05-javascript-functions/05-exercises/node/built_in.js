
/* 	
	Javascript provides a number of built-in functions.
 	We've already seen functions like console.log()

	Some functions are attached to bigger objects like the
	Math object. We've haven't learned about objects yet,
	but you can call a function on an object with the
	"dot notation", like 

	Math.pow(2,8); or 
	Math.exp(100);
	
	Other functions are attached to data, like a string or
	a number. In these cases, you can actually call a function
	on the data using the dot notation: 

	"hello".toUpperCase();

	If the string has been assigned to a variable, you can
	call the function on the variable like:
	
	var str = "hello";
	str.toUpperCase();

	Programming like this is called object-oriented programming,
 	which we'll learn more about in future lessons. For now just
 	know that you can call a function on an object like obj.function()

 	Let's get some practice with built in functions.
 	Run this file with $ node built_in.js

 	Work on the code until all the tests pass.
 */

// References:
// Math: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
// Strings: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

// The absolute value of a number is that number with the sign removed
// Use the Math.abs() function so that the following tests pass:

var x1 = 100;
var absX1 = x1;

var y1 = -100;
var absY1 = y1;

if (absX1 == 100) {
	console.log("Test 1 passed");
} else {
	console.log("Test 1 failed *");
}

if (absY1 == 100) {
	console.log("Test 2 passed");
} else {
	console.log("Test 2 failed *");
}

// The square root of a number x finds the number y such that y * y = x;
// Use the Math.sqrt() function so the following tests pass:

var x2 = 16;
var sqrtX2 = x2;

if (sqrtX2 == 4) {
	console.log("Test 3 passed");
} else {
	console.log("Test 3 failed *")
}

// The floor function returns the largest integer less than or equal to a number
// The ceil function returns the smallest integer greater than or equal to a number
// An integer is a whole number.

// Use the Math.floor() and Math.ceil() functions so the following tests pass:

var x3 = 3.14;
var floorX3 = x3;

var y3 = 3.14;
var ceilingY3 = y3;

if (floorX3 == 3) {
	console.log("Test 4 passed");
} else {
	console.log("Test 4 failed *");
}

if (ceilingY3 == 4) {
	console.log("Test 5 passed");
} else {
	console.log("Test 5 failed *");
}

// Strings have many funtions available on them.
// Functions on strings are different from the Math functions.
// Call the function directly on the string, for example:
// "Hello".charAt(0);

// charAt() returns the character at the specified index.
// A character is a single letter, number or other symbol in the string.
// The index is the character's position in the string, starting from 0.
// Use charAt() so that the following tests pass:

var x4 = "Hello World";
var charAtX4 = x4;

var y4 = "Munchen";
var charAtY4 = y4;

if (charAtX4 == 'W') {
	console.log("Test 6 passed");
} else {
	console.log("Test 6 failed *");
}

if (charAtY4 == 'u') {
	console.log("Test 7 passed");
} else {
	console.log("Test 7 failed *");
}

// Trimming a string means removing whitespace from its ends
// Whitespace is characters like spaces, tabs and new lines.
// Trimming doesn't require any parameters.
// Use the trim() function so that the following tests pass:

var x5 = "   Hello Space        ";
var trimX5 = x5;

if (trimX5 == "Hello Space") {
	console.log("Test 8 passed");
} else {
	console.log("Test 8 failed *");
}

// Extract part of a string with the substr() function.
// It takes two parameters, the start index and the length.
// Use substr() so that the following tests pass:

var x6 = "Hello World";
var substrX6 = x6;

if (substrX6 == "World") {
	console.log("Test 9 passed");
} else {
	console.log("Test 9 failed *");
}

// Find a string inside a string with the indexOf() function.
// Give the function a substring that appears inside the original string
// and it returns where the substring starts.
// Remember that indices in strings begin at 0.
// Use indexOf() so that the following tests pass:

var x7 = "Hello World";
var substring = "World";
var indexOfX7 = x7;

if (indexOfX7 == 6) {
	console.log("Test 10 passed");
} else {
	console.log("Test 10 failed *");
}
