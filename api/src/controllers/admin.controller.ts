import { Request, Response } from "express";
import employeeService from "../services/employee.service";

export default{
    getAllEmployee: async (req: Request, res : Response) => {
      const result = { error: 200, message: '', employee: [{}]};
      try
      {
        const resultDB = await employeeService.fetchAllEmployee();
        if(resultDB.isDone)
        {
          result.employee = resultDB.detail;
        }
        else
        {
          result.error = 500;
           result.message = "Some error.occurred";
        }
      }
      catch(err)
      {
        result.error = 500;
        result.message = "Some error.occurred";
      }
      return res.status(result.error).json(result);

  }
}
 