import { readFileSync } from 'fs';
import { asArray } from 'misc-utils-of-mine-generic';
import { join } from 'path';
import { getDefaultExclude, selectFiles } from './cli-util';
import { main as libMain } from './index';
import { MatchResult } from './match';
import { asyncTestMatcher } from './tools/async-test';
import { colorTool } from './tools/colors';
const { isBinaryFile } = require("isbinaryfile")

export interface Options {
  source: string
  list: boolean
  exclude: string[]
  tool: string
  // groupBy: 'file'|'value'|'matcher'
  format: 'json' | 'plain'
  help: boolean
  noGitIgnore: boolean
  includeBinary: boolean
}

interface Result {
  output: string
  status: number
}

export async function main(options: Partial<Options>): Promise<Result> {
  try {
    const validation = validateOptions(options)
    if (validation) {
      return {
        output: validation,
        status: 1
      }
    }
    const { sourceGlob, globOptions, finalOptions } = extractOptions(options);
    const files = await selectFiles(sourceGlob, globOptions)

    if (finalOptions.list) {
      return {
        output: files.join('\n'),
        status: 0
      }
    }
    if (finalOptions.help) {
      return {
        output: `
Usage: hardcoded --source target/project --exclude "**/*.svg" --exclude "node_modules/**"

Options:
  --help                  (display help)
  --format=plain|json     (default: plain)
  --source=my/project     (optional, defaults to current folder)
  --exclude=GLOB          (can be passed multiple times)
  --list                  (just list matching files)
  --noGitIgnore           (if given it will not exclude .gitignore globs)
        `.trim(),
        status: 0
      }
    }
    const tool = getTool(finalOptions)

    // TODO: do this better, async queue? serial ? which has best times ? 
    let results = await Promise.all(
      files
        .map(async file => {
          const realFile = join(finalOptions.source, file)
          if (!options.includeBinary && await isBinaryFile(realFile)) {
            return { file, matches: [] }
          }
          const input = readFileSync(realFile).toString()
          const matches = (await libMain({ input, matchers: tool.matchers })).filter(match => match.results.length)
          return { file, matches }
        })
    )
    results = results.filter(result => result.matches.length)
    return {
      status: 0,
      output: format(results, finalOptions)
    }

  } catch (error) {
    console.trace(error)
    return {
      status: 1,
      output: `${error.toString()}\n  ${error.stack.join('\n  ')}`
    }
  }
}

interface FilesResult {
  file: string
  matches: MatchResult[]
}

function format(results: FilesResult[], options: Partial<Options>): string {
  if (options.format === 'json') {
    return JSON.stringify(results)
  } else {
    return results.map(r => `${r.file}: ${JSON.stringify(r.matches)}`).join('\n')
  }
}

function extractOptions(options: Partial<Options>) {
  const defaultExclude = getDefaultExclude(options)

  const defaultOptions: Options = {
    source: '.',
    tool: colorTool.name,
    exclude: defaultExclude,
    list: false,
    format: 'plain',
    help: false,
    noGitIgnore: false,
    includeBinary: false,
  }
  const finalOptions: Options = { ...defaultOptions, ...options }
  finalOptions.exclude = [...defaultOptions.exclude, ...asArray(finalOptions.exclude)]

  const sourceGlob = `**/*`
  const globOptions = {
    ignore: finalOptions.exclude,
    root: finalOptions.source,
    cwd: finalOptions.source,
    nodir: true,
  }
  return { sourceGlob, globOptions, finalOptions }
}

function getTool(options: Options) {
  if (options.tool === 'colors') {
    return colorTool
  }
  if (options.tool === 'async-test') {
    return asyncTestMatcher
  }
  // TODO dynamic tools 
  else {
    return colorTool
  }
}

function validateOptions(options: Partial<Options>) {
  return null
}
