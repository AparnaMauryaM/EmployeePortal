import { Request, Response } from 'express';
import authService from "../services/auth.service";
import { Employee } from "../model/user.model";

interface LoginResponse {
  token?: string;
  userDetail?: any;
  message?: string;
  error?: string;
}

export default {
  login: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const result : LoginResponse = {};

    // Email required
    if (!username) {
        return res.status(400).json({ error: "Email is required" });
    }

    // // Email format check (simple regex)
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //     return res.status(400).json({ error: "Invalid email format" });
    // }

    // Password required
    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    // Min length check
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be more than 6 characters" });
    }

    const user : {isDone: number, query?: Employee} = await authService.doLogin(username, password);
    if(user.isDone && user.query !== undefined)
    {
        result.token =  await authService.createToken(user.query.EMPLOYEE_ID, user.query.USERNAME, user.query.ROLE);
        result.userDetail = user.query;
    }
    else
    {
        return res.status(401).json({error: "Invalid Credentials"});
    }

    res.json({token: result.token, message: "Successfully logged in"});
  }
};