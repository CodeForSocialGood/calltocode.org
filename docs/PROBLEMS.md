# Common Problems

This document contains potential solutions to common problems and errors. If you do not find the solution here, please feel free to ask around on slack! A table of contents is provided for ease of use:

- [Errors](#errors)
- [Database Troubleshooting](#database)

## <a name="errors"></a> Errors

**Problem**: `Error: address already in use`

**Solution**:
```bash
lsof -ti tcp:3000,27017,28017 | xargs kill -9 --no-run-if-empty
```

---

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

**Solution**:
```bash
$ yarn
```

---

**Problem**: I am not seeing anything once I view the app at `localhost:3000`.

**Solution**:
```bash
$ yarn db
```

## <a name="database"></a> Database Troubleshooting

The MongoDB is ran in a docker container. You will need to have ports 27017 and 28017 open. After the database is created, seed data is automatically imported so that testing can be done.

1. Ensure [docker](https://docs.docker.com/engine/installation/#supported-platforms) is installed:
    ```bash
    $ docker --version
    ```
1. Have direnv set up properly with `direnv allow`. See the [Development Environment Setup](DEVELOPER.md) if you have not done so already. At the very least, run `source .env`.
1. Start and seed the MongoDB database:
    ```bash
    $ yarn db
    ```
1. Make sure the database is running by running yarn start:dev (should see 'Database Connected')
1. Make sure database is seeded by either checking the data in Robo 3T if you downloaded that (see [Development Environment Setup](DEVELOPER.md)) or by trying to log in with Kevin's credentials (check them in the `Personas` story in the Icebox on Pivotal Tracker)
