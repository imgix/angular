![imgix logo](https://assets.imgix.net/sdk-imgix-logo.svg)

# ng-imgix

## Installation

- Ensure your development environment includes all [prerequisites](https://angular.io/guide/setup-local) to build and run Angular applications.
- Build the `ng-imgix` library using `ng build ng-imgix`. Note that the newly bundled files can be found under `dist/ng-imgix`.
- In a separate directory, create a new Angular application using `ng generate example-app`. This is where `ng-imgix` can be tested.
- From the root of the `example-app/`, install all dependencies with `npm install`.
- Navigate to `dist/ng-imgix` within this project and run `npm link`.
- Back in `example-app/`, run `npm link ng-imgix`. This allows `ng-imgix` to be used within the application.
- Modify the application's `app.module.ts` to import `ng-imgix`:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgImgixModule, IxSrcsetDirective } from 'ng-imgix';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgImgixModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Usage

Add the `ixSrcset` attribute to an `<img>` element to quickly build out responsive images:

```html
<img src='https://assets.imgix.net/unsplash/motorbike.jpg' ixSrcset >
```

This will generate HTML similar to the following:

```html
<img src="https://assets.imgix.net/unsplash/motorbike.jpg" sizes="100vw" srcset="https://assets.imgix.net/unsplash/motorbike.jpg?w=100&ixlib=ng-0.0.1 100w,
https://assets.imgix.net/unsplash/motorbike.jpg?w=116&ixlib=ng-0.0.1 116w,
https://assets.imgix.net/unsplash/motorbike.jpg?w=134&ixlib=ng-0.0.1 134w,
https://assets.imgix.net/unsplash/motorbike.jpg?w=156&ixlib=ng-0.0.1 156w,
                    ...
https://assets.imgix.net/unsplash/motorbike.jpg?w=7400&ixlib=ng-0.0.1 7400w,
https://assets.imgix.net/unsplash/motorbike.jpg?w=8192&ixlib=ng-0.0.1 8192w" >
```

If a `w`, or a `h` and `ar`, are provided as parameters to the element's `src` attribute, the `ixSrcset` directive will instead generate a fixed image `srcset`.

```html
<img src='https://assets.imgix.net/unsplash/motorbike.jpg?w=500' ixSrcset >
```

Will generate the following:

```html
<img src="https://assets.imgix.net/unsplash/motorbike.jpg?w=500" sizes="100vw" srcset="https://assets.imgix.net/unsplash/motorbike.jpg?w=500&dpr=1&q=75&ixlib=ng-0.0.1 1x,
https://assets.imgix.net/unsplash/motorbike.jpg?w=500&dpr=2&q=50&ixlib=ng-0.0.1 2x,
https://assets.imgix.net/unsplash/motorbike.jpg?w=500&dpr=3&q=35&ixlib=ng-0.0.1 3x,
https://assets.imgix.net/unsplash/motorbike.jpg?w=500&dpr=4&q=23&ixlib=ng-0.0.1 4x,
https://assets.imgix.net/unsplash/motorbike.jpg?w=500&dpr=5&q=20&ixlib=ng-0.0.1 5x" >
```

The `ixSrcset` attribute accepts modifier options, providing users the ability to fine-tune the `srcset` generated. See [imgix-core-js](https://github.com/imgix/imgix-core-js#srcset-generation) documentation for details on all available modifiers.

```html
<img src='https://assets.imgix.net/unsplash/motorbike.jpg' [ixSrcset]="{ minWidth: 800, maxWidth: 1800 }" >
```

Generates a more tailored attribute:

```html
<img src="https://assets.imgix.net/unsplash/motorbike.jpg" sizes="100vw" srcset="https://assets.imgix.net/unsplash/motorbike.jpg?w=800&amp;ixlib=ng-0.0.1 800w,
https://assets.imgix.net/unsplash/motorbike.jpg?w=928&amp;ixlib=ng-0.0.1 928w,
https://assets.imgix.net/unsplash/motorbike.jpg?w=1076&amp;ixlib=ng-0.0.1 1076w,
https://assets.imgix.net/unsplash/motorbike.jpg?w=1248&amp;ixlib=ng-0.0.1 1248w,
https://assets.imgix.net/unsplash/motorbike.jpg?w=1448&amp;ixlib=ng-0.0.1 1448w,
https://assets.imgix.net/unsplash/motorbike.jpg?w=1680&amp;ixlib=ng-0.0.1 1680w,
https://assets.imgix.net/unsplash/motorbike.jpg?w=1800&amp;ixlib=ng-0.0.1 1800w">
```

---

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
