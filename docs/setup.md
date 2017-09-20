# Setup

## 1. Clone the repo in your workspace.
> It is recommended to setup ssh, for more detail go to [Adding a new SSH key to your GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)

```bash
$ cd ~
$ mkdir -p workspace && cd workspace
$ git clone git@github.com:CodeForSocialGood/calltocode.org
```

## 2. Install Homebrew

### 2.1. Mac OS
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
*For more details, go to [Homebrew](https://brew.sh/)*

### 2.2. Linux
```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install)"
```
#### Add Linuxbrew to your `PATH`
##### Debian/Ubuntu
```bash
test -d ~/.linuxbrew && PATH="$HOME/.linuxbrew/bin:$PATH"
test -d /home/linuxbrew/.linuxbrew && PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"
test -r ~/.profile && echo 'export PATH="$(brew --prefix)/bin:$PATH"' >>~/.profile
echo 'export PATH="$(brew --prefix)/bin:$PATH"' >>~/.profile
```

##### CentOS/Fedora/RedHat
```bash
test -d ~/.linuxbrew && PATH="$HOME/.linuxbrew/bin:$PATH"
test -d /home/linuxbrew/.linuxbrew && PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"
test -r ~/.bash_profile && echo 'export PATH="$(brew --prefix)/bin:$PATH"' >>~/.bash_profile
echo 'export PATH="$(brew --prefix)/bin:$PATH"' >>~/.profile
```
*For more detail, go to [LinuxBrew](http://linuxbrew.sh/)*

## 3. Install [Git Duet](https://github.com/git-duet/git-duet/#installation)
```bash
$ brew tap git-duet/tap
$ brew install git-duet
```

## 4. Install [Yarn](https://yarnpkg.com/lang/en/docs/install/#windows-tab).
```bash
$ brew install yarn --without-node
```

## 5. Install [nvm](https://github.com/creationix/nvm#installation)
```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash
```

## 6. Install [Direnv](https://github.com/direnv/direnv#install).
```bash
$ brew install direnv
$ echo 'eval "$(direnv hook bash)"' >> ~/.bashrc
```

## 7. Restart the terminal and then run the following.
```bash
$ cd ~/workspace/calltocode.org
$ nvm install
$ direnv allow
```

**Make sure your IDE supports [editorconfig](http://editorconfig.org/).**