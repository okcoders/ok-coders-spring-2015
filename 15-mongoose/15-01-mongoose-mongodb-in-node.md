Mongoose: MonogDB in Node
====================================

In this chapter we're going to learn how to connect to a mongo database from our node application. This is a significant step in the development of our web application as it finally allows us to connect our node code to dynamic data backed by a database.

Mongo provides a database adpater for communicating with mongo servers from a node application. We will not, however, use their adaptor directly. Instead we will use a node module called *mongoose* which provides a layer of abstraction between our application code and the adaptor.

Mongoose calls itself an object-document mapper (ODM) in the veign of object-relational mappers (ORMs) commonly found in applications which use SQL for data storage. The mapper converts between the database type system and the javascript type system. This conversion is straightforward for mongo, which is already using javascript in its implementation, but mongoose supplies additional functionality as well.

Most importantly mongoose provides *abstraction*. Rather than writing complex database code we will simply call methods on mongoose objects, and mongoose will construct the database code for us. Mongoose also allows us to define application level schemas for our documents and provides validation and some automatic handling of relationships between collections. 

We won't take advantage of all of this functionality but we will be grateful for the abstraction and will certainly leverage the use of schemas and validations.

## References

[mongodb.org](http://www.mongodb.org/)

The MongoDB homepage, including documentation

[mongoosejs.com](http://mongoosejs.com/)

The mongoose object modeling library for node

[Object-relational mapping](http://en.wikipedia.org/wiki/Object-relational_mapping)

Wikipedia's entry on object-relational mapping. The concepts largely apply to object-document mapping.	

## Setting up

For this lesson's material you may either make changes to an existing project you are already working on or you may begin with the project template provided in this repository. If you'd like to use the template provided, `cd` into an empty directory that is not part of an express project or git repository and clone this repo:

	$ git clone https://github.com/okcoders/node-mongo-class.git

Then `cd` into the downloaded repository and the *template* directory contained in it. That will be the root directory for the project. Be sure to `npm install` the required depencies, which are not included in the repo.

**Install mongoose**

First we're going to need to install mongoose and ensure we're able to connect to our database. Let's begin by installing mongoose. It's hosted as a public node package so we can just `cd` into our project directory and:

	$ npm install mongoose --save

Make sure you do this from the root directory of your project. The installation should succeed and install mongoose and its dependencies in the *node_modules* directory. It also modifies *package.json* to list it as a dependency.

**Start up mongo**

Before using mongoose we'll need to start our mongo database daemon in the background. Refer to the previous chapter if you require more information.

On Windows make sure you already have a *\data\db* directory then find the `mongod.exe` file in the *bin* directory in *C:\Program Files\Mongo X\* and launch it. See additional instructions [here](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/).

On Linux and Mac `cd` into your project directory and create a "db" folder if you haven't already done so. Then start the mongo daemon with a `--path` argument pointing to that directory:

	$ mkdir db
	$ mongod --dbpath db

Recall that on the Mac, if you get a warning about *"soft rlimits too low"* fix it before running the daemone with the command:

	$ ulimit -n 2048

At this point the mongo daemon should be running. Keep it running in a separate command prompt or terminal. Further work in the mongo client or with node will have to be done in another terminal.

**Confirm mongo is running**

Now that the database is running go ahead and run the mongo command line client. On windows fire up the `mongo.exe` file in that same *bin* directory. On Mac and Linux run the command:

	$ mongo

You should successsfully connect to the mongo daemon.

**Prep the blog database**

Let's go ahead and clean out any `blog` database we created earlier. Check if you have one with the `show dbs` command in the mongo client:

	> show dbs
	admin  (empty)
	local  0.078GB
	blog  0.078GB

Switch to the `blog` database with the `use` command and then *drop* it with the `dropDatabase` command as follows:

	> use blog
	switched to db blog

	> db.dropDatabase()
	{ "dropped" : "blog", "ok" : 1 }

This command completely removes the database and associated files, even though we're still in the context of the "blog" database.

Finally, let's create a new, clean post for testing. We'll stick with titles and bodies and use a numeric placeholder for the person for now:

	> db.posts.insert({
		title: "A test post",
		body: "Lorem ipsum for the test post ...",
		author: '1'
	})
	WriteResult({ "nInserted" : 1 })

Add a couple more posts so that you have some test data in your database. Feel free to pull the test data from [posts.js](https://github.com/okcoders/rendering-templates-homework/blob/master/post.js), just be sure to switch out the author with a number.

## Connecting to the database

Now that we have mongoose installed and our database running with test data we are ready to connect to the database from our node application. In the project's man *app.js* file make the following modifications.

First require in the mongoose module. This should go near the top of the file:

	var mongoose = require('mongoose');

Then establish a connection and store the connection object in a local variable. Use the `mongoose.connect` method and give it a path to the mongo server and the database you want to use. I'm doing this after creating the app object:

	mongoose.connect('mongodb://localhost/blog');
	var db = mongoose.connection;

Notice the path: `mongodb://localhost/blog`. This is a special kind of url that mongoose understands. It says connect to the mongo port on localhost and use the `blog` database, like launch the command line client and executing `use blog` in it.

Finally add error checking immediately after grabbing the connection:

	db.on('error', function(msg) {
	  console.log('Mongoose connection error %s', msg);
	});

	db.once('open', function() {
	  console.log('Mongoose connection established');
	});

These two handlers add callbacks for the database events `error` and `open`. Any time mongoose encounters an error with the database its raises an `error` event and our callback will log the error. We'll also see a confirmation that the database connection was successful when the applicaiton first starts up.

Let's confirm that. If you're node application is already running Ctr-C to quit it and start it up again:

	$ npm start

If everything is working correctly you should see the open message printed to the console:

	Mongoose connection established

We're now ready to use mongo from our node application!

## Modeling an object

Mongoose uses a two step process to define an object that ultimately represents a document in the database. First we must define a schema for the object then we will create an object that associates that schema with a particular collection. 

For those of you familiar with object-oriented programming, this subject object functions like a class with a number of static and instance methods for dealing with common database operations. Even if you aren't familiar with this style of programming, you'll see that the mongoose object makes it easy to create, retrieve, update and delete documents in a collection.

Why do we need to define a schema in advance? Recall that, unlike SQL, mongo itself does not support schemas directly in the database. But we need a way to translate data from the application layer to the database layer, and vice versa.

The schema does this. The schema makes it possible for the mongoose library to map object properties in our node application to attributes on a document actually saved in the database. It then creates special objects any time we retrive documents from the database that have built-in support for further database operations as well as data validation, which we'll see in action in the next chapter.

In short when we use mongoose for our model objects -- for our data -- we define a schema and then we define the model object itself.

Let's do this. Modify the *models/post.js* file. Comment out the previous hardcoded data and then first include in the mongoose module:

	var mongoose = require('mongoose');

Now define the following schema for a blog post:

	var schema = mongoose.Schema({
	  title: String,
	  body: String,
	  author: Number
	});

We define a schema by calling `mongoose.Schema` and passing it a javscript object. The object contains a number of properties or key-value pairs. The most basic property names the attribute that is actually used in the document as it is stored in the database and then specifies the type of value it should be. Notice we're actually using javascript types for the values of the properties: `String` and `Number`.

In this schema I'm saying that my document will have three properties, a `title`, a `body` and an `author`, and that their respective types will be `String`, `String`, and `Number`. This in fact corresponds to the test data we already have in the posts collection.

But the schema doesn't say anything about which collection is refers to, that is, what kind of document it is modeling. For that we need a model object. The model object takes the name of the collection it operates on and the schema for documents in that collection.

Create a model object from this schema:

	var Post = mongoose.model('posts', schema);

With the `mongoose.model` command we create a `Post` model object that knows what its documents look like (they have a title, body and author) and which collection those documents belong to (posts). 

Anything that is done using the `Post` model in node will be done in the context of the *posts* collection in mongo, like executing `db.posts.<command>` in the mongo command line client.

Finally we must export the `Post` model to make it available to other parts of our application:

	module.exports = Post;

We're now ready to use this `Post` model from other parts of our application. We'll do so from the router.

## Using a model object

A Mongoose model object abstracts out the interface to the database into methods that are simpler to use. We've seen how to interact with objects in the database from the mongo command line client. We've seen commands like:

	db.posts.insert( { ... } )
	db.posts.update( { ... }, { ... } )
	db.posts.find( { ... } )
	db.posts.remove( { ... } )

A mongoose model provides access to that underlying functionality with methods on the model object.

We are going to build up the command we'd like to execute on the database using methods on the model like `find`, `findById`, `sort`, `limit`, and so on. We'll then actually execute the command with a final `exec` statement. The `exec` statement will take a callback that is run once the database operation finishes. The callback will always look the same, with an `err` and `result` parameter, although not every operation will actually set a result.

**Update index route**

Let's see this in action. We access our model from our route handlers, which pull data from the database and pass them to our views for rendering. We were previously using harcoded data and old methods, so we need to update our route handlers to use the new Post model.

Open the *routes/posts.js* file and in the index route, replace:

	var posts = Post.all();
	res.render('posts/index', {posts: posts});

with:

	Post.find({}).exec(function(err, posts) {
		res.render('posts/index', {posts: posts});
	});

Let's take a close look at this. First notice that our call to `res.render` remains identical. But we've moved it inside a function callback. That's the key piece here.

Mongoose models provide a `find` method. The `find` method works very much like the `find` method in the mongo client itself. Call find and pass it a query object for filtering down the documents you want to retrieve.

This call to `Post.find` returns what mongoose labels a query object. We can continue to make modifications to this query object, like adding sort and limit options or even "where" clauses that build up the javascript query object that is ultimately sent to the mongo server (see [queries](http://mongoosejs.com/docs/queries.html) for more info). That is, instead of passing one really complex javascript object to the server, as we saw was possible using the client in the last chapter, we let mongoose construct that object for us by calling methods on the query object.

Once we're ready to run the query we call `exec` on it. *Method chaining* is used to tie all this together, so we see `Post.find({}).exec(...)`. The `exec` command will always take a single argument, a function callback which itself takes an error and results parameters. We can name those whatever we like. Error is usually called `err` and results will be context dependent. Here the result will be the result of a `find` operation with no query object which should fetch all the documents in the posts collection, so it is appropriately called `posts`. Order matters here. The error parameter always comes first in the callback.

Why do we need a callback? Why can't we just get a return value from `Post.find({}).exec(...)`? Because the function is asynchronous. While node is waiting for the database to execute our query and return the results it continues to handle incoming requests and route them to other parts of the application.

When the database operation is finished our function callback is executed. `err` will be set if a problem occurred, otherwise it will be `undefined`. The results variable `posts` will be an array of instances of the Post model, which we can pass directly to the render function and access from our views without any other modification.

**See it in action**

Let's test this. Restart the node application and visit the `/posts` page. Everything works as we expect it to, and importantly we didn't need to change antything in the html views that we're rendering. Our reference to title, body and id continue to work the same.

This is the beauty of a well designed MVC (model-view-controller) application. We are able to change one layer or even two layers, for example the model and controller layers, without needing to account for those changes from the view layers. This is also known as *decoupling*..

Similarly, we can now make modifications to the database without needing to account for those changes in node. If you're `mongo` command line client isn't still running, fire it up and make another addition to the posts collection:

	$ mongo
	> use blog
	> db.posts.insert({
		title: "Another post for us",
		body: "Test test test, foobar lorem ipsum qux",
		author: 1
	})

Without touching the node application refresh the `/posts` page in the browser. Our addition to the database immediately shows up. Nice.

**Error handling**

In a live application we need to account for both "[happy path](http://en.wikipedia.org/wiki/Happy_path)" and "sad path" outcomes. Right now our application assumes that the find execution successfully returns the posts. But something may have gone wrong, in which case the err parameter in the callback will be set. We should check for this and render an error page appropriately.

First let's create a 500 error page. We briefly touched on HTTP status codes in an earlier chapter. Normally we see the 200 status code which means that an HTTP request was successful. We commonly see 404 status code as well, which means "page not found". The 500 status code indicates there was an internal server error. A bad database connection counts.

Create a *500.ejs* file in the *views* folder. Set it up with basic boostrap styling and simply add a header and title to the effect of "An error occured while processing your request. Please try again in a moment". This is like the fail whale error page that twitter used to show.

Now in the callback we wrote first check the err parameter. If it's true, which is to say not undefined, log the error and render the 500 error page with a 500 status code. Otherwise, render the posts page normally:

	router.get('/', function(req, res) {
	  Post.find({}).exec(function(err, posts) {
	    if (err) {
	      console.log("db error in GET /posts: " + err);
	      res.render('500');
	    } else {
	      res.render('posts/index', {posts: posts});
	    }
	  });
	});

**Update show route**

Let's modify our show route for a single post to use the new `Post` model.

We saw in the last chapter than we can query for a particular object in a collection by passing the `_id` property to the find command. Mongoose provides another method for us which does this automatically, the `findById` method. Replace the following in the show route:

	var post = Post.find( req.params.id );
  	res.render('posts/show', {post: post});

with:

	Post.findById(req.params.id).exec(function(err, post) {
		res.render('posts/show', {post: post});
	});

Notice we use findById and we pass it `req.params.id`, which is matched from the route. We know that the id will match the model id because when we contruct the url from the `posts/index` view we use each model's id in turn. 

We should add error handling here as well, but this time there are two things that could go wrong. Mongo could return an error in which case we should display the 500 page, but Mongo may also not find the post, perhaps because it's been deleted and someone is using an old, bookmared url. In that case no error will be set but post will be undefined.

Modify the router function so that it includes error handling for all these cases:

	router.get('/:id', function(req, res) {
	  Post.findById(req.params.id).exec(function(err, post) {
	    if (err) {
	      console.log("db error in GET /posts: " + err);
	      res.render('500');
	    } else if (!post) {
	      res.render('404');
	    } else {
	      res.render('posts/show', {post: post});
	    }
	  });
	});

Notice that the `if/else` statement includes a middle check for an undefined post and renders the 404 page. We should create that page in the *views* folder.

**Update the edit route**

We can apply the same changes to the edit route as we did to the show route, just be sure to render the correct view:

	router.get('/:id/edit', function(req, res) {
	  Post.findById(req.params.id).exec(function(err, post) {
	    if (err) {
	      console.log("db error in GET /posts: " + err);
	      res.render('500');
	    } else if (!post) {
	      res.render('404');
	    } else {
	      res.render('posts/edit', {post: post});
	    }
	  });
	});

## Modeling relationships with mongo

Our blog isn't just composed of posts. We we also have users who will be writing those posts and comments that are left on posts. We'll need to model all this and add routes and views for handling those requests.

Significantly, our users, posts and comments are all related to one another. A post is *written by* a user and a user can write many posts, so our user -> post relationship is one-to-many. A comment is *associated with* a particular post and a post can have many comments, so the post -> comment relationship is also one to many.

We've discussed modeling these relationships abstractly in previous chapters. We understand that we need to be aware of them and their types (one-to-one, one-to-many, many-to-many). We briefly discussed how they might actually be modeled in a document based database like mongodb. Now we need the details.

Let's start with comments. We'll implement users in the last week of class.

**Nested documents or multiple collections**

We know that we have two ways of keeping track of a one-to-many relationships in mongodb. We can use nested documents or we can create a separate collection. For example, we could just include an array of comments in each post document. In that case there's nothing left to model. A post immediately knows which comments belong to it, and a comment only exists in so far as it is part of an actual post document.

Our other option is to create a comments collection and store comment documents separately in it. This is a slightly more complex implementation at the outset but offers some benefits in the long run, including simpler querying.

**Relating documents to one another**

So we're going to have two collections, one for posts and one for comments. We'll have many documents in each one, many posts and many comments. How then will we keep track of which post a comment belongs to? How do we concretely implement the one-to-many post-to-comments relationships?

Again we have two options. We can have a post keep track of which comments belong to it, or we can have the comment keep track of which post it belongs to. One of these is clearly simpler. Can you see which?

Either way we'll need a property on the document. If we keep track of the comments from the post, we'll have to manage an array of references, namely one reference for each comment, but if we keep track of the post from a comment, we only need a single reference, the one post which that comment belongs to. Managing a simple property is defintitely more straighforward than managing an array.

Consequently each comment will need in addition to its body property and perhaps an author property, a postId property that reference the post it belongs to. For its value we will use the very thing that uniquely identifies a post, an ObjectId.

**Add test data**

Let's go ahead then and create a comments collection with some test comments in our database. Fire up the mongo client if it isn't already running. Grab the ObjectId for some post, it doesn't matter which. The comments will be on this post.

	$ mongo
	> use blog
	> db.posts.find()
	{ "_id" : ObjectId("53cfc79a32b2912c7684dc83"), ...

Insert a new comment and associate it with this post:

	db.comments.insert({
		body: "Loved the post. So good!",
		author: 1,
		postId: ObjectId("53cfc79a32b2912c7684dc83")
	})

Add a couple more comments to fill out the test data. Keep the author a numberic value and make sure to use an `ObjectId` for the `postId` value.

Run `db.comments.find()` to confirm that you added the data.

## Implementing relationships with mongoose

**Create the comment model**

With test data in hand we're ready to implement the comments model in our node application. Create a new *models/comment.js* file:

	$ touch models/comment.js

Once again we'll need a schema that matches the format of the data in the database and a model that associates that schema with a collection. Add the following to *models/comment.js*:

	var mongoose = require('mongoose');

	var schema = mongoose.Schema({
	  body: String,
	  author: Number,
	  postId: mongoose.Schema.Types.ObjectId
	});

	var Comment = mongoose.model('comments', schema);
	module.exports = Comment;

Our schema  and model are similar to *Post* and are straightforward except for the type of the `postId` property. Javascript does not have a built-in `ObjectId` type, so mongoose provides it for us. This type tells mongoose that we are explicitly refering to another document in the database so that mongoose uses the `ObjectId` type when it communicates with the mongo server.

**Update the comments route handlers**

We're now ready to modify *routes/comments* to take advantage of the `Comment` model. First require in the comment module:

	var Comment = require('./../models/comment');

Let's begin with the index path that should load every comment for a given post. We'll replace the following code:

	router.get('/:pid/comments', function(req, res) {
	  res.status(404).send('all comments, post: ' + req.params.pid );
	});

Replace the callback contents with a `Comment.find` command that includes a query object. The query object should filter for any comment whose `postId` is equal to the `:pid` parameter. We know the `:pid` paramater will be the object id of a post because that is how our view code will create the url:

	router.get('/:pid/comments', function(req, res) {
	  Comment.find({postId: req.params.pid}).exec(function(err, comments) {
	    res.render('comments/index', {comments:comments});
	  });
	});

Confirm that this code is working. Restart the node application and browse to `/posts`. Select a post that you know you created a comment for, and the url will be something like:

	http://localhost:3000/posts/53cfc79a32b2912c7684dc83

Append `/comments` to the end of that url and visit that page:

	http://localhost:3000/posts/53cfc79a32b2912c7684dc83/comments

You should see the comments for that post.

We're missing a couple of things. Of course we don't the user to have to manually enter a URL. We should link to it from the post page. Add a link to the posts comments from the *views/posts/show.ejs* file. It should look something like:

	<a href="/posts/<%= post.id %>/comments">Comments</a>

Notice how we can insert the post.id into the `href` using embedded javascript. This is how we guarantee that our `:pid` parameter in the comments route will match an actual post id.

We should also add error checking to our comments index route. The error checking will be identicial to what we have for the posts index:

	router.get('/:pid/comments', function(req, res) {
	  Comment.find({postId: req.params.pid}).exec(function(err, comments) {
	    if (err) {
	      console.log("db error in GET /posts/:pid/comments: " + err);
	      res.render('500');
	    } else {
	      res.render('comments/index', {comments:comments});
	    }
	  });
	});

We now have working relationships in our blog application. We can view posts, view a particular post and view the comments that belong to a particular post, all with the help of mongo and the abstractions that mongoose provides.

There's still plenty of implementation left, especially in comments and in terms of linking the pages together in smart ways, but we'll leave that for homework!

<!-- Move to next chapter
## More advanced model schemas

...
-->

## Making changes to data 

So far our web application is only accessing data that is already in the database. We have no way for users of our blog to actually create new entries or modify existing ones. We'll be learning how to do that in the next chapter.

<!-- Move to next week
## MongoDB and Heroku

.gitignore changes: node_modules and db

...
-->