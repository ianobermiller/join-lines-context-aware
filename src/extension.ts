import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'join-lines-context-aware.join',
    () => {
      vscode.window.showInformationMessage(
        'Hello World from join-lines-context-aware!',
      );
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
