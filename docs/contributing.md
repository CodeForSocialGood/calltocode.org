# Contributing to calltocode.org

This document contains general guidelines for contributing to calltocode:

- [Prerequisites](#prerequisites)
- [Getting the Project Source](#source)
- [Get the App Running](#running)
- [Pivotal Tracker Workflow](#pivotal)
- [Git Workflow](#git)
- [Questions or Problems?](#questions)

## <a name="prerequisites"></a> Prerequisites

Make sure your development environment is properly setup by following the [Development Environment Setup](docs/DEVELOPER.md) guide.

## <a name="source"></a> Getting the Project Source

> It is recommended to setup ssh. Please [add a new SSH key to your GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/).

### Cloning the repository into your workspace

```bash
$ cd ~
$ mkdir -p workspace && cd workspace
$ git clone git@github.com:CodeForSocialGood/calltocode.org
```

### Alternatively, you can fork and clone the repository

1. Learn about forking [here](https://help.github.com/articles/fork-a-repo/).
2. Fork the [main calltocode.org repository](https://github.com/CodeForSocialGood/calltocode.org).
3. Clone your fork of the repository and define an upstream remote pointing back to the main calltocode.org repository that you forked in the first place:
```bash
git clone git@github.com:<github username>/calltocode.org
cd calltocode.org/
git remote add upstream https://github.com/CodeForSocialGood/calltocode.org
```

## <a name="running"></a> Get the App Running


### Install Dependencies

```bash
$ yarn
```

### Start the app

Use this local build for development:

```bash
$ yarn db
$ yarn start:dev
```

Use this for simulating the test environment through Docker:

```bash
$ yarn start

# When finished, stop the app
$ yarn stop
```

### Run tests locally:

```bash
$ yarn test
```

## <a name="pivotal"></a> Pivotal Tracker Workflow

We use [Pivotal Tracker](https://www.pivotaltracker.com) to track our user stories.

- There are three different **story types**: **feature**, **bug**, and **chore**
- Each story has a **story id**: for example `#153541038`

Stories in the backlog that say `Start` are available for starting.

### For feature & bug stories, hit...

- `Start` when you start working. This prevents having two people start separate work on the story.
- `Finish` when you submit the PR for your work on Github.
- `Deliver` when the PR gets approved and merged into master.
- `Accept` when the changes are verified in the test environment.
- `Reject` when the changes aren't verified in test environment.

### For chore stories, hit...

- `Start` when you start working. This prevents having two people start separate work on the story.
- `Finish` when you submit the PR *and* it is approved and merged into master.

## <a name="git"></a> Git Workflow

### Branching

When you start new work, always create a new branch:

```bash
$ git checkout -b <story type>/<story id>
```

*See [Pivotal Tracker Workflow](#pivotal) for more information about **story type** and **story id**.*

### Pairing

Always pair when you work:

```bash
$ git solo <initials>                   # if you are working solo
$ git duet <initials-1> <initials-2>    # if you are pairing with someone
```

*For more details, go to [Developer Environment Setup](./DEVELOPER.md#rest).*

### Commit Message

Reference the pivotal tracker **story id** for the story you are working on:

```bash
$ git commit

# below, the commit message is between the ---'s
---
chore: add something

[<story id>]
---
```

*See [Pivotal Tracker Workflow](#pivotal) for more information about **story id**.*

## Staying Updated With Master

If you have your own fork and want to update your master:

```bash
$ git checkout master
$ git pull -r upstream master
```

Or if you have a branch on the main repository's upstream:

```bash
$ git checkout master
$ git pull -r
```

## Pull Request

Once you are finished with the story, push your branch to the repository before creating a pull request:

```bash
$ git push --set-upstream origin <branch-name>
```

You can now create a pull request using the Github web interface. Please format the PR as follows:

- Pull Request Title: `<story type>/<story id> - <story name>`
  - <story type> is required and one of the following:
    - **Feature** - a feature story
    - **Fix** - a bug story
    - **Chore** - a chore story
  - <story id> is required:
    - For example: #153541038
  - <story name> is required:
    - For example: Expand contributing guide
  - Full Example: `Chore/#153541038 - Expand contributing guide`
- Pull Request Body: no requirements

## <a name="questions"></a> Questions or Problems?

If you're stuck on something, don't be afraid to ask around in Slack! You can also check out our list of [Common Problems](./PROBLEMS.md) to see if your issue is addressed there.
