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
        const columns = await this.executeCommand(`PRAGMA table_info(${tableName});`);
        const columnDetails = columns
          .split('\n')
          .filter(Boolean)
          .map(line => {
            const [cid, name, type] = line.split('|');
            return { name, type };
          });

        return { name: tableName, columns: columnDetails };
      });

    return Promise.all(tableInfoPromises);
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
