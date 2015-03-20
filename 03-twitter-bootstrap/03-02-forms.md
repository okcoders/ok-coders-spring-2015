Bootstrap: Introduction to forms
====

Forms are an important part of any web application. They allow a site to gather information from its users and are used for signing up, logging in,  uploading content, and making changes to that content. They are also ugly. Fortunately bootstrap provides a large collection of styles related to forms.

Forms are composed of input elements such as text fields, larger text areas, selection menus, checkboxes and file selectors. Often a label accompanies each input element to identify its purpose to the user. To prevent the elements from appearing disorganized, the labels and elements are typically grouped. Bootstrap provides styling for each component and offers differnet ways to group elements together.

Create a new page *forms.html* in your application's *public* directory and copy the bootstrap template into it, but don't fix the stylesheet and javascript links just yet. Let's start a form without the bootstrap styling to see how it looks.

## References

[Bootstrap Forms](http://getbootstrap.com/css/#forms): Documentation and example for bootstrap forms styling.

[Mozilla Forms Guide](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms): Learn more about forms from the Mozilla Developer Network. 

## Form Input

Form elemnts are contained in a `form` tag:

	<form>
		...
	</form>
	
Begin with `input` elements to provide a text area for users to type in information. A couple to the form for an email address and password. Notice that `input` is a self-contained tag.

	<form>
		<input>
		<input>
	</form>

The page now contains two inputes fields the user can click on to begin typing.

Inputs normally have a `type` attribute. By default the `type` is text, but there are many other types and a number of new types in html5. Set the type of the first form to `email` and the type of the second to `password`:

	<form>
		<input type="email">
		<input type="password">
	</form>

The form still looks the same. Both inputs still accept text. But now the password's text is hidden as you type it and the email field will show a special keyboard on mobile devices. In addition, some browsers automatically *validate* the text in the email field to ensure it is in the form of an email address. Let's see this effect by adding a submit button to the bottom of the form

	<form>
		<input type="email">
		<input type="password">
		<button type="submit">Submit</button>
	</form>

Try submitting an email address that does not contain the `@` sybmol. Chrome doesn't allow it, although it still allows other invalid email addresses. Custom javascript code is typically included to handle completed validation.

Add a checkbox to the form for keeping the user logged in:

	<form>
		<input type="email">
		<input type="password">
		<input type="checkbox"> Keep me logged in
		<button type="submit">Submit</button>
	</form>

Checkboxes are kind of strange. Notice that the text associated with the checkbox in the interface isn't really associated with it symantically in the html. It just hangs out next to it in the code.

Although we aren't building web inputs yet, it is important to add an `id` field to each input element. We'll see that the `id` field is how the web server identifies the value for each input. In the past, servers used the `name` field to identify data, but this is no longer required. Use `id` instead:

	<form>
		<input type="email" id="user-email">
		<input type="password" id="user-password">
		<input type="checkbox" id="user-remember"> Keep me logged in
		<button type="submit">Submit</button>
	</form>
	
## Form Labels

We can label our input fields so that a visitor to the site knows what they are. Labels also use the `id` field so that the browser knows which label belongs to which input. 

Add labels to the email and password inputs with the `label` tag. Use the `for` attribute with the input's `id` to associate them with their inputs. Place them before the input element, and clean up the html so that the organization is apparent at least in the code:

	<form>
		<label for="user-email">Email address</label>
		<input type="email" id="user-email">
		
		<label for="user-password">Password</label>
		<input type="password" id="user-password">
		
		<input type="checkbox" id="user-remember"> Keep me logged in
		
		<button type="submit">Submit</button>
	</form>

Add a `label` to the checkbox simply by surrounding the entire input and text with a `label` element. A `for` attribute is not necessary because the label actually contains the checkbox.

	...
	<label>
		<input type="checkbox" id="user-remember"> Keep me logged in
	</label>
	...

## Input Groups

The form is functional but disorganized. Visually group the labels and inputs by surrounding each pair with a `div` tag. The is a common use for the `div` tag, which acts as an organizing unit in html:

	<form>
		<div>
			<labe for="user-email">Email address</label>
			<input type="email" id="user-email">
		</div>
		<div>
			<label for="user-password">Password</label>
			<input type="password" id="user-password">
		</div>
		<div>
			<label>
				<input type="checkbox" id="user-remember"> Keep me logged in
			</label>
		</div>
		<button type="submit">Submit</button>
	</form>

Visually, it's not entirely clear if that's an improvement. It will be when we add the bootstrap styling.

## Bootstrap It

Fix the template so that the `link` and `style` tags point to the right files:

	...
	<link href="stylesheets/bootstrap.min.css" rel="stylesheet">
	...
	<script src="javascripts/bootstrap.min.js"></script>
	...

All that is neeed now is to add the bootstrap classes to the form tags. Once again, simply follow the example documentation. Start by adding the `role="form"` attribute to the form itself:

	<form role="form">

Then add the `form-group` class to the `div` tags for the email and password fields:

	<div class="form-group">
		...
	</div>

And add the `checkbox` class to the `div` for the checkbox field:

	<div class="checkbox">
		...
	</div>

Next add the `form-control` class to the email and password inputs:

	<input class="form-control" ... > ... </input>

Finally, add the two classes `btn` and `btn-default` to the submit button, separating them with a space:
		
	<button type="submit" class="btn btn-default">Submit</button>
	
The form is looking good. Let's give it some panache. Add *placeholder text* to the email and password fields. Placeholder text is text that appears in a field until something is typed into it and is often used to convey additional information about that field to the user. `input` elements have a `placeholder` attribute:

	...
	<input type="email" placeholder="Valid email address" ...>
	...
	<input type="password" placeholder="Password" ...>
	...
	
And change the buttons `btn-default` class to `btn-primary` for a bit of color:

	<button type="submit" class="btn btn-primary">Submit</button>
	
Everything is set but the size of the form is off. It occupies the entire page. We already know we can use the `container` class to center content in the page with a margin. Surround the entire body contents with a container div:

	<body>
		<div class="container">
		...
		</div>
	</body>

## Custom Styling

A little bit of spacing goes a long way, but the form is still huge. Recall that we can set the width and height of elements and that we can further center them with the `margin: 0 auto` style. 

Surround the form and its header with a `div` whose class is `form-container` and style that class so its width is `500px` and it is centered on the page. Place the css in a `style` tag at the top of the page for now.

css

	<style type="text/css">	
		.form-container {
			width: 500px;
			margin: 0 auto;
		}
	</style>

html

	...
	<div class="form-container">
		<form role="form">
		...
		</form>
	</div>
	
Now that looks good.

Forms are a much more comprehensive topic and support many more input types. We will cover forms in greater detail in later lessons. For now refer to the [bootstrap forms documentation](http://getbootstrap.com/css/#forms) and [mozillas forms guid](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms).