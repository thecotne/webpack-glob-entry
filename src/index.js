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

export default function entry () {
  const patterns = Array.from(arguments)
  let entryNameFn = patterns[0]

  if (typeof entryNameFn === 'string') {
    entryNameFn = entryName
  } else if (entryNameFn instanceof Function) {
    patterns.shift()
  } else {
    throw new TypeError('First parameter of entry must be String or Function')
  }

  const entries = patterns.map(PatternToEntries(entryNameFn))

  return Object.assign.apply(Object, entries)
}
