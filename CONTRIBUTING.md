## Installation

NB: Each step has an accompanied one-liner. If these commands are pasted one after the other, they will set-up the project correctly.

- Ensure your development environment includes all [prerequisites](https://angular.io/guide/setup-local) to build and run Angular applications.
- Clone this repo  
  One-liner: `$ git clone git@github.com:imgix/ng-imgix.git`
- Build the `ng-imgix` library using `ng build ng-imgix`. Note that the newly bundled files can be found under `projects/ng-imgix/dist`.  
  One-liner: `$ cd ng-imgix && npm install && ng build ng-imgix`
  One-liner (w/o global cli): `$ cd ng-imgix && npm install && npx -p @angular/cli ng build ng-imgix`
- Navigate to `projects/ng-imgix/dist/` and run `npm link`.  
  One-liner: `$ cd projects/ng-imgix/dist && npm link`
- In a separate directory, create a new Angular application using `ng new example-app`. This is where `ng-imgix` can be tested.
  One-liner: `$ cd ../../../ && ng new example-app`
- In this example app, run `npm link ng-imgix`. This allows `ng-imgix` to be used within the application.  
  One-liner: `$ cd example-app && npm link ng-imgix`
- Modify the application's `app.module.ts` to import `ng-imgix`:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgImgixModule } from 'ng-imgix';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgImgixModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

- Modify `example-app/tsconfig.app.json` to disable Angular Ivy. The whole file should look like this

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": ["src/main.ts", "src/polyfills.ts"],
  "include": ["src/**/*.d.ts"],
  "angularCompilerOptions": {
    "enableIvy": false
  }
}
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `projects/ng-imgix/dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
