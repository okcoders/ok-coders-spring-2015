Updating and Deleting Data
===================================

In this lesson we'll be wrapping up the CRUD operations. Updating and deleting are similar to creating in that both involve a two step process: get some kind of html document from one url that includes a form or a delete link and then request another url to actually perform the update or delete. We'll see, however, that making `PUT` and `DELETE` requests to a server in accordance with a resourceful routing specifications is not as straightforward as making `GET` and `POST` requests.

## References

[http://mongoosejs.com/](http://mongoosejs.com)

The mongoose homepage.

[mongoose documentation](http://mongoosejs.com/docs/api.html)

The mongoose API documentation.

[Idempotency](http://en.wikipedia.org/wiki/Idempotence)

Wikipedia's entry on idempotent operations.

[method-override](https://github.com/expressjs/method-override)

The method-override module allows us to use `PUT` and `DELETE` routes when browsers can only send `GET` and `POST` requests.

## Updating Data

Updating data is similar to creating data. We need to render a form for the update and then we need to handle the form data when it is sent to the server. Consequently we have two routes both of which are already defined:

	GET /posts/:id/edit
	PUT /posts/:id

The first route pulls the post from the database and renders it in an edit form. The second accepts the data. But notice we are requiring a `PUT` request this time instead of a `POST`, and this presents a bit of a problem.

**PUT vs POST**

When it comes to RESTful routing and resources, `PUT` is used to update an existing resource on a server while `POST` is used to create a resource.

More technically, `PUT` is defined by the http specification to be *idempotent* while `POST` is not. An idempotent operation is one which leaves a system in the same state no matter how many times that operation is performed. Execting an idempotent operation one time has the same effect as executing it one hundred times.

`POST` operations, on the other hand, are not idempotent. A second `POST` operation is permitted to leave a system in a different state from the first `POST` operation.

This is why http uses `POST` requests for creating data and `PUT` requests for updating data. If you `POST` the same data to `/posts` five times you will create five different blog posts. However, if you `PUT` the same data to `/posts/:id` five times, you will simply keep updating the same post with the same data. In one case you have changed the database five times, in the other you've effectively changed it only once.

**PUT in the browser: faking it**

Most browsers cannot handle `PUT` requests in forms, only `GET` and `POST` requests. We'll have to conform to this browser limitation and send a `POST` request when we really want to send a `PUT` request, but we'll use a workaround known as *method overriding* to fake a `PUT` request.

The method override workaround uses middleware to intercept the incoming http request to the server and modify it before it reaches our application's router. The middleware examines a `POST` request for a signature of our choosing, such as a hidden form field, and rewrites it to a `PUT` or `DELETE` request. Because the middleware makes this change before our router code, the router will only see a `PUT` or `DELETE` request an execute the correct route.

The method override workaround is implemented with the *method-override* package. Instal *method-override* and save it to package.json:

	$ npm install method-override --save

In *app.js* require in the package and tell express to use it. Place the call to `use` after the call to use the bodyParser:

```js
var methodOverride = require('method-override');
// ...
// already here:
app.use(bodyParser.urlencoded());
// add these line:
app.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));
```

This code uses a custom function for the method override middleware. The middleware will call our anonymous inline function for every request. Our function looks in the `POST` body for a property named `_method`. If it finds one it extracts the value of that parameter, deletes `_method` from the body, and returns the value it found. The method override middleware uses this returned value to override the request type.

For example, if our `POST` body contains a `_method=put` property because we included a form field whose name is `_method` and whose value is `put` then the middleware will rewrite the `POST` request to a `PUT` request but otherwise keep the body contents the same.

For the middleware to work we need to add the appropriate field to our edit form.

**Prepare the form**

The first step in the two step process of updating a post is to get the edit form. We set up that form in a previous lesson but now we need to make some modficiations to it. Open `views/posts/edit.ejs` and make the following changes.

First we must set the form's method and action. Remember that we have to set the `method` attribute to `post` even though we really want a `put` request. We should set the route to `/posts/:id` using the id from the targeted blog post. Add the `action` and `method` attributes to the form tag:

```html
<form role="form" action="/posts/<%=post.id%>" method="post">
```

But now we'll also add a hidden field that will tell the method override middleware to rewrite the `POST` request to `PUT` instead. We do this by including a hidden form field whose `name` is `_method`, which is exactly what the middleware looks for, and whose value in this case will be `put`:

```html
<input type="hidden" name="_method" value="put">
```

When this form is submitted the browser will still send a post request but the method-override middleware will intercept it before it reaches our application and turn it into a put request so that it is routed appropriately.

**Update the server**

We're ready for the second step of this process, handling the `PUT` request on the server. In `routes/posts.js` log `req.body` in the route `PUT /posts/:id` handler so that we can see the effect of submitting this form:

```js
router.put('/:id', function(req, res) {
  console.log(req.body);
  res.status(404).send('update post: ' + req.params.id);
});
```

Edit a post and submit the update. The change should appear in the console. We're now ready to update the entry in the database.

Once again mongoose provides a method for updating a document that is almost identical to its mongo equivalent, the `update` method, which takes a filter for selecting the documents to update and the update operation.

Mongoose also provides a *convenience method* for updating a single document when accessing it by its `id`, which is exactly what we want to do with our `PUT` operation.

Unfortunately neither of these operations performs validations on the changes. We'll learn more about validations below, but for now know that bypassing validations largely defeats the purpose of defining a schema in the first place. Consequently we'll instead need to find the object by its id, manually update each field that might be changed, and save the changes, which will run the mongoose validation code.

Let's build this up by pieces. First replace:

```js
router.put('/:id', function(req, res) {
  console.log(req.body);
  res.status(404).send('update post: ' + req.params.id);
});
```

with:

```js
router.put('/:id', function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      console.log("db find error in PUT /posts/" + req.params.id + ": " + err);
      res.render('500');
    } else if (!post) {
      res.render('404');
    } else {
      // update post
    }
  });
});
```

All we're doing here is the same thing we do when we find an post for the show route. We include error checking in case something goes wrong with the database operation or the post doesn't exist.

If we find the document we're ready to update it in the final `else` block. Update the post properties than can be changed, e.g. the title and body, and then save the changes with the `save` command. Check for errors in that callback as well, and once again if the operation is successful set a flash message and redirect to the post's page:

```js
// update properties that can be modified. assumes properties are set in request body
post.title = req.body.title;
post.body = req.body.body;
 
post.save(function(err) {
if (err) {
  console.log("db save error in PUT /posts/" + req.params.id + ": " + err);
  res.render('500');
} else {
  var url = '/posts/'+post.id;
  req.flash('success', 'Post updated');
  res.redirect(url);
}
});
```

Alltogether the `PUT /posts/:id` handler now looks like:

```js
router.put('/:id', function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      console.log("db find error in PUT /posts/" + req.params.id + ": " + err);
      res.render('500');
    } else if (!post) {
      res.render('404');
    } else {
      // update properties that can be modified. assumes properties are set in request body
      post.title = req.body.title;
      post.body = req.body.body;
      
      post.save(function(err) {
        if (err) {
          console.log("db save error in PUT /posts/" + req.params.id + ": " + err);
          res.render('500');
        } else {
          var url = '/posts/'+post.id;
          req.flash('success', 'Post updated');
          res.redirect(url);
        }
      });
    }
  });
});
```

Restart the server and visit a post. Update it and submit the updates. The changes should be saved to the database and you should be redirected to the post's page with a flash.

## Deleting Data

Deleting data is the most straightforward operation we can perform. We've already set up a route to delete data, `DELETE /posts/:id`, so once again we need to create a link somewhere that targets that route and then actually delete the targeted post in the database.

**Prepare the show form**

The obvious place for the delete link is on the post itself because we are always deleting a single post. Examine `views/posts/show.ejs` and you'll see a collection of links such as "Back to Posts", "Comments", "Edit" and "Delete".

The first three work as you expect them to. They all make `GET` requests to a particular url, so we can just use the anchor tag `a` with an `href` attribute. We can't, however, do the same with the delete link. The server expects a `DELETE` request to `/posts/:id` but  browsers can't natively generate `DELETE` requests from links. As with updating data, the solution is to use a form and add a hidden `_method` field.

Replace

```html
<li><a href="" class="text-danger">Delete</a></li>
```

with:

```html
<li>
  <form role="form" name="deletepost" action="/posts/<%=post.id%>" method="post">
    <input type="hidden" name="_method" value="delete">
    <a href="#" onclick="document.deletepost.submit(); return false;" class="text-danger">Delete</a>
    <noscript><button type="submit" class="btn btn-default text-danger">Delete</button></noscript>
  </form>
</li>
```

That's quite a bit of work to fake a `DELETE` request. Let's examine this.

First we're just creating a form with a hidden input field like we did for the `PUT` request. Notice that the form itself has a `name` attribute as well. Then we're embedding a "Delete" link in the form so that it looks like the rest of the links at the bottom of a post.

But our link has a bit of client side javascript in it which we haven't covered in this course. That `onclick` attribute is a javascript event handler that is executed when the link is clicked. It contains javascript which get the form by its name and manually submits it. This way we can have a link submit the form instead of a button.

Finally we add a normal form button in case javascript is disabled by embedding it in a `noscript` tag. This ensures that the user can still delete a post even if they don't have javascript.

So really all this extra code is just so that we can have a form that looks like a link, which is aesthetically pleasing when all of those other items like "Show Comments", "Update", etc are also links.

Confirm this is working by visiting a particular post and clicking delete. You should receive the message "delete post :id", which is what our templated `DELETE` route currently returns.

**Delete the data**

Back in the route handlers we have a simple job. All we have to do is pull the post's id from `req.params` and call the appropriate mongoose method on the `Post` model. 

As with the mongo command line client mongoose provides a `remove` method on its model objects. This takes a query object that targets a subset of documents in a collection and removes them.

Mongoose also provides the convencience method `findByIdAndRemove` which takes an object's id and removes just that document. This is exactly what we'd like to do so we'll use this method instead.

The `findByIdAndRemove ` method takes a single `err` parameter for its callback, which we'll check as we've been doing before. If there is no error we'll redirect back to the posts listing and flash a message confirming that the post was successfully deleted.

Replace the current templated `DELETE /posts/id:` route handler:

```js
router.delete('/:id', function(req, res) {
  res.status(404).send('delete post ' + req.params.id)
});
```

with:

```js
router.delete('/:id', function(req, res) {
  Post.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log("db save error in DELETE /posts/" + req.params.id + ": " + err);
      res.render('500');
    } else {
      req.flash('success', 'Post deleted');
      res.redirect('/posts');
    }
  });
});
```

Finally we'll also need to check for the existence of a flash message in the posts index view and show it if necessary. Modify `views/posts/index.ejs` and add the same flash code we're using in `views/posts/show.ejs`:

```html
<% if (message.success) { %>
  <div class="alert alert-success" role="alert">
    <%=message.success%>
  </div>
<% } %>
```

We add this because the `DELETE /posts/:id` route redirects back to the post listing and not a particular post.

Confirm everything is working. Restart the server, visit a post and delete it. You should be redirected to `/posts` with a flash message and the deleted item will no longer appear in the listing.

Congratulations! You just fully implemented *CRUD* on the posts resource. Users can now create, retrieve, update and delete blog posts using your web application.

## Data Validation and Transformations

We've already seen that a mongoose schema allows us to specify more than the type of a property. We can also include additional directives such as a default value:

```js
var schema = mongoose.Schema({
  title: {type: String, default: ""},
  // ...
});
```

Mongoose permits a number of other directives for model properties that broadly fall into two categories: transformations and validation. 

**Transformations**

Property transformations make changes to a property when it is set and prior to saving it to the database.

For example, *trimming whitespace* is a common data transformation for strings. When entering data a user may inadvertently include a couple of extra spaces, tabs or newlines before or after the actual content. Trimming is the process of removing that extra, unwanted whitespace.

With mongoose we may add a `trim: true` directive to a model property to have mongoose automatically trim the data. Add trimming to a Post title by including the directive in the `title` property object:

```js
var schema = mongoose.Schema({
  title: {type: String, default: "", trim: true},
});
```

Another transformation might convert string input to lowercase characters with the `lowercase: true` directive.

**Validations**

Validations are a powerful feature of mongoose schemas. A validation directive performs a check on a property value to ensure it conforms to some specification. If it does not mongoose raises an error when you attempt to save the object to the database. The save operation fails and an error message is set in the callback. This gives you the opportunity to examine the error message and instruct the user to alter their input.

For example a common validation is to *require* that a model object actually have a value set for a particular property. For example we might want to require that a blog post have a title and a body. If the user submits a post without a title or body, perhaps by mistake, the database operation will fail and mongoose will provide us with an instructive error that we can pass on to the user, such as: "a title is required!"

Require a property by including the `required: true` directive. In place of true you may specify the error message you would like to receive when the validation fails: `required: 'A title is required'`. Add the required directive to the title and body properties for the post schema:

```js
var schema = mongoose.Schema({
  title: {type: String, default: "", trim: true, required: 'A title is required' },
  body: {type: String, default: "", trim: true, required: 'A post body is required',},
  author: Number
});
```

Another common validation ensures that a property has a unique value across all documents of that type in the database. For example email is commonly required to be unique. When a person signs up for your application the email they provide should not be in use by another user. If it is the signup should be prevented with a message like "This email is already in use." Perhaps the user forget they already signed up for your service or forgot their password, or perhaps they just mistyped their email address. In any case, because email is often used as a unique identifier for an account a new user should not be able to use an existing user's email address.

Add a unique validation check with the `unique: true` directive.

Mongoose supports more complex validations, such as matching a regular expression against a string value and providing a custom error message, but these are beyond the scope of this chapter.

**Checking for validation errors**

Now that we've added validations let's see what their effect is. Restart the server and try to create a new post but leave the title blank. You should be redirected to the 500 error page and see an error message printed to the console:

	db error in POST /posts: ValidationError: A post body is required, A title is required

This error message is the result of mongoose validating the post and seeing that the title is empty. Our route handler checks for errors and prints them to the console with:

```js
if (err) {
 console.log("db error in POST /posts: " + err);
 res.render('500');
} else ...
```

Right now we're showing the 500 error page but this isn't really an internal server error. This is a validation error because of bad user input. Let's handle this error. Our error checking code should check to see if this is a validation error and if it is pass the error back to the user, giving them a chance to fix the mistake.

This will require quite a bit of modification to the `POST /posts` handler. Let's replace the javascript at one go and then break it down.

Replace:

```js
router.post('/', function(req, res) {
  Post.create( req.body, function(err, post) {
    if (err) {
      console.log("db error in POST /posts: " + err);
      res.render('500');
    } else {
      var url = "/posts/"+post.id;
      req.flash('success', 'A new post was created');
      res.redirect(url);
    }
  });
});
```

with:

```js
router.post('/', function(req, res) {
  var post = new Post(req.body);
  post.save(function(err) {
    if (err && err.name == "ValidationError") {
      res.locals.message = {'danger': err};
      res.render('posts/new', {post: post});
    } else if (err) {
      console.log("db error in POST /posts: " + err);
      res.render('500');
    } else {
      var url = '/posts/'+post.id;
      req.flash('success', 'A new post was created');
      res.redirect(url);
    }
  });
});
```

Let's break this down. First we replace the convenience method `Post.create` with two lines of code:

```js
var post = new Post(req.body);
post.save(function(err) {
```

Instead of directly creating a new post document first we *instantiate* and instance of it with the `new` keyword, still passing the `req.body` content to `Post()`, and then we save it. This allows us to preserve any input the user provides even if validation fails. For example, the new `post` object will still contain the body content even if the user didn't supply a title. We're going to use that partially formed `post` when we re-render the new post form after checking for validation errors. `Post.create` on the other hand won't preserve any correct input in its callback.

In our save callback we then check for a validation error before checking for other errors:

```js
if (err && err.name == "ValidationError") {
```

We know mongoose sets the `err.name` to `ValidationError` because of their documentation.

If we have a validation error we want to render a flash message back to the user with the error as its contents. Flash messages, however, only work for redirects and we won't be redirecting here. Instead we'll directly re-render the new post form with the partially completed post. So instead we set the `res.locals.message` property directly, which is what a flash does anyway. This time we'll use a `'danger'` key for the message instead of `'success'`:

```js
res.locals.message = {'danger': err};
res.render('posts/new', {post: post});
```

Challenge: why doesn't a redirect work? What kind of changes would we need to make to the code for it to work?

The rest of the code remains the same. We go on to check for other errors and render the 500 page if we find one, or we redirect to the new post's page upon successful creation.

**Rendering the error message**

We're checking for validation errors in our router code and passing them to the new post view through `res.locals.message`, but that view is not rendering them yet. We need to modify `views/posts/new.ejs` to check for the presence of a `message.danger` flash and render it accordingly:

```html
<% if (message.danger) { %>
  <div class="alert alert-danger" role="alert">
    <%=message.danger%>
  </div>
<% } %>
```

Notice I'm using the bootstrap `alert-danger` class for the alert. Restart the server and create a new post with a blank title and body. The validation error shows up. Add a title but leave the body blank. The validation error still occurs for the body but the title is preserved. Finally add a body and now the post is accepted.

**Add validation checking to `PUT /posts/:id`**

We should perform the same validation checking and error messaging when the user tries to update a post. In the `post.save` callback we already have, add validation error checking. Replace:

```js
post.save(function(err) {
  if (err) { 
  ...
```

with:

```js
post.save(function(err) {
  if (err && err.name == "ValidationError") {
    res.locals.message = {'danger': err};
    res.render('posts/edit', {post: post});
  }
  else if (err) { 
  ...
```

Notice that we rerender `posts/edit` here and not `posts/new`. The rest of the code may be left the same, so that the `PUT /posts/:id` route handler now looks in its entirety like:

```js
router.put('/:id', function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      console.log("db find error in PUT /posts/" + req.params.id + ": " + err);
      res.render('500');
    } else if (!post) {
      res.render('404');
    } else {
      // update properties that can be modified. assumes properties are set in request body
      post.title = req.body.title;
      post.body = req.body.body;

      post.save(function(err) {
        if (err && err.name == "ValidationError") {
          res.locals.message = {'danger': err};
          res.render('posts/edit', {post: post});
        }
        else if (err) {
          console.log("db save error in PUT /posts/" + req.params.id + ": " + err);
          console.log(err.errors);
        } else {
          var url = '/posts/'+post.id;
          req.flash('success', 'Post updated');
          res.redirect(url);
        }
      });
    }
  });
});
```

Notice that most of the code is for error checking!

Finally add the flash message code for `message.danger` in `views/posts/edit.ejs` so the user will actually see the validation error:

```html
<% if (message.danger) { %>
  <div class="alert alert-danger" role="alert">
    <%=message.danger%>
  </div>
<% } %>
```

## In Conslusion

At this point we now have a fully distributed web application with support for creating, updating, retrieving and deleting blog posts that also performs validation and prevents our users from making mistakes when creating and updating posts.

The code that has been developed for the posts resource is code that can be used for any resource, as the CRUD operations with validation and error handling typically need to be performed for any kind of data supported in an application.

But our blogging application isn't finished quite yet. Still missing is access control. Anyone can create a new post! In our next lesson we'll add support for administrative users and require that a user be signed in in order to create or modify posts.

<!--
## Security Considerations

Preventing arbitrary data from being added to the database

...

Preventing cross-site scripting attacks

...
-->