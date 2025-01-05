import path from 'path';
import * as vscode from 'vscode';

export const getHTMLForWebview = (
  webview: vscode.Webview,
  extensionUri: string,
  scriptFile: string,
  stylesFile = ''
) => {
  const styleResetUri = webview.asWebviewUri(vscode.Uri.file(path.join(extensionUri, 'resources', 'reset.css')));
  const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.file(path.join(extensionUri, 'resources', 'vscode.css')));
  const scriptUri = webview.asWebviewUri(vscode.Uri.file(path.join(extensionUri, `dist/webviews/${scriptFile}.js`)));
  const stylesUri = stylesFile
    ? webview.asWebviewUri(vscode.Uri.file(path.join(extensionUri, 'resources', `${stylesFile}.css`)))
    : '';
  const nonce = getNonce();

  return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Webview with Preact</title>
                <link href="${styleResetUri}" rel="stylesheet">
				        <link href="${styleVSCodeUri}" rel="stylesheet">
                <link href="${stylesUri}" rel="stylesheet">
                <script nonce="${nonce}">
                    const vscodeApi = acquireVsCodeApi();
                </script>
                <!--svg styles-->
                <style type="text/css">
                  .st0{fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
                  .st1{fill:none;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;}
                </style>
            </head>
            <body>
                <svg style="display: none">
                  <defs>
                    <g id="chevron-down">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </g>
                    <g id="chevron-right">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </g>
                    <g id="chevron-left">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </g>
                    <g id="chevron-up">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </g>
                    <g id="tag">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                      <line x1="7" y1="7" x2="7" y2="7"></line>
                    </g>
                    <g id="download">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </g>
                  </defs>
                </svg>
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
