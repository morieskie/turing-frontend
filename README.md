# Tshirtsop App

This project was created as client for the Rest API on [Tshirtsop API](https://t-shirtshop-api.herokuapp.com/) which is hosted on Heroku for preview purposes. The project solution follows strictly the
Swagger documentation provided on [Turing ECommerce API](https://backendapi.turing.com/docs) version 1.2.13, which is a stateless API which follow REST principles but not entirely.

## API details

Base API uri: `https://t-shirtshop-api.herokuapp.com/api`

## Project details:

This project was built using [Angular](https://angular.io/) version 8.1.3 which is my personal favourite since it allows working with SOA, Design Patterns and follows the GoF principles in JavaScript

# Folders structure or Module organization

This project follow the angular standard folder structure and conventions. MVVM/ MVP has been highly prioritise the encourage separation of concern, scalability, modularity and re-usabilily

The module is structured as follows:

```
.
├── cart.component.ts
├── cart-item.component.ts
├── cart.module.ts
├── cart-routing.module.ts
├── interface
│   ├── cart-item-provider.interface.ts
│   ├── cart-provider.interface.ts
│   └── RepositoryInterface.ts
├── model
│   ├── cart-item.ts
│   └── cart.ts
├── provider
│   ├── cart-api.provider.ts
│   ├── cart-item-api.provider.ts
│   ├── cart-item-local-storage.provider.ts
│   └── cart-local-storage.provider.ts
├── repository
│   ├── cart-api.repository.ts
│   ├── cart-item.repository.ts
│   └── cart.repository.ts
├── service
│   ├── cart-item.service.ts
│   └── cart.service.ts
└── template
    ├── cart.component.css
    ├── cart.component.html
    └── cart-item.component.html

```

## Project preview link

The project can be accessed on [here](https://t-shirtshop.herokuapp.com/login)

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
