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
