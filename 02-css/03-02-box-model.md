CSS: The Box Model
====

The box model controls the space that block-level elements take up on the page. Like selectors, the box model is essential to CSS, and understanding it is essential to understanding CSS generally. It is easy to size elements on the page but that there are a few quirks that cause headaches.

An element's space is a combination of its content size, padding, border and margins. CSS can define each of these properties.

<!--- Using Chrome to view the box spacing of an element --->

## Width and Height

Normally the browser fits an element to the space required by its content. The `width` and `height` properties allow you to specify different values. Pixel values `px` are typically used, although percentages `%` are permitted as well.

	div {
		width: 500px;
		height: 200px;
	}

When one property is specified, the other may be adjusted to accommodate it.

When percentages are used, the percentage is relative to the containg block's width or height.

In some cases it will seem as if the browser is ignoring width and height directives. For example, create a div with the [lorem ipsum](http://www.lipsum.com/) content and set a small height, for example `100px`. Adjust the browser window. The content *reflows* and clearly occupies more than 100 pixels.

This happens because the browser permits the element's content to *overflow* its boundaries. Add a border to the div to see the effect.

## Overflow

Control the behavior of an element when it's content is too large for its size with the `overflow` property.

By default overflow is `visible`. Set it to `hidden` to hide content that is too large for the element, or set it to `scroll` to show scrollbars:

	div {
		overflow: hidden;
	}

Overflow can be specified for only vertical or horizontal content as well:

	div {
		overflow-x: visible; /* horizontal or x-axis overflow */
		overflow-y: scroll; /* vertical or y-axis overflow */
	}
	
## Min- and Max- Width and Height

Sometimes the default browser behavior is desired by you do not want an element to grow smaller than or larger than a certain size. Use the `min-` and `-max` `width` and `height` attributes:

	div {
		min-height: 300px;
		min-width: 200px;
		
		max-height: 800px;
		max-width: 500px;
	}
	
Inbetween those values the browser will resize and reflow the content normally, but it will not allow the element to become smaller or larger than the specified values.

## Border

We've already seen how to add a border to an element. Specify a size, style and color:

	div {
		border-size: 5px;
		border-style: dotted;
		border-color: blue;
	}
	
Border properties can be combined into the shortcut `border`:

	div {
		border: 1px dotted blue;
	}

Place the size, style and color in that order.

Set border styles for each side of an element separately by target the `top`, `right`, `bottom` or `left` parts:

	div {
		border-top-size: 1px;
		border-top-style: dashed;
		border-top-color: steelblue;
	}
	
Use shortcuts to set all three properties simultaneously:

	div {
		border-top: 1px dashed steelblue;
	}

## Padding

Padding describes the space between the element's content and its border. Any `background-color` will appear in the space occupied by the padding.

	div {
		padding: 10px;
	}
	
Set the padding with a length or a percentage. When a percentage is used, it is relative to the *width* of the containing block's width, even when setting vertical padding.

Set padding for each side of an element separately, as with the border:

	div {
		padding-top: 5px;
		padding-right: 10px;
		padding-bottom: 30px;
		padding-left: 20px;
	}

Use `padding` by itself as a shortcut to set each value separately:

	div {
		/* four values sets the: top right bottom left */
		padding: 5px 10px 30px 20px; 
		
		/* three values sets the: top right-left bottom */
		padding: 5px 10px 20px;
		
		/* two values sets the: top-bottom right-left */
		padding: 5px 10px;
	}
	
## Margin

Margin describes the space between the element's border and nearby *sibling* elements on the page. An elements background color does not appear in the space occupied by the margin, but the parent element's background will.

	div {
		margin: 10px;
	}

Set the margin with a length or percentage. As with padding, when a percentage is used it is relative to the *width* of the containing block's width, even when setting vertical margin.

Margin uses the same properties and shortcuts for setting the sides of an element separately:

	div {
		margin-top: 5px;
		margin-right: 10px;
		margin-bottom: 30px;
		margin-left: 20px;
	}
	
Shortcuts:

	div {
		/* four values sets the: top right bottom left */
		margin: 5px 10px 30px 20px; 
		
		/* three values sets the: top right-left bottom */
		margin: 5px 10px 20px;
		
		/* two values sets the: top-bottom right-left */
		margin: 5px 10px;
	}
	
## Sizing is additive

Box properties can be confusing once you begin to combine them. For example, place two divs on a page and add a border to them. Set their size to a fixed value. Five them some margin to distinguish them:

	<!DOCTYPE html>
	<html>
	<head>
		<style type="text/css">
			div {
				width: 500px;
				margin: 10px;
				border: 1px solid black;
			}
		</style>
	</head>
	<body>
		<div class='a'>"Lorem ipsum ..."</div>
		<div class='b'>"Lorem ipsum..."</div>
	</body>
	</html>

Then add padding to one of them:
	
	.a {
		padding: 10px;
	}

Notice that its width increases, which may not be what you expected because you set the width to a fixed value of 500 pixels.

Remember that the `width` and `height` attributes set the size of the element's *content*, not the entire space occupied by the element. The entire space occupied by an elemente is caluculated from the combined sizes, padding, border and margins.

This means that an element starts with its content size, then the padding is added to that, then the border is added to that, and finally the margin is added to all that.

## Block vs inline elements

Recall the difference between block-level and inline html elements.  Elements such as `h1`, `p`, `div`, `section`, `nav`, and `ul` are block-level. The browser pushes content around them up and down so that the element occupies the entire horizontal space of the page even if it doesn't require it. The browser *blocks* the elements off.

On the other hand, inline elements such as `span`, `em`, `strong` and `img`  are rendered *in line* with their surrounding content.

**Some box model sizing only applies to block-level elements**.

You may add a border to an inline element, but you may not set its width or height. You may add horizontal padding and margin to an inline element but not vertical padding or margin.

What do you do when you want to set the styles? Change the `display` property. The display property controls whether an element renders as block or inline. To set size attributes or vertical margin and padding on an inline element, transform it into a block-level one:

	span {
		display: block;
	}

Similarly, transform a block-level element into an inline one with the `inline` value.

Unfortunately when you transform an inline element into a block-level one the browser blocks it out, causing it to take up the entire horizontal space of the page, which may not be the desired effect.

Fortunately there is a fix. CSS allows you to combine both block-level and inline layout with the `inline-block` display value. With inline-block you can set all the box model sizing styles of a block level element but it continues to render inline:

	span {
		display: inline-block;
	}
	
Be cautioned that setting vertical sizes may affect the height of other elements in the same line of text.

Other values are allowed for the display property, but they are beyond the scope of this document.

## Centering an element

A common requirement is to horizontally center an element. This is different from centering text, which can be done with the `text-align: center` property. Instead we want the element itself to stay in the center of the page or other element, regardless of how its text is aligned.

To horizontally center an element, set its `width` to some amount smaller than its parent's width and then set the `margin` on it to `0 auto`:

	<!DOCTYPE html>
	<html>
	<head>
		<style type="text/css">
			#content {
				width: 500px;
				border: 1px solid black;
				margin: 0 auto;
			}
		</style>
	</head>
	<body>
		<div id='content'>
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
			sed do eiusmod tempor incididunt ut labore et dolore magna
			aliqua. Ut enim ad minim veniam, quis nostrud exercitation
		 	ullamco laboris nisi ut aliquip ex ea commodo consequat. 
		 	Duis aute irure dolor in reprehenderit in voluptate velit 
		 	esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
		 	occaecat cupidatat non proident, sunt in culpa qui officia
		 	deserunt mollit anim id est laborum."
		</div>
	</body>
	</html>

Using two values for the `margin` property sets the top-bottom and right-left margins respectively. You may actually use any value for the top and bottom, just use `auto` for the left and right.

Note that the `0` value does not require the `px` modifier.