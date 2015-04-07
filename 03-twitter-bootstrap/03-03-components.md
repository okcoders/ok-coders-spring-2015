## Bootstrap: Components

Bootstrap provides a number of reusable components for common interface patterns. These are user interface elements like navigation bars, menu items, tab bars, alerts, lists and so on.

So far we've taken advantage of bootstrap by adding classes to html tags or simply by using tags that have new default styling. Components are more complex and typically require a certain html structure in addition to the correct classes.

## References

[Bootstrap Components](http://getbootstrap.com/components/): Examples and documentation for bootstrap's components.

[Bootstrap JavaScript](http://getbootstrap.com/javascript/): Examples and documentation for bootstrap's dynamic elements. Many components leverage javascript for their effects.

## Navigation Bars

A navigation bar is an interface element that appears at the top of a web site. It contains links to a site's most important pages and may also have buttons or form elements for signing in.

Create a new page *components.html* in your *public* express directory and copy the bootstrap template into it. Don't forget to fix the `link` and `script` tags:

	...
	<link href="stylesheets/bootstrap.min.css" rel="stylesheet">
	...
	<script src="javascripts/bootstrap.min.js"></script>
	...
	
Create a new `container` div and add a number of paragrpahs of [lorem ipsum](http://www.lipsum.com/) (or use Sublime's shortcut), enough so that the page scrolls:

	<body>
		<div class="container">
			<h1>Components</h1>
			<p>Lorem ipsum  ... </p>
			<p>Lorem ipsum  ... </p>
			...
			<p>Lorem ipsum  ... </p>
		</div>
	</body>
	
Twitter provides very nice navigation bar styling and makes it easy to have fixed or static bars. The example navigation bar is overly complex, so start with something simpler. Place the following html at the top of the page, outside the container:

	<nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        
          <ul class="nav navbar-nav">
            <li><a href="index.html">Home</a></li>
            <li><a href="forms.html">Forms</a></li>
            <li class="active"><a href="components.html">Components</a></li>
          </ul>

      </div>
    </nav>
    
`nav` is a new html5 tag that that identifies navigational components on a page. The `navbar` and  `navbar-default` classes add the necessary styling. 

Inside the navbar add a `ul` with `nav` and `navbar-nav` classes to add navigational links, then add list elements `li` as you normally would. Links inside them point to different pages on the site. 

Additional styling can be added to the navbar by appending classes to the `nav` element. Make the navigation bar static with `navbar-static-top`:

	<nav class="navbar navbar-default navbar-static-top" role="navigation">
	...
	
To fix the navbar to the top of the page, use `navbar-fixed-top` instead:

	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
	...
	
The navbar no longer scrolls away, but now the page's content is hidden underneath it. Fix this by adding `padding-top` to the `body`. But add this style to the *style.css* file that express generates and link to it from the html. Delete the other styles from that file:

css

	body {
	  padding-top: 70px;
	}
	
html

	<link rel="stylesheet" type="text/css" href="stylesheets/style.css">
	
The page now has enough space at the top to contain the navigation bar without hiding the content.

Notice that the `active` class is used with the `li` element in the navigation bar to indicate which page the user is on. The links actually work because we already have the *index.html* and *forms.html* page on our site.

Copy the navbar to those other pages. Just place it at the top of the body above the other content. Be sure to change the `active` link so that it correctly refelects the currently page. Also be sure to add the link to the stylesheet so the correct padding is applied.

You now have the rudiments of a pretyt nice looking web site.

## More Static Components

**Alerts**

Developers use alerts to let visitors know whether their actions on the site have succeeded. When a user logs in, an alert might let them know they are logged in. When a form is submitted, an alert can indicate if the input was successfully processed or not.

Add an alert to the top of the component's page, the first item inside the container:

	<div class="container">
		
		<div class="alert alert-success">
			You're now logged in   
		</div>
		
		...
	</div>

Alerts like this are called *flashes* and are designed to disappear on the next page a user visits. They are temporary indications of success or failure.
	
**List Group**

A common interface pattern allows users to select from a list of items, each of which has some content that is displayed when the item is selected. Bootstrap provides a component for styling the list. It is called a list group and is constructed with the `ul` and `li` tags you are already familiar with. Add the `list-group` and `list-group-item` classes appropriately:

	<ul class="list-group">
		<li class="list-group-item">Cras justo odio</li>
		<li class="list-group-item">Dapibus ac facilisis in</li>
		<li class="list-group-item">Morbi leo risus</li>
		<li class="list-group-item">Porta ac consectetur ac</li>
		<li class="list-group-item">Vestibulum at eros</li>
	</ul>
	
Make the list group selectable by using a `div` tag instead of a `ul` and links `a` instead of `li`. Keep the classes you've already added:

	<div class="list-group">
		<a class="list-group-item">Cras justo odio</a>
		<a class="list-group-item">Dapibus ac facilisis in</a>
		<a class="list-group-item">Morbi leo risus</a>
		<a class="list-group-item">Porta ac consectetur ac</a>
		<a class="list-group-item">Vestibulum at eros</a>
	</div>
	
Notice that you can now hover over each element. If the links were setup with `href` attributes, you could click them.
	
Attach the `active` class to one of the links to indicate that it is selected:

	<a class="list-group-item active">Cras justo odio</a>

**Panels**

For the last static example, add a panel to the page. A panel requires two `divs`. The first acts as a container and the second holds the body:

	<div class="panel panel-default">
		<div class="panel-body">
			Basic panel example
		</div>
	</div>
	
Add a header to the panel with another `div` whose class is `panel-heading`. Add whatever content you want to it. For example, use an `h3`:

	<div class="panel panel-default">
		<div class="panel-heading">
			<h3>Panel heading</h3>
		</div>
		<div class="panel-body">
	    	Panel content
		</div>
	</div>
	
## JavaScript Components

*Dynamic* components add interactivity to the page. For example, clicking on a button may show an alert box or reveal a form.

Bootstrap uses [jQuery](http://jquery.com/) to implement its dynamic interfaces. Because of how jQuery works and how Bootstrap enables interactivity, it is possible to add dynamic components to a site just be setting the css classes! We'll learn more about this in later lessons. Here is a peak.

**Modal Dialogs**

A modal dialog isolates the interaction on the page so that the dialog receives focus and the user can interact with it alone until it is closed. Add a modal dialog to the page with a number of `divs` and classes and include a `button` element to trigger the dialog:

```html
<!-- Button trigger modal -->
<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

Click on the *Launch demo modal* button. A dialog appears that must be closd before the rest of the page is usable. Let's break the markup down for this component.

On the button, the `data-toggle` attribute lets bootstrap know this button  shows something. Bootstrap's javascript knows to show the modal below it because the button's `data-target` attribute is set to the modal's `id`.

For the modal, the appropriate classes identify its function and initially hide it from view. Inside the modal, various classes break its structure down into more managable components. The modal is identified as a dialog with content that contains a head, body and footer. Various classes set styling for the header and other components, and buttons are added to the footer.

To understand any complex html structure, break it down into its parts and refer to documentation.

Bootstrap provides many more dynamic interface components. We'll learn how to use some of them in later chapters. For now have fun exploring.