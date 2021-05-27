import { readFileSync } from 'fs';
import { asArray } from 'misc-utils-of-mine-generic';
import { getDefaultExclude, selectFiles } from './cli-util';
import { main as libMain } from './index';
import { MatchResult } from './match';
import { colorTool } from './tools/colors';

interface Options {
  source: string
  list: boolean
  // include: string[]
  exclude: string[]
  tool: string
  // groupBy: 'file'|'value'|'matcher'
  format: 'json' | 'plain' | 'md'
}

interface Result {
  output: string
  status: number
}

export async function main(options: Partial<Options>): Promise<Result> {
  try {
    const { sourceGlob, globOptions, finalOptions } = extractOptions(options);
    const files = await selectFiles(sourceGlob, globOptions)
    // TODO: options.include

    if (finalOptions.list) {
      return {
        output: files.join('\n'),
        status: 0
      }
    }
    const tool = getTool(finalOptions)
    const results = files
      .map(file => {
        const input = readFileSync(file).toString()
        const matches = libMain({ input, matchers: tool.matchers }).filter(match => match.results.length)
        return { file, matches }
      })
      .filter(result => result.matches.length)
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
    return results.map(r => `FILE ${r.file}, MATCHES: ${JSON.stringify(r.matches)}`).join('\n');
  }
}

function extractOptions(options: Partial<Options>) {
  const defaultExclude = getDefaultExclude();
  const defaultOptions: Options = {
    source: '.',
    tool: colorTool.name,
    exclude: defaultExclude,
    // include: [],
    list: false,
    format: 'plain',
  };
  const finalOptions: Options = { ...defaultOptions, ...options };
  finalOptions.exclude = [...defaultOptions.exclude, ...asArray(finalOptions.exclude)];

  const sourceGlob = `**/*`;
  const globOptions = {
    ignore: finalOptions.exclude,
    root: finalOptions.source,
    cwd: finalOptions.source,
    nodir: true,
  };
  return { sourceGlob, globOptions, finalOptions };
}

export function withFinalSlash(s: string) {
  return s.endsWith('/') ? s : `${s}/`
}
function getTool(options: Options) {
  if (options.tool === 'colors') {
    return colorTool
  }
  // TODO dynamic tools 
  else {
    return colorTool
  }
}

