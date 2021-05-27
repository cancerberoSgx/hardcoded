import { MatchOptions, match } from "./match"
import { matchers } from "./matchers"

export function main(options: Partial<MatchOptions>&{input: string}) {
  return match({matchers, ...options})
}
