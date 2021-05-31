import { extname } from "path/posix";
import { Project } from 'ts-morph';
import * as ts from 'typescript';
import { Options } from "../cli";
import { MatchTool } from "../match";

let project: Project

export const jsxStrings: MatchTool = {
  name: 'jsx-strings',
  description: 'Detects hardcoded strings in JSX files (internationalization)',
  dontReadFiles: true,
  async initialize(o: Options) {
    project = new Project()
  },
  matchers: [
    {
      name: 'jsx-strings',
      predicates: [
        async function (input: string) {
          if (!['.js', '.jsx', '.ts', '.tsx'].includes(extname(input).toLocaleLowerCase())) {
            return [];
          }
          const sourceFile = project.addSourceFileAtPath(input)
          if (!sourceFile) {
            return []
          }
          const text = sourceFile.getDescendantsOfKind(ts.SyntaxKind.JsxText)
          return text.map(t => t.getText())
        }
      ]
    },
  ]
}
