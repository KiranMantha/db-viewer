import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import Button from '../components/Button';

const App = () => {
  const [tables, setTables] = useState<any[]>([]);

  const sendGreeting = () => {
    vscodeApi.postMessage({ command: 'GREET', message: 'Hello world from sidebar' });
  };

  const handleFileUpload = () => {
    vscodeApi.postMessage({ command: 'PICK_FILE' });
  };

  const handleExpandTable = (tableName: string) => {
    vscodeApi.postMessage({ command: 'EXPAND_TABLE', tableName });
  };

  const handleMessage = (event: MessageEvent) => {
    const message = event.data;
    console.log('handleMessage', message);

    if (message.command === 'SHOW_TABLES') {
      setTables(message.tables.map((table: string) => ({ tableName: table, columns: [] })));
    } else if (message.command === 'SHOW_COLUMNS') {
      setTables(prev =>
        prev.map(table => (table.tableName === message.tableName ? { ...table, columns: message.columns } : table))
      );
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div>
      <h2>DB Viewer</h2>
      <Button onClick={sendGreeting}>Click Me</Button>
      <Button style="margin-top: 20px;" onClick={handleFileUpload}>
        Select SQLite DB
      </Button>
      <div style="margin-top: 20px;">
        <ul>
          {tables.map(table => (
            <li key={table.tableName}>
              <span onClick={() => handleExpandTable(table.tableName)}>{table.tableName}</span>
              <ul>
                {table.columns.map((col: string) => (
                  <li key={col}>{col}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

render(<App />, document.getElementById('app') as HTMLElement);
