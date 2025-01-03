import { exec } from 'child_process';
import * as fs from 'fs';

export interface TableInfo {
  name: string;
  columns: { name: string; type: string }[];
}

export class SQLiteClient {
  private _dbFilePath?: string;

  constructor(filePath: string) {
    if (!fs.existsSync(filePath)) {
      throw new Error('Database file not found.');
    }
    this._dbFilePath = filePath;
  }

  async getTablesAndColumns(): Promise<TableInfo[]> {
    if (!this._dbFilePath) {
      throw new Error('No database loaded.');
    }

    const tables = await this.executeCommand(
      `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`
    );

    const tableInfoPromises = tables
      .split('\n')
      .filter(Boolean)
      .map(async tableName => {
        return await this.getTableMetadata(tableName);
      });

    return Promise.all(tableInfoPromises);
  }

  async getTableMetadata(tableName: string) {
    const columns = await this.executeCommand(`PRAGMA table_info(${tableName});`);
    const columnDetails = columns
      .split('\n')
      .filter(Boolean)
      .map(line => {
        const [cid, name, type, _notnull, _dflt_value, pk] = line.split('|');
        return { name, type, isPrimaryKey: pk === '1', isForeignKey: false };
      });

    // Identify foreign keys
    const foreignKeys = await this.executeCommand(`PRAGMA foreign_key_list(${tableName});`);

    const foreignKeyColumns = foreignKeys
      .split('\n')
      .filter(Boolean)
      .map(line => line.split('|')[3]); // Get the `from` column name

    // Update columns to mark foreign keys
    columnDetails.forEach(column => {
      if (foreignKeyColumns.includes(column.name)) {
        column.isForeignKey = true;
      }
    });

    return { name: tableName, columns: columnDetails };
  }

  executeCommand(query: string): Promise<string> {
    if (!this._dbFilePath) {
      return Promise.reject(new Error('No database loaded.'));
    }

    // Prepend `sqlite3` and database file path to the query
    const cliCommand = `sqlite3 "${this._dbFilePath}" "${query}"`;
    console.log(cliCommand);
    return new Promise((resolve, reject) => {
      exec(cliCommand, (error, stdout, stderr) => {
        if (error) {
          return reject(stderr || error.message);
        }
        console.log('command output', '\n', query, '\n', stdout.trim(), '\n');
        resolve(stdout.trim());
      });
    });
  }
}
