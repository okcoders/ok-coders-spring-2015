Rendering and Templates
==============================

We've seen how routing alows us to bypass static web pages and send a url request to code in our application. We've also seen how variable routes allow the same block of code to handle multiple requests that all have the same url format, for example `/posts/:id`.

As with routes, we'll often want the same html to be used in a particular response, although with small differences. We'll want our response to be *dynamic*. We can't use static html for this. Static html, like the html in the *public* directory, has no simple way of making small changes to it from within our application's code.

Rendering and templates solve this problem. They allow us to re-use mostly static html while injecting the content that changes into it. In addition we'll be able to run some javascript inside the html, all on the server, to further control how our dynamic content is embedded in the surrounding static html.

It's time to combine the html and css we learned earlier with the javascript we've been learning since.

## References

[EJS GitHub Page](https://github.com/visionmedia/ejs)

## The Problem

Let's understand the problem rendering and templates solve for us by trying to build a web page without them. Create a new express application:

	$ mkdir html-test && cd html-test
	$ express

Examine the *app.js* file. We've already seen how to write routes and how to respond to requests with html. Create a new route handler for the `/heartbeat` path and use the `send()` function on the `res` object to send back an html response

```js
app.get('/heartbeat', function(req, res) {
    res.send('Hearbeat');
});
``` 

Test the application to ensure it's working.

Imagine we want to build up an entire html page and not just the body, but we also have some variable data that depends on what url the user is visiting. The title of the page might change and the body will likely be different:

```js
var title = "Hearbeat";
var body = "The heartbeat page is alive";
```

How can we compose this variable data into otherwise static html, like the head and body? We could try stringing it together and sending that back

```js
app.get('/heartbeat', function(req, res) {
  var title = "Hearbeat";
  var body = "The heartbeat page is alive";
  var html = "<html><head><title>" + title + "</title></head><body>" + body + "</body></html>;
  res.send(html);
});
```

But that's pretty much a disaster no matter how you try to build that html string. Imagine trying to do this with more complex html such as the template for a twitter bootstrap page.

An alternative would be to store the html in a separate file and somehow inject the variable data like the `title` and the `body` into it. We'd need a separate folder for this html because we can't use the public directory (why not?), and we'd need some special format so that the html can include placeholders for the variable data.

Templates behave very much like this, and rendering connects our code to them.

## Introduction to Templates and Rendering

Templates are a combination of static html and special syntax indicating where javascript code should be run. There are a variety of templating systems supported by node. The default is called *jade* which uses a syntax fairly different from html. We'll be using a more straightforward templating language called *ejs*, or *embedded javascript* templates for node.

A template solves our problem because it is composed mostly of static html. In fact an ejs template file will largely look like a normal html. But embedded in it we'll find text like:

	<%= title %>
	<% if (comments.length > 0 ) { %>
		<a href="#">View Comments</a>
	<% } %>

This text, especially the templating syntax `<% ... %>` and `<%= ... %>` or *tags* tells the templating system to run javascript code in between all the normal html or simply to inject the value of a javascript variable.

Let's examine a basic ejs template file to see how this works. Generate a new express application but this time tell express to use ejs templates instead of the default jade templates. Pass the `--ejs` option to the `express` command:

	$ mkdir ejs-test && cd ejs-test
	$ express --ejs

( Read more about the express generator and optional arguments at the [http://expressjs.com/guide.html](Express Guide) )

Open the directory in Sublime and look at the *index.ejs* file in the *views* directory. By default node keeps all its templates in the *views* directory:

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
  </body>
</html>
```

The file is basically html but includes `<%= title %>` in a number of places. This is that special syntax that tells the templating system to inject the value of some `title` variable into the html at that point. We'll see where that variable is in a moment.

Run the express application and visit `/` in the browser. Node is responding with this ejs file, but everywhere we see `<%= title %>` in it, the word `Express` appears instead.

The process of converting javascript variables and code in an html template into html itself is called *rendering*. Node has built-in support for rendering with a *render()* function on the response object.

Examine the *index.js* file in the *routes* folder. Recall that we know this file is used for subpaths on the main `/` path because of the `app.use('/', routes)` call in *app.js*.

Look at the callback code for the single route in this file, with additional whitespace added for clarity:

```js
res.render('index', {
	title: 'Express' 
});
```

The callback only has one line of code in it, a call to the `res.render()` function. This is the function that connects application variables to template files, that combines the dynamic and static parts of a webpage.

`res.render()` takes two arguments. The first is the name of a template file found in the *views* directory. The second is a javascript object literal whose named properties will be made available directly to the html template. Here our object literal only contains one property, a `title`, with the value `'Express'`.

The templating engine responds to the call to `res.render()` by finding the ejs file, reading it and running the javascript code in it marked off by the special `<% ... %>` tags. Each of those tags are ultimately replaced with html, after which the `render` function sends the response back to the web browser like the `send` function.

Let's modify this call and the template to get a better feel for how rendering works. First change the value of `title` to something else, say `'Express Homepage'`:

```js
res.render('index', {
	title: 'Express Homepage' 
});
```

Visit the root path `/` again. Because we've modified an application file we'll need to restart the server first. Notice the page now has *Express Homepage* where *Express* was before.

Let's make another variable available to the template. Any properties defined on this object are available by name in a template file. To make another variable available simply add it to the object:

```js
res.render('index', {
	title: 'Express Homepage',
	body: 'Welcome to the express homage'
});
```

Now in the template file *index.ejs* reference the `body` property by name. Modify the template so that the body appears in a paragraph instead of the harcoded "welcome to ..." text:

```
<body>
  <h1><%= title %></h1>
  <p><%= body %></p>
</body>
```

Pay special attention to the syntax with all the angle signs, percent signs and equal signs. We've put exactly `<%= body %>` in between the paragraph tags.

Restart your server for the changes to take effect and view the page once again in the browser. Both the `title` and `body` are now being dynamically generated by our application code instead of being hardcoded into the static html.

## The Render Function

Rendering combines dynamic data from our application with static html saved in a file on the server, one which normally resides in the *views* folder. Rendering is performed via the render function.

We'll always call the render function as part of the callback code in a route. For any template you want to render, then, you'll need to create the template file in the *views* directory, add html and special template syntax to it, set up a route to handle a specific url, and in the callback for that route render the template.

Although node supports many templating engines, the `res.render()` function will always be the same. Provide the name of the template you want to render and pass in a javascript object of named properties you want available to the template. That object can be as complex as you like, with nested arrays and objects all of which will be available in the template.

**Examples**

```js
res.render('index', {
  title: 'Express Homepage' 
});
```

```js
res.render('about', {
  nav: 'about',
  page: {
    title: 'Express Homepage',
    body: 'Welcome to the about page'
  }
});
```

```js
res.render('posts/index', {
  posts: [
    {
      title: "Building a blog in node",
      author: "OK Coders",
      body: "..."
    },
    {
      title: "Understanding node templates",
      author: "OK Coders",
      body: "..."
    }
  ]
});
```

`res.render()` may work the same no matter what templating engine you use, but the syntax for each engine will be different.

## Inserting Values

EJS uses special tags to mark where the value of a javascript variable should appear or where javascript code should be executed. We can say that ejs supports a number of operations. The most basic operation in ejs is the insertion operation. It looks like:

**Insertion Syntax**

	<%= ... %>

In a way this looks like an html tag. It begins and ends with the angle brackets like other html tags, but immediately attached to both brackets is a percent symbol `%`. This combination identifies it as ejs syntax instead of html syntax. The templating engine knows that it should do something at this point instead of just letting that code appear in the final html.

The addition of the equals sign `=` to the tag opening tells ejs that you want to insert the value of a javascript variable here. To make the insertion simply provide the name of a property on the javascript object sent to the template by the render function, for example `title` or `nav` or `page.body` considering the examples above:

	<%= title %>
	<%= page.body %>

The objects inside the ejs tag are fully fledged javascript objects, which means that you can execute code on them. EJS inserts whatever value that code evalutes to, for example:

	<%= title.toUpperCase() %>

No semicolons are necessary because these are not statements but just expressions that will resolve to a value.

The insertion operation automatically *escapes* any value that will appear in the html. Escaping adds characters to the text in place of lettes and symbols that have special meaning in html.

For example, it is not possible to display the less than symbol `<` in html by itself because that symbol is significant in html: it represents the opening of a tag. An html parser will interpret the presence of `<` as the start of an html tag instead of as a part of a mathematical equation, for example. To show the `<` symbol by itself in html you must escape it with the sequence `&lt;`. EJS insertion with `<%= ... %>` automatically takes care of this.

In some cases you may not want to automatically escape special symbols. For example you might actually be inserting html into the template and not just text. To do this you must use a different ejs tag to disable escaping. Replace the `=` symbol in the tag with a `-` dash.

**No Escape Inertion Syntax**

	<%- ... %>

Otherwise the tag behaves the same way.

In practice you will almost always use the autoescape syntax.

## Conditional Expressions

We can do more than just insert variable data into a template. EJS also supports conditionals in a template and looping.

Recall that a conditional is just an `if` statement that executes one or another branch of code depending on the value of a condition. In many cases we may want to insert html only if some value is available in the template or only if some value is true. The information that appears may be static html or it may be variable data.

Conditions are introduced with the execution tag:

**Execution Syntax**

	<% ... %>

Notice that the tag doesn't contain an equal sign or a dash. Any code that appears between the opening and closing symbols will be executed.

If it is a conditional that appears here, the condition controls whether the following html appears in the final output or not.

Let's see an example. Imagine calling the render function with an object that contains an `admin` property. The admin property is a boolean that is either true or false. If the user is an admin, the page should indicate that:

```
<% if ( admin ) { %>
	<span>You are an administrator</span>
<% } %>
```

The syntax is starting to look strange. The trick is to remember that any javascript code must appear inside a `<% ... %>` tag.

Here, for example, we want an if statement, and that if statement inclues the opening curly braces:

	<% if ( admin ) { %>

When the if statement is true then the final html includes the span content which it wraps, otherwise not:

	<span>You are an administrator</span>

We started with an if statement with an opening curly braces, so we must close the curly braces for it to be valid javascript. But a closing curly braces is itself javascript, not html, so the final line must include the ejs execution syntax:

	<% } %>

It's worth saying one more time:

**Any javascript code must appear inside a `<% ... %>` tag**

The conditional statement can then be as advanced as we like and controls the final output of the html as you would expect it to. For example:

```
<% if ( admin ) { %>
	<span>You are an administrator</span>
<% } else { %>
	<span>You are not an administrator</span>
<% } %>
```

Practice this syntax. Create a template file in the *views* directory or modify an existing one. Add html and ejs to it. Create a route in the application to handle a request at a certain url. In the route callback render the template, including an `admin` parameter on the object.

For example, imagine I've created an *admin.ejs* file in the *views* directory with the following content:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Admin</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    <h1>Administrator Check</h1>
    
    <% if ( admin ) { %>
      <span>You are an administrator</span>
    <% } else { %>
      <span>You are not an administrator</span>
    <% } %>
	
  </body>
</html>
```

Then I can set up a route in the *routes/index.js* file for the `/admin` path that renders this template:

```js
router.get('/admin', function(req, res) {
  res.render('admin', {
    admin: true
  });
});
```

Changing the value of `admin` from `true` to `false` produces different html output. Confirm all this by restarting your server with each change and visiting the `/admin` page in the browser.

It is also possible to insert dynamic data based on the result of a condition. However, you must use the insertion syntax on a separate line. Insertion cannot be combined with execution, as an execution tag in ejs never outputs a value. For example:

	<% if ( admin ) { %>
     <%= admin.message %>
	<% } %>

Be careful here, because the following bit of code or some variation on it won't work:

	<% if ( admin ) { admin.message } %>

Keep in mind a second rule for ejs templating:

**Variable data can only appear in the final html using a `<%= ... %>` tag**

## Looping

We can also loop through data in the template, causing a block of html to appear many times in the page. That block may include the insertion syntax for small changes through each iteration.

Looping uses the same execution syntax as conditional expressions, but the code inside the ejs tag changes. Typically we'll have an array and we will loop through it using the `forEach` array function. If `foo` were an array:

	<% foo.forEach( function(item) { %>
		...
	<% }) %>

Again be careful with the syntax. It's like we're breaking up a normal javascript function into many `<% ... %>` chunks and we must be sure to close each opening parenthesis or braces correctly.

Looping might be useful, for example, when we have a front page for a blog where we want to show the top ten posts. Let's implement something like this.

In the route callback a database operation might first retrieve the posts and store them in an array. Each post includes a title, author and body in the form of a javascript object. We then pass that array of posts to the render function as we normally would. It might look like:


```js
router.get('/posts/index.html', function(req, res) {
  
  // normally pull posts from database, here is temporary data
  var posts = [
    {
      title: "Building a blog in node",
      author: "OK Coders",
      body: "..."
    },
    {
      title: "Understanding node templates",
      author: "OK Coders",
      body: "..."
    }
  ];

  res.render('posts/index', {
    posts: posts
  });
  
});
```

In the *posts/index.ejs* file we want to loop through each object in the posts array and insert some bit of html for it. Our html for that page could start with:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Posts</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
  </head>
  <body>
    
    <% posts.forEach( function(post) { %>
      <h3>Post Title</h3>
      <span>Author</span>
      <div>Body</div>
    <% }) %>
    
  </body>
</html>
```

View the page after restarting the server and you'll see that the content

```html
Post Title
Author
Body
```

appears twice, once for each post from the call to render.

Now each pass through the `forEach` loop makes one of the post objects available in the `post` variable. We know this object has `title`, `author` and `body` properties and so we can insert those values into the html instead of using placeholders:

```html
<% posts.forEach( function(post) { %>
  <h3><%= post.title %></h3>
  <span><%= post.author %></span>
  <div><%= post.body %></div>
<% }) %>
```

Restart the server and refresh the page to see the changes.

All together, insertion, conditionals and looping allow us to construct dynamic web pages easily without straying too far from basic, static html.

## Advanced Functionality

The ejs template system supports two other features which we won't be discussing in this class but are potentially useful, *filters* and *includes*. For more information refer to the [EJS GitHub page](https://github.com/visionmedia/ejs).

## MVC

*Model-View-Controller* (MVC) is a software architectural pattern that separates applications into three distinct but still connected parts: models, views and controllers. Typically the parts are kept in different files and their interdependencies kept to a minimum so that it is easy to change one without affecting the others. 

Models refer to the data model portion of the application. So far we've only used dummy data in the form of arrays and objects but in upcoming chapters we'll look at modeling more closely.

Views refer to the application's user interface. For a web application that means the html that is ultimately generated. Views in an express application use templates and rendering to produce the final html. Notice how the templates are separate from the javascript files, though. We don't just mix a bunch of text into a router files.

Controllers refer to the mediating code in the application that connects the models to the views. Routes act like controllers in a node application. They accept requests, pull data from a database or other location, and then make that data available to the views for rendering. Any actions that are generated from the views, for example a `POST` request, will be addressed by a controller which may in turn update the database. We'll see this in upcoming chapters as well.

Our express application uses something like the MVC design pattern with data, routes and templates. This architectual patterns is common in many programming environments, and although it appears in different guises, it always makes the same suggestion: keep your model, view and controller code separate and limit the dependencies between them. And that is just what we are doing.

For more information about MVC refer to [Wikipedia on MVC](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)