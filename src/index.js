import glob from 'glob'
import {basename, dirname, relative} from 'path'

const assoc = (key, value, object) => do {
  object[key] = value
  object
}

const entry = (...patterns) => patterns
  .map(patternToEntries(do {
    if (typeof patterns[0] === 'string') entryName
    else if (typeof patterns[0] === 'function') patterns.shift()
    else typeError('First parameter of entry must be String or Function')
  }))
  .reduce((a, b) => Object.assign(a, b), {})

entry.basePath = (basePath = '.', ext = null) => fullPath => {
  const directory = do {
    const relativePath = relative(basePath, fullPath)
    const relativeDirName = dirname(relativePath)

    if (relativeDirName === '.') {
      ''
    } else {
      `${relativeDirName}/`
    }
  }

  const fileName = do {
    if (ext) {
      basename(fullPath, ext)
    } else {
      entryName(fullPath)
    }
  }

  return directory + fileName
}

const entryName = path => path
  .split('/')
  .pop()
  .split('.')
  .shift()

const patternToEntries = entryNameFn => pattern => glob
  .sync(pattern)
  .map(path => [entryNameFn(path), path])
  .reduce((object, [key, value]) => assoc(key, value, object), {})

const typeError = message => {
  throw new TypeError(message)
}

export default entry
