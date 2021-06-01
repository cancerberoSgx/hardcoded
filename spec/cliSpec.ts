import { exec } from 'shelljs';
import { mainCli } from '../src/cli';
import { expectToContain } from './testUtil';

describe('main', () => {

  it('list', async () => {
    const results = await mainCli({ source: './spec/assets/sample-project', list: true })
    expect(results.status).toBe(0)
    expect(results.output).toContain('node_modules/package1/package1.txt')
    expect(results.output).toContain('src/a.css')
    expect(results.output).toContain('src/a.ts')
  })

  it('list-exclude', async () => {
    const results = await mainCli({ source: './spec/assets/sample-project', list: true, exclude: ['node_modules/**'] })
    expect(results.status).toBe(0)
    expect(results.output).not.toContain('node_modules/package1/package1.txt')
    expect(results.output).toContain('src/a.css')
    expect(results.output).toContain('src/a.ts')
  })

  it('list-exclude-include', async () => {
    const results = await mainCli({ source: './spec/assets/sample-project', list: true, exclude: ['node_modules/**'], include: ['**/*.css'] })
    expect(results.status).toBe(0)
    expect(results.output).not.toContain('node_modules/package1/package1.txt')
    expect(results.output).not.toContain('src/a.ts')
    expect(results.output).toContain('src/a.css')
  })

  it('ts cli', () => {
    const cmd = 'npx ts-node bin/hardcoded.ts --source spec/assets/sample-project --exclude "node_modules/**" --exclude "dist/**" --exclude="spec/**" --format json'
    const r = exec(cmd, { silent: true })
    expect(r.code).toBe(0)
    const parsed = JSON.parse(r.stdout)
    expect(parsed.map(p => p.file).sort()).toEqual(['src/a.css', 'src/a.ts', 'src/a.tsx'])
    const matches = parsed.map(p => p.matches.map(m => m.results).flat()).flat()
    expectToContain(matches, ['#ededed', 'rgb(12, 34, 56)', '#aa4411', '#44aa99'])
  })

  it('async-test', () => {
    const cmd = 'npx ts-node bin/hardcoded.ts --tool async-test --source spec/assets/sample-project --exclude "node_modules/**" --exclude "dist/**" --exclude="spec/**" --format json'
    const r = exec(cmd, { silent: true })
    expect(r.code).toBe(0)
    const parsed = JSON.parse(r.stdout)
    expect(parsed.map(p => p.file).sort()).toEqual(['src/a.tsx'])
    const matches = parsed.map(p => p.matches.map(m => m.results).flat()).flat()
    expectToContain(matches, ['async-test'])
  })

  it('jsx-strings', () => {
    const cmd = 'npx ts-node bin/hardcoded.ts --tool jsx-strings --source spec/assets/sample-project --exclude "node_modules/**" --exclude "dist/**" --exclude="spec/**" --format json'
    const r = exec(cmd, { silent: true })
    expect(r.code).toBe(0)
    const parsed = JSON.parse(r.stdout)
    expect(parsed.map(p => p.file).sort()).toEqual(['src/a.tsx', 'src/b.js'])
    const matches = parsed.map(p => p.matches.map(m => m.results).flat()).flat()
    expectToContain(matches, ['Hello world', 'hello world 1'])
  })

})


