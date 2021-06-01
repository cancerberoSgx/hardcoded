import { readFileSync } from 'fs';
import { match } from 'minimatch';
import { asArray } from 'misc-utils-of-mine-generic';
import { join } from 'path';
import { getDefaultExclude, selectFiles } from './cli-util';
import { mainMatch, MatchResult } from './match';
import { asyncTestMatcher } from './tools/async-test';
import { colorTool } from './tools/colors';
import { jsxStrings } from './tools/jsx-strings';
const { isBinaryFile } = require("isbinaryfile")

export interface Options {
  source: string
  list: boolean
  exclude: string[]
  include: string[]
  tool: string
  /** `object` applies when calling main() from JS code */
  format: 'json' | 'plain' | 'object'
  help: boolean
  noGitIgnore: boolean
  includeBinary: boolean
  /** if given it list available tools */
  tools: boolean
  _throwError: boolean
}

interface Result {
  output: string
  status: number
}

export async function main(options: Partial<Options>): Promise<FilesResult[]> {
  const r = await mainCli({ ...options, format: 'object', _throwError: true })
  if (r.status !== 0) {
    throw new Error(r.output)
  }
  return r.output as any
}

export async function mainCli(options: Partial<Options>): Promise<Result> {
  try {
    const validation = validateOptions(options)
    if (validation) {
      return {
        output: validation,
        status: 1
      }
    }
    const { sourceGlob, globOptions, finalOptions } = extractOptions(options);
    let files = await selectFiles(sourceGlob, globOptions)

    finalOptions.include.forEach(include => {
      files = match(files, include)
    })
    const listOptions = dispatchListOptions({ ...finalOptions, files });
    if(listOptions) {
      return listOptions
    }

    const tool = getTool(finalOptions)
    if (tool.initialize) {
      await tool.initialize(finalOptions);
    }

    // TODO: do this better, async queue? serial ? which has best times ? 
    let results = await Promise.all(
      files
        .map(async file => {
          const realFile = join(finalOptions.source, file)
          if (!options.includeBinary && await isBinaryFile(realFile)) {
            return { file, matches: [] }
          }
          const input = tool.dontReadFiles ? realFile : readFileSync(realFile).toString()
          const matches = (await mainMatch({ input, matchers: tool.matchers })).filter(match => match.results.length)
          return { file, matches }
        })
    )
    results = results.filter(result => result.matches.length)
    return {
      status: 0,
      output: format(results, finalOptions)
    }

  } catch (error) {
    // console.trace(error)
    if (options._throwError) {
      throw error
    } else {
      return {
        status: 1,
        output: `${error.toString()}`
      }
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
  }
  else if (options.format === 'object') {
    return results as any
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
    include: [],
    list: false,
    format: 'plain',
    help: false,
    noGitIgnore: false,
    includeBinary: false,
    tools: false,
    _throwError: false
  }
  const finalOptions: Options = { ...defaultOptions, ...options }
  finalOptions.exclude = [...defaultOptions.exclude, ...asArray(finalOptions.exclude)]
  finalOptions.include = [...defaultOptions.include, ...asArray(finalOptions.include)]

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
  if (options.tool === 'jsx-strings') {
    return jsxStrings
  }
  // TODO dynamic tools 
  else {
    return colorTool
  }
}

function validateOptions(options: Partial<Options>) {
  return null
}
function dispatchListOptions(finalOptions: Options & { files: string[] }) {
  if (finalOptions.list) {
    return {
      output: finalOptions.files.join('\n'),
      status: 0
    }
  }
  if (finalOptions.help) {
    return {
      output: `
Usage: hardcoded --source target/project --exclude "**/*.svg" --exclude "node_modules/**""

* --tool                       (The default tool is colors - see Tools section)
* --format=plain|json|object   (default: plain)
* --source=my/project          (optional, defaults to current folder)
* --exclude=GLOB               (can be passed multiple times)
* --include=GLOB               (can be passed multiple times)
* --list                       (just list matching files)
* --noGitIgnore                (if given it will not exclude .gitignore globs)
* --includeBinary              (if given binary files will be included)
* --tools                      (if given prints available tools)
* --help

--include and --exclude can be given multiple times and are globs like **/*.css, src/frontend/**
      `.trim(),
      status: 0
    }
  }
  if (finalOptions.tools) {
    // TODO: extensible
    const tools = [colorTool, jsxStrings]
    return {
      output: JSON.stringify(tools.map(t => t.name)),
      status: 0
    }
  }
}

