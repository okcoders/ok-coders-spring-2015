## Variables and Values

Right now, when one of our expressions is evaluated we lose the result. Node prints it out to the console and then forgets about it. Normally we'll want to hold on to the result of an expression so we can use it later. To do this, we use *variables*.

Recall basic algebra. Expressions in algebra often use the letters `x` and `y`, as in the expression `4 * x + 3`, or *four times x plus three*. The letter x is a variable. To use a variable, *assign* a paricular piece of data to it. For example, let x equal the number 5. Then the expression becomes `4 * 5 + 3` because *x now stands for 5*. 

Variables are, well, variable. One minute they can point to one piece of data, and another minute another piece of data. We could now say, let x equal 10, and now the expression becomes `4 * 10 + 3`.

Another way of saying this is that a variable is just a symbol. But a symbol needs something to point to in order to be useful. In programming languages, the thing a symbol points to is some data, also called its *value*. When a variable points to a piece of data, we'll say it *has a value*. In the two examples above, the value of x is first 5 and then it's 10.

As in mathematics, in programming languages a variable holds a piece of data and provides a reference to it for later use. We'll name our variables when we *declare* them so that we can easily reference them. `x` could easily be the name of a variable, but descriptive names are usually more helpful. 

For example, if we wanted a variable to reference a person's age, `age` would be a good name for it. Variables in javascript can use any english letter, capital or lower case, and any number, as long as they don't start with a number. Some other special symbols are allowed as well like the dollar sign `$` and the underscore `_`.

Before a variable can be used it must be declared. Declare a varaible in javascript with the `var <name>;` synax. On a line, type `var` followed by a space, then the name of the variable, and end it with a semicolon `;`.

	var age;
	var x;
	var myDog;
	var aliveIn2014;
	
Declare each of these variables in node, for example:

	> var age;
	undefined
	>

Once a variable has been declared you can put it to use. Most imporantly, you can *assign* the result of an expression to it. Do this with the equals sign `=`.

Remember that a number by itself is an expression whose result is just the number, so assign the value 32 to age. Make sure you've already declared it above!

	> age = 32;
	32
	>

The value of `age` is now `32`. Confirm this by typing the name of the varaible at the node prompt and pressing return:

	> age
	32
	>

Node is *evaluating* the variable as an expression so that its value now stands in for it. Node then prints the result to the console. More on this in a moment.

Change the value of age:

	> age = 45;
	45
	>

And type age by itself at the console again:

	> age
	45
	>
	
Its value is now 45. Variables in JavaScript are known as *mutable* in programming lingo. That just means that their values can be changed. They mutate. Watch out!

We can assign the result of a more complex expression to a variable as well as other types of data. Make sure you've already declared these variables:

	x = 5 * 3 + 1;	
	myDog = "Ginger";
	aliveIn2014 = true;

Often we'll want to assign a value to a variable at the same time we declare it. This is easy. Just combine the variable declaration and the assignment into a single *statement*. Declare a couple of new variables and assign a value to them:

	var hairColor = "brown";
	var height = 6 * 12;

Confirm that the result was assigned to the variable by typing the variable's name by itself at the console:

	> hairColor
	'brown'

## Statements

You may have noticed a couple of things about typing variables into node and declaring them. First, notice that almost every line that is more than a simple expression ends in a semicolon `;`.

The grammar of a programming language is typically composed of expressions and statements. We've seen many expressions already. Expressions are evaluated so that they have a result which can be used. For example, we can assign the result of an expression to a variable. 

**Every expression has a result.**

Statements are more complex linguistic constructs that are often built up out of expressions or even other statements. Together, many statements form a program. Every statement in javascript ends in a semicolon. Often, statements do not evaluate to a result even though they do something else.

Consequently, the second thing you may have noticed is that declaring a variable or declaring and assigning a value to a variable results in `undefined`:

	> var hairColor = "brown";
	undefined
	>
	
That's because variable declaration and variable assignment are statements, and as we just learned, statements often do not evaluate to a result. In this case, the result of the statement is `undefined`, which really is to say that it has no result at all. `undefined` is like javascript saying "it doesn't have one".

