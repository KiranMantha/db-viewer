export interface DatabaseClient {
  getTables(): Promise<string[]>;
  getColumns(table: string): Promise<string[]>;
}
