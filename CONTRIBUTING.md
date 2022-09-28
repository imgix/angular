# Contributing Guide

Thank you for investing your time in contributing to this project! Please take a moment to review this document in order to streamline the contribution process for you and any reviewers involved.

Read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

## New contributor guide

To get an overview of the project, read the [README](README.md). Here are some resources to help you get started with open source contributions:

- [Finding ways to contribute to open source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
- [Set up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)

## Opening a Pull Request

_To help the project's maintainers and community quickly understand the nature of your pull request, please be sure to do the following:_

1. Include a descriptive Pull Request title.
2. Provide a detailed description that explains the nature of the change(s) introduced. This is not only helpful for your reviewer, but also for future users who may need to revisit your Pull Request for context purposes. Screenshots/video captures are helpful here!
3. Make incremental, modular changes, with a clean commit history. This helps reviewers understand your contribution more easily and maintain project quality.

### Checklist

Check to see that you have completed each of the following before requesting a review of your Pull Request:

- [ ] All existing unit tests are still passing (if applicable)
- [ ] Add new passing unit tests to cover the code introduced by your PR
- [ ] Update the README
- [ ] Update or add any necessary API documentation
- [ ] All commits in the branch adhere to the [conventional commit](#conventional-commit-spec) format: e.g. `fix: bug #issue-number`

## Conventional Commit Spec

Commits should be in the format `<type>(<scope>): <description>`. This allows our team to leverage tooling for automatic releases and changelog generation. An example of a commit in this format might be: `docs(readme): fix typo in documentation`

`type` can be any of the follow:

- `feat`: a feature, or breaking change
- `fix`: a bug-fix
- `test`: Adding missing tests or correcting existing tests
- `docs`: documentation only changes (readme, changelog, contributing guide)
- `refactor`: a code change that neither fixes a bug nor adds a feature
- `chore`: reoccurring tasks for project maintainability (example scopes: release, deps)
- `config`: changes to tooling configurations used in the project
- `build`: changes that affect the build system or external dependencies (example scopes: npm, bundler, gradle)
- `ci`: changes to CI configuration files and scripts (example scopes: travis)
- `perf`: a code change that improves performance
- `style`: changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

`scope` is optional, and can be anything.
`description` should be a short description of the change, written in the imperative-mood.

### Example workflow

Follow this process if you'd like your work considered for inclusion in the
project:

1. [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone git@github.com:<YOUR_USERNAME>/angular.git
   # Navigate to the newly cloned directory
   cd angular
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/imgix/angular
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout <dev-branch>
   git pull upstream <dev-branch>
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks. Use Git's
   [interactive rebase](https://help.github.com/articles/interactive-rebase)
   feature to tidy up your commits before making them public.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream <dev-branch>
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
   with a clear title and description.

**IMPORTANT**: By submitting a patch, you agree to allow the project owner to
license your work under the same license as that used by the project.

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
import { ImgixAngularModule } from '@imgix/angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ImgixAngularModule],
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
