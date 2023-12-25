import * as assert from 'node:assert';
import {expect, test} from 'vitest';
import joinLines from '../joinLines';

function joinLinesTest(lines: string): string {
  const [firstLine, secondLine] = lines.trim().split('\n');
  return joinLines(firstLine, secondLine);
}

test('double quotes with dot delimiter', () => {
  expect(
    joinLinesTest(`
      "Lorem ipsum ".
      "dolor sit amet"
    `),
  ).toEqual(`"Lorem ipsum dolor sit amet"`);
});

test('single quotes with plus delimiter', () => {
  expect(
    joinLinesTest(`
      'Lorem ipsum ' +
      'dolor sit amet'
    `),
  ).toEqual(`'Lorem ipsum dolor sit amet'`);
});

test('single quotes with plus delimiter', () => {
  expect(
    joinLinesTest(`
      'Lorem ipsum ' +
      'dolor sit amet'
    `),
  ).toEqual(`'Lorem ipsum dolor sit amet'`);
});

test('single quotes with no delimiter', () => {
  expect(
    joinLinesTest(`
      'Lorem ipsum '
      'dolor sit amet'
    `),
  ).toEqual(`'Lorem ipsum dolor sit amet'`);
});

test('c-style line comments', () => {
  expect(
    joinLinesTest(`
      // Lorem ipsum
      // dolor sit amet
    `),
  ).toEqual(`// Lorem ipsum dolor sit amet`);
});

test('c-style block comments', () => {
  expect(
    joinLinesTest(`
      /* Lorem ipsum
       * dolor sit amet
    `),
  ).toEqual(`/* Lorem ipsum dolor sit amet`);
});

test('Javadoc comments', () => {
  expect(
    joinLinesTest(`
      /** Lorem ipsum
       * dolor sit amet
    `),
  ).toEqual(`/** Lorem ipsum dolor sit amet`);
});

test('Qt-style doc comments', () => {
  expect(
    joinLinesTest(`
      /*! Lorem ipsum
       * dolor sit amet
    `),
  ).toEqual(`/*! Lorem ipsum dolor sit amet`);
});

test('scripting-style line comments', () => {
  expect(
    joinLinesTest(`
      # Lorem ipsum
      # dolor sit amet
    `),
  ).toEqual(`# Lorem ipsum dolor sit amet`);
});

test('Haskell-style line comments', () => {
  expect(
    joinLinesTest(`
      -- Lorem ipsum
      --   dolor sit amet
    `),
  ).toEqual(`-- Lorem ipsum dolor sit amet`);
});

test('Haskell-style doc line comments', () => {
  expect(
    joinLinesTest(`
      -- | Lorem ipsum
      --   dolor sit amet
    `),
  ).toEqual(`-- | Lorem ipsum dolor sit amet`);
});

test('sql-style line comments', () => {
  expect(
    joinLinesTest(`
      ; Lorem ipsum
      ; dolor sit amet
    `),
  ).toEqual(`; Lorem ipsum dolor sit amet`);
});

test('bullets or docblock', () => {
  expect(
    joinLinesTest(`
      * Lorem ipsum
      * dolor sit amet
    `),
  ).toEqual(`* Lorem ipsum dolor sit amet`);
});

test('no space if opening paren', () => {
  expect(
    joinLinesTest(`
      foo(
        bar
    `),
  ).toEqual(`foo(bar`);
});

test('no space if opening square bracket', () => {
  expect(
    joinLinesTest(`
      [
        bar
    `),
  ).toEqual(`[bar`);
});

test('no space if opening curly brace', () => {
  expect(
    joinLinesTest(`
      {
        bar
    `),
  ).toEqual(`{bar`);
});

test('no space if opening angle bracket', () => {
  expect(
    joinLinesTest(`
      foo<
        bar
    `),
  ).toEqual(`foo<bar`);
});

test('yes space if opening angle bracket as operator', () => {
  expect(
    joinLinesTest(`
      foo <
        bar
    `),
  ).toEqual(`foo < bar`);
});

test('no space if closing paren', () => {
  expect(
    joinLinesTest(`
        foo
      )
    `),
  ).toEqual(`foo)`);
});

test('no space if closing square bracket', () => {
  expect(
    joinLinesTest(`
        foo
      ]
    `),
  ).toEqual(`foo]`);
});

test('no space if closing curly brace', () => {
  expect(
    joinLinesTest(`
        foo
      }
    `),
  ).toEqual(`foo}`);
});

test('no space if closing angle bracket', () => {
  expect(
    joinLinesTest(`
        foo
      >
    `),
  ).toEqual(`foo>`);
});

test('no space or comma if closing paren', () => {
  expect(
    joinLinesTest(`
        foo,
      )
    `),
  ).toEqual(`foo)`);
});

test('no space or comma if closing square bracket', () => {
  expect(
    joinLinesTest(`
        foo,
      ]
    `),
  ).toEqual(`foo]`);
});

test('no space or comma if closing curly brace', () => {
  expect(
    joinLinesTest(`
        foo,
      }
    `),
  ).toEqual(`foo}`);
});

test('no space or comma if closing angle bracket', () => {
  expect(
    joinLinesTest(`
        foo,
      >
    `),
  ).toEqual(`foo>`);
});
