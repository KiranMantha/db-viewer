import * as vscode from 'vscode';
import { SQLiteCustomEditorProvider } from './editors';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "db-viewer" is now active!');
  context.subscriptions.push(SQLiteCustomEditorProvider.register(context));
}

export function deactivate() {}
