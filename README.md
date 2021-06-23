# Ang10Seed

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

# Patterns

## Facade
Used facade implementation for loosely coupled.
Also Dependency Inversion Principle implemented using just abstract classes.
* [DateFacadeUtils](projects/my-lib/src/lib/services/date-facade.utils.ts)
* Implementation: [CustomI18nService](src/app/core/services/i18n/custom-i18n.service.ts)
* [I18nFacadeService](projects/my-lib/src/lib/services/date-facade.utils.ts)
* Implementation: [DateUtils](src/app/core/services/date.utils.ts)

## DI Framework
Used DI Framework for adding dependencies. Used different ways to start dependencies
[CoreModule](src/app/core/core.module.ts)
* [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection)

## Flux Architectural Pattern
Implementation of [Flux Pattern](https://facebook.github.io/flux/docs/in-depth-overview/) for saving todo elements.
The specific implementation is ngrx.
* [Ngrx store](https://ngrx.io/guide/store)

## Start application

### Build library
First is required to build library with following command
`npx ng build my-lib`

### Start application
Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

If you want to test in different machine in same network
`npm run start -- --host 0.0.0.0`

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

# MY-LIB Library
Following steps in angular guide
https://angular.io/guide/creating-libraries

```
ng generate library my-lib
ng build my-lib
ng test my-lib
ng lint my-lib
```
