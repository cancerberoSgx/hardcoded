import { mainMatch } from "../src/match"

describe('main', () => {
  it('colors', async () => {
    const input = `
      color: red;
      color: #ededed;
      color: 'rgb(1,2,3)'
      background-color: rgba( 33 ,   13,99)
    `
    const results = await mainMatch({ input })
    expect(results.find(r => r.name === 'hex').results).toEqual(['#ededed'])
    expect(results.find(r => r.name === 'rgb').results).toEqual(['rgb(1,2,3)', 'rgba( 33 ,   13,99)'])
  })
  
})