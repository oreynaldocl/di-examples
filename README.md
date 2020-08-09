# Ang10Seed

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Bootstrap files
Install the following library
```sh
ng add @ng-bootstrap/ng-bootstrap
```

Create the following files
```
|- src/
    |- scss/
        |- _variables.scss
```
Add following lines in `src/styles.scss`
```SCSS
// VARIABLES
@import './scss/_variables';

// LIBRARIES
@import '~bootstrap/scss/bootstrap';
@import "./scss/_font-awesome";
```

## FontAwesome files
Install font awesome library. 
```sh
npm install --save @fortawesome/fontawesome-free
```
Add following file `/scss/_font-awesome.scss` with this content:
```SCSS 
// Allows overriding Font Awesome variables https://github.com/FortAwesome/Font-Awesome/blob/master/web-fonts-with-css/scss/_variables.scss

// For loadiong the Web Fonts based on an absolute route instead of a relative route
$fa-font-path: "~@fortawesome/fontawesome-free/webfonts";

// Importing main Font Awesome scss library
@import "~@fortawesome/fontawesome-free/scss/fontawesome.scss";

// Importing Font Awesome Web Fonts
@import "~@fortawesome/fontawesome-free/scss/solid.scss";
@import "~@fortawesome/fontawesome-free/scss/regular.scss";
@import "~@fortawesome/fontawesome-free/scss/brands.scss";
```
Add following lines in `src/styles.scss`
```SCSS
// LIBRARIES
@import "~bootstrap/scss/bootstrap.scss";
@import "./scss/_font-awesome";
```
