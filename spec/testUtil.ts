export function expectToContain(actual: string[], expected: string[]) {
  expected.forEach(e => {
    if (!actual.includes(e)) {
      fail(`${JSON.stringify(actual)} to contain ${e}`);
    }
  });
}
