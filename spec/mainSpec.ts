import { mainMatch } from "../src/match"

describe('main', () => {
  it('colors', async () => {
    const input = `
      color: red;
      color: #ededed;
      color: 'rgb(1,2,3)'
      background-color: rgba( 33 ,   13,99)
    `
    // console.log(/(rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\))/g.exec(input));
    
    const results = await mainMatch({ input })
    // console.log(JSON.stringify(results, null, 2));
    expect(results.find(r => r.name === 'hex').results).toEqual(['#ededed'])
    expect(results.find(r => r.name === 'rgb').results).toEqual(['rgb(1,2,3)', 'rgba( 33 ,   13,99)'])
  })
  
})