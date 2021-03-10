# AboutYou Cloud StoreFront - Depot

[![pipeline status](https://gitlab.com/aboutyou/cloud-agency/shop-application/ay-cloud-shop-application-depot/badges/develop/pipeline.svg)](https://gitlab.com/aboutyou/cloud-agency/shop-application/ay-cloud-shop-application-depot/-/commits/develop)
[![coverage report](https://gitlab.com/aboutyou/cloud-agency/shop-application/ay-cloud-shop-application-depot/badges/develop/coverage.svg)](https://gitlab.com/aboutyou/cloud-agency/shop-application/ay-cloud-shop-application-depot/-/commits/develop)

## Development

install dependencies with `yarn`
Run `yarn start` to start dev server and app in parallel
Run `yarn start:tdd` to begin TDD workflow that starts tests and server and app in parallel

### start Express server

Run `yarn server:serve` runs the middleware server.
You can use this task to connect debugger.
The server is running on `http://localhost:80/api`

### Start frontend

Run `ng serve` for a dev server.
Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `yarn server:build` to build the project with ssr mode. The build artifacts will be stored in the `dist/server` directory. (node dist/server/server.js)

## Running unit tests

Unit tests are using [Karma](https://karma-runner.github.io) and Jasmine

Run `yarn test:local` for starting unit tests in watch mode with chrome browser, for local development.

Run `yarn test:ci` to execute the unit tests once for the continuous integration CI system. Coverage report enabled.

Run `ng test` to execute the unit tests.

Run `ng test --watch` to execute the unit tests in watch mode for TDD.

Run `ng test --browsers Chrome` to execute the unit tests in Chrome.

Run `ng test --codeCoverage` to execute the unit tests with coverage.

## Reports:

### Coverage

- [Coverage report](https://aboutyou.gitlab.io/cloud-agency/shop-application/ay-cloud-shop-application-depot/storefront)

## Further help

See [StoreFront Frontend Confluence](https://aboutyou.atlassian.net/wiki/spaces/AYC/pages/4457728/StoreFront)
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md)
