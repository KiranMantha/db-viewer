// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { DBTreeProvider, SidebarProvider, WebviewProvider } from './providers';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "db-viewer" is now active!');

  const dbTreeProvider = new DBTreeProvider(context.extensionUri);
  const sidebarProvider = new SidebarProvider(context, dbTreeProvider);
  const queryResultProvider = new WebviewProvider(context, 'Query Results');
  context.subscriptions.push(vscode.window.registerTreeDataProvider(DBTreeProvider.viewId, dbTreeProvider));
  context.subscriptions.push(vscode.window.registerWebviewViewProvider(SidebarProvider.viewId, sidebarProvider));
  context.subscriptions.push(
    vscode.commands.registerCommand('db-viewer.queryTable', async (args: { label: string }) => {
      console.log('queryTable args: ', JSON.stringify(args));
      const sqliteClient = sidebarProvider.sqliteClient;
      const tableName = args.label;

      // read columns of given table
      const columnInfoQuery = `PRAGMA table_info(${tableName});`;
      const selectQuery = `SELECT * FROM ${args.label} LIMIT 10;`;

      console.log('select query', selectQuery);
      try {
        const columnInfoResult = await sqliteClient?.executeCommand(columnInfoQuery);

        console.log('columnInfoResult', columnInfoResult);
        // Parse column info to get column names
        const columns: string[] = (columnInfoResult || '')
          .split('\n')
          .filter(Boolean)
          .map(line => line.split('|')[1]); // Assuming 2nd field is the column name

        // read actual data from select query
        const queryResult = await sqliteClient?.executeCommand(selectQuery);
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
        queryResultProvider.show({ tableName, columns, rows });
      } catch (error) {
        vscode.window.showErrorMessage(
          `Failed to query table "${args.label}": ${(error as { message: string }).message}`
        );
      }
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
