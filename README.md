# calltocode.org

![nonprofit][nonprofit]
[![travis][travis]][travis-url]
[![test][test]][test-url]

![logo][logo]

> Platform where college students can get development experience by working with nonprofits.

## Get Started

```bash
$ yarn                                # install dependencies (npm install)
$ yarn start:dev                      # run in watch mode (npm run start:dev)
$ yarn start                          # run the app through docker just like the test environment (npm start)
$ yarn stop                           # stop and clean the app that was running through docker
$ yarn build                          # generate client distribution (npm run build)
$ yarn test                           # run tests (npm test)
$ yarn db                             # start mongodb and seed db (npm run db)
$ yarn db:reset                       # return db to initial seeded state (npm run db:reset)
```
**Although yarn is recommended, you may use npm natively. The corresponding npm commands are in parenthesis above.*

## Additional Info

- [Developer Environment Setup](docs/setup.md)
- [Database Setup](docs/database.md)
- [Contributing](docs/contributing.md)

[nonprofit]: https://img.shields.io/badge/project-nonprofit-ff69b4.svg

[travis]: https://travis-ci.org/CodeForSocialGood/calltocode.org.svg
[travis-url]: https://travis-ci.org/CodeForSocialGood/calltocode.org

[test]: https://img.shields.io/badge/test-calltocode.herokuapp.com-orange.svg
[test-url]: https://calltocode.herokuapp.com/

[logo]: /docs/media/logo.png
