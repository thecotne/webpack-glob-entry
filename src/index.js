import glob from 'glob'
import globToRegexp from 'globToRegexp'
import fromPairs from 'lodash.frompairs'

function entryName (globPattern, path) {
  const regExpPattern = globToRegexp(globPattern)
    .toString()
    .replace('.*', '(.*)')
    .slice(1, -1)

  const regExp = new RegExp(regExpPattern)

  return regExp.exec(path)[1]
}

function PatternToEntries (pattern) {
  const pairsOfEntries = glob
    .sync(pattern)
    .map(path => [entryName(pattern, path), path])

  return fromPairs(pairsOfEntries)
}

export default function entry (...patterns) {
  const entries = patterns.map(PatternToEntries)

  return Object.assign(...entries)
}
