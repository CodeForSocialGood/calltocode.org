# Developer Environment Setup

This document contains general guidelines for setting up a developer environment sufficient for getting started with
contributing on this project:

- [Mac OS Setup](#mac)
- [Linux Setup](#linux)
- [Windows 10 Setup](#windows10)

## <a name="mac"></a> Mac OS Setup

### 1. Install Homebrew

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
*For more details, go to [Homebrew](https://brew.sh/).*

### <a name="rest"></a> 2. Install [Git Duet](https://github.com/git-duet/git-duet/#installation)

```bash
$ brew tap git-duet/tap
$ brew install git-duet
```

### 3. Install [Yarn](https://yarnpkg.com/lang/en/docs/install/#windows-tab)

```bash
$ brew install yarn --without-node
```

### 4. Install [Nvm](https://github.com/creationix/nvm#installation)

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash
$ nvm install
```
*If you are on a Mac and having trouble, make sure to run `touch ~/.bash_profile` before running the above command.*

### 5. Install [Direnv](https://github.com/direnv/direnv#install)

```bash
$ brew install direnv
$ echo 'eval "$(direnv hook bash)"' >> ~/.bashrc
```

### 6. Restart the terminal and then run the following

```bash
$ cd ~/workspace/calltocode.org
$ nvm install
$ direnv allow
```

### 7. Make sure your IDE supports [editorconfig](http://editorconfig.org/)

## <a name="linux"></a> Linux Setup

### 1. Install Linuxbrew

```bash
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install)"
```

### 2. Add Linuxbrew to your `PATH`

#### 2.1. Debian/Ubuntu

```bash
$ test -d ~/.linuxbrew && PATH="$HOME/.linuxbrew/bin:$PATH"
$ test -d /home/linuxbrew/.linuxbrew && PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"
$ test -r ~/.profile && echo 'export PATH="$(brew --prefix)/bin:$PATH"' >>~/.profile
$ echo 'export PATH="$(brew --prefix)/bin:$PATH"' >>~/.profile
```

#### 2.2 CentOS/Fedora/RedHat

```bash
$ test -d ~/.linuxbrew && PATH="$HOME/.linuxbrew/bin:$PATH"
$ test -d /home/linuxbrew/.linuxbrew && PATH="/home/linuxbrew/.linuxbrew/bin:$PATH"
$ test -r ~/.bash_profile && echo 'export PATH="$(brew --prefix)/bin:$PATH"' >>~/.bash_profile
$ echo 'export PATH="$(brew --prefix)/bin:$PATH"' >>~/.bash_profile
```
*For more details, go to [Linuxbrew](http://linuxbrew.sh/).*

### 3. Follow [Mac OS Setup](#mac) starting from [section 2](#rest)

## <a name="windows10"></a> Windows 10 Setup

> It is recommended that you use a mac or linux, but if you only have a pc, follow these steps to setup ubuntu bash.

### 1. Shell Setup

1. Update your Windows 10 to the latest build.
2. Run powershell as administrator and execute the following.
```bash
$ Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`
```
3. Enable Developer Mode in Windows settings.
4. Run command prompt as administrator and execute the following.
```bash
$ bash
```
5. After setup, open "Bash on Ubuntu on Windows". Add this to your dock.
6. Click the Ubuntu icon on the top left of the window, and click Defaults.
7. Setup Font -> Size 14, Font Lucida Console.
8. Enable QuickEdit Mode.
9. Restart bash.
