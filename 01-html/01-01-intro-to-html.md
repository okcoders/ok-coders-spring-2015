HTML Documents
====

HTML is the *HyperText Markup Language*.

## References

[Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/HTML)

A an excellent resource for all things web, including html.

[Markup Validation Service](http://validator.w3.org/)

The W3C's html validator lets you know when your html has gone bad.

## HTML is markup

HTML is the HyperText Markup Language, in contrast to a plain text language which only contains text or a Word document which contains text and other data in a proprietary format.

HTML is still written using plain text, but embedded in the text in the form of *tags* is additional text that contains information about the content of the document. This additional text is a form of *metadata* that identifies features of the content and specifies how it is organized and presented.

For example, the `p` tag identifies a portion of the text as a paragraph. The `a` tag says that some other bit of text should be treated like a link, and the `ul` and `li` tags in combination instruct the browser to display a list. These tags don't belong to the document's content, and the browser does not display them. Instead, tags are instructions to a computer about how that content should be treated.

When creating an html document, always have in mind the content you want to present. Then construct the html to accomodate that content.

## Structure of html tags

HTML is composed of tags, also commonly called elements. Tags can stand on their own, contain text content, and contain other tags to form a hierarchical structure known as a *tree*.

**Basic Tags**

A basic html tag opens with the tag name surrounded by `< >` characters and closes with the tag name in `</ >` characters. Between the opening and closing tags lies content:

	<tagname> ... content ... </tagname>
	
For example, the `p` tag establishes a paragraph of text with its content, and the `div` tag sets aside a generic section on a page:

	<p>This is a paragraph of text</p>	
	<div>This is a generic section on my page</div>

Some tags are *self-contained* and do not require the closing portion. Self-contained tags do not have any content:

	<tagname>
	
For example, the `br` tag adds a linebreak to a page, and the `input` tag adds an interactive input element :

	<br>
	<input>
	
**Comments**

There is a sort of comments tag that the browser will ignore but which you may use to add notes to your html. Include comments inside the `<!-- -->` characters:

	<!-- This is a note to myself which the browser will ignore -->

**Attributes**

HTML tags can include *attributes* that add information about the tag. Some attributes are required while others are optional. Self-contained tags commonly use attributes instead of content to specify their function.

An attribute appears in a tag as an `attr='value'` pair, or the attribute name followed by an equal sign followed by its value in quotes. Single and double quotes are both allowed, but use one or the other consistently:

	<tagname attr='value'> ... </tagname>
	
For example, the `a` tag requires the `href` attribute to specify its link destination:

	<a href='http://news.google.com'>link to google news</a>

Similarly, the `input` tag requires the `type` attribute to identify what kind of input it is:

	<input type='text'>
	<input type='email'>

A tag can have more than one attribute. Separate the attributes with a space. `id` is commonly used to identify and element and `class` to assign it to a stylistic category:

	<p id='main-content' class='post'> ... </p>
	
You may create your own attributes and store whatever you like in them. Custom attributes commonly begin with the `data-` prefix to distinguish them from those included in the html specification:

	<div data-person='philip dow'> ... </div>

**Hierarchy**

Tags contain other tags to build up the structure of a document. This is called *nesting*. There are subtle rules that govern which tags can be nested in what tags, largely concerning whether a tag is *inline* or *block* level (more below). At this point, it's enough to know that a tag is included in another tag just like normal text content is:

	<div>This is a div with plain text content</div>
	
	<div>
		<p>But this div has a paragraph in it</p>
		<p>And another paragraph!</p>
	</div>

It is custom to use spacing and linebreaks to separate parts of a document in your text editor and indentation to reveal the structure of a document.

## HTML document

A *well-formed* HTML document must include certain tags. Every HTML document begins with a `!DOCTYPE` declaration followed by the `html` tag, which includes two sections, the `head` and the `body`.

	<!DOCTYPE html>
	<html>
		<head>
		...
		</head>
		
		<body>
		...
		</body>
	</html>
	
The head contains information about the document. It often includes the title, links to stylesheets and javascript files, and other metadata. A browser does not *render* the head's content in the page.

At a minimum include a title in the head:

	<head>
		<title>Homepage</title>
	</head>
	
The body contains all of a page's content that the browser will render. Include text, images, tables, input elements and everything else here. A simple body might include a heading and paragraph of text:

	<body>
		<h3>Homepage</h3>
		<p>Welcome to my homepage</p>
	</body>
	
So that the entire document looks like:

	<!DOCTYPE html>
	<html>
		<head>
			<title>Homepage</title>
		</head>
		
		<body>
			<h3>Homepage</h3>
			<p>Welcome to my homepage</p>
		</body>
	</html>

**Validator**

Valid html conforms to the html *specification*. Invalid html occurs, for example, when you forget a closing tag, use quotes incorrectly, or incorrectly nest tags. Browsers will try to render invalid html correctly but may fail in unexpected ways. Use the html validator to verify your web page code:

[Markup Validation Service](http://validator.w3.org/)

<!---
Include the Tim-Berners Lee wikipedia example
Include information about using Sublime Text
--->

## Structure vs presentation

The latest html specification, html5, distinguishes between the structure and the presentation of a document. Tags are meant to be semantic rather than stylistic. That is, tags describe the meaning or function of content in a document (its semantics or structure), not how it should look (its presentation or style).

For example, use the paragraph tag `p` with a block of text because that bit of text is in fact a paragraph and you are identifying it as such, not because you want to add some extra spacing around the top and bottom of it.

Previous versions of html such as html4 and xhtml did not make this distinction, and to confuse matters, browsers render some tags with a distinct style. Browsers typically render `strong` content in **bold** and `em` content in *italics*  to emphasize it, for example.

Do not rely on how tagged content appears in a browser by default. Different browsers use different stylistic defaults, and it is possible to override the style of any tag. Use the `strong` and `em` tags  to call attention to a portion of text, not to make it appear bold or italicized. Then define the style of those elements as bold or italicized if that is appropriate. We'll learn how to use css for this in future chapters.

As a general rule, avoid the use of tags that are a single letter, such as `b`, `i`, `u`, and `s`. Instead use `strong`, `em`, `ins` or `span`, and `del` or `span` respectively:

**HTML5 tag substitutions**

	b : strong
	i : em
	u : ins, span
	s : del, span

The `a` tag is the notable exception.

## Inline and block level elements

Tags belong to one of two kinds. There are *block* level elements and *inline* elements. In some cases the two are combined for special effect.

Block level elements appear to occupy the entire horizontal space of the browser page where they occur, even if their content doesn't actually require that entire space. Block level elements block out other content, forcing it above and below their own. `p` and `h1` tags are common block level elements. `div` is the generic block level element with no default style.

Inline elements continue to render in line with their surrounding content while identifying their own content differently and presenting it differently according to style declarations. `strong` and `a` are common inline elements. `span` is the generic inline element with no default style.

The relationship between block and inline elements is complex. Generally, block level elements can contain other block level elements as well as inline elements, but inline elements can only contain other inline elements.
	
	<!-- comment: divs can contain paragraphs and links -->
	
	<div>
		<p>A paragraph in a div</p>
		<a href='http://google.com'>A link to google in a div</a>
	</div>
	
	<!-- comment: the strong tag can contain em and links -->
	
	<strong><em><a href='http://google.com'>A strong, emphasized link to google</em></strong>

Making the matter more complex, there is a hierarchy among block level elements. Not all block level elements can contain every other block level element. For example, a `div` may contain a `p`, but a `p` may not contain a `div`.

The rules for mixing block and inline level elements are subtle and learned  only with experience. In practice, browsers will let you do what you want and fail gracefully when possible. Use the [Markup Validation Service](http://validator.w3.org/) to be sure you are writing legal html.

## Basic tag reference

Following is a list of common tags and example usage. Refer to the Mozilla Developer Network (MDN) for a complete listing of tags, organized by type:

[Block level elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)

[Inline elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elemente)

### h1 ... h6

Headings for a portion of text. Like title, section and paragraph headers in a document. Block level. `h1` is the highest level and typically appears the largest, `h6` is the lowest level and often appears the smallest.

	<h1>Big Document Heading</1>
	
	<h3>Also an important section in my document</h3>
	
	<h6>A subsection in the document</h6>
	
### div

The generic block level element. Blocks off content without identifying it as a paragraph. Add `id` and `class` attributes to give it style. Often contains other elements.

	<div>Content I'd like to distinguish from the surrounding material</div>
	
	<div>
		<h3>A section in my document</h3>
		<p>Here's what that section talks about</p>
	</div>
	
### p

Identifies paragraphs of text. Block level. Often contains inline elements.

	<p>Some text in a short paragaph. But more than one sentence.</p>
	<p>Let me tell you about an <strong>awesome</strong> site: <a href='http://okcoders.com'>OK Coders</a></p>
	
### strong

Emphasize a section of text. Inline. Typically rendered **bold** in browsers.

	Yeah but <strong>this text</strong> is bold
	
### em

Emphasize a section of text. Inline. Typically rendered *italicized* in browsers.

	Oh yeah, well, <em>this text</em> is italicized!

### span

The generic inline level element. No style by default. Add `id` and `class` attributes to give it style.

	<span class='red'>Might appear red if the css is defined</span>
	
### a

The anchor tag, or all important link. Inline. Include the `href` attribute to target a page. The text content will appear in the link style, often blue and underlined by default:

	<a href='http://okcoders.com'>Link to OK Coders</a>

### img

Add an image to a page. Self-contained. Inline, surprisingly, which results in the line height of the surrounding text to grow to accomodate the image's height. Include the `src` attribute to identify the image resource:

	<img src='https://i.imgur.com/IU0AZOp.jpg'>

### ul, li

Displays an unordered list and its elements. Mixture of block and inline. For example:

	<div>
		The recipe calls for:
		<ul>
			<li>Eggs</li>
			<li>Milk</li>
			<li>Butter</li>
			<li>Sugar</li>
		</ul>
	</div>

Looks like:

The recipe calls for

- eggs
- milk
- butter
- sugar

### form

Defines an input form. Block level. Include additional elements for the kind of input required:

	<form>
		<!-- comment: add input elements -->
	</form>

### label, input

Input elements for forms and their labels. Inline. Input elements are self-contained. Input includes text, dates, checkboxes and buttons. The `type` attributes determines the kind of input:

	<form>
		<label>Name:</label>
		<input type='text'>
		
		<label>Email:</label>
		<input type='email'>
				
		<label>Password:</label>
		<input type='password'>
	</form>

Forms probably involve the most complex html. Refer to MDN for more information about form input: [Input Elements at MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input)