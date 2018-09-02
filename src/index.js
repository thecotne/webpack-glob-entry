import glob from 'glob'
import { basename, dirname, relative } from 'path'

const entry = (...patterns) => {
  if (!['string', 'function'].includes(typeof patterns[0])) {
    throw new TypeError('First parameter of entry must be String or Function')
  }

  return patterns
    .map(patternToEntries(
      typeof patterns[0] === 'string' ? entryName : patterns.shift()
    ))
    .reduce((a, b) => Object.assign(a, b), {})
}

entry.basePath = (basePath = '.', ext = null) => fullPath => {
  const relativePath = relative(basePath, fullPath)
  const relativeDirName = dirname(relativePath)

  const directory = relativeDirName === '.' ? '' : `${relativeDirName}/`

  const fileName = ext ? basename(fullPath, ext) : entryName(fullPath)

  return directory + fileName
}

const assoc = (key, value, object) => {
  object[key] = value
  return object
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

export default entry
