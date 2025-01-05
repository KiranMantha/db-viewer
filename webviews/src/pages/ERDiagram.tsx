import { Icon } from 'components';
import mermaid from 'mermaid';
import { useEffect, useRef } from 'preact/hooks';

// Define the schema types
interface Column {
  name: string;
  type: string;
  constraints: string;
}

interface ForeignKey {
  fromColumns: string[];
  toTable: string;
  toColumns: string[];
}

interface TableSchema {
  columns: Column[];
  foreignKeys: ForeignKey[];
}

interface DatabaseSchema {
  [tableName: string]: TableSchema;
}

// Function to generate Mermaid ER diagram syntax
function generateMermaidDiagram(schema: DatabaseSchema): string {
  let diagram = 'erDiagram\n';

  // Generate table definitions
  for (const [tableName, table] of Object.entries(schema)) {
    diagram += `  ${tableName} {\n`;
    table.columns.forEach(column => {
      diagram += `    ${column.type} ${column.name} "${column.constraints}"\n`;
    });
    diagram += '  }\n';
  }

  // Generate foreign key relationships
  for (const [tableName, table] of Object.entries(schema)) {
    table.foreignKeys.forEach(fk => {
      diagram += `  ${tableName} ||--o{ ${fk.toTable} : "FK_${tableName}_${fk.fromColumns.join('_')}"\n`;
    });
  }

  return diagram;
}

const ERDiagram = ({ schema }: { schema: DatabaseSchema }) => {
  const diagramContainer = useRef<HTMLDivElement>(null);

  const downloadSVG = async () => {
    const svgElement = diagramContainer.current?.querySelector('svg');
    if (!svgElement) {
      return;
    }
    // Get the current style attribute and add background color
    const currentStyle = svgElement.getAttribute('style') || '';
    const updatedStyle = currentStyle.includes('background:')
      ? currentStyle // Keep existing background if already set
      : `${currentStyle.trim()} background: #fff;`.trim();
    svgElement.setAttribute('style', updatedStyle);
    // Serialize the SVG element
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);
    vscodeApi.postMessage({ command: 'DOWNLOAD_ER_DIAGRAM', source });
  };

  useEffect(() => {
    if (schema) {
      const mermaidDiagram = generateMermaidDiagram(schema);
      mermaid.initialize({ startOnLoad: false, theme: 'neutral' });

      if (diagramContainer.current) {
        diagramContainer.current.innerHTML = `<div class="mermaid">${mermaidDiagram}</div>`;
        mermaid.run();
      }
    }
  }, [schema]);

  return (
    <div className="diagram-container">
      <button title="Download ER Diagram" className="download" onClick={downloadSVG}>
        <Icon name="download" color="#000" />
      </button>
      <div ref={diagramContainer} />
    </div>
  );
};

export { ERDiagram };
