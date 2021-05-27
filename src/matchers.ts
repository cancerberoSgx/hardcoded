import { Matcher } from "./match";

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
      /(rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\))/g
    ]
  }
];
