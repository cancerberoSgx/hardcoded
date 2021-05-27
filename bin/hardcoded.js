#!/usr/bin/env node
const { main, parseArguments } = require('../dist/src/cli')

const options = parseArguments(process.argv)
console.log(options);
main(options)
