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

See [test.ts](spec/assets/api-client-test/src/test.ts).

## Customize

TODO / WIP

The idea is that you are able to enhance this library with plugins easily. If you solve another use case, being able to share a .js matcher file or (ideally) create your own hardcoded-my-cool-thing package.

Currently this is WIL and not possible, but the matching logic is isolated, see [tools folder](src/tools).
