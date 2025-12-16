 import type { Request, Response } from "express";
 import userService from "../services/user.service";

export default {
   register: async (req: Request, res : Response) => {
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
        return res.status(422).json({error: "Name is required"});
    }

    if(!userDetails.position)
    {
        return res.status(422).json({error: "Field can not be empty"});
    }

    if(!userDetails.department)
    {
        return res.status(422).json({error: "Field can not be empty"});
    }    

    // Email required
    if (!userDetails.email) {
        return res.status(422).json({ error: "Email is required" });
    }

    // Email format check (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetails.email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    // Password required
    if (!userDetails.password) {
        return res.status(400).json({ error: "Password is required" });
    }

    // Min length check
    if (userDetails.password.length < 6) {
        return res.status(400).json({ error: "Password must be more than 6 characters" });
    }

    const user = await userService.addEmployee(userDetails);
    console.log(user);
    if(!user)
    {
        return res.status(500).json({error: "Some error occurred"});
    }

    res.json({ message: "Employee registered successfully."});
  },



  getAllEmplyee: async (req: Request, res : Response) => {

    const resultDB = await userService.fetchAllEmployee();

  }


};