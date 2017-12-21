# Common Problems

This document contains potential solutions to common problems and errors. If you do not find the solution here, please feel free to ask around on slack! A table of contents is provided for ease of use:

- [Database Troubleshooting](#database)
- [Address/port already in use](#addressinuse)
- [Errors](#errors)

Anybody is free to add any problems & solutions to this file! Just open a PR following our [git workflow](./CONTRIBUTING.md#git).

## <a name="database"></a> Database Troubleshooting

General troubleshooting steps:

- Ensure [docker](https://docs.docker.com/engine/installation/#supported-platforms) is installed: `docker --version`

- Ensure direnv is set up properly with `direnv allow`. See the [development environment setup](DEVELOPER.md) if you have not done so already. If nothing else works, at the very least, run `source .env`.

- Start and seed the MongoDB database: `yarn db`

- Make sure the database is running by running `yarn start:dev` (should see 'Database Connected' in your terminal)

- Make sure database is seeded by either checking the data in Robo 3T if you downloaded that (see [development environment setup](DEVELOPER.md)) or by trying to log in with Kevin's credentials (check them in the `Personas` story in the Icebox on Pivotal Tracker)

The MongoDB is ran in a docker container. You will need to have ports 27017 and 28017 open. See the [address/port already in use](#addressinuse) section to see how to open these. After the database is created, seed data is automatically imported so that testing can be done.

## <a name="addressinuse"></a> Address/port already in use

**Problem**: `Error: address already in use`

**Solution**: `lsof -ti tcp:3000,27017,28017 | xargs kill -9 --no-run-if-empty`

## <a name="errors"></a> Errors

**Problem (1)**: I pulled the latest changes from master and I am now getting an error.

**Problem (2)**: I installed a new dependency with `npm install` and I am now getting an error.

**Problem (3)**:
```bash
$ yarn start:dev
yarn run v1.3.2
$ NODE_ENV=dev npm-run-all --parallel client:watch server:watch
/bin/sh: npm-run-all: command not found
error Command failed with exit code 127.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

**Solution**: `yarn`

---

**Problem**: I am not seeing anything once I view the app at `localhost:3000`.

**Solution**: `yarn db`
