import { readFileSync } from 'fs';
import { asArray } from 'misc-utils-of-mine-generic';
import { getDefaultExclude, selectFiles } from './cli-util';
import { main as libMain } from './index';
import { colorMatchers } from './matchers/colors';

interface Options {
  source: string
  list: boolean
  include: string[]
  exclude: string[]
}

interface Result {
  output: string
  status: number
}

export async function main(options: Partial<Options>): Promise<Result> {
  try {
    const { sourceGlob, globOptions, finalOptions } = extractOptions(options);
    const files = await selectFiles(sourceGlob, globOptions)
    //TODO: options.include

    if (finalOptions.list) {
      return {
        output: files.join('\n'),
        status: 0
      }
    }
    const results = files
      .map(file => {
        const input = readFileSync(file).toString()
        // TODO configurable/user defined matchers
        const matches = libMain({ input, matchers: colorMatchers }).filter(match => match.results.length)
        return { file, matches }
      })
      .filter(result => result.matches.length)
    return {
      status: 0,
      output: results.map(r => `FILE ${r.file}, MATCHES: ${JSON.stringify(r.matches)}`).join('\n')
    }

  } catch (error) {
    console.trace(error)
    return {
      status: 1,
      output: `${error.toString()}\n  ${error.stack.join('\n  ')}`
    }
  }
}

function extractOptions(options: Partial<Options>) {
  const defaultExclude = getDefaultExclude();
  const defaultOptions: Options = {
    source: '.',
    exclude: defaultExclude,
    include: [],
    list: false
  };
  const finalOptions = { ...defaultOptions, ...options };
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
