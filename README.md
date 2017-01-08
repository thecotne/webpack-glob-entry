# webpack-glob-entry

[<img src="http://npm.packagequality.com/badge/webpack-glob-entry.png?size=2" alt="Package Quality" width="280" valign="bottom">](http://packagequality.com/#?package=webpack-glob-entry)
[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![Travis Build Status](https://img.shields.io/travis/thecotne/webpack-glob-entry.svg?style=flat-square&maxAge=300)](https://travis-ci.org/thecotne/webpack-glob-entry)
[![Coveralls](https://img.shields.io/coveralls/thecotne/webpack-glob-entry.svg?style=flat-square&maxAge=300)](https://coveralls.io/github/thecotne/webpack-glob-entry)
[![NPM Dependencies](https://img.shields.io/david/thecotne/webpack-glob-entry.svg?style=flat-square&maxAge=300)](https://david-dm.org/thecotne/webpack-glob-entry)
[![NPM DevDependencies](https://img.shields.io/david/dev/thecotne/webpack-glob-entry.svg?style=flat-square&maxAge=300)](https://david-dm.org/thecotne/webpack-glob-entry?type=dev)

[![bitHound Overall Score](https://www.bithound.io/github/thecotne/webpack-glob-entry/badges/score.svg)](https://www.bithound.io/github/thecotne/webpack-glob-entry)
[![bitHound Dependencies](https://www.bithound.io/github/thecotne/webpack-glob-entry/badges/dependencies.svg)](https://www.bithound.io/github/thecotne/webpack-glob-entry/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/thecotne/webpack-glob-entry/badges/devDependencies.svg)](https://www.bithound.io/github/thecotne/webpack-glob-entry/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/thecotne/webpack-glob-entry/badges/code.svg)](https://www.bithound.io/github/thecotne/webpack-glob-entry)

[![npms score](https://badges.npms.io/webpack-glob-entry.svg?style=flat-square)](https://npms.io/search?q=webpack-glob-entry)
[![NSP Status](https://nodesecurity.io/orgs/thecotne/projects/35280f07-9926-441e-bc86-b4a46ad12f7a/badge)](https://nodesecurity.io/orgs/thecotne/projects/35280f07-9926-441e-bc86-b4a46ad12f7a)
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

you can also use `entry.basePath` function as first argument like this

```javascript

module.exports = {
  entry: entry(entry.basePath(), 'bar/*.js', 'baz/*.js')
}

# or like this

module.exports = {
  entry: entry(entry.basePath('src'), 'src/bar/*.js', 'src/baz/*.js')
}

# or like this

module.exports = {
  entry: entry(entry.basePath('src', '.js'), 'src/bar/*.some.js', 'src/baz/*.js')
}

```
