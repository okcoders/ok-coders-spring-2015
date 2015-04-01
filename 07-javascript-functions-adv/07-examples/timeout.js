
// Use setTimeout with a function assigned to a variable

var callback1 = function() {
	console.log('3. Callback 1 called');
}

console.log("1. About to call setTimeout");
setTimeout(callback1, 2000);
console.log("2. Just called setTimeout");
console.log("");