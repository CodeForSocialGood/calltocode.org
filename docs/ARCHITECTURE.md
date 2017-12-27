# Architecture Guide

Joining in on an existing project such as this can feel daunting due to the learning curve and the sheer amount of code that there is. This document serves as a guide to get familiar with this project's architecture & codebase:

- [Technology Stack](#stack)
- [Project Structure](#structure)
- [Front-end Guides](#front-end)
- [Back-end Guides](#back-end)
- [Database Guides](#database)

You may not need to dive into the guides right away, but these are here as a reference for when you face challenges during coding.

## <a name="stack"></a> Technology Stack

Call to Code is built with the following technologies:

- **Front-end**: React, HTML, SCSS
- **Back-end**: Node, Express
- **Database**: MongoDB w/ Mongoose

## <a name="structure"></a> Project Structure

Here is a breakdown of the project's structure:

- `client/` -
  - `src` -
- `db/` - contains database scripts and seed data
- `deploy/` - contains deployment scripts
- `docs/` - contains all of this project's documents
- `server/` -
  - `config/` -
  - `database/` -
  - `middleware/` -
  - `routes/` -
  - `test/` -
  - `app.js`
  - `index.js`
  - `logger.js`

## <a name="front-end"></a> Front-end Guides

The front-end consists of everything in the `client` folder.

*These need links:*
- Getting started with React
- Getting started with Redux
- React with Redux
- SCSS documentation
- SCSS guide

## <a name="back-end"></a> Back-end Guides

The back-end consists of everything in the `server` folder.

*These need links:*
- Getting started with Node w/ Express
- Node/Express/Mongoose guide
- REST API guidelines

## <a name="database"></a> Database Guides

This project uses MongoDB. On top of Mongo we use Mongoose, allowing us to define schemas/models for data. The relevant files are in the `server/database/` folder. Making any changes to the database typically means making changes to the schemas located in `server/database/models/`.

- [MongoDB documentation](https://docs.mongodb.com/)
- [Mongoose documentation](http://mongoosejs.com/docs/guide.html)
