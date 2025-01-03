import * as d3 from 'd3';
import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

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

interface Table {
  columns: Column[];
  foreignKeys: ForeignKey[];
}

interface ERDiagramProps {
  schema: Record<string, Table>;
}

const ERDiagram = ({ schema }: ERDiagramProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;

      const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

      // Define table positions for the ER diagram
      const tablePositions: { [key: string]: { x: number; y: number } } = {
        users: { x: 100, y: 100 },
        orders: { x: 300, y: 100 },
        order_items: { x: 500, y: 100 }
      };

      // Render tables as rectangles
      const tables = svg
        .selectAll('.table')
        .data(Object.keys(schema))
        .enter()
        .append('g')
        .attr('class', 'table')
        .attr('transform', d => `translate(${tablePositions[d].x}, ${tablePositions[d].y})`);

      tables
        .append('rect')
        .attr('width', 150)
        .attr('height', d => 100 + schema[d].columns.length * 20) // Adjust height based on the number of columns
        .attr('fill', 'lightblue')
        .attr('stroke', 'black');

      tables
        .append('text')
        .attr('x', 75)
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .text(d => d);

      // Render columns inside tables
      tables
        .selectAll('.column')
        .data(d => schema[d].columns) // Correctly bind columns to the data
        .enter()
        .append('text')
        .attr('class', 'column')
        .attr('x', 75)
        .attr('y', (d, i) => 40 + i * 20)
        .attr('text-anchor', 'middle')
        .text(d => `${d.name} (${d.type})`);

      // Render foreign key relationships
      Object.keys(schema).forEach(tableName => {
        const table = schema[tableName];
        table.foreignKeys.forEach(fk => {
          const fromColumns = fk.fromColumns;
          const toTable = fk.toTable;
          const toColumns = fk.toColumns;

          const fromTablePosition = tablePositions[tableName];
          const toTablePosition = tablePositions[toTable];

          // Render lines between columns based on foreign keys
          fromColumns.forEach((fromColumn, idx) => {
            const fromColumnPosition = {
              x: fromTablePosition.x + 75, // Center of the source column
              y: fromTablePosition.y + 40 + idx * 20 // Adjust Y based on column index
            };

            toColumns.forEach((toColumn, j) => {
              const toColumnPosition = {
                x: toTablePosition.x + 75, // Center of the destination column
                y: toTablePosition.y + 40 + j * 20 // Adjust Y based on column index
              };

              // Draw lines between the columns
              svg
                .append('line')
                .attr('x1', fromColumnPosition.x)
                .attr('y1', fromColumnPosition.y)
                .attr('x2', toColumnPosition.x)
                .attr('y2', toColumnPosition.y)
                .attr('stroke', 'black')
                .attr('stroke-width', 2)
                .attr('marker-end', 'url(#arrowhead)');

              // Optionally, label the connection between columns
              svg
                .append('text')
                .attr('x', (fromColumnPosition.x + toColumnPosition.x) / 2)
                .attr('y', (fromColumnPosition.y + toColumnPosition.y) / 2 - 10)
                .attr('text-anchor', 'middle')
                .text(`${fromColumn} -> ${toColumn}`);
            });
          });
        });
      });

      // Define arrowhead for foreign key relationships
      svg
        .append('defs')
        .append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 5)
        .attr('refY', 5)
        .attr('orient', 'auto')
        .attr('markerWidth', 4)
        .attr('markerHeight', 4)
        .append('path')
        .attr('d', 'M 0 0 L 10 5 L 0 10 z')
        .attr('fill', 'black');
    }
  }, [schema]);

  return <svg ref={svgRef} style={{ width: '100%', height: '600px' }} />;
};

export { ERDiagram };
