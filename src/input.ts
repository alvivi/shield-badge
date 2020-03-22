import * as path from 'path'
import * as core from '@actions/core'
import * as shields from 'gh-badges'

// AWS

export function setupAwsCredentials(): void {
  const accessKeyId = core.getInput('aws-access-key-id', {required: true})
  core.exportVariable('AWS_ACCESS_KEY_ID', accessKeyId)
  core.setSecret(accessKeyId)

  const secretAccessKey = core.getInput('aws-secret-access-key', {
    required: true
  })
  core.exportVariable('AWS_SECRET_ACCESS_KEY', secretAccessKey)
  core.setSecret(secretAccessKey)
}

export function getAwsRegion(): string {
  return core.getInput('aws-region', {required: true})
}

export function getAwsBucket(): string {
  return core.getInput('aws-bucket', {required: true})
}

export function getAwsFilepath(): string {
  return enforceExt(core.getInput('aws-filepath', {required: true}), '.svg')
}

function enforceExt(filepath: string, ext: string): string {
  if (path.extname(filepath) === ext) {
    return filepath
  }
  return `${filepath}${ext}`
}

// Badge

export function getBadgeFormat(): shields.BadgeFormat {
  const label = core.getInput('label', {required: true})
  const text = core.getInput('text', {required: true})
  const color = core.getInput('color')
  const format = getFormat()
  const labelColor = core.getInput('label-color')
  const template = core.getInput('template')

  return convertCoverageColor({
    text: [label, text],
    ...(color && {color}),
    ...(format && {format}),
    ...(labelColor && {labelColor}),
    ...(template && {template})
  })
}

function convertCoverageColor(
  format: shields.BadgeFormat
): shields.BadgeFormat {
  if (format.color === 'coverage') {
    const number = parseFloat(format.text[1])
    if (isNaN(number)) {
      format.color = 'lightgrey'
    } else if (number > 95) {
      format.color = 'brightgreen'
    } else if (number > 90) {
      format.color = 'green'
    } else if (number > 80) {
      format.color = 'yellowgreen'
    } else {
      format.color = 'red'
    }
  }
  return format
}

function getFormat(): shields.Format | undefined {
  const format = core.getInput('format')
  if (format === '') {
    return undefined
  }
  if (isValidFormat(format)) {
    return format
  }
  throw new Error('Format is not "svg" or "json"')
}

function isValidFormat(string: string): string is shields.Format {
  return string === 'svg' || string === 'json'
}
