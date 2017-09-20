# Setup

1. Clone the repo in your workspace. it is recommended to setup ssh.
```bash
$ cd ~
$ mkdir -p workspace && cd workspace
$ git clone git@github.com:CodeForSocialGood/calltocode.org
```

2. Install git duet. https://github.com/git-duet/git-duet/#installation.
```bash
$ brew tap git-duet/tap
$ brew install git-duet
```
> **For Linux user**: Follow the instructions on [LinuxBrew](http://linuxbrew.sh/)

3. Install yarn. https://yarnpkg.com/lang/en/docs/install/#windows-tab.
```bash
$ brew install yarn --without-node
```

4. Install nvm. https://github.com/creationix/nvm#installation.
```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash
```

5. Install direnv. https://github.com/direnv/direnv#install.
```bash
$ brew install direnv
$ echo 'eval "$(direnv hook bash)"' >> ~/.bashrc
```

6. Restart the terminal and then run the following.
```bash
$ cd ~/workspace/calltocode.org
$ nvm install
$ direnv allow
```

**Make sure your IDE supports [editorconfig](http://editorconfig.org/).**