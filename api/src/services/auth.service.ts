import {pool, sql } from "../db/connectSql";
import { SignJWT } from "jose";
import { Employee } from "../model/user.model.js";

interface UserDetail {
  name: string,
  username: string,
  password: string,
  email: string,
  position: string,
  department: string
}

function isDefaultAdmin( username: string, password: string )
{
    const result = {
      isAdmin : false,
      message : ""
    }
    if(username == "admin" )
    {
      if(password != "mindfire")
      {
        result.message = "Invalid Username or password"
      }
      else
      {
        result.isAdmin = true;
      }
    }
    return result;
}

async function doLogin(username: string, password: string) {
 
  let result : {isDone: number, query?: Employee};
  result = {isDone : 0}
  const checkForAdmin = isDefaultAdmin(username,password);
  if(checkForAdmin.isAdmin)
  {
    result.isDone = 1;
    result.query = {
      USERNAME : 'admin',
      ROLE : true,
      DEPARTMENT: '',
      POSITION: '',
      EMPLOYEE_ID: 0
    }
  }
  else
  {
    const conn = await pool;

    const dbResult = await conn
    .request()
    .input("USERNAME", sql.VarChar(100), username)
    .input("PASSWORD", sql.VarChar(100), password)
    .output("ISDONE", sql.Int)
    .output("ERROR_MESSAGE", sql.VarChar(sql.MAX))
    .execute("CHECKLOGINDETAILS");
    if(dbResult.output.ISDONE)
    {
      result.isDone = 1;
      result.query = dbResult.recordset[0];
    }
  }
  return result;
}

/**
 * @function - createToken
 * Creates token for an authenticated user.
 * @param - userId   
 * @param - username
 * @param - role     
 * @returns A signed JWT token string valid for 7 days
 */

export async function createToken( userId: number,username: string,role: boolean): Promise<string> {
  
  const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "supersecretkey"
);
  const token = await new SignJWT({
    id: userId,
    username,
    role
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);

  return token;
}

async function addEmployee(userDetails: UserDetail) {
  let isDone = 0
  try
  {
    const conn = await pool;

    const dbresult = await conn
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
    isDone = dbresult.output.isDone;
  }
  catch(err){}
  return isDone; // rows returned from SP
}
export default {
  doLogin,
  createToken,
  addEmployee
};