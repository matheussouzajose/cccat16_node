export default interface DatabaseConnection {
  connect: () => void;
  disconnect: () => Promise<void>;
  query: (
    statement: string,
    params: any,
    transactional?: boolean,
  ) => Promise<any>;
}
