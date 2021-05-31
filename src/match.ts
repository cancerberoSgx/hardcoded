import { Options } from "./cli"
import { colorTool } from "./tools/colors"

/** given a string it returns all matches (substrings) or empty array if no match */
export type StringPredicate = ((s: string) => Promise<String[]>) | RegExp

export interface Matcher {
  name: string
  predicates: StringPredicate[]
}
export interface MatchOptions {
  input: string
  matchers: Matcher[]
}

export type MatchResult = { name: string, results: string[] }
export async function match(options: MatchOptions): Promise<MatchResult[]> {
  return await Promise.all(
    options.matchers.map(async matcher => ({
      name: matcher.name,
      results: (await Promise.all(matcher.predicates.map(predicate => callPredicate(predicate, options.input)))).flat()
    }))
  )
}

export function mainMatch(options: Partial<MatchOptions>&{input: string}) {
  options.matchers = options.matchers || colorTool.matchers
  return match(options as MatchOptions)
}

/**
 * Represent a tool, this is a string matching utility. 
 * The default one is tools/colors.ts that basically match css colors with regex
 * 
 */
export interface MatchTool {
  name: string
  description?: string
  /** A chance to initialize the tool, for example, compile the TS project first */
  initialize?(options: Options): Promise<void>
  /** If true files won't be read and the file path will be passed to matchers instead of content */
  dontReadFiles?: boolean
  matchers: Matcher[]
}

async function callPredicate(predicate: StringPredicate, s: string) {
  if (predicate instanceof RegExp) {
    let results = [], r
    while ((r = predicate.exec(s))) {
      results = [...results, r[0]]
    }
    return results
  }
  else {
    return await predicate(s)
  }
}
