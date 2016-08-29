# webpack-glob-entry

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
  entry: entry((glob, path) => path.basename(path), 'bar/*.js', 'baz/*.js')
}
```
