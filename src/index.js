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
  if (typeof entryNameFn !== 'function') {
    patterns.unshift(entryNameFn)
    entryNameFn = entryName
  }

  const entries = patterns.map(PatternToEntries(entryNameFn))

  return Object.assign(...entries)
}
