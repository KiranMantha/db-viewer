import { Fragment, h, render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

type TableInfo = {
  tableName: string;
  rows: Record<string, any>[];
  columns: Array<{ name: string; type: string; isPrimaryKey: boolean; isForeignKey: boolean }>;
  selectQuery: string;
};

interface TableNode {
  name: string;
  columns: Array<{ name: string; type: string; isPrimaryKey: boolean; isForeignKey: boolean }>;
}

const DBViewer = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [tables, setTables] = useState<TableNode[]>([]);
  const [tableInfo, setTableInfo] = useState<TableInfo>();
  const selectedTable = useRef<string>('');

  const headers = tableInfo?.columns || [];
  const rows = tableInfo?.rows || [];
  const selectQuery = tableInfo?.selectQuery || '';
  const primaryKeyHeader = headers.find(header => header.isPrimaryKey);

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
    selectedTable.current = tableName;
    vscodeApi.postMessage({ command: 'QUERY_TABLE', tableName });
  };

  const handleUpdateRecord = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    vscodeApi.postMessage({
      command: 'UPDATE_RECORD',
      tableName: selectedTable.current,
      record: Object.fromEntries(formData),
      primaryKey: primaryKeyHeader?.name,
      primaryKeyType: primaryKeyHeader?.type
    });
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
        <div className="table-actions">
          <button>DB ER Diagram</button>
        </div>
        {tableInfo ? (
          <>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    {headers.map(header => (
                      <th key={header.name}>
                        {header.name} {header.isPrimaryKey ? '(PK)' : header.isForeignKey ? '(FK)' : ''}
                      </th>
                    ))}
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      {headers.map(header => (
                        <td key={header.name}>
                          {header.isPrimaryKey ? (
                            <form
                              method="GET"
                              id={`inline-form-${row[primaryKeyHeader?.name || ''] ?? ''}`}
                              onSubmit={handleUpdateRecord}
                            ></form>
                          ) : null}
                          {header.isPrimaryKey || header.isForeignKey ? (
                            <>
                              <input
                                type="hidden"
                                name={header.name}
                                defaultValue={row[header.name] ?? ''}
                                form={`inline-form-${row[primaryKeyHeader?.name || ''] ?? ''}`}
                              />
                              {row[header.name] ?? ''}
                            </>
                          ) : (
                            <input
                              type="text"
                              name={header.name}
                              defaultValue={row[header.name] ?? ''}
                              form={`inline-form-${row[primaryKeyHeader?.name || ''] ?? ''}`}
                            />
                          )}
                        </td>
                      ))}
                      <td>
                        <button
                          title="Save Record"
                          className="inline"
                          form={`inline-form-${row[primaryKeyHeader?.name || ''] ?? ''}`}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </main>
    </>
  );
};

render(<DBViewer />, document.getElementById('app') as HTMLElement);
