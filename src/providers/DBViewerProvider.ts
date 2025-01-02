import * as vscode from 'vscode';
import { SQLiteClient } from '../clients';
import { getHTMLForWebview } from '../html';

export class DBViewerProvider {
  static viewId = 'queryresult-view';
  constructor(private readonly context: vscode.ExtensionContext, readonly title = '') {}

  private _sqliteClient?: SQLiteClient;
  private _panel: vscode.WebviewPanel | null = null;

  get sqliteClient() {
    return this._sqliteClient;
  }

  async loadDatabase(dbPath: string) {
    this._sqliteClient = new SQLiteClient(dbPath);

    this._panel = vscode.window.createWebviewPanel(DBViewerProvider.viewId, this.title, vscode.ViewColumn.Beside, {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this.context.extensionUri, 'resources'),
        vscode.Uri.joinPath(this.context.extensionUri, 'dist')
      ]
    });

    this._panel.webview.html = getHTMLForWebview(
      this._panel.webview,
      this.context.extensionPath,
      'DBViewer',
      'db-viewer'
    );
    this._panel.webview.onDidReceiveMessage(({ command, ...rest }) => {
      console.log('command', command, rest);
      this._executeCommand(command, rest);
    });
    // Handle panel disposal.
    this._panel.onDidDispose(() => {
      this._panel = null;
    });
  }

  private async _executeCommand(command: string, args: any) {
    switch (command) {
      case 'QUERY_DATABASE': {
        this._queryDatabase();
        break;
      }
      case 'QUERY_TABLE': {
        this._queryTable(args.tableName);
        break;
      }
    }
  }

  private async _queryDatabase() {
    const tables = await this._sqliteClient?.getTablesAndColumns();
    console.log('tables', tables, this._panel);
    this._panel?.webview.postMessage({ command: 'DISPLAY_TABLES', data: { tables } });
  }

  private async _queryTable(tableName: string) {
    const columnInfoQuery = `PRAGMA table_info(${tableName});`;
    const selectQuery = `SELECT * FROM ${tableName} LIMIT 10;`;
    try {
      console.log('select query', selectQuery);
      const columnInfoResult = await this._sqliteClient?.executeCommand(columnInfoQuery);

      console.log('columnInfoResult', columnInfoResult);
      // Parse column info to get column names
      const columns: string[] = (columnInfoResult || '')
        .split('\n')
        .filter(Boolean)
        .map(line => line.split('|')[1]); // Assuming 2nd field is the column name
      // read actual data from select query
      const queryResult = await this._sqliteClient?.executeCommand(selectQuery);
      // Parse rows into an array of objects
      const rows = (queryResult || '')
        .split('\n')
        .filter(Boolean)
        .map(row => {
          const values = row.split('|');
          return columns.reduce((obj, col, index) => {
            obj[col] = values[index];
            return obj;
          }, {} as Record<string, string>);
        });
      this._panel?.webview.postMessage({ command: 'DISPLAY_QUERY_RESULTS', data: { tableName, columns, rows } });
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to query table "${tableName}": ${(error as { message: string }).message}`);
    }
  }
}