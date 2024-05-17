import type AccountRepository from '@/domain/account/repository/AccountRepository';
import PgPromiseAdapter from '@/infrastructure/database/PgPromiseAdapter';
import DbAccountRepository from '@/infrastructure/persistence/repository/account/DbAccountRepository';
import type DatabaseConnection from '@/infrastructure/database/DatabaseConnection';

export const makeDbAccountRepository = (): AccountRepository => {
  const connection: DatabaseConnection = new PgPromiseAdapter();
  return new DbAccountRepository(connection);
};
