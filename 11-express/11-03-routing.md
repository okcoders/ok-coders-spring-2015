Express: Routing
==============================

The express web framework makes it easy for us to target specific http requests with the appropriate responses.

When a request reaches our web server it includes information such as the request action (GET, POST, PUT, DELETE), the requested resource in the form of a url, and additional headers as well as any body content. Normally we would need to parse that information manually and, using application logic, ensure that the correct response is generated.

For example we could parse the action and url to see that the request wants to `GET` the `/pages/about.html` resource and so return the document located in the server's `public` folder at the location. Or we could see that the requests wants to `POST` to the `/blog/posts` and contains body data and so create a new blog post with that data and return a redirection to the newly created resource.

Express provides facillities for ensuring that the right part of our application responds to the right requests without having to manually parse everything. This is called *routing*.

Routing allow us to specify an action and a url path that will match against incoming requests. We also provide a callback for custom code that is executed any time someone makes a request that matches that action and url. In our callback we'll be able to access additional information in the url as well as any request headers easily and we'll be able to formulate a response to the request with very little work.

Today's class is our first real introduction to express, which we've been using since day one. We will focus on the *app.js* file and those in the *routes* folder.

## Resources

[Express](http://expressjs.com/)

The Express homepage. Particularly important are the Guide and API Reference.

[Ruby on Rails Routing](http://guides.rubyonrails.org/routing.html)

Rails is another web application framework like Express but for the Ruby programming language. Not all of the information in its routing documentation applies, but you'll see definite similarites.

In the end, every web application needs to do the same thing: handle requests and generate responses.

## Basic Routing

Basic express routing is straightfoward. Begin by creating a new express application. Create a new directory, cd into it and template a new project:

	$ mkdir express-test
	$ cd express-test
	$ express

Don't forget to install the application dependencies and then start your application to make sure it's working:

	$ npm install
	$ npm start

You should be able to visit *http://localhost:3000/* to view the web application. Futue path references in this chapter will always refer to your localhost:3000 server.

Let's modify the code to add a few basic routes. Add all following code in this chapter between these two lines in the *app.js* file:
	
```js
// this line is	already here
app.use(express.static(path.join(__dirname, 'public')));

// make space and add your code here
...

// this line is already here
app.use('/', routes);
```

To add a route, call a function on the `app` object that corresponds to the http action you want to address and provide two parameters. The first is the path on your server for that resource and the second is a callback that itself takes two parameters: the request object `req` and the response object `res`. This callback will be called anytime someone makes a request to your server with that action and that path:

```js
app.get('/heartbeat', function(req, res) {
    res.send("Application Heartbeat: the application is running");
});
```

Because we've modified the application itself we must restart the server to see the changes. Ctrl-c `^C` to quit the application and start it up again with `npm start`. 

In this example we are targeting `GET` requests to `/heartbeat`, so browse to *http://localhost:3000/heartbeat* and you should see the response you've specified.

Notice the use of the `res.send` function to actually generate the server's response. This replace the use of 

```js
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end("Unable to read file index.html\n");
```

that we saw with the `http` module. We'll learn more about generating responses in the chapter on rendering.

We can of course specify more complex routes, for example routes with subpaths. Use the same format but modify the first parameter to the `get` function to target that resource:

```js
app.get('/heartbeat/format/index.html', function(req, res) {
    res.send("HTML: Application Heartbeat");
});
```

Here we are targeting a `GET` request to `/heartbeat/format/index.html`, so once again restart your server and browse to that url on localhost:3000.

Even with just a few examples we can already see how routing allows specific parts of our application -- functions in the form of callbacks -- to respond to specific requests.

We can respond to other types of requests as well. Respond to a `POST` request with the `post` function:

```js
app.post('/heartbeat', function(req, res) {
    res.send("Cannot post to heartbeat");
});
```

Notice that we are using the same url twice, once for the get and once for the post. A request is identified by its action and its path together. `POST /heartbeat` is not the same as `GET /heartbeat`. Although they are the same path they are different requests. Modern web application make use of this fact to organize their service in a [RESTful](http://en.wikipedia.org/wiki/Representational_state_transfer) manner, which we'll learn about in future chapters.

Now we don't have a simple way of generating a POST request from a web browser. By default when you type a URL into a web browser it is always uses a get request. Normally you need to submit a form for the browser to generate a POST request.

Fortunately we can generate post requests with a free Chrome extension called *Postman - REST Client*. Install that extension in your Chrome browser and start it up.

To use Postman, enter a url and select the http action. We want `http://localhost:3000/heartbeat` and `POST`. You can also add url parameters and additional headers which we don't need now. Make sure your application is still running and send the request. Try switching the request to GET and resending it to see the result for a get request.

Postman is a useful tool that we'll use to test our web application as we develop it.

Finally it is worth mentioning that we could also respond to 'PUT' and 'DELETE' requests like so:

```js
app.put('/heartbeat', function(req, res) {
    res.send("Cannot put to heartbeat");
});
app.delete('/heartbeat', function(req, res) {
    res.send("Cannot delete heartbeat");
});
```

All we need to do is change the function we are calling on `app` to `put()` or `delete()`. Verify that these routes work using Postman.

## Advanced Routing

Often we'll want to respond to similar but slightly different requests with the same code, or we'll want to be able to respond to requests whose resources we can't identify in advance.

This happens when we want the same code to run for many resources of the same type that are stored in a database but have unique identifiers. For example, it would be useful if the following paths:

	/people/phil
	/people/okcoders

executed the same code because all that is different is the name of the person, and we can use that name to look the person up in a database. Each response, however, will basically return the same html page just with different details. 

Moreover we may not know the names of every person which exists yet because the application may allow new people to sign up. How can we specify a route for a resource which doesn't even exist?

**Wildcards**

Express allows us to include variables in our routing paths. The simplest variable is the wildcard `*` which tells express to match the wildcard to any characters as long as the rest of the path matches as well. This is easy to see with an example:

```js
app.get('/heartbeat/subpath/*', function(req, res) {
    res.send(req.url);
});
```

Using the wildcard `*`, express will now match any request for a resource as long as it begins with `/heartbeat/subpath/`. Beyond that it can contain anything else. All of the following paths match this request:

	/heartbeat/subpath/
	/heartbeat/subpath/index
	/heartbeat/subpath/index.html
	/heartbeat/subpath/foo/bar/baz.json

As always, to see this changes you save the file you're editing and restart the server.

**Named parameters**

More useful, however, are named parameters. Named parameters allow us to identify changes in a path around which the rest of the path remains the same. Then in our callback we are able to access the value of the variable portion. Named parameters are identified with a colon `:`.

Let's use a named parameter for our people path:

```js
app.get('/people/:username', function(req, res) {
	var username = req.params.username;
	res.send("You requested user " + username);
});
```

The path `/people/:username` allows the route to match any GET request with a path that looks like `/people/x` where x is a single additional component in the path (e.g. no additional `/`). For example the path will match:

	/people/phil
	/people/okcoders
	/people/phil.html
	/people/12
	/people/12?format=json
	/people/1234-5678-ABCD-EF90

But it will **not** match:

	/people/phil/more
	/people/phil.html/subpath

Then in the callback function express adds a `params` object to the `req` parameter which includes whatever named values the path specified. Access the value in the path by its name, so:

	req.params.username

Contains whatever text appears where
	
	:username

is in the path originally specified for the route.

Let's try another example:

```js
app.get('/blog/posts/:id', function(req, res) {
	var postID = req.params.id;
	res.send("You requested blog post " + postID);
});
```

This route will match any GET request for a `/blog/posts/x` where x is any single component, so paths like:

	/blog/posts/1
	/blog/posts/the-time-i-wrote-a-web-application
	/blog/posts/abcd

**Subpaths with named parameters**

We can use named parameters with subpaths. By default a named parameter only matches a single component of a path, the text between two forward slashes `/.../`, so we can add path information after the named parameter to further refine our matching. For example, you might want to be able to update a blog post or delete it with paths like:

	/blog/posts/1/update
	/blog/posts/1/delete	

But you don't want to execut the same code used for viewing the post. Refine the matched path simply by adding the additional path information after the named parameter. The path for the router will look like:

	/blog/posts/:id/update
	/blog/posts/:id/delete

Here's the code:

```js
app.get('/blog/posts/:id/update', function(req, res) {
	var postID = req.params.id;
	res.send("You want to update blog post " + postID);
});

app.get('/blog/posts/:id/delete', function(req, res) {
	var postID = req.params.id;
	res.send("You want to delete blog post " + postID);
});
```

Or perhaps our posts also have comments that we might want to view:

```js
app.get('/blog/posts/:id/comments', function(req, res) {
	var postID = req.params.id;
	res.send("You want to view the blog post's commments " + postID);
});
```

Save your files and restart the server to view your changes.

**Multiple named parameters**

A single route can match against multiple variables in the path, and in fact it is common to have multiple named parameters. For example, what if I wanted to view a specific comment attached to a specific blog post? The url must identify both the blog post and the comment. We need two named parameters:

	/blogs/posts/:postid/comments/:commentid

This is a totally acceptable path for express and we'll send it to the `get` function as we normally do:

```js
app.get('/blog/posts/:postid/comments/:commentid', function(req, res) {
	var postID = req.params.postid;
	var commentID = req.params.commentid;
	res.send("You want to view the comment " + commentID + "for blog post " + postID);
});
```

Notice that both the named paramters are available on the `req.params` object. Be careful which name you refer to!

Restart the web server and visit paths such as:

	/blog/posts/12/comments/1
	/blog/posts/1234-5678-abcd-ef90/comments/foo-bar

## Organizing Routes

At this point the *app.js* file has gotten out of hand. We've already added forty lines of code but barely have a functional product yet. If we keep adding routes for additional paths and add complexity to our callback functions such as user logins, database access and better response generation the file will become bloated and difficult to understand at a glance.

Express helps us here by making it possible to organize our routes into modules. Notice the templated code we pushed down when we started writing our own routes:

```js
app.use('/', routes);
app.use('/users', users);
```

There's obviously something going on with paths here and so routes, but what? `USE` is not an http verb. And what are the `routes` and `users` variables?

Looking at the top of the file we see where these variables are defined:

```js
var routes = require('./routes/index');
var users = require('./routes/users');
```

These variables are modules just as we've seen with other node modules, and they refer to two local files as indicated by the `./` in the folder `routes`. Let's have a look at one of those files and break it down. Here is *routes/index.js*:

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

This is a simple looking module. First it includes the `express` module and then creates a router from it. It then attaches a `GET /` route to the router with its own callback, ignoring `res.render` for now, and finally exports the router. The *routes/users.js* file is similar.

This is how express orgnizes routes. Related routes should all go in their own modules kept in the routes folder. Each routes module creates its own subrouter with:

```js
var express = require('express');
var router = express.Router();
```

and then attaches its routes to it with `router.get()`, `router.post()`, `router.delete()` and so on, providing the same path matching and request-response callback.

Finally, the module should export the router directly onto the module's exports variable:

```js
module.exports = router;
```

Back in the main *app.js* file for the application, include the module with the `require` function, assigning it to a variable, and pass that variable to the `app.use()` function:

```js
app.use('/', routes);
```

**Scoping**

Notice that when `app.use` is called like this it takes two parameters. The second is your routing module variable, but the first is a path. Express *scopes* the paths in the module to that path. This means that any paths defined in the module must first begin with the path defined here.

For example, notice that the *routes/index.js* file defines one route for `GET /` and that here `app.use` scopes the module to `/`. This means that `/` in *index.js* will only match routes where the first part of the path is `/`, effectively only the `/` path itself:

	/

That might seem a little confusing, but it's more straightforward with the users routing module. That module also defines a single route, namely `GET /`, so the same one we see in *index.js*, but the `app.use` call is different:

```js
app.use('/users', users);
```

Passing in `/users` for the first parameter means that all the routes defined in *routes/users.js* are *scoped to* the `/users` path. They must being with `/users`, so that `/` in users now actually matches: 

	/users/

**Example**

Let's make this clearer. Let's move our `/people/:username` route to the users routing module. We want it to match `/users/:username` instead, so delete the `/people` portion of the path and make sure to call `router.get` instead of `app.get`. With the correct changes, the following code is added to *routes/users.js*:

```js
router.get('/:username', function(req, res) {
    var username = req.params.username;
    res.send("You requested user " + username);
});
```

Save all the edited files and restart the server.

Now you can't just visit a path like
	
	/phil
	/okcoders

even though the users router is only matching `/:username`. That's because the `/:username` path is scoped to `/users` by the `app.use('/users', users)` call in *app.js*, so that the full matching path is actually `/users/:username`:

	/users/phil
	/users/okcoders

Scoping is a powerful feature just introduced into express and will help us greatly when it comes to orgnazing our code.

## Middleware

Express routing is organized around the concept of middleware. Middleware is code that executes between the server receiving the request and your own appliction's callback code. Routing is itself middleware, as it parses the request before your application even sees it and calls the right callback function in your application for you.

An application can have multiple layers of middleware connected together in a chain. We see them in express with the `app.use` function and any `app.VERB` function like `app.get` or `app.post`. Middelwares are executed in the order in which they are defined.

For example, the template express application includes a number of middleware items added to the application before any of the routing code:

```js
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
```

These are special middleware items included in your express project as third party code. You'll notice that each is `required` at the top of the application.

Because the middleware is included before the routing, where your application's custom code resides, they are executed before your application has a chance to see the request.

Each middleware has access to the request and response objects just like your routing callback functions do. Middleware can do whatever it wants with the information in the request as long as it either sends a response back or calls the next middelware item in the chain.

These particular middleware items are responsible for sending back the web site's [favicon](http://en.wikipedia.org/wiki/Favicon), logging information to the console, parsing body content into more usable data and handling [cookies](http://en.wikipedia.org/wiki/HTTP_cookie). Most of them don't generate a reponse but instead modify the request in subtle ways to make it easier to use.

At some point in the middleware chain a response must be generated by calling the appropriate functions on the `res` object such as `res.send`, `res.sendfile` or `res.json`. We'll learn more about the response object in the next chapter. For now it's important to know that once a response is generated, the chain immediately exits and no additional code is executed.

This means that middelware can respond to a request without letting your own application code see it. It also means that only a single custom route has the opportunity to actually generate a response. If more than one route matches an incoming request, whichever route is defined first is the one that responds to it.

**The public directory**

There is one particularly special piece of middleware we've been using since the beginning of the class. It is express's own `static` middleware, added to the application with:

```js
app.use(express.static(path.join(__dirname, 'public')));
```

The `static` middleware is used to send files in the specified directory automatically. It looks in the directory specified and if it finds a file that matches a GET request's path it automatically sends that file.

By default express uses a `public` directory but you could use whatever directory you wanted and even add additional directories.



