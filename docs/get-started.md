# Get started

This guide assume you have used terminal in other platforms, if you are from windows,
the biggest change is you don't see `***` when typing password in prompt,
just hit enter after you typed it.

## Install iTerm2

[iTerm2](https://www.iterm2.com/) supports split panel and more customization than the built in app.
To install, just [download](https://iterm2.com/downloads/stable/latest), unzip and drag it to application folder.

Now use `command + space` and type `iterm` to start it from spot light search, the system will ask
you if want to trust app download from internt, chick `open` to continue.
This alert will show up for all the other app you installed by drag drop downloaded `.app` file.

The default color is same as built in terminal app, it will look much nicer after we have oh-my-zsh,
but first we need to install homebrew.

- `command + d` to split vertically
- `command + shift + d` to split horizontally

## Install Homebrew

[brew](https://brew.sh) is the package manager for mac.

````bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
````

When installing brew, it will spend some time download and install the XCode command line tool.
It contains compiler tool chain, which is essential even for non Object-C/Swift development.
Also you need to enter password for sudo.

Now let's try `brew install git` and `ls -l /usr/local/bin` you should see `/usr/local/bin/git` is linked to `/usr/local/Cellar/git/2.20.1/bin/git`.

And some other common tools

````bash
brew install vim # it will also install python3, ruby
````

## Install zsh and oh-my-zsh

Mac does ship with zsh by default, however we can use brew to install newer version

````bash
brew install zsh zsh-completions
````

Make zsh your default shell. NOTE: the following only works if you didn't install zsh using brew.

````bash
chsh -s $(which zsh)
# chsh: /usr/local/bin/zsh: non-standard shell
````

The reason for above error is `chsh` checks `/etc/shells` which only have `/bin/zsh` instead of our brew installed `/usr/local/bin/zsh`,
one solution is to append it, another one is use [dscl](https://rick.cogley.info/post/use-homebrew-zsh-instead-of-the-osx-default/)

````bash
# add /usr/local/bin/zsh to /etc/shells, or you can just sudo vi /etc/shells
echo $(which zsh) | sudo tee -a /etc/shells
chsh -s $(which zsh)
# now you should not see the old error, quit current terminal and open a new one
exit
````

After switching default shell, quit you current current terminal and open a new one,
you should see a screen saying you don't have a `~/.zshrc`,
chose `0` to create an empty file, we will use the one provided by oh-my-zsh.

Install [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) is just a single line.

````bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
````