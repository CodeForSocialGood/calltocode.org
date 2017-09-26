# Contributing

## Branching
Whenever you start new work, make sure to create a new branch.
```bash
$ git checkout -b feature/123456
```

## Pairing
Make sure to always pair when you work. See [Get Started](/docs/get_started.md).
```bash
$ git solo <initials>                 # if solo
$ git duet <initials-1> <initials-2>  # if pairing
```

## Commit Message
Whenever you make commits, make sure to reference the pivotal tracker story number of what you are working on. For example,
```bash
$ git commit -m "[#123456] add something"
```

An alternative and even better way to write a commit message is with a tag.
```bash
$ git commit

# below, the commit message is between the ---'s
---
chore: add something

[#123456]
---
```

## Staying Updated With Master
If you have your own fork and want to update your master,
```bash
$ git checkout master
$ git pull -r upstream/master
```

Or if you have a branch on the upstream,
```bash
$ git checkout master
$ git pull -r
```

## Pull Request
Once you are done with your commits, push your branch to remote before you create a pull request on github.
```bash
$ git push --set-upstream origin <branch-name>
```
