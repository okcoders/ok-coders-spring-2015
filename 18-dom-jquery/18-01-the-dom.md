The Dom
=======

The dom is the document object model. It is the browser’s internal representation of a webpage, organized as a large tree data structure. The tree includes both the structure (html) and presentation (css) of the webpage.

Using JavaScript we can modify the dom, and any modifications we make are immediately reflected by the rendered webpage. We can add text or even elements, we can remove them, and we can do the same for styling.

The dom also allows us to write code that responds to events, such as when the user clicks on a link or moves the mouse over a section of the page. This is called event binding. We bind a function to a specific event for a specific dom element.

Basic dom manipulation involves a couple of steps. We need to find the element we want to target, and then we either need to make changes to it, or we need to establish an event binding.

## Basic DOM Manipulation

Create a basic html document with the following content. Note that it contains a paragraph with `id="a"`:

```html
<!doctype html>
<html>
<head>
  <title></title>
</head>
<body>
  <p id="a">Lorem ispum and some other text</p>
</body>
</html>
```

Add the following javascript to the head element:

```html
<script type="text/javascript">
  var paragraphA = document.getElementById("a");
  paragraphA.style.border = "1px solid black";
</script>
```

The document object `document` represents the root of the dom in javascript. It is automatically available inside the environment for us, and we access everything through it. Here we’re asking the document for that element whose id is ‘a’, and then we’re making an adjustment to its style sheet.

Make sure you've placed this in the head of the html and reload the page. Nothing happens. No border is added to the paragraph. Why?

Examine the javascript console in chrome to see what is happening. We're getting an error:

```
Uncaught TypeError: Cannot read property 'style' of null
```

<!-- let the class reason this out -->
What's going on here? We're trying to set the style property of paragraphA. The error implies that paragraphA is null. Why is that the case?

JavaScript is executed immediately when it is encountered by the browser. Our JavaScript is in the document head and is executing before the browser has added the paragraph to the dom. The paragraph doesn't exist yet!

We can get around this problem by moving our script to the bottom of the page. jQuery will offer us a better solution.

## Primer on Events

The DOM emits events. Events are effectively message that dom elements broadcast when an action takes place. Many times the actions are initiated by the user, such as clicking on a link or scrolling the page, and as such there are a number of built-in events such as mouse events and key events. But code can also generate events that are defined by the application.

*Event listeners* can register to be notified when an event occurs. This particular design pattern allows some object A to be notified when something takes place in another object B without A and B otherwise knowing anything else about each other except that some event has taken place. It allows for *loose coupling* among blocks of code in our application.

An event listener associates a function with an event on a particular object. When the event occurs on that object, the function will be called. Consequently functions like this are known as *callbacks*, and they are used throughout javascript. We'll find that anonymous inline functions will often be used as callbacks rather than separately defined functions.

## Binding to Events

Let’s take a quick look at a basic event binding. Instead of just setting the border on the paragraph, let’s make it so that you have to click on the paragraph to set the border.

We need to refer to the *onclick* event for the object returned by the document selector. We can then attach an anonymous function to that event and use `this` inside it to refer to the element. Modify your script so that it looks like this:

```js
var paragraphA = document.getElementById("a");
paragraphA.onclick = function(evt) {
  this.style.border = "1px solid black";
};
```

More succinctly we could write:

```js
document.getElementById("a").onclick = function(evt) {
  this.style.border = "1px solid black";
};
```

Notice that we're using `this` inside our callback and `this` corresponds to the element that is broadcasting the event.

Let’s modify that code so that the click removes the border if it’s there and adds it if it’s not:

```js
document.getElementById("a").onclick = function(evt) {
  this.style.border = this.style.border ? "" : "1px solid black";
};
```

We can do one better. Dom manipulation allows us to add and remove classes to elements. Let’s set up a separate css class to encapsulate our border styling and then toggle that class using dom manipulation.

We'll need to add a style defintiion to our document's head:

```html
<style type="text/css">
  .bordered {
    border: 1px solid black;
  }
</style>
```

And modify our javascript accordingly:

```js
document.getElementById("a").onclick = function(evt) {
  this.classList.toggle('bordered');
};
```

Javascript proviedes a large api for manipulating the dom, but there is a signifant problem with writing dom manipulation directly with javascript: Different browser implement the javascript spec differently. We would need to perform browser detection and fork for those differences in our code anywhere we wanted to change the dom.

Fortunately we have a library that abstracts those differences for us and provides a unified api for manipulating the dom.
