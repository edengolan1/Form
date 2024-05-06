const mssql = require("mssql");

const config = {
  user: "edengolan",
  password: "eden123",
  server: "EDENGOLAN\\SQLEXPRESS",
  database: "DBExponet",
  options: {
    trustedConnection: true,
    port: 1433,
    enableArithAbort: true,
    encrypt: false,
  },
};

exports.pool = new mssql.ConnectionPool(config);
