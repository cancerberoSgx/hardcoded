#!/usr/bin/env node
const { mainCli } = require('../dist/src/cli')
const { parseArguments } = require('../dist/src/cli-util')

async function hardcoded() {
  const options = parseArguments(process.argv)
  const results = await mainCli(options)
  if (results.status !== 0) {
    console.error(results.output);
  } else {
    console.log(results.output);
  }
  process.exit(results.status)
}

try {
  (async () => hardcoded())()
} catch (error) {
  console.trace(error)
  process.exit(1)
}
