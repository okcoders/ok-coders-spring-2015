Introduction to Git
====

Git is a version control system. Version control systems keep track of changes you make to files in a project and allow you to undo those changes and move back and forth between them. Additionally, many people may edit the same project and even the same file within a project and the version control system will coordinate the changes.

[GitHub](https://github.com/) works with git to make it easy for programmers to share the code they create and collaborate with others.

[Heroku](https://www.heroku.com/) works with git to make it easy to *deploy* your applications to the internet.

Tracking changes to a file in a git project is a two step process. Git first *stages* a file by adding it to a tracking index and then *commits* the file to the respository. Once committed, a complete history of changes to the file is available and any version of the file may be recovered. It's awesome.

Git is divided into a number of commands. Do not call git by itself. Instead call git with a command and then pass options and arguments to that command. We'll cover the most basic commands here.

# Reference

[Pro Git](http://git-scm.com/book) is an excellent book on git available for free. The first three chapters are invaluable.

[GitHub](http://try.github.io/) offers free practice with git commands in a web browser.

[Git Tower](http://www.git-tower.com/learn/) offers additional free learning materials for git.

# Basic Git Commands

## git

Print out the list of commands that git accepts.

	git
	usage: git [--version] [--help] [-C <path>] [-c name=value]
	           [--exec-path[=<path>]] [--html-path] [--man-path] [--info-path]
	           [-p|--paginate|--no-pager] [--no-replace-objects] [--bare]
	           [--git-dir=<path>] [--work-tree=<path>] [--namespace=<name>]
	           <command> [<args>]
	
	The most commonly used git commands are:
	   add        Add file contents to the index
	   bisect     Find by binary search the change that introduced a bug
	   ...

## git init

Create a new git repository. `cd` into the directory you'd like to use first. 

	mbp-phil:~ okcoders$ cd myproject/
	mbp-phil:myproject okcoders$ git init
	Initialized empty Git repository in /Users/okcoders/myproject/.git/

Be careful where you initialize a new git repository. Never initialize a repository in your *home* directory. Always use a subfolder.

## git status

Print the status of the repository. Shows what branch you are on (more on branches later) and the status of any files that are being tracked.

When you don't know what to do next, for example whether you should add a file or commit it, `git status` often tells you:

	mbp-phil:myproject okcoders$ git status
	On branch master
	
	Initial commit
	
	nothing to commit (create/copy files and use "git add" to track)

Notice how the status suggests creating a file and using `git add` to track it. 

Create a text file and add some text to it. You can use *output redirection* with `echo` to quickly create a file with some text in it:

	mbp-phil:myproject okcoders$ touch myfile.txt
	mbp-phil:myproject okcoders$ echo "Some text" >> myfile.txt

`git status` now shows that the file exists but is untracked and suggests adding the file to begin tracking it:

	mbp-phil:myproject okcoders$ git status
	On branch master
	
	Initial commit
	
	Untracked files:
	  (use "git add <file>..." to include in what will be committed)
	
		myfile.txt
	
	nothing added to commit but untracked files present (use "git add" to track)

Notice that git recommends using `git add` to track the file.

## git add

Add a file or folder to the git index. This tells git to start tracking the file for changes, but it does not save changes to the file. Assuming you have *myfile.txt* in your project folder, add it to the git index with:

	mbp-phil:myproject okcoders$ git add myfile.txt
	
Use the special `.` alias that represents the current working directory to recursively add all files and folders in that directory to the git index. Recursively means that git will include all subfolders and files:

	mbp-phil:myproject okcoders$ git add .

`git status` shows the file is now marked as tracked and recommends commiting it:

	mbp-phil:myproject okcoders$ git status
	On branch master
	
	Initial commit
	
	Changes to be committed:
	  (use "git rm --cached <file>..." to unstage)
	
		new file:   myfile.txt

The next step is normally to commit any changes to tracked files, including the addition of new files. But notice that git also shows how to remove the file if you no longer which to track it.

## git rm

Remove a file or folder from the git index. `git rm` requires an additional option to know what to do with the file. Try `git rm` without an option to see the choices:

	mbp-phil:myproject okcoders$ git rm myfile.txt
	error: the following file has changes staged in the index:
	    myfile.txt
	(use --cached to keep the file, or -f to force removal)
	
`git rm -f` stops tracking the file **and deletes it**, like the `rm` command by itself.

`git rm --cached` stops tracking the file but does not delete it. Simply remove *myfile.txt* from the index, but do not delete it:

	mbp-phil:myproject okcoders$ git rm --cached myfile.txt
	rm 'myfile.txt'
	
`git status` now indicates that the file is no longer being tracked:

	mbp-phil:myproject okcoders$ git status
	On branch master
	
	Initial commit
	
	Untracked files:
	  (use "git add <file>..." to include in what will be committed)
	
		myfile.txt
	
	nothing added to commit but untracked files present (use "git add" to track)

## git commit

Saves changes to any tracked files. Git keeps track of all the changes you make to your tracked files so that you can undo them or switch back and forth between the changes.

Add *myfile.txt* back to the index so we can commit it:

	mbp-phil:myproject okcoders$ git add myfile.txt

Now commit the changes you've made to the repository. Git require that you include a *commit message* with your changes. Use the `-m` flag with the message you'd like to include in quotes:

	mbp-phil:myproject okcoders$ git commit -m "Initial commit"
	[master (root-commit) 5cefbc1] Initial commit
	 1 file changed, 1 insertion(+)
	 create mode 100644 myfile.txt

It is custom to set the message for the first commit to *"Initial commit"*. 

If you do not include the `-m` flag with a message, git will open your default text editor and wait for you to create a message, save and close the file.

Notice that `git status` now shows that all tracked files have been commited and there are no pending changes to save:

	mbp-phil:myproject okcoders$ git status
	On branch master
	nothing to commit, working directory clean

Accomplish both staging with `git add` and committing with `git commit` at the same time by passing the `-a` flag to `git commit`. This way it is not necessary to include `git add` as a separate command.

## git checkout

Undoes any changes to a file made since the last commit.

It is possible to recover the state of a file at any point in its *commit history*. A common operation is to undo changes you're in the process of making to a file.

When you save a file from your text editor, the file isn't saved to git. You must add and commit the file to save it in the repository. Every commit you've made up to that point is available to recall, and the `git checkout` command recalls the most recent one, discarding the changes to the file and replacing it with the last commited copy.

Assuming you have initialized a repository and added *file.txt* to it, you can commit the current state and then recall the most recently committed version with `git checkout <filename>`

	$ echo "First line of text" >> file.txt
	$ cat file.txt
	First line of text
	$ git commit -m "first line of text"
	[master (root-commit) 03dc870] first line of text
 	 1 file changed, 1 insertion(+)
 	 create mode 100644 file.txt
	
	$ echo "Second line of text" >> file.txt
	$ cat file.txt
	First line of text
	Second line of text
	
	mbp-phil:myproject okcoders$ git checkout file.txt
	mbp-phil:myproject okcoders$ cat file.txt
	First line of text
	
Notice that `checkout` undid the second line of text added to the file. We *rolled back* to the previous commit.

## git log

View the project's *change history*. Uses `less` to scroll through the pages. Recall that you page through less with the arrows keys, the spacebar and 'b' key, and that you quit the viewer with 'q'. For more information on less refer to the bash.md document.

	git log
	commit 041d8f483bc0fb2a30bddbe690e5c1423a40782e
	Author: Philip Dow <phil@phildow.net>
	Date:   Sun Jun 8 15:05:03 2014 -0500
	
	    minor changes to herkou.md
	
	commit 27a99a0d4f1285302ecc4bde601bc861786a5622
	Author: Philip Dow <phil@phildow.net>
	Date:   Sun Jun 8 14:57:30 2014 -0500
	
	    added interactive note for rm and link to linux man pages 
	
	...

`git log` shows the commit *hash*, which is a *unique identifier* for the commit, the change's author, change date and the message added to the commit with the `-m` flag.

## git remote

An advanced command that manages *remote repositories*. A remote repository is a copy of your entire git repository on another machine.

GitHub uses remote repositories so that you can save your projects and collaborate with others.

Heroku uses remote repositories to make it easy to *push* your project to its servers so that changes to the project on your machine are available on the internet.

We'll learn more about remote repositories later. For now it is important that you know how to add, or associate, a remote repository to your local repository so that you can upload files to it.

When you create a new project in GitHub you will receive instructions no how to add it as a remote repository for you local project. The format will be similar to:

	git remote add <name> <url>
	
So for example, to add a remote GitHub repository to your local repository with the name *origin* at a provided url, use:

	mbp-phil:myproject okcoders$ git remote add origin https://github.com/okcoders/bash-heroku-homework.git
	
The name will usually be *origin* for GitHub, and GitHub will tell you what url to use. Names are used so that you can associate more than one remote repository with your project and then refer to them.

Git tracks which remote repositories you've associated with your project. View them with `git remote -v`:

	mbp-phil:myproject okcoders$ git remote -v
	origin	https://github.com/okcoders/bash-heroku-homework.git (fetch)
	origin	https://github.com/okcoders/bash-heroku-homework.git (push)
	
Notice that git associates both the *fetch* and *push* operations with origin.

## git push

Pushes any commited changes in your local repository to the specified remote repository.

Changes that you commit to your project are saved on your machine but are not automatically saved to remote repositories. You must manually upload those changes using the `git push` command. 

When you push your changes to a remote repository, specify its *name* and the *branch* you want to push. The format of the command looks like:

	git push <remote repository> <branch to push>

More on branches later, but for now use the *master* branch. So to save changes to GitHub, push the *master* branch to *origin*.

The first time you push to GitHub, include the `-u` flag:

	mbp-phil:myproject okcoders$ git push -u origin master
	
Later changes may be uploaded to github without that option:

	mbp-phil:myproject okcoders$ git push origin master
	
Similarly, push to a Heroku repositoy using the *heroku* name:

	mbp-phil:myproject okcoders$  git push heroku master