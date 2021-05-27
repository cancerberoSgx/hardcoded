export interface Matcher {
  name: string
  predicates: StringPredicate[]
}
/** given a string it returns all matches (substrings) or empty array if no match */
export type StringPredicate = ((s: string) => String[]) | RegExp

export const matchers: Matcher[] = [
  {
    name: 'hex',
    predicates: [
      // (s: string) => s.includes('#') ? ['true'] : [] //TODO
      /(#[a-f0-9]+)/gi
    ]
  },
  {
    name: 'rgb',
    predicates: [
      /(rgba?\(\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\))/g
    ]
  }
];

export interface MatchOptions {
  input: string
  matchers: Matcher[]
}
export interface MatchResult {
  input: string
  results: {[matcherName: string]: any}
}
export function match(options: MatchOptions) {
  return options.matchers.map(matcher=>({
    name: matcher.name,
    results: matcher.predicates.map(predicate=>callPredicate(predicate, options.input))
  }))
}

function callPredicate(predicate: StringPredicate, s: string) {
  if(predicate instanceof RegExp) {
    const result = predicate.exec(s)
    return result ? result[0] : null
  }
  else {
    return predicate(s)
  }
}

export function main(options: Partial<MatchOptions>&{input: string}) {
  return match({matchers, ...options})
}
