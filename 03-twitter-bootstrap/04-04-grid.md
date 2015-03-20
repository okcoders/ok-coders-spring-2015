Bootstrap: Grid System
====

Designers commonly need to lay out web content in grids. For the larger structure, they divide a page into sections, such as a sidebar and a main content area, and they want the sidebar to occupy a fixed portion of the page while the rest belongs to the content. Or they will divide a page into three parts, two sidebars on either side of a main content area.

For more detailed oriented work, designers want the size of form fields, buttons, images and text to have the same horizontal size but in different columns or rows.

[GitHub](https://github.com/) uses a grid layout for its pages as does [the New York Times](http://www.nytimes.com/), [NPR](http://www.npr.org/), and many other sites.

Bootstrap provides a suite of classes for layouting out a page in a grid of rows and columns. Moreover, the grid is automatically *responsive* thanks to the use of `@media` css directives that target devices with specific screen sizes.

This chapter will cover the basics of Twitter's grid system. As always, refer to the [grid tutorials](http://getbootstrap.com/css/#grid) for more information. And remember:

**Always begin your pages with the [bootstrap template](http://getbootstrap.com/getting-started/#template)**.

The template includes an important `meta` tag in the head which ensures  the layout is sized correctly to the device:

	<meta name="viewport" content="width=device-width, initial-scale=1">

## References

[Bootstrap Grid System](http://getbootstrap.com/css/#grid)

Examples and class usage for Twitter's grid system.

[Designing With Grids](http://www.smashingmagazine.com/2007/04/14/designing-with-grid-based-approach/)

Smashing Magazine's extensive article on grid-based design.

## Rows

The grid resides first in rows and then in columns. Think of your document as a large table like a spreadsheet. Rows work their way down the page while columns go across it. A new row causes content to drop down the page, and whatever content you place in the row will be horizontall aligned.

Before beginning, make sure you've created a tag with class `container`, which is how bootstrap centers content on a page. The grid system must be placed in a container to work:

	<div class="container">
	  ...
	</div>
	
Inside the container, create rows using the `row` tag on a `div`:

	 <div class="container">
	   <div class="row">
	     ...
	  </div>
	</div>

Create multiple rows one after the other using multiple row tags:

	<div class="container">
	  <div class="row">
	    ...
	  </div>
	  <div class="row">
	    ...
	  </div>
	</div>



## Columns

In order to add content to the rows you must define the columns inside them. Bootstrap uses a twelve column layout. Define as many columns as you like in a single row as long as their lengths add up to twelve.

Bootstrap provides a number of column classes with different behavior on differently sized devices, but the simplest place to start is with the "medium" column classes with tags like `col-md-12` and `col-md-4`. Think of that as the medium columns with the specified length, and remember that the lengths in a single row must add up to twelve.

The simplest use of a column is a single column whose length is twelve in a row:

	<div class="container">
	  <div class="row">
	    <div class="col-md-12">
	      ..
	    </div>
	  </div>
	</div>

Create two rows conaining columns of length twelve filled with a paragraph each of lorem ipsum to see the effect:

	<div class="container">
	  <div class="row">
	    <div class="col-md-12">
	      <p> Lorem ... </p>
	    </div>
	  </div>
	  <div class="row">
	    <div class="col-md-12">
	      <p> Lorem ... </p>
	    </div>
	  </div>
	</div>
	
Right now it looks like all we have are divs separating content on a page, but that's because the columns occupy the entire width of the page. Columns are more interesting when they are combined.

Modify the first row so that it contains two columns, one whose length is eight and another whose length is four. Fill both columns with lorem ipsum:

	<div class="container">
	  <div class="row">
	    <div class="col-md-8">
	      <p> Lorem ... </p>
	    </div>
	    <div class="col-md-4">
	      <p> Lorem ... </p>
	    </div>
	  </div>
	  ...
	</div>

Then modify the second row so that it also contains two columns of lorem ipsum, but set them each to length six:

	<div class="container">
	  ...
	  <div class="row">
	    <div class="col-md-6">
	      <p> Lorem ... </p>
	    </div>
	    <div class="col-md-6">
	      <p> Lorem ... </p>
	    </div>
	  </div>
	</div>

You can really start to see the grid structure of the page now.

## Nesting

Rows can be further nested in columns. Nesting supports complex layouts and allows you to split up a column into multiple columns. To nest, just add a row to a column and then columns to that row as you normally would, ensuring their lengths add up to twelve.

Split the first column of the first row into two subcolumns each with lorem ispum content again:

	<div class="container">
	  <div class="row">
	    <div class="col-md-8">
	      <!-- place the nested row directly inside the column -->
	      <div class="row">
	        <!-- and add columns directly inside the new row -->
	        <div class="col-md-6">
	          <p> Lorem ... </p>
	        </div>
	        <div class="col-md-6">
	       	  <p> Lorem ... </p>
	       	</div>
	      </div>
	    </div>
	    ...
	  </div>
	  ...
	</div>

In this example, it looks lke we're just spitting up the first row into columns of equal width, but now we can add more inside that first column and ensure that the rest of the page respects the overall row and column hierarchy.

## Resizing

Because bootstrap builds a responsive layout, page elements are automatically repositioned as the size of the window changes. Adjust the size of the browser to see how the page will render on different devices. Notice how columns collapse into rows as the window shrinks.

Bootstrap offers some control over the *stacking* of elements on the page. We used the `col-md-` classes for this example. Use or add the `col-xs-`, `col-sm-` and `col-lg-` tags to columns for other effects.

<!--- Show example --->

## Comments and Spacing

Grid structure quickly become complex. Add comments when you close a row or column that identifies what element is being closed, and use tabs and other spacing liberally and systematically in your code to visualize the page structure:

	<div class="container">
	  
	  <div class="row">
	    
	    <div class="col-md-12">
	      <p> Lorem ... </p>
	    </div> <!-- close column -->
	  
	  </div> <!-- close row -->
	  
	  <div class="row">
	    
	    <div class="col-md-12">
	      <p> Lorem ... </p>
	    </div> <!-- close column -->
	    
	  </div> <!-- close row -->
	</div>

## Quickly Change Layout

Remember that html describes the structure of a page and css describes its layout. Because bootstrap just uses classes on div tags to set up a page's layout, it is astonishingly simple to make significant changes to how a page looks without changing its structure. All you need to do is flip a few classes around or add a class or two and the page will look completely different.

For example, in the second row, change the column sizes to use a 3|9 layout instead of a 6|6 layout. All you need to do is change the column classes that are being used:

	...
	<div class="row">
	  <div class='col-md-3'> <!-- changed from col-md-6 -->
	    ...
	  </div>
	  <div class='col-md-9'> <!-- changed from col-md-6 -->
	    ...
	  </div>
	</div>
	...

As always, refresh the page to see the effect. This the power of css and what it can accomplish when the structure of a page is separated from its presentation.

For an even more pronounced effect, change the order in which columns are layed out. Normally columns are layed out from left to right as they are encountered in the document. The first column appears on the left, the next one to the right of it, the next one to the right of that, and so on. When you want to keep column sizes and content but change where they appear on the page use the `col-md-pull-` and `col-md-push-` classes:

	...
	<div class="row">
	  <div class='col-md-3 col-md-push-9'>
	    ...
	  </div>
	  <div class='col-md-9 col-md-pull-3'>
	    ...
	  </div>
	</div>
	...

While useful, normally you will want to actually change the structure of your page instead, which will involve moving the html around. It does, however, nicely demonstrate the power of css.

## Common Page Layouts

Two common layouts are the single sidebar and double sidebar. The single sidebar involves a small sidebar on the left or right side of the page with the content occuping the rest of the page. A double sidebar will have both smaller left and right sections with a main area in the center.

Create a single left sidebar layout with rows and columns. Place the smaller column on the left. Remember that column lengths must add up to twelve:

	<div class="container">
	  <div class="row">
	    <div class="col-md-4"> <!-- smaller column on left -->
	      Sidebar Area
	    </div>
	    <div class="col-md-8">
	      Content Area
	    </div>
	  </div>
	</div> 
	
Flip the columns to place the sidebar on the right:

	<div class="container">
	  <div class="row">
	    <div class="col-md-8">
	      Sidebar Area
	    </div>
	    <div class="col-md-4"> <!-- smaller column on right -->
	      Content Area
	    </div>
	  </div>
	</div>

For a two sidebar layout, include three columns in the top level row and ensure the largest column is in the center. Just make sure the lenths add up to twelve:

	<div class="container">
	  <div class="row">
	    
	    <div class="col-md-3">
	      Left Sidebar Area
	    </div>
	    
	    <div class="col-md-7">
	      Content Area
	    </div>
	    
	    <div class="col-md-2">
	      Right Sidebar Area
	 	</div>
	 	
	  </div>
	</div>

This kind of layout will often form the primary structure of your page. For additional control, split the content area up by nesting additional rows in it with columns again:

	...
    <div class="col-md-7">
     	
      <div class="row"> <!-- nested row, it needs columns too -->
      
        <div class="col-md-6">
          ..
        </div>
        <div class="col-md-6">
          ..
        </div>
      
      </div>
      
      <div class="row"> <!-- more rows in the content area -->
        ...
      </div>
      
      ...
     	
    </div>
    ...

## Be Careful

Never modify the tags that form the page grid with additional css. That is, don't add additional classes to the `container`, `row`, or `col-md-` tags. Bootstrap sets the margins and paddings very carefully on these classes.

Whenever you want additional padding, borders or other layout properties in your grid, add them to elements contained inside the rows and columns. In our example, we used paragraphs inside the columns, so add the extra style to the paragraphs. If you want a border, create another div insided the column and add the border to it instead of directly to the column.