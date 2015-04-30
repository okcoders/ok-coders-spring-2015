OK Coders: Express Templates Exercises
===================================

For this assignment you will extend the blog application you began building in the previous exercises by adding view's for the various routes. You may either start from scratch and copy in the routing code from the previous assignment, or you make work from the existing assignment.

**From Scratch**

If you start a new application from scratch, be sure to initialize the express application with the `--ejs` argument to use the ejs templating system:

	$ express blog --ejs
	$ cd blog && npm install

**Upgrade Existing**

If you are extending an existing homework assignment you will need to  switch from the jade templating system which is used by default to the ejs templating system:

First, `cd` into your project directory in the terminal and install ejs:

	$ npm install ejs --save

That will install ejs and also modify the *package.json* file to mark it as a dependency.

Second, modify the *app.js* file so that ejs is used as the templating engine instead of jade. Replace the folowing line:

```js
app.set('view engine', 'jade');
```

with:

```js
app.set('view engine', 'ejs');
```

Third, remove the three *.jade* files in the *views* directory: *error.jade*, *index.jade* and *layout.jade*. You will need to build your own *.ejs* files in this folder to replace them.

## Render ejs templates for the posts resource

The bulk of the assignment consists of creating template files or the posts resource whose routes you set up in the previous assignment. In that assignment you simply called `res.send()` with placeholder content to confirm the routes were working. Here you'll call `res.render()` to actually render views.

You should create views and render them with data for the four `GET` requests handled by your routes. `GET` requests are the only ones which will generate html, so this makes sense:

<table>
<thead>
<tr>
<th>HTTP Verb</th>
<th>Path</th>
<th>Used for</th>
<th>View file</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET</td>
<td>/posts</td>
<td>display a list of all posts</td>
<td>posts/index.ejs</td>
</tr>
<tr>
<td>GET</td>
<td>/posts/new</td>
<td>return an HTML form for creating a new post</td>
<td>posts/new.ejs</td>
</tr>
<tr>
<td>GET</td>
<td>/posts/:id</td>
<td>display a specific post</td>
<td>posts/show.ejs</td>
</tr>
<tr>
<td>GET</td>
<td>/posts/:id/edit</td>
<td>return an HTML form for editing a post</td>
<td>posts/edit.ejs</td>
</tr>
</tbody>
</table>

Your views should do exactly what is described in the **Used for** column. In some cases you'll display a list of posts, which means you'll have to loop over an array in your view. In other cases you'll generate a form, and so on. Interpret the stylistic aspects as you see fit, but use twitter bootstrap templating in each case and wrap your content in a container:

```html
<div class="container">
	...
</div>
```

Also create links from the posts/index page to each respective post/:id page.

Organize your view files according to the **View file** column. Create a *posts* directory in the *views* directory and create four templates there: *index.ejs*, *new.ejs*, *show.ejs* and *edit.ejs*. Render each template according to the route being handled.

If you need help with twitter bootstrap, refer to: [Bootstrap Class](https://github.com/okcoders/ok-coders-spring-2015/tree/master/03-twitter-bootstrap).

**The Data**

But you'll need some data to inject into your views! Use the included *post.js* file. Create a *models* folder in your project's root directory and place *post.js* there. From inside your *routes/posts.js* file, require it and access posts as such:

```js
var Post = require('./../models/post');

// acquire an array of all posts
var posts = Post.all();

// acquire a single post, perhaps by a post id as a url param
var id = ...
var post = Post.find(id);
```

**Additional Routes**

Don't worry about implementing the other routes such as the `POST`, `PUT`, and `DELETE` routes. We'll add those once we've learned how to use a database and can actually create, update and delete blog posts.