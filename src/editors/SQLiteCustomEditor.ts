import * as vscode from 'vscode';
import { SQLiteClient } from '../clients';
import { getHTMLForWebview } from '../html';

export class SQLiteCustomEditorProvider implements vscode.CustomReadonlyEditorProvider {
  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    return vscode.window.registerCustomEditorProvider(
      SQLiteCustomEditorProvider.viewType,
      new SQLiteCustomEditorProvider(context),
      {
        webviewOptions: {
          retainContextWhenHidden: true
        }
      }
    );
  }

  private static readonly viewType = 'db-viewer.databaseEditor';
  private _sqliteClient?: SQLiteClient;
  private _panel: vscode.WebviewPanel | null = null;

  constructor(private readonly context: vscode.ExtensionContext) {}

  public async openCustomDocument(
    uri: vscode.Uri,
    openContext: vscode.CustomDocumentOpenContext,
    token: vscode.CancellationToken
  ): Promise<vscode.CustomDocument> {
    // Return a readonly document (can be extended for writable).
    return { uri, dispose: () => {} };
  }

  public async resolveCustomEditor(
    document: vscode.CustomDocument,
    webviewPanel: vscode.WebviewPanel,
    token: vscode.CancellationToken
  ): Promise<void> {
    const dbPath = document.uri.fsPath;
    this._sqliteClient = new SQLiteClient(dbPath);

    webviewPanel.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this.context.extensionUri, 'resources'),
        vscode.Uri.joinPath(this.context.extensionUri, 'dist')
      ]
    };

    webviewPanel.webview.html = getHTMLForWebview(
      webviewPanel.webview,
      this.context.extensionPath,
      'DBViewer',
      'db-viewer'
    );

    webviewPanel.webview.onDidReceiveMessage(({ command, ...rest }) => {
      console.log('command', command, rest);
      this._executeCommand(command, rest);
    });
    this._panel = webviewPanel;
  }

  private async _executeCommand(command: string, args: any) {
    switch (command) {
      case 'QUERY_DATABASE': {
        this._queryDatabase();
        break;
      }
      case 'QUERY_TABLE': {
        this._queryTable(args.tableName || '', args.selectQuery || '');
        break;
      }
    }
  }

  private async _queryDatabase() {
    const tables = await this._sqliteClient?.getTablesAndColumns();
    console.log('tables', tables, this._panel);
    this._panel?.webview.postMessage({ command: 'DISPLAY_TABLES', data: { tables } });
  }

  private _getQueryMetadata(query: string) {
    // Regex to match SELECT columns or *
    const regex = /(?<=select\s+)(\*|[\w,\s]+)\s+from\s+(\w+)(?=\s*(?:as\s+)?\w*)/i;

    // Match the query
    const match = regex.exec(query);

    // If there's no match, return null (or an empty object if you prefer)
    if (!match) {
      return { tableName: '', columns: [] };
    }

    // Extract table name
    const tableName = match[2];

    // If the columns part is "*", return empty array for columns
    const columns = match[1] === '*' ? [] : match[1].split(/\s*,\s*/); // Split by comma and optional spaces

    // Return the result in the desired format
    return {
      tableName,
      columns
    };
  }

  private async _queryTable(tableName: string, query: string) {
    const selectQuery = tableName ? `SELECT * FROM ${tableName} LIMIT 10` : query;
    const metadata = this._getQueryMetadata(selectQuery);
    const columnInfoQuery = `PRAGMA table_info(${metadata.tableName})`;
    let columns: string[] = metadata.columns;

    try {
      console.log('select query', selectQuery);
      if (!columns.length) {
        const columnInfoResult = await this._sqliteClient?.executeCommand(columnInfoQuery);

        console.log('columnInfoResult', columnInfoResult);
        // Parse column info to get column names
        columns = (columnInfoResult || '')
          .split('\n')
          .filter(Boolean)
          .map(line => line.split('|')[1]); // Assuming 2nd field is the column name
      }
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
      this._panel?.webview.postMessage({
        command: 'DISPLAY_QUERY_RESULTS',
        data: { tableName, columns, rows, selectQuery }
      });
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to query table "${tableName}": ${(error as { message: string }).message}`);
    }
  }
}
