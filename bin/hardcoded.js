#!/usr/bin/env node
const { main } = require('../dist/src/cli')
const { parseArguments } = require('../dist/src/cli-util')

const options = parseArguments(process.argv)
// console.log(options);
main(options)
