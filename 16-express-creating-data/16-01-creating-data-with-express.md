Node and Forms: Creating Posts
===================================

In the previous chapter we saw how to access data that is already in a mongo database. We saw how to set up route handlers for viewing a list of posts, viewing a single post and viewing the edit form for a post. We've tackled the R in CRUD, *retrieve*, but we don't have a way to create data, update it or delete it.

This chapter will focus on creating new data. The next chapter will address updating existing data and deleting data. These methods all share the same approach but the topic is large enough to be broken up into separate chapters.

Modifying data on a server is a complex topic that involves forms, form fields, encoding form fields into http request bodies, form methods and actions, and multiple routes. We'll see that creating data is a two step processing that requires two http requests, the first to get the form for creating a new post and the second to actually send the data from the form to the server.

We'll also learn about redirection and how to show a *flash message* that lets a user know they successfully created a new post. Such a simple addition requires a suprising amount of work because of http's stateless nature and the use cookies and session management to persist information across requests. The necessary introduction to sessions will help prepare us for our final chapter on adding users and user authentication.

## References

[HTML Forms Guide](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms)

Mozilla's MDN guide to forms

[Bootstrap Forms](http://getbootstrap.com/css/#forms)

Twitter bootstrap's form documentation

[Representational State Transfer](http://en.wikipedia.org/wiki/Representational_state_transfer)

Wikipedia's entry on RESTful resources and routing

[HTTP Cookie](http://en.wikipedia.org/wiki/HTTP_cookie)

Wikipedia's entry on cookies

## Template

Once again you have the option of working from your own application project or building from a lesson template. The template for this class is available in the template folder in this repository. Clone the repository and `cd` into its *template* directory, where you'll find the application code. In that directory be sure to install the required node packages:

	$ git clone https://github.com/okcoders/node-creating-data-class.git
	$ cd node-creating-data-class/template
	$ npm install

If you're on a Mac or Linux machine you'll also need to create a *db* directory for the database and populate it with some test data. Start the mongodb server with:

	$ mongod --dbpath db

On a windows machine locate the *mongod.exe* file from the MongoDB download and run it to start the server daemon.

If you need help setting up your database, refer to the [Introduction to MongoDB](https://github.com/okcoders/intro-mongodb) lesson material.

## Forms

HTML forms are composed using the `form` tag. By itself the form tag doesn't do much. Instead it will contain a number of form elements such as text fields, password fields, drop boxes, text areas and so on with tags like `input`, `textarea`, `select` and `button`.

The form will then be responsible for submitting data from the form fields to a particular url using a paticular http request method, either `GET` or `POST`. We'll design the form so that the data sent matches the data that our server expects when creating a new database document such as a post or comment and so that the url matches the route handler for that operation.

Forms are a cumbersome topic in html and often ugly and tedious for users to fill out. Fortunately we'll have some help with their generation and styling from twitter bootstrap.

Bootstrap provides styling for every form element. Visit [getbootstrap.com/css/#forms](http://getbootstrap.com/css/#forms) to see the options. Bootstrap provides a number of styling options but they all follow a similar pattern: a `div` with class `form-group` will wrap around a `label` and some kind of form field such as an `input`.

For more information about creating forms with twitter bootstrap, revisit the lesson material from the [bootstrap class](https://github.com/okcoders/bootstrap-class).

## Creating Data: Putting the C in CRUD 

Creating a new blog post is a two step process. First the user will request the form for creating a post. The `GET /posts/new` route will handle the request and respond with a rendered html form. That form includes a submit action that sends a request to `POST /posts` with the form's data. The route handler for that path accepts the data and uses it to create a new blog post in the database.

**Preparing the form**

The router handler for `GET /posts/new` in `routes/posts.js` renders the form for creating a new blog post. Right now the route handler is straightforward:

```js
router.get('/new', function(req, res) {
  res.render('posts/new');
});
```

This works, but a common practice is to actually create a new model object and render that rather than just render an empty form. We have a `Post` mongoose model. We can create a new *instance* of a `Post` object with the `new` keyword:

```js
new Post()
```

We briefly discussed this syntax when we looked at arrays and objects earlier in the book and saw that it was possible to create a new array or object either literally or through the use of the `new` keyword:

```js
// these two are the same:
var array = new Array();
var array = [];

// as are these two:
var obj = new Object();
var obj = {};
```

We can do the same with a `Post`. Let's create a new instance of a `Post` and pass that to the render function as `post`. Remember that you send variables to an view via a javascript object and its named properties:

```js
router.get('/new', function(req, res) {
  var post = new Post();
  res.render('posts/new', {post: post});
});
```

Note that the new empty post is never saved to the database. It exists only in the application and disappears as soon as this request is handled.

In `views/posts/new.ejs` we can now modify the form to insert the title and body of the newly created, empty post. For the title set the `value` attribute on the text input and for the body insert it between the opening and closing tags of the text area:

```html
<input type="text" class="form-control" id="title" placeholder="Post Title" value="<%=post.title%>">
<textarea rows="12" class="form-control" id="body" placeholder="Post Body"><%=post.body%></textarea>
```

What is the advantage of sending a new, empty post and rendering it rather than simply rendering an empty form? There are at least two: default values and re-usability.

We'll see in just a moment that mongoose allows us to define default values for the properties on a new document. For example if we wanted every new post to be titled "Untitled" or have "Lorem ipsum" for the body. By specifying the default values on the model where they belong and then rendering the new model object, we don't have to worry about also adding them to a new empty form manually.

By rendering an empty object we might also be able to re-use view components. It turns out that the form for creating a new object and editing a new object are identical. So why create two separate forms? Some templating systems allow us to create *view partials* which are re-usable view components that can be included in other views. We could create a single partial that renders the form with a post model object and then include it from the new and edit views. Unfortunately the templating system we're using, EJS, doesn't support this.

We will, however, take advantage of default values.

**Mongoose Default Values**

We've seen that mongoose allows us to define a schema for our model from the application itself rather than from the database. Right now our post schema only specifices a post's attributes and their types, but mongoose also let's us set default values, automatically apply simple data transformations, and perform validation and error checking on the attribute values.

We're going to take advantage of default values right now. In `models/post.js`, replace:

```js
var schema = mongoose.Schema({
  title: String,
  body: String,
  author: Number
});
```

with:

```js
var schema = mongoose.Schema({
  title: {type: String, default: "" },
  body: {type: String, default: "" },
  author: Number
});
```

Mongoose schemas allows us to specify more than an attribute's type, such as `String` or `Number`. We can also specify a default value when a new model object is created. We must, however, still be able to specify the type, which means we need to provide two pieces of information for a single property. We'll use a nested javascript object to do this.

Instead of simply setting `title: String` set the `title` property to a javascript object and give that object a `type` property and a `default` property. The value for type will still be `String` and for default it can be whatever default value we'd like. An empty string will work. Do the same for the `body`.

Now whenever a new post is created its title and body will automatically default to an empty string. Change the default values and test the new post route to see the effect.

**Connecting the form to a route**

We've finished the first step of creating a new post: create a new, empty post and render a form with it. The second step involves getting the form data to the application and inserting a new post into the database.

The route `POST /posts` is responsible for accepting form data and actually creating a new post in the database. We need to point the new post form at that route.

When a form is submitted the browser generates a new html request. We can tell the browser what kind of request to generate and what url to use. By default the browser uses a `GET` request at the page's current url, but we can add `action` and `method` attributes to the form's html tag to change that.

In `views/posts/new.ejs` modify the form tag to use `POST` for its method and to point its action to the `/posts` url:

```html
<form role="form" action="/posts" method="post">
```

Be careful not to confuse the method with the action. By chance because we're building a blog our action point to a `/posts` url, but the method describes the http method this form should be using, such as `POST`, `GET`, `PUT`, or `DELETE`.

Restart the server and refresh the new post page and create a new post. We get a blank page back with the message "creat post". This is the template we've set up in `routes/post.js`, where the route that handles this http request is simply:

```js
router.post('/', function(req, res) {
  res.status(404).send('create post')
});
```

We've confirmed that our form is sending a url request to `POST /posts`, now let's make sure it's sending the form data as well.

**Sending form data to the server**

When you submit a form in a web page the browser builds a body for the http request that contains the form data.

Recall that the body of an http request is just its content, as opposed to the header which contains information about the request. Normally we only think of a response from the server as having a body, namely the actual html sent back, but when we want to send data to a server we also use the body.

We can see the request body from the server by logging the `req.body` object in the route handler. Add that to the `POST /posts` route:

```js
router.post('/', function(req, res) {
  	console.log(req.body);
	res.status(404).send('create post')
});
```

Restart the server, visit the page and submit a new post. Nothing is showing up in the console. That's because right now our form doesn't know how to encode the form fields into the request's body.

The browser builds the request body from a form by using the `name` attributes on each of the form's elements, that is, html components like `input`, `textarea,` `select` and so on. For the browser to actually send data these elements must be named.

Name a form element by adding a `name` attribute to its tag. We should use names that match the model's attributes. We'll see why in a moment. Add `name` attributes to the two form fields:

```html
<input type="text" class="form-control" id="title" name="title" placeholder="Post Title" value="<%=post.title%>">
<textarea rows="12" class="form-control" id="body" name="body" placeholder="Post Body"><%=post.body%></textarea>
```

Notice that the name for the title field is "title", which matches the name of the title attribute on the Post model. Likewise for body.

Also notice that we have both `id` and `name` attributes on our form fields. The `id` attribute is used by our own javascript and css selectors while the `name` attribute is used by the browser when composing the form's http request body. The `id` can be whatever we like but the `name` should conform to the server's expectations, and our server wants a `title` and a `body` that it can create a new post document from.

Revisit the `/posts/new` page and resubmit a form with new data. Notice that the `req.body` now contains a title and a body property:

	{ title: 'foo', body: 'bar' }

We can also see this information being sent from the browser. Open up Chrome's developer tools and click on the network tab. Visit the `/posts/new` page and submit a new post. You'll see a "posts" event occur, which you can examine by selecting it. In the headers section scroll down to Form Data, where you'll see the form fields being sent as name-value pairs to the server. As raw data it looks like:

	title=foo&body=bar

How does our form data, which is just sent as plain text from the browser to the server get converted into a nice looking javascript object on the `req.body` property? In the main *app.js* file you'll see that Express included the `body-parser` package and activated it with:

```js
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
```

The body parser package is middleware which, like all middleware, examines an http request before it reaches your application's route handling code. This particular middleware examines the request's body and if it includes json or url encoded data parses it and creates the nicely formed javascript object in `req.body` for us.

**Inserting a new post into the database**

We now have a form for creating a new post and a way to get the form data to the server. It's now time to actually create a post in the database with that data.

We already know how to create a new object in a mongo database. From inside the client we use the `db.insert` command and pass it a javascript object with the attributes we'd like to store to the database.

From node, mongoose provides a similar method on the `Post` object. It's the `create` method and it is available on any mongoose model. Like the corresponding database command it takes a javascript object with the attributes we'd like to store.

Well, we have a javascript object with just those attributes we want in the `req.body` property, and we have a method for creating a new mongo document from a javascript object. Which means we can simply call `Post.create` and just give it `req.body`.

*This works because the form field names match the model's property names.*

Insert a new document into the database with `Post.create`. It takes an object of attributes and a callback function with an error and results parameters.

Replace the previous `POST /posts` router code with:

```js
router.post('/', function(req, res) {
  console.log(req.body);
  res.status(404).send('create post');
});
```

with:

```js
router.post('/', function(req, res) {
  Post.create(req.body, function(err, post) {
    if (err) {
      console.log("db error in POST /posts: " + err);
      res.render('500');
    } else {
      res.send('created new post: ' + post);
    }
  });
});
```

As responsible programmers we account for both the happy and sad paths. First check if an error occurred and if so log it and render the error page. Otherwise, let the user know we created a post.

Restart the server and submit `/posts/new` with data. You should receive the success message. Visit `/posts` to see the data you just inserted!

**Redirecting**

Redirecting is a way for a server to send a browser's request for one url to another url. The server actually generates a response to the browser for url A that tells the browser to try url B instead. The browser then generates another request for url B and the server sends the resource at that location. 

A common practice in a web application is to redirect to a new object's page after creating it. Rather than the `POST /posts` route generating its own html response, it redirects to `GET /posts/:id` for the new post so the user sees the post they just created.

The new mongoose object provided in the `Post.create` callback will have an `id` parameter that we can use to generate the route, and express supports a `res.redirect` method that takes a url.

To add the redirect, replace:

```js
res.send('created new post: ' + post);
```

with:

```js
var url = '/posts/'+post.id;
res.redirect(url);
```

All we're doing here is building a url for `/posts/:id` that corresponds to the newly created post and then redirecting the browser to that page. Restart the server and create another post to see the redirection in action.

## Flashes

The redirection to a new post's page immediately submitting the form for creating it makes sense but is also jarring. It may not be immediately apparent to the user that they are now looking at the post they just created. It's not even apparent that the post was created at all.

Another common practice in web application development is to *flash* a message whenever an operation completes or fails on the server. Flashes commonly appear when a user creates, updates or deletes some data or when they log in. This *flash message* is just a way to let the user know what happened and especially whether their action succeeded or failed.

The difficulty with a flash is that we need the message to persist across multiple http requests, and http is a stateless protocol.

**Stateless protocol**

According to the original specification, an http request does not carry any information with it about any previous request that came from that browser. A user visits url A and then visits url B. The server has no idea that the browser visiting B is the same browser that just visited A. That information is not conveyed in the request.

*Essentially a request is a one-off message from a browser to a server, and a response is a one-off message back from the server to the browser.*

This is a problem for flashing a message about creating an entry because we redirect from the url request `POST /posts` to the url request `GET /posts:id`, and the server has no idea that the second request comes from a browser that just made the first one. It has no idea that it is showing the post's page *because* the post was just created. The fact that the two requests are related is lost by the http protocol.

**Cookies**

Cookies change this. A cookie is a small piece of data sent by the server in response to a request. If cookies are enabled on the client's computer, the browser will then send that small piece of data to every following request to the same server.

With a cookie the server has a way of tracking a particular browser. The cookie could include a bit of data that identifies the last page that was visited -- which would be useful in our case -- or it could just include a unique identifier which is keyed to a database that tracks every single page the user has visited on the site.

Because the browser is sending the same cookie with every request to the server, and so the same bit of data, the same key, the server can simply add an entry to a database associating each request with that key.

**Sessions**

This combination of unique identifier set in the cookie and a database on the server associating the unique identifier to other information is known as a *session*. Now the server can look up the cookie data in the database and get information about the browser.

For example the server could associate a particular user with a particular browser via the brower's cookies and know if that user is logged in. We'll learn more about this in a later chapter.

It turns out that we can also associate a flash message with a cookie so that a second request can check to see if the first request set a flash message, and if it did, display it and then clear the message so that future requests don't also see it. Which is exactly what we're going to do using a piece of middleware known as `connect-flash`.

**Middleware: connect-flash**

Handling cookies, sessions and then some kind of data storage just so that we can let a user know they successfully created a new post is a lot of additional, if necessary, work. Fortunately all of the supporting code needed to make this possible has been extracted into a package called `connect-flash`.

Let's install `connect-flash`. This particular package also requires that we activate sessions, so let's install `express-session` as well. At the terminal in the root folder of your application's project type:

	$ npm install express-session --save
	$ npm install connect-flash --save

Then in *app.js* require in the two packages and tell express to use them. Place the call to use after the call to use the cookieParser:

```js
// near the top
var session = require('express-session');
var flash = require('connect-flash');

// ...

// already here:
app.use(cookieParser());

// add these lines:
app.use(session({secret: 'secret', resave: true, saveUninitialized: true, cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(function(req, res, next) {
  res.locals.message = req.flash();
  next();
});
```

Don't worry too much about what the session middleware is doing. We'll discuss it in greater detail in later chapters. More importantly is that we understand what the flash does and what the custom middleware after the flash is doing.

First we simply activate the flash. The flash will let us associate a message with a browser request which is then available on the next request from that browser. More importantly we include custom middleware that pulls the flash message on the second request using `req.flash()` and attaches it to the `res.locals.message` variable.

**Getting the message to the view: res.locals**

`res.locals` is a javascript object whose properties are available from a view template. Normally only the information that is passed to a view via the `res.render` function is available to a view. Anything else is unavavailble, including for example `req.flash`. But we need a way to get the flash message to the view where we'll render it. `res.locals` makes this possible. Anything attached to `res.locals` will be available in any view.

Here, the flash message from a previous request is being made available to the `message` property on `res.locals` so that any view template will now have access to a `message` variable that contains whatever was in `req.flash()`.

**Set the flash**

With the session and flash middleware active and the flash attached to `res.locals.message` we can now store flash messages in the route handler for one request and access them from the view that is being rendered in another request. 

First let's set a flash when the user creates a new post. In the `POST /posts` route handler set the flash on the `req` object before redirecting. The flash takes two arguments, a name that can be any string and the message itself:

```js
req.flash('success', 'A new post was created');
res.redirect(url);
```

The text "A new post was created" will then be available on the `message` object (from `res.locals.message`) in a view in the next request. That `message` object will contain any flash messages by name, so for example, the above code will set a flash in `messages.success`. It is then the responsibility of our views to check for the existence of a flash and render it.

**Render the flash**

Update `views/posts/show.ejs` to check for `messages.success` and render it with a bootstrap alert styling if it exists:

```html 
<% if (message.success) { %>
  <div class="alert alert-success" role="alert">
    <%=message.success%>
  </div>
<% } %>
```

You could place that code anywhere in the html body. I am placing it immediately above the template code for the post.

Restart the server and create a new post again. You should now see a success message. When you refresh the page the message disappears.

**Summary**

Cookies, sessions and flashes are a complex topic. We need a way to persist information from one browser request to another (from creating a new post to viewing it after a redirect), and we need a way to make the message available to the view so that it can be rendered in html when only data from the `render` function is normally available. The combination of the express-session and connect-flash middleware and custom code to make the flash available on the `res.locals` object, which is always available from any view, makes this possible.

We'll revisit cookies and sessions when we add users and user authentication to our application.
