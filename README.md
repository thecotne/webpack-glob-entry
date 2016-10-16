# webpack-glob-entry

[![Package Quality](http://npm.packagequality.com/badge/webpack-glob-entry.png)](http://packagequality.com/#?package=webpack-glob-entry)
[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![Travis Build Status](https://img.shields.io/travis/thecotne/webpack-glob-entry.svg?style=flat-square&maxAge=300)](https://travis-ci.org/thecotne/webpack-glob-entry)
[![Coveralls](https://img.shields.io/coveralls/thecotne/webpack-glob-entry.svg?style=flat-square&maxAge=300)](https://coveralls.io/github/thecotne/webpack-glob-entry)
[![NPM Dependencies](https://img.shields.io/david/thecotne/webpack-glob-entry.svg?style=flat-square&maxAge=300)](https://david-dm.org/thecotne/webpack-glob-entry)
[![NPM DevDependencies](https://img.shields.io/david/dev/thecotne/webpack-glob-entry.svg?style=flat-square&maxAge=300)](https://david-dm.org/thecotne/webpack-glob-entry?type=dev)
[![NPM Downloads](https://img.shields.io/npm/dm/webpack-glob-entry.svg?style=flat-square&maxAge=300)](https://www.npmjs.com/package/webpack-glob-entry)
[![NPM Package Version](https://img.shields.io/npm/v/webpack-glob-entry.svg?style=flat-square&maxAge=300)](https://www.npmjs.com/package/webpack-glob-entry)

simple function to transform glob patterns in webpack entry object

## install

```bash
npm install webpack-glob-entry --save-dev
```

## usage

simply call `entry` function with glob pattern

```javascript
var entry = require('webpack-glob-entry')

module.exports = {
  entry: entry('js/*.entry.js'),
  output: {
    path: 'public/build',
    publicPath: 'build',
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  }
}
```

you can also pass multiple glob patterns like this

```javascript
  entry: entry('foo/*.js', 'bar/*.js', 'baz/*.js'),
```

you can also pass `entryName` function as first argument like this

```javascript
var path = require('path')

module.exports = {
  entry: entry(filePath => path.basename(filePath), 'bar/*.js', 'baz/*.js')
}
```
