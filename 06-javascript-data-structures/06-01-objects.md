JavaScript: Objects
================================

An object in javascript is a collection of named values in a single unit. Remember that a value is a piece of data with a type, such as the *number* 42 and the *string* "hello world" or even a *function*. With an object we can store related values together in a single variable and access them from it. Treat the object like any other piece of data and assign it to variables, pass it into functions as an argument or return it from functions. 

Objects in javascript are also known as hashes or dictionaries in other languages. 

## References

[Eloqeunt JavaScript](http://eloquentjavascript.net/chapter4.html)

Chapter 4 on Data structures: Objects and Arrays. **Must Read**

[JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Learn more about JavaScript objects at the Mozilla Developer Network

[JavaScript Strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

Learn more about JavaScript strings at the Mozilla Developer Network

## Creating an object

There are two ways to create an object in javascript, one using the *new* keyword and another using the curly braces `{}` notation:

	/* using the new keyword */
	new Object()
	
	/* simple curly braces */
	{}
	
Both result in a new, empty object. Try typing either into the node REPL to see the result. We'll emphasize the use of curly braces to create a new object in this chapter.

Normally you'll want to create an object with some data in it. Provide a name for the data, also called the *key*, which is similar to a variable name that only works with this particular object, and a *value* for it. Separate the two with a colon:
	
	{
		city: 'Oklahoma City'
	}
	
This unit is called a `key-value pair`. Here we've created an object with a single key called `city` whose value is the string `'Oklahoma City'`. Notice the use of separate lines for the curly braces and the key-value pair and how the pair is inset one tab for clarity.

An object can contain as many key-value pairs as you like, and each key can have a different type of data. Separate key-value pairs with a comma:

	{
		city: 'Oklahoma City',
		population: 600000,
		state: 'OK',
	}
	
Although you may want to pass an object to a function in some cases without otherwise saving it, normally you'll assign an object to a variable for later use. As with all variable declarations, use the `var name = ...;` syntax to create a variable and assign an object to it. Assign an empty object to a variable like:

	var emptyObject = { };
	
Assign the Oklahoma City object above to a variable like:

	var okc = {
		city: 'Oklahoma City',
		population: 600000,
		state: 'OK',
	};
	
Notice that the object declaration looks quite a bit like a css property declaration. Both use key-value pairs, and in fact *property* is another common word for key. The two terms *key* and *property* will be used interchangeably here.

Create a few more objects for practice:

	var chicago = {
		city: 'Chicago',
		state: 'IL',
		population: 2700000
	};
	
	var sanFrancisco = {
		city: 'San Francisco',
		state: 'CA',
		population: 840000
	};
	
Notice that the order of the key-value pairs doesn't matter, e.g. it doesn't matter what order the `city`, `state` or `population` are set.

## Accesing Values

Access an object's values using *dot notation* on the variable. Start with the variable name of the object, for example `okc` or `chicago`, add a period `.` and then provide the name of the key you want to access, such as `city`:

	> okc.city
	'Oklahoma City'
	
	> okc.population
	600000
	
Notice that an object behaves as though it itself contains additional variables. It's like the `okc` object has a variable named `city` or `population`. When node encounters `okc.city`, it first finds the variable `okc` which happens to be an object, then because of the use of the dot syntax it looks for the `city` property on that object. If it finds it, it resolves the entire phrase `okc.city` to that value.

What happens if you attempt to access a property that is undefined on an object?

	> okc.colors
	undefined	
	
Javascript simply evaluates an undefined property to a benign looking `undefined`. Many programming languages raise an error when this happens but not javascript. Be careful that you are accessing properties correctly. Property names are case sensitive. If you access a property that doesn't exist, you will simply get back a value you probably don't expect.

**Bracket Notation**
	
It is also possible to access an object's properties with bracket notation. Use a two brackets `[]` after the variable name and provide a string with the name of the property you are accessing:

	> okc['city']
	'Oklahoma City'
	
Because bracket notation takes a string, it is possible to use a variable in place of the string. This might allow you, for example, to access a property dynamically instead of knowning which one you want in advance:

	> var property = 'population';
	undefined
	> okc[property]
	600000

In some cases bracket notation is necessary. Not all characters may be used for property names in an object. For example, dashes `-` may not be used. If you must use dashes or access properties with dashes in them, create the object with a string for the property name and access the property using bracket notation only:

	/* notice use of string for poperty name. just put it in quotes */

	var example = {
		"answer-to-life": 42
	}
	
	/* dot notation does not work with dashes in property name */
	
	> example.answer-to-life
	ReferenceError: to is not defined
	
	/* but bracket notation does */
	
	> example["answer-to-life"]
	42

## Modifying Objects

You may change the value of an object's properties at any time by using the assignment operator, or single equals sign `=`, with dot or bracket notation:

	> okc.population = 600001
	600001

	> okc['population'] = 600001
	600001

The new value is saved on the object and will be used whenever that property is accessed again:

	> okc.population
	600001

**Add New Properties**

It is also possible to add new properties to an object. Accessing a property that is not defined results in `undefined`, as we saw above, but using the assignment operator with a property that is not yet defined immediately defines it and assigns a value to it:
	
	> okc.basketball
	undefined
	
	> okc.basketball = 'Thunder';
	'Thunder'
	
	> okc.basketball
	'Thunder'
	
`okc.basketball` starts out undefined, but then we assign `Thunder` to it, which immediately creates the property `basketball` and saves `Thunder` to it for future use.

**Remove Properties**

Remove properties from an object with the `delete` keyword:

	> delete okc.basketball
	true
	
Once a property is deleted it is permanently removed from the object and undefined until you assign another value to it:

	> okc.basketball
	undefined
	
**Mutation**

Because it is possible to modify, add and remove properties from objects after they have been created in javascript, they are known as *mutable*. Objects can mutate, or change.

Be very careful with object mutability! You may inadvertently change an object which could cause unexpected problems in your program. For example, objects *pass by reference* when they are used in function calls. The object itself is sent to the function, not a copy of it. This means it is possible to modify the object from the function. Consider the following code:

	function modify(object) {
		object.status = "Updated";
	}
	
	var student = {
		name = "John Doe",
		status = "Enrolling"
	};
	
	modify(student);
	
	> student.status
	'Updated'

The `modify` function changes the `status` property on whatever object is sent to it permanently. When `modify` is called with the `student` variable, its `status` is consequently changed, which may not have been what you wanted.
	
## Nesting Objects

Objects may be nested. Because an object is itself a value that can be assigned to a variable, and because an object is composed of properties with values, one object's property may very well contain another object:

	var okc = {
		city: 'Oklahoma City',
		state: 'OK',
		population: 600001,
		basketball: {
			league: 'NBA',
			team: 'Thunder',
			stadium: 'Chesapeake Arena"
		}
	};
	
Notice the use of the nested object for the `basketball` property. You may nest objects as deeply as you like.

Access nested properties with multiple periods or brackets:

	> okc.basketball.league
	'NBA'
	
	> okc['basketball']['team']
	'Thunder'

Modify and delete nested objects similarly.

## Functions on Objects

Recall that a function is itself a value in javascript. We've already seen that it's possible to assign a function to a variable:

	var sayHi = function() {
		console.log('Hello');
	};
	
Because a function is a value and an object is a collection of key-value pairs, it is also possible to assign a function to an object's property:

	var sayWelcome = {
		german: function() {
			console.log('Willkommen');
		},
		english: function() {
			console.log('Weclome');
		},
		french: function() {
			console.log('BienVenue');
		}
	};
	
Although the syntax looks complex, it is a straightforward combination of syntax you already know.

Functions on objects may be called like any other functions. Access them once again with the dot notation or bracket notation:

	> sayWelcome.english()
	Welcome
	
	> sayWelcome.['german']()
	WillKommen

Using functions with objects is an extremely common pattern in javascript. It is typical for a function to take an object as one of its arguments and then call functions on that object depending on the result of the function. You must pass an object to it that responds to the functions that are expected.

For example, consider a long running operation that will *call back* to your code when it is finished:

	function longerProcess(callbacks) {
		var success = true;
		// ... do something that updates the value of success
		
		if (success) {
			callbacks.success();
		} else {
			callbacks.failure();
		}
	}
	
Notice that `longerProcess` expects the `callbacks` parameter to define the functions `success` and `failure`. To use `longerProcess` create an object that defines those two functions:

	var myCallbacks = {
		success: function() {
			// do something because we succeeded!
		},
		failure: function() {
			// do something when we fail
		}
	};
	
And pass that object to the function when you call it:

	longerProcess(myCallbacks);
	
This pattern involves fairly complex syntax and control flow. Review the code and make sure you understand it before moving on. This kind of code is very common in javascript.

## JavaScript Types are Objects

Every type of data we've used in javascript so far behaves like an object. They're a bit different from the objects we've been creating in this chapter, but they all have functions and some of them have properties. This means that we can use the dot notation with numbers, strings and even booleans.

For example, every string has a `length` property that indicates how many characters are in the string:

	> var name = "Philip";
	> name.length
	6
	
And every type of data has a `toString()` method that converts the data to human readable text:

	> var age = 32;
	> age.toString();
	'32'
	
	> var old = false;
	> old.toString();
	'false'
	
Some of the functions are extremeley useful. For example, if you have a number with many decimal places but only want to print the two of them, use the `toPrecision()` function:

	> var pi = Math.PI;
	> pi
	3.141592653589793
	> pi.toPrecision(3);
	'3.14'

String functions in particular are useful. The `trim()` function removes all whitespace from the front and back of a string:

	> var hello = '    Hello    ';
	> hello.trim();
	'Hello'

And the `split()` function splits a string on a separator, such as a space, and returns an array of strings:

	> var words = 'Here are a bunch of words';
	undefined
	> words.split(' ');
	[ 'Here',
	  'are',
	  'a',
	  'bunch',
	  'of',
	  'words' ]

We'll learn about arrays in the next chapter.

Objects are an important topic in javascript. All data types in javascript behave like objects. Objects contain properties that can hold any data, including functions. Access an object's properties with the dot notation and call functions on them similarly. Objects are commonly used to collect functions known as callbacks and passed to other functions which use them.
