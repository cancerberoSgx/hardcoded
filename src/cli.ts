var parseArgs = require('minimist')
import {GlobSync} from 'glob'

interface Options {
  source: string[]
}

export function main(options: Options) {
  
}

export function parseArguments(args?: string) {
  const parsed = parseArgs(args|| process.argv)
  return parsed
}