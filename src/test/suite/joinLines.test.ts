import * as assert from 'assert';
import joinLines from '../../joinLines';

function joinLinesTest(lines: string): string {
  const [firstLine, secondLine] = lines.trim().split('\n');
  return joinLines(firstLine, secondLine);
}

test('double quotes with dot delimiter', () => {
  assert.strictEqual(
    joinLinesTest(`
      "Lorem ipsum ".
      "dolor sit amet"
    `),
    `"Lorem ipsum dolor sit amet"`,
  );
});

test('single quotes with plus delimiter', () => {
  assert.strictEqual(
    joinLinesTest(`
      'Lorem ipsum ' +
      'dolor sit amet'
    `),
    `'Lorem ipsum dolor sit amet'`,
  );
});

test('single quotes with plus delimiter', () => {
  assert.strictEqual(
    joinLinesTest(`
      'Lorem ipsum ' +
      'dolor sit amet'
    `),
    `'Lorem ipsum dolor sit amet'`,
  );
});

test('single quotes with no delimiter', () => {
  assert.strictEqual(
    joinLinesTest(`
      'Lorem ipsum '
      'dolor sit amet'
    `),
    `'Lorem ipsum dolor sit amet'`,
  );
});

test('c-style line comments', () => {
  assert.strictEqual(
    joinLinesTest(`
      // Lorem ipsum
      // dolor sit amet
    `),
    `// Lorem ipsum dolor sit amet`,
  );
});

test('c-style block comments', () => {
  assert.strictEqual(
    joinLinesTest(`
      /* Lorem ipsum
       * dolor sit amet
    `),
    `/* Lorem ipsum dolor sit amet`,
  );
});

test('Javadoc comments', () => {
  assert.strictEqual(
    joinLinesTest(`
      /** Lorem ipsum
       * dolor sit amet
    `),
    `/** Lorem ipsum dolor sit amet`,
  );
});

test('Qt-style doc comments', () => {
  assert.strictEqual(
    joinLinesTest(`
      /*! Lorem ipsum
       * dolor sit amet
    `),
    `/*! Lorem ipsum dolor sit amet`,
  );
});

test('scripting-style line comments', () => {
  assert.strictEqual(
    joinLinesTest(`
      # Lorem ipsum
      # dolor sit amet
    `),
    `# Lorem ipsum dolor sit amet`,
  );
});

test('sql-style line comments', () => {
  assert.strictEqual(
    joinLinesTest(`
      ; Lorem ipsum
      ; dolor sit amet
    `),
    `; Lorem ipsum dolor sit amet`,
  );
});

test('bullets or docblock', () => {
  assert.strictEqual(
    joinLinesTest(`
      * Lorem ipsum
      * dolor sit amet
    `),
    `* Lorem ipsum dolor sit amet`,
  );
});

test('no space if opening paren', () => {
  assert.strictEqual(
    joinLinesTest(`
      foo(
        bar
    `),
    `foo(bar`,
  );
});

test('no space if opening square bracket', () => {
  assert.strictEqual(
    joinLinesTest(`
      [
        bar
    `),
    `[bar`,
  );
});

test('no space if opening curly brace', () => {
  assert.strictEqual(
    joinLinesTest(`
      {
        bar
    `),
    `{bar`,
  );
});

test('no space if opening angle bracket', () => {
  assert.strictEqual(
    joinLinesTest(`
      foo<
        bar
    `),
    `foo<bar`,
  );
});

test('yes space if opening angle bracket as operator', () => {
  assert.strictEqual(
    joinLinesTest(`
      foo <
        bar
    `),
    `foo < bar`,
  );
});

test('no space if closing paren', () => {
  assert.strictEqual(
    joinLinesTest(`
        foo
      )
    `),
    `foo)`,
  );
});

test('no space if closing square bracket', () => {
  assert.strictEqual(
    joinLinesTest(`
        foo
      ]
    `),
    `foo]`,
  );
});

test('no space if closing curly brace', () => {
  assert.strictEqual(
    joinLinesTest(`
        foo
      }
    `),
    `foo}`,
  );
});

test('no space if closing angle bracket', () => {
  assert.strictEqual(
    joinLinesTest(`
        foo
      >
    `),
    `foo>`,
  );
});

test('no space or comma if closing paren', () => {
  assert.strictEqual(
    joinLinesTest(`
        foo,
      )
    `),
    `foo)`,
  );
});

test('no space or comma if closing square bracket', () => {
  assert.strictEqual(
    joinLinesTest(`
        foo,
      ]
    `),
    `foo]`,
  );
});

test('no space or comma if closing curly brace', () => {
  assert.strictEqual(
    joinLinesTest(`
        foo,
      }
    `),
    `foo}`,
  );
});

test('no space or comma if closing angle bracket', () => {
  assert.strictEqual(
    joinLinesTest(`
        foo,
      >
    `),
    `foo>`,
  );
});
