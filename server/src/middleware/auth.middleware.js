import jwt from "jsonwebtoken";
import config from "../config/config.js";

const authMiddleware=(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization;

        if(!authHeader){
            const error=new Error("Authorization header is required");
            error.statusCode=401;
            throw error;
        }

        const token=authHeader.split(" ")[1];

        if(!token){
            const error=new Error("Token is required");
            error.statusCode=401;
            throw error;
        }

        const decoded=jwt.verify(token, config.jwtSecret);
        req.user=decoded;
        console.log("Decoded user:", decoded);

        next();

        
    } catch (error) {
        error.statusCode=401;
        next(error);
        
    }
}

export default authMiddleware;