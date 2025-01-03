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
        this._queryTable(args.tableName);
        break;
      }
      case 'UPDATE_RECORD': {
        this._updateTable(args.tableName, args.record, args.primaryKey, args.primaryKeyType);
        break;
      }
    }
  }

  private async _queryDatabase() {
    const tables = await this._sqliteClient?.getTablesAndColumns();
    this._panel?.webview.postMessage({ command: 'DISPLAY_TABLES', data: { tables } });
  }

  private async _queryTable(tableName: string) {
    try {
      const selectQuery = `SELECT * FROM ${tableName}`;
      const tableMetadata = await this._sqliteClient?.getTableMetadata(tableName);
      const columns = tableMetadata?.columns || [];

      // read actual data from select query
      const queryResult = await this._sqliteClient?.executeCommand(selectQuery);

      // Parse rows into an array of objects
      const rows = (queryResult || '')
        .split('\n')
        .filter(Boolean)
        .map(row => {
          const values = row.split('|');
          return columns.reduce((obj, col, index) => {
            obj[col.name] = values[index];
            return obj;
          }, {} as Record<string, string>);
        });
      this._panel?.webview.postMessage({ command: 'DISPLAY_QUERY_RESULTS', data: { tableName, columns, rows } });
    } catch (error) {
      vscode.window.showErrorMessage(`Failed to query table "${tableName}": ${(error as { message: string }).message}`);
    }
  }

  private async _updateTable(
    tableName: string,
    record: Record<string, string>,
    primaryKey: string,
    primaryKeyType: string
  ) {
    try {
      // Extract primary key value and ensure it exists in the record
      const primaryKeyValue = record[primaryKey];
      if (!primaryKeyValue) {
        throw new Error(`Primary key '${primaryKey}' is missing or undefined in the record.`);
      }
      // Construct the SET clause by excluding the primary key
      const setClause = Object.entries(record)
        .filter(([key]) => key !== primaryKey) // Exclude the primary key from the SET clause
        .map(([key, value]) => `${key} = '${value}'`) // Format each field as key = 'value'
        .join(', ');

      const updateStatement = `UPDATE ${tableName} SET ${setClause} WHERE ${primaryKey} = ${
        primaryKeyType === 'INTEGER' ? parseInt(primaryKeyValue, 10) : `${primaryKeyValue}`
      }; SELECT changes();`;
      const result = (await this._sqliteClient?.executeCommand(updateStatement)) || '';
      const rowsAffected = parseInt(result.split('\n').pop() || '', 10);
      if (rowsAffected > 0) {
        vscode.window.showInformationMessage(`${rowsAffected} row(s) updated successfully.`);
      } else {
        vscode.window.showWarningMessage(
          `No rows were updated. Check the query conditions. UPDATE STMT: ${updateStatement}`
        );
      }
    } catch (error) {
      vscode.window.showErrorMessage(
        `Failed to update table "${tableName}": ${(error as { message: string }).message}`
      );
    }
  }
}
