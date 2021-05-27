An utility to find hardcoded HTML/CSS colors in any project.

Initial Motivation: make sure we always reference theme color variables. 

Also, a library to create your own project text-matching utility.

It works for any language as long as they use CSS color syntax (like #ededed, rgb(1,2,3), etc)

# Command line

```
npm i -g hardcoded
cd my/source/project
hardcoded
hardcoded --source ../target-project --include "**/*.scss" --include "**/*.tsx" --exclude="**/*Test.*"
```

# Options

 * --help
 * --format=md|json (default: md)
 * --source=my/project (optional, defaults to current folder)
 * --exclude=GLOB
 * --include=GLOB


# API

TODO

## reuse

you can easily reuse this as a library to write your own apps:


# TODO

 * exclude files in .gitignore by default  
 * easy to reuse for other apps. Perhaps just writing a js file like the following: 
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