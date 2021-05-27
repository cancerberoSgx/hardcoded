import { MatchOptions, match } from "./match"
import { matchers } from "./matchers/colors"

export function main(options: Partial<MatchOptions>&{input: string}) {
  return match({matchers, ...options})
}
