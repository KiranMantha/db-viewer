import * as vscode from 'vscode';
import { getHTMLForWebview } from '../html';

export class WebviewProvider {
  static viewId = 'queryresult-view';
  private panel: vscode.WebviewPanel | null = null;

  constructor(private readonly _context: vscode.ExtensionContext, private title: string) {}

  /**
   * Show the webview panel with the given data.
   * @param data Data to pass to the webview.
   */
  public show(data: any): void {
    if (this.panel) {
      const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
      // If the panel already exists, bring it to the front and update its content.
      // this.panel.reveal(vscode.ViewColumn.Beside);
      this.panel.reveal(column);
      this.panel.webview.postMessage(data);
    } else {
      // Create a new webview panel.

      this.panel = vscode.window.createWebviewPanel(WebviewProvider.viewId, this.title, vscode.ViewColumn.Beside, {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.joinPath(this._context.extensionUri, 'resources'),
          vscode.Uri.joinPath(this._context.extensionUri, 'dist')
        ]
      });

      this.panel.webview.html = getHTMLForWebview(this.panel.webview, this._context.extensionPath, 'QueryResults');

      // Handle panel disposal.
      this.panel.onDidDispose(() => {
        this.panel = null;
      });

      // Send initial data to the webview.
      this.panel.webview.postMessage(data);
    }
  }
}
