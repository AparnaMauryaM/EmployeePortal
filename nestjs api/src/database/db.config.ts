// src/database/db.config.ts
export const sqlConfig = {
  user: 'sa',
  password: 'mindfire',
  database: 'EmployeePortal',
  server: 'APARNAM-WIN10',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true, // Change to false for production
  },
};
