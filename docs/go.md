# Go

## Install Go

I prefer install using tarball under home `~/app` over using installer or brew.

First go to https://golang.org/dl/ and find the latest version

````bash
cd ~/Downloads
wget https://dl.google.com/go/go1.11.4.darwin-amd64.tar.gz
tar -zxf go1.11.4.darwin-amd64.tar.gz
mkdir ~/app
mv go ~/app
````

Second set your workspace, I just use `~/workspace`

````bash
mkdir -p ~/workspace/bin
mkdir -p ~/workspace/src
````

Cofig `PATH` and `GOPATH`, add the following to your `~/.env.sh` so the `go` command and `go install` can work

````bash
export GOROOT=$HOME/app/go
export GOPATH=$HOME/workspace
export PATH=$GOROOT/bin:$PATH
export PATH=$GOPATH/bin:$PATH
````

## Install dependency management

Since go1.11.2 `go mod` is official, however some projects are still using [dep](https://github.com/golang/dep) or even [glide](https://github.com/Masterminds/glide)

Glide is no longer maintained, the [latest and last release](https://github.com/Masterminds/glide/releases) is 0.13.2.
If you have problem accessing private repo using glide where password prompt pops up in parallel when using zsh, you can open a bash.

````bash
# install glide to you GOPATH use binary release
curl -sSL https://github.com/Masterminds/glide/releases/download/v0.13.2/glide-v0.13.2-darwin-amd64.tar.gz | tar -vxz -C /tmp --strip=1
# move it to $GOPATH/bin
mv /tmp/glide $GOPATH/bin/glide && glide -v
````

Dep haven't release for a while but there were some fixes on import logic, so just install it from source.

````bash
go get -u -v github.com/golang/dep/cmd/dep
````

Mod is built in, you need to enable it will `GO111MODULE=on` when you run it under `GOPATH`, if will be opt-in by default in future versions

````bash
go help mod
````

## Install lint tools

````bash
go get -u -v golang.org/x/tools/cmd/goimports
````