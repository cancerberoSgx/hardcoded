#!/usr/bin/env node
const { main } = require('../dist/src/cli')
const { parseArguments } = require('../dist/src/cli-util')

async function hardcoded() {
  const options = parseArguments(process.argv)
  // console.log(options);
  const results = await main(options)
  if(results.status!==0) {
    console.error(results.output);
  } else {
    console.log(results.output);
  }
  process.exit(results.status)
}

try {
  (async ()=>hardcoded())()
} catch (error) {
  console.trace(error)
  process.exit(1)
}