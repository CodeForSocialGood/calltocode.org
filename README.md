# Call to Code

[![travis][travis]][travis-url]
[![test][test]][test-url]
[![prod][prod]][prod-url]
![nonprofit][nonprofit]

![logo][logo]

> Platform where college students can get development experience by working with nonprofits.

## Getting Started

:wave: Want to contribute to this project? Follow these steps to get started:

- **:computer: Environment Setup**: First, you're going to want to make sure your development environment is properly set up. Go ahead and read through our [development environment setup](docs/DEVELOPER.md) guide.

- **:pencil2: Contribute**: Once you're set up, you're ready to become a contributor. Make sure you read our [contributing guidelines](docs/CONTRIBUTING.md) before you start working on a story so that you can learn our workflows.

- **:european_castle: Project Architecture**: Joining in on an existing project can feel daunting so we've put together an [architecture guide](docs/ARCHITECTURE.md) to serve as a reference and help reduce the time it takes to familiarize yourself with this project.

- **:raising_hand: Questions & Problems**: If you're stuck on something, don't be afraid to ask around in [Slack](http://join-our-slack.code4socialgood.org/)! You can also check out our list of [common problems](docs/PROBLEMS.md) to see if your issue is addressed there.

## Additional Information

Below is a cheatsheet for the scripts that can be found in `package.json`:

```bash
$ yarn                            # Install dependencies (npm install)
$ yarn db start                   # Restart docker container with mongodb and add seed data (npm run db -- start)
$ yarn db stop                    # Stop docker container with mongodb (npm run db -- stop)
$ yarn start                      # Run app locally on port 3000 and in watch mode on port 3001 via https (npm start)
$ yarn test                       # Run tests (npm test)
$ yarn build                      # Generate distribution (npm run build)
```

*Although yarn is recommended, you may also use npm natively. The corresponding npm commands are in parenthesis above.*

[travis]: https://travis-ci.org/CodeForSocialGood/calltocode.org.svg
[travis-url]: https://travis-ci.org/CodeForSocialGood/calltocode.org

[test]: https://img.shields.io/badge/test-test.calltocode.org-orange.svg
[test-url]: https://test.calltocode.org

[prod]: https://img.shields.io/badge/prod-calltocode.org-orange.svg
[prod-url]: https://calltocode.org

[nonprofit]: https://img.shields.io/badge/project-nonprofit-ff69b4.svg

[logo]: /docs/media/logo.png
