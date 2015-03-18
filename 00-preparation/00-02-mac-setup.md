Macintosh Instructions
====

You must be running Mac OS 10.8 Mountain Lion or Mac OS 10.9 Mavericks. Check what version of the Mac OS you have installed by clicking on the Apple menu item at the top left of your screen and selecting *About this Mac*.

If you must upgrade your computer, follow the instructions at [apple.com/osx/how-to-upgrade](http://www.apple.com/osx/how-to-upgrade/).

Also ensure that you have installed the latest updates. Again click on the *Apple* menu item at select *Software Update*.

## Install Software

Install the following software by downloading it at these urls:

[Sublime Text](http://www.sublimetext.com/)

This is the free text editor we will be using in class. 

[Google Chrome](https://www.google.com/intl/en-US/chrome/browser/)

We will be doing all web development in Google Chrome because of its excellent developer tools.

[iTerm2](http://www.iterm2.com/)

An enhanced Terminal we'll learn to use.

## Install the Command Line Utilities

The Macintosh comes with a built-in command line interface called the *Terminal*. Launch it from your */Applications/Utilities* folder.

Install Apple's Command Line Tools: Instructions vary depending on which version of the Mac OS you are using. First try typing `gcc` at the command line. If a dialog box appears for installing the command line tools, *Install* them. You do not need to Install Xcode.

If the dialog box does not appear or you get an '*command not found*' error, download one of the following installers depending on your version of Mac OS. Double-click the completed download to install the files:

- Mac OS 10.9: [Command Line Utilities for Mac OS 10.9 Mavericks](https://s3.amazonaws.com/okcoders/command_line_tools_for_osx_mavericks_april_2014.dmg) 
- Mac OS 10.8: [Command Line Utilities for Mac OS 10.8 Mountain Lion](https://s3.amazonaws.com/okcoders/command_line_tools_for_osx_mountain_lion_april_2014.dmg)

## Configure Git

Set your global git username and password. At the terminal, type the following two commands. Press enter after each one:

	git config --global user.name "Your Name"
	git config --global user.email your@email.address

## Install Homebrew

Install Homebrew: Follow the instructions at [http://brew.sh/](http://brew.sh/). Scroll to the bottom of the page and paste the text that appears in your Terminal. Press return to execute the command. Text activity should indicate that Homebrew is being downloaded and installed. Follow any instructions that appear.

Update Hombrew: At the terminal, type the following command and press return:

	 brew update

## Install Node and Friends

Install Node.js: At the Terminal, type the following command and press return: 

	brew install node

Install Express: At the Terminal, type the following two commands and press return after each one:

	npm install -g express-generator

## Set Up Heroku

Sign up for a free account at Heroku: [https://www.heroku.com/](https://www.heroku.com/)

Install the Heroku Command Line Interface: Follow the instructions at [https://devcenter.heroku.com/articles/heroku-command](https://devcenter.heroku.com/articles/heroku-command). Note you will need to install the Heroku Toolbelt.

## Set up your SSH keys

SSH Keys are used to establish a secure connection to GitHub and Heroku. 

Follow the instructions at GitHub to create and register new SSH keys: [Generating SSH Keys for GitHub](https://help.github.com/articles/generating-ssh-keys).

Follow the instructions at Heroku to register your SSH keys. **You do not need to create a new public/private keypair.** [Register SSH Keys with Heroku](https://devcenter.heroku.com/articles/keys)

Nice work! You just set up your development environment and are already using the command line! This is serious stuff!