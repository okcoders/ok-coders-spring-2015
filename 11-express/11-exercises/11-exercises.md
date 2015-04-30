OK Coders: Express Exercises
====================================

For this evening's assignment you will create a new express application from scratch and add a number of custom routes to it. 

## Create a new express application

Create a new express application from scratch. In the command line run `express blog`. Express will create a new folder "blog" and fill it with an application template. `cd` into that directory and run `npm init` to download the application's dependencies. If you are feeling bold, use git to track changes to your application.

**References**

[Bash Heroku Git Class](https://github.com/okcoders/ok-coders-spring-2015/tree/master/09-command-line)

## Add twitter bootstrap styling

Download the twitter bootstrap css stylesheets, javascript files and fonts, and add them to the correct folders inside your project's "public" directory.

**References**

[Bootstrap Class](https://github.com/okcoders/ok-coders-spring-2015/tree/master/03-twitter-bootstrap)

## Create a couple of static pages

Add a couple of static html pages to your project, such as an "index.html" page and an "about.html" page. Fill them with whatever content you like, but make sure to apply the twitter bootstrap styling.

**References**

[Bootstrap Example](https://github.com/okcoders/ok-coders-spring-2015/tree/master/03-twitter-bootstrap)

## Add routes for a posts resource

Your application will represent a blogging application that has collections of posts. Add routes that support viewing all the posts, viewing a single post, creating a post, editing a post, and deleting a post. Don't worry about generating good responses for the routes. Just send a text response back that identifies the path and any named parameters, as we did in the example, e.g.:

```js
app.get('/posts/:id', function(req, res) {
	var id = req.params.id;
	res.send("You requested post " + id);
});
```

Modern web applications use something called *resourceful routing* to represent editable collections of objects on a server. A *resource* is just a collection of data that can be modfied using standard HTTP requests. All of the operations listed above, such as viewing and editing posts, can be implemented with particular VERB and path combinations. The following tables lists those combinations:

<table>
<thead>
<tr>
<th>HTTP Verb</th>
<th>Path</th>
<th>Used for</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET</td>
<td>/posts</td>
<td>display a list of all posts</td>
</tr>
<tr>
<td>GET</td>
<td>/posts/new</td>
<td>return an HTML form for creating a new post</td>
</tr>
<tr>
<td>POST</td>
<td>/posts</td>
<td>create a new post</td>
</tr>
<tr>
<td>GET</td>
<td>/posts/:id</td>
<td>display a specific post</td>
</tr>
<tr>
<td>GET</td>
<td>/posts/:id/edit</td>
<td>return an HTML form for editing a post</td>
</tr>
<tr>
<td>PUT</td>
<td>/posts/:id</td>
<td>update a specific post</td>
</tr>
<tr>
<td>DELETE</td>
<td>/posts/:id</td>
<td>delete a specific post</td>
</tr>
</tbody>
</table>

Generate all of the following routes above with the VERB and path combinations identified. This implements a posts resource.

Go ahead and implement your routes inside the main *app.js* file. For a more advanced application architecture, create the routes inside a separate routing file and require it into app.js. That means you'll need a "posts.js" file inside the "routes" folder in your express project. Scope the module to the `/posts` path from the "app.js" file. Refer to the lesson material and template code for instructions on how to do this.

Don't worry about returning valid HTML in your routes just yet. We'll learn about templating in the next lesson. For now just call `res.send()` in each route with some text. Make sure that you run the application and test the routes in the browser though.

## Add routes for a comments resource on posts

Add additional routes to your posts module that supports viewing comments on a specific post. Each post in your blog application can have comments. The comments behave like an additional resource attached to a given post. You'll need to use two named parameters to support these routes. Refer to the example used in class and implement all of the following routes:

<table>
<thead>
<tr>
<th>HTTP Verb</th>
<th>Path</th>
<th>Used for</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET</td>
<td>/posts/:id/comments</td>
<td>display a list of all comments for a post</td>
</tr>
<tr>
<td>GET</td>
<td>/posts/:id/comments/new</td>
<td>return an HTML form for creating a new comment for a post</td>
</tr>
<tr>
<td>POST</td>
<td>/posts/:id/comments</td>
<td>create a new comment for a post</td>
</tr>
<tr>
<td>GET</td>
<td>/posts/:id/comments/:cid</td>
<td>display a specific comment for a post</td>
</tr>
<tr>
<td>GET</td>
<td>/posts/:id/comments/:cid/edit</td>
<td>return an HTML form for editing a comment for a post</td>
</tr>
<tr>
<td>PUT</td>
<td>/posts/:id/comments/:cid</td>
<td>update a specific comment for a post</td>
</tr>
<tr>
<td>DELETE</td>
<td>/posts/:id/comments/:cid</td>
<td>delete a specific comment</td>
</tr>
</tbody>
</table>

You can implement these routes in the same "posts.js" file. Notice the use of the two named parameters `:id` for the post and `:cid` for the comment.
