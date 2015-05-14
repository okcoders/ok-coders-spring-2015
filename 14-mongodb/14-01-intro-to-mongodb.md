Mondodb
========================================

MongoDB is one of a new class of modern database systems known as *NoSQL* databases. SQL systems use the structed query language for modifying the database and use a tables and rows abstraction to model data. NoSQL databases typically employ some other form of querying and use documents, key-value pairs, graphs and other data structures to model data.

SQL is still a standard in database systems and is definitely worth learning. But the structured query language is another programming language -- a declarative one -- that we'd have to study, whereas mongodb uses javascript for data access. This is really incredible. In addition to using javascript for server side development with node and express, beyond already using it for client side features, we can now also use javascript to create, query and modify data in a database.

MongoDB also forms part of what is known as the *MEAN* stack for *full stack* javascript web development, which is a popular approach to contemporary web application development. By the end of this class we'll have covered three of the four technologies used in this approach.

## References

[mean.io](http://mean.io/) | [mean.js](http://meanjs.org/)

The MEAN stack for javascript web development: Mongo, Express, Angular, Node.

[mongodb.org](http://www.mongodb.org/)

The MongoDB homepage

[docs.mongodb.org](http://docs.mongodb.org/manual/)

The documentation. This should be your first stop for getting help.

[Seven Databases in Seven Weeks](http://www.amazon.com/Seven-Databases-Weeks-Modern-Movement/dp/1934356921)

An excellent introduction to seven modern database systems, including mongoDB.

[Robomongo](http://robomongo.org/)

Graphical interface to the mongo server. Use Robomongo in place of the command line client.

## Installation

**Mac**

If you are using homebrew, then at the command line simply:

```
$ brew update
$ brew install mongodb
```

If not, install from the package at [mongodb.org/downloads](http://www.mongodb.org/downloads)

**Linux**

Use apt-get or your platform's package manager. Further instructions available at [mongodb.org/downloads#packages](http://www.mongodb.org/downloads#packages). Or install from a binary on the same page.

**Windows**

Install from the package at [mongodb.org/downloads](http://www.mongodb.org/downloads). Download and open the file.

The Windows executables will be installed in your Program Files directory, inside a Mongo folder (the exact name of the folder depends on your system). You will find the required executables inside a *bin* folder in that directory.

## Starting MongoDB

Using a database involves two applications: a database server or *daemon* that runs in the background and a database client with which you directly interact. MongoDB ships with the `mongodb` daemon and the `mongo` client. 

**Mac / Linux**

Start both the daemon and the client from the command line. Start the daemon first, as it actually implements the database.

You must specify a directory path to your database when starting the latest release of the mongo database daemon. Use a local directory for now. `cd` into a new folder and:

```
$ mkdir db
$ mongod --dbpath db
```

This sequence of commands creates a new empty *db* directory and then starts the mongo server, telling it to use that folder for the database. This also keep the database server running in a terminal window. To quit the database type Control-C: `^c`. 

To interact with the database from the command line client you will need to start up another terminal window. 

On the Macintosh you mays see a warning when starting the database server:

"WARNING: soft rlimits too low. Number of files is 256, should be at least 1000"

If that occurs, execute the following command before running the daemon:

```
$ ulimit -n 2048
```

**Windows**

First you will need to create the database path that mongo uses. In a Command Prompt type:

```
md \data\db
```

Then find the Mongo directory that the download installed. It will be in your `C:\Program Files`. Find the *bin* directory inside the Mongo directory. It contains a `mongod.exe` file. Run that program.

If you have trouble installing or running mongo on windows, refer to the [official documentation](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/).

**Connecting to the database**

We're now ready to connect to the database. On Mac or Linux, in another terminal window, execute the `mongo` command. It should connect you to the database and tell you some information about it:

```
$ mongo
MongoDB shell version: 2.6.3
connecting to: test
>
```

On Windows, run the `mongo.exe` file in that *bin* folder. You'll type commands into this command prompt.

Notice that the prompt changes to a `>`, indicating that you are in the mongo REPL. You may type commands and the mongo client will send them to the server to be executed. Any results are printed back to the REPL.

At any point in your interaction with the command line client, if you aren't sure what to do next type the `help` command. It will print a list of available commands given the current context:

```
> help
db.help()                    help on db methods
db.mycoll.help()             help on collection methods
sh.help()                    sharding helpers
rs.help()                    replica set helpers
...
```

For now use the `exit` command to quit the client:

```
> exit
```

As you interact with the database through the client application you'll see the server print out information to the other terminal.

## DBs, Collection and Documents

Recall from the previous chapter that the mongo database uses collections of documents to model data, rather than tables as SQL does. A collection is just a bunch of documents. Documents are really the data object we'll be interacting with, but when we create a document or otherwise modify it, we'll be doing that in the context of a collection.

Example collections might be `posts`, `users`, `comments` and so on in a blog application. Then each collection contains the data for particular posts, users and comments.

Before we create collections we need to specify what database those collections will belong to. This is similar to SQL. A single mongo server can support many databases that are independent of one another. Let's fire up the mongo client, create a database and start adding data

Make sure you're running the `mongo` command line client:

```  
$ mongo
>
```

and execute:

```
> show dbs
admin  (empty)
local  0.078GB
test   (empty)
```

The `show dbs` command just lists the currently active databases. To switch to a database, simply execute the `use` command, providing the name of the database:

```
> use blog
switched to db blog
```

Notice, however, that `show` does not yet include the new blog database:

```
> show dbs
admin  (empty)
local  0.078GB
test   (empty)
```
  
Both databases and collections are created *lazily* in mongodb. A database won't be created until there is data added to it, likewise for a collection.

## CRUD

Although mongodb supports a number of advanced database operations like geolocation based queries, mapreduce and sharding, we will focus on creating, retrieving, updating and deleting data, or the *CRUD* operations.

The CRUD operators are all performed on the `db` object in the mongo client, and further on another object that targets the collection for the command. For example, if you want to work with documents in a `posts` collection, your commands will begin with `db.posts`. The commands will then be methods on this `db.posts` object.

If you want to make changes to the comments collection, use `db.comments`. `db` here always refers to the currently used database.

## Create

Let's create a few blog posts then. Target the `db.posts` object. The command we'll use is `insert`, and we pass it a normal javascript object:

```
> db.posts.insert({
	title: "The email line that's client repellent",
	body: "I’d gone through a few droughts as a freelancer",
	author: "OK Coders"
})
```

The client should respond with the result:

```
WriteResult({ "nInserted" : 1 })
```

We can see that the post has been created. First confirm that the collection exists:

```
> show collections
posts
system.indexes
```

We see the `posts` collection has just been created along with a system collection for managing indexes.

Execute the `find` command on `db.posts` to see the actual post object:

```
> db.posts.find()
{ "_id" : ObjectId("53cd2309b3f624fc17ca5cc9"), "title" : "The email line that's client repellent", "body" : "I’d gone through a few droughts as a freelancer", "author" : "OK Coders" }
```

The command returns the single document we just created. Notice the document contains an additional `_id` parameter of type `ObjectId`. This is the unique identifier mongodb uses to identify objects in a database and it is the identifier we'll use for the `:id` param in our resourceful routes.

It's possible to insert more than one object at a time. Just pass an array of javascript objects to the insert method. Go ahead and create a few more blog posts. I'm copying content from [posts.js](https://github.com/okcoders/rendering-templates-homework/blob/master/post.js):

```
> db.posts.insert([
  {
    title: "The Moderately Enthusiastic Programmer",
    body: "I feel like I’m practically the poster child for the 'passionate programmer'",
    author: "Mr. T"
  },
  {
    title: "The Magic of Strace",
    body: "Early in my career, a co-worker and I were flown from Memphis to Orlando to try to help end a multi-day outage",
    author: "Ninja Programming"
  },
  {
    title: "http://nightwatchjs.org/",
    body: "Simple but powerful syntax which enables you to write tests very quickly, using only Javascript and CSS selectors.",
    author: "The Night Watchman"
  }
])
```

You should receive a message that no errors occurred while adding the data.

Again confirm that the posts were added with the `find` command:

```
> db.posts.find()
{ "_id" : ObjectId("53cd2309b3f624fc17ca5cc9"), "title" : "The email line that's client repellent", "body" : "I’d gone through a few droughts as a freelancer", "author" : "OK Coders" }
...
```

Sure enough, each post was added and assigned a unique object ID.

## Retrieve

Retrieving, or *querying*, documents in mongodb is straightforward. We'll use the `find` command as we've already seen. Without additional arguments the `find` command retrieves all the documents in a collection. With additional arguments it behaves like the `WHERE` clause in a SQL statement. MongoDB provides it own named parameters attached to javascript objects to control the querying.

Without other arguments, `find` returns all the documents in a collection:

```
> db.posts.find()
...
```


A command like this might be used when someone visits the `/posts` url on your blog. 

Often, however, you'll want to retrieve a single document, for example when the user vists `/posts/:id`, and you'll want to retrieve that document by its unique identifier. This is equivalent to filtering the find command by `_id`, or in SQL using a `WHERE _id = :id` clause. Mongo makes this easy to do.

Get the object id of a post in your database. One of mine is:

```
ObjectId("53cd2309b3f624fc17ca5cc9")
```

In the find command, pass in a *query object* with the parameters and their values that you'd like to query against:

```
> db.posts.find({
_id: ObjectId("53cd2309b3f624fc17ca5cc9")
})
```

Notice that I am passing a normal javascript object to the find command and that object contains parameters which documents of that type (posts) have, for example, `_id`'s. Mongo then returns only those documents which match those parameters:

```
{ "_id" : ObjectId("53cd2309b3f624fc17ca5cc9"), "title" : "The email line that's client repellent", "body" : "I’d gone through a few droughts as a freelancer", "author" : "OK Coders" }
```

All querying in mongodb works like this. We'll pass in a query object to the `find` command that targets specific attributes on the documents in the collection.

We can query against any attribute on a document. Search for those documents whose author is `"Mr. T"`:

```
> db.posts.find({
author: "Mr. T"
})
```

You'll need to supply an author value that actually occurs in your documents. Mongo then returns the correct document.

```
{ "_id" : ObjectId("53cd2561b3f624fc17ca5cca"), "title" : "The Moderately Enthusiastic Programmer", "body" : "I feel like I’m practically the poster child for the 'passionate programmer'", "author" : "Mr. T" }
```

We can use [regular expressions](http://en.wikipedia.org/wiki/Regular_expression) for more advanced text based queries against object attributes. For example, the following query finds any document in the posts collection whose title begins with the word 'the', regardless of its case:

```
> db.posts.find({
	title: /^the/i
})
```

Mongo supports much more advanced querying which is beyond the scope of this chapter.

**Choosing the fields to return**

We can specify which attributes or properties to return when we query a collection. By default the `find` command returns the entire document which matches its query, but we can ask it to return a subset of attributes instead.

Add a second object argument to the find command, again composed of the names of attributes on the documents in the collection but with boolean values to indicate if you want those attributes returned:

```
> db.posts.find( {}, {title: true} )
```
  
This command asks find to only return the title attribute for the documents it matches. Because I don't have a specific query I need to pass in an empty object for the first parameter. It returns the documents but with only their `_id` and `_title`:

```
{ "_id" : ObjectId("53cd2309b3f624fc17ca5cc9"), "title" : "The email line that's client repellent" }
{ "_id" : ObjectId("53cd2561b3f624fc17ca5cca"), "title" : "The Moderately Enthusiastic Programmer" }
{ "_id" : ObjectId("53cd2561b3f624fc17ca5ccb"), "title" : "The Magic of Strace" }
{ "_id" : ObjectId("53cd2561b3f624fc17ca5ccc"), "title" : "http://nightwatchjs.org/" }  
```

**The Cursor**

The cursor allows us to specify the order and range of the documents returned.

These are additional methods that you call on the object that is returned by the find command. You can *method chain* them together to get the desired effect.

For example, to sort the results of a find operation, add the `sort()` method and again pass it a javascript object with the sort ordering you'd like to apply. This is like the `ORDER BY` clause in SQL.

Let's order our posts by author's name, ascending:

```
> db.posts.find().sort( { author: 1 } )
```

Use a value of `-1` to sort descending. You may specify more than one attribute to sort by.

Use the `limit()` and `skip()` commands to specify the range of results you'd like to retrieve. For example, to skip the first two documents and only retrieve the next one after them, use `skip(2)` and `limit(1)` after the `find()` command:

```
> db.posts.find().skip(2).limit(1)
```

Cursor methods like this are often used to page through a long list of items.

## Update 

Updating is a little stranger in mongo. An `update` command allows us to target a subset of documents in a collection and then make a number of kinds of changes to those documents.

Update is called with two arguments, both of them javascript objects. The first object functions like the query object in the `find` command. It filters for a subset of documents in the collection. The second argument specifies what kind of change to make.

Most often we'll want to target a single document that a user has just edited and save in our web application, and we'll want to modify the attributes they have changed. 

To accomplish this, call update with the two javascript objects. The first object filters by the object id, which we'll acquire from a url parameter. The second will use the special property `$set` which itself takes an object of attributes and their values that you want to change on the target document.

Find an object you'd like to change in your posts collection. You'll need the `_id` value. I'm using `ObjectId("53cd2309b3f624fc17ca5cc9")`

Let's build the update command up piece by piece. First target that document with the update command:

```
db.posts.update({
	_id: ObjectId("53cd2309b3f624fc17ca5cc9")
},
{
	...
})
```

Notice that we have a second object that needs to be filled in. Provide the `$set` property which itself takes an object:

```
db.posts.update({
	_id: ObjectId("53cd2309b3f624fc17ca5cc9")
},
{
	$set: {
		...
	}
})
```

Finally, inside the `$set` object, specify the attributes you'd like to modify and their new values:

```
> db.posts.update({
	_id: ObjectId("53cd2309b3f624fc17ca5cc9")
},
{
	$set: {
		title: "New title for this post"
	}
})
```

This final command will actually perform the update. I've used extra spacing here to make the structure clear but you can always write the entire command on a single line.

A `find` query shows us that the post has in fact been modified:

```
> db.posts.find( {_id: ObjectId("53cd2309b3f624fc17ca5cc9")} )
{ "_id" : ObjectId("53cd2309b3f624fc17ca5cc9"), "title" : "New title for this post", "body" : "I’d gone through a few droughts as a freelancer", "author" : "OK Coders" }
```

We used the special `$set` parameter to specify what kind of update we want to execute. Mongo supports other updates like unseting, incrementing and array modification, but these are beyond the scope of this chapter.

Note that it is possible to update more than one object simultaneously. The first argument to the `update` command is an object that works just like the query object in the `find` command. If it matches more than one document in the collection then all the matched documents will be updated.

## Delete

Deleting is straightforward. Use the `remove` command. Like the `find` and `update` commands it takes a query object as its first parameter. The command then deletes any object that matches that query.

For example, to delete the post document I've been modifiying:

```
> db.posts.remove({
	_id: ObjectId("53cd2309b3f624fc17ca5cc9")
})
```

I could delete all the posts by calling delete with an empty query object:

```
> db.posts.remove({})
```

Be careful!

## Using nested values

Before we wrap up this intoduction to mongoDB let's take a short look at nested values and what it means to be a schemaless database.

We learned in the previous chapter that SQL style databases do not support nested data. The value at a particular column and row in a table must be a simple data type: number, text, date, etc. You cannot insert a table in a table, and you cannot include more complex data structures like arrays or objects.

MongoDB, however, does support nested data types in documents. A document attribute can be an array or another javascript object. Moreover mongo fully supports querying against these nested properties and making modifications to them.

For example insert a post that has a keywords attribute that is an array of strings:

```
> db.posts.insert({
	title: "Keywords test",
	body: "Lorem ipsum",
	author: "Mr. T",
	keywords: [ "node", "mongo", "okcoders" ]
})
```

`db.posts.find()` now returns that document as well:

```
...
{ "_id" : ObjectId("53cd49aeb3f624fc17ca5ccd"), "title" : "Keywords test", "body" : "Lorem ipsum", "author" : "Mr. T", "keywords" : [ "node", "mongo", "okcoders" ] }
```

Importantly, notice that our keywords is a list of distinct values. We could not do this in a SQL style database.

We can now query against that nested array as we do any other document attribute. Mongo automatically infers that you mean to check for values in an array when your query object targets array attributes:

```
> db.posts.find({
	keywords: 'node'
})
```

We can even use regular expressions, which is pretty powerful stuff and much simpler than SQL:

```
> db.posts.find({
	keywords: /NODE/i
})
```

In addition to arrays we can nest javascript objects inside our documents. Create a post that has an author attribute but this time provide a javascript object with a name and id fields for it:

```
> db.posts.insert({
	title: "Nested author test",
	body: "Lorem ipsum",
	author: {
		id: 1,
 		name: "OK Coders"
	}
})
```

Notice we're just using a nested javascript object. Confirm the insertion with the `find` operation:

```
{ "_id" : ObjectId("53cd4d03b3f624fc17ca5cce"), "title" : "Nested author test", "body" : "Lorem ipsum", "author" : { "id" : 1, "name" : "OK Coders" } }
```

As with arrays, we can query against attributes in the nested object. Simply use the dot syntax to reach into it:

```
> db.posts.find({
	"author.name": 'OK Coders'
})
```

You can nest as deeply as you like in a mongo document and can combine arrays and objects. Notice that we have to wrap the property name in quotes because the period `.` is not a legal character for a property name.

## Schemaless documents

In the above example we were able to insert a document into the posts collection that contained a keywords attribute even though no other post has that attribute. This is partly what it means to be *schemaless.* We can add new attributes to documents with no effect on the previous attributes.

(Schemaless also means that we don't have to specify a document's attributes in advance, which must be done in SQL with the `CREATE TABLE` statement.)

Notice what happens then if we request the documents back in a `find` operation but only ask for keywords:

```
db.posts.find( {}, { keywords: true } )
{ "_id" : ObjectId("53cd2309b3f624fc17ca5cc9") }
{ "_id" : ObjectId("53cd2561b3f624fc17ca5cca") }
{ "_id" : ObjectId("53cd2561b3f624fc17ca5ccb") }
{ "_id" : ObjectId("53cd2561b3f624fc17ca5ccc") }
{ "_id" : ObjectId("53cd49aeb3f624fc17ca5ccd"), "keywords" : [ "node", "mongo", "okcoders" ] }
```

We get a number of objects back, as we expect, but only one of them has keywords. What happens of we try to iterate through all these objects and access the keywords? What value will we get back when a document doesn't have that attribute?

`undefined`

Be careful taking advantage of this feature. Your application must now deal with possibly many missing values when it makes queries against collections. 

Or consider the fact that some of our post documents now have two kinds of `author` values: one a simple string and the other a javascript object. How will your application handle that? Will it do the right thing?

Schemaless storage is a powerful feature of mongoDB and allows for the rapid prototyping of an application without having to worry about blowing out your database or modifying tables, but in the end you probably want to lock down a format for your documents once you reach an advanced stage in your project and then have a consistent and sane policy for adding new attributes.

## Graphical utilities

Using the command line to interact with your mongo data can be frustrating and error prone. The cross platform graphical client, [Robomongo](http://robomongo.org/), might be a better option for you.