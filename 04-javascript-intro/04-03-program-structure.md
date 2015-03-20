JavaScript: Program Structure
====

Programs begin with data. Data has a type and a value, such as the *string* "hello word" or the *number* 42. Data can be stored in variables. Data and variables are combined into expressions that often involve operations such as addition or comparison.

Expressions are made into, combined into and are a part of statements. Statements can be combined to form more complex statements. So that a statements can be as simple as an expression by itself or an `if then` statement that involves conditions and additional statements.

Together, statements are the instructions to a computer that make up a program. 

## Using Node for More Complex Programs

Our programs are about to become more complex. Instead of entering them into node one line at a time, let's put them into a javascript file and use node to execute the file.

`cd` into the directly where you'd like your javascript file to reside and create a new empty file with `touch`. Issue these commands at the bash prompt, not in node:

	$ mkdir javascripts
	$ cd javascripts/
	$ touch test.js
	$ ls
	test.js
	
Alternatively, create a new empty file in Sublime or another text editor and save it somewhere as *test.js*. You'll need to `cd` into the folder where you save it, however, because we must use the command line to execute the file with node.

Add some javascript to the file and save it, for example:
	
	/* comment */
	/* test.js : run this program with `node test.js` */
	
	var name = "philip";
	var age = 32;
	
	console.log("My name is " + name);
	console.log("My age is " + age);
	
We haven't talked about the *function* `console.log()` yet, but it outputs whatever is contained in the parenthesis to the terminal.

In the terminal, make sure you're in the right directory and execute the program:

	$ node test.js
	My name is philip
	My age is 32

Unlike the *read-eval-print-loop* we were using before, when it is given a file, node executes the file and then quits when it is finished, returning you to the bash prompt. Because we use the `console.log()` function, node outputs information to the terminal. Without the use of `console.log()`, we wouldn't see anything happen, even though the program is in fact executed.

Incidentally, we now understand what the command `npm start` does in our express web applications. Remember that `npm start` using the start script from the *Package.json* file, which says `node ./bin/www`. The script tells node to execute the javascript file named `www` in the folder `bin` relative to the current working directory `.`

## Control Flow

Normally statements will be *executed* linearly. That is, they will be exceuted in the order you give them to the computer. Javascript starts with the first statement you give it, executes it, and moves on to the next statement.

Type the following into test.js, save the file and execute it with node:

	var alarm = 730;
	var snooze = 9;
	
	var wakeup = alarm + snooze;
	var notice = "You woke up at " + wakeup;
	
	console.log(notice);

Then execute it:

	$ node test.js
	You woke up at 739	
	
Node executes the file from top to bottom, declaring and assigning a value to each variable in turn, *logging* the notice, and exiting when there is nothing left to do.

But a program does not have to execute linearly. A program can have *loops*. It can have *conditional* statements that cause one or the other bit of code to execute, depending on the condition. It can have collections of code called *functions* that might be executed many times or not at all.

## Conditional Statements

Condtional execution is an important concept in programming. Often you will want some code to execute only if a certain condition is met. For example, you might want the alarm to go off only if the current time is equal to the  time at which the alarm was set.

For conditional execution programs use *if statements*. An if statement takes a condition, which is a test in the form of an expression that always evaluates to a boolean value, so either true or false. If the test is true, then the next bit of code executes. If the test is false, the statement's code does not execute.

Add the following to test.js and save and run it. Make sure you've defined the `alarm` variable from above:

	var time = 700;
	
	if ( time >= alarm ) {
		console.log("The alarm is going off!");
	}

Notice that "The alarm is going off" does not appear. That's because in the  comparison test used in the if statement, `time`'s value is not greater than `alarm`'s value, so `time >= alarm` evalutes to `false`.

Change `time`s value to `800` and save and run the program:

	var time = 800;
	
	if ( time >= alarm ) {
		console.log("The alarm is going off!");
	}

Now the alarm's text appears because `time`'s value is in fact greater than  `alarm`'s.

Simple conditional execution like this always has the following syntax:

	if ( ConditionalExpression ) {
		Statements
	}
	
Note the use of the curly braces to enclose the following code `{...}`. Curly braces are optional if you only want to execute a single line of code when the condition is true, but as a matter of good form, always include them.

## If-Else Statements

The `if` example above only prints a notice to the console if the condition is met. What if you also want to print something when the condition is not met, if for example it isn't yet time for the alarm to go off. You might try adding code after the if statement:

	var alarm = 730;
	var time = 800;

	if ( time >= alarm ) {
		console.log("The alarm is going off!");
	}
	
	console.log("The alarm has not gone off yet");
	
In this case, both messages are printed when time >= alarm. Node executes the if statement, which checks its condition. The condition is true, so the first message is printed. And then node goes on to execute the next line, which prints the second message.