If this is confusing that's ok. Just remember that expressions are the simple stuff like adding numbers together or a string by itself, and satements are the more complex stuff like declaring a variable or assigning the result of an expression to a variable.

**And remember to end every statement in a semicolon**

## Using Variables in Expressions

Now that we have variables we can use them in expressions and other statements. Use a variable just like you would the value it represents. For example, once we've assigned a numeric value to a variable, we can use that variable in numeric expressions:

	> var age = 32;
	undefined
	> age * 4;
	128
	>

When variables appear in an expression, the first thing javascript does is evaluate them to their values, so that their values can then be used in the expression.

In the above example, it's like javascript sees `age * 4` and first replaces `age` with its value `32`, so the expression is transformed into `32 * 4`, and then that expression is evaluated. This is just like you do in algebra.

Variables can be used anywhere values can. For example, declare a variable and assign a value to it, then declare *another* variable and assign the first one to it:

	> var name = "Mark";
	undefined
	> var town = name;
	undefined
	> town
	'Mark'
	
What's happened here? The variable `name` is declared and assigned the value `"Mark"`. Then `town` is declared and assigned `name`. But we're using the variable `name` here in an expression, and so javascript evaluates `name` to its value, which is `"Mark"`, and then assigns *that* to `town`.

It's important to understand that javascript does not assign `name` to `town`. Javascript assigns `name`'s *value* to `town`. We can check this. Assign a different value to `name` now, and notice that `town` does not change:

	> name = "Elizabeth"
	'Elizabeth'
	> town
	'Mark'
	>
	
Values and variables are two very different but related things. Variables hold values. Remember that a variable is always evaluated when used in an expression, so that its value is used and not the variable itself.

## Undeclared Variables

If you try to use a variable that hasn't been declared, javascript *throws an exception*. This is a technical term that describes an error in a running program. The exception javascript throws is the `ReferenceError`, i.e. you are referencing a variable that does not exist.

Type the name of a variable into node that you haven't declared anywhere:

	> undeclaredVariable
	ReferenceError: undeclaredVariable is not defined
		...
	>
	
Javascript literally doesn't know what to do. You've given it an ambiguous instruction, in this case an expression with a variable that doesn't exist, and javascript can't make sense of it. Rather than guessing your intention, javascript throws an exception and stops running at that point. The same thing occurs if you use an undeclared variable in a larger expression:

	> 5 * 4 + undefinedVariable
	ReferenceError: undefinedVariable is not defined
		...
	>

A ReferenceError, or any other exception, can crash a program. Programmers must pay attention to their code an take care to test it.

## Undefined

*Undefined*, on the other hand, is something else. Undefined is actually a type of data in javascript, that is, javascript understands what undefined is; it make sense. Type `undefined` into the node prompt:

	> undefined
	undefined
	>
	
This is not an error. Node understands it and says that the result of `undefined` is `undefined`.

In javascript, undefined means "no value assigned". It is the value that stands in when no value has been determined yet.

We've already seen that many statements evaluate to undefined. Javascript *executes* the statement, and the statement accomplishes some task, like assigning a value to a variable, but then the result of the entire task is undefined. We couldn't store its result and use it later on.

Likewise, when you declare a variable in JavaScript, if you do not immediately assign a value to it, its value is `undefined`, which makes sense:

	> var newVariable;
	undefined
	>

You can use a variable whose value is undefined:

	> newVariable
	undefined
	>
	
If you use it in a mathematical expression, the result is `NaN`, or *"Not a Number."* That is, the result of adding or subtracting or multiplying, etc, to an undefined value is, well, not a number:
	
	> newVariable + 5
	NaN
	>

But watch what happens if you use an `undefined` value in string concatenation:

	> newVariable + " and string concatenation?"
	'undefined and string concatenation?'
	>
	
Much to the frustration of many programmers, javascript *coerces* the undefined value into a string. All this means is that javascript turns it into a string, it changes its type from `undefined` to `string`, and then concatentates it. And the result of coercing the `undefined` value into a string is just a string that says `"undefined"`.

Remember: it is ok to use a variable whose value is undefined, although you may not get the results you expect. But you can never use a variable that hasn't been declared yet. Javascript will give you an error and your program may crash.

--

Next: Program Structure