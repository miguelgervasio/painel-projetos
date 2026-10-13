export default {
  client: "sqlite3",
  connection: {
    filename: "./src/database/database.db",
  },
  //   Restrição de relacionamento para não permitir, por exemplo, adicionar um produto que não existe
  pool: {
    afterCreate: (conn: any, done: any) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
  },

  useNullAsDefault: true,

  migrations: {
    extensions: "ts",
    directory: "./src/database/migrations",
  },
  seeds: {
    extensions: "ts",
    directory: "./src/database/seeds",
  },
};
