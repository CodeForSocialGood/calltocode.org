# Contributing to Call to Code

This document contains general guidelines for contributing to this project:

- [Prerequisites](#prerequisites)
- [Getting the Project Source](#source)
- [Get the App Running](#running)
- [Pivotal Tracker Workflow](#pivotal)
- [Git Workflow](#git)
- [Questions or Problems?](#questions)

## <a name="prerequisites"></a> Prerequisites

Make sure your development environment is properly setup by following the [development environment setup](./DEVELOPER.md) guide.

## <a name="source"></a> Getting the Project Source

> It is recommended to setup ssh. Please [add a new SSH key to your GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/).

### Cloning the repository into your workspace

```bash
$ cd ~
$ mkdir -p workspace && cd workspace
$ git clone git@github.com:CodeForSocialGood/calltocode.org
$ cd calltocode.org/
```

### Alternatively, you can fork and clone the repository

1. Learn about forking [here](https://help.github.com/articles/fork-a-repo/).
2. Fork the [main calltocode.org repository](https://github.com/CodeForSocialGood/calltocode.org).
3. Clone your fork of the repository and define an upstream remote pointing back to the main calltocode.org repository that you forked in the first place:
```bash
$ cd ~
$ mkdir -p workspace && cd workspace
$ git clone git@github.com:<github username>/calltocode.org
$ cd calltocode.org/
$ git remote add upstream https://github.com/CodeForSocialGood/calltocode.org
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

*Note: ports 3000, 27017, and 28017 will need to be available on your machine to run the app. If you run into a problem here, checkout our [database troubleshooting](./PROBLEMS.md#database).*

### Run tests locally:

```bash
$ yarn test
```

## <a name="pivotal"></a> Pivotal Tracker Workflow

We use [Pivotal Tracker](https://www.pivotaltracker.com) to track our user stories.

- Each story has a **story type**, **story id** and **story name** which will be used in your git workflow
- There are three different **story types**: **feature**, **bug**, and **chore**
- The **story id** looks like `#153540677`
- The **story name** looks like `Encrypt password`

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

For a detailed example (with screenshots) of our git workflow focused on contributing through a **fork**, see our [detailed contributing guidelines](./CONTRIBUTING_DETAILED.md).

### Stay updated with the master branch

If you have a branch on the main repository's upstream:

```bash
$ git checkout master
$ git pull -r
```

If you have your own fork and want to update your master:

```bash
$ git checkout master
$ git pull -r upstream master
$ git push origin master
```

### Branching

When you start new work, always create a new branch off of the master branch, using the corresponding pivotal tracker **story type** and **story id**:

```bash
$ git checkout master
$ git checkout -b <story type>/<story id>
```

*Jump back to the [Pivotal Tracker Workflow](#pivotal) section for more information about **story type** and **story id**.*

### Pairing

Always pair when you start a new branch:

```bash
# If you are working solo
$ git solo <initials>

# If you are pairing with someone
$ git duet <initials-1> <initials-2>
```

*For more details, go to [developer environment setup](./DEVELOPER.md#rest).*

### Commit Message

Reference the pivotal tracker **story id** for the story you are working on:

```bash
$ git commit

# Below, the commit message is between the ---'s
---
chore: add something

[<story id>]
---
```

*Jump back to the [Pivotal Tracker Workflow](#pivotal) section for more information about **story id**.*

### Pull Request

Once you are finished with the story, run the tests to make sure your changes are linted and haven't broken any tests:

```bash
$ yarn test
```

Then, push your branch to the repository before creating a pull request:

```bash
$ git push --set-upstream origin <branch-name>
```

You can now create a pull request using the Github web interface. Please format the PR as follows:

- Pull Request Title: `<story type>/<story id> - <story name>`
  - `<story type>` is required and one of the following:
    - **Feature** - a feature story
    - **Fix** - a bug story
    - **Chore** - a chore story
  - `<story id>` is required:
    - For example: `#153540677`
  - `<story name>` is required:
    - For example: `Encrypt password`
  - Full Example: `Feature/#153540677 - Encrypt password`
- Pull Request Body: no requirements

*Jump back to the [Pivotal Tracker Workflow](#pivotal) section for more information about **story type**, **story id** and **story name**.*

## <a name="questions"></a> Questions or Problems?

If you're stuck on something, don't be afraid to ask around in Slack! You can also check out our list of [Common Problems](./PROBLEMS.md) to see if your issue is addressed there.
