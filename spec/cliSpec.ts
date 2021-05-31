import { execSync } from 'child_process';
import { main } from '../src/cli';
import { exec } from 'shelljs'

describe('main', () => {

  it('list', async () => {
    let results = await main({ source: './spec/assets/sample-project', list: true })
    expect(results.output).toContain('node_modules/package1/package1.txt')
    expect(results.output).toContain('src/a.css')
    expect(results.output).toContain('src/a.ts')
    expect(results.status).toBe(0)

    results = await main({ source: './spec/assets/sample-project', list: true, exclude: ['node_modules/**'] })
    expect(results.output).not.toContain('node_modules/package1/package1.txt')
    expect(results.output).toContain('src/a.css')
    expect(results.output).toContain('src/a.ts')
    expect(results.status).toBe(0)
  })

  it('ts cli', () => {
    const cmd = 'npx ts-node bin/hardcoded.ts --source spec/assets/sample-project --exclude "node_modules/**" --exclude "dist/**" --exclude="spec/**" --format json'
    const r = exec(cmd, { silent: true })

    expect(r.code).toBe(0)
    const parsed = JSON.parse(r.stdout)

    expect(parsed.map(p => p.file).sort()).toEqual(['src/a.css', 'src/a.ts', 'src/a.tsx'])
    const matches = parsed.map(p => p.matches.map(m=>m.results).flat()).flat()
    expectToContain(matches, [ '#ededed', 'rgb(12, 34, 56)', '#aa4411', '#44aa99'])
  })

  it('async-test', () => {
    const cmd = 'npx ts-node bin/hardcoded.ts --tool async-test --source spec/assets/sample-project --exclude "node_modules/**" --exclude "dist/**" --exclude="spec/**" --format json'
    const r = exec(cmd, { silent: true })

    expect(r.code).toBe(0)
    const parsed = JSON.parse(r.stdout)

    expect(parsed.map(p => p.file).sort()).toEqual(['src/a.tsx'])
    const matches = parsed.map(p => p.matches.map(m=>m.results).flat()).flat()
    expectToContain(matches, [ 'async-test'])
  })

})

function expectToContain(actual: string[], expected: string[]) {
  expected.forEach(e=>{
    if(!actual.includes(e)) {
      fail(`${JSON.stringify(actual)} to contain ${e}`)
    }
  })
}
