Introduction to Modeling and Databases
==============================

Modeling is the process of identifying and characterizing the underlying data that your application must represent to the user. Typically that data reflects some real *thing* or things that the user will virtually manipulate. Modeling identifies the features of those things and their relationships that are important to your user's needs.

Modeling is abstract. You seek to identify the *form* of your data, or its *schema*, not the data itself. Modeling typically relies on a database for storage of the actual data, with limitations imposed on the form of the schemas by different databases.

It is important to start with the needs of your users when modeling. A thing can be represented in many ways and many of its features identified. But which are important to your application?

For example, many applications must represent people. An online clothing application might represent a person as a collection of attributes such as age, height, weight, hair color, eye color, skin color and so on, attributes that are primarily aesthetic so that it can make intelligent clothing recommendations. Internally these are the data points that the application will track about a customer. But a medical application might represent a person as a collection of attributes such as medical history, family medical history, current conditions, allergic reactions, current medication, and so on.

Both applications represent people, both applications store a collection of data points that make up a person, but what a person is, what features of a person are important, vary significantly between the two based on the needs of the application and its users.

## References

**Data Modeling**

[Data Modeling Wikipedia](http://en.wikipedia.org/wiki/Data_modeling) *Highly recommended*

[CRUD](http://en.wikipedia.org/wiki/Create,_read,_update_and_delete) *Highly recommended*

[Cardinality](http://en.wikipedia.org/wiki/Cardinality_(data_modeling))

[Sets](http://en.wikipedia.org/wiki/Set_(mathematics))

**Databases**

[MySQL](http://www.mysql.com/)

[mongoDB](http://www.mongodb.com/)

## Objects

The fundamental unit of modeling for us is the object. An object is a single, meaningful whole that is composed of numerous simple data points often called *attributes* or *properties*. In the example in the introduction, a person is an object and its attributes include age, height, weight and so forth. Objects are often represented in table like diagrams:

<table>
<tr><th>Object</th></tr>
<tr><td>Attribute 1</td></tr>
<tr><td>Attribute 2</td></tr>
<tr><td>Attribute 3</td></tr>
</table>

So a person object might look like:

<table>
<tr><th>Person</th></tr>
<tr><td>First Name</td></tr>
<tr><td>Last Name</td></tr>
<tr><td>Sex</td></tr>
<tr><td>Weight</td></tr>
<tr><td>Height</td></tr>
</table>

Objects may not always represent such concrete physical things as people. They may represent more abstract concepts. An address, for example, often needs to be reprsented in an application. It might look like:

<table>
<tr><th>Address</th></tr>
<tr><td>Street 1</td></tr>
<tr><td>Street 2</td></tr>
<tr><td>City</td></tr>
<tr><td>State</td></tr>
<tr><td>Zip</td></tr>
</table>

In every case, though, an object is a meaningful whole unit that is composed of attributes.

## Attributes

Attributes are the data points that make up an object. They should be simple and they should have an identifiable type.

**Simple**

A data point is simple when it consists of a single piece of information, as opposed to objects which are composed of many pieces of information. For example, an address is not an attribute because it is composed of many data points, but a zip code is an attribute because it is one piece of information, same for city and for state.

**Type**

When modeling you also want to identify the type of each attribute. Type means something similar to type in programming: what type of data is the data point? Is it a number, text, a boolean or a date? When it is a number, is it an integer (whole number) or is it a real number (with decimal places)?

Let's modify the person object to include type:

<table>
<tr><th colspan="2">Person</th></tr>
<tr><td>First Name</td><td>Text</td></tr>
<tr><td>Last Name</td><td>Text</td></tr>
<tr><td>Sex</td><td>Integer</td></tr>
<tr><td>Weight</td><td>Real Number</td></tr>
<tr><td>Height</td><td>Real Number</td></tr>
</table>

Notice that a type might not be obvious. For sex I have chosen number here. I intend to represent male = 0 and female = 1. But I could have chosen text for male = 'M' and female = 'F'. Which one makes more sense? Why?

Similarly, when modeling the address what type would you select for the zipcode? Ostensibly a zipcode is a number, but zipcodes are treated more like text, and in fact a complete zipcode is not a number but more a string of digits: "73069-1234".

Modeling requires you to take the nature of the real world data carefully into account so that you can accurately represent it.

## Collections

Objects are the fundamental unit of modeling and make up much of the manipulable data in an applicaion. Objects are composed of attributes. Objects of the same kind often then appear in collections.

A collection is a group of objects of the same type. It is common for applications to deal with collections of objects and not just single objects. A medical application will have many people that it is tracking, not just one person, and an online clothing application will have many customers it needs to model, not just one.

Collections are like lists or arrays in javascript but with an important difference. Typically an object is not allowed to appear more than once in a collection, so that we can say the collection is composed of *distinct* objects. This is known as a *set* in mathematics.

## Unique Identifiers

Because collections of objects are distinct objects must be marked marked by some unique identifier that is gauranteed to match only a single item. For example, if I have a collection of people and I want to update the height of one of them, but two of those people have the same name and I am identifying the people by name, how do I know which person's height to change?

Instead of using a name or street or whatever as the unique identifier for an object, an object usually includes a separate, numeric `id` attribute that uniquely identifies it and which, it turns out, a database can generate for us. All references to an object are made through its `id` rather than some other attribute which may not have a unique value across the entire collection of like objects.

Modiyfing our person object to include the `id` attirbute results in this model:

<table>
<tr><th colspan="2">Person</th></tr>
<tr><td>ID</td><td>Unique Integer</td></tr>
<tr><td>First Name</td><td>Text</td></tr>
<tr><td>Last Name</td><td>Text</td></tr>
<tr><td>Sex</td><td>Integer</td></tr>
<tr><td>Weight</td><td>Real Number</td></tr>
<tr><td>Height</td><td>Real Number</td></tr>
</table>

## Relationships

Objects will typically be related to one another in an application. Modeling includes the process of identifying these relationships and the kind of relationship that it is, also known as its *cardinality*.

For example, in the online clothing application a customer is a person for which we have a model object, but the customer also has an address, and an address is a separate kind of object in our model, rather than an attribute. We can say, then, that there is a relationship between a person and an address in this model.

Taking this further, a person might also have a shopping cart. The shopping cart is itself another object which might include attributes such as *date modified* and *discount*. Moreover, the shopping cart itself refers to the products it contains, which are themselves objects in our model with attributes such as *category*, *price* and so on. The shopping cart "holds on to" the objects which a person has marked as wanting to buy.

The entire *relationship graph* for this "simple" online shopping application must now account for the fact that there are relationships between people and shopping carts and between shopping carts and products.

Relationships between objects must additionally account for the nature of the relationship. A relationship is typically one of three types: *One-to-One*, *One-to-Many*, *Many-to-Many*.

**One-to-One**

A one-to-one relationship between two types objects A and B in a model says that *one* object of type A has a relationship with *one* object of type B.

In our example shopping application a customer has a single shopping cart. Now there are collections of customers and collections of shopping carts, but in those collections if we were to pick out a single customer, we could find the single shopping cart that belongs to that customers. Or from the other direction, if we were to pick out a single shopping cart, we could find the single customer who has that shopping cart. One customer, one shoping cart.

For this reason, depending on which perspective you are taking, one-to-one relationships are often called *has-one* and *belongs-to* relationships. A single customer has one shopping cart and a shopping cart belongs to a single customer.

**One-to-Many**

A one-to-many relationship between two types objects A and B in a model says that *one* object of type A has a relationships with *many* objects of type B.

Consider Amazon's wish lists. A single customer can have many wish lists. There is the primary wish list but Amazon also allows customers to create addtional lists. In the collection of customers and wish lists, if we pick out a single customer we could find many wish lists for that customer, but if we were to pick out a single wish list we would only find the one customer that it belongs to.

This makes sense. A customer can have many wish lists, but a wish list cannot have many customers. Two customers don't share a single wish list so that they can both make modifications to it.

**Many-to-Many**

A many-to-many relationships between two types of objects A and B in a model so that *many* objects of type A can have a relationship with *many* objects of type B.

Imagine a tagging system for files on your computer. A file is any document anywhere on your computer, and a tag is just a label that you can apply to a file. You create two objects for this model, a *file* object with attributes like *name*, *path*, *date created* and so on, and a *tag* object with a *label* text attribute. Both keep track of a unique identifier.

According to your application's needs, a file can have many tags, and a tag can be applied to many files. Consequently, in the collection of files, pick out a file. That single file can be labeled with many tags. For example, a document might have the tags "Silicon Valley", "Tech" and "Entrepreneur". Now in the collection of tags pick out a single tag, say "Entrepreneur". That single tag may have been applied to many files. From one file I can get to many tags, and from one tag I can get to many files. This is a many-to-many relationship.

**Model Your Relationships**

Relationships themselves must be modeled in a data model. How they are modeled depends on the type of database being used. Either way you should be aware of the relationships between objects in your model and identify if they are one-to-one, one-to-many or many-to-many.

## SQL Style Databases

A data model is a formal representation of the data in a system. It identifies objects, attributes and relationships. But the actual data will typically be stored in a database. We'll be using mongoDB in this class, but an introduction to SQL is illustrative.

SQL style databases like SQL Server, MySQL and SQLite store objects in tables. A table includes a *schema* which identifies the model attributes and their types and then is composed of rows and columns. Each row represents a single actual piece of data in the table and each column corresponds to one of its attributes. It is very much like an excel spreadsheet, with one spreadsheet for each type of object in the data model.

A SQL table with three entries for our person model might look like:

<table>
<tr><th colspan="6">Person</th></tr>
<tr>
	<th>ID: Unique Integer</th>
	<th>First Name: Text</th>
	<th>Last Name: Text</th>
	<th>Sex: Integer</th>
	<th>Weight: Real Number</th>
	<th>Height: Real Number</th>
</tr>
<tr>
	<td>1</td>
	<td>Philip</td>
	<td>Dow</td>
	<td>0</td>
	<td>180</td>
	<td>72</td>
</tr>
<tr>
	<td>2</td>
	<td>Mary</td>
	<td>Beth</td>
	<td>1</td>
	<td>110</td>
	<td>60</td>
</tr>
<tr>
	<td>3</td>
	<td>Johnny</td>
	<td>Johnson</td>
	<td>0</td>
	<td>200</td>
	<td>66</td>
</tr>
</table>

SQL databases support relationships with foreign keys. In a one-to-one relationship, one of the objects will include in its model a `foreignId` attribute that refers to the `id` attribute of an object in the other table.

For example, in the shopping application we have two tables, *customer* and *shopping cart*. The customer table might have a `shoppingcartId` attribute whose value for a particular customer will be the `id` of a particular shopping cart object. Or in reverse, the shopping cart table might have a `customerId` attribute whose value for a particular shopping cart will be the `id` of a particular customer:

In the following example we have three customers and one shopping cart and the shopping cart belongs to the customer with `id` 3, or Johnny Johnson:

<table>
<tr><th colspan="4">Customer</th></tr>
<tr>
	<th>ID: Unique Integer</th>
	<th>First Name: Text</th>
	<th>Last Name: Text</th>
	<th>Joined: Date</th>
</tr>
<tr>
	<td>1</td>
	<td>Philip</td>
	<td>Dow</td>
	<td>June 1 2013</td>
</tr>
<tr>
	<td>2</td>
	<td>Mary</td>
	<td>Beth</td>
	<td>October 30 2004</td>
</tr>
<tr>
	<td>3</td>
	<td>Johnny</td>
	<td>Johnson</td>
	<td>March 17 2014</td>
</tr>
</table>

<table>
<tr><th colspan="4">Shopping Cart</th></tr>
<tr>
	<th>ID: Unique Integer</th>
	<th>Customer ID: Foreign Key</th>
	<th>Last Modified: Date</th>
	<th>Discount: Integer</th>
</tr>
<tr>
	<td>1</td>
	<td>3</td>
	<td>March 18 2014</td>
	<td>0</td>
</tr>
</table>

If we were to add more shoping carts, we would have to ensure that the customer id never repeated itself, because one shopping cart can belong to only one customer in this one-to-one model.

One-to-many relationships are modeled the same way in a SQL style database. A forein key attribute will refer to the id of a particular object in another table. But the values of the forein keys are allowed to repeat.

Imagine if a person was allowed to have more than one shopping cart. Then you might see a shopping cart table like:

<table>
<tr><th colspan="4">Shopping Cart</th></tr>
<tr>
	<th>ID: Unique Integer</th>
	<th>Customer ID: Foreign Key</th>
	<th>Last Modified: Date</th>
	<th>Discount: Integer</th>
</tr>
<tr>
	<td>1</td>
	<td>3</td>
	<td>March 18 2014</td>
	<td>0</td>
</tr>
<tr>
	<td>2</td>
	<td>3</td>
	<td>March 21 2014</td>
	<td>25</td>
</tr>
<tr>
	<td>3</td>
	<td>1</td>
	<td>December 20 2013</td>
	<td>10</td>
</tr>
</table>

Johnny Johnson now has two shopping carts. It looks like he created a second one a few days after he created the first one, whereas Philip Dow only has a single cart.

In a many-to-many model a separate table is created to hold foreign keys to the two tables for the objects that are related. Given the above example of files and tags, a SQL database would have a files table and a tags table and then a files-tags table that looks like:

<table>
<tr><th colspan="3">Files-Tags</th></tr>
<tr>
	<th>ID: Unique Integer</th>
	<th>File ID: Foreign Key</th>
	<th>Tag ID: Foreign Key</th>
</tr>
<tr>
	<td>1</td>
	<td>1</td>
	<td>2</td>
</tr>
<tr>
	<td>2</td>
	<td>3</td>
	<td>2</td>
</tr>
<tr>
	<td>3</td>
	<td>1</td>
	<td>4</td>
</tr>
</table>

Notice that both the `file id` foreign key and the `tag id` foreign key can be repated. Imagine having particular files and tags with these ids. This table relates the two to one another.

Given tables like these and forein keys, SQL then provides a way to `join` the attributes in tables together in order as you fetch particular rows from each one. 

Importantly for SQL databases, the values in a particular column for a particular row must be a simple data type such as a date, number, boolean or text. A column cannot itself contain another table or complex collection of data points.

## Document Style Databases

Instead of tables and rows, document style databases have collections and documents. A collection functions like a table but there are two important differences:

First, a collection does not require that you define a schema in advance for it. The collection will simply adopt itself to whatever data you put in it. SQL tables cannot do this.

Second, a collection supports nested data. In SQL a particular value for a particular entry must be a simple data type. In document style databases, a particular value might be another object or a collection of objects or something more complex. For this reason there is usually more than one way to model relationships in a document style database.

mongoDB, the document database we will be using in this class, stores data as javascript objects. The database uses a more efficient binary representation under the hood, but to us, data really looks like javascript.

For example, the person table from the SQL example above will just look like an array of objects in mongoDB:

**Person**

```js
[
  {
    id: 1,
    firstName: 'Philip',
    lastName: 'Dow',
    joined: 'June 1 2013'
  },
  {
    id: 2,
    firstName: 'Mary',
    lastName: 'Beth',
    joined: 'October 30 2014'
  },
  {
    id: 3,
    firstName: 'Johnny',
    lastName: 'Johnson',
    joined: 'March 17 2014'
  }
]
```

Notice that the "schema" is repeated for each document (or person) in the collection, that is, the names of the object properties. This means that different people can have different collections of properties and it is up to your application code to handle any differences.

Because we can have nested data, relationship modeling changes radically. On the one hand, relationships can be accomplished the same way it is done in SQL. The documents in different collections simply refer to one another by `id`. There is no `join` operation, however, and it will be up to application code to make multiple requests to a database to acquire related data.

On the other hand, relationships can simply be embedded in a document. Consider the customer and shopping cart relationship in the SQL above. That might look like this in a document database:

**Customer**

```js
[
  {
    id: 1,
    firstName: 'Philip',
    lastName: 'Dow',
    joined: 'June 1 2013'
  },
  {
    id: 2,
    firstName: 'Mary',
    lastName: 'Beth',
    joined: 'October 30 2014'
  },
  {
    id: 3,
    firstName: 'Johnny',
    lastName: 'Johnson',
    joined: 'March 17 2014'
    shoppingCart: {
      lastModified: 'March 18 2014',
      discount: 0
    }
  }
]
```

Notice the third item in this customer collection includes an embedded shopping cart. The attributes in that shopping cart dont include an id or a foreign key id. In a sense the shopping cart object does not exist separately from a customer object. Because it is a one-to-many relationship and is always bound to a single customer, the cart can be embedded or *nested* in the customer object. Document style databases let us model relationships this way.

A one-to-many relationship could be modeled similarly, with the shopping cart attribute consisting of an array of objects instead of a single object:

**Customer**

```js
[
...
  {
    id: 3,
    firstName: 'Johnny',
    lastName: 'Johnson',
    joined: 'March 17 2014'
    shoppingCart: [
      {
        lastModified: 'March 18 2014',
        discount: 0
      },
      {
        lastModified: 'March 21 2014',
        discount: 25
      }
    ]
  }
]
```

Many-to-many relationships, on the other hand, probably require separate collections for each type of object but might not need an intermediate collection to relate the two. Why not?

There is not necessarily an always right way to store data in a document based data based. The question of whether you should use separate collections for one-to-one and one-to-many relationships or nested data depends on the needs of your applications and your users.

## CRUD and HTTP

If data modeling is the process of identifying the underlying data that your application must represent to the user, of identifying its features and its relationships -- *its form* -- databases allow us to store actual data that comes in that form.

In particular, databases allow us to perform the four CRUD operations on the data they store: Create, Retrieve, Update and Delete.

We'll see that both SQL and document based databases provide a language for performing these kinds of operations, and moreover, that HTTP verbs correspond to them. When we build resoureful routes like we did in previous homework assignments, we are preparing ourselves for perfoming CRUD operations on the underlying data in a sane and consistent way.