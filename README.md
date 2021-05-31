An utility to find hardcoded HTML/CSS colors in any project.

Initial Motivation: make sure we always reference theme color variables. 

Also, a library to create your own project text-matching utility.

It works for any language as long as they use CSS color syntax (like #ededed, rgb(1,2,3), etc)

# Command line

```
npm i -g hardcoded
cd my/source/project
hardcoded
hardcoded colors --source ../target-project --exclude="**/*Test.*" --exclude="node_modules/**"
```

# Options

The first argument, `colors` is the name of the tool. See Tools section

 * --help
 * --format=plain|md|json (default: plain)
 * --source=my/project    (optional, defaults to current folder)
 * --exclude=GLOB         (can be passed multiple times)
 * --list                 (just list matching files)
 * --noGitIgnore          (if given it will not exclude .gitignore globs)
 * --includeBinary        (if given binary files will be included)
 * --tool                 (The default tool is colors - see Tools section)

# Tools

##  --tool colors

The default tool. It searches for hardcoded CSS colors like `#ededed` or `rgb(1,2,3)`.

It's useful when you want to make sure all colors are referenced from theme variables.

##  --tool jsx-strings

It will find hardcoded text in JSX elements.

Useful when you want to make sure there are no hardcoded strings in an internationalized project.

# API

TODO

## reuse

you can easily reuse this as a library to write your own apps:


# TODO

 * groupBy match
 * API
 * easy to build tools with a single .js implementation: 
```
custom-hardcoded.js
exports = {
  name: 'Bad words',
  matchers: [
    /hate/ful/words
  ]
}

and invoke : 

hardcoded --custom custom-hardcoded.js --include foo --exclude bar --format json
```
 
 * easy to build npm plugins: 
  * npm i -g hardcoded hardcoded-cool; hardcoded cool .... 
  *  * tool setup. Example, parse the project with typescript, have a tool.initialize() that 
  *  * parses the project and a be able to connect matcher.predicates to the compiler

# DONE 

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