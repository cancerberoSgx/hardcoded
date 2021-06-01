import { main } from 'hardcoded';

(async () => {
  try {
    // analyzing a whole project from FS
    const result = await main({
      source: '../sample-project',
      tool: 'colors', // or 'js-strings', etc
      exclude: ['node_modules/**']
    })
    // result is typed :) group of matches by file.
    result.map(p => p.file).sort().forEach(f => {
      console.log(`File: ${f}`)
    });
    result.map(p => p.matches.map(m => m.results).flat()).flat().forEach(m => {
      console.log(`Match: ${m}`)
    })
  } catch (error) {
    console.error(`ERROR: ${error}`)
    process.exit(1)
  }
})()
