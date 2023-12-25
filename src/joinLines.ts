import escapeRegExp from 'lodash/escapeRegExp';

const joinMarker = 'toTGdxMQxk4Z8ZTbLduzgDw51GQJWm8BWdCJshYJ';
const stringConcatRegex = new RegExp(
  "(' ?(\\+|\\.)?" + joinMarker + '\')|(" ?(\\+|\\.)?' + joinMarker + '")',
);

const COMMENT_PREFIXES = ['//', '#', '--', ';', '*', '/*'];
const COMMENT_REGEX = new RegExp(
  '^\\s*(' + COMMENT_PREFIXES.map(escapeRegExp).join('|') + ')\\s*',
);
const REPLACEMENT: Record<string, string | undefined> = {'/*': '*'};

export default function joinLines(
  firstLine: string,
  secondLine: string,
): string {
  let newLines = firstLine.trimEnd() + joinMarker + secondLine.trimStart();
  newLines = newLines.replace(stringConcatRegex, '');

  const lineCommentMatch = firstLine.match(COMMENT_REGEX);
  if (lineCommentMatch) {
    let commentPrefix = lineCommentMatch[1];
    commentPrefix = REPLACEMENT[commentPrefix] || commentPrefix;
    newLines = newLines.replace(
      new RegExp(joinMarker + escapeRegExp(commentPrefix) + '\\s*'),
      ' ',
    );
  }

  if (firstLine.trim().endsWith(',') && startsWithClosingBracket(secondLine)) {
    newLines = newLines.replace(',' + joinMarker, '');
  }

  const shouldSpace =
    !endsWithOpeningBracket(firstLine) && !startsWithClosingBracket(secondLine);
  newLines = newLines.replace(joinMarker, shouldSpace ? ' ' : '');
  return newLines;
}

function endsWithOpeningBracket(s: string): boolean {
  s = s.trim();
  const v = s[s.length - 1];
  if (v === '{' || v === '[' || v === '(') {
    return true;
  }

  // Preserve the space if it looks like `<` is an operator (with a space on
  // the left-hand side)
  if (v === '<' && s[s.length - 2] !== ' ') {
    return true;
  }

  return false;
}

function startsWithClosingBracket(s: string): boolean {
  const v = s.trim()[0];
  return v === '}' || v === ']' || v === ')' || v === '>';
}
