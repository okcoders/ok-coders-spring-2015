Lesson 18: Manipulating the Dom
======

For this assignment you will use jQuery to inject html into a webpage. Each html file in the *public* directory contains a template with a link to the required javascript data. Add a container into which you will inject the data and build up the necessary html for each data item. Don't forget to sync your repository. Full instructions repeated below.

## 1) Accounts

For the accounts assignment iterate through each item in the accounts array and inject a div into the page for each one. Each div should contain the account name, type as a string value ("checking", "savings") and the amount in the account in dollars. Use twitter bootstrap styling to make it look nice. Try varying text colors using spans to emphasize portions of the data.

## 2) People

For the people assignment divide the page into two columns using bootstrap's grid scaffolding. The left column should be the smaller of the two and contain a list of all the people by name. Use bootstrap's list group widget to display the list.

Set up the list group so that a user may click on a person. When they do insert that person's data into the right column. Make sure only one person ever appears on the right, so you'll need to clear out its container first. Show all of the person's data, including their name, age, sex, etc. You'll have to figure out how to communicate this information from one part of your application (the list) to the other (the main display).

## jQuery Constructs

You can build a new dom element just by passing the a tag string to the jQuery function:

```js
var $p = $('<p/>');
```

Notice that we can use the shorthand for a self-closing tag with the forward slash `/` to indicate that this is just an empty element.  I preface the variable name with a dollar sign `$` to remind myself that this is a jquery object.

I can add embed elements inside a dom element with the object's `append` function, among others:

```js
var $span = ...;
var $p = $('<p/>');

$p.append($span);
```

You'll use the same or a similar function to actually insert the constructed dom element into the page.

Actually insert content into a particular element with functions like `text` and `attr`. Don't use the `html` function:

```js
$p.attr('data-person', ...);
$p.text('...');
```

Make gratuitous use of divs in your html to create containers for the dom you will be injecting into the page, and target them with selectors to access them from your javascript:

```html
<body>
  <div id="people">
  </div>
</body>
```

```js
var $peopleDiv = $('#people');
...
```

You might find the empty function useful for clearing out the content of a dom element:

```js
$el.empty();
```

## Syncing the Repo

OK Coders may ignore these instructions.

If you forked this repo earlier to your account and then cloned it to your computer you will now need to sync it to get up to date with the latest additions, including the homework assignment. This involves associating another remote repository with your local copy, *pulling* its changes to your computer and then *merging* those changes with your master branch.

In the command line, `cd` into the directory where you cloned the ccew-angular repository originally:

```
$ cd path/to/ccew-angular
$ ls
00-prep		01-html		02-css			README.md
```

Make sure you're executing the following commands from the root directory for this repository and not one of the lesson or exercise directories.

Before syncing, make sure you've merged all the changes to your assignment from any branches you were on for the previous assignment, commited then, and that you are on the master branch. Check your branch and status with git. They should be:

```
$ git status
On branch master
nothing to commit, working directory clean
```

Let's sync. First check to see if you've already associated the ccew-angular repository on my github account as a remote upstream repo:

```
$ git remote -v
origin	https://github.com/student/ccew-angular.git (fetch)
origin	https://github.com/student/ccew-angular.git (push)
```

Notice that I only have `origin` listed here, one each for fetching and pushing (getting the code from your repo on github and sending it back to it). Your origin will point to the repository on your account. I've used "student" here.

We'll be adding `upstream`. If you already have upstream and it points to my ccew-angular repo, you can skip this step. Otherwise, add the original repository on my account as an upstream remote repo:

```
$ git remote add upstream https://github.com/phildow/ccew-angular.git
```

You should now see fetch and push remote repositories for `origin` as well as `upstream`:

```
$ git remote -v
origin   https://github.com/student/ccew-angular.git (fetch)
origin   https://github.com/student/ccew-angular.git (push)
upstream https://github.com/phildow/ccew-angular.git (fetch)
upstream https://github.com/phildow/ccew-angular.git (push)
```

Notice that the origins point to your github account and the upstreams point to my github account.

We're now ready to sync. Fetch the changes from my account. We can refer to remote repositories by name:

```
$ git fetch upstream
```

Switch to your master branch if you aren't already there:

```
$ git checkout master
```

And merge the changes you just fetched from my account, which have been put on the "upstream/master" branch:

```
$ git merge upstream/master
```

That's it. You should now see the bootstrap lesson material and have access to the exercises on your machine:

```
$ ls
00-prep
01-html
02-css	
03-twitter-bootstrap
04-javascript
README.md
```

For additional help, full instructions for forking, cloning and syncing may be found at:

[Forking a Repo](https://github.com/phildow/ccew-angular/blob/master/01-html/01-exercises/01-exercises.md)

GitHub instructions for forking and cloning a repo.

[Sycning a Fork](https://help.github.com/articles/syncing-a-fork/) 

GitHub instructions for syncing a repo you've already forked and cloned.