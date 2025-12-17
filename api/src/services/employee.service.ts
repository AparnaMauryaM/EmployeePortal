import {pool, sql } from "../db/connectSql"



async function fetchAllEmployee()
{
  const result = {isDone: 0, detail: [{}]};
  try
  {
    const conn = await pool;

    const dbresult = await conn
      .request()
      .output("isDone", sql.Bit)
      .output("ERROR_MESSAGE", sql.VarChar(sql.MAX))
      .execute("GETALLEMPLOYEEDETAILS");
      // console.log(result.output.ERROR_MESSAGE);
      // console.log(result.recordset);
      if(dbresult.output.isDone)
      {
        result.isDone = 1;
        result.detail = dbresult.recordset;
      }
  }
  catch(err){
  }
  return result;

}

async function getEmployeeDetail(empId: number)
{
  const result = {isDone: 0, detail: {}};
  try{
    const conn = await pool;
    const dbQuery =  await conn
    .request()
    .input("EMPID", sql.Int, empId)
    .output("isDone", sql.Bit)
    .output("ERROR_MESSAGE", sql.VarChar(sql.MAX))
    .execute("GETEMPLOYEEDETAIL");
    if(dbQuery.output.isDone)
    {
      result.isDone = 1;
      result.detail = dbQuery.recordset[0];
    }
  }
  catch( err){
    console.log(err);
  }
  return result;
}

export default{
    fetchAllEmployee,
    getEmployeeDetail
}