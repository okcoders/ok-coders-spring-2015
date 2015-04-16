OK Coders: Lesson 8, Functional Programming
===================================

Javascript offers advanced capabilities with its functional design. We know that functions encapsulate re-usable blocks of code and accept parameters which so far have been simple values like numbers or strings. What if we want to encapsulate re-usable blocks of code but have more flexibility than simply providing a value or two as a parameter. What if we want the parameter itself to perform some kind of additional computation in the context of the original function?

Javascript offers that with higher-order functions, a feature of what is known as *functional programming*. It turns out that we can pass functions into functions or return functions from functions, and this allows us to write compact, portable and extremely powerful code. Higher order functions are used everywhere in javascript and especially in node and common front-end libraries like jQuery. They often take the form of of callbacks.


## References

[Eloquent JavaScript](http://eloquentjavascript.net/chapter6.html)

Chapter 6 in Eloquent JavaScript covers Functional Programming. **Must Read**

[Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures)

The Mozilla Developer Network includes a section on closures.

## Functions as Variables

So far we've been defining functions by using the `function` keyword at the beginning of a line, such as:

```js
function foo() {
	// ...
}
```
	
But we've learned that functions are values, which means we can assign them to variables. Declare a function and assign it to a variable:

```js
var bar = function() {
	// ...
}
```
	
Both ways of defining a function are valid. The first way gaurantees the function `foo` will be available anywhere inside a javascript program because it's added to the global scope. This is called *hoisting*. The second way makes `bar` available only to code that comes after it.

Call both functions the same way with parentheses after their names:

```js
foo();
	
bar();
```

## Functions as Arguments

We've also learned that a function can have parameters. That is, we can pass values and more complex data structures like objects and arrays to functions. The parameters are named, and the names act like local variables inside the function. Declare a function with a parameter like:

```js
function baz(param) {
	// do something with param
}
```
	
Similary we can assign a function that takes a parameter to a variable:

```js
var qux = function(param) {
	// do something with param
}
```
	
When we call a function that takes a parameters we provide arguments. Arguments are values or expressions that resolve to values, such as a variable name, or even calling another function that returns a value:

```js
baz(42);
	
quz("hello" + "world");
```

Functions *are values*. Functions can take values as inputs. That means we can write functions that take functions as inputs. A function that takes a function as an input is called a *higher order function*. In mathematics these are called *operators*. Define a higher order function like you would any other:

```js
function higherOrder(param) {
	// do something with param, like call it!
}
```
	
Now `param` is a function, and if we want to use it inside `higherOrder`, we must call it:

```js
function higherOrder(param) {
	param();
}
```
	
A well known higher-order function that's built into javascript is the `setTimeout` function. `setTimeout` takes a function and a delay in milliseconds as its two paramaters and schedules the function to be called after the delay time has passed. In the meantime the rest of the program continues executing. Functions like this are commonly called *timers*.

Here's an example:

```js
var callAfterDelay = function() {
	console.log("Got called after some delay");
}
	
setTimeout(callAfterDelay, 2000);
console.log("Keep on doing stuff");
```
	
After 2000 milliseconds (2 seconds) `setTimeout` will execute  `callAfterDelay`. In the meantime the program keeps running, which means that `"Keep on doing stuff"` will appear in the console before `"Got called after some delay"`.

Notice that we do not call the function `callAfterDelay` when we pass it to `setTimeout`. If we did that, the `callAfterDelay` would first be evaluated and whatever it returned would be passed to `setTimeout`, in this case `undefined`. Instead we just pass the name of the function. That is how all higher order functions work. They take the name of some function as an argument which they will then call later on.

Timeouts are another way to alter the control flow of the program, and we'll see that higher order functions often operate *asynchronously* in javascript like `setTimeout` does here, whereby the rest of the program continues executing while the system takes care of some other business, like setting up a timer.

## Callback Functions

Functional parameters often function as *callbacks* because the original function *calls back to* it when finished with some other operation. This is a common design pattern in javascript that we will see often in node.

Callbacks are used with code that may take a long time to complete in the background, similar to `setTimeout`, which may way seconds before completing the timer.

We use callbacks with code like this rather than *hardcoding* the function that is called because it allows us to use the long running process from multiple places in the code and decide on a case-by-case basis what to do when the process is finished. 

*A higher order function is re-usable.*

Let's see an entire example. Consider the following code:

```js
function longProcess(callback) {
	// perform long operation...
	// notifify the caller when we're finished
	callback();
}
	
// ... meanwhile, in some other part of the program ...
	
var myCallback = function() {
	console.log("Got called in the callback");
}
	
longProcess(myCallback);
```

`longProcess` is a function that performs some complex operation and calls a function when it is finished. It needs to know what function to call, so it accepts a single paramter, `callback`, which must be a function, and calls it when the operation is complete.

In some distant other part of the program we want to run the long process, but we also want to be notified when that process is finished, maybe so we can inform the user. That's exactly what `myCallback` does. `myCallback` is a function created with a variable assignment that logs a message to the console.

Consequently, we pass `myCallback` to `longProcess`. The `callback` param is assigned to the function `myCallback`, which means that the call to `callback()` inside the long process ends up being `myCallback`.

Later on somewhere else in the code we could define a second callback and pass it to the `longProcess` function, and a third callback, and a fourth, and so on, each doing something different when the long process is finished.

## Callback Parameters

A callback is a function. Functions can take parameters. So a callback can have parameters. In fact it's common for a callback to have two parameters, one an `error` or `err` parameter that is set if something went wrong in the long process, and the other a `results` parameter that some long process will send back to the callback for its use when finished.

Imagine a function that accesses a database but does so *in the background*. Like `setTimeout`, this function allows the rest of your program to continue executing while it does its work. The rest of your program needs the data from that database, so it calls this function and passes it a callback.

But to get the data back to your program, the callback takes an `error` parameter and a `results` parameter. When the access function is finished, it calls the callback and passes it any error that occurred and the results of the operation. 

Let's see an example:

```js
function longProcess(callback) {
	// perform long operation and notifify the caller when we're finished ...
	var results = [ ... ];
	var err = null;
	callback(err, results);
}I
	
// ... meanwhile, in some other part of the program ...
	
var myCallback = function(err, results) {
	console.log("Got called in the callback");
	if (err) {
		// handle error
	} else {
		// do something with results
	}
}
	
longProcess(myCallback);
```

`longProcess` still expects a function for its callback parameter, but now *that* callback function must itself take two parameters. Consequently `myCallback` is defined to accept error and results. It checks if any error occurred, and if it did not, it uses the results.

At this point the syntax may look confusing. Our code is certainly becoming more complex. Anytime you see code that you don't understand, break it down into the component parts that you do understand and then piece it back together. In the end, all we really have are normal functions being used as parameters and called by other functions.

## Anonymous Functions

A function is a value. Variables have values, but values can also exist independently of any variable. So the variable `name` may hold the *string* "OK Coders" and the variable `callback` may hold the function `function() { ... }`, but what's important to understand is that a variable is not its name and function is not its name. We can consider each separately from its identifier.

This is straightforward with simple variables and values. We know that we can use `42` in an expression or a variable whose value is currently `42`. In both instances below the number `52` is logged to the console.

```js
console.log( 42 + 10 );
	
var meaningOfLife = 42;
console.log( meaningOfLife + 10 );
```

In fact, it's redundant to define a variable when it will only be used in a single expression or statement. In the above example, there's no reason to define `meaningOfLife` and give it the value `42`. We can just use the value `42` directly.

*We can do the same with functions.*

Consider the callback example we've been using so far. We define a variable named `myCallback` and assign it a function, then we use that variable as the argument to a long running process:

```js
var myCallback = function() {
	console.log("Got called in the callback");
}
	
longProcess(myCallback);
```

But we only ever use that callback one time in our entire program when we call `longProcess`. Let's get rid of the variable and treat it like a simple value instead. Ignore the variable assignment and use only the part that actually is the function itself:

```js
function() {
	console.log("Got called in the callback");
}
```

Replace `myCallback` in the call to `longProcess(myCallback)` with that, which is really what `myCallback` represents:

```js
longProcess(function() {
	console.log("Got called in the callback");
});
```
	
Now we have a function that we use only once and exist only to be sent to another function as its parameter. We can only use this function once because it doens't have a name. We have no way of referring to this function otherwise. And it exists only as long as `longProcess` is executing. *It exists only in that function's scope*, as one of its named parameters.

Such functions are called *anonymous, inline functions*. Anonymous because they have no name and inline because they are declared as part of another expression and not on their own lines of code. 

Here is their formal syntax. FunctionCall must be some other function that has already been defined:

```js
FunctionCall( function() {
 	Statements
});
```
	
Notice that we must still use the `function()` syntax because we really are declaring a function even if we aren't giving it a name. Then, because it's a function like any other, surround its code with curly braces. Be careful with the final bit of syntax, which must close the anonymous function and close the call to the original function before ending the entire statement `});`

How would you use an anonymous function with `setTimeout`? 

```js
setTimeout(function() {
	console.log("Got called after some delay");
}, 2000);
```
	
This example is a bit more interesting because `setTimeout` takes two parameters. The first is the callback function, but then after closing that function with a curly brace `}` the second delay parameter is necessary, and thus the `, 2000` before closing the call to `setTimeout`.

## Returning Functions

Functions are values. A function can return a value. This means that a function can return a function:

```js
function higherOrder() {
	return function() {
		console.log("I'm on the inside!");
	};
}
```
	
We now have a complete definition for a higher order function. A higher order function is one which takes a function as a parameter or which returns a function.

Call the function above and assign its result to a variable:

```js
var result = higherOrder();
```
	
What is `result`? It is a function, namely, the function that simply calls `console.log(...)`. If we want to use it, we must call it:

```js
result();
```
	
Altogether the code looks like:

```js
function higherOrder() {
	return function() {
		console.log("I'm on the inside!");
	};
}
	
var result = higherOrder();
result();
```
	
Or for a strange bit of syntax you could skip the variable assignment and call the result of calling `higherOrder()` immediately:

```js
higherOrder()();
```

Why would you want to return a function? Or put another way, what is `higherOrder`? A function that returns a function is a function factory. It's a function that makes functions. We can pass parameters to `higherOrder` that the returned function will make use of to create custom functions. The canonical example creates functions that raise a variable to a power:

```js
function makePower(power) {
	return function(x) {
		return Math.pow(x, power);
	}
}
```
	
`makePower` takes a single parameter, `power`, which is the power we want to raise a number to, like 4 *squared* is 16 or 4 *cubed* is 64. It *returns* a function that does just that with whatever number we pass to the returned function. Here's how you might use it:

```js
var square = makePower(2);
var cube = makePower(3);
	
square(4);
cube(4);
```

This seems like a lot of effort for a function that could have just take two parameters, one the number we want to raise to a power and the other the power itself, which is in fact what the built-in `Math.pow` function does:
	
```js
/* squre the number 4 */
Math.pow(4, 2);
	
/* cube the number 4 */
Math.pow(4, 3);
```

Ours is a trivial example, but there are some powerful uses for returning functions in other contexts, although you will see it less often than functions that take functions as parameters.

Returning functions like this so that you build up many functions out of single parameters rather than one function that takes many parameters is known as *currying*.

## Closures: Scope Revisited

Notice what happend in the `makePower` function with the `power` parameter:

```js
function makePower(power) {
	return function(x) {
		return Math.pow(x, power);
	}
}
```
	
The inner function that is returned still makes use of `power` even after `makePower` has finished executing. At first glance this should violate javascript's scoping rules. The parameter `power` should only be available while the function `makePower` is executing, not when we call that inner function *later on in our code* with `square(4)` or `cube(4)`.

Functions in javascript are *closures*. This is a technical term that describes how a function handles the scope in which it is defined. Functions *close around* the scope in which they are defined, grab a hold of it, and carry it with them.

When the inner function is returned from `makePower` it continues to hold onto the `power` parameter because it is available in its scope. It will hold onto that parameter indefinitely, as well as any other global or local variables that were available when it was defined and to which it refers. This is why `power` continues to be available even after `makePower` has finished executing. 

Closures are a powerful concept in computing and allow programmers to create complex but subtle higher order functions.

## Self-Executing Functions

There is one other bit of syntax you should be aware of although it doesn't have to do with functional programming or higher order functions. 

Javascript supports *self-executing functions*. Normally you declare a function and give it a name so you can use it again later. Self-executing functions, on the other hand, are functions that call themselves at the same time they are defined, and they are often anonymous (they have no name).

Define a self-executing function as you would any other anonymous function, but then surround it with parenthesis and immediately call it like you would a normal function:

```js
(function() {
	console.log("this function executes right away");
})();
```

The tell-tale sign of a self-executing function is the ending syntax: `})();` that in one sweep closes the function definition, closes the very first opening parenthesis before the function definition, and calls the function before ending the statement.

A self-executing function can take parameters. Define them in the parameters list and pass in arguments like you normally would when you call it:

```js
(function(name) {
	console.log("Hello " + name);
})("OK Coders");
```

Self-executing functions are used to immedidately execute blocks of code  with many locally defined variables without adding those variables to the global scope. They don't want to *pollute* the *global namespace* with them.

## Two Higher Order Functions

As an exercise let's define two of our own higher order functions.

**forEach**

Developers have a problem. Writing `for` loops is annoying:
	
```js
var array = [...];
for(var i = 0; i < array.length; i++) {
	// do something with array[i]
}
```
	
It's a lot of syntax to loop over an array, and it needs to be done fairly often. What if we could move the for loop into a function? That's what functions are for, after all, encapsulating reusable blocks of code.

But a for loop has an associated block of code itself that is called through each iteration of the for loop, and that block of code needs access to the current item being looped over, or the index it should access in the array. Moreover, what that code does may depend on the item currently being accessed.

If we want to move the for loop to a function, then, we'll need a function that takes an array and loops over it but also takes a block of code that it will call for each iteration of the loop and to which it provides the currently iterated item. Well, we can encapsulate blocks of code in functions, and functions can take parameters. It sounds like we need a higher order function!

Let's build it up step by step. First we need our function. Call it `forEach`:

```js
function forEach() {
	
}
```
	
The function needs to take an array that it will loop over and a block of code to execute for each iteration of the loop. Define those parameters:

```js
function forEach(array, callback) {
	
}
```
	
If nothing else the function must loop over the array. Add a `for` loop that iterates through each item in `array` one at a time:

```js
function forEach(array, callback) {
	for (var i = 0; i < array.length; i++) {
	
	}
}
```
	
The function needs to call the `callback` each time through the loop, so add that:

```js
function forEach(array, callback) {
	for (var i = 0; i < array.length; i++) {
		callback();
	}
}
```

But the function needs to provide the currently iterated item in the array to the callback so that the callback can do something with it, like in a normal for loop. Grab the current item and send it to the callback:

```js
function forEach(array, callback) {
	for (var i = 0; i < array.length; i++) {
		var item = array[i];
		callback(item);
	}
}
```
	
Finally, we're only using `item` to hold a value that is immediately used in the following expression, so let's just use the value instead, which is acquired with `array[i]`:

```js
function forEach(array, callback) {
	for (var i = 0; i < array.length; i++) {
		callback(array[i]);
	}
}
```
	
That's it! We're ready to use the function. Call `forEach` with an array and a function callback parameter that itself takes a single parameter which will be the currently iterated item:

```js
var array = [0,1,2,3,4,5,6,7,8,9];

var callback = function(item) {
	// do something with item ...
	console.log(item);
}
	
forEach(array, callback);
```
	
As we've seen it's unnecessary to define a variable or function that you will only use once immediately. So instead of giving the callback function a name, use it directly in the call to `forEach` as an anonymous, inline function:

```js
var array = [0,1,2,3,4,5,6,7,8,9];

forEach(array, function(item) {
	console.log(item);
});
```

Isn't that much nicer than actually writing a `for` loop?

**map**

A common need when working with data is to transform an array into another array. This is called *mapping* the data in the array.

For example if I have an array of numbers that represent ages and I want to know how old everyone will be in a year, I must loop over that array and add 1 to each item in it. Probably I'll want to store that result in an array of its own and use the new array in my program:

```js
var ages = [45, 32, 13, 26];
var nextyear = [];
	
for (var i = 0; i < ages.legnth; i++) {
	nextyear[i] = ages[i] + 1;
}
	
// now do something with nextyear
```
	
A more complex transformation might loop over an array of objects and pull out a single property from each one, storing all of them in its own array. For example imagine an array of people and I want to grab the first name of each person:

```js
var people = [
	{
		firstName: "OK",
		lastName: "Coders",
		age: 1,
		city: "OKC"
	},
	{
		firstName: "Philip",
		lastName: "Dow",
		age: 32,
		city: "Norman"
	}
];

var firstNames = [];
	
for (var i = 0; i < people.length; i++) {
	firstNames[i] = people[i].firstName;
}
	
// do something with firstNames
```

Notice the similiarites between these operations. We have an array of data and we end up with a new array of data. We loop over every item in the first array, but what we do with each item is different. The block of code in the loop is case specific. How could we put what is similar in a re-usable function but keep what is case-specific? With a higher order function.

Let's create a `map` function. We know it will be similar to the `forEach` function in many respects. It takes an array, it loops over that array, and it will call a block of code for each item in the array:

```js
function map(array, callback) {
	for (var i = 0; i < array.length; i++) {
		callback(array[i]);
	}
}
```

But it also needs to build up a new array of items and return that array when finished:

```js
function map(array, callback) {
	var newarray = [];
	for (var i = 0; i < array.length; i++) {
		callback(array[i]);
	}
	return newarray;
}
```

How will it get the transformed data into the new array? Let's require the `callback` to return the transformed data, then we can just add it to the new array:

```js
function map(array, callback) {
	var newarray = [];
	for (var i = 0; i < array.length; i++) {
		var newitem = callback(array[i]);
		newarray[i] = newitem;
	}
	return newarray;
}
```
	
We have a redundant variable again, though. `newitem` is only used to hold the result of calling `callback`, so let's just use that result immediately:

```js
function map(array, callback) {
	var newarray = [];
	for (var i = 0; i < array.length; i++) {
		newarray[i] = callback(array[i]);
	}
	return newarray;
}
```
	
How do we use `map`? Call it with an array and a callback that takes a single item as a parameter like `forEach`:

```js
map(people, function(item) {
	// do something with item
)};
```
	
What should we do with `item`? We need to transform it. In our example we are extracting the `firstName` property from it. But then we also need to *return it from the callback*, because the `map` function expects to use the value of calling the callback:

```js
map(people, function(item) {
	return item.firstName;
)};
```
	
Be careful with this return statement. We are returning from the anonymous function, not from map itself.

Finally we need to collect the values that map produces. Remember, map returns an array itself. Define a variable and assign the result of calling map to it:

```js
var firstNames = map(people, function(item) {
	return item.firstName;
)};
```
	
And that's it! You're now mapping data like a boss. Here's the entire code block:

```js
function map(array, callback) {
	var newarray = [];
	for (var i = 0; i < array.length; i++) {
		newarray[i] = callback(array[i]);
	}
	return newarray;
}
	
var people = [
	{
		firstName: "OK",
		lastName: "Coders",
		age: 1,
		city: "OKC"
	},
	{
		firstName: "Philip",
		lastName: "Dow",
		age: 32,
		city: "Norman"
	}
];
	
var firstNames = map(people, function(item) {
	return item.firstName;
)};

// do something with firstNames ...
	
console.log(firstNames);
```