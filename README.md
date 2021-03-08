# w2m-heroes

## Stack
* Angular 11
* Json-Server (as FAKE API)
* Docker
* Angular Material (as CSS framework)
* Husky (as hooks pre-commit & pre-push)
* TSLint
* Jest (for unit tests)

## How to run project in local (with Docker)
1. Go to `w2m-frontend` and run `docker-compose up --build -d` to launch FAKE API in `http://localhost:3000` and Angular in `http://localhost:4200`

## How to run project in local (without Docker)
1. Go to `w2m-frontend` and run `npm run server` to launch FAKE API in `http://localhost:3000`
2. Go to `w2m-frontend` and run `ng serve -o` to launch frontend application in `http://localhost:4200`

:warning: NOTE: It is advisable run `npm install` in `w2m-frontend` folder to install all dependencies at each project.

## How to launch unit tests in frontend project
* You can go to `w2m-frontend` and run `npm run test` to launch frontend unit tests.


## Commit naming convention
A commit must be named following this convention:

* Start with W2M-[ISSUE_NUMBER]:   [DESCRIPTION]
* For example: `W2M-9: Show alert when login is wrong`

## Branch naming convention

A branch must be named following this convention:

* Start with W2M-[ISSUE_NUMBER]_[SHORT_DESCRIPTION]
* For example: `W2M-9_login_page`

## NOTES
* All this project has been divide in specific issues. Each issue is a BRANCH. Each branch is a PULL REQUEST to development branch. If all is correct, appear a new pull request from development to master branch.

* When you realize a PATCH, POST, DELETE actions, the application will have a hot reloading because db.json file will be changed (and Angular has Live/Hot reloading with each change in a file).