import { MatchOptions, MatchTool } from "../match";

export const asyncTestMatcher: MatchTool = {
  name: 'async-test',
  description: 'dummy test matcher to test async calls',
  matchers: [
    {
      name: 'async-test',
      predicates: [
        async function(input: string) {
          return input.includes('async-test') ? ['async-test'] : []
        }
      ]
    },
  ]
}