If you want to print the second message only when the condition is `false`, use an *if-else statement*:

	var alarm = 730;
	var time = 800;

	if ( time >= alarm ) {
		console.log("The alarm is going off!");
	} else {
		console.log("The alarm has not gone off yet");
	}
	
The program now executes exactly as you read it. If time is greater than or equal to alarm then print "The alarm is going off!", otherwise print "The alarm has not gone off yet". 

Change the value of time so that it is less than alarm's value. Now the condition *fails* or results in `false` and only the `else` part of the if-else statement is executed:

	var alarm = 730;
	var time = 600;

	if ( time >= alarm ) {
		console.log("The alarm is going off!");
	} else {
		console.log("The alarm has not gone off yet");
	}

Of course you'll need to save your code and run it with `node` from the command line to see the changes.

The syntax for an `if else` statement is:

	if ( ConditionalExpression ) {
		Statements
	} else {
		Statements
	}

Again, pay special attention to the use of parenthesis `(...)` for the condition and curly braces `{...}` for the statements.

## If-Else-If Statements

In some cases you want to control the execution of code based on multiple conditions. Do one thing if one condition is met, and do another thing if some other condition is met. In this case include the additional conditions with an `if else` statement:

	var alarm = 730;
	var time = 800;
	
	if ( time == alarm ) {
		console.log("The alarm is going off!");
	} else if ( time >= alarm + 100 ) {
		console.log("You're really late!");
	}

An `if else if` statement is like combining multiple `if` statements into a single block of code. Once again the code works like it reads. If the time is equal to alarm (and notice the use of the double equal sign `==` for equality comparison), then print "The alarm is going off!". *Otherwise, but only if* the time is greater than or equal to the alarm plus one hundred, print "You're really late!".

You can combine `if else` and `if else if` into a single, larger block:

	var alarm = 730;
	var time = 800;
	
	if ( time == alarm ) {
		console.log("The alarm is going off!");
	} else if ( time < alarm ) {
		console.log("Don't worry you still have time.");
	} else {
		console.log("Uh oh, it must be past time to wake up.")
	}
	
In this case, the first condition is checked. If it is true, "The alarm is going off!" is printed. If it is false, the next condition is checked. If it is true, "Don't worry you still have time." is printed. If it is also false, execute the last statement instead and print "Uh oh, it must be past time to wake up."

The syntax for an `if else if else` statement is:

	if ( ConditionalExpression ) {
		Statements
	} else if ( ConditionalExpression ) {
		Statements
	} else {
		Statements
	}

Note that you can have as many `else if` conditions as you like, but only one of the statement blocks will ever be executed. Think of it as a fork in the rode and you can only choose one path.

## Nesting Statements

All these `if` blocks are themselves statements. That is, the entire block of code, from the first `if` to the last curly braces `}` can be considered a single statement when taken as whole.

Because an if statement itself uses statements inside the curly braces after the conditional, the `{ Statements }` part, it is permissible and useful to place additional if statements inside an if statement. Consider:

	var alarm = 730;
	var time = 800;

	if ( time == alarm ) {
		console.log("The alarm is going off!");
	} else {				
		if (alarm > 1200) {
			console.log("You aren't waking up until after lunch anyway!");
		} else {
			console.log("At least you're waking up before noon");
		}
	}

Notice how we've nested another if statement inside the top level `else { ... }` block. This is how programs are composed. Statements are built up out of statements until you have a complex but entirely logical order of execution. The order may be directly from top to bottom, but more likely it involves a bit of skipping around.

## While Loops

Another way to change the control flow in a program is with a loop. There are a number of different kinds of loops in javascripts, including the estimable `for` loop, but here we'll look at the `while` loop.

A loop repeatedly executes a block of code until some *condition is met*, that is, until some conditional expression finally evaluates to true. Try the following in node:

	var alarm = 730;
	var time = 720;
	
	while (time < alarm) {
		console.log("It's not time to wake up yet " + time);
		time = time + 1;
	}
	
	console.log("Better wake up! The time is now " + time);

The `while` loop first checks its condition. Here it is checking if the `time` is less than `alarm`. If it is `true`, the loop executes the following block of code contained in curly braces `{...}`. That block of code prints out a message and increase the value of `time` by one. Then node goes back to the beginning of the while loop, checks the condition again, and if it is still `true` executes the block of code again. This repeats until the condition is `false`. Node then goes on to execute the next line of code.

The syntax for a while loop is:

	while ( ConditionalExpression ) {
		Statements
	}

There are a number of other kinds of loops and other kinds of ways to change the order of execution in a program. We'll discuss them in later classes. In the meantime, be sure to read and re-read the [second chapter of Eloquent JavaScript](http://eloquentjavascript.net/chapter2.html), making sure you understand what is going on with variables, values and control flow.