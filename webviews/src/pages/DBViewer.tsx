import { Fragment, h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';

type TableInfo = {
  tableName: string;
  rows: Record<string, any>[];
  columns: string[];
  selectQuery: string;
};

interface TableNode {
  name: string;
  columns: Array<{ name: string; type: string }>;
}

const DBViewer = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [tables, setTables] = useState<TableNode[]>([]);
  const [tableInfo, setTableInfo] = useState<TableInfo>();

  const headers = tableInfo?.columns || [];
  const rows = tableInfo?.rows || [];
  const selectQuery = tableInfo?.selectQuery || '';

  const toggleNode = (nodeName: string) => {
    setExpandedNodes(prev => {
      const newExpandedNodes = new Set(prev);
      if (newExpandedNodes.has(nodeName)) {
        newExpandedNodes.delete(nodeName);
      } else {
        newExpandedNodes.add(nodeName);
      }
      return newExpandedNodes;
    });
  };

  const renderTreeNode = (table: TableNode) => {
    const isExpanded = expandedNodes.has(table.name);
    return (
      <li key={table.name}>
        <div>
          <span className="toggle-tree" onClick={() => toggleNode(table.name)} style={{}}>
            {table.columns ? (isExpanded ? '[-]' : '[+]') : null}
          </span>
          <span className="tree-name" onClick={() => getRecordsFromTable(table.name)}>
            {table.name}
          </span>
        </div>
        {table.columns && isExpanded && (
          <ul>
            {table.columns.map(({ name, type }) => (
              <li key={`${table.name}-${name}-${type}`}>
                <span className="leaf-name">{name}</span>
                <span>({type})</span>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

  const getRecordsFromTable = (tableName: string) => {
    vscodeApi.postMessage({ command: 'QUERY_TABLE', tableName });
  };

  const handleUpdateRecord = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(JSON.stringify(Object.fromEntries(formData), null, 4));
  };

  const handleSelectQuery = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    vscodeApi.postMessage({ command: 'QUERY_TABLE', selectQuery: formData.get('selectQuery') });
  };

  const handleMessage = (event: MessageEvent) => {
    console.log('tsx event inside component', event);
    const { command, data } = event.data;
    if (command === 'DISPLAY_TABLES') {
      setTables(data.tables);
    }
    if (command === 'DISPLAY_QUERY_RESULTS') {
      setTableInfo({ ...data });
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    vscodeApi.postMessage({ command: 'QUERY_DATABASE' });
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <>
      <aside>
        <h2>Tables</h2>
        <ul>{tables.map(table => renderTreeNode(table))}</ul>
      </aside>
      <main>
        {tableInfo ? (
          <>
            <form className="query-form" method="GET" id="select-query-form" onSubmit={handleSelectQuery}>
              <input type="text" name="selectQuery" defaultValue={selectQuery} />
              <button type="submit">Send Query</button>
            </form>
            <table>
              <thead>
                <tr>
                  {headers.map(header => (
                    <th key={header}>{header}</th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    {headers.map((header, headerIndex) => (
                      <td key={header}>
                        {headerIndex === 0 ? (
                          <>
                            <form
                              method="GET"
                              id={`inline-form-${row[headers[0]] ?? ''}`}
                              onSubmit={handleUpdateRecord}
                            ></form>
                            <input
                              type="hidden"
                              name={header}
                              defaultValue={row[header] ?? ''}
                              form={`inline-form-${row[headers[0]] ?? ''}`}
                            />
                            {row[header] ?? ''}
                          </>
                        ) : (
                          <input
                            type="text"
                            name={header}
                            defaultValue={row[header] ?? ''}
                            form={`inline-form-${row[headers[0]] ?? ''}`}
                          />
                        )}
                      </td>
                    ))}
                    <td>
                      <button title="Save Record" className="inline" form={`inline-form-${row[headers[0]] ?? ''}`}>
                        {/* <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.353 1.146l1.5 1.5L15 3v11.5l-.5.5h-13l-.5-.5v-13l.5-.5H13l.353.146zM2 2v12h12V3.208L12.793 2H11v4H4V2H2zm6 0v3h2V2H8z"
                          />
                        </svg> */}
                        Save
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}
      </main>
    </>
  );
};

render(<DBViewer />, document.getElementById('app') as HTMLElement);
