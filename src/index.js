import glob from 'glob'
import fromPairs from 'lodash.frompairs'

function entryName (globPattern, path) {
  return path
    .split('/')
    .pop()
    .split('.')
    .shift()
}

const PatternToEntries = entryNameFn => pattern => {
  const pairsOfEntries = glob
    .sync(pattern)
    .map(path => [entryNameFn(pattern, path), path])

  return fromPairs(pairsOfEntries)
}

export default function entry (entryNameFn, ...patterns) {
  if (entryNameFn instanceof String) {
    patterns.unshift(entryNameFn)
    entryNameFn = entryName
  } else if (!(entryNameFn instanceof Function)) {
    throw new TypeError('First parameter of entry must be String or Function')
  }

  const entries = patterns.map(PatternToEntries(entryNameFn))

  return Object.assign(...entries)
}
