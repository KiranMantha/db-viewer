import path from 'path';
import * as vscode from 'vscode';

export const getHTMLForWebview = (webview: vscode.Webview, extensionUri: string, scriptFile: string) => {
  const styleResetUri = webview.asWebviewUri(vscode.Uri.file(path.join(extensionUri, 'resources', 'reset.css')));
  const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.file(path.join(extensionUri, 'resources', 'vscode.css')));
  const scriptUri = webview.asWebviewUri(vscode.Uri.file(path.join(extensionUri, `dist/webviews/${scriptFile}.js`)));

  const styleMainUri = '';
  const nonce = getNonce();

  return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Webview with Preact</title>
                <link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
                <link href="${styleMainUri}" rel="stylesheet">
                <script nonce="${nonce}">
                    const vscodeApi = acquireVsCodeApi();
                </script>
            </head>
            <body>
                <div id="app"></div>
                <script nonce="${nonce}" src="${scriptUri}"></script>
            </body>
            </html>`;
};

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
