Introduction to jQuery
=====

jQuery is a library built on top of javascript. It’s just javascript, and it doesn’t do anything we couldn’t do ourselves if we were so inclined.

jQuery is useful for a number of reasons. It provides a number of convenience functions for modifying the dom and getting information from the dom that we would probably want to write ourselves anyway. It also abstracts away browser incompatibilities that we would have to work around if we were manipulating the dom using vanilla javascript.

We’ll see that dom manipulation with jQuery is similar to manipulation with javascript. We'll either target an element on the page and change it, or we'll target an element and bind an event handler to it.

Our goal for this lesson is to cover the many kinds of dom manipulation you can perform with jQuery, common event bindings, and selector targeting.

## References

[http://jquery.com/](http://jquery.com/)

It's the jQuery homepage. Reference for all things jQuery.

## Using jQuery

Let’s link to the jQuery library. It’s customary to link to a copy of the library from an internet location. A CDN is a content distribution network. Routers and browsers are able to cache files from these servers, and because so many websites already use JavaScript, it’s likely a visitor will have faster access to a CDN copy of jQuery than one hosted from your own server.

Google jQuery CDN and copy in the link. Be aware of the jQuery migrate link.

Alternatively you can [download jquery](http://jquery.com/download/), just ensure you're using the 2.x version.

We execute code with jQuery by placing it inside the jQuery function:

```js
$(document).ready(function() {

});
```

<!-- let the class reason this out -->
Let’s consider what all this means.

The `$` sign is a legal identifier character in JavaScript, like any other letter or number. And $ is immediately followed by paranthesis `()`, so $ here is actually the name of a function and we are calling it. In fact, it is a shortcut for the jQuery function, which we also could have used:

```js
jQuery(document).ready(function() {
  // the two are equivalent
});
```

jQuery adds functionality to dom objects. What I mean is that jQuery is actually adding properties and methods to the dom that those objects don't natively have.

In order to execute jQuery functions on a dom object, we must pass that dom object to the jQuery function, effectively converting it to a "jquery-dom object". jQuery wraps it inside its own object and exposes the additional functionality provided by the library.

In this case we’re sending the document object to jQuery. We then call the `ready` function on the result. This is like an event binding. We pass an anonymous function to `ready`, which allows jQuery to hold onto that function until the document has finished loading. The `ready` binding is set up so that only when the document is done loading and the dom is entirely built does jQuery execute the function you’ve passed in.

This solves the problem of having to place scripts at the bottom of the page. We can have as many calls to document.ready as we want, spread out across a number of JavaScript files.

We can apply a further shortcut and simply write: 

```js
$(function() {

});
```

which jQuery understands as a call to document.ready.

This is an example of overloaded functions in JavaScript, or functions that take accept multiple types of arguments for the same parameter. So far we’ve seen that we can pass a function to the `$` function as well as an `object`, the document object. In a moment we’ll see that we can also pass a string or other dom objects to that function.

**$(document).ready**()

If you are using jQuery for dom manipulation or event binding you must place that code inside the call to document.ready. You can continue to place other JavaScript code outside the document.ready function, but watch out for scoping issues. Because you pass an anonymous function to document.ready, you create a new scope, and variables and functions inside that call will not be available to functions outside it. Normally you should just place everything inside document.ready if you’re using jQuery.

## Selecting and Modifying Elements

Let’s start with basic patterns. We want to select an element on the page. To do this we’re simply going to pass a css selector to the jQuery function as a string and jQuery will give us the element back.

Given our basic html page we used for vanilla dom manipulation, modify it so that it links to the jquery source and contains a script tag at the bottom with a call to `$(function() ...` waiting to be filled in:

```html
<!doctype html>
<html>
<head>
  <title></title>
  <style type="text/css">
    .bordered {
      border: 1px solid black;
    }
  </style>
</head>
<body>
  <p id="a">Lorem ispum and some other text</p>

  <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.3.js"></script>
  <script type="text/javascript">
    $(function() {

    });
  </script>
</body>
</html>
```

Let's select the paragraph on the page whose `id="a"`. We'll use the css selector to do this. Simply pass the css selector `#a` as a string to the jquery function:

```js
var $paragraph = $('#a');
```

Notice that I'm using the `$` sign in the variable identifier as a way of reminding myself that this is a jquery object and not a vanilla dom element.

Use jquery's `text()` method to get and log the text contents of that paragraph to the console:

```js
var $paragraph = $('#a');
console.log( $paragraph.text() );
```

Once we've selected an element we can use jquery functions to modify it in a number of ways. We can change its text contents, its html contents, its attributes or css, etc.

The general pattern for these methods is that the getter and setter have the same method name. When we want to get a value we simply call the function without any arguments, and when we want to set a value we pass an argument to the function.

**Changing the text content**

For example, we saw that we can get the paragraph's text contents simply by calling `text()` without any arguments. Well we can set the paragraph's text contents by calling `text()` with a string:

```js
var $paragraph = $('#a');
$paragraph.text('change the text to this');
```

**Changing the html**

What if you want to set the html? Try passing html in as text:

```js
var $paragraph = $('#a');
$paragraph.text('<span>change the text to this</span>');
```

Not quite what we wanted. jquery is escaping the html so that it renders as text. If we want to actually insert html into the paragraph, we call `html()`:

```js
var $paragraph = $('#a');
$paragraph.html('<span>change the text to this</span>');
```

**Adding content**

In many cases we will want to add text to existing content, rather than replace it completely. When we want to add content *inside* the targeted element, we use `prepend()` and `append()`. These two methods take html content.

For example, let's create a new paragraph for each name in an array of names. We'll use jquery's `each()` function to help us out with this. First add a container div to the html with `id="names"`:

```html
<div id="names"></div>
```

Now add the following javascript:

```js
var names = ["John", "Carmen", "Michael", "Angela"];
$.each(names, function(i, name) {
  var $p = $('<p>').text(name);
  $('#names').append($p);
});
```

In additon to using jquery to add the paragraph to our names div, we're also using jquery to build the paragraph itself. We do this by once again passing a string to the jquery function that contains a tag rather than a css selector. Internally jquery examines that string and infers that we want to build a new tag. We then call the `text()` method with an argument to set the content of the paragraph.

Interestingly, this call to `text(x)` returns the paragraph itself. This is called *method chaining*, whereby an object's method returns the object itself so that we can continue to call additional methods on the result.

More succinctly we can do away with the local variable `$p` and write our code like:

```js
var names = ["John", "Carmen", "Michael", "Angela"];
$.each(names, function(i, name) {
  $('#names').append( $('<p>').text(name) );
});
```

**Adding sibling content**

When we want to add content *before* or *after* the targeted element rather than inside or outside it, we use the `before()` and `after()` methods:

```js
var names = ["John", "Carmen", "Michael", "Angela"];
$.each(names, function(i, name) {
  $('#names').after( $('<p>').text(name) );
});
```

Pay attention to the structure of the dom now. Previously, our paragraph additions were inside the names div. Now they are outside it. Not a big change visually for our little page, but a significance difference in the structure of the page.

**Changing attributes**

We can also change the attributes of an element. Attributes are those portions of a tag that appear in the tag declaration, such as `href` for a link or `src` for an image. We can read and set attributes, including custom attributes, using the `attr()` method.

The difference here is that we must specify which attribute we want to get or set, so that our method will take one or two parameters. The getter `attr(name)` will take a single paramater, the name of the attribute whose value we wanted returned, and the setter `attr(name, value)` will take two parameters, adding the value we want to change the attribute to.

For example we can add a `data-id="1"` attribute to our paragraph:

```js
$('#a').attr('data-id', 1);
```

Examine the dom in chrome's debugger to confirm the change.

**Changing css**

Changing the content of a page is a big deal, but significant changes can also be accomplished by modifying the css of an element. There are a couple ways to do this.

First we can call `css()` on the jquery object and pass in an object literal of css attribute pairs. Take care to use quotes where invalid characters would be used in the keys, for example, dashes:

```js
$('#a').css({
  'background-color': 'red', // notice use of quotes
  color: 'blue'
});
```

More simply we can add an remove classes:

```js
$('#a').removeClass('unbordered');
$('#a').addClass('bordered');
```

## Event Binding

We've seen the first of the two primary uses for jquery: targeting an element and modifying it somehow. Let's look at the second: targeting an element and attaching an event handler to it.

The basic event to respond to is a mouseclick. We saw that in vanilla javascript we attach a mouse click event handler by binding a function to the `onclick` property of a dom element. In jquery we'll call the `click()` method on the object and pass in an anonymous function:

```js
$('#a').click(function() {
  // handle click
});
```

In general this is how we'll set up event handlers with jquery. Vanilla javascript will have some `on{{x}}` event and we'll bind an event handler by calling `x()` on the jquery dom object and providing a function.

This is actually shorthand notion for the more general `on()` method which takes two parameters, the name of the event and the function callback. So we could just as easily have done:

```js
$('#a').on('click', function() {
  // handle click
});
```

From inside the event handler we need a way to refer to the element that has been clicked. We saw that `this` is already set to the element by the javascript environment, but we'll usually want access to the additional jquery functionality so we'll wrap this in a call to the jquery function like so:

```js
$('#a').on('click', function() {
  $(this). ... // some method
});
```

Make sure you understand the difference between the two:

```js
var el = this;
var $el = $(this);
```

In the first case we have a vanilla javascript dom object. In the second we are wrapping that object inside a jquery object, which gives us access to jquery methods that ultimately manipulate it.

Let's use our event handler to toggle our `bordered` class on the element:

```js
$('#a').on('click', function() {
  $(this).toggleClass('bordered');
});
```

Piece of cake!

For our final example, let's combine what we've learned about jquery. Let's set up a link so that when we click it we end up changing the border on our paragraph. For this we'll want to target an element and add an event handler, and then inside that event handler we'll want to target *another* element and change it's border.

First add a link to the html underneath the paragraph:

```html
...
<p id="a">Lorem ispum and some other text</p>
<a href="" id="toggle-border">Toggle Border</a>
...
```

Notice that we've given the link an id so we can target it with a css selector and that we've left the url blank, which just means "this page".

Now set up the click event handler for the link:

```js
$('#toggle-border').on('click', function() {
  // ...
});
```

Then inside the function callback, toggle the class on the paragraph instead of `this`:

```js
$('#toggle-border').on('click', function() {
  $('#a').toggleClass('bordered');
});
```

Reload the page and try it out. Wait a minute, it doesn't work! What's going on?

When we click the link the browser reloads the page, which is the default behavior for the link. The class on the paragraph is being toggled, but the page is immediately reloaded and the paragraph returns to its default state.

To prevent the browser from reloading the page we need to prevent the link's default behavior. There's a method on the event object associated with the click that does just that. We can get access to it by including an event parameter in our function callback:

```js
$('#toggle-border').on('click', function(evt) {
  $('#a').toggleClass('bordered');
  // so something with evt
});
```

Notice the addition of the `evt` paramater to the anonymous function. jquery passes that argument to the function every time but if we don't include it as a parameter we won't have access to it.

Inside the callback we'll call the normal javascript method `preventDefault()` on the event object to prevent the link's default behavior:

```js
$('#toggle-border').on('click', function(evt) {
  $('#a').toggleClass('bordered');
  evt.preventDefault();
});
```

You may also return `false` from the callback to prevent the default behavior, which is more commonly done and does not require the event paramater in the callback function:

```js
$('#toggle-border').on('click', function() {
  $('#a').toggleClass('bordered');
  return false; // same thing
});
```

## Custom Events

We can define our own events and then listen for them and trigger them on objects. Any object can *emit* an event as long as we wrap it inside a jquery call. That means that both dom elements and regular old javascript objects can support custom events.

Using a custom event is a two step process: first we'll set up an event listener for our event and second we'll *trigger* it on the object to which our listener is attached. We'll "define" a custom event simply by name it and using the name consistently across our event listeners and trigger code.

So, for example, I can set up up a custom event listener on our regular old paragaph object by using a unique name of my choosing. Let's try `"app:myevent"`. Note that the colon is not significant but helps me think of the event as being namespaced to my application:

```js
$('#a').on('app:myevent', function() {
  console.log('app:myevent fired');
});
```

Notice that we're setting up the custom event handler using `on()` the same we set up the click event handler.

To trigger the event we just need to call `trigger()` on the same object somewhere else in our code. Let's just do it right after it:

```js
$('#a').on('app:myevent', function() {
  console.log('app:myevent fired');
});

$('#a').trigger('app:myevent');
```

Reload the page and you should see the message in the console.

**Javascript object events**

We can use events with vanilla javascript objects as long as we wrap them in jquery:

```js
var obj = {
  foo: 'bar',
  baz: 'qux'
};

$(obj).on('app:obj-event', function() {
  console.log('app:obj-event fired on', this);
});

$(obj).trigger('app:obj-event');
```

We'll see how this can be extremely useful for keeping the dom in sync with our data model in the next lesson.

## Pub-Sub

The use of events like this is an example of the *pub-sub* or *publish-subscribe* design pattern that allows objects to communicate with one another with very little coupling. Instead of calling methods on each other, which results in strong type coupling, a named event is broadcast and listened for and objects can set up listeners for themselves rather than rely on other objects calling their methods for them.