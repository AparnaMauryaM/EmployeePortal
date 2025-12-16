import {pool, sql } from "../db/connectSql"

interface UserDetail {
  name: string,
  username: string,
  password: string,
  email: string,
  position: string,
  department: string
}

async function addEmployee(userDetails: UserDetail) {
  const conn = await pool;

  const result = await conn
    .request()
    .input("name", sql.NVarChar, userDetails.name)
    .input("username", sql.NVarChar, userDetails.username)
    .input("password", sql.NVarChar, userDetails.password)
    .input("email", sql.NVarChar, userDetails.email)
    .input("position", sql.NVarChar, userDetails.position)
    .input("department", sql.NVarChar, userDetails.department)
    .input("role", sql.Bit, 0)
    .output("isDone", sql.Bit)
    .output("ERROR_MESSAGE", sql.VarChar(sql.MAX))
    .execute("ADDEMPLOYEEDETAILS");
  console.log(result.output.ERROR_MESSAGE);
  return result.output.isDone; // rows returned from SP
}

async function fetchAllEmployee()
{
   const conn = await pool;

   const result = await conn
    .request()
    .output("isDone", sql.Bit)
    .output("ERROR_MESSAGE", sql.VarChar(sql.MAX))
    .execute("GETALLEMPLOYEEDETAILS");
  console.log(result.output.ERROR_MESSAGE);
  console.log(result.recordset);
  return result.recordset;

}

export default{
    addEmployee,
    fetchAllEmployee
}