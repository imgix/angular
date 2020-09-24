![imgix logo](https://assets.imgix.net/sdk-imgix-logo.svg)

# @imgix/ng

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

---

## Installation

1. Download @imgix/ng from npm: `npm install @imgix/ng` or `yarn add @imgix/ng`
2. Add the module to your app module declaration (usually in `src/app/app.module.ts`):

```ts
@NgModule({
  // ...
  imports: [NgImgixModule /*, ... */],
  // ...
})
export class AppModule {}
```

## Usage

Add the `ixSrcset` attribute to an `<img>` element to quickly build out responsive images:

```html
<img src="https://assets.imgix.net/unsplash/motorbike.jpg" ixSrcset />
```

This will generate HTML similar to the following:

```html
<img
  src="https://assets.imgix.net/unsplash/motorbike.jpg"
  sizes="100vw"
  srcset="https://assets.imgix.net/unsplash/motorbike.jpg?w=100&ixlib=ng-0.0.1 100w,
https://assets.imgix.net/unsplash/motorbike.jpg?w=116&ixlib=ng-0.0.1 116w,
https://assets.imgix.net/unsplash/motorbike.jpg?w=134&ixlib=ng-0.0.1 134w,
https://assets.imgix.net/unsplash/motorbike.jpg?w=156&ixlib=ng-0.0.1 156w,
                    ...
https://assets.imgix.net/unsplash/motorbike.jpg?w=7400&ixlib=ng-0.0.1 7400w,
https://assets.imgix.net/unsplash/motorbike.jpg?w=8192&ixlib=ng-0.0.1 8192w"
/>
```

If a `w`, or a `h` and `ar`, are provided as parameters to the element's `src` attribute, the `ixSrcset` directive will instead generate a fixed image `srcset`.

```html
<img src="https://assets.imgix.net/unsplash/motorbike.jpg?w=500" ixSrcset />
```

Will generate the following:

```html
<img
  src="https://assets.imgix.net/unsplash/motorbike.jpg?w=500"
  sizes="100vw"
  srcset="
    https://assets.imgix.net/unsplash/motorbike.jpg?w=500&dpr=1&q=75&ixlib=ng-0.0.1 1x,
    https://assets.imgix.net/unsplash/motorbike.jpg?w=500&dpr=2&q=50&ixlib=ng-0.0.1 2x,
    https://assets.imgix.net/unsplash/motorbike.jpg?w=500&dpr=3&q=35&ixlib=ng-0.0.1 3x,
    https://assets.imgix.net/unsplash/motorbike.jpg?w=500&dpr=4&q=23&ixlib=ng-0.0.1 4x,
    https://assets.imgix.net/unsplash/motorbike.jpg?w=500&dpr=5&q=20&ixlib=ng-0.0.1 5x
  "
/>
```

The `ixSrcset` attribute accepts modifier options, providing users the ability to fine-tune the `srcset` generated. See [imgix-core-js](https://github.com/imgix/imgix-core-js#srcset-generation) documentation for details on all available modifiers.

```html
<img
  src="https://assets.imgix.net/unsplash/motorbike.jpg"
  [ixSrcset]="{ minWidth: 800, maxWidth: 1800 }"
/>
```

Generates a more tailored attribute:

```html
<img
  src="https://assets.imgix.net/unsplash/motorbike.jpg"
  sizes="100vw"
  srcset="
    https://assets.imgix.net/unsplash/motorbike.jpg?w=800&ixlib=ng-0.0.1 800w,
    https://assets.imgix.net/unsplash/motorbike.jpg?w=928&ixlib=ng-0.0.1 928w,
    https://assets.imgix.net/unsplash/motorbike.jpg?w=1076&ixlib=ng-0.0.1 1076w,
    https://assets.imgix.net/unsplash/motorbike.jpg?w=1248&ixlib=ng-0.0.1 1248w,
    https://assets.imgix.net/unsplash/motorbike.jpg?w=1448&ixlib=ng-0.0.1 1448w,
    https://assets.imgix.net/unsplash/motorbike.jpg?w=1680&ixlib=ng-0.0.1 1680w,
    https://assets.imgix.net/unsplash/motorbike.jpg?w=1800&ixlib=ng-0.0.1 1800w
  "
/>
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
