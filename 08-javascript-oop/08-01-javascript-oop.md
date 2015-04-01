Intro to Object-Oriented Programming
===================================

So far we've seen two ways of writing programmes. The first is called *imperative* programming where we provide the computer with a number of instructions and our code is executed in a mostly linear order. The second is *functional* programming where we organize our code into functions and execution revolves around calling functions and performing complex data operations with higher order functions.

A third way to program is known as *object-oriented* programming, in which code is organized into groups known as objects which contain both data and the operations that can be done to the data. Instead of passing data to functions, objects hold on to data and have functions that work directly with it.

We will learn the simplist way of using object-oriented patterns in javascript in this chapter. Javascript suppports much more advancd object-oriented programming using its *prototype-based* system, which will be discussed in class but not used quite as much by us.

## References

[Eloquent Javascript](http://eloquentjavascript.net/chapter8.html)

Chapter 8 in Eloquent Javascript discusses prototype-based object-oriented programming in javaScript

[MDN Object-Oriented](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)

The Mozilla Developer Network has an introduction to object-oriented programming in javascript.

[MDN This](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

The Mozilla Developer Network also has a reference document on the `this` keyword.

## Objects

Recall that an object is a collection of key-value pairs or properties that give names to data. An object allows you to group data together and carry it around under a single identifier:

```js
var person = {
	firstName: 'Philip',
	lastName: 'Dow',
	age: 33
};
```

Properties can be accessed using dot notation and bracket notation:

```js
person.firstName;
person['age'];
```

We also know that objects can have functions associated with them. Define a function on the object just as you would one of its simple properties:

```js
var person = {
	firstName: 'Johnny',
	lastName: 'Foobar',
	age: 33,

	fullName: function() {
		return 'Johnny' + ' '  + 'Foobar';
	}
};
```

What's wrong with our function `fullName`? It *hardcodes* the value it returns. We've actually written in code that it returns "Johnny Foobar" every time instead of whatever value is in `person.firstName` and `person.lastName`. What if we change `firstName` or `lastName`? Then the function still returns "Johnny Foobar", and this is obviously incorrect. Full name should instead refer to the two properties on the object. How can it do that?

## This

We need a way to reference properties on an object from other properties on the object, specifically from functions that are attached to it. The javascript keyword `this` allows us to do this.

`this` refers to the *context* in which a function is executed. By default `this` refers to the global context, but for functions attached to objects, the context will normally be the object itself. `this` gives us a way to refer to properties on the object that a function is attached to:

```js
var person = {
	firstName: 'Johnny',
	lastName: 'Foobar',
	age: 33,

	fullName: function() {
		return this.firstName + ' '  + this.lastName;
	}
};
```

Notice that the `fullName` function now uses `this.firstName` and `this.lastName` to get the first and last names instead of hardcoding it. Now we can change those values and the function will work with the new ones.

**Call functions with this**

`this` simply refer to the context in which a function is executed, and for functions attached to an object that will normally be the object itself. `this` stands in for the object, and just as we can access properties with `this` we can also call functions with it.

Define a function on an object that calls another function on the object:

```js
var foo = {
	bar: function() {
		console.log('called bar');
		this.baz();
	},
	baz: functino() {
		console.log('called baz');
	}
};
```

Notice that the `bar` function on the `foo` object calls the `baz` function on it by way of `this.baz`. If we left off `this` the function would try to call a `baz` function in the global scope.

**Context is not scope**

Don't confuse *context* with *scope*. Although there are some similarities the two refer to different environments. Scope refers to the identifiers that are available at some point in the code, where identifiers include the variables and functions available at any given moment.

Context on the other hand refers a specific object which is referenced by the `this` keyword. Asking for any property or function on `this` asks for it on that object and on no other.

## Modules

This has been a very limited introduction to object-oriented programming in javascript. As it turns out we will not use object-oriented patterns in our node web application development too often. Instead we'll see the use of *modules* in later chapters, but as more object-oriented programming because necessary it will be introduced.



