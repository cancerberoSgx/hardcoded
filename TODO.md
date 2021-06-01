# TODO

 * --list-tools
 * groupBy match
 * API
 * easy to build tools with a single .js implementation (like src/tools) and invoke : hardcoded --custom custom-hardcoded.js --include foo --exclude bar --format json 
 * easy to build npm plugins: 
  * npm i -g hardcoded hardcoded-cool; hardcoded --tool cool .... 
    * tool setup. Example, parse the project with typescript, have a tool.initialize() that 
    * parses the project and a be able to connect matcher.predicates to the compiler

# DONE / Changelog

 * options.include
 * exclude binary
 * exclude files in .gitignore by default  
 * cli: req args validation
 * async StringPredicate 
 * jsx text matcher

# useful commands

```
npm run build && node bin/hardcoded.js --exclude "node_modules/**" --exclude "dist/**" --exclude="spec/**"
ts-node -T bin/hardcoded.ts --exclude "node_modules/**" --exclude "dist/**" --exclude="spec/**"
```
