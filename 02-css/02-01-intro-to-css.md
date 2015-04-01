CSS: Cascading Style Sheets
====

CSS controls the appearance of a document, including stylistic aspects such as color and font as well as layout like position, margin, and padding. CSS allows us to define how a document looks separately from its structure, which is html's responsibility.

## References

[CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)

The Mozilla Developer Network provides a CSS reference.

[CSS Colors](https://developer.mozilla.org/en-US/docs/Web/CSS/color)

Mozilla includes a page about CSS Colors.

[Code Academy html & css](http://www.codecademy.com/tracks/web)

Code Academy offers an html & css track. It's great practice. Skip ahead to the css if the html is too easy.

## Style definitions

CSS works by targeting elements of an html document with what are called *selectors* and associating *style declarations* with them.

The syntax is straightforward. Begin with the selector and follow it with open and closed curly braces. Inside the braces include individual declarations. Each declaration begins with a css property followed by a colon and the property's value. End the declaration with a semicolon:

	selector {
		property1: value1;
		property2: value2;
		property3: value3;
		...
	}
	
For example, add a border to all divs with the `border-width`, `border-style` and `border-color` properties:

	div {
		border-width: 1px;
		border-style: solid;
		border-color: black;
	}
	
CSS provides shortcuts that allow you to define many properties in one declaration. `border` is such a shortcut and includes the width, style and color in a single declaration:

	div {
		border: 1px solid black;
	}
	
Formally, it's syntax is:

	selector {
		border: width style color
	}
	
And more generally, properties that specify multiple values at the same time look like normal selectors but with the values separated by a space:

	selector {
		property: value1 value2 value3 ...
	}

Multiple style definitions are of course permitted. Separate them with with whitespace. No additional commas, colons or other characters are required:

	selector1 {
		property: value;
	}
	
	selector2 {
		property: value;
	}

Comments may be added to a stylesheet by placing them inside a `/* ... */` grouping:

	/* style declaration for all divs adds a black border */
	
	div {
		border: 1px solid black;
	}


<!--- Include some examples --->


## Style Sheets

Delcarations must be defined in an html document or referenced from it in order to take effect. There are three ways to include css in an html document:

**Inline**

Add a `style` attribute directly to the html tag and include the style declarations in quotes:

	<div style='border: 1px solid black;'>...</div>

Inline style declarations are a last resort. The purpose of css is to separate the presentation from the html. When we add css to the html itself, we break that *separation of concerns* and make it difficult to alter the style of the document later.

**Style tag**

HTML includes a `style` tag in which style definitions can be collected. Place the tag at the top of the document, typically in the `head`, and define the styles normally:
	
	...
	<head>
		<style>
			div {
				border: 1px solid black;
			}
		</styl>
	</head>
	...

**Style Sheets**

More commonly, styles are defined in a separate document with the `.css` extension and linked to from the html document. Create a css document with your definitions:

	/* file global.css in stylesheets directory */
	/* path is stylesheets/global.css */
	
	div {
		border: 1px solid black;
	}
	
Then link to that document from the html with a `link` tag, again usually placed in the document `head`:

	...
	<head>
		<link rel='stylesheet' type='text/css' href='/stylesheets/global.css'>
	</head>
	...
	
Notice that `link` is a self-contained tag with three attributes that must be defined.

Stylesheets are considered a best practice. Stylesheets allow you to apply the same styles to multiple html documents without redefining those styles for each document.

## Selectors

Selectors target elements in an html document. Think of them as filters that narrow the scope of their declarations so that you can apply styles with precision. Selectors can be combined for further specificity.

**Type selector**

The most basic selector targets elements of a given type on a page. Target paragraphs or divs or links, for example, by using the tag name:

	div { ... }
	p { ... }
	a { ... }

We've already seen how to add a border to divs. The selector filters out other html elements so that only divs are affected:

	div {
		border: 1px solid black;
	}

**Class selector**

The `class` attribute in html is commonly used for css targeting. Recall that you can define an arbitrary class for an html element:

	<div class='red'> ... </div>
	
The css class selector can then be used to target elements of that class. It is a `.` followed by the class name:

	.classname { ... }
	
We target the red class in our example:

	.red { ... }

Many elements can have the same class, and elements of different types can have the same class, for example a red paragraph and a red link:

	<p class='red'> ... </p>
	<a class='red' href=''> ... </a>

An element can also have many classes. Separate the classes with a space:

	<div class='big bold falvor'>

Which will apply the styles from three different class selectors:

	.big {
		font-size: 48px;
	}
	.bold {
		font-weight: bold;
	}
	.flavor {
		color: chocolate;
	}
	
Yes, `chocolate` is a valid css color name.

**ID selector**

Recall that the `id` attribute uniquely identifies an element on a page:

	<div id='content'> ... </div>

CSS can target an element with a given id by using the pound symbol `#` followed the the id:

	#content { ... }
	
This is one of the most specific selectors as it identifies exactly one element.

**Attribute selectors**

An attribute is any of the key-value pairs included in an html tag. Some attributes are required, such as the `href` attribute on the `a` tag or the `src` attribute on an `img`, but most are optional and you can define your own.

Attribute selectors target elements with certain attribute values. Define an attirbute selector using square brackets `[...]` whose contents depends on the nature of the selection. For example, to target any html tag with the `required` attribute, regardless of its value:

html

	<input type='text' required='required'>
	
css

	[required] { ... }

Or to target an element with the custom `data-type` attribute whose value is `person`, place an `attr=val` pair inside the brackets:

html

	<div data-type='person'> ... </div>
	
css

	[data-type=person] { ... } 

In addition to checking for the presence of an attribute or its value, more advanced attribute selecting can check whether the attribute begins with, ends with or contains some text. To learn more, see the Selectors section in the [CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference).

**Pseudo-selectors**

Pseudo-selectors target subsets of a given element depending on the state the document or element is in or depending on the element's position in the document. They are attached to selectors rather than used by themselves. Attach a pseudo-selector with a colon `:` and its name:

	selector:pseudo-selector { ... }
	
Stateful targeting selects elements in a particular state. For example, to target links only when the mouse button is hovering over them (in the hover state), use the `hover` pseudo-selector:

	a:hover { ... }
	
Structural targeting selects elements depending on their relationships to other elements. For example, to alternate the background color of alternative elements, use the `nth-child()` selector with `odd` or `even`:

html

	<div> first is odd, has background </div>
	<div> second is even, no background </div>
	<div> third is odd, has background </div>

css

	div:nth-child(odd) {
		background-color: #dddddd;
	}
	
The first and third div elements will have a background color.

There are a number of pseudo-selectors that can be used for advanced styling. To learn more, see the Selectors section in the [CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference).

**Combining selectors**

Combine selectors to make your style declarations more concise and to target even more precisely.

The simplest combination separates the selectors with a comma `,` and allows you to apply a single style defintion to more than one selector simultaneously.

For example, to set the text color to red for all divs, paragraphs and links, you can select them separately:

	div { 
		color: red; 
	}
	p { 
		color: red; 
	}
	a { 
		color: red; 
	}
	
Or at the same time:

	div, a, p { 
		color: red; 
	}

Notice the use of commas to separate each selector.

Selectors are combined to increase specificity. We've seen how to target elements with a given class using the `.classname` selector:

	.red { ... }

This selector targets any element with the class *red*. If you want to target only certain elements with that class, for example, only paragraphs, attach the class selector to the paragraph selector without spaces:

	p.red { ... }

`p.red` targets only paragraphs which also have the red class.

Normally a type selector targets all elements of that type, regardless of where they are in the document. Combinations of selectors can target elements that appear within other elements, that is, based on their position in the document.

Using a space, target *child* elements that are contained within certain *parent* elements. For example, if the `p` selector normally targets all paragraphs, you can target only those paragraphs that are contained in divs:

	div p { ... }

Notice the use of a *space* and not a *comma* or a *period*. Don't confuse  them!

There are more combinations for even more specific positional targeting. To learn more, see the Selectors section in the [CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference).

**Chaining selectors**

Finally, combine and chain all the selectors described above to create complex but very specific targets. For example, to target only the first link in a paragraph when the paragraph has class *person* and is itself contained in a div whose class is *biography*, use:

	div.biography p.person a:first-child { ... }
	
Note how the selectors work from the outside in. 

- `div.biography` locates all divs with the biography class
- the space looks for elements inside those divs
- those child elements must be `p.person` or paragraphs with the person class
- the space looks for elements in those paragaphs
- the `a` looks for all links 
- but the pseudo-selector `:first-child` narrows it to the first such element.

Which would target only the first of the following two links:

	<div class='biography'>
		<p class='person'>
			<a href=''> first, so targeted </a>
			<a href=''> second, so not targeted </a>
		</p>
	</div>

Practice css by making up a complex chain of selectors and pseudo-selectors with class and id modifiers and then generating the html that those your style applies to.

<!--- Include some examples --->


## CSS is Cascading

Cascading Style Sheets cascade, that is, web browsers apply a set of rules to determine which style to apply to an element based on every style declaration available for the document. Because it is possible to re-define the style for an element, styles can be overridden, and it is important to understand how these rules work so that you can tell which style declaration will take effect for an element. Often a style declaration will not take effect, and in many cases it will be due to cascading rules.

**Weight**

Style sheets have different weights depending on who provides them. At baseline, the browser or *user agent* applies a set of default styles. Styling can differ across browsers and operating systems.

The *user* can also define a custom stylesheet that will override the browser definitions and be used by default.

Finally, the html document's *author* can specify style definitions using inline style attributes, the style tag or stylesheets. These override the browser and user styles.

When a style is not overridden by a higher priority set of declarations, then earlier declarations cascade through them and take effect. For example, if the browser applies a default font to the document and the user and document's author do not override it, then the browser's font will be used.

**Inheritance**

Child elements in the html inherit some of the style of their parents. That is, styles cascade down the document structure. Only aesthetic styling such as fonts and colors are inherited, not layout styling such as position or margin.

For example, if you add the `font` attribute to the `div` selector, any elements contained inside a div tag will have the same font, unless you specifcially override the font in another style declaration.

**Additivity**

Style definitions are additive. If you use the same selector twice in your style definitions, the selector is re-opened and style attributes are added to those already available. For example, you can give the paragraph tag a font and a text color separately, although it is more common to define both attributes in the same selector:

	p {
		font: sans-serif;
	}
	p {
		color: red;
	}

Should really be, and means the same as:

	p {
		font: sans-serif;
		color: red;
	}

**Order of declaration**

However, when the same property is defined, browsers use a complex set of rules to determine which has priority.

Normally, styles declared later have priority. In the following example, a paragraph's text color will end up blue:

	p {
	 	color: red;
	}
	p {
		color: blue;
	}

Consequently, inline definitions (style attributes on the tag) will take priority over style tag declarations, which normally take priority over linked stylesheets because style tags appear later in the document.

**Specificity**

But importantly, the specificity of a selector takes presedence over its position in a document. Selectors that are more targeted override the style properties of those that are more general.

For example, a class selector is more specific than an element selector, and an id selector is more specific than either. Therefore, regardless of where they appear in the style declarations, an id style will override a class style, and a class style will override an element style:

css

	#green {
		color: green;
	}
	.blue {
		color: blue;
	}
	div {
		color: red;
	}
	
html
	
	<div class='blue' id='green'> I will have green text </div>

The div has green text because the id selector is more specific than either the blue selector or the div selector, even though it is defined earlier.