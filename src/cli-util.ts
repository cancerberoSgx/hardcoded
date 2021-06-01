var parseArgs = require('minimist');
import { existsSync, readFileSync } from 'fs';
import * as glob from 'glob';
import { notFalsy } from 'misc-utils-of-mine-generic';
import { join } from 'path/posix';
import { Options } from './cli';

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
  return parsed
}

export function getDefaultExclude(options: Partial<Options>) {
  const root = options.source || '.'
  if (!options.noGitIgnore && existsSync(join(root, '.gitignore'))) {
    return readFileSync(join(root, '.gitignore')).toString().split('\n').filter(notFalsy).map(f => [f, `${withFinalSlash(f)}**/*`]).flat().map(f => f.startsWith('/') ? f.substring(1, f.length) : f)
  }
  return []
}

export function withFinalSlash(s: string) {
  return s.endsWith('/') ? s : `${s}/`
}

