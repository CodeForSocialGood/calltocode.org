# Contributing

## Branching
When you start new work, create a new branch.
```bash
$ git checkout -b feature/<story-number>
```

## Pairing
Always pair when you work. See [Get Started](/docs/get_started.md).
```bash
$ git solo <initials>                 # if solo
$ git duet <initials-1> <initials-2>  # if pairing
```

## Commit Message
Reference the pivotal tracker story number for what you are working on.
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
Once you are done with your commits, push your branch to the repository before creating a pull request. You can create a pull request using the github web interface.
```bash
$ git push --set-upstream origin <branch-name>
```
