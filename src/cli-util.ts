var parseArgs = require('minimist');
import * as glob from 'glob';

export function selectFiles(pattern: string, globOptions = {}): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(pattern, globOptions, (err, matches) => {
      if (err) {
        reject(err)
      } else {
        resolve(matches)
      }
    });
  });
}

export function parseArguments(args?: string[]) {
  args = args || process.argv
  const parsed = parseArgs(args)
  const programIndex = args.findIndex(arg => arg.includes('hardcoded'))
  const toolArg = args[programIndex+1]  
  if(toolArg && !toolArg.startsWith('--')) {
    parsed.tool = toolArg
  }
  // console.log(toolArg);
  return parsed
}

export function getDefaultExclude() {
  // readFileSync('.gitignore TODO')
  return []
}


