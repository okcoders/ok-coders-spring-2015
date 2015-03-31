JavaScript: Functions
====

The most important way to change the control flow of a program is with functions. Functions are reusable blocks of code. Defining a function isolates part of a program from the rest of it and makes it possible to execute that part whenever you want.

In many ways functions work like functions in math such as `f(x)`. They can take an input and transform it to produce an output. Functions can also have *side effects*, where they perform some other action besides transforming an input, and they do not have to take any input at all. A function can just group code and give it a name.

## References

[Eloquent JavaScript: Functions](http://eloquentjavascript.net/chapter3.html)

Chapter 3 of Eloquent JavaScript covers functions. **Must read**

[Mozilla JavaScript Guide: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

Functions guide at the Mozilla Developers Network

[Code Academy JavaScript Track](http://www.codecademy.com/tracks/javascript)

Tutorials and practice exercises on JavaScript. See epsecially the sections on fucntions and control flow.

## Declaring Functions

Declaring a function, often called *defining* a function, sets aside a block of code in your program and gives that block a name. Start the node REPL (read-eval-print-loop) by typing `node` at the terminal and type in the followign code:

	> function foo() {
	... console.log("called my function");
	... }
	undefined
	>
	
Pay attention to the use of parenthesis `()` after the name of the function and curly braces `{ ... }` around the block of code. Also notice how node prints out the ellipses `...` after the opening curly braces. This is how node indicates it needs more input before it can evaluate your instructions.

When you begin a line with the *keyword* `function` in javascript, you tell node that what comes next is a function definition. Give the function a name, in this example `foo` and then follow it with curly braces containing a block of code.

The general syntax for defining a function looks like:

	function FunctionName() {
		Statements
	}

Notice that the result of defining `foo` is `undefined` and, importantly, that node does not print anything to the console. We've already seen the use of `console.log()` to print to the terminal. This works in the node REPL too. Confirm this:

	> console.log("normal old console.log");
	normal old console.log
	undefined

Node executes the line of code for `console.log()` and does in fact print a string to the terminal. It then shows us the result of evaluating this line of code, which is `undefined`.

But when you define a function its block of code is not executed. Instead, the block of code is set aside and made available to the rest of your program under the name you provided, in this case `foo`.

In a sense, javascript treats this name like a variable name. The technical term for this is *identifier*. Both variable names and function names are identifiers. Confirm this by typing the name of the function into the REPL:

	> foo
	[Function: foo]
	
As with numbers, strings and booleans by themselves, a function name by itself simply evaluates to that function. Node is telling us here that `foo` is just a `function` whose name is `foo`.

Significantly, node is telling us that `foo` is some bit of data whose type is `function`, but more on this later.

## Calling Functions

A function isn't much good unless you can use it. Functions are different from variables. A function's block of code won't be executed unless you *call* the function. Call a function in javascript by providing the name and following it with parenthesis:

	> foo()
	called my function
	undefined

We can see this time that node in fact called the function foo(). The formal syntax for calling a function in javascript is:

	FunctionName()
	
Calling a function executes its block of code. Control of the program jumps to the first line of the function. Node executes its code, and when there is nothing left in the function to execute, control returns back to the previous location in the program.

Let's see a more complex example that is too large for the REPL. Quit node with control-C `^C` and create a new empty file *test.js*. add the following code:

	function foo() {
		console.log("calling foo");
	}
	
	console.log("foo has been defined but not called");
	foo();
	console.log("after foo has been called");
	
Save the file, `cd` into the correct directory and run the program with `node test.js`. Note the order in which text is printed to the console:

	$node test.js
	foo has been defined but not called
	calling foo
	after foo has been called
		
Javascript sees `foo` and defines it. Then javascript begins executing the program. The first `console.log` prints out its message, then `foo` is called and its `console.log` is executed, and then the program resumes where it left off and goes to the next line, which is the last `console.log`.

Although this is a simple example we can see how the program jumps from one part of the code to another as the control flow changes.

## When to Define a Function

Try moving the function definition in *test.js* to the bottom of the file, then save and run the program:
	
	console.log("foo has been defined but not called");
	foo();
	console.log("after foo has been called");
	
	function foo() {
		console.log("calling foo");
	}
	
The program works the same way. How is this possible? Considering that node executes a program linearly from top to bottom until the control flow is explicitly changed, how can we call a function that hasn't been defined yet?

Node looks at the javascript program twice. It makes two *passes* over the code. The first pass finds all the function definitions and sets their functions up for use in the program. Only on the second pass does node actually begin executing the code at the top.

This means that you can define functions before or after calling them and node will know what to do. There are some special considerations that we'll discuss in the chapter on functional programming.

## Defining Many Functions

You can define as many functions as you like, and you can call them from anywhere in a program, including from inside other functions. Define two functions and have one call the other:

	function foo() {
		console.log("calling foo");
		bar();
	}
	
	function bar() {
		console.log("calling bar");
	}
	
	foo();

Run the program and you see:

	$ node test.js
	calling foo
	calling bar

We've defined two functions, `foo` and `bar` and then called `foo` which prints a message to the console before calling `bar`.

Use functions in other statements as well, such as `if else` statements:
	
	var age = 15;

	function printOld() {
		console.log("you're old!");
	}
	
	function printYoung() {
		console.log("you're young!");
	}
	
	if ( age <= 21 ) {
		printOld();
	} else {
		printYoung();
	}

With functions and statements like `if else` and loops, we can begin to see how a program is built up to perform complex computations.

## Returning a Value from a Function

Return to the REPL by starting node from the command line:

	$ node
	>

And define the function `noValue`:

	> function noValue() {
	... }
	undefined

Leave it as an empty function so that it doesn't do anything. Call the function:

	> noValue()
	undefined

The result is `undefined`. On the one hand, functions are more than expressions. They can print output to the terminal, make connections to servers, read a file from the hard drive, and so on. These are their *side effects*. But like expressions, functions always evaluate to some value when they are called. That is, they have a result.

When you call a function, the function has the option of *returning* a value. This is a technical term and is just another way of saying what the function's result is. By default the result of calling a function is `undefined`, but with the `return` keyword, a function can actually evaluate to something when called.

**Return a value**

Define another function `hasValue()` that returns the number 42:

	> function hasValue() {
	... return 42;
	... }
	undefined
	
Of course when the function is declared, it doesn't evaluate to anything, so node prints out `undefined`, but now when you call the function its result will be `42`:

	> hasValue()
	42

Node executes the function's code when the function is called and wherever it sees a `return` statement, it evalutes the function to that value.

A function can have more than one return statement. It is common to return a different value from a function depending on some condition. Here is a trivial example:

	> function someValue() {
	... if (true) {
	..... return "true for sure";
	..... }
	... else {
	..... return "nope, false";
	..... }
	... }
	undefined
	
When you call this function it will return "true for sure" because the `true` condition is met in the `if else` statement:

	> someValue();
	'true for sure'

**Stop executing**

The `return` statement does something else important. As soon as a `return` statement is encountered, the function stops executing and control is *returned* back to the point in the program before the function was called. Try this:

	> function returnEarly() {
	... return;
	... console.log("never make it here");
	... }
	undefined
	
Call the function. "never make it here" is not printed to the console because the function returns before reaching that point.

	> returnEarly()
	undefined
	
Notice that we did not provide a value to the `return` statement and the function evaluated to `undefined`. This is completely acceptable, and in fact `return` is commonly used only to exit a function and not to return the result of some computation.

Returning from a function is an important concept in programming. Returning does two things: it allows a function to return a result and it stops executing code in the function so that control is returned to the  point in the program where the function was previously called.

## Using the Result of a Function

Because calling a function results in a value, a function call can be used in expressions and more complex statements. Use it anywhere you would normally use a value, but be sure to call the function with the  parenthesis `()` and not just name it.

For example, define a function that returns a value:

	> function meaningOfLife() {
	... return 42;
	... }
	undefined

And use it in an expression:

	> meaningOfLife() + 10
	52

This is almost like we have a variable `meaningOfLife` whose value was `42`, except we can do a lot more with a function thanks to the block of code associated with it.

Use a function in more complex statements. Because it is an expression, it can be used in an `if` statement for example:

	> if ( meaningOfLife() < 100 ) {
	... console.log("not too big anyway");
	... }
	not too big anyway
	undefined
	
We saw last chapter that a variable can be used anywhere a value can. Similarly, use functions anywhere you use a value, just be sure you are calling the function and that it returns what you expect it to!

## Parameters: Passing a Value to a Function

We've seen that a function can return an output with the `return` statement. A function can also accept inputs. These are called *parameters*. When you define a function, include the parameters in the parenthesis after the function's name:

	function FunctionName( ParameterList ) {
		Statements
	}
	
The parameter list is a comma separated list of names that will be treated like variables inside the function. Define a function that takes a single number and adds ten to it. Put it in a text file and call it a couple of times:

	function addTen(x) {
		return x + 10;
	}
	
	console.log( addTen(12) );
	console.log( addTen(41) );

The function has a single paramater named `x` which is available as a variable inside the function's code block. All the function does is return that number plus ten.

Call the function as you normally would but *pass an argument* to it in the parenthesis, namely, the number you want to add ten to. *Parameter* and *argument* are technical terms. When you define a function, you define its parameters. When you call it, you pass arguments to it.

Because the function returns a value, it can be used in an expression, which itself is used as the argument to the `console.log` function. Let's break this down.

Remember that node excecutes code from the inside out with parenthesis grouping items. Start with the most deeply nested parenthesis and evaluate that expression, replace it with its result, and use that result in the next expression, until you reach the outermost expression or statement.

Here, `12` evalutes to 12 which is used in the function call to `addTen`. Inside add ten, the parameter `x` takes on the argument's value of `12`, which is used in the return statement so that the function call results in, or evaluates to `32`. 32 is then used in the function call to `console.log`, so that the result of the statement is to print out some number with ten added to it.

A function can take more than one argument. Simply define it with more than one paramater. Define an add function:

	function add(x, y) {
		return x + y;
	}
	
	console.log( add(10, 11) );
	console.log( add(-1, 4) );

This is a trivial example but demonstrates how to define a function with more than one parameter and how to call it with more than one argument. Use commas.

Of course functions can take paramters of any type. Unlike some programming languages you do not need to specify the type in advance. This can lead to curious results:

	function sayHelloTo(name) {
		console.log("hello " + name);
	}
	
	sayHelloTo("Amanda");
	sayHelloTo(42);
	
The output is:
	
	$ node test.js
	hello Amanda
	hello 42
	
The function's parameter doesn't care what kind of data `name` is, but you have to be careful because the function's code block might. If you passed a string to the `add` function above, you'd get back *Not a Number*, `NaN`.

**Always be aware of what type of data a function expects.**

We'll see that javascript programmers often write functions so that they accept more than one type of data in a single paramater. The function does different things depending on the type of data it is called with. It does one thing if you call it with a number but another thing if you call it with a string, for example.

**Pure functions**

When a function takes parameters and returns a value that depends on those parameters, it behaves like a mathematical function. Consider a function in algebra like:

	f(x) = 4x + x + 1

We could write this in javascript:

	function f(x) {
		return 4*x + x + 1;
	}

Functions like this are *pure functions*. Strictly speaking, two condition must be met to say the function behaves "mathematically" or is "pure". 

First the function must have no *side effects*. That means it can't do anything but take input and return output. No printing to the screen, no network connections, nothing else.

Second, as in all mathematical functions, the function must return the same value any time it receives identical input. `4x+x+1` always returns `6` if you give it `1` and always returns `11` if you give it `2`.

Most javascript functions you use and write won't be pure. Side effects are necessary. It is important to be aware of what those side effects are so that nothing unexpected occurs when you call a function.

## Scope: Using Variables Inside Functions

Scope is an essential concept in programming languages. Scope defines when an identifier is valid. Recall that an identifier is the name of a variable or the name of a function. Scope limits when those names can be used.

Consider the function paramater like `name` in our earlier example:

	function sayHelloTo(name) {
		console.log("hello " + name);
	}
	
Because it is a paramater, `name` is scoped to the `sayHelloTo` function. Its use is limited to that function. Try to refer to `name` anywhere else in the program and you receive a:

	ReferenceError: name is not defined

`name` is like a variable that can only be used inside the function. What if you have a second function with its own `name` paramater:

	function sayHelloTo(name) {
		console.log("hello " + name);
	}
	
	function sayGoodbyeTo(name) {
		console.log("goodbye " + name);
	}

Here we have two instances of name, but in each case, because `name` is paramater to a function, it is valid only inside that function. And because it is valid only inside its function, the identifier `name` can be used more than once. Try to refer to it outside either function and a `ReferenceError` occurs.

Another way of saying this is that parameters are *local* to the function in which they appear.

Functions may also expicitly declare variables. A function is just a collection of statements, and a variable declaration is a statement. Declare a variable and use it inside a function like you normally would:

	function sayHelloTo(name) {
		var greeting = "willkommen ";
		console.log(greeting + name);
	}
	
Like paramaters, variables declared inside a function are local to that function. They are only valid inside it. Use `greeting` outside the function and an error occurs:

	ReferenceError: greeting is not defined
	
## Global Scope

In javascript, global variables are those declared outside any function, at the *top level scope*, and they are available to all functions:

	var greeting = "willkommen ";

	function sayHelloTo(name) {
		console.log(greeting + name);
	}
	
	function reallySayHelloTo(name) {
		console.log(greeting + ", " + greeting + name);
	}

`greeting` is a global variable because it is declared outside any function. Consequently both functions may refer to it. We say that a function *captures the scope* in which it is declared, so that code in a function has access to both the global scope and its local scope.

What happens if you change the value of `greeting` before calling a function in which it is used:

	var greeting = "willkommen ";

	function sayHelloTo(name) {
		console.log(greeting + name);
	}
	
	greeting = "hello ";
	
	sayHelloTo("Philip");
	
Run the program and it produces the following output:

	node test.js
	hello Philip

Functions capture their scope but they capture their scope *by reference*. "By reference" means that identifiers such as variable and function names do not evaluate to their values when the function is defined. A function definition only holds on to a reference to the identifier, not its actual value. The function only sees its actual value when the function is called.

**Masking**

It becomes trickier when you have two identifiers (e.g. variables) with the same name both in scope simultaneously. What happens if you define `greeting` both globally and locally?

	var greeting = "willkommen ";
	
	function sayHelloTo(name) {
		var greeting = "hello ";
		console.log(greeting + name);
	}

In this case "hello" is used instead of "willkommen" in the `sayHelloTo` function. It is acceptable to define the same variable in more than one scope, for example globally and locally. The rule is that local scope always has priority over global scope. We say that the locally declared variable `greeting` *masks* or *hides* the global variable with the same name.

The same goes for paramater names. A paramater has precedence over a global variable with the same name.

Moreover, you could use the global variable `greeting` somewhere else and it would still have the same value of "willkommen":
	
	var greeting = "willkommen ";
	
	function sayHelloTo(name) {
		var greeting = "hello ";
		console.log(greeting + name);
	}
	
	sayHelloTo("Philip");
	console.log("But " + greeting + "is still willkommen");

This program prints out:

	$ node test.js
	hello Philip
	But willkommen is still willkommen

The variable assignment only affects the locally declared `greeting`, not the global one.

But be careful! What happens if you take away the `var` portion of the local variable declaration:

	var greeting = "willkommen ";

	function sayHelloTo(name) {
		greeting = "hello "; /* missing var for declaration */
		console.log(greeting + name);
	}
	
	sayHelloTo("Philip");
	console.log("But " + greeting + "is still willkommen");

Now you are not declaring a new variable `greeting` locally. You are assigning a new value to the global one and changing its value for the rest of the program:
	
	$ node test.js
	hello Philip
	But hello is still willkommen

Scope can be a difficult concept even though the rules are straightforward. Begin with global scope. Variables defined at the top level of a program as well as functions defined there all exist in the global scope and can be used from any part of a program.

Each function then has its own local scope where parameter names can be used and local variables can be defined. If a parameter or local variable has the same name as a global identifier, then the paramater or local variable has precedence inside the function. It *masks* the global name.

In practice you should write your programs so that this is not an issue. The use of global variables is strongly discouraged in modern programming because of the confusion and bugs they can cause. You may need them sometimes, but try to avoid global variables if you can.

<!---

MOVE TO FUNCTIONAL PROGRAMMING TOPIC OR OBJECTS

## Functions are Values

A function in javascript is just a piece of data, like any other piece of data such as a number or string. A function has a value, which *is* its block of code, and a type, which is `function`. Another way of saying this is that a function is a value, and its name is a variable that holds it.

We can make this more explicit. Because functions are values, we can assign them to variables.

...

-->

<!---

MOVE TO OBJECT ORIENTED PROGRAMMING

## Built-in Functions

--->

