# MVP Card Game "Memo"

This repository implements the MVP card game "Memo" according to [spec](./docs/mvp-spec.md)

The project is deprecated on gh pages:
https://skypro-web-developer.github.io/react-memo/

## Development

The project is implemented based on the [Create React App](https://github.com/facebook/create-react-app) template.

### How to develop

- Install dependencies with `npm install` command
- Start dev server with `npm start`
- Open the address in a browser

### Stack and tools

The code uses css modules for styles.

The eslint and prettier are configured. Code correctness is checked automatically before each commit using lefthook (analogue of husky). You can't commit code that doesn't pass eslint check.

### Available commands

#### `npm start`

Starts the application in development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in a browser.

#### `npm run build`

Builds an optimised and minified production build of the application into the `build` folder.
Once built, the application is ready to be deployed.

#### `npm run deploy`

Deploys the application to github pages. Essentially runs the build and commits the build to the gh-pages branch.

(!) github pages must be enabled in the repository settings and configured for the gh-pages branch

#### `npm run lint`

Runs eslint code verification, the same command is run before each commit.
If you can't commit, try running this command and fix all errors and warnings.
