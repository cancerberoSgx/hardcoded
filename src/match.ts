
/** given a string it returns all matches (substrings) or empty array if no match */
export type StringPredicate = ((s: string) => String[]) | RegExp;
export interface MatchOptions {
  input: string;
  matchers: Matcher[];
}
// export interface MatchResult {
//   // input: string;
//   results: { [matcherName: string]: any; };
// }
type MatchResult = { name: string, results: string[]}
export function match(options: MatchOptions): MatchResult[] {
  return options.matchers.map(matcher => ({
    name: matcher.name,
    results: matcher.predicates.map(predicate => callPredicate(predicate, options.input)).flat()
  }));
}
export interface Matcher {
  name: string;
  predicates: StringPredicate[];
}
function callPredicate(predicate: StringPredicate, s: string) {
  if (predicate instanceof RegExp) {
    let results = [], r
    while((r = predicate.exec(s))) {
      results = [...results, r[0]]
    }
    return results;
    // const result = predicate.exec(s);
    // return result ? result : null;
  }
  else {
    return predicate(s);
  }
}
