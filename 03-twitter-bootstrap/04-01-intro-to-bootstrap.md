Bootstrap: Styles Fast
====

Over and over web designers need to implement the same styles and layouts for their web pages. They use common *interface patterns* such as navigation bars, menus, buttons, tables, lists, sidebars and so on, and they must redesign these elements for each site they create. Twitter has solved this problem with bootstrap.

Bootstrap provides a collection of styles that make it easy to develop good looking interfaces quickly. The stylesheets include styling for all of the common user interface elements mentioned above and more. Collections of code like this are called *frameworks.*

Bootstrap has compiled these common interface patterns into self contained css classes. All we have to do is find the right class and add it to our html tags, minding the html structure as we go.

In programming lingo, twitter bootstrap allows us to move to the *domain specific* work on our site quickly, skipping the stuff every site needs.

We can of course continue to customize our site. Think of bootstrap as a foundation. It provides re-usable components, but you don’t have to use all of them. In fact, because styling can be overridden, you can customize the look of bootstrap, and you can include your own css unrelated to bootstrap.

Bootstrap is also *responsive*. Responsive design adds special `@media` declarations in the css to alter the look of a site according to the size of the window displaying it, making it possible for the same site to render differently on a phone, a tablet, and a desktop.

Finally, twitter bootstrap includes javascript for dynamic components such as dialog boxes that can be dismissed, alerts and tabs.

This chapter will look at installing bootstrap, typography, common components, and the grid system that underpins most layout with bootstrap.

## References

[Twitter Bootstrap](http://getbootstrap.com/): The Bootstrap homepage. This is **the** reference source for all questions bootstrap.

[Blueprint](http://www.blueprintcss.org/): An alternative, more minimalistic css framework.

## Installing Bootstrap

<!-- lets get in the habit of using git -->

First make sure you are using bootstrap 3 with the purple pages. Download the bootstrap files from the homepage and unzip them. Install the files in the public directory of an express application. Place the *css* files in *stylesheets*, the *js* files in *javascripts*, and the *fonts* files in a *fonts* directory that you create in *public*.

Examine the `bootstrap.css` file. Notice that it's just a large collection of css classes. The file begins with what is called *normalization*, overriding all the default browser styles so that pages look consistent across browsers and operating systems. Then it builds up styles for the custom classes that we'll be using.

## Using Bootstrap

Every html document that uses bootstrap styling must link to the downloaded files. Bootstrap provides a template that we'll use with some modifications. Always use to the [latest version of the template](http://getbootstrap.com/getting-started/#template) from Bootstrap's Getting Started section. Here is the current version:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
```

Create an *index.html* file for the express application and copy the template into it. Add a couple of paragraphs of [lorem ipsum](http://www.lipsum.com/) (or use Sublime's shortcut) in order to make the effect of applying bootstrap's styles more pronounced.

View the page in your express application at `http://localhost:3000`. Don't forget to start it with `npm start`. At this point the page looks no different that any other. Bootstrap's styles have not taken effect. Why?

The links in the document point to files in the *css* and *js* directories, but the express application's public directory uses folders called *stylesheets* and *javascripts*. Fix the `link` and `script` tags so that they point to the correct files:


	<link href="stylesheets/bootstrap.min.css" rel="stylesheet">
	...
	<script src="javascripts/bootstrap.min.js"></script>
	...

	
Make sure the browser's window occupies most of the screen and refresh the page. Notice how different it looks. Margins and padding have disappeared, the font face has changed and the sizes are different. Bootstrap styles are now in effect.

## Basic Bootstrap

Taking advantage of bootstrap is as simple as adding classes to html tags or using tags that have nicer default styling. The correct approach is to familiarize yourself with bootstrap's styles and apply them where you like. Use the online documentation.

For example, to give the first paragraph a *lead body copy* effect, add the `lead` class to it:

	<p class="lead"> ... </p>
	
Justify the paragraph's text alignment with the `text-justify` class. Remember you can add more than one class to a tag by separating them with spaces:

	<p class="lead text-justify"> ... </p>
		
Set the text's foreground color with one of the **contextual colors** classes. Target the `h1` tag and make it the primary color, blue:

	<h1 class="text-primary"> ... </h1>
	
Set a **contextual background** on the second paragraph with one of the `bg-` classes. Try a nice light blue with `bg-info`:

	<p class="bg-info"> ... </p>
	
Remember to save the html document and refresh the page to see the changes.
	
Notice how the text runs right up against the edge of the background color. Twitter bootstrap has *zeroed out* the paragraph padding. Return some of the padding with a custom `padded` class that only targets paragraphs. Place it in a style tag at the top of the page for now:

css

	<style type="text/css">	
		.padded {
			padding: 6px;
		}
	</style>

html

	<p class="bg-info padded"> ... </p>
		
Remember that custom styling is still possible with Twitter bootstrap. You can continue to define your own styles and even override bootstrap's styles.

Add a few more elements to the page. Start with a table below the last paragraph. Make sure to add the `class="table"` attribute to it as the bootstrap documentation instructs. Recall that a table is composed of rows using the `tr` tag and that the first row has headers with the `th` tag and later rows *data cells* with the `td` tag:

	<table class="table">
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Favorite Music</th>
      </tr>
      <tr>
        <td>Philip</td>
        <td>Dow</td>
        <td>Electronic</td>
      </tr>
      <tr>
        <td>Michael</td>
        <td>Jackason</td>
        <td>Pop</td>
      </tr>
    </table>

Further customize the table's appearance with additional classes on the `table` tag. Follow the examples and give the table a border and striped rows:

	 <table class="table table-bordered table-striped"> ... </table>

Finally, it is a common practice to center a page's content in the browser window with some margins on the sides. Bootstrap's `container` class achieves this effect. Surround the page's entire content with a new `div` tag, from the heading at the top to the table at the bottom, and assign it the `container` class:

	<body>	

		<div class="container">
		
			<h1 class="text-primary"> ... </h1>
			<p class="lead text-justify"> ... </p>
			...
			<table class="table table-bordered table-striped"> ... </table>
			
		</div>
	
	</body>

Refresh the page. It's really a lovely effect. With just the tiniest effort bootstrap gives pages a clean, modern style that is effective for rapid web application development and especially effective for data intensive applications where content may be more important that a custom appearance.

But wait, there's more! Resize the browser's window. Make it smaller and larger. As you adjust the window's size, bootstrap's styles automatically accomodate for the smaller space. This is *responsive* design, design that is responsive to the window's size, and it ensures that sites render nicely on phones, tablets and desktops.

There are many more bootstrap style classes. Review the documentation.