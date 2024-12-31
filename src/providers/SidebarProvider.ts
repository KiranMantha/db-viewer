import * as vscode from 'vscode';
import { SQLiteClient } from '../clients';
import { getHTMLForWebview } from '../html';
import { DBTreeItem, DBTreeProvider } from './DBTreeProvider';

export class SidebarProvider implements vscode.WebviewViewProvider {
  static viewId = 'dbviewer-sidebar';
  private _view?: vscode.WebviewView;
  private _sqliteClient?: SQLiteClient;

  constructor(private readonly _context: vscode.ExtensionContext, private readonly _dbTreeProvider: DBTreeProvider) {}

  get sqliteClient() {
    return this._sqliteClient;
  }

  resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._context.extensionUri]
    };
    webviewView.webview.html = getHTMLForWebview(webviewView.webview, this._context.extensionPath, 'Sidebar');
    webviewView.webview.onDidReceiveMessage(({ command, ...rest }) => {
      console.log('command', command, rest);
      this._executeCommand(command, rest);
    });
  }

  revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private async _executeCommand(command: string, args: any) {
    switch (command) {
      case 'GREET': {
        vscode.window.showInformationMessage(args.message);
        break;
      }
      case 'PICK_FILE': {
        await this._pickDatabaseFile();
        break;
      }
    }
  }

  private async _pickDatabaseFile() {
    const fileUris = await vscode.window.showOpenDialog({
      canSelectMany: false,
      openLabel: 'Select SQLite Database',
      filters: { 'SQLite Database': ['db'] }
    });

    if (fileUris && fileUris[0]) {
      this._loadDatabase(fileUris[0].fsPath);
    }
  }

  private async _loadDatabase(filePath: string) {
    this._sqliteClient = new SQLiteClient(filePath);
    // this._sqliteClient.loadDatabase(filePath);
    try {
      const tables = await this._sqliteClient.getTablesAndColumns(); // Adjusted function to get data
      const treeItems = tables.map(
        table =>
          new DBTreeItem(
            table.name,
            vscode.TreeItemCollapsibleState.Collapsed,
            this._context.extensionPath,
            table.columns.map(
              column =>
                new DBTreeItem(
                  column.name,
                  vscode.TreeItemCollapsibleState.None,
                  this._context.extensionPath,
                  undefined,
                  'column'
                )
            ),
            'table'
          )
      );
      this._dbTreeProvider.setDatabaseData(treeItems); // Update the tree view with data
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to load database: ${(error as { message: string }).message}`);
    }
  }
}
