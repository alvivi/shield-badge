# Shield Badge

[![Build Status](https://github.com/alvivi/shield-badge/workflows/build-test/badge.svg)](https://github.com/alvivi/shield-badge/actions)
[![Shield Badge](https://alvivi-badges.s3-us-west-2.amazonaws.com/alvivi/shield-badge.svg)](https://github.com/alvivi/shield-badge/actions)

This action creates a [badge](https://shields.io/)  and upload it to a
[AWS S3](https://aws.amazon.com/s3/) bucket.

## Usage

### Pre-requisites

Create a workflow `.yml` file in your repositories `.github/workflows`
directory. An [example workflow](#example-workflow) is available below. For more
information, reference the GitHub Help Documentation for
[Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs

Badge parameters:

* `text` - the text in the badge on the right (*required*).
* `label` - the text in the badge on the left (*required*).
* `color` - the [color](https://github.com/badges/shields/tree/master/gh-badges#colors) behind the text.
* `label-color` - the [color](https://github.com/badges/shields/tree/master/gh-badges#colors) behind the label.
* `format` - the format of the output file (`svg` or `json`).
* `template` - the [template](https://github.com/badges/shields/tree/master/gh-badges/templates) used to create the badge.

AWS parameters:

* `aws-access-key-id` - Amazon Access Key Id.
* `aws-secret-access-key` - Amazon Secret Access Key.
* `aws-region` - The region where the bucket is located.
* `aws-bucket` - The name of the region.
* `aws-filepath` - The file path of the file.

### Example workflow

```yaml
name: Creating Badges

on: push

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: alvivi/
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: my.region
        aws-bucket: my-s3-bucket
        aws-filepath: ${{ github.repository }}
        label: Custom Badge
        text: It's Working!
```

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)
















# Create a JavaScript Action using TypeScript

Use this template to bootstrap the creation of a JavaScript action.:rocket:

This template includes compilication support, tests, a validation workflow, publishing, and versioning guidance.

If you are new, there's also a simpler introduction.  See the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)

## Create an action from this template

Click the `Use this Template` and provide the new repo details for your action

## Code in Master

Install the dependencies
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run pack
```

Run the tests :heavy_check_mark:
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Change action.yml

The action.yml contains defines the inputs and output for your action.

Update the action.yml with your name, description, inputs and outputs for your action.

See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

## Change the Code

Most toolkit and CI/CD operations involve async operations so the action is run in an async function.

```javascript
import * as core from '@actions/core';
...

async function run() {
  try {
      ...
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder.

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run pack
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml)])

```yaml
uses: ./
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
