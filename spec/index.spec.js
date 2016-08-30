/* eslint-env node, jasmine */
var entry = require('../src/index')
var mockFs = require('mock-fs')
var path = require('path')

describe('entry', () => {
  afterEach(() => {
    mockFs.restore()
  })

  it('should find files with glob', () => {
    mockFs({
      'src/main.entry.js': '',
      'src/vendor.entry.js': '',
      'src/foo/bar.js': ''
    })

    var expectedResult = {
      'main': 'src/main.entry.js',
      'vendor': 'src/vendor.entry.js'
    }

    var result = entry('src/*.entry.js')

    expect(result).toEqual(expectedResult)
  })

  it('should find files with glob', () => {
    mockFs({
      'src/main.entry.js': '',
      'src/vendor.entry.js': '',
      'src/foo/bar.js': '',
      'src/baz.js': ''
    })

    var expectedResult = {
      'main': 'src/main.entry.js',
      'vendor': 'src/vendor.entry.js',
      'bar': 'src/foo/bar.js'
    }

    var result = entry('src/*.entry.js', 'src/foo/*.js')

    expect(result).toEqual(expectedResult)
  })

  it('custom entryNameFn', () => {
    mockFs({
      'src/main.entry.js': '',
      'src/vendor.entry.js': '',
      'src/foo/bar.js': ''
    })

    var expectedResult = {
      'main.entry.js': 'src/main.entry.js',
      'vendor.entry.js': 'src/vendor.entry.js'
    }

    var result = entry((globPattern, filePath) => path.basename(filePath), 'src/*.entry.js')

    expect(result).toEqual(expectedResult)
  })

  it('must thorw if first argument is not string or function', () => {
    mockFs({
      'src/main.entry.js': '',
      'src/vendor.entry.js': '',
      'src/foo/bar.js': ''
    })

    expect(() => entry(1)).toThrow()
  })
})
