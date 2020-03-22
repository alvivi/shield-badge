import * as input from '../src/input'

describe('getBadgeFormat', () => {
  test('get required params', () => {
    process.env['INPUT_TEXT'] = 'foo'
    process.env['INPUT_LABEL'] = 'bar'
    expect(input.getBadgeFormat()).toEqual({text: ['bar', 'foo']})
  })

  test('get extra params', () => {
    process.env['INPUT_TEXT'] = 'foo'
    process.env['INPUT_LABEL'] = 'bar'
    process.env['INPUT_COLOR'] = 'blue'
    process.env['INPUT_LABEL-COLOR'] = 'green'
    process.env['INPUT_FORMAT'] = 'json'
    process.env['INPUT_TEMPLATE'] = 'flat'
    expect(input.getBadgeFormat()).toEqual({
      color: 'blue',
      labelColor: 'green',
      format: 'json',
      template: 'flat',
      text: ['bar', 'foo']
    })
  })

  test('coverage color is converted to green if text is 98', () => {
    process.env['INPUT_TEXT'] = '98.9999999%'
    process.env['INPUT_LABEL'] = 'bar'
    process.env['INPUT_COLOR'] = 'coverage'
    expect(input.getBadgeFormat().color).toBe('brightgreen')
  })

  test('coverage color is converted to red if text is 50', () => {
    process.env['INPUT_TEXT'] = '50'
    process.env['INPUT_LABEL'] = 'bar'
    process.env['INPUT_COLOR'] = 'coverage'
    expect(input.getBadgeFormat().color).toBe('red')
  })

  test('throws if text is not set', () => {
    process.env['INPUT_LABEL'] = 'foo'
    delete process.env['INPUT_TEXT']
    expect(() => {
      input.getBadgeFormat()
    }).toThrow('Input required and not supplied: text')
  })

  test('throws if label is not set', () => {
    process.env['INPUT_TEXT'] = 'foo'
    delete process.env['INPUT_LABEL']
    expect(() => {
      input.getBadgeFormat()
    }).toThrow('Input required and not supplied: label')
  })

  test('throws if format is invalid', () => {
    process.env['INPUT_TEXT'] = 'foo'
    process.env['INPUT_LABEL'] = 'bar'
    process.env['INPUT_FORMAT'] = 'qux'
    expect(() => {
      input.getBadgeFormat()
    }).toThrow('Format is not "svg" or "json"')
  })
})
