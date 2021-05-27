import { MatchTool } from "../match";

export const colorTool: MatchTool = {
  name: 'CSS colors',
  description: 'Search CSS colors like #ededed or rgb(1,2,3)',
  matchers: [
    {
      name: 'hex',
      predicates: [
        /(#[a-f0-9]+)/gi,
      ]
    },
    {
      name: 'rgb',
      predicates: [
        /(rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\))/g
      ]
    }
  ]
}
