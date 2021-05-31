
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

/**
 * Represent a tool, this is a string matching utility. 
 * The default one is tools/colors.ts that basically match css colors with regex
 * 
 */
export interface MatchTool {
  name: string
  description?: string
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
