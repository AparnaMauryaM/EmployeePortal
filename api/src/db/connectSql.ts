import sql from "mssql";

const config = {
  user: "sa",
  password: "mindfire",
  database: "EmployeePortal",
  server: "APARNAM-WIN10",     // or IP
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

export const pool: Promise<sql.ConnectionPool> =
  new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
      console.log("Connected to SQL Server");
      return pool;
    })
    .catch(err => {
      console.error("DB connection failed", err);
      throw err; // 👈 THIS is the key line
    });

export { sql };
