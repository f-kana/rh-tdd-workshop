TDD (+ CI/CD) Workshop

--

詳細は敢えて書きませんのでOwnerに聞いてください。

* Supports Node.js and Python

# Python

* python 3.12
* poetry

## Python Commands

* `pip install poetry && poetry install` to setup the environments.

# Node.js

* node v20.11.1
* npm 10.8.1

## Node.JS Commands

* `npm install && npm run test` to run tests.
* `NODE_OPTIONS=--experimental-vm-modules npx jest --watch` to run tests on change.

# CI/CD

現時点ではPythonのみ対応。PythonアプリがGitHub Pagesにデプロイされます。
詳細は`.github/workflows/cicd-pipeline.yaml`を参照してください。
<https://f-kana.github.io/rh-tdd-workshop/index.html>
