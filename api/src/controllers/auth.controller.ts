import { Request, Response } from 'express';
import authService from "../services/auth.service";
import { Employee } from "../model/user.model";

interface LoginResponse {
  token?: string;
  userDetail?: any;
  message?: string;
  error: number;
}

export default {
  login: async (req: Request, res: Response) => {
    const result : LoginResponse = {error: 200};
    try
    {
      const { username, password } = req.body;
      // Email required
      if (!username) {
        result.error = 422;
        result.message = "Email is required";
      }

      // Password required
      if (!password) {
        result.error = 422;
        result.message = "Password is required";
      }

      // Min length check
      if (password.length < 6) {
        result.error = 422;
        result.message = "Password must be more than 6 characters";
      }
      if(result.error == 200)
      {
        const user : {isDone: number, query?: Employee} = await authService.doLogin(username, password);
        if(user.isDone && user.query !== undefined)
        {
            result.token =  await authService.createToken(user.query.EMPLOYEE_ID, user.query.USERNAME, user.query.ROLE);
            result.message = "Successfully logged in";
        }
        else
        {
          result.error = 401;
          result.message = "Invalid Username or Password";
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
            const user = await authService.addEmployee(userDetails);
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
  }
};