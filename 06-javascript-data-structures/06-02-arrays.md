JavaScript: Arrays
================================

Arrays are lists of data accessed by *index*, or their position in the list. The data in an array are called its *items* or its *elements*. Arrays always have a *length*, which is equal to the amount of space they've set aside for storing items. Use arrays for collections of similar items where their order may matter or it doesn't make sense to access them by a special key.

## References

[Eloqeunt JavaScript](http://eloquentjavascript.net/chapter4.html)

Chapter 4 on Data structures: Objects and Arrays. **Must Read**

[JavaScript Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

JavaScript Arrays at the Mozilla Developer Network

## Creating an Array

As with objects there are two ways to create an array in javascript. Create an array with the `new` keyword or the square bracket syntax `[]`:
	
	/* using the new keywords */
	new Array()
	
	/* simply square brackets */
	[]

Both result in a new, empty array. We'll emphasize the use of brackets to create arrays.

Normally you'll want to create an array with some data in it. Place the data between the brackets:

	[5]
	
	["Hello"]

Arrays may hold many items and they may be different types, although normally the types will all be the same, e.g. an array of numbers or an array of strings. Separate items with a comma:

	[0,1,2,3,4]
	
	["Philip", "Mark", "Kevin", "Elizabeth", "Margaret"]
	
And naturally you'll often want to assign an array to a variable:

	var numbers = [0,1,2,3,4];
	
	var names = ["Philip", "Mark", "Kevin", "Elizabeth", "Margaret"];
	
Unlike objects, order matters in an array, because it will be by their position that items are accessed.

## Accessing Items in the Array

Access an item in an array using the bracket syntax similar to bracket access with objects. Instead of using a key such as the name of a property, use a number that represents the position of the item. Because it's a number, no quotes are necessary:

	> var numbers = [0,1,2,3,4];
	> numbers[0]
	0
	> numbers[4]
	4

**Zero Based Numbering**

Notice that array indices start at zero, not one, which means that the first item will be at the *zeroeth index*. This is a common pattern in programming languages. Here is another example:

	var names = ["Philip", "Mark", "Kevin", "Elizabeth", "Margaret"];
	> names[0]
	'Philip'
	> names[4]
	'Margaret'

As with objects, if you attempt to access an item at an index which does not contain one, javascript evaluates the expression to undefined:

	> names[10]
	undefined
	
In other programming languages this could result in a crash. Be careful that you are always accessing the correct index or you may get a value you did not expect.

Note that there is no dot notation for arrays. Nevertheless, arrays are quite similar to objects in javascript and it is not inappropriate to think of the indices as the array's keys.

## Modifying an Array

Arrays in javascript are *mutable* in the same way objects are. Update, add and remove items from an array using the bracket notation.

Change the value of an item in the array with the assignment operator. Use the bracket notation to specify which index you want to change:

	> names[2]
	'Kevin'
	
	> names[2] = "Marcy"
	'Marcy'
	
	> names[2]
	'Marcy'

Index two in the array (the third item), previously held the string `'Kevin'` but the assignment permanently updates the array so that the value in that position is now `'Marcy'`.

**Add New Items**

Add new items to the array with the assignment operator. Provide an index that isn't being used yet:

	> names[5]
	undefined
	
	> names[5] = "James"
	'James'

	> names[5]
	'James'
	
A common operation is to add an item to the end of an array. Get the length of an array with the `length` property. This is a property on the array, so use the dot notation:

	> names.length
	6
	
Notice that the length will always be one more than the last index in use, so you can *append* an item to the end of the array by using the length as the index:

	> names[names.length] = "New Name"
	'New Name'
	
	> names.length
	7
	
	> names[6]
	'New Name'

Javascript allows you to append an item to an array at any index, not just the next available one:

	> names[100] = "Way Out West"
	'Way Out West'
	
Doing so automatically grows the array to accommodate that many items:

	> names.length
	101
	
But the unused indices remain undefined:

	> names[99]
	undefined

**Remove Items**

Delete an item from an array with the `delete` keyword:

	> names[0]
	'Philip'
	
	> delete names[0]
	true
	
	> names[0]
	undefined

Deleting an item from an array does not change its length:

	> names.length
	101

**Mutation**

As with objects, arrays are passed *by reference* in function calls, so it is possible for a function to modify the contents of an array, even if inadvertently. Try to design your functions so that they do not produce these kinds of *side effects*.

## Nesting Arrays

Create *multidimensional* arrays by nesting arrays inside one another. Because an array is a collection of items, which are really just values, and an array is itself a value, the item at some index can be another array:

	var fourxfour = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];

Notice the use of commas to separate items inside the nested array as well as the arrays from one another. `fourxfour` is now a two dimensional array, or array of arrays:

	> fourxfour
	[ [ 0, 0, 0, 0 ],
	  [ 0, 0, 0, 0 ],
	  [ 0, 0, 0, 0 ],
	  [ 0, 0, 0, 0 ] ]

Access the inner arrays with single bracket notation and the items inside them with double bracket notation:

	> fourxfour[0]
	[ 0, 0, 0, 0 ]

	> fourxfour[0][0]
	0

You could make 3D or even 4D arrays although two dimensions are the most common.

## Nesting Objects inside Arrays

It is common in javascript to use arrays of objects. Nest objects inside the arrays just as you would normally create objects. Watch your syntax and make sure to include commas in the correct places:

	var people = [
		{
			name: "Philip Dow",
			age: 32,
			sex: 'M'
		},
		{
			name: "Margaret Atwood",
			age: 29,
			sex: F
		},
		{
			name: "Justin Amazing",
			age: 15,
			sex: M
		}
	];
	
Access an object in the array using its position and array bracket notation:

	> people[0]
	{ name: 'Philip Dow',
	  age: 32,
	  sex: 'M' }

And access one of the object's properties using bracket notation for the array index and dot notation for the property:

	> people[0].name
	'Philip Dow'	

## Iterating through Arrays

Another loop construct that was not covered in earlier chapters is the `for` loop. The for loop typically begins at a number, increase that number by a specified amount, and continues looping until that number meets a terminating condition. The for loop syntax is:

	for ( initialization; terminating condition; loop expression ) {
		Statements
	}

Note that a foor loop has three parts in the parenthesis each separated by a semicolon.
	
In a typical for loop, initialization will often set up a variable and give it an initial value. The terminating condition will check if the variable has reached a certain number, and the loop expression, which is executed each time through the loop, will increase the variable by one.

The following for loop prints out the numbers zero through nine:
	
	for ( var i = 0; i < 10; i++ ) {
		console.log(i);
	}

Note the `i++` is short for `i = i + 1`. Such shortcuts are called *syntactic sugar*.

Print out the items in the `names` array by starting with the varaible `i = 0` (`i` is often used to stand for *index*), looping until the last index is reached, and increasing the index by one each time:

	var names = ["Philip", "Mark", "Kevin", "Elizabeth", "Margaret"];

	for ( var i = 0; i < names.length; i++ ) {
		console.log( names[i] );
	}

## Array Functions

Arrays behave like the other javascript objects we've seen and have a number of properties, including values like their `length` and many useful methods.

Assuming the names array we've been using is defined:

	var names = ["Philip", "Mark", "Kevin", "Elizabeth", "Margaret"];

The following methods and properties work:

`length` results in the number of items in the array:

	> names.length;
	5
	
`indexOf()` returns the first matched index of an item in the array:

	> names.indexOf('Elizabeth');
	3
	
`join()` puts the items in an array into a single string, separated by a string that is passed as the argument. It is the opposite of a String's `split()` method:

	> names.join(', ');
	'Philip, Mark, Kevin, Elizabeth, Margaret'
	
`sort()` sorts the elements of an array and is case-sensitive by default:

	> names.sort();
	[ 'Elizabeth',
	  'Kevin',
	  'Margaret',
	  'Mark',
	  'Philip' ]
	  
There are many more array functions. Refer to [Mozilla's Developer Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) for more info.