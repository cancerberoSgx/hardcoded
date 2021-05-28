#!/usr/bin/env node
import { main } from '../src/cli'
import { parseArguments } from '../src/cli-util'

async function hardcoded() {
  const options = parseArguments(process.argv) as any
  const results = await main(options)
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
