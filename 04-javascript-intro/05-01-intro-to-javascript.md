JavaScript: Introduction
====

JavaScript is a programming language first introduced in 1995 for use in dynamic web pages, or web pages that could respond to user actions and change their content. Since then javascript has been introduced into a number of environments. Most recently, [Node.js](http://nodejs.org/) has popularized server-side programming with javascript.

Programming language are a complex topic, and learning to program is difficult and requires practice. It will be frustrating at times. Programming languages are like languages, in so far as you type in something that looks like English and the computer manages to turn it into instructions that it understands. But programming languages are picky about their *syntax*, so the code must be just right in order to work. 

The upcoming javascript chapters will focus on practical examples but will always discuss the syntax as well. Although javascript was originally designed for the browser, we will do most of our work in node.

## References

[Eloquent JavaScript](http://eloquentjavascript.net/chapter2.html)

Basic JavaScript chapter. **Must read.**

[MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) 

JavaScript references and tutorials at the Mozilla Developer Network.

[Code Academy](http://www.codecademy.com/tracks/javascript)

Hands on JavaScript practice.

[Node.js](http://nodejs.org/)

A JavaScript development platform that allows JavaScript to be run on the command line.

## Node

Node provides a *runtime* for javascript programs as well as access to system functionaliy. For now, that means we'll run our javascript programs using node. Type `node` at the console to bring up a REPL, or *read-evaluate-print-loop*:

	$ node
	>

Notice that the prompt changes to a `>` which means that node is waiting for input from you. Node *evaluates* whatever you've typed when you press return, and then it print out the result:

	$ node
	> 5
	5
	> 5 + 5
	10
	>

When node is finished evaluating your input, it returns you to the `>` prompt and waits for more. When you're finished and want to quit node, hold down the control key and press c: `^C`. Sometimes you may need to press control-c twice.

## Types of Data

For us, the fundamental unit of a programming language will be data. If our programs do nothing else, they will work with data.

Data is not an abstract topic. *Numbers* for example are data. Try typing a number at the node prompt:

	> 12
	12
	> 
	
Node evaluates the number and prints the result, then it returns you to the prompt. The result of evaluating a number is just the number itself, in this case twelve.

*Text* is also data. In programming languagaes, bits of text are called *strings*. In javascript, a string is represented by enclosing it in single or double quotes, like `"hello world"` or `'hello world'`. Try typing a string at the node prompt:

	> "hello world"
	'hello world'
	>
	
Node evaluates the string and prints the result, then it returns you to the prompt. As with numbers, the result of evaluating a string is just the string itself.

There are other *types* of data. *Type* is a technical term. Data always has a type. A number is a type of data. Strings are a type of data. There are other types of data in javascript, for example, the *boolean* type.

Boolean data is always either `true` or `false`. True and false have special meaning in programming languages and are used in many circumstances. Try typing `true` into node:

	> true
	true
	>
	
Node understands `true` and `false` because they are *keywords* in the language. They *mean* something. Notice that true just evaluates to true. Likewise, false evaluates to false. There are other types of data we'll learn about in future chapters.

## Mathematical Operations

Typically we want to do something with our data. Another way of saying this is we want to *operate* on it. The most basic operation we can perform is mathematical. After all, computers were originally built to perform mathematical operations.

For example, you can add two numbers together:

	> 12 + 12
	24
	>

Node evaluates the entire mathematical operation as a single *expression*. Expression is also a technical term in programming. What is important to know for now is that an expression always has a result. We can see that `12+12` has a result because node prints it out before returning to the prompt.

Javascript supports all of the standard mathematical operations such as addition, subtraction, multiplication and division using the following symbols:

<table>
  <tr>
    <td> + </td>
    <td> Addition </td>
  </tr>
  <tr>
    <td> - </td>
    <td> Subtraction </td>
  </tr>
  <tr>
    <td> * </td>
    <td> Multiplication </td>
  </tr>
  <tr>
    <td> / </td>
    <td> Division </td>
  </tr>
</table>

Note that programming languages often use the asterisk `*` for multiplication and `/` for division. Try multiplying two numbers in node:

	> 12 * 12
	144
	>
	
Once again, node evaluates the mathematical operation and prints out the result.

Combine mathematical operations into more complex expressions by putting more than one operation on a line:

	> 5 + 5 + 5
	15
	>

Combine and group mathematical operations with parenthesis, `( ... )`. Parenthesis are used more generally to group any expression in a programming language, not just mathematical ones, but it's easy to see what they do using math as an example:
	
	> 1 + 2 * 3
	7
	> (1 + 2) * 3
	9
	>
	
If you remember from basic math, parenthesis change the order of operations. Normally multiplication is performed before addition, so in the expression `1 + 2 * 3`, first two and three are multipled and then one is added to the result.

When parenthesis are included, first one and two are added and then the result of that operation is multiplied by three. Similarly, in their more general sense, parenthesis will control the order of operations in any expression.

Parenthesis are always evaluated from the inside out. Start with the most deeply *nested* parenthesis and work your way out:

	> (2 * (5 + 10) ) / (2 + 1)
	10
	>
	
## String and Boolean Operations

Javascript supports a few basic operations for string and boolean data types as well. For example, *concatenate* two strings in javascript with the same `+` operation:

	> "hello" + "world"
	'helloworld'
	>
	
Think of this as string addition. Notice that there is no space added to the strings to separate them. You must add spacing yourself.

<table>
  <tr>
    <td> + </td>
    <td> String concatenation </td>
  </tr>
</table>

Always be aware of what type of data you are working with. If you put two numbers in quotes, they are strings and no longer numbers. When you add them together, you will be adding strings:

	> "12" + "24"
	'1224'
	>
	
The two basic boolean operations are the *and* `&&` and *or* `||` operations:

<table>
  <tr>
    <td> && </td>
    <td> and </td>
    <td> result is true only if both <em>operands</em> are true </td>
  </tr>
  <tr>
    <td> || </td>
    <td> or </td>
    <td> result is true if either <em>operand</em> is true </td>
  </tr>
</table>

Boolean operations compare two pieces of data, called *operands*. An operand is just the stuff that an operation works on. Compare two booleans in node:

	> true && true
	true
	> true && false
	false
	
The result of a boolean operation is another boolean. The result depends on the operands and the operation. A truth table is commonly used to describe the possible results:

<table>
  <tr>
	<td>&&</td>
	<th>true</th>
	<th>false</th>
  </tr>
  <tr>
    <th>true</th>
    <td>true</td>
    <td>false</td>
  </tr>
  <tr>
    <th>false</th>
    <td>false</td>
    <td>false</td>
  </tr>
</table>

This table says that the *and* operation `&&` only results in true when both operands are true. The following table shows that the *or* operation `||` results in true when either operand is true:

<table>
  <tr>
	<td>||</td>
	<th>true</th>
	<th>false</th>
  </tr>
  <tr>
    <th>true</th>
    <td>true</td>
    <td>true</td>
  </tr>
  <tr>
    <th>false</th>
    <td>true</td>
    <td>false</td>
  </tr>
</table>

Try various combinations of true and false with the two operations to confirm that the results match the truth tables.

Another important boolean operation is the *not*, written as an exclamation mark `!`. Not reverse the value of the boolean so that `true` becomes `false` and vice versa:

	> !true
	false

The truth table is straightforward:

<table>
  <tr>
	<td>!</td>
	<th>true</th>
	<th>false</th>
  </tr>
  <tr>
    <th></th>
    <td>false</td>
    <td>true</td>
  </tr>
</table>

## Comparsions

Another type of operation involves comparisons.  Javascript can compare numbers, strings, or booleans and so on. Common comparsions *test* for equality or inequality. The result of a comparison is always either `true` or `false`.

Check if two numbers are equal with a double equal sign `==`:

	> 5 == 5
	true
	>

Is five equal to five? Yes it is, true. Notice that **two equal signs** must be used for comparison. A single equal sign is used for assignment, which we'll learn about in the next chapter. If you try to compare with a single equal sign, javascript produces an error:

	> 5 = 5
	ReferenceError: Invalid left-hand side in assignment
		...
	>

There are other types of comparisons. Here are the common ones:

<table>
  <tr>
    <td> == </td>
    <td> equals </td>
    <td> true if two pieces of data are equal </td>
  </tr>
  <tr>
    <td> != </td>
    <td> not equals </td>
    <td> true if two pieces of data are not equal </td>
  </tr>
  <tr>
    <td> &gt; </td>
    <td> greater than </td>
    <td> true if the first item is greater than the second </td>
  </tr>
  <tr>
    <td> &lt; </td>
    <td> less than </td>
    <td> true if the first item is less than the second </td>
  </tr>
  <tr>
    <td> &gt;= </td>
    <td> greater than or equal </td>
    <td> true if the first item is greater than or equal to the second </td>
  </tr>
  <tr>
    <td> &lt;= </td>
    <td> less than </td>
    <td> true if the first item is less than or equal to the second </td>
  </tr>
</table>

Try typing a few into node:
	
	> 5 < 6
	true
	> 5 < 3
	false	
	>
	> 5 - 4 < 3
	true
	>

Notice in the first example that javascript performs the subtraction before comparing the result. Programming languages also have an order of operations, and mathematical operations always take place before comparisons. They have *precedence*.

Strings may also be compared in javascript:

	> "philip" == "philip"
	true
	> "philip" == "mathew"
	false
	> "philip" == "PHILIP"
	false
	>

Notice that string comparisons are *case sensitive*.

How do you think other comparison operations work with strings?

	> "philip" < "b"
	false
	> "philip" < "q"
	true
	> "philip" < "philib"
	false
	> "philip" < "philiq"
	true
	>

--

Next: Variables and Values