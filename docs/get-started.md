---
sidebarDepth: 2
---

# Get started

[[toc]]

## Terminal

This section assume you have used terminal in other platforms, if you are from windows,
the biggest change is you don't see `***` when typing password in prompt,
just hit enter after you typed it.

### Install iTerm2

[iTerm2](https://www.iterm2.com/) supports split panel and more customization than the built in app.
To install, just [download](https://iterm2.com/downloads/stable/latest), unzip and drag it to application folder.

Now use `command + space` and type `iterm` to start it from spot light search, the system will ask
you if want to trust app download from internt, chick `open` to continue.
This alert will show up for all the other app you installed by drag drop downloaded `.app` file.

The default color is same as built in terminal app, it will look much nicer after we have oh-my-zsh,
but first we need to install homebrew.

- `command + d` to split vertically
- `command + shift + d` to split horizontally

Make the font bigger permanently (otherwise just `command + +` for current session), when you have iterm open

- `command + o` to open profiles, or select it from menu bar
- choose `Default` in list and click `Edit Profiles...`
- chose `Text` tab and there is a `Change Font` button in the bottom

### Install Homebrew

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

### Install Zsh

Zsh has better autocomplete than bash, mac does ship with zsh by default, however we can use brew to install newer version

````bash
brew install zsh zsh-completions
````

Make zsh your default shell. NOTE: the following only works if you didn't install zsh using brew.

````bash
chsh -s $(which zsh)
# chsh: /usr/local/bin/zsh: non-standard shell
````

The reason for above error is `chsh` checks `/etc/shells` which only have `/bin/zsh` instead of our brew installed `/usr/local/bin/zsh`,
one solution is to add it, another one is using [dscl](https://rick.cogley.info/post/use-homebrew-zsh-instead-of-the-osx-default/)

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

### Install oh-my-zsh

[oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh) bundles many zsh theme and plugin, install is just a single line.

````bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
````

After install edit `~/.zshrc` to update theme and enabled plugin, my favorite theme is `pygmalion`,
you can pick yours based on [screenshots](https://github.com/robbyrussell/oh-my-zsh/wiki/themes).

````bash
ZSH_THEME="pygmalion"
````

## Git

Run `brew install git` to install latest version of git if you haven't done it previous sections.

### Config SSH

SSH can be used by git even if you don't need to access any server using ssh, although GitHub favors [HTTPS over SSH](https://stackoverflow.com/questions/11041729/why-does-github-recommend-https-over-ssh).

First you need to generate a ssh key pair, this is based on [GitHub's Guide](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#platform-mac).
Make sure you don't have one already, just `ls -al ~/.ssh` you should not see `id_rsa.pub` and `id_rsa` (the private part of the pair).

````bash
# -t means type is RSA
# -b 4096 specify the length
# -C is just a comment, which normally is your email, i.e. luke@ge.com
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# when asked for file location, default is fine as long as you don't have another one, just hit enter
# when asked for passphrase, enter something, do NOT hit enter and use empty passpharse
````

You can add your generated public key to `~/.ssh/authorized_keys` so you can `ssh localhost` without password, this also test if you remembered you passphrase correctly.

````bash
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
ssh localhost
````

### Config Git User

Git needs a username and email in commit, by default this is not verified in most pubic git host platform, verification is done by [signing commit using GPG](https://help.github.com/articles/signing-commits/).
You can set a global one and override them in individual repository, though I don't recommend developing personal side projects on company issued laptops and the opposite is illegal.

````bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
````

GitHub shows avatar of commit based on email in the commit message, so if you didn't see your avatar, [reset commit author](https://stackoverflow.com/questions/3042437/how-to-change-the-commit-author-for-one-specific-commit) 
using `git commit --amend --rest-author` and `git push -f` on you own fork when it's not too late.

### Config Global gitignore

Normally you put a `.gitignore` in each projects, you can also have a global one since mac has many temp file that is useless for other platforms, i.e. `.DS_Store`.
In practice I only use the global ignore for some hacky shell script I have i.e. `git-push-bypass-hook.sh`

````bash
vi ~/.global_gitignore # be explicit, don't make it .gitignore
git config --global core.excludesFile ~/.global_gitignore
````

Check your current config by run `git config -l` in folder that is not a git repo.

````bash
git config -l
````

### Add your ssh pub key to GitHub

Just go to [settings](https://github.com/settings/keys) and copy and paste, [GitHub's guide](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/#platform-mac)

````bash
cat ~/.ssh/id_rsa.pub | pbcopy
````

## What's next

Now you already have shell environment setup, you are ready to [Go](go).
I central my workspace using `GOPATH` regardless of language I am using and the fact that `GOPATH` is no longer mandatory after `go mod`.