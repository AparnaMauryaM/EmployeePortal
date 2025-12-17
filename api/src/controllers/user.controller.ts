import type { Request, Response } from "express";
import userService from "../services/user.service";

export default {
   register: async (req: Request, res : Response) => {
    const result = {error: 200, message:''};
    try{
        const {name, username, email, password, position, department } = req.body;
        var userDetails = {
            name: name.trim(),
            username: username.trim(),
            email: email.trim(),
            password: password.trim(),
            position: position.trim(),
            department: department.trim()
        };
        if(!userDetails.name)
        {
            result.message = "Name is required";
        }

        if(!userDetails.position)
        {
            result.message = "Field can not be empty"; 
        }

        if(!userDetails.department)
        {
            result.message = "Field can not be empty";
        }    

        // Email required
        if (!userDetails.email) {
            result.message = "Email is required";
        }

        // Email format 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userDetails.email)) {
           result.message = "Invalid email format" ;
        }

        // Password required
        if (!userDetails.password) {
            result.message= "Password is required";
        }

        // Min length check
        if (userDetails.password.length < 6) {
            result.message = "Password must be more than 6 characters";
        }
        if(result.message.length)
        {
            result.error = 422;
        }
        else
        {
            const user = await userService.addEmployee(userDetails);
            if(!user)
            {
                result.error = 500;
                result.message = "Some error occurred";
                return res.status(500).json({error: "Some error occurred"});
            }
            else
            {
                result.message = "Employee registered successfully";
            }  
        }
    }
    catch(err)
    {
        result.error = 500;
        result.message = "Some error occurred";
    }
    return res.status(result.error).json(result);  
  },


  getDetail: async(req:any, res:Response) =>
  {
    const result = {error: 200, message: '', profile: {}};
    try{
        const employeeId = req.user.id as number;
        const dbresult = await userService.getEmployeeDetail(employeeId);
        if(dbresult.isDone)
        {
            result.profile = dbresult.detail;
        }
        else{
            result.error = 500;
            result.message = "Some error occurred";
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