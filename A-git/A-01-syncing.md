Syncing Changes From The Original Repository
===

Before you grab changes from the master ok-coders-spring-2015 repository you will first need to *fork* that repository to your GitHub account (which you may have already done) and *clone* it from your GitHub account to your computer.

## References

[Forking a repo](https://help.github.com/articles/fork-a-repo/)

The instructions at the link above explain how to both fork and then clone a repository. ou have probably already forked the original repository. *Forking* copies the repository from my GitHub account to your GitHub account. It is done in the web browser and only moves data around on GitHub's servers.
 
Once the repository is copied to your GitHub account you can *clone* it to your laptop, which copies it from GitHub's server's to your computer. To clone the repository you will need to be familiar with the command line and git commands. See the **command line** lesson material for help.

[Syncing a fork](https://help.github.com/articles/syncing-a-fork/)

*Syncing* a forked repository grabs changes from the original repository and adds them to your repository. You might think this could be done in the browser directly from one GitHub account to another, but that is not the case.

*Instead you will sync the changes from the original repository to your computer and then you will upload them back to your copy of the repository on GitHub.*

This link summarizes what we'll be doing below and assumes that you have already forked the repository and cloned it to your computer. You will need to be comfortable with the command line and git commands to sync the repository.

## Syncing the Repo

If you forked this repo earlier to your account and then cloned it to your computer you will now need to sync it to get up to date with the latest additions, including the exercise assignments. This involves associating a remote repository with the copy on your laptop, *pulling* its changes to your computer and then *merging* those changes with your master branch.

In the command line, `cd` into the directory where you cloned the ccew-angular repository originally:

```
$ cd path/to/ok-coders-spring-2015
$ ls
00-prep		01-html		02-css			README.md
```

Make sure you're executing the following commands from the root directory for this repository and not one of the lesson or exercise directories.

**Ready your repo**

Before syncing, make sure you've merged all the changes to your assignment from any branches you were on for the previous assignment, commited then, and that you are on the master branch. Check your branch and status with git. They should be:

```
$ git status
On branch master
nothing to commit, working directory clean
```

**Connect the master repo**

Let's sync. First check to see if you've already associated the ok-coders-spring-2015 repository on my github account as a remote upstream repo:

```
$ git remote -v
origin	https://github.com/student/ok-coders-spring-2015.git (fetch)
origin	https://github.com/student/ok-coders-spring-2015.git (push)
```

Notice that I only have `origin` listed here, one each for fetching and pushing (getting the code from your repo on github and sending it back to it). Your origin will point to the repository on your account. I've used "student" here.

We'll be adding `upstream`. If you already have upstream and it points to the okcoders account you can skip this step. Otherwise, add the original repository on the okcoders account as an upstream remote repo:

```
$ git remote add upstream https://github.com/okcoders/ok-coders-spring-2015.git
```

You should now see fetch and push remote repositories for `origin` as well as `upstream`:

```
$ git remote -v
origin   https://github.com/student/ok-coders-spring-2015.git (fetch)
origin   https://github.com/student/ok-coders-spring-2015.git (push)
upstream https://github.com/okcoders/ok-coders-spring-2015.git (fetch)
upstream https://github.com/okcoders/ok-coders-spring-2015.git (push)
```

Notice that the origins point to your github account and the upstreams point to the ocoders account.

**Syncing**

We're now ready to sync. Switch to your master branch if you aren't already there:

```
$ git checkout master
```

Fetch the changes from the okcoders account. We can refer to remote repositories by name:

```
$ git fetch upstream
```

And merge the changes you just fetched from the okcoders account, which have been put on the "upstream/master" branch:

```
$ git merge upstream/master
```

You should now see the additional lesson material and have access to the exercises on your machine:

```
$ ls
00-preparations
01-html
02-css	
03-twitter-bootstrap
04-javascript
...
README.md
```

**Push it back up**

You've downloaded the latest changes to your machine but you haven't uploaded them to your own github account yet. To do so you'll push the master branch to the origin remote repository:

```
$ git push -u origin master
```

You should now have the latest changes both on your machine and on your GitHub account.