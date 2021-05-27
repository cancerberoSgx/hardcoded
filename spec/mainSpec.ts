import { main } from '../src';

describe('main', () => {
  it('1', () => {
    const input = `
      color: red;
      color: #ededed;
      color: 'rgb(1,2,3)'
    `
    const results = main({ input })
    expect(results.find(r => r.name === 'hex').results).toEqual(['#ededed'])
    expect(results.find(r => r.name === 'rgb').results).toEqual(['rgb(1,2,3)'])

    // console.log(JSON.stringify(results, null, 2));
  })
})