import { exec } from "shelljs"
import { expectToContain } from "./testUtil"

describe('api client', () => {

  it('the api-client-test app should run against current package', async () => {
    let r = exec([
      'npm run build',
      'cd spec/assets/api-client-test',
      'rm -rf node_modules',
      'npm i ../../..',
    ].join(' && '))
    expect(r.code).toBe(0)
    r = exec([
      'cd spec/assets/api-client-test',
      'ts-node src/test.ts',
    ].join(' && '), { silent: true })
    expect(r.code).toBe(0)

    expectToContain(r.stdout.split('\n'), [
      // 'Status: 0',
      'File: src/a.css',
      'File: src/a.ts',
      'File: src/a.tsx',
      'Match: #ededed',
      'Match: rgb(12, 34, 56)',
      'Match: #aa4411',
      'Match: #44aa99',
    ])
  })

})
