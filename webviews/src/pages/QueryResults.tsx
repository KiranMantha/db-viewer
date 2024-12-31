import { Fragment, h, render } from 'preact';

type Props = {
  tableName: string;
  rows: any[];
  columns: string[];
};

function QueryResults({ tableName, rows, columns }: Props) {
  if (rows.length === 0) {
    return <p>No data available.</p>;
  }

  const headers = columns;

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(JSON.stringify(Object.fromEntries(formData), null, 4));
  };

  return (
    <div>
      <h2>
        <span></span>
        {tableName} Results
      </h2>
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
                      <form method="GET" id={`inline-form-${row[headers[0]] ?? ''}`} onSubmit={onFormSubmit}></form>
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
                  <svg
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
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Listen for messages from the extension
window.addEventListener('message', event => {
  console.log('queryresults.js', event);
  const { tableName, rows, columns } = event.data;
  render(
    <QueryResults tableName={tableName} rows={rows} columns={columns} />,
    document.getElementById('app') as HTMLElement
  );
});
