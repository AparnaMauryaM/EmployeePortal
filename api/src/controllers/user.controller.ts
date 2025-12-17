import type { Request, Response } from "express";
import employeeService from "../services/employee.service";

export default {
  getProfileDetail: async(req:Request, res:Response) =>
  {
    const result = {error: 200, message: '', profile: {}};
    try{
        if(req.user && req.user.id)
        {
            const employeeId = req.user.id;
            const dbresult = await employeeService.getEmployeeDetail(employeeId);
            if(dbresult.isDone)
            {
                result.profile = dbresult.detail;
            }
            else{
                result.error = 500;
                result.message = "Some error occurred";
            }
        } 
    }
    catch(err)
    {
        result.error = 500;
        result.message = "Some error occurred";
    }
    return  res.status(result.error).json(result);
  }
};