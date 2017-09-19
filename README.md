# calltocode.org

![nonprofit][nonprofit]
[![travis][travis]][travis-url]

![logo][logo]

> Platform where college students can get development experience by working with nonprofits.

## Setup

```bash
# 1. clone the repo in your workspace. it is recommended to setup ssh.
$ cd ~
$ mkdir -p workspace && cd workspace
$ git clone git@github.com:CodeForSocialGood/calltocode.org.

# 2. install git duet. https://github.com/git-duet/git-duet/#installation.
$ brew tap git-duet/tap
$ brew install git-duet

# 3. install yarn. https://yarnpkg.com/lang/en/docs/install/#windows-tab.
$ brew install yarn --without-node

# 4. install nvm. https://github.com/creationix/nvm#installation.
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash

# 5. install direnv. https://github.com/direnv/direnv#install.
$ brew install direnv
$ echo 'eval "$(direnv hook bash)"' >> ~/.bashrc

# 6. restart the terminal and then run the following.
$ cd ~/workspace/calltocode.org
$ nvm install
$ direnv allow
```

## Development

```bash
# whenever you are working solo or in a pair, make sure to git pair. if you haven't already done so, add yourself to .git-authors.
$ git solo <initials>  # or git duet <initials> <initials>
```

**Make sure your IDE supports [editorconfig](http://editorconfig.org/).*

[travis]: https://travis-ci.org/CodeForSocialGood/calltocode.org.svg
[travis-url]: https://travis-ci.org/CodeForSocialGood/calltocode.org

[nonprofit]: https://img.shields.io/badge/project-nonprofit-ff69b4.svg

[logo]: /media/logo.png
