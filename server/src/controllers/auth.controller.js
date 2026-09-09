import authService from "../services/auth.service.js"

const forgotPassword=async(req,res)=>{
    const result=await authService.forgotPassword(req.body);
    res.json(result);
}

const register=async(req,res)=>{
    const registeredUser=await authService.register(req.body);
    res.json(registeredUser);
}

const login=async(req,res)=>{
    const loggedInUser=await authService.login(req.body);
    res.json(loggedInUser);
}


export default{
    forgotPassword,
    register,
    login,
}