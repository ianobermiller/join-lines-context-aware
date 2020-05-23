const joinMarker = 'toTGdxMQxk4Z8ZTbLduzgDw51GQJWm8BWdCJshYJ';
const stringConcatRegex = new RegExp(
  "(' ?(\\+|\\.)?" + joinMarker + '\')|(" ?(\\+|\\.)?' + joinMarker + '")',
);

export default function joinLines(
  firstLine: string,
  secondLine: string,
): string {
  let newLines = firstLine.trimRight() + joinMarker + secondLine.trimLeft();
  newLines = newLines.replace(stringConcatRegex, '');

  if (firstLine.trim().startsWith('//')) {
    newLines = newLines.replace(joinMarker + '// ', ' ');
  }

  if (firstLine.trim().startsWith('* ')) {
    newLines = newLines.replace(joinMarker + '* ', ' ');
  }

  if (firstLine.trim().startsWith('# ')) {
    newLines = newLines.replace(joinMarker + '# ', ' ');
  }

  if (firstLine.trim().startsWith('; ')) {
    newLines = newLines.replace(joinMarker + '; ', ' ');
  }

  // Eliminate trailing comma and space when joining a line with a comma
  // with a line with a closing bracket
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
