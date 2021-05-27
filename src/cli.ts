import { getDefaultExclude, selectFiles } from './cli-util'
import * as glob from 'glob';
import { asArray, slash } from 'misc-utils-of-mine-generic';

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
// example: 
// npm run build; node bin/hardcoded.js --source . --exclude "**/cli*" --exclude="./node_modules/**"

export async function main(options: Partial<Options>): Promise<Result> {
  const { sourceGlob, globOptions, finalOptions } = extractOptions(options);
  const files = await selectFiles(sourceGlob, globOptions)
  
  if(finalOptions.list) {
    return {
      output: files.join('\n'),
      status: 0
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

  // const sourceGlob = `${withFinalSlash(finalOptions.source)}**/*`;
  const sourceGlob = `**/*`;

  // console.log({ sourceGlob }, finalOptions);

  const globOptions = {
    ignore: finalOptions.exclude,
    root: finalOptions.source,
    cwd: finalOptions.source,
    nodir: true
  };
  return { sourceGlob, globOptions, finalOptions };
}

export function withFinalSlash(s: string) {
  return s.endsWith('/') ? s : `${s}/`
}