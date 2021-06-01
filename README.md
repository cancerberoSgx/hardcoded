> Do you need to find all hardcoded colors to make sure you respect the theme variables across your project ?
> 
> Do you need to find all hardcoded strings in JSX elements to make sure everything is internationalized ?
> 
> Do you want to easily create a powerful new matching tool for your own hardcoded strings use case easily ?
> 
> Welcome to `hardcoded`, an utility and framework that implements this kind of use cases and allows you to easily implement your own.
> 

<!-- toc -->

- [Command line](#command-line)
- [Options](#options)
  * [Tools](#tools)
    + [--tool colors](#--tool-colors)
    + [--tool jsx-strings](#--tool-jsx-strings)
- [API](#api)
  * [Customize](#customize)
- [TODO / Ideas / Changelog / Other](#todo--ideas--changelog--other)

<!-- tocstop -->

# Command line

```sh
npm i -g hardcoded

# prints all hardcoded colors found in current project
cd my/source/project
hardcoded

# prints all hardcoded JSX strings in given project folder excluding some files as json output

hardcoded --tool jsx-strings --source target/project --format json --exclude "spec/**" --exclude="node_modules/**" --include="src/frontend/**/*Component.tsx"

# just list files that will be included
hardcoded --list --exclude="node_modules/**"

# list available tools
hardcoded --tools
```

# Options

 * --tool                       (The default tool is colors - see Tools section)
 * --source=my/project          (optional, defaults to current folder)
 * --exclude=GLOB               (can be passed multiple times)
 * --include=GLOB               (can be passed multiple times)
 * --format=plain|json|object   (default: plain)
 * --list                       (just list matching files)
 * --tools                      (just list available tools)
 * --noGitIgnore                (if given it will not exclude .gitignore globs)
 * --includeBinary              (if given binary files will be included)
 * --help

## Notes

 * --include and --exclude can be given multiple times and are globs like `**/*.css`, `src/frontend/**`.

 * By default binary files and the ones listed in .gitignore will be ignored but you can use --includeBinary and --noGitIgnore to disable this.
 
## Tools

### --tool colors

The default tool. It searches for hardcoded CSS colors like `#ededed` or `rgb(1,2,3)`.

It's useful when you want to make sure all colors are referenced from theme variables.

###  --tool jsx-strings

It will find hardcoded text in JSX elements.

Useful when you want to make sure there are no hardcoded strings in an internationalized project.

# API

```sh 
npm install hardcoded
```

See [test.ts](spec/assets/api-client-test/src/test.ts).

The API options are typed and are THE SAME as CLI options. 

# Customize

TODO / WIP

The idea is that you are able to enhance this library with plugins easily. If you solve another use case, being able to share a .js matcher file or (ideally) create your own hardcoded-my-cool-thing package.

Currently this is WIL and not possible, but the matching logic is isolated, see [tools folder](src/tools).

Also we want to support `npm i hardcoded hardcoded-cool; npx hardcoded --tool cool ...`.

# TODO / Ideas / Changelog / Other

[TODO.md](TODO.md)
