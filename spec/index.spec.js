/* eslint-env node, jasmine */

var entry = process.env.JASMINE_TEST === 'lib'
  ? require('../lib/index')
  : require('../src/index')

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
      main: 'src/main.entry.js',
      vendor: 'src/vendor.entry.js'
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
      main: 'src/main.entry.js',
      vendor: 'src/vendor.entry.js',
      bar: 'src/foo/bar.js'
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

    var result = entry(filePath => path.basename(filePath), 'src/*.entry.js')

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

  it('should have ability to ignore some files', () => {
    mockFs({
      'src/foo/foo-script.js': '',
      'src/bar/bar-script.js': '',
      'src/baz/baz-script.js': ''
    })

    var expectedResult = {
      'foo-script': 'src/foo/foo-script.js',
      'baz-script': 'src/baz/baz-script.js'
    }

    expect(entry('src/!(bar)/*.js')).toEqual(expectedResult)
  })
})

describe('entry.basePath', () => {
  afterEach(() => {
    mockFs.restore()
  })

  it('should modify entry name (case 1)', () => {
    mockFs({
      'src/main.entry.js': '',
      'src/vendor.entry.js': '',
      'src/admin/vendor.foo.entry.js': '',
      'src/foo/bar.js': ''
    })

    var expectedResult = {
      main: 'src/main.entry.js',
      vendor: 'src/vendor.entry.js',
      'admin/vendor': 'src/admin/vendor.foo.entry.js'
    }

    var result = entry(entry.basePath('src'), 'src/**/*.entry.js')

    expect(result).toEqual(expectedResult)
  })

  it('should modify entry name (case 2)', () => {
    mockFs({
      'src/main.entry.js': '',
      'src/vendor.entry.js': '',
      'src/admin/vendor.entry.js': '',
      'src/foo/bar.js': ''
    })

    var expectedResult = {
      'main.entry': 'src/main.entry.js',
      'vendor.entry': 'src/vendor.entry.js',
      'admin/vendor.entry': 'src/admin/vendor.entry.js'
    }

    var result = entry(entry.basePath('src', '.js'), 'src/**/*.entry.js')

    expect(result).toEqual(expectedResult)
  })

  it('should modify entry name (case 3)', () => {
    mockFs({
      'src/main.entry.js': '',
      'src/vendor.entry.js': '',
      'src/admin/vendor.entry.js': '',
      'src/foo/bar.js': ''
    })

    var expectedResult = {
      'src/main': 'src/main.entry.js',
      'src/vendor': 'src/vendor.entry.js',
      'src/admin/vendor': 'src/admin/vendor.entry.js'
    }

    var result = entry(entry.basePath(), 'src/**/*.entry.js')

    expect(result).toEqual(expectedResult)
  })
})
