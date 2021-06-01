
import {match} from 'minimatch'

const files = [
  'src/cli-util.ts',
  'src/cli.ts',
  'src/index.ts',
  'src/match.ts',
  'src/tools/async-test.ts',
  'src/tools/colors.ts',
]
// function included(file: string, includes: string[]) {
//   const r = match(files, 'src/**')
//   console.log(r);
// }

const r = match(files, 'src/*cli*')
console.log(r);
