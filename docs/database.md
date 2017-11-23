# Database

1. Install [docker](https://docs.docker.com/engine/installation/#supported-platforms).
1. Have direnv set up properly with `direnv allow`. See the [Setup](setup.md) if you have not done so already. At the very least, run `source .env`.
1. Start and seed the MongoDB database.
    ```bash
    $ yarn db
    ```
1. Make sure the database is running by running yarn start:dev (should see 'Database Connected')
1. Make sure database is seeded by trying to log in with Kevin's details (check them in /db/seedData/users.json)
