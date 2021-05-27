An utility to find hardcoded HTML/CSS colors in any project.

Initial Motivation: make sure we always reference theme color variables. 

Also, a library to create your own project text-matching utility.

It works for any language as long as they use CSS color syntax (like #ededed, rgb(1,2,3), etc)

# Command line

```
npm i -g hardcoded
cd my/source/project
hardcoded
hardcoded colors --source ../target-project --include "**/*.scss" --include "**/*.tsx" --exclude="**/*Test.*"
```

# Options

The first argument, `colors` is the name of the tool. See Tools section

 * --help
 * --format=plain|md|json (default: plain)
 * --source=my/project (optional, defaults to current folder)
 * --exclude=GLOB
 <!-- * --include=GLOB -->
 

# Tools

The default tool is `colors` which will find CSS colors which is the default. Others will be added. 

Also the project can be used to create custom tools. npm i -g hardcoded hardcoded-cool; hardcoded cool .... 

THIS IS WIP - right now only colors (default)


# API

TODO

## reuse

you can easily reuse this as a library to write your own apps:


# TODO

 * exclude files in .gitignore by default  
 * exclude binary
 * async StringPredicate 

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