import * as core from '@actions/core'
import * as shields from 'gh-badges'
import * as AWS from 'aws-sdk'
import * as input from './input'

async function run(): Promise<void> {
  try {
    const badgeFormat = input.getBadgeFormat()
    const badgeFactory = new shields.BadgeFactory()
    const badge = badgeFactory.create(badgeFormat)
    core.debug(`Badge format options ${JSON.stringify(badgeFormat)}`)

    input.setupAwsCredentials()
    const region = input.getAwsRegion()
    AWS.config.update({region})
    core.info(`AWS region set to "${region}"`)

    const bucket = input.getAwsBucket()
    const filepath = input.getAwsFilepath()
    core.info(`Uploading file "${filepath}" to "${bucket}" bucket`)

    const s3 = new AWS.S3({apiVersion: '2006-03-01'})
    await s3
      .upload({
        ACL: 'public-read',
        ContentType: 'image/svg+xml',
        CacheControl: 'no-cache',
        Body: badge,
        Bucket: bucket,
        Key: filepath
      })
      .promise()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
