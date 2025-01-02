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
            </head>
            <body>
                <div id="app"></div>
                <script nonce="${nonce}" src="${scriptUri}"></script>
            </body>
            </html>`;
};

// export function getWebviewContent(tablesWithColumns: { tableName: string; columns: string[] }[]) {
//   const tableList = tablesWithColumns
//     .map(
//       table => `
//       <li class="table-item">
//         <div class="table-name">${table.tableName}</div>
//         <ul class="columns">
//           ${table.columns.map(col => `<li>${col}</li>`).join('')}
//         </ul>
//       </li>
//     `
//     )
//     .join('');

//   return `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <style>
//         body { display: flex; height: 100vh; margin: 0; }
//         #left { width: 30%; border-right: 1px solid #ccc; padding: 10px; }
//         #right { flex: 1; padding: 10px; }
//         ul { list-style: none; padding: 0; margin: 0; }
//         li { cursor: pointer; margin: 5px 0; }
//         .columns { margin-left: 20px; display: none; }
//         table { width: 100%; border-collapse: collapse; }
//         th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
//       </style>
//     </head>
//     <body>
//       <div id="left">
//         <h3>Tables</h3>
//         <ul>${tableList}</ul>
//       </div>
//       <div id="right">
//         <h3>Results</h3>
//         <div id="results"></div>
//       </div>
//       <script>
//         const vscode = acquireVsCodeApi();

//         document.querySelectorAll('.table-item .table-name').forEach(item => {
//           item.addEventListener('click', () => {
//             const tableName = item.textContent;
//             vscode.postMessage({ command: 'queryTable', tableName });
//           });
//         });

//         document.querySelectorAll('.table-item').forEach(item => {
//           item.addEventListener('click', () => {
//             const columns = item.querySelector('.columns');
//             columns.style.display = columns.style.display === 'none' ? 'block' : 'none';
//           });
//         });

//         window.addEventListener('message', event => {
//           const { command, results } = event.data;

//           if (command === 'displayResults') {
//             const rows = results.split('\\n').map(row => row.split('|'));
//             const table = document.createElement('table');
//             const headerRow = rows.shift();

//             if (headerRow) {
//               const thead = document.createElement('thead');
//               thead.innerHTML = headerRow.map(col => <th>${col}</th>).join('');
//               table.appendChild(thead);
//             }

//             const tbody = document.createElement('tbody');
//             tbody.innerHTML = rows.map(row => <tr>${row.map(col => `<td>${col}</td>`).join('')}</tr>).join('');
//             table.appendChild(tbody);

//             document.getElementById('results').innerHTML = '';
//             document.getElementById('results').appendChild(table);
//           }
//         });
//       </script>
//     </body>
//     </html>
//   `;
// }

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
