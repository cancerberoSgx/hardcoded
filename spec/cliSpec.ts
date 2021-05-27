import { main } from '../src/cli';

describe('main', () => {

  it('list', async () => {
    let results = await main({ source: './spec/assets/sample-project', list: true})
    expect(results.output).toContain('node_modules/package1/package1.txt')
    expect(results.output).toContain('src/a.css')
    expect(results.output).toContain('src/a.ts')
    expect(results.status).toBe(0)
    
    results = await main({ source: './spec/assets/sample-project', list: true, exclude: ['node_modules/**']})
    expect(results.output).not.toContain('node_modules/package1/package1.txt')
    expect(results.output).toContain('src/a.css')
    expect(results.output).toContain('src/a.ts')
    expect(results.status).toBe(0)
  })

})