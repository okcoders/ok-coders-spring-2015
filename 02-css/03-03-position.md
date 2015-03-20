CSS: Positioning & Layout
====

Using the advanced capabilities of css to lay out elements on the page, we can position elements exactly where we want them. We can also achieve a number of surprising effects using positioning.

Positioning is one of the more confusing aspects of CSS. We typically use in in conjunction with the location properties such as `left`, `right`, `top` and `bottom`, whose effects depends on the `position` value.

For example, set the `top` and `left` properties of an element. They take pixel or percentage values:

	#content {
		top: 20px;
		left: 100px;
	}

But by themselves these position styles have no effect. This is because an element's position is `static` by default, which ignores location settings such as top and left:

	#content {
		position: static; /* the default position value */
	}
	
In order to set an elements position, you must change the position property. There are a number of options.

## Fixed positioning

Set the element's position to 'fixed' and give it top and left values:

	#content {
		position: fixed;
		top: 20px;
		left: 20px;
	}

The element is now located at a fixed position relative to the browser window's *frame*. It will not move even when scrolling.

Designers use fixed positioning to attach an unmoving navbar to the top of the page. Create a div with class `navbar`, add some additional content to the page, and include the following style:

	.navbar {
		top: 0;
		left: 0;
		position: fixed;
		height: 48px;
		background: rgb(200,200,200);
		width: 100%;
		margin: 0;
	}
	
Fixed positioning pulls an element out of its normal space in the page so that the browser ignores it when layout out other elements on the page. Consequently, content is hidden underneath the navbar. How is this fixed?

Style may be added to to any html tag, include the `html` or `body` tag itself. Try adding fifty pixels of top margin to the body tag:

	body {
		margin-top: 50px;
	}

The browser now pushes all the page's content down fifty pixels, but the navbar ignores this directive because its position is fixed and it has been pulled out of the normal page layout. 

## Absolute positioning

Set the element's position to `absolute` and set its top and left style properties:

	#content {
		position: absolute;
		top: 20px;
		left: 100px;
	}

The element is now located at an absolute position on the page, *relative to the first ancestor with positioning other than static, or the body* (more on this in a moment), no matter how we adjust the layout.

As with fixed positioning, elements now simply run into this element. Absolute positioning pulls the element out of the normal layout of the page, so that other elements are no longer affected by it. But unline a fixed element, an absolutely positioned element scrolls off the page.

Note that we can set the position using unexpected offsets such as `right` and `bottom`:

	#content {
		position: absolute;
		bottom: 20px;
		right: 100px;
	}
	
Where the bottom and right are depends on the size of the browser window.

Absolute positioning is often not so useful when used relative to the page boundaries. It is more useful when done relative to the boundaries of another element.

## Relative positioning

Relative positioning is probably the most confusing. It has two important effects. The style declaration is straightforward:

	#content {
		position: relative;
		...
	}

First, when combined with location values like left or right, relative positioning offsets the element from its normal location in the page, but it keeps it within the flow of the document. Other elements may run into it but they lay out *as if the element were in its normal location*. Compare this to absolute or fixed positioning which pulls the element out of the document layout so that other elements ignore the space normally occupied by it.

	#content {
		position: relative;
		top: 50px;
	}

Second, and more interesting, relative positioning establishes a new reference location *relative to which* absolutely positioned children will be laid out. This is the source of a number of cool CSS effects.

Consider the example of wanting to position an element at the top left of its parent container. To place an element at the top left you must set the `top` and `left` styles, but they have no effect unless the position has been set as well.

In this case, `position: absolute` is the right intuition, but absolute positioning locates the element in the web browser window, not in the containing element. However, when you first set the containing element's position to `relative`, it becomes the new reference point for any absolutely positioned child elements, so that top and left values of child elements are calculated from its top left, not the window's top left.

css

	.parent {
		position: relative;
	}
	
	.child {
		position: absolute;
		left: 0;
		top: 0;
	}
	
html

	<div class='parent'>
		<div class='child'> ... </div>
	</div>
	
Notice that the parent doesn't have its top or left values set, only the child.

**Negative location and structure vs presentation**

The difference between structure and presentation can now be made apparent. HTML controls the structure of a document, and although the structure will have a default appearance provided by the browser, it is the responsbility of CSS to make explicit the document's presentation.

Because CSS allows us to set the position of elements relative to their parents, we can 'break' the structure of the document. What that really means is that we can lay out elements in a way that runs counter to what the structure suggests.

HTML is a tree structure. Elements branch out into more elements with their children. A parent element *contains* a child element. That structural relationships suggests that, visually, a parent element should also contain its children. But by setting negative positional values, css can place an element visually outside its parent, even though its parent contains it structurally:

css

	.parent {
		position: relative;
	}
	
	.child {
		position: absolute;
		left: -20px;
		top: 0;
	}
	
html

	<div class='parent'>
		<div class='child'> ... </div>
	</div>

By setting the child, `left: -20px`, we shift it outside the container instead of inside it. The child no longer appears inside its parent.

CSS allows even more radical changes to a documents appearance. Class example...

**Z-index**

Z-index controls how close to the screen a positioned element appears. Think of it as a third dimension that reaches from your eyes into the page.  Setting the z-index of an element can fix issues caused by positioning and overflow and can guarantee that an element always appears on top of other content.

Z-index begins at zero for all elements. Elements with a higher z-index appear closer to your eyes.

	div {
		z-index: 10;
	}

**Hiding elements**

There are two ways to hide an element using css: set the `display` property to `none` or set the `visibility` property to hidden:

	div.a {
		display: none;
	}
	
	div.b {
		visibility: hidden;
	}

There is an important difference between the two. With `display: none` the element is completely removed from the page and other elements will occupy the space it normaly requires. With `visibility: hidden` the element is not visible but the browser will leave empty space where it normally is.

Set `display` back to `block` or `inline` to show the element again, and set the `visibility` to `visible` to show it.

**Floating**

Floating shifts an element to the right or left, allowing other elements on the page to wrap around it.

Create two class, `float-right` and `float left` and apply them to elements to see the effect:

	.float-right {
		float: right;
	}

	.float-left {
		float: left;
	}

When you want to prevent an element from wrapping alongside a floated element, for example, when you want one paragraph to wrap around a floated image but not the secon,d you must *clear* the second. Create a class `clear-it` that you can apply to those kinds of elements:

	.clear-it {
		clear: both;
	}