import * as vscode from 'vscode';
import joinLines from './joinLines';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'join-lines-context-aware.join',
    joinLinesCommand,
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

async function joinLinesCommand() {
  const textEditor = vscode.window.activeTextEditor;
  if (!textEditor) {
    return;
  }

  const {document} = textEditor;

  await textEditor.edit(editBuilder => {
    for (const selection of textEditor.selections) {
      const isLastLine = selection.end.line === document.lineCount - 1;
      if (isLastLine) {
        return;
      }

      const firstLine = document.lineAt(selection.start.line).text;
      const secondLine = document.lineAt(selection.start.line + 1).text;

      const newLines = joinLines(firstLine, secondLine);
      editBuilder.replace(
        new vscode.Range(
          selection.start.line,
          0,
          selection.start.line + 1,
          secondLine.length,
        ),
        newLines,
      );
    }
  });
}
