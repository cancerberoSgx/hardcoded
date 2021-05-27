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

export function parseArguments(args?: string) {
  const parsed = parseArgs(args || process.argv)
  return parsed
}

export function getDefaultExclude() {
  // readFileSync('.gitignore TODO')
  return []
}


