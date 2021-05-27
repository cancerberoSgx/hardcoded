import { MatchOptions, match } from "./match"
import { colorMatchers } from "./matchers/colors"

export function main(options: Partial<MatchOptions>&{input: string}) {
  return match({matchers: colorMatchers, ...options})
}
