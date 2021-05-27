import { Matcher } from "../match";

export const colorMatchers: Matcher[] = [
  {
    name: 'hex',
    predicates: [
      /(#[a-f0-9]+)/gi, 
      // /(#[a-f0-9]{6})/gi,
      // /(#[a-f0-9]{8})/gi
    ]
  },
  {
    name: 'rgb',
    predicates: [
      /(rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\))/g
    ]
  }
];
