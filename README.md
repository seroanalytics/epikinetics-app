**This was an exploratory project that we will not be taking forward as would be of limited use. This repo has been archived**
# epikinetics-app [![Project Status: Concept – Minimal or no implementation has been done yet, or the repository is only intended to be a limited example, demo, or proof-of-concept.](https://www.repostatus.org/badges/latest/concept.svg)](https://www.repostatus.org/#concept)

[![⬣ Lint](https://github.com/seroanalytics/epikinetics-app/actions/workflows/lint.yml/badge.svg)](https://github.com/seroanalytics/epikinetics-app/actions/workflows/lint.yml)
[![🔨 Build](https://github.com/seroanalytics/epikinetics-app/actions/workflows/build.yml/badge.svg)](https://github.com/seroanalytics/epikinetics-app/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/seroanalytics/epikinetics-app/graph/badge.svg?token=FH6QSJGNVR)](https://codecov.io/gh/seroanalytics/epikinetics-app)

Browser application for exploring [epikinetics](https://seroanalytics.github.io/epikinetics/) model results. 
Based on the `remix` Javascript/Typescript framework.

## Requirements
* npm

## Developing
* Clone this repo
* Run `npm install` from this directory to install dependencies
* Start the dev server with `npm run dev`. You should now see the app served at http://localhost:3000.

## Deploying
`server.ts` will start an Express app that run the Remix app on port 3000 and serves Prometheus metrics on port 3001

* run `npm build` followed by `npm start` to test the production build locally
* run `./scripts/build` to build a Docker image, tagged with the branch name and commit hash
* run `./scripts/push` to push the image to Dockerhub
* run `docker run -d -p 3000:3000 -p 3001:3001 seroanalytics/epikinetics-app:<branch_name>`

The Docker `build` script is run as a GitHub action, and both `build` and `push` are run via GH action on merge to main.

## Jest
We use Jest for unit testing. Config lives in `jest.config.mjs` and tests are executed via `npm test`. 
These are also executed via GH actions and code coverage sent to codecov.io.

## Linting
We use ESLint for linting. Config lives in `eslint.config.mjs` and job is run via `npm run lint`.
This is also run via GH actions.

## Electron app [![Project Status: Concept – Minimal or no implementation has been done yet, or the repository is only intended to be a limited example, demo, or proof-of-concept.](https://www.repostatus.org/badges/latest/concept.svg)](https://www.repostatus.org/#concept)
We may or may not want to ship this as a desktop app at some point.
To start as an Electron app instead of a browser app, run `npm run electron`.
