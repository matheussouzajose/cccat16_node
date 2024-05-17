import pg from 'pg-promise';
import type DatabaseConnection from './DatabaseConnection';

export default class PgPromiseAdapter implements DatabaseConnection {
  static connection?: any;
  statements: Array<{ statement: string; params: any }> = [];
  options: object = {};

  connect(): void {
    const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } =
      process.env;
    PgPromiseAdapter.connection = pg(this.options)(
      `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
    );
  }

  async disconnect(): Promise<void> {
    return PgPromiseAdapter.connection.$pool.end();
  }

  async commit(): Promise<void> {
    await PgPromiseAdapter.connection
      .tx(async (t: any) => {
        const transactions: any[] = [];
        for (const statement of this.statements) {
          transactions.push(
            await t.none(statement.statement, statement.params),
          );
        }
        return t.batch(transactions);
      })
      .then((data: any): void => {
        console.log('commit', data);
      })
      .catch((data: any): void => {
        console.log('rollback', data);
      });
  }

  async query(
    statement: string,
    params: any,
    transactional: boolean = false,
  ): Promise<any> {
    if (!transactional) {
      return PgPromiseAdapter.connection.query(statement, params);
    }
    this.statements.push({ statement, params });
    // await Promise.resolve(undefined)
  }
}
