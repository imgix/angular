## Installation

NB: Each step has an accompanied one-liner. If these commands are pasted one after the other, they will set-up the project correctly.

- Ensure your development environment includes all [prerequisites](https://angular.io/guide/setup-local) to build and run Angular applications.
- Clone this repo  
  One-liner: `$ git clone git@github.com:imgix/angular.git`
- Build the `@imgix/angular` library using `ng build imgix-angular`. Note that the newly bundled files can be found under `project/imgix-angular/dist`.  
  One-liner: `$ cd angular && npm install && ng build imgix-angular`
  One-liner (w/o global cli): `$ cd angular && npm install && npx -p @angular/cli ng build imgix-angular`
- Navigate to `projects/imgix-angular/dist/` and run `npm link`.  
  One-liner: `$ cd projects/imgix-angular/dist && npm link`
- In a separate directory, create a new Angular application using `ng new example-app`. This is where `imgix-angular` can be tested.
  One-liner: `$ cd ../../../ && ng new example-app`
- In this example app, run `npm link @imgix/angular`. This allows `@imgix/angular` to be used within the application.  
  One-liner: `$ cd example-app && npm link @imgix/angular`
- Modify the application's `app.module.ts` to import `@imgix/angular`:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgImgixModule } from '@imgix/angular';

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

Run `ng build` to build the project. The build artifacts will be stored in the `projects/imgix-angular/dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
