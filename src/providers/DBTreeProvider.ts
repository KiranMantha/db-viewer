import * as vscode from 'vscode';

export class DBTreeItem extends vscode.TreeItem {
  children?: DBTreeItem[];
  constructor(
    label: string,
    collapsibleState: vscode.TreeItemCollapsibleState,
    readonly extensionPath: string,
    children: DBTreeItem[] = [],
    public readonly contextValue: string = '',
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
    this.children = children || [];

    if (contextValue === 'table') {
      this.command = {
        title: 'Query Table',
        command: 'db-viewer.queryTable',
        arguments: [label] // Pass the label (table name) as an argument
      };
    }
  }
}

export class DBTreeProvider implements vscode.TreeDataProvider<DBTreeItem> {
  static viewId = 'dbviewer-treeview';
  private _onDidChangeTreeData: vscode.EventEmitter<DBTreeItem | undefined | null | void> = new vscode.EventEmitter();
  readonly onDidChangeTreeData: vscode.Event<DBTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

  private tables: DBTreeItem[] = []; // Store the tables and columns here

  setDatabaseData(tables: DBTreeItem[]) {
    this.tables = tables; // Update the tree data
    this.refresh(); // Notify the tree view to refresh
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: DBTreeItem): vscode.TreeItem {
    element.iconPath = this._getIcon(element.contextValue);
    return element;
  }

  getChildren(element?: DBTreeItem): DBTreeItem[] {
    if (element) {
      // Return columns for a given table
      return element.children || [];
    }
    // Return tables at the root level
    return this.tables;
  }

  private _getIcon(contextValue?: string): vscode.ThemeIcon | undefined {
    if (contextValue === 'table') {
      return new vscode.ThemeIcon('database');
    }
    if (contextValue === 'column') {
      return new vscode.ThemeIcon('symbol-field');
    }
    return undefined;
  }
}
