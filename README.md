# Scratch ESLint config

![CircleCI Badge](https://circleci.com/gh/scratchfoundation/eslint-config-scratch.svg?style=shield)

`eslint-config-scratch` defines the eslint rules used for Scratch JavaScript and TypeScript projects.

## Installation

Install the config as a `devDependency` of your project:

```sh
npm install -DE eslint-config-scratch
```

Previous versions of this package required you to install further dependencies, but that's no longer necessary thanks
to `@rushstack/eslint-patch`. If you're upgrading from a previous version, you can remove the following
`devDependencies` unless you're using them directly:

```sh
npm uninstall -D babel-eslint @babel/eslint-parser eslint-plugin-{import,jest,react,tsdoc}
```

## Usage

The configuration is split up into several base rule sets:

* `scratch`: The base configuration. You probably don't want this one.
  * Enables the `es6` and `commonjs` environments.
  * Sets `ecmaVersion` to 2018.
  * Sets up support for both JavaScript and TypeScript.
* `scratch/browser`: Rules for targeting web browsers.
  * Enables the `browser` environment.
  * Extends `scratch`.
* `scratch/node`: Rules for targeting Node, e.g., server-side code, tests, and scripts.
  * Enables the `node` environment.
  * Extends `scratch`.

These rule sets can be added to any of the above:

* `scratch/react`: Rules for React projects.
  * Enables `jsx` and adds the `react` and `jsx-a11y` plugins.
* `scratch/jest`: Rules for Jest tests.
  * For Jest test files only, enables the `jest` environment.
* `scratch/legacy`: Rules for JS/JSX that was written against older versions of this config.
  * These rules diverge from TypeScript styles, leading to inconsistency within TS-enabled projects.

Usually web projects have a mix of node and web environment files. To lint both
with the appropriate rules, set up a base `.eslintrc.cjs` with the rules for node
and then override the node configuration in `src` (where web code usually lives).
E.g., with a file structure like this:

```text
scratch-project
- .eslintrc.cjs
- package.json
- src
  - .eslintrc.cjs
  - index.js
- test
  - .eslintrc.cjs
  - index.test.js
  - mock-something.jsx
```

Your config files should be set up like:

```javascript
// scratch-project/.eslintrc.cjs
module.exports = {
    root: true,
    extends: ['scratch/node']
};

// scratch-project/src/.eslintrc.cjs
module.exports = {
    root: true,
    extends: ['scratch/browser', 'scratch/react'],
    settings: {
        react: {
            version: 'detect'
        },
    },
};

// scratch-project/test/.eslintrc.cjs
const jestPackage = require('jest/package.json');
module.exports = {
    root: true,
    extends: ['scratch/node', 'scratch/jest', 'scratch/react'],
    env: {
        browser: true // set this if you are testing in a browser or browser-like environment, including jsdom
    },
    settings: {
        jest: {
            version: jestPackage.version
        },
        react: {
            version: 'detect'
        },
    },
};
```

This will set up all the files in the project for linting as Node.js by default,
except for those in `src/`, which will be linted as React files targeting web browsers.

If you're linting React, also make sure your lint script lints `.jsx` files:

```json
"scripts": {
    "lint": "eslint . --ext .js,.jsx"
}
```

## Committing

This project uses [semantic release](https://github.com/semantic-release/semantic-release)
to ensure version bumps follow semver so that projects using the config don't
break unexpectedly.

In order to automatically determine the type of version bump necessary, semantic
release expects commit messages to be formatted following
[conventional-changelog](https://github.com/bcoe/conventional-changelog-standard/blob/master/convention.md).

```text
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

`subject` and `body` are your familiar commit subject and body. `footer` is
where you would include `BREAKING CHANGE` and `ISSUES FIXED` sections if
applicable.

`type` is one of:

* `fix`: A bug fix **Causes a patch release (0.0.x)**
* `feat`: A new feature **Causes a minor release (0.x.0)**
* `docs`: Documentation only changes
* `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* `refactor`: A code change that neither fixes a bug nor adds a feature
* `perf`: A code change that improves performance **May or may not cause a minor release. It's not clear.**
* `test`: Adding missing tests or correcting existing tests
* `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* `chore`: Other changes that don't modify src or test files
* `revert`: Reverts a previous commit

Use the [commitizen CLI](https://github.com/commitizen/cz-cli) to make commits
formatted in this way:

```bash
npm install -g commitizen
npm install
```

Now you're ready to make commits using `git cz`.

## Breaking changes

If you're committing a change that makes the linter more strict, or will
otherwise require changes to existing code, ensure your commit specifies a
breaking change.  In your commit body, prefix the changes with "BREAKING CHANGE: "
This will cause a major version bump so downstream projects must choose to upgrade
the config and will not break the build unexpectedly.
